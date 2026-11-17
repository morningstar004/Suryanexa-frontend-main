"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Play, ArrowRight, Shield, ShieldCheck, CheckCircle2, Lock, Zap } from "lucide-react";
import SolarEngineModel from "./SolarEngineModel";

const ROTATING_WORDS = [
  "Zero Margin Leakage",
  "Direct Depot Allocation",
  "Dispute-Proof Delivery",
  "Instant Kit Matching"
];

function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <span
      className="inline-flex relative min-w-[12ch] h-[1.25em] overflow-hidden align-bottom"
      style={{
        maskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
      }}
    >
      {/* Overlapping transitions with gradient mask reveal */}
      <AnimatePresence>
        <motion.span
          key={ROTATING_WORDS[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0, position: "absolute" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="font-extrabold text-emerald-400 whitespace-nowrap"
        >
          {ROTATING_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function StitchHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -35]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex items-center bg-[#02201d] py-10 lg:py-14 min-h-[87vh] overflow-hidden text-white"
    >
      {/* Background Image with Cinematic Solar Overlays */}
      <div className="z-0 absolute inset-0 pointer-events-none">
        <img
          src="/house-and-warehouse.png"
          alt="SuryaNexa Solar Warehouse to Rooftop Ecosystem"
          className="brightness-[0.95] w-full h-full object-center object-cover scale-[1.02] filter contrast-[1.05]"
        />
        {/* Deep emerald gradient overlay ensuring crisp typography contrast on the left while showcasing the sunset landscape on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#02201d]/95 via-[#02201d]/75 to-[#02201d]/35" />
        {/* Vertical fades for seamless navbar and footer/marquee transitions */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#02201d] via-transparent to-[#02201d]/50" />
      </div>

      {/* Soft ambient solar emerald glow highlights */}
      <div className="-top-40 left-1/2 z-0 absolute bg-emerald-500/10 blur-[140px] rounded-full w-[850px] h-[500px] -translate-x-1/2 pointer-events-none" />
      <div className="top-1/3 -right-20 z-0 absolute bg-teal-400/10 blur-[120px] rounded-full w-[420px] h-[420px] pointer-events-none" />

      <div className="z-10 relative mx-auto px-6 sm:px-8 2xl:px-12 w-full 2xl:max-w-[1536px] 3xl:max-w-[1850px] 4xl:max-w-[2200px] max-w-7xl">
        <div className="items-center gap-12 lg:gap-8 2xl:gap-14 grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column Content */}
          <motion.div
            style={{ y: textY }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center items-center text-center lg:col-span-7"
          >
            {/* Editorial Headline */}
            <h1 className="mb-6 font-display font-extrabold text-white text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl 3xl:text-8xl text-center leading-[1.08] tracking-tight">
              The B2B Platform <br />
              for Solar Equipment<br />
              {/* <RotatingWord /> */}
            </h1>

            {/* Subtitle */}
            <p className="mb-8 max-w-2xl 2xl:max-w-3xl mx-auto font-sans text-emerald-100/80 text-base sm:text-lg 2xl:text-xl 3xl:text-2xl text-center leading-relaxed">
              Zero margin leakage. Direct depot allocation. Dispute-proof delivery. Instant kit matching — SuryaNexa connects bulk solar traders, verified EPCs, and local installers with Blind-Vault™ lead privacy and satellite-precise sizing.
            </p>

            {/* Value Highlights */}
            <div className="gap-4 grid grid-cols-1 sm:grid-cols-3 pt-6 border-emerald-800/50 border-t w-full max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-2.5 font-sans font-semibold text-emerald-100/90 text-xs">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>KYB-Verified Traders Only</span>
              </div>
              <div className="flex items-center justify-center space-x-2.5 font-sans font-semibold text-emerald-100/90 text-xs">
                <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Blind-Vault™ Lead Sealing</span>
              </div>
              <div className="flex items-center justify-center space-x-2.5 font-sans font-semibold text-emerald-100/90 text-xs">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Transit Video Escrow</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Solar OS Orbital Model placed directly on the Hero section */}
          <motion.div
            style={{ y: imgY }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center items-center lg:col-span-5 w-full"
          >
            <SolarEngineModel />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
