# SuryaNexa — Frontend Design System, Animation & Theme Specification

> **How to Use This Document**: This file is a complete, self-contained frontend engineering and design specification. If you want to replicate the exact same aesthetic, animations, color palette, responsive typography, and tactile physics in a new or existing application, provide this document directly to an AI coding agent or frontend engineering team.

---

## 1. Design Philosophy & Aesthetic Identity

The SuryaNexa frontend is built on **Clean Industrial Neomorphism & Tactile B2B Glassmorphism**:
- **Warm Editorial Canvas**: Rather than harsh sterile grays or generic dark modes, the primary background uses warm off-white and sand tones (`#FAF8F3`, `#FAF9F4`, `#FFFFFF`).
- **Signature Solar Palette**: Vibrant Emerald Green (representing ecological verification, clean energy, and cryptographic security) paired with Solar Amber (representing solar generation, real-time telemetry, and financial yield).
- **Physical Feedback & Micro-Interactions**: Every button, dropdown, and card reacts to physical force:
  - 3% compression on click (`scale(0.97)`).
  - High-velocity ease-out deceleration (`cubic-bezier(0.16, 1, 0.3, 1)`).
  - No cartoonish spring bounces.
  - Popups expand from the exact trigger point rather than the center of the viewport.
- **Tactile Depth**: Procedural SVG directional sunlight deboss filters, subtle fractal noise overlays, and layered card-in-card structures following the geometric rule:  
  $$\text{Inner Radius} = \text{Outer Radius} - \text{Padding}$$

---

## 2. Complete Color System & Design Tokens

### 2.1. Primary Palette (Hex & Tailwind)

| Semantic Role | Token Name | Hex Code | Tailwind Equivalent | Primary Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Brand Primary (Dark)** | `emerald-800` | `#065F46` | `text-emerald-800` | Dark badge text, section sub-accents |
| **Brand Primary (Core)** | `emerald-700` | `#047857` | `bg-emerald-700`, `text-emerald-700` | Primary action buttons, active navigation, brand highlights |
| **Brand Primary (Hover)** | `emerald-600` | `#059669` | `bg-emerald-600`, `hover:bg-emerald-800` | Interactive button hovers, verified icons |
| **Brand Vibrant** | `emerald-500` | `#10B981` | `bg-emerald-500` | Live telemetry pulse dots, active radio indicators |
| **Brand Light Tint** | `emerald-100` | `#D1FAE5` | `bg-emerald-100`, `bg-emerald-100/70` | Soft icon pill backgrounds, unread counters |
| **Brand Ultra-Light** | `emerald-50` | `#ECFDF5` | `bg-emerald-50`, `bg-emerald-50/50` | Table row highlights, subtle badge surfaces |
| **Solar Accent (Deep)** | `amber-600` | `#D97706` | `text-amber-600` | Financial savings badges, hardware alerts |
| **Solar Accent (Core)** | `amber-500` | `#F59E0B` | `bg-amber-500`, `text-amber-500` | Energy generation charts, secondary CTAs |
| **Solar Accent (Sun)** | `amber-400` | `#FBBF24` | `fill-amber-400`, `text-amber-400` | 5-Star customer ratings, solar graphics |
| **Selection Highlight** | `amber-selection` | `rgba(251, 192, 45, 0.65)` | `selection:bg-amber-400` | Text selection background |
| **Base Surface** | `white` | `#FFFFFF` | `bg-white` | Cards, input fields, modal bodies |
| **Warm Canvas Bed** | `sand-warm` | `#FAF8F3` | `bg-[#FAF8F3]` | Main landing sections, morphing dropdown menus |
| **Soft Off-White** | `cream-light` | `#FAF9F4` | `bg-[#FAF9F4]` | CTA banner base, graphic blend canvas |
| **Alt Surface** | `sand-alt` | `#F8F6F2` | `bg-[#F8F6F2]` | Big brand debossed statement banner |
| **Deep Charcoal** | `zinc-950` | `#09090B` | `text-zinc-950` | Primary display headlines, high-contrast branding |
| **Dark Charcoal** | `zinc-900` | `#18181B` | `text-zinc-900` | Sub-headings, active link text |
| **Body Secondary** | `zinc-600` | `#52525B` | `text-zinc-600` | Paragraph text, role designations |
| **Body Muted** | `zinc-500` | `#71717A` | `text-zinc-500` | Timestamps, metadata, location tags |
| **Border (Light)** | `zinc-200` | `#E4E4E7` | `border-zinc-200/80` | Card borders, section divider lines |
| **Border (Warm)** | `sand-border` | `#E5E1D4` | `border-[#E5E1D4]` | Dropdown borders, warm panel outlines |
| **Border (Subtle)** | `sand-subtle` | `#ECE8DC` | `border-[#ECE8DC]` | Card inner dividers, header borders |

---

### 2.2. CSS Variables (`globals.css`)

```css
:root {
  /* Brand Green Shades */
  --ag-green-900: #1b5e20;
  --ag-green-800: #1e6f2c;
  --ag-green-700: #2e7d32;
  --ag-green-600: #388e3c;
  --ag-green-500: #43a047;
  --ag-green-100: #c8e6c9;
  --ag-green-50: #e8f5e9;

  /* Solar Amber Shades */
  --ag-amber-900: #f57f17;
  --ag-amber-800: #f9a825;
  --ag-amber-700: #fbc02d;
  --ag-amber-600: #fdd835;

  /* Neutral Spectrum */
  --ag-neutral-900: #0f172a;
  --ag-neutral-800: #1f2937;
  --ag-neutral-600: #475569;
  --ag-neutral-400: #94a3b8;
  --ag-neutral-200: #e2e8f0;
  --ag-neutral-50: #f8fafc;

  /* Surface Bases */
  --bg-page: #ffffff;
  --bg-alt: #f8fafc;
  --radius: 0.75rem;

  /* Shadcn / HSL Tokens */
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --primary: 152 82% 24%;
  --primary-foreground: 0 0% 100%;
  --card: 0 0% 100%;
  --card-foreground: 222 47% 11%;
  --border: 152 14% 90%;
}
```

---

## 3. Typography System & Responsive Fluid Scaling

### 3.1. Font Families
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        display: ["Poppins", "sans-serif"],       // High-contrast geometric headlines
        sans: ["Onest", "sans-serif"],             // Modern legibility for body, forms, and cards
        mono: ["Onest", "JetBrains Mono", "monospace"], // Telematics codes, coordinates, numbers
      },
    },
  },
};
```

### 3.2. Fluid Typography for 1080p, 2K & 4K Displays
The application implements fluid root scaling so that layouts naturally scale without breaking line wraps across high-resolution displays:

```css
/* Standard Desktop (< 1920px): base 16px */
html {
  font-size: 16px;
}

/* Full HD High-DPI (1920px+) */
@media (min-width: 1920px) {
  html {
    font-size: 16.5px;
  }
}

/* 2K QHD (2560px+) */
@media (min-width: 2560px) {
  html {
    font-size: 18px;
  }
}

/* 4K UHD (3840px+) */
@media (min-width: 3840px) {
  html {
    font-size: 21px;
  }
}
```

---

## 4. Animation Engine & Motion Guidelines

### 4.1. The Golden Easing Curve
All motion in this design system uses an **Apple-style high-deceleration curve**:
```ts
export const EASE_OUT = [0.16, 1, 0.3, 1]; // CSS: cubic-bezier(0.16, 1, 0.3, 1)
```
- **Rule 1: No Spring Bounce**: Never use spring oscillation (`type: "spring", bounce: 0.4`). All entrances glide rapidly into place and stop with zero rebound.
- **Rule 2: Asymmetric Exit**: Every modal or dropdown exit animation is **20% shorter in duration** than its entrance:
  $$\text{Duration}_{\text{exit}} = \text{Duration}_{\text{entrance}} \times 0.80$$
  *Example*: Entrance = `0.22s` $\rightarrow$ Exit = `0.18s` (or `0.144s` for quick dropdowns).

---

### 4.2. Button Press Physics (`scale(0.97)`)

Every clickable element provides tactile haptic feedback on press:
```css
button,
[role="button"],
input[type="submit"],
.btn-press {
  transition: transform 0.14s cubic-bezier(0, 0, 0.2, 1),
              box-shadow 0.15s cubic-bezier(0.16, 1, 0.3, 1),
              background-color 0.15s ease,
              border-color 0.15s ease;
}

button:active:not(:disabled),
.btn-press:active:not(:disabled) {
  transform: scale(0.97) !important;
}
```

---

### 4.3. Success Confirmation Pulse
When a form is submitted or an action succeeds, the button triggers a multi-ring emerald confirmation pulse:
```css
@keyframes button-confirm-pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.75);
  }
  25% {
    transform: scale(1.04);
    box-shadow: 0 0 0 8px rgba(16, 185, 129, 0.35);
  }
  50% {
    transform: scale(0.97);
    box-shadow: 0 0 0 14px rgba(16, 185, 129, 0);
  }
  75% {
    transform: scale(1.02);
    box-shadow: 0 0 0 6px rgba(16, 185, 129, 0.15);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
  }
}

.animate-pulse-success {
  animation: button-confirm-pulse 0.65s cubic-bezier(0.16, 1, 0.3, 1) both !important;
}
```

---

### 4.4. Trigger-Anchored Dropdown Animation
Popups and dropdowns **never appear from the screen center**. They start directly under the trigger button and anchor to its coordinate origin:

```tsx
// Framer Motion Trigger-Anchored Dropdown
<motion.div
  initial={{ opacity: 0, y: 10, scale: 0.95 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{
    opacity: 0,
    y: 8,
    scale: 0.95,
    transition: { duration: 0.144, ease: [0.16, 1, 0.3, 1] },
  }}
  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
  style={{
    transformOrigin: "top right", // or dynamic `${triggerPos.originX}px 0px`
  }}
  className="absolute top-full z-50 bg-[#faf8f3] border border-[#e5e1d4] shadow-xl rounded-2xl p-4"
>
  {/* Content */}
</motion.div>
```

---

### 4.5. Staggered List Rows (30ms Delta)
When rendering list items, rows enter with a 30ms progressive stagger delay:
```css
.stagger-rows > *:nth-child(1) { animation-delay: 0ms; }
.stagger-rows > *:nth-child(2) { animation-delay: 30ms; }
.stagger-rows > *:nth-child(3) { animation-delay: 60ms; }
.stagger-rows > *:nth-child(4) { animation-delay: 90ms; }
.stagger-rows > *:nth-child(5) { animation-delay: 120ms; }
.stagger-rows > *:nth-child(6) { animation-delay: 150ms; }
```

---

### 4.6. Lenis Smooth Scrolling Engine
```ts
// src/app/page.tsx
const lenis = new Lenis({
  lerp: 0.08,           // Inertial damping rate
  smoothWheel: true,     // Smooth mouse wheel interpolation
});

// Exposed globally for modal scroll-lock coordination
(window as any).__lenis = lenis;

// Anchor link smooth scroll formula with header offset
lenis.scrollTo(targetEl, {
  offset: -84,
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});
```

---

## 5. UI Components & Architectural Patterns

### 5.1. Portaled Modal with Full-Screen Blur & Scroll Lock

When creating popups or modals in Next.js, **never render fixed modals inside transformed page sections**. Wrap them in a React Portal attached to `document.body`:

```tsx
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomModal({ isOpen, onClose }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Background Scroll-Lock (Freezes body and Lenis smooth scrolling)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      (window as any).__lenis?.stop();
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      (window as any).__lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      (window as any).__lenis?.start();
    };
  }, [isOpen]);

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto overscroll-contain">
          {/* 50% Reduced Backdrop Blur (4px -> 2px or backdrop-blur-md) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-950/60 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Centered Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-2xl my-auto text-zinc-900"
          >
            {/* Modal Body */}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
```

---

### 5.2. Mutual Exclusivity & Click-Outside Dismissal
For navigation headers with multiple popups (e.g., Notifications vs. User Profile Menu):
```tsx
const notificationsRef = useRef<HTMLDivElement>(null);
const userMenuRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;
    if (notificationsRef.current && !notificationsRef.current.contains(target)) {
      setShowActivities(false);
    }
    if (userMenuRef.current && !userMenuRef.current.contains(target)) {
      setShowUserMenu(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setShowActivities(false);
      setShowUserMenu(false);
      setActiveDropdown(null);
    }
  };

  if (showActivities || showUserMenu) {
    document.addEventListener("mousedown", handleClickOutside);
  }
  window.addEventListener("keydown", handleKeyDown);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [showActivities, showUserMenu]);

// Opening one explicitly closes all others
const toggleNotifications = () => {
  setShowActivities((prev) => !prev);
  setShowUserMenu(false);
  setActiveDropdown(null);
};
```

---

### 5.3. Comparison Matrix Layout (Vertical Divider Pattern)
For side-by-side paradigm comparisons ("Old/Legacy Friction" vs. "New/Verified Protocol"):
```tsx
<div className="relative">
  {/* Thin vertical dividing line centered between the two sections on sm+ */}
  <div
    className="hidden sm:block absolute top-0 bottom-0 left-1/2 w-px bg-zinc-200/80 -translate-x-1/2 pointer-events-none"
    aria-hidden="true"
  />

  {/* Header row separated by a horizontal line */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 mb-3.5">
    {/* Left Pill Header */}
    {/* Right Pill Header */}
  </div>
  <div className="border-t border-zinc-200/80 my-4 sm:my-5" />

  {/* Cards Rows */}
  <div className="space-y-3 sm:space-y-3.5">
    {items.map((item) => (
      <div key={item.id} className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-stretch">
        {/* Left Pain Card (White surface + Red icon + border-zinc-200/80) */}
        {/* Right Protocol Card (White surface + Green icon + hover:border-emerald-300) */}
      </div>
    ))}
  </div>
</div>
```

---

### 5.4. Tactile 3D SVG Directional Relief Filter
Creates a physical, incised deboss effect that catches sunlight from the top-left:

```html
<svg width="0" height="0" className="absolute" aria-hidden="true">
  <defs>
    <filter
      id="clay-depth"
      x="-30%"
      y="-30%"
      width="160%"
      height="160%"
      colorInterpolationFilters="sRGB"
    >
      <!-- 1. Outer Top-Left Rim Highlight catches sunlight -->
      <feOffset in="SourceAlpha" dx="-1.5" dy="-1.5" result="offsetOuterRim" />
      <feGaussianBlur in="offsetOuterRim" stdDeviation="1" result="blurOuterRim" />
      <feComposite in="offsetOuterRim" in2="SourceAlpha" operator="out" result="cutOuterRim" />
      <feFlood floodColor="#ffffff" floodOpacity="0.9" result="colorOuterRim" />
      <feComposite in="colorOuterRim" in2="cutOuterRim" operator="in" result="outerRim" />

      <!-- 2. Inner Cavity Shadow falls into the top-left incision -->
      <feOffset in="SourceAlpha" dx="4.5" dy="4.5" result="offsetInnerShadow" />
      <feGaussianBlur in="offsetInnerShadow" stdDeviation="4.5" result="blurInnerShadow" />
      <feComposite in="SourceAlpha" in2="blurInnerShadow" operator="out" result="cutInnerShadow" />
      <feFlood floodColor="#1b1712" floodOpacity="0.52" result="colorInnerShadow" />
      <feComposite in="colorInnerShadow" in2="cutInnerShadow" operator="in" result="innerShadow" />

      <!-- 3. Inner Sunlit Bevel Highlight (bottom-right interior wall) -->
      <feOffset in="SourceAlpha" dx="-3.5" dy="-3.5" result="offsetInnerHighlight" />
      <feGaussianBlur in="offsetInnerHighlight" stdDeviation="2.5" result="blurInnerHighlight" />
      <feComposite in="SourceAlpha" in2="blurInnerHighlight" operator="out" result="cutInnerHighlight" />
      <feFlood floodColor="#ffffff" floodOpacity="0.95" result="colorInnerHighlight" />
      <feComposite in="colorInnerHighlight" in2="cutInnerHighlight" operator="in" result="innerHighlight" />

      <!-- 4. Merge Composite layers -->
      <feMerge>
        <feMergeNode in="outerRim" />
        <feMergeNode in="SourceGraphic" />
        <feMergeNode in="innerShadow" />
        <feMergeNode in="innerHighlight" />
      </feMerge>
    </filter>
  </defs>
</svg>
```

---

### 5.5. Procedural Fractal Noise Micro-Texture
Prevents digital banding on gradients by applying a subtle fixed 3.5% opacity noise mask:
```css
.noise-overlay {
  position: fixed;
  inset: 0;
  z-index: 70;
  pointer-events: none;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
}
```

---

## 6. Form & Input Standards

1. **Input Fields**:
   - Background: `bg-white` or `bg-zinc-50/50` transitioning to `focus:bg-white`.
   - Borders: `border border-zinc-200` transitioning to `focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20`.
   - Radii: `rounded-xl`.
   - Typography: `font-sans text-xs sm:text-sm text-zinc-900`.
2. **Submit Buttons**:
   - Disabled State: `bg-zinc-200 text-zinc-400 cursor-not-allowed shadow-none`.
   - Enabled State: `bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs active:scale-[0.97] cursor-pointer`.
   - Loading State: Inline `animate-spin` border circle with text "Submitting..." / "Verifying...".

---

## 7. Reusable Tailwind CSS Cheat Sheet

| Visual Style | Tailwind Class Combination |
| :--- | :--- |
| **Card (Primary)** | `bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-xl shadow-zinc-950/5` |
| **Card (Inner Accent)** | `bg-[#1B8049] rounded-[26px] p-5 sm:p-6 text-white shadow-[0_12px_28px_rgba(10,50,28,0.22)] border border-emerald-400/30` |
| **Pill Badge (Green)** | `inline-flex items-center gap-1.5 bg-[#CEEAD6] px-3.5 py-1.5 rounded-full font-sans font-bold text-[#137333] text-xs select-none` |
| **Pill Badge (Red)** | `inline-flex items-center gap-1.5 bg-[#FCE8E6] px-3.5 py-1.5 rounded-full font-sans font-bold text-[#C5221F] text-xs select-none` |
| **Avatar Portrait (2x)** | `w-24 sm:w-28 h-24 sm:h-28 rounded-full border-[3px] border-white shadow-md ring-1 ring-zinc-200/80 overflow-hidden object-cover` |
| **Header Glassmorphic** | `bg-white/80 backdrop-blur-md border-b border-[#e5e1d4] shadow-xs` |
| **Divider (Horizontal)**| `w-full border-t border-zinc-200/80 my-4 sm:my-5` |
| **Divider (Vertical)** | `w-px bg-zinc-200/80 absolute top-0 bottom-0 left-1/2 -translate-x-1/2 pointer-events-none` |

---

*Compiled directly from the SuryaNexa production codebase. Ready for 1:1 replication across any modern Next.js / Tailwind CSS web application.*
