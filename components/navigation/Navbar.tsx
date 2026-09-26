"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { DesktopNavigation } from "./DesktopNavigation";
import { MobileNavigation } from "./MobileNavigation";
import { Button } from "@/components/ui/Button";
import { getGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Entrance animation on mount
  useEffect(() => {
    if (prefersReducedMotion || !headerRef.current) return;
    const { gsap } = getGSAP();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        headerRef.current,
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      ).fromTo(
        "[data-nav-item]",
        { y: -8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.06 },
        "-=0.3"
      );
    }, headerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCloseMobile = React.useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  const isHomePage = pathname === "/";

  return (
    <>
      <header
        ref={headerRef}
        role="banner"
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isHomePage
            ? `home-header-tactile ${
                isScrolled
                  ? "shadow-[0_12px_36px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(239,236,228,0.1)] h-18 sm:h-20"
                  : "shadow-[0_4px_20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(239,236,228,0.06)] h-20"
              }`
            : isScrolled
            ? "bg-[#141619]/95 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_12px_32px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)] h-18 sm:h-20"
            : "bg-[#141619]/85 backdrop-blur-md border-b border-white/[0.08] h-20"
        }`}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-12 h-full flex items-center justify-between gap-4 xl:gap-8">
          {/* Official AxonVortex Brand Logo */}
          <div className="shrink-0">
            <BrandLogo variant="responsive" />
          </div>

          {/* Desktop Multi-Level Dropdown Navigation */}
          <DesktopNavigation />

          {/* Desktop Primary Growth CTA Button with Amber Glow */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <Button
              variant="amber"
              size="sm"
              withArrow
              asLink
              href="/growth-audit"
              className="font-medium tracking-wide shadow-[0_4px_16px_rgba(244,186,0,0.35)]"
            >
              Book Growth Audit
            </Button>
          </div>

          {/* Mobile Hamburger Trigger */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              type="button"
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileOpen}
              onClick={() => setIsMobileOpen((prev) => !prev)}
              className="p-2.5 rounded-[8px] bg-[#171a1e] border border-white/[0.08] text-[#EFECE4] shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)] hover:bg-[#21252a] hover:border-[#3B82F6]/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electricBlue"
            >
              {isMobileOpen ? (
                <X className="w-5 h-5 text-[#EFECE4]" />
              ) : (
                <Menu className="w-5 h-5 text-[#EFECE4]" />
              )}
            </button>
          </div>
        </div>

        {/* Soft Blue Edge Ambient Light */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/30 to-transparent"
        />
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileNavigation
        isOpen={isMobileOpen}
        onClose={handleCloseMobile}
        currentPath={pathname}
      />
    </>
  );
}
