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
  isSidebarExpanded?: boolean;
  userName?: string;
  userEmail?: string;
  userAvatar?: string | null;
}

export default function FieldErpHeader({
  onOpenMobileSidebar,
  isSidebarExpanded = false,
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
    <header className="top-0 z-20 flex justify-between items-center bg-[#ECEFF0] backdrop-blur-md mt-2 px-4 sm:px-6 h-16 select-none">
      {/* Left: Mobile hamburger menu + Brand Title (Fades smoothly when sidebar expands) */}
      <div className="flex items-center gap-3">
        {onOpenMobileSidebar && (
          <button
            type="button"
            onClick={onOpenMobileSidebar}
            className="lg:hidden flex justify-center items-center bg-white hover:bg-zinc-100 shadow-2xs p-2 border border-zinc-200 rounded-xl w-10 h-10 text-zinc-700 hover:text-zinc-950 transition-colors cursor-pointer"
            aria-label="Open mobile navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <Link
          href="/trader/dashboard"
          className={`group flex items-center h-10 transition-all duration-300 ease-in-out ${isSidebarExpanded
            ? "opacity-0 pointer-events-none -translate-x-3"
            : "opacity-100 translate-x-0"
            }`}
        >
          <div className="flex items-center gap-1.5 leading-tight">
            <span className="font-display font-black text-zinc-950 sm:text-[22px] text-xl tracking-tight">
              Surya<span className="text-emerald-700">NEXA</span>
            </span>
          </div>
        </Link>
      </div>

      {/* Right Action Strip: Perfectly Consistent Heights (h-10), Borders, Shadows & Radii */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* 1. Live Clock Pill: h-10, px-3.5, rounded-full, bg-white, border-zinc-200 */}
        <div className="flex items-center gap-2 bg-white/80 hover:bg-white/60 shadow-2xs px-3 sm:px-3.5 border border-white rounded-full h-10 transition-colors">
          {/* Concentric Green Beacon (Pale outer halo + dark green solid center) */}
          <div className="flex justify-center items-center bg-[#dcfce7] rounded-full w-5 h-5 shrink-0">
            <span className="bg-[#15803d] rounded-full w-2.5 h-2.5" />
          </div>

          {/* Time & Live Label */}
          <div className="flex items-center gap-1.5 leading-none">
            <span className="font-sans font-semibold text-zinc-950 sm:text-[13px] text-xs tracking-tight">
              {timeString}
            </span>
            <span className="font-sans font-normal text-zinc-500 sm:text-[13px] text-xs">
              Live
            </span>
          </div>
        </div>

        {/* 2. Notifications Bell: h-10 w-10 circular button, rounded-full, bg-white, border-zinc-200 */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative flex justify-center items-center bg-white/80 hover:bg-white/60 shadow-2xs border border-white rounded-full w-10 h-10 text-zinc-700 hover:text-zinc-950 transition-all cursor-pointer"
            title="Field Alerts"
            aria-label="Field Alerts"
          >
            <Bell className="w-4 h-4" />
            <span className="-top-0.5 -right-0.5 absolute flex justify-center items-center bg-rose-500 rounded-full ring-2 ring-white w-4 h-4 font-mono font-bold text-[9px] text-white">
              4
            </span>
          </button>

          {showNotifications && (
            <>
              <div
                className="z-40 fixed inset-0 bg-transparent"
                onClick={() => setShowNotifications(false)}
              />
              <div className="right-0 z-50 absolute space-y-2 bg-white shadow-xl mt-2 p-3.5 border border-zinc-200 rounded-2xl w-80 font-sans text-xs animate-in duration-150 fade-in-50 zoom-in-95">
                <div className="flex justify-between items-center pb-2 border-zinc-100 border-b">
                  <span className="flex items-center gap-1.5 font-display font-bold text-zinc-950">
                    <Activity className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Live Field Stream</span>
                  </span>
                  <span className="bg-rose-50 px-2 py-0.5 border border-rose-200 rounded-full font-mono font-bold text-[10px] text-rose-600">
                    4 Actionable
                  </span>
                </div>
                <div className="space-y-1.5">
                  <div className="bg-zinc-50 p-2 border border-zinc-100 rounded-xl">
                    <p className="font-bold text-[11px] text-zinc-900">
                      Weekly HSE walk — blocks 1-6
                    </p>
                    <p className="text-[10px] text-zinc-500">Inspection pending today</p>
                  </div>
                  <div className="bg-zinc-50 p-2 border border-zinc-100 rounded-xl">
                    <p className="font-bold text-[11px] text-zinc-900">
                      RFI-245 substation B relocation
                    </p>
                    <p className="text-[10px] text-zinc-500">Cedar Flats Farm · High Priority</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* 3. User Company Profile Chip: h-10, rounded-full, bg-white, border-zinc-200 */}
        <Link
          href="/trader/profile"
          className="flex items-center gap-2 bg-white/80 hover:bg-white/60 shadow-2xs pr-3 pl-1.5 border-white rounded-full h-10 transition-all cursor-pointer"
        >
          <div className="flex justify-center items-center bg-zinc-900 rounded-full w-7 h-7 font-mono font-bold text-white text-xs shrink-0">
            {userInitials}
          </div>
          <div className="hidden sm:block pr-0.5 text-left leading-tight">
            <p className="font-display font-bold text-zinc-950 text-xs leading-none">
              Tidewell Renewables
            </p>
            <p className="mt-0.5 font-sans text-[10px] text-zinc-500 leading-none">
              Mundra Logistics HQ
            </p>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
        </Link>
      </div>
    </header>
  );
}
