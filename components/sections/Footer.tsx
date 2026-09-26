"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Mail, MapPin } from "lucide-react";
import { BrandLogo } from "@/components/navigation/BrandLogo";
import { TactileButton } from "@/components/ui/TactileButton";

export function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleOpenCookieSettings = () => {
    if (typeof window !== "undefined") {
      const win = window as unknown as { openCookiePreferences?: () => void };
      if (win.openCookiePreferences) {
        win.openCookiePreferences();
      }
    }
  };

  return (
    <footer
      id="site-footer"
      className="relative z-content w-full text-[#EFECE4] border-t border-[#EFECE4]/[0.08] site-footer-tactile"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Top Callout Strip */}
        <div className="py-16 sm:py-20 border-b border-[#EFECE4]/[0.08] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181C21] border border-[#3B82F6]/30 text-xs font-mono tracking-wider w-fit shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F4BA00] animate-pulse" />
              <span className="text-[#EFECE4]/90">COMMISSION SCOPING READY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-semibold tracking-tight uppercase leading-[1.05] text-[#EFECE4]">
              <span className="text-[#3B82F6]">Build Smarter.</span>{" "}
              <span className="text-[#EFECE4]">Market Better.</span><br className="hidden sm:inline" />{" "}
              <span className="text-[#F4BA00]">Grow Faster.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#9AA3B2] max-w-2xl leading-relaxed mt-1">
              Combining strategy, creativity, automation and data into practical digital growth systems tailored to your commercial goals.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-4">
            <TactileButton
              variant="primary"
              size="lg"
              withArrow
              asLink
              href="/contact"
              className="w-full sm:w-auto"
            >
              Start a Project
            </TactileButton>
            <TactileButton
              variant="charcoal"
              size="lg"
              asLink
              href="/growth-audit"
              className="w-full sm:w-auto"
            >
              Take Growth Audit
            </TactileButton>
          </div>
        </div>

        {/* Middle Navigation Grid: 4 Columns */}
        <div className="py-14 sm:py-16 border-b border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand Info */}
          <div className="flex flex-col gap-5">
            <BrandLogo variant="horizontal" />
            <p className="text-xs text-[#9AA3B2] leading-relaxed">
              AxonVortex is an AI-driven digital growth agency that helps ambitious businesses build, market and scale through unified strategy, design, automation and engineering.
            </p>
            <div className="flex flex-col gap-2 pt-2 text-xs font-mono text-[#9AA3B2]">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#3B82F6]" />
                <a
                  href="mailto:info@axonvortex.com"
                  className="hover:text-[#3B82F6] transition-colors"
                >
                  info@axonvortex.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#F4BA00] shrink-0 mt-0.5" />
                <span>India · Global Delivery</span>
              </div>
            </div>
          </div>

          {/* Col 2: Solutions Domains */}
          <div className="flex flex-col gap-3">
            <span className="font-heading text-xs uppercase tracking-wider text-[#3B82F6] font-semibold">
              Commercial Domains
            </span>
            <ul className="flex flex-col gap-2 text-xs text-[#9AA3B2]" role="list">
              <li>
                <Link href="/digital-marketing" className="hover:text-[#EFECE4] transition-colors">
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link href="/ai-automation" className="hover:text-[#EFECE4] transition-colors">
                  AI & Automation
                </Link>
              </li>
              <li>
                <Link href="/websites-ecommerce" className="hover:text-[#EFECE4] transition-colors">
                  Websites & E-Commerce
                </Link>
              </li>
              <li>
                <Link href="/lead-generation" className="hover:text-[#EFECE4] transition-colors">
                  Lead Generation
                </Link>
              </li>
              <li>
                <Link href="/technology-digital-transformation" className="hover:text-[#EFECE4] transition-colors">
                  Technology & Transformation
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="text-[#3B82F6] hover:underline pt-1">
                  View All Solutions →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Specialized Capabilities */}
          <div className="flex flex-col gap-3">
            <span className="font-heading text-xs uppercase tracking-wider text-[#3B82F6] font-semibold">
              Capabilities
            </span>
            <ul className="flex flex-col gap-2 text-xs text-[#9AA3B2]" role="list">
              <li>
                <Link href="/services/meta-ads" className="hover:text-[#EFECE4] transition-colors">
                  Meta Ads
                </Link>
              </li>
              <li>
                <Link href="/services/google-ads" className="hover:text-[#EFECE4] transition-colors">
                  Google Ads
                </Link>
              </li>
              <li>
                <Link href="/services/seo" className="hover:text-[#EFECE4] transition-colors">
                  SEO & Search Authority
                </Link>
              </li>
              <li>
                <Link href="/services/ai-chatbots" className="hover:text-[#EFECE4] transition-colors">
                  AI Chatbots & Agents
                </Link>
              </li>
              <li>
                <Link href="/services/custom-software" className="hover:text-[#EFECE4] transition-colors">
                  Custom Software Development
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-[#3B82F6] hover:underline pt-1">
                  Explore 14 Workstreams →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Company & Governance */}
          <div className="flex flex-col gap-3">
            <span className="font-heading text-xs uppercase tracking-wider text-[#3B82F6] font-semibold">
              Company & Insights
            </span>
            <ul className="flex flex-col gap-2 text-xs text-[#9AA3B2]" role="list">
              <li>
                <Link href="/about" className="hover:text-[#EFECE4] transition-colors">
                  About AxonVortex
                </Link>
              </li>
              <li>
                <Link href="/approach" className="hover:text-[#EFECE4] transition-colors">
                  Our Approach
                </Link>
              </li>
              <li>
                <Link href="/growth-audit" className="hover:text-[#EFECE4] transition-colors">
                  Growth Diagnostic Audit
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-[#EFECE4] transition-colors">
                  Insights & Strategy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#EFECE4] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Utility Strip */}
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9AA3B2]/80">
          <div className="flex items-center gap-6">
            <span>© {new Date().getFullYear()} AxonVortex. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-[#EFECE4] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-[#EFECE4] transition-colors">
                Terms of Service
              </Link>
              <button
                type="button"
                onClick={handleOpenCookieSettings}
                className="hover:text-[#EFECE4] transition-colors cursor-pointer"
              >
                Cookie Preferences
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex items-center gap-2 px-3 py-1.5 rounded-[6px] bg-[#171a1e] border border-white/[0.08] text-xs font-mono text-[#EFECE4] shadow-[0_2px_4px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] hover:bg-[#21252a] hover:border-[#3B82F6]/50 transition-all cursor-pointer"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#3B82F6]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
