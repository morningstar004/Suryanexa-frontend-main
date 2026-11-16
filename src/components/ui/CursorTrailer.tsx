"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CursorTrailer() {
  const [mounted, setMounted] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 35, stiffness: 240, mass: 0.35, bounce: 0 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only mount on desktop with mouse pointer
    if (typeof window !== "undefined" && !window.matchMedia("(pointer: coarse)").matches) {
      setMounted(true);
      const move = (e: MouseEvent) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      };
      window.addEventListener("mousemove", move);
      return () => window.removeEventListener("mousemove", move);
    }
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[99999] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-500/50 bg-emerald-500/[0.05] shadow-[0_0_15px_rgba(16,185,129,0.25)] backdrop-blur-[1px]"
      style={{
        x: smoothX,
        y: smoothY,
      }}
    />
  );
}

export default CursorTrailer;
