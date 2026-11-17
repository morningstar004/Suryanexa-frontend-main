"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Video, SlidersHorizontal } from "lucide-react";
import PhoneMockDashboard from "./PhoneMockDashboard";

const COMPARISONS = [
  {
    painTitle: "Unverified WhatsApp trade groups",
    painDesc:
      "Shadow brokers quote ghost inventory, inflate margins, and vanish when panel micro-cracks occur on site.",
    nexaTitle: "KYB-Audited Trader Command Center",
    nexaDesc:
      "Only OEM-authorized direct desks and verified stockists with bonded warehouses can list pallets on the open network.",
    icon: ShieldCheck,
  },
  {
    painTitle: "High-intent rooftop leads get poached",
    painDesc:
      "Central CRM admins and call center staff routinely leak your high-margin commercial leads to competitor installers.",
    nexaTitle: "Blind-Vault™ Lead Privacy Protection",
    nexaDesc:
      "Envelope privacy protection ensures customer details and project margins are sealed and strictly owned by your firm.",
    icon: Lock,
  },
  {
    painTitle: "Transit micro-cracks spark endless disputes",
    painDesc:
      "Truck drivers drop pallets, installers sign blindly, and OEM warranties get denied leaving EPCs with 6-week frozen cash.",
    nexaTitle: "Timestamped 180s Unloading Video Protocol",
    nexaDesc:
      "Unboxing video with barcode scan directly unlocks the delivery escrow or initiates instantaneous carrier insurance compensation.",
    icon: Video,
  },
  {
    painTitle: "Forced single-distributor bundled kits",
    painDesc:
      "Distributors tie in substandard inverters or mounting brackets to offload aging stock, destroying your project efficiency.",
    nexaTitle: "Cross-Trader Spot Engine & Kit Configurator",
    nexaDesc:
      "Mix Tier-1 TOPCon modules from Trader A with hybrid inverters from Trader B for maximum generation efficiency at spot prices.",
    icon: SlidersHorizontal,
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

          {/* RIGHT: Clean Editorial Comparison List (No Cards / No Box Wrappers) */}
          <div className="lg:col-span-7 ml-24 lg:pl-8 2xl:pl-16">
            {/* Column Headers */}
            <div className="gap-6 sm:gap-8 grid grid-cols-1 sm:grid-cols-2 mb-2 px-1 pb-4 border-zinc-200 border-b font-sans font-bold text-xs uppercase tracking-wider">
              <span className="flex items-center gap-1.5 text-emerald-800 text-center">
                <span className="bg-emerald-600 rounded-full w-2 h-2 text-center" />
                SuryaNexa Verified Protocol
              </span>
            </div>

            {/* Clean Rows List */}
            <div className="divide-zinc-200/70">
              {COMPARISONS.map((row, idx) => (
                <motion.div
                  key={row.painTitle}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: idx * 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className={`grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 ${
                    idx !== 0 ? "pt-6 sm:pt-7" : "pt-2"
                  } pb-6 sm:pb-7`}
                >
                  {/* WRONG (Legacy Friction) */}
                  {/* <div className="flex items-start gap-3.5">
                    <span className="flex justify-center items-center bg-rose-50 mt-0.5 border border-rose-200/60 rounded-full w-6 h-6 font-bold text-rose-700 shrink-0">
                      <X className="stroke-[2.5] w-3.5 h-3.5 text-rose-700" />
                    </span>
                    <div className="flex-1">
                      <h4 className="font-display font-bold text-zinc-950 text-sm text-balance leading-snug">
                        {row.painTitle}
                      </h4>
                      <p className="mt-1.5 font-sans text-zinc-700 text-xs text-pretty leading-relaxed">
                        {row.painDesc}
                      </p>
                    </div>
                  </div> */}

                  {/* RIGHT (SuryaNexa Solution Protocol) */}
                  <div className="flex items-center gap-3.5 w-96">
                    <span className="flex justify-center items-center bg-emerald-50 mt-0.5 border border-emerald-200/60 rounded-full w-6 h-6 font-bold text-emerald-800 shrink-0">
                      <row.icon className="stroke-[2.2] w-3.5 h-3.5 text-emerald-800" />
                    </span>
                    <div className="flex-1">
                      <h4 className="font-display font-bold text-zinc-950 text-sm text-balance leading-snug">
                        {row.nexaTitle}
                      </h4>
                      <p className="mt-1.5 font-sans text-zinc-700 text-xs text-pretty leading-relaxed">
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
    </section>
  );
}
