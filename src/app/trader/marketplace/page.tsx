"use client";

import React, { useState, useMemo } from "react";
import {
  Store,
  TrendingUp,
  Tag,
  Zap,
  MapPin,
  ShieldCheck,
  ArrowRight,
  Bookmark,
  ShoppingCart,
  Plus,
  Minus,
  X,
  Eye,
  Check,
  Search,
  Sparkles,
  Layers,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { INITIAL_PRODUCTS, type SolarProduct } from "@/lib/traderData";
import { BrandBadge, getBrandConfig } from "@/constants/brands";

// Navigation Tab Types
type MarketTab = "market" | "stock" | "my-list";

// Sort Option Definitions
const SORT_OPTIONS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "wattage-desc", label: "Wattage: High to Low" },
];

export default function MarketplacePage() {
  // Navigation tabs state
  const [activeTab, setActiveTab] = useState<MarketTab>("market");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [lowStockOnly, setLowStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<string>("featured");

  // Watchlist state (My List)
  const [watchlist, setWatchlist] = useState<string[]>(["prod-1", "prod-3"]);

  // Cart state: Record<productId, quantity>
  const [cart, setCart] = useState<Record<string, number>>({
    "prod-1": 1,
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Pop-up Card (Solar Panel / Equipment detail modal)
  const [modalProduct, setModalProduct] = useState<SolarProduct | null>(null);

  // Toggle Item in Watchlist (My List)
  const toggleWatchlist = (id: string, name: string) => {
    setWatchlist((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        toast.info(`Removed ${name} from your list`);
        return prev.filter((item) => item !== id);
      } else {
        toast.success(`Saved ${name} to your list`);
        return [...prev, id];
      }
    });
  };

  // Cart Handlers
  const addToCart = (id: string, name: string) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
    toast.success(`Added 1 pallet/unit of ${name} to cart`);
  };

  const increaseCart = (id: string) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const decreaseCart = (id: string) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: current - 1 };
    });
  };

  const totalCartCount = useMemo(() => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  }, [cart]);

  const totalCartValue = useMemo(() => {
    return Object.entries(cart).reduce((total, [prodId, qty]) => {
      const prod = INITIAL_PRODUCTS.find((p) => p.id === prodId);
      if (!prod) return total;
      const unitVal = prod.pricePerWatt
        ? (prod.wattage || 500) * 36 * prod.pricePerWatt // approx pallet value
        : prod.unitPrice || 50000;
      return total + unitVal * qty;
    }, 0);
  }, [cart]);

  // Category chips with counts derived dynamically from the products data array
  const categoryChips = useMemo(() => {
    const baseData =
      activeTab === "my-list"
        ? INITIAL_PRODUCTS.filter((p) => watchlist.includes(p.id))
        : INITIAL_PRODUCTS;

    const counts: Record<string, number> = {
      ALL: baseData.length,
    };

    baseData.forEach((p) => {
      if (p.category) {
        counts[p.category] = (counts[p.category] || 0) + 1;
      }
    });

    const uniqueCats = Array.from(
      new Set(INITIAL_PRODUCTS.map((p) => p.category).filter(Boolean))
    );

    const getCategoryLabel = (cat: string) => {
      if (cat === "PANELS") return "Solar Panels";
      if (cat === "INVERTERS") return "Inverters";
      if (cat === "STRUCTURES") return "Structures";
      return cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase();
    };

    return [
      { id: "ALL", label: "All", count: counts.ALL || 0 },
      ...uniqueCats.map((cat) => ({
        id: cat,
        label: getCategoryLabel(cat),
        count: counts[cat] || 0,
      })),
    ];
  }, [activeTab, watchlist]);

  // Filtered Products Calculation
  const filteredProducts = useMemo(() => {
    let list = [...INITIAL_PRODUCTS];

    // Filter by Tab
    if (activeTab === "stock") {
      list = list.sort((a, b) => b.availableStockMW - a.availableStockMW);
    } else if (activeTab === "my-list") {
      list = list.filter((p) => watchlist.includes(p.id));
    }

    // Filter by Category
    if (selectedCategory !== "ALL") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.depotLocation.toLowerCase().includes(q) ||
          p.cellType?.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q)
      );
    }

    // Filter by Low Stock Only (e.g. stock <= 1.0 MW or <= 30 pallets)
    if (lowStockOnly) {
      list = list.filter(
        (p) =>
          (p.availableStockMW !== undefined && p.availableStockMW <= 1.0) ||
          (p.palletsCount !== undefined && p.palletsCount <= 30)
      );
    }

    // Apply Sorting Order
    if (sortBy === "price-asc") {
      list = [...list].sort((a, b) => {
        const priceA = a.pricePerWatt ?? (a.unitPrice ? a.unitPrice / 500 : 0);
        const priceB = b.pricePerWatt ?? (b.unitPrice ? b.unitPrice / 500 : 0);
        return priceA - priceB;
      });
    } else if (sortBy === "price-desc") {
      list = [...list].sort((a, b) => {
        const priceA = a.pricePerWatt ?? (a.unitPrice ? a.unitPrice / 500 : 0);
        const priceB = b.pricePerWatt ?? (b.unitPrice ? b.unitPrice / 500 : 0);
        return priceB - priceA;
      });
    } else if (sortBy === "wattage-desc") {
      list = [...list].sort((a, b) => (b.wattage || 0) - (a.wattage || 0));
    } else if (sortBy === "stock-desc") {
      list = [...list].sort((a, b) => b.availableStockMW - a.availableStockMW);
    }

    return list;
  }, [activeTab, selectedCategory, searchQuery, lowStockOnly, watchlist, sortBy]);

  // Tab Definitions for Horizontal Navigation
  const NAV_TABS = [
    {
      id: "market" as MarketTab,
      label: "Spot Market",
      icon: Store,
      badge: INITIAL_PRODUCTS.length,
    },
    {
      id: "stock" as MarketTab,
      label: "Depot Stock",
      icon: Layers,
      badge: "6.65 MW",
    },
    {
      id: "my-list" as MarketTab,
      label: "My List",
      icon: Bookmark,
      badge: watchlist.length,
    },
  ];

  return (
    <div className="space-y-5 bg-[#ECEFF0] pb-16 min-h-screen font-sans text-zinc-900 select-none">
      {/* =========================================================================
          TOP COMMAND ROW: Title, Live Telematics & Quick Actions (My List & Cart)
         ========================================================================= */}
      <div className="flex sm:flex-row flex-col justify-between sm:items-center gap-4 p-2.5 sm:p-5">
        <div>
          {/* Dynamic Breadcrumb Route matching selected tab */}
          <div className="flex items-center gap-2 mb-2 font-sans text-zinc-500 text-xs">
            <span className="flex items-center gap-1.5 hover:text-zinc-800 transition-colors">
              <Store className="w-3.5 h-3.5 text-zinc-400" />
              <span>Trader Portal</span>
            </span>
            <span className="font-mono text-zinc-300">/</span>
            <span className="font-medium text-zinc-600">Marketplace</span>
            <span className="font-mono text-zinc-300">/</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={activeTab}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.18 }}
                className="inline-flex items-center gap-1.5 bg-[#e6f4f1] px-2.5 py-0.5 border border-[#d2ebe5] rounded-full font-mono font-bold text-[#0f766e] text-[11px]"
              >
                <span className="bg-[#0f766e] rounded-full w-1.5 h-1.5 animate-pulse" />
                {activeTab === "market" && "Spot Market"}
                {activeTab === "stock" && "Depot Stock"}
                {activeTab === "my-list" && "My List"}
              </motion.span>
            </AnimatePresence>
          </div>

          <h1 className="font-display font-extrabold text-zinc-950 text-2xl sm:text-3xl tracking-tight">
            National Solar Spot Marketplace
          </h1>
          <p className="mt-1 font-sans text-zinc-500 text-xs sm:text-sm">
            Inter-trader liquidity pool, bulk pallet bids, and flash factory tier-1 allocations.
          </p>
        </div>

        {/* Top Right Quick Actions: Animated My List Button & Cart Badge */}
        <div className="flex items-center gap-2.5">
          {/* Animated My List Icon / Shortcut */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setActiveTab("my-list");
            }}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full text-xs font-sans font-semibold border transition-all cursor-pointer ${activeTab === "my-list"
              ? "bg-white/75 border-zinc-200 text-zinc-800 shadow-xs"
              : "bg-zinc-50 hover:bg-zinc-100 border-zinc-200/80 text-zinc-700 hover:text-zinc-950"
              }`}
            title="Open My List"
          >
            <motion.div
              animate={watchlist.length > 0 ? { rotate: [0, -10, 10, 0] } : {}}
              transition={{ duration: 0.5, repeat: 0 }}
            >
              <Bookmark
                className={`w-4 h-4 transition-colors ${activeTab === "my-list" || watchlist.length > 0
                  ? "fill-[#4ee6a7] text-[#4ee6a7]"
                  : "text-[#31956b] fill-[#31956b]"
                  }`}
              />
            </motion.div>
            <span>My List</span>
            <span className="flex justify-center items-center bg-zinc-200/60 px-2 py-0.5 rounded-full font-mono font-bold text-[10px] text-zinc-800">
              {watchlist.length}
            </span>
          </motion.button>

          {/* Animated Cart Drawer Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="relative flex items-center gap-2 bg-[#53bb90] hover:bg-emerald-800 shadow-xs px-4 py-2.5 border border-[#A7E2C9] rounded-full font-sans font-bold text-white text-xs transition-all cursor-pointer"
            title="View Cart & Dispatch Allocations"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Dispatch Cart</span>
            {totalCartCount > 0 && (
              <motion.span
                key={totalCartCount}
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                className="flex justify-center items-center bg-[#D3F1E4] px-1.5 rounded-full min-w-[20px] h-5 font-mono font-black text-[10px] text-zinc-800"
              >
                {totalCartCount}
              </motion.span>
            )}
          </motion.button>
        </div>
      </div>

      {/* =========================================================================
          HORIZONTAL NAVIGATION STRIP: Stock, My List & Spot Market with Pill Morph
         ========================================================================= */}
      <div className="flex items-center">
        {/* Horizontal Navigation Pill Bar */}
        <div className="inline-flex items-center gap-1 bg-white shadow-2xs p-1 border border-zinc-200/90 rounded-full">
          {NAV_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const TabIcon = tab.icon;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2.5 rounded-full text-sm font-sans font-semibold transition-colors cursor-pointer flex items-center gap-2 outline-none select-none ${isActive
                  ? "text-emerald-950 font-bold"
                  : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                  }`}
              >
                {/* Responsive Pill Animation using layoutId (borderless clean pill) */}
                {isActive && (
                  <motion.div
                    layoutId="marketplaceTabPill"
                    className="z-0 absolute inset-0 bg-[#ECEFF0] shadow-xs rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 320,
                      damping: 40,
                      mass: 0.8,
                    }}
                  />
                )}

                <span className="z-10 relative flex items-center gap-1.5">
                  <TabIcon
                    className={`w-3.5 h-3.5 transition-colors ${isActive ? "text-emerald-700" : "text-zinc-400"
                      }`}
                  />
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-md font-mono text-[10px] font-bold ${isActive
                      ? "bg-emerald-100 text-emerald-900"
                      : "bg-zinc-100 text-zinc-600"
                      }`}
                  >
                    {tab.badge}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          CATEGORY CHIPS & SEARCH FILTER BAR (Two-Row Design Matching Reference)
         ========================================================================= */}
      <div className="space-y-3">
        {/* Row 1: Search + Toggle Switch + Horizontal Sort Pill */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Search Input Large White Pill */}
          <div className="relative flex items-center bg-white shadow-2xs px-4 border border-zinc-200 focus-within:border-emerald-500 rounded-full focus-within:ring-2 focus-within:ring-emerald-500/20 w-full max-w-sm h-10 transition-all">
            <Search className="mr-3 w-5 h-5 text-zinc-500 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search order ID, brand, or buyer..."
              className="bg-transparent border-none focus:outline-none w-full font-sans text-zinc-800 placeholder:text-zinc-400 text-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="p-1 text-zinc-400 hover:text-zinc-600 cursor-pointer shrink-0"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Custom Toggle Switch: Low stock only */}
          <div className="flex items-center gap-2.5 select-none">
            <button
              type="button"
              role="switch"
              aria-checked={lowStockOnly}
              onClick={() => setLowStockOnly(!lowStockOnly)}
              className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-none ${lowStockOnly ? "bg-emerald-500" : "bg-zinc-300"
                }`}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${lowStockOnly ? "translate-x-5" : "translate-x-0"
                  }`}
              />
            </button>
            <span
              onClick={() => setLowStockOnly(!lowStockOnly)}
              className="font-sans text-zinc-600 text-xs cursor-pointer"
            >
              Low stock only
            </span>
          </div>

          {/* Horizontal Sort Pill Segmented Control */}
          <div className="flex flex-wrap items-center gap-1.5 sm:ml-auto select-none">
            <span className="hidden sm:inline font-sans font-medium text-zinc-400 text-xs">Sort:</span>
            <div className="inline-flex flex-wrap items-center gap-1 bg-white shadow-2xs p-1 border border-zinc-200/80 rounded-full">
              {SORT_OPTIONS.map((opt) => {
                const isActive = sortBy === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSortBy(opt.id)}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs font-sans font-medium transition-colors cursor-pointer outline-none select-none ${isActive
                      ? "text-white font-semibold"
                      : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50"
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="sortActivePill"
                        className="z-0 absolute inset-0 bg-[#16232e] shadow-xs rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 32,
                        }}
                      />
                    )}
                    <span className="z-10 relative whitespace-nowrap">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        {/* Row 2: Category Chips (Unified Horizontal Pill Bar with Morphing Pill Animation) */}
        <div className="flex items-center">
          <div
            className="inline-flex flex-wrap items-center gap-1 bg-white shadow-2xs p-1 border border-zinc-200/90 rounded-full"
            role="group"
            aria-label="Filter by Category"
          >
            {categoryChips.map((chip) => {
              const isActive = selectedCategory === chip.id;
              return (
                <button
                  key={chip.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setSelectedCategory(chip.id)}
                  className={`relative rounded-full px-4 py-2.5 text-xs font-sans font-medium transition-colors flex items-center gap-1.5 cursor-pointer outline-none select-none ${isActive
                    ? "text-white font-semibold"
                    : "text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50"
                    }`}
                >
                  {/* Responsive Pill-Shaped Active Indicator with Spring Morph Animation */}
                  {isActive && (
                    <motion.div
                      layoutId="categoryActivePill"
                      className="z-0 absolute inset-0 bg-[#16232e] shadow-xs rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 32,
                        mass: 0.75,
                      }}
                    />
                  )}

                  <span className="z-10 relative flex items-center gap-1.5">
                    <span>{chip.label}</span>
                    <span
                      className={`text-[11px] ${isActive ? "text-white/70 font-medium" : "text-zinc-400 font-normal"
                        }`}
                    >
                      {chip.count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* =========================================================================
          PRODUCT CARD GRID: Cards with Brand Logos, Animated Badges & Cart Stepper
         ========================================================================= */}
      <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((prod) => {
          const isSaved = watchlist.includes(prod.id);
          const cartQty = cart[prod.id] || 0;

          return (
            <motion.div
              key={prod.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="group relative flex flex-col justify-between bg-white shadow-2xs hover:shadow-lg p-5 border border-zinc-200/90 hover:border-emerald-300/80 rounded-3xl transition-all duration-300"
            >
              <div>
                {/* 1. Header: Brand Logo & Interactive Animated Badges */}
                <div className="flex justify-between items-center mb-3">
                  {/* Brand Logo with exact company logo & company logo font */}
                  <BrandBadge brand={prod.brand} iconSize={20} />

                  {/* Right Side: Animated Hover Verified Badge + My List Bookmark Toggle */}
                  <div className="flex items-center gap-1.5">
                    {/* Small Icon that Animates / Expands on Hover */}
                    <div
                      className="group/badge relative flex items-center bg-emerald-50 hover:bg-emerald-100/90 shadow-2xs px-2 py-1 border border-emerald-200/80 rounded-full text-emerald-800 transition-all duration-200 cursor-default"
                      title="MNRE / ALMM Spot Verified Inspection Passed"
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="flex justify-center items-center"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      </motion.div>
                      <span className="max-w-0 group-hover/badge:max-w-xs overflow-hidden font-mono font-bold text-[10px] text-emerald-900 whitespace-nowrap transition-all duration-300 ease-out">
                        <span className="pl-1">Spot Verified</span>
                      </span>
                    </div>

                    {/* Bookmark to My List Toggle */}
                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      onClick={() => toggleWatchlist(prod.id, prod.name)}
                      className={`w-7 h-7 rounded-full flex items-center justify-center border transition-colors cursor-pointer ${isSaved
                        ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                        : "bg-zinc-50 hover:bg-zinc-100 border-zinc-200/80 text-zinc-400 hover:text-zinc-600"
                        }`}
                      title={isSaved ? "Remove from My List" : "Save to My List"}
                    >
                      <Bookmark
                        className={`w-3.5 h-3.5 ${isSaved ? "fill-emerald-600 text-emerald-600" : ""
                          }`}
                      />
                    </motion.button>
                  </div>
                </div>

                {/* 2. Product Visual & Quick Telematics Overlay */}
                <div
                  onClick={() => setModalProduct(prod)}
                  className="group/img relative bg-gradient-to-b from-zinc-50 to-zinc-100/80 mb-3 border border-zinc-100 rounded-2xl h-36 overflow-hidden cursor-pointer"
                >
                  <img
                    src={prod.imageUrl}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                  />
                  <div className="bottom-2 left-2 absolute flex items-center gap-1.5 bg-zinc-950/75 backdrop-blur-xs px-2.5 py-1 rounded-lg font-mono font-bold text-[10px] text-white">
                    <Zap className="fill-amber-400 w-3 h-3 text-amber-400" />
                    <span>
                      {prod.wattage ? `${prod.wattage}W` : "High Spec"} · {prod.efficiency ? `${prod.efficiency}% Eff` : "ALMM Tier-1"}
                    </span>
                  </div>

                  {/* Quick Inspect Hover Pill */}
                  <div className="top-2 right-2 absolute flex items-center gap-1 bg-white/90 opacity-0 group-hover/img:opacity-100 shadow-xs px-2 py-0.5 rounded-md font-sans font-bold text-[10px] text-zinc-800 transition-opacity">
                    <Eye className="w-3 h-3" />
                    <span>Specs</span>
                  </div>
                </div>

                {/* 3. Title & Depot Location */}
                <h3
                  onClick={() => setModalProduct(prod)}
                  className="font-display font-bold text-zinc-950 hover:text-emerald-800 text-sm sm:text-base line-clamp-1 leading-snug transition-colors cursor-pointer"
                >
                  {prod.name}
                </h3>
                <p className="flex items-center gap-1 mt-1 font-sans text-zinc-500 text-xs truncate">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span className="truncate">{prod.depotLocation}</span>
                </p>

                {/* 4. Specifications Grid */}
                <div className="gap-2 grid grid-cols-2 bg-[#f8fafc] mt-3 p-3 border border-zinc-200/60 rounded-2xl font-sans text-xs">
                  <div>
                    <span className="block font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                      Available Stock
                    </span>
                    <span className="font-bold text-zinc-900">
                      {prod.availableStockMW} MW{" "}
                      <span className="font-normal text-[11px] text-zinc-500">
                        ({prod.palletsCount} plts)
                      </span>
                    </span>
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                      Min Order
                    </span>
                    <span className="block font-bold text-zinc-900 truncate">
                      {prod.minOrderQuantity}
                    </span>
                  </div>
                  <div className="col-span-2 pt-1 border-zinc-200/40 border-t">
                    <span className="block font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                      Technology
                    </span>
                    <span className="block font-medium text-[11.5px] text-zinc-700 truncate">
                      {prod.cellType || "N-Type Monocrystalline Bifacial"}
                    </span>
                  </div>
                </div>
              </div>

              {/* 5. Footer: Spot Rate & Animated Add to Cart Stepper */}
              <div className="flex justify-between items-center pt-3.5 border-zinc-100 border-t">
                <div>
                  <span className="flex items-center gap-1 font-mono text-[10px] text-zinc-400 uppercase">
                    <span>Spot Rate</span>
                    <TrendingUp className="w-3 h-3 text-emerald-600" />
                  </span>
                  <span className="font-mono font-black text-emerald-800 text-base sm:text-lg">
                    {prod.pricePerWatt
                      ? `₹${prod.pricePerWatt.toFixed(2)}/Wp`
                      : `₹${prod.unitPrice?.toLocaleString()}`}
                  </span>
                </div>

                {/* Interactive Add to Cart & Stepper */}
                <div className="flex items-center gap-2">
                  {/* Inspect Details Button */}
                  <button
                    type="button"
                    onClick={() => setModalProduct(prod)}
                    className="flex justify-center items-center hover:bg-zinc-100 border border-zinc-200/90 rounded-xl w-8 h-8 text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer"
                    title="View Comprehensive Solar Panel Specs"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {/* Add to Cart / Quantity Stepper */}
                  {cartQty === 0 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => addToCart(prod.id, prod.name)}
                      className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 shadow-xs px-3.5 py-2 rounded-xl font-display font-bold text-white text-xs transition-all cursor-pointer"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </motion.button>
                  ) : (
                    <motion.div
                      initial={{ scale: 0.85, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex items-center bg-emerald-50 shadow-2xs p-0.5 border border-emerald-300 rounded-xl"
                    >
                      <button
                        type="button"
                        onClick={() => decreaseCart(prod.id)}
                        className="flex justify-center items-center bg-white hover:bg-emerald-100 rounded-lg w-7 h-7 font-bold text-emerald-800 transition-colors cursor-pointer"
                        title="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>

                      <motion.span
                        key={cartQty}
                        initial={{ y: -4, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="w-7 font-mono font-extrabold text-emerald-950 text-xs text-center"
                      >
                        {cartQty}
                      </motion.span>

                      <button
                        type="button"
                        onClick={() => increaseCart(prod.id)}
                        className="flex justify-center items-center bg-emerald-700 hover:bg-emerald-800 rounded-lg w-7 h-7 font-bold text-white transition-colors cursor-pointer"
                        title="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State when list has no matches */}
      {filteredProducts.length === 0 && (
        <div className="bg-white shadow-2xs p-10 border border-zinc-200/90 rounded-3xl text-center">
          <Bookmark className="mx-auto mb-2 w-8 h-8 text-zinc-300" />
          <h3 className="font-display font-bold text-zinc-900 text-sm">No items found</h3>
          <p className="mt-1 font-sans text-zinc-500 text-xs">
            {activeTab === "my-list"
              ? "Your watchlist is empty. Bookmark any equipment in the Spot Market to track it here."
              : "Try adjusting your search criteria or category filter."}
          </p>
          {activeTab === "my-list" && (
            <button
              onClick={() => setActiveTab("market")}
              className="inline-flex items-center gap-1.5 bg-emerald-700 mt-4 px-4 py-2 rounded-xl font-bold text-white text-xs cursor-pointer"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Browse Spot Market</span>
            </button>
          )}
        </div>
      )}

      {/* =========================================================================
          POP-UP CARD (MODAL): Comprehensive Solar Panel / Equipment Information
         ========================================================================= */}
      <AnimatePresence>
        {modalProduct && (
          <div className="z-50 fixed inset-0 flex justify-center items-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalProduct(null)}
              className="fixed inset-0 bg-zinc-950/60 backdrop-blur-xs transition-opacity"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="z-10 relative flex flex-col bg-white shadow-2xl border border-zinc-200 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
            >
              {/* Modal Top Header */}
              <div className="flex justify-between items-center p-5 border-zinc-100 border-b">
                <div className="flex items-center gap-2">
                  <div className="flex justify-center items-center bg-emerald-50 rounded-xl w-8 h-8 text-emerald-800">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-zinc-950 text-base sm:text-lg leading-tight">
                      Equipment Telematics &amp; Spot Specs
                    </h3>
                    <p className="font-sans text-[11px] text-zinc-500">
                      Certified factory inspection and blind escrow guarantee
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setModalProduct(null)}
                  className="flex justify-center items-center bg-zinc-100 hover:bg-zinc-200 rounded-full w-8 h-8 text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer"
                  title="Close Modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body: Two-Column Detailed Spec Sheet */}
              <div className="space-y-4 p-5 sm:p-6 overflow-y-auto">
                {/* Brand & Title */}
                <div className="flex sm:flex-row flex-col justify-between sm:items-start gap-3">
                  <div>
                    <BrandBadge brand={modalProduct.brand} iconSize={22} />
                    <h2 className="mt-2 font-display font-black text-zinc-950 text-lg sm:text-xl">
                      {modalProduct.name}
                    </h2>
                    <p className="flex items-center gap-1.5 mt-1 font-sans text-zinc-600 text-xs">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span>{modalProduct.depotLocation}</span>
                    </p>
                  </div>

                  {/* Spot Rate Callout */}
                  <div className="bg-emerald-50 p-3 border border-emerald-200 rounded-2xl text-right shrink-0">
                    <span className="block font-mono text-[10px] text-emerald-800 uppercase tracking-wider">
                      Spot Rate
                    </span>
                    <span className="font-mono font-black text-emerald-950 text-xl">
                      {modalProduct.pricePerWatt
                        ? `₹${modalProduct.pricePerWatt.toFixed(2)}/Wp`
                        : `₹${modalProduct.unitPrice?.toLocaleString()}`}
                    </span>
                    <span className="block mt-0.5 font-sans font-medium text-[10px] text-emerald-700">
                      Ex-Depot Escrow Locked
                    </span>
                  </div>
                </div>

                {/* Visual Banner */}
                <div className="relative bg-zinc-100 border border-zinc-200 rounded-2xl h-44 overflow-hidden">
                  <img
                    src={modalProduct.imageUrl}
                    alt={modalProduct.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="right-3 bottom-3 absolute bg-zinc-950/80 backdrop-blur-xs px-3 py-1 rounded-xl font-mono text-white text-xs">
                    {modalProduct.wattage ? `${modalProduct.wattage} Watts` : "Industrial Spec"} · {modalProduct.efficiency}% Efficiency
                  </div>
                </div>

                {/* Key Technical Specs Grid */}
                <div>
                  <h4 className="flex items-center gap-1.5 mb-2 font-display font-bold text-zinc-950 text-xs uppercase tracking-wider">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>Technical &amp; Engineering Specifications</span>
                  </h4>

                  <div className="gap-2.5 grid grid-cols-2 sm:grid-cols-3 bg-[#f8fafc] p-3.5 border border-zinc-200/70 rounded-2xl font-sans text-xs">
                    <div className="bg-white p-2.5 border border-zinc-200/50 rounded-xl">
                      <span className="block font-mono text-[10px] text-zinc-400 uppercase">Power Output</span>
                      <strong className="text-zinc-900 text-sm">{modalProduct.wattage || 585} Wp</strong>
                    </div>

                    <div className="bg-white p-2.5 border border-zinc-200/50 rounded-xl">
                      <span className="block font-mono text-[10px] text-zinc-400 uppercase">Efficiency</span>
                      <strong className="text-zinc-900 text-sm">{modalProduct.efficiency || 22.7}%</strong>
                    </div>

                    <div className="bg-white p-2.5 border border-zinc-200/50 rounded-xl">
                      <span className="block font-mono text-[10px] text-zinc-400 uppercase">Cell Architecture</span>
                      <strong className="block text-zinc-900 text-xs truncate">{modalProduct.cellType || "N-Type TOPCon"}</strong>
                    </div>

                    <div className="bg-white p-2.5 border border-zinc-200/50 rounded-xl">
                      <span className="block font-mono text-[10px] text-zinc-400 uppercase">ALMM Certificate</span>
                      <strong className="block font-mono text-emerald-800 text-xs truncate">{modalProduct.almmCertNumber}</strong>
                    </div>

                    <div className="bg-white p-2.5 border border-zinc-200/50 rounded-xl">
                      <span className="block font-mono text-[10px] text-zinc-400 uppercase">Performance Warranty</span>
                      <strong className="text-zinc-900 text-sm">{modalProduct.warrantyYears} Years Linear</strong>
                    </div>

                    <div className="bg-white p-2.5 border border-zinc-200/50 rounded-xl">
                      <span className="block font-mono text-[10px] text-zinc-400 uppercase">Minimum Order</span>
                      <strong className="block text-zinc-900 text-xs truncate">{modalProduct.minOrderQuantity}</strong>
                    </div>
                  </div>
                </div>

                {/* Logistics & Escrow Safeguard Callout */}
                <div className="flex items-start gap-3 bg-emerald-50/70 p-3.5 border border-emerald-200/70 rounded-2xl">
                  <ShieldCheck className="mt-0.5 w-5 h-5 text-emerald-700 shrink-0" />
                  <div className="text-xs">
                    <span className="block font-bold text-emerald-950">Blind Video-Escrow Protection Enabled</span>
                    <p className="mt-0.5 font-sans text-emerald-800 leading-relaxed">
                      All dispatches from {modalProduct.depotLocation} undergo high-resolution electroluminescence (EL) crack detection and barcode tally prior to gate-out. Escrow payment is disbursed only after digital buyer delivery sign-off.
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="flex sm:flex-row flex-col justify-between sm:items-center gap-3 bg-zinc-50 p-4 sm:p-5 border-zinc-100 border-t">
                <div className="flex items-center gap-2">
                  <span className="font-sans font-medium text-zinc-600 text-xs">Cart Quantity:</span>
                  <div className="flex items-center bg-white shadow-2xs p-0.5 border border-zinc-200 rounded-xl">
                    <button
                      type="button"
                      onClick={() => decreaseCart(modalProduct.id)}
                      className="flex justify-center items-center hover:bg-zinc-100 rounded-lg w-7 h-7 font-bold text-zinc-700 transition-colors cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 font-mono font-bold text-zinc-950 text-xs text-center">
                      {cart[modalProduct.id] || 0}
                    </span>
                    <button
                      type="button"
                      onClick={() => increaseCart(modalProduct.id)}
                      className="flex justify-center items-center hover:bg-zinc-100 rounded-lg w-7 h-7 font-bold text-zinc-700 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      toggleWatchlist(modalProduct.id, modalProduct.name);
                    }}
                    className="flex items-center gap-1.5 bg-white hover:bg-zinc-100 px-3 py-2 border border-zinc-200 rounded-xl font-semibold text-zinc-700 text-xs cursor-pointer"
                  >
                    <Bookmark
                      className={`w-3.5 h-3.5 ${watchlist.includes(modalProduct.id) ? "fill-emerald-600 text-emerald-600" : ""
                        }`}
                    />
                    <span>{watchlist.includes(modalProduct.id) ? "Saved" : "Save to List"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      addToCart(modalProduct.id, modalProduct.name);
                      setModalProduct(null);
                    }}
                    className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 shadow-xs px-4 py-2 rounded-xl font-display font-bold text-white text-xs cursor-pointer"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Add to Dispatch Cart</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          SLIDE-OUT DISPATCH CART DRAWER
         ========================================================================= */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="z-50 fixed inset-0 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-zinc-950/50 backdrop-blur-xs"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="z-10 relative flex flex-col bg-white shadow-2xl border-zinc-200 border-l w-full max-w-md h-full"
            >
              {/* Cart Drawer Header */}
              <div className="flex justify-between items-center p-5 border-zinc-100 border-b">
                <div className="flex items-center gap-2">
                  <div className="flex justify-center items-center bg-emerald-100 rounded-xl w-8 h-8 text-emerald-800">
                    <ShoppingCart className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-zinc-950 text-base">
                      Dispatch Cart
                    </h3>
                    <p className="font-sans text-[11px] text-zinc-500">
                      {totalCartCount} items pending purchase order
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="flex justify-center items-center bg-zinc-100 hover:bg-zinc-200 rounded-full w-8 h-8 text-zinc-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 space-y-3 p-5 overflow-y-auto">
                {Object.keys(cart).length === 0 ? (
                  <div className="py-12 text-center">
                    <ShoppingCart className="mx-auto mb-2 w-8 h-8 text-zinc-300" />
                    <p className="font-sans text-zinc-500 text-xs">Your cart is empty.</p>
                  </div>
                ) : (
                  Object.entries(cart).map(([prodId, qty]) => {
                    const prod = INITIAL_PRODUCTS.find((p) => p.id === prodId);
                    if (!prod) return null;

                    return (
                      <div
                        key={prodId}
                        className="flex justify-between items-center gap-3 bg-zinc-50/80 p-3.5 border border-zinc-200/70 rounded-2xl"
                      >
                        <div className="min-w-0">
                          <span className="font-mono font-bold text-[10px] text-zinc-500 uppercase">
                            {prod.brand}
                          </span>
                          <h4 className="font-bold text-zinc-950 text-xs truncate">
                            {prod.name}
                          </h4>
                          <span className="font-mono font-bold text-emerald-800 text-xs">
                            {prod.pricePerWatt
                              ? `₹${prod.pricePerWatt.toFixed(2)}/Wp`
                              : `₹${prod.unitPrice?.toLocaleString()}`}
                          </span>
                        </div>

                        {/* Quantity Stepper */}
                        <div className="flex items-center bg-white shadow-2xs p-0.5 border border-zinc-200 rounded-xl shrink-0">
                          <button
                            type="button"
                            onClick={() => decreaseCart(prod.id)}
                            className="flex justify-center items-center hover:bg-zinc-100 rounded-lg w-6 h-6 font-bold text-zinc-700 transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 font-mono font-bold text-zinc-950 text-xs text-center">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => increaseCart(prod.id)}
                            className="flex justify-center items-center hover:bg-zinc-100 rounded-lg w-6 h-6 font-bold text-zinc-700 transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Cart Drawer Footer */}
              {Object.keys(cart).length > 0 && (
                <div className="space-y-3 bg-zinc-50 p-5 border-zinc-100 border-t">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-sans text-zinc-500">Estimated Pallet Value:</span>
                    <span className="font-mono font-black text-zinc-950 text-base">
                      ₹{totalCartValue.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      toast.success("Draft Purchase Order created with Escrow Lock!");
                      setIsCartOpen(false);
                    }}
                    className="flex justify-center items-center gap-2 bg-emerald-700 hover:bg-emerald-800 shadow-md py-3 rounded-2xl w-full font-display font-bold text-white text-xs active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <span>Proceed to Escrow Lock PO</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
