"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowUp, Phone, Mail, MapPin } from "lucide-react";
import { BrandLogo } from "@/components/navigation/BrandLogo";
import { siteConfig } from "@/data/siteConfig";

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
      className="relative z-content w-full bg-[#0F2747] text-white border-t-4 border-[#090909]"
    >
      <div className="w-full max-w-[1720px] mx-auto">
        {/* Top Split Section: Giant Callout & Brand Coordinates */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-b-2 border-white/20">
          {/* Left Hero Anchor (7 cols) */}
          <div className="lg:col-span-7 p-8 md:p-12 lg:p-16 border-b-2 lg:border-b-0 lg:border-r-2 border-white/20 flex flex-col justify-between gap-10">
            <div>
              <div className="inline-block px-3 py-1 bg-[#FFD447] text-[#090909] font-mono text-xs font-bold uppercase tracking-widest border border-[#090909] mb-6">
                GROWTH SYSTEM READY
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tight uppercase leading-[0.95] text-white">
                BUILD SMARTER.<br />
                MARKET BETTER.<br />
                <span className="text-[#F23B32]">GROW FASTER.</span>
              </h2>
            </div>

            <div className="pt-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-4 bg-[#F23B32] text-white text-lg sm:text-xl font-heading font-bold uppercase tracking-wider px-8 py-5 border-2 border-white shadow-[4px_4px_0px_0px_#FFFFFF] hover:bg-[#d92c24] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
              >
                <span>START A PROJECT</span>
                <ArrowUpRight className="w-6 h-6 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Direct Contact & Coordinates (5 cols) */}
          <div className="lg:col-span-5 p-8 md:p-12 lg:p-16 flex flex-col justify-between gap-8 bg-[#091a30]">
            <div>
              <BrandLogo tone="dark" />
              <p className="font-body text-sm text-white/80 mt-6 leading-relaxed max-w-sm">
                AxonVortex is an AI-driven digital growth agency that helps businesses build, market and scale smarter through strategy, creativity, automation and data.
              </p>
            </div>

            <div className="flex flex-col gap-4 border-t-2 border-white/20 pt-6">
              <div className="flex items-center gap-3 text-sm font-mono">
                <Mail className="w-4 h-4 text-[#FFD447]" />
                <a
                  href="mailto:info@axonvortex.com"
                  className="text-white hover:text-[#FFD447] underline underline-offset-4 transition-colors"
                >
                  info@axonvortex.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm font-mono">
                <Phone className="w-4 h-4 text-[#FFD447]" />
                <a
                  href="tel:+919933112213"
                  className="text-white hover:text-[#FFD447] transition-colors"
                >
                  +91 9933112213
                </a>
              </div>
              <div className="flex items-start gap-3 text-xs font-mono text-white/60">
                <MapPin className="w-4 h-4 text-[#FFD447] shrink-0 mt-0.5" />
                <span>India · Serving ambitious clients worldwide</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Navigation Grid: 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b-2 border-white/20 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-white/20">
          {/* Col 1: Solutions Domains */}
          <div className="p-8 flex flex-col gap-4">
            <span className="font-heading text-xs font-black uppercase tracking-widest text-[#FFD447]">
              01 / DOMAINS
            </span>
            <ul className="flex flex-col gap-2.5 font-body text-sm" role="list">
              <li>
                <Link href="/digital-marketing" className="hover:text-[#FFD447] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#F23B32] shrink-0" />
                  <span>Digital Marketing</span>
                </Link>
              </li>
              <li>
                <Link href="/ai-automation" className="hover:text-[#FFD447] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#2F5FA7] shrink-0" />
                  <span>AI & Automation</span>
                </Link>
              </li>
              <li>
                <Link href="/websites-ecommerce" className="hover:text-[#FFD447] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#FFD447] shrink-0" />
                  <span>Websites & E-Commerce</span>
                </Link>
              </li>
              <li>
                <Link href="/lead-generation" className="hover:text-[#FFD447] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#F23B32] shrink-0" />
                  <span>Lead Generation</span>
                </Link>
              </li>
              <li>
                <Link href="/technology-digital-transformation" className="hover:text-[#FFD447] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#2F5FA7] shrink-0" />
                  <span>Technology & Transformation</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Services Directory */}
          <div className="p-8 flex flex-col gap-4">
            <span className="font-heading text-xs font-black uppercase tracking-widest text-[#FFD447]">
              02 / SERVICES
            </span>
            <ul className="flex flex-col gap-2.5 font-body text-sm" role="list">
              <li>
                <Link href="/services/social-media-marketing" className="hover:text-[#FFD447] transition-colors">
                  Social Media Marketing
                </Link>
              </li>
              <li>
                <Link href="/services/meta-ads" className="hover:text-[#FFD447] transition-colors">
                  Meta Ads
                </Link>
              </li>
              <li>
                <Link href="/services/google-ads" className="hover:text-[#FFD447] transition-colors">
                  Google Ads & SEO
                </Link>
              </li>
              <li>
                <Link href="/services/ai-chatbots" className="hover:text-[#FFD447] transition-colors">
                  AI Chatbots & Agents
                </Link>
              </li>
              <li>
                <Link href="/services/website-development" className="hover:text-[#FFD447] transition-colors">
                  Website & E-Commerce Development
                </Link>
              </li>
              <li>
                <Link href="/services" className="font-bold text-[#FFD447] hover:underline pt-1 inline-flex items-center gap-1">
                  <span>View All 12 Services →</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Approach */}
          <div className="p-8 flex flex-col gap-4">
            <span className="font-heading text-xs font-black uppercase tracking-widest text-[#FFD447]">
              03 / COMPANY
            </span>
            <ul className="flex flex-col gap-2.5 font-body text-sm" role="list">
              <li>
                <Link href="/solutions" className="hover:text-[#FFD447] transition-colors">
                  Solutions Capability Map
                </Link>
              </li>
              <li>
                <Link href="/approach" className="hover:text-[#FFD447] transition-colors">
                  Our Growth Framework
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#FFD447] transition-colors">
                  About AxonVortex
                </Link>
              </li>
              <li>
                <Link href="/growth-audit" className="hover:text-[#FFD447] transition-colors">
                  Digital Growth Audit
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-[#FFD447] transition-colors">
                  Insights & Research
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FFD447] transition-colors">
                  Contact Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Governance & Legal */}
          <div className="p-8 flex flex-col gap-4">
            <span className="font-heading text-xs font-black uppercase tracking-widest text-[#FFD447]">
              04 / LEGAL & COMPLIANCE
            </span>
            <ul className="flex flex-col gap-2.5 font-body text-sm" role="list">
              <li>
                <Link href="/privacy" className="hover:text-[#FFD447] transition-colors">
                  Privacy Policy (DPDP / GDPR)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#FFD447] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleOpenCookieSettings}
                  className="text-left hover:text-[#FFD447] transition-colors underline underline-offset-4 cursor-pointer"
                >
                  Cookie Preferences
                </button>
              </li>
              <li className="pt-2 text-xs font-mono text-white/50 leading-relaxed">
                Registered under India DPDP Act 2023. Governed by Indian arbitration law.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Utility Bar */}
        <div className="p-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/60 bg-[#090909]">
          <div className="flex flex-wrap items-center gap-4">
            <span>© {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</span>
            <span className="hidden md:inline">·</span>
            <span className="text-white/40">Concept 9: Bauhaus Tech / Swiss Modernism</span>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-white hover:text-[#FFD447] font-bold uppercase tracking-widest transition-colors py-2 px-3 border border-white/20 hover:border-[#FFD447]"
            aria-label="Scroll to top of page"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 transform group-hover:-translate-y-0.5 transition-transform text-[#FFD447]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
