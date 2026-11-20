export interface SolarProduct {
  id: string;
  name: string;
  brand: string;
  category: "PANELS" | "INVERTERS" | "STRUCTURES" | "BOS";
  wattage?: number; // e.g. 585
  efficiency?: number; // e.g. 22.7
  cellType?: string; // e.g. "N-Type TOPCon 16BB"
  pricePerWatt?: number; // e.g. 18.40
  unitPrice?: number; // e.g. 142000 for inverters
  depotLocation: string; // e.g. "Mundra Port Logistics Hub"
  availableStockMW: number; // e.g. 1.25 MW
  palletsCount: number; // e.g. 42
  almmApproved: boolean;
  almmCertNumber: string;
  warrantyYears: number; // e.g. 25
  minOrderQuantity: string; // e.g. "1 Full Pallet (36 Panels)"
  imageUrl: string;
}

export interface TraderOrder {
  id: string;
  poNumber: string;
  buyerName: string;
  buyerCompany: string;
  buyerCity: string;
  date: string;
  items: {
    productName: string;
    quantity: string;
    rate: string;
    subtotal: number;
  }[];
  totalValue: number;
  escrowStatus: "LOCKED" | "VIDEO_PENDING" | "VERIFIED" | "DISBURSED";
  deliveryStatus: "PROCESSING" | "IN_TRANSIT" | "DELIVERED";
  carrierName?: string;
  trackingNumber?: string;
  driverPhone?: string;
  eta?: string;
  videoEscrow: {
    videoUploaded: boolean;
    videoDurationSeconds?: number;
    inspectionTimestamp?: string;
    gpsCoordinates?: string;
    microCracksDetected: boolean;
    barcodesScanned: number;
    videoThumbnail?: string;
  };
}

export const INITIAL_PRODUCTS: SolarProduct[] = [
  {
    id: "prod-1",
    name: "Shine TOPCon 585W Bifacial Double Glass",
    brand: "Adani Solar",
    category: "PANELS",
    wattage: 585,
    efficiency: 22.7,
    cellType: "N-Type TOPCon 16BB",
    pricePerWatt: 18.40,
    depotLocation: "Mundra Port Special Economic Zone, Gujarat",
    availableStockMW: 1.85,
    palletsCount: 88,
    almmApproved: true,
    almmCertNumber: "MNRE-ALMM-2024-AD585",
    warrantyYears: 30,
    minOrderQuantity: "1 Pallet (36 pcs = 21.06 kW)",
    imageUrl: "/Gemini_Generated_Image_solar_panal.png",
  },
  {
    id: "prod-2",
    name: "Bi-55 545W Mono PERC Silver Frame",
    brand: "Waaree Energies",
    category: "PANELS",
    wattage: 545,
    efficiency: 21.3,
    cellType: "P-Type Mono PERC 10BB",
    pricePerWatt: 16.90,
    depotLocation: "Chakan Industrial Area, Pune",
    availableStockMW: 1.15,
    palletsCount: 58,
    almmApproved: true,
    almmCertNumber: "MNRE-ALMM-2023-WR545",
    warrantyYears: 25,
    minOrderQuantity: "1 Pallet (31 pcs = 16.89 kW)",
    imageUrl: "/Gemini_Generated_Image_solar_panal.png",
  },
  {
    id: "prod-3",
    name: "TP-Solar 550W DCR Domestic Cell Certified",
    brand: "Tata Power Solar",
    category: "PANELS",
    wattage: 550,
    efficiency: 21.5,
    cellType: "DCR Mono PERC (PM Surya Ghar Mandate)",
    pricePerWatt: 22.50,
    depotLocation: "Sanand Logistics Park, Ahmedabad",
    availableStockMW: 0.65,
    palletsCount: 38,
    almmApproved: true,
    almmCertNumber: "MNRE-DCR-2024-TP550",
    warrantyYears: 25,
    minOrderQuantity: "1 Pallet (32 pcs = 17.6 kW)",
    imageUrl: "/Gemini_Generated_Image_solar_panal.png",
  },
  {
    id: "prod-4",
    name: "SG50CX-P2 50kW Multi-MPPT Commercial Inverter",
    brand: "Sungrow",
    category: "INVERTERS",
    wattage: 50000,
    efficiency: 98.7,
    cellType: "Grid-Tied 5 MPPT / 10 Strings",
    unitPrice: 142000,
    depotLocation: "Ecotech Extension, Greater Noida",
    availableStockMW: 1.20,
    palletsCount: 24,
    almmApproved: true,
    almmCertNumber: "BIS-CRS-2023-SG50",
    warrantyYears: 10,
    minOrderQuantity: "1 Unit (50kW)",
    imageUrl: "/Gemini_Generated_Image_solar_panal.png",
  },
  {
    id: "prod-5",
    name: "SE33.3K Commercial Synergy Three-Phase Inverter",
    brand: "SolarEdge",
    category: "INVERTERS",
    wattage: 33300,
    efficiency: 98.3,
    cellType: "Synergy Modular Unit + DC Optimizers",
    unitPrice: 185000,
    depotLocation: "Patancheru Warehouse, Hyderabad",
    availableStockMW: 0.40,
    palletsCount: 12,
    almmApproved: true,
    almmCertNumber: "BIS-CRS-2024-SE33",
    warrantyYears: 12,
    minOrderQuantity: "1 Unit (33.3kW)",
    imageUrl: "/Gemini_Generated_Image_solar_panal.png",
  },
  {
    id: "prod-6",
    name: "Galvanized 4-Panel Rooftop Rail Structure Kit",
    brand: "SuryaNexa Structural",
    category: "STRUCTURES",
    cellType: "Hot-Dip Galvanized 80μm C-Channel (160km/h rated)",
    unitPrice: 3450,
    depotLocation: "Bhiwandi Warehousing Hub, Mumbai",
    availableStockMW: 2.40,
    palletsCount: 180,
    almmApproved: true,
    almmCertNumber: "IS-2062-STRUCT-2024",
    warrantyYears: 15,
    minOrderQuantity: "10 Kits",
    imageUrl: "/Gemini_Generated_Image_solar_panal.png",
  },
];

export const INITIAL_ORDERS: TraderOrder[] = [
  {
    id: "ord-1",
    poNumber: "PO-SX-2841",
    buyerName: "Rajiv Kulkarni",
    buyerCompany: "Apex Solar EPC Solutions",
    buyerCity: "Pune, Maharashtra",
    date: "Today, 10:45 AM",
    items: [
      {
        productName: "Waaree Bi-55 545W Mono PERC",
        quantity: "54 Modules (29.43 kW)",
        rate: "₹16.90 / Wp",
        subtotal: 497367,
      },
      {
        productName: "Sungrow 25kW Three-Phase Inverter",
        quantity: "1 Unit",
        rate: "₹92,000 / Unit",
        subtotal: 92000,
      },
      {
        productName: "Freight & Blind-Vault Transit Insurance",
        quantity: "Consolidated Cargo",
        rate: "Fixed",
        subtotal: 195633,
      },
    ],
    totalValue: 785000,
    escrowStatus: "LOCKED",
    deliveryStatus: "IN_TRANSIT",
    carrierName: "Navkar Fast Freight Logistics",
    trackingNumber: "NFF-PN-98214",
    driverPhone: "+91 98231 44520",
    eta: "Today, 4:30 PM (Pune Depot)",
    videoEscrow: {
      videoUploaded: false,
      microCracksDetected: false,
      barcodesScanned: 0,
    },
  },
  {
    id: "ord-2",
    poNumber: "PO-SX-2794",
    buyerName: "Senthil Murugan",
    buyerCompany: "Kaveri Clean Energy Systems",
    buyerCity: "Coimbatore, Tamil Nadu",
    date: "Yesterday",
    items: [
      {
        productName: "Adani Solar Shine TOPCon 585W Bifacial",
        quantity: "180 Modules (105.3 kW)",
        rate: "₹18.40 / Wp",
        subtotal: 1937520,
      },
    ],
    totalValue: 1937520,
    escrowStatus: "VERIFIED",
    deliveryStatus: "DELIVERED",
    carrierName: "VRL Logistics Dedicated Solar Fleet",
    trackingNumber: "VRL-CBT-77401",
    driverPhone: "+91 94432 11980",
    eta: "Delivered & Inspected",
    videoEscrow: {
      videoUploaded: true,
      videoDurationSeconds: 182,
      inspectionTimestamp: "Nov 19, 2026 · 15:40:12 IST",
      gpsCoordinates: "11.0168° N, 76.9558° E (Project Site Geotag)",
      microCracksDetected: false,
      barcodesScanned: 180,
      videoThumbnail: "/profile-solar-banner.jpg",
    },
  },
  {
    id: "ord-3",
    poNumber: "PO-SX-2710",
    buyerName: "Bhavin Patel",
    buyerCompany: "Gujarat Agro Solar Rooftop Ltd",
    buyerCity: "Rajkot, Gujarat",
    date: "Nov 16, 2026",
    items: [
      {
        productName: "Tata Power 550W DCR Domestic Modules",
        quantity: "320 Modules (176 kW)",
        rate: "₹22.50 / Wp",
        subtotal: 3960000,
      },
    ],
    totalValue: 3960000,
    escrowStatus: "DISBURSED",
    deliveryStatus: "DELIVERED",
    carrierName: "SuryaNexa Express Freight",
    trackingNumber: "SNX-GJ-44910",
    driverPhone: "+91 97240 55109",
    eta: "Disbursed to HDFC Escrow",
    videoEscrow: {
      videoUploaded: true,
      videoDurationSeconds: 195,
      inspectionTimestamp: "Nov 16, 2026 · 11:22:04 IST",
      gpsCoordinates: "22.3039° N, 70.8022° E (Rajkot Substation)",
      microCracksDetected: false,
      barcodesScanned: 320,
      videoThumbnail: "/profile-solar-panoramic.jpg",
    },
  },
  {
    id: "ord-4",
    poNumber: "PO-SX-2682",
    buyerName: "Harpreet Singh",
    buyerCompany: "Vardhman Spinning Rooftop EPC",
    buyerCity: "Ludhiana, Punjab",
    date: "Nov 14, 2026",
    items: [
      {
        productName: "Sungrow SG50CX-P2 50kW Commercial Inverter",
        quantity: "4 Units (200 kW)",
        rate: "₹1,42,000 / Unit",
        subtotal: 568000,
      },
      {
        productName: "AC/DC Distribution Surge Protection Panels",
        quantity: "4 Sets",
        rate: "₹18,000 / Set",
        subtotal: 72000,
      },
    ],
    totalValue: 640000,
    escrowStatus: "LOCKED",
    deliveryStatus: "PROCESSING",
    carrierName: "GATI-KWE Solar Freight",
    trackingNumber: "GATI-LDH-19034",
    eta: "Dispatch scheduled tomorrow 09:00 AM",
    videoEscrow: {
      videoUploaded: false,
      microCracksDetected: false,
      barcodesScanned: 0,
    },
  },
];
