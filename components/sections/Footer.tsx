"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { BrandLogo } from "@/components/navigation/BrandLogo";
import { siteConfig } from "@/data/siteConfig";

export function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      id="site-footer"
      className="relative z-content w-full bg-[#FFFFFF]/80 backdrop-blur-sm text-editorial-primary border-t border-brand-navy/20 [&_a]:min-h-11 [&_a]:inline-flex [&_a]:items-center"
    >
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
        {/* ========================================================================= */}
        {/* DESKTOP 4-COLUMN RULED GRID (≥1024px)                                     */}
        {/* ========================================================================= */}
        <div className="hidden lg:grid grid-cols-[38%_20.666%_20.666%_20.668%] border-x border-brand-navy/20">
          {/* ----------------------------------------------------------------------- */}
          {/* ROW 1: HEADER / COLUMN LABELS (~15% larger typography)                  */}
          {/* ----------------------------------------------------------------------- */}
          <div className="p-8 xl:p-10 border-b border-r border-brand-navy/20 flex items-center">
            <BrandLogo />
          </div>

          <div className="p-8 xl:p-10 border-b border-r border-brand-navy/20 flex items-center">
            <span className="font-heading text-sm xl:text-[15px] font-bold uppercase tracking-wider text-editorial-primary">
              ARCHITECTURES
            </span>
          </div>

          <div className="p-8 xl:p-10 border-b border-r border-brand-navy/20 flex items-center">
            <span className="font-heading text-sm xl:text-[15px] font-bold uppercase tracking-wider text-editorial-primary">
              SYSTEM
            </span>
          </div>

          <div className="p-8 xl:p-10 border-b border-brand-navy/20 flex items-center">
            <span className="font-heading text-sm xl:text-[15px] font-bold uppercase tracking-wider text-editorial-primary">
              STANDARDS
            </span>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* ROW 2: MAIN CONTENT & CONTACT CTA                                       */}
          {/* ----------------------------------------------------------------------- */}
          {/* Column 1: Contact Info + Dominant "LET'S TALK! ↗" CTA */}
          <div className="p-8 xl:p-10 border-b border-r border-brand-navy/20 flex flex-col justify-between min-h-[460px] xl:min-h-[520px]">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs xl:text-[13px] font-mono font-semibold uppercase tracking-wider text-editorial-secondary">
                  Get in touch
                </span>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-xl xl:text-2xl font-heading font-semibold text-editorial-primary hover:text-brand-turquoise transition-colors duration-200 underline decoration-brand-navy/30 hover:decoration-brand-turquoise underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-turquoise"
                >
                  {siteConfig.contact.email}
                </a>
              </div>

              <p className="text-[13.5px] xl:text-[15px] text-editorial-secondary font-sans leading-relaxed max-w-md">
                {siteConfig.description}
              </p>

              <div className="text-xs xl:text-[13px] font-mono text-editorial-muted">
                {siteConfig.contact.address}
              </div>
            </div>

            {/* Dominant Primary Visual Anchor CTA */}
            <div className="pt-8">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 text-5xl sm:text-6xl xl:text-[76px] font-heading font-black tracking-tight leading-none text-editorial-primary hover:text-brand-coral transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-turquoise rounded-sm"
                aria-label="Let's Talk - Initialize Commission"
              >
                <span>LET&apos;S TALK!</span>
                <ArrowUpRight className="w-10 h-10 xl:w-14 xl:h-14 stroke-[2.5] transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 text-brand-coral" />
              </Link>
            </div>
          </div>

          {/* Column 2: Architectures Navigation (~10-15% larger typography) */}
          <div className="p-8 xl:p-10 border-b border-r border-brand-navy/20 flex flex-col min-h-[460px] xl:min-h-[520px]">
            <ul className="flex flex-col gap-4 xl:gap-4.5 text-[13.5px] xl:text-[14.5px] font-mono" role="list">
              <li>
                <Link
                  href="/digital-marketing"
                  className="group flex items-center gap-3 text-editorial-secondary hover:text-brand-turquoise transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-turquoise"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-turquoise/70 group-hover:bg-brand-turquoise transition-colors shrink-0" />
                  <span className="group-hover:underline underline-offset-4">Digital Marketing</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/ai-automation"
                  className="group flex items-center gap-3 text-editorial-secondary hover:text-brand-turquoise transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-turquoise"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-turquoise/70 group-hover:bg-brand-turquoise transition-colors shrink-0" />
                  <span className="group-hover:underline underline-offset-4">AI & Automation</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/websites-ecommerce"
                  className="group flex items-center gap-3 text-editorial-secondary hover:text-brand-turquoise transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-turquoise"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-turquoise/70 group-hover:bg-brand-turquoise transition-colors shrink-0" />
                  <span className="group-hover:underline underline-offset-4">Websites & E-Commerce</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/lead-generation"
                  className="group flex items-center gap-3 text-editorial-secondary hover:text-brand-turquoise transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-turquoise"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-turquoise/70 group-hover:bg-brand-turquoise transition-colors shrink-0" />
                  <span className="group-hover:underline underline-offset-4">Lead Generation</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/technology-digital-transformation"
                  className="group flex items-center gap-3 text-editorial-secondary hover:text-brand-turquoise transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-turquoise"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-turquoise/70 group-hover:bg-brand-turquoise transition-colors shrink-0" />
                  <span className="group-hover:underline underline-offset-4">Digital Transformation</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: System Navigation */}
          <div className="p-8 xl:p-10 border-b border-r border-brand-navy/20 flex flex-col min-h-[460px] xl:min-h-[520px]">
            <ul className="flex flex-col gap-4 xl:gap-4.5 text-[13.5px] xl:text-[14.5px] font-mono" role="list">
              <li>
                <Link
                  href="/approach"
                  className="group flex items-center gap-3 text-editorial-secondary hover:text-brand-turquoise transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-turquoise"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-turquoise/70 group-hover:bg-brand-turquoise transition-colors shrink-0" />
                  <span className="group-hover:underline underline-offset-4">Our Approach</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/authority-conversion"
                  className="group flex items-center gap-3 text-editorial-secondary hover:text-brand-turquoise transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-turquoise"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-turquoise/70 group-hover:bg-brand-turquoise transition-colors shrink-0" />
                  <span className="group-hover:underline underline-offset-4">Authority & Growth</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="group flex items-center gap-3 text-editorial-secondary hover:text-brand-turquoise transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-turquoise"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-turquoise/70 group-hover:bg-brand-turquoise transition-colors shrink-0" />
                  <span className="group-hover:underline underline-offset-4">Service Directory</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="group flex items-center gap-3 text-editorial-secondary hover:text-brand-turquoise transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-turquoise"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-turquoise/70 group-hover:bg-brand-turquoise transition-colors shrink-0" />
                  <span className="group-hover:underline underline-offset-4">Initialize Commission</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Standards (Plain Text) */}
          <div className="p-8 xl:p-10 border-b border-brand-navy/20 flex flex-col min-h-[460px] xl:min-h-[520px]">
            <ul className="flex flex-col gap-4 xl:gap-4.5 text-[13.5px] xl:text-[14.5px] font-mono text-editorial-muted" role="list">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-navy/30 shrink-0" />
                <span>Strategy-first AI</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-navy/30 shrink-0" />
                <span>Measurable ROI</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-navy/30 shrink-0" />
                <span>Connected Pipelines</span>
              </li>
            </ul>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* ROW 3: BOTTOM UTILITY ROW (13-14px font-mono)                           */}
          {/* ----------------------------------------------------------------------- */}
          <div className="p-6 xl:p-7 border-r border-brand-navy/20 flex items-center text-[13px] xl:text-[14px] font-mono text-editorial-secondary">
            <span>© {new Date().getFullYear()} {siteConfig.legalName}.</span>
          </div>

          <div className="p-6 xl:p-7 border-r border-brand-navy/20 flex items-center text-[13px] xl:text-[14px] font-mono text-editorial-muted">
            <span className="tracking-wider uppercase">ALL SYSTEMS ACTIVE</span>
          </div>

          <div className="p-6 xl:p-7 border-r border-brand-navy/20 flex items-center text-[13px] xl:text-[14px] font-mono text-editorial-muted">
            <span className="tracking-wider uppercase">SCALING SMARTER</span>
          </div>

          <div className="p-6 xl:p-7 flex items-center justify-between">
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-[13px] xl:text-[14px] font-mono font-bold uppercase tracking-wider text-editorial-primary hover:text-brand-turquoise transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-turquoise min-h-[44px]"
              aria-label="Scroll back to top of page"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5 transform group-hover:-translate-y-0.5 transition-transform text-brand-turquoise" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TABLET / MOBILE RESPONSIVE LAYOUT (<1024px)                               */}
        {/* ========================================================================= */}
        <div className="lg:hidden border-x border-brand-navy/20 divide-y divide-brand-navy/20">
          {/* Logo & Headline Row */}
          <div className="p-6 sm:p-8 flex items-center justify-between">
            <BrandLogo />
          </div>

          {/* Contact Information & Big CTA */}
          <div className="p-6 sm:p-8 flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs sm:text-[13px] font-mono font-semibold uppercase tracking-wider text-editorial-secondary">
                Get in touch
              </span>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-lg sm:text-xl font-heading font-semibold text-editorial-primary hover:text-brand-turquoise transition-colors underline decoration-brand-navy/30 hover:decoration-brand-turquoise underline-offset-4 min-h-[44px] flex items-center"
              >
                {siteConfig.contact.email}
              </a>
            </div>

            <p className="text-[13.5px] sm:text-[14.5px] text-editorial-secondary font-sans leading-relaxed">
              {siteConfig.description}
            </p>

            <div className="pt-2">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-3xl sm:text-5xl font-heading font-black tracking-tight leading-none text-editorial-primary hover:text-brand-coral transition-colors min-h-[48px]"
              >
                <span>LET&apos;S TALK!</span>
                <ArrowUpRight className="w-7 h-7 sm:w-10 sm:h-10 text-brand-coral" />
              </Link>
            </div>
          </div>

          {/* Tablet 2-Col / Mobile Stacked Link Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-brand-navy/20">
            {/* Architectures */}
            <div className="p-6 sm:p-8 flex flex-col gap-4">
              <span className="font-heading text-sm font-bold uppercase tracking-wider text-editorial-primary">
                ARCHITECTURES
              </span>
              <ul className="flex flex-col gap-1 text-[13.5px] font-mono" role="list">
                <li>
                  <Link href="/digital-marketing" className="text-editorial-secondary hover:text-brand-turquoise min-h-[40px] flex items-center">
                    Digital Marketing
                  </Link>
                </li>
                <li>
                  <Link href="/ai-automation" className="text-editorial-secondary hover:text-brand-turquoise min-h-[40px] flex items-center">
                    AI & Automation
                  </Link>
                </li>
                <li>
                  <Link href="/websites-ecommerce" className="text-editorial-secondary hover:text-brand-turquoise min-h-[40px] flex items-center">
                    Websites & E-Commerce
                  </Link>
                </li>
                <li>
                  <Link href="/lead-generation" className="text-editorial-secondary hover:text-brand-turquoise min-h-[40px] flex items-center">
                    Lead Generation
                  </Link>
                </li>
                <li>
                  <Link href="/technology-digital-transformation" className="text-editorial-secondary hover:text-brand-turquoise min-h-[40px] flex items-center">
                    Digital Transformation
                  </Link>
                </li>
              </ul>
            </div>

            {/* System */}
            <div className="p-6 sm:p-8 flex flex-col gap-4">
              <span className="font-heading text-sm font-bold uppercase tracking-wider text-editorial-primary">
                SYSTEM
              </span>
              <ul className="flex flex-col gap-1 text-[13.5px] font-mono" role="list">
                <li>
                  <Link href="/approach" className="text-editorial-secondary hover:text-brand-turquoise min-h-[40px] flex items-center">
                    Our Approach
                  </Link>
                </li>
                <li>
                  <Link href="/authority-conversion" className="text-editorial-secondary hover:text-brand-turquoise min-h-[40px] flex items-center">
                    Authority & Growth
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-editorial-secondary hover:text-brand-turquoise min-h-[40px] flex items-center">
                    Service Directory
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-editorial-secondary hover:text-brand-turquoise min-h-[40px] flex items-center">
                    Initialize Commission
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Standards (Full width below) */}
          <div className="p-6 sm:p-8 flex flex-col gap-3 bg-white/40">
            <span className="font-heading text-xs sm:text-[13px] font-bold uppercase tracking-widest text-editorial-muted">
              STANDARDS
            </span>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] sm:text-[13.5px] font-mono text-editorial-muted" role="list">
              <li>• Strategy-first AI</li>
              <li>• Measurable ROI</li>
              <li>• Connected Pipelines</li>
            </ul>
          </div>

          {/* Bottom Utility Bar */}
          <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] font-mono text-editorial-secondary">
            <span>© {new Date().getFullYear()} {siteConfig.legalName}.</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 font-bold text-editorial-primary hover:text-brand-turquoise transition-colors min-h-[44px]"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5 text-brand-turquoise" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
