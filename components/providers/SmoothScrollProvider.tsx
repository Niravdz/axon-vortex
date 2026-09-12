"use client";

import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { ReactLenis, useLenis } from "lenis/react";
import { getGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, options?: Record<string, unknown>) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

// Declare window.__lenis for global debugging
declare global {
  interface Window {
    __lenis?: Lenis | null;
  }
}

/**
 * Internal synchronizer that connects Lenis scroll events to GSAP ScrollTrigger
 * and manages route change scroll-resets.
 */
function LenisScrollTriggerBridge({
  onInstanceReady,
}: {
  onInstanceReady: (instance: Lenis) => void;
}) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const lenis = useLenis((lenisInstance) => {
    // Keep GSAP ScrollTrigger in lockstep with Lenis on every frame
    const { ScrollTrigger } = getGSAP();
    ScrollTrigger.update();
  });

  useEffect(() => {
    if (!lenis) return;

    onInstanceReady(lenis);
    window.__lenis = lenis;

    const { gsap, ScrollTrigger } = getGSAP();

    // Prevent GSAP ticker lag smoothing from interfering with smooth inertia
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger once fonts and layout have settled
    if (document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    // Debounced window resize / orientation refresh
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, { passive: true });

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      if (window.__lenis === lenis) {
        window.__lenis = undefined;
      }
    };
  }, [lenis, onInstanceReady]);

  // Reset scroll to top on route change smoothly & refresh triggers
  useEffect(() => {
    if (!lenis) return;

    lenis.scrollTo(0, { immediate: true });

    const { ScrollTrigger } = getGSAP();
    const timer = setTimeout(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    }, 120);

    return () => clearTimeout(timer);
  }, [pathname, lenis]);

  return null;
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  // Tuned parameters for the iconic, buttery smooth Lenis momentum scroll
  const lenisOptions = useMemo(
    () => ({
      duration: prefersReducedMotion ? 0 : 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential deceleration
      orientation: "vertical" as const,
      gestureOrientation: "vertical" as const,
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      syncTouch: false, // Native responsive touch on mobile screens
      infinite: false,
      autoRaf: true,
      anchors: true,
    }),
    [prefersReducedMotion]
  );

  const scrollTo = useMemo(
    () => (target: string | number | HTMLElement, options?: Record<string, unknown>) => {
      if (lenisInstance) {
        lenisInstance.scrollTo(target, options);
      } else if (typeof window !== "undefined") {
        if (typeof target === "number") {
          window.scrollTo({ top: target, behavior: "smooth" });
        } else if (typeof target === "string") {
          const el = document.querySelector(target);
          el?.scrollIntoView({ behavior: "smooth" });
        } else if (target instanceof HTMLElement) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    [lenisInstance]
  );

  return (
    <ReactLenis root options={lenisOptions}>
      <LenisScrollTriggerBridge onInstanceReady={setLenisInstance} />
      <SmoothScrollContext.Provider value={{ lenis: lenisInstance, scrollTo }}>
        {children}
      </SmoothScrollContext.Provider>
    </ReactLenis>
  );
}
