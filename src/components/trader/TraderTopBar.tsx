"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Menu,
  Bell,
  Search,
  Plus,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  Lock,
} from "lucide-react";

interface TraderTopBarProps {
  onOpenMobileMenu?: () => void;
  title?: string;
  userName?: string;
  userAvatar?: string | null;
}

export default function TraderTopBar({
  onOpenMobileMenu,
  title = "Trader Command Center",
  userName = "Dev B.",
  userAvatar = null,
}: TraderTopBarProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="h-16 bg-[#faf8f3]/95 backdrop-blur-md border-b border-[#ece8dc] px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30 select-none">
      {/* Left: Mobile hamburger + Page Title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-zinc-700 hover:text-zinc-950 hover:bg-white border border-[#ece8dc] transition-colors cursor-pointer"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="font-display font-extrabold text-sm sm:text-base text-zinc-950 tracking-tight flex items-center gap-2">
            <span>{title}</span>
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              <ShieldCheck className="w-3 h-3 text-emerald-700" /> ALMM Verified
            </span>
          </h1>
        </div>
      </div>

      {/* Middle: Live Spot Price Ticker (hidden on small mobile) */}
      <div className="hidden xl:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#ece8dc] shadow-2xs text-xs">
        <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Spot Ticker:</span>
        </div>
        <div className="flex items-center gap-4 text-zinc-600 font-mono text-[11px]">
          <span>
            TOPCon 585W: <strong className="text-zinc-950">₹18.40/Wp</strong>{" "}
            <span className="text-emerald-600 font-bold">(+0.3%)</span>
          </span>
          <span className="text-zinc-300">|</span>
          <span>
            Mono PERC 545W: <strong className="text-zinc-950">₹16.90/Wp</strong>
          </span>
          <span className="text-zinc-300">|</span>
          <span>
            DCR Cell 550W: <strong className="text-zinc-950">₹22.50/Wp</strong>
          </span>
        </div>
      </div>

      {/* Right: Search, Quick Add Button, Notification Bell */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Quick Add Product Lot Button */}
        <Link
          href="/trader/products?action=new"
          className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-display font-bold text-xs shadow-xs hover:shadow-md active:scale-[0.97] transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Stock Lot</span>
        </Link>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-10 h-10 rounded-xl bg-white hover:bg-zinc-50 border border-[#ece8dc] text-zinc-700 hover:text-zinc-950 flex items-center justify-center transition-all cursor-pointer relative shadow-2xs active:scale-[0.97]"
            title="Notifications & Feed"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
          </button>

          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-40 bg-transparent"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white border border-[#ece8dc] shadow-xl p-3.5 z-50 text-xs font-sans space-y-2.5 animate-in fade-in-50 zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-[#ece8dc]">
                  <span className="font-display font-bold text-zinc-950 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Dispatch Feed
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
                    2 Unread
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-[#faf8f3] border border-[#ece8dc]">
                    <div className="flex items-center justify-between text-[11px] font-bold text-zinc-950">
                      <span>PO #SX-2841 In Transit</span>
                      <span className="text-[10px] font-mono font-normal text-zinc-500">45m ago</span>
                    </div>
                    <p className="text-[11px] text-zinc-600 mt-0.5">
                      Driver reached Pune outskirts. 180s Unloading video unlock pending.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#faf8f3] border border-[#ece8dc]">
                    <div className="flex items-center justify-between text-[11px] font-bold text-zinc-950">
                      <span>Escrow Released ₹19.37L</span>
                      <span className="text-[10px] font-mono font-normal text-zinc-500">2h ago</span>
                    </div>
                    <p className="text-[11px] text-zinc-600 mt-0.5">
                      PO #SX-2794 video verified by Kaveri Clean Energy with 0 cracks.
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#ece8dc] text-center">
                  <Link
                    href="/trader/orders"
                    onClick={() => setShowNotifications(false)}
                    className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900"
                  >
                    View All Orders &amp; Escrow Logs &rarr;
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
