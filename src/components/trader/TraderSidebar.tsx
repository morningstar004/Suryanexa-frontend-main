"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Boxes,
  ClipboardList,
  ShieldCheck,
  ArrowUpRight,
  LogOut,
  Zap,
  TrendingUp,
  Store,
  ChevronRight,
  Lock,
} from "lucide-react";

interface TraderSidebarProps {
  userName?: string;
  userEmail?: string;
  userAvatar?: string | null;
  onLogout?: () => void;
  onCloseMobile?: () => void;
}

const NAV_ITEMS = [
  {
    label: "Overview",
    href: "/trader/dashboard",
    icon: LayoutDashboard,
    badge: "Live",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  {
    label: "Inventory & Lots",
    href: "/trader/products",
    icon: Boxes,
    badge: "6 Listed",
    badgeColor: "bg-zinc-100 text-zinc-700 border-zinc-200",
  },
  {
    label: "Orders & Escrow",
    href: "/trader/orders",
    icon: ClipboardList,
    badge: "1 Pending",
    badgeColor: "bg-amber-100 text-amber-900 border-amber-200",
  },
  {
    label: "KYC & Verification",
    href: "/trader/profile",
    icon: ShieldCheck,
    badge: "Tier-1",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
];

export default function TraderSidebar({
  userName = "Dev B.",
  userEmail = "devb4111@gmail.com",
  userAvatar = null,
  onLogout,
  onCloseMobile,
}: TraderSidebarProps) {
  const pathname = usePathname();

  const userInitials =
    userName
      .split(" ")
      .map((n) => n[0])
      .filter(Boolean)
      .join("")
      .slice(0, 2)
      .toUpperCase() || "TR";

  return (
    <aside className="w-72 bg-[#faf8f3] border-r border-[#ece8dc] flex flex-col justify-between h-full select-none">
      {/* 1. Header / Logo Branding */}
      <div>
        <div className="p-5 border-b border-[#ece8dc]">
          <Link
            href="/trader/dashboard"
            onClick={onCloseMobile}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-white shadow-md shadow-emerald-900/20 group-hover:bg-emerald-700 transition-colors">
              <Zap className="w-5 h-5 fill-amber-400 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-lg text-zinc-950 tracking-tight">
                  Surya<span className="text-emerald-700">NEXA</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-700 text-white tracking-wider">
                  TRADER
                </span>
              </div>
              <p className="text-[11px] font-sans text-zinc-500 font-medium">
                Wholesale Terminal &amp; Spot OS
              </p>
            </div>
          </Link>

          {/* Bonded Escrow Balance Mini Card */}
          <div className="mt-4 p-3 rounded-2xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 text-white shadow-md relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-3 -translate-y-3 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-emerald-200/90 mb-1">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-amber-300" /> Bonded Escrow
              </span>
              <span className="inline-flex items-center gap-1 text-emerald-300 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active
              </span>
            </div>
            <div className="font-display font-extrabold text-lg text-white tracking-tight">
              ₹42,80,000
            </div>
            <p className="text-[10px] text-emerald-200/80 mt-0.5 font-sans leading-tight">
              Protected by 180s Video Escrow Guarantee
            </p>
          </div>
        </div>

        {/* 2. Navigation Items */}
        <nav className="p-3.5 space-y-1.5">
          <div className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
            Navigation Menu
          </div>

          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/trader/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-sans text-xs font-semibold transition-all group ${
                  isActive
                    ? "bg-white text-emerald-900 shadow-sm border border-emerald-600/30 font-bold"
                    : "text-zinc-700 hover:text-zinc-950 hover:bg-white/70"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                      isActive
                        ? "bg-emerald-700 text-white"
                        : "bg-zinc-100 text-zinc-600 group-hover:bg-emerald-100 group-hover:text-emerald-800"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight
                    className={`w-3.5 h-3.5 transition-transform ${
                      isActive ? "text-emerald-700" : "text-zinc-400 opacity-0 group-hover:opacity-100"
                    }`}
                  />
                </div>
              </Link>
            );
          })}

          <div className="pt-3">
            <div className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
              Live Network
            </div>
            {/* Live Spot Market Indicator */}
            <div className="mx-1 p-3 bg-white/90 border border-[#ece8dc] rounded-xl text-xs space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-sans text-zinc-600 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> TOPCon 585W
                </span>
                <span className="font-mono font-bold text-emerald-800">₹18.40 / Wp</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-sans text-zinc-600 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> DCR Mono 550W
                </span>
                <span className="font-mono font-bold text-emerald-800">₹22.50 / Wp</span>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* 3. Footer / User Profile & Exit to Marketing Site */}
      <div className="p-3.5 border-t border-[#ece8dc] space-y-2 bg-[#f4f2ea]/60">
        {/* Link back to public marketing portal */}
        <Link
          href="/"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-zinc-700 hover:text-zinc-950 hover:bg-white transition-all border border-transparent hover:border-[#ece8dc]"
        >
          <span className="flex items-center gap-2">
            <Store className="w-4 h-4 text-emerald-700" />
            <span>Public Marketplace</span>
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
        </Link>

        {/* User Account Card with Sign Out */}
        <div className="p-2.5 rounded-2xl bg-white border border-[#ece8dc] flex items-center justify-between gap-2 shadow-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs uppercase overflow-hidden shrink-0 border border-emerald-600/30">
              {userAvatar ? (
                <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
              ) : (
                userInitials
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display font-bold text-xs text-zinc-950 truncate leading-tight">
                {userName}
              </p>
              <p className="text-[10px] text-zinc-500 font-sans truncate">
                {userEmail}
              </p>
            </div>
          </div>

          {onLogout && (
            <button
              onClick={onLogout}
              title="Sign Out"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
