"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Cpu, User, RefreshCw } from "lucide-react";
import { BauhausBadge } from "@/components/ui/BauhausBadge";
import { Button } from "@/components/ui/Button";
import { authorityData } from "@/data/content/authorityConversion";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { getGSAP } from "@/lib/gsap";

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
      // Stage tracker triggers
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
      className="bg-brand-white text-brand-black w-full overflow-x-clip selection:bg-brand-red selection:text-white"
    >
      {/* 0. BREADCRUMB / TOP SPEC BAR */}
      <div className="w-full border-b-2 border-brand-black bg-brand-gray/50 px-6 md:px-12 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase">
          <div className="flex items-center gap-2 text-brand-black/70">
            <Link href="/" className="hover:text-brand-red font-bold transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-brand-red font-black">Methodology &amp; Framework</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-brand-red animate-pulse" />
            <span className="font-bold text-brand-black tracking-wider">SYSTEMATIC EXECUTION ENGINE</span>
          </div>
        </div>
      </div>

      {/* 1. HERO - Editorial Opening */}
      <section
        ref={heroRef}
        className="relative pt-16 md:pt-24 pb-20 px-6 md:px-12 border-b-2 border-brand-black bg-brand-white"
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div className="flex flex-wrap items-center gap-3">
            <BauhausBadge variant="red" shape="square">
              {hero.badge}
            </BauhausBadge>
            <BauhausBadge variant="yellow" shape="pill">
              STRATEGIC METHODOLOGY
            </BauhausBadge>
            <span className="font-mono text-xs text-brand-black/60 font-bold uppercase tracking-widest">
              HUMAN + AI OPERATING SYSTEM
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-heading font-bold uppercase tracking-[0.015em] leading-[0.95] text-brand-black max-w-5xl">
            AI is powerful. <br />
            <span className="text-brand-red">Strategy makes it useful.</span>
          </h1>

          <div className="flex flex-col gap-4 text-lg md:text-xl font-body text-brand-black/80 max-w-3xl leading-relaxed border-l-4 border-brand-red pl-6 py-2 bg-brand-gray/30">
            {hero.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Button
              variant="primary"
              size="lg"
              className="bg-brand-red text-white hover:bg-brand-black text-base px-8 py-4"
              asLink
              href={hero.cta.href}
            >
              {hero.cta.label}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-2 border-brand-black text-brand-black hover:bg-brand-yellow text-base px-6 py-4"
              asLink
              href="/growth-audit"
            >
              Request Growth Audit
            </Button>
          </div>
        </div>
      </section>

      {/* 2. START WITH THE PROBLEM (CORE PRINCIPLE) */}
      <section
        ref={problemRef}
        className="py-20 md:py-28 px-6 md:px-12 bg-brand-gray border-b-2 border-brand-black"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-5 flex flex-col gap-6 sticky top-24">
            <div className="flex items-center gap-2">
              <BauhausBadge variant="yellow" shape="square">
                {startWithProblem.badge}
              </BauhausBadge>
              <span className="font-mono text-xs uppercase font-bold tracking-widest text-brand-black/60">
                FIRST PRINCIPLES
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-brand-black leading-tight">
              {startWithProblem.headline}
            </h2>

            <p className="text-base text-brand-black/70 font-sans leading-relaxed">
              We never prescribe solutions before understanding the friction. Technology without business alignment is pure operational overhead.
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* False Pretexts Grid */}
            <div className="grid grid-cols-1 gap-4">
              {startWithProblem.examples.map((ex, i) => (
                <div
                  key={i}
                  className="p-6 bg-brand-white border-2 border-brand-black shadow-hard-sm flex items-center gap-4"
                >
                  <span className="font-mono text-xs font-black px-2.5 py-1 bg-brand-black text-white shrink-0">
                    SYMPTOM
                  </span>
                  <p className="text-base font-sans text-brand-black/90 font-medium">
                    {ex}
                  </p>
                </div>
              ))}
            </div>

            {/* Central Question Callout */}
            <div className="p-8 bg-brand-yellow border-2 border-brand-black shadow-hard-md flex flex-col gap-4">
              <span className="font-mono text-xs font-black uppercase tracking-widest text-brand-black">
                {startWithProblem.centralQuestionLabel}
              </span>
              <p className="text-2xl sm:text-3xl font-display font-black uppercase text-brand-black leading-snug">
                {startWithProblem.centralQuestion}
              </p>
              <div className="border-t-2 border-brand-black pt-4 mt-2">
                <p className="text-sm font-sans text-brand-black/90 font-bold">
                  {startWithProblem.conclusion}
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. STRATEGIC PROCESS FRAMEWORK (STAGES 01-07) */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-brand-white border-b-2 border-brand-black">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-brand-black pb-8">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <BauhausBadge variant="red" shape="square">
                  {framework.badge}
                </BauhausBadge>
                <span className="font-mono text-xs uppercase font-bold tracking-widest text-brand-black/60">
                  EXECUTION LIFECYCLE
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-brand-black">
                {framework.sequence}
              </h2>
            </div>
            <span className="font-mono text-xs uppercase font-bold text-brand-black/60">
              7 Integrated Production Stages
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Desktop Stage Selector / Index */}
            <div className="hidden lg:flex lg:col-span-4 flex-col gap-3 sticky top-24">
              <div className="border-2 border-brand-black bg-brand-gray p-6 shadow-hard-md flex flex-col gap-4">
                <span className="font-mono text-xs font-black uppercase tracking-widest text-brand-black/60 border-b-2 border-brand-black pb-2">
                  Active Lifecycle Stage
                </span>
                
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-brand-red shrink-0" />
                  <span className="font-display font-black text-2xl uppercase text-brand-black">
                    {framework.stages[activeStage]?.name}
                  </span>
                </div>

                <p className="text-xs font-sans text-brand-black/80 leading-relaxed border-t border-brand-black/20 pt-3">
                  {framework.stages[activeStage]?.intro || framework.stages[activeStage]?.description}
                </p>

                <div className="w-full bg-brand-white border border-brand-black h-2 overflow-hidden">
                  <div
                    className="bg-brand-red h-full transition-all duration-300"
                    style={{ width: `${((activeStage + 1) / framework.stages.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Stage Quick List */}
              <div className="flex flex-col border-2 border-brand-black bg-brand-white shadow-hard-sm">
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
                    className={`w-full text-left px-4 py-3 border-b last:border-b-0 border-brand-black/20 font-mono text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      activeStage === idx ? "bg-brand-yellow font-black text-brand-black" : "text-brand-black/60 hover:bg-brand-gray/40"
                    }`}
                  >
                    <span>{st.name}</span>
                    {activeStage === idx && <span className="w-2 h-2 bg-brand-black" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Stages Content Stream with Synchronized Prominence */}
            <div ref={stagesRef} className="lg:col-span-8 flex flex-col gap-8">
              {framework.stages.map((stage, i) => {
                const isCurrent = activeStage === i;
                const isPast = activeStage > i;

                return (
                  <article
                    key={i}
                    className={`p-8 md:p-10 border-2 transition-all duration-300 flex flex-col gap-6 relative will-change-[transform,opacity] ${
                      isCurrent
                        ? "border-brand-red bg-brand-white shadow-[6px_6px_0px_0px_#090909] scale-[1.01] opacity-100 z-10 ring-2 ring-brand-red/20"
                        : isPast
                          ? "border-brand-black/40 bg-brand-white/90 shadow-hard-sm opacity-80 scale-100 hover:opacity-100"
                          : "border-brand-black/20 bg-brand-white/70 shadow-none opacity-65 scale-100"
                    }`}
                  >
                    <div className="flex items-center justify-between border-b-2 border-brand-black pb-4">
                      <div className="flex items-center gap-3">
                        <span className={`font-mono text-xs font-black px-3 py-1 text-white border border-brand-black transition-colors ${
                          isCurrent ? "bg-brand-red" : "bg-brand-black/80"
                        }`}>
                          STAGE
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-display font-black uppercase text-brand-black">
                          {stage.name}
                        </h3>
                      </div>
                      <span className={`w-3 h-3 border border-brand-black transition-colors ${
                        isCurrent ? "bg-brand-red animate-pulse" : "bg-brand-yellow"
                      }`} />
                    </div>

                  {stage.intro && (
                    <p className="text-base sm:text-lg font-display font-bold text-brand-black/90">
                      {stage.intro}
                    </p>
                  )}

                  {stage.description && (
                    <p className="text-sm sm:text-base font-sans text-brand-black/80 leading-relaxed">
                      {stage.description}
                    </p>
                  )}

                  {stage.statements && (
                    <div className="p-6 bg-brand-gray border-2 border-brand-black flex flex-col gap-2">
                      {stage.statements.map((stmt, idx) => (
                        <p key={idx} className="font-display font-black text-sm uppercase text-brand-black">
                          {stmt}
                        </p>
                      ))}
                    </div>
                  )}

                  {stage.items && (
                    <div className="flex flex-col gap-3 pt-2">
                      {stage.listLabel && (
                        <span className="font-mono text-xs uppercase font-bold text-brand-black/60 tracking-wider">
                          {stage.listLabel}
                        </span>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {stage.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 bg-brand-gray/50 border border-brand-black/30 flex items-center gap-3 text-sm font-sans text-brand-black"
                          >
                            <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0" />
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
      <section className="py-20 md:py-28 px-6 md:px-12 bg-brand-slate text-white border-b-2 border-brand-black">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-white/20 pb-8">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <BauhausBadge variant="yellow" shape="square">
                  {growthLoop.badge}
                </BauhausBadge>
                <span className="font-mono text-xs uppercase font-bold tracking-widest text-brand-gray">
                  ITERATIVE EVOLUTION
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white">
                {growthLoop.title}
              </h2>
            </div>
            <span className="font-mono text-xs uppercase font-bold text-brand-yellow">
              {growthLoop.sequence}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Diagram */}
            <div className="lg:col-span-6 border-2 border-white/30 p-2 bg-brand-white shadow-hard-lg">
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-brand-black">
                <Image
                  src="/images/bauhaus-diagram-growth-loop.jpg"
                  alt="AxonVortex Growth Loop Framework"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 bg-brand-black text-white font-mono text-xs flex items-center justify-between border-t border-brand-black">
                <span>DIAG-006 // CONTINUOUS GROWTH LOOP</span>
                <span className="text-brand-yellow">HYPOTHESIS → IMPROVE</span>
              </div>
            </div>

            {/* Right: Narrative & Changing Factors */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="flex flex-col gap-3 text-lg font-body text-white/90 leading-relaxed border-l-4 border-brand-yellow pl-6">
                {growthLoop.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {growthLoop.changeFactors.map((factor, i) => (
                  <div
                    key={i}
                    className="p-4 border border-white/20 bg-white/5 flex items-center gap-3 font-mono text-xs uppercase font-bold text-white"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-brand-yellow shrink-0" />
                    <span>{factor}</span>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-white/10 border-2 border-white/30 text-center">
                <p className="font-display font-black text-2xl uppercase tracking-tight text-brand-yellow">
                  {growthLoop.conclusion}
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. HUMAN + AI SYNTHESIS */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-brand-white border-b-2 border-brand-black">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-brand-black pb-8">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <BauhausBadge variant="blue" shape="square">
                  {humanAi.badge}
                </BauhausBadge>
                <span className="font-mono text-xs uppercase font-bold tracking-widest text-brand-black/60">
                  COLLABORATIVE INTELLIGENCE
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-brand-black">
                {humanAi.headline}
              </h2>
            </div>
            <p className="text-sm font-display font-bold uppercase text-brand-black/70">
              {humanAi.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* AI Capabilities Card */}
            <div className="p-8 border-2 border-brand-black bg-brand-gray shadow-hard-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b-2 border-brand-black pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Cpu className="w-6 h-6 text-brand-blue" />
                    <span className="font-display font-black text-2xl uppercase text-brand-black">
                      What AI Brings
                    </span>
                  </div>
                  <span className="font-mono text-xs font-black px-2 py-1 bg-brand-blue text-white">
                    SCALE ENGINE
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {humanAi.aiCapabilities.map((cap, i) => (
                    <div
                      key={i}
                      className="p-3 bg-brand-white border border-brand-black font-mono text-xs font-bold uppercase text-brand-black"
                    >
                      + {cap}
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-xs text-brand-black/70 font-sans mt-6 border-t border-brand-black/20 pt-4">
                Executes high-volume computation, pattern detection, automation, and continuous processing at machine scale.
              </p>
            </div>

            {/* Human Capabilities Card */}
            <div className="p-8 border-2 border-brand-black bg-brand-yellow/30 shadow-hard-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b-2 border-brand-black pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <User className="w-6 h-6 text-brand-red" />
                    <span className="font-display font-black text-2xl uppercase text-brand-black">
                      What Humans Bring
                    </span>
                  </div>
                  <span className="font-mono text-xs font-black px-2 py-1 bg-brand-yellow text-brand-black border border-brand-black">
                    DIRECTION
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {humanAi.humanCapabilities.map((cap, i) => (
                    <div
                      key={i}
                      className="p-3 bg-brand-white border border-brand-black font-mono text-xs font-bold uppercase text-brand-black"
                    >
                      + {cap}
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-xs text-brand-black/70 font-sans mt-6 border-t border-brand-black/20 pt-4">
                Establishes contextual judgment, emotional resonance, strategic nuance, ethical grounding, and business purpose.
              </p>
            </div>

          </div>

          {/* Conclusion Banner */}
          <div className="p-8 border-2 border-brand-black bg-brand-black text-white shadow-hard-md text-center flex flex-col items-center gap-2">
            <span className="font-mono text-xs uppercase font-bold text-brand-yellow tracking-widest">
              THE CORE SYNTHESIS
            </span>
            <p className="text-xl sm:text-2xl font-display font-black uppercase text-white">
              {humanAi.conclusions[0]} {humanAi.conclusions[1]}
            </p>
          </div>

        </div>
      </section>

      {/* 6. DATA PHILOSOPHY */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-brand-gray border-b-2 border-brand-black">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-brand-black pb-8">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <BauhausBadge variant="red" shape="square">
                  {dataPhilosophy.badge}
                </BauhausBadge>
                <span className="font-mono text-xs uppercase font-bold tracking-widest text-brand-black/60">
                  SIGNAL DISCIPLINE
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-brand-black">
                {dataPhilosophy.headline}
              </h2>
            </div>
            <div className="font-mono text-xs uppercase font-bold text-brand-black/60">
              {dataPhilosophy.introStatements.join(" ")}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Core Questions */}
            <div className="lg:col-span-5 p-8 border-2 border-brand-black bg-brand-white shadow-hard-md flex flex-col gap-6">
              <span className="font-mono text-xs font-black uppercase tracking-widest text-brand-red">
                {dataPhilosophy.coreQuestionsLabel}
              </span>
              <div className="flex flex-col gap-3">
                {dataPhilosophy.coreQuestions.map((q, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-brand-gray border-2 border-brand-black font-display font-black text-lg uppercase text-brand-black"
                  >
                    {q}
                  </div>
                ))}
              </div>
              <p className="text-xs font-sans text-brand-black/70 leading-relaxed border-t border-brand-black/20 pt-4">
                {dataPhilosophy.closing}
              </p>
            </div>

            {/* Metric Realities */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-black/60">
                Vanity Metrics vs Commercial Reality
              </span>
              {dataPhilosophy.metricRealities.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-brand-white border-2 border-brand-black shadow-hard-sm flex items-start gap-4"
                >
                  <span className="w-3 h-3 bg-brand-red border border-brand-black mt-1.5 shrink-0" />
                  <p className="text-base font-sans text-brand-black/90 font-bold">
                    {item}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* 7. OPERATING PRINCIPLES */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-brand-white border-b-2 border-brand-black">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-brand-black pb-8">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <BauhausBadge variant="yellow" shape="square">
                  {principles.badge}
                </BauhausBadge>
                <span className="font-mono text-xs uppercase font-bold tracking-widest text-brand-black/60">
                  STANDARD OPERATING CODE
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-brand-black">
                {principles.title}
              </h2>
            </div>
            <span className="font-mono text-xs uppercase font-bold text-brand-black/60">
              6 Foundational Pillars
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.items.map((principle, idx) => (
              <div
                key={idx}
                className="p-8 border-2 border-brand-black bg-brand-white shadow-hard-md hover:shadow-hard-lg hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <div className="flex items-center justify-between border-b-2 border-brand-black pb-3 mb-4">
                    <span className="font-mono text-xs font-black text-brand-red">
                      PILLAR
                    </span>
                    <span className="w-2.5 h-2.5 bg-brand-black" />
                  </div>
                  <h3 className="text-xl font-display font-black uppercase text-brand-black mb-3">
                    {principle.title}
                  </h3>
                </div>
                <p className="text-sm text-brand-black/80 font-sans leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. FINAL HIGH-IMPACT CTA */}
      <section className="py-24 px-6 md:px-12 bg-brand-red text-white border-b-2 border-brand-black">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="inline-block px-4 py-1.5 bg-brand-white text-brand-black border-2 border-brand-black font-mono text-xs font-black uppercase mb-8 shadow-hard-sm">
            INTENTIONAL GROWTH
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black uppercase tracking-tighter text-white mb-8 max-w-3xl leading-[0.95]">
            {principles.closingHeadline}
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              className="bg-brand-black text-white hover:bg-brand-white hover:text-brand-black text-lg px-10 py-5 border-2 border-brand-black shadow-hard-md"
              asLink
              href={principles.primaryCta.href}
            >
              {principles.primaryCta.label}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-brand-black text-lg px-8 py-5"
              asLink
              href={principles.secondaryCta.href}
            >
              {principles.secondaryCta.label}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
