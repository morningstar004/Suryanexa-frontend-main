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
      className="w-full max-w-[480px] rounded-[32px] bg-[#0c1816]/92 backdrop-blur-2xl border border-[#1c3832] p-7 sm:p-9 shadow-[0_30px_80px_rgba(0,0,0,0.65)] relative overflow-hidden"
    >
      {/* Subtle top emerald glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-[#10b981] to-transparent pointer-events-none" />

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
            <div className="pb-4 mb-4 border-b border-[#1c3832] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setView("auth")}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Login</span>
              </button>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#134e43] text-emerald-300 border border-emerald-500/30">
                Reset Security
              </span>
            </div>

            <div className="mb-6 space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
                Reset Password
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                Enter the work email associated with your SuryaNexa business account to receive a reset token.
              </p>
            </div>

            {isResetSent && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Password reset link sent! Please check your email inbox.</span>
              </motion.div>
            )}

            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-zinc-300 font-sans">
                  Work Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#091614] border border-[#193a32] text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-sans"
                  />
                </div>
              </div>

              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm shadow-[0_10px_25px_rgba(16,185,129,0.3)] transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>Send Reset Link</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
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
            <div className="p-1 rounded-2xl bg-[#071311] border border-[#16352e] flex items-center mb-7 relative select-none">
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
                    className="absolute inset-0 bg-[#143e34] rounded-xl shadow-sm border border-[#1e584a] -z-10"
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
                    className="absolute inset-0 bg-[#143e34] rounded-xl shadow-sm border border-[#1e584a] -z-10"
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
                <div className="mb-6 space-y-1 text-center">
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
                    {authTab === "signup" ? "Join the B2B Solar Network" : "Welcome Back"}
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 font-sans">
                    {authTab === "signup"
                      ? "Create your business account to get started"
                      : "Sign in to access your trader terminal & orders"}
                  </p>
                </div>

                {/* Redirect info alert */}
                {searchParams.get("redirect") && !isLoginSubmitted && !isSignupSubmitted && (
                  <div className="mb-5 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
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
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Company Name"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#081513] border border-[#1a3832] text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-sans"
                      />
                    </div>

                    {/* Work Email */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        required
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        placeholder="Work Email"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#081513] border border-[#1a3832] text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-sans"
                      />
                    </div>

                    {/* Business Type Select */}
                    <div className="grid grid-cols-12 gap-2">
                      <div className="col-span-5 flex items-center px-3.5 py-3 rounded-xl bg-[#081513] border border-[#1a3832] text-zinc-400 text-xs font-sans font-medium">
                        Select Business Type
                      </div>
                      <div className="col-span-7 relative">
                        <select
                          value={businessType}
                          onChange={(e) => setBusinessType(e.target.value as BusinessType)}
                          className="w-full px-3.5 py-3 rounded-xl bg-[#081513] border border-[#1a3832] text-white text-xs sm:text-sm font-semibold focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all appearance-none cursor-pointer"
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
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-zinc-400">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Password */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showSignupPassword ? "text" : "password"}
                        required
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#081513] border border-[#1a3832] text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-sans"
                      />
                      <button
                        type="button"
                        onClick={() => setShowSignupPassword(!showSignupPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                        aria-label={showSignupPassword ? "Hide password" : "Show password"}
                      >
                        {showSignupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Terms Checkbox */}
                    <div className="pt-1">
                      <label className="flex items-start gap-2.5 text-xs text-zinc-400 font-sans cursor-pointer select-none leading-tight">
                        <div
                          onClick={() => setAgreeTerms(!agreeTerms)}
                          className={`w-4 h-4 rounded mt-0.5 border flex items-center justify-center transition-colors shrink-0 ${
                            agreeTerms
                              ? "bg-emerald-500 border-emerald-500 text-zinc-950"
                              : "border-[#21433b] bg-[#081513]"
                          }`}
                        >
                          {agreeTerms && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span>
                          I agree to the{" "}
                          <span className="text-zinc-300 underline underline-offset-2 hover:text-white">
                            Terms of Service
                          </span>{" "}
                          &amp;{" "}
                          <span className="text-zinc-300 underline underline-offset-2 hover:text-white">
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
                        className="w-full py-3.5 px-6 rounded-xl bg-[#10b981] hover:bg-[#059669] text-zinc-950 font-bold text-sm sm:text-base shadow-[0_10px_25px_rgba(16,185,129,0.3)] transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer group"
                      >
                        <span>{isSignupSubmitted ? "Creating Account..." : "Create Free Account"}</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </motion.button>
                    </div>
                  </form>
                ) : (
                  /* --- LOGIN FORM --- */
                  <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                    {/* Work Email */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="Work Email"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#081513] border border-[#1a3832] text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-sans"
                      />
                    </div>

                    {/* Password */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showLoginPassword ? "text" : "password"}
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#081513] border border-[#1a3832] text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-sans"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                        aria-label={showLoginPassword ? "Hide password" : "Show password"}
                      >
                        {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Helper Row: Remember me + Forgot password */}
                    <div className="flex items-center justify-between text-xs pt-1">
                      <label className="flex items-center gap-2 text-zinc-400 font-sans cursor-pointer select-none">
                        <div
                          onClick={() => setRememberMe(!rememberMe)}
                          className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                            rememberMe
                              ? "bg-emerald-500 border-emerald-500 text-zinc-950"
                              : "border-[#21433b] bg-[#081513]"
                          }`}
                        >
                          {rememberMe && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span>Remember me</span>
                      </label>

                      <button
                        type="button"
                        onClick={() => setView("forgot")}
                        className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors cursor-pointer"
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
                        className="w-full py-3.5 px-6 rounded-xl bg-[#10b981] hover:bg-[#059669] text-zinc-950 font-bold text-sm sm:text-base shadow-[0_10px_25px_rgba(16,185,129,0.3)] transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer group"
                      >
                        <span>{isLoginSubmitted ? "Authenticating..." : "Sign In to Terminal"}</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </motion.button>
                    </div>
                  </form>
                )}

                {/* Social Auth Divider */}
                <div className="pt-5 pb-4 flex items-center">
                  <div className="flex-1 border-t border-[#173831]" />
                  <span className="px-3 text-xs text-zinc-400 font-sans">
                    Or continue with
                  </span>
                  <div className="flex-1 border-t border-[#173831]" />
                </div>

                {/* 3 Social Buttons in a Row (Google, Facebook, Instagram) */}
                <div className="grid grid-cols-3 gap-2.5">
                  {/* Google */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={() => handleSocialAuth("Google")}
                    className="py-2.5 px-2 rounded-xl bg-[#091714] hover:bg-[#102722] border border-[#193a32] flex items-center justify-center gap-2 transition-colors cursor-pointer text-xs font-semibold text-zinc-200"
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
                    className="py-2.5 px-2 rounded-xl bg-[#091714] hover:bg-[#102722] border border-[#193a32] flex items-center justify-center gap-2 transition-colors cursor-pointer text-xs font-semibold text-zinc-200"
                  >
                    <svg className="w-3.5 h-3.5 shrink-0 fill-[#1877F2]" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span>Facebook</span>
                  </motion.button>

                  {/* Instagram */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={() => handleSocialAuth("Instagram")}
                    className="py-2.5 px-2 rounded-xl bg-[#091714] hover:bg-[#102722] border border-[#193a32] flex items-center justify-center gap-2 transition-colors cursor-pointer text-xs font-semibold text-zinc-200"
                  >
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                      <radialGradient id="ig-grad" cx="0.2" cy="1" r="1">
                        <stop offset="0%" stopColor="#fdf497" />
                        <stop offset="5%" stopColor="#fdf497" />
                        <stop offset="45%" stopColor="#fd5949" />
                        <stop offset="60%" stopColor="#d6249f" />
                        <stop offset="90%" stopColor="#285AEB" />
                      </radialGradient>
                      <path
                        fill="url(#ig-grad)"
                        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                      />
                    </svg>
                    <span>Instagram</span>
                  </motion.button>
                </div>

                {/* Bottom Switch Prompt & Decorative Star Accent */}
                <div className="mt-7 flex items-center justify-between text-xs sm:text-sm text-zinc-400 font-sans">
                  <div>
                    {authTab === "signup" ? (
                      <span>
                        Already have an account?{" "}
                        <button
                          type="button"
                          onClick={() => setAuthTab("login")}
                          className="text-emerald-400 hover:text-emerald-300 font-bold underline underline-offset-2 cursor-pointer transition-colors"
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
                          className="text-emerald-400 hover:text-emerald-300 font-bold underline underline-offset-2 cursor-pointer transition-colors"
                        >
                          Sign Up
                        </button>
                      </span>
                    )}
                  </div>

                  {/* Decorative Sparkle Accent */}
                  <div className="text-emerald-400/80">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
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
    <div className="relative min-h-screen w-full bg-[#071311] text-white overflow-x-hidden flex flex-col justify-between selection:bg-emerald-500 selection:text-zinc-950 font-sans">
      
      {/* =========================================================================
          STATIC BACKGROUND ATMOSPHERE: NO MOVING/ROTATING AMBIENT LOOPS
         ========================================================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Static Radial Gradients */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-emerald-600/10 blur-[150px]" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-teal-500/8 blur-[180px]" />
        <div className="absolute -bottom-32 right-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[160px]" />

        {/* Static Subtle Tech Grid Lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
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
      <header className="relative z-20 w-full px-6 sm:px-10 lg:px-14 py-6 flex items-center justify-between">
        {/* Left: Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          {/* Custom Vibrant SuryaNexa Hexagon Emblem */}
          <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-105 shrink-0 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(16,185,129,0.45)]">
              <defs>
                <linearGradient id="poly-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#eab308" />
                  <stop offset="50%" stopColor="#84cc16" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
                <linearGradient id="poly-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="50%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#eab308" />
                </linearGradient>
              </defs>
              <polygon
                points="50,6 88,27 88,73 50,94 12,73 12,27"
                fill="none"
                stroke="url(#poly-grad-1)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polygon
                points="50,22 75,37 75,63 50,78 25,63 25,37"
                fill="none"
                stroke="url(#poly-grad-2)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.8"
              />
            </svg>
          </div>
          <span className="text-2xl font-black font-display tracking-tight text-white">
            Surya<span className="text-[#10b981]">NEXA</span>
          </span>
        </Link>

        {/* Right: Back to Home link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0c1816] hover:bg-[#122824] border border-[#1b3d35] text-xs sm:text-sm text-zinc-300 hover:text-white transition-all cursor-pointer shadow-sm"
        >
          <span>← Back to Home</span>
        </Link>
      </header>

      {/* =========================================================================
          MAIN BODY: TWO-COLUMN LAYOUT (BRAND SHOWCASE & AUTH CARD)
         ========================================================================= */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-8 lg:px-14 py-8 lg:py-12">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* =====================================================================
              LEFT COLUMN: BRAND SHOWCASE & VALUE PROPOSITION
             ===================================================================== */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-7 space-y-8 lg:pr-6 relative"
          >
            
            {/* STATIC TECHNICAL RADAR / HUD GRAPHIC IN BACKGROUND (NO SPIN) */}
            <div className="pointer-events-none absolute -left-20 -top-24 w-[500px] h-[500px] opacity-35 select-none -z-10">
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
                <div className="w-14 h-14 relative flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_20px_rgba(16,185,129,0.6)]">
                    <defs>
                      <linearGradient id="hero-poly-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#eab308" />
                        <stop offset="40%" stopColor="#84cc16" />
                        <stop offset="80%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                    <polygon
                      points="50,6 88,27 88,73 50,94 12,73 12,27"
                      fill="none"
                      stroke="url(#hero-poly-grad)"
                      strokeWidth="11"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <polygon
                      points="50,22 75,37 75,63 50,78 25,63 25,37"
                      fill="none"
                      stroke="url(#hero-poly-grad)"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.7"
                    />
                  </svg>
                </div>
                <span className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white">
                  Surya<span className="text-[#10b981]">NEXA</span>
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white tracking-tight leading-[1.12]">
                Empowering Solar <br />
                Businesses
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-zinc-300 font-sans max-w-xl leading-relaxed">
                Manage operations, trade, and scale seamlessly on one platform.
              </p>
            </div>

            {/* 3 Core Value Propositions with Green Checkmarks */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span className="text-sm sm:text-base font-medium text-zinc-200">
                  Direct access to verified EPCs &amp; installers
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span className="text-sm sm:text-base font-medium text-zinc-200">
                  Seamless B2B solar equipment supply chains
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span className="text-sm sm:text-base font-medium text-zinc-200">
                  Safe trade with escrow &amp; verification
                </span>
              </div>
            </div>

            {/* Bottom Trust Badge Pills */}
            <div className="pt-6 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a1815]/90 border border-[#173831] text-xs font-mono text-zinc-300 shadow-xs">
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span>KYB-Verified Traders Only</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a1815]/90 border border-[#173831] text-xs font-mono text-zinc-300 shadow-xs">
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Lock className="w-2.5 h-2.5" />
                </div>
                <span>Blind-Vault™ Lead Sealing</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a1815]/90 border border-[#173831] text-xs font-mono text-zinc-300 shadow-xs">
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-2.5 h-2.5" />
                </div>
                <span>Transit Video Escrow</span>
              </div>
            </div>

          </motion.div>

          {/* =====================================================================
              RIGHT COLUMN: AUTH CARD WITH SMOOTH TRANSITIONS
             ===================================================================== */}
          <div className="lg:col-span-6 xl:col-span-5 w-full flex justify-center lg:justify-end">
            <Suspense fallback={<div className="w-full max-w-[480px] h-[580px] rounded-[32px] bg-[#0c1816]/90 animate-pulse border border-[#1c3832]" />}>
              <AuthCard />
            </Suspense>
          </div>

        </div>
      </main>

      {/* Static Footer */}
      <footer className="relative z-20 py-4 text-center text-xs text-zinc-500 border-t border-[#132824]">
        © {new Date().getFullYear()} SuryaNexa B2B Solar Intelligence. All rights reserved.
      </footer>
    </div>
  );
}
