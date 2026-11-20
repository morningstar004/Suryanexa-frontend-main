"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import ExpandableTraderSidebar from "@/components/trader/ExpandableTraderSidebar";
import FieldErpHeader from "@/components/trader/FieldErpHeader";

export default function TraderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState<{
    name?: string;
    email?: string;
    role?: string;
    avatar?: string | null;
  }>({
    name: "Noor",
    email: "noor@tidewell.com",
    role: "TRADER",
    avatar: null,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("suryanexa_user");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && (parsed.name || parsed.email)) {
            setUserData(parsed);
          }
        }
      } catch (err) {
        console.error("Error reading trader user:", err);
      }
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("suryanexa_user");
      window.dispatchEvent(new Event("suryanexa_user_updated"));
    }
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#ECEFF0] text-zinc-900 font-sans flex antialiased">
      <Toaster position="bottom-right" richColors />

      {/* 1. Desktop Expandable Dark Sidebar */}
      <div className="hidden lg:block shrink-0">
        <ExpandableTraderSidebar
          userName={userData.name}
          userEmail={userData.email}
          userAvatar={userData.avatar}
          onLogout={handleLogout}
          isExpanded={isSidebarExpanded}
          onToggleExpand={() => setIsSidebarExpanded(!isSidebarExpanded)}
        />
      </div>

      {/* 2. Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-zinc-950/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full shadow-2xl z-50">
            <ExpandableTraderSidebar
              userName={userData.name}
              userEmail={userData.email}
              userAvatar={userData.avatar}
              onLogout={handleLogout}
              isExpanded={true}
              onToggleExpand={() => setMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}

      {/* 3. Main Workspace Area (Smooth left padding transition: 72px collapsed, 272px expanded) */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isSidebarExpanded ? "lg:pl-[272px]" : "lg:pl-[72px]"
        }`}
      >
        <FieldErpHeader
          userName={userData.name}
          userEmail={userData.email}
          userAvatar={userData.avatar}
          isSidebarExpanded={isSidebarExpanded}
          onOpenMobileSidebar={() => setMobileMenuOpen(true)}
        />

        {/* Dynamic Page Outlet with smooth module crossfade transition */}
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="flex-1 p-3.5 sm:p-5 lg:p-6 overflow-x-hidden"
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
}
