"use client";

import React, { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { authorityData } from "@/data/content/authorityConversion";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { getGSAP } from "@/lib/gsap";
import { DimensionalButton } from "@/components/ui/DimensionalButton";
import { DimensionalCard } from "@/components/ui/DimensionalCard";

export default function GrowthAuditPageClient() {
  const {
    growthAuditIntro: hero,
    whatWeLookAt: scope,
    whatYouGet: deliverables,
    auditFramework: framework,
    whoShouldRequestAudit: ideal,
  } = authorityData;

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const scopeRef = useRef<HTMLElement>(null);

  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const { gsap } = getGSAP();
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll("[data-anim='audit-hero']"),
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
            clearProps: "transform,opacity",
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="w-full bg-[#141619] text-[#EFECE4] selection:bg-[#3B82F6] selection:text-white overflow-x-clip"
    >
      {/* 0. TOP SPEC BAR */}
      <div className="w-full border-b border-white/[0.08] bg-[#101215] px-6 md:px-12 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-wider">
          <div className="flex items-center gap-2 text-[#9AA3B2]">
            <Link href="/" className="hover:text-[#3B82F6] font-medium transition-colors">
              Home
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-[#3B82F6] font-semibold">Digital Growth Audit</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-[#F4BA00] shadow-[0_0_8px_#F4BA00] animate-pulse" />
            <span className="font-semibold text-[#EFECE4] tracking-widest text-[11px]">
              FULL-SYSTEM DIAGNOSTIC
            </span>
          </div>
        </div>
      </div>

      {/* 1. HERO SECTION - Diagnostic System Interface */}
      <section
        ref={heroRef}
        className="relative pt-20 md:pt-28 pb-20 px-6 md:px-12 border-b border-white/[0.08] bg-[#141619]"
      >
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[300px] bg-[#F4BA00]/10 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div data-anim="audit-hero" className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-[#F4BA00]/15 border border-[#F4BA00]/30 text-[#FDE68A]">
                {hero.badge}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#93C5FD]">
                {hero.title}
              </span>
              <span className="font-mono text-xs text-[#9AA3B2] uppercase tracking-widest">
                OBJECTIVE EVALUATION
              </span>
            </div>

            <h1 data-anim="audit-hero" className="text-4xl sm:text-6xl md:text-7xl font-heading font-semibold tracking-tight leading-[1.05] text-[#EFECE4]">
              Find what&apos;s holding your <br />
              <span className="text-[#F4BA00] drop-shadow-[0_0_24px_rgba(244,186,0,0.25)]">
                digital growth back.
              </span>
            </h1>

            {/* Diagnostic Prompt List: Outer Raised Container with Inner Recessed Box */}
            <div data-anim="audit-hero" className="p-6 rounded-2xl bg-[#1b1e22] border border-white/[0.08] shadow-[0_16px_36px_-6px_rgba(0,0,0,0.72),0_6px_14px_-3px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col gap-3">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#9AA3B2] mb-1">
                Diagnostic Query
              </span>
              <div className="p-4 rounded-xl bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_4px_rgba(0,0,0,0.78),0_1px_0_rgba(255,255,255,0.035)] flex flex-col gap-2 text-sm sm:text-base font-body text-[#EFECE4]">
                {hero.questions.map((q, idx) => (
                  <p
                    key={idx}
                    className={
                      idx === hero.questions.length - 1
                        ? "font-heading font-semibold text-[#F4BA00] text-base sm:text-lg pt-2 border-t border-white/[0.08]"
                        : "text-[#9AA3B2]"
                    }
                  >
                    {q}
                  </p>
                ))}
              </div>
            </div>

            <p data-anim="audit-hero" className="text-base sm:text-lg font-body text-[#9AA3B2] max-w-2xl leading-relaxed">
              {hero.explanation}
            </p>

            <div data-anim="audit-hero" className="flex flex-wrap items-center gap-4 pt-4">
              <DimensionalButton
                variant="amber"
                size="lg"
                asLink
                href="/contact?type=audit"
              >
                {hero.cta.label}
                <ArrowRight className="ml-2 w-4 h-4" />
              </DimensionalButton>

              <DimensionalButton
                variant="outline"
                size="lg"
                asLink
                href="/solutions"
              >
                Explore All Solutions
              </DimensionalButton>
            </div>
          </div>

          {/* Right: Technical Spec Card (Outer Raised with Inner Recessed Box) */}
          <div data-anim="audit-hero" className="lg:col-span-4 flex flex-col">
            <div className="rounded-2xl border border-white/[0.08] bg-[#1b1e22] p-6 sm:p-8 shadow-[0_16px_36px_-6px_rgba(0,0,0,0.72),0_6px_14px_-3px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col gap-6">
              <div className="border-b border-white/[0.06] pb-4">
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#9AA3B2] block mb-1">
                  AUDIT SPECIFICATION
                </span>
                <span className="font-heading font-semibold text-2xl text-[#EFECE4]">
                  Full System Inspection
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 border-b border-white/[0.06] pb-4 text-xs font-mono">
                <div>
                  <span className="text-[#9AA3B2] block mb-1">CATEGORIES:</span>
                  <span className="font-semibold text-[#EFECE4]">6 Domains</span>
                </div>
                <div>
                  <span className="text-[#9AA3B2] block mb-1">CHECKPOINTS:</span>
                  <span className="font-semibold text-[#F4BA00]">28 Touchpoints</span>
                </div>
                <div>
                  <span className="text-[#9AA3B2] block mb-1">TURNAROUND:</span>
                  <span className="font-semibold text-[#EFECE4]">3-5 Business Days</span>
                </div>
                <div>
                  <span className="text-[#9AA3B2] block mb-1">FORMAT:</span>
                  <span className="font-semibold text-[#EFECE4]">Executive Deck</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_4px_rgba(0,0,0,0.78),0_1px_0_rgba(255,255,255,0.035)]">
                <span className="font-mono text-xs font-semibold text-[#3B82F6] block mb-1 uppercase">
                  Zero Obligation
                </span>
                <p className="text-xs text-[#9AA3B2] font-body leading-relaxed">
                  The audit delivers objective, actionable findings regardless of whether you choose to partner with AxonVortex for implementation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT WE LOOK AT (THE 6 AUDIT DOMAINS) */}
      <section
        ref={scopeRef}
        className="py-20 md:py-28 px-6 md:px-12 bg-[#121519] border-b border-white/[0.08] relative"
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#F4BA00]/15 border border-[#F4BA00]/30 text-[#FDE68A]">
                  {scope.badge}
                </span>
                <span className="font-mono text-xs uppercase font-medium tracking-widest text-[#9AA3B2]">
                  COMPREHENSIVE SURFACE
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold tracking-tight text-[#EFECE4]">
                {scope.title}
              </h2>
            </div>
            <span className="font-mono text-xs uppercase font-medium text-[#9AA3B2]">
              6 Critical Digital Surfaces
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {scope.categories.map((cat, idx) => (
              <DimensionalCard
                key={idx}
                elevation="level2"
                glowColor={idx % 2 === 0 ? "blue" : "amber"}
                className="p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
                    <span className="font-mono text-xs font-semibold text-[#3B82F6]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#F4BA00]" />
                  </div>

                  <h3 className="text-xl font-heading font-semibold text-[#EFECE4] mb-2">
                    {cat.name}
                  </h3>

                  {cat.description && (
                    <p className="text-xs text-[#9AA3B2] font-body leading-relaxed mb-4">
                      {cat.description}
                    </p>
                  )}

                  <span className="font-mono text-[11px] uppercase font-semibold text-[#F4BA00] tracking-wider block mb-2">
                    {cat.intro}
                  </span>

                  <div className="flex flex-col gap-2">
                    {cat.items.map((item, i) => (
                      <div key={i} className="p-2 rounded-[6px] bg-[#101215] border border-white/[0.04] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] flex items-center gap-2 text-xs font-body text-[#EFECE4]">
                        <Check className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </DimensionalCard>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHAT YOU GET (DELIVERABLES) */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-[#141619] border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#93C5FD]">
                  {deliverables.badge}
                </span>
                <span className="font-mono text-xs uppercase font-medium tracking-widest text-[#9AA3B2]">
                  ACTIONABLE OUTCOMES
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold tracking-tight text-[#EFECE4]">
                {deliverables.title}
              </h2>
            </div>
            <p className="font-mono text-xs uppercase font-medium text-[#9AA3B2]">
              {deliverables.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            {deliverables.items.map((item, idx) => (
              <DimensionalCard
                key={idx}
                elevation="level2"
                glowColor={idx % 2 === 0 ? "blue" : "amber"}
                className="p-7 flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <div className="font-mono text-xs font-semibold text-[#3B82F6] mb-4 border-b border-white/[0.08] pb-2">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-[#EFECE4] mb-3">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#9AA3B2] font-body leading-relaxed">
                  {item.description}
                </p>
              </DimensionalCard>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE AUDIT FRAMEWORK (PROGRESS PATH) */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-[#121519] border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#F4BA00]/15 border border-[#F4BA00]/30 text-[#FDE68A]">
                  {framework.badge}
                </span>
                <span className="font-mono text-xs uppercase font-medium tracking-widest text-[#9AA3B2]">
                  STEP-BY-STEP DIAGNOSIS
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold tracking-tight text-[#EFECE4]">
                {framework.title}
              </h2>
            </div>
            <span className="font-mono text-xs uppercase font-semibold text-[#F4BA00]">
              4-Stage Evaluation Cycle
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start relative">
            {framework.steps.map((st, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl border border-white/[0.08] bg-[#171a1e] shadow-[0_10px_26px_-4px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col justify-between hover:bg-[#21252a] hover:border-[#3B82F6]/50 transition-all min-h-[200px]"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#101215] text-[#93C5FD] border border-[#3B82F6]/30 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]">
                      STAGE {idx + 1}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#F4BA00]" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-[#EFECE4] mb-2">
                    {st.name}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#9AA3B2] font-body leading-relaxed">
                  {st.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHO SHOULD REQUEST AN AUDIT (QUALIFICATION) */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-[#141619] border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#F4BA00]/15 border border-[#F4BA00]/30 text-[#FDE68A]">
                  {ideal.badge}
                </span>
                <span className="font-mono text-xs uppercase font-medium tracking-widest text-[#9AA3B2]">
                  QUALIFICATION CRITERIA
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold tracking-tight text-[#EFECE4]">
                {ideal.title}
              </h2>
            </div>
            <p className="font-mono text-xs uppercase font-medium text-[#9AA3B2]">
              {ideal.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ideal.situations.map((sit, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-[#171a1e] border border-white/[0.08] shadow-[0_4px_14px_-2px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.08)] flex items-start gap-3 hover:bg-[#21252a] hover:border-[#3B82F6]/30 transition-colors"
              >
                <span className="w-5 h-5 rounded-full bg-[#101215] border border-[#F4BA00]/40 flex items-center justify-center font-bold text-xs text-[#FDE68A] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] shrink-0 mt-0.5">
                  ✓
                </span>
                <p className="text-xs sm:text-sm font-body text-[#EFECE4] leading-relaxed">
                  {sit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FINAL HIGH-IMPACT CTA */}
      <section className="py-24 px-6 md:px-12 bg-[#121519] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[600px] h-[350px] bg-[#F4BA00]/12 blur-[140px] rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto text-center flex flex-col items-center relative z-10">
          <div className="inline-block px-3.5 py-1 rounded-full bg-[#F4BA00]/15 border border-[#F4BA00]/30 font-mono text-xs font-semibold uppercase text-[#FDE68A] mb-8">
            DIAGNOSTIC FIRST
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-semibold tracking-tight text-[#EFECE4] mb-3 max-w-3xl leading-[1.05]">
            {ideal.closingHeadline1}
          </h2>
          <p className="text-2xl sm:text-4xl md:text-5xl font-heading font-semibold text-[#F4BA00] mb-8">
            {ideal.closingHeadline2}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <DimensionalButton
              variant="amber"
              size="lg"
              asLink
              href={ideal.cta.href}
            >
              {ideal.cta.label}
              <ArrowRight className="ml-2 w-4 h-4" />
            </DimensionalButton>

            <DimensionalButton
              variant="outline"
              size="lg"
              asLink
              href="/contact"
            >
              Direct Strategy Inquiry
            </DimensionalButton>
          </div>
        </div>
      </section>
    </div>
  );
}
