"use client";

import React, { useState } from "react";
import { toast } from "sonner";

export default function StitchCta() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid work email.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      toast.success("Verification request received. Our onboarding team will contact you within 24 hours.");
    }, 450);
  };

  return (
    <section
      id="pilot-cta"
      className="w-full bg-[#faf8f3] py-20 lg:py-28 relative overflow-hidden border-t border-zinc-200/80"
    >
      {/* Subtle ambient lighting */}
      <div className="pointer-events-none absolute top-1/4 -right-20 w-[420px] h-[420px] rounded-full bg-emerald-500/5 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-[120px]" />

      <div className="max-w-7xl 2xl:max-w-[1536px] 3xl:max-w-[1850px] 4xl:max-w-[2200px] mx-auto px-6 sm:px-8 2xl:px-12 relative z-10">
        <div className="max-w-3xl 2xl:max-w-4xl">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-extrabold font-display tracking-tight text-zinc-950 mb-6 leading-[1.12] text-balance">
            Run your solar business on one network. <br />
            <span className="text-emerald-700">Zero chaos. Zero lead leak.</span>
          </h2>

          <p className="text-base sm:text-lg 2xl:text-xl text-zinc-700 mb-10 max-w-2xl 2xl:max-w-3xl font-normal leading-relaxed text-pretty">
            Join 500+ verified Indian traders and rooftop EPCs moving off disorganized WhatsApp groups and into dispute-proof execution.
          </p>

          <form className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 max-w-xl 2xl:max-w-2xl mb-8" onSubmit={handleSubmit}>
            <input
              className="px-5 py-4 rounded-xl bg-white border border-zinc-300 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 font-sans font-medium grow shadow-xs"
              placeholder="you@solarcompany.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              disabled={isLoading}
            />
            <button
              className={`px-8 py-4 rounded-xl font-bold font-display text-sm shadow-md transition-all flex items-center justify-center space-x-2 shrink-0 cursor-pointer active:scale-[0.97] mask-color-shift ${
                submitted
                  ? "bg-emerald-600 text-white shadow-emerald-600/30 animate-pulse-success"
                  : "bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-700/20 hover:scale-[1.02]"
              }`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying...</span>
                </span>
              ) : submitted ? (
                <span>Pilot Access Confirmed ✓</span>
              ) : (
                <>
                  <span>Request pilot access</span>
                  <span className="font-sans font-medium text-base ml-1">➔</span>
                </>
              )}
            </button>
          </form>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-8 text-xs font-sans font-medium text-zinc-700">
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-600 font-bold">✓</span> KYC verification mandatory
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-600 font-bold">✓</span> Direct ex-depot hardware
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-600 font-bold">✓</span> Q1 allocations active
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
