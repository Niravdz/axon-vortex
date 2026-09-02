"use client";

import React, { createContext, useContext, useEffect, useRef, useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
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

// Global reference to prevent duplicate instances in React StrictMode
let globalLenis: Lenis | null = null;
let activeTickerHandler: ((time: number) => void) | null = null;

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();
  const isInitialized = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const { gsap, ScrollTrigger } = getGSAP();

    // Respect user's reduced motion preference
    if (prefersReducedMotion) {
      if (globalLenis) {
        globalLenis.destroy();
        globalLenis = null;
      }
      setLenisInstance(null);
      return;
    }

    // Clean up any existing instance before initializing
    if (globalLenis) {
      if (activeTickerHandler) {
        gsap.ticker.remove(activeTickerHandler);
        activeTickerHandler = null;
      }
      globalLenis.destroy();
      globalLenis = null;
    }

    // Configure snappy, responsive Lenis smooth scrolling (zero heavy lag drift)
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 0.9,
      smoothWheel: true,
      syncTouch: false, // Native touch scrolling on mobile
      wheelMultiplier: 0.95,
      touchMultiplier: 1.0,
      orientation: "vertical",
      gestureOrientation: "vertical",
      autoRaf: false, // We synchronize RAF via GSAP ticker
    });

    globalLenis = lenis;
    setLenisInstance(lenis);
    isInitialized.current = true;

    // Connect Lenis scroll events to GSAP ScrollTrigger
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", handleScroll);

    // Synchronize Lenis render cycle with GSAP ticker loop (time in ms)
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };
    activeTickerHandler = tickerUpdate;

    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    // Coordinated ScrollTrigger refresh after document fonts and DOM layout settle
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
        ScrollTrigger.refresh();
      }, 150);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, { passive: true });

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);

      if (activeTickerHandler) {
        gsap.ticker.remove(activeTickerHandler);
        activeTickerHandler = null;
      }
      lenis.off("scroll", handleScroll);
      lenis.destroy();
      if (globalLenis === lenis) {
        globalLenis = null;
      }
      setLenisInstance(null);
      isInitialized.current = false;
    };
  }, [prefersReducedMotion]);

  // Reset scroll to top on route change smoothly & refresh triggers
  useEffect(() => {
    if (globalLenis) {
      globalLenis.scrollTo(0, { immediate: true });
    } else if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
    const { ScrollTrigger } = getGSAP();
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  const scrollTo = useMemo(
    () => (target: string | number | HTMLElement, options?: Record<string, unknown>) => {
      if (globalLenis) {
        globalLenis.scrollTo(target, options);
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
    []
  );

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisInstance, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
