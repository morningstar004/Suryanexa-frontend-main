"use client";

import React from "react";

export default function StitchBigBrandBanner() {
  return (
    <section className="relative flex justify-center items-center bg-[#F7F6F2] shadow-[inset_-12px_-8px_40px_#46464620] border-[#e8e4d8] border-t w-full h-full min-h-[140px] sm:min-h-[175px] lg:min-h-[210px] overflow-hidden select-none">
      {/* SVG filter for true inset shadow inside the text glyphs */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <filter id="clay-inset" x="-20%" y="-20%" width="140%" height="140%">
            {/* Offset: simulates light from top-right → shadow falls inside top-left */}
            <feOffset in="SourceGraphic" dx="-4" dy="-3" result="offset" />
            <feGaussianBlur in="offset" stdDeviation="5" result="blur" />
            {/* Invert: keep only the area INSIDE the original glyphs */}
            <feComposite operator="out" in="SourceGraphic" in2="blur" result="inverse" />
            {/* Flood with dark shadow color */}
            <feFlood floodColor="#464646" floodOpacity="0.45" result="color" />
            {/* Clip the shadow to only the inverted inner region */}
            <feComposite operator="in" in="color" in2="inverse" result="shadow" />
            {/* Layer shadow on top of the original text */}
            <feComposite operator="over" in="shadow" in2="SourceGraphic" />
          </filter>
        </defs>
      </svg>

      <div className="flex justify-center items-center px-2 sm:px-4 w-full text-center">
        <h2
          className="inline-flex justify-center items-baseline font-black text-[#e8e2d8] text-[10vw] sm:text-[10.4vw] md:text-[10.7vw] uppercase leading-none tracking-tighter whitespace-nowrap"
          style={{
            fontFamily: "'Nunito', 'Poppins', sans-serif",
            filter: "url(#clay-inset)",
          }}
        >
          <span>SURYANEXA</span>
          <span className="ml-1 sm:ml-2.5 font-bold text-[5.2vw] -translate-y-[22%]">
            ™
          </span>
        </h2>
      </div>
    </section>
  );
}
