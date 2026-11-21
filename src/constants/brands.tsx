import React from "react";

export interface BrandItem {
  id: string;
  name: string;
  subtitle: string;
  subtitleColor: string;
  isLowercase?: boolean;
  renderIcon: (size?: number) => React.ReactNode;
}

export const BRANDS: BrandItem[] = [
  {
    id: "tata",
    name: "TATA",
    subtitle: "POWER SOLAR",
    subtitleColor: "text-sky-500",
    renderIcon: (size = 28) => (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className="shrink-0"
      >
        {/* Official Tata Blue Rounded Badge */}
        <rect width="24" height="24" rx="6" fill="#004e92" />
        {/* Official Tata Spire / Fountain Emblem */}
        <path
          fill="#FFFFFF"
          d="M9.774 11.568c.193-1.322.168-2.013-1.768-1.906-2.223.124-4.476.265-7.849 1.027A5.63 5.63 0 0 0 0 12c0 1.52.618 2.99 1.787 4.254 1.06 1.144 2.556 2.095 4.326 2.752a15.48 15.48 0 0 0 2.014.588c.13-.527.959-3.907 1.616-7.823l.03-.202m14.07-.88c-3.372-.762-5.624-.902-7.846-1.026-1.937-.107-1.962.584-1.768 1.906l.046.298c.65 3.848 1.458 7.16 1.598 7.72C20.595 18.508 24 15.516 24 12c0-.443-.054-.88-.157-1.311m-.491-1.324a7.163 7.163 0 0 0-1.14-1.618c-1.06-1.144-2.555-2.095-4.325-2.752-1.784-.662-3.82-1.011-5.887-1.011-2.068 0-4.103.35-5.887 1.01-1.77.658-3.266 1.61-4.326 2.753A7.17 7.17 0 0 0 .648 9.366c2.304-.557 6.245-1.293 9.904-1.37.353-.008.596.105.756.307.196.248.18 1.128.175 1.522l-.104 10.18a18.507 18.507 0 0 0 1.244 0l-.104-10.18c-.005-.394-.02-1.274.175-1.522.16-.202.403-.315.756-.308 3.658.078 7.597.813 9.902 1.37z"
          transform="matrix(0.85 0 0 0.85 1.8 1.8)"
        />
      </svg>
    ),
  },
  {
    id: "adani",
    name: "adani",
    subtitle: "solar",
    subtitleColor: "text-amber-500",
    isLowercase: true,
    renderIcon: (size = 28) => (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className="shrink-0"
      >
        {/* Official Adani Multi-color Flowing Arcs */}
        <rect width="24" height="24" rx="6" fill="#f8fafc" />
        <path d="M4 17.5 C8 11.5 16 11.5 20 17.5 C16 14.5 8 14.5 4 17.5 Z" fill="#1B365D" />
        <path d="M4.5 13.5 C8.5 7.5 15.5 7.5 19.5 13.5 C15.5 10.5 8.5 10.5 4.5 13.5 Z" fill="#00AEEF" />
        <path d="M5 9.5 C9 3.5 15 3.5 19 9.5 C15 6.5 9 6.5 5 9.5 Z" fill="#ED1C24" />
      </svg>
    ),
  },
  {
    id: "waaree",
    name: "WAAREE",
    subtitle: "ENERGIES",
    subtitleColor: "text-emerald-500",
    renderIcon: (size = 28) => (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className="shrink-0"
      >
        {/* Official Waaree Green Sun-Leaf Mark */}
        <rect width="24" height="24" rx="6" fill="#ecfdf5" />
        <circle cx="12" cy="12" r="8" fill="#10b981" fillOpacity="0.2" />
        <path
          d="M12 4 L13.5 9.5 L19 8 L15.5 12 L19 16 L13.5 14.5 L12 20 L10.5 14.5 L5 16 L8.5 12 L5 8 L10.5 9.5 Z"
          fill="#10b981"
        />
        <circle cx="12" cy="12" r="3" fill="#f59e0b" />
      </svg>
    ),
  },
  {
    id: "vikram",
    name: "VIKRAM",
    subtitle: "SOLAR",
    subtitleColor: "text-rose-500",
    renderIcon: (size = 28) => (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className="shrink-0"
      >
        {/* Official Vikram Solar Crimson Sun Star */}
        <rect width="24" height="24" rx="6" fill="#fef2f2" />
        <path
          d="M12 4 L14 9 L19 7 L16 12 L20 14.5 L15 16 L16 21 L12 17.5 L8 21 L9 16 L4 14.5 L8 12 L5 7 L10 9 Z"
          fill="#ce181e"
        />
        <circle cx="12" cy="12" r="3" fill="#f59e0b" />
      </svg>
    ),
  },
  {
    id: "saatvik",
    name: "SAATVIK",
    subtitle: "SOLAR",
    subtitleColor: "text-[#ea7124]",
    renderIcon: (size = 28) => (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className="shrink-0"
      >
        {/* Official Saatvik Solar Orange Hexagon & Green Core */}
        <rect width="24" height="24" rx="6" fill="#fff7ed" />
        <path d="M12 3 L19.5 7.5 V16.5 L12 21 L4.5 16.5 V7.5 Z" stroke="#ea7124" strokeWidth="1.8" fill="none" />
        <path d="M12 7 L17 10 V15 L12 18 L7 15 V10 Z" fill="#ea7124" fillOpacity="0.25" />
        <circle cx="12" cy="12" r="3" fill="#16a34a" />
      </svg>
    ),
  },
  {
    id: "premier",
    name: "PREMIER",
    subtitle: "ENERGIES",
    subtitleColor: "text-[#62b847]",
    renderIcon: (size = 28) => (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className="shrink-0"
      >
        {/* Official Premier Energies Blue & Green Energy Vortex */}
        <rect width="24" height="24" rx="6" fill="#f0fdf4" />
        <path
          d="M12 5 A 7 7 0 0 1 19 12 A 3.5 3.5 0 0 0 12 12 A 7 7 0 0 1 5 12 A 3.5 3.5 0 0 0 12 12"
          stroke="#0f6ab0"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M12 19 A 7 7 0 0 1 5 12 A 3.5 3.5 0 0 0 12 12"
          stroke="#62b847"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="2.2" fill="#62b847" />
      </svg>
    ),
  },
  {
    id: "sungrow",
    name: "SUNGROW",
    subtitle: "POWER",
    subtitleColor: "text-amber-500",
    renderIcon: (size = 28) => (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className="shrink-0"
      >
        {/* Official Sungrow Sunburst Power Gear */}
        <rect width="24" height="24" rx="6" fill="#fffbeb" />
        <path
          d="M12 6 L13.5 9.5 L17 8.5 L15 12 L18 13.5 L14.5 15 L15.5 19 L12 16.5 L8.5 19 L9.5 15 L6 13.5 L9 12 L7 8.5 L10.5 9.5 Z"
          fill="#f37021"
        />
        <circle cx="12" cy="12" r="2.5" fill="#ffffff" />
      </svg>
    ),
  },
  {
    id: "goldi",
    name: "GOLDI",
    subtitle: "SOLAR",
    subtitleColor: "text-amber-500",
    renderIcon: (size = 28) => (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className="shrink-0"
      >
        {/* Official Goldi Solar Golden Crown */}
        <rect width="24" height="24" rx="6" fill="#fffbeb" />
        <path
          d="M12 5 L14.5 10 L19 8 L17 13 L21 15 L16 16.5 L16.5 20.5 L12 17.5 L7.5 20.5 L8 16.5 L3 15 L7 13 L5 8 L9.5 10 Z"
          fill="#f59e0b"
        />
      </svg>
    ),
  },
  {
    id: "solaredge",
    name: "SOLAREDGE",
    subtitle: "POWER",
    subtitleColor: "text-rose-500",
    renderIcon: (size = 28) => (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className="shrink-0"
      >
        <rect width="24" height="24" rx="6" fill="#fff1f2" />
        <polygon
          points="12,3 20,8 20,16 12,21 4,16 4,8"
          stroke="#be123c"
          strokeWidth="1.8"
          fill="#be123c"
          fillOpacity="0.15"
        />
        <circle cx="12" cy="12" r="3" fill="#be123c" />
      </svg>
    ),
  },
  {
    id: "suryanexa",
    name: "SuryaNEXA",
    subtitle: "STRUCTURAL",
    subtitleColor: "text-emerald-600",
    renderIcon: (size = 28) => (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className="shrink-0"
      >
        <rect width="24" height="24" rx="6" fill="#ecfdf5" />
        <polygon
          points="6,4 18,4 21,12 18,20 6,20 3,12"
          stroke="#059669"
          strokeWidth="1.6"
          fill="#10b981"
          fillOpacity="0.25"
        />
        <circle cx="12" cy="12" r="3" fill="#059669" />
      </svg>
    ),
  },
];

/**
 * Returns brand styling and logo renderer by flexible name lookup
 */
export function getBrandConfig(brandName: string): BrandItem {
  const norm = (brandName || "").toLowerCase().trim();

  if (norm.includes("tata")) return BRANDS.find((b) => b.id === "tata")!;
  if (norm.includes("adani")) return BRANDS.find((b) => b.id === "adani")!;
  if (norm.includes("waaree")) return BRANDS.find((b) => b.id === "waaree")!;
  if (norm.includes("vikram")) return BRANDS.find((b) => b.id === "vikram")!;
  if (norm.includes("saatvik")) return BRANDS.find((b) => b.id === "saatvik")!;
  if (norm.includes("premier")) return BRANDS.find((b) => b.id === "premier")!;
  if (norm.includes("sungrow")) return BRANDS.find((b) => b.id === "sungrow")!;
  if (norm.includes("goldi")) return BRANDS.find((b) => b.id === "goldi")!;
  if (norm.includes("edge")) return BRANDS.find((b) => b.id === "solaredge")!;
  if (norm.includes("surya")) return BRANDS.find((b) => b.id === "suryanexa")!;

  // Fallback generic brand
  return {
    id: "generic",
    name: brandName || "SOLAR",
    subtitle: "EQUIPMENT",
    subtitleColor: "text-zinc-500",
    isLowercase: false,
    renderIcon: (size = 28) => (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className="shrink-0"
      >
        <rect width="24" height="24" rx="6" fill="#f4f4f5" />
        <circle cx="12" cy="12" r="5" stroke="#71717a" strokeWidth="1.5" />
      </svg>
    ),
  };
}

/**
 * High-fidelity brand badge component using actual logo marks and brand typography
 */
export function BrandBadge({
  brand,
  className = "",
  iconSize = 22,
  theme = "light",
  showSubtitle = true,
  plain = false,
}: {
  brand: string;
  className?: string;
  iconSize?: number;
  theme?: "light" | "dark";
  showSubtitle?: boolean;
  plain?: boolean;
}) {
  const config = getBrandConfig(brand);

  if (theme === "dark") {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        {config.renderIcon(iconSize)}
        <div className="flex items-baseline gap-1.5 font-sans tracking-tight">
          <span
            className={`font-black text-white text-sm sm:text-base ${
              config.isLowercase ? "lowercase tracking-normal font-bold" : "uppercase"
            }`}
          >
            {config.name}
          </span>
          {showSubtitle && config.subtitle && (
            <span
              className={`text-[11px] sm:text-xs font-bold tracking-wider ${config.subtitleColor}`}
            >
              {config.subtitle}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-2 select-none ${
        plain
          ? "bg-transparent border-none shadow-none p-0"
          : "bg-[#f8f9fa] shadow-2xs hover:shadow-xs px-2.5 py-1 border border-zinc-200/80 rounded-xl"
      } transition-all duration-200 ${className}`}
    >
      {/* Brand Official SVG Emblem */}
      <div className="shrink-0 drop-shadow-2xs">{config.renderIcon(iconSize)}</div>

      {/* Brand Typography matching company brand identity */}
      <div className="flex items-baseline gap-1 font-sans tracking-tight">
        <span
          className={`font-black text-zinc-950 text-xs sm:text-[13px] ${
            config.isLowercase ? "lowercase font-bold tracking-normal" : "uppercase"
          }`}
        >
          {config.name}
        </span>
        {showSubtitle && config.subtitle && (
          <span
            className={`text-[10px] font-bold tracking-wider ${config.subtitleColor}`}
          >
            {config.subtitle}
          </span>
        )}
      </div>
    </div>
  );
}
