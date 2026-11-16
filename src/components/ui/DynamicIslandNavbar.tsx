"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  PhoneCall,
  Bell,
  LogOut,
  FileText,
  ShieldCheck,
  Lock,
  ArrowRight,
  Scale,
  ScrollText,
  Building,
  Mail,
  CheckCircle2,
  ExternalLink,
  User
} from "lucide-react";
import { toast } from "sonner";

export default function DynamicIslandNavbar() {
  const [activeMenu, setActiveMenu] = useState<"about" | "contact" | "policies" | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showActivities, setShowActivities] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (menu: "about" | "contact" | "policies") => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 220);
  };

  const handleLoginToggle = () => {
    if (!isLoggedIn) {
      setIsLoggedIn(true);
      toast.success("Welcome back, Rajesh Sharma · Verified EPC Vendor");
    }
  };

  const handleLogout = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoggedIn(false);
    setShowUserMenu(false);
    setShowActivities(false);
    toast.info("Logged out successfully");
  };

  return (
    <header className="top-0 right-0 left-0 z-50 fixed px-4 sm:px-6 pt-3 w-full pointer-events-none">
      <div className="flex justify-between items-center mx-auto max-w-7xl">
        {/* TOP LEFT: SuryaNEXA Brand Logo & Name */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <Link href="#top" className="group flex items-center gap-2.5">
            <img
              src="/suryanexa-logo.png"
              alt="SuryaNexa Logo"
              className="drop-shadow-sm w-10 h-10 object-contain group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-zinc-950 text-xl leading-none tracking-tight">
                <span>Surya</span>
                <span className="text-emerald-700">NEXA</span>
              </span>
            </div>
          </Link>
        </div>

        {/* CENTER: Dynamic Island Capsule (About Us, Contact Us, Policies) */}
        <div
          className="relative pointer-events-auto"
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            layout
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-1 sm:gap-2 bg-white/90 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-2xl px-3 py-1.5 border border-zinc-200 hover:border-zinc-300 rounded-full transition-colors"
          >
            {/* About Us */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("about")}
            >
              <button
                className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-semibold transition-all duration-200 cursor-pointer ${
                  activeMenu === "about"
                    ? "bg-zinc-100 text-zinc-950 shadow-xs"
                    : "text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50"
                }`}
              >
                About Us
              </button>
            </div>

            {/* Contact Us */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("contact")}
            >
              <button
                className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-semibold transition-all duration-200 cursor-pointer ${
                  activeMenu === "contact"
                    ? "bg-zinc-100 text-zinc-950 shadow-xs"
                    : "text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50"
                }`}
              >
                Contact Us
              </button>
            </div>

            {/* Policies (Highlight Pill as in Hand-Drawn Sketch) */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("policies")}
            >
              <button
                className={`px-4 py-1.5 rounded-full text-xs font-sans transition-all duration-200 flex items-center gap-1.5 cursor-pointer font-bold ${
                  activeMenu === "policies"
                    ? "bg-emerald-700 text-white shadow-md shadow-emerald-700/25"
                    : "bg-emerald-600/10 text-emerald-800 border border-emerald-600/20 hover:bg-emerald-700 hover:text-white"
                }`}
              >
                <span>Policies</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMenu === "policies" ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </motion.div>

          {/* DROPDOWN CARDS ANCHORED BELOW DYNAMIC ISLAND */}
          <AnimatePresence>
            {/* 1. POLICIES DROPDOWN CARD (Directly Replicating Hand-Drawn Sketch Layout) */}
            {activeMenu === "policies" && (
              <motion.div
                style={{ transformOrigin: "top center", originY: 0 }}
                initial={{ opacity: 0, y: 36, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  y: -28,
                  scale: 0.90,
                  transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
                }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => handleMouseEnter("policies")}
                onMouseLeave={handleMouseLeave}
                className="top-full left-1/2 absolute pt-3 w-[560px] sm:w-[640px] max-w-[92vw] -translate-x-1/2"
              >
                <div className="bg-white/95 shadow-[0_20px_60px_rgba(0,0,0,0.12)] backdrop-blur-2xl p-6 sm:p-7 border border-zinc-200 rounded-3xl text-zinc-900">
                  {/* Top Header: Parchment/Scroll Illustration with 'Policies' */}
                  <div className="flex justify-between items-center mb-5 pb-4 border-zinc-100 border-b">
                    <div className="flex items-center gap-3">
                      <div className="flex justify-center items-center bg-emerald-50 shadow-xs border border-emerald-200/80 rounded-2xl w-10 h-10 text-emerald-700">
                        <ScrollText className="stroke-[2.2] w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-zinc-950 text-base leading-tight">
                          Governance &amp; Policies
                        </h3>
                        <p className="font-sans font-medium text-[11px] text-zinc-600">
                          Trust architecture protecting traders, installers, and project margins
                        </p>
                      </div>
                    </div>
                    <span className="bg-zinc-100 px-2.5 py-1 border border-zinc-200 rounded-full font-sans font-bold text-[10px] text-zinc-700">
                      LEGAL SPEC V2.4
                    </span>
                  </div>

                  {/* Middle Section: 2 Columns (Bullets on Left, Compliance Preview on Right) */}
                  <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 mb-5 pb-5 border-zinc-100 border-b">
                    {/* Left Column: Key Policy Guarantees */}
                    <div className="space-y-3">
                      <span className="block font-sans font-bold text-[10px] text-emerald-800 uppercase tracking-wider">
                        Core Protections
                      </span>
                      <ul className="space-y-2.5 font-sans text-xs stagger-rows">
                        <li className="flex items-start gap-2 text-zinc-800 transition-all duration-200" style={{ transitionDelay: "0ms" }}>
                          <CheckCircle2 className="mt-0.5 w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span><strong>Blind-Vault Privacy:</strong> Zero consumer lead leakage to competitors.</span>
                        </li>
                        <li className="flex items-start gap-2 text-zinc-800 transition-all duration-200" style={{ transitionDelay: "30ms" }}>
                          <CheckCircle2 className="mt-0.5 w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span><strong>180s Video Escrow:</strong> Payout released upon verified unboxing footage.</span>
                        </li>
                        <li className="flex items-start gap-2 text-zinc-800 transition-all duration-200" style={{ transitionDelay: "60ms" }}>
                          <CheckCircle2 className="mt-0.5 w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span><strong>ALMM &amp; BIS Only:</strong> 100% compliant Tier-1 module &amp; inverter list.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Right Column: Featured Compliance Box as shown in sketch */}
                    <div className="flex flex-col justify-between bg-zinc-50/80 p-4 border border-zinc-200 rounded-2xl">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="flex items-center gap-1.5 font-display font-bold text-[11px] text-zinc-950">
                            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Dispute Shield
                          </span>
                          <span className="bg-emerald-100/70 px-2 py-0.5 rounded-full font-sans font-semibold text-[10px] text-emerald-700">
                            100% Insured
                          </span>
                        </div>
                        <p className="font-sans text-[11px] text-zinc-600 leading-relaxed">
                          All transit consignments tracked via GPS telematics with automated damaged pallet insurance settlement.
                        </p>
                      </div>
                      <a
                        href="#escrow"
                        className="inline-flex items-center gap-1 mt-3 font-display font-bold text-[11px] text-emerald-700 hover:text-emerald-800 transition-colors"
                      >
                        Read Escrow Guidelines <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Bottom Section: 4-Column Legal Category Links (From Hand-Drawn Sketch) */}
                  <div className="gap-4 grid grid-cols-2 sm:grid-cols-4 font-sans text-xs">
                    <div>
                      <span className="block mb-1.5 font-sans font-bold text-[10px] text-zinc-500 uppercase tracking-wider">
                        Trading Terms
                      </span>
                      <ul className="space-y-1 font-medium text-zinc-700">
                        <li><a href="#terms" className="hover:text-emerald-700 transition-colors">Terms of Service</a></li>
                        <li><a href="#code" className="hover:text-emerald-700 transition-colors">Trader Code</a></li>
                      </ul>
                    </div>

                    <div>
                      <span className="block mb-1.5 font-sans font-bold text-[10px] text-zinc-500 uppercase tracking-wider">
                        Privacy Vault
                      </span>
                      <ul className="space-y-1 font-medium text-zinc-700">
                        <li><a href="#privacy" className="hover:text-emerald-700 transition-colors">Privacy Policy</a></li>
                        <li><a href="#lead-vault" className="hover:text-emerald-700 transition-colors">Lead Ownership</a></li>
                      </ul>
                    </div>

                    <div>
                      <span className="block mb-1.5 font-sans font-bold text-[10px] text-zinc-500 uppercase tracking-wider">
                        Settlements
                      </span>
                      <ul className="space-y-1 font-medium text-zinc-700">
                        <li><a href="#escrow-policy" className="hover:text-emerald-700 transition-colors">Escrow Terms</a></li>
                        <li><a href="#returns" className="hover:text-emerald-700 transition-colors">Transit Claims</a></li>
                      </ul>
                    </div>

                    <div>
                      <span className="block mb-1.5 font-sans font-bold text-[10px] text-zinc-500 uppercase tracking-wider">
                        Technical SLAs
                      </span>
                      <ul className="space-y-1 font-medium text-zinc-700">
                        <li><a href="#discom-sla" className="hover:text-emerald-700 transition-colors">DISCOM SLAs</a></li>
                        <li><a href="#warranties" className="hover:text-emerald-700 transition-colors">Warranty Backing</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. ABOUT US DROPDOWN CARD */}
            {activeMenu === "about" && (
              <motion.div
                style={{ transformOrigin: "top center", originY: 0 }}
                initial={{ opacity: 0, y: 36, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  y: -28,
                  scale: 0.90,
                  transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
                }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => handleMouseEnter("about")}
                onMouseLeave={handleMouseLeave}
                className="top-full left-1/2 absolute pt-3 w-[500px] max-w-[92vw] -translate-x-1/2"
              >
                <div className="bg-white/95 shadow-[0_20px_60px_rgba(0,0,0,0.12)] backdrop-blur-2xl p-6 border border-zinc-200 rounded-3xl text-zinc-900">
                  <div className="gap-6 grid grid-cols-1 sm:grid-cols-2">
                    <div>
                      <span className="font-sans font-bold text-zinc-500 text-xs uppercase tracking-wider">
                        About SuryaNexa
                      </span>
                      <h3 className="mt-1.5 font-display font-bold text-zinc-950 text-base leading-snug">
                        Democratizing India's Solar Procurement
                      </h3>
                      <p className="mt-2 font-sans text-zinc-600 text-xs leading-relaxed">
                        SuryaNexa connects verified equipment stockists directly to regional EPCs, removing ghost brokers and transit disputes.
                      </p>
                    </div>
                    <div className="space-y-2.5 font-sans text-xs">
                      <a href="#network" className="group block bg-zinc-50 hover:bg-emerald-50/60 p-3 border border-zinc-200/80 rounded-2xl transition-colors">
                        <strong className="block font-display text-zinc-950 group-hover:text-emerald-700">Bonded Supply Network</strong>
                        <span className="text-[11px] text-zinc-600">Direct ex-depot allocations across Mundra, Surat &amp; Noida.</span>
                      </a>
                      <a href="#pillars" className="group block bg-zinc-50 hover:bg-emerald-50/60 p-3 border border-zinc-200/80 rounded-2xl transition-colors">
                        <strong className="block font-display text-zinc-950 group-hover:text-emerald-700">7 Connected Pillars</strong>
                        <span className="text-[11px] text-zinc-600">Traders, installers, consultants, and utilities on one ledger.</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3. CONTACT US DROPDOWN CARD */}
            {activeMenu === "contact" && (
              <motion.div
                style={{ transformOrigin: "top center", originY: 0 }}
                initial={{ opacity: 0, y: 36, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  y: -28,
                  scale: 0.90,
                  transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
                }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => handleMouseEnter("contact")}
                onMouseLeave={handleMouseLeave}
                className="top-full left-1/2 absolute pt-3 w-[520px] max-w-[92vw] -translate-x-1/2"
              >
                <div className="bg-white/95 shadow-[0_20px_60px_rgba(0,0,0,0.12)] backdrop-blur-2xl p-6 border border-zinc-200 rounded-3xl text-zinc-900">
                  <span className="block mb-3 font-sans font-bold text-emerald-700 text-xs uppercase tracking-wider">
                    Direct Network Desks
                  </span>
                  <div className="gap-3 grid grid-cols-1 sm:grid-cols-3 font-sans text-xs">
                    <div className="bg-zinc-50 p-3.5 border border-zinc-200/80 rounded-2xl">
                      <PhoneCall className="mb-2 w-4 h-4 text-emerald-700" />
                      <h4 className="font-display font-bold text-zinc-950">EPC Desk</h4>
                      <p className="mt-1 font-medium text-[11px] text-zinc-600">+91 1800-SURYA-NEXA</p>
                    </div>
                    <div className="bg-zinc-50 p-3.5 border border-zinc-200/80 rounded-2xl">
                      <Mail className="mb-2 w-4 h-4 text-emerald-700" />
                      <h4 className="font-display font-bold text-zinc-950">Trader Desk</h4>
                      <p className="mt-1 font-medium text-[11px] text-zinc-600">traders@suryanexa.com</p>
                    </div>
                    <div className="bg-zinc-50 p-3.5 border border-zinc-200/80 rounded-2xl">
                      <Building className="mb-2 w-4 h-4 text-emerald-700" />
                      <h4 className="font-display font-bold text-zinc-950">Central Hub</h4>
                      <p className="mt-1 font-medium text-[11px] text-zinc-600">Surat · Pune · Delhi</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT: Action Cluster (Book Call + Morphing Login / Profile Hub) */}
        <div className="flex items-center gap-2.5 pointer-events-auto">
          {/* Pill Button: Book Call */}
          <a
            href="#pilot-cta"
            className="inline-flex items-center gap-1.5 bg-white hover:bg-zinc-50 shadow-xs px-4 py-2 border border-zinc-200/90 hover:border-zinc-300 rounded-full font-sans font-bold text-zinc-800 text-xs transition-all duration-200"
          >
            <PhoneCall className="w-3.5 h-3.5 text-zinc-700" />
            <span className="hidden sm:inline">Book Call</span>
          </a>

          {/* Morphing Auth Cluster with overlapping transitions */}
          <AnimatePresence>
            {!isLoggedIn ? (
              /* State A: Single Pill Button 'Login / Sign up' */
              <motion.button
                key="login-btn"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  transition: { duration: 0.16, ease: [0.16, 1, 0.3, 1] },
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                onClick={handleLoginToggle}
                className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 shadow-emerald-700/20 shadow-md hover:shadow-lg px-5 py-2 rounded-full font-display font-bold text-white text-xs active:scale-[0.97] transition-all duration-200 cursor-pointer"
              >
                <span>Login / Sign up</span>
              </motion.button>
            ) : (
              /* State B: Split into (1) Notification Circle Bell + (2) Rounded Rectangle Profile Hub */
              <motion.div
                key="user-hub"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex items-center gap-2"
              >
                {/* 1. Circle Button with Bell Icon (my activities as sketched) */}
                <div className="relative">
                  <button
                    onClick={() => setShowActivities(!showActivities)}
                    title="My Activities"
                    className="relative flex justify-center items-center bg-white shadow-xs border border-zinc-200 hover:border-zinc-300 rounded-full w-9 h-9 text-zinc-700 hover:text-zinc-950 transition-all duration-200 cursor-pointer"
                  >
                    <Bell className="w-4 h-4 text-zinc-700" />
                    <span className="top-1.5 right-1.5 absolute bg-emerald-500 rounded-full w-2 h-2 animate-pulse" />
                  </button>

                  {/* My Activities Dropdown */}
                  <AnimatePresence>
                    {showActivities && (
                      <motion.div
                        style={{ transformOrigin: "top right" }}
                        initial={{ opacity: 0, y: 6, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{
                          opacity: 0,
                          y: -6,
                          scale: 0.95,
                          transition: { duration: 0.144, ease: [0.16, 1, 0.3, 1] },
                        }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className="top-full right-0 z-50 absolute bg-white shadow-xl mt-2 p-4 border border-zinc-200 rounded-2xl w-72 font-sans text-zinc-900 text-xs"
                      >
                        <div className="flex justify-between items-center mb-2 pb-2 border-zinc-100 border-b">
                          <span className="font-display font-bold text-zinc-950">My Activities</span>
                          <span className="bg-emerald-50 px-2 py-0.5 rounded-full font-semibold text-[10px] text-emerald-700">2 Live</span>
                        </div>
                        <div className="space-y-2">
                          <div className="bg-zinc-50 p-2.5 border border-zinc-100 rounded-xl">
                            <p className="font-semibold text-zinc-900">PO #SX-2841 in Transit</p>
                            <p className="mt-0.5 text-[11px] text-zinc-600">54x TOPCon 585W modules arriving Pune hub.</p>
                          </div>
                          <div className="bg-zinc-50 p-2.5 border border-zinc-100 rounded-xl">
                            <p className="font-semibold text-zinc-900">Lead #4821 Sealed</p>
                            <p className="mt-0.5 text-[11px] text-zinc-600">Blind-Vault protected commercial inquiry.</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 2. Rounded Rectangle: User Profile Pic + Name + Logout (Matching sketch annotations) */}
                <div className="relative">
                  <div
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 bg-white shadow-xs py-1 pr-3 pl-1.5 border border-zinc-200 hover:border-zinc-300 rounded-full transition-all cursor-pointer"
                  >
                    {/* User profile pic */}
                    <div className="flex justify-center items-center bg-gradient-to-tr from-emerald-600 to-amber-500 shadow-xs rounded-full w-7 h-7 font-bold text-white text-xs">
                      RS
                    </div>
                    {/* User's name */}
                    <span className="max-w-[100px] sm:max-w-[120px] font-sans font-bold text-zinc-900 text-xs truncate">
                      Rajesh Sharma
                    </span>
                    {/* Quick Logout button icon */}
                    <button
                      onClick={handleLogout}
                      title="Log Out"
                      className="hover:bg-zinc-100 ml-1 p-1 rounded-full text-zinc-500 hover:text-rose-600 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Profile Menu Dropdown with 'Terms of Use' & 'Legal' as sketched */}
                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        style={{ transformOrigin: "top right" }}
                        initial={{ opacity: 0, y: 6, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{
                          opacity: 0,
                          y: -6,
                          scale: 0.95,
                          transition: { duration: 0.144, ease: [0.16, 1, 0.3, 1] },
                        }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className="top-full right-0 z-50 absolute bg-white shadow-xl mt-2 p-2 border border-zinc-200 rounded-2xl w-52 font-sans text-zinc-900 text-xs"
                      >
                        <div className="px-3 py-2 border-zinc-100 border-b">
                          <p className="font-display font-bold text-zinc-950">Rajesh Sharma</p>
                          <p className="text-[10px] text-zinc-500 truncate">rajesh@suntechepc.in</p>
                        </div>
                        <div className="py-1">
                          <a href="#terms" className="flex justify-between items-center hover:bg-zinc-50 px-3 py-2 rounded-xl text-zinc-700 hover:text-zinc-950 transition-colors">
                            <span>Terms of Use</span>
                            <ExternalLink className="w-3 h-3 text-zinc-400" />
                          </a>
                          <a href="#legal" className="flex justify-between items-center hover:bg-zinc-50 px-3 py-2 rounded-xl text-zinc-700 hover:text-zinc-950 transition-colors">
                            <span>Legal &amp; Privacy</span>
                            <ExternalLink className="w-3 h-3 text-zinc-400" />
                          </a>
                        </div>
                        <div className="pt-1 border-zinc-100 border-t">
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 hover:bg-rose-50 px-3 py-2 rounded-xl w-full font-semibold text-rose-600 text-left transition-colors"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
