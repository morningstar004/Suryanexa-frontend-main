"use client";

import React from "react";

export default function StitchBigBrandBanner() {
  return (
    <section className="relative flex justify-center items-center bg-[#F8F6F2] border-[#e8e4da] border-t w-full h-full min-h-[140px] sm:min-h-[175px] lg:min-h-[210px] overflow-hidden select-none">
      {/* Subtle surface shading to enhance ambient light across the clay bed */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f2ede3]/40 via-transparent to-[#ece6da]/50 pointer-events-none" />

      {/* Physically Accurate SVG Deboss/Relief Filter: Directional Sunlight from Top-Left */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <filter
            id="clay-depth"
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
            colorInterpolationFilters="sRGB"
          >
            {/* 1. OUTER RIM HIGHLIGHT (Top-Left exterior edge catches direct sunlight) */}
            <feOffset in="SourceAlpha" dx="-1.5" dy="-1.5" result="offsetOuterRim" />
            <feGaussianBlur in="offsetOuterRim" stdDeviation="1" result="blurOuterRim" />
            <feComposite in="offsetOuterRim" in2="SourceAlpha" operator="out" result="cutOuterRim" />
            <feFlood floodColor="#ffffff" floodOpacity="0.9" result="colorOuterRim" />
            <feComposite in="colorOuterRim" in2="cutOuterRim" operator="in" result="outerRim" />

            {/* 2. OUTER AMBIENT SHADOW (Bottom-Right exterior creates tactile ground separation) */}
            {/* <feOffset in="SourceAlpha" dx="2.5" dy="3" result="offsetOuterShadow" />
            <feGaussianBlur in="offsetOuterShadow" stdDeviation="3" result="blurOuterShadow" />
            <feComposite in="offsetOuterShadow" in2="SourceAlpha" operator="out" result="cutOuterShadow" />
            <feFlood floodColor="#2a2318" floodOpacity="0.14" result="colorOuterShadow" />
            <feComposite in="colorOuterShadow" in2="cutOuterShadow" operator="in" result="outerShadow" /> */}

            {/* 3. INNER CAVITY SHADOW (Deep shadow falling into the top-left interior of incision) */}
            <feOffset in="SourceAlpha" dx="4.5" dy="4.5" result="offsetInnerShadow" />
            <feGaussianBlur in="offsetInnerShadow" stdDeviation="4.5" result="blurInnerShadow" />
            <feComposite in="SourceAlpha" in2="blurInnerShadow" operator="out" result="cutInnerShadow" />
            <feFlood floodColor="#1b1712" floodOpacity="0.52" result="colorInnerShadow" />
            <feComposite in="colorInnerShadow" in2="cutInnerShadow" operator="in" result="innerShadow" />

            {/* 4. INNER CONTACT CREVICE (Crisp micro-occlusion line along the top incision boundary) */}
            {/* <feOffset in="SourceAlpha" dx="1.5" dy="2" result="offsetCrevice" />
            <feGaussianBlur in="offsetCrevice" stdDeviation="1.2" result="blurCrevice" />
            <feComposite in="SourceAlpha" in2="blurCrevice" operator="out" result="cutCrevice" />
            <feFlood floodColor="#0d0a08" floodOpacity="0.45" result="colorCrevice" />
            <feComposite in="colorCrevice" in2="cutCrevice" operator="in" result="innerCrevice" /> */}

            {/* 5. INNER SUNLIT BEVEL HIGHLIGHT (Bottom-Right interior wall facing the light source) */}
            <feOffset in="SourceAlpha" dx="-3.5" dy="-3.5" result="offsetInnerHighlight" />
            <feGaussianBlur in="offsetInnerHighlight" stdDeviation="2.5" result="blurInnerHighlight" />
            <feComposite in="SourceAlpha" in2="blurInnerHighlight" operator="out" result="cutInnerHighlight" />
            <feFlood floodColor="#ffffff" floodOpacity="0.95" result="colorInnerHighlight" />
            <feComposite in="colorInnerHighlight" in2="cutInnerHighlight" operator="in" result="innerHighlight" />

            {/* 6. MERGE COMPOSITE: Outer highlights/shadows + Base glyphs + Inner depth layers */}
            <feMerge>
              <feMergeNode in="outerShadow" />
              <feMergeNode in="outerRim" />
              <feMergeNode in="SourceGraphic" />
              <feMergeNode in="innerHighlight" />
              <feMergeNode in="innerShadow" />
              <feMergeNode in="innerCrevice" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <div className="z-10 relative flex justify-center items-center px-2 sm:px-4 w-full text-center">
        <h2
          className="inline-flex justify-center items-baseline font-black text-[#F3EFE6] text-[10.5vw] sm:text-[10.8vw] md:text-[11vw] leading-none tracking-tighter whitespace-nowrap"
          style={{
            fontFamily: "'Nunito', 'Poppins', sans-serif",
            filter: "url(#clay-depth)",
          }}
        >
          <span>SuryaNEXA</span>
          <span className="opacity-90 ml-1 sm:ml-2.5 font-bold text-[5.2vw] -translate-y-[22%]">
            ™
          </span>
        </h2>
      </div>
    </section>
  );
}
