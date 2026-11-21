"use client";

import React from "react";
import { motion } from "framer-motion";
import { BRANDS } from "@/constants/brands";

// Repeat 4x to ensure an unbroken, seamless continuous loop on wide/4K screens
const MARQUEE_ITEMS = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS];

export default function StitchBrandMarquee() {
  return (
    <section className="relative bg-[#02201d] py-7 border-emerald-950/60 border-b w-full overflow-hidden select-none">
      {/* Marquee Wrapper with fading mask on both ends */}
      <div
        className="relative flex items-center w-full overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        {/* Soft Left Fading Edge Overlay */}
        <div className="top-0 bottom-0 left-0 z-10 absolute bg-gradient-to-r from-[#02201d] to-transparent w-20 sm:w-36 pointer-events-none" />

        {/* Soft Right Fading Edge Overlay */}
        <div className="top-0 right-0 bottom-0 z-10 absolute bg-gradient-to-l from-[#02201d] to-transparent w-20 sm:w-36 pointer-events-none" />

        {/* Moving Marquee Strip: right to left */}
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex items-center gap-12 sm:gap-16 py-2 whitespace-nowrap will-change-transform"
        >
          {MARQUEE_ITEMS.map((brand, idx) => (
            <div
              key={`${brand.id}-${idx}`}
              className="flex items-center gap-3 opacity-85 hover:opacity-100 transition-opacity duration-200 cursor-default shrink-0"
            >
              {/* Brand Logo Mark */}
              {brand.renderIcon(28)}

              {/* Brand Name Typography */}
              <div className="flex items-baseline gap-1.5 font-sans tracking-tight">
                <span
                  className={`font-black text-white text-sm sm:text-base ${
                    brand.isLowercase ? "lowercase tracking-normal font-bold" : "uppercase"
                  }`}
                >
                  {brand.name}
                </span>
                <span className={`text-[11px] sm:text-xs font-bold tracking-wider ${brand.subtitleColor}`}>
                  {brand.subtitle}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
