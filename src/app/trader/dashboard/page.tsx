"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Calendar as CalendarIcon,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Clock,
  Zap,
  ArrowUpRight,
  ShieldCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  CloudSun,
  Wind,
  Radio,
  Plus,
} from "lucide-react";
import { toast } from "sonner";
import { INITIAL_ORDERS, TraderOrder } from "@/lib/traderData";

interface TaskItem {
  id: string;
  title: string;
  project: string;
  due: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
}

// Calendar events by day for October 2026
const CALENDAR_EVENTS: Record<number, { title: string; color: string }[]> = {
  9: [{ title: "Factory FAT inspection for Sungrow inverters", color: "bg-blue-600" }],
  20: [{ title: "Substation grounding test & soil resistivity", color: "bg-amber-500" }],
  21: [
    { title: "Inspection · Weekly HSE walk — blocks 1-6", color: "bg-emerald-500" },
    { title: "Review RFI-245 (substation B relocation)", color: "bg-blue-500" },
    { title: "Approve MV cable order PO-8841", color: "bg-amber-500" },
  ],
  22: [
    { title: "Transformer oil DGA lab report delivery", color: "bg-emerald-500" },
    { title: "Inverter firmware security patch review", color: "bg-emerald-500" },
  ],
  23: [
    { title: "Site QA/QC audit · Blocks 7-12", color: "bg-emerald-500" },
    { title: "BESS cell balancing & rack sign-off", color: "bg-teal-500" },
    { title: "Escrow milestone payout release PO-8840", color: "bg-teal-500" },
  ],
  25: [
    { title: "Cedar Flats grid interconnection sync test", color: "bg-blue-600" },
    { title: "Emergency diesel generator standby drill", color: "bg-amber-500" },
  ],
  26: [
    { title: "Tracker torque tube alignment survey", color: "bg-teal-500" },
    { title: "PV string voltage curve tracing", color: "bg-teal-500" },
  ],
  27: [{ title: "Weekly subcontractor safety alignment", color: "bg-amber-500" }],
  30: [
    { title: "Pre-dispatch physical inspection at Mundra", color: "bg-blue-600" },
    { title: "Monthly generation export ledger reconciliation", color: "bg-amber-500" },
  ],
};

// Dots displayed under calendar numbers (matching reference mockup)
const DAY_DOTS: Record<number, string[]> = {
  9: ["bg-blue-600"],
  20: ["bg-amber-500"],
  21: ["bg-white", "bg-white"], // two white dots inside black squircle
  22: ["bg-emerald-500", "bg-emerald-500"],
  23: ["bg-emerald-500", "bg-teal-500", "bg-teal-500"],
  25: ["bg-blue-600", "bg-amber-500"],
  26: ["bg-teal-500", "bg-teal-500"],
  27: ["bg-amber-500"],
  30: ["bg-blue-600", "bg-amber-500"],
};

export default function TraderDashboardPage() {
  const [userName, setUserName] = useState("Noor");
  const [selectedProject, setSelectedProject] = useState("All projects");
  // Default to day 24 matching the provided user screenshot
  const [selectedDay, setSelectedDay] = useState<number>(24);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0); // 0 = Oct 2026

  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: "task-1",
      title: "Review RFI-245 (substation B relocation)",
      project: "Cedar Flats Solar Farm",
      due: "Today",
      priority: "High",
      completed: true,
    },
    {
      id: "task-2",
      title: "Approve MV cable order PO-8841",
      project: "Marlow Ridge Battery Storage",
      due: "Today",
      priority: "High",
      completed: false,
    },
    {
      id: "task-3",
      title: "Sign off Ashgrove roof 9-14 inspection",
      project: "Ashgrove Rooftop Portfolio",
      due: "Tomorrow",
      priority: "Medium",
      completed: false,
    },
    {
      id: "task-4",
      title: "Weekly progress update to Wasatch Power",
      project: "Cedar Flats Solar Farm",
      due: "In 2 days",
      priority: "Low",
      completed: false,
    },
    {
      id: "task-5",
      title: "Decide on CO-014 tracker clearance",
      project: "Pinecrest Agrivoltaics",
      due: "In 2 days",
      priority: "Medium",
      completed: false,
    },
    {
      id: "task-6",
      title: "Kick-off agenda for Harbor Point",
      project: "Harbor Point Depot",
      due: "Next week",
      priority: "Low",
      completed: false,
    },
  ]);

  const [orders] = useState<TraderOrder[]>(INITIAL_ORDERS);

  // Guarantee clean viewport alignment to top on page mount
  useEffect(() => {
    window.scrollTo(0, 0);

    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("suryanexa_user");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.name) {
            setUserName(parsed.name.split(" ")[0]);
          }
        }
      } catch (e) {
        // Fallback default Noor
      }
    }
  }, []);

  const toggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const pendingTasksCount = tasks.filter((t) => !t.completed).length;

  // Day Name Calculation for October 2026 (Oct 1 is Thursday)
  const getDayName = (day: number) => {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date(2026, 9, day);
    return dayNames[date.getDay()];
  };

  const selectedDayFormatted = `${getDayName(selectedDay)}, Oct ${selectedDay}`;
  const dayEvents = CALENDAR_EVENTS[selectedDay] || [];

  return (
    <div className="space-y-4 sm:space-y-5 pb-10 font-sans text-zinc-900 select-none">
      {/* =========================================================================
          TOP COMMAND ROW: 3 Distinct Columns (5 + 4 + 3 = 12 cols)
          Left: Greeting + Solar Instrument & Weather Telemetry (5 cols)
          Center: AI Delivery Confidence & Bottleneck Diagnosis (4 cols)
          Right: Milestone Calendar (3 cols)
         ========================================================================= */}
      <div className="items-stretch gap-4 sm:gap-5 grid grid-cols-1 lg:grid-cols-12">
        {/* Left Card: Field Operations Greeting & Daylight Gauge (lg:col-span-5) */}
        <div className="flex flex-col justify-between space-y-4 lg:col-span-5 bg-white shadow-2xs p-5 sm:p-6 border border-zinc-200/90 rounded-3xl">
          <div className="flex sm:flex-row flex-col justify-between sm:items-start gap-4">
            <div>
              <p className="mb-1 font-sans font-medium text-zinc-500 text-xs">
                Wednesday, October 21, 2026
              </p>
              <h1 className="font-display font-extrabold text-zinc-950 text-2xl sm:text-3xl leading-tight tracking-tight">
                Good morning, {userName}
              </h1>
              <p className="mt-2 max-w-sm font-sans text-zinc-600 sm:text-[13px] text-xs leading-relaxed">
                7 builds are live across five states. 13 approvals and one delayed site need your sign-off today.
              </p>
            </div>

            {/* Daylight Remaining Solar Instrument */}
            <div className="self-start bg-[#fcfcfd] shadow-2xs p-3 border border-zinc-200/80 rounded-2xl w-full sm:w-44 text-center shrink-0">
              <span className="block mb-1 font-mono font-bold text-[9.5px] text-zinc-400 uppercase tracking-wider">
                Daylight left on site
              </span>

              {/* Solar Arc Gauge */}
              <div className="relative flex justify-center items-center mx-auto w-36 h-20">
                <svg viewBox="0 0 100 55" className="w-full h-full overflow-visible">
                  {/* Calibrated background track */}
                  <path
                    d="M 10 50 A 40 40 0 0 1 90 50"
                    fill="none"
                    stroke="#e4e4e7"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                  {/* Solar progress arc with warm solar dawn-dusk gradient */}
                  <path
                    d="M 10 50 A 40 40 0 0 1 80 25"
                    fill="none"
                    stroke="url(#solar-arc-gradient)"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray="125"
                    strokeDashoffset="25"
                  />
                  <defs>
                    <linearGradient id="solar-arc-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#fbbf24" />
                    </linearGradient>
                  </defs>
                  {/* Sun position marker */}
                  <circle cx="80" cy="25" r="4.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                </svg>

                {/* Center metric */}
                <div className="bottom-1 absolute font-display font-black text-zinc-950 text-sm">
                  8 h 58 min
                </div>
              </div>

              {/* Sunrise / Sunset Ticks */}
              <div className="flex justify-between mt-0.5 px-1 font-mono text-[10px] text-zinc-400">
                <span>07:46</span>
                <span>18:38</span>
              </div>
              <p className="mt-1 font-sans text-[9.5px] text-zinc-500">
                Crews stand down at 18:00
              </p>
            </div>
          </div>

          {/* Environmental Telemetry Strip */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-zinc-100 border-t">
            <span className="inline-flex items-center gap-1.5 bg-zinc-100/90 px-3 py-1 rounded-full font-sans text-zinc-700 text-xs">
              <CloudSun className="w-3.5 h-3.5 text-amber-500" />
              <span>61°F Clear · Tooele Valley</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-zinc-100/90 px-3 py-1 rounded-full font-sans text-zinc-700 text-xs">
              <Wind className="w-3.5 h-3.5 text-zinc-500" />
              <span>12 mph NW, gusts 18</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-emerald-50 px-3 py-1 border border-emerald-200/70 rounded-full font-sans font-medium text-emerald-800 text-xs">
              <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
              <span>Live from 6 sites</span>
            </span>
          </div>
        </div>

        {/* Center Card: AI Project Insights & Critical Path Diagnosis (lg:col-span-4) */}
        <div className="relative flex flex-col justify-between space-y-4 lg:col-span-4 bg-[#042c22] shadow-2xs p-5 sm:p-6 border border-emerald-900/60 rounded-3xl overflow-hidden text-white">
          {/* Subtle environmental glow */}
          <div className="-top-12 -right-12 absolute bg-emerald-500/10 blur-3xl rounded-full w-48 h-48 pointer-events-none" />

          <div>
            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span className="font-display font-bold text-emerald-200 text-xs uppercase tracking-wider">
                AI project insights
              </span>
            </div>

            {/* Score Ring + Delivery Confidence text */}
            <div className="flex items-center gap-4 mt-1">
              {/* Circular gauge: 75 / 100 */}
              <div className="relative flex justify-center items-center w-16 h-16 shrink-0">
                <svg className="w-full h-full -rotate-90 transform">
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    stroke="#063e30"
                    strokeWidth="5"
                    fill="transparent"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    stroke="#34d399"
                    strokeWidth="5"
                    fill="transparent"
                    strokeDasharray={163.3}
                    strokeDashoffset={163.3 * (1 - 75 / 100)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute text-center leading-none">
                  <span className="font-display font-extrabold text-white text-sm">75</span>
                  <span className="block font-mono text-[9px] text-emerald-300/80">/100</span>
                </div>
              </div>

              <div>
                <h4 className="font-display font-bold text-white text-sm leading-snug">
                  Delivery confidence
                </h4>
                <p className="mt-0.5 font-sans text-emerald-200/80 text-xs leading-snug">
                  Good chance of on-time delivery across the portfolio.
                </p>
              </div>
            </div>

            {/* Critical Path Insight Callout */}
            <div className="space-y-1 bg-white/5 backdrop-blur-xs mt-4 p-3 border border-white/10 rounded-2xl">
              <div className="flex items-center gap-1.5 font-bold text-amber-300 text-xs">
                <Zap className="fill-amber-300 w-3.5 h-3.5" />
                <span>Key insight</span>
              </div>
              <p className="font-sans text-zinc-200 text-xs leading-relaxed">
                Pinecrest will miss its COD by ~3 weeks unless transformer lead time is expedited.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => toast.info("Analyzing supply chain lead times & transformer customs clearance...")}
            className="flex justify-center items-center gap-1.5 bg-white/10 hover:bg-white/15 px-4 py-2.5 border border-white/10 rounded-xl w-full font-sans font-semibold text-white text-xs transition-colors cursor-pointer"
          >
            <span>View full AI analysis</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right Card: High-Fidelity Calendar Widget (lg:col-span-3 - Matching User Image) */}
        <div className="flex flex-col justify-between space-y-3 lg:col-span-3 bg-white shadow-2xs p-4 sm:p-5 border border-zinc-200/90 rounded-3xl">
          <div className="space-y-3">
            {/* 1. Header with Teal Badge & Calendar Title */}
            <div className="flex items-center gap-2.5">
              <div className="flex justify-center items-center bg-[#e6f4f1] border border-[#d2ebe5] rounded-2xl w-9 h-9 text-[#0f766e] shrink-0">
                <CalendarIcon className="w-4.5 h-4.5 stroke-[1.8]" />
              </div>
              <h3 className="font-display font-bold text-zinc-950 text-base">
                Calendar
              </h3>
            </div>

            {/* 2. Month Bar with Month Title & Circular Arrow Controls */}
            <div className="flex justify-between items-center pt-1">
              <h4 className="font-display font-bold text-zinc-900 text-sm">
                October 2026
              </h4>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentMonthIndex((prev) => prev - 1);
                    toast.info("Navigated to September 2026");
                  }}
                  className="flex justify-center items-center hover:bg-zinc-100 border border-zinc-200/90 rounded-full w-7 h-7 text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer"
                  title="Previous Month"
                  aria-label="Previous Month"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentMonthIndex((prev) => prev + 1);
                    toast.info("Navigated to November 2026");
                  }}
                  className="flex justify-center items-center hover:bg-zinc-100 border border-zinc-200/90 rounded-full w-7 h-7 text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer"
                  title="Next Month"
                  aria-label="Next Month"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 3. Days of the Week Header */}
            <div className="grid grid-cols-7 py-0.5 font-semibold text-center text-xs text-zinc-700">
              <span>Mo</span>
              <span>Tu</span>
              <span>We</span>
              <span>Th</span>
              <span>Fr</span>
              <span>Sa</span>
              <span>Su</span>
            </div>

            {/* 4. Calendar Days Grid (October 2026: Day 1 starts on Thursday) */}
            <div className="gap-y-1.5 grid grid-cols-7 text-center">
              {/* Empty leading days: Monday, Tuesday, Wednesday */}
              <div />
              <div />
              <div />

              {/* Days 1 through 31 */}
              {Array.from({ length: 31 }, (_, idx) => idx + 1).map((day) => {
                const isToday = day === 21;
                const isSelected = day === selectedDay;
                const dots = DAY_DOTS[day];

                return (
                  <div
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className="flex justify-center items-center cursor-pointer"
                  >
                    <div
                      className={`relative flex flex-col items-center justify-center w-8 h-9 sm:w-9 sm:h-9.5 rounded-xl transition-all ${
                        isToday
                          ? "bg-[#1e293b] text-white shadow-xs"
                          : isSelected
                          ? "border-2 border-zinc-900 bg-white font-bold text-zinc-950"
                          : "text-zinc-700 hover:bg-zinc-100/80 font-medium"
                      }`}
                    >
                      <span className={`text-xs ${isToday ? "font-bold text-white" : isSelected ? "font-bold text-zinc-950" : ""}`}>
                        {day}
                      </span>

                      {/* Dots indicators below the date number */}
                      {dots && dots.length > 0 ? (
                        <div className="flex justify-center items-center gap-0.5 mt-0.5 min-h-[4px]">
                          {dots.map((dotColor, dIdx) => (
                            <span
                              key={dIdx}
                              className={`w-1 h-1 rounded-full shrink-0 ${dotColor}`}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="mt-0.5 min-h-[4px]" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. Bottom Detail View (e.g. Saturday, Oct 24 · 0 events / Nothing scheduled) */}
          <div className="space-y-1.5 pt-3 border-zinc-100 border-t">
            <div className="flex justify-between items-center text-xs">
              <span className="font-display font-bold text-sm text-zinc-950">
                {selectedDayFormatted}
              </span>
              <span className="font-sans text-xs text-zinc-500">
                {dayEvents.length} events
              </span>
            </div>

            <div className="min-h-[44px]">
              {dayEvents.length === 0 ? (
                <p className="mt-1 font-sans text-xs text-zinc-500">
                  Nothing scheduled.
                </p>
              ) : (
                <div className="space-y-1.5 mt-1 font-sans text-[11px] text-zinc-700">
                  {dayEvents.map((evt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${evt.color}`} />
                      <span className="truncate">{evt.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MIDDLE ROW 1: 6 Metric Stat Cards (Semantic Tints & Real Deltas)
         ========================================================================= */}
      <div className="gap-3 sm:gap-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        {/* Metric 1: Active projects */}
        <div className="bg-[#ecfdf5] shadow-2xs p-3.5 sm:p-4 border border-emerald-200/80 rounded-2xl">
          <span className="block font-semibold text-zinc-700 text-xs">Active projects</span>
          <div className="mt-1 font-display font-extrabold text-zinc-950 text-2xl">7</div>
          <span className="font-sans font-medium text-[11px] text-emerald-700">+1 this quarter</span>
        </div>

        {/* Metric 2: Completed builds */}
        <div className="bg-[#f8fafc] shadow-2xs p-3.5 sm:p-4 border border-slate-200/80 rounded-2xl">
          <span className="block font-semibold text-zinc-700 text-xs">Completed builds</span>
          <div className="mt-1 font-display font-extrabold text-zinc-950 text-2xl">32</div>
          <span className="font-sans font-medium text-[11px] text-zinc-500">+2 vs last year</span>
        </div>

        {/* Metric 3: Delayed projects */}
        <div className="bg-[#fff1f2] shadow-2xs p-3.5 sm:p-4 border border-rose-200/80 rounded-2xl">
          <span className="block font-semibold text-zinc-700 text-xs">Delayed projects</span>
          <div className="mt-1 font-display font-extrabold text-zinc-950 text-2xl">2</div>
          <span className="font-sans font-medium text-[11px] text-rose-600">Same as last month</span>
        </div>

        {/* Metric 4: Work packages live */}
        <div className="bg-[#f0f9ff] shadow-2xs p-3.5 sm:p-4 border border-sky-200/80 rounded-2xl">
          <span className="block font-semibold text-zinc-700 text-xs">Work packages live</span>
          <div className="mt-1 font-display font-extrabold text-zinc-950 text-2xl">17</div>
          <span className="font-sans font-medium text-[11px] text-sky-700">1 start this week</span>
        </div>

        {/* Metric 5: Pending approvals */}
        <div className="bg-[#fefce8] shadow-2xs p-3.5 sm:p-4 border border-amber-200/80 rounded-2xl">
          <span className="block font-semibold text-zinc-700 text-xs">Pending approvals</span>
          <div className="mt-1 font-display font-extrabold text-zinc-950 text-2xl">13</div>
          <span className="font-sans font-medium text-[11px] text-amber-700">3 due today</span>
        </div>

        {/* Metric 6: Crew attendance */}
        <div className="bg-[#f9fafb] shadow-2xs p-3.5 sm:p-4 border border-zinc-200 rounded-2xl">
          <span className="block font-semibold text-zinc-700 text-xs">Crew attendance</span>
          <div className="mt-1 font-display font-extrabold text-zinc-950 text-2xl">90%</div>
          <span className="font-sans font-medium text-[11px] text-zinc-500">19 of 21 on site</span>
        </div>
      </div>

      {/* =========================================================================
          MIDDLE ROW 2: Analytics & Field Execution Row (4 Columns)
          1. Budget utilization (col-span-3)
          2. Timeline progress (col-span-3)
          3. Site-wise performance (col-span-3)
          4. My tasks (col-span-3)
         ========================================================================= */}
      <div className="gap-4 sm:gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12">
        {/* 1. Budget Utilization (lg:col-span-3) */}
        <div className="flex flex-col justify-between space-y-3 lg:col-span-3 bg-white shadow-2xs p-4 sm:p-5 border border-zinc-200/90 rounded-3xl">
          <div>
            <div className="flex justify-between items-center pb-2 border-zinc-100 border-b">
              <span className="flex items-center gap-1.5 font-display font-bold text-zinc-950 text-xs sm:text-sm">
                <Clock className="w-4 h-4 text-zinc-600" />
                <span>Budget utilization</span>
              </span>
            </div>

            {/* Circular Donut Gauge matching reference */}
            <div className="relative flex justify-center items-center my-3 mx-auto w-36 h-36">
              <svg className="w-full h-full -rotate-90 transform">
                <circle
                  cx="72"
                  cy="72"
                  r="52"
                  stroke="#f1f5f9"
                  strokeWidth="14"
                  fill="transparent"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="52"
                  stroke="#0284c7"
                  strokeWidth="14"
                  fill="transparent"
                  strokeDasharray={326.7}
                  strokeDashoffset={326.7 * (1 - 0.38)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute text-center leading-none">
                <div className="font-display font-black text-2xl text-zinc-950">38%</div>
                <span className="block mt-0.5 font-bold font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                  utilized
                </span>
              </div>
            </div>

            {/* Budget Breakdown List */}
            <div className="space-y-1.5 px-1 font-sans text-xs">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5 text-zinc-600">
                  <span className="bg-zinc-950 rounded-full w-2 h-2 shrink-0" />
                  <span>Total budget</span>
                </span>
                <span className="font-bold font-mono text-zinc-950">$234M</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5 text-zinc-600">
                  <span className="bg-sky-500 rounded-full w-2 h-2 shrink-0" />
                  <span>Spent</span>
                </span>
                <span className="font-bold font-mono text-zinc-950">$88.1M</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5 text-zinc-600">
                  <span className="bg-indigo-500 rounded-full w-2 h-2 shrink-0" />
                  <span>Committed</span>
                </span>
                <span className="font-bold font-mono text-zinc-950">$26.7M</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5 text-zinc-600">
                  <span className="bg-zinc-300 rounded-full w-2 h-2 shrink-0" />
                  <span>Remaining</span>
                </span>
                <span className="font-bold font-mono text-zinc-950">$119M</span>
              </div>
            </div>

            {/* Month-over-month trend pill */}
            <div className="flex justify-between items-center bg-emerald-50 mt-3 px-2.5 py-1.5 border border-emerald-200/60 rounded-xl font-medium font-sans text-[11px] text-emerald-800">
              <span>↑ 36% → 38% spent this month</span>
            </div>
          </div>

          {/* Largest Budgets sub-card */}
          <div className="pt-2.5 border-zinc-100 border-t">
            <span className="block mb-1 font-bold font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
              LARGEST BUDGETS
            </span>
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-zinc-900 truncate">Red Mesa Solar + Storage</span>
              <span className="font-mono text-[11px] text-zinc-500 shrink-0">$7.65M of $26.5M</span>
            </div>
          </div>
        </div>

        {/* 2. Timeline Progress (lg:col-span-3) */}
        <div className="flex flex-col justify-between space-y-3 lg:col-span-3 bg-white shadow-2xs p-4 sm:p-5 border border-zinc-200/90 rounded-3xl">
          <div>
            <div className="flex justify-between items-center pb-2 border-zinc-100 border-b">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-zinc-600" />
                <span className="font-display font-bold text-zinc-950 text-xs sm:text-sm">
                  Timeline progress
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="relative">
                  <select
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    className="bg-zinc-100 hover:bg-zinc-200 py-1 pr-6 pl-2 border-none rounded-lg focus:ring-1 focus:ring-emerald-500 font-sans text-xs text-zinc-700 cursor-pointer appearance-none"
                  >
                    <option value="All projects">All projects</option>
                    <option value="Cedar Flats">Cedar Flats</option>
                    <option value="Marlow Ridge">Marlow Ridge</option>
                    <option value="Ashgrove">Ashgrove</option>
                  </select>
                  <ChevronDown className="top-2 right-1.5 absolute w-3 h-3 text-zinc-500 pointer-events-none" />
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
              </div>
            </div>

            {/* Legend matching reference */}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 my-2 font-mono text-[10px] text-zinc-500">
              <span className="flex items-center gap-1">
                <span className="bg-sky-500 rounded-full w-2 h-2" /> Planned
              </span>
              <span className="flex items-center gap-1">
                <span className="bg-zinc-950 rounded-full w-2 h-2" /> Actual
              </span>
              <span className="flex items-center gap-1">
                <span className="border-sky-500 border-b-2 border-dashed w-3" /> Forecast
              </span>
              <span className="flex items-center gap-1">
                <span className="border-zinc-300 border-b-2 border-dashed w-3" /> Baseline
              </span>
            </div>

            {/* S-Curve Chart with Today Marker */}
            <div className="relative mt-2">
              <div className="flex items-stretch gap-1">
                {/* Y-axis labels */}
                <div className="flex flex-col justify-between pr-1 h-28 font-mono text-[9px] text-right text-zinc-400 select-none">
                  <span>100%</span>
                  <span>75%</span>
                  <span>50%</span>
                  <span>25%</span>
                  <span>0%</span>
                </div>

                {/* SVG Curves */}
                <div className="relative flex-1 h-28">
                  <svg viewBox="0 0 240 100" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="timeline-curve-fill" x1="0%" y1="0%" x2="0%" y2="1">
                        <stop offset="0%" stopColor="#0284c7" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Grid lines */}
                    <line x1="0" y1="0" x2="240" y2="0" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="0" y1="25" x2="240" y2="25" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="0" y1="50" x2="240" y2="50" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="0" y1="75" x2="240" y2="75" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="0" y1="100" x2="240" y2="100" stroke="#e2e8f0" strokeWidth="1" />

                    {/* Forecast curve (dashed blue) */}
                    <path
                      d="M 140 50 Q 180 35, 235 22"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="2"
                      strokeDasharray="4 3"
                    />

                    {/* Baseline curve (dashed gray) */}
                    <path
                      d="M 10 95 Q 120 70, 235 28"
                      fill="none"
                      stroke="#cbd5e1"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    />

                    {/* Area under Actual */}
                    <path
                      d="M 10 95 Q 80 85, 140 50 L 140 100 L 10 100 Z"
                      fill="url(#timeline-curve-fill)"
                    />

                    {/* Actual curve (solid dark) */}
                    <path
                      d="M 10 95 Q 80 85, 140 50"
                      fill="none"
                      stroke="#0f172a"
                      strokeWidth="2.5"
                    />

                    {/* Today vertical milestone line */}
                    <line
                      x1="140"
                      y1="18"
                      x2="140"
                      y2="100"
                      stroke="#94a3b8"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />
                    <circle cx="140" cy="50" r="3.5" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
                  </svg>

                  {/* Today Badge */}
                  <div className="top-1 left-[54%] absolute bg-zinc-900 shadow-xs px-1.5 py-0.5 rounded font-bold font-mono text-[9px] text-white transform -translate-x-1/2">
                    Today
                  </div>
                </div>
              </div>

              {/* X-axis months */}
              <div className="flex justify-between mt-1 pr-1 pl-8 font-mono text-[10px] text-zinc-400">
                <span>Apr &apos;26</span>
                <span>Jul</span>
                <span>Oct</span>
                <span>Dec</span>
                <span>Mar</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2 border-zinc-100 border-t font-sans text-[11px] text-zinc-500">
            <span>Portfolio COD Target: Nov 2027</span>
            <span className="font-semibold text-emerald-700">On Track</span>
          </div>
        </div>

        {/* 3. Site-wise Performance (lg:col-span-3) */}
        <div className="flex flex-col justify-between space-y-3 lg:col-span-3 bg-white shadow-2xs p-4 sm:p-5 border border-zinc-200/90 rounded-3xl">
          <div>
            <div className="flex justify-between items-center pb-2 border-zinc-100 border-b">
              <span className="flex items-center gap-1.5 font-display font-bold text-zinc-950 text-xs sm:text-sm">
                <MapPin className="w-4 h-4 text-zinc-600" />
                <span>Site-wise performance</span>
              </span>
              <button
                type="button"
                onClick={() => toast.info("Opening site-by-site telematics dashboard...")}
                className="font-semibold font-sans text-emerald-700 hover:text-emerald-900 text-xs cursor-pointer"
              >
                View all &rarr;
              </button>
            </div>

            {/* List of 5 Project Sites matching reference */}
            <div className="space-y-3 mt-2">
              {/* Site 1: Cedar Flats */}
              <div>
                <div className="flex justify-between items-center text-xs">
                  <div>
                    <span className="block font-bold text-zinc-900 leading-tight">Cedar Flats Solar Farm</span>
                    <span className="text-[10.5px] text-zinc-500">Tooele, Utah · 48 MWp</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold font-mono text-xs text-zinc-900">69%</span>
                    <span className="block font-semibold font-sans text-[10px] text-emerald-700">On track</span>
                  </div>
                </div>
                <div className="bg-zinc-100 mt-1.5 rounded-full w-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-600 rounded-full h-full" style={{ width: "69%" }} />
                </div>
              </div>

              {/* Site 2: Marlow Ridge */}
              <div>
                <div className="flex justify-between items-center text-xs">
                  <div>
                    <span className="block font-bold text-zinc-900 leading-tight">Marlow Ridge Battery Storage</span>
                    <span className="text-[10.5px] text-zinc-500">Kern County, California · 40 MWh</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold font-mono text-xs text-zinc-900">50%</span>
                    <span className="block font-semibold font-sans text-[10px] text-emerald-700">On track</span>
                  </div>
                </div>
                <div className="bg-zinc-100 mt-1.5 rounded-full w-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-600 rounded-full h-full" style={{ width: "50%" }} />
                </div>
              </div>

              {/* Site 3: Ashgrove */}
              <div>
                <div className="flex justify-between items-center text-xs">
                  <div>
                    <span className="block font-bold text-zinc-900 leading-tight">Ashgrove Rooftop Portfolio</span>
                    <span className="text-[10.5px] text-zinc-500">Columbus, Ohio · 6.2 MWp</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold font-mono text-xs text-zinc-900">89%</span>
                    <span className="block font-semibold font-sans text-[10px] text-emerald-700">On track</span>
                  </div>
                </div>
                <div className="bg-zinc-100 mt-1.5 rounded-full w-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-600 rounded-full h-full" style={{ width: "89%" }} />
                </div>
              </div>

              {/* Site 4: Pinecrest (Delayed) */}
              <div>
                <div className="flex justify-between items-center text-xs">
                  <div>
                    <span className="block font-bold text-zinc-900 leading-tight">Pinecrest Agrivoltaics</span>
                    <span className="text-[10.5px] text-zinc-500">Yakima, Washington · 22 MWp</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold font-mono text-xs text-zinc-900">31%</span>
                    <span className="block font-semibold font-sans text-[10px] text-rose-600">Delayed</span>
                  </div>
                </div>
                <div className="bg-zinc-100 mt-1.5 rounded-full w-full h-1.5 overflow-hidden">
                  <div className="bg-rose-500 rounded-full h-full" style={{ width: "31%" }} />
                </div>
              </div>

              {/* Site 5: Saltmarsh Carport */}
              <div>
                <div className="flex justify-between items-center text-xs">
                  <div>
                    <span className="block font-bold text-zinc-900 leading-tight">Saltmarsh Carport Array</span>
                    <span className="text-[10.5px] text-zinc-500">Savannah, Georgia · 3.8 MWp</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold font-mono text-xs text-zinc-900">98%</span>
                    <span className="block font-semibold font-sans text-[10px] text-emerald-700">On track</span>
                  </div>
                </div>
                <div className="bg-zinc-100 mt-1.5 rounded-full w-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-600 rounded-full h-full" style={{ width: "98%" }} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-zinc-100 border-t text-center">
            <span className="font-sans text-[11px] text-zinc-500">
              Overall Portfolio Progress: <strong className="font-mono text-zinc-900">67.4%</strong>
            </span>
          </div>
        </div>

        {/* 4. My Tasks (lg:col-span-3 - Checklist with Circular Toggles & Priority Badges) */}
        <div className="flex flex-col justify-between space-y-3 lg:col-span-3 bg-white shadow-2xs p-4 sm:p-5 border border-zinc-200/90 rounded-3xl">
          <div>
            <div className="flex justify-between items-center pb-2 border-zinc-100 border-b">
              <span className="flex items-center gap-1.5 font-display font-bold text-zinc-950 text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>My tasks</span>
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => toast.info("Opening quick task creation...")}
                  className="flex justify-center items-center bg-zinc-100 hover:bg-zinc-200 rounded-full w-5 h-5 text-zinc-700 transition-colors cursor-pointer"
                  title="Add Task"
                  aria-label="Add Task"
                >
                  <Plus className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => toast.info("Viewing all field tasks & RFI approvals...")}
                  className="font-semibold font-sans text-zinc-700 hover:text-zinc-950 text-xs cursor-pointer"
                >
                  View all &rarr;
                </button>
              </div>
            </div>

            {/* Task Checklist Items */}
            <div className="space-y-2 mt-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className="flex items-start gap-2.5 hover:bg-zinc-50/80 p-1.5 rounded-xl transition-colors cursor-pointer group"
                >
                  {/* Round Checkbox Toggle */}
                  <div
                    className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                      task.completed
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-zinc-300 group-hover:border-zinc-400 bg-white"
                    }`}
                  >
                    {task.completed && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-1">
                      <p
                        className={`text-xs font-medium leading-snug line-clamp-2 ${
                          task.completed ? "line-through text-zinc-400" : "text-zinc-900"
                        }`}
                      >
                        {task.title}
                      </p>
                      <span
                        className={`text-[9.5px] font-sans font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                          task.priority === "High"
                            ? "bg-rose-100 text-rose-700"
                            : task.priority === "Medium"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                    <p className="mt-0.5 font-sans text-[10px] text-zinc-500 truncate">
                      {task.project} · {task.due}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-zinc-100 border-t text-center">
            <span className="font-mono text-[11px] text-zinc-400">
              {pendingTasksCount} tasks pending today
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BOTTOM ROW: Ongoing Orders List (Compact: PO #, Buyer Name, Status, Amount)
         ========================================================================= */}
      <div className="space-y-3 bg-white shadow-2xs p-5 border border-zinc-200/90 rounded-3xl">
        <div className="flex justify-between items-center pb-3 border-zinc-100 border-b">
          <div>
            <h3 className="font-display font-bold text-zinc-950 text-sm sm:text-base">
              Ongoing Purchase Orders &amp; Dispatch Ledger
            </h3>
            <p className="font-sans text-xs text-zinc-500">
              Real-time escrow dispatch feed across regional solar projects
            </p>
          </div>

          <Link
            href="/trader/orders"
            className="flex items-center gap-1 font-bold font-display text-emerald-700 hover:text-emerald-900 text-xs"
          >
            <span>View All Orders &rarr;</span>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full font-sans text-left text-xs">
            <thead>
              <tr className="border-zinc-100 border-b font-bold font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                <th className="px-3 py-2.5">PO #</th>
                <th className="px-3 py-2.5">Buyer Name</th>
                <th className="px-3 py-2.5">Status</th>
                <th className="px-3 py-2.5 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-zinc-50/80 transition-colors">
                  <td className="px-3 py-3 font-bold font-mono text-zinc-950">
                    {ord.poNumber}
                  </td>
                  <td className="px-3 py-3">
                    <span className="font-semibold text-zinc-900">{ord.buyerCompany}</span>
                    <span className="block text-[11px] text-zinc-500">{ord.buyerName}</span>
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                        ord.escrowStatus === "DISBURSED"
                          ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                          : ord.escrowStatus === "VERIFIED"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                          : ord.deliveryStatus === "IN_TRANSIT"
                          ? "bg-amber-100 text-amber-900 border-amber-300"
                          : "bg-zinc-100 text-zinc-700 border-zinc-200"
                      }`}
                    >
                      {ord.escrowStatus === "DISBURSED" && <Check className="w-3 h-3 text-emerald-700" />}
                      {ord.escrowStatus === "VERIFIED" && <ShieldCheck className="w-3 h-3 text-emerald-700" />}
                      {ord.deliveryStatus === "IN_TRANSIT" ? "In Transit" : ord.escrowStatus}
                    </span>
                  </td>
                  <td className="px-3 py-3 font-bold font-mono text-right text-zinc-950">
                    ₹{ord.totalValue.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
