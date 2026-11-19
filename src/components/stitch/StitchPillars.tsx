"use client";
import React from "react";

export default function StitchPillars() {
  return (
    <>
      <section className="relative py-24 lg:py-32 overflow-hidden" id="pillars">
        {/* Background Landscape with Elegant Frosted Warm Overlay */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img
            src="/Renewable Energy Sunrise Landscape.png"
            alt="Renewable Energy Sunrise Landscape"
            className="w-full h-full object-cover object-center"
          />
          {/* Frosted warm overlay allowing the sunrise landscape to show through while preserving contrast */}
          <div className="absolute inset-0 bg-[#faf8f3]/80 backdrop-blur-[1px]" />
          {/* Seamless edge gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
        </div>

        <div className="relative z-10 mx-auto px-6 sm:px-8 2xl:px-12 2xl:max-w-[1536px] 3xl:max-w-[1850px] 4xl:max-w-[2200px] max-w-7xl">
          <div className="mb-16 max-w-3xl 2xl:max-w-4xl">
            <h2 className="font-display font-extrabold text-zinc-950 text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl text-balance leading-tight tracking-tight">
              Built for everyone the sun touches <br />
              <span className="text-emerald-700">on its journey to the meter.</span>
            </h2>
            <p className="mt-4 text-zinc-700 text-base 2xl:text-lg text-pretty leading-relaxed">
              Eliminating backroom middlemen across every role in the decentralized solar lifecycle.
            </p>
          </div>

          <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col justify-between shadow-sm p-8 hover:border-zinc-300 rounded-3xl transition liquid-card">
              <div>
                <div className="flex justify-center items-center bg-zinc-100 mb-6 border border-zinc-200/80 rounded-xl w-12 h-12 font-display font-bold text-zinc-950 text-lg">
                  01
                </div>
                <h3 className="font-display font-bold text-zinc-950 text-lg">Solar Traders</h3>
                <p className="mt-1 mb-2.5 font-sans font-semibold text-[11px] text-zinc-600 uppercase tracking-wider">Importers &amp; Stockists</p>
                <p className="text-zinc-700 text-xs text-pretty leading-relaxed">
                  List verified stock allocations and receive standardized, pre-funded POs. No more ghost quotes or WhatsApp price wars.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between shadow-sm p-8 hover:border-zinc-300 rounded-3xl transition liquid-card">
              <div>
                <div className="flex justify-center items-center bg-emerald-50 mb-6 border border-emerald-200/80 rounded-xl w-12 h-12 font-display font-bold text-emerald-800 text-lg">
                  02
                </div>
                <h3 className="font-display font-bold text-zinc-950 text-lg">EPC Vendors</h3>
                <p className="mt-1 mb-2.5 font-sans font-semibold text-[11px] text-zinc-600 uppercase tracking-wider">Turnkey Integrators</p>
                <p className="text-zinc-700 text-xs text-pretty leading-relaxed">
                  Access wholesale direct-ex-depot pricing, govern 6-person installation squads, and protect bids with sealed vaults.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between shadow-sm p-8 hover:border-zinc-300 rounded-3xl transition liquid-card">
              <div>
                <div className="flex justify-center items-center bg-blue-50 mb-6 border border-blue-200/80 rounded-xl w-12 h-12 font-display font-bold text-blue-800 text-lg">
                  03
                </div>
                <h3 className="font-display font-bold text-zinc-950 text-lg">Consultants</h3>
                <p className="mt-1 mb-2.5 font-sans font-semibold text-[11px] text-zinc-600 uppercase tracking-wider">Sales &amp; Tech Advisors</p>
                <p className="text-zinc-700 text-xs text-pretty leading-relaxed">
                  Join verified vendor squads, run high-precision SuryaCalc proposals, and claim automated commission disbursements.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between shadow-sm p-8 hover:border-zinc-300 rounded-3xl transition liquid-card">
              <div>
                <div className="flex justify-center items-center bg-zinc-100 mb-6 border border-zinc-200/80 rounded-xl w-12 h-12 font-display font-bold text-zinc-950 text-lg">
                  04
                </div>
                <h3 className="font-display font-bold text-zinc-950 text-lg">Installers</h3>
                <p className="mt-1 mb-2.5 font-sans font-semibold text-[11px] text-zinc-600 uppercase tracking-wider">Certified Site Crews</p>
                <p className="text-zinc-700 text-xs text-pretty leading-relaxed">
                  Mobile-guided unboxing checklists, timestamped video proofs, and zero liability for transit-related panel microcracks.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between md:col-span-2 lg:col-span-2 shadow-sm p-8 hover:border-zinc-300 rounded-3xl transition liquid-card">
              <div>
                <div className="flex justify-center items-center bg-amber-50 mb-6 border border-amber-200/80 rounded-xl w-12 h-12 font-display font-bold text-amber-800 text-lg">
                  05
                </div>
                <h3 className="font-display font-bold text-zinc-950 text-lg">Solar Customers</h3>
                <p className="mt-1 mb-2.5 font-sans font-semibold text-[11px] text-zinc-600 uppercase tracking-wider">MSMEs, C&amp;I Campuses &amp; Residential Homeowners</p>
                <p className="mb-4 max-w-3xl text-zinc-700 text-xs text-pretty leading-relaxed">
                  Whether you run a factory floor, manage a commercial campus, or own a rooftop — SuryaNexa connects you with top-ranked local EPCs, audited supply chains, and automated subsidy disbursements.
                </p>
                {/* <div className="gap-3 grid grid-cols-1 sm:grid-cols-3">
                  <div className="bg-zinc-50 px-4 py-3 border border-zinc-200/80 rounded-xl">
                    <span className="block mb-1 font-display font-bold text-zinc-900 text-xs">MSME Units</span>
                    <span className="text-[11px] text-zinc-600 leading-relaxed">Slash operating power bills up to 75% with ranked local EPCs backed by irrefutable performance guarantees.</span>
                  </div>
                  <div className="bg-zinc-50 px-4 py-3 border border-zinc-200/80 rounded-xl">
                    <span className="block mb-1 font-display font-bold text-zinc-900 text-xs">C&amp;I Campuses</span>
                    <span className="text-[11px] text-zinc-600 leading-relaxed">Multi-hundred kilowatt procurement with audited supply chains and instant DISCOM interconnection documentation.</span>
                  </div>
                  <div className="bg-zinc-50 px-4 py-3 border border-zinc-200/80 rounded-xl">
                    <span className="block mb-1 font-display font-bold text-zinc-900 text-xs">Residential Homeowners</span>
                    <span className="text-[11px] text-zinc-600 leading-relaxed">Trusted top-ranked neighborhood EPCs with verified ratings, automated PM Surya Ghar DBT subsidies, and hassle-free net-metering.</span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
