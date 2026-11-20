"use client";

import React, { useState } from "react";
import {
  ClipboardList,
  Search,
  Lock,
  CheckCircle2,
  Clock,
  Truck,
  Video,
  ShieldCheck,
  AlertCircle,
  Phone,
  MapPin,
  ExternalLink,
  Download,
  FileCheck,
} from "lucide-react";
import { toast } from "sonner";
import { INITIAL_ORDERS, TraderOrder } from "@/lib/traderData";

export default function TraderOrdersPage() {
  const [orders, setOrders] = useState<TraderOrder[]>(INITIAL_ORDERS);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const handleReleaseEscrow = (orderId: string, poNumber: string, value: number) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, escrowStatus: "DISBURSED", deliveryStatus: "DELIVERED" } : o
      )
    );
    toast.success(
      `Escrow payout of ₹${(value / 100000).toFixed(2)} Lakh released for ${poNumber} to your verified HDFC Escrow account!`
    );
  };

  const filteredOrders = orders.filter((o) => {
    const matchesStatus =
      statusFilter === "ALL" ||
      (statusFilter === "LOCKED" && o.escrowStatus === "LOCKED") ||
      (statusFilter === "IN_TRANSIT" && o.deliveryStatus === "IN_TRANSIT") ||
      (statusFilter === "VERIFIED" && o.escrowStatus === "VERIFIED") ||
      (statusFilter === "DISBURSED" && o.escrowStatus === "DISBURSED");

    const matchesSearch =
      o.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.buyerCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.buyerCity.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 select-none">
      {/* 1. Page Header */}
      <div className="pb-4 border-b border-[#ece8dc]">
        <h2 className="font-display font-extrabold text-xl sm:text-2xl text-zinc-950 tracking-tight">
          Purchase Orders &amp; 180s Video Escrow
        </h2>
        <p className="font-sans text-xs sm:text-sm text-zinc-500 mt-0.5">
          Guaranteed capital clearance. Zero pallet transit disputes through cryptographic video inspection.
        </p>
      </div>

      {/* 2. Status Filters & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-[#ece8dc] shadow-2xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {[
            { id: "ALL", label: `All (${orders.length})` },
            { id: "LOCKED", label: "Escrow Locked" },
            { id: "IN_TRANSIT", label: "In Transit" },
            { id: "VERIFIED", label: "Video Verified" },
            { id: "DISBURSED", label: "Disbursed" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-sans font-bold transition-all cursor-pointer shrink-0 ${
                statusFilter === tab.id
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "bg-zinc-100 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative sm:w-64">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search PO #, Buyer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-zinc-50 border border-[#ece8dc] text-xs font-sans text-zinc-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* 3. Detailed Order Cards Stack */}
      <div className="space-y-4">
        {filteredOrders.map((ord) => {
          const isVerified = ord.escrowStatus === "VERIFIED";
          const isDisbursed = ord.escrowStatus === "DISBURSED";
          const isInTransit = ord.deliveryStatus === "IN_TRANSIT";

          return (
            <div
              key={ord.id}
              className={`bg-white rounded-3xl border transition-all p-5 sm:p-6 shadow-xs ${
                isVerified
                  ? "border-emerald-500/80 ring-2 ring-emerald-500/10 shadow-md"
                  : "border-[#ece8dc] hover:border-zinc-300"
              }`}
            >
              {/* Order Card Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#ece8dc]">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-mono font-black text-base text-zinc-950">
                    {ord.poNumber}
                  </span>
                  <span className="text-xs text-zinc-400">·</span>
                  <span className="text-xs text-zinc-500 font-sans">{ord.date}</span>

                  {/* Status Badge */}
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                      isDisbursed
                        ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                        : isVerified
                        ? "bg-emerald-50 text-emerald-800 border-emerald-400"
                        : isInTransit
                        ? "bg-amber-100 text-amber-900 border-amber-300"
                        : "bg-zinc-100 text-zinc-700 border-zinc-200"
                    }`}
                  >
                    {isDisbursed && <CheckCircle2 className="w-3 h-3 text-emerald-700" />}
                    {isVerified && <ShieldCheck className="w-3 h-3 text-emerald-700" />}
                    {isInTransit && <Truck className="w-3 h-3 text-amber-700" />}
                    {ord.escrowStatus === "LOCKED" && <Lock className="w-3 h-3 text-amber-700" />}
                    {ord.escrowStatus}
                  </span>
                </div>

                {/* Escrow Value Badge */}
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-zinc-400 block uppercase">
                      Bonded Escrow Value
                    </span>
                    <div className="font-mono font-black text-lg text-emerald-800 leading-none">
                      ₹{ord.totalValue.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Details Body */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 py-4">
                {/* Left (5 cols): Buyer & Hardware Summary */}
                <div className="lg:col-span-5 space-y-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-zinc-400 block">
                      Buyer &amp; Delivery Destination
                    </span>
                    <p className="font-display font-bold text-sm text-zinc-950">
                      {ord.buyerCompany}
                    </p>
                    <p className="text-xs text-zinc-600 font-sans">
                      Attn: {ord.buyerName} · {ord.buyerCity}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">
                      Ordered Equipment
                    </span>
                    <div className="space-y-1.5">
                      {ord.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-2 rounded-xl bg-[#faf8f3] border border-[#ece8dc] text-xs flex justify-between"
                        >
                          <div>
                            <span className="font-bold text-zinc-900 block">{item.productName}</span>
                            <span className="text-zinc-500 text-[11px]">{item.quantity}</span>
                          </div>
                          <span className="font-mono font-bold text-zinc-900">
                            ₹{item.subtotal.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right (7 cols): 180s Unloading Video Escrow & Logistics Console */}
                <div className="lg:col-span-7 bg-[#faf8f3] rounded-2xl p-4 border border-[#ece8dc] space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#ece8dc]">
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4 text-emerald-700" />
                      <span className="font-display font-bold text-xs text-zinc-950">
                        180s Video Escrow Verification Proof
                      </span>
                    </div>

                    {ord.videoEscrow.videoUploaded ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
                        {ord.videoEscrow.videoDurationSeconds}s Clip Analyzed
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-zinc-200 text-zinc-600">
                        Awaiting Unloading
                      </span>
                    )}
                  </div>

                  {/* Video Inspection Telemetry */}
                  {ord.videoEscrow.videoUploaded ? (
                    <div className="space-y-2 text-xs font-sans">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2 rounded-xl bg-white border border-[#ece8dc]">
                          <span className="text-[10px] font-mono uppercase text-zinc-400 block">
                            Micro-Crack Inspection
                          </span>
                          <span className="font-bold text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> 0 Micro-cracks Detected
                          </span>
                        </div>

                        <div className="p-2 rounded-xl bg-white border border-[#ece8dc]">
                          <span className="text-[10px] font-mono uppercase text-zinc-400 block">
                            Serial Barcodes Logged
                          </span>
                          <span className="font-mono font-bold text-zinc-900">
                            {ord.videoEscrow.barcodesScanned} OEM Flash Barcodes
                          </span>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white border border-[#ece8dc] text-[11px] text-zinc-600 space-y-0.5 font-mono">
                        <div>
                          <strong>Geotag:</strong> {ord.videoEscrow.gpsCoordinates}
                        </div>
                        <div>
                          <strong>Timestamp:</strong> {ord.videoEscrow.inspectionTimestamp}
                        </div>
                      </div>

                      {/* Primary Action Button: Release Escrow Payout */}
                      {isVerified && (
                        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                          <p className="text-[11px] text-emerald-800 font-medium">
                            Buyer inspection approved. Funds can be credited instantly.
                          </p>
                          <button
                            type="button"
                            onClick={() => handleReleaseEscrow(ord.id, ord.poNumber, ord.totalValue)}
                            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-display font-bold text-xs shadow-md active:scale-[0.97] transition-all cursor-pointer"
                          >
                            Release ₹{(ord.totalValue / 100000).toFixed(2)} Lakh to Bank Account
                          </button>
                        </div>
                      )}

                      {isDisbursed && (
                        <div className="p-2.5 rounded-xl bg-emerald-100/70 border border-emerald-200 text-emerald-950 text-xs font-bold flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                            Funds Transferred (HDFC ESCROW REF #SNX-99214)
                          </span>
                          <span className="font-mono text-[11px] text-emerald-800">COMPLETED</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2 text-xs font-sans">
                      <p className="text-zinc-600 text-xs leading-relaxed">
                        Carrier is currently in transit. The certified field installer will record the 180s unboxing video upon arrival before the driver leaves the premises.
                      </p>

                      <div className="p-2.5 rounded-xl bg-white border border-[#ece8dc] text-xs space-y-1">
                        <div className="flex justify-between">
                          <span className="text-zinc-500 font-sans">Carrier Fleet:</span>
                          <span className="font-bold text-zinc-900">{ord.carrierName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500 font-sans">Tracking Reference:</span>
                          <span className="font-mono font-bold text-zinc-900">{ord.trackingNumber}</span>
                        </div>
                        {ord.driverPhone && (
                          <div className="flex justify-between">
                            <span className="text-zinc-500 font-sans">Driver Contact:</span>
                            <span className="font-bold text-emerald-800">{ord.driverPhone}</span>
                          </div>
                        )}
                        {ord.eta && (
                          <div className="flex justify-between">
                            <span className="text-zinc-500 font-sans">Estimated Arrival:</span>
                            <span className="font-bold text-amber-700">{ord.eta}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
