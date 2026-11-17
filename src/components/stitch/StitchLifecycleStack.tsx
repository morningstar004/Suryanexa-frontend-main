"use client";
import React, { useState, useEffect } from "react";
import {
  Users,
  Award,
  Zap,
  Lock,
  Layers,
  Truck,
  Video,
  CheckCircle2,
  Check,
  Star,
  ShieldCheck,
} from "lucide-react";

const STAGES = [
  { id: "stage-01", num: "01", name: "Supply Listing", tag: "Trader" },
  { id: "stage-02", num: "02", name: "Squad Building", tag: "Vendor" },
  { id: "stage-03", num: "03", name: "Private CRM", tag: "Lead" },
  { id: "stage-04", num: "04", name: "Kit Engineering", tag: "CAD" },
  { id: "stage-05", num: "05", name: "Consolidated PO", tag: "Transit" },
  { id: "stage-06", num: "06", name: "Video Unloading", tag: "Escrow" },
  { id: "stage-07", num: "07", name: "Commission & Rank", tag: "Live", isHighlight: true },
];

export default function StitchLifecycleStack() {
  const [activeStage, setActiveStage] = useState("stage-01");

  useEffect(() => {
    const handleScroll = () => {
      const stageIds = [
        "stage-01",
        "stage-02",
        "stage-03",
        "stage-04",
        "stage-05",
        "stage-06",
        "stage-07",
      ];
      // Trigger threshold: card top reaches near sticky line (~210px from top of viewport)
      const triggerOffset = 210;
      let currentActive = "stage-01";

      for (let i = stageIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(stageIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerOffset) {
            currentActive = stageIds[i];
            break;
          }
        }
      }
      setActiveStage(currentActive);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <section className="py-24 lg:py-32 bg-white relative border-b border-zinc-200/80" id="lifecycle">
        <div className="max-w-7xl 2xl:max-w-[1536px] 3xl:max-w-[1850px] 4xl:max-w-[2200px] mx-auto px-6 sm:px-8 2xl:px-12">
          <div className="max-w-3xl 2xl:max-w-4xl mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-extrabold font-display text-zinc-900 tracking-tight leading-[1.15] text-balance">
              One Project. Seven Stages. <br className="hidden sm:inline" />
              <span className="text-emerald-700">Every role, on one network.</span>
            </h2>
            <p className="text-base sm:text-lg 2xl:text-xl text-zinc-700 mt-4 leading-relaxed font-normal text-pretty">
              Follow the friction-free progression of a rooftop project — from verified wholesale pallet listing to dispute-proof delivery, team escrow unlock, and public rank gain.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative">
            <aside className="lg:col-span-4 lg:sticky lg:top-28 z-20 space-y-6">
              <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-zinc-200/80 shadow-md">
                <div className="flex items-center justify-between pb-4 border-b border-zinc-200/80 mb-4">
                  <span className="text-xs font-sans font-bold text-zinc-700 uppercase tracking-wider">Stage Scrubber</span>
                </div>
                <nav aria-label="Lifecycle stages" className="space-y-1.5 font-sans text-xs" id="stage-nav">
                  {STAGES.map((stage) => {
                    const isActive = activeStage === stage.id;
                    return (
                      <a
                        key={stage.id}
                        href={`#${stage.id}`}
                        onClick={() => setActiveStage(stage.id)}
                        className={`stage-nav-item flex items-center justify-between p-2.5 rounded-xl border transition-all duration-200 group ${
                          isActive
                            ? "border-zinc-300 bg-zinc-100 text-zinc-950 shadow-xs"
                            : "border-transparent hover:border-zinc-200 hover:bg-zinc-50 text-zinc-600"
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span
                            className={`w-6 h-6 rounded-md font-bold flex items-center justify-center text-[11px] transition-all duration-200 ${
                              isActive
                                ? stage.isHighlight
                                  ? "bg-emerald-600 text-white scale-105 shadow-xs"
                                  : "bg-zinc-900 text-white scale-105 shadow-xs"
                                : stage.isHighlight
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-zinc-100 text-zinc-700 group-hover:bg-zinc-200"
                            }`}
                          >
                            {stage.num}
                          </span>
                          <span
                            className={`font-sans transition-colors duration-200 ${
                              isActive
                                ? "font-bold text-zinc-950"
                                : "font-medium text-zinc-700 group-hover:text-zinc-950"
                            }`}
                          >
                            {stage.name}
                          </span>
                        </span>
                        <span
                          className={`text-[10px] uppercase font-sans font-bold transition-colors duration-200 ${
                            isActive
                              ? stage.isHighlight
                                ? "text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60"
                                : "text-zinc-800 bg-zinc-200/80 px-1.5 py-0.5 rounded"
                              : stage.isHighlight
                              ? "text-emerald-700"
                              : "text-zinc-500"
                          }`}
                        >
                          {stage.tag}
                        </span>
                      </a>
                    );
                  })}
                </nav>
              </div>
            </aside>

            <div className="lg:col-span-8 space-y-8 sm:space-y-10 relative pb-16">
              {/* Stage 01 */}
              <article className="stack-card sticky top-28 z-10 rounded-3xl bg-white/95 backdrop-blur-md border border-zinc-200/90 p-6 sm:p-8 shadow-xl transition-all duration-300" id="stage-01">
                <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-zinc-100">
                  <span className="w-9 h-9 rounded-xl bg-zinc-900 text-white font-display font-extrabold flex items-center justify-center text-sm shadow-sm">01</span>
                  <span className="text-xs font-sans font-bold text-zinc-700 uppercase tracking-wider">SOLAR TRADER</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-7">
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-zinc-900 mb-3 tracking-tight">Supply Listing</h3>
                    <p className="text-sm text-zinc-700 leading-relaxed font-normal mb-5 text-pretty">
                      Every tier-1 vendor capitalizes and lists panels, inverters, batteries, BOS, and structures on a live, searchable wholesale catalog for every vendor on the network.
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs font-sans">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-50 border border-zinc-200/80 text-zinc-800">
                        <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>Live Warehouse Feeds</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-50 border border-zinc-200/80 text-zinc-800">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Bonded Depot Verification</span>
                      </span>
                    </div>
                  </div>
                  {/* Inner quadrilateral: inner radius (12px / rounded-xl) = outer radius (24px) - padding (12px on inner container) */}
                  <div className="md:col-span-5 bg-zinc-950 text-zinc-200 rounded-xl p-4 font-sans text-xs border border-zinc-800 shadow-inner">
                    <div className="flex justify-between items-center pb-2 mb-2 border-b border-zinc-800 text-[10px] text-zinc-400">
                      <span>TERMINAL // WHOLESALE CATALOG</span>
                      <span className="text-emerald-400 font-bold">SYNCED</span>
                    </div>
                    <div className="space-y-1.5 text-[11px]">
                      <div className="flex justify-between text-zinc-300">
                        <span>TopCon 550W (Mono)</span>
                        <span className="text-emerald-400 font-bold font-mono">₹18.40/W</span>
                      </div>
                      <div className="text-[10px] text-zinc-400">Mundra Port · 42 Pallets Reserved</div>
                      <div className="flex justify-between text-zinc-300 pt-1 border-t border-zinc-800">
                        <span>Hybrid 10kW Inverter</span>
                        <span className="text-emerald-400 font-bold font-mono">18 Units Available</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* Stage 02 */}
              <article className="stack-card sticky top-32 z-20 rounded-3xl bg-white/95 backdrop-blur-md border border-zinc-200/90 p-6 sm:p-8 shadow-xl transition-all duration-300" id="stage-02">
                <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-zinc-100">
                  <span className="w-9 h-9 rounded-xl bg-blue-600 text-white font-display font-extrabold flex items-center justify-center text-sm shadow-sm">02</span>
                  <span className="text-xs font-sans font-bold text-blue-800 uppercase tracking-wider">SOLAR VENDOR</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-7">
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-zinc-900 mb-3 tracking-tight">Squad Building</h3>
                    <p className="text-sm text-zinc-700 leading-relaxed font-normal mb-5 text-pretty">
                      Vendor assembles a 6-member squad (up to 4 certified installers and 2 consultants) hired from the verified platform pool and onboarded to their own crew.
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs font-sans">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-50 border border-zinc-200/80 text-zinc-800">
                        <Users className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>6-Person Authorized Unit</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-50 border border-zinc-200/80 text-zinc-800">
                        <Award className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Skill Verification Token</span>
                      </span>
                    </div>
                  </div>
                  <div className="md:col-span-5 bg-[#F6F8FA] rounded-xl p-4 font-sans text-xs border border-zinc-200/90 shadow-sm">
                    <div className="text-[10px] text-zinc-700 uppercase font-bold mb-2 pb-1 border-b border-zinc-200 font-sans">ACTIVE CREW ROSTER #SQ-219</div>
                    <div className="space-y-1 text-[11px]">
                      <div className="flex justify-between items-center text-zinc-800">
                        <span>1x Lead Vendor PM</span>
                        <span className="text-emerald-700 font-bold">Assigned</span>
                      </div>
                      <div className="flex justify-between items-center text-zinc-800">
                        <span>2x Technical Consultants</span>
                        <span className="text-emerald-700 font-bold">Vetted</span>
                      </div>
                      <div className="flex justify-between items-center text-zinc-800">
                        <span>3x-4x Certified Installers</span>
                        <span className="text-emerald-700 font-bold">Onboarded</span>
                      </div>
                      <div className="mt-2 pt-2 border-t border-zinc-200 text-[10px] text-zinc-600 font-sans">Milestone payouts linked directly to DISCOM signoffs</div>
                    </div>
                  </div>
                </div>
              </article>

              {/* Stage 03 */}
              <article className="stack-card sticky top-36 z-30 rounded-3xl bg-white/95 backdrop-blur-md border border-zinc-200/90 p-6 sm:p-8 shadow-xl transition-all duration-300" id="stage-03">
                <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-zinc-100">
                  <span className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-display font-extrabold flex items-center justify-center text-sm shadow-sm">03</span>
                  <span className="text-xs font-sans font-bold text-emerald-800 uppercase tracking-wider">VENDOR &amp; CONSULTANT</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-7">
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-zinc-900 mb-3 tracking-tight">Private CRM Capture</h3>
                    <p className="text-sm text-zinc-700 leading-relaxed font-normal mb-5 text-pretty">
                      Residential, MSME or commercial leads are tokenized and captured inside the Blind-Vault CRM — 100% private, invisible even to SuryaNexa administrators.
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs font-sans">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <Lock className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span>PROPRIETARY PRIVACY VAULT Asymmetric Key</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-50 border border-zinc-200/80 text-zinc-800">
                        <ShieldCheck className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                        <span>Zero Admin Visibility</span>
                      </span>
                    </div>
                  </div>
                  <div className="md:col-span-5 bg-zinc-900 text-zinc-100 rounded-xl p-4 font-sans text-xs border border-zinc-800 shadow-md">
                    <div className="flex justify-between text-[10px] text-zinc-400 pb-2 mb-2 border-b border-zinc-800">
                      <span>BLIND-VAULT REPOSITORY</span>
                      <span className="text-emerald-400 font-bold">ENCRYPTED</span>
                    </div>
                    <div className="p-2 rounded-md bg-zinc-950 border border-zinc-800 mb-2">
                      <div className="text-[10px] text-zinc-400 font-sans">Lead Payload #8410:</div>
                      <div className="text-[11px] text-emerald-300 font-mono truncate">cf41e892d4090b8f...2e37a</div>
                    </div>
                    <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Decryptable only via EPC Vendor Private Key
                    </div>
                  </div>
                </div>
              </article>

              {/* Stage 04 */}
              <article className="stack-card sticky top-40 z-40 rounded-3xl bg-white/95 backdrop-blur-md border border-zinc-200/90 p-8 sm:p-10 shadow-xl transition-all duration-300" id="stage-04">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-zinc-100">
                  <div className="flex items-center space-x-3">
                    <span className="w-9 h-9 rounded-xl bg-zinc-900 text-white font-display font-extrabold flex items-center justify-center text-sm shadow-sm">04</span>
                    <span className="text-xs font-sans font-bold text-zinc-700 uppercase tracking-wider">VENDOR / CONSULTANT</span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-sans font-semibold bg-zinc-100 text-zinc-800 border border-zinc-200">Vendor</span>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-sans font-semibold bg-zinc-100 text-zinc-800 border border-zinc-200">Trader</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-7">
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-zinc-900 mb-3 tracking-tight text-balance">Kit Engineering</h3>
                    <p className="text-sm text-zinc-700 leading-relaxed font-normal mb-5 text-pretty">
                      Consultant configures exact balance of systems across multiple traders — pairing Adani bifacial panels from Mundra with Sungrow inverters from Surat in a single order.
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs font-sans">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-50 border border-zinc-200/80 text-zinc-800">
                        <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>Cross-Stockist Sourcing</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-50 border border-zinc-200/80 text-zinc-800">
                        <Layers className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                        <span>1-Click BOM Dossier</span>
                      </span>
                    </div>
                  </div>
                  <div className="md:col-span-5 bg-zinc-50 rounded-xl p-4 font-sans text-xs border border-zinc-200 shadow-sm">
                    <div className="flex justify-between items-center text-[10px] text-zinc-600 pb-2 mb-2 border-b border-zinc-200 font-medium">
                      <span>BOM SPECIFICATION MATRIX</span>
                      <span className="text-emerald-700 font-bold">100% COMPATIBLE</span>
                    </div>
                    <div className="space-y-1.5 text-[11px]">
                      <div className="flex justify-between text-zinc-800">
                        <span>Adani 550W TOPCon (x54)</span>
                        <span className="font-bold text-zinc-950">Mundra Depot</span>
                      </div>
                      <div className="flex justify-between text-zinc-800">
                        <span>Sungrow 25kW Inverter (x1)</span>
                        <span className="font-bold text-zinc-950">Surat Depot</span>
                      </div>
                      <div className="flex justify-between text-zinc-800 pt-1 border-t border-zinc-200 text-emerald-700 font-bold">
                        <span>Consolidated Purchase Order</span>
                        <span>Auto-Escrowed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* Stage 05 */}
              <article className="stack-card sticky top-44 z-50 rounded-3xl bg-white/95 backdrop-blur-md border border-zinc-200/90 p-8 sm:p-10 shadow-xl transition-all duration-300" id="stage-05">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-zinc-100">
                  <div className="flex items-center space-x-3">
                    <span className="w-9 h-9 rounded-xl bg-sky-600 text-white font-display font-extrabold flex items-center justify-center text-sm shadow-sm">05</span>
                    <span className="text-xs font-sans font-bold text-sky-800 uppercase tracking-wider">LOGISTICS &amp; TELEMETRICS</span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-sans font-semibold bg-sky-50 text-sky-900 border border-sky-200/80">Carrier</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-7">
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-zinc-900 mb-3 tracking-tight text-balance">Consolidated PO &amp; Transit</h3>
                    <p className="text-sm text-zinc-700 leading-relaxed font-normal mb-5 text-pretty">
                      Multi-trader kit is bundled into a single secure dispatch. GPS telematics track the shipment from Mundra port to site gate with live insurance protection.
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs font-sans">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-50 border border-zinc-200/80 text-zinc-800">
                        <Truck className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span>Real-Time Freight Telemetry</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-50 border border-zinc-200/80 text-zinc-800">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Transit Insurance Shield</span>
                      </span>
                    </div>
                  </div>
                  <div className="md:col-span-5 bg-zinc-950 text-white rounded-xl p-4 font-sans text-xs border border-zinc-800 shadow-md">
                    <div className="flex justify-between items-center text-[10px] text-zinc-400 pb-2 mb-2 border-b border-zinc-800">
                      <span>CONSIGNMENT #TR-9912</span>
                      <span className="text-emerald-400 font-bold font-mono">54 km/h</span>
                    </div>
                    <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden my-2">
                      <div className="bg-emerald-500 h-full w-3/4"></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-zinc-300">
                      <span>Escrow Locked: <span className="font-mono text-white">₹4,82,000</span></span>
                      <span className="text-zinc-100 font-semibold">ETA: 3h 10m</span>
                    </div>
                  </div>
                </div>
              </article>

              {/* Stage 06 */}
              <article className="stack-card sticky top-48 z-[60] rounded-3xl bg-white/95 backdrop-blur-md border border-zinc-200/90 p-8 sm:p-10 shadow-xl transition-all duration-300" id="stage-06">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-zinc-100">
                  <div className="flex items-center space-x-3">
                    <span className="w-9 h-9 rounded-xl bg-zinc-900 text-white font-display font-extrabold flex items-center justify-center text-sm shadow-sm">06</span>
                    <span className="text-xs font-sans font-bold text-zinc-700 uppercase tracking-wider">INSTALLER</span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-sans font-semibold bg-zinc-100 text-zinc-800 border border-zinc-200">Trader</span>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-sans font-semibold bg-zinc-100 text-zinc-800 border border-zinc-200">Installer</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-7">
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-zinc-900 mb-3 tracking-tight text-balance">Video Unloading</h3>
                    <p className="text-sm text-zinc-700 leading-relaxed font-normal mb-5 text-pretty">
                      At the truck, the field team completes an interactive unloading checklist and records a timestamped unboxing video — 100% protection against transit damage disputes and 180s escrow unlock.
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs font-sans">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <Video className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span>180s Video Shield</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-50 border border-zinc-200/80 text-zinc-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>0% Micro-Crack Disputes</span>
                      </span>
                    </div>
                  </div>
                  <div className="md:col-span-5 bg-zinc-50 rounded-xl p-4 font-sans text-xs border border-zinc-200 shadow-sm">
                    <div className="flex justify-between items-center text-[10px] text-zinc-700 pb-2 mb-2 border-b border-zinc-200 font-medium">
                      <span>TAILGATE INSPECTION PROTOCOL</span>
                      <span className="text-emerald-700 font-bold">VERIFIED</span>
                    </div>
                    <div className="space-y-2 text-[11px] text-zinc-900">
                      <div className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                        <span className="leading-tight">42 Pallets Barcode-Scanned</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                        <span className="leading-tight">180s 4K Video Upload Complete</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                        <span className="leading-tight">Trader Hardware Escrow Released</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* Stage 07 */}
              <article className="stack-card sticky top-52 z-[70] rounded-3xl bg-white/95 backdrop-blur-md border border-emerald-300/80 p-8 sm:p-10 shadow-2xl transition-all duration-300 ring-1 ring-emerald-500/20" id="stage-07">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-zinc-100">
                  <div className="flex items-center space-x-3">
                    <span className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-display font-extrabold flex items-center justify-center text-sm shadow-sm">07</span>
                    <span className="text-xs font-sans font-bold text-emerald-800 uppercase tracking-wider">FULL SQUAD &amp; CONSUMER</span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-sans font-semibold bg-emerald-50 text-emerald-900 border border-emerald-200/80">Vendor</span>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-sans font-semibold bg-zinc-100 text-zinc-800 border border-zinc-200">Installer</span>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-sans font-semibold bg-zinc-100 text-zinc-800 border border-zinc-200">Consumer</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-7">
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-zinc-900 mb-3 tracking-tight text-balance">Execution &amp; Rank</h3>
                    <p className="text-sm text-zinc-700 leading-relaxed font-normal mb-5 text-pretty">
                      The rooftop is commissioned, the consumer rates the experience, and the vendor's area, city, and state ranking climbs — verified trust that wins the next deal.
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs font-sans">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                        <Star className="w-3.5 h-3.5 text-emerald-700 fill-emerald-600 shrink-0" />
                        <span>Rank Score +42 pts</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-50 border border-zinc-200/80 text-zinc-800">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Verified Consumer Proof</span>
                      </span>
                    </div>
                  </div>
                  <div className="md:col-span-5 bg-zinc-950 text-white rounded-xl p-5 font-sans text-xs border border-zinc-800 shadow-xl">
                    <div className="flex justify-between items-center text-[10px] text-zinc-400 pb-2 mb-3 border-b border-zinc-800 font-medium">
                      <span>COMMISSIONING CERTIFICATE</span>
                      <span className="text-emerald-400 font-bold">100% SUCCESS</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-zinc-200 text-xs font-sans font-semibold">
                        <span>Consumer Rating:</span>
                        <span className="flex items-center gap-1 text-amber-400">
                          <span className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                            ))}
                          </span>
                          <span className="text-emerald-400 ml-1 font-bold">5.0</span>
                        </span>
                      </div>
                      <div className="flex justify-between text-zinc-300 text-[11px]">
                        <span>DISCOM Meter Sync:</span>
                        <span className="text-emerald-400 font-medium">Bi-directional Live</span>
                      </div>
                      <div className="flex justify-between text-zinc-300 text-[11px]">
                        <span>Regional EPC Rank:</span>
                        <span className="text-white font-bold">#2 in Pune Metro</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
