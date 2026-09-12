"use client";

import React from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, Shield, FileText } from "lucide-react";
import { BauhausBadge } from "@/components/ui/BauhausBadge";
import { Button } from "@/components/ui/Button";

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
    <span className="inline-flex items-center gap-1 px-2 py-0.5 my-0.5 bg-brand-yellow text-brand-black border border-brand-black font-mono text-xs font-bold shadow-sm">
      <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
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
    <div className="w-full bg-brand-white text-brand-black selection:bg-brand-red selection:text-white min-h-screen">
      
      {/* 0. TOP BREADCRUMB BAR */}
      <div className="w-full border-b-2 border-brand-black bg-brand-gray/50 px-6 md:px-12 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase">
          <div className="flex items-center gap-2 text-brand-black/70">
            <Link href="/" className="hover:text-brand-red font-bold transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-brand-red font-black">Legal &amp; Compliance</span>
            <span>/</span>
            <span className="text-brand-black font-bold">{title}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-brand-red animate-pulse" />
            <span className="font-bold text-brand-black tracking-wider">COMPLIANCE DIRECTIVE</span>
          </div>
        </div>
      </div>

      {/* 1. HERO BANNER */}
      <section className="pt-16 md:pt-20 pb-12 px-6 md:px-12 border-b-2 border-brand-black bg-brand-white">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <BauhausBadge variant="red" shape="square">
              {badge}
            </BauhausBadge>
            <span className="font-mono text-xs font-bold text-brand-black/60 uppercase tracking-widest">
              Last Updated: {lastUpdated}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black uppercase tracking-tighter text-brand-black">
            {title}
          </h1>

          {/* Legal Review Warning Box */}
          <div className="p-6 border-2 border-brand-black bg-brand-yellow/30 shadow-hard-md flex flex-col sm:flex-row items-start gap-4">
            <div className="w-10 h-10 bg-brand-yellow border-2 border-brand-black flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-brand-black" />
            </div>
            <div className="flex flex-col gap-1 text-xs font-sans text-brand-black/90 leading-relaxed">
              <span className="font-mono font-black uppercase text-brand-red tracking-wider text-xs">
                LEGAL COMPLIANCE NOTICE // {unresolvedCount} PENDING STATUTORY PLACEHOLDERS
              </span>
              <p>
                This document is a governance draft structured under the <strong>DPDP Act 2023 (India)</strong>, <strong>EU/UK GDPR</strong>, and <strong>US CCPA/CPRA</strong> frameworks. In compliance with internal engineering safety rules, unresolved statutory fields are highlighted explicitly in yellow badges below. They must be reviewed and populated with registered corporate records prior to formal legal filing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BODY CONTENT WITH STICKY NAV */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Sticky Sidebar Navigation */}
        <aside className="lg:col-span-4 sticky top-24 hidden lg:flex flex-col gap-4">
          <div className="border-2 border-brand-black bg-brand-gray p-6 shadow-hard-md">
            <span className="font-mono text-xs font-black uppercase tracking-widest text-brand-black/60 block mb-4 border-b-2 border-brand-black pb-2">
              Document Table of Contents
            </span>
            <nav className="flex flex-col gap-1 font-mono text-xs">
              {sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="px-3 py-2 border border-transparent hover:border-brand-black hover:bg-brand-white text-brand-black/80 hover:text-brand-red font-bold transition-all truncate"
                >
                  {sec.title}
                </a>
              ))}
            </nav>
          </div>

          <div className="p-4 border-2 border-brand-black bg-brand-white text-xs font-sans text-brand-black/70">
            <span className="font-mono font-bold text-brand-black block mb-1">Direct Inquiries:</span>
            Reach our data protection desk at{" "}
            <a href="mailto:info@axonvortex.com" className="text-brand-red font-bold underline">
              info@axonvortex.com
            </a>.
          </div>
        </aside>

        {/* Document Content */}
        <article className="lg:col-span-8 flex flex-col gap-12 font-sans text-brand-black leading-relaxed">
          {children}
        </article>

      </div>
    </div>
  );
}
