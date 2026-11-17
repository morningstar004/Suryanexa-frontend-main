"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState<string>("");
  const [isResetSent, setIsResetSent] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsResetSent(true);
    toast.success("Password recovery link sent to your work email!");
    setTimeout(() => {
      setIsResetSent(false);
    }, 6000);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#071311] text-white overflow-x-hidden flex flex-col justify-between selection:bg-emerald-500 selection:text-zinc-950 font-sans">
      
      {/* =========================================================================
          BACKGROUND VIDEO IN LOOP WITH CINEMATIC EMERALD ATMOSPHERE FILTER
         ========================================================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Looping Background Solar Work Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.38] contrast-[1.15] saturate-[1.15]"
        >
          <source src="/solarWork.mp4" type="video/mp4" />
        </video>

        {/* Deep Emerald Tint & Darkening Overlay Filters */}
        <div className="absolute inset-0 bg-[#071311]/75 backdrop-brightness-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071311] via-[#071311]/50 to-[#071311]/80" />

        {/* Static Radial Gradients */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-emerald-600/15 blur-[150px]" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-teal-500/10 blur-[180px]" />
        <div className="absolute -bottom-32 right-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/15 blur-[160px]" />

        {/* Static Subtle Tech Grid Lines */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-20 w-full px-6 sm:px-10 lg:px-14 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="relative flex justify-center items-center w-10 h-10 group-hover:scale-105 transition-transform duration-300 shrink-0">
            <img
              src="/suryanexa-logo.png"
              alt="SuryaNexa Logo"
              className="drop-shadow-[0_0_12px_rgba(16,185,129,0.5)] w-full h-full object-contain"
            />
          </div>
          <span className="text-2xl font-black font-display tracking-tight text-white">
            Surya<span className="text-[#10b981]">NEXA</span>
          </span>
        </Link>

        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0c1816] hover:bg-[#122824] border border-[#1b3d35] text-xs sm:text-sm text-zinc-300 hover:text-white transition-all cursor-pointer shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Login</span>
        </Link>
      </header>

      {/* Main Body */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-8 lg:px-14 py-8 lg:py-12">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Brand Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-7 space-y-8 lg:pr-6 relative"
          >
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white tracking-tight leading-[1.12]">
                Account Security &amp; <br />
                <span className="text-[#10b981]">Password Recovery</span>
              </h1>
              <p className="text-base sm:text-lg text-zinc-300 font-sans max-w-xl leading-relaxed">
                Protecting enterprise accounts with encrypted KYC and Blind-Vault™ identity sealing.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span className="text-sm sm:text-base font-medium text-zinc-200">
                  Instant recovery token sent to verified domain email
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span className="text-sm sm:text-base font-medium text-zinc-200">
                  256-bit asymmetric cryptographic vault sealing
                </span>
              </div>
            </div>

            {/* Bottom Trust Badge Pills */}
            <div className="pt-6 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a1815]/90 border border-[#173831] text-xs font-mono text-zinc-300 shadow-xs">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero-Knowledge Lead Sealing</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a1815]/90 border border-[#173831] text-xs font-mono text-zinc-300 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Hardware Escrow Protection</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Recovery Card */}
          <div className="lg:col-span-6 xl:col-span-5 w-full flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[480px] rounded-[32px] bg-[#0c1816]/92 backdrop-blur-2xl border border-[#1c3832] p-7 sm:p-9 shadow-[0_30px_80px_rgba(0,0,0,0.65)] relative overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-[#10b981] to-transparent pointer-events-none" />

              <div className="pb-4 mb-4 border-b border-[#1c3832] flex items-center justify-between">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Login</span>
                </Link>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#134e43] text-emerald-300 border border-emerald-500/30">
                  Password Recovery
                </span>
              </div>

              <div className="mb-6 space-y-1">
                <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
                  Forgot Password?
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                  Enter your company work email to receive password reset instructions.
                </p>
              </div>

              {isResetSent && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-5 p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Password reset instructions have been dispatched to your email address!</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-zinc-300 font-sans">
                    Work Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#081513] border border-[#1a3832] text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-sans"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#10b981] hover:bg-[#059669] text-zinc-950 font-bold text-sm shadow-[0_10px_25px_rgba(16,185,129,0.3)] transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <span>Send Reset Instructions</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </motion.button>
                </div>
              </form>

              <div className="mt-7 text-center text-xs text-zinc-400 font-sans">
                Remember your credentials?{" "}
                <Link
                  href="/login"
                  className="text-emerald-400 hover:text-emerald-300 font-bold underline underline-offset-2 transition-colors"
                >
                  Sign In
                </Link>
              </div>
            </motion.div>
          </div>

        </div>
      </main>

      <footer className="relative z-20 py-4 text-center text-xs text-zinc-500 border-t border-[#132824]">
        © {new Date().getFullYear()} SuryaNexa B2B Solar Intelligence. All rights reserved.
      </footer>
    </div>
  );
}
