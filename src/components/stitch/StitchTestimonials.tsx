"use client";

import React from "react";
import { Quote, CheckCircle2 } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  reviewType: string;
  rating: number;
  initials: string;
  image: string;
  quote: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "rajesh",
    name: "Rajesh Sharma",
    role: "MD",
    company: "SaurUrja EPC",
    location: "Ahmedabad",
    reviewType: "Verified EPC Review",
    rating: 5,
    initials: "RS",
    // Male executive portrait
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256",
    quote:
      "Eliminated WhatsApp chaos. We closed 14 PM Surya Ghar projects last month with instant 60-second SuryaCalc quotes. Client leads remain 100% private.",
  },
  {
    id: "sneha",
    name: "Sneha More",
    role: "Head of Procurement",
    company: "SunGrid",
    location: "Pune",
    reviewType: "Verified EPC Review",
    rating: 5,
    initials: "SM",
    // Female executive portrait
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256&h=256",
    quote:
      "The video unloading escrow protocol saved us ₹8.4 Lakhs in transit damage disputes on bi-facial TOPCon pallets. Funds release right when the barcodes scan.",
  },
  {
    id: "vikram",
    name: "Vikram Singhania",
    role: "Distributor",
    company: "Marwar Solar Traders",
    location: "Jaipur",
    reviewType: "Verified Trader Review",
    rating: 5,
    initials: "VS",
    // Male executive portrait
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256&h=256",
    quote:
      "Our payments used to get stuck for 45 days across state borders. With SuryaNexa, escrow clears within 3 minutes of warehouse barcode scan.",
  },
];

export default function StitchTestimonials() {
  return (
    <section
      className="relative bg-[#FAF8F3] py-16 border-zinc-200/80 border-t overflow-hidden"
      id="testimonials"
    >
      {/* Soft ambient solar glow */}
      <div className="top-1/2 left-1/2 absolute bg-emerald-500/5 blur-[140px] rounded-full w-[700px] h-[350px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* Container with responsive scaling for 1080p, 2K and 4K */}
      <div className="z-10 relative mx-auto px-5 sm:px-6 2xl:px-8 max-w-[1096px] 2xl:max-w-[1340px] 3xl:max-w-[1600px] 4xl:max-w-[1850px]">
        {/* Section Header */}
        <div className="mx-auto mb-14 sm:mb-16 max-w-2xl 2xl:max-w-3xl text-center">
          <h2 className="font-display font-extrabold text-zinc-950 text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl text-balance leading-tight tracking-tight">
            Trusted by Over 500+ Verified <br />
            <span className="text-emerald-700">Solar EPCs, Traders &amp; Installers</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg 2xl:max-w-xl text-zinc-700 text-sm sm:text-base 2xl:text-lg text-pretty leading-relaxed">
            Real feedback from verified leaders running on the cryptographic solar operating system.
          </p>
        </div>

        {/* Testimonials Grid: Each card sits on a bigger background card covering the avatar to the end of the card */}
        <div className="items-stretch gap-6 sm:gap-7 grid grid-cols-1 md:grid-cols-3 pt-2 pb-4">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="relative flex flex-col bg-white shadow-xl shadow-zinc-950/5 hover:shadow-2xl hover:shadow-zinc-950/10 border border-zinc-200/90 rounded-[32px] transition-all hover:-translate-y-1.5 duration-300"
            >
              {/* Top Avatar Circle on the bigger card background */}
              <div className="top-3 z-20 relative flex justify-center pt-3">
                <div className="relative flex justify-center items-center bg-zinc-100 shadow-md border-[4px] border-white rounded-full ring-1 ring-zinc-200/60 w-20 sm:w-22 h-20 sm:h-22 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="top-5 w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                  {/* Verified checkmark badge */}
                  <div className="top-1 right-1 absolute bg-white shadow-xs p-0.5 rounded-full text-emerald-600">
                    <CheckCircle2 className="fill-emerald-600 w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </div>

              {/* Inner Green Testimonial Card sitting on the bigger card background */}
              <div className="relative flex flex-col flex-1 justify-between bg-[#1B8049] shadow-[0_12px_28px_rgba(10,50,28,0.22)] px-5 sm:px-6 pt-4 pb-5 border border-emerald-400/30 rounded-[24px] text-white">
                {/* Rating + Review Status: moved between Top Avatar Circle and Card Body Content */}
                <div className="flex justify-center mb-3">
                  <div className="flex flex-col justify-center items-center bg-white/95 shadow-xs px-1 py-0.25 pb-0.5 border border-white/90 rounded-2xl hover:scale-105 transition-transform duration-2000">
                    {/* Stars: Increased size by 30% */}
                    <div className="flex items-center gap-0.5 text-[16px] text-amber-400 sm:text-[17px] leading-none cursor-pointer">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                  </div>
                  
                </div>
                {/* Review Type: on other line with decreased visibility */}
                    <span className="-mt-2 font-sans font-medium text-[9.5px] text-zinc-400 text-center uppercase tracking-wider whitespace-nowrap">
                      {item.reviewType}
                    </span>

                {/* Card Body Content */}
                <div className="flex flex-col flex-1 justify-between">
                  {/* Double Open Quote */}
                  <div className="flex justify-start mb-1">
                    <Quote className="opacity-95 fill-white w-6 sm:w-7 h-6 sm:h-7 text-white rotate-180 shrink-0" />
                  </div>

                  {/* Testimonial Quote Text */}
                  <p className="my-1.5 px-0.5 font-medium text-white sm:text-[13.5px] text-xs text-pretty leading-relaxed">
                    {item.quote}
                  </p>

                  {/* Double Close Quote */}
                  <div className="flex justify-end mt-1 mb-3">
                    <Quote className="opacity-95 fill-white w-6 sm:w-7 h-6 sm:h-7 text-white shrink-0" />
                  </div>

                  {/* Author Name and Designation */}
                  <div className="pt-2.5 border-white/20 border-t text-center">
                    <h3 className="font-display font-bold text-white sm:text-[15px] text-sm uppercase tracking-wider">
                      {item.name}
                    </h3>
                    <p className="mt-0.5 font-semibold text-[11px] text-emerald-100 sm:text-xs">
                      {item.role}, {item.company} · {item.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
