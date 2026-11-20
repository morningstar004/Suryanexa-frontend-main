"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Boxes,
  Plus,
  Search,
  Filter,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Sparkles,
  X,
  Edit2,
  Trash2,
  Zap,
  Tag,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { INITIAL_PRODUCTS, SolarProduct } from "@/lib/traderData";

function TraderProductsContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<SolarProduct[]>(INITIAL_PRODUCTS);
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [depotFilter, setDepotFilter] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Product Form State
  const [newProduct, setNewProduct] = useState({
    name: "",
    brand: "",
    category: "PANELS" as "PANELS" | "INVERTERS" | "STRUCTURES" | "BOS",
    wattage: 585,
    efficiency: 22.5,
    cellType: "N-Type TOPCon 16BB",
    pricePerWatt: 18.20,
    unitPrice: 0,
    depotLocation: "Mundra Port Logistics Hub, Gujarat",
    availableStockMW: 1.0,
    palletsCount: 40,
    almmApproved: true,
    almmCertNumber: "MNRE-ALMM-2024-NEW",
    warrantyYears: 25,
    minOrderQuantity: "1 Pallet",
  });

  useEffect(() => {
    if (searchParams.get("action") === "new") {
      setIsModalOpen(true);
    }
  }, [searchParams]);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name.trim() || !newProduct.brand.trim()) {
      toast.error("Please enter a product name and brand.");
      return;
    }

    const created: SolarProduct = {
      id: `prod-${Date.now()}`,
      name: newProduct.name,
      brand: newProduct.brand,
      category: newProduct.category,
      wattage: Number(newProduct.wattage) || 585,
      efficiency: Number(newProduct.efficiency) || 22.0,
      cellType: newProduct.cellType,
      pricePerWatt: newProduct.category === "PANELS" ? Number(newProduct.pricePerWatt) : undefined,
      unitPrice: newProduct.category !== "PANELS" ? Number(newProduct.unitPrice) : undefined,
      depotLocation: newProduct.depotLocation,
      availableStockMW: Number(newProduct.availableStockMW) || 0.5,
      palletsCount: Number(newProduct.palletsCount) || 20,
      almmApproved: newProduct.almmApproved,
      almmCertNumber: newProduct.almmCertNumber,
      warrantyYears: Number(newProduct.warrantyYears) || 25,
      minOrderQuantity: newProduct.minOrderQuantity || "1 Pallet",
      imageUrl: "/Gemini_Generated_Image_solar_panal.png",
    };

    setProducts([created, ...products]);
    setIsModalOpen(false);
    toast.success(`Successfully listed ${created.name} across the SuryaNexa B2B Spot Grid!`);
    // Reset form
    setNewProduct({
      name: "",
      brand: "",
      category: "PANELS",
      wattage: 585,
      efficiency: 22.5,
      cellType: "N-Type TOPCon 16BB",
      pricePerWatt: 18.20,
      unitPrice: 0,
      depotLocation: "Mundra Port Logistics Hub, Gujarat",
      availableStockMW: 1.0,
      palletsCount: 40,
      almmApproved: true,
      almmCertNumber: "MNRE-ALMM-2024-NEW",
      warrantyYears: 25,
      minOrderQuantity: "1 Pallet",
    });
  };

  const filteredProducts = products.filter((p) => {
    const matchesCat = categoryFilter === "ALL" || p.category === categoryFilter;
    const matchesDepot = depotFilter === "ALL" || p.depotLocation.toLowerCase().includes(depotFilter.toLowerCase());
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.depotLocation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesDepot && matchesSearch;
  });

  return (
    <div className="space-y-6 select-none">
      {/* 1. Header & Actions Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ece8dc]">
        <div>
          <h2 className="font-display font-extrabold text-xl sm:text-2xl text-zinc-950 tracking-tight">
            Hardware Catalog &amp; Pallet Lots
          </h2>
          <p className="font-sans text-xs sm:text-sm text-zinc-500 mt-0.5">
            Manage your certified Tier-1 equipment available for regional EPC spot purchasing.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-display font-bold text-xs shadow-xs active:scale-[0.97] transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Pallet Lot</span>
        </button>
      </div>

      {/* 2. Filters & Search Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-[#ece8dc] shadow-2xs">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {["ALL", "PANELS", "INVERTERS", "STRUCTURES"].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-sans font-bold transition-all cursor-pointer shrink-0 ${
                categoryFilter === cat
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "bg-zinc-100 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200"
              }`}
            >
              {cat === "ALL" ? "All Equipment" : cat}
            </button>
          ))}
        </div>

        {/* Search & Depot Selector */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex-1 sm:w-60">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search module, brand..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-zinc-50 border border-[#ece8dc] text-xs font-sans text-zinc-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
            />
          </div>

          <select
            value={depotFilter}
            onChange={(e) => setDepotFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-zinc-50 border border-[#ece8dc] text-xs font-sans text-zinc-800 focus:outline-none focus:border-emerald-600 transition-all cursor-pointer"
          >
            <option value="ALL">All Depots</option>
            <option value="Mundra">Mundra Port</option>
            <option value="Pune">Pune Depot</option>
            <option value="Ahmedabad">Ahmedabad / Sanand</option>
            <option value="Noida">Greater Noida</option>
            <option value="Hyderabad">Hyderabad</option>
          </select>
        </div>
      </div>

      {/* 3. Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-3xl border border-[#ece8dc] p-5 shadow-xs hover:shadow-md hover:border-emerald-300/80 transition-all flex flex-col justify-between space-y-4"
          >
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-zinc-100 text-zinc-700 uppercase border border-zinc-200">
                  {p.brand}
                </span>

                {p.almmApproved && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" /> ALMM Listed
                  </span>
                )}
              </div>

              <div className="flex items-start gap-3 my-2">
                <div className="w-14 h-14 rounded-2xl bg-[#faf8f3] border border-[#ece8dc] flex items-center justify-center p-2 shrink-0">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-zinc-950 leading-tight">
                    {p.name}
                  </h3>
                  <p className="text-[11px] font-sans text-zinc-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-zinc-400 shrink-0" />
                    <span className="truncate">{p.depotLocation}</span>
                  </p>
                </div>
              </div>

              {/* Technical Spec Matrix */}
              <div className="grid grid-cols-2 gap-2 my-3 p-3 rounded-2xl bg-[#faf8f3] border border-[#ece8dc] text-xs font-sans">
                {p.wattage && (
                  <div>
                    <span className="text-[10px] font-mono uppercase text-zinc-400 block">Rating</span>
                    <span className="font-bold text-zinc-900">{p.wattage} Watts</span>
                  </div>
                )}
                {p.efficiency && (
                  <div>
                    <span className="text-[10px] font-mono uppercase text-zinc-400 block">Efficiency</span>
                    <span className="font-bold text-zinc-900">{p.efficiency}%</span>
                  </div>
                )}
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block">Available MW</span>
                  <span className="font-mono font-bold text-emerald-800">{p.availableStockMW} MW</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block">Pallets</span>
                  <span className="font-mono font-bold text-zinc-900">{p.palletsCount} Pallets</span>
                </div>
              </div>

              {p.cellType && (
                <p className="text-[11px] font-sans text-zinc-600">
                  <strong className="text-zinc-800 font-medium">Cell Tech:</strong> {p.cellType}
                </p>
              )}
            </div>

            {/* Price & Action Bottom Strip */}
            <div className="pt-3 border-t border-[#ece8dc] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-zinc-400 block">Spot Price</span>
                <div className="font-mono font-extrabold text-base text-emerald-800">
                  {p.pricePerWatt ? `₹${p.pricePerWatt.toFixed(2)} / Wp` : `₹${p.unitPrice?.toLocaleString()} / unit`}
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => toast.info(`Stock buffer adjusted for ${p.name}`)}
                  className="p-2 rounded-xl text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 transition-colors cursor-pointer border border-[#ece8dc]"
                  title="Edit stock"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setProducts(products.filter((item) => item.id !== p.id));
                    toast.success(`Lot delisted from spot market.`);
                  }}
                  className="p-2 rounded-xl text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer border border-[#ece8dc]"
                  title="Delist"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Modal: Add New Hardware Pallet Lot */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto overscroll-contain flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-zinc-950/60 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-xl rounded-3xl bg-white p-6 sm:p-8 text-left shadow-2xl border border-zinc-200 max-h-[90vh] overflow-y-auto text-zinc-900 animate-in fade-in-50 zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-5">
              <div>
                <h3 className="font-display font-bold text-lg text-zinc-950">
                  List New Equipment on Spot Grid
                </h3>
                <p className="text-xs text-zinc-500 font-sans mt-0.5">
                  Listed stock is immediately matchable with verified EPC buyer inquiries.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Equipment / Model Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. TOPCon 590W Bifacial"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs font-sans focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Brand / Manufacturer *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Adani Solar / Waaree"
                    value={newProduct.brand}
                    onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs font-sans focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        category: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-xs font-sans focus:outline-none focus:border-emerald-600"
                  >
                    <option value="PANELS">Solar Panels</option>
                    <option value="INVERTERS">Inverters</option>
                    <option value="STRUCTURES">Structures</option>
                    <option value="BOS">BOS & Cables</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Wattage (Wp)
                  </label>
                  <input
                    type="number"
                    value={newProduct.wattage}
                    onChange={(e) => setNewProduct({ ...newProduct, wattage: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs font-sans focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Price per Watt (₹/Wp)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    value={newProduct.pricePerWatt}
                    onChange={(e) => setNewProduct({ ...newProduct, pricePerWatt: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs font-sans focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Available Stock (MW)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={newProduct.availableStockMW}
                    onChange={(e) => setNewProduct({ ...newProduct, availableStockMW: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs font-sans focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Pallet Count
                  </label>
                  <input
                    type="number"
                    value={newProduct.palletsCount}
                    onChange={(e) => setNewProduct({ ...newProduct, palletsCount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs font-sans focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Bonded Depot Location
                </label>
                <input
                  type="text"
                  value={newProduct.depotLocation}
                  onChange={(e) => setNewProduct({ ...newProduct, depotLocation: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs font-sans focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  ALMM Compliance Certificate
                </label>
                <input
                  type="text"
                  value={newProduct.almmCertNumber}
                  onChange={(e) => setNewProduct({ ...newProduct, almmCertNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs font-sans focus:outline-none focus:border-emerald-600"
                />
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 border-t border-zinc-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-zinc-200 text-zinc-600 hover:text-zinc-900 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-display font-bold text-xs shadow-xs active:scale-[0.97] transition-all cursor-pointer"
                >
                  Publish to Spot Engine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TraderProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-3">
          <div className="w-8 h-8 rounded-full border-3 border-emerald-600 border-t-transparent animate-spin" />
          <p className="text-xs font-mono font-bold text-zinc-500 uppercase">
            Loading Hardware Inventory...
          </p>
        </div>
      }
    >
      <TraderProductsContent />
    </Suspense>
  );
}
