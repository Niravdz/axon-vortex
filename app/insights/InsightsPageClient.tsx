"use client";

import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { authorityData } from "@/data/content/authorityConversion";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { getGSAP } from "@/lib/gsap";
import { DimensionalButton } from "@/components/ui/DimensionalButton";
import { DimensionalCard } from "@/components/ui/DimensionalCard";

export default function InsightsPageClient() {
  const {
    insights,
    contentTypes,
    contentLoop,
    leadMagnets,
  } = authorityData;

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const topicContentRef = useRef<HTMLDivElement>(null);
  const [activeTopic, setActiveTopic] = useState<number>(0);

  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const { gsap } = getGSAP();
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll("[data-anim='insights-hero']"),
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

  // Smooth crossfade when switching active topic
  useEffect(() => {
    if (prefersReducedMotion || !topicContentRef.current) return;
    const { gsap } = getGSAP();
    gsap.fromTo(
      topicContentRef.current,
      { opacity: 0.3, y: 8 },
      {
        opacity: 1,
        y: 0,
        duration: 0.25,
        ease: "power2.out",
        clearProps: "transform,opacity",
      }
    );
  }, [activeTopic, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="w-full bg-[#141619] text-[#EFECE4] selection:bg-[#3B82F6] selection:text-white overflow-x-clip"
    >
      {/* 0. TOP SPEC BAR */}
      <div className="w-full border-b border-white/[0.08] bg-[#141619]/90 backdrop-blur-md px-6 md:px-12 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-wider">
          <div className="flex items-center gap-2 text-[#9AA3B2]">
            <Link href="/" className="hover:text-[#3B82F6] font-medium transition-colors">
              Home
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-[#3B82F6] font-semibold">Insights &amp; Knowledge</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6] animate-pulse" />
            <span className="font-semibold text-[#EFECE4] tracking-widest text-[11px]">
              PRACTICAL THINKING HUB
            </span>
          </div>
        </div>
      </div>

      {/* 1. HERO SECTION & 3D TAXONOMY MATRIX */}
      <section
        ref={heroRef}
        className="relative pt-20 md:pt-28 pb-20 px-6 md:px-12 border-b border-white/[0.08] bg-[#141619]"
      >
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[300px] bg-[#3B82F6]/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div data-anim="insights-hero" className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#93C5FD]">
                {insights.badge}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-[#F4BA00]/15 border border-[#F4BA00]/30 text-[#FDE68A]">
                {insights.title}
              </span>
              <span className="font-mono text-xs text-[#9AA3B2] uppercase tracking-widest">
                ZERO HYPE // USEFUL MODELS
              </span>
            </div>

            <h1 data-anim="insights-hero" className="text-4xl sm:text-6xl md:text-7xl font-heading font-semibold tracking-tight leading-[1.05] text-[#EFECE4]">
              Ideas for businesses <br />
              <span className="text-[#3B82F6] drop-shadow-[0_0_24px_rgba(59,130,246,0.3)]">
                growing in a digital world.
              </span>
            </h1>

            <p data-anim="insights-hero" className="text-base md:text-lg font-body text-[#9AA3B2] max-w-2xl leading-relaxed border-l-2 border-[#3B82F6] pl-6 py-3 bg-[#101215] border border-white/[0.04] rounded-r-xl shadow-[inset_0_2px_5px_rgba(0,0,0,0.7)]">
              {insights.subWelcome}
            </p>

            {/* Principles Checklist */}
            <div data-anim="insights-hero" className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {insights.principles.map((pr, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#171a1e] border border-white/[0.08] shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] flex items-center gap-3 text-xs font-mono font-medium text-[#EFECE4]"
                >
                  <span className="w-2 h-2 rounded-full bg-[#3B82F6] shadow-[0_0_6px_#3B82F6] shrink-0" />
                  <span>{pr}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: 3D Taxonomy Directory Plate (Raised Shell with Recessed Buttons) */}
          <div data-anim="insights-hero" className="lg:col-span-5 flex flex-col">
            <div className="rounded-2xl border border-white/[0.08] bg-[#1b1e22] p-6 sm:p-8 shadow-[0_16px_38px_-6px_rgba(0,0,0,0.72),0_6px_14px_-3px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col gap-6">
              <div className="border-b border-white/10 pb-4">
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#9AA3B2] block mb-1">
                  TAXONOMY INDEX
                </span>
                <span className="font-heading font-semibold text-2xl text-[#EFECE4]">
                  Core Topic Matrix
                </span>
              </div>

              <div className="flex flex-col gap-2 font-mono text-xs">
                {insights.topics.map((top, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveTopic(idx)}
                    className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      activeTopic === idx
                        ? "bg-[#3B82F6] text-white border-[#3B82F6] shadow-[0_4px_20px_rgba(59,130,246,0.35)] font-semibold"
                        : "bg-[#101215] text-[#9AA3B2] border-white/[0.04] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] hover:border-white/20 hover:text-[#EFECE4]"
                    }`}
                  >
                    <span>{top.category}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${activeTopic === idx ? "text-white" : "opacity-40"}`} />
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-white/10">
                <span className="font-mono text-[11px] text-[#9AA3B2] block">
                  Select a category above to inspect focus areas below.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ACTIVE TOPIC INSPECTOR */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-[#141619] border-b border-white/[0.08] relative">
        <div ref={topicContentRef} className="max-w-7xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#F4BA00]/15 border border-[#F4BA00]/30 text-[#FDE68A]">
                  TOPIC
                </span>
                <span className="font-mono text-xs uppercase font-medium tracking-widest text-[#9AA3B2]">
                  DEEP DIVE
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold tracking-tight text-[#EFECE4]">
                {insights.topics[activeTopic].category}
              </h2>
            </div>
            <p className="font-mono text-xs uppercase font-medium text-[#9AA3B2]">
              {insights.topics[activeTopic].intro}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {insights.topics[activeTopic].items.map((item, idx) => (
              <DimensionalCard
                key={idx}
                elevation="level2"
                glowColor={idx % 2 === 0 ? "blue" : "amber"}
                className="p-6 flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#3B82F6] shadow-[0_0_6px_#3B82F6] shrink-0" />
                  <span className="font-heading font-semibold text-base sm:text-lg text-[#EFECE4] group-hover:text-[#93C5FD] transition-colors">
                    {item}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#9AA3B2] group-hover:text-[#93C5FD] transition-colors" />
              </DimensionalCard>
            ))}
          </div>
        </div>
      </section>

      {/* 3. EDITORIAL TAXONOMY (CONTENT TYPES) */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-[#141619] border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#93C5FD]">
                  {contentTypes.badge}
                </span>
                <span className="font-mono text-xs uppercase font-medium tracking-widest text-[#9AA3B2]">
                  FORMAT CLASSIFICATION
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold tracking-tight text-[#EFECE4]">
                {contentTypes.title}
              </h2>
            </div>
            <span className="font-mono text-xs uppercase font-medium text-[#9AA3B2]">
              7 Distinct Knowledge Formats
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
            {contentTypes.items.map((type, idx) => (
              <DimensionalCard
                key={idx}
                elevation="level2"
                glowColor={idx % 2 === 0 ? "blue" : "amber"}
                className="p-6 flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-md bg-[#101215] text-[#FDE68A] border border-[#F4BA00]/30 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-[#EFECE4] mb-2">
                    {type.type}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#9AA3B2] font-body leading-relaxed">
                  {type.description}
                </p>
              </DimensionalCard>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE AXONVORTEX CONTENT LOOP */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-[#141619] border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#F4BA00]/15 border border-[#F4BA00]/30 text-[#FDE68A]">
                  {contentLoop.badge}
                </span>
                <span className="font-mono text-xs uppercase font-medium tracking-widest text-[#9AA3B2]">
                  KNOWLEDGE GENERATION
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold tracking-tight text-[#EFECE4]">
                {contentLoop.title}
              </h2>
            </div>
            <span className="font-mono text-xs uppercase font-semibold text-[#F4BA00]">
              Problem → Research → Insight → Action → Solution
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-start">
            {contentLoop.steps.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-white/[0.08] bg-[#171a1e] shadow-[0_8px_20px_-4px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)] flex flex-col justify-between hover:border-white/20 transition-all min-h-[190px]"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-md bg-[#101215] text-[#93C5FD] border border-white/[0.04] shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-xs text-[#F4BA00] font-semibold">→</span>
                  </div>
                  <h3 className="text-base font-heading font-semibold text-[#EFECE4] mb-2">
                    {step.stage}
                  </h3>
                </div>
                <p className="text-xs text-[#9AA3B2] font-body leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DIAGNOSTIC RESOURCES / LEAD MAGNETS */}
      {leadMagnets && (
        <section className="py-20 md:py-28 px-6 md:px-12 bg-[#141619] border-b border-white/[0.08] relative">
          <div className="max-w-7xl mx-auto flex flex-col gap-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
              <div className="flex flex-col gap-3 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#F4BA00]/15 border border-[#F4BA00]/30 text-[#FDE68A]">
                    {leadMagnets.badge}
                  </span>
                  <span className="font-mono text-xs uppercase font-medium tracking-widest text-[#9AA3B2]">
                    DIAGNOSTIC FRAMEWORKS
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold tracking-tight text-[#EFECE4]">
                  {leadMagnets.title}
                </h2>
              </div>
              <span className="font-mono text-xs uppercase font-medium text-[#9AA3B2]">
                5 Practical Self-Assessments
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {leadMagnets.items.map((lm) => (
                <div
                  key={lm.id}
                  className="p-7 rounded-2xl border border-white/[0.08] bg-[#171a1e] shadow-[0_12px_28px_-6px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col justify-between"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="font-mono text-xs font-semibold text-[#3B82F6]">
                        RESOURCE
                      </span>
                      <span className="w-2 h-2 rounded-full bg-[#F4BA00]" />
                    </div>

                    <h3 className="text-xl font-heading font-semibold text-[#EFECE4]">
                      {lm.title}
                    </h3>

                    <p className="text-xs sm:text-sm font-heading font-medium text-[#9AA3B2]">
                      {lm.question}
                    </p>

                    {/* Nested Recessed Evaluation Areas Tray */}
                    <div className="pt-2">
                      <span className="font-mono text-[11px] uppercase font-medium text-[#9AA3B2]/70 block mb-2">
                        {lm.evaluationLabel}
                      </span>
                      <div className="p-3.5 rounded-xl bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] grid grid-cols-2 gap-2">
                        {lm.areas.map((area, i) => (
                          <div key={i} className="text-xs font-body text-[#EFECE4]/90 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                            <span>{area}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 mt-6">
                    <DimensionalButton
                      variant="amber"
                      size="sm"
                      className="w-full justify-center"
                      asLink
                      href={lm.cta.href}
                    >
                      {lm.cta.label}
                      <ArrowRight className="ml-2 w-3.5 h-3.5" />
                    </DimensionalButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. FINAL HIGH-IMPACT CTA */}
      <section className="py-24 px-6 md:px-12 bg-[#141619] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[600px] h-[350px] bg-[#3B82F6]/10 blur-[140px] rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto rounded-3xl border border-white/[0.08] bg-[#1b1e22] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] p-10 md:p-14 text-center flex flex-col items-center relative z-10">
          <div className="inline-block px-3.5 py-1 rounded-full bg-[#3B82F6]/15 border border-[#3B82F6]/30 font-mono text-xs font-semibold uppercase text-[#93C5FD] mb-8">
            HAVE A QUESTION?
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-semibold tracking-tight text-[#EFECE4] mb-6 max-w-3xl leading-[1.05]">
            {contentLoop.questionCallout}
          </h2>

          <p className="text-xl sm:text-2xl font-heading font-medium text-[#F4BA00] mb-8">
            {contentLoop.startWithProblem} {contentLoop.helpThinkThrough}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <DimensionalButton
              variant="amber"
              size="lg"
              asLink
              href={contentLoop.cta.href}
            >
              {contentLoop.cta.label}
              <ArrowRight className="ml-2 w-4 h-4" />
            </DimensionalButton>

            <DimensionalButton
              variant="outline"
              size="lg"
              asLink
              href="/growth-audit"
            >
              Request Growth Audit
            </DimensionalButton>
          </div>
        </div>
      </section>
    </div>
  );
}
