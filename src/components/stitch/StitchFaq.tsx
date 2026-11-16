"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="relative bg-white py-12 sm:py-16 lg:py-20 border-zinc-200/80 border-t overflow-hidden"
    >
      <div className="mx-auto px-6 sm:px-8 2xl:px-12 max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[1900px]">
        <div className="gap-10 lg:gap-16 2xl:gap-20 grid grid-cols-1 lg:grid-cols-12 items-start">
          {/* Left Heading Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
            <h2 className="mb-4 font-display font-extrabold text-zinc-900 text-3xl sm:text-4xl 2xl:text-5xl leading-tight tracking-tight">
              Everything the solar trade <br className="hidden sm:inline" />
              <span className="text-emerald-700">asks us first.</span>
            </h2>
            <p className="font-sans text-zinc-600 text-sm sm:text-base 2xl:text-lg leading-relaxed">
              Clear answers on encryption keys, DISCOM SLD automation, and how SuryaNexa guarantees zero lead leakage across the entire value chain.
            </p>
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
                    className="w-full flex justify-between items-center px-6 py-5 text-left active:scale-[0.99] cursor-pointer transition-colors"
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
                        <div className="px-6 pt-2 pb-6 border-zinc-100 border-t font-sans text-zinc-600 text-sm sm:text-[15px] leading-relaxed">
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
    </section>
  );
}
