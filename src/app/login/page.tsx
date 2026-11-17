"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  Building2,
  Eye,
  EyeOff,
  Check,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import credentials from "@/cred.json";

type AuthTab = "signup" | "login";
type BusinessType =
  | "EPC"
  | "Trader / Bonded Stockist"
  | "Solar Vendor / Rooftop Installer"
  | "Consultant / CAD Designer";

function AuthCard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Mode: "auth" (signup or login) vs "forgot"
  const [view, setView] = useState<"auth" | "forgot">("auth");
  const [authTab, setAuthTab] = useState<AuthTab>(
    pathname?.includes("/signup") ? "signup" : "login"
  );

  // Read URL query parameter or pathname
  useEffect(() => {
    const mode = searchParams.get("mode");
    if (mode === "login") {
      setAuthTab("login");
    } else if (mode === "signup" || pathname?.includes("/signup")) {
      setAuthTab("signup");
    }
  }, [searchParams, pathname]);

  // Sign up form state
  const [companyName, setCompanyName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [businessType, setBusinessType] = useState<BusinessType>("EPC");
  const [signupPassword, setSignupPassword] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isSignupSubmitted, setIsSignupSubmitted] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [isLoginSubmitted, setIsLoginSubmitted] = useState(false);

  // Forgot password form state
  const [forgotEmail, setForgotEmail] = useState("");
  const [isResetSent, setIsResetSent] = useState(false);

  // Handle Login Submit
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoginSubmitted(true);

    const trimmedEmail = loginEmail.trim();

    // Check credentials in cred.json
    const matchingCred = credentials.find(
      (c) => c.email.toLowerCase() === trimmedEmail.toLowerCase()
    );

    let finalRole: "TRADER" | "VENDOR" = "VENDOR";
    let computedName = "Solar Partner";

    if (matchingCred) {
      computedName = matchingCred.name;
      finalRole = (matchingCred.role as "TRADER" | "VENDOR") || "VENDOR";
    } else if (trimmedEmail) {
      const emailPrefix = trimmedEmail.split("@")[0] || "";
      const cleaned = emailPrefix.replace(/[0-9._-]+/g, "");
      computedName =
        cleaned.length > 0
          ? cleaned.charAt(0).toUpperCase() + cleaned.slice(1)
          : "Solar Partner";
      if (
        trimmedEmail.toLowerCase().includes("trader") ||
        trimmedEmail.toLowerCase().includes("stockist")
      ) {
        finalRole = "TRADER";
      }
    }

    if (typeof window !== "undefined") {
      let existingAvatar: string | undefined;
      try {
        const stored = localStorage.getItem("suryanexa_user");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed?.avatar) existingAvatar = parsed.avatar;
        }
      } catch (err) {}

      localStorage.setItem(
        "suryanexa_user",
        JSON.stringify({
          name: computedName,
          email:
            trimmedEmail ||
            (finalRole === "VENDOR" ? "236301078@gkv.ac.in" : "trader@suryanexa.com"),
          role: finalRole,
          company: "SuryaNexa Verified Partner",
          ...(existingAvatar ? { avatar: existingAvatar } : {}),
        })
      );
      window.dispatchEvent(new Event("suryanexa_user_updated"));
    }

    const redirectParam = searchParams.get("redirect");
    const defaultRoute = finalRole === "VENDOR" ? "/vendor/profile" : "/trader/profile";
    const targetRoute =
      redirectParam && redirectParam.startsWith("/") ? redirectParam : defaultRoute;

    toast.success("Authentication successful! Loading dashboard...");

    setTimeout(() => {
      setIsLoginSubmitted(false);
      router.push(targetRoute);
    }, 850);
  };

  // Handle Sign Up Submit
  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreeTerms) {
      toast.error("Please accept the Terms of Service & Privacy Policy to continue.");
      return;
    }

    setIsSignupSubmitted(true);

    const finalName = companyName.trim() || "Solar Enterprise";
    const finalEmail = signupEmail.trim() || "partner@suryanexa.com";
    const role: "TRADER" | "VENDOR" =
      businessType === "Trader / Bonded Stockist" ? "TRADER" : "VENDOR";

    if (typeof window !== "undefined") {
      localStorage.setItem(
        "suryanexa_user",
        JSON.stringify({
          name: finalName,
          email: finalEmail,
          role: role,
          company: finalName,
          businessType: businessType,
        })
      );
      window.dispatchEvent(new Event("suryanexa_user_updated"));
    }

    const redirectParam = searchParams.get("redirect");
    const defaultRoute = role === "VENDOR" ? "/vendor/profile" : "/trader/profile";
    const targetRoute =
      redirectParam && redirectParam.startsWith("/") ? redirectParam : defaultRoute;

    toast.success("Account created successfully! Welcome to SuryaNexa.");

    setTimeout(() => {
      setIsSignupSubmitted(false);
      router.push(targetRoute);
    }, 850);
  };

  // Handle Social Login Demo
  const handleSocialAuth = (provider: string) => {
    toast.info(`Connecting to ${provider}...`);
    setTimeout(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "suryanexa_user",
          JSON.stringify({
            name: `${provider} Partner`,
            email: `partner@${provider.toLowerCase()}.com`,
            role: "VENDOR",
            company: `${provider} Solar Alliance`,
          })
        );
        window.dispatchEvent(new Event("suryanexa_user_updated"));
      }
      toast.success(`Signed in with ${provider}!`);
      router.push("/vendor/profile");
    }, 700);
  };

  // Handle Forgot Password Submit
  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsResetSent(true);
    toast.success("Password reset instructions sent to your email!");
    setTimeout(() => {
      setIsResetSent(false);
    }, 5000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 22, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="relative bg-[#0c1816]/92 shadow-[0_30px_80px_rgba(0,0,0,0.65)] backdrop-blur-2xl p-7 sm:p-9 border border-[#1c3832] rounded-[32px] w-full max-w-[480px] overflow-hidden"
    >
      {/* Subtle top emerald glow line */}
      <div className="top-0 left-1/2 absolute bg-gradient-to-r from-transparent via-[#10b981] to-transparent w-48 h-[2px] -translate-x-1/2 pointer-events-none" />

      <AnimatePresence mode="wait" initial={false}>
        {view === "forgot" ? (
          /* =======================================================================
             VIEW 1: FORGOT PASSWORD
             ======================================================================= */
          <motion.div
            key="forgot-view"
            initial={{ opacity: 0, x: -16, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: 16, filter: "blur(4px)" }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex justify-between items-center mb-4 pb-4 border-[#1c3832] border-b">
              <button
                type="button"
                onClick={() => setView("auth")}
                className="inline-flex items-center gap-1.5 font-semibold text-zinc-400 hover:text-white text-xs transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Login</span>
              </button>
              <span className="bg-[#134e43] px-2.5 py-0.5 border border-emerald-500/30 rounded-full font-mono font-bold text-[10px] text-emerald-300">
                Reset Security
              </span>
            </div>

            <div className="space-y-2 mb-6">
              <h2 className="font-display font-extrabold text-white text-2xl sm:text-3xl tracking-tight">
                Reset Password
              </h2>
              <p className="font-sans text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Enter the work email associated with your SuryaNexa business account to receive a reset token.
              </p>
            </div>

            {isResetSent && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 bg-emerald-950/80 mb-5 p-3.5 border border-emerald-500/50 rounded-2xl text-emerald-300 text-xs"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Password reset link sent! Please check your email inbox.</span>
              </motion.div>
            )}

            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block font-sans font-semibold text-zinc-300 text-xs">
                  Work Email
                </label>
                <div className="relative">
                  <div className="left-0 absolute inset-y-0 flex items-center pl-4 text-zinc-500 pointer-events-none">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="bg-[#091614] py-3.5 pr-4 pl-11 border border-[#193a32] focus:border-emerald-500 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 w-full font-sans text-white text-sm transition-all placeholder-zinc-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="group flex justify-center items-center gap-2 bg-emerald-500 hover:bg-emerald-400 shadow-[0_10px_25px_rgba(16,185,129,0.3)] px-6 py-3.5 rounded-xl w-full font-bold text-zinc-950 text-sm transition-colors duration-200 cursor-pointer"
                >
                  <span>Send Reset Link</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-200" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        ) : (
          /* =======================================================================
             VIEW 2: UNIFIED AUTH CARD WITH ANIMATED SWITCHER
             ======================================================================= */
          <motion.div
            key="auth-view"
            initial={{ opacity: 0, x: 16, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -16, filter: "blur(4px)" }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Top Animated Segmented Switcher: Sign Up vs Login */}
            <div className="relative flex items-center bg-[#071311] opacity-none mb-7 p-1 border border-[#16352e] rounded-2xl select-none">
              <button
                type="button"
                onClick={() => setAuthTab("signup")}
                className={`relative z-10 flex-1 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-200 cursor-pointer text-center ${
                  authTab === "signup" ? "text-emerald-300" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {authTab === "signup" && (
                  <motion.div
                    layoutId="activeAuthTabPill"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    className="-z-10 absolute inset-0 bg-[#143e34] shadow-sm border border-[#1e584a] rounded-xl"
                  />
                )}
                Sign Up
              </button>

              <button
                type="button"
                onClick={() => setAuthTab("login")}
                className={`relative z-10 flex-1 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-200 cursor-pointer text-center ${
                  authTab === "login" ? "text-emerald-300" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {authTab === "login" && (
                  <motion.div
                    layoutId="activeAuthTabPill"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    className="-z-10 absolute inset-0 bg-[#143e34] shadow-sm border border-[#1e584a] rounded-xl"
                  />
                )}
                Login
              </button>
            </div>

            {/* Smooth Animated Content Switcher between Sign Up & Login */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={authTab}
                initial={{ opacity: 0, y: 12, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(5px)" }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Heading & Subtitle */}
                <div className="space-y-1 mb-6 text-center">
                  <h2 className="font-display font-extrabold text-white text-2xl sm:text-3xl tracking-tight">
                    {authTab === "signup" ? "Join the B2B Solar Network" : "Welcome Back"}
                  </h2>
                  <p className="font-sans text-zinc-400 text-xs sm:text-sm">
                    {authTab === "signup"
                      ? "Create your business account to get started"
                      : "Sign in to access your trader terminal & orders"}
                  </p>
                </div>

                {/* Redirect info alert */}
                {searchParams.get("redirect") && !isLoginSubmitted && !isSignupSubmitted && (
                  <div className="flex items-center gap-2 bg-emerald-950/60 mb-5 p-3 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs">
                    <Lock className="w-3.5 h-3.5 shrink-0" />
                    <span>Please authenticate to access your dashboard.</span>
                  </div>
                )}

                {/* ===================================================================
                    FORM BODY: SIGN UP vs LOGIN
                   =================================================================== */}
                {authTab === "signup" ? (
                  /* --- SIGN UP FORM --- */
                  <form onSubmit={handleSignupSubmit} className="space-y-3.5">
                    {/* Company Name */}
                    <div className="relative">
                      <div className="left-0 absolute inset-y-0 flex items-center pl-3.5 text-zinc-500 pointer-events-none">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Company Name"
                        className="bg-[#081513] py-3 pr-4 pl-10 border border-[#1a3832] focus:border-emerald-500 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 w-full font-sans text-white text-sm transition-all placeholder-zinc-500"
                      />
                    </div>

                    {/* Work Email */}
                    <div className="relative">
                      <div className="left-0 absolute inset-y-0 flex items-center pl-3.5 text-zinc-500 pointer-events-none">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        required
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        placeholder="Work Email"
                        className="bg-[#081513] py-3 pr-4 pl-10 border border-[#1a3832] focus:border-emerald-500 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 w-full font-sans text-white text-sm transition-all placeholder-zinc-500"
                      />
                    </div>

                    {/* Business Type Select */}
                    <div className="gap-2 grid grid-cols-12">
                      <div className="flex items-center col-span-5 bg-[#081513] px-3.5 py-3 border border-[#1a3832] rounded-xl font-sans font-medium text-zinc-400 text-xs">
                        Select Business Type
                      </div>
                      <div className="relative col-span-7">
                        <select
                          value={businessType}
                          onChange={(e) => setBusinessType(e.target.value as BusinessType)}
                          className="bg-[#081513] px-3.5 py-3 border border-[#1a3832] focus:border-emerald-500 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 w-full font-semibold text-white text-xs sm:text-sm transition-all appearance-none cursor-pointer"
                        >
                          <option value="EPC" className="bg-[#0c1816] text-white">
                            EPC
                          </option>
                          <option value="Trader / Bonded Stockist" className="bg-[#0c1816] text-white">
                            Trader / Bonded Stockist
                          </option>
                          <option value="Solar Vendor / Rooftop Installer" className="bg-[#0c1816] text-white">
                            Solar Vendor / Installer
                          </option>
                          <option value="Consultant / CAD Designer" className="bg-[#0c1816] text-white">
                            Solar Consultant / CAD
                          </option>
                        </select>
                        <div className="right-0 absolute inset-y-0 flex items-center pr-3 text-zinc-400 pointer-events-none">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Password */}
                    <div className="relative">
                      <div className="left-0 absolute inset-y-0 flex items-center pl-3.5 text-zinc-500 pointer-events-none">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showSignupPassword ? "text" : "password"}
                        required
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        placeholder="Password"
                        className="bg-[#081513] py-3 pr-10 pl-10 border border-[#1a3832] focus:border-emerald-500 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 w-full font-sans text-white text-sm transition-all placeholder-zinc-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowSignupPassword(!showSignupPassword)}
                        className="right-0 absolute inset-y-0 flex items-center pr-3.5 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                        aria-label={showSignupPassword ? "Hide password" : "Show password"}
                      >
                        {showSignupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Terms Checkbox */}
                    <div className="pt-1">
                      <label className="flex items-start gap-2.5 font-sans text-zinc-400 text-xs leading-tight cursor-pointer select-none">
                        <div
                          onClick={() => setAgreeTerms(!agreeTerms)}
                          className={`w-4 h-4 rounded mt-0.5 border flex items-center justify-center transition-colors shrink-0 ${
                            agreeTerms
                              ? "bg-emerald-500 border-emerald-500 text-zinc-950"
                              : "border-[#21433b] bg-[#081513]"
                          }`}
                        >
                          {agreeTerms && <Check className="stroke-[3] w-3 h-3" />}
                        </div>
                        <span>
                          I agree to the{" "}
                          <span className="text-zinc-300 hover:text-white underline underline-offset-2">
                            Terms of Service
                          </span>{" "}
                          &amp;{" "}
                          <span className="text-zinc-300 hover:text-white underline underline-offset-2">
                            Privacy Policy
                          </span>
                        </span>
                      </label>
                    </div>

                    {/* CTA Button: Create Free Account → */}
                    <div className="pt-2">
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isSignupSubmitted}
                        className="group flex justify-center items-center gap-2 bg-[#10b981] hover:bg-[#059669] shadow-[0_10px_25px_rgba(16,185,129,0.3)] px-6 py-3.5 rounded-xl w-full font-bold text-zinc-950 text-sm sm:text-base transition-colors duration-200 cursor-pointer"
                      >
                        <span>{isSignupSubmitted ? "Creating Account..." : "Create Free Account"}</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-200" />
                      </motion.button>
                    </div>
                  </form>
                ) : (
                  /* --- LOGIN FORM --- */
                  <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                    {/* Work Email */}
                    <div className="relative">
                      <div className="left-0 absolute inset-y-0 flex items-center pl-3.5 text-zinc-500 pointer-events-none">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="Work Email"
                        className="bg-[#081513] py-3 pr-4 pl-10 border border-[#1a3832] focus:border-emerald-500 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 w-full font-sans text-white text-sm transition-all placeholder-zinc-500"
                      />
                    </div>

                    {/* Password */}
                    <div className="relative">
                      <div className="left-0 absolute inset-y-0 flex items-center pl-3.5 text-zinc-500 pointer-events-none">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showLoginPassword ? "text" : "password"}
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Password"
                        className="bg-[#081513] py-3 pr-10 pl-10 border border-[#1a3832] focus:border-emerald-500 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 w-full font-sans text-white text-sm transition-all placeholder-zinc-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="right-0 absolute inset-y-0 flex items-center pr-3.5 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                        aria-label={showLoginPassword ? "Hide password" : "Show password"}
                      >
                        {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Helper Row: Remember me + Forgot password */}
                    <div className="flex justify-between items-center pt-1 text-xs">
                      <label className="flex items-center gap-2 font-sans text-zinc-400 cursor-pointer select-none">
                        <div
                          onClick={() => setRememberMe(!rememberMe)}
                          className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                            rememberMe
                              ? "bg-emerald-500 border-emerald-500 text-zinc-950"
                              : "border-[#21433b] bg-[#081513]"
                          }`}
                        >
                          {rememberMe && <Check className="stroke-[3] w-3 h-3" />}
                        </div>
                        <span>Remember me</span>
                      </label>

                      <button
                        type="button"
                        onClick={() => setView("forgot")}
                        className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                      >
                        Forgot Password?
                      </button>
                    </div>

                    {/* CTA Button: Login */}
                    <div className="pt-2">
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isLoginSubmitted}
                        className="group flex justify-center items-center gap-2 bg-[#10b981] hover:bg-[#059669] shadow-[0_10px_25px_rgba(16,185,129,0.3)] px-6 py-3.5 rounded-xl w-full font-bold text-zinc-950 text-sm sm:text-base transition-colors duration-200 cursor-pointer"
                      >
                        <span>{isLoginSubmitted ? "Authenticating..." : "Sign In to Terminal"}</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-200" />
                      </motion.button>
                    </div>
                  </form>
                )}

                {/* Social Auth Divider */}
                <div className="flex items-center pt-5 pb-4">
                  <div className="flex-1 border-[#173831] border-t" />
                  <span className="px-3 font-sans text-zinc-400 text-xs">
                    Or continue with
                  </span>
                  <div className="flex-1 border-[#173831] border-t" />
                </div>

                {/* 3 Social Buttons in a Row (Google, Facebook, Apple) */}
                <div className="gap-2.5 grid grid-cols-3">
                  {/* Google */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={() => handleSocialAuth("Google")}
                    className="flex justify-center items-center gap-2 bg-[#091714] hover:bg-[#102722] px-2 py-2.5 border border-[#193a32] rounded-xl font-semibold text-zinc-200 text-xs transition-colors cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                    <span>Google</span>
                  </motion.button>

                  {/* Facebook */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={() => handleSocialAuth("Facebook")}
                    className="flex justify-center items-center gap-2 bg-[#091714] hover:bg-[#102722] px-2 py-2.5 border border-[#193a32] rounded-xl font-semibold text-zinc-200 text-xs transition-colors cursor-pointer"
                  >
                    <svg className="fill-[#1877F2] w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span>Facebook</span>
                  </motion.button>

                  {/* Apple */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={() => handleSocialAuth("Apple")}
                    className="flex justify-center items-center gap-2 bg-[#091714] hover:bg-[#102722] px-2 py-2.5 border border-[#193a32] rounded-xl font-semibold text-zinc-200 text-xs transition-colors cursor-pointer"
                  >
                    <svg className="fill-current w-3.5 h-3.5 shrink-0 text-white" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.78 1.06-1.85.94-2.94-.92.04-2.02.61-2.67 1.38-.57.66-.99 1.76-.86 2.83 1.03.08 1.96-.49 2.59-1.27z" />
                    </svg>
                    <span>Apple</span>
                  </motion.button>
                </div>

                {/* Bottom Switch Prompt & Decorative Star Accent */}
                <div className="flex justify-between items-center mt-7 font-sans text-zinc-400 text-xs sm:text-sm">
                  <div>
                    {authTab === "signup" ? (
                      <span>
                        Already have an account?{" "}
                        <button
                          type="button"
                          onClick={() => setAuthTab("login")}
                          className="font-bold text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition-colors cursor-pointer"
                        >
                          Log In
                        </button>
                      </span>
                    ) : (
                      <span>
                        Don&apos;t have an account?{" "}
                        <button
                          type="button"
                          onClick={() => setAuthTab("signup")}
                          className="font-bold text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition-colors cursor-pointer"
                        >
                          Sign Up
                        </button>
                      </span>
                    )}
                  </div>

                  {/* Decorative Sparkle Accent */}
                  <div className="text-emerald-400/80">
                    <svg className="fill-current w-5 h-5" viewBox="0 0 24 24">
                      <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function LoginPage() {
  return (
    <div className="relative flex flex-col justify-between bg-[#071311] selection:bg-emerald-500 w-full min-h-screen overflow-x-hidden font-sans text-white selection:text-zinc-950">
      
      {/* =========================================================================
          BACKGROUND VIDEO IN LOOP WITH CINEMATIC EMERALD ATMOSPHERE FILTER
         ========================================================================= */}
      <div className="z-0 fixed inset-0 overflow-hidden pointer-events-none">
        {/* Looping Background Solar Work Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 brightness-[0.38] saturate-[1.15] w-full h-full object-cover filter contrast-[1.15]"
        >
          <source src="/solarWork.mp4" type="video/mp4" />
        </video>

        {/* Deep Emerald Tint & Darkening Overlay Filters */}
        <div className="absolute inset-0 bg-[#071311]/75 backdrop-brightness-100" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071311] via-[#071311]/50 to-[#071311]/80 opacity-0" />

        {/* Static Radial Gradients */}
        <div className="-top-32 -left-32 absolute bg-emerald-600/15 blur-[150px] rounded-full w-[600px] h-[600px]" />
        <div className="top-1/2 left-1/4 absolute bg-teal-500/10 blur-[180px] rounded-full w-[700px] h-[700px] -translate-y-1/2" />
        <div className="right-1/4 -bottom-32 absolute bg-emerald-500/15 blur-[160px] rounded-full w-[500px] h-[500px]" />

        {/* Static Subtle Tech Grid Lines */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* =========================================================================
          TOP NAVIGATION BAR
         ========================================================================= */}
      <header className="z-20 relative flex justify-between items-center px-6 sm:px-10 lg:px-14 py-6 w-full">
        {/* Left: Brand Logo & Name */}
        <Link href="/" className="group flex items-center gap-3 cursor-pointer">
          {/* Custom Vibrant SuryaNexa Ribbon Loop Emblem */}
          <div className="relative flex justify-center items-center w-10 h-10 group-hover:scale-105 transition-transform duration-300 shrink-0">
            <img
              src="/suryanexa-logo.png"
              alt="SuryaNexa Logo"
              className="drop-shadow-[0_0_12px_rgba(16,185,129,0.5)] w-full h-full object-contain"
            />
          </div>
          <span className="font-display font-black text-white text-2xl tracking-tight">
            Surya<span className="text-[#10b981]">NEXA</span>
          </span>
        </Link>

        {/* Right: Back to Home link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#0c1816] hover:bg-[#122824] shadow-sm px-4 py-2 border border-[#1b3d35] rounded-full text-zinc-300 hover:text-white text-xs sm:text-sm transition-all cursor-pointer"
        >
          <span>← Back to Home</span>
        </Link>
      </header>

      {/* =========================================================================
          MAIN BODY: TWO-COLUMN LAYOUT (BRAND SHOWCASE & AUTH CARD)
         ========================================================================= */}
      <main className="z-10 relative flex flex-1 justify-center items-center px-4 sm:px-8 lg:px-14 py-8 lg:py-12">
        <div className="items-center gap-12 lg:gap-16 grid grid-cols-1 lg:grid-cols-12 mx-auto w-full max-w-7xl">
          
          {/* =====================================================================
              LEFT COLUMN: BRAND SHOWCASE & VALUE PROPOSITION
             ===================================================================== */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative space-y-8 lg:col-span-6 xl:col-span-7 lg:pr-6"
          >
            
            {/* STATIC TECHNICAL RADAR / HUD GRAPHIC IN BACKGROUND (NO SPIN) */}
            <div className="-top-24 -left-20 -z-10 absolute opacity-35 w-[500px] h-[500px] pointer-events-none select-none">
              <svg viewBox="0 0 500 500" fill="none" className="w-full h-full text-emerald-500">
                <circle cx="250" cy="250" r="220" stroke="currentColor" strokeWidth="1" strokeDasharray="6 8" opacity="0.4" />
                <circle cx="250" cy="250" r="170" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                <circle cx="250" cy="250" r="120" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" opacity="0.5" />
                <path d="M 250 30 A 220 220 0 0 1 470 250" stroke="currentColor" strokeWidth="3" opacity="0.7" />
                <path d="M 250 470 A 220 220 0 0 1 30 250" stroke="currentColor" strokeWidth="3" opacity="0.7" />
              </svg>
            </div>

            {/* Glowing Logo & Brand Title */}
            <div className="space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="relative flex justify-center items-center w-16 h-16 shrink-0">
                  <img
                    src="/suryanexa-logo.png"
                    alt="SuryaNexa Logo"
                    className="drop-shadow-[0_0_24px_rgba(16,185,129,0.65)] w-full h-full object-contain"
                  />
                </div>
                <span className="font-display font-black text-white text-3xl sm:text-4xl tracking-tight">
                  Surya<span className="text-[#10b981]">NEXA</span>
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display font-extrabold text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.12] tracking-tight">
                Empowering Solar <br />
                Businesses
              </h1>

              {/* Subtitle */}
              <p className="max-w-xl font-sans text-zinc-300 text-base sm:text-lg leading-relaxed">
                Manage operations, trade, and scale seamlessly on one platform.
              </p>
            </div>

            {/* 3 Core Value Propositions with Green Checkmarks */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex justify-center items-center bg-emerald-500/20 border border-emerald-500/30 rounded-full w-6 h-6 text-emerald-400 shrink-0">
                  <Check className="stroke-[2.5] w-3.5 h-3.5" />
                </div>
                <span className="font-medium text-zinc-200 text-sm sm:text-base">
                  Direct access to verified EPCs &amp; installers
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex justify-center items-center bg-emerald-500/20 border border-emerald-500/30 rounded-full w-6 h-6 text-emerald-400 shrink-0">
                  <Check className="stroke-[2.5] w-3.5 h-3.5" />
                </div>
                <span className="font-medium text-zinc-200 text-sm sm:text-base">
                  Seamless B2B solar equipment supply chains
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex justify-center items-center bg-emerald-500/20 border border-emerald-500/30 rounded-full w-6 h-6 text-emerald-400 shrink-0">
                  <Check className="stroke-[2.5] w-3.5 h-3.5" />
                </div>
                <span className="font-medium text-zinc-200 text-sm sm:text-base">
                  Safe trade with escrow &amp; verification
                </span>
              </div>
            </div>

            {/* Bottom Trust Badge Pills */}
            <div className="flex flex-wrap items-center gap-3 pt-6">
              <div className="inline-flex items-center gap-2 bg-[#0a1815]/90 shadow-xs px-3 py-1.5 border border-[#173831] rounded-full font-mono text-zinc-300 text-xs">
                <div className="flex justify-center items-center bg-emerald-500/20 rounded-full w-4 h-4 text-emerald-400">
                  <Check className="stroke-[3] w-2.5 h-2.5" />
                </div>
                <span>KYB-Verified Traders Only</span>
              </div>

              <div className="inline-flex items-center gap-2 bg-[#0a1815]/90 shadow-xs px-3 py-1.5 border border-[#173831] rounded-full font-mono text-zinc-300 text-xs">
                <div className="flex justify-center items-center bg-emerald-500/20 rounded-full w-4 h-4 text-emerald-400">
                  <Lock className="w-2.5 h-2.5" />
                </div>
                <span>Blind-Vault™ Lead Sealing</span>
              </div>

              <div className="inline-flex items-center gap-2 bg-[#0a1815]/90 shadow-xs px-3 py-1.5 border border-[#173831] rounded-full font-mono text-zinc-300 text-xs">
                <div className="flex justify-center items-center bg-emerald-500/20 rounded-full w-4 h-4 text-emerald-400">
                  <ShieldCheck className="w-2.5 h-2.5" />
                </div>
                <span>Transit Video Escrow</span>
              </div>
            </div>

          </motion.div>

          {/* =====================================================================
              RIGHT COLUMN: AUTH CARD WITH SMOOTH TRANSITIONS
             ===================================================================== */}
          <div className="flex justify-center lg:justify-end lg:col-span-6 xl:col-span-5 w-full">
            <Suspense fallback={<div className="bg-[#0c1816]/90 border border-[#1c3832] rounded-[32px] w-full max-w-[480px] h-[580px] animate-pulse" />}>
              <AuthCard />
            </Suspense>
          </div>

        </div>
      </main>

      {/* Static Footer */}
      <footer className="z-20 relative py-4 border-[#132824] border-t text-zinc-500 text-xs text-center">
        © {new Date().getFullYear()} SuryaNexa B2B Solar Intelligence. All rights reserved.
      </footer>
    </div>
  );
}
