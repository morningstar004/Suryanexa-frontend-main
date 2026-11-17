"use client";

import React from "react";

export default function StitchBigBrandBanner() {
  return (
    <section className="relative flex justify-center items-center bg-[#02201d] border-emerald-950/80 border-t w-full h-full min-h-[140px] sm:min-h-[175px] lg:min-h-[210px] overflow-hidden select-none">
      {/* Soft ambient lighting matching the footer palette */}
      <div className="-top-24 left-1/2 absolute bg-emerald-500/10 blur-[130px] rounded-full w-[700px] h-[300px] -translate-x-1/2 pointer-events-none" />
      <div className="right-0 bottom-0 absolute bg-teal-400/5 blur-[120px] rounded-full w-[400px] h-[300px] pointer-events-none" />

      {/* SVG filter for true inset shadow inside the text glyphs */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <filter id="clay-inset" x="-20%" y="-20%" width="140%" height="140%">
            {/* Offset: simulates light from top-right → shadow falls inside top-left */}
            <feOffset in="SourceGraphic" dx="-4" dy="-3" result="offset" />
            <feGaussianBlur in="offset" stdDeviation="5" result="blur" />
            {/* Invert: keep only the area INSIDE the original glyphs */}
            <feComposite operator="out" in="SourceGraphic" in2="blur" result="inverse" />
            {/* Flood with dark shadow color matching the deep emerald footer */}
            <feFlood floodColor="#011210" floodOpacity="0.85" result="color" />
            {/* Clip the shadow to only the inverted inner region */}
            <feComposite operator="in" in="color" in2="inverse" result="shadow" />
            {/* Layer shadow on top of the original text */}
            <feComposite operator="over" in="shadow" in2="SourceGraphic" />
          </filter>
        </defs>
      </svg>

      <div className="z-10 relative flex justify-center items-center px-2 sm:px-4 w-full text-center">
        <h2
          className="inline-flex justify-center items-baseline font-black text-[#032e29] text-[10vw] sm:text-[10.4vw] md:text-[10.7vw] leading-none tracking-tighter whitespace-nowrap drop-shadow-[0_1px_2px_rgba(52,211,153,0.18)]"
          style={{
            fontFamily: "'Nunito', 'Poppins', sans-serif",
            filter: "url(#clay-inset)",
          }}
        >
          <span>SuryaNEXA</span>
          <span className="ml-1 sm:ml-2.5 font-bold text-[5.2vw] -translate-y-[22%] text-amber-400/80">
            ™
          </span>
        </h2>
      </div>
    </section>
  );
}
