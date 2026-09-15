"use client";

import React, { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { BauhausBadge } from "@/components/ui/BauhausBadge";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { authorityData } from "@/data/content/authorityConversion";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { getGSAP } from "@/lib/gsap";

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
      className="w-full bg-brand-white text-brand-black selection:bg-brand-red selection:text-white overflow-x-clip"
    >
      {/* 0. TOP SPEC BAR */}
      <div className="w-full border-b-2 border-brand-black bg-brand-gray/50 px-6 md:px-12 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase">
          <div className="flex items-center gap-2 text-brand-black/70">
            <Link href="/" className="hover:text-brand-red font-bold transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-brand-red font-black">Digital Growth Audit</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-brand-red animate-pulse" />
            <span className="font-bold text-brand-black tracking-wider">FULL-SYSTEM DIAGNOSTIC</span>
          </div>
        </div>
      </div>

      {/* 1. HERO SECTION */}
      <section
        ref={heroRef}
        className="relative pt-16 md:pt-24 pb-20 px-6 md:px-12 border-b-2 border-brand-black bg-brand-white"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div data-anim="audit-hero" className="flex flex-wrap items-center gap-3">
              <BauhausBadge variant="red" shape="square">
                {hero.badge}
              </BauhausBadge>
              <BauhausBadge variant="yellow" shape="pill">
                {hero.title}
              </BauhausBadge>
              <span className="font-mono text-xs text-brand-black/60 font-bold uppercase tracking-widest">
                OBJECTIVE EVALUATION
              </span>
            </div>

            <h1 data-anim="audit-hero" className="text-4xl sm:text-6xl md:text-7xl font-heading font-bold uppercase tracking-[0.015em] leading-[0.95] text-brand-black">
              Find what&apos;s holding your <br />
              <span className="text-brand-red">digital growth back.</span>
            </h1>

            {/* Diagnostic Prompt List */}
            <div data-anim="audit-hero" className="p-6 bg-brand-gray border-2 border-brand-black shadow-hard-md flex flex-col gap-2">
              <span className="font-mono text-xs font-black uppercase tracking-widest text-brand-black/60 mb-1">
                Diagnostic Query
              </span>
              <div className="flex flex-col gap-1 text-sm sm:text-base font-sans text-brand-black/90">
                {hero.questions.map((q, idx) => (
                  <p key={idx} className={idx === hero.questions.length - 1 ? "font-display font-black text-brand-red uppercase text-base sm:text-lg pt-2" : ""}>
                    {q}
                  </p>
                ))}
              </div>
            </div>

            <p data-anim="audit-hero" className="text-base sm:text-lg font-body text-brand-black/80 max-w-2xl leading-relaxed">
              {hero.explanation}
            </p>

            <div data-anim="audit-hero" className="flex flex-wrap items-center gap-4 pt-4">
              <Button
                variant="primary"
                size="lg"
                className="bg-brand-red text-white hover:bg-brand-black text-base px-8 py-4"
                asLink
                href="/contact?type=audit"
              >
                {hero.cta.label}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-2 border-brand-black text-brand-black hover:bg-brand-yellow text-base px-6 py-4"
                asLink
                href="/solutions"
              >
                Explore All Solutions
              </Button>
            </div>
          </div>

          {/* Right: Technical Spec Card */}
          <div data-anim="audit-hero" className="lg:col-span-4 flex flex-col">
            <div className="border-2 border-brand-black bg-brand-gray p-6 sm:p-8 shadow-hard-lg flex flex-col gap-6">
              <div className="border-b-2 border-brand-black pb-4">
                <span className="font-mono text-xs font-black uppercase tracking-widest text-brand-black/60 block mb-1">
                  AUDIT SPECIFICATION
                </span>
                <span className="font-display font-black text-2xl uppercase text-brand-black">
                  Full System Inspection
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 border-b-2 border-brand-black pb-4 text-xs font-mono">
                <div>
                  <span className="text-brand-black/60 block mb-1">CATEGORIES:</span>
                  <span className="font-bold text-brand-black">6 Domains</span>
                </div>
                <div>
                  <span className="text-brand-black/60 block mb-1">CHECKPOINTS:</span>
                  <span className="font-bold text-brand-red">28 Touchpoints</span>
                </div>
                <div>
                  <span className="text-brand-black/60 block mb-1">TURNAROUND:</span>
                  <span className="font-bold text-brand-black">3-5 Business Days</span>
                </div>
                <div>
                  <span className="text-brand-black/60 block mb-1">FORMAT:</span>
                  <span className="font-bold text-brand-black">Executive Deck</span>
                </div>
              </div>

              <div className="p-4 bg-brand-white border-2 border-brand-black">
                <span className="font-mono text-xs font-black text-brand-red block mb-1 uppercase">
                  Zero Obligation
                </span>
                <p className="text-xs text-brand-black/80 font-sans leading-relaxed">
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
        className="py-20 md:py-28 px-6 md:px-12 bg-brand-gray border-b-2 border-brand-black"
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          <ScrollReveal variant="fade-up" className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-brand-black pb-8">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <BauhausBadge variant="yellow" shape="square">
                  {scope.badge}
                </BauhausBadge>
                <span className="font-mono text-xs uppercase font-bold tracking-widest text-brand-black/60">
                  COMPREHENSIVE SURFACE
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-brand-black">
                {scope.title}
              </h2>
            </div>
            <span className="font-mono text-xs uppercase font-bold text-brand-black/60">
              6 Critical Digital Surfaces
            </span>
          </ScrollReveal>

          <ScrollReveal variant="stagger" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scope.categories.map((cat, idx) => (
              <div
                key={idx}
                data-stagger-item
                className="p-8 border-2 border-brand-black bg-brand-white shadow-hard-md hover:shadow-hard-lg hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex flex-col justify-between min-h-[280px]"
              >
                <div>
                  <div className="flex items-center justify-between border-b-2 border-brand-black pb-3 mb-4">
                    <span className="font-mono text-xs font-black text-brand-red">
                      DOMAIN
                    </span>
                    <span className="w-2.5 h-2.5 bg-brand-black" />
                  </div>

                  <h3 className="text-xl font-display font-black uppercase text-brand-black mb-2">
                    {cat.name}
                  </h3>

                  {cat.description && (
                    <p className="text-xs text-brand-black/70 font-sans leading-relaxed mb-4">
                      {cat.description}
                    </p>
                  )}

                  <span className="font-mono text-[11px] uppercase font-bold text-brand-black/50 tracking-wider block mb-2">
                    {cat.intro}
                  </span>

                  <div className="flex flex-col gap-1.5">
                    {cat.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-sans text-brand-black/90">
                        <Check className="w-3 h-3 text-brand-red shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </ScrollReveal>

        </div>
      </section>

      {/* 3. WHAT YOU GET (DELIVERABLES) */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-brand-white border-b-2 border-brand-black">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          <ScrollReveal variant="fade-up" className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-brand-black pb-8">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <BauhausBadge variant="blue" shape="square">
                  {deliverables.badge}
                </BauhausBadge>
                <span className="font-mono text-xs uppercase font-bold tracking-widest text-brand-black/60">
                  ACTIONABLE OUTCOMES
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-brand-black">
                {deliverables.title}
              </h2>
            </div>
            <p className="font-mono text-xs uppercase font-bold text-brand-black/60">
              {deliverables.intro}
            </p>
          </ScrollReveal>

          <ScrollReveal variant="stagger" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverables.items.map((item, idx) => (
              <div
                key={idx}
                data-stagger-item
                className="p-8 border-2 border-brand-black bg-brand-white shadow-hard-md flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <div className="font-mono text-xs font-black text-brand-blue mb-4 border-b-2 border-brand-black pb-2">
                    OUTPUT
                  </div>
                  <h3 className="text-xl font-display font-black uppercase text-brand-black mb-3">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-brand-black/80 font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </ScrollReveal>

        </div>
      </section>

      {/* 4. THE AUDIT FRAMEWORK (PROCESS) */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-brand-slate text-white border-b-2 border-brand-black">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          <ScrollReveal variant="fade-up" className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-white/20 pb-8">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <BauhausBadge variant="red" shape="square">
                  {framework.badge}
                </BauhausBadge>
                <span className="font-mono text-xs uppercase font-bold tracking-widest text-brand-gray">
                  STEP-BY-STEP DIAGNOSIS
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white">
                {framework.title}
              </h2>
            </div>
            <span className="font-mono text-xs uppercase font-bold text-brand-yellow">
              4-Stage Evaluation Cycle
            </span>
          </ScrollReveal>

          <ScrollReveal variant="stagger" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {framework.steps.map((st, idx) => (
              <div
                key={idx}
                data-stagger-item
                className="p-8 border-2 border-white/30 bg-white/5 flex flex-col justify-between min-h-[200px]"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-4">
                    <span className="w-2.5 h-2.5 bg-brand-yellow" />
                    <span className="w-2 h-2 bg-brand-red" />
                  </div>
                  <h3 className="text-xl font-display font-black uppercase text-white mb-2">
                    {st.name}
                  </h3>
                </div>
                <p className="text-sm text-brand-gray font-sans leading-relaxed">
                  {st.description}
                </p>
              </div>
            ))}
          </ScrollReveal>

        </div>
      </section>

      {/* 5. WHO SHOULD REQUEST AN AUDIT (QUALIFICATION) */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-brand-gray border-b-2 border-brand-black">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          <ScrollReveal variant="fade-up" className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-brand-black pb-8">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <BauhausBadge variant="yellow" shape="square">
                  {ideal.badge}
                </BauhausBadge>
                <span className="font-mono text-xs uppercase font-bold tracking-widest text-brand-black/60">
                  QUALIFICATION CRITERIA
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-brand-black">
                {ideal.title}
              </h2>
            </div>
            <p className="font-mono text-xs uppercase font-bold text-brand-black/60">
              {ideal.intro}
            </p>
          </ScrollReveal>

          <ScrollReveal variant="stagger" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ideal.situations.map((sit, idx) => (
              <div
                key={idx}
                data-stagger-item
                className="p-6 bg-brand-white border-2 border-brand-black shadow-hard-sm flex items-start gap-3"
              >
                <span className="w-6 h-6 bg-brand-yellow border border-brand-black flex items-center justify-center font-bold text-xs text-brand-black shrink-0 mt-0.5">
                  ✓
                </span>
                <p className="text-sm font-sans text-brand-black/90 font-medium leading-relaxed">
                  {sit}
                </p>
              </div>
            ))}
          </ScrollReveal>

        </div>
      </section>

      {/* 6. FINAL HIGH-IMPACT CTA */}
      <section className="py-24 px-6 md:px-12 bg-brand-red text-white border-b-2 border-brand-black">
        <ScrollReveal variant="fade-up" className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="inline-block px-4 py-1.5 bg-brand-white text-brand-black border-2 border-brand-black font-mono text-xs font-black uppercase mb-8 shadow-hard-sm">
            DIAGNOSTIC FIRST
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black uppercase tracking-tighter text-white mb-4 max-w-3xl leading-[0.95]">
            {ideal.closingHeadline1}
          </h2>
          <p className="text-3xl sm:text-5xl md:text-6xl font-display font-black uppercase text-brand-yellow mb-8">
            {ideal.closingHeadline2}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              className="bg-brand-black text-white hover:bg-brand-white hover:text-brand-black text-lg px-10 py-5 border-2 border-brand-black shadow-hard-md"
              asLink
              href={ideal.cta.href}
            >
              {ideal.cta.label}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-brand-black text-lg px-8 py-5"
              asLink
              href="/contact"
            >
              Direct Strategy Inquiry
            </Button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
