"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { mainNavigationTree } from "@/data/sitemap";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-header transition-all duration-300 ${
          isScrolled
            ? "py-3 bg-background/90 backdrop-blur-md border-b border-border"
            : "py-6 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <BrandLogo />

          {/* Minimal Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-8">
            {mainNavigationTree.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[11px] font-heading uppercase tracking-widest transition-colors py-1 ${
                    isActive
                      ? "text-accent-orange font-semibold"
                      : "text-editorial-secondary hover:text-editorial-primary"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Outlined CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              withArrow
              magnetic
              asLink
              href="/contact"
            >
              Start Project
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 rounded-sm border border-border bg-surface text-editorial-primary hover:border-accent-orange transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Clean Dark Mobile Full-Screen Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-background flex flex-col justify-between p-8 pt-28 transition-all duration-400 lg:hidden ${
          isMobileOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        <div className="flex flex-col gap-6 overflow-y-auto max-h-[70vh]">
          <div className="text-[10px] font-mono tracking-widest text-accent-orange uppercase">
            INDEX DIRECTORY
          </div>

          {mainNavigationTree.map((item, idx) => (
            <div key={item.href} className="flex flex-col gap-2 border-b border-border pb-4">
              <Link
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className="text-xl font-heading font-semibold uppercase tracking-tight text-editorial-primary hover:text-accent-orange transition-colors flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="font-mono text-xs text-editorial-muted">0{idx + 1}</span>
              </Link>

              {item.children && (
                <div className="pl-4 flex flex-col gap-1.5 pt-2">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setIsMobileOpen(false)}
                      className="text-xs font-sans text-editorial-secondary hover:text-editorial-primary py-1"
                    >
                      → {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-border flex flex-col gap-3">
          <Button
            variant="primary"
            size="md"
            withArrow
            asLink
            href="/contact"
            onClick={() => setIsMobileOpen(false)}
            className="w-full text-center"
          >
            Start Your Growth Journey
          </Button>
        </div>
      </div>
    </>
  );
}
