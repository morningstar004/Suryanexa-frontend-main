"use client";

import React, { useState, useMemo, useEffect } from "react";
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
  Star,
  Trash2,
  ChevronDown,
  Lock,
  Package,
} from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
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

// Staggered Container Variants for Marketplace View Entrance
const viewContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const widgetVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 24,
    },
  },
};

const cardGridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.02,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 280,
      damping: 22,
    },
  },
};

// Dispatch Cart list & item entrance variants
const cartListVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.035,
    },
  },
};

const cartItemVariants: Variants = {
  hidden: { opacity: 0, x: 16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 340,
      damping: 28,
    },
  },
  exit: {
    opacity: 0,
    x: 40,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

/**
 * Smooth dynamic counting number component that animates from previous value
 * to the target value with an ease-out deceleration curve.
 */
function CountingNumber({
  value,
  duration = 0.85,
  decimals = 0,
  prefix = "",
  suffix = "",
}: {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValueRef = React.useRef(value);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;
    const startVal = prevValueRef.current;
    const endVal = value;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // easeOutCubic curve for smooth decelerating rollout
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = startVal + (endVal - startVal) * ease;
      setDisplayValue(current);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      } else {
        setDisplayValue(endVal);
        prevValueRef.current = endVal;
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(animationFrame);
      prevValueRef.current = displayValue;
    };
  }, [value, duration]);

  const formatted =
    decimals > 0
      ? displayValue.toLocaleString("en-IN", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : Math.round(displayValue).toLocaleString("en-IN");

  return (
    <span className="tabular-nums">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

// Technical & Engineering Spec Types & Dynamic Resolver
interface TechSpec {
  label: string;
  value: string;
  sub?: string;
}

function getMoqNumber(minOrderQuantity?: string): number {
  if (!minOrderQuantity) return 1;
  const match = minOrderQuantity.match(/^(\d+)/);
  if (match) {
    const val = parseInt(match[1], 10);
    return val > 0 ? val : 1;
  }
  return 1;
}

function getCategorySpecs(prod: SolarProduct): TechSpec[] {
  if (prod.category === "STRUCTURES") {
    return [
      {
        label: "Material Grade",
        value: prod.cellType ? prod.cellType.split("(")[0].trim() : "Hot-Dip Galvanized Steel (HDG)",
        sub: "C-Channel Railing Spec",
      },
      {
        label: "Wind Load Rating",
        value: "180 km/h (Class-5 Zone)",
        sub: "IS 875 Part 3 Tested",
      },
      {
        label: "Corrosion Coating",
        value: "80-120 Micron Zinc Dip",
        sub: "25+ Year Outdoor Life",
      },
      {
        label: "IS Certification",
        value: prod.almmCertNumber || "IS-2062 & IS-875",
        sub: "Bureau of Indian Standards",
      },
      {
        label: "Structural Warranty",
        value: `${prod.warrantyYears || 15} Years Anti-Rust`,
        sub: "Factory Coating Guarantee",
      },
      {
        label: "Minimum Order (MOQ)",
        value: prod.minOrderQuantity || "10 Kits",
        sub: "Complete Hardware & Fasteners",
      },
    ];
  }

  if (prod.category === "INVERTERS") {
    const capKW = prod.capacityKW || (prod.wattage ? Math.round(prod.wattage / 1000) : 50);
    return [
      {
        label: "Rated AC Output",
        value: `${capKW} kW AC Continuous`,
        sub: "Three-Phase 415V Grid",
      },
      {
        label: "Peak Efficiency",
        value: `${prod.efficiency || 98.7}% Max Yield`,
        sub: "Euro-Efficiency 98.3%",
      },
      {
        label: "MPPT Channels",
        value: prod.cellType || "Multi-MPPT High-Yield",
        sub: "Independent String Optimizers",
      },
      {
        label: "Grid Standard",
        value: prod.almmCertNumber || "BIS-CRS / CEA Certified",
        sub: "Anti-Islanding & SPD Protection",
      },
      {
        label: "Equipment Warranty",
        value: `${prod.warrantyYears || 10} Years On-Site`,
        sub: "Authorized Service Network",
      },
      {
        label: "Minimum Order (MOQ)",
        value: prod.minOrderQuantity || "1 Unit",
        sub: "Heavy-Duty Wooden Crate",
      },
    ];
  }

  // Default: PANELS or other solar equipment
  return [
    {
      label: "Power Output",
      value: `${prod.wattage || 585} Wp STC`,
      sub: "Pmax Flash Test Certified",
    },
    {
      label: "Module Efficiency",
      value: `${prod.efficiency || 22.7}% Aperture`,
      sub: "High-Density Cell Packing",
    },
    {
      label: "Cell Architecture",
      value: prod.cellType || "N-Type TOPCon 16BB",
      sub: "Bifacial Double Glass",
    },
    {
      label: "ALMM Certificate",
      value: prod.almmCertNumber || "MNRE-ALMM Certified",
      sub: "Govt. Approved List (ALMM-I)",
    },
    {
      label: "Linear Warranty",
      value: `${prod.warrantyYears || 30} Years Performance`,
      sub: "≤ 0.40% Annual Degradation",
    },
    {
      label: "Minimum Order (MOQ)",
      value: prod.minOrderQuantity || "1 Full Pallet (36 pcs)",
      sub: "Forklift Depot Strapped",
    },
  ];
}

// 15ms stagger fade-in variants for technical spec cards
const specGridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.015,
      delayChildren: 0.04,
    },
  },
};

const modalSpecVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

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

  // Floating Cart Icon visibility on scroll
  const [showFloatingCart, setShowFloatingCart] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      setShowFloatingCart(scrollPos > 120);
    };

    window.addEventListener("scroll", handleScroll, { passive: true, capture: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll, { capture: true } as EventListenerOptions);
  }, []);

  // Pop-up Card (Solar Panel / Equipment detail modal)
  const [modalProduct, setModalProduct] = useState<SolarProduct | null>(null);
  const [modalQty, setModalQty] = useState<number>(1);

  // Initialize modal quantity to MOQ or current cart quantity when modal opens
  useEffect(() => {
    if (modalProduct) {
      const moq = getMoqNumber(modalProduct.minOrderQuantity);
      const inCart = cart[modalProduct.id];
      setModalQty(inCart && inCart >= moq ? inCart : moq);
    }
  }, [modalProduct, cart]);

  // Live calculated subtotal for the quick-view modal
  const modalSubtotal = useMemo(() => {
    if (!modalProduct) return 0;
    if (modalProduct.pricePerWatt) {
      const wattage = modalProduct.wattage || 580;
      return wattage * 36 * modalProduct.pricePerWatt * modalQty;
    }
    return (modalProduct.unitPrice || 3450) * modalQty;
  }, [modalProduct, modalQty]);

  // Prevent background page scrolling when the Dispatch Cart drawer or equipment modal is open
  useEffect(() => {
    if (isCartOpen || modalProduct !== null) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;

      // Compensate for scrollbar width to prevent horizontal layout shift
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }

      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [isCartOpen, modalProduct]);

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

  // Dispatch Cart state & handlers
  const [editingCartId, setEditingCartId] = useState<string | null>(null);
  const [editQtyValue, setEditQtyValue] = useState<string>("");
  const [isBreakdownOpen, setIsBreakdownOpen] = useState(false);

  const clearCart = () => {
    setCart({});
    toast.info("Dispatch Cart cleared");
  };

  const updateCartQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      decreaseCart(id);
    } else {
      setCart((prev) => ({
        ...prev,
        [id]: Math.min(999, Math.max(1, newQty)),
      }));
    }
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

  // B2B Load summary: Total system capacity in kW & estimated pallet load
  const cartCapacityStats = useMemo(() => {
    let totalKW = 0;
    let totalPallets = 0;
    Object.entries(cart).forEach(([prodId, qty]) => {
      const prod = INITIAL_PRODUCTS.find((p) => p.id === prodId);
      if (!prod) return;
      totalPallets += qty;
      if (prod.wattage) {
        // Standard 36 modules per pallet
        totalKW += ((prod.wattage * 36) / 1000) * qty;
      } else if (prod.capacityKW) {
        totalKW += prod.capacityKW * qty;
      } else {
        totalKW += 20 * qty;
      }
    });

    const truckloadPercent = Math.min(100, Math.round((totalPallets / 24) * 100));
    return {
      totalKW: Math.round(totalKW),
      totalPallets,
      truckloadPercent,
    };
  }, [cart]);

  // Financial breakdown values (Base Equipment, Freight, and GST)
  const breakdownValues = useMemo(() => {
    if (totalCartValue === 0) {
      return { baseEquipment: 0, freight: 0, gst: 0 };
    }
    const freight = Math.min(
      Math.round(totalCartValue * 0.035),
      cartCapacityStats.totalPallets * 2500
    );
    const taxableTotal = Math.round(totalCartValue / 1.138);
    const gst = totalCartValue - taxableTotal;
    const baseEquipment = taxableTotal - freight;
    return {
      baseEquipment: Math.max(0, baseEquipment),
      freight,
      gst,
    };
  }, [totalCartValue, cartCapacityStats.totalPallets]);

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

  // Total stock calculation for dynamic live telematics
  const totalStockMW = useMemo(() => {
    return INITIAL_PRODUCTS.reduce((sum, p) => sum + (p.availableStockMW || 0), 0);
  }, []);

  // Tab Definitions for Horizontal Navigation
  const NAV_TABS = [
    {
      id: "market" as MarketTab,
      label: "Spot Market",
      icon: Store,
      badge: <CountingNumber value={INITIAL_PRODUCTS.length} duration={0.8} />,
    },
    {
      id: "stock" as MarketTab,
      label: "Depot Stock",
      icon: Layers,
      badge: (
        <span className="inline-flex items-center gap-0.5">
          <CountingNumber value={totalStockMW} decimals={2} duration={0.8} /> MW
        </span>
      ),
    },
    {
      id: "my-list" as MarketTab,
      label: "My List",
      icon: Bookmark,
      badge: <CountingNumber value={watchlist.length} duration={0.5} />,
    },
  ];

  return (
    <motion.div
      variants={viewContainerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-5 bg-[#ECEFF0] pb-16 min-h-screen font-sans text-zinc-900 select-none"
    >
      {/* =========================================================================
          WIDGET 1: TOP COMMAND ROW: Title, Live Telematics & Quick Actions
         ========================================================================= */}
      <motion.div variants={widgetVariants} className="flex sm:flex-row flex-col justify-between sm:items-center gap-4 p-2.5 sm:p-5">
        <div>
          {/* Dynamic Breadcrumb Route matching selected tab */}
          <div className="flex items-center gap-2 mb-2 font-sans text-zinc-500 text-xs">
            <span className="flex items-center gap-1.5 hover:text-zinc-800 transition-colors">
              <Store className="w-3.5 h-3.5 text-zinc-400" />
              <span>Trader Portal</span>
            </span>
            <span className="font-mono text-zinc-400">{`>`}</span>
            <span className="font-medium text-zinc-600">Marketplace</span>
            <span className="font-mono text-zinc-400">{`>`}</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={activeTab}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.18 }}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 font-mono font-semibold text-[#0f766e] text-[11px]"
              >
                {activeTab === "market" && "Spot Market"}
                {activeTab === "stock" && "Depot Stock"}
                {activeTab === "my-list" && "My List"}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display font-extrabold text-zinc-950 text-2xl sm:text-3xl tracking-tight">
              National Solar Spot Marketplace
            </h1>
            <span className="inline-flex items-center gap-1.5 bg-emerald-50 shadow-2xs px-3 py-1 border border-emerald-200/90 rounded-full font-mono font-bold text-emerald-800 text-xs">
              <span className="bg-emerald-500 rounded-full w-2 h-2 animate-pulse" />
              <span>
                <CountingNumber value={totalStockMW} decimals={2} duration={1.1} /> MW Live Liquidity
              </span>
            </span>
          </div>
          <p className="mt-1 font-sans text-zinc-500 text-xs sm:text-sm">
            Inter-trader liquidity pool with <CountingNumber value={INITIAL_PRODUCTS.length} duration={0.9} /> Tier-1 verified allocations, bulk bids, and blind escrow guarantees.
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
              <CountingNumber value={watchlist.length} duration={0.5} />
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
                <CountingNumber value={totalCartCount} duration={0.4} />
              </motion.span>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* =========================================================================
          WIDGET 2: HORIZONTAL NAVIGATION STRIP: Stock, My List & Spot Market
         ========================================================================= */}
      <motion.div variants={widgetVariants} className="flex items-center">
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
      </motion.div>

      {/* =========================================================================
          WIDGET 3: CATEGORY CHIPS & SEARCH FILTER BAR (With dynamic counter chips)
         ========================================================================= */}
      <motion.div variants={widgetVariants} className="space-y-3">
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
                      <CountingNumber value={chip.count} duration={0.6} />
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* =========================================================================
          WIDGET 4: PRODUCT CARD GRID (Staggered cascade on entrance, filter & sort)
         ========================================================================= */}
      <motion.div
        key={`${activeTab}-${selectedCategory}-${sortBy}-${lowStockOnly}-${searchQuery ? "searched" : "all"}`}
        variants={cardGridVariants}
        initial="hidden"
        animate="visible"
        className="gap-2 gap-x-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {filteredProducts.map((prod) => {
          const isSaved = watchlist.includes(prod.id);
          const cartQty = cart[prod.id] || 0;

          return (
            <motion.div
              key={prod.id}
              layout
              variants={cardItemVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.15 }}
              className="group relative flex flex-col justify-between bg-white shadow-sm hover:shadow-xl p-3 border border-zinc-200/90 hover:border-emerald-300/80 rounded-3xl transition-all duration-300"
            >
              <div>
                {/* 2. Product Visual & Quick Telematics Overlay */}
                <div
                  onClick={() => setModalProduct(prod)}
                  className="group/img relative bg-gradient-to-b from-zinc-50 to-zinc-100/80 mb-2 border border-zinc-100 rounded-2xl h-56 overflow-hidden cursor-pointer"
                >
                  <img
                    src={prod.imageUrl}
                    alt={prod.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Bookmark to My List Toggle (Moved Inside Image Top-Right) */}
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWatchlist(prod.id, prod.name);
                    }}
                    className={`top-2.5 right-2.5 absolute z-10 w-8 h-8 rounded-full flex items-center justify-center shadow-xs backdrop-blur-md transition-all cursor-pointer ${isSaved
                      ? "text-emerald-700 shadow-sm"
                      : " hover:bg-zinc-300 text-white"
                      }`}
                    title={isSaved ? "Remove from My List" : "Save to My List"}
                  >
                    <Bookmark
                      className={`w-5 h-5 ${isSaved ? "fill-emerald-600 text-emerald-600" : ""
                        }`}
                    />
                  </motion.button>

                  {/* Telematics Pill: Better Sans Typography & ShieldCheck-like Hover Animation */}
                  <div className="bottom-2.5 left-2.5 absolute flex items-center bg-zinc-950/80 hover:bg-zinc-950/95 shadow-xs backdrop-blur-md px-2.5 py-1 border border-white/15 rounded-full text-white transition-all duration-300">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6, ease: [0.6, 0.05, 0.2, 1] }}
                      className="flex justify-center items-center mr-1.5"
                    >
                      <Zap className="fill-amber-400 w-3.5 h-3.5 text-amber-400 shrink-0" />
                    </motion.div>
                    <span className="font-sans font-bold text-[11px] text-white tracking-tight">
                      {prod.wattage ? `${prod.wattage}W` : "High Spec"}
                      <span className="mx-1 text-white/60">·</span>
                      <span className="font-semibold text-amber-300">
                        {prod.efficiency ? `${prod.efficiency}% Eff` : "ALMM Tier-1"}
                      </span>
                    </span>
                  </div>
                </div>

                {/* 3. Title & Depot Location with Company Logo & Name */}
                <h3
                  onClick={() => setModalProduct(prod)}
                  className="font-display font-bold text-zinc-950 hover:text-emerald-800 text-sm sm:text-base line-clamp-1 leading-snug transition-colors cursor-pointer"
                >
                  {prod.name}
                </h3>
                <div className="flex justify-between items-center gap-2 mt-1.5">
                  <p className="flex items-center gap-1 font-sans text-zinc-500 text-xs truncate">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span className="truncate">{prod.depotLocation}</span>
                  </p>

                  {/* Company Logo & Name Moved Here: Borderless & Transparent Background */}
                  <BrandBadge brand={prod.brand} iconSize={16} plain className="shrink-0" />
                </div>

                {/* Rating with Stars and Review Count */}
                <div className="flex items-center gap-1.5 mt-2.5 mb-1.5">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const ratingVal = prod.rating ?? 4.8;
                      const isFull = star <= Math.floor(ratingVal);
                      const isHalf = !isFull && star <= Math.ceil(ratingVal) && ratingVal % 1 >= 0.3;
                      return (
                        <Star
                          key={star}
                          className={`w-3 h-3 ${isFull
                            ? "fill-amber-400 text-amber-400"
                            : isHalf
                              ? "fill-amber-400/60 text-amber-400"
                              : "fill-zinc-200 text-zinc-200"
                            }`}
                        />
                      );
                    })}
                  </div>
                  <span className="font-bold text-[11px] text-zinc-900 leading-none">
                    {(prod.rating ?? 4.8).toFixed(1)}
                  </span>
                  <span className="font-sans text-[10.5px] text-zinc-400 leading-none">
                    (<CountingNumber value={prod.reviewsCount ?? 64} duration={0.7} />)
                  </span>
                </div>


                {/* 4. Compact Specifications Strip (Takes minimal height while staying clean & legible) */}
                <div className="bg-zinc-50/90 hover:bg-zinc-100/70 mt-2.5 px-2.5 py-1.5 border border-zinc-200/60 rounded-xl font-sans transition-colors">
                  <div className="flex justify-between items-center gap-2 text-xs">
                    <div className="flex items-baseline gap-1.5 min-w-0">
                      <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider shrink-0">
                        Stock
                      </span>
                      <span className="font-bold text-[11.5px] text-zinc-900 truncate">
                        <CountingNumber value={prod.availableStockMW} decimals={2} duration={0.8} /> MW
                      </span>
                      <span className="font-normal text-[10px] text-zinc-400 shrink-0">
                        (<CountingNumber value={prod.palletsCount} duration={0.8} /> plts)
                      </span>
                    </div>

                    <div className="flex items-baseline gap-1.5 shrink-0">
                      <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                        Min
                      </span>
                      <span
                        className="max-w-[105px] font-bold text-[11.5px] text-zinc-800 truncate"
                        title={prod.minOrderQuantity}
                      >
                        {prod.minOrderQuantity}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 mt-1 pt-1 border-zinc-200/50 border-t min-w-0">
                    <span className="font-mono text-[9.5px] text-zinc-400 uppercase tracking-wider shrink-0">
                      Tech
                    </span>
                    <span
                      className="font-medium text-[11px] text-zinc-600 truncate"
                      title={prod.cellType || "N-Type Monocrystalline Bifacial"}
                    >
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
                    {prod.pricePerWatt ? (
                      <>
                        ₹<CountingNumber value={prod.pricePerWatt} decimals={2} duration={0.8} />/Wp
                      </>
                    ) : (
                      <>
                        ₹<CountingNumber value={prod.unitPrice || 0} decimals={0} duration={0.8} />
                      </>
                    )}
                  </span>
                </div>

                {/* Interactive Add to Cart & Stepper */}
                <div className="flex items-center gap-2">
                  {/* Add to Cart / Quantity Stepper */}
                  {cartQty === 0 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => addToCart(prod.id, prod.name)}
                      className="flex items-center gap-1.5 bg-[#53BB90] hover:bg-emerald-600 shadow-xs px-3.5 py-2 rounded-xl font-display font-bold text-white text-xs transition-all cursor-pointer"
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
                        className="flex justify-center items-center bg-[#53BB90] hover:bg-emerald-600 rounded-lg w-7 h-7 font-bold text-white transition-colors cursor-pointer"
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
      </motion.div>

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
          POP-UP CARD (MODAL): Redesigned Two-Column Split Layout
         ========================================================================= */}
      <AnimatePresence>
        {modalProduct && (
          <div className="z-50 fixed inset-0 flex justify-center items-center p-3 sm:p-5 overflow-y-auto">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalProduct(null)}
              onTouchMove={(e) => e.preventDefault()}
              onWheel={(e) => e.preventDefault()}
              className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm transition-opacity"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
              className="z-10 relative flex flex-col bg-white shadow-2xl border border-zinc-200 rounded-2xl w-[94vw] max-w-[880px] max-h-[92vh] overflow-hidden"
            >
              {/* Minimal Top Header */}
              <div className="px-6 py-3.5 border-b border-zinc-100 flex justify-between items-center bg-white shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="flex justify-center items-center bg-emerald-50 border border-emerald-200/70 rounded-lg w-7 h-7 text-[#047857]">
                    <Sparkles className="w-4 h-4 text-[#047857]" />
                  </div>
                  <h3 className="font-display font-extrabold text-zinc-950 text-sm sm:text-base leading-tight">
                    Equipment Telematics &amp; Spot Specs
                  </h3>
                  <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-50 text-[#047857] border border-emerald-200/80">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#047857]" />
                    <span>Blind Escrow Guaranteed</span>
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setModalProduct(null)}
                  className="flex justify-center items-center bg-zinc-100 hover:bg-zinc-200 rounded-full w-8 h-8 text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer"
                  title="Close Modal"
                  aria-label="Close Modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Split Body: 12-Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-y-auto">
                {/* Left Column (md:col-span-5) */}
                <div className="md:col-span-5 bg-zinc-50/70 p-5 sm:p-6 border-b md:border-b-0 md:border-r border-zinc-100 flex flex-col justify-between gap-4">
                  {/* 1. 4:3 Product Stage */}
                  <div className="aspect-[4/3] rounded-xl bg-white border border-zinc-200/80 overflow-hidden relative shadow-2xs flex items-center justify-center group">
                    <img
                      src={modalProduct.imageUrl}
                      alt={modalProduct.name}
                      className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Floating bottom-left pills */}
                    <div className="absolute bottom-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
                      <span className="px-2 py-0.5 rounded-md bg-zinc-950/80 backdrop-blur-xs text-white font-mono text-[10px] font-semibold">
                        Industrial Spec
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#047857]/90 backdrop-blur-xs text-white font-mono text-[10px] font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                        Ready to Dispatch
                      </span>
                    </div>
                  </div>

                  {/* 2. Warehouse & Verification Card */}
                  <div className="bg-white rounded-xl border border-zinc-200/80 p-3.5 space-y-2.5 shadow-2xs">
                    <div className="flex items-start gap-2">
                      <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                      <div>
                        <span className="block font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                          Depot Fulfillment Hub
                        </span>
                        <span className="font-sans font-bold text-zinc-900 text-xs leading-snug block">
                          {modalProduct.depotLocation}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-zinc-100 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3.5 h-3.5 ${
                                star <= Math.floor(modalProduct.rating ?? 4.8)
                                  ? "fill-amber-400 text-amber-400"
                                  : "fill-zinc-200 text-zinc-200"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-bold text-zinc-900 text-xs">
                          {(modalProduct.rating ?? 4.8).toFixed(1)} ★
                        </span>
                      </div>
                      <span className="font-sans text-zinc-500 text-[11px]">
                        {modalProduct.reviewsCount ?? 64} verified buyer reviews
                      </span>
                    </div>

                    <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-500">Live Available Stock:</span>
                      <span className="font-bold text-emerald-800">
                        {modalProduct.availableStockMW} MW{" "}
                        <span className="text-zinc-500 font-normal">
                          ({modalProduct.palletsCount} plts)
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column (md:col-span-7) */}
                <div className="md:col-span-7 p-5 sm:p-6 flex flex-col justify-between gap-5">
                  <div className="space-y-4">
                    {/* 1. Title & Commercial Price Block */}
                    <div>
                      <div className="flex items-center gap-2">
                        <BrandBadge brand={modalProduct.brand} iconSize={20} />
                        <span className="font-mono text-[10.5px] font-bold text-zinc-400 uppercase tracking-wider">
                          {modalProduct.category}
                        </span>
                      </div>
                      <h2 className="mt-1.5 font-display font-bold text-zinc-900 text-lg sm:text-xl leading-snug">
                        {modalProduct.name}
                      </h2>
                    </div>

                    {/* Horizontal Price Bar */}
                    <div className="bg-emerald-50/70 border border-emerald-200/70 rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-2 shadow-2xs">
                      <div>
                        <span className="block font-mono text-[10px] text-emerald-800 uppercase tracking-wider">
                          Spot Rate
                        </span>
                        <span className="font-mono font-black text-emerald-950 text-xl">
                          {modalProduct.pricePerWatt ? (
                            <>₹{modalProduct.pricePerWatt.toFixed(2)} / Wp</>
                          ) : modalProduct.category === "STRUCTURES" ? (
                            <>₹{modalProduct.unitPrice?.toLocaleString("en-IN")} / kit</>
                          ) : (
                            <>₹{modalProduct.unitPrice?.toLocaleString("en-IN")} / Unit</>
                          )}
                        </span>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <span className="font-mono text-[10.5px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md border border-emerald-200/60">
                          Ex-Depot Escrow Locked
                        </span>
                        <span className="font-sans text-[11px] text-emerald-950 font-medium">
                          Min. Order: {modalProduct.minOrderQuantity}
                        </span>
                      </div>
                    </div>

                    {/* 2. Technical & Engineering Specifications (2x3 Grid) */}
                    <div>
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <Zap className="w-3.5 h-3.5 text-amber-500" />
                        <h4 className="font-display font-bold text-zinc-950 text-xs uppercase tracking-wider">
                          Technical &amp; Engineering Specifications
                        </h4>
                      </div>

                      <motion.div
                        variants={specGridVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-sans"
                      >
                        {getCategorySpecs(modalProduct).map((spec) => (
                          <motion.div
                            key={spec.label}
                            variants={modalSpecVariants}
                            className="bg-zinc-50 border border-zinc-200/70 rounded-lg p-3 flex flex-col justify-between"
                          >
                            <span className="block font-mono text-[10px] text-zinc-400 uppercase tracking-wider mb-1">
                              {spec.label}
                            </span>
                            <span className="block font-bold text-zinc-900 text-xs leading-tight break-words">
                              {spec.value}
                            </span>
                            {spec.sub && (
                              <span className="block font-sans text-[10px] text-zinc-500 mt-1 leading-none">
                                {spec.sub}
                              </span>
                            )}
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </div>

                  {/* 3. Docked Action & Live Subtotal Bar */}
                  <div className="pt-4 mt-auto border-t border-zinc-100 space-y-3">
                    {/* Stepper & Live Calculated Subtotal */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-sans font-medium text-zinc-600 text-xs">
                          Order Quantity:
                        </span>
                        <div className="flex items-center bg-zinc-50 p-0.5 border border-zinc-200 rounded-xl shadow-2xs">
                          <button
                            type="button"
                            onClick={() => setModalQty((prev) => Math.max(1, prev - 1))}
                            className="flex justify-center items-center hover:bg-white rounded-lg w-7 h-7 font-bold text-zinc-700 transition-colors cursor-pointer active:scale-90"
                            title="Decrease quantity"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <input
                            type="number"
                            min="1"
                            max="9999"
                            value={modalQty}
                            onChange={(e) => {
                              const parsed = parseInt(e.target.value, 10);
                              if (!isNaN(parsed) && parsed > 0) {
                                setModalQty(parsed);
                              } else if (e.target.value === "") {
                                setModalQty(1);
                              }
                            }}
                            className="w-12 font-mono font-black text-zinc-950 text-xs text-center bg-transparent outline-hidden"
                          />
                          <button
                            type="button"
                            onClick={() => setModalQty((prev) => prev + 1)}
                            className="flex justify-center items-center hover:bg-white rounded-lg w-7 h-7 font-bold text-zinc-700 transition-colors cursor-pointer active:scale-90"
                            title="Increase quantity"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="block font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                          Estimated Subtotal
                        </span>
                        <span className="font-mono font-black text-zinc-950 text-base sm:text-lg tabular-nums">
                          <CountingNumber value={modalSubtotal} decimals={0} prefix="₹" duration={0.25} />
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons: Save to List & Add to Dispatch Cart */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleWatchlist(modalProduct.id, modalProduct.name)}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-white hover:bg-zinc-100 py-2.5 px-4 border border-zinc-200 rounded-xl font-semibold text-zinc-700 text-xs transition-colors cursor-pointer"
                      >
                        <Bookmark
                          className={`w-3.5 h-3.5 ${
                            watchlist.includes(modalProduct.id)
                              ? "fill-emerald-600 text-emerald-600"
                              : "text-zinc-500"
                          }`}
                        />
                        <span>
                          {watchlist.includes(modalProduct.id) ? "Saved to Watchlist" : "Save to List"}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setCart((prev) => ({
                            ...prev,
                            [modalProduct.id]: (prev[modalProduct.id] || 0) + modalQty,
                          }));
                          toast.success(
                            `Added ${modalQty} ${
                              modalProduct.category === "STRUCTURES" ? "kits" : "units/pallets"
                            } of ${modalProduct.name} to Dispatch Cart`
                          );
                          setModalProduct(null);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 bg-[#047857] hover:bg-[#036549] shadow-xs py-2.5 px-4 rounded-xl font-display font-bold text-white text-xs sm:text-sm active:scale-[0.98] transition-all cursor-pointer"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add to Dispatch Cart</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          SLIDE-OUT DISPATCH CART DRAWER (FULL-HEIGHT DOCKED RIGHT DRAWER)
         ========================================================================= */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="z-50 fixed inset-0 overflow-hidden">
            {/* Dark Backdrop */}
            <motion.div
              key="cart-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              onTouchMove={(e) => e.preventDefault()}
              onWheel={(e) => e.preventDefault()}
              className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm transition-opacity"
            />

            {/* Docked Drawer Container */}
            <motion.div
              key="cart-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 36, mass: 0.8 }}
              className="fixed inset-y-0 right-0 z-50 flex flex-col w-full max-w-[460px] bg-white border-l border-zinc-200 shadow-[-20px_0_50px_rgba(9,9,11,0.12)] h-full overflow-hidden"
            >
              {/* 1. STICKY HEADER */}
              <div className="sticky top-0 z-20 bg-white border-b border-zinc-200/90 shrink-0">
                {/* Top Row: Cart icon badge, title, subtitle, Clear All & Close button */}
                <div className="flex justify-between items-center p-4 sm:p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex justify-center items-center bg-emerald-50 border border-emerald-200/60 rounded-xl w-10 h-10 text-[#047857] shrink-0 shadow-2xs">
                      <ShoppingCart className="w-5 h-5 text-[#047857]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-extrabold text-zinc-950 text-base sm:text-lg tracking-tight">
                          Dispatch Cart
                        </h3>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10.5px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                          B2B
                        </span>
                      </div>
                      <p className="font-sans text-xs text-zinc-500">
                        {totalCartCount} item{totalCartCount !== 1 ? "s" : ""} pending purchase order
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {totalCartCount > 0 && (
                      <button
                        type="button"
                        onClick={clearCart}
                        className="font-sans text-xs font-semibold text-zinc-400 hover:text-rose-600 transition-colors px-2.5 py-1 rounded-lg hover:bg-rose-50 cursor-pointer"
                        title="Clear all cart items"
                      >
                        Clear All
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setIsCartOpen(false)}
                      className="flex justify-center items-center bg-zinc-100 hover:bg-zinc-200 rounded-full w-8 h-8 text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer"
                      aria-label="Close cart"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Sub-bar: Compact B2B Load Summary Bar */}
                <div className="px-4 sm:px-5 py-2.5 bg-zinc-50/90 border-t border-zinc-100 flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-[11px] font-sans">
                    <span className="text-zinc-600 font-medium flex items-center gap-1.5">
                      <span>Truckload Load</span>
                      <span className="font-mono font-bold text-zinc-900">
                        {cartCapacityStats.totalPallets} / 24 plts
                      </span>
                    </span>
                    <span className="font-mono font-extrabold text-[#047857]">
                      {cartCapacityStats.totalKW >= 1000
                        ? `${(cartCapacityStats.totalKW / 1000).toFixed(2)} MW Total`
                        : `${cartCapacityStats.totalKW} kW Total`}
                    </span>
                  </div>
                  {/* Thin #10B981 progress indicator */}
                  <div className="w-full h-1 bg-zinc-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${cartCapacityStats.truckloadPercent}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="h-full bg-[#10B981] rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* 2. SCROLLABLE ITEM LIST with custom 4px scrollbar */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#D4D4D8] [&::-webkit-scrollbar-thumb]:rounded-full">
                {Object.keys(cart).length === 0 ? (
                  <div className="py-20 text-center flex flex-col items-center justify-center">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-400 mb-3 shadow-inner">
                      <ShoppingCart className="w-7 h-7" />
                    </div>
                    <h4 className="font-display font-bold text-zinc-900 text-sm">
                      Your Dispatch Cart is empty
                    </h4>
                    <p className="font-sans text-zinc-500 text-xs mt-1 max-w-[240px]">
                      Add equipment or pallet lots from the Spot Market to begin an escrow dispatch.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsCartOpen(false)}
                      className="mt-5 inline-flex items-center gap-1.5 px-4 py-2 bg-[#047857] hover:bg-[#036549] text-white font-display font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      <Store className="w-3.5 h-3.5" />
                      <span>Browse Spot Market</span>
                    </button>
                  </div>
                ) : (
                  <motion.div
                    variants={cartListVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-3"
                  >
                    <AnimatePresence mode="popLayout">
                      {Object.entries(cart).map(([prodId, qty]) => {
                        const prod = INITIAL_PRODUCTS.find((p) => p.id === prodId);
                        if (!prod) return null;

                        const itemRate = prod.pricePerWatt;
                        const itemWattage = prod.wattage || 580;
                        const itemSubtotal = itemRate
                          ? itemWattage * 36 * itemRate * qty
                          : (prod.unitPrice || 50000) * qty;

                        return (
                          <motion.div
                            key={prodId}
                            layout
                            variants={cartItemVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="flex items-center justify-between gap-3 bg-zinc-50/90 hover:bg-zinc-50 p-3.5 border border-zinc-200/75 hover:border-zinc-300 rounded-2xl transition-colors shadow-2xs group"
                          >
                            {/* Left Thumbnail (44px x 44px rounded-lg #F4F4F5) */}
                            <div className="w-[44px] h-[44px] rounded-lg bg-[#F4F4F5] border border-zinc-200/80 overflow-hidden shrink-0 flex items-center justify-center">
                              {prod.imageUrl ? (
                                <img
                                  src={prod.imageUrl}
                                  alt={prod.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              ) : (
                                <Package className="w-5 h-5 text-zinc-400" />
                              )}
                            </div>

                            {/* Middle Details */}
                            <div className="min-w-0 flex-1">
                              <span className="font-mono font-bold text-[10px] text-zinc-400 uppercase tracking-wider block">
                                {prod.brand}
                              </span>
                              <h4
                                className="font-bold text-zinc-950 text-xs truncate max-w-[170px] sm:max-w-[190px]"
                                title={prod.name}
                              >
                                {prod.name}
                              </h4>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="font-mono text-[11px] text-zinc-500">
                                  {prod.pricePerWatt ? (
                                    <>₹{prod.pricePerWatt.toFixed(2)}/Wp • {itemWattage}W</>
                                  ) : (
                                    <>₹{(prod.unitPrice || 0).toLocaleString("en-IN")}/Unit • {prod.capacityKW || 50}kW</>
                                  )}
                                </span>
                              </div>
                              <span className="font-mono font-bold text-zinc-900 text-xs tabular-nums block mt-0.5">
                                ₹{Math.round(itemSubtotal).toLocaleString("en-IN")}
                              </span>
                            </div>

                            {/* Interactive Stepper */}
                            <div className="flex items-center bg-white shadow-2xs p-0.5 border border-zinc-200 rounded-xl shrink-0">
                              {qty === 1 ? (
                                <button
                                  type="button"
                                  onClick={() => decreaseCart(prod.id)}
                                  className="flex justify-center items-center hover:bg-rose-50 rounded-lg w-7 h-7 text-rose-500 hover:text-rose-600 transition-colors cursor-pointer active:scale-90"
                                  title="Remove item"
                                  aria-label="Remove item"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => decreaseCart(prod.id)}
                                  className="flex justify-center items-center hover:bg-zinc-100 rounded-lg w-7 h-7 font-bold text-zinc-700 transition-colors cursor-pointer active:scale-90"
                                  title="Decrease quantity"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                              )}

                              {/* Editable Quantity with PopLayout Odometer */}
                              {editingCartId === prodId ? (
                                <input
                                  type="number"
                                  min="1"
                                  max="999"
                                  value={editQtyValue}
                                  autoFocus
                                  onChange={(e) => setEditQtyValue(e.target.value)}
                                  onBlur={() => {
                                    const parsed = parseInt(editQtyValue, 10);
                                    if (!isNaN(parsed) && parsed > 0) {
                                      updateCartQuantity(prodId, parsed);
                                    }
                                    setEditingCartId(null);
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      const parsed = parseInt(editQtyValue, 10);
                                      if (!isNaN(parsed) && parsed > 0) {
                                        updateCartQuantity(prodId, parsed);
                                      }
                                      setEditingCartId(null);
                                    } else if (e.key === "Escape") {
                                      setEditingCartId(null);
                                    }
                                  }}
                                  className="w-8 text-center font-mono font-black text-xs text-zinc-950 bg-emerald-50 border border-emerald-300 rounded px-0.5 py-0.5 outline-hidden"
                                />
                              ) : (
                                <AnimatePresence mode="popLayout" initial={false}>
                                  <motion.span
                                    key={qty}
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -10, opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                    onClick={() => {
                                      setEditingCartId(prodId);
                                      setEditQtyValue(String(qty));
                                    }}
                                    title="Click to type custom quantity"
                                    className="w-7 font-mono font-black text-zinc-950 text-xs text-center cursor-pointer hover:bg-zinc-100 rounded py-0.5 select-none"
                                  >
                                    {qty}
                                  </motion.span>
                                </AnimatePresence>
                              )}

                              <button
                                type="button"
                                onClick={() => increaseCart(prod.id)}
                                className="flex justify-center items-center hover:bg-zinc-100 rounded-lg w-7 h-7 font-bold text-zinc-700 transition-colors cursor-pointer active:scale-90"
                                title="Increase quantity"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </motion.div>
                )}
              </div>

              {/* 3. GLASSMORPHIC STICKY FOOTER */}
              {Object.keys(cart).length > 0 && (
                <div className="sticky bottom-0 bg-white/90 backdrop-blur-md border-t border-zinc-200 p-5 space-y-3.5 shadow-[-10px_-10px_30px_rgba(0,0,0,0.03)] shrink-0">
                  {/* Estimated Pallet Value + Accordion Chevron */}
                  <div>
                    <div className="flex justify-between items-center text-xs">
                      <button
                        type="button"
                        onClick={() => setIsBreakdownOpen((prev) => !prev)}
                        className="flex items-center gap-1.5 font-sans font-semibold text-zinc-600 hover:text-zinc-950 transition-colors group cursor-pointer"
                      >
                        <span>Estimated Pallet Value</span>
                        <motion.span
                          animate={{ rotate: isBreakdownOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="inline-flex text-zinc-400 group-hover:text-zinc-800"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </motion.span>
                      </button>

                      <span className="font-mono font-black text-zinc-950 text-lg tabular-nums">
                        <CountingNumber value={totalCartValue} decimals={0} prefix="₹" duration={0.3} />
                      </span>
                    </div>

                    {/* Expandable Breakdown Accordion */}
                    <AnimatePresence>
                      {isBreakdownOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pt-2.5 mt-2.5 pb-1 space-y-2 border-t border-zinc-100 font-sans text-xs">
                            <div className="flex justify-between text-zinc-500">
                              <span>Base Equipment</span>
                              <span className="font-mono font-bold text-zinc-800 tabular-nums">
                                ₹{breakdownValues.baseEquipment.toLocaleString("en-IN")}
                              </span>
                            </div>
                            <div className="flex justify-between text-zinc-500">
                              <span>Freight & Palletization</span>
                              <span className="font-mono font-bold text-zinc-800 tabular-nums">
                                ₹{breakdownValues.freight.toLocaleString("en-IN")}
                              </span>
                            </div>
                            <div className="flex justify-between text-zinc-500">
                              <span>GST (Composite Solar 13.8%)</span>
                              <span className="font-mono font-bold text-zinc-800 tabular-nums">
                                ₹{breakdownValues.gst.toLocaleString("en-IN")}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Proceed to Escrow Lock PO CTA Button */}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => {
                      toast.success("Draft Purchase Order created with Escrow Lock!");
                      setIsCartOpen(false);
                    }}
                    className="relative group overflow-hidden flex items-center justify-between bg-[#047857] hover:bg-[#036549] text-white px-5 py-3.5 rounded-2xl w-full shadow-lg hover:shadow-emerald-900/25 transition-all duration-200 cursor-pointer"
                  >
                    {/* Diagonal light sheen sweep */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-black/15 flex items-center justify-center">
                        <Lock className="w-3.5 h-3.5 text-[#F59E0B]" />
                      </div>
                      <span className="font-display font-bold text-sm tracking-tight">
                        Proceed to Escrow Lock PO
                      </span>
                    </div>

                    <div className="flex items-center">
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </motion.button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          CIRCULAR FLOATING CART BUTTON (Appears upon scrolling away from top)
         ========================================================================= */}
      <AnimatePresence>
        {showFloatingCart && (
          <motion.button
            key="floating-cart-btn"
            type="button"
            initial={{ opacity: 0, scale: 0.5, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 24 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 360, damping: 24 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-[#53BB90] hover:bg-emerald-600 text-white rounded-full shadow-xl hover:shadow-2xl hover:shadow-emerald-600/30 border-2 border-white cursor-pointer group"
            title={`Dispatch Cart (${totalCartCount} items)`}
            aria-label="Open Dispatch Cart"
          >
            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:scale-110" />
            {totalCartCount > 0 && (
              <motion.span
                key={totalCartCount}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 flex items-center justify-center min-w-[22px] h-[22px] px-1 bg-zinc-950 text-white font-mono font-bold text-[10.5px] rounded-full border-2 border-white shadow-sm"
              >
                {totalCartCount}
              </motion.span>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
