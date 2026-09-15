"use client";

import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { BauhausBadge } from "@/components/ui/BauhausBadge";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { authorityData } from "@/data/content/authorityConversion";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { getGSAP } from "@/lib/gsap";

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

  // Smooth architectural crossfade when switching active topic
  useEffect(() => {
    if (prefersReducedMotion || !topicContentRef.current) return;
    const { gsap } = getGSAP();
    gsap.fromTo(
      topicContentRef.current,
      { opacity: 0.2, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.22,
        ease: "power2.out",
        clearProps: "transform,opacity",
      }
    );
  }, [activeTopic, prefersReducedMotion]);

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
            <span className="text-brand-red font-black">Insights &amp; Knowledge</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-brand-red animate-pulse" />
            <span className="font-bold text-brand-black tracking-wider">PRACTICAL THINKING HUB</span>
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
            <div data-anim="insights-hero" className="flex flex-wrap items-center gap-3">
              <BauhausBadge variant="red" shape="square">
                {insights.badge}
              </BauhausBadge>
              <BauhausBadge variant="yellow" shape="pill">
                {insights.title}
              </BauhausBadge>
              <span className="font-mono text-xs text-brand-black/60 font-bold uppercase tracking-widest">
                ZERO HYPE // USEFUL MODELS
              </span>
            </div>

            <h1 data-anim="insights-hero" className="text-4xl sm:text-6xl md:text-7xl font-heading font-bold uppercase tracking-[0.015em] leading-[0.95] text-brand-black">
              Ideas for businesses <br />
              <span className="text-brand-red">growing in a digital world.</span>
            </h1>

            <p data-anim="insights-hero" className="text-lg md:text-xl font-body text-brand-black/80 max-w-2xl leading-relaxed border-l-4 border-brand-red pl-6 py-2 bg-brand-gray/30">
              {insights.subWelcome}
            </p>

            {/* Principles Checklist */}
            <div data-anim="insights-hero" className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {insights.principles.map((pr, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-brand-white border-2 border-brand-black shadow-hard-sm flex items-center gap-3 text-xs font-mono uppercase font-bold text-brand-black"
                >
                  <span className="w-2.5 h-2.5 bg-brand-red shrink-0" />
                  <span>{pr}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Topic Directory Plate */}
          <div data-anim="insights-hero" className="lg:col-span-4 flex flex-col">
            <div className="border-2 border-brand-black bg-brand-gray p-6 sm:p-8 shadow-hard-lg flex flex-col gap-6">
              <div className="border-b-2 border-brand-black pb-4">
                <span className="font-mono text-xs font-black uppercase tracking-widest text-brand-black/60 block mb-1">
                  TAXONOMY INDEX
                </span>
                <span className="font-display font-black text-2xl uppercase text-brand-black">
                  Core Topic Matrix
                </span>
              </div>

              <div className="flex flex-col gap-2 font-mono text-xs">
                {insights.topics.map((top, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTopic(idx)}
                    className={`p-3 border-2 font-black uppercase text-left flex items-center justify-between transition-all ${
                      activeTopic === idx
                        ? "bg-brand-red text-white border-brand-black shadow-hard-sm"
                        : "bg-brand-white text-brand-black border-brand-black/30 hover:border-brand-black"
                    }`}
                  >
                    <span>{top.category}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${activeTopic === idx ? "text-white" : "opacity-40"}`} />
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t-2 border-brand-black">
                <span className="font-mono text-[11px] text-brand-black/70 block">
                  Select a category above to inspect focus areas below.
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. ACTIVE TOPIC INSPECTOR */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-brand-gray border-b-2 border-brand-black">
        <div ref={topicContentRef} className="max-w-7xl mx-auto flex flex-col gap-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-brand-black pb-8">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <BauhausBadge variant="yellow" shape="square">
                  TOPIC
                </BauhausBadge>
                <span className="font-mono text-xs uppercase font-bold tracking-widest text-brand-black/60">
                  DEEP DIVE
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-brand-black">
                {insights.topics[activeTopic].category}
              </h2>
            </div>
            <p className="font-mono text-xs uppercase font-bold text-brand-black/60">
              {insights.topics[activeTopic].intro}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {insights.topics[activeTopic].items.map((item, idx) => (
              <div
                key={idx}
                className="p-8 border-2 border-brand-black bg-brand-white shadow-hard-md flex items-center justify-between group hover:shadow-hard-lg hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-brand-red shrink-0" />
                  <span className="font-display font-black text-lg uppercase text-brand-black group-hover:text-brand-red transition-colors">
                    {item}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-brand-black/40 group-hover:text-brand-red transition-colors" />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. EDITORIAL TAXONOMY (CONTENT TYPES) */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-brand-white border-b-2 border-brand-black">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          <ScrollReveal variant="fade-up" className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-brand-black pb-8">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <BauhausBadge variant="blue" shape="square">
                  {contentTypes.badge}
                </BauhausBadge>
                <span className="font-mono text-xs uppercase font-bold tracking-widest text-brand-black/60">
                  FORMAT CLASSIFICATION
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-brand-black">
                {contentTypes.title}
              </h2>
            </div>
            <span className="font-mono text-xs uppercase font-bold text-brand-black/60">
              7 Distinct Knowledge Formats
            </span>
          </ScrollReveal>

          <ScrollReveal variant="stagger" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contentTypes.items.map((type, idx) => (
              <div
                key={idx}
                data-stagger-item
                className="p-8 border-2 border-brand-black bg-brand-white shadow-hard-md flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <div className="flex items-center justify-between border-b-2 border-brand-black pb-3 mb-4">
                    <span className="font-mono text-xs font-black text-brand-black px-2 py-0.5 bg-brand-yellow border border-brand-black">
                      TYPE
                    </span>
                    <span className="w-2.5 h-2.5 bg-brand-red" />
                  </div>
                  <h3 className="text-xl font-display font-black uppercase text-brand-black mb-2">
                    {type.type}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-brand-black/80 font-sans leading-relaxed">
                  {type.description}
                </p>
              </div>
            ))}
          </ScrollReveal>

        </div>
      </section>

      {/* 4. THE AXONVORTEX CONTENT LOOP */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-brand-slate text-white border-b-2 border-brand-black">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          <ScrollReveal variant="fade-up" className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-white/20 pb-8">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <BauhausBadge variant="red" shape="square">
                  {contentLoop.badge}
                </BauhausBadge>
                <span className="font-mono text-xs uppercase font-bold tracking-widest text-brand-gray">
                  KNOWLEDGE GENERATION
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white">
                {contentLoop.title}
              </h2>
            </div>
            <span className="font-mono text-xs uppercase font-bold text-brand-yellow">
              Problem → Research → Insight → Action → Solution
            </span>
          </ScrollReveal>

          <ScrollReveal variant="stagger" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {contentLoop.steps.map((step, idx) => (
              <div
                key={idx}
                data-stagger-item
                className="p-8 border-2 border-white/30 bg-white/5 flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-4">
                    <span className="font-mono text-xs font-black px-2 py-1 bg-brand-red text-white">
                      STEP
                    </span>
                    <span className="font-mono text-xs text-brand-yellow font-bold">→</span>
                  </div>
                  <h3 className="text-xl font-display font-black uppercase text-white mb-2">
                    {step.stage}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-brand-gray font-sans leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </ScrollReveal>

        </div>
      </section>

      {/* 5. DIAGNOSTIC RESOURCES / LEAD MAGNETS */}
      {leadMagnets && (
        <section className="py-20 md:py-28 px-6 md:px-12 bg-brand-gray border-b-2 border-brand-black">
          <div className="max-w-7xl mx-auto flex flex-col gap-12">
            
            <ScrollReveal variant="fade-up" className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-brand-black pb-8">
              <div className="flex flex-col gap-3 max-w-2xl">
                <div className="flex items-center gap-2">
                  <BauhausBadge variant="yellow" shape="square">
                    {leadMagnets.badge}
                  </BauhausBadge>
                  <span className="font-mono text-xs uppercase font-bold tracking-widest text-brand-black/60">
                    DIAGNOSTIC FRAMEWORKS
                  </span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-brand-black">
                  {leadMagnets.title}
                </h2>
              </div>
              <span className="font-mono text-xs uppercase font-bold text-brand-black/60">
                5 Practical Self-Assessments
              </span>
            </ScrollReveal>

            <ScrollReveal variant="stagger" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {leadMagnets.items.map((lm) => (
                <div
                  key={lm.id}
                  data-stagger-item
                  className="p-8 border-2 border-brand-black bg-brand-white shadow-hard-md flex flex-col justify-between"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between border-b-2 border-brand-black pb-3">
                      <span className="font-mono text-xs font-black text-brand-red">
                        RESOURCE
                      </span>
                      <span className="w-2.5 h-2.5 bg-brand-black" />
                    </div>

                    <h3 className="text-2xl font-display font-black uppercase text-brand-black">
                      {lm.title}
                    </h3>

                    <p className="text-sm font-display font-bold uppercase text-brand-black/80">
                      {lm.question}
                    </p>

                    <div className="pt-2">
                      <span className="font-mono text-[11px] uppercase font-bold text-brand-black/50 block mb-2">
                        {lm.evaluationLabel}
                      </span>
                      <div className="grid grid-cols-2 gap-1.5">
                        {lm.areas.map((area, i) => (
                          <div key={i} className="text-xs font-sans text-brand-black/80 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-brand-red" />
                            <span>{area}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t-2 border-brand-black mt-6">
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full bg-brand-black text-white hover:bg-brand-red text-xs py-3"
                      asLink
                      href={lm.cta.href}
                    >
                      {lm.cta.label}
                      <ArrowRight className="ml-2 w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </ScrollReveal>

          </div>
        </section>
      )}

      {/* 6. FINAL HIGH-IMPACT CTA */}
      <section className="py-24 px-6 md:px-12 bg-brand-red text-white border-b-2 border-brand-black">
        <ScrollReveal variant="fade-up" className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="inline-block px-4 py-1.5 bg-brand-white text-brand-black border-2 border-brand-black font-mono text-xs font-black uppercase mb-8 shadow-hard-sm">
            HAVE A QUESTION?
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black uppercase tracking-tighter text-white mb-6 max-w-3xl leading-[0.95]">
            {contentLoop.questionCallout}
          </h2>

          <p className="text-2xl sm:text-3xl font-display font-black uppercase text-brand-yellow mb-8">
            {contentLoop.startWithProblem} {contentLoop.helpThinkThrough}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              className="bg-brand-black text-white hover:bg-brand-white hover:text-brand-black text-lg px-10 py-5 border-2 border-brand-black shadow-hard-md"
              asLink
              href={contentLoop.cta.href}
            >
              {contentLoop.cta.label}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-brand-black text-lg px-8 py-5"
              asLink
              href="/growth-audit"
            >
              Request Growth Audit
            </Button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
