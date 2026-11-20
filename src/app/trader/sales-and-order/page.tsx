"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  FileText,
  TrendingUp,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ArrowRight,
  Download,
} from "lucide-react";
import { toast } from "sonner";

export default function SalesAndOrderPage() {
  const [activeTab, setActiveTab] = useState<"QUOTES" | "PROFORMAS" | "LEADS">("QUOTES");

  return (
    <div className="space-y-6 select-none font-sans text-zinc-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
        <div>
          <h2 className="font-display font-extrabold text-xl sm:text-2xl text-zinc-950 tracking-tight flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-emerald-700" />
            <span>Sales &amp; Quotations Console</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-zinc-500 mt-0.5">
            Manage proforma invoices, commercial quotations, and wholesale project leads.
          </p>
        </div>

        <button
          type="button"
          onClick={() => toast.success("Draft proforma invoice created for new client.")}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-display font-bold text-xs shadow-xs active:scale-[0.97] transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Generate New Quotation</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-zinc-200 shadow-2xs w-fit">
        {[
          { id: "QUOTES", label: "Active Quotations (8)" },
          { id: "PROFORMAS", label: "Proforma Invoices (14)" },
          { id: "LEADS", label: "Inbound Inquiries (6)" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-sans font-bold transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-emerald-700 text-white shadow-xs"
                : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Sales Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-2xs">
          <span className="text-xs font-semibold text-zinc-500">Pipeline Quotations</span>
          <div className="font-display font-black text-2xl text-zinc-950 mt-1">₹84,20,000</div>
          <p className="text-[11px] text-emerald-700 font-medium mt-1">+12% vs last week</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-2xs">
          <span className="text-xs font-semibold text-zinc-500">Closed Sales (This Month)</span>
          <div className="font-display font-black text-2xl text-zinc-950 mt-1">₹1,42,80,000</div>
          <p className="text-[11px] text-emerald-700 font-medium mt-1">18 MW Transacted</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-2xs">
          <span className="text-xs font-semibold text-zinc-500">Average Win Rate</span>
          <div className="font-display font-black text-2xl text-zinc-950 mt-1">68.4%</div>
          <p className="text-[11px] text-zinc-500 font-medium mt-1">Top-decile regional EPC trader</p>
        </div>
      </div>

      {/* Table Mockup */}
      <div className="bg-white rounded-3xl p-5 border border-zinc-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
          <h3 className="font-display font-bold text-sm text-zinc-950">
            Recent Quotation Requests
          </h3>
          <span className="text-xs text-zinc-400 font-mono">Real-time CRM Feed</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-zinc-100 text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                <th className="py-2.5 px-3">Quote #</th>
                <th className="py-2.5 px-3">EPC Contractor</th>
                <th className="py-2.5 px-3">Equipment Required</th>
                <th className="py-2.5 px-3">Quoted Amount</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {[
                {
                  id: "QT-2026-901",
                  client: "Sunshakti Power Infrastructure",
                  equip: "120x TOPCon 585W + 50kW Sungrow",
                  amount: "₹18,40,000",
                  status: "Under Review",
                },
                {
                  id: "QT-2026-894",
                  client: "MahaSolar Rooftop Systems",
                  equip: "320x DCR Mono PERC 550W (Surya Ghar)",
                  amount: "₹39,60,000",
                  status: "Accepted",
                },
                {
                  id: "QT-2026-881",
                  client: "Vardhman Textiles Commercial",
                  equip: "4x 50kW Multi-MPPT Inverters",
                  amount: "₹6,40,000",
                  status: "Draft Sent",
                },
              ].map((row) => (
                <tr key={row.id} className="hover:bg-zinc-50/80 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-zinc-950">{row.id}</td>
                  <td className="py-3 px-3 font-semibold text-zinc-900">{row.client}</td>
                  <td className="py-3 px-3 text-zinc-600">{row.equip}</td>
                  <td className="py-3 px-3 font-mono font-bold text-emerald-800">{row.amount}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-zinc-100 text-zinc-700">
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => toast.info(`Exported proforma PDF for ${row.id}`)}
                      className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
                    >
                      Export PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
