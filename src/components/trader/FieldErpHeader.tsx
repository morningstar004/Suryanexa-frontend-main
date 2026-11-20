"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Bell,
  ChevronDown,
  Menu,
  Activity,
} from "lucide-react";

interface FieldErpHeaderProps {
  onOpenMobileSidebar?: () => void;
  userName?: string;
  userEmail?: string;
  userAvatar?: string | null;
}

export default function FieldErpHeader({
  onOpenMobileSidebar,
  userName = "Noor",
  userEmail = "noor@tidewell.com",
  userAvatar = null,
}: FieldErpHeaderProps) {
  const [timeString, setTimeString] = useState("9:40 AM");
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const userInitials =
    userName
      .split(" ")
      .map((n) => n[0])
      .filter(Boolean)
      .join("")
      .slice(0, 2)
      .toUpperCase() || "NH";

  return (
    <header className="h-14 sm:h-16 px-4 sm:px-6 bg-[#f8fafc]/95 backdrop-blur-md border-b border-zinc-200/80 flex items-center justify-between sticky top-0 z-20 select-none">
      {/* Left: Mobile hamburger + SuryaNexa Brand Logo Badge (Consistent with sidebar) */}
      <div className="flex items-center gap-3">
        {onOpenMobileSidebar && (
          <button
            type="button"
            onClick={onOpenMobileSidebar}
            className="lg:hidden p-2 rounded-xl text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 border border-zinc-200 transition-colors cursor-pointer"
            aria-label="Open mobile navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <Link href="/trader/dashboard" className="flex items-center gap-2.5 group">
          {/* Official SuryaNexa Logo Image */}
          <div className="w-8 h-8 rounded-xl bg-white border border-zinc-200/90 p-1 flex items-center justify-center shrink-0 shadow-2xs group-hover:border-emerald-500/50 transition-colors">
            <img
              src="/suryanexa-logo.png"
              alt="SuryaNexa Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-tight">
              <span className="font-display font-black text-sm sm:text-base text-zinc-950 tracking-tight">
                Surya<span className="text-emerald-700">NEXA</span>
              </span>
            </div>
            <p className="text-[9.5px] font-mono font-bold uppercase tracking-wider text-zinc-500 leading-none">
              FIELD ERP
            </p>
          </div>
        </Link>
      </div>

      {/* Right Action Strip: Live Clock + Notifications + User Company Badge */}
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        {/* Live Clock Pill (matching screenshot: "• 9:40 AM Live") */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-zinc-200 shadow-2xs text-xs font-mono font-bold text-zinc-800">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{timeString} Live</span>
        </div>

        {/* Notifications Bell with 4 Badge */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 rounded-full bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-700 hover:text-zinc-950 flex items-center justify-center shadow-2xs transition-all cursor-pointer relative"
            title="Field Alerts"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-mono font-bold text-[9px] flex items-center justify-center ring-2 ring-white">
              4
            </span>
          </button>

          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-40 bg-transparent"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white border border-zinc-200 shadow-xl p-3.5 z-50 text-xs font-sans space-y-2 animate-in fade-in-50 zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                  <span className="font-display font-bold text-zinc-950 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Live Field Stream</span>
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200">
                    4 Actionable
                  </span>
                </div>
                <div className="space-y-1.5">
                  <div className="p-2 rounded-xl bg-zinc-50 border border-zinc-100">
                    <p className="font-bold text-zinc-900 text-[11px]">
                      Weekly HSE walk — blocks 1-6
                    </p>
                    <p className="text-[10px] text-zinc-500">Inspection pending today</p>
                  </div>
                  <div className="p-2 rounded-xl bg-zinc-50 border border-zinc-100">
                    <p className="font-bold text-zinc-900 text-[11px]">
                      RFI-245 substation B relocation
                    </p>
                    <p className="text-[10px] text-zinc-500">Cedar Flats Farm · High Priority</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Company Profile Chip (matching screenshot: "NH Tidewell Renewables Salt Lake City HQ") */}
        <Link
          href="/trader/profile"
          className="flex items-center gap-2 px-2 sm:px-2.5 py-1 rounded-full bg-white border border-zinc-200 shadow-2xs hover:border-zinc-300 transition-colors cursor-pointer"
        >
          <div className="w-7 h-7 rounded-full bg-zinc-900 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
            {userInitials}
          </div>
          <div className="hidden sm:block text-left leading-tight pr-1">
            <p className="font-display font-bold text-xs text-zinc-950">
              Tidewell Renewables
            </p>
            <p className="text-[10px] text-zinc-500 font-sans">
              Mundra Logistics HQ
            </p>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
        </Link>
      </div>
    </header>
  );
}
