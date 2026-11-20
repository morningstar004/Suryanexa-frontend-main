"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingCart,
  Boxes,
  ClipboardList,
  Store,
  Users,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

interface ExpandableTraderSidebarProps {
  userName?: string;
  userEmail?: string;
  userAvatar?: string | null;
  onLogout?: () => void;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export const SIDEBAR_ITEMS = [
  {
    label: "Overview",
    href: "/trader/dashboard",
    icon: LayoutDashboard,
    badge: "Live",
    badgeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    hasDot: true,
  },
  {
    label: "Sales & Orders",
    href: "/trader/sales-and-order",
    icon: ShoppingCart,
    badge: "12",
    badgeColor: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  },
  {
    label: "Pre-Dispatch",
    href: "/trader/pre-dispatch",
    icon: Boxes,
    badge: "3 Staged",
    badgeColor: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  },
  {
    label: "Orders",
    href: "/trader/orders",
    icon: ClipboardList,
    badge: "Escrow",
    badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  },
  {
    label: "Market Place",
    href: "/trader/marketplace",
    icon: Store,
    badge: "Hot",
    badgeColor: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  },
  {
    label: "Team & Operations",
    href: "/trader/team-and-operations",
    icon: Users,
    badge: "90%",
    badgeColor: "bg-zinc-800 text-zinc-300 border-zinc-700",
  },
];

export default function ExpandableTraderSidebar({
  userName = "Noor",
  userEmail = "noor@tidewell.com",
  userAvatar = null,
  onLogout,
  isExpanded = false,
  onToggleExpand,
}: ExpandableTraderSidebarProps) {
  const pathname = usePathname();

  // Optimistic tracking of active tab for zero-latency morphing animation on click
  const [activeHref, setActiveHref] = useState(pathname);

  useEffect(() => {
    setActiveHref(pathname);
  }, [pathname]);

  const isItemActive = (href: string) => {
    if (href === "/trader/dashboard") {
      return activeHref === "/trader/dashboard";
    }
    return activeHref === href || (href !== "/trader/dashboard" && activeHref.startsWith(href));
  };

  const userInitials =
    userName
      .split(" ")
      .map((n) => n[0])
      .filter(Boolean)
      .join("")
      .slice(0, 2)
      .toUpperCase() || "NH";

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 bg-[#0b1017] text-zinc-200 border-r border-zinc-800/80 transition-all duration-300 flex flex-col justify-between select-none ${isExpanded ? "w-[272px] shadow-2xl" : "w-[72px]"
        }`}
    >
      {/* Top Header & Brand */}
      <div className="flex flex-col">
        {/* Logo Banner */}
        <div className="flex justify-between items-center mb-4 px-3.5 pt-4 border-zinc-800/80 border-b h-16">
          <Link
            href="/trader/dashboard"
            className="group flex items-center gap-2.5 min-w-0 overflow-hidden"
          >
            {/* SuryaNexa Icon Box */}
            <div className="flex justify-center items-center bg-[#131c2a] shadow-md p-1.5 border border-zinc-700/80 group-hover:border-emerald-500/60 rounded-2xl w-10 h-10 transition-colors shrink-0">
              <img
                src="/suryanexa-logo.png"
                alt="SuryaNexa Logo"
                className="drop-shadow-sm w-full h-full object-contain"
              />
            </div>

            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-extrabold text-[15px] text-white tracking-tight">
                    Surya<span className="text-emerald-400">NEXA</span>
                  </span>
                  <span className="bg-emerald-500/20 px-1.5 py-0.5 border border-emerald-500/30 rounded font-mono font-bold text-[9px] text-emerald-300">
                    FIELD ERP
                  </span>
                </div>
                <p className="font-sans text-[10px] text-zinc-400">
                  Operations &amp; Spot OS
                </p>
              </motion.div>
            )}
          </Link>
        </div>

        <div className={`${isExpanded ? "border-zinc-800/80 -mt-2 pb-2 border-b w-[270px] px-2 duration-200" : "border-none"}`}>
          {/* Toggle Button in Expanded Mode (PanelLeftClose icon) */}
          {isExpanded && onToggleExpand && (
            <button
              type="button"
              onClick={onToggleExpand}
              className="group relative flex items-center gap-3 hover:bg-zinc-800/80 ml-1 p-1.5 px-3 py-2.5 rounded-xl font-sans font-medium text-zinc-400 hover:text-white text-xs transition-all cursor-pointer shrink-0"
              title="Close Sidebar"
              aria-label="Close Sidebar"
            >
              <span className="mr-[126px] text-[13px] truncate capitalize">navigation</span>
              <PanelLeftClose className="w-5 h-5 text-zinc-400 hover:text-white" />
            </button>
          )}
        </div>

        {/* Toggle Button in Collapsed Mode (PanelLeftOpen icon) */}
        {!isExpanded && onToggleExpand && (
          <div className="flex justify-center -mt-4 p-2 border-zinc-800/80 border-b">
            <button
              type="button"
              onClick={onToggleExpand}
              className="group flex justify-center items-center hover:bg-zinc-800/60 rounded-xl w-10 h-10 text-zinc-400 hover:text-emerald-400 transition-colors cursor-pointer"
              title="Open Sidebar"
              aria-label="Open Sidebar"
            >
              <PanelLeftOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        )}

        {/* Navigation Items with Animated Stretching Pill Indicator */}
        <nav className="space-y-1.5 mt-1 p-2.5 relative" aria-label="Trader Operations">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = isItemActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setActiveHref(item.href)}
                title={!isExpanded ? item.label : undefined}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-sans font-medium group transition-colors duration-200 outline-none ${
                  isActive
                    ? "text-emerald-300 font-semibold"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40"
                } ${!isExpanded ? "justify-center" : "justify-between"}`}
              >
                {/* Responsive Pill-Shaped Active Indicator with Continuous Stretching & Morphing Motion (Clean Matte Finish) */}
                {isActive && (
                  <motion.div
                    layout
                    layoutId="sidebarActivePill"
                    className="absolute inset-0 bg-emerald-500/15 border border-emerald-500/30 rounded-xl pointer-events-none z-0"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 28,
                      mass: 0.7,
                    }}
                  >
                    {/* Left edge accent indicator pip */}
                    <span className="absolute left-0 top-2.5 bottom-2.5 w-1 bg-emerald-400 rounded-r-full" />
                  </motion.div>
                )}

                {/* Tab Content (Icon & Label) - Lifted above the indicator with z-10 */}
                <div className="relative z-10 flex items-center gap-3 min-w-0">
                  <item.icon
                    className={`w-5 h-5 shrink-0 transition-colors duration-200 ${
                      isActive ? "text-emerald-400" : "text-zinc-400 group-hover:text-zinc-200"
                    }`}
                  />
                  {isExpanded && (
                    <span className="text-[13px] truncate">{item.label}</span>
                  )}
                </div>

                {/* Optional Status Badge in Expanded Mode */}
                {isExpanded && item.badge && (
                  <span
                    className={`relative z-10 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border shrink-0 transition-transform duration-200 ${item.badgeColor}`}
                  >
                    {item.hasDot && (
                      <span className="bg-emerald-400 rounded-full w-1.5 h-1.5 animate-pulse" />
                    )}
                    <span>{item.badge}</span>
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Settings & User Profile */}
      <div className="space-y-2 p-2.5 border-zinc-800/80 border-t">
        {/* Settings Action Button */}
        <Link
          href="/trader/profile"
          className={`relative w-full py-2 flex items-center rounded-xl transition-colors cursor-pointer ${
            pathname.startsWith("/trader/profile")
              ? "text-emerald-300 font-semibold bg-emerald-500/10 border border-emerald-500/20"
              : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
          } ${!isExpanded ? "justify-center" : "justify-start px-3 gap-3"}`}
          title="Field &amp; Account Settings"
        >
          <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform shrink-0" />
          {isExpanded && (
            <span className="font-medium text-xs truncate">Settings &amp; Vault</span>
          )}
        </Link>

        {/* Profile Card */}
        {!isExpanded ? (
          /* Collapsed Mode Avatar */
          <div className="flex justify-center py-1">
            <Link
              href="/trader/profile"
              className="group relative flex justify-center items-center bg-[#131c2a] shadow-sm border border-zinc-700/80 hover:border-emerald-500 rounded-full w-10 h-10 font-bold text-white text-xs transition-all cursor-pointer"
              title={`${userName} (${userEmail})`}
            >
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt={userName}
                  className="rounded-full w-full h-full object-cover"
                />
              ) : (
                <span className="text-emerald-400 group-hover:text-white tracking-tight transition-colors">
                  {userInitials}
                </span>
              )}
              {/* Online Operational Status Dot */}
              <span className="-right-0.5 -bottom-0.5 absolute bg-emerald-500 shadow-xs border-[#0b1017] border-2 rounded-full w-2.5 h-2.5" />
            </Link>
          </div>
        ) : (
          /* Expanded Mode Identity Card */
          <div className="flex justify-between items-center gap-2.5 bg-[#131c2a]/80 p-2 border border-zinc-700/70 rounded-2xl transition-all">
            <Link
              href="/trader/profile"
              className="group flex flex-1 items-center gap-2.5 min-w-0 cursor-pointer"
            >
              <div className="relative flex justify-center items-center bg-zinc-900 border border-zinc-700 group-hover:border-emerald-500 rounded-full w-9 h-9 font-bold text-white text-xs transition-colors shrink-0">
                {userAvatar ? (
                  <img
                    src={userAvatar}
                    alt={userName}
                    className="rounded-full w-full h-full object-cover"
                  />
                ) : (
                  <span className="font-bold text-emerald-400">{userInitials}</span>
                )}
                <span className="-right-0.5 -bottom-0.5 absolute bg-emerald-500 border-[#0b1017] border-2 rounded-full w-2.5 h-2.5" />
              </div>

              <div className="min-w-0">
                <p className="font-display font-bold text-white group-hover:text-emerald-300 text-xs truncate leading-tight transition-colors">
                  {userName}
                </p>
                <p className="font-sans text-[10px] text-zinc-400 truncate">
                  Managing Partner · {userEmail}
                </p>
              </div>
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
