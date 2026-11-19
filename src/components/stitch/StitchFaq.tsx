"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, MessageSquarePlus, X, Send, HelpCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "leads-privacy",
    question: "Can SuryaNexa administrators really not see my leads?",
    answer:
      "Yes. Through our Blind-Vault zero-knowledge architecture, leads are encrypted client-side using asymmetric cryptographic keys. Even direct database dumps by platform maintainers show only random PROPRIETARY PRIVACY VAULT hashes until unlocked by your verified vendor credentials.",
  },
  {
    id: "mix-and-match",
    question: "How does mix-and-match procurement across traders work?",
    answer:
      "The Spot Engine balances multi-distributor logistics automatically. You can combine Tier-1 TOPCon panels from Depot A in Mundra, hybrid solar inverters from Depot B in Greater Noida, and mounting structures from Depot C, integrated in a single automated customer quote.",
  },
  {
    id: "video-shield",
    question: "How does the 180-second video shield stop transit damage disputes?",
    answer:
      "Field installers record unboxing and pallet serial barcode scans directly through the mobile web interface before the transport vehicle departs. Any micro-cracks or transit damage are instantly locked into an irrefutable claim report with exact timestamped GPS data, releasing replacement inventory without weeks of blame games.",
  },
  {
    id: "trader-command-center",
    question: "Who can list hardware on the Trader Command Center?",
    answer:
      "Only verified Tier-1 distributors, OEM direct desks, and verified stockists with valid GST filings, audited bonded warehouse storage, and authorized manufacturer agreements are admitted onto the trading terminal.",
  },
];

export default function StitchFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "EPC Contractor",
    subject: "",
    question: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      if (typeof window !== "undefined" && (window as any).__lenis) {
        (window as any).__lenis.stop();
      }
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      if (typeof window !== "undefined" && (window as any).__lenis) {
        (window as any).__lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      if (typeof window !== "undefined" && (window as any).__lenis) {
        (window as any).__lenis.start();
      }
    };
  }, [isModalOpen]);

  const isFormFilled = Boolean(
    formData.name.trim() &&
    formData.email.trim() &&
    formData.subject.trim() &&
    formData.question.trim()
  );

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.question.trim()) {
      toast.error("Please fill in your name, email, subject, and question.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsModalOpen(false);
      toast.success("Question submitted successfully! Our technical team will reach out within 2 hours.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "EPC Contractor",
        subject: "",
        question: "",
      });
    }, 750);
  };

  return (
    <section
      id="faq"
      className="relative bg-white py-12 sm:py-16 lg:py-20 border-zinc-200/80 border-t overflow-hidden"
    >
      <div className="mx-auto px-6 sm:px-8 2xl:px-12 3xl:max-w-[1600px] 4xl:max-w-[1900px] max-w-6xl 2xl:max-w-7xl">
        <div className="items-start gap-10 lg:gap-16 2xl:gap-20 grid grid-cols-1 lg:grid-cols-12">
          {/* Left Heading Column */}
          <div className="lg:top-28 lg:sticky self-start lg:col-span-5">
            <h2 className="mb-4 font-display font-extrabold text-zinc-900 text-3xl sm:text-4xl 2xl:text-5xl leading-tight tracking-tight">
              Everything the solar trade <br className="hidden sm:inline" />
              <span className="text-emerald-700">asks us first.</span>
            </h2>
            <p className="font-sans text-zinc-600 text-sm sm:text-base 2xl:text-lg leading-relaxed">
              Clear answers on encryption keys, DISCOM SLD automation, and how SuryaNexa guarantees zero lead leakage across the entire value chain.
            </p>

            {/* User Requested: Button under line 60-62 to pop a form with user info, subject, and question */}
            <div className="flex flex-col items-start gap-2.5 mt-6">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="group inline-flex items-center gap-2.5 bg-emerald-700 hover:bg-emerald-800 shadow-emerald-900/10 shadow-md px-6 py-3.5 rounded-full font-display font-bold text-white text-xs sm:text-sm active:scale-[0.97] transition-all cursor-pointer"
              >
                <MessageSquarePlus className="w-4 h-4 text-emerald-200 group-hover:scale-110 transition-transform" />
                <span>Ask a Custom Question</span>
              </button>
              <span className="font-sans text-zinc-500 text-xs">
                Can&apos;t find your answer?
              </span>
            </div>
          </div>

          {/* Right Accordion Column */}
          <div className="space-y-3.5 sm:space-y-4 lg:col-span-7">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={item.id}
                  className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "bg-white border-emerald-600/30 shadow-md ring-1 ring-emerald-500/10"
                      : "bg-white border-zinc-200/80 shadow-xs hover:border-zinc-300 hover:shadow-sm"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleToggle(index)}
                    className="flex justify-between items-center px-6 py-5 w-full text-left active:scale-[0.99] transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`font-display font-bold text-base transition-colors duration-200 pr-3 ${
                        isOpen ? "text-emerald-950" : "text-zinc-900 group-hover:text-emerald-800"
                      }`}
                    >
                      {item.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className={`transition-colors duration-200 shrink-0 ml-3 ${
                        isOpen ? "text-emerald-700" : "text-zinc-400 group-hover:text-zinc-600"
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                          transition: {
                            height: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
                            opacity: { duration: 0.22, delay: 0.06, ease: "easeOut" },
                          },
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: {
                            height: { duration: 0.26, ease: [0.16, 1, 0.3, 1] },
                            opacity: { duration: 0.15, ease: "easeIn" },
                          },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pt-2 pb-6 border-zinc-100 border-t font-sans text-zinc-600 sm:text-[15px] text-sm leading-relaxed">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pop-up Question Form Modal - Portaled to document.body so it is never trapped by SectionScrollFade CSS transforms */}
      {mounted && typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isModalOpen && (
              <div className="z-[999999] fixed inset-0 flex justify-center items-center p-4 sm:p-6 overflow-y-auto overscroll-contain">
                {/* Full-Page Backdrop Blur across the entire screen */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  onClick={() => setIsModalOpen(false)}
                  className="fixed inset-0 bg-zinc-950/60 backdrop-blur-md"
                  aria-hidden="true"
                />

                {/* Modal Content Card Centered on Screen */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 16 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="z-10 relative bg-white shadow-2xl my-auto p-6 sm:p-8 border border-zinc-200 rounded-3xl w-full max-w-xl max-h-[92vh] overflow-y-auto text-zinc-900"
                >
              {/* Top Header */}
              <div className="flex justify-between items-start mb-6 pb-4 border-zinc-100 border-b">
                <div className="flex items-center gap-3">
                  <div className="flex justify-center items-center bg-emerald-100 rounded-xl w-10 h-10 text-emerald-800 shrink-0">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-zinc-950 text-lg sm:text-xl leading-tight">
                      Ask SuryaNexa Support
                    </h3>
                    <p className="mt-0.5 font-sans text-zinc-500 sm:text-[13px] text-xs">
                      Submit your technical, procurement, or policy query below.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="hover:bg-zinc-100 p-1.5 rounded-full text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 1. User Information */}
                <div className="gap-3.5 grid grid-cols-1 sm:grid-cols-2">
                  <div>
                    <label className="block mb-1 font-sans font-semibold text-zinc-700 text-xs">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder=""
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-zinc-50/50 focus:bg-white px-3.5 py-2.5 border border-zinc-200 focus:border-emerald-600 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500/20 w-full font-sans text-zinc-900 text-xs sm:text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-sans font-semibold text-zinc-700 text-xs">
                      Work Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder=""
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-zinc-50/50 focus:bg-white px-3.5 py-2.5 border border-zinc-200 focus:border-emerald-600 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500/20 w-full font-sans text-zinc-900 text-xs sm:text-sm transition-all"
                    />
                  </div>
                </div>

                {/* <div className="gap-3.5 grid grid-cols-1 sm:grid-cols-2">
                  <div>
                    <label className="block mb-1 font-sans font-semibold text-zinc-700 text-xs">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-zinc-50/50 focus:bg-white px-3.5 py-2.5 border border-zinc-200 focus:border-emerald-600 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500/20 w-full font-sans text-zinc-900 text-xs sm:text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-sans font-semibold text-zinc-700 text-xs">
                      Your Role in Solar
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="bg-zinc-50/50 focus:bg-white px-3.5 py-2.5 border border-zinc-200 focus:border-emerald-600 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500/20 w-full font-sans text-zinc-900 text-xs sm:text-sm transition-all cursor-pointer"
                    >
                      <option value="EPC Contractor">EPC Contractor</option>
                      <option value="Solar Trader / Stockist">Solar Trader / Stockist</option>
                      <option value="Certified Installer">Certified Installer</option>
                      <option value="Project Consultant">Project Consultant</option>
                      <option value="Commercial / Residential Customer">Commercial / Residential Customer</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div> */}

                {/* 2. Subject Section */}
                <div>
                  <label className="block mb-1 font-sans font-semibold text-zinc-700 text-xs">
                    Subject <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder=""
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="bg-zinc-50/50 focus:bg-white px-3.5 py-2.5 border border-zinc-200 focus:border-emerald-600 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500/20 w-full font-sans text-zinc-900 text-xs sm:text-sm transition-all"
                  />
                </div>

                {/* 3. Question / Query Section */}
                <div>
                  <label className="block mb-1 font-sans font-semibold text-zinc-700 text-xs">
                    Your Question <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide details about your query or requirement so our engineering team can assist you accurately..."
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    className="bg-zinc-50/50 focus:bg-white px-3.5 py-2.5 border border-zinc-200 focus:border-emerald-600 rounded-xl outline-hidden focus:ring-2 focus:ring-emerald-500/20 w-full font-sans text-zinc-900 text-xs sm:text-sm transition-all resize-none"
                  />
                </div>

                {/* Bottom Actions */}
                <div className="flex sm:flex-row flex-col-reverse justify-between items-center gap-3 pt-3 border-zinc-100 border-t">
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-zinc-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Protected by Blind-Vault™ encryption</span>
                  </span>

                  <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 sm:flex-none hover:bg-zinc-100 px-4 py-2.5 border border-zinc-200 rounded-xl font-sans font-semibold text-zinc-600 hover:text-zinc-900 text-xs transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!isFormFilled || isSubmitting}
                      className={`inline-flex flex-1 sm:flex-none justify-center items-center gap-1.5 px-5 py-2.5 rounded-xl font-sans font-bold text-xs transition-all ${
                        isFormFilled && !isSubmitting
                          ? "bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs active:scale-[0.97] cursor-pointer"
                          : "bg-zinc-200 text-zinc-400 cursor-not-allowed shadow-none"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="border-2 border-white border-t-transparent rounded-full w-3.5 h-3.5 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </section>
  );
}
