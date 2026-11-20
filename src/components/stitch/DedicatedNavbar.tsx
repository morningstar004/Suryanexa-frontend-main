"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  PhoneCall,
  Bell,
  LogOut,
  ArrowRight,
  ScrollText,
  Building,
  Mail,
  Shield,
  Camera,
  Star,
  ExternalLink,
  Menu,
  X,
  Activity,
  CheckCircle2,
  Scale,
  FileCheck,
} from "lucide-react";
import { toast } from "sonner";

export default function DedicatedNavbar() {
  const [activeDropdown, setActiveDropdown] = useState<"policies" | "company" | "contact" | null>(null);
  const [activeLink, setActiveLink] = useState<string>("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<{ name?: string; email?: string; role?: string; avatar?: string } | null>(null);
  const [activePopup, setActivePopup] = useState<"activities" | "user" | null>(null);
  const showActivities = activePopup === "activities";
  const showUserMenu = activePopup === "user";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const policiesTriggerRef = useRef<HTMLButtonElement>(null);
  const companyTriggerRef = useRef<HTMLButtonElement>(null);
  const contactTriggerRef = useRef<HTMLButtonElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [triggerPos, setTriggerPos] = useState<{
    left: number;
    originX: number;
    originRatio: number;
  }>({
    left: 0,
    originX: 40,
    originRatio: 0.1,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Read logged-in trader details dynamically
  useEffect(() => {
    const loadUser = () => {
      if (typeof window !== "undefined") {
        try {
          const stored = localStorage.getItem("suryanexa_user");
          if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed && (parsed.name || parsed.email)) {
              setIsLoggedIn(true);
              setUserData(parsed);
              return;
            }
          }
          setIsLoggedIn(false);
          setUserData(null);
        } catch (err) {
          console.error("Error loading user in navbar:", err);
        }
      }
    };

    loadUser();
    window.addEventListener("storage", loadUser);
    window.addEventListener("suryanexa_user_updated", loadUser);
    return () => {
      window.removeEventListener("storage", loadUser);
      window.removeEventListener("suryanexa_user_updated", loadUser);
    };
  }, []);

  const updateTriggerPosition = (menu: "policies" | "company" | "contact") => {
    const ref =
      menu === "policies"
        ? policiesTriggerRef.current
        : menu === "company"
        ? companyTriggerRef.current
        : contactTriggerRef.current;
    if (ref && navContainerRef.current) {
      const navRect = navContainerRef.current.getBoundingClientRect();
      const btnRect = ref.getBoundingClientRect();

      const dropdownWidth = menu === "policies" ? 520 : menu === "company" ? 480 : 460;

      // Center the dropdown horizontally under the trigger button (middle under trigger option)
      const btnCenter = (btnRect.left - navRect.left) + (btnRect.width / 2);
      let left = btnCenter - (dropdownWidth / 2);

      // On smaller screens or edge positions, clamp so the dropdown doesn't overflow viewport boundaries
      if (typeof window !== "undefined") {
        const viewportWidth = window.innerWidth;
        const navLeftOnScreen = navRect.left;
        const absLeft = navLeftOnScreen + left;
        if (absLeft < 16) {
          left += (16 - absLeft);
        } else if (absLeft + dropdownWidth > viewportWidth - 16) {
          left -= (absLeft + dropdownWidth - (viewportWidth - 16));
        }
      }

      // Exact horizontal center of the button relative to the dropdown's left edge
      const originX = Math.max(
        16,
        Math.min(dropdownWidth - 16, btnCenter - left)
      );

      const originRatio = Math.min(1, Math.max(0, originX / dropdownWidth));

      setTriggerPos({ left, originX, originRatio });
    }
  };

  useEffect(() => {
    if (!activeDropdown) return;
    const handleResize = () => {
      updateTriggerPosition(activeDropdown);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [activeDropdown]);

  // Close notifications or user profile menu when clicking outside or pressing Escape
  useEffect(() => {
    if (!activePopup) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target) return;

      const isInsideNotifications = notificationsRef.current?.contains(target);
      const isInsideUserMenu = userMenuRef.current?.contains(target);

      if (!isInsideNotifications && !isInsideUserMenu) {
        setActivePopup(null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActivePopup(null);
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handlePointerDown, true);
    document.addEventListener("touchstart", handlePointerDown, true);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown, true);
      document.removeEventListener("touchstart", handlePointerDown, true);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePopup]);

  const handleMouseEnter = (menu: "policies" | "company" | "contact") => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActivePopup(null);
    updateTriggerPosition(menu);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const handleLoginToggle = () => {
    if (!isLoggedIn) {
      setIsLoggedIn(true);
      toast.success("Welcome back, Verified Trader");
    }
  };

  const handleLogout = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoggedIn(false);
    setActivePopup(null);
    setUserData(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("suryanexa_user");
    }
    toast.info("Logged out successfully");
  };

  const displayName = userData?.name || "Dev";
  const displayEmail = userData?.email || "devb4111@gmail.com";
  const userAvatar = userData?.avatar || null;
  const userInitials =
    displayName
      .split(" ")
      .map((n) => n[0])
      .filter(Boolean)
      .join("")
      .slice(0, 2)
      .toUpperCase() || "D";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[9999] w-full transition-all duration-500 border-b ${
        scrolled
          ? "border-[#e5e1d4] shadow-[0_4px_20px_rgba(0,0,0,0.04)] bg-[#faf8f3]/95 backdrop-blur-md"
          : "border-transparent bg-gradient-to-b from-[#02201d]/90 via-[#02201d]/40 to-transparent shadow-none"
      }`}
    >
      <div
        className={`flex justify-between items-center mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12 w-full max-w-[1440px] 2xl:max-w-[1600px] 3xl:max-w-[1920px] 4xl:max-w-[2200px] transition-all duration-300 ease-out ${
          scrolled ? "h-[63px]" : "h-[74px]"
        }`}
      >
        
        {/* =========================================================================
            1. LEFT: SURYANEXA BRAND LOGO (KEPT ON LEFT WITH INCREASED GAP TO NAV)
           ========================================================================= */}
        <div className="flex items-center mr-8 lg:mr-14 2xl:mr-28 xl:mr-20 shrink-0">
          <Link href="/" onClick={() => setActiveLink("home")} className="group flex items-center gap-2.5">
            <div className="relative flex justify-center items-center w-10 h-10 group-hover:scale-105 transition-transform duration-200 shrink-0">
              <img
                src="/suryanexa-logo.png"
                alt="SuryaNexa Logo"
                className="drop-shadow-sm w-full h-full object-contain"
              />
            </div>
            <span
              className={`font-display font-black text-xl leading-none tracking-tight transition-colors duration-300 ${
                scrolled ? "text-zinc-950" : "text-white"
              }`}
            >
              Surya<span className={scrolled ? "text-emerald-700" : "text-emerald-400"}>NEXA</span>
            </span>
          </Link>
        </div>

        {/* =========================================================================
            2. CENTER: NAVIGATION ITEMS WITH IOS ROUNDED CORNERS & MORPHING DROPDOWN
           ========================================================================= */}
        <div
          ref={navContainerRef}
          className="hidden relative lg:flex items-center"
          onMouseLeave={handleMouseLeave}
        >
          <nav className="flex items-center gap-1.5 xl:gap-2 font-sans font-medium text-[13px] xl:text-sm">
            {/* Active "Home" Option */}
            <Link
              href="/"
              onClick={() => setActiveLink("home")}
              className={`px-3.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
                activeLink === "home"
                  ? scrolled
                    ? "text-zinc-950 font-bold"
                    : "text-white font-bold bg-white/15 backdrop-blur-sm"
                  : scrolled
                  ? "text-zinc-600 hover:text-zinc-950 hover:bg-[#f2ecdf]/70 font-medium"
                  : "text-emerald-100/85 hover:text-white hover:bg-white/10 font-medium"
              }`}
            >
              <span>Home</span>
            </Link>

            {/* Core Data Links */}
            <Link
              href="/#pricing"
              onClick={() => setActiveLink("pricing")}
              className={`px-3.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
                activeLink === "pricing"
                  ? scrolled
                    ? "text-zinc-950 font-bold"
                    : "text-white font-bold bg-white/15 backdrop-blur-sm"
                  : scrolled
                  ? "text-zinc-600 hover:text-zinc-950 hover:bg-[#f2ecdf]/70 font-medium"
                  : "text-emerald-100/85 hover:text-white hover:bg-white/10 font-medium"
              }`}
            >
              <span>Pricing</span>
            </Link>

            {/* Policies Trigger */}
            <button
              ref={policiesTriggerRef}
              onClick={() => setActiveLink("policies")}
              onMouseEnter={() => handleMouseEnter("policies")}
              className={`px-3.5 py-1.5 rounded-xl flex items-center gap-1 transition-all duration-200 cursor-pointer ${
                activeDropdown === "policies" || activeLink === "policies"
                  ? scrolled
                    ? "text-zinc-950 font-bold bg-[#f2ecdf]/60"
                    : "text-white font-bold bg-white/15 backdrop-blur-sm"
                  : scrolled
                  ? "text-zinc-600 hover:text-zinc-950 hover:bg-[#f2ecdf]/70 font-medium"
                  : "text-emerald-100/85 hover:text-white hover:bg-white/10 font-medium"
              }`}
            >
              <span>Policies</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  scrolled ? "text-zinc-500" : "text-emerald-200"
                } ${activeDropdown === "policies" ? "rotate-180" : ""}`}
              />
            </button>

            {/* About Us Trigger */}
            <button
              ref={companyTriggerRef}
              onClick={() => setActiveLink("company")}
              onMouseEnter={() => handleMouseEnter("company")}
              className={`px-3.5 py-1.5 rounded-xl flex items-center gap-1 transition-all duration-200 cursor-pointer ${
                activeDropdown === "company" || activeLink === "company"
                  ? scrolled
                    ? "text-zinc-950 font-bold bg-[#f2ecdf]/60"
                    : "text-white font-bold bg-white/15 backdrop-blur-sm"
                  : scrolled
                  ? "text-zinc-600 hover:text-zinc-950 hover:bg-[#f2ecdf]/70 font-medium"
                  : "text-emerald-100/85 hover:text-white hover:bg-white/10 font-medium"
              }`}
            >
              <span>About Us</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  scrolled ? "text-zinc-500" : "text-emerald-200"
                } ${activeDropdown === "company" ? "rotate-180" : ""}`}
              />
            </button>

            {/* Contact Us Trigger */}
            <button
              ref={contactTriggerRef}
              onClick={() => setActiveLink("contact")}
              onMouseEnter={() => handleMouseEnter("contact")}
              className={`px-3.5 py-1.5 rounded-xl flex items-center gap-1 transition-all duration-200 cursor-pointer ${
                activeDropdown === "contact" || activeLink === "contact"
                  ? scrolled
                    ? "text-zinc-950 font-bold bg-[#f2ecdf]/60"
                    : "text-white font-bold bg-white/15 backdrop-blur-sm"
                  : scrolled
                  ? "text-zinc-600 hover:text-zinc-950 hover:bg-[#f2ecdf]/70 font-medium"
                  : "text-emerald-100/85 hover:text-white hover:bg-white/10 font-medium"
              }`}
            >
              <span>Contact Us</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-zinc-500 transition-transform duration-200 ${
                  activeDropdown === "contact" ? "rotate-180 text-zinc-950" : ""
                }`}
              />
            </button>
          </nav>

          {/* Morphing Dropdown Panel: Positioned centered directly under the active option */}
          <AnimatePresence>
            {activeDropdown && (
              <motion.div
                key="nav-unified-popup"
                initial={{
                  opacity: 0,
                  y: 10,
                  scale: 0.96,
                  left: triggerPos.left,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  left: triggerPos.left,
                }}
                exit={{
                  opacity: 0,
                  y: -6,
                  scale: 0.95,
                  transition: { duration: 0.16, ease: [0.16, 1, 0.3, 1] },
                }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  originX: triggerPos.originRatio,
                  originY: 0,
                  transformOrigin: `${triggerPos.originX}px 0px`,
                }}
                className="top-full z-50 absolute pt-2 pointer-events-auto"
                onMouseEnter={() => {
                  if (timeoutRef.current) clearTimeout(timeoutRef.current);
                }}
                onMouseLeave={handleMouseLeave}
              >
                <motion.div
                  layout="size"
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-[#faf8f3] shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-4 border border-[#e5e1d4] rounded-3xl overflow-hidden text-zinc-900"
                  style={{
                    width: activeDropdown === "policies" ? 520 : activeDropdown === "company" ? 480 : 460,
                    originX: triggerPos.originRatio,
                    originY: 0,
                    transformOrigin: `${triggerPos.originX}px 0px`,
                  }}
                >
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={activeDropdown}
                      initial={{ opacity: 0, x: activeDropdown === "policies" ? -8 : 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: activeDropdown === "policies" ? 8 : -8 }}
                      transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {/* 1. Policies Content */}
                      {activeDropdown === "policies" && (
                        <div>
                          <div className="flex justify-between items-center mb-3 pb-3 border-[#ece8dc] border-b">
                            <div className="flex items-center gap-2.5">
                              <div className="flex justify-center items-center bg-emerald-100 rounded-lg w-8 h-8 text-emerald-800">
                                <ScrollText className="stroke-[2] w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="font-display font-bold text-zinc-950 text-sm leading-tight">
                                  Governance &amp; Trust Policies
                                </h4>
                                <p className="text-[11px] text-zinc-600 font-sans">
                                  SuryaNexa B2B Procurement Standards
                                </p>
                              </div>
                            </div>
                            <span className="inline-flex items-center gap-1 bg-emerald-50 px-2 py-0.5 border border-emerald-200/80 rounded-full font-mono font-bold text-[10px] text-emerald-800">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> MNRE Compliant
                            </span>
                          </div>

                          {/* 4 Core Pillars Grid */}
                          <div className="grid grid-cols-2 gap-2.5 mb-3">
                            <div className="p-2.5 bg-white/80 border border-[#ece8dc] rounded-xl hover:bg-emerald-50/50 transition-colors">
                              <div className="flex items-center gap-1.5 mb-1 text-emerald-800">
                                <Shield className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                                <strong className="font-display font-bold text-xs text-zinc-950">Blind-Vault™ Privacy</strong>
                              </div>
                              <p className="text-[11px] text-zinc-700 font-sans leading-relaxed">
                                Client rooftop GPS coordinates and project margins remain cryptographically sealed. Zero internal lead poaching.
                              </p>
                            </div>

                            <div className="p-2.5 bg-white/80 border border-[#ece8dc] rounded-xl hover:bg-emerald-50/50 transition-colors">
                              <div className="flex items-center gap-1.5 mb-1 text-emerald-800">
                                <Camera className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                                <strong className="font-display font-bold text-xs text-zinc-950">180s Video Escrow</strong>
                              </div>
                              <p className="text-[11px] text-zinc-700 font-sans leading-relaxed">
                                Pallet payout unlocks upon QR scanning &amp; 180s unboxing video proof. Instant carrier insurance for micro-cracks.
                              </p>
                            </div>

                            <div className="p-2.5 bg-white/80 border border-[#ece8dc] rounded-xl hover:bg-emerald-50/50 transition-colors">
                              <div className="flex items-center gap-1.5 mb-1 text-emerald-800">
                                <FileCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                                <strong className="font-display font-bold text-xs text-zinc-950">ALMM &amp; BIS Mandate</strong>
                              </div>
                              <p className="text-[11px] text-zinc-700 font-sans leading-relaxed">
                                100% Tier-1 Approved List of Models &amp; Manufacturers only. No refurbished, non-ALMM or gray stock permitted.
                              </p>
                            </div>

                            <div className="p-2.5 bg-white/80 border border-[#ece8dc] rounded-xl hover:bg-emerald-50/50 transition-colors">
                              <div className="flex items-center gap-1.5 mb-1 text-emerald-800">
                                <Scale className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                                <strong className="font-display font-bold text-xs text-zinc-950">48h Rapid Arbitration</strong>
                              </div>
                              <p className="text-[11px] text-zinc-700 font-sans leading-relaxed">
                                Bound technical dispute mediation with OEM factory flash reports. Rapid capital clearance without frozen funds.
                              </p>
                            </div>
                          </div>

                          {/* Footer Protocol Banner */}
                          <div className="flex items-center justify-between px-3 py-2 bg-emerald-900/5 border border-emerald-800/10 rounded-xl text-[11px]">
                            <span className="text-zinc-700 font-sans">
                              Governed by <strong>SuryaNexa Bonded Escrow Terms</strong>.
                            </span>
                            <a
                              href="/#friction"
                              onClick={() => setActiveDropdown(null)}
                              className="font-bold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1 ml-2 transition-colors"
                            >
                              <span>Review Protocol</span>
                              <ArrowRight className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      )}

                      {/* 2. About Us Content */}
                      {activeDropdown === "company" && (
                        <div>
                          <span className="block mb-1 font-sans font-bold text-emerald-800 text-xs uppercase tracking-wider">
                            ABOUT SURYANEXA
                          </span>
                          <h4 className="mb-2 font-display font-bold text-zinc-950 text-base">
                            Democratizing India&apos;s Solar Procurement
                          </h4>
                          <p className="mb-4 font-sans text-zinc-700 text-xs leading-relaxed">
                            SuryaNexa connects verified equipment stockists directly to regional EPCs, removing ghost brokers and transit disputes.
                          </p>
                          <div className="gap-3 grid grid-cols-2 text-xs">
                            <a href="/#pillars" className="block bg-white/80 hover:bg-emerald-50 p-3 border border-[#ece8dc] rounded-lg transition-colors">
                              <strong className="block mb-0.5 text-zinc-950">7 Connected Pillars</strong>
                              <span className="text-[11px] text-zinc-700">Unified operations for EPCs, traders and installers.</span>
                            </a>
                            <a href="/#friction" className="block bg-white/80 hover:bg-emerald-50 p-3 border border-[#ece8dc] rounded-lg transition-colors">
                              <strong className="block mb-0.5 text-zinc-950">Bonded Warehouses</strong>
                              <span className="text-[11px] text-zinc-700">Ex-depot allocations across Mundra, Surat and Noida.</span>
                            </a>
                          </div>
                        </div>
                      )}

                      {/* 3. Contact Us Content */}
                      {activeDropdown === "contact" && (
                        <div>
                          <span className="block mb-3 font-sans font-bold text-emerald-800 text-xs uppercase tracking-wider">
                            DIRECT REGIONAL DESKS
                          </span>
                          <div className="gap-3 grid grid-cols-3 text-xs">
                            <div className="bg-white/80 p-3 border border-[#ece8dc] rounded-lg">
                              <PhoneCall className="mb-1.5 w-4 h-4 text-emerald-700" />
                              <h5 className="font-display font-bold text-zinc-950">EPC Desk</h5>
                              <p className="mt-1 font-mono font-medium text-[11px] text-zinc-700">+91 1800-SURYA</p>
                            </div>
                            <div className="bg-white/80 p-3 border border-[#ece8dc] rounded-lg">
                              <Mail className="mb-1.5 w-4 h-4 text-emerald-700" />
                              <h5 className="font-display font-bold text-zinc-950">Trader Desk</h5>
                              <p className="mt-1 font-mono font-medium text-[11px] text-zinc-700 truncate">traders@suryanexa.com</p>
                            </div>
                            <div className="bg-white/80 p-3 border border-[#ece8dc] rounded-lg">
                              <Building className="mb-1.5 w-4 h-4 text-emerald-700" />
                              <h5 className="font-display font-bold text-zinc-950">Central Hub</h5>
                              <p className="mt-1 font-medium text-[11px] text-zinc-700">Surat · Pune · NCR</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* =========================================================================
            3. RIGHT: SEPARATE SIGN UP & LOG IN BUTTONS WITH REDESIGNED ANIMATION
               - Log In: iOS rounded rectangle with subtle surface & active scale
               - Sign Up: High-contrast emerald button with active scale & micro-translation
           ========================================================================= */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          
          {/* Notification Bell in Circular Frame - renders ONLY after login */}
          {isLoggedIn && (
            <div ref={notificationsRef} className="relative">
              <button
                onClick={() => {
                  setActivePopup((prev) => (prev === "activities" ? null : "activities"));
                  setActiveDropdown(null);
                }}
                title="Notifications"
                className="relative flex justify-center items-center bg-white/90 hover:bg-white shadow-xs border border-[#e2ddd0] rounded-full w-10 h-10 text-zinc-700 hover:text-zinc-950 active:scale-[0.97] transition-all cursor-pointer"
              >
                <Bell className="stroke-[2] w-4 h-4 text-zinc-700" />
                <span className="top-2.5 right-2.5 absolute bg-emerald-500 rounded-full w-2 h-2 animate-pulse" />
              </button>

              {/* Activities Dropdown Panel */}
              <AnimatePresence>
                {showActivities && (
                  <motion.div
                    style={{ transformOrigin: "top right" }}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{
                      opacity: 0,
                      y: 10,
                      scale: 0.95,
                      transition: { duration: 0.144, ease: [0.16, 1, 0.3, 1] },
                    }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="top-full right-0 z-50 absolute bg-[#faf8f3] shadow-xl mt-2 p-4 border border-[#e5e1d4] rounded-2xl w-72 font-sans text-zinc-900 text-xs"
                  >
                    <div className="flex justify-between items-center mb-2 pb-2 border-[#ece8dc] border-b">
                      <span className="flex items-center gap-1.5 font-display font-bold text-zinc-950">
                        <Activity className="w-3.5 h-3.5 text-emerald-600" /> Live Feed
                      </span>
                      <span className="bg-emerald-100/70 px-2 py-0.5 rounded-full font-bold text-[10px] text-emerald-800">
                        2 Unread
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-white p-2.5 border border-[#ece8dc] rounded-xl">
                        <p className="font-bold text-[11px] text-zinc-900">PO #SX-2841 in Transit</p>
                        <p className="mt-0.5 text-[10.5px] text-zinc-600">54x TOPCon 585W arriving Pune depot.</p>
                      </div>
                      <div className="bg-white p-2.5 border border-[#ece8dc] rounded-xl">
                        <p className="font-bold text-[11px] text-zinc-900">Lead #4821 Sealed</p>
                        <p className="mt-0.5 text-[10.5px] text-zinc-600">Blind-Vault protected 120kW commercial bid.</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Separate "Log In" & "Sign Up" Buttons (Logged Out) or Profile Hub (Logged In) */}
          <AnimatePresence>
            {!isLoggedIn ? (
              <div key="auth-btn-cluster" className="flex items-center gap-2 sm:gap-2.5">
                {/* Log In Button */}
                <Link
                  key="login-btn"
                  href="/login"
                  className={`flex justify-center items-center shadow-2xs hover:shadow-xs px-3.5 sm:px-4 py-2 border rounded-xl font-bold text-xs sm:text-sm leading-none active:scale-[0.97] transition-all duration-200 cursor-pointer ${
                    scrolled
                      ? "bg-white/80 hover:bg-[#f2ecdf] border-[#dcd6c8] hover:border-zinc-400 text-zinc-800 hover:text-zinc-950"
                      : "bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-sm shadow-none"
                  }`}
                >
                  <span>Log In</span>
                </Link>

                {/* Sign Up Button */}
                <Link
                  key="signup-btn"
                  href="/login?tab=signup"
                  className={`group flex justify-center items-center gap-1.5 shadow-sm hover:shadow-md px-4 sm:px-5 py-2 rounded-xl font-bold text-white text-xs sm:text-sm leading-none active:scale-[0.97] transition-all duration-200 cursor-pointer ${
                    scrolled
                      ? "bg-emerald-700 hover:bg-emerald-800 shadow-emerald-950/20"
                      : "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-950/40"
                  }`}
                >
                  <span>Sign Up</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-200 group-hover:text-white transition-all group-hover:translate-x-0.5 duration-200 shrink-0" />
                </Link>
              </div>
            ) : (
              <div key="user-circular-hub" ref={userMenuRef} className="relative">
                {/* Circular box containing the image of the person, or initials if no image */}
                <button
                  type="button"
                  onClick={() => {
                    setActivePopup((prev) => (prev === "user" ? null : "user"));
                    setActiveDropdown(null);
                  }}
                  title={`${displayName} (${userData?.role || "User"})`}
                  className="flex justify-center items-center bg-white shadow-xs hover:shadow-md p-0.5 border-2 border-emerald-600/40 hover:border-emerald-600 rounded-full w-10 h-10 overflow-hidden active:scale-[0.97] transition-all cursor-pointer"
                >
                  {userAvatar ? (
                    <img
                      src={userAvatar}
                      alt={displayName}
                      className="rounded-full w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex justify-center items-center bg-emerald-700 rounded-full w-full h-full font-bold text-white text-xs uppercase tracking-wider select-none">
                      {userInitials}
                    </div>
                  )}
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      style={{ transformOrigin: "top right" }}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{
                        opacity: 0,
                        y: 10,
                        scale: 0.95,
                        transition: { duration: 0.144, ease: [0.16, 1, 0.3, 1] },
                      }}
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                      className="top-full right-0 z-50 absolute bg-[#faf8f3] shadow-xl mt-2 p-2 border border-[#e5e1d4] rounded-2xl w-60 font-sans text-zinc-900 text-xs"
                    >
                      <div className="flex items-center gap-3 px-3 py-2.5 border-[#ece8dc] border-b">
                        <div className="flex justify-center items-center bg-white border border-emerald-600/30 rounded-full w-9 h-9 overflow-hidden shrink-0">
                          {userAvatar ? (
                            <img src={userAvatar} alt={displayName} className="w-full h-full object-cover" />
                          ) : (
                            <div className="flex justify-center items-center bg-emerald-700 w-full h-full font-bold text-white text-xs uppercase">
                              {userInitials}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-display font-bold text-zinc-950 text-xs truncate">{displayName}</p>
                          <p className="text-[10px] text-zinc-500 truncate">{displayEmail}</p>
                        </div>
                      </div>
                      <div className="py-1">
                        <Link
                          href="/trader/dashboard"
                          onClick={() => setActivePopup(null)}
                          className="flex justify-between items-center hover:bg-white px-3 py-2 rounded-lg font-semibold text-zinc-900"
                        >
                          <span className="flex items-center gap-2">
                            <span className="bg-emerald-600 rounded-full w-1.5 h-1.5" />
                            <span>Trader Dashboard</span>
                          </span>
                          <span className="bg-emerald-50 px-1.5 py-0.5 border border-emerald-200 rounded font-sans font-bold text-[10px] text-emerald-800">
                            TERMINAL
                          </span>
                        </Link>
                        <Link
                          href={userData?.role?.toUpperCase().includes("VENDOR") ? "/vendor/profile" : "/trader/profile"}
                          onClick={() => setActivePopup(null)}
                          className="flex justify-between items-center hover:bg-white px-3 py-2 rounded-lg font-semibold text-zinc-900"
                        >
                          <span className="flex items-center gap-2">
                            <span className="bg-zinc-400 rounded-full w-1.5 h-1.5" />
                            {userData?.role?.toUpperCase().includes("VENDOR") ? "Vendor Profile" : "KYC & Verification"}
                          </span>
                          <span className="bg-zinc-100 px-1.5 py-0.5 border border-zinc-200 rounded font-sans font-bold text-[10px] text-zinc-700">
                            {userData?.role?.toUpperCase().includes("VENDOR") ? "PLANS" : "KYC"}
                          </span>
                        </Link>
                        <a href="/#friction" className="flex justify-between items-center hover:bg-white px-3 py-1.5 rounded-lg text-zinc-700 hover:text-zinc-950">
                          <span>Trading Terms & Escrow</span>
                          <ExternalLink className="w-3 h-3 text-zinc-400" />
                        </a>
                      </div>
                      <div className="pt-1 border-[#ece8dc] border-t">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 hover:bg-rose-50 px-3 py-2 rounded-lg w-full font-semibold text-rose-600 text-left cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </AnimatePresence>

          {/* Mobile Hamburger Menu Toggle Button */}
          <button
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              setActivePopup(null);
              setActiveDropdown(null);
            }}
            className={`lg:hidden flex justify-center items-center rounded-full w-10 h-10 transition-colors cursor-pointer border ${
              scrolled
                ? "bg-white/90 hover:bg-white border-[#e2ddd0] text-zinc-800"
                : "bg-white/10 hover:bg-white/20 border-white/20 text-white"
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Global Transparent Backdrop to dismiss popups when clicking anywhere outside */}
      {activePopup && (
        <div
          className="fixed inset-0 z-40 bg-transparent"
          onClick={() => setActivePopup(null)}
          aria-hidden="true"
        />
      )}

      {/* =========================================================================
          4. MOBILE FULL-WIDTH DRAWER MENU (BACKGROUND #FAF8F3)
         ========================================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            style={{ transformOrigin: "top right" }}
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{
              opacity: 0,
              height: 0,
              scale: 0.95,
              transition: { duration: 0.16, ease: [0.16, 1, 0.3, 1] },
            }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-[#faf8f3] shadow-xl px-6 py-6 border-[#ece8dc] border-t overflow-hidden"
          >
            <div className="space-y-4">
              <div className="flex flex-col space-y-2 font-sans font-semibold text-zinc-800 text-sm">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2.5 rounded-xl flex items-center justify-between ${
                    activeLink === "home" ? "bg-[#f2ecdf] text-zinc-950 font-bold" : "hover:bg-black/[0.04]"
                  }`}
                >
                  <span>Home</span>
                </Link>
                <Link
                  href="/#pricing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:bg-black/[0.04] p-2.5 rounded-xl"
                >
                  Pricing
                </Link>
                <Link
                  href="/#friction"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:bg-black/[0.04] p-2.5 rounded-xl"
                >
                  Policies
                </Link>
                {isLoggedIn && (
                  <Link
                    href="/trader/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex justify-between items-center bg-emerald-50/70 p-2.5 rounded-xl text-emerald-950 font-bold border border-emerald-200"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                      <span>Trader Operations Console</span>
                    </span>
                    <span className="bg-emerald-700 px-2 py-0.5 rounded text-white font-mono font-bold text-[10px]">
                      DASHBOARD
                    </span>
                  </Link>
                )}
                <Link
                  href={
                    isLoggedIn
                      ? (userData?.role?.toUpperCase().includes("VENDOR") ? "/vendor/profile" : "/trader/profile")
                      : "/login?redirect=/profile"
                  }
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex justify-between items-center hover:bg-black/[0.04] p-2.5 rounded-xl text-zinc-900"
                >
                  <span className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isLoggedIn ? "bg-emerald-600" : "bg-zinc-400"}`} />
                    {isLoggedIn
                      ? (userData?.role?.toUpperCase().includes("VENDOR") ? "Vendor Profile & Plans" : "Trader Profile & KYC")
                      : "Access Profile Portal"}
                  </span>
                  <span className="bg-emerald-50 px-2 py-0.5 border border-emerald-200 rounded font-mono font-bold text-[10px] text-emerald-800">
                    {isLoggedIn ? "PORTAL" : "LOGIN"}
                  </span>
                </Link>
                <Link
                  href="/#pillars"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:bg-black/[0.04] p-2.5 rounded-xl"
                >
                  About Us
                </Link>
                <Link
                  href="/#pilot-cta"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:bg-black/[0.04] p-2.5 rounded-xl"
                >
                  Contact Us
                </Link>
              </div>

              {/* Mobile Contact Quick Strip */}
              <div className="gap-2 grid grid-cols-2 pt-3 border-[#ece8dc] border-t font-sans text-xs">
                <div className="bg-white p-3 border border-[#ece8dc] rounded-xl">
                  <p className="font-bold text-zinc-900">EPC Hotline</p>
                  <p className="mt-0.5 font-mono text-[11px] text-zinc-600">1800-SURYA-NEXA</p>
                </div>
                <div className="bg-white p-3 border border-[#ece8dc] rounded-xl">
                  <p className="font-bold text-zinc-900">Trader Desk</p>
                  <p className="mt-0.5 font-mono text-[11px] text-zinc-600">traders@suryanexa.com</p>
                </div>
              </div>

              {/* Mobile Separate Auth Buttons or User Info */}
              <div className="pt-2">
                {isLoggedIn ? (
                  <div className="flex justify-between items-center bg-white p-3 border border-[#ece8dc] rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="flex justify-center items-center bg-white border border-emerald-600/30 rounded-full w-10 h-10 overflow-hidden shrink-0">
                        {userAvatar ? (
                          <img src={userAvatar} alt={displayName} className="w-full h-full object-cover" />
                        ) : (
                          <div className="flex justify-center items-center bg-emerald-700 w-full h-full font-bold text-white text-xs uppercase">
                            {userInitials}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-zinc-950 text-xs truncate">{displayName}</p>
                        <p className="text-[10px] text-zinc-500 truncate">{displayEmail}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg font-bold text-rose-600 text-xs transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="gap-3 grid grid-cols-2">
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex justify-center items-center bg-white shadow-2xs py-2.5 border border-zinc-300 rounded-xl font-bold text-zinc-900 text-sm active:scale-[0.97] transition-all"
                    >
                      Log In
                    </Link>
                    <Link
                      href="/login?tab=signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex justify-center items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 shadow-sm py-2.5 rounded-xl font-bold text-white text-sm active:scale-[0.97] transition-all"
                    >
                      <span>Sign Up</span>
                      <ArrowRight className="w-4 h-4 text-emerald-200" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
