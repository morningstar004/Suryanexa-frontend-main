"use client";

import React from "react";
import Link from "next/link";
import {
  Store,
  TrendingUp,
  Tag,
  Zap,
  MapPin,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { INITIAL_PRODUCTS } from "@/lib/traderData";

export default function MarketplacePage() {
  return (
    <div className="space-y-6 select-none font-sans text-zinc-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
        <div>
          <h2 className="font-display font-extrabold text-xl sm:text-2xl text-zinc-950 tracking-tight flex items-center gap-2">
            <Store className="w-6 h-6 text-emerald-700" />
            <span>National Solar Spot Marketplace</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-zinc-500 mt-0.5">
            Inter-trader liquidity pool, bulk pallet bids, and flash factory allocations.
          </p>
        </div>

        <Link
          href="/trader/products?action=new"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-display font-bold text-xs shadow-xs active:scale-[0.97] transition-all cursor-pointer self-start sm:self-auto"
        >
          <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span>Post Spot Lot Offer</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {INITIAL_PRODUCTS.map((prod) => (
          <div
            key={prod.id}
            className="p-5 rounded-3xl bg-white border border-zinc-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-zinc-100 text-zinc-700 uppercase">
                  {prod.brand}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Spot Verified
                </span>
              </div>

              <h3 className="font-display font-bold text-sm text-zinc-950 mt-1">
                {prod.name}
              </h3>
              <p className="text-xs text-zinc-500 font-sans mt-0.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                <span className="truncate">{prod.depotLocation}</span>
              </p>

              <div className="mt-3 p-3 rounded-2xl bg-zinc-50 border border-zinc-100 grid grid-cols-2 gap-2 text-xs font-sans">
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 block uppercase">Available</span>
                  <span className="font-bold text-zinc-900">{prod.availableStockMW} MW</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 block uppercase">Min Order</span>
                  <span className="font-bold text-zinc-900">{prod.minOrderQuantity}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase block">Spot Rate</span>
                <span className="font-mono font-extrabold text-base text-emerald-800">
                  {prod.pricePerWatt ? `₹${prod.pricePerWatt.toFixed(2)}/Wp` : `₹${prod.unitPrice?.toLocaleString()}`}
                </span>
              </div>

              <button
                type="button"
                onClick={() => toast.success(`Inquiry sent to distributor for ${prod.name}`)}
                className="px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-display font-bold text-xs active:scale-[0.97] transition-all cursor-pointer"
              >
                Inquire Bid
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
