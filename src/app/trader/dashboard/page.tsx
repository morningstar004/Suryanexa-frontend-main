"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  Sparkles,
  Calendar as CalendarIcon,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Clock,
  Zap,
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  CloudSun,
  Wind,
  Radio,
  Plus,
  Building2,
  AlertTriangle,
  Users,
  Search,
  Filter,
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

interface RecentOrder {
  id: string;
  orderId: string;
  customerName: string;
  companyName: string;
  merchandise: string;
  lineItemsCount: number;
  logisticsPartner: string;
  vehicleNumber: string;
  date: string;
  amount: number;
  status: "Ready for Inspection" | "In Transit" | "Processing" | "Delivered" | "Confirmed";
  actionType: "Verify QC" | "Track";
}

const RECENT_ORDERS: RecentOrder[] = [
  {
    id: "ord-9102",
    orderId: "SO-9102",
    customerName: "Rameshwar Patil",
    companyName: "SunGrid EPC Solutions Pvt Ltd",
    merchandise: "Waaree Panels (x48), Sungrow Inverters (x2), Pennar ...",
    lineItemsCount: 4,
    logisticsPartner: "V-Trans India",
    vehicleNumber: "MH 04 AB 4912",
    date: "2026-11-04",
    amount: 1076400,
    status: "Ready for Inspection",
    actionType: "Verify QC",
  },
  {
    id: "ord-9103",
    orderId: "SO-9103",
    customerName: "Hardik Shah",
    companyName: "Mahindra Susten Renewables",
    merchandise: "Tata Panels (x120), Luminous Batteries (x4), Havells C...",
    lineItemsCount: 3,
    logisticsPartner: "Safexpress",
    vehicleNumber: "GJ 06 AX 8820",
    date: "2026-11-03",
    amount: 2191200,
    status: "In Transit",
    actionType: "Track",
  },
  {
    id: "ord-9104",
    orderId: "SO-9104",
    customerName: "Aditya Chauhan",
    companyName: "Amplus Energy Solutions",
    merchandise: "Vikram Panels (x80), Havells Inverters (x2)",
    lineItemsCount: 2,
    logisticsPartner: "TCI Express",
    vehicleNumber: "RJ 14 GB 1104",
    date: "2026-11-05",
    amount: 1480000,
    status: "Processing",
    actionType: "Track",
  },
  {
    id: "ord-9105",
    orderId: "SO-9105",
    customerName: "Kavitha Sundaram",
    companyName: "Fourth Partner Energy",
    merchandise: "Polycab Inverters (x3), Exide Batteries (x12)",
    lineItemsCount: 2,
    logisticsPartner: "Delhivery Freight",
    vehicleNumber: "KA 05 AJ 7741",
    date: "2026-11-02",
    amount: 449100,
    status: "Delivered",
    actionType: "Track",
  },
  {
    id: "ord-9106",
    orderId: "SO-9106",
    customerName: "Deepak Saxena",
    companyName: "CleanMax Enviro Energy Solutions",
    merchandise: "Waaree Panels (x60)",
    lineItemsCount: 1,
    logisticsPartner: "Gati-KWE",
    vehicleNumber: "TS 09 UA 3321",
    date: "2026-11-05",
    amount: 744000,
    status: "Confirmed",
    actionType: "Track",
  },
];

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

// Reusable High-Performance Numerical Count-Up with smooth cubic ease-out
function CountUp({
  end,
  duration = 1.2,
  decimals = 0,
  prefix = "",
  suffix = "",
}: {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // Smooth cubic ease-out curve
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = easeOut * end;
      setValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setValue(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration]);

  return (
    <span>
      {prefix}
      {decimals > 0
        ? value.toFixed(decimals)
        : Math.round(value).toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

// Orchestrated staggered entrance variants for widgets
const dashboardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

const dashboardItemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 280,
      damping: 24,
    },
  },
};

export default function TraderDashboardPage() {
  const [userName, setUserName] = useState("Noor");
  const [selectedProject, setSelectedProject] = useState("All projects");
  // Default to day 21 matching the user reference screenshot
  const [selectedDay, setSelectedDay] = useState<number>(21);
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
  const [orderSearch, setOrderSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  const filteredOrders = RECENT_ORDERS.filter((ord) => {
    const term = orderSearch.toLowerCase().trim();
    const matchesSearch =
      !term ||
      ord.orderId.toLowerCase().includes(term) ||
      ord.customerName.toLowerCase().includes(term) ||
      ord.companyName.toLowerCase().includes(term) ||
      ord.merchandise.toLowerCase().includes(term) ||
      ord.logisticsPartner.toLowerCase().includes(term) ||
      ord.vehicleNumber.toLowerCase().includes(term) ||
      ord.date.toLowerCase().includes(term);

    const matchesStatus =
      statusFilter === "All Statuses" || ord.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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
    <motion.div
      variants={dashboardContainerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4 sm:space-y-5 bg-[#ECEFF0] pb-10 font-sans text-zinc-900 select-none"
    >
      {/* =========================================================================
          TOP COMMAND SECTION (9 Cols Main + 3 Cols Calendar)
         ========================================================================= */}
      <div className="items-stretch gap-4 sm:gap-5 grid grid-cols-1 lg:grid-cols-12">
        {/* Left/Main Column: 2 Top Command Cards + 6 Metric Stat Cards (lg:col-span-9) */}
        <div className="flex flex-col justify-between space-y-4 lg:col-span-9">
          {/* Top 2 Cards: Field Operations Greeting (lg:col-span-7) & AI Delivery Confidence (lg:col-span-5) */}
          <div className="items-stretch gap-4 sm:gap-5 grid grid-cols-1 lg:grid-cols-12">
            {/* Left Card: Good morning, Noor (lg:col-span-7) */}
            <motion.div
              variants={dashboardItemVariants}
              className="flex flex-row justify-between space-y-3 lg:col-span-12 bg-white shadow-2xs p-5 sm:p-6 border border-zinc-200/90 rounded-3xl"
            >
              <div className="flex sm:flex-row flex-col justify-between sm:items-start gap-4 pr-12">
                {/* Left Column: Date with CalendarIcon, Greeting, Description, and Environmental Telemetry Strip */}
                <div className="flex flex-col flex-1 justify-between space-y-3">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1.5 text-zinc-500">
                      <CalendarIcon className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                      <p className="font-sans font-medium text-xs">
                        Wednesday, October 21, 2026
                      </p>
                    </div>
                    <h1 className="font-display font-extrabold text-zinc-950 text-2xl sm:text-3xl leading-tight tracking-tight">
                      Good morning,<br />{userName}
                    </h1>
                    <p className="mt-2 max-w-sm font-sans text-zinc-600 sm:text-[13px] text-xs leading-relaxed">
                      7 builds are live across five states. 13 approvals and one delayed site need you today.
                    </p>
                  </div>

                  {/* Environmental Telemetry Strip placed directly under greeting column */}
                  <div className="flex flex-col gap-2 pt-1">
                    <div>
                      <span className="inline-flex items-center gap-1.5 bg-zinc-100/90 px-3 py-1 rounded-full font-sans text-zinc-700 text-xs">
                        <CloudSun className="w-3.5 h-3.5 text-amber-500" />
                        <span>61°F Clear · Tooele</span>
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
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
                </div>

                {/* Right Column: Daylight Remaining Solar Instrument */}
                <div className="flex flex-col justify-center items-center px-4 pt-14 w-full sm:w-52 text-center shrink-0">
                  {/* Solar Arc Gauge with Dashed Track & Concentric Elements */}
                  <div className="relative flex justify-center items-center mx-auto w-48 h-26">
                    <svg viewBox="0 0 180 95" className="w-full h-full overflow-visible">
                      {/* Dashed background track matching reference */}
                      <path
                        d="M 25 85 A 65 65 0 0 1 155 85"
                        fill="none"
                        stroke="#cbd5e1"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                      />
                      {/* Solar progress arc (coincident with track, 30% progress with smooth entrance) */}
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.4, ease: "easeOut" }}
                        d="M 25 85 A 65 65 0 0 1 51.8 32.4"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                      {/* Sun position marker with glowing halo */}
                      <circle cx="51.8" cy="32.4" r="7.5" fill="#f59e0b" fillOpacity="0.25" />
                      <circle cx="51.8" cy="32.4" r="4" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                    </svg>

                    {/* Center metric inside the arch */}
                    <div className="absolute inset-0 flex flex-col justify-end items-center pb-1.5 pointer-events-none">
                      <span className="font-sans font-medium text-[10px] text-zinc-400 tracking-tight">
                        Daylight left on site
                      </span>
                      <span className="font-display font-semibold text-zinc-950 text-xl leading-tight">
                        7h 44min
                      </span>
                      <span className="font-sans text-[9.5px] text-zinc-400">
                        Crews stand down at 18:00
                      </span>
                    </div>
                  </div>

                  {/* Sunrise / Sunset Ticks under the arch base */}
                  <div className="flex justify-between mt-1 px-5 w-full font-mono text-[10.5px] text-zinc-400">
                    <span>7:46</span>
                    <span>18:38</span>
                  </div>
                </div>

              </div>
              {/* Center Card: AI Project Insights & Critical Path Diagnosis (lg:col-span-5) */}
              <motion.div
                variants={dashboardItemVariants}
                className="relative flex flex-col justify-between space-y-3 lg:col-span-5 bg-[#0e3129] shadow-2xs p-4 sm:p-5 border border-[#1b4b40] rounded-3xl overflow-hidden text-white"
              >
                {/* Subtle environmental glow */}
                <div className="-top-12 -right-12 absolute bg-emerald-500/10 blur-3xl rounded-full w-48 h-48 pointer-events-none" />

                <div>
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex justify-center items-center bg-[#98e2c6] rounded-full w-5.5 h-5.5 text-[#0e3129] shrink-0">
                      <Sparkles className="fill-current w-3 h-3" />
                    </div>
                    <span className="font-display font-bold text-white text-xs tracking-wide">
                      AI project insights
                    </span>
                  </div>

                  {/* Speedometer Dial Gauge + Delivery Confidence */}
                  <div className="flex items-center gap-3.5 pt-1">
                    {/* Dial gauge matching reference */}
                    <div className="relative flex justify-center items-center w-28 h-20 shrink-0">
                      <svg viewBox="0 0 110 70" className="w-full h-full overflow-visible">
                        {/* Background Arc Track */}
                        <path
                          d="M 12 58 A 42 42 0 0 1 98 58"
                          fill="none"
                          stroke="#174f44"
                          strokeWidth="6"
                          strokeLinecap="round"
                        />
                        {/* Active Arc (green 75% with animated draw) */}
                        <motion.path
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.4, ease: "easeOut" }}
                          d="M 12 58 A 42 42 0 0 1 84 28"
                          fill="none"
                          stroke="#22c55e"
                          strokeWidth="6"
                          strokeLinecap="round"
                        />
                      </svg>
                      {/* Center metric with animated count-up */}
                      <div className="bottom-0 absolute flex flex-col items-center leading-none">
                        <span className="font-display font-extrabold text-white text-xl">
                          <CountUp end={75} />
                        </span>
                        <span className="mt-0.5 font-sans text-[#9ee8ce]/80 text-[8.5px]">
                          out of 100
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-display font-bold text-white text-xs sm:text-sm leading-snug">
                        Delivery confidence
                      </h4>
                      <p className="mt-1 font-sans text-[#a3d4c6] text-[11px] sm:text-xs leading-snug">
                        Good chance of on-time delivery across the portfolio.
                      </p>
                    </div>
                  </div>

                  {/* Critical Path Insight Callout */}
                  <div className="space-y-0.5 bg-[#0b2620]/80 mt-2.5 p-2.5 border border-[#1b4b40] rounded-xl">
                    <div className="flex items-center gap-1.5 font-bold text-[11px] text-teal-300">
                      <Sparkles className="w-3 h-3 text-teal-300" />
                      <span>Key insight</span>
                    </div>
                    <p className="font-sans text-[11.5px] text-zinc-200 leading-relaxed">
                      Pinecrest will miss its COD by ~3 weeks
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toast.info("Analyzing supply chain lead times & transformer customs clearance...")}
                  className="flex justify-center items-center gap-1.5 bg-[#09221d] hover:bg-[#0e2f28] px-3 py-2 border border-white/10 rounded-xl w-full font-sans font-semibold text-white text-xs transition-colors cursor-pointer"
                >
                  <span>View full AI analysis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Row 2: 6 Metric Stat Cards inside lg:col-span-9 directly below Card 1 & Card 2 */}
          <div className="gap-3 sm:gap-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {/* Metric 1: Active projects */}
            <motion.div
              variants={dashboardItemVariants}
              className="flex flex-col justify-between bg-[#d4efe3] shadow-2xs p-3.5 sm:p-4 border border-emerald-300/40 rounded-2xl"
            >
              <div className="flex items-center gap-2">
                <div className="flex justify-center items-center bg-[#bbf0da] rounded-lg w-7 h-7 text-emerald-800 shrink-0">
                  <Building2 className="w-3.5 h-3.5" />
                </div>
                <span className="font-semibold text-zinc-700 text-xs">Active projects</span>
              </div>
              <div className="mt-1.5 font-display font-extrabold text-zinc-950 text-2xl">
                <CountUp end={7} />
              </div>
              <div className="flex items-center gap-1 mt-0.5 font-sans font-medium text-[11px] text-emerald-800">
                <TrendingUp className="w-3 h-3 text-emerald-800" />
                <span>+1 this quarter</span>
              </div>
            </motion.div>

            {/* Metric 2: Completed builds */}
            <motion.div
              variants={dashboardItemVariants}
              className="flex flex-col justify-between bg-white shadow-2xs p-3.5 sm:p-4 border border-zinc-200/90 rounded-2xl"
            >
              <div className="flex items-center gap-2">
                <div className="flex justify-center items-center bg-emerald-50 border border-emerald-100 rounded-lg w-7 h-7 text-emerald-600 shrink-0">
                  <Check className="stroke-[2.5] w-3.5 h-3.5" />
                </div>
                <span className="font-semibold text-zinc-700 text-xs">Completed builds</span>
              </div>
              <div className="mt-1.5 font-display font-extrabold text-zinc-950 text-2xl">
                <CountUp end={32} />
              </div>
              <div className="flex items-center gap-1 mt-0.5 font-sans font-medium text-[11px] text-zinc-500">
                <TrendingUp className="w-3 h-3 text-zinc-400" />
                <span>+2 vs last year</span>
              </div>
            </motion.div>

            {/* Metric 3: Delayed projects */}
            <motion.div
              variants={dashboardItemVariants}
              className="flex flex-col justify-between bg-[#fcdcdb] shadow-2xs p-3.5 sm:p-4 border border-rose-200/60 rounded-2xl"
            >
              <div className="flex items-center gap-2">
                <div className="flex justify-center items-center bg-[#f8bebc] rounded-lg w-7 h-7 text-rose-800 shrink-0">
                  <AlertTriangle className="w-3.5 h-3.5" />
                </div>
                <span className="font-semibold text-zinc-700 text-xs">Delayed projects</span>
              </div>
              <div className="mt-1.5 font-display font-extrabold text-zinc-950 text-2xl">
                <CountUp end={2} />
              </div>
              <span className="block mt-0.5 font-sans font-medium text-[11px] text-rose-800">Same as last month</span>
            </motion.div>

            {/* Metric 4: Work packages live */}
            <motion.div
              variants={dashboardItemVariants}
              className="flex flex-col justify-between bg-white shadow-2xs p-3.5 sm:p-4 border border-zinc-200/90 rounded-2xl"
            >
              <div className="flex items-center gap-2">
                <div className="flex justify-center items-center bg-zinc-100 rounded-lg w-7 h-7 text-zinc-600 shrink-0">
                  <TrendingUp className="w-3.5 h-3.5" />
                </div>
                <span className="font-semibold text-zinc-700 text-xs">Work packages live</span>
              </div>
              <div className="mt-1.5 font-display font-extrabold text-zinc-950 text-2xl">
                <CountUp end={17} />
              </div>
              <div className="flex items-center gap-1 mt-0.5 font-sans font-medium text-[11px] text-zinc-500">
                <TrendingUp className="w-3 h-3 text-zinc-400" />
                <span>1 start this week</span>
              </div>
            </motion.div>

            {/* Metric 5: Pending approvals */}
            <motion.div
              variants={dashboardItemVariants}
              className="flex flex-col justify-between bg-[#fef3c7] shadow-2xs p-3.5 sm:p-4 border border-amber-200/60 rounded-2xl"
            >
              <div className="flex items-center gap-2">
                <div className="flex justify-center items-center bg-[#fde68a] rounded-lg w-7 h-7 text-amber-800 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span className="font-semibold text-zinc-700 text-xs">Pending approvals</span>
              </div>
              <div className="mt-1.5 font-display font-extrabold text-zinc-950 text-2xl">
                <CountUp end={13} />
              </div>
              <div className="flex items-center gap-1 mt-0.5 font-sans font-medium text-[11px] text-amber-800">
                <Clock className="w-3 h-3 text-amber-800" />
                <span>3 due today</span>
              </div>
            </motion.div>

            {/* Metric 6: Crew attendance */}
            <motion.div
              variants={dashboardItemVariants}
              className="flex flex-col justify-between bg-white shadow-2xs p-3.5 sm:p-4 border border-zinc-200/90 rounded-2xl"
            >
              <div className="flex items-center gap-2">
                <div className="flex justify-center items-center bg-zinc-100 rounded-lg w-7 h-7 text-zinc-600 shrink-0">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <span className="font-semibold text-zinc-700 text-xs">Crew attendance</span>
              </div>
              <div className="mt-1.5 font-display font-extrabold text-zinc-950 text-2xl">
                <CountUp end={90} suffix="%" />
              </div>
              <div className="flex items-center gap-1 mt-0.5 font-sans font-medium text-[11px] text-zinc-500">
                <TrendingUp className="w-3 h-3 text-zinc-400" />
                <span>19 of 21 on site</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Card: High-Fidelity Calendar Widget (lg:col-span-3 - Matching User Image) */}
        <motion.div
          variants={dashboardItemVariants}
          className="flex flex-col justify-between space-y-3 lg:col-span-3 bg-white shadow-2xs p-4 sm:p-5 border border-zinc-200/90 rounded-3xl"
        >
          <div className="space-y-3">
            {/* 1. Header with Teal Badge & Calendar Title */}
            <div className="flex items-center gap-2">
              <div className="flex justify-center items-center bg-[#e6f4f1] border border-[#d2ebe5] rounded-xl w-8 h-8 text-[#0f766e] shrink-0">
                <CalendarIcon className="stroke-[1.8] w-4 h-4" />
              </div>
              <h3 className="font-display font-bold text-zinc-950 text-sm">
                Calendar
              </h3>
            </div>

            {/* 2. Month Bar with Month Title & Circular Arrow Controls */}
            <div className="flex justify-between items-center pt-0.5">
              <h4 className="font-display font-bold text-zinc-900 text-xs">
                October 2026
              </h4>
              <div className="flex items-center gap-1">
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
            <div className="grid grid-cols-7 py-0.5 font-semibold text-zinc-600 text-xs text-center">
              <span>Mo</span>
              <span>Tu</span>
              <span>We</span>
              <span>Th</span>
              <span>Fr</span>
              <span>Sa</span>
              <span>Su</span>
            </div>

            {/* 4. Calendar Days Grid (Full Original Size matching reference) */}
            <div className="gap-y-1 grid grid-cols-7 text-center">
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
                      className={`relative flex flex-col items-center justify-center w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-xl transition-all ${isToday
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
                              className={`w-1 h-1 rounded-full shrink-0 ${isToday ? "bg-white" : dotColor}`}
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

          {/* 5. Bottom Detail View (e.g. Today · 3 events / Saturday, Oct 24 · 0 events) */}
          <div className="space-y-1.5 pt-3 border-zinc-100 border-t">
            <div className="flex justify-between items-center text-xs">
              <span className="font-display font-bold text-zinc-950 text-xs">
                {selectedDay === 21 ? "Today" : selectedDayFormatted}
              </span>
              <span className="font-sans text-[11px] text-zinc-500">
                {dayEvents.length} events
              </span>
            </div>

            <div className="min-h-[48px]">
              {dayEvents.length === 0 ? (
                <p className="mt-1 font-sans text-zinc-500 text-xs">
                  Nothing scheduled.
                </p>
              ) : (
                <div className="space-y-1.5 mt-1 font-sans text-[11px] text-zinc-700">
                  {dayEvents.map((evt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${evt.color}`} />
                      <span className="truncate">{evt.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* =========================================================================
          MIDDLE ROW 2: Analytics & Field Execution Row
          Left 9 Columns (lg:col-span-9):
            1. Budget utilization (lg:col-span-3 - 25% of left stream)
            2. Timeline progress (lg:col-span-6 - 50% WIDENED, spacious S-curve chart)
            3. Site-wise performance (lg:col-span-3 - 25% of left stream)
          Right 3 Columns (lg:col-span-3):
            4. My tasks (aligned directly beneath Calendar widget)
         ========================================================================= */}
      <div className="items-stretch gap-4 sm:gap-5 grid grid-cols-1 lg:grid-cols-12">
        {/* Left Container: 3 Analytics Cards (lg:col-span-9) */}
        <div className="items-stretch gap-4 sm:gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 lg:col-span-9">
          {/* 1. Budget Utilization (lg:col-span-3) */}
          <motion.div
            variants={dashboardItemVariants}
            className="flex flex-col justify-between space-y-3 lg:col-span-3 bg-white shadow-2xs p-4 sm:p-5 border border-zinc-200/90 rounded-3xl"
          >
            <div>
              <div className="flex justify-between items-center pb-2 border-zinc-100 border-b">
                <span className="flex items-center gap-1.5 font-display font-bold text-zinc-950 text-xs sm:text-sm">
                  <Clock className="w-4 h-4 text-zinc-600" />
                  <span>Budget utilization</span>
                </span>
              </div>

              {/* Circular Donut Gauge matching reference */}
              <div className="relative flex justify-center items-center mx-auto my-3 w-36 h-36">
                <svg className="w-full h-full -rotate-90 transform">
                  <circle
                    cx="72"
                    cy="72"
                    r="52"
                    stroke="#f1f5f9"
                    strokeWidth="14"
                    fill="transparent"
                  />
                  <motion.circle
                    cx="72"
                    cy="72"
                    r="52"
                    stroke="#0284c7"
                    strokeWidth="14"
                    fill="transparent"
                    strokeDasharray={326.7}
                    initial={{ strokeDashoffset: 326.7 }}
                    animate={{ strokeDashoffset: 326.7 * (1 - 0.38) }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute text-center leading-none">
                  <div className="font-display font-black text-zinc-950 text-2xl">
                    <CountUp end={38} suffix="%" />
                  </div>
                  <span className="block mt-0.5 font-mono font-bold text-[10px] text-zinc-400 uppercase tracking-widest">
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
                  <span className="font-mono font-bold text-zinc-950">$234M</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-zinc-600">
                    <span className="bg-sky-500 rounded-full w-2 h-2 shrink-0" />
                    <span>Spent</span>
                  </span>
                  <span className="font-mono font-bold text-zinc-950">$88.1M</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-zinc-600">
                    <span className="bg-indigo-500 rounded-full w-2 h-2 shrink-0" />
                    <span>Committed</span>
                  </span>
                  <span className="font-mono font-bold text-zinc-950">$26.7M</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-zinc-600">
                    <span className="bg-zinc-300 rounded-full w-2 h-2 shrink-0" />
                    <span>Remaining</span>
                  </span>
                  <span className="font-mono font-bold text-zinc-950">$119M</span>
                </div>
              </div>

              {/* Month-over-month trend pill */}
              <div className="flex justify-between items-center bg-emerald-50 mt-3 px-2.5 py-1.5 border border-emerald-200/60 rounded-xl font-sans font-medium text-[11px] text-emerald-800">
                <span>↑ 36% → 38% spent this month</span>
              </div>
            </div>

            {/* Largest Budgets sub-card */}
            <div className="pt-2.5 border-zinc-100 border-t">
              <span className="block mb-1 font-mono font-bold text-[10px] text-zinc-400 uppercase tracking-wider">
                LARGEST BUDGETS
              </span>
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-zinc-900 truncate">Red Mesa Solar + Storage</span>
                <span className="font-mono text-[11px] text-zinc-500 shrink-0">$7.65M of $26.5M</span>
              </div>
            </div>
          </motion.div>

          {/* 2. Timeline Progress (WIDENED: md:col-span-2 lg:col-span-6 - 50% of the 9-column container) */}
          <motion.div
            variants={dashboardItemVariants}
            className="flex flex-col justify-between space-y-3 md:col-span-2 lg:col-span-6 bg-white shadow-2xs p-4 sm:p-5 border border-zinc-200/90 rounded-3xl"
          >
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
                      className="bg-zinc-100 hover:bg-zinc-200 py-1 pr-6 pl-2.5 border-none rounded-lg focus:ring-1 focus:ring-emerald-500 font-sans text-zinc-700 text-xs appearance-none cursor-pointer"
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
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 my-2.5 font-mono text-[10px] text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <span className="bg-sky-500 rounded-full w-2 h-2" /> Planned
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="bg-zinc-950 rounded-full w-2 h-2" /> Actual
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="border-sky-500 border-b-2 border-dashed w-3" /> Forecast
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="border-zinc-300 border-b-2 border-dashed w-3" /> Baseline
                </span>
              </div>

              {/* S-Curve Chart with Today Marker (Increased height & wide aspect ratio) */}
              <div className="relative mt-2">
                <div className="flex items-stretch gap-1.5">
                  {/* Y-axis labels */}
                  <div className="flex flex-col justify-between pr-1.5 h-40 sm:h-44 font-mono text-[9px] text-zinc-400 text-right select-none">
                    <span>100%</span>
                    <span>75%</span>
                    <span>50%</span>
                    <span>25%</span>
                    <span>0%</span>
                  </div>

                  {/* SVG Curves */}
                  <div className="relative flex-1 h-40 sm:h-44">
                    <svg viewBox="0 0 380 140" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="timeline-curve-fill" x1="0%" y1="0%" x2="0%" y2="1">
                          <stop offset="0%" stopColor="#0284c7" stopOpacity="0.22" />
                          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Grid lines */}
                      <line x1="0" y1="10" x2="380" y2="10" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="0" y1="42.5" x2="380" y2="42.5" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="0" y1="75" x2="380" y2="75" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="0" y1="107.5" x2="380" y2="107.5" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="0" y1="140" x2="380" y2="140" stroke="#e2e8f0" strokeWidth="1" />

                      {/* Forecast curve (from Oct/Today onwards to Mar) */}
                      <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
                        d="M 235 68 C 280 48, 330 32, 370 20"
                        fill="none"
                        stroke="#0284c7"
                        strokeWidth="2.5"
                        strokeDasharray="4 3"
                      />

                      {/* Baseline curve (dashed gray) */}
                      <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.4, delay: 0.1, ease: "easeOut" }}
                        d="M 15 130 C 120 120, 240 75, 370 26"
                        fill="none"
                        stroke="#cbd5e1"
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                      />

                      {/* Area under Actual */}
                      <motion.path
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.2, delay: 0.2 }}
                        d="M 15 130 C 95 122, 160 98, 235 68 L 235 140 L 15 140 Z"
                        fill="url(#timeline-curve-fill)"
                      />

                      {/* Actual curve (solid dark) */}
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.4, ease: "easeOut" }}
                        d="M 15 130 C 95 122, 160 98, 235 68"
                        fill="none"
                        stroke="#0f172a"
                        strokeWidth="2.5"
                      />

                      {/* Today vertical milestone line */}
                      <line
                        x1="235"
                        y1="16"
                        x2="235"
                        y2="140"
                        stroke="#94a3b8"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                      />
                      <circle cx="235" cy="68" r="4" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
                    </svg>

                    {/* Today Badge */}
                    <div className="top-0 left-[62%] absolute bg-zinc-900 shadow-xs px-2 py-0.5 rounded font-mono font-bold text-[9px] text-white -translate-x-1/2 transform">
                      Today
                    </div>
                  </div>
                </div>

                {/* X-axis months */}
                <div className="flex justify-between mt-1.5 pr-2 pl-9 font-mono text-[10px] text-zinc-400">
                  <span>Apr</span>
                  <span>Jun</span>
                  <span>Aug</span>
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
          </motion.div>

          {/* 3. Site-wise Performance (lg:col-span-3) */}
          <motion.div
            variants={dashboardItemVariants}
            className="flex flex-col justify-between space-y-3 lg:col-span-3 bg-white shadow-2xs p-4 sm:p-5 border border-zinc-200/90 rounded-3xl"
          >
            <div>
              <div className="flex justify-between items-center pb-2 border-zinc-100 border-b">
                <span className="flex items-center gap-1.5 font-display font-bold text-zinc-950 text-xs sm:text-sm">
                  <MapPin className="w-4 h-4 text-zinc-600" />
                  <span>Site-wise performance</span>
                </span>
                <button
                  type="button"
                  onClick={() => toast.info("Opening site-by-site telematics dashboard...")}
                  className="font-sans font-semibold text-emerald-700 hover:text-emerald-900 text-xs cursor-pointer"
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
                      <span className="font-mono font-bold text-zinc-900 text-xs">69%</span>
                      <span className="block font-sans font-semibold text-[10px] text-emerald-700">On track</span>
                    </div>
                  </div>
                  <div className="bg-zinc-100 mt-1.5 rounded-full w-full h-1.5 overflow-hidden">
                    <motion.div
                      className="bg-emerald-600 rounded-full h-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "69%" }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
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
                      <span className="font-mono font-bold text-zinc-900 text-xs">50%</span>
                      <span className="block font-sans font-semibold text-[10px] text-emerald-700">On track</span>
                    </div>
                  </div>
                  <div className="bg-zinc-100 mt-1.5 rounded-full w-full h-1.5 overflow-hidden">
                    <motion.div
                      className="bg-emerald-600 rounded-full h-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "50%" }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
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
                      <span className="font-mono font-bold text-zinc-900 text-xs">89%</span>
                      <span className="block font-sans font-semibold text-[10px] text-emerald-700">On track</span>
                    </div>
                  </div>
                  <div className="bg-zinc-100 mt-1.5 rounded-full w-full h-1.5 overflow-hidden">
                    <motion.div
                      className="bg-emerald-600 rounded-full h-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "89%" }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
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
                      <span className="font-mono font-bold text-zinc-900 text-xs">31%</span>
                      <span className="block font-sans font-semibold text-[10px] text-rose-600">Delayed</span>
                    </div>
                  </div>
                  <div className="bg-zinc-100 mt-1.5 rounded-full w-full h-1.5 overflow-hidden">
                    <motion.div
                      className="bg-rose-500 rounded-full h-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "31%" }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
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
                      <span className="font-mono font-bold text-zinc-900 text-xs">98%</span>
                      <span className="block font-sans font-semibold text-[10px] text-emerald-700">On track</span>
                    </div>
                  </div>
                  <div className="bg-zinc-100 mt-1.5 rounded-full w-full h-1.5 overflow-hidden">
                    <motion.div
                      className="bg-emerald-600 rounded-full h-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "98%" }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-zinc-100 border-t text-center">
              <span className="font-sans text-[11px] text-zinc-500">
                Overall Portfolio Progress: <strong className="font-mono text-zinc-900"><CountUp end={67.4} decimals={1} suffix="%" /></strong>
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Container: 4. My Tasks (lg:col-span-3 - Checklist aligned under Calendar) */}
        <motion.div
          variants={dashboardItemVariants}
          className="flex flex-col justify-between space-y-3 lg:col-span-3 bg-white shadow-2xs p-4 sm:p-5 border border-zinc-200/90 rounded-3xl"
        >
          <div>
            <div className="flex justify-between items-center pb-2 border-zinc-100 border-b">
              <span className="flex items-center gap-1.5 font-display font-bold text-zinc-950 text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>My tasks</span>
              </span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-zinc-400">
                  <CountUp end={pendingTasksCount} /> pending
                </span>
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
                  className="font-sans font-semibold text-zinc-700 hover:text-zinc-950 text-xs cursor-pointer"
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
                  className="group flex items-start gap-2.5 hover:bg-zinc-50/80 p-1.5 rounded-xl transition-colors cursor-pointer"
                >
                  {/* Round Checkbox Toggle */}
                  <div
                    className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-all ${task.completed
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "border-zinc-300 group-hover:border-zinc-400 bg-white"
                      }`}
                  >
                    {task.completed && <Check className="stroke-[3] w-2.5 h-2.5" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-1">
                      <p
                        className={`text-xs font-medium leading-snug line-clamp-2 ${task.completed ? "line-through text-zinc-400" : "text-zinc-900"
                          }`}
                      >
                        {task.title}
                      </p>
                      <span
                        className={`text-[9.5px] font-sans font-semibold px-2 py-0.5 rounded-full shrink-0 ${task.priority === "High"
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
              <CountUp end={pendingTasksCount} /> tasks pending today
            </span>
          </div>
        </motion.div>
      </div>

      {/* =========================================================================
          BOTTOM ROW: Recent Ongoing Orders (Exact Match to Reference Mockup)
         ========================================================================= */}
      <motion.div
        variants={dashboardItemVariants}
        className="space-y-4 bg-white shadow-2xs p-5 sm:p-6 border border-zinc-200/90 rounded-3xl"
      >
        {/* Header with Title & Search / Filter Controls */}
        <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-3 pb-3 border-zinc-100 border-b">
          <div>
            <h3 className="font-display font-extrabold text-zinc-950 text-base sm:text-lg">
              Recent Ongoing Orders
            </h3>
            <p className="mt-0.5 font-sans text-zinc-500 text-xs">
              Live order fulfillment stream across Indian pin codes and solar parks.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative">
              <Search className="top-2.5 left-3 absolute w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
              <input
                type="text"
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                placeholder="Search order ID or buyer..."
                className="bg-[#f8f9fa] hover:bg-[#f1f3f5] focus:bg-white shadow-2xs py-1.5 pr-3 pl-8 border border-zinc-200/60 focus:border-zinc-400 rounded-full w-48 sm:w-60 font-sans text-xs text-zinc-800 placeholder:text-zinc-400 transition-all focus:outline-none"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <div className="flex items-center bg-[#f8f9fa] hover:bg-[#f1f3f5] shadow-2xs px-3 py-1.5 border border-zinc-200/60 rounded-full text-zinc-700 text-xs cursor-pointer">
                <Filter className="mr-1.5 w-3.5 h-3.5 text-zinc-500 shrink-0" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-transparent pr-4 border-none font-sans text-zinc-700 text-xs cursor-pointer appearance-none focus:outline-none"
                >
                  <option value="All Statuses">All Statuses</option>
                  <option value="Ready for Inspection">Ready for Inspection</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Processing">Processing</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Confirmed">Confirmed</option>
                </select>
                <ChevronDown className="-ml-3 w-3 h-3 text-zinc-500 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Orders Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full font-sans text-xs text-left">
            <thead>
              <tr className="bg-[#fbf9f6] border-zinc-100 border-y font-sans font-bold text-[11px] text-zinc-500 uppercase tracking-wider">
                <th className="px-4 py-3">ORDER ID</th>
                <th className="px-4 py-3">CUSTOMER NAME</th>
                <th className="px-4 py-3">PURCHASED MERCHANDISE</th>
                <th className="px-4 py-3">LOGISTICS PARTNER</th>
                <th className="px-4 py-3">DATE</th>
                <th className="px-4 py-3">AMOUNT</th>
                <th className="px-4 py-3">STATUS</th>
                <th className="px-4 py-3 text-right">QUICK ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-zinc-50/70 transition-colors">
                    {/* 1. Order ID */}
                    <td className="px-4 py-4 font-sans font-bold text-zinc-950 text-xs sm:text-sm whitespace-nowrap">
                      {ord.orderId}
                    </td>

                    {/* 2. Customer Name */}
                    <td className="px-4 py-4 min-w-[160px]">
                      <span className="block font-bold text-zinc-900 text-xs sm:text-[13px]">{ord.customerName}</span>
                      <span className="block mt-0.5 text-[11px] text-zinc-500">{ord.companyName}</span>
                    </td>

                    {/* 3. Purchased Merchandise */}
                    <td className="px-4 py-4 max-w-xs min-w-[200px]">
                      <span className="block text-zinc-800 text-xs truncate" title={ord.merchandise}>
                        {ord.merchandise}
                      </span>
                      <span className="block mt-0.5 text-[11px] text-zinc-400">{ord.lineItemsCount} line items</span>
                    </td>

                    {/* 4. Logistics Partner */}
                    <td className="px-4 py-4 min-w-[130px]">
                      <span className="block font-medium text-zinc-900 text-xs">{ord.logisticsPartner}</span>
                      <span className="block mt-0.5 font-mono text-[11px] text-zinc-400 tracking-wider">
                        {ord.vehicleNumber}
                      </span>
                    </td>

                    {/* 5. Date */}
                    <td className="px-4 py-4 font-mono text-zinc-600 text-xs whitespace-nowrap">
                      {ord.date}
                    </td>

                    {/* 6. Amount */}
                    <td className="px-4 py-4 font-mono font-extrabold text-zinc-950 text-xs sm:text-[13px] whitespace-nowrap">
                      ₹{ord.amount.toLocaleString("en-IN")}
                    </td>

                    {/* 7. Status */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      {ord.status === "Ready for Inspection" && (
                        <span className="inline-flex items-center gap-1.5 bg-[#fef9ee] px-2.5 py-1 border border-[#fef08a] rounded-full font-medium text-[#b45309] text-xs">
                          <span className="bg-[#f59e0b] rounded-full w-1.5 h-1.5" />
                          <span>Ready for Inspection</span>
                        </span>
                      )}
                      {ord.status === "In Transit" && (
                        <span className="inline-flex items-center gap-1.5 bg-[#eff6ff] px-2.5 py-1 border border-[#bfdbfe] rounded-full font-medium text-[#1d4ed8] text-xs">
                          <span className="bg-[#3b82f6] rounded-full w-1.5 h-1.5" />
                          <span>In Transit</span>
                        </span>
                      )}
                      {ord.status === "Processing" && (
                        <span className="inline-flex items-center gap-1.5 bg-[#f4f4f5] px-2.5 py-1 border border-[#e4e4e7] rounded-full font-medium text-[#52525b] text-xs">
                          <span className="bg-[#71717a] rounded-full w-1.5 h-1.5" />
                          <span>Processing</span>
                        </span>
                      )}
                      {ord.status === "Delivered" && (
                        <span className="inline-flex items-center gap-1.5 bg-[#ecfdf5] px-2.5 py-1 border border-[#a7f3d0] rounded-full font-medium text-[#047857] text-xs">
                          <span className="bg-[#10b981] rounded-full w-1.5 h-1.5" />
                          <span>Delivered</span>
                        </span>
                      )}
                      {ord.status === "Confirmed" && (
                        <span className="inline-flex items-center gap-1.5 bg-[#fef9ee] px-2.5 py-1 border border-[#fef3c7] rounded-full font-medium text-[#78350f] text-xs">
                          <span className="bg-[#d97706] rounded-full w-1.5 h-1.5" />
                          <span>Confirmed</span>
                        </span>
                      )}
                    </td>

                    {/* 8. Quick Action */}
                    <td className="px-4 py-4 text-right whitespace-nowrap">
                      {ord.actionType === "Verify QC" ? (
                        <Link
                          href="/trader/orders"
                          onClick={() => toast.info(`Opening QC inspection for ${ord.orderId}...`)}
                          className="inline-flex justify-center items-center bg-[#facc15] hover:bg-[#eab308] shadow-xs px-4 py-1.5 rounded-full font-sans font-bold text-xs text-zinc-950 transition-colors cursor-pointer"
                        >
                          Verify QC
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            toast.info(`Tracking logistics dispatch for ${ord.orderId} via ${ord.logisticsPartner}...`)
                          }
                          className="inline-flex justify-center items-center bg-zinc-100 hover:bg-zinc-200 px-4 py-1.5 rounded-full font-sans font-medium text-xs text-zinc-800 transition-colors cursor-pointer"
                        >
                          Track
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-zinc-400 font-sans text-xs">
                    No ongoing orders match your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
