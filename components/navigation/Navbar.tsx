"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { mainNavigationTree } from "@/data/sitemap";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const usesDarkHeader =
    pathname === "/about" ||
    pathname === "/growth-audit" ||
    pathname === "/insights" ||
    pathname === "/authority-conversion" ||
    pathname.startsWith("/services/");
  const usesSandHeader =
    pathname === "/solutions" ||
    pathname === "/services" ||
    pathname === "/approach" ||
    pathname === "/contact";
  const isHome = pathname === "/";
  const headerSurface = usesDarkHeader
    ? "bg-slate text-sand"
    : usesSandHeader
      ? "bg-sand text-editorial-primary"
      : isHome
        ? "bg-transparent text-editorial-primary"
        : "bg-white text-editorial-primary";

  // Close menu upon navigation
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Lock body scroll only while mobile menu is open & handle Escape key
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsMobileOpen(false);
          toggleButtonRef.current?.focus();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileOpen]);

  return (
    <>
      {/* Normal document-flow header: scrolls naturally with the page content */}
      <header
        data-header-theme={usesDarkHeader ? "dark" : "light"}
        data-header-surface={usesDarkHeader ? "navy" : usesSandHeader ? "sand" : isHome ? "transparent" : "white"}
        className={`relative z-header w-full py-5 sm:py-7 transition-colors duration-300 ${headerSurface}`}
      >
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 md:px-12 flex items-center justify-between gap-8">
          {/* Logo */}
          <BrandLogo tone={usesDarkHeader ? "dark" : "light"} />

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9" aria-label="Main Navigation">
            {mainNavigationTree.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-[11px] font-heading font-semibold uppercase tracking-[0.14em] transition-colors py-2 after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-px after:origin-left after:transition-transform after:duration-300 ${
                    isActive
                      ? usesDarkHeader
                        ? "text-brand-coral after:bg-brand-coral after:scale-x-100"
                        : "text-brand-turquoise after:bg-brand-turquoise after:scale-x-100"
                      : usesDarkHeader
                        ? "text-sand/65 hover:text-white after:bg-white/70 after:scale-x-0 hover:after:scale-x-100"
                        : "text-editorial-secondary hover:text-editorial-primary after:bg-brand-coral after:scale-x-0 hover:after:scale-x-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              withArrow
              asLink
              href="/contact"
              className={
                usesDarkHeader
                  ? "min-h-11 px-6 border-white/30 text-white hover:bg-brand-coral hover:border-brand-coral hover:text-brand-navy"
                  : "min-h-11 px-6 border-brand-navy/30 hover:bg-brand-coral hover:border-brand-coral hover:text-brand-navy"
              }
            >
              Start Project
            </Button>
          </div>

          {/* Mobile Menu Toggle (44x44px accessible touch target) */}
          <button
            ref={toggleButtonRef}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={`lg:hidden w-11 h-11 flex items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-turquoise transition-colors ${
              usesDarkHeader
                ? "border border-white/25 bg-white/10 text-white hover:border-brand-coral"
                : "border border-brand-navy/15 bg-white/90 text-editorial-primary hover:border-brand-turquoise"
            }`}
            aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-navigation-drawer"
          >
            {isMobileOpen ? (
              <X className={`w-5 h-5 ${usesDarkHeader ? "text-white" : "text-editorial-primary"}`} />
            ) : (
              <Menu className={`w-5 h-5 ${usesDarkHeader ? "text-white" : "text-editorial-primary"}`} />
            )}
          </button>
        </div>
      </header>

      {/* Accessible Full-Screen Mobile Navigation Overlay */}
      <div
        id="mobile-navigation-drawer"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        aria-hidden={!isMobileOpen}
        inert={!isMobileOpen}
        className={`fixed inset-0 z-40 bg-white/98 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-8 pt-24 pb-8 transition-all duration-300 lg:hidden overflow-y-auto ${
          isMobileOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
        style={{
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 5.5rem)",
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 2rem)",
        }}
      >
        <div className="flex flex-col gap-5 max-w-md mx-auto w-full">
          <div className="text-[11px] font-mono tracking-widest text-brand-turquoise uppercase font-bold border-b border-brand-navy/10 pb-2">
            INDEX DIRECTORY
          </div>

          <nav className="flex flex-col divide-y divide-brand-navy/10" aria-label="Mobile Navigation Links">
            {mainNavigationTree.map((item, idx) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <div key={item.href} className="py-3.5 flex flex-col gap-2">
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`text-lg sm:text-xl font-heading font-semibold uppercase tracking-tight transition-colors flex items-center justify-between py-1 ${
                      isActive ? "text-brand-turquoise" : "text-editorial-primary hover:text-brand-turquoise"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-xs text-editorial-muted">0{idx + 1}</span>
                  </Link>

                  {item.children && (
                    <div className="pl-3 flex flex-col gap-1.5 pt-1 border-l-2 border-brand-turquoise/30">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setIsMobileOpen(false)}
                          className="text-xs font-sans text-editorial-secondary hover:text-brand-turquoise py-1 min-h-[36px] flex items-center"
                        >
                          → {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Mobile Drawer Bottom Action */}
        <div className="pt-6 border-t border-brand-navy/10 flex flex-col gap-3 max-w-md mx-auto w-full">
          <Button
            variant="primary"
            size="lg"
            withArrow
            asLink
            href="/contact"
            onClick={() => setIsMobileOpen(false)}
            className="w-full text-center justify-center min-h-[48px]"
          >
            Start Your Growth Journey
          </Button>
        </div>
      </div>
    </>
  );
}
