"use client";

import { useRef, useLayoutEffect } from "react";
import { getGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

type AnimationSetup = (ctx: {
  gsap: typeof import("gsap").default;
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
  container: HTMLElement;
  mm: gsap.MatchMedia;
  prefersReducedMotion: boolean;
}) => void;

/**
 * Reusable hook that wraps GSAP context + ScrollTrigger + matchMedia
 * with automatic cleanup on unmount and reduced-motion support.
 *
 * Usage:
 *   const containerRef = useScrollAnimation((ctx) => {
 *     ctx.mm.add("(min-width: 1024px)", () => { ... });
 *   });
 */
export function useScrollAnimation(setup: AnimationSetup) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === "undefined") return;

    const { gsap, ScrollTrigger } = getGSAP();
    const mm = gsap.matchMedia();

    // Create a GSAP context scoped to the container for auto-cleanup
    const ctx = gsap.context(() => {
      setup({
        gsap,
        ScrollTrigger,
        container,
        mm,
        prefersReducedMotion,
      });
    }, container);

    // Refresh ScrollTrigger after fonts/layout settle
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(refreshTimer);
      mm.revert();
      ctx.revert();
    };
  }, [prefersReducedMotion, setup]);

  return containerRef;
}
