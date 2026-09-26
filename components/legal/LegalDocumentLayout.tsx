"use client";

import React from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { SiteTextureBackground } from "@/components/layout/SiteTextureBackground";

interface LegalSection {
  id: string;
  title: string;
}

interface LegalDocumentLayoutProps {
  title: string;
  badge: string;
  lastUpdated: string;
  sections: LegalSection[];
  children: React.ReactNode;
  unresolvedCount: number;
}

export function LegalPlaceholder({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 my-0.5 rounded bg-[#F4BA00]/15 text-[#FDE68A] border border-[#F4BA00]/30 font-mono text-xs font-medium">
      <span className="w-1.5 h-1.5 rounded-full bg-[#F4BA00]" />
      [{text}]
    </span>
  );
}

export function LegalDocumentLayout({
  title,
  badge,
  lastUpdated,
  sections,
  children,
  unresolvedCount,
}: LegalDocumentLayoutProps) {
  return (
    <SiteTextureBackground>
      <div className="w-full text-[#EFECE4] selection:bg-[#3B82F6] selection:text-white min-h-screen">
        {/* 0. TOP BREADCRUMB BAR */}
        <div className="w-full border-b border-white/[0.08] bg-[#101215] px-6 md:px-12 py-3">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-wider">
            <div className="flex items-center gap-2 text-[#9AA3B2]">
              <Link href="/" className="hover:text-[#3B82F6] font-medium transition-colors">
                Home
              </Link>
              <span className="text-white/30">/</span>
              <span className="text-[#3B82F6] font-semibold">Legal &amp; Compliance</span>
              <span className="text-white/30">/</span>
              <span className="text-[#EFECE4] font-medium">{title}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-block w-2 h-2 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6] animate-pulse" />
              <span className="font-semibold text-[#EFECE4] tracking-widest text-[11px]">
                COMPLIANCE DIRECTIVE
              </span>
            </div>
          </div>
        </div>

        {/* 1. HERO BANNER */}
        <section className="pt-20 md:pt-24 pb-12 px-6 md:px-12 border-b border-white/[0.08]">
          <div className="max-w-7xl mx-auto flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#93C5FD]">
                {badge}
              </span>
              <span className="font-mono text-xs text-[#9AA3B2] uppercase tracking-widest">
                Last Updated: {lastUpdated}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-semibold tracking-tight text-[#EFECE4]">
              {title}
            </h1>

            {/* Legal Review Warning Box (Raised Panel with Recessed Icon Badge) */}
            <div className="p-6 rounded-2xl border border-[#F4BA00]/30 bg-[#1b1e22] shadow-[0_12px_28px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col sm:flex-row items-start gap-4">
              <div className="w-9 h-9 rounded-xl bg-[#101215] border border-[#F4BA00]/40 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)] flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5 text-[#F4BA00]" />
              </div>
              <div className="flex flex-col gap-1 text-xs font-body text-[#9AA3B2] leading-relaxed">
                <span className="font-mono font-semibold uppercase text-[#F4BA00] tracking-wider text-xs">
                  LEGAL COMPLIANCE NOTICE // {unresolvedCount} PENDING STATUTORY PLACEHOLDERS
                </span>
                <p>
                  This document is a governance draft structured under the <strong className="text-[#EFECE4]">DPDP Act 2023 (India)</strong>, <strong className="text-[#EFECE4]">EU/UK GDPR</strong>, and <strong className="text-[#EFECE4]">US CCPA/CPRA</strong> frameworks. In compliance with internal engineering safety rules, unresolved statutory fields are highlighted explicitly in amber badges below. They must be reviewed and populated with registered corporate records prior to formal legal filing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. BODY CONTENT WITH STICKY NAV */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Sticky Sidebar Navigation (Raised Shell with Recessed Inquiries Tray) */}
          <aside className="lg:col-span-4 sticky top-28 hidden lg:flex flex-col gap-4">
            <div className="rounded-2xl border border-white/[0.08] bg-[#1b1e22] p-6 shadow-[0_12px_28px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)]">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#9AA3B2] block mb-4 border-b border-white/10 pb-2">
                Document Table of Contents
              </span>
              <nav className="flex flex-col gap-1 font-mono text-xs">
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="px-3 py-2 rounded-lg text-[#9AA3B2] hover:text-[#EFECE4] hover:bg-white/5 transition-all truncate"
                  >
                    {sec.title}
                  </a>
                ))}
              </nav>
            </div>

            <div className="p-4 rounded-xl border border-white/[0.04] bg-[#101215] text-xs font-body text-[#9AA3B2] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
              <span className="font-mono font-semibold text-[#EFECE4] block mb-1">Direct Inquiries:</span>
              Reach our data protection desk at{" "}
              <a href="mailto:info@axonvortex.com" className="text-[#3B82F6] font-medium underline hover:text-[#93C5FD]">
                info@axonvortex.com
              </a>.
            </div>
          </aside>

          {/* Document Content */}
          <article className="lg:col-span-8 flex flex-col gap-12 font-body text-[#EFECE4] leading-relaxed">
            {children}
          </article>
        </div>
      </div>
    </SiteTextureBackground>
  );
}
