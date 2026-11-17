"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Wifi,
  Battery,
  Signal,
  Bell,
  Camera,
  CheckCircle2,
  TrendingUp,
  MapPin,
  CheckSquare,
  Square,
  Sparkles,
  ArrowUpRight,
  ChevronDown,
  Layers,
  Compass,
  Database,
  ShieldCheck,
  Sun
} from "lucide-react";

export default function PhoneMockDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "projects" | "db" | "security">("overview");
  const [task1Checked, setTask1Checked] = useState(true);
  const [task2Checked, setTask2Checked] = useState(false);
  const [task3Checked, setTask3Checked] = useState(false);

  return (
    <div className="relative mx-auto select-none">
      {/* Ambient soft glow behind phone matching site emerald tones */}
      <div className="absolute -inset-4 bg-emerald-500/10 blur-2xl rounded-[60px] pointer-events-none" />

      {/* Realistic Smartphone Hardware Chassis (Titanium Black Frame, Decreased 5%) */}
      <div className="relative bg-zinc-950 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.15)] p-2.5 border-[5px] border-zinc-800 rounded-[48px] w-[295px] sm:w-[318px] h-[608px] sm:h-[646px]">
        {/* Hardware Side Buttons */}
        <div className="top-96 -left-[9px] absolute bg-zinc-700 rounded-l-md w-[4px] h-9" />
        <div className="top-40 -left-[9px] absolute bg-zinc-700 rounded-l-md w-[4px] h-12" />
        <div className="top-56 -left-[9px] absolute bg-zinc-700 rounded-l-md w-[4px] h-12" />
        <div className="top-56 -right-[9px] absolute bg-zinc-700 rounded-r-md w-[4px] h-16" />

        {/* Screen Bezel (Light Theme Canvas matching Desktop Dashboard) */}
        <div className="relative flex flex-col justify-between bg-[#eef2f6] shadow-inner border border-slate-300/80 rounded-[38px] w-full h-full overflow-hidden text-slate-900">
          
          {/* 1. TOP HARDWARE NOTCH / DYNAMIC ISLAND & STATUS BAR */}
          <div className="z-20 relative bg-white/90 backdrop-blur-md px-5 pt-2.5 border-slate-200/60 border-b">
            <div className="flex justify-between items-center font-sans font-semibold text-[11px] text-slate-800">
              <span className="font-bold">9:41</span>
              {/* Dynamic Island Pill */}
              <div className="flex justify-between items-center bg-black shadow-inner px-2 rounded-full w-24 h-4">
                <span className="bg-emerald-500 rounded-full w-2 h-2 animate-pulse" />
                <span className="bg-zinc-900 border border-zinc-800 rounded-full w-2.5 h-2.5" />
              </div>
              <div className="flex items-center gap-1.5 text-slate-700">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-3.5 h-3.5 text-emerald-600" />
              </div>
            </div>

            {/* APP HEADER BAR */}
            <div className="flex justify-between items-center pt-2 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="flex justify-center items-center w-7 h-7 shrink-0">
                  <img src="/suryanexa-logo.png" alt="SuryaNexa Logo" className="drop-shadow-xs w-full h-full object-contain" />
                </div>
                <div>
                  <h4 className="flex items-center gap-1 font-display font-extrabold text-slate-900 text-xs leading-none tracking-tight">
                    SuryaNexa <span className="bg-emerald-50 px-1 py-0.2 border border-emerald-200/80 rounded font-sans font-bold text-[8px] text-emerald-700">FIELD ERP</span>
                  </h4>
                  <p className="mt-0.5 font-medium text-[10px] text-slate-600">Dr. Noor · Tidewell EPC</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-emerald-50 px-1.5 py-0.5 border border-emerald-200 rounded-md font-sans font-semibold text-[9px] text-emerald-700">
                  <span className="bg-emerald-500 rounded-full w-1.5 h-1.5 animate-pulse" />
                  <span>Live</span>
                </div>
                <div className="relative">
                  <button className="flex justify-center items-center bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-full w-7 h-7 text-slate-700 transition">
                    <Bell className="w-3.5 h-3.5" />
                  </button>
                  <span className="-top-0.5 -right-0.5 absolute bg-rose-500 rounded-full w-2 h-2" />
                </div>
              </div>
            </div>
          </div>

          {/* 2. SCROLLABLE SCREEN CONTENT (Scrollbar hidden) */}
          <div className="[&::-webkit-scrollbar]:hidden flex-1 space-y-2.5 px-3 py-2.5 [-ms-overflow-style:none] overflow-y-auto text-left no-scrollbar [scrollbar-width:none]">
            
            {/* =========================================================================
                A. TOP GRAPH: TIMELINE PROGRESS / MILESTONE S-CURVE (REQUESTED AT TOP)
               ========================================================================= */}
            <div className="bg-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.06)] p-3 border border-slate-200/90 rounded-2xl">
              {/* Header */}
              <div className="flex justify-between items-center mb-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="flex justify-center items-center bg-sky-50 rounded-md w-5 h-5 text-sky-600">
                    <TrendingUp className="w-3 h-3" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-[11px] text-slate-900 leading-tight">
                      Timeline progress
                    </h4>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="bg-emerald-50 px-1.5 py-0.5 border border-emerald-200/80 rounded-full font-mono font-bold text-[8px] text-emerald-700">
                    +38% vs target
                  </span>
                  <span className="flex items-center gap-0.5 bg-slate-100 px-1.5 py-0.5 rounded-md font-sans font-semibold text-[9px] text-slate-500">
                    All <ChevronDown className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-3 mb-1 font-sans font-semibold text-[8.5px] text-slate-500">
                <span className="flex items-center gap-1">
                  <span className="inline-block bg-slate-300 rounded w-1.5 h-0.5" /> Planned
                </span>
                <span className="flex items-center gap-1">
                  <span className="inline-block bg-sky-600 rounded w-1.5 h-0.5" /> Actual
                </span>
                <span className="flex items-center gap-1">
                  <span className="inline-block bg-emerald-500 rounded w-1.5 h-0.5" /> Forecast
                </span>
              </div>

              {/* SVG Curve Chart */}
              <div className="relative flex items-end my-1 h-20">
                <svg className="w-full h-full" viewBox="0 0 200 80" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="phoneCurveGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0284c7" stopOpacity="0.32" />
                      <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Shaded Area */}
                  <path
                    d="M 0 75 Q 60 70, 100 45 T 200 10 L 200 80 L 0 80 Z"
                    fill="url(#phoneCurveGradient)"
                  />
                  {/* Forecast dashed line */}
                  <path
                    d="M 140 28 L 200 10"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeDasharray="3 3"
                  />
                  {/* Actual Curve */}
                  <path
                    d="M 0 75 Q 60 70, 100 45 T 140 28"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* Current Position Marker */}
                  <circle cx="140" cy="28" r="4.5" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
                </svg>

                {/* Floating "Today" Pin Tooltip */}
                <span className="top-1 right-12 absolute flex items-center gap-1 bg-slate-900 shadow-sm px-1.5 py-0.5 rounded font-sans font-bold text-[8px] text-white">
                  <span className="bg-emerald-400 rounded-full w-1.5 h-1.5 animate-pulse" />
                  Today · 95% On-track
                </span>
              </div>

              {/* Month Ticks */}
              <div className="flex justify-between pt-1 border-slate-100 border-t font-sans font-semibold text-[8px] text-slate-400">
                <span>Apr</span>
                <span>Jun</span>
                <span>Aug</span>
                <span className="font-bold text-slate-900">Oct</span>
                <span>Dec</span>
                <span>Mar</span>
              </div>

              {/* Chart Footer Info */}
              <div className="flex justify-between items-center mt-1.5 pt-1.5 border-slate-100 border-t font-sans text-[9px]">
                <span className="font-bold text-sky-700">Variance: &lt;1.2%</span>
                <span className="font-medium text-slate-500">100% compliant SLD</span>
              </div>
            </div>

            {/* =========================================================================
                B. AI PROJECT INSIGHTS CARD (DEEP FOREST EMERALD FROM DESKTOP)
               ========================================================================= */}
            <div className="relative bg-[#064e3b] shadow-md p-3 border border-emerald-600/30 rounded-2xl overflow-hidden text-white">
              <div className="top-0 right-0 absolute bg-emerald-400/10 blur-xl rounded-full w-28 h-28 pointer-events-none" />

              {/* Title */}
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-1.5">
                  <div className="flex justify-center items-center bg-emerald-500/20 rounded-md w-5 h-5 text-emerald-300">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                  </div>
                  <span className="font-sans font-bold text-[11px] text-emerald-100">
                    AI project insights
                  </span>
                </div>
                <span className="bg-emerald-950/60 px-1.5 py-0.5 border border-emerald-700/50 rounded font-sans font-bold text-[9px] text-emerald-200">
                  REAL-TIME
                </span>
              </div>

              {/* Radial Score & Confidence */}
              <div className="flex items-center gap-2.5 mb-2">
                <div className="relative flex justify-center items-center w-12 h-12 shrink-0">
                  <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#0f3d32"
                      strokeWidth="3.5"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#34d399"
                      strokeWidth="3.5"
                      strokeDasharray="75, 100"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute text-center leading-none">
                    <span className="block font-display font-black text-white text-xs">
                      75
                    </span>
                    <span className="font-sans font-semibold text-[6.5px] text-emerald-300 uppercase">
                      /100
                    </span>
                  </div>
                </div>

                <div>
                  <p className="font-sans font-bold text-[10.5px] text-white leading-tight">
                    Delivery confidence
                  </p>
                  <p className="mt-0.5 font-sans text-[9.5px] text-emerald-100 leading-tight">
                    Good chance of on-time delivery across portfolio.
                  </p>
                </div>
              </div>

              {/* Key Insight Box */}
              <div className="bg-[#03291f] p-2 border border-emerald-500/20 rounded-lg font-sans text-[9.5px]">
                <p className="flex items-center gap-1 mb-0.5 font-bold text-amber-300">
                  <span>⚡</span> Key insight
                </p>
                <p className="text-emerald-50 leading-snug">
                  Pinecrest will miss COD by ~3 weeks unless transformer lead time is expedited.
                </p>
              </div>

              {/* Link CTA */}
              <button className="flex justify-center items-center gap-1 bg-white/10 hover:bg-white/15 mt-2 py-1.5 border border-white/15 rounded-lg w-full font-sans font-bold text-[9.5px] text-white active:scale-[0.97] transition cursor-pointer">
                <span>View full AI analysis</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>

            {/* =========================================================================
                C. ROW OF 4 COMPACT PASTEL KPI METRICS (MATCHING DESKTOP COLORS)
               ========================================================================= */}
            <div className="gap-1.5 grid grid-cols-4">
              {/* Active */}
              <div className="flex flex-col justify-between bg-[#E6F4EA] p-1.5 border border-[#CEEAD6] rounded-xl text-[#137333]">
                <span className="font-sans font-bold text-[8.5px] truncate">Active</span>
                <span className="my-0.5 font-display font-extrabold text-slate-900 text-base leading-none">7</span>
                <span className="opacity-85 font-semibold text-[7.5px] truncate">+1 qtr</span>
              </div>
              {/* Built */}
              <div className="flex flex-col justify-between bg-[#F1F3F4] p-1.5 border border-[#DADCE0] rounded-xl text-[#3C4043]">
                <span className="font-sans font-bold text-[8.5px] truncate">Built</span>
                <span className="my-0.5 font-display font-extrabold text-slate-900 text-base leading-none">32</span>
                <span className="opacity-85 font-semibold text-[7.5px] truncate">+2 yr</span>
              </div>
              {/* Delayed */}
              <div className="flex flex-col justify-between bg-[#FCE8E6] p-1.5 border border-[#FAD2CF] rounded-xl text-[#C5221F]">
                <span className="font-sans font-bold text-[8.5px] truncate">Delayed</span>
                <span className="my-0.5 font-display font-extrabold text-slate-900 text-base leading-none">2</span>
                <span className="opacity-85 font-semibold text-[7.5px] truncate">Hold</span>
              </div>
              {/* Pending */}
              <div className="flex flex-col justify-between bg-[#FEF7E0] p-1.5 border border-[#FEEFC3] rounded-xl text-[#B06000]">
                <span className="font-sans font-bold text-[8.5px] truncate">Pending</span>
                <span className="my-0.5 font-display font-extrabold text-slate-900 text-base leading-none">13</span>
                <span className="opacity-85 font-semibold text-[7.5px] truncate">3 today</span>
              </div>
            </div>

            {/* =========================================================================
                D. SITE-WISE PERFORMANCE SECTION
               ========================================================================= */}
            <div className="bg-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.06)] p-3 border border-slate-200/90 rounded-2xl">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <h4 className="font-display font-bold text-[11px] text-slate-900">
                    Site-wise performance
                  </h4>
                </div>
                <span className="font-sans font-semibold text-[9px] text-emerald-700 hover:underline cursor-pointer">
                  All &gt;
                </span>
              </div>

              <div className="space-y-1.5">
                {/* Site 1 */}
                <div className="bg-slate-50 p-1.5 border border-slate-100 rounded-lg">
                  <div className="flex justify-between items-center mb-0.5">
                    <p className="font-bold text-[10px] text-slate-900 truncate">
                      Cedar Flats Solar Farm
                    </p>
                    <span className="bg-emerald-100 px-1 py-0.2 rounded font-bold text-[7.5px] text-emerald-800">
                      On track
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-0.5 text-[8.5px] text-slate-500">
                    <span>Tooele, UT</span>
                    <span className="font-semibold text-slate-800">69%</span>
                  </div>
                  <div className="bg-slate-200 rounded-full w-full h-1 overflow-hidden">
                    <div className="bg-emerald-600 rounded-full w-[69%] h-full" />
                  </div>
                </div>

                {/* Site 2 */}
                <div className="bg-slate-50 p-1.5 border border-slate-100 rounded-lg">
                  <div className="flex justify-between items-center mb-0.5">
                    <p className="font-bold text-[10px] text-slate-900 truncate">
                      Marlow Ridge Battery Storage
                    </p>
                    <span className="bg-emerald-100 px-1 py-0.2 rounded font-bold text-[7.5px] text-emerald-800">
                      On track
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-0.5 text-[8.5px] text-slate-500">
                    <span>Kern, CA</span>
                    <span className="font-semibold text-slate-800">50%</span>
                  </div>
                  <div className="bg-slate-200 rounded-full w-full h-1 overflow-hidden">
                    <div className="bg-sky-600 rounded-full w-[50%] h-full" />
                  </div>
                </div>

                {/* Site 3 */}
                <div className="bg-slate-50 p-1.5 border border-slate-100 rounded-lg">
                  <div className="flex justify-between items-center mb-0.5">
                    <p className="font-bold text-[10px] text-slate-900 truncate">
                      Ashgrove Rooftop Portfolio
                    </p>
                    <span className="bg-emerald-100 px-1 py-0.2 rounded font-bold text-[7.5px] text-emerald-800">
                      On track
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-0.5 text-[8.5px] text-slate-500">
                    <span>Columbus, OH</span>
                    <span className="font-semibold text-slate-800">89%</span>
                  </div>
                  <div className="bg-slate-200 rounded-full w-full h-1 overflow-hidden">
                    <div className="bg-emerald-600 rounded-full w-[89%] h-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* =========================================================================
                E. MY TASKS SECTION
               ========================================================================= */}
            <div className="bg-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.06)] p-3 border border-slate-200/90 rounded-2xl">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <h4 className="font-display font-bold text-[11px] text-slate-900">
                    My tasks
                  </h4>
                </div>
                <span className="font-sans font-medium text-[9px] text-slate-500">
                  3 pending
                </span>
              </div>

              <div className="space-y-1.5">
                {/* Task 1 */}
                <div 
                  onClick={() => setTask1Checked(!task1Checked)}
                  className="flex items-start gap-2 bg-slate-50 hover:bg-slate-100 p-1.5 border border-slate-100 rounded-lg transition cursor-pointer"
                >
                  <div className="mt-0.5 text-emerald-600">
                    {task1Checked ? <CheckSquare className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5 text-slate-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className={`text-[10px] font-bold truncate ${task1Checked ? "line-through text-slate-400" : "text-slate-900"}`}>
                        Review RFI-245 (substation)
                      </p>
                      <span className="bg-rose-100 px-1 py-0.2 rounded font-sans font-bold text-[7.5px] text-rose-800">
                        HIGH
                      </span>
                    </div>
                    <p className="text-[8.5px] text-slate-500">Cedar Flats Farm</p>
                  </div>
                </div>

                {/* Task 2 */}
                <div 
                  onClick={() => setTask2Checked(!task2Checked)}
                  className="flex items-start gap-2 bg-slate-50 hover:bg-slate-100 p-1.5 border border-slate-100 rounded-lg transition cursor-pointer"
                >
                  <div className="mt-0.5 text-emerald-600">
                    {task2Checked ? <CheckSquare className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5 text-slate-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className={`text-[10px] font-bold truncate ${task2Checked ? "line-through text-slate-400" : "text-slate-900"}`}>
                        Approve MV cable order PO-8841
                      </p>
                      <span className="bg-rose-100 px-1 py-0.2 rounded font-sans font-bold text-[7.5px] text-rose-800">
                        HIGH
                      </span>
                    </div>
                    <p className="text-[8.5px] text-slate-500">Marlow Ridge Storage</p>
                  </div>
                </div>

                {/* Task 3 */}
                <div 
                  onClick={() => setTask3Checked(!task3Checked)}
                  className="flex items-start gap-2 bg-slate-50 hover:bg-slate-100 p-1.5 border border-slate-100 rounded-lg transition cursor-pointer"
                >
                  <div className="mt-0.5 text-emerald-600">
                    {task3Checked ? <CheckSquare className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5 text-slate-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className={`text-[10px] font-bold truncate ${task3Checked ? "line-through text-slate-400" : "text-slate-900"}`}>
                        Sign off Ashgrove roof inspection
                      </p>
                      <span className="bg-amber-100 px-1 py-0.2 rounded font-sans font-bold text-[7.5px] text-amber-800">
                        MEDIUM
                      </span>
                    </div>
                    <p className="text-[8.5px] text-slate-500">Ashgrove Portfolio</p>
                  </div>
                </div>
              </div>
            </div>

            {/* =========================================================================
                F. ASK NEXA AI FLOATING ACTION STRIP
               ========================================================================= */}
            <div className="flex justify-between items-center bg-[#064e3b] hover:bg-[#075b45] shadow-md p-2.5 rounded-xl text-white transition cursor-pointer">
              <div className="flex items-center gap-2">
                <div className="flex justify-center items-center bg-emerald-500/20 rounded-lg w-6 h-6 text-emerald-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </div>
                <div>
                  <span className="block font-sans font-bold text-[11px] text-white leading-tight">
                    Ask NEXA AI
                  </span>
                  <span className="text-[8.5px] text-emerald-200/80">
                    Ask about permits, SLDs or delays
                  </span>
                </div>
              </div>
              <span className="flex justify-center items-center bg-rose-500 rounded-full w-5 h-5 font-mono font-bold text-[9px] text-white">
                4
              </span>
            </div>

          </div>

          {/* 3. BOTTOM APP NAVIGATION DOCK (WHITE / SLATE MATCHING DESKTOP BAR) */}
          <div className="z-20 flex justify-around items-center bg-white/95 backdrop-blur-md px-3 pt-2 pb-2.5 border-slate-200/90 border-t text-[10px] text-slate-400">
            <button 
              onClick={() => setActiveTab("overview")} 
              className={`flex flex-col items-center transition ${activeTab === "overview" ? "text-emerald-700 font-bold" : "hover:text-slate-700"}`}
            >
              <Layers className="w-4 h-4" />
              <span className="mt-0.5 text-[8px]">Overview</span>
            </button>

            <button 
              onClick={() => setActiveTab("projects")} 
              className={`flex flex-col items-center transition ${activeTab === "projects" ? "text-emerald-700 font-bold" : "hover:text-slate-700"}`}
            >
              <Compass className="w-4 h-4" />
              <span className="mt-0.5 text-[8px]">Projects</span>
            </button>

            {/* Center Floating Camera / Barcode Scanner Button */}
            <div className="flex justify-center items-center bg-[#064e3b] shadow-emerald-950/25 shadow-lg -mt-5 border-[3px] border-white rounded-full w-10 h-10 text-white hover:scale-105 transition cursor-pointer">
              <Camera className="w-4 h-4 text-emerald-300" />
            </div>

            <button 
              onClick={() => setActiveTab("db")} 
              className={`flex flex-col items-center transition ${activeTab === "db" ? "text-emerald-700 font-bold" : "hover:text-slate-700"}`}
            >
              <Database className="w-4 h-4" />
              <span className="mt-0.5 text-[8px]">Live DB</span>
            </button>

            <button 
              onClick={() => setActiveTab("security")} 
              className={`flex flex-col items-center transition ${activeTab === "security" ? "text-emerald-700 font-bold" : "hover:text-slate-700"}`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span className="mt-0.5 text-[8px]">Security</span>
            </button>
          </div>

          {/* Phone Bottom Home Indicator Bar */}
          <div className="bg-white/95 pb-1">
            <div className="bg-slate-400/80 mx-auto rounded-full w-28 h-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
