"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import LogoMark from "./Logo";
import { LANDING } from "@/constants/testIds";

const LINKS = [
  { id: LANDING.navHow, label: "How it works", href: "#pipeline" },
  { id: LANDING.navUsps, label: "Solar OS", href: "#usps" },
  { id: LANDING.navSimulator, label: "Simulator", href: "#simulator" },
  { id: LANDING.navWho, label: "Who it's for", href: "#who" },
  { id: LANDING.navFaq, label: "FAQ", href: "#faq" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      data-testid={LANDING.navbar}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 border-b ${scrolled
          ? "bg-white/90 backdrop-blur-xl border-slate-200/80 shadow-[0_8px_30px_rgba(15,23,42,0.08)]"
          : "border-transparent  shadow-none" 
        }`}
    >
      <div
        className={`flex justify-between items-center mx-auto px-4 md:px-10 w-full max-w-7xl transition-all duration-300 ease-out ${scrolled ? "h-[61px]" : "h-[72px]"
          }`}
      >
        <a href="#top" data-testid={LANDING.logo} className="flex items-center gap-2">
          <LogoMark size={36} />
          <span
            className={`font-display font-extrabold text-lg tracking-tight transition-colors duration-300 ${scrolled ? "text-slate-900" : "text-white"
              }`}
          >
            Surya<span className={scrolled ? "text-emerald-700" : "text-emerald-400"}>Nexa</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.id}
              data-testid={l.id}
              href={l.href}
              className={`group relative font-medium text-sm transition-colors duration-300 ${scrolled
                  ? "text-slate-600 hover:text-slate-900"
                  : "text-emerald-100/90 hover:text-white"
                }`}
            >
              {l.label}
              <span
                className={`-bottom-1.5 left-0 absolute h-px transition-all duration-300 ${scrolled
                    ? "bg-gradient-to-r from-emerald-600 to-teal-500 w-0 group-hover:w-full"
                    : "bg-gradient-to-r from-emerald-400 to-teal-300 w-0 group-hover:w-full"
                  }`}
              />
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2.5">
          <a
            href="/login"
            className={`px-4 py-2 rounded-xl font-bold text-sm active:scale-[0.97] transition-all duration-200 border ${scrolled
                ? "bg-white/60 hover:bg-slate-100 border-slate-200 text-slate-800 hover:text-slate-950"
                : "bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-sm"
              }`}
          >
            Log In
          </a>
          <a
            data-testid={LANDING.ctaAccess}
            href="/login?tab=signup"
            className={`group inline-flex items-center gap-2 px-5 py-2 rounded-xl font-bold text-white text-sm active:scale-[0.97] transition-all duration-200 shadow-md ${scrolled
                ? "bg-emerald-700 hover:bg-emerald-800 shadow-emerald-700/25"
                : "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-950/40"
              }`}
          >
            <span>Sign Up</span>
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5 duration-200" />
          </a>
        </div>

        <button
          data-testid={LANDING.mobileMenuToggle}
          onClick={() => setOpen((v) => !v)}
          className={`lg:hidden p-2 rounded-lg border transition-colors ${scrolled
              ? "bg-white/80 border-slate-200 text-slate-700"
              : "bg-white/10 border-white/20 text-white"
            }`}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            data-testid={LANDING.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`lg:hidden backdrop-blur-xl border-b overflow-hidden ${scrolled
                ? "bg-white/95 border-slate-200 text-slate-700"
                : "bg-[#02201d]/95 border-emerald-900/60 text-white"
              }`}
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {LINKS.map((l) => (
                <a
                  key={l.id}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="hover:bg-emerald-50 px-3 py-3 rounded-xl font-medium text-slate-700 hover:text-emerald-800 text-sm transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <div className="gap-3 grid grid-cols-2 mt-2 pt-3 border-slate-200 border-t">
                {/* <a
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex justify-center items-center bg-white py-2.5 border border-slate-300 rounded-xl font-bold text-slate-900 text-sm active:scale-[0.97]"
                >
                  Log In
                </a> */}
                <a
                  href="/login?tab=signup"
                  onClick={() => setOpen(false)}
                  className="flex justify-center items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 py-2.5 rounded-xl font-bold text-white text-sm active:scale-[0.97]"
                >
                  <span>Log In/Sign Up</span>
                  <ArrowRight size={14} />
                </a>
              </div>
              <a
                href="#cta"
                onClick={() => setOpen(false)}
                className="inline-flex justify-center items-center gap-2 bg-emerald-700 mt-2 px-5 py-3 rounded-full font-semibold text-white text-sm"
              >
                Request Access <ArrowRight size={15} />
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
