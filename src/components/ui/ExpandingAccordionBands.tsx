"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowUpRight } from "lucide-react";

export function ExpandingAccordionBands() {
  const [activeBand, setActiveBand] = useState<number>(0);

  const bands = [
    {
      id: 0,
      title: "Solar Panels",
      subtitle: "Tier-1 Mono Perc & TopCon Bi-Facial Modules",
      specs: "Wattage: 545W - 700W • Efficiency: 22.8% • DCR / ALMM Certified",
      bgClass: "bg-[#02201d]",
      textColor: "text-white",
      badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
      description: "Monocrystalline panels of truncate or bifacial cell design. Sourced directly from manufacturers for utility, commercial, and residential projects with 100% ALMM compliance.",
      hardwareItems: [
        { label: "TopCon 580W Bi-Facial", spec: "99% Bifaciality", tag: "Hot Seller" },
        { label: "Mono PERC 550W DCR", spec: "PM Surya Ghar", tag: "Verified DCR" },
        { label: "All-Black Shingled", spec: "Architectural EPC", tag: "Premium" },
      ]
    },
    {
      id: 1,
      title: "Smart Inverters",
      subtitle: "Robust Grid-Tie, Hybrid & Microinverter Architectures",
      specs: "Capacities: 3kW - 120kW • MPPT Channels: Dual to Quad • 98.6% Efficiency",
      bgClass: "bg-[#faf8f3]",
      textColor: "text-zinc-950",
      badgeBg: "bg-amber-500/15 text-amber-700 border-amber-500/30",
      description: "Next-gen silicon carbide and IGBT power conditioning systems. Featuring real-time Wi-Fi/4G telemetry, DISCOM anti-islanding, and automatic grid-tie protection.",
      hardwareItems: [
        { label: "Hybrid 10kW 3-Phase", spec: "Battery Ready", tag: "Smart Storage" },
        { label: "Commercial 50kW On-Grid", spec: "Quad MPPT", tag: "Industrial" },
        { label: "Microinverter 800W Dual", spec: "Per-Panel Optimization", tag: "Roof Safety" },
      ]
    },
    {
      id: 2,
      title: "Lithium Energy Storage",
      subtitle: "High-Voltage LFP Packs, Rack Mounts & Battery Management Systems",
      specs: "Life: 6000+ Cycles (15 Yrs) • Chemistry: LiFePO4 • Modular Expansion",
      bgClass: "bg-[#249457]",
      textColor: "text-white",
      badgeBg: "bg-white/20 text-white border-white/30",
      description: "Modern energy storage packs, high-voltage battery enclosures, and automated BMS telemetry. Zero-downtime backup for residential rooftops and industrial microgrids.",
      hardwareItems: [
        { label: "Modular LFP 5.12 kWh Pack", spec: "Plug & Play Stack", tag: "Top Rated" },
        { label: "High-Voltage 20 kWh Commercial", spec: "BMS Integrated", tag: "Factory Backup" },
        { label: "Wall-Mount PowerVault 10kW", spec: "Slimline Enclosure", tag: "Residential" },
      ]
    },
  ];

  return (
    <section className="py-20 lg:py-28 px-6 bg-[#fdfbf7] border-b border-[#ede6d8]" id="hardware-catalog">
      <div className="max-w-7xl 2xl:max-w-[1536px] 3xl:max-w-[1850px] 4xl:max-w-[2200px] mx-auto">
        <div className="text-center max-w-3xl 2xl:max-w-4xl mx-auto mb-14 sm:mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#78644e] bg-[#f4eee2] px-3.5 py-1.5 rounded-full border border-[#e2d6c0] inline-block mb-3 font-bold">
            VERIFIED TRADER HARDWARE DIRECTORY
          </span>
          <h2 className="text-3xl sm:text-5xl 2xl:text-6xl font-extrabold text-zinc-950 font-display tracking-tight leading-tight">
            Wholesale Catalog at Your Fingertips
          </h2>
          <p className="mt-3 text-zinc-700 text-sm sm:text-base 2xl:text-lg font-sans leading-relaxed">
            Explore verified Tier-1 components locked with direct manufacturer pricing. Click any category to expand specifications.
          </p>
        </div>

        {/* 3 Horizontal Expanding Bands */}
        <div className="space-y-4 2xl:space-y-6">
          {bands.map((band, idx) => {
            const isExpanded = activeBand === idx;
            return (
              <motion.div
                key={band.id}
                layout
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setActiveBand(idx)}
                className={`rounded-[32px] p-6 sm:p-10 transition-all cursor-pointer shadow-lg overflow-hidden relative ${band.bgClass} ${band.textColor}`}
              >
                {/* Header Strip of the Band */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className={`text-[10px] 2xl:text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full border font-bold ${band.badgeBg}`}>
                      CATALOG SECTION 0{idx + 1}
                    </span>
                    <h3 className="text-2xl sm:text-4xl 2xl:text-5xl font-extrabold font-display mt-2 tracking-tight">
                      {band.title}
                    </h3>
                    <p className="text-xs sm:text-sm 2xl:text-base opacity-80 font-sans mt-1 max-w-xl 2xl:max-w-2xl">
                      {band.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs 2xl:text-sm font-mono opacity-80 hidden sm:inline-block">
                      {isExpanded ? "Collapse Specs" : "Click to Expand"}
                    </span>
                    <div className="w-10 h-10 2xl:w-12 2xl:h-12 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center">
                      <ChevronRight
                        className={`w-5 h-5 transition-transform duration-300 ${
                          isExpanded ? "rotate-90" : ""
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Expanded Drawer Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="pt-8 border-t border-current/15 mt-8"
                    >
                      <p className="text-sm 2xl:text-base opacity-90 max-w-3xl leading-relaxed mb-6 font-sans">
                        {band.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {band.hardwareItems.map((item, hIdx) => (
                          <div
                            key={hIdx}
                            className="p-5 rounded-2xl bg-black/5 dark:bg-white/10 border border-current/10 backdrop-blur-sm space-y-2 hover:bg-black/10 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] 2xl:text-xs font-mono px-2 py-0.5 rounded bg-black/10 font-bold">
                                {item.tag}
                              </span>
                              <ArrowUpRight className="w-4 h-4 opacity-70" />
                            </div>
                            <h4 className="text-sm 2xl:text-base font-bold font-display">{item.label}</h4>
                            <p className="text-xs 2xl:text-sm font-mono opacity-80">{item.spec}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 pt-4 flex flex-wrap items-center justify-between gap-4 font-mono text-xs 2xl:text-sm opacity-90">
                        <span>{band.specs}</span>
                        <a
                          href="#pilot-cta"
                          className="px-5 py-2.5 rounded-full font-bold bg-current text-current-contrast font-sans shadow-md hover:scale-105 transition-transform"
                          style={{
                            backgroundColor: idx === 0 ? "#ffffff" : idx === 1 ? "#18181B" : "#ffffff",
                            color: idx === 0 ? "#02201d" : idx === 1 ? "#ffffff" : "#18181B",
                          }}
                        >
                          Reserve Bulk Allocation →
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ExpandingAccordionBands;
