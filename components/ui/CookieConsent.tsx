"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, X } from "lucide-react";
import { DimensionalButton } from "@/components/ui/DimensionalButton";

const CONSENT_KEY = "axon_cookie_consent_v2";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(true);
  const [marketingAllowed, setMarketingAllowed] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (!stored) {
        setIsVisible(true);
      } else {
        const parsed = JSON.parse(stored);
        setAnalyticsAllowed(!!parsed.analytics);
        setMarketingAllowed(!!parsed.marketing);
      }
    } catch {
      setIsVisible(true);
    }

    const openPreferencesHandler = () => {
      setIsVisible(true);
      setShowDetails(true);
    };

    window.addEventListener("open-cookie-settings", openPreferencesHandler);
    return () => window.removeEventListener("open-cookie-settings", openPreferencesHandler);
  }, []);

  const savePreferences = (analytics: boolean, marketing: boolean) => {
    try {
      localStorage.setItem(
        CONSENT_KEY,
        JSON.stringify({
          essential: true,
          analytics,
          marketing,
          timestamp: new Date().toISOString(),
        })
      );
    } catch {
      // Ignored if local storage unavailable
    }
    setAnalyticsAllowed(analytics);
    setMarketingAllowed(marketing);
    setIsVisible(false);
  };

  const handleAcceptAll = () => savePreferences(true, true);
  const handleRejectNonEssential = () => savePreferences(false, false);
  const handleSaveCustom = () => savePreferences(analyticsAllowed, marketingAllowed);

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:max-w-xl z-modal rounded-2xl bg-[#1b1e22] border border-white/[0.08] p-6 shadow-[0_20px_50px_-6px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.1)] text-[#EFECE4] animate-in fade-in slide-in-from-bottom-4 duration-200"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#F4BA00]/20 border border-[#F4BA00]/40 flex items-center justify-center font-bold text-[#FDE68A]">
            <ShieldCheck className="w-5 h-5 text-[#F4BA00]" />
          </div>
          <h2 className="font-heading font-semibold text-sm md:text-base tracking-wider text-[#EFECE4] uppercase">
            PRIVACY &amp; COOKIE CONSENT
          </h2>
        </div>
        <button
          onClick={handleRejectNonEssential}
          aria-label="Close and decline non-essential cookies"
          className="p-1 text-[#9AA3B2] hover:text-[#EFECE4] hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <p className="font-body text-xs md:text-sm text-[#9AA3B2] mb-4 leading-relaxed">
        AxonVortex uses cookies to optimize site performance and deliver personalized digital solutions.
        Per DPDP Act 2023, GDPR, and CCPA guidelines, you can accept all cookies or manage your specific preferences.
        Review our{" "}
        <Link href="/privacy" className="underline font-medium text-[#3B82F6] hover:text-[#93C5FD]">
          Privacy Policy
        </Link>
        .
      </p>

      {showDetails && (
        <div className="p-4 rounded-xl bg-[#101215] border border-white/[0.05] shadow-[inset_0_2px_5px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(0,0,0,0.9),0_1px_0_rgba(255,255,255,0.035)] my-3 flex flex-col gap-2.5 text-xs font-body">
          <label className="flex items-center justify-between cursor-not-allowed opacity-75">
            <span className="font-medium text-[#EFECE4]">Strictly Necessary (Required)</span>
            <input type="checkbox" checked disabled className="accent-[#3B82F6] w-4 h-4 rounded" />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-[#9AA3B2]">Analytics Cookies (Google Analytics)</span>
            <input
              type="checkbox"
              checked={analyticsAllowed}
              onChange={(e) => setAnalyticsAllowed(e.target.checked)}
              className="accent-[#3B82F6] w-4 h-4 rounded cursor-pointer"
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-[#9AA3B2]">Marketing / Retargeting Pixels</span>
            <input
              type="checkbox"
              checked={marketingAllowed}
              onChange={(e) => setMarketingAllowed(e.target.checked)}
              className="accent-[#3B82F6] w-4 h-4 rounded cursor-pointer"
            />
          </label>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <DimensionalButton size="sm" variant="amber" onClick={handleAcceptAll}>
          Accept All
        </DimensionalButton>
        <DimensionalButton size="sm" variant="outline" onClick={handleRejectNonEssential}>
          Reject Non-Essential
        </DimensionalButton>
        <button
          onClick={() => (showDetails ? handleSaveCustom() : setShowDetails(true))}
          className="text-xs font-mono font-medium text-[#9AA3B2] hover:text-[#EFECE4] underline ml-auto transition-colors cursor-pointer"
        >
          {showDetails ? "SAVE PREFERENCES" : "CUSTOMIZE"}
        </button>
      </div>
    </div>
  );
}
