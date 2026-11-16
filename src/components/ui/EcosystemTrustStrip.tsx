"use client";

import React from "react";
import { ShieldCheck, Award, Zap } from "lucide-react";

export function EcosystemTrustStrip() {
  const partners = [
    { name: "TATA POWER SOLAR", tag: "Tier-1 Cells" },
    { name: "ADANI SOLAR", tag: "DCR Mono Perc" },
    { name: "WAAREE ENERGIES", tag: "TopCon Bi-Facial" },
    { name: "SUNGROW POWER", tag: "Hybrid Inverters" },
    { name: "GROWATT NEW ENERGY", tag: "Smart String" },
    { name: "HAVELLS SOLAR", tag: "BOS Hardware" },
  ];

  return (
    <section className="py-10 lg:py-12 border-b border-[#ede6d8] bg-[#faf7f2]/70 overflow-hidden">
      <div className="max-w-7xl 2xl:max-w-[1536px] 3xl:max-w-[1850px] 4xl:max-w-[2200px] mx-auto px-6 2xl:px-12">
        {/* Compliance Badges Pill Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-8 text-xs font-mono text-[#78716c]">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#e2d9c8] shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span className="font-semibold text-zinc-900 font-sans text-xs">PM Surya Ghar Ready</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#e2d9c8] shadow-xs">
            <Award className="w-4 h-4 text-amber-600" />
            <span className="font-semibold text-zinc-900 font-sans text-xs">ALMM &amp; DCR Certified Stock</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#e2d9c8] shadow-xs">
            <Zap className="w-4 h-4 text-emerald-700" />
            <span className="font-semibold text-zinc-900 font-sans text-xs">DISCOM Grid Interconnect Ready</span>
          </div>
        </div>

        {/* Brand Grid: Clean Monochrome & Warm Stone */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-[#f0eae1]">
          <span className="text-[11px] 2xl:text-xs font-sans uppercase tracking-wider text-zinc-500 shrink-0 font-bold">
            Verified Equipment Ecosystem:
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 w-full items-center">
            {partners.map((partner, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center text-center p-2 rounded-xl transition-all hover:bg-white/80 cursor-default group"
              >
                <span className="font-display font-extrabold text-xs 2xl:text-sm tracking-wider text-zinc-700 group-hover:text-zinc-950 transition-colors">
                  {partner.name}
                </span>
                <span className="text-[9px] 2xl:text-[10px] font-mono text-zinc-400 group-hover:text-amber-600 transition-colors mt-0.5">
                  {partner.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default EcosystemTrustStrip;
