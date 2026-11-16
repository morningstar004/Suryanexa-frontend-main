"use client";
import React from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Linkedin
} from "lucide-react";

export default function StitchFooter() {
  return (
    <footer className="relative flex flex-col justify-between bg-[#02201d] py-7 lg:py-10 border-emerald-950/80 border-t min-h-[45vh] overflow-hidden text-zinc-300 text-sm">
      {/* Soft ambient lighting matching the hero palette */}
      <div className="-top-24 left-1/2 absolute bg-emerald-500/10 blur-[130px] rounded-full w-[700px] h-[300px] -translate-x-1/2 pointer-events-none" />
      <div className="right-0 bottom-0 absolute bg-teal-400/5 blur-[120px] rounded-full w-[400px] h-[300px] pointer-events-none" />

      <div className="z-10 relative flex flex-col flex-1 justify-between gap-8 mx-auto px-6 sm:px-8 2xl:px-12 w-full max-w-7xl 2xl:max-w-[1536px] 3xl:max-w-[1850px] 4xl:max-w-[2200px]">
        {/* Main 4-Column Grid with proportional column allocation (Column 4 widened for email) */}
        <div className="gap-8 lg:gap-8 xl:gap-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 pt-2">

          {/* Column 1: Brand Info and Socials */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-3">
            {/* Logo and Brand Title */}
            <div>
              <div className="flex items-center gap-3.5">
                <div className="relative flex justify-center items-center w-11 h-11 hover:scale-105 transition-transform duration-200 shrink-0">
                  <img
                    src="/suryanexa-logo.png"
                    alt="SuryaNexa Logo"
                    className="drop-shadow-md w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1">
                    <span className="font-display font-black text-white sm:text-[26px] text-2xl leading-none tracking-tight">
                      SURYANEXA
                    </span>
                    <span className="font-bold text-amber-400 text-xs sm:text-sm leading-none">
                      ™
                    </span>
                  </div>
                  <span className="mt-1.5 font-sans font-bold text-[11px] text-zinc-400 uppercase tracking-widest">
                    SIMPLE • SWIFT • SMART
                  </span>
                </div>
              </div>
            </div>

            {/* Follow Us & Social Icons */}
            <div className="space-y-3">
              <span className="block font-sans font-bold text-white text-xs sm:text-sm uppercase tracking-wider">
                FOLLOW US
              </span>
              <div className="flex items-center gap-2.5">
                {/* Facebook */}
                <a
                  href="#"
                  aria-label="Facebook"
                  className="flex justify-center items-center bg-zinc-100 hover:bg-white shadow-xs rounded-lg w-9 h-9 text-zinc-900 hover:scale-105 transition-all duration-200"
                >
                  <Facebook className="fill-zinc-900 stroke-none w-4 h-4" />
                </a>

                {/* Instagram */}
                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex justify-center items-center bg-zinc-100 hover:bg-white shadow-xs rounded-lg w-9 h-9 text-zinc-900 hover:scale-105 transition-all duration-200"
                >
                  <Instagram className="stroke-[2.2] w-4 h-4" />
                </a>

                {/* YouTube */}
                <a
                  href="#"
                  aria-label="YouTube"
                  className="flex justify-center items-center bg-zinc-100 hover:bg-white shadow-xs rounded-lg w-9 h-9 text-zinc-900 hover:scale-105 transition-all duration-200"
                >
                  <Youtube className="fill-zinc-900 stroke-none w-4 h-4" />
                </a>

                {/* LinkedIn */}
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="flex justify-center items-center bg-zinc-100 hover:bg-white shadow-xs rounded-lg w-9 h-9 text-zinc-900 hover:scale-105 transition-all duration-200"
                >
                  <Linkedin className="fill-zinc-900 stroke-none w-4 h-4" />
                </a>

                {/* X / Twitter */}
                <a
                  href="#"
                  aria-label="X"
                  className="flex justify-center items-center bg-zinc-100 hover:bg-white shadow-xs rounded-lg w-9 h-9 text-zinc-900 hover:scale-105 transition-all duration-200"
                >
                  <svg className="fill-current w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Our Offerings & Resources */}
          <div className="space-y-7 lg:col-span-3">
            {/* Section: Our Offerings */}
            <div>
              <h4 className="flex items-center mb-3 font-sans font-bold text-white text-base sm:text-lg">
                <span className="mr-2 font-extrabold text-amber-400 text-lg">—</span>
                Our Offerings
              </h4>
              <ul className="space-y-2.5 text-zinc-300 sm:text-[15px] text-sm">
                <li>
                  <Link href="#offerings" className="hover:text-amber-300 transition-colors">
                    Home Solar
                  </Link>
                </li>
                <li>
                  <Link href="#community-solar" className="hover:text-amber-300 transition-colors">
                    Community Solar
                  </Link>
                </li>
                <li>
                  <Link href="#business-solar" className="hover:text-amber-300 transition-colors">
                    For your business
                  </Link>
                </li>
              </ul>
            </div>

            {/* Section: Resources */}
            <div>
              <h4 className="flex items-center mb-3 font-sans font-bold text-white text-base sm:text-lg">
                <span className="mr-2 font-extrabold text-amber-400 text-lg">—</span>
                Resources
              </h4>
              <ul className="space-y-2.5 text-zinc-300 sm:text-[15px] text-sm">
                <li>
                  <Link href="#calculator" className="hover:text-amber-300 transition-colors">
                    Surya Calc - AI Estimator
                  </Link>
                </li>
                <li>
                  <Link href="#academy" className="hover:text-amber-300 transition-colors">
                    Solar Courses &amp; Academy
                  </Link>
                </li>
                <li>
                  <Link href="#news" className="hover:text-amber-300 transition-colors">
                    News
                  </Link>
                </li>
                <li>
                  <Link href="#smarthub" className="hover:text-amber-300 transition-colors">
                    Surya SmartHub
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: About Us & Help / Network */}
          <div className="space-y-7 lg:col-span-2">
            {/* Section: About Us */}
            <div>
              <h4 className="flex items-center mb-3 font-sans font-bold text-white text-base sm:text-lg">
                <span className="mr-2 font-extrabold text-amber-400 text-lg">—</span>
                About Us
              </h4>
              <ul className="space-y-2.5 text-zinc-300 sm:text-[15px] text-sm">
                <li>
                  <Link href="#about" className="hover:text-amber-300 transition-colors">
                    Mission &amp; Values
                  </Link>
                </li>
                <li>
                  <Link href="#careers" className="hover:text-amber-300 transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            {/* Section: Help & Network */}
            <div>
              <h4 className="flex items-center mt-14 mb-3 font-sans font-bold text-white text-base sm:text-lg">
                <span className="mr-2 font-extrabold text-amber-400 text-lg">—</span>
                Help &amp; Network
              </h4>
              <ul className="space-y-2.5 text-zinc-300 sm:text-[15px] text-sm">
                <li>
                  <Link href="#contact" className="hover:text-amber-300 transition-colors">
                    Talk to us
                  </Link>
                </li>
                <li>
                  <Link href="#help" className="hover:text-amber-300 transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#feedback" className="hover:text-amber-300 transition-colors">
                    Feedback
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 4: Contact Us & Registered Office (Widened to 4 cols) */}
          <div className="space-y-7 lg:col-span-4">
            {/* Section: Contact Us */}
            <div>
              <h4 className="flex items-center mb-3 font-sans font-bold text-white text-base sm:text-lg">
                <span className="mr-2 font-extrabold text-amber-400 text-lg">—</span>
                Contact Us
              </h4>
              <div className="space-y-3 sm:text-[15px] text-sm">
                {/* Email Item */}
                <div className="flex items-center gap-3">
                  <div className="flex justify-center items-center bg-[#fef3c7] shadow-xs rounded-lg w-8 h-8 text-[#92400e] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <a
                    href="mailto:customer.support@suryanexa.com"
                    className="text-zinc-200 hover:text-amber-300 whitespace-nowrap transition-colors"
                  >
                    customer.support@suryanexa.com
                  </a>
                </div>

                {/* Phone Item */}
                <div className="flex items-center gap-3">
                  <div className="flex justify-center items-center bg-[#fef3c7] shadow-xs rounded-lg w-8 h-8 text-[#92400e] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <a
                    href="tel:+919303772737"
                    className="font-mono font-medium text-zinc-200 hover:text-amber-300 transition-colors"
                  >
                    +91 93037 72737
                  </a>
                </div>
              </div>
            </div>

            {/* Section: Registered Office */}
            <div>
              <h4 className="flex items-center mb-3 font-sans font-bold text-white text-base sm:text-lg">
                <span className="mr-2 font-extrabold text-amber-400 text-lg">—</span>
                Registered Office
              </h4>
              <div className="flex items-start gap-3 sm:text-[15px] text-sm">
                <div className="flex justify-center items-center bg-[#fef3c7] shadow-xs mt-0.5 rounded-lg w-8 h-8 text-[#92400e] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <p className="font-sans text-zinc-300 leading-relaxed">
                  Aditya World City,<br />
                  Ghaziabad, Uttar Pradesh, 201002
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Product Directory Badge, Legal Links */}
        <div className="flex md:flex-row flex-col justify-between items-center gap-4 pt-6 pb-1 border-emerald-900/60 border-t text-zinc-400 text-sm">
          {/* Copyright */}
          <div className="font-medium">
            © 2026 SuryaNexa. All Rights Reserved.
          </div>

          {/* Center Brand / SaaS Directory note */}
          <div className="flex items-center gap-2 text-zinc-300 text-sm">
            <span className="bg-emerald-400 rounded-full w-2 h-2 animate-pulse" />
            <span>SuryaNexa - SaaS Clean Energy Platform</span>
          </div>

          {/* Legal Links separated by bullet dots */}
          <div className="flex flex-wrap justify-center items-center gap-x-3.5 gap-y-1.5 text-zinc-400 text-sm">
            <Link href="#privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-zinc-600">•</span>
            <Link href="#vendor-policy" className="hover:text-white transition-colors">
              Vendor Policy
            </Link>
            <span className="text-zinc-600">•</span>
            <Link href="#terms" className="hover:text-white transition-colors">
              Terms Of Condition
            </Link>
            <span className="text-zinc-600">•</span>
            <Link href="#refund" className="hover:text-white transition-colors">
              Payment &amp; Refund
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
