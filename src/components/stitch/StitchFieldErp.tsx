"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Calendar as CalendarIcon,
  Bell,
  Search,
  Plus,
  Layers,
  Clock,
  Moon,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Building2,
  Users,
  Compass,
  HardHat,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Sparkles,
  Maximize2,
  Check,
  Radio,
  FileText,
  MapPin,
  Flame,
  PieChart
} from "lucide-react";

type RoleType = "traders" | "epc" | "consultants" | "installers";

interface RoleData {
  roleBadge: string;
  tenantName: string;
  tenantLocation: string;
  userInitials: string;
  greetingName: string;
  greetingSubtitle: string;
  weatherCity: string;
  weatherTemp: string;
  weatherWind: string;
  sitesCount: string;
  sunrise: string;
  sunset: string;
  daylightText: string;
  daylightSub: string;
  aiScore: number;
  aiConfidenceText: string;
  aiInsightText: string;
  kpis: {
    label: string;
    val: string;
    sub: string;
    color: "green" | "gray" | "red" | "blue" | "amber" | "slate";
  }[];
  budgetTitle: string;
  donutPercent: number;
  budgetBreakdown: { label: string; amount: string; dotColor: string }[];
  budgetFooter: string;
  timelineTitle: string;
  sites: { name: string; loc: string; spec: string; percent: string; status: "On track" | "Delayed" }[];
  tasks: { title: string; project: string; due: string; priority: "High" | "Medium" | "Urgent" }[];
  calendarEvents: { title: string; color: string }[];
  selectedDay: number;
}

const ROLES_DATA: Record<RoleType, RoleData> = {
  traders: {
    roleBadge: "TIER-1 STOCKIST & DEPOT COMMAND",
    tenantName: "Adani Waaree Stockist",
    tenantLocation: "Mundra & Surat Port Hubs",
    userInitials: "VS",
    greetingName: "Good morning, Vikram",
    greetingSubtitle:
      "4.2 MW inventory live across 3 bonded depots. 54 pallets dispatched, ₹1.8 Cr escrow in transit.",
    weatherCity: "Mundra Port Hub",
    weatherTemp: "82°F Clear",
    weatherWind: "14 mph W, gusts 20",
    sitesCount: "Live from 3 bonded depots",
    sunrise: "6:48",
    sunset: "18:22",
    daylightText: "8 h 45 min",
    daylightSub: "Depot loading cutoff at 19:30",
    aiScore: 88,
    aiConfidenceText: "High pallet turnover across Western corridor.",
    aiInsightText: "Mundra 585W TOPCon stock will reach 98% allocation by Friday at current dispatch velocity.",
    kpis: [
      { label: "Active allocations", val: "18", sub: "+3 bookings", color: "green" },
      { label: "Completed builds", val: "142", sub: "+12 vs last mo", color: "gray" },
      { label: "Delayed shipments", val: "1", sub: "Customs check", color: "red" },
      { label: "Freight live", val: "9", sub: "GPS telematics", color: "blue" },
      { label: "Pending signoffs", val: "5", sub: "2 ready", color: "amber" },
      { label: "Warehouse fill", val: "94%", sub: "4.2 MW capacity", color: "slate" },
    ],
    budgetTitle: "Escrow & Liquidity",
    donutPercent: 68,
    budgetBreakdown: [
      { label: "Total Inventory", amount: "₹18.4 Cr", dotColor: "bg-emerald-500" },
      { label: "In Transit", amount: "₹8.2 Cr", dotColor: "bg-sky-500" },
      { label: "Escrow Secured", amount: "₹4.6 Cr", dotColor: "bg-amber-500" },
      { label: "Spot Credit", amount: "₹5.6 Cr", dotColor: "bg-zinc-400" },
    ],
    budgetFooter: "↗ 42% · ₹2.1 Cr released this week",
    timelineTitle: "Pallet Allocation Curve",
    sites: [
      { name: "Mundra Port Depot", loc: "Gujarat", spec: "4.2 MWp", percent: "94%", status: "On track" },
      { name: "Surat Regional Hub", loc: "Gujarat", spec: "1.8 MWp", percent: "78%", status: "On track" },
      { name: "Greater Noida Depot", loc: "NCR", spec: "940 kW BOS", percent: "86%", status: "On track" },
      { name: "Bhiwandi Substation", loc: "MH", spec: "620 kW Cable", percent: "42%", status: "Delayed" },
    ],
    tasks: [
      { title: "Review 180s unboxing for PO #SX-2841", project: "Mundra · Pallet 4", due: "Today", priority: "Urgent" },
      { title: "Confirm 2x 40ft High-Cube allocation", project: "Surat Logistics", due: "Today", priority: "High" },
      { title: "Sign off e-Way bills for 54 inverters", project: "Pune Dispatch", due: "Tomorrow", priority: "Medium" },
    ],
    calendarEvents: [
      { title: "Mundra Depot container gate clearance (10:30 AM)", color: "bg-emerald-500" },
      { title: "Tier-1 price revision sync with Waaree Energies", color: "bg-sky-500" },
      { title: "Release escrow for PO #SX-2810 upon delivery", color: "bg-amber-500" },
    ],
    selectedDay: 21,
  },
  epc: {
    roleBadge: "EPC CONTRACTOR COMMAND CENTER",
    tenantName: "Tidewell Renewables",
    tenantLocation: "Salt Lake City HQ",
    userInitials: "NH",
    greetingName: "Good morning, Noor",
    greetingSubtitle:
      "7 builds are live across five states. 13 approvals and one delayed site need you today.",
    weatherCity: "Tooele Valley",
    weatherTemp: "61°F Clear",
    weatherWind: "12 mph NW, gusts 18",
    sitesCount: "Live from 6 sites",
    sunrise: "7:46",
    sunset: "18:38",
    daylightText: "8 h 58 min",
    daylightSub: "Crews stand down at 18:00",
    aiScore: 75,
    aiConfidenceText: "Good chance of on-time delivery across the portfolio.",
    aiInsightText: "Pinecrest will miss its COD by ~3 weeks unless transformer lead time is expedited.",
    kpis: [
      { label: "Active projects", val: "7", sub: "+1 this quarter", color: "green" },
      { label: "Completed builds", val: "32", sub: "+2 vs last year", color: "gray" },
      { label: "Delayed projects", val: "2", sub: "Same as last mo", color: "red" },
      { label: "Work packages", val: "17", sub: "1 start this wk", color: "blue" },
      { label: "Pending approvals", val: "13", sub: "3 due today", color: "amber" },
      { label: "Crew attendance", val: "90%", sub: "19 of 21 on site", color: "slate" },
    ],
    budgetTitle: "Budget utilization",
    donutPercent: 38,
    budgetBreakdown: [
      { label: "Total budget", amount: "$234M", dotColor: "bg-zinc-800" },
      { label: "Spent", amount: "$88.1M", dotColor: "bg-sky-500" },
      { label: "Committed", amount: "$26.7M", dotColor: "bg-emerald-500" },
      { label: "Remaining", amount: "$119M", dotColor: "bg-amber-400" },
    ],
    budgetFooter: "↗ 36% · 38% spent this month",
    timelineTitle: "Timeline progress",
    sites: [
      { name: "Cedar Flats Solar Farm", loc: "Tooele, UT", spec: "48 MWp Utility", percent: "69%", status: "On track" },
      { name: "Marlow Ridge Battery Storage", loc: "Kern, CA", spec: "120 MWh BESS", percent: "50%", status: "On track" },
      { name: "Ashgrove Rooftop Portfolio", loc: "Columbus, OH", spec: "6.2 MW · 14 roofs", percent: "89%", status: "On track" },
      { name: "Pinecrest Agrivoltaics", loc: "Yakima, WA", spec: "22 MWp Dual", percent: "31%", status: "Delayed" },
    ],
    tasks: [
      { title: "Review RFI-245 (substation B relocation)", project: "Cedar Flats Farm", due: "Today", priority: "High" },
      { title: "Approve MV cable order PO-8841", project: "Marlow Ridge Storage", due: "Today", priority: "High" },
      { title: "Sign off Ashgrove roof 4 inspection", project: "Ashgrove Portfolio", due: "Tomorrow", priority: "Medium" },
    ],
    calendarEvents: [
      { title: "Inspection · Weekly HSE walk — blocks 1–6", color: "bg-emerald-500" },
      { title: "Review RFI-245 (substation B relocation)", color: "bg-sky-500" },
      { title: "Approve MV cable order PO-8841", color: "bg-amber-500" },
    ],
    selectedDay: 21,
  },
  consultants: {
    roleBadge: "SOLAR CAD & NET-METERING DESK",
    tenantName: "Acuity Solar Advisory",
    tenantLocation: "Design & Liaison Division",
    userInitials: "AM",
    greetingName: "Good morning, Dr. Aris",
    greetingSubtitle:
      "12 satellite solar layouts queued. 5 DISCOM dossiers generated with 99.4% first-pass pass rate.",
    weatherCity: "Navi Mumbai Tech",
    weatherTemp: "79°F Fair",
    weatherWind: "8 mph SW, gusts 12",
    sitesCount: "Live across 12 CAD files",
    sunrise: "6:32",
    sunset: "18:15",
    daylightText: "9 h 10 min",
    daylightSub: "Satellite shadow model synced",
    aiScore: 92,
    aiConfidenceText: "Zero SLD compliance rejections across 48 submittals.",
    aiInsightText: "MSEDCL circular 42 automated: all single line diagrams now include lightning arrester loop auto-calc.",
    kpis: [
      { label: "Active CAD layouts", val: "12", sub: "Satellite AI sized", color: "green" },
      { label: "Completed SLDs", val: "28", sub: "CEIG compliant", color: "gray" },
      { label: "DISCOM rejections", val: "0", sub: "100% first-pass", color: "red" },
      { label: "Partner EPC squads", val: "6", sub: "Linked on net", color: "blue" },
      { label: "Pending signoffs", val: "3", sub: "Bescom & MSEDCL", color: "amber" },
      { label: "Subsidy accuracy", val: "99.8%", sub: "PM Surya Ghar", color: "slate" },
    ],
    budgetTitle: "Billable Engineering Ledger",
    donutPercent: 54,
    budgetBreakdown: [
      { label: "Total Milestones", amount: "₹38.5 L", dotColor: "bg-emerald-500" },
      { label: "CAD Billed", amount: "₹20.8 L", dotColor: "bg-sky-500" },
      { label: "Net-Metering", amount: "₹12.2 L", dotColor: "bg-amber-500" },
      { label: "Retainers", amount: "₹5.5 L", dotColor: "bg-zinc-400" },
    ],
    budgetFooter: "↗ 18% · 5 DISCOM dossiers cleared this month",
    timelineTitle: "SLD Drafting Milestones",
    sites: [
      { name: "Textile Mill Rooftop Solar", loc: "Surat, GJ", spec: "120 kWp CAD", percent: "95%", status: "On track" },
      { name: "Apex School Microgrid", loc: "Pune, MH", spec: "60 kWp Net-Meter", percent: "82%", status: "On track" },
      { name: "Sula Estate Solar Array", loc: "Nashik, MH", spec: "45 kWp Rooftop", percent: "60%", status: "On track" },
      { name: "Vapi Chemical Processing", loc: "Vapi, GJ", spec: "200 kWp CEIG", percent: "35%", status: "Delayed" },
    ],
    tasks: [
      { title: "Generate CEIG Single Line Diagram Rev 4", project: "Textile Mill 120kW", due: "Today", priority: "Urgent" },
      { title: "Run 3D shadow analysis for solstice", project: "Apex School 60kW", due: "Today", priority: "High" },
      { title: "Submit net-metering dossier to BESCOM", project: "Sula Estate 45kW", due: "Tomorrow", priority: "Medium" },
    ],
    calendarEvents: [
      { title: "DISCOM Technical Advisory webinar on PM Surya Ghar", color: "bg-emerald-500" },
      { title: "Structural wind-load audit for coastal solar farm", color: "bg-sky-500" },
      { title: "Sign off SLD certificate #MH-2026-904", color: "bg-amber-500" },
    ],
    selectedDay: 21,
  },
  installers: {
    roleBadge: "FIELD SQUAD CREW COMMAND",
    tenantName: "Squad Alpha Installation Unit",
    tenantLocation: "Baner Sector 4 Hub",
    userInitials: "AK",
    greetingName: "Good morning, Amit",
    greetingSubtitle:
      "4 rooftop technicians on site. 54 modules staging for crane lift. Daylight left: 8h 58m.",
    weatherCity: "Baner Rooftop Site",
    weatherTemp: "75°F Sunny",
    weatherWind: "7 mph NW, calm",
    sitesCount: "Active on Block A & B",
    sunrise: "6:40",
    sunset: "18:18",
    daylightText: "8 h 58 min",
    daylightSub: "Crane lift window until 14:00",
    aiScore: 94,
    aiConfidenceText: "Zero safety incidents across 320 consecutive days.",
    aiInsightText: "DC string voc within 0.2V variance across all 6 strings. Ready for inverter grid-tie test.",
    kpis: [
      { label: "Modules staged", val: "54", sub: "TOPCon 585W", color: "green" },
      { label: "Strings done", val: "12/16", sub: "MC4 crimped", color: "gray" },
      { label: "Safety flags", val: "0", sub: "100% clip-on", color: "red" },
      { label: "Active crew", val: "4", sub: "Squad Alpha", color: "blue" },
      { label: "180s video proof", val: "Done", sub: "Escrow unlocked", color: "amber" },
      { label: "Grounding loop", val: "0.8 Ω", sub: "Pass (<1.0Ω)", color: "slate" },
    ],
    budgetTitle: "Squad Milestone Ledger",
    donutPercent: 82,
    budgetBreakdown: [
      { label: "Total Squad Payout", amount: "₹4.2 L", dotColor: "bg-emerald-500" },
      { label: "Mechanical Mounting", amount: "₹2.1 L", dotColor: "bg-sky-500" },
      { label: "Electrical DC Wiring", amount: "₹1.4 L", dotColor: "bg-amber-500" },
      { label: "Commissioning", amount: "₹70 K", dotColor: "bg-zinc-400" },
    ],
    budgetFooter: "↗ 82% · Milestone 2 released by EPC",
    timelineTitle: "Daily Rooftop Cadence",
    sites: [
      { name: "Block A Module Mounting", loc: "Roof Deck 1", spec: "54 panels clamped", percent: "90%", status: "On track" },
      { name: "Cable Tray & DC Conduit", loc: "Riser Shaft B", spec: "120m run finished", percent: "75%", status: "On track" },
      { name: "Net-Metering Meter Box", loc: "Ground Substation", spec: "Bi-directional panel", percent: "80%", status: "On track" },
      { name: "Earthing Pit Resistance Test", loc: "South Yard Pit 3", spec: "Copper plate check", percent: "50%", status: "Delayed" },
    ],
    tasks: [
      { title: "Record 180s unboxing video of Sungrow inverters", project: "Baner Sector 4", due: "Today", priority: "Urgent" },
      { title: "Torque check all aluminum mid-clamps to 14 Nm", project: "Block A Roof Deck", due: "Today", priority: "High" },
      { title: "Megger insulation resistance test on DC strings", project: "Inverter Room Bay 2", due: "Tomorrow", priority: "Medium" },
    ],
    calendarEvents: [
      { title: "Morning Toolbox safety briefing (8:00 AM)", color: "bg-emerald-500" },
      { title: "Crane boom lift for pallet #3-5 rooftop transfer", color: "bg-sky-500" },
      { title: "Commissioning inspector pre-test signoff", color: "bg-amber-500" },
    ],
    selectedDay: 21,
  },
};

const ROLE_OPTIONS = [
  { id: "epc" as const, label: "EPC Vendor", icon: Users },
  { id: "traders" as const, label: "Solar Trader", icon: Building2 },
  { id: "consultants" as const, label: "Solar Consultant", icon: Compass },
  { id: "installers" as const, label: "Field Installer", icon: HardHat },
];

export default function StitchFieldErp() {
  const [activeRole, setActiveRole] = useState<RoleType>("epc");
  const [activeTab, setActiveTab] = useState<string>("Overview");
  const [isRoleLoading, setIsRoleLoading] = useState(false);
  const data = ROLES_DATA[activeRole];

  const handleRoleChange = (role: RoleType) => {
    if (role === activeRole) return;
    setIsRoleLoading(true);
    setActiveRole(role);
    const timer = setTimeout(() => {
      setIsRoleLoading(false);
    }, 220);
    return () => clearTimeout(timer);
  };

  return (
    <section
      className="relative bg-white py-14 lg:py-20 border-zinc-200/80 border-b overflow-hidden"
      id="dashboard-preview"
    >
      <div className="mx-auto px-3 sm:px-6 lg:px-8 2xl:px-12 max-w-[1440px] 2xl:max-w-[1650px] 3xl:max-w-[1920px] 4xl:max-w-[2200px]">
        {/* Section Headline & Role Switcher Header */}
        <div className="flex flex-col items-center mb-8 sm:mb-10 text-center">
          <div>
            <h2 className="max-w-3xl 2xl:max-w-4xl font-display font-extrabold text-zinc-950 text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl text-balance leading-tight tracking-tight">
              Unified Solar Operations.{" "}
              <span className="text-emerald-700">Tailored for every network role.</span>
            </h2>
          </div>

          {/* Interactive Role Switcher Pills */}
          <div className="flex flex-col items-center gap-2.5 mt-6 w-full">
            <span className="font-sans font-bold text-[11px] text-zinc-500 2xl:text-xs uppercase tracking-wider">
              Switch Persona:
            </span>
            <div className="relative gap-1.5 grid grid-cols-2 sm:grid-cols-4 bg-zinc-100 shadow-xs p-1.5 border border-zinc-200/90 rounded-2xl w-full max-w-3xl 2xl:max-w-4xl">
              {ROLE_OPTIONS.map(({ id, label, icon: Icon }) => {
                const isActive = activeRole === id;
                const isLoading = isRoleLoading && isActive;
                return (
                  <button
                    key={id}
                    onClick={() => handleRoleChange(id)}
                    className={`relative py-2.5 px-3 rounded-xl text-xs sm:text-sm font-sans transition-colors active:scale-[0.97] flex items-center justify-center gap-2 cursor-pointer ${
                      isActive
                        ? "text-white font-bold"
                        : "text-zinc-700 hover:text-zinc-950 font-semibold"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeRolePill"
                        className="z-0 absolute inset-0 bg-[#18222D] shadow-xs rounded-xl"
                        transition={{ type: "spring", stiffness: 450, damping: 32 }}
                      />
                    )}
                    <span className="z-10 relative flex justify-center items-center gap-2">
                      {isLoading ? (
                        <span className="border-2 border-emerald-400 border-t-transparent rounded-full w-3.5 h-3.5 animate-spin shrink-0" />
                      ) : (
                        <Icon
                          className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                            isActive ? "text-emerald-400" : "text-zinc-500"
                          }`}
                        />
                      )}
                      <span className="w-28 sm:w-32 text-center truncate select-none">{label}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* DESKTOP MONITOR FRAME (16:9 Widescreen - Reduced size by 17%) */}
        <div className="relative mx-auto flex flex-col bg-[#E8EEF4] shadow-[0_25px_80px_rgba(15,23,42,0.14)] border border-zinc-300 rounded-3xl w-full max-w-[83%] aspect-[16/9] overflow-hidden">
          {/* 1. TOP BROWSER CHROME FRAME (Compact h-9) */}
          <div className="relative flex justify-between items-center bg-[#1A232C] px-4 py-2 border-zinc-800 border-b font-sans text-[11px] text-zinc-300 shrink-0">
            {/* Window Controls + Left-aligned Tab (moved left right next to dots) */}
            <div className="z-10 flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="inline-block bg-[#FF5F56] shadow-xs rounded-full w-2.5 h-2.5" />
                <span className="inline-block bg-[#FFBD2E] shadow-xs rounded-full w-2.5 h-2.5" />
                <span className="inline-block bg-[#27C93F] shadow-xs rounded-full w-2.5 h-2.5" />
              </div>

              {/* Browser Tabs Simulation - Moved left next to window controls */}
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 border-x border-zinc-700/60 border-t rounded-t-md h-full font-sans text-[11px] text-zinc-200">
                <span className="bg-emerald-500 rounded-full w-2 h-2 animate-pulse shrink-0" />
                <span className="max-w-[180px] font-semibold truncate">Project Dashboard · SuryaNexa</span>
                <span className="ml-1.5 text-zinc-500 hover:text-zinc-300 text-xs transition-colors cursor-pointer">×</span>
              </div>
            </div>

            {/* URL Search Bar - Centered */}
            <div className="sm:left-1/2 z-10 sm:absolute flex justify-center items-center gap-2 bg-[#0F161E] shadow-inner px-3.5 py-1 border border-zinc-700/60 rounded-md w-60 sm:w-80 md:w-96 font-sans text-[10px] text-zinc-400 sm:-translate-x-1/2">
              <span className="text-emerald-400 text-xs">🔒</span>
              <span className="font-semibold text-zinc-300">demo.suryanexa.com</span>
              <span className="text-zinc-500 truncate">/#/dashboard/{activeRole}</span>
            </div>

            {/* Spacer on right to ensure balance */}
            <div className="hidden sm:block z-0 w-16" />
          </div>

          {/* 2. INNER APPLICATION SHELL (Dock + App Body, flex-1 min-h-0) */}
          <div className="flex lg:flex-row flex-col flex-1 min-h-0 overflow-hidden">
            {/* Left Black Dock (Compact w-14 shrink-0) */}
            <div className="hidden lg:flex flex-col justify-between items-center bg-[#11171E] px-2 py-4 border-zinc-800/80 border-r w-14 h-full text-zinc-400 shrink-0">
              <div className="flex flex-col items-center gap-3.5">
                {/* Brand Icon */}
                <div className="flex justify-center items-center bg-gradient-to-tr from-amber-500 to-emerald-600 shadow-md rounded-lg w-8 h-8 font-display font-bold text-white text-xs">
                  ☀️
                </div>
                <div className="bg-zinc-800 my-0.5 w-6 h-px" />

                {/* Vertical App Icons */}
                <button className="flex justify-center items-center bg-zinc-800/90 hover:bg-zinc-700 rounded-lg w-8 h-8 text-white transition">
                  <Search className="w-3.5 h-3.5" />
                </button>
                <button className="flex justify-center items-center hover:bg-zinc-800/60 rounded-lg w-8 h-8 text-zinc-400 hover:text-white transition">
                  <Plus className="w-3.5 h-3.5" />
                </button>
                <button className="flex justify-center items-center hover:bg-zinc-800/60 rounded-lg w-8 h-8 text-zinc-400 hover:text-white transition">
                  <Layers className="w-3.5 h-3.5" />
                </button>
                <button className="flex justify-center items-center hover:bg-zinc-800/60 rounded-lg w-8 h-8 text-zinc-400 hover:text-white transition">
                  <Compass className="w-3.5 h-3.5" />
                </button>
                <button className="flex justify-center items-center hover:bg-zinc-800/60 rounded-lg w-8 h-8 text-zinc-400 hover:text-white transition">
                  <Moon className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Bottom Dock Status */}
              <div className="flex flex-col items-center gap-2 mt-auto">
                <div className="font-sans font-bold text-[8px] text-zinc-500 text-center leading-tight">
                  Fri 6 <br />
                  <span className="text-zinc-400">12:37</span>
                </div>
                <div className="flex justify-center items-center bg-emerald-800 shadow-xs rounded-full w-7 h-7 font-bold text-[11px] text-white">
                  {data.userInitials}
                </div>
              </div>
            </div>

            {/* Main Application Container */}
            <div className="flex flex-col flex-1 bg-[#EEF2F6] h-full min-h-0 overflow-hidden">
              {/* Top Application Header Bar (Compact py-2 shrink-0) */}
              <div className="flex xl:flex-row flex-col justify-between xl:items-center gap-2 bg-white shadow-xs px-4 sm:px-5 py-2 border-zinc-200/90 border-b shrink-0">
                {/* Brand title + Nav pills */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-5">
                  {/* Brand */}
                  <div className="flex items-center gap-2">
                    <div className="flex justify-center items-center bg-zinc-900 shadow-xs rounded-lg w-7 h-7 font-bold text-[11px] text-white">
                      ⚡
                    </div>
                    <div>
                      <h4 className="font-display font-extrabold text-zinc-950 text-xs leading-tight">
                        SuryaNexa
                      </h4>
                      <p className="font-sans font-bold text-[8px] text-zinc-500 uppercase tracking-wider">
                        FIELD ERP
                      </p>
                    </div>
                  </div>

                  {/* Header Navigation Pills */}
                  <div className="flex items-center gap-1 overflow-x-auto font-sans font-semibold text-[11px]">
                    {[
                      { name: "Overview", badge: null },
                      { name: "Projects", badge: null },
                      { name: "Site", badge: "2" },
                      { name: "Supply", badge: "16" },
                      { name: "Money", badge: "13" },
                      { name: "Insights", badge: null },
                      { name: "Documents", badge: null },
                    ].map((tab) => (
                      <button
                        key={tab.name}
                        onClick={() => setActiveTab(tab.name)}
                        className={`px-2.5 py-1 rounded-full transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${activeTab === tab.name
                            ? "bg-[#18222D] text-white font-bold shadow-xs"
                            : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100"
                          }`}
                      >
                        <span>{tab.name}</span>
                        {tab.badge && (
                          <span
                            className={`text-[8px] px-1 py-0.1 rounded-full font-bold ${activeTab === tab.name
                                ? "bg-emerald-500 text-white"
                                : "bg-rose-500 text-white"
                              }`}
                          >
                            {tab.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right Status Cluster */}
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1.5 bg-zinc-100/80 px-2 py-1 rounded-full font-sans font-semibold text-[11px] text-zinc-700">
                    <span className="bg-emerald-500 rounded-full w-1.5 h-1.5 animate-pulse" />
                    <span>9:40 AM Live</span>
                  </div>

                  <div className="relative">
                    <button className="flex justify-center items-center bg-zinc-100 hover:bg-zinc-200 rounded-full w-7 h-7 text-zinc-700 transition">
                      <Bell className="w-3.5 h-3.5" />
                    </button>
                    <span className="-top-0.5 -right-0.5 absolute flex justify-center items-center bg-rose-500 rounded-full w-3.5 h-3.5 font-bold text-[8px] text-white">
                      4
                    </span>
                  </div>

                  {/* Tenant / Organization Selector */}
                  <div className="hidden sm:flex items-center gap-1.5 pl-2 border-zinc-200 border-l text-left">
                    <div className="flex justify-center items-center bg-zinc-200 rounded-md w-6 h-6 font-bold text-[10px] text-zinc-800">
                      {data.userInitials}
                    </div>
                    <div className="leading-tight">
                      <p className="max-w-[130px] font-sans font-bold text-[11px] text-zinc-900 truncate">
                        {data.tenantName}
                      </p>
                      <p className="max-w-[130px] font-sans text-[9px] text-zinc-500 truncate">
                        {data.tenantLocation}
                      </p>
                    </div>
                    <ChevronDown className="w-3 h-3 text-zinc-400" />
                  </div>

                  <div className="flex justify-center items-center bg-[#18222D] rounded-full w-7 h-7 font-bold text-[10px] text-white">
                    {data.userInitials}
                  </div>
                </div>
              </div>

              {/* Main Canvas Body: 16:9 responsive display with hidden scrollbar */}
              <div className="[&::-webkit-scrollbar]:hidden flex-1 p-3 sm:p-4 lg:p-4.5 min-h-0 [-ms-overflow-style:none] overflow-y-auto [scrollbar-width:none]">
                {/* High-quality cinematic transitions between role dashboards */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeRole}
                    initial={{ opacity: 0, y: 12, filter: "blur(3px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{
                      opacity: 0,
                      y: -12,
                      filter: "blur(3px)",
                      transition: { duration: 0.16, ease: [0.16, 1, 0.3, 1] },
                    }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="gap-3.5 grid grid-cols-1 lg:grid-cols-12"
                  >
                    {/* LEFT COLUMN: 9 COLUMNS OUT OF 12 */}
                    <div className="space-y-3.5 lg:col-span-8 xl:col-span-9">
                      {/* ROW 1: Greeting & Daylight Arc (60%) + AI Insights Card (40%) */}
                      <div className="gap-3.5 grid grid-cols-1 md:grid-cols-12">
                        {/* 1. Greeting Card with Daylight Arc */}
                        <div className="flex flex-col justify-between md:col-span-7 bg-white shadow-xs p-4 sm:p-4.5 border border-zinc-200/90 rounded-2xl">
                          <div className="flex sm:flex-row flex-col justify-between sm:items-start gap-3">
                            <div>
                              <p className="mb-0.5 font-sans font-semibold text-[10px] text-zinc-600">
                                Wednesday, October 21, 2026
                              </p>
                              <h3 className="font-display font-extrabold text-zinc-950 text-xl sm:text-2xl text-balance tracking-tight">
                                {data.greetingName}
                              </h3>
                              <p className="mt-1 max-w-sm font-sans font-medium text-[11px] text-zinc-700 sm:text-xs text-pretty leading-relaxed">
                                {data.greetingSubtitle}
                              </p>
                            </div>

                            {/* Daylight Left on Site Arc Gauge */}
                            <div className="bg-zinc-50/80 p-2.5 border border-zinc-200/80 rounded-xl min-w-[145px] text-center shrink-0">
                              <p className="font-sans font-bold text-[9px] text-zinc-600 uppercase tracking-wider">
                                Daylight left on site
                              </p>
                              <div className="relative flex justify-center items-end mx-auto mt-0.5 w-28 h-13">
                                <svg className="w-28 h-13" viewBox="0 0 100 50">
                                  <path
                                    d="M 10 50 A 40 40 0 0 1 90 50"
                                    fill="none"
                                    stroke="#e2e8f0"
                                    strokeWidth="6"
                                    strokeDasharray="3 3"
                                  />
                                  <path
                                    d="M 10 50 A 40 40 0 0 1 72 20"
                                    fill="none"
                                    stroke="#f59e0b"
                                    strokeWidth="6"
                                    strokeLinecap="round"
                                  />
                                  <circle cx="72" cy="20" r="4" fill="#f59e0b" className="animate-pulse" />
                                </svg>
                                <span className="bottom-0 absolute font-display font-extrabold text-zinc-950 text-sm">
                                  {data.daylightText}
                                </span>
                              </div>
                              <div className="flex justify-between mt-0.5 px-1 font-sans font-semibold text-[8px] text-zinc-500">
                                <span>{data.sunrise}</span>
                                <span>{data.sunset}</span>
                              </div>
                              <p className="mt-0.5 font-sans font-semibold text-[9px] text-zinc-600">
                                {data.daylightSub}
                              </p>
                            </div>
                          </div>

                          {/* Weather & Site Status Pills */}
                          <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-zinc-100 border-t font-sans font-semibold text-[10px] text-zinc-800">
                            <span className="flex items-center gap-1 bg-zinc-50 px-2 py-0.5 border border-zinc-200/80 rounded-md">
                              <span>🌤</span> {data.weatherTemp} · {data.weatherCity}
                            </span>
                            <span className="flex items-center gap-1 bg-zinc-50 px-2 py-0.5 border border-zinc-200/80 rounded-md">
                              <span>💨</span> {data.weatherWind}
                            </span>
                            <span className="flex items-center gap-1 bg-emerald-50 px-2 py-0.5 border border-emerald-200 rounded-md text-emerald-900">
                              <span className="bg-emerald-600 rounded-full w-1.5 h-1.5 animate-pulse" />
                              {data.sitesCount}
                            </span>
                          </div>
                        </div>

                        {/* 2. Dark Emerald AI Project Insights Card */}
                        <div className="relative flex flex-col justify-between md:col-span-5 bg-[#0A332C] shadow-md p-4 sm:p-4.5 border border-emerald-600/30 rounded-2xl overflow-hidden text-white">
                          <div className="top-0 right-0 absolute bg-emerald-500/10 blur-2xl rounded-full w-36 h-36 pointer-events-none" />

                          <div>
                            {/* Card Title */}
                            <div className="flex items-center gap-1.5 mb-2.5">
                              <div className="flex justify-center items-center bg-emerald-500/20 rounded-md w-5 h-5 text-emerald-300">
                                <Sparkles className="w-3 h-3" />
                              </div>
                              <span className="font-sans font-bold text-[11px] text-emerald-200">
                                AI project insights
                              </span>
                            </div>

                            {/* Radial Gauge Dial + Score */}
                            <div className="flex items-center gap-3 mb-2.5">
                              <div className="relative flex justify-center items-center w-14 h-14 shrink-0">
                                <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
                                  <path
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="#13473E"
                                    strokeWidth="3.5"
                                  />
                                  <path
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="#34D399"
                                    strokeWidth="3.5"
                                    strokeDasharray={`${data.aiScore}, 100`}
                                    strokeLinecap="round"
                                  />
                                </svg>
                                <div className="absolute text-center">
                                  <span className="block font-display font-extrabold text-white text-xs leading-none">
                                    {data.aiScore}
                                  </span>
                                  <span className="font-sans font-semibold text-[7px] text-emerald-200 uppercase">
                                    /100
                                  </span>
                                </div>
                              </div>

                              <div>
                                <p className="font-sans font-bold text-[11px] text-white leading-tight">
                                  Delivery confidence
                                </p>
                                <p className="mt-0.5 font-sans text-[10px] text-emerald-100 leading-snug">
                                  {data.aiConfidenceText}
                                </p>
                              </div>
                            </div>

                            {/* Key Insight Box */}
                            <div className="bg-[#06241F] p-2.5 border border-emerald-500/20 rounded-xl font-sans text-[10px]">
                              <p className="flex items-center gap-1 mb-0.5 font-bold text-[10px] text-emerald-300">
                                <span>⚡</span> Key insight
                              </p>
                              <p className="text-[10px] text-emerald-100 leading-relaxed">
                                {data.aiInsightText}
                              </p>
                            </div>
                          </div>

                          <button className="flex justify-center items-center gap-1 bg-white/10 hover:bg-white/20 mt-2.5 py-1.5 border border-white/15 rounded-lg w-full font-sans font-bold text-[10px] text-white active:scale-[0.97] transition cursor-pointer">
                            <span>View full AI analysis</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* ROW 2: 6 Pastel KPI Metric Tiles */}
                      <div className="gap-2.5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
                        {data.kpis.map((kpi, idx) => {
                          const pastelStyles = {
                            green: "bg-[#E6F4EA] border-[#CEEAD6] text-[#137333]",
                            gray: "bg-[#F1F3F4] border-[#DADCE0] text-[#3C4043]",
                            red: "bg-[#FCE8E6] border-[#FAD2CF] text-[#C5221F]",
                            blue: "bg-[#E8F0FE] border-[#D2E3FC] text-[#1A73E8]",
                            amber: "bg-[#FEF7E0] border-[#FEEFC3] text-[#B06000]",
                            slate: "bg-[#F3F4F6] border-[#E5E7EB] text-[#374151]",
                          };

                          return (
                            <div
                              key={idx}
                              className={`rounded-xl p-2.5 border transition-all hover:shadow-xs flex flex-col justify-between ${pastelStyles[kpi.color]
                                }`}
                            >
                              <span className="opacity-90 font-sans font-bold text-[10px] truncate tracking-tight">
                                {kpi.label}
                              </span>
                              <div className="my-1">
                                <span className="font-display font-extrabold text-zinc-950 text-xl sm:text-2xl tracking-tight">
                                  {kpi.val}
                                </span>
                              </div>
                              <span className="opacity-85 font-sans font-semibold text-[9px] truncate">
                                {kpi.sub}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* ROW 3: 3 Data Cards (Budget Donut, Timeline S-Curve, Site-Wise Performance) */}
                      <div className="gap-3.5 grid grid-cols-1 md:grid-cols-3">
                        {/* 1. Budget Utilization Card with Donut Chart */}
                        <div className="flex flex-col justify-between bg-white shadow-xs p-3.5 border border-zinc-200/90 rounded-2xl">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center gap-1.5">
                                <PieChart className="w-3.5 h-3.5 text-zinc-500" />
                                <h4 className="font-display font-bold text-[11px] text-zinc-900">
                                  {data.budgetTitle}
                                </h4>
                              </div>
                            </div>

                            {/* Donut Chart with Centered % */}
                            <div className="relative flex justify-center items-center mx-auto my-1 w-22 h-22">
                              <svg className="w-22 h-22 -rotate-90" viewBox="0 0 36 36">
                                <path
                                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                  fill="none"
                                  stroke="#e2e8f0"
                                  strokeWidth="4"
                                />
                                <path
                                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                  fill="none"
                                  stroke="#0284c7"
                                  strokeWidth="4"
                                  strokeDasharray={`${data.donutPercent}, 100`}
                                  strokeLinecap="round"
                                />
                              </svg>
                              <div className="absolute text-center">
                                <span className="block font-display font-extrabold text-zinc-950 text-sm leading-tight">
                                  {data.donutPercent}%
                                </span>
                                <span className="font-sans font-semibold text-[8px] text-zinc-500 uppercase">
                                  active
                                </span>
                              </div>
                            </div>

                            {/* Breakdown List */}
                            <div className="space-y-1 mt-1 pt-1 border-zinc-100 border-t font-sans text-[10px]">
                              {data.budgetBreakdown.map((item, i) => (
                                <div key={i} className="flex justify-between items-center text-zinc-700">
                                  <span className="flex items-center gap-1.5 font-medium text-[10px] text-zinc-600 truncate">
                                    <span className={`w-1.5 h-1.5 rounded-full ${item.dotColor}`} />
                                    {item.label}
                                  </span>
                                  <span className="font-display font-bold text-zinc-950">
                                    {item.amount}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="mt-2 pt-2 border-zinc-100 border-t font-sans font-bold text-[9px] text-emerald-700">
                            <span>{data.budgetFooter}</span>
                          </div>
                        </div>

                        {/* 2. Timeline Progress S-Curve Card */}
                        <div className="flex flex-col justify-between bg-white shadow-xs p-3.5 border border-zinc-200/90 rounded-2xl">
                          <div>
                            <div className="flex justify-between items-center mb-1.5">
                              <div className="flex items-center gap-1.5">
                                <TrendingUp className="w-3.5 h-3.5 text-zinc-500" />
                                <h4 className="font-display font-bold text-[11px] text-zinc-900">
                                  {data.timelineTitle}
                                </h4>
                              </div>
                              <span className="bg-zinc-100 px-1.5 py-0.2 rounded-full font-sans font-semibold text-[9px] text-zinc-600">
                                All ▾
                              </span>
                            </div>

                            {/* Legend */}
                            <div className="flex items-center gap-2.5 mb-1 font-sans font-semibold text-[8px] text-zinc-500">
                              <span className="flex items-center gap-1">
                                <span className="inline-block bg-zinc-400 w-1.5 h-0.5" /> Planned
                              </span>
                              <span className="flex items-center gap-1">
                                <span className="inline-block bg-sky-500 w-1.5 h-0.5" /> Actual
                              </span>
                              <span className="flex items-center gap-1">
                                <span className="inline-block bg-emerald-500 w-1.5 h-0.5" /> Forecast
                              </span>
                            </div>

                            {/* S-Curve Graphic Simulation */}
                            <div className="relative flex items-end my-1 h-20">
                              <svg className="w-full h-full" viewBox="0 0 200 80" preserveAspectRatio="none">
                                <defs>
                                  <linearGradient id="scurveGradientCompact" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.25" />
                                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.0" />
                                  </linearGradient>
                                </defs>
                                <path
                                  d="M 0 75 Q 60 70, 100 45 T 200 10 L 200 80 L 0 80 Z"
                                  fill="url(#scurveGradientCompact)"
                                />
                                <path
                                  d="M 0 75 Q 60 70, 100 45 T 200 10"
                                  fill="none"
                                  stroke="#0284c7"
                                  strokeWidth="2.5"
                                />
                                <circle cx="150" cy="24" r="3.5" fill="#0284c7" />
                              </svg>
                              <span className="top-0.5 right-6 absolute bg-[#18222D] shadow-xs px-1.5 py-0.2 rounded font-sans font-bold text-[8px] text-white">
                                Today
                              </span>
                            </div>

                            <div className="flex justify-between pt-1 border-zinc-100 border-t font-sans font-semibold text-[8px] text-zinc-400">
                              <span>Apr</span>
                              <span>Jun</span>
                              <span>Aug</span>
                              <span className="font-bold text-zinc-950">Oct</span>
                              <span>Dec</span>
                              <span>Mar</span>
                            </div>
                          </div>

                          <div className="mt-2 pt-2 border-zinc-100 border-t font-sans font-bold text-[9px] text-sky-700">
                            <span>Variance: &lt;1.2%</span>
                          </div>
                        </div>

                        {/* 3. Site-Wise Performance Card */}
                        <div className="flex flex-col justify-between bg-white shadow-xs p-3.5 border border-zinc-200/90 rounded-2xl">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                                <h4 className="font-display font-bold text-[11px] text-zinc-900">
                                  Site-wise performance
                                </h4>
                              </div>
                              <span className="font-sans font-semibold text-[9px] text-emerald-700 hover:underline cursor-pointer">
                                All &gt;
                              </span>
                            </div>

                            <div className="space-y-1.5 font-sans text-xs">
                              {data.sites.slice(0, 3).map((site, i) => (
                                <div
                                  key={i}
                                  className="bg-zinc-50 p-1.5 border border-zinc-100/90 rounded-lg"
                                >
                                  <div className="flex justify-between items-center mb-0.5">
                                    <p className="font-bold text-[10px] text-zinc-950 truncate">
                                      {site.name}
                                    </p>
                                    <span
                                      className={`text-[8px] px-1 py-0.1 rounded font-bold ${site.status === "On track"
                                          ? "bg-emerald-100 text-emerald-800"
                                          : "bg-rose-100 text-rose-800"
                                        }`}
                                    >
                                      {site.status}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center mb-0.5 text-[9px] text-zinc-500">
                                    <span>{site.loc}</span>
                                    <span className="font-semibold text-zinc-800">{site.percent}</span>
                                  </div>
                                  <div className="bg-zinc-200 rounded-full w-full h-1 overflow-hidden">
                                    <div
                                      className={`h-full rounded-full ${site.status === "On track" ? "bg-emerald-600" : "bg-rose-500"
                                        }`}
                                      style={{ width: site.percent }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT COLUMN: 3 COLUMNS OUT OF 12 (Calendar + My Tasks + Floating Ask AI) */}
                    <div className="space-y-3.5 lg:col-span-4 xl:col-span-3">
                      {/* 1. CALENDAR & AGENDA WIDGET */}
                      <div className="bg-white shadow-xs p-3.5 border border-zinc-200/90 rounded-2xl">
                        <div className="flex justify-between items-center mb-2 pb-1.5 border-zinc-100 border-b">
                          <div className="flex items-center gap-1.5">
                            <CalendarIcon className="w-3.5 h-3.5 text-zinc-500" />
                            <h4 className="font-display font-bold text-[11px] text-zinc-900">
                              Calendar
                            </h4>
                          </div>
                          <span className="font-sans font-bold text-[9px] text-zinc-700">Oct 2026</span>
                        </div>

                        {/* Calendar Mini Grid (Days 1..31) */}
                        <div className="gap-0.5 grid grid-cols-7 mb-2 font-sans font-semibold text-[9px] text-center">
                          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                            <span key={d} className="py-0.5 text-zinc-400">
                              {d}
                            </span>
                          ))}
                          <span className="py-0.5 text-zinc-300"></span>
                          <span className="py-0.5 text-zinc-300"></span>
                          {Array.from({ length: 31 }, (_, idx) => {
                            const day = idx + 1;
                            const isToday = day === data.selectedDay;
                            const hasDot = [7, 14, 21, 22, 23, 28].includes(day);

                            return (
                              <button
                                key={day}
                                className={`py-0.5 rounded flex flex-col items-center justify-center transition cursor-pointer ${isToday
                                    ? "bg-[#18222D] text-white font-extrabold shadow-xs"
                                    : "text-zinc-700 hover:bg-zinc-100"
                                  }`}
                              >
                                <span>{day}</span>
                                {hasDot && (
                                  <span
                                    className={`w-0.5 h-0.5 rounded-full ${isToday ? "bg-emerald-400" : "bg-sky-500"
                                      }`}
                                  />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Today's Events List */}
                        <div className="pt-2 border-zinc-100 border-t">
                          <div className="flex justify-between items-center mb-1.5 font-sans font-bold text-[10px] text-zinc-900">
                            <span>Today</span>
                            <span className="font-semibold text-[9px] text-zinc-500">
                              {data.calendarEvents.length} events
                            </span>
                          </div>

                          <div className="space-y-1.5 font-sans text-xs">
                            {data.calendarEvents.map((ev, i) => (
                              <div
                                key={i}
                                className="flex items-start gap-1.5 bg-zinc-50 p-1.5 border border-zinc-100 rounded-lg"
                              >
                                <span className={`w-1.5 h-1.5 rounded-full mt-1 shrink-0 ${ev.color}`} />
                                <p className="font-semibold text-[10px] text-zinc-800 leading-tight">
                                  {ev.title}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* 2. MY TASKS WIDGET */}
                      <div className="relative bg-white shadow-xs p-3.5 border border-zinc-200/90 rounded-2xl">
                        <div className="flex justify-between items-center mb-2 pb-1.5 border-zinc-100 border-b">
                          <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <h4 className="font-display font-bold text-[11px] text-zinc-900">
                              My tasks
                            </h4>
                          </div>
                          <span className="font-sans font-semibold text-[9px] text-zinc-500">
                            3 pending
                          </span>
                        </div>

                        <div className="space-y-2 font-sans text-xs">
                          {data.tasks.map((task, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-2 bg-white hover:bg-zinc-50 shadow-2xs p-2 border border-zinc-100 rounded-lg transition"
                            >
                              <input
                                type="checkbox"
                                defaultChecked={i === 0}
                                className="mt-0.5 rounded focus:ring-emerald-500 text-emerald-600 cursor-pointer"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-[10px] text-zinc-900 truncate leading-tight">
                                  {task.title}
                                </p>
                                <div className="flex justify-between items-center mt-0.5 text-[9px] text-zinc-500">
                                  <span className="max-w-[90px] truncate">{task.project}</span>
                                  <span
                                    className={`px-1 py-0.1 rounded font-bold uppercase ${task.priority === "Urgent" || task.priority === "High"
                                        ? "bg-zinc-900 text-white"
                                        : "bg-zinc-100 text-zinc-700"
                                      }`}
                                  >
                                    {task.priority}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Floating "Ask NEXA AI" Button */}
                        <div className="flex justify-end mt-3 pt-2 border-zinc-100 border-t">
                          <button className="inline-flex items-center gap-1.5 bg-[#0A332C] hover:bg-[#07241F] shadow-emerald-950/20 shadow-md px-3 py-1.5 rounded-full font-sans font-bold text-[10px] text-white transition cursor-pointer">
                            <Sparkles className="w-3 h-3 text-emerald-400" />
                            <span>Ask NEXA AI</span>
                            <span className="flex justify-center items-center bg-rose-500 rounded-full w-3.5 h-3.5 font-bold text-[8px] text-white">
                              4
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
