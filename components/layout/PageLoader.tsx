"use client";

import React, { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function PageLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setIsMounted(true);
    // Instant reveal if session already recorded or reduced motion requested
    const hasLoaded = sessionStorage.getItem("axon_loader_complete");
    if (hasLoaded || prefersReducedMotion) {
      setIsVisible(false);
      return;
    }

    // Ultra-lightweight quick entry reveal (300ms) that doesn't block the UI
    const timer = setTimeout(() => {
      sessionStorage.setItem("axon_loader_complete", "true");
      setIsVisible(false);
    }, 350);

    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  if (!isMounted || !isVisible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-loader bg-[#141619] pointer-events-none transition-opacity duration-500 ease-out select-none flex items-center justify-center"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div className="w-32 h-[3px] bg-[#101215] relative overflow-hidden rounded-full border border-white/[0.08] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]">
        <div className="h-full bg-gradient-to-r from-[#3B82F6] to-[#F4BA00] animate-pulse w-full origin-left" />
      </div>
    </div>
  );
}
