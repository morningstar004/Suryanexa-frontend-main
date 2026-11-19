"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  MessageSquareX,
  ShieldAlert,
  PackageX,
  Boxes,
  BadgeCheck,
  Lock,
  Video,
  LayoutGrid,
  X,
  Check,
} from "lucide-react";
import PhoneMockDashboard from "./PhoneMockDashboard";

const COMPARISONS = [
  {
    painTitle: "Unverified Trade Groups",
    painDesc:
      "Vague broker quotes, shadow inventory, and price wars on chat apps.",
    painIcon: MessageSquareX,
    painIconStyle: "bg-[#FCE8E6] text-[#D93025]",
    nexaTitle: "Verified Command Center",
    nexaDesc:
      "Buy directly from OEM-authorized desks and bonded warehouses with locked pricing.",
    nexaIcon: BadgeCheck,
    nexaIconStyle: "bg-[#E8F1FD] text-[#1A73E8]",
  },
  {
    painTitle: "Leaked & Poached Leads",
    painDesc:
      "Customer details and project margins routinely leaked to competitors.",
    painIcon: ShieldAlert,
    painIconStyle: "bg-[#FFF0E6] text-[#EA580C]",
    nexaTitle: "Blind-Vault™ Lead Privacy",
    nexaDesc:
      "Data is sealed, encrypted, and strictly owned by your firm.",
    nexaIcon: Lock,
    nexaIconStyle: "bg-[#EFEAFF] text-[#7C3AED]",
  },
  {
    painTitle: "Damages & Transit Disputes",
    painDesc:
      "Unseen micro-cracks lead to endless finger-pointing and denied warranties.",
    painIcon: PackageX,
    painIconStyle: "bg-[#FEE2E2] text-[#DC2626]",
    nexaTitle: "Timestamped Unloading Video",
    nexaDesc:
      "180s unloading check with barcode scan instantly secures delivery escrow.",
    nexaIcon: Video,
    nexaIconStyle: "bg-[#E6F8F3] text-[#059669]",
  },
  {
    painTitle: "Forced Bundle Monopolies",
    painDesc:
      "Distributors tie high-quality components to substandard, aging stock.",
    painIcon: Boxes,
    painIconStyle: "bg-[#FFF2E2] text-[#D97706]",
    nexaTitle: "Cross-Trader Spot Engine",
    nexaDesc:
      "Mix and match Tier-1 panels and hybrid inverters freely at spot prices.",
    nexaIcon: LayoutGrid,
    nexaIconStyle: "bg-[#E6F7F2] text-[#00A878]",
  },
];

export default function StitchFriction() {
  return (
    <section className="relative bg-white py-24 lg:py-32 border-zinc-100 border-t" id="friction">
      <div className="mx-auto px-6 sm:px-8 2xl:px-12 2xl:max-w-[1536px] 3xl:max-w-[1850px] 4xl:max-w-[2200px] max-w-7xl">
        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-16 max-w-3xl 2xl:max-w-4xl text-center"
        >
          <h2 className="font-display font-extrabold text-zinc-950 text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl text-balance leading-tight tracking-tight">
            The solar trade still runs on chaos. <br />
            We run it on <span className="text-emerald-700">verified protocol.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl 2xl:max-w-3xl font-sans text-zinc-700 text-base 2xl:text-lg text-pretty leading-relaxed">
            Compare the friction of legacy multi-tier intermediaries against the automated trust of SuryaNexa, powered on-site by our mobile Field ERP.
          </p>
        </motion.div>

        {/* 2-Column Split: Mobile Mock Dashboard (Left) + Clean Aligned Comparisons (Right) */}
        <div className="items-center gap-10 lg:gap-14 grid grid-cols-1 lg:grid-cols-12">
          {/* LEFT: Phone Mock Dashboard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center items-center lg:col-span-5"
          >
            <PhoneMockDashboard />
          </motion.div>

          {/* RIGHT: Comparison Cards Grid (Legacy Industry Friction vs SuryaNEXA Verified Protocol) */}
          <div className="lg:col-span-7 lg:pl-4 2xl:pl-10 xl:pl-8">
            {/* Pill Headers matching the reference image */}
            <div className="gap-6 sm:gap-8 lg:gap-10 grid grid-cols-1 sm:grid-cols-2 mb-3.5">
              <div className="flex justify-center">
                <span className="inline-flex items-center gap-1.5 bg-[#FCE8E6] px-3.5 py-1.5 rounded-full font-sans font-bold text-[#C5221F] text-xs tracking-tight select-none">
                  <X className="stroke-[2.5] w-3.5 h-3.5" />
                  <span>Legacy Industry Friction</span>
                </span>
              </div>
              <div className="flex justify-center">
                <span className="inline-flex items-center gap-1.5 bg-[#CEEAD6] px-3.5 py-1.5 rounded-full font-sans font-bold text-[#137333] text-xs tracking-tight select-none">
                  <Check className="stroke-[2.5] w-3.5 h-3.5" />
                  <span>SuryaNEXA Verified Protocol</span>
                </span>
              </div>
            </div>
            {/* Thin horizontal line under headings */}
            <div className="my-4 sm:my-5 border-zinc-200/80 border-t" />

            {/* Comparison Cards Stack with increased gap and thin vertical divider line between sections */}
            <div className="relative">
              {/* Thin vertical divider line between the two sections on sm+ */}
              <div
                className="hidden sm:block top-0 bottom-0 left-1/2 absolute bg-zinc-200/80 -translate-x-1/2 w-px pointer-events-none"
                aria-hidden="true"
              />

              <div className="space-y-3 sm:space-y-3.5">
                {COMPARISONS.map((row, idx) => (
                  <motion.div
                    key={row.painTitle}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="items-stretch gap-6 sm:gap-8 lg:gap-10 grid grid-cols-1 sm:grid-cols-2"
                  >
                    {/* Left Card (Legacy Industry Friction) */}
                    <div className="flex items-center gap-3 sm:gap-3.5 bg-white hover:bg-zinc-50/70 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md p-3 sm:p-3.5 border border-zinc-200/80 rounded-2xl sm:rounded-[22px] transition-all">
                      <div className={`flex justify-center items-center rounded-full w-12 h-12 sm:w-13 sm:h-13 shrink-0 ${row.painIconStyle}`}>
                        <row.painIcon className="stroke-[2.2] w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display font-bold text-[14px] text-zinc-950 sm:text-[15px] leading-snug">
                          {row.painTitle}
                        </h4>
                        <p className="mt-0.5 font-sans text-zinc-500 sm:text-[12.5px] text-xs leading-relaxed">
                          {row.painDesc}
                        </p>
                      </div>
                    </div>

                    {/* Right Card (SuryaNEXA Verified Protocol) */}
                    <div className="flex items-center gap-3 sm:gap-3.5 bg-white hover:bg-emerald-50/20 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md p-3 sm:p-3.5 border border-zinc-200/80 hover:border-emerald-300/80 rounded-2xl sm:rounded-[22px] transition-all">
                      <div className={`flex justify-center items-center rounded-full w-12 h-12 sm:w-13 sm:h-13 shrink-0 ${row.nexaIconStyle}`}>
                        <row.nexaIcon className="stroke-[2.2] w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display font-bold text-[14px] text-zinc-950 sm:text-[15px] leading-snug">
                          {row.nexaTitle}
                        </h4>
                        <p className="mt-0.5 font-sans text-zinc-600 sm:text-[12.5px] text-xs leading-relaxed">
                          {row.nexaDesc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
