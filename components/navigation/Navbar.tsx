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
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.07 },
        "-=0.3"
      );
    }, headerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Determine if current hero section uses a dark surface
  const isDarkPage =
    pathname === "/about" ||
    pathname === "/ai-automation" ||
    pathname === "/technology-digital-transformation";

  const isSoftGrayPage =
    pathname === "/solutions" ||
    pathname === "/services" ||
    pathname === "/lead-generation" ||
    pathname === "/approach" ||
    pathname === "/growth-audit" ||
    pathname === "/contact" ||
    pathname.startsWith("/services/");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine background styling that merges seamlessly with hero without unnecessary divider
  const headerBgClass = isScrolled
    ? isDarkPage
      ? "bg-[#0F2747]/95 backdrop-blur-md border-b-2 border-white/20 shadow-[0_4px_0_0_#090909]"
      : isSoftGrayPage
        ? "bg-[#E9EDF2]/95 backdrop-blur-md border-b-2 border-[#090909] shadow-[0_4px_0_0_#090909]"
        : "bg-white/95 backdrop-blur-md border-b-2 border-[#090909] shadow-[0_4px_0_0_#090909]"
    : isDarkPage
      ? "bg-[#0F2747]"
      : isSoftGrayPage
        ? "bg-[#E9EDF2]"
        : "bg-white";

  return (
    <>
      <header
        ref={headerRef}
        role="banner"
        className={`sticky top-0 z-50 w-full transition-colors duration-200 ${headerBgClass}`}
      >
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 md:px-12 h-20 flex items-center justify-between gap-4 xl:gap-8">
          {/* Brand Logo */}
          <div className="shrink-0">
            <BrandLogo tone={isDarkPage ? "dark" : "light"} />
          </div>

          {/* Desktop Multi-Level Dropdown Navigation */}
          <DesktopNavigation isDarkPage={isDarkPage} />

          {/* Desktop Primary CTA Button */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <Button
              variant={isDarkPage ? "yellow" : "primary"}
              size="sm"
              withArrow
              asLink
              href="/contact"
              className="min-h-11 shadow-[3px_3px_0px_0px_#090909] hover:shadow-[1px_1px_0px_0px_#090909] active:translate-x-[1px] active:translate-y-[1px]"
            >
              Start a Project
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            className={`lg:hidden w-11 h-11 flex items-center justify-center border-2 border-brand-black shadow-[2px_2px_0px_0px_#090909] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all ${
              isDarkPage ? "bg-brand-yellow text-brand-black" : "bg-white text-brand-black"
            }`}
            aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-navigation-drawer"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileNavigation
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        currentPath={pathname}
      />
    </>
  );
}
