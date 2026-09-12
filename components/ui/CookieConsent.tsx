"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, X } from "lucide-react";
import { Button } from "./Button";

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

const STORAGE_KEY = "axon_cookie_consent_v1";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);
  const [marketingAllowed, setMarketingAllowed] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        // Delay display slightly so it doesn't jarringly block initial render
        const timer = setTimeout(() => setIsVisible(true), 800);
        return () => clearTimeout(timer);
      } else {
        const parsed: CookiePreferences = JSON.parse(saved);
        setAnalyticsAllowed(parsed.analytics);
        setMarketingAllowed(parsed.marketing);
      }
    } catch {
      // Ignore localStorage errors
    }

    // Expose global reopen function for footer trigger
    if (typeof window !== "undefined") {
      (window as unknown as { openCookiePreferences: () => void }).openCookiePreferences = () => {
        setIsVisible(true);
        setShowDetails(true);
      };
    }
  }, []);

  const savePreferences = (analytics: boolean, marketing: boolean) => {
    const prefs: CookiePreferences = {
      necessary: true,
      analytics,
      marketing,
      timestamp: Date.now(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // Ignore
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
      className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:max-w-xl z-modal bg-white border-4 border-[#090909] p-6 shadow-[6px_6px_0px_0px_#090909] animate-in fade-in slide-in-from-bottom-4 duration-200"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#FFD447] border-2 border-[#090909] flex items-center justify-center font-bold text-[#090909]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="font-heading font-black uppercase text-sm md:text-base tracking-wider text-[#090909]">
            PRIVACY & COOKIE CONSENT
          </h2>
        </div>
        <button
          onClick={handleRejectNonEssential}
          aria-label="Close and decline non-essential cookies"
          className="p-1 text-[#090909] hover:bg-[#E9EDF2] border border-transparent hover:border-[#090909] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <p className="font-body text-xs md:text-sm text-[#090909]/80 mb-4 leading-relaxed">
        AxonVortex uses cookies to optimize site performance and deliver personalized digital solutions.
        Per DPDP Act 2023, GDPR, and CCPA guidelines, you can accept all cookies or manage your specific preferences.
        Review our{" "}
        <Link href="/privacy" className="underline font-bold text-[#F23B32] hover:text-[#090909]">
          Privacy Policy
        </Link>
        .
      </p>

      {showDetails && (
        <div className="border-t-2 border-b-2 border-[#090909] py-3 my-3 flex flex-col gap-2.5 text-xs font-body">
          <label className="flex items-center justify-between cursor-not-allowed opacity-75">
            <span className="font-semibold text-[#090909]">Strictly Necessary (Required)</span>
            <input type="checkbox" checked disabled className="accent-[#090909] w-4 h-4" />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-[#090909]">Analytics Cookies (Google Analytics)</span>
            <input
              type="checkbox"
              checked={analyticsAllowed}
              onChange={(e) => setAnalyticsAllowed(e.target.checked)}
              className="accent-[#F23B32] w-4 h-4 cursor-pointer"
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-[#090909]">Marketing / Retargeting Pixels</span>
            <input
              type="checkbox"
              checked={marketingAllowed}
              onChange={(e) => setMarketingAllowed(e.target.checked)}
              className="accent-[#F23B32] w-4 h-4 cursor-pointer"
            />
          </label>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Button size="sm" variant="primary" onClick={handleAcceptAll}>
          Accept All
        </Button>
        <Button size="sm" variant="outline" onClick={handleRejectNonEssential}>
          Reject Non-Essential
        </Button>
        <button
          onClick={() => (showDetails ? handleSaveCustom() : setShowDetails(true))}
          className="font-heading font-bold uppercase text-xs tracking-wider text-[#090909] hover:text-[#F23B32] underline ml-auto py-2"
        >
          {showDetails ? "Save Settings" : "Customize"}
        </button>
      </div>
    </div>
  );
}
