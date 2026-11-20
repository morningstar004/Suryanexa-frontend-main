# SuryaNexa — Application Blueprint & Architecture Specification

> **Document Purpose**: This comprehensive specification outlines the complete business domain, user personas, current feature implementation, technical stack, UX/UI design system, and future architectural roadmap for **SuryaNexa**. This document is formatted for sharing with AI models, engineering teams, and product managers to plan backend integrations, mobile apps, and platform expansions.

---

## 1. Executive Summary & Vision

**SuryaNexa** is India's first cryptographic **B2B Solar Operating System (Solar OS)** and **Decentralized Trust Protocol**, purpose-built for the rooftop solar ecosystem. 

In India's rapidly expanding renewable energy sector (driven by initiatives like **PM Surya Ghar: Muft Bijli Yojana** and commercial rooftop mandates), the supply chain remains fragmented, opaque, and plagued by informal WhatsApp broker networks. SuryaNexa replaces this friction with an end-to-end digital command center that connects **OEM-authorized equipment stockists**, **regional EPC contractors**, **certified rooftop installers**, and **DISCOM consultants** into a single, dispute-proof network.

### Core Value Proposition
- **Zero Chaos**: Replaces unorganized WhatsApp groups with verified spot trading, real-time freight telematics, and standardized kit configurators.
- **Zero Lead Leaks**: Protects installer margins and customer data using **Blind-Vault™** encryption, preventing rogue staff or call centers from poaching commercial leads.
- **Zero Transit Disputes**: Introduces a **180-second timestamped unloading video protocol** with barcode scanning that guarantees instant delivery escrow release and eliminates finger-pointing over micro-cracked solar panels.

---

## 2. Industry Friction & The Problems Solved

| Traditional Solar Trade Friction | SuryaNexa Verified Protocol Solution |
| :--- | :--- |
| **Unverified WhatsApp Broker Groups**<br>Shadow brokers quote fake inventory, inflate spot prices, and vanish when hardware defects occur. | **KYB-Audited Command Center**<br>Direct ex-depot procurement from verified stockists with bonded warehouses and locked spot prices. |
| **Lead Poaching & Margin Theft**<br>Centralized CRM admins and aggregator call centers routinely leak high-intent commercial leads to competitors. | **Blind-Vault™ Lead Privacy**<br>Customer details, roof dimensions, and project margins are cryptographically sealed and owned strictly by the submitting firm. |
| **Transit Micro-Cracks & Denied Warranties**<br>Rough logistics cause micro-cracks in monocrystalline panels; installers sign blindly, resulting in denied warranties and frozen cash. | **Timestamped 180s Unloading Video Protocol**<br>On-site video unboxing with optical barcode verification instantly triggers delivery escrow release or immediate insurance coverage. |
| **Forced Distributor Bundle Monopolies**<br>Traditional distributors force EPCs to buy aging, substandard inverters to get Tier-1 panels. | **Cross-Trader Spot Engine & Kit Configurator**<br>EPCs can mix & match Tier-1 panels (e.g., Waaree, Adani) with hybrid inverters (e.g., Sungrow, Growatt) freely at transparent spot prices. |
| **Slow DISCOM Approvals & Paperwork**<br>Drafting Single Line Diagrams (SLD), net-metering forms, and subsidy compliance manually takes 2–4 weeks. | **Automated DISCOM SLD Engine**<br>Instant 60-second generation of DISCOM-compliant electrical SLDs and subsidy paperwork based on on-site roof measurements. |

---

## 3. Target User Personas & Ecosystem Roles

1. **EPC Contractors (Engineering, Procurement & Construction)**
   - *Needs*: Guaranteed equipment delivery timelines, locked procurement pricing, instant SLD diagrams, and lead confidentiality.
   - *Features*: Field ERP terminal, Margin Multiplier Calculator, escrow-backed order booking.

2. **Solar Equipment Stockists & Traders**
   - *Needs*: Liquid spot market demand, guaranteed buyer payments, eliminated payment default risks.
   - *Features*: Trader Profile & KYC verification dashboard, bonded inventory listings, 7-day net cash escrow payouts.

3. **Certified Rooftop Installers & Vendors**
   - *Needs*: High-intent local installation leads, access to PM Surya Ghar residential allocations, technician credential management.
   - *Features*: Vendor Profile portal, Lead Credit Plans (Starter, Growth, Enterprise), service pincode mapping.

4. **Project Consultants & CAD Designers**
   - *Needs*: Fast turnaround for rooftop solar design, string sizing, shading analysis, and utility interconnection approval.
   - *Features*: Automated BOM generation, SLD export tools, subsidy feasibility reports.

5. **Commercial & Industrial (C&I) Asset Owners**
   - *Needs*: Verified Tier-1 components (ALMM & BIS compliant), transparent pricing without intermediary markups, guaranteed warranty longevity.

---

## 4. Current Technical Architecture & Stack

### Frontend Foundation
- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19, TypeScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with extended theme configurations:
  - Custom fluid container scaling supporting Full HD (1080p), 2K (1440p), and 4K (2160p) displays.
  - Custom font tokens: `font-display` (Poppins) and `font-sans` / `font-mono` (Onest).
- **Motion & Physics**: 
  - [Framer Motion](https://www.framer.com/motion/) for declarative page transitions, card hovering, and modal popups.
  - [Lenis](https://github.com/darkroomengineering/lenis) for physics-based smooth scrolling, programmatically paused during active modal overlays.
- **UI Components & Utilities**:
  - [Lucide React](https://lucide.dev/) for cohesive technical iconography.
  - [Sonner](https://sonner.emilkowal.ski/) for rich, branded toast notifications.
  - React Portals (`createPortal`) for full-viewport modal overlays escaping parent CSS transform contexts.

### Client-Side State & Mock Auth Engine
- **Mock Credentials Engine**: Local `src/cred.json` pre-configured with multi-role accounts (e.g., Vendor / Trader).
- **Session Management**: Dynamic `localStorage` persistence under key `suryanexa_user`.
- **Cross-Component Synchronization**: Custom browser event `suryanexa_user_updated` paired with window `storage` listeners ensuring instant navbar, modal, and profile updates across active tabs without page refresh.

---

## 5. Detailed Route & Feature Inventory

```
src/
├── app/
│   ├── page.tsx                  # Main High-Conversion Landing Page
│   ├── login/page.tsx            # Unified Authentication (Login, Signup, Forgot Password)
│   ├── signup/page.tsx           # Signup route alias
│   ├── forgot-password/page.tsx  # Standalone Password Recovery Workflow
│   ├── profile/page.tsx          # Dynamic Role-Based Router
│   ├── trader/profile/page.tsx   # Verified Trader / Stockist KYC Dashboard
│   └── vendor/profile/page.tsx   # Vendor / Rooftop Installer Profile & Credits Hub
├── components/
│   ├── stitch/                   # Core Production Landing Components
│   ├── landing/                  # Legacy / Alternate Landing Components
│   └── ui/                       # Reusable UI Primitives & Interactive Simulations
└── cred.json                     # Development Credentials
```

---

### 5.1. Main Landing Experience (`/`)

The homepage (`src/app/page.tsx`) delivers an interactive, institutional-grade narrative structured into sequential storytelling sections wrapped in `<SectionScrollFade>`:

1. **Dedicated Sticky Navigation Bar (`DedicatedNavbar.tsx`)**:
   - **Scroll State Detection**: Smoothly transitions from a dark/transparent header to a frosted glass background (`backdrop-blur-md`).
   - **Interactive Menu Dropdowns**:
     - *Policies Menu*: Explains governance rules (Blind-Vault™, 180s Video Escrow, ALMM & BIS only, 7-Day Net Cash, SLD Automation, Cross-Trader Spot Market, Zero Shadow Broker Policy).
     - *Company Menu*: SuryaNexa mission, direct OEM desks, logistics telematics.
     - *Contact Us Menu*: Direct access to the 1800-SURYA-NEXA EPC Hotline and Trader Desk.
   - **Mutual Exclusivity & Click-Outside**: Notification panel and User Profile menu automatically close each other and dismiss when clicking outside or pressing Escape.
   - **Post-Login State**: Displays an animated unread notification badge (`Live Feed`) and a circular user profile hub with avatar/initials and role pill (`PLANS` / `KYC`).

2. **Reading Progress Indicator (`PageScrollProgress.tsx`)**:
   - Fixed 3px emerald progress bar tracking viewport scroll progress across the page.

3. **Hero Showcase (`StitchHero.tsx`)**:
   - High-impact headline: *"Run your solar business on one network. Zero chaos. Zero lead leak."*
   - Interactive badge cluster highlighting verified network statistics.
   - Dual primary call-to-action buttons ("Request pilot access" / "Explore Live Terminal").

4. **OEM Brand Marquee (`StitchBrandMarquee.tsx`)**:
   - Seamless infinite-scroll marquee showcasing supported Tier-1 manufacturers: Waaree, Adani Solar, Vikram Solar, Tata Power Solar, Sungrow, Growatt, Havells, Microtek, and GoodWe.

5. **On-Site Field ERP Terminal (`StitchFieldErp.tsx`)**:
   - High-fidelity dual-device showcase (Tablet & Smartphone) simulating the on-site mobile Field ERP.
   - Features simulated interactive modules:
     - Real-time BOM Generator (instant pallet breakdown).
     - Automated DISCOM Single Line Diagram (SLD) preview.
     - PM Surya Ghar Direct Benefit Transfer (DBT) subsidy tracker.
     - Margin Multiplier Calculator.

6. **Friction vs. Verified Protocol Matrix (`StitchFriction.tsx`)**:
   - Visual side-by-side comparison between legacy market chaos and SuryaNexa's automated trust.
   - Left side: Live Phone Mock Terminal displaying real-time escrow, telemetry, and quotes.
   - Right side: 4 structured comparison modules separated by clean vertical and horizontal dividers with colorful category icons.

7. **Stakeholder Solutions Bento Grid (`StitchBentoGrid.tsx`)**:
   - 5-part modular solution cards tailored to EPC Contractors, Stockists, Certified Installers, Project Consultants, and Asset Owners.

8. **End-to-End Lifecycle Stack (`StitchLifecycleStack.tsx`)**:
   - Step-by-step visual workflow: Lead Capture → Automated SLD Design → Escrow Hardware Procurement → Telematics Freight → Commissioning & Subsidy Release.

9. **Core Cryptographic Pillars (`StitchPillars.tsx`)**:
   - Deep-dive into technical security: Blind-Vault™ encryption, Escrow Smart-Contracts, and SLD generation algorithms.

10. **Transparent Pricing Tiers (`StitchPricing.tsx`)**:
    - Three-tier breakdown:
      - *Free Trader*: Basic spot quotes, standard logistics.
      - *Certified EPC*: Full Blind-Vault™ lead protection, automated SLD engine, 180s escrow.
      - *Enterprise Stockist*: Unlimited warehouse telemetry, bonded terminal access, priority freight.

11. **Executive Social Proof (`StitchTestimonials.tsx`)**:
    - High-credibility testimonials from Managing Directors and Heads of Procurement.
    - Features 2x executive portraits (`w-24 sm:w-28`), 5-star rating badges, verified role tags, and quotes.

12. **Network Performance Metrics (`StitchStats.tsx`)**:
    - Highlights critical operational numbers: total megawatt projects closed, delivery dispute rate (0.00%), escrow volume, and average delivery hours.

13. **Trade FAQ & Support Modal (`StitchFaq.tsx`)**:
    - Accordion addressing trade questions (encryption keys, DISCOM SLD automation, warranty claims).
    - **"Ask a Custom Question" Popup Modal**:
      - Portaled directly to `document.body` for screen centering.
      - Full-page background blur (`backdrop-blur-md bg-zinc-950/60`).
      - Background scroll lock (including Lenis freeze) preventing underlying page movement.
      - Form inputs: Full Name, Work Email, Subject, and Question.
      - Smart Submit Button: Remains inactive/disabled until all required fields are filled.

14. **High-Conversion Call to Action (`StitchCta.tsx`)**:
    - Features a custom high-resolution generative solar panel and orbital network graphic (`/Gemini_Generated_Image_solar_panal.png`).
    - Color-harmonized background (`#faf8f3`) with responsive gradient overlay.
    - Direct work email pilot registration form with live validation.

15. **Tactile 3D Debossed Statement Banner (`StitchBigBrandBanner.tsx`)**:
    - Physically-accurate SVG directional lighting filter creating an incised 3D deboss brand statement.

16. **Enterprise Footer (`StitchFooter.tsx`)**:
    - Clean footer with sitemap links, security disclosures, hotline numbers, and compliance notices.

---

### 5.2. Authentication & Dynamic Session Flow (`/login`, `/signup`, `/forgot-password`)

- **Unified Auth Form (`AuthCard` in `/login/page.tsx`)**:
  - Smooth tab switching between **Log In** and **Sign Up**.
  - Role selection for new registrations:
    - *EPC Contractor*
    - *Trader / Bonded Stockist*
    - *Solar Vendor / Rooftop Installer*
    - *Consultant / CAD Designer*
  - Instant password visibility toggles (`Eye` / `EyeOff`).
  - Validation against `src/cred.json` with immediate feedback.
  - Automatic session initialization and redirect to intended dashboard (`/profile`).
- **Forgot Password Workflow (`/forgot-password/page.tsx`)**:
  - Secure email intake form triggering simulated one-time password (OTP) / reset token dispatch.

---

### 5.3. Role-Based Dynamic Profile Portals

#### Dynamic Router (`/profile/page.tsx`)
Inspects active user session and query parameters:
- Users with role `VENDOR` (or `?role=vendor`) are routed to `/vendor/profile`.
- Users with role `TRADER` (or `?role=trader`) are routed to `/trader/profile`.
- Unauthenticated visitors are redirected to `/login?redirect=/profile`.

#### Trader Profile & KYB Dashboard (`/trader/profile/page.tsx`)
- **Trader Verification Hub**: Displays verification state badge (`PENDING_DETAILS`, `UNDER_REVIEW`, `VERIFIED`).
- **Business Details Form**:
  - Registered Company Name & Trade License.
  - GSTIN & PAN Verification.
  - Bonded Warehouse Physical Address & Capacity.
  - Primary Bank Account for Escrow Disbursals.
  - Tier-1 OEM Authorizations (Waaree, Adani, Sungrow, etc.).
- **Document Vault**: Upload interface for warehouse lease agreements, GST certificates, and OEM dealership letters.
- **Dynamic Avatar Management**: Live image upload or default initials generator.

#### Vendor & Rooftop Installer Portal (`/vendor/profile/page.tsx`)
- **Dual Tab Architecture**:
  1. **Profile Details Tab**:
     - Installer business identity, rooftop installation capacity (kW/month).
     - Serviceable Pincodes & Regional DISCOM jurisdictions (e.g., MSEDCL, DHBVN, BESCOM).
     - Certified on-ground technician count and safety certifications.
  2. **Lead Credit Plans Tab**:
     - Current lead credit balance.
     - Subscription tiers:
       - *Starter Pack* (10 verified commercial rooftop leads).
       - *Growth Pack* (35 verified commercial rooftop leads + SLD priority).
       - *Enterprise Unlimited* (Unlimited leads + dedicated account manager).
     - Transaction ledger displaying past credit purchases and receipt exports.

---

## 6. Proprietary System Concepts & Glossary

| Term | Technical & Operational Definition |
| :--- | :--- |
| **Blind-Vault™** | Client-side envelope encryption protocol that seals customer lead information, bill photos, and margin structures. Only the project owner's private key can decrypt the end-customer identity. |
| **180s Unloading Video Escrow** | Delivery dispute resolution protocol where the driver/installer records a single continuous 180-second video inspecting pallet seals and scanning serial barcodes. Automatically triggers delivery escrow release. |
| **Cross-Trader Spot Engine** | Distributed order-matching algorithm allowing an EPC to split a single solar Bill of Materials (BOM) across multiple bonded stockists to optimize freight distance and spot prices. |
| **DISCOM Automated SLD Engine** | Rule-based procedural electrical diagram generator that outputs CAD-compliant Single Line Diagrams formatted to specific state utility standards. |
| **Bonded Escrow** | Multi-signature financial escrow holding equipment payments until physical barcode scanning verification at the delivery destination. |

---

## 7. UX/UI & Brand Design System

### Color Tokens
- **Primary Brand Accent**: Emerald Green
  - `emerald-700` (`#047857`) — Primary buttons, verified text badges.
  - `emerald-600` (`#059669`) — Hover states, active borders.
  - `emerald-500` (`#10B981`) — Telemetry pulses, status indicators.
  - `emerald-100` (`#D1FAE5`) / `emerald-50` (`#ECFDF5`) — Soft backdrops.
- **Solar Energy Accent**: Solar Amber
  - `amber-500` (`#F59E0B`) / `amber-400` (`#FBBF24`) — Star ratings, solar power metric highlights, text selection (`selection:bg-amber-400`).
- **Base Surfaces & Backgrounds**:
  - Pure White (`#FFFFFF`) — High-contrast content cards.
  - Warm Sand / Cream (`#FAF8F3`) — Section backdrops, morphing dropdown menus.
  - Zinc Charcoal (`#09090B` / `#18181B`) — Primary headlines, deep contrast text.
  - Zinc Slate (`#52525B` / `#71717A`) — Supporting body copy and metadata.

### Typography & Geometry
- **Headings**: `Poppins`, semi-bold to extra-bold (`font-display`).
- **Body & Data**: `Onest`, regular to bold (`font-sans`, `font-mono`).
- **Corner Radii**: iOS-style continuous curves (`rounded-2xl` to `rounded-[32px]`).
- **Depth**: Subtle layered borders (`border-zinc-200/80`), multi-layer box shadows (`shadow-xl shadow-zinc-950/5`), and tactile SVG deboss reliefs.

---

## 8. Strategic Roadmap & AI Expansion Recommendations

When extending SuryaNexa into a full production SaaS platform, prioritize the following architecture:

### Phase 1: Backend Infrastructure & Persistent Database
- **Database**: PostgreSQL (via Supabase or AWS RDS) with **Prisma ORM**.
- **Schema Entities**:
  - `User` (id, email, password_hash, role, company_id, kyc_status)
  - `Company` (id, legal_name, gstin, pan, warehouse_address, tier)
  - `EquipmentListing` (id, stockist_id, manufacturer, model, wattage, quantity, spot_price, warehouse_pincode)
  - `OrderEscrow` (id, epc_id, stockist_id, total_amount, escrow_status, tracking_number)
  - `Lead` (id, epc_id, encrypted_payload, capacity_kw, pincode, discom)
  - `UnloadingVerification` (id, order_id, video_url, barcode_payload, ai_verification_score)
- **Authentication**: NextAuth.js (Auth.js) or Supabase Auth with JWT and MFA support.

### Phase 2: AI Computer Vision & Document Verification
- **Video Escrow AI**: Integration with Google Cloud Video Intelligence / Gemini Multimodal API to parse the 180s unloading video, detect panel glass fractures, and extract OCR barcodes automatically.
- **Automated SLD Generator**: Python/Node microservice using `dxf-writer` or SVG generation to produce instant downloadable `.dwg` and `.pdf` Single Line Diagrams based on inverter capacity and string sizing.

### Phase 3: Real-Time Order Book & Freight Telematics
- **WebSockets / SSE**: Real-time spot price ticker for monocrystalline TOPCon panels and hybrid inverters.
- **GPS Telematics**: Integration with commercial freight APIs (e.g., WheelsEye, BlackBuck, or IoT GPS trackers) to stream live truck location directly to the tablet/mobile interface.

### Phase 4: Financial Escrow & Payment Gateway
- **Banking APIs**: Integration with RBI-compliant digital escrow providers (e.g., ICICI Smart Escrow, Razorpay Route, or Cashfree Verification Suite) for automated milestone-based payouts upon barcode scan.
- **PM Surya Ghar Subsidy Integration**: Direct API connectors to national DISCOM subsidy portals for automated status updates.

### Phase 5: Native Mobile Application
- **Stack**: React Native (Expo) sharing TypeScript models and Tailwind design tokens (`NativeWind`).
- **Hardware Integration**: Direct camera access with continuous barcode scanning and offline-first SQLite cache for remote rooftop installation sites with weak cellular coverage.

---

*Authored for the SuryaNexa Engineering, Product, and AI Architecture Team.*
