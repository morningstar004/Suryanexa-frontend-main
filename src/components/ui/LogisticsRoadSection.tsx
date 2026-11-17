"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Truck,
  Building2,
  Store,
  Navigation,
  Compass,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  TrendingUp,
  Wifi,
  Battery,
  MapPin,
  Maximize2,
  PhoneCall,
  Signal,
} from "lucide-react";

export function LogisticsRoadSection() {
  const [isTruckHovered, setIsTruckHovered] = useState(false);
  const stops = [
    {
      id: 0,
      title: "Trader Warehouses",
      subtitle: "Tier-1 Bulk Supply Yards & Depots",
      desc: "Massive inventory of TopCon, DCR Mono PERC panels, and hybrid inverters stored under strict barcode tracking.",
      badge: "Stock Verified",
      color: "#d97706",
      icon: Building2,
    },
    {
      id: 1,
      title: "Connected Dispatch",
      subtitle: "GPS-Tracked Transit with Escrow Lock",
      desc: "Trucks dispatched across national highways. GPS coordinates and milestone smart contracts ensure zero payment defaults.",
      badge: "Live Fleet Sync",
      color: "#15803d",
      icon: Truck,
    },
    {
      id: 2,
      title: "Vendor Storefronts & Depots",
      subtitle: "Local Regional Installation Centers",
      desc: "Local EPC contractors and rooftop installers receive verified consignments with mandatory video unboxing proof.",
      badge: "Zero Damage Claims",
      color: "#261c14",
      icon: Store,
    },
  ];

  return (
    <section className="relative bg-[#f8f6f0] px-4 sm:px-6 py-20 lg:py-28 border-[#e8dfcf] border-y overflow-hidden" id="logistics">
      <div className="mx-auto 2xl:max-w-[1536px] 3xl:max-w-[1850px] 4xl:max-w-[2200px] max-w-7xl">

        {/* Section Header */}
        <div className="mx-auto mb-12 sm:mb-16 max-w-3xl 2xl:max-w-4xl text-center">
          <h2 className="font-display font-extrabold text-zinc-950 text-3xl sm:text-5xl 2xl:text-6xl leading-tight tracking-tight">
            A Handshake Across India — <br className="hidden sm:block" />
            <span className="text-emerald-700">Our Logistics Journey</span>
          </h2>
          <p className="mt-3 font-sans text-zinc-700 text-sm sm:text-base 2xl:text-lg leading-relaxed">
            Watch how bulk solar equipment moves seamlessly from national manufacturer warehouses to local rooftop installers with video unboxing proof.
          </p>
        </div>

        {/* 3 Milestone Cards - Clean Uniform Normal Stage */}
        <div className="gap-5 sm:gap-6 grid grid-cols-1 md:grid-cols-3 mb-12 sm:mb-16">
          {stops.map((stop, idx) => {
            const IconComponent = stop.icon;
            return (
              <div
                key={idx}
                className="relative bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md p-6 border border-[#e4dcce] rounded-3xl overflow-hidden transition-shadow duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className="shadow-xs px-2.5 py-1 rounded-full font-mono font-bold text-white text-xs"
                      style={{ backgroundColor: stop.color }}
                    >
                      STOP 0{idx + 1}
                    </span>
                    <span className="font-mono font-semibold text-[11px] text-zinc-500">
                      {stop.badge}
                    </span>
                  </div>
                  <div className="flex justify-center items-center bg-[#faf7f2] border border-[#ece4d6] rounded-xl w-8 h-8 text-zinc-700">
                    <IconComponent className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-display font-bold text-zinc-900 text-lg 2xl:text-xl">
                  {stop.title}
                </h3>
                <p className="mt-0.5 font-sans font-semibold text-amber-700 text-xs 2xl:text-sm">
                  {stop.subtitle}
                </p>
                <p className="mt-2.5 font-sans text-zinc-600 text-xs 2xl:text-sm leading-relaxed">
                  {stop.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* ULTRA-REALISTIC DUAL-DEVICE SHOWCASE (THIN-BEZEL TABLET + THIN-BEZEL SMARTPHONE) */}
        <div className="relative pb-8 sm:pb-14">

          {/* =========================================================================
              DEVICE 1: IPAD PRO / MODERN FLAGSHIP TABLET (ULTRA-THIN BEZELS)
             ========================================================================= */}
          <div className="relative bg-[#0c0d12] shadow-[0_30px_90px_-15px_rgba(0,0,0,0.38),0_0_0_1px_rgba(255,255,255,0.12)] p-1.5 sm:p-2 lg:p-2.5 border border-[#23252d] rounded-[28px] sm:rounded-[36px] lg:rounded-[42px]">

            {/* Precision Micro-Camera in Thin Top Bezel */}
            <div className="top-1 left-1/2 z-30 absolute flex items-center gap-1.5 opacity-70 -translate-x-1/2">
              <div className="flex justify-center items-center bg-[#030406] rounded-full ring-1 ring-zinc-700/60 w-1.5 h-1.5">
                <div className="bg-blue-900 rounded-full w-0.5 h-0.5" />
              </div>
            </div>

            {/* Tablet Edge-to-Edge OLED Display Screen */}
            <div className="relative flex flex-col justify-between bg-[#eef1f4] border border-zinc-400/20 rounded-[22px] sm:rounded-[30px] lg:rounded-[34px] min-h-[540px] sm:min-h-[620px] lg:min-h-[680px] 2xl:min-h-[740px] overflow-hidden">

              {/* REAL GOOGLE MAPS TELEMATICS IMAGE (Generated Route with Stockist Warehouse, Truck, and Vendor Rooftop) */}
              <div className="absolute inset-0 select-none">
                <img
                  src="/logistics-telematics-map.jpg"
                  alt="SuryaNexa Live Logistics Telematics GPS Route Map"
                  className="brightness-[1.01] w-full h-full object-center object-cover filter contrast-[1.03]"
                />

                {/* Ultra-realistic Specular Diagonal Glass Glare across display */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.06] via-transparent to-white/[0.02] pointer-events-none" />

                {/* Subtle Edge Vignette */}
                <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.05)] pointer-events-none" />
              </div>

              {/* TOP TABLET TELEMATICS STATUS BAR */}
              <div className="z-20 relative flex justify-between items-center px-4 sm:px-6 py-3.5">
                {/* Left Live Badge */}
                <div className="flex items-center gap-2 bg-white/95 shadow-[0_4px_16px_rgba(0,0,0,0.08)] backdrop-blur-md px-3.5 py-1.5 border border-zinc-200/90 rounded-full font-mono text-xs">
                  <span className="bg-emerald-500 rounded-full w-2 h-2 animate-pulse" />
                  <span className="font-bold text-zinc-900 tracking-tight">SURYA-TELEMATICS</span>
                  <span className="hidden sm:inline text-zinc-500">| GPS-334A</span>
                </div>
              </div>

              {/* FLOATING MAP TOOLS ON LEFT (Traffic light, 2D, Compass) */}
              <div className="top-24 left-4 sm:left-6 z-20 absolute flex flex-col gap-2.5">
                {/* Traffic Status Button */}
                <button
                  type="button"
                  title="Traffic Status"
                  className="flex justify-center items-center bg-white/95 hover:bg-zinc-50 shadow-md backdrop-blur-md border border-zinc-200/90 rounded-2xl w-10 sm:w-11 h-10 sm:h-11 active:scale-95 transition-all cursor-pointer"
                >
                  <div className="flex flex-col justify-center items-center gap-1 bg-zinc-900 p-1 rounded-md">
                    <span className="bg-emerald-400 rounded-full w-1.5 h-1.5 animate-pulse" />
                    <span className="bg-amber-400 rounded-full w-1.5 h-1.5" />
                    <span className="bg-red-400 rounded-full w-1.5 h-1.5" />
                  </div>
                </button>

                {/* 2D Perspective Toggle */}
                <button
                  type="button"
                  title="2D View"
                  className="flex justify-center items-center bg-white/95 hover:bg-zinc-50 shadow-md backdrop-blur-md border border-zinc-200/90 rounded-2xl w-10 sm:w-11 h-10 sm:h-11 font-mono font-bold text-zinc-800 text-xs active:scale-95 transition-all cursor-pointer"
                >
                  2D
                </button>

                {/* Re-center Compass */}
                <button
                  type="button"
                  title="Re-center Navigation"
                  className="flex justify-center items-center bg-white/95 hover:bg-zinc-50 shadow-md backdrop-blur-md border border-zinc-200/90 rounded-2xl w-10 sm:w-11 h-10 sm:h-11 text-zinc-700 active:scale-95 transition-all cursor-pointer"
                >
                  <Navigation className="fill-zinc-800 w-4 sm:w-5 h-4 sm:h-5 text-zinc-800 -rotate-45" />
                </button>
              </div>

              {/* FLOATING HUD NAVIGATION CARD AT BOTTOM */}
              <div className="z-20 relative m-3 sm:m-6 mt-auto">
                <div className="bg-white/95 shadow-[0_15px_45px_rgba(0,0,0,0.14)] backdrop-blur-md p-4 sm:p-5 border border-zinc-200/90 rounded-2xl sm:rounded-3xl">
                  <div className="items-center gap-4 grid grid-cols-1 md:grid-cols-12">

                    {/* Left: Speed Limit Sign & Turn Prompt */}
                    <div className="flex items-center gap-3.5 md:col-span-4 md:pr-4 pb-3 md:pb-0 border-zinc-100 md:border-r border-b md:border-b-0">
                      {/* Realistic Speed Limit Shield */}
                      <div className="flex flex-col justify-center items-center bg-white shadow-xs px-2.5 py-1.5 border-2 border-zinc-900 rounded-xl min-w-[56px]">
                        <span className="font-mono font-black text-[9px] text-zinc-500 uppercase tracking-tighter">
                          LIMIT
                        </span>
                        <span className="font-mono font-black text-zinc-950 text-sm leading-none">
                          50
                        </span>
                        <span className="mt-0.5 font-mono font-black text-[11px] text-emerald-700 leading-none">
                          42
                        </span>
                      </div>

                      {/* Turn Instruction */}
                      <div className="leading-tight">
                        <div className="flex items-center gap-1.5 font-mono font-semibold text-zinc-500 text-xs">
                          <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                          <span>In 350m</span>
                        </div>
                        <h4 className="mt-0.5 font-display font-bold text-zinc-900 text-xs sm:text-sm">
                          Turn Right onto Highway 334 / Haridwar Main
                        </h4>
                        <span className="block font-sans text-[11px] text-zinc-500">
                          Approaching Jagjeetpur Distribution Hub
                        </span>
                      </div>
                    </div>

                    {/* Center: Distance Left, ETA & Traffic Progress Track */}
                    <div className="md:col-span-5 px-0 md:px-2">
                      <div className="flex justify-between items-center mb-2 font-mono text-xs">
                        <span className="font-bold text-zinc-900 text-sm">
                          5.8 km <span className="font-normal text-zinc-500 text-xs">left</span>
                        </span>
                        <span className="flex items-center gap-1 font-bold text-zinc-900">
                          <Clock className="w-3.5 h-3.5 text-zinc-500" />
                          13:22 <span className="font-semibold text-[11px] text-emerald-700">(14 min left)</span>
                        </span>
                      </div>

                      {/* Segmented Traffic Route Bar */}
                      <div className="relative flex items-center bg-zinc-100 rounded-full w-full h-2.5 overflow-hidden">
                        <div className="bg-emerald-600 rounded-l-full w-[50%] h-full" />
                        <div className="bg-amber-500 w-[30%] h-full" />
                        <div className="bg-emerald-600 rounded-r-full w-[20%] h-full" />
                      </div>

                      {/* Navigation Arrow on Route Progress Track */}
                      <div className="relative -mt-3.5 w-full h-4 pointer-events-none">
                        <div className="-top-1 left-[45%] absolute flex justify-center items-center -translate-x-1/2">
                          <div className="flex justify-center items-center bg-emerald-600 shadow-md border-2 border-white rounded-full w-7 h-7 text-white">
                            <Navigation className="fill-white mr-1 w-3.5 h-3.5 text-white rotate-45" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Consignment Info & Escrow Release Status */}
                    <div className="flex justify-between md:justify-end items-center gap-3 md:col-span-3 pt-3 md:pt-0 md:pl-4 border-zinc-100 border-t md:border-t-0 md:border-l">
                      <div className="text-right">
                        <span className="block font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                          Consignment #SN-8924
                        </span>
                        <span className="block font-display font-bold text-zinc-900 text-xs">
                          TopCon 580W Pallets
                        </span>
                        <div className="inline-flex items-center gap-1 mt-0.5 font-mono font-semibold text-[11px] text-emerald-700">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Escrow Locked</span>
                        </div>
                      </div>

                      {/* Receiver Avatar Thumbnail */}
                      <div className="flex justify-center items-center bg-[#faf7f2] shadow-xs border border-[#ece4d6] rounded-2xl w-10 h-10 text-zinc-700">
                        <Store className="w-5 h-5 text-zinc-800" />
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* =========================================================================
              DEVICE 2: IPHONE 16 PRO FLAGSHIP SMARTPHONE (ULTRA-SLIM TITANIUM BEZELS)
              (Overlapping on Desktop/2K/4K screens, matching user reference image)
             ========================================================================= */}
          <div className="hidden lg:block -right-3 xl:-right-6 -bottom-5 xl:-bottom-7 z-30 absolute w-[270px] 2xl:w-[315px] xl:w-[295px]">

            {/* Phone Titanium Outer Band with Ultra-Thin Bezel Padding */}
            <div className="relative bg-[#0c0d12] shadow-[0_30px_80px_-10px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.15)] p-1.5 xl:p-2 border border-[#20222a] rounded-[42px] xl:rounded-[46px]">

              {/* Ultra-slim Tactile Side Buttons */}
              <div className="top-32 -left-[3px] absolute bg-zinc-600 rounded-l-xs w-[3px] h-10" />
              <div className="top-44 -left-[3px] absolute bg-zinc-600 rounded-l-xs w-[3px] h-10" />
              <div className="top-40 -right-[3px] absolute bg-zinc-600 rounded-r-xs w-[3px] h-12" />

              {/* Phone Edge-to-Edge Screen Display */}
              <div className="relative flex flex-col justify-between bg-[#0c1211] shadow-inner border border-zinc-700/40 rounded-[36px] xl:rounded-[40px] h-[490px] xl:h-[530px] overflow-hidden">

                {/* VERTICAL MOBILE GOOGLE MAPS TELEMATICS IMAGE */}
                <div className="z-10 absolute inset-0 select-none">
                  <img
                    src="/logistics-telematics-map-mobile.jpg"
                    alt="Driver Smartphone Navigation Telematics"
                    className="w-full h-full object-center object-cover filter contrast-[0.9]"
                  />
                  {/* Subtle Screen Glass Sheen */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.05] via-transparent to-transparent pointer-events-none" />
                </div>

                {/* COMPACT DYNAMIC ISLAND & MOBILE STATUS BAR */}
                <div className="z-20 relative flex justify-between items-center bg-white px-5 pt-2.5 w-full font-semibold text-[11px] text-zinc-900 select-none">
                  {/* Left: Time */}
                  <span className="w-12 font-semibold text-[11px] text-zinc-900 tracking-tight">9:41</span>

                  {/* Center: Sleek Dynamic Island Pill Cutout */}
                  <div className="flex justify-center items-center bg-[#030406] shadow-sm px-2.5 py-1 border border-zinc-800/60 rounded-full w-20 h-4 shrink-0">
                    <div className="bg-[#0d0f18] mr-0.5 ml-auto rounded-full ring-1 ring-zinc-500 w-2 h-2" />
                  </div>

                  {/* Right: Telematics / Status Icons */}
                  <div className="flex justify-end items-center gap-1.5 w-12 text-zinc-900">
                    <Signal className="w-3 h-3" />
                    <Wifi className="w-3 h-3" />
                    <Battery className="fill-current w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Truck Interactive Hover Hotspot in the Phone (at exact truck coordinates on map) */}
                <div
                  onMouseEnter={() => setIsTruckHovered(true)}
                  onMouseLeave={() => setIsTruckHovered(false)}
                  className="group top-[61.3%] left-[46.7%] z-25 absolute flex justify-center items-center rounded-full w-14 h-14 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  title="Hover truck to inspect live waypoint status"
                >
                  <div
                    className={`rounded-full w-9 h-9 transition-all duration-300 ${isTruckHovered
                        ? "bg-orange-500/35 ring-2 ring-orange-500/80 scale-110 shadow-lg shadow-orange-500/30"
                        : "bg-transparent group-hover:bg-orange-500/20"
                      }`}
                  />
                </div>

                {/* TOP DRIVER TURN CARD (Decreased size by 20%, appears ONLY when hovered over the truck in the phone) */}
                <div
                  onMouseEnter={() => setIsTruckHovered(true)}
                  onMouseLeave={() => setIsTruckHovered(false)}
                  className={`z-20 relative bg-white/95 shadow-md backdrop-blur-md mx-3 mt-0.5 p-2.5 border border-zinc-200/90 rounded-2xl scale-[0.8] origin-top transition-all duration-300 ease-out ${isTruckHovered
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                >
                  <div className="flex justify-between items-center font-mono text-[10px]">
                    <div className="flex items-center gap-1.5 font-bold text-zinc-900">
                      <ArrowUpRight className="w-3 h-3 text-emerald-600" />
                      <span>Next Stop in 350m</span>
                    </div>
                    <span className="bg-emerald-50 px-2 py-0.5 border border-emerald-200/60 rounded-md font-bold text-emerald-700">
                      Escrow Active
                    </span>
                  </div>
                  <p className="mt-1 font-sans font-medium text-[10px] text-zinc-700">
                    Jagjeetpur Vendor Storefront &amp; Rooftop Site
                  </p>
                  <p className="mt-0.5 font-mono text-[9px] text-zinc-500">
                    Mandatory 180s Unboxing Video Shield
                  </p>
                </div>

                {/* FLOATING MINI MAP BUTTONS ON PHONE RIGHT EDGE */}
                <div className="top-20 right-3 z-20 absolute flex flex-col gap-2">
                  <div className="flex justify-center items-center bg-white/95 shadow-sm backdrop-blur-md border border-zinc-200/90 rounded-xl w-8 h-8 text-zinc-800">
                    <Navigation className="fill-zinc-800 w-3.5 h-3.5 -rotate-45" />
                  </div>
                  <div className="flex justify-center items-center bg-white/95 shadow-sm backdrop-blur-md border border-zinc-200/90 rounded-xl w-8 h-8 font-mono font-bold text-[10px] text-zinc-800">
                    2D
                  </div>
                </div>

                {/* BOTTOM DRIVER HUD & ESCROW RELEASE BAR */}
                <div className="z-20 relative flex flex-col gap-2 mx-1.5 mb-0.5">
                  <div className="bg-white/95 shadow-md backdrop-blur-md p-1.5 border border-zinc-200/90 rounded-2xl">
                    <div className="flex justify-between items-center mb-0.5 px-1 font-mono text-[10px]">
                      <span className="font-bold text-zinc-900">5.8 km</span>
                      <span className="font-bold text-zinc-900">13:22 ETA</span>
                      <span className="font-bold text-emerald-700">14 min</span>
                    </div>

                    {/* Driver Progress Bar */}
                    <div className="flex bg-zinc-100 mb-1.5 rounded-full w-full h-1 overflow-hidden">
                      <div className="bg-emerald-600 w-1/2 h-full" />
                      <div className="bg-amber-500 w-1/3 h-full" />
                      <div className="bg-emerald-600 w-1/6 h-full" />
                    </div>

                    {/* Escrow Release CTA */}
                    <button
                      type="button"
                      className="flex justify-center items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 shadow-sm py-2 rounded-xl w-full font-mono font-bold text-white text-xs transition-colors cursor-pointer"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Confirm Video Unboxing</span>
                    </button>
                  </div>

                  {/* Home Bar Gesture Indicator */}
                  <div className="bg-zinc-400 opacity-60 mx-auto mt-0.5 rounded-full w-24 h-1" />
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default LogisticsRoadSection;
