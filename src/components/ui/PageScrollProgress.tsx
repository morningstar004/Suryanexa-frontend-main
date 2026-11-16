"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function PageScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Critically overdamped spring with zero bounce
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 48,
    bounce: 0,
    restDelta: 0.001,
  });

  return (
    <div
      style={{ top: scrolled ? "63.64px" : "74px" }}
      className={`fixed left-0 right-0 z-[9998] pointer-events-none h-[3px] bg-transparent transition-all duration-300 ease-out ${
        scrolled ? "top-[63.64px]" : "top-[74px]"
      }`}
    >
      <motion.div
        style={{ scaleX }}
        className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 origin-left shadow-[0_0_10px_rgba(16,185,129,0.5)]"
      />
    </div>
  );
}

