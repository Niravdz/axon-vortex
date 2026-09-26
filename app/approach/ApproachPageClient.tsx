"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Cpu, User, RefreshCw } from "lucide-react";
import { authorityData } from "@/data/content/authorityConversion";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { getGSAP } from "@/lib/gsap";
import { DimensionalButton } from "@/components/ui/DimensionalButton";
import { DimensionalCard } from "@/components/ui/DimensionalCard";

export default function ApproachPageClient() {
  const {
    hero,
    startWithProblem,
    framework,
    growthLoop,
    humanAi,
    dataPhilosophy,
    principles,
  } = authorityData;

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const problemRef = useRef<HTMLElement>(null);
  const stagesRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();
  const [activeStage, setActiveStage] = useState<number>(0);

  useLayoutEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const { gsap, ScrollTrigger } = getGSAP();
    const ctx = gsap.context(() => {
      // Stage tracker triggers synchronized with scroll
      const stagesContainer = stagesRef.current;
      if (stagesContainer) {
        const articles = stagesContainer.querySelectorAll("article");
        articles.forEach((article, i) => {
          ScrollTrigger.create({
            trigger: article,
            start: "top 60%",
            end: "bottom 40%",
            onEnter: () => setActiveStage(i),
            onEnterBack: () => setActiveStage(i),
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="bg-[#141619] text-[#EFECE4] w-full overflow-x-clip selection:bg-[#3B82F6] selection:text-white"
    >
      {/* 0. BREADCRUMB / TOP SPEC BAR */}
      <div className="w-full border-b border-white/[0.08] bg-[#141619] px-6 md:px-12 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-wider">
          <div className="flex items-center gap-2 text-[#9AA3B2]">
            <Link href="/" className="hover:text-[#3B82F6] font-medium transition-colors">
              Home
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-[#3B82F6] font-semibold">Methodology &amp; Framework</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6] animate-pulse" />
            <span className="font-semibold text-[#EFECE4] tracking-widest text-[11px]">
              SYSTEMATIC EXECUTION ENGINE
            </span>
          </div>
        </div>
      </div>

      {/* 1. HERO - Dimensional Opening */}
      <section
        ref={heroRef}
        className="relative pt-20 md:pt-28 pb-20 px-6 md:px-12 border-b border-white/[0.08] bg-[#121519]"
      >
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#3B82F6]/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto flex flex-col gap-8 relative z-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-[#1b1e22] border border-[#3B82F6]/30 text-[#93C5FD] shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              {hero.badge}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-[#1b1e22] border border-[#F4BA00]/30 text-[#FDE68A] shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              STRATEGIC METHODOLOGY
            </span>
            <span className="font-mono text-xs text-[#9AA3B2] uppercase tracking-widest">
              HUMAN + AI OPERATING SYSTEM
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-semibold tracking-tight leading-[1.05] text-[#EFECE4] max-w-5xl">
            AI is powerful. <br />
            <span className="text-[#F4BA00] drop-shadow-[0_0_24px_rgba(244,186,0,0.25)]">
              Strategy makes it useful.
            </span>
          </h1>

          <div className="flex flex-col gap-4 text-base md:text-lg font-body text-[#9AA3B2] max-w-3xl leading-relaxed border-l-2 border-[#3B82F6] pl-6 py-2 bg-[#171a1e]/60 rounded-r-xl backdrop-blur-sm">
            {hero.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <DimensionalButton
              variant="amber"
              size="lg"
              asLink
              href={hero.cta.href}
            >
              {hero.cta.label}
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

      {/* 2. START WITH THE PROBLEM (CORE PRINCIPLE) */}
      <section
        ref={problemRef}
        className="py-20 md:py-28 px-6 md:px-12 bg-[#141619] border-b border-white/[0.08] relative"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 flex flex-col gap-6 sticky top-28">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#171a1e] border border-[#F4BA00]/30 text-[#FDE68A] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]">
                {startWithProblem.badge}
              </span>
              <span className="font-mono text-xs uppercase font-medium tracking-widest text-[#9AA3B2]">
                FIRST PRINCIPLES
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold tracking-tight text-[#EFECE4] leading-tight">
              {startWithProblem.headline}
            </h2>

            <p className="text-base text-[#9AA3B2] font-body leading-relaxed">
              We never prescribe solutions before understanding the friction. Technology without business alignment is pure operational overhead.
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* False Pretexts Grid */}
            <div className="grid grid-cols-1 gap-3.5">
              {startWithProblem.examples.map((ex, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_5px_rgba(0,0,0,0.78),inset_0_1px_1px_rgba(0,0,0,0.92),0_1px_0_rgba(255,255,255,0.04)] flex items-center gap-4 hover:border-[#3B82F6]/30 transition-colors"
                >
                  <span className="font-mono text-[11px] font-semibold px-2.5 py-1 rounded bg-[#171a1e] text-[#93C5FD] border border-white/[0.08] shrink-0 shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                    SYMPTOM
                  </span>
                  <p className="text-sm font-body text-[#EFECE4] font-normal leading-relaxed">
                    {ex}
                  </p>
                </div>
              ))}
            </div>

            {/* Central Question Callout */}
            <div className="p-8 rounded-2xl bg-[#1b1e22] border border-[#F4BA00]/30 shadow-[0_12px_28px_-4px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col gap-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#F4BA00]/10 rounded-full blur-3xl pointer-events-none" />
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#F4BA00]">
                {startWithProblem.centralQuestionLabel}
              </span>
              <p className="text-xl sm:text-2xl font-heading font-semibold text-[#EFECE4] leading-snug">
                {startWithProblem.centralQuestion}
              </p>
              <div className="border-t border-white/[0.08] pt-4 mt-2">
                <p className="text-sm font-body text-[#9AA3B2] font-normal">
                  {startWithProblem.conclusion}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STRATEGIC PROCESS FRAMEWORK (STAGES 01-07) */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-[#121519] border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#1b1e22] border border-[#3B82F6]/30 text-[#93C5FD] shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  {framework.badge}
                </span>
                <span className="font-mono text-xs uppercase font-medium tracking-widest text-[#9AA3B2]">
                  EXECUTION LIFECYCLE
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold tracking-tight text-[#EFECE4]">
                {framework.sequence}
              </h2>
            </div>
            <span className="font-mono text-xs uppercase font-medium text-[#9AA3B2]">
              7 Integrated Production Stages
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Desktop Stage Selector / Index */}
            <div className="hidden lg:flex lg:col-span-4 flex-col gap-4 sticky top-28">
              <div className="rounded-2xl border border-white/[0.08] bg-[#1b1e22] p-6 shadow-[0_12px_28px_-4px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col gap-4">
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#9AA3B2] border-b border-white/[0.08] pb-2">
                  Active Lifecycle Stage
                </span>

                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6] shrink-0" />
                  <span className="font-heading font-semibold text-xl text-[#EFECE4]">
                    {framework.stages[activeStage]?.name}
                  </span>
                </div>

                <p className="text-xs font-body text-[#9AA3B2] leading-relaxed border-t border-white/[0.08] pt-3">
                  {framework.stages[activeStage]?.intro || framework.stages[activeStage]?.description}
                </p>

                <div className="w-full bg-[#101215] rounded-full h-1.5 overflow-hidden border border-white/[0.04]">
                  <div
                    className="bg-gradient-to-r from-[#3B82F6] to-[#F4BA00] h-full transition-all duration-300 rounded-full"
                    style={{ width: `${((activeStage + 1) / framework.stages.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Stage Quick List */}
              <div className="flex flex-col rounded-2xl border border-white/[0.08] bg-[#171a1e] overflow-hidden shadow-[0_4px_14px_rgba(0,0,0,0.4)]">
                {framework.stages.map((st, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => {
                      setActiveStage(idx);
                      const articles = stagesRef.current?.querySelectorAll("article");
                      if (articles && articles[idx]) {
                        articles[idx].scrollIntoView({ behavior: "smooth", block: "center" });
                      }
                    }}
                    className={`w-full text-left px-4 py-3 border-b last:border-b-0 border-white/[0.06] font-mono text-xs flex items-center justify-between transition-all cursor-pointer ${
                      activeStage === idx
                        ? "bg-[#21252a] font-semibold text-[#3B82F6] border-l-2 border-l-[#3B82F6]"
                        : "text-[#9AA3B2] hover:bg-[#21252a] hover:text-[#EFECE4]"
                    }`}
                  >
                    <span>{st.name}</span>
                    {activeStage === idx && (
                      <span className="w-2 h-2 rounded-full bg-[#3B82F6] shadow-[0_0_6px_#3B82F6]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Stages Content Stream with Synchronized Prominence */}
            <div ref={stagesRef} className="lg:col-span-8 flex flex-col gap-6">
              {framework.stages.map((stage, i) => {
                const isCurrent = activeStage === i;
                const isPast = activeStage > i;

                return (
                  <article
                    key={i}
                    className={`p-7 md:p-9 rounded-2xl border transition-all duration-300 flex flex-col gap-5 relative will-change-[transform,opacity] ${
                      isCurrent
                        ? "border-[#3B82F6]/60 bg-[#21252a] shadow-[0_20px_48px_rgba(0,0,0,0.8),0_0_24px_rgba(59,130,246,0.2),inset_0_1px_0_rgba(255,255,255,0.12)] scale-[1.01] opacity-100 z-10 ring-1 ring-[#3B82F6]/40"
                        : isPast
                        ? "border-white/[0.08] bg-[#171a1e] shadow-[0_8px_24px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)] opacity-85 scale-100 hover:opacity-100"
                        : "border-white/[0.06] bg-[#141619] shadow-none opacity-65 scale-100"
                    }`}
                  >
                    <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-mono text-xs font-semibold px-2.5 py-1 rounded border transition-colors ${
                            isCurrent
                              ? "bg-[#3B82F6] text-white border-[#3B82F6] shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                              : isPast
                              ? "bg-[#101215] text-[#FDE68A] border-[#F4BA00]/40 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]"
                              : "bg-[#101215] text-[#9AA3B2] border-white/10"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-heading font-semibold text-[#EFECE4]">
                          {stage.name}
                        </h3>
                      </div>
                      <span
                        className={`w-2.5 h-2.5 rounded-full transition-colors ${
                          isCurrent
                            ? "bg-[#3B82F6] shadow-[0_0_8px_#3B82F6] animate-pulse"
                            : isPast
                            ? "bg-[#F4BA00]"
                            : "bg-white/20"
                        }`}
                      />
                    </div>

                    {stage.intro && (
                      <p className="text-base font-heading font-medium text-[#EFECE4]">
                        {stage.intro}
                      </p>
                    )}

                    {stage.description && (
                      <p className="text-sm font-body text-[#9AA3B2] leading-relaxed">
                        {stage.description}
                      </p>
                    )}

                    {stage.statements && (
                      <div className="p-5 rounded-xl bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_5px_rgba(0,0,0,0.78),inset_0_1px_1px_rgba(0,0,0,0.92),0_1px_0_rgba(255,255,255,0.04)] flex flex-col gap-2">
                        {stage.statements.map((stmt, idx) => (
                          <p key={idx} className="font-heading font-medium text-xs sm:text-sm text-[#EFECE4]">
                            {stmt}
                          </p>
                        ))}
                      </div>
                    )}

                    {stage.items && (
                      <div className="flex flex-col gap-3 pt-2">
                        {stage.listLabel && (
                          <span className="font-mono text-xs uppercase font-medium text-[#9AA3B2] tracking-wider">
                            {stage.listLabel}
                          </span>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {stage.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="p-3.5 rounded-xl bg-[#101215] border border-white/[0.04] shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)] flex items-center gap-3 text-xs sm:text-sm font-body text-[#EFECE4]"
                            >
                              <CheckCircle2 className="w-4 h-4 text-[#3B82F6] shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE AXONVORTEX GROWTH LOOP */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-[#141619] border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#171a1e] border border-[#F4BA00]/30 text-[#FDE68A] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]">
                  {growthLoop.badge}
                </span>
                <span className="font-mono text-xs uppercase font-medium tracking-widest text-[#9AA3B2]">
                  ITERATIVE EVOLUTION
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold tracking-tight text-[#EFECE4]">
                {growthLoop.title}
              </h2>
            </div>
            <span className="font-mono text-xs uppercase font-semibold text-[#F4BA00]">
              {growthLoop.sequence}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Diagram */}
            <div className="lg:col-span-6 rounded-2xl border border-white/[0.08] p-2 bg-[#1b1e22] shadow-[0_16px_38px_-6px_rgba(0,0,0,0.72),inset_0_1px_0_rgba(255,255,255,0.08)]">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/[0.04] bg-[#101215]">
                <Image
                  src="/images/bauhaus-diagram-growth-loop.jpg"
                  alt="AxonVortex Growth Loop Framework"
                  fill
                  className="object-cover opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="p-4 rounded-b-xl bg-[#101215] text-[#9AA3B2] font-mono text-xs flex items-center justify-between border-t border-white/[0.04] mt-2">
                <span>DIAG-006 // CONTINUOUS GROWTH LOOP</span>
                <span className="text-[#F4BA00] font-medium">HYPOTHESIS → IMPROVE</span>
              </div>
            </div>

            {/* Right: Narrative & Changing Factors */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="flex flex-col gap-3 text-base md:text-lg font-body text-[#9AA3B2] leading-relaxed border-l-2 border-[#F4BA00] pl-6">
                {growthLoop.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {growthLoop.changeFactors.map((factor, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl border border-white/[0.04] bg-[#101215] shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)] flex items-center gap-3 font-mono text-xs uppercase font-medium text-[#EFECE4]"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-[#F4BA00] shrink-0" />
                    <span>{factor}</span>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-2xl bg-[#1b1e22] border border-white/[0.08] shadow-[0_8px_20px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)] text-center">
                <p className="font-heading font-semibold text-xl uppercase tracking-tight text-[#F4BA00]">
                  {growthLoop.conclusion}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HUMAN + AI SYNTHESIS */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-[#121519] border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#1b1e22] border border-[#3B82F6]/30 text-[#93C5FD] shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  {humanAi.badge}
                </span>
                <span className="font-mono text-xs uppercase font-medium tracking-widest text-[#9AA3B2]">
                  COLLABORATIVE INTELLIGENCE
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold tracking-tight text-[#EFECE4]">
                {humanAi.headline}
              </h2>
            </div>
            <p className="text-sm font-heading font-medium uppercase text-[#9AA3B2]">
              {humanAi.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* AI Capabilities Card */}
            <div className="p-8 rounded-2xl border border-white/[0.08] bg-[#171a1e] shadow-[0_12px_28px_-4px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#3B82F6]/10 rounded-full blur-3xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Cpu className="w-5 h-5 text-[#3B82F6]" />
                    <span className="font-heading font-semibold text-xl text-[#EFECE4]">
                      What AI Brings
                    </span>
                  </div>
                  <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-[#101215] text-[#93C5FD] border border-white/[0.04] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]">
                    SCALE ENGINE
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {humanAi.aiCapabilities.map((cap, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-[#101215] border border-white/[0.04] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] font-mono text-xs font-medium text-[#EFECE4]"
                    >
                      + {cap}
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-xs text-[#9AA3B2] font-body mt-6 border-t border-white/[0.06] pt-4 leading-relaxed">
                Executes high-volume computation, pattern detection, automation, and continuous processing at machine scale.
              </p>
            </div>

            {/* Human Capabilities Card */}
            <div className="p-8 rounded-2xl border border-white/[0.08] bg-[#171a1e] shadow-[0_12px_28px_-4px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#F4BA00]/10 rounded-full blur-3xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-[#F4BA00]" />
                    <span className="font-heading font-semibold text-xl text-[#EFECE4]">
                      What Humans Bring
                    </span>
                  </div>
                  <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-[#101215] text-[#FDE68A] border border-white/[0.04] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]">
                    DIRECTION
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {humanAi.humanCapabilities.map((cap, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-[#101215] border border-white/[0.04] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] font-mono text-xs font-medium text-[#EFECE4]"
                    >
                      + {cap}
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-xs text-[#9AA3B2] font-body mt-6 border-t border-white/[0.06] pt-4 leading-relaxed">
                Establishes contextual judgment, emotional resonance, strategic nuance, ethical grounding, and business purpose.
              </p>
            </div>
          </div>

          {/* Conclusion Banner */}
          <div className="p-8 rounded-2xl border border-white/[0.08] bg-[#1b1e22] text-center flex flex-col items-center gap-2 shadow-[0_16px_40px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)]">
            <span className="font-mono text-xs uppercase font-medium text-[#F4BA00] tracking-widest">
              THE CORE SYNTHESIS
            </span>
            <p className="text-xl sm:text-2xl font-heading font-semibold text-[#EFECE4]">
              {humanAi.conclusions[0]} {humanAi.conclusions[1]}
            </p>
          </div>
        </div>
      </section>

      {/* 6. DATA PHILOSOPHY */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-[#141619] border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#1b1e22] border border-[#3B82F6]/30 text-[#93C5FD] shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  {dataPhilosophy.badge}
                </span>
                <span className="font-mono text-xs uppercase font-medium tracking-widest text-[#9AA3B2]">
                  SIGNAL DISCIPLINE
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold tracking-tight text-[#EFECE4]">
                {dataPhilosophy.headline}
              </h2>
            </div>
            <div className="font-mono text-xs uppercase font-medium text-[#9AA3B2]">
              {dataPhilosophy.introStatements.join(" ")}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Core Questions */}
            <div className="lg:col-span-5 p-7 rounded-2xl border border-white/[0.08] bg-[#1b1e22] shadow-[0_12px_32px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col gap-5">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#3B82F6]">
                {dataPhilosophy.coreQuestionsLabel}
              </span>
              <div className="flex flex-col gap-3">
                {dataPhilosophy.coreQuestions.map((q, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#101215] border border-white/[0.04] shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)] font-heading font-semibold text-sm sm:text-base text-[#EFECE4]"
                  >
                    {q}
                  </div>
                ))}
              </div>
              <p className="text-xs font-body text-[#9AA3B2] leading-relaxed border-t border-white/[0.08] pt-4">
                {dataPhilosophy.closing}
              </p>
            </div>

            {/* Metric Realities */}
            <div className="lg:col-span-7 flex flex-col gap-3">
              <span className="font-mono text-xs font-medium uppercase tracking-widest text-[#9AA3B2] mb-1">
                Vanity Metrics vs Commercial Reality
              </span>
              {dataPhilosophy.metricRealities.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-[#171a1e] border border-white/[0.08] shadow-[0_4px_16px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] flex items-start gap-4 hover:border-[#3B82F6]/30 transition-colors"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] shadow-[0_0_6px_#3B82F6] mt-1.5 shrink-0" />
                  <p className="text-sm font-body text-[#EFECE4] font-medium leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. OPERATING PRINCIPLES */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-[#121519] border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#171a1e] border border-[#F4BA00]/30 text-[#FDE68A] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]">
                  {principles.badge}
                </span>
                <span className="font-mono text-xs uppercase font-medium tracking-widest text-[#9AA3B2]">
                  STANDARD OPERATING CODE
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold tracking-tight text-[#EFECE4]">
                {principles.title}
              </h2>
            </div>
            <span className="font-mono text-xs uppercase font-medium text-[#9AA3B2]">
              6 Foundational Pillars
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {principles.items.map((principle, idx) => (
              <DimensionalCard
                key={idx}
                elevation="level2"
                glowColor={idx % 2 === 0 ? "blue" : "amber"}
                className="p-7 flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4">
                    <span className="font-mono text-xs font-semibold text-[#3B82F6] px-2 py-0.5 rounded-[4px] bg-[#101215] border border-white/[0.04] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#F4BA00]" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-[#EFECE4] mb-3">
                    {principle.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#9AA3B2] font-body leading-relaxed">
                  {principle.description}
                </p>
              </DimensionalCard>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL HIGH-IMPACT CTA */}
      <section className="py-24 px-6 md:px-12 bg-[#141619] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[600px] h-[350px] bg-[#F4BA00]/10 blur-[140px] rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto text-center flex flex-col items-center relative z-10">
          <div className="inline-block px-3.5 py-1 rounded-full bg-[#F4BA00]/15 border border-[#F4BA00]/30 font-mono text-xs font-semibold uppercase text-[#FDE68A] mb-8">
            INTENTIONAL GROWTH
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-semibold tracking-tight text-[#EFECE4] mb-8 max-w-3xl leading-[1.05]">
            {principles.closingHeadline}
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <DimensionalButton
              variant="amber"
              size="lg"
              asLink
              href={principles.primaryCta.href}
            >
              {principles.primaryCta.label}
              <ArrowRight className="ml-2 w-4 h-4" />
            </DimensionalButton>

            <DimensionalButton
              variant="outline"
              size="lg"
              asLink
              href={principles.secondaryCta.href}
            >
              {principles.secondaryCta.label}
            </DimensionalButton>
          </div>
        </div>
      </section>
    </div>
  );
}
