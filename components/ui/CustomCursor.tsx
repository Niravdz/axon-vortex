"use client";

import React, { useEffect, useRef, useState } from "react";
import { getGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Only enable on desktop/mouse devices and when reduced motion is not preferred
    if (prefersReducedMotion || typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const { gsap } = getGSAP();
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;

    if (!dot || !ring) return;

    // Quick setters for lag-free cursor tracking
    const setDotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power2.out" });
    const setDotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power2.out" });
    const setRingX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const setRingY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      setDotX(e.clientX);
      setDotY(e.clientY);
      setRingX(e.clientX);
      setRingY(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest("button") ||
        target?.closest("a") ||
        target?.closest("[data-magnetic]") ||
        target?.closest("[data-cursor-hover]") ||
        target?.closest("input") ||
        target?.closest("textarea")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      gsap.killTweensOf([dot, ring]);
    };
  }, [isVisible, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-cursor transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      } hidden md:block`}
    >
      {/* Precision center dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6] pointer-events-none transition-transform duration-200"
      />

      {/* Trailing follower ring */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none transition-all duration-300 ease-out ${
          isHovered
            ? "w-11 h-11 bg-[#3B82F6]/10 border-[#3B82F6] shadow-[0_0_16px_rgba(59,130,246,0.35)] scale-110"
            : "w-7 h-7 border-white/25 scale-100"
        }`}
      />
    </div>
  );
}
