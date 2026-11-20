"use client";

import React from "react";
import {
  Boxes,
  Truck,
  CheckCircle2,
  Barcode,
  ShieldCheck,
  Clock,
  ArrowRight,
  FileCheck,
} from "lucide-react";
import { toast } from "sonner";

export default function PreDispatchPage() {
  return (
    <div className="space-y-6 select-none font-sans text-zinc-900">
      <div className="pb-4 border-b border-zinc-200">
        <h2 className="font-display font-extrabold text-xl sm:text-2xl text-zinc-950 tracking-tight flex items-center gap-2">
          <Boxes className="w-6 h-6 text-emerald-700" />
          <span>Pre-Dispatch Warehouse Staging</span>
        </h2>
        <p className="font-sans text-xs sm:text-sm text-zinc-500 mt-0.5">
          ALMM serial verification, pallet EL micro-crack pre-scan, and carrier loading docks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-2xs">
          <span className="text-xs font-semibold text-zinc-500">Staged on Loading Docks</span>
          <div className="font-display font-black text-2xl text-zinc-950 mt-1">3 Pallets (1.4 MW)</div>
          <p className="text-[11px] text-emerald-700 font-medium mt-1">Mundra Dock 4 &amp; Pune Dock 2</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-2xs">
          <span className="text-xs font-semibold text-zinc-500">Barcode Inspection Pass</span>
          <div className="font-display font-black text-2xl text-zinc-950 mt-1">100% Verified</div>
          <p className="text-[11px] text-emerald-700 font-medium mt-1">Zero missing manufacturer barcodes</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-2xs">
          <span className="text-xs font-semibold text-zinc-500">Trucks Scheduled Today</span>
          <div className="font-display font-black text-2xl text-zinc-950 mt-1">2 Carriers</div>
          <p className="text-[11px] text-zinc-500 font-medium mt-1">Navkar Freight &amp; VRL Dedicated</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-5 border border-zinc-200 shadow-2xs space-y-3">
        <h3 className="font-display font-bold text-sm text-zinc-950">
          Pallets Queue Awaiting Final Carrier Loading Seal
        </h3>

        <div className="space-y-3">
          {[
            {
              lot: "LOT-MND-4401",
              model: "Adani Solar Shine TOPCon 585W (180 Panels)",
              dest: "Tooele Valley Project Site · Carrier: Navkar #GJ-12-8821",
              status: "Barcode Checked",
              time: "Ready for departure",
            },
            {
              lot: "LOT-PNE-9821",
              model: "Waaree Bi-55 545W Mono PERC (62 Panels)",
              dest: "Apex Solar Pune Depot · Carrier: VRL Dedicated Fleet",
              status: "Staged on Bay 2",
              time: "Loading scheduled 14:00",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-zinc-50/70 border border-zinc-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs text-zinc-950">{item.lot}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
                    {item.status}
                  </span>
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-zinc-900">{item.model}</h4>
                <p className="text-xs text-zinc-500">{item.dest}</p>
              </div>

              <button
                type="button"
                onClick={() => toast.success(`Generated Bill of Lading & e-Way Bill for ${item.lot}`)}
                className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-display font-bold text-xs active:scale-[0.97] transition-all cursor-pointer shrink-0"
              >
                Issue e-Way Bill
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
