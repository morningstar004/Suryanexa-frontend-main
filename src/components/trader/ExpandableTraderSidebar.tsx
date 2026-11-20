"use client";

import React from "react";
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
  ChevronLeft,
  ChevronRight,
  LogOut,
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
      className={`fixed top-0 left-0 bottom-0 z-40 bg-[#0b1017] text-zinc-200 border-r border-zinc-800/80 transition-all duration-300 flex flex-col justify-between select-none ${
        isExpanded ? "w-64 shadow-2xl" : "w-[72px]"
      }`}
    >
      {/* Top Header & Brand */}
      <div className="flex flex-col">
        {/* Logo Banner */}
        <div className="h-16 flex items-center justify-between px-3.5 border-b border-zinc-800/80">
          <Link
            href="/trader/dashboard"
            className="flex items-center gap-2.5 overflow-hidden group min-w-0"
          >
            {/* SuryaNexa Icon Box */}
            <div className="w-10 h-10 rounded-2xl bg-[#131c2a] border border-zinc-700/80 p-1.5 shrink-0 flex items-center justify-center shadow-md group-hover:border-emerald-500/60 transition-colors">
              <img
                src="/suryanexa-logo.png"
                alt="SuryaNexa Logo"
                className="w-full h-full object-contain drop-shadow-sm"
              />
            </div>

            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-extrabold text-white text-base tracking-tight">
                    Surya<span className="text-emerald-400">NEXA</span>
                  </span>
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    FIELD ERP
                  </span>
                </div>
                <p className="text-[10px] text-zinc-400 font-sans">
                  Operations &amp; Spot OS
                </p>
              </motion.div>
            )}
          </Link>

          {/* Toggle Button in Expanded Mode */}
          {isExpanded && onToggleExpand && (
            <button
              type="button"
              onClick={onToggleExpand}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors cursor-pointer shrink-0"
              title="Collapse Sidebar"
              aria-label="Collapse Sidebar"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Expand Toggle when Collapsed */}
        {!isExpanded && onToggleExpand && (
          <div className="p-2 border-b border-zinc-800/80 flex justify-center">
            <button
              type="button"
              onClick={onToggleExpand}
              className="w-10 h-8 flex items-center justify-center rounded-xl text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800/60 transition-colors cursor-pointer"
              title="Expand Sidebar"
              aria-label="Expand Sidebar"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="p-2.5 space-y-1.5 mt-1" aria-label="Trader Operations">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/trader/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                title={!isExpanded ? item.label : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-sans font-medium transition-all group relative ${
                  isActive
                    ? "bg-emerald-500/15 text-emerald-300 font-semibold border border-emerald-500/30 shadow-[0_0_14px_rgba(16,185,129,0.12)]"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
                } ${!isExpanded ? "justify-center" : "justify-between"}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <item.icon
                    className={`w-5 h-5 shrink-0 transition-colors ${
                      isActive ? "text-emerald-400" : "text-zinc-400 group-hover:text-zinc-200"
                    }`}
                  />
                  {isExpanded && (
                    <span className="truncate text-[13px]">{item.label}</span>
                  )}
                </div>

                {isExpanded && item.badge && (
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border shrink-0 ${item.badgeColor}`}
                  >
                    {item.hasDot && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    )}
                    <span>{item.badge}</span>
                  </span>
                )}

                {/* Collapsed Active Indicator Pip */}
                {!isExpanded && isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Settings & User Profile */}
      <div className="p-2.5 border-t border-zinc-800/80 space-y-2">
        {/* Settings Action Button */}
        <Link
          href="/trader/profile"
          className={`w-full py-2 flex items-center rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors cursor-pointer ${
            !isExpanded ? "justify-center" : "justify-start px-3 gap-3"
          }`}
          title="Field &amp; Account Settings"
        >
          <Settings className="w-5 h-5 shrink-0 transition-transform group-hover:rotate-45" />
          {isExpanded && (
            <span className="text-xs font-medium truncate">Settings &amp; Vault</span>
          )}
        </Link>

        {/* Profile Card */}
        {!isExpanded ? (
          /* Collapsed Mode Avatar */
          <div className="flex justify-center py-1">
            <Link
              href="/trader/profile"
              className="relative w-10 h-10 rounded-full bg-[#131c2a] border border-zinc-700/80 hover:border-emerald-500 text-white font-bold text-xs flex items-center justify-center transition-all cursor-pointer shadow-sm group"
              title={`${userName} (${userEmail})`}
            >
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt={userName}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="tracking-tight text-emerald-400 group-hover:text-white transition-colors">
                  {userInitials}
                </span>
              )}
              {/* Online Operational Status Dot */}
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#0b1017] absolute -bottom-0.5 -right-0.5 shadow-xs" />
            </Link>
          </div>
        ) : (
          /* Expanded Mode Identity Card */
          <div className="flex items-center justify-between gap-2.5 p-2 rounded-2xl bg-[#131c2a]/80 border border-zinc-700/70 transition-all">
            <Link
              href="/trader/profile"
              className="flex items-center gap-2.5 min-w-0 group cursor-pointer flex-1"
            >
              <div className="relative w-9 h-9 rounded-full bg-zinc-900 border border-zinc-700 text-white font-bold text-xs flex items-center justify-center shrink-0 group-hover:border-emerald-500 transition-colors">
                {userAvatar ? (
                  <img
                    src={userAvatar}
                    alt={userName}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-emerald-400 font-bold">{userInitials}</span>
                )}
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#0b1017] absolute -bottom-0.5 -right-0.5" />
              </div>

              <div className="min-w-0">
                <p className="font-display font-bold text-xs text-white truncate leading-tight group-hover:text-emerald-300 transition-colors">
                  {userName}
                </p>
                <p className="text-[10px] text-zinc-400 font-sans truncate">
                  Managing Partner · {userEmail}
                </p>
              </div>
            </Link>

            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer shrink-0"
                title="Sign Out"
                aria-label="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
