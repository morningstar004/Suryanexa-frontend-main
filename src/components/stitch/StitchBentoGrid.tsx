"use client";

import React from "react";
import { Check } from "lucide-react";
import SectionScrollFade from "@/components/ui/SectionScrollFade";

export default function StitchBentoGrid() {
  return (
    <div className="relative">
      {/* =========================================================================
          PART 1 OF 5: CENTRAL SECTION HEADING & VALUE INTRO
         ========================================================================= */}
      <SectionScrollFade id="stakeholder-solutions">
        <section className="relative bg-white py-24 sm:py-32 lg:py-40 2xl:py-48 border-zinc-200/80 border-t overflow-hidden">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl 2xl:max-w-5xl 3xl:max-w-6xl text-center">
            <h2 className="font-display font-extrabold text-zinc-950 text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl 3xl:text-7xl leading-tight tracking-tight">
              One unified platform for every role <br className="hidden sm:inline" />
              <span className="text-emerald-700">across the solar value chain.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl 2xl:max-w-3xl 3xl:max-w-4xl font-sans font-normal text-zinc-600 text-base sm:text-lg 2xl:text-xl 3xl:text-2xl leading-relaxed">
              From warehouse dispatch to rooftop commissioning, India's solar ecosystem runs on fragmented chats and payment delays. SuryaNexa unifies traders, EPCs, consultants, and installers into one dispute-proof Solar Operating System.
            </p>
          </div>
        </section>
      </SectionScrollFade>

      {/* =========================================================================
          PART 2 OF 5: FOR SOLAR TRADERS & BONDED STOCKISTS (Text Left, Photo Extreme Right)
         ========================================================================= */}
      <SectionScrollFade>
        <section className="relative bg-white py-6 lg:py-10 2xl:py-14 border-zinc-200/70 border-t overflow-hidden">
          <div className="flex lg:flex-row flex-col justify-between items-center gap-10 lg:gap-8 xl:gap-12 2xl:gap-16 w-full max-w-[1536px] 3xl:max-w-[1920px] 4xl:max-w-[2300px] mx-auto">
            {/* Text Content Block */}
            <div className="order-1 px-6 sm:px-8 lg:pr-4 lg:pl-12 xl:pl-16 2xl:pl-20 3xl:pl-24 w-full lg:w-[48%] xl:w-[46%] 2xl:w-[48%] max-w-xl 2xl:max-w-2xl 3xl:max-w-3xl">
              <div className="space-y-6 2xl:space-y-8">
                <h3 className="font-display font-extrabold text-zinc-950 text-2xl sm:text-3xl lg:text-4xl 2xl:text-[2.65rem] 3xl:text-5xl leading-tight tracking-tight">
                  Stop losing margins to quote-leaking brokers and transit disputes.
                </h3>

                <p className="font-sans text-zinc-600 text-sm sm:text-base 2xl:text-lg 3xl:text-xl leading-relaxed">
                  Fielding endless WhatsApp inquiries from unverified brokers leaks pricing and stalls inventory. SuryaNexa gives stockists a closed, KYC-cleared PO pipeline with guaranteed payment escrow and zero transit disputes.
                </p>

                {/* Checklist Bullets with 30ms row stagger */}
                <div className="space-y-4 2xl:space-y-5 pt-2 stagger-rows">
                  <div className="flex items-start gap-3 2xl:gap-4">
                    <div className="flex justify-center items-center bg-emerald-100 mt-0.5 rounded-full w-5 h-5 2xl:w-6 2xl:h-6 text-emerald-800 shrink-0">
                      <Check className="stroke-[2.5] w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-zinc-950 text-sm 2xl:text-base 3xl:text-lg">
                        KYC-Verified Buyer Catalog
                      </h4>
                      <p className="mt-0.5 text-zinc-600 text-xs sm:text-sm 2xl:text-base 3xl:text-lg leading-relaxed">
                        List Panels, Inverters, and BOS visible only to credentialed EPCs. Stop pricing leaks to unauthorized middlemen.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 2xl:gap-4">
                    <div className="flex justify-center items-center bg-emerald-100 mt-0.5 rounded-full w-5 h-5 2xl:w-6 2xl:h-6 text-emerald-800 shrink-0">
                      <Check className="stroke-[2.5] w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-zinc-950 text-sm 2xl:text-base 3xl:text-lg">
                        Standardized Pre-Funded POs
                      </h4>
                      <p className="mt-0.5 text-zinc-600 text-xs sm:text-sm 2xl:text-base 3xl:text-lg leading-relaxed">
                        Receive structured purchase orders with locked escrow funds before inventory ever leaves your depot.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 2xl:gap-4">
                    <div className="flex justify-center items-center bg-emerald-100 mt-0.5 rounded-full w-5 h-5 2xl:w-6 2xl:h-6 text-emerald-800 shrink-0">
                      <Check className="stroke-[2.5] w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-zinc-950 text-sm 2xl:text-base 3xl:text-lg">
                        Video Unloading Claim Shield
                      </h4>
                      <p className="mt-0.5 text-zinc-600 text-xs sm:text-sm 2xl:text-base 3xl:text-lg leading-relaxed">
                        Mandatory arrival checklist and timestamped unloading video uploads eliminate transit damage disputes instantly.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Metric Footer */}
                <div className="flex items-center gap-6 2xl:gap-8 pt-4 2xl:pt-6 border-zinc-100 border-t">
                  <div>
                    <span className="font-display font-extrabold text-emerald-700 text-2xl 2xl:text-3xl 3xl:text-4xl">₹18.4 Cr</span>
                    <p className="font-sans font-medium text-zinc-500 text-xs 2xl:text-sm 3xl:text-base">Verified inventory traded</p>
                  </div>
                  <div className="bg-zinc-200 w-px h-8 2xl:h-10" />
                  <div>
                    <span className="font-display font-extrabold text-zinc-950 text-2xl 2xl:text-3xl 3xl:text-4xl">0%</span>
                    <p className="font-sans font-medium text-zinc-500 text-xs 2xl:text-sm 3xl:text-base">Transit claim dispute rate</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Real Photograph: Extreme Right Corner Bleed (-10% size) */}
            <div className="self-end lg:self-center order-2 w-[94%] sm:w-[92%] lg:w-[50%] xl:w-[52%] 2xl:w-[50%] shrink-0">
              <div className="relative bg-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border-y border-zinc-200/90 border-l rounded-l-3xl h-[340px] sm:h-[400px] md:h-[450px] lg:h-[480px] xl:h-[530px] 2xl:h-[580px] 3xl:h-[640px] 4xl:h-[720px] overflow-hidden">
                <img
                  src="/solar-traders-vault.jpg"
                  alt="Solar traders and bonded stockists managing encrypted orders and escrow release on SuryaNexa trader vault"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </SectionScrollFade>

      {/* =========================================================================
          PART 3 OF 5: FOR EPC CONTRACTORS & VENDORS (Photo Extreme Left, Text Right)
         ========================================================================= */}
      <SectionScrollFade>
        <section className="relative bg-white py-6 lg:py-10 2xl:py-14 border-zinc-200/70 border-t overflow-hidden">
          <div className="flex lg:flex-row flex-col justify-between items-center gap-10 lg:gap-8 xl:gap-12 2xl:gap-16 w-full max-w-[1536px] 3xl:max-w-[1920px] 4xl:max-w-[2300px] mx-auto">
            {/* Real Photograph: Extreme Left Corner Bleed */}
            <div className="self-start lg:self-center order-2 lg:order-1 w-[94%] sm:w-[92%] lg:w-[50%] xl:w-[52%] 2xl:w-[50%] shrink-0">
              <div className="relative bg-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border-y border-zinc-200/90 border-r rounded-r-3xl h-[340px] sm:h-[400px] md:h-[450px] lg:h-[480px] xl:h-[530px] 2xl:h-[580px] 3xl:h-[640px] 4xl:h-[720px] overflow-hidden">
                <img
                  src="/solar-epc-depot.jpg"
                  alt="EPC Contractor and Logistics Supervisor inspecting Waaree and Adani solar pallet delivery at bonded depot"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Text Content Block */}
            <div className="order-1 lg:order-2 px-6 sm:px-8 lg:pr-12 xl:pr-16 2xl:pr-20 3xl:pr-24 lg:pl-4 w-full lg:w-[48%] xl:w-[46%] 2xl:w-[48%] max-w-xl 2xl:max-w-2xl 3xl:max-w-3xl">
              <div className="space-y-6 2xl:space-y-8">
                <h3 className="font-display font-extrabold text-zinc-950 text-2xl sm:text-3xl lg:text-4xl 2xl:text-[2.65rem] 3xl:text-5xl leading-tight tracking-tight">
                  Source multi-trader kits, protect your leads, and scale your pipeline.
                </h3>

                <p className="font-sans text-zinc-600 text-sm sm:text-base 2xl:text-lg 3xl:text-xl leading-relaxed">
                  Procuring on WhatsApp exposes EPCs to phantom stock, locked margins, and poached leads. SuryaNexa equips contractors with cross-trader kit engineering, encrypted CRM privacy, and automated subsidy tracking.
                </p>

                {/* Checklist Bullets with 30ms row stagger */}
                <div className="space-y-4 2xl:space-y-5 pt-2 stagger-rows">
                  <div className="flex items-start gap-3 2xl:gap-4">
                    <div className="flex justify-center items-center bg-emerald-100 mt-0.5 rounded-full w-5 h-5 2xl:w-6 2xl:h-6 text-emerald-800 shrink-0">
                      <Check className="stroke-[2.5] w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-zinc-950 text-sm 2xl:text-base 3xl:text-lg">
                        Cross-Trader Kit Configurator
                      </h4>
                      <p className="mt-0.5 text-zinc-600 text-xs sm:text-sm 2xl:text-base 3xl:text-lg leading-relaxed">
                        Mix Tier-1 panels, inverters, and BOS across multiple vetted stockists in a single, unified project workflow.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 2xl:gap-4">
                    <div className="flex justify-center items-center bg-emerald-100 mt-0.5 rounded-full w-5 h-5 2xl:w-6 2xl:h-6 text-emerald-800 shrink-0">
                      <Check className="stroke-[2.5] w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-zinc-950 text-sm 2xl:text-base 3xl:text-lg">
                        Mode A vs. Mode B Proposals
                      </h4>
                      <p className="mt-0.5 text-zinc-600 text-xs sm:text-sm 2xl:text-base 3xl:text-lg leading-relaxed">
                        Generate side-by-side client quotes in 60 seconds — optimized for maximum efficiency or lowest capital cost.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 2xl:gap-4">
                    <div className="flex justify-center items-center bg-emerald-100 mt-0.5 rounded-full w-5 h-5 2xl:w-6 2xl:h-6 text-emerald-800 shrink-0">
                      <Check className="stroke-[2.5] w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-zinc-950 text-sm 2xl:text-base 3xl:text-lg">
                        Blind-Vault™ Encrypted CRM
                      </h4>
                      <p className="mt-0.5 text-zinc-600 text-xs sm:text-sm 2xl:text-base 3xl:text-lg leading-relaxed">
                        100% cryptographic lead isolation. Even SuryaNexa administrators cannot view or export your private prospects.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Metric Footer */}
                <div className="flex items-center gap-6 2xl:gap-8 pt-4 2xl:pt-6 border-zinc-100 border-t">
                  <div>
                    <span className="font-display font-extrabold text-emerald-700 text-2xl 2xl:text-3xl 3xl:text-4xl">6 Members</span>
                    <p className="font-sans font-medium text-zinc-500 text-xs 2xl:text-sm 3xl:text-base">Dedicated squad (4 installers + 2 consultants)</p>
                  </div>
                  <div className="bg-zinc-200 w-px h-8 2xl:h-10" />
                  <div>
                    <span className="font-display font-extrabold text-zinc-950 text-2xl 2xl:text-3xl 3xl:text-4xl">100%</span>
                    <p className="font-sans font-medium text-zinc-500 text-xs 2xl:text-sm 3xl:text-base">Blind-Vault™ client privacy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionScrollFade>

      {/* =========================================================================
          PART 4 OF 5: FOR SOLAR CONSULTANTS & CAD ENGINEERS (Text Left, Photo Extreme Right)
         ========================================================================= */}
      <SectionScrollFade>
        <section className="relative bg-white py-6 lg:py-10 2xl:py-14 border-zinc-200/70 border-t overflow-hidden">
          <div className="flex lg:flex-row flex-col justify-between items-center gap-10 lg:gap-8 xl:gap-12 2xl:gap-16 w-full max-w-[1536px] 3xl:max-w-[1920px] 4xl:max-w-[2300px] mx-auto">
            {/* Text Content Block */}
            <div className="order-1 px-6 sm:px-8 lg:pr-4 lg:pl-12 xl:pl-16 2xl:pl-20 3xl:pl-24 w-full lg:w-[48%] xl:w-[46%] 2xl:w-[48%] max-w-xl 2xl:max-w-2xl 3xl:max-w-3xl">
              <div className="space-y-6 2xl:space-y-8">
                <h3 className="font-display font-extrabold text-zinc-950 text-2xl sm:text-3xl lg:text-4xl 2xl:text-[2.65rem] 3xl:text-5xl leading-tight tracking-tight">
                  Automate DISCOM approvals and lock upfront engineering retainers.
                </h3>

                <p className="font-sans text-zinc-600 text-sm sm:text-base 2xl:text-lg 3xl:text-xl leading-relaxed">
                  Idiosyncratic DISCOM rules and unbilled drafting revisions drain consultant hours. SuryaNexa generates utility-compliant dossiers in seconds and secures engineering retainers in upfront escrow.
                </p>

                {/* Checklist Bullets with 30ms row stagger */}
                <div className="space-y-4 2xl:space-y-5 pt-2 stagger-rows">
                  <div className="flex items-start gap-3 2xl:gap-4">
                    <div className="flex justify-center items-center bg-emerald-100 mt-0.5 rounded-full w-5 h-5 2xl:w-6 2xl:h-6 text-emerald-800 shrink-0">
                      <Check className="stroke-[2.5] w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-zinc-950 text-sm 2xl:text-base 3xl:text-lg">
                        Automated DISCOM SLD Engine
                      </h4>
                      <p className="mt-0.5 text-zinc-600 text-xs sm:text-sm 2xl:text-base 3xl:text-lg leading-relaxed">
                        1-click CEIG and utility-compliant Single Line Diagrams with 99.4% first-pass approval across state DISCOMs.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 2xl:gap-4">
                    <div className="flex justify-center items-center bg-emerald-100 mt-0.5 rounded-full w-5 h-5 2xl:w-6 2xl:h-6 text-emerald-800 shrink-0">
                      <Check className="stroke-[2.5] w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-zinc-950 text-sm 2xl:text-base 3xl:text-lg">
                        SuryaCalc™ 60-Second Sizing
                      </h4>
                      <p className="mt-0.5 text-zinc-600 text-xs sm:text-sm 2xl:text-base 3xl:text-lg leading-relaxed">
                        Satellite polygon shading, solar irradiance modeling, and instant PM Surya Ghar subsidy calculations (up to ₹78,000).
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 2xl:gap-4">
                    <div className="flex justify-center items-center bg-emerald-100 mt-0.5 rounded-full w-5 h-5 2xl:w-6 2xl:h-6 text-emerald-800 shrink-0">
                      <Check className="stroke-[2.5] w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-zinc-950 text-sm 2xl:text-base 3xl:text-lg">
                        Milestone Retainer Escrow
                      </h4>
                      <p className="mt-0.5 text-zinc-600 text-xs sm:text-sm 2xl:text-base 3xl:text-lg leading-relaxed">
                        Design retainers are funded upfront before CAD work begins and released on delivery, ending unbilled scope creep.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Metric Footer */}
                <div className="flex items-center gap-6 2xl:gap-8 pt-4 2xl:pt-6 border-zinc-100 border-t">
                  <div>
                    <span className="font-display font-extrabold text-emerald-700 text-2xl 2xl:text-3xl 3xl:text-4xl">99.4%</span>
                    <p className="font-sans font-medium text-zinc-500 text-xs 2xl:text-sm 3xl:text-base">First-pass DISCOM SLD approval</p>
                  </div>
                  <div className="bg-zinc-200 w-px h-8 2xl:h-10" />
                  <div>
                    <span className="font-display font-extrabold text-zinc-950 text-2xl 2xl:text-3xl 3xl:text-4xl">60 Sec</span>
                    <p className="font-sans font-medium text-zinc-500 text-xs 2xl:text-sm 3xl:text-base">Satellite sizing &amp; subsidy calculation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Real Photograph: Extreme Right Corner Bleed */}
            <div className="self-end lg:self-center order-2 w-[94%] sm:w-[92%] lg:w-[50%] xl:w-[52%] 2xl:w-[50%] shrink-0">
              <div className="relative bg-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border-y border-zinc-200/90 border-l rounded-l-3xl h-[340px] sm:h-[400px] md:h-[450px] lg:h-[480px] xl:h-[530px] 2xl:h-[580px] 3xl:h-[640px] 4xl:h-[720px] overflow-hidden">
                <img
                  src="/solar-consultants-cad.jpg"
                  alt="Solar Consultants and CAD Engineers reviewing automated DISCOM single line diagram"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </SectionScrollFade>

      {/* =========================================================================
          PART 5 OF 5: FOR FIELD INSTALLERS & ROOFTOP SQUADS (Photo Extreme Left, Text Right)
         ========================================================================= */}
      <SectionScrollFade>
        <section className="relative bg-white py-6 lg:py-10 2xl:py-14 border-zinc-200/70 border-t border-b overflow-hidden">
          <div className="flex lg:flex-row flex-col justify-between items-center gap-10 lg:gap-8 xl:gap-12 2xl:gap-16 w-full max-w-[1536px] 3xl:max-w-[1920px] 4xl:max-w-[2300px] mx-auto">
            {/* Real Photograph: Extreme Left Corner Bleed */}
            <div className="self-start lg:self-center order-2 lg:order-1 w-[94%] sm:w-[92%] lg:w-[50%] xl:w-[52%] 2xl:w-[50%] shrink-0">
              <div className="relative bg-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border-y border-zinc-200/90 border-r rounded-r-3xl h-[340px] sm:h-[400px] md:h-[450px] lg:h-[480px] xl:h-[530px] 2xl:h-[580px] 3xl:h-[640px] 4xl:h-[720px] overflow-hidden">
                <img
                  src="/solar-installers-field.jpg"
                  alt="Solar Field Installers and Rooftop Squad conducting inverter testing with SuryaNexa app"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Text Content Block */}
            <div className="order-1 lg:order-2 px-6 sm:px-8 lg:pr-12 xl:pr-16 2xl:pr-20 3xl:pr-24 lg:pl-4 w-full lg:w-[48%] xl:w-[46%] 2xl:w-[48%] max-w-xl 2xl:max-w-2xl 3xl:max-w-3xl">
              <div className="space-y-6 2xl:space-y-8">
                <h3 className="font-display font-extrabold text-zinc-950 text-2xl sm:text-3xl lg:text-4xl 2xl:text-[2.65rem] 3xl:text-5xl leading-tight tracking-tight">
                  Direct milestone payouts with zero snag-list wage deductions.
                </h3>

                <p className="font-sans text-zinc-600 text-sm sm:text-base 2xl:text-lg 3xl:text-xl leading-relaxed">
                  Field technicians regularly face wage delays and arbitrary deductions over false snags. SuryaNexa unlocks automatic bank payouts against digital test proofs and ensures crews have complete staging hardware.
                </p>

                {/* Checklist Bullets with 30ms row stagger */}
                <div className="space-y-4 2xl:space-y-5 pt-2 stagger-rows">
                  <div className="flex items-start gap-3 2xl:gap-4">
                    <div className="flex justify-center items-center bg-emerald-100 mt-0.5 rounded-full w-5 h-5 2xl:w-6 2xl:h-6 text-emerald-800 shrink-0">
                      <Check className="stroke-[2.5] w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-zinc-950 text-sm 2xl:text-base 3xl:text-lg">
                        Instant Digital Milestone Payouts
                      </h4>
                      <p className="mt-0.5 text-zinc-600 text-xs sm:text-sm 2xl:text-base 3xl:text-lg leading-relaxed">
                        Bank payouts trigger automatically upon uploading verified megger test results, DC string Voc readings, and grid-tie proofs.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 2xl:gap-4">
                    <div className="flex justify-center items-center bg-emerald-100 mt-0.5 rounded-full w-5 h-5 2xl:w-6 2xl:h-6 text-emerald-800 shrink-0">
                      <Check className="stroke-[2.5] w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-zinc-950 text-sm 2xl:text-base 3xl:text-lg">
                        Verified BOS Hardware Staging
                      </h4>
                      <p className="mt-0.5 text-zinc-600 text-xs sm:text-sm 2xl:text-base 3xl:text-lg leading-relaxed">
                        100% of balance-of-system components are confirmed on-site before crane lifts begin, eliminating unpaid idle time.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 2xl:gap-4">
                    <div className="flex justify-center items-center bg-emerald-100 mt-0.5 rounded-full w-5 h-5 2xl:w-6 2xl:h-6 text-emerald-800 shrink-0">
                      <Check className="stroke-[2.5] w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-zinc-950 text-sm 2xl:text-base 3xl:text-lg">
                        Verified Squad Application Pool
                      </h4>
                      <p className="mt-0.5 text-zinc-600 text-xs sm:text-sm 2xl:text-base 3xl:text-lg leading-relaxed">
                        Join structured 4-member vendor squads with geofenced safety compliance, verified ratings, and steady project pipelines.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Metric Footer */}
                <div className="flex items-center gap-6 2xl:gap-8 pt-4 2xl:pt-6 border-zinc-100 border-t">
                  <div>
                    <span className="font-display font-extrabold text-emerald-700 text-2xl 2xl:text-3xl 3xl:text-4xl">180 Sec</span>
                    <p className="font-sans font-medium text-zinc-500 text-xs 2xl:text-sm 3xl:text-base">Payout release on verified test signoff</p>
                  </div>
                  <div className="bg-zinc-200 w-px h-8 2xl:h-10" />
                  <div>
                    <span className="font-display font-extrabold text-zinc-950 text-2xl 2xl:text-3xl 3xl:text-4xl">0 Hours</span>
                    <p className="font-sans font-medium text-zinc-500 text-xs 2xl:text-sm 3xl:text-base">Idle downtime from missing hardware</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionScrollFade>
    </div>
  );
}
