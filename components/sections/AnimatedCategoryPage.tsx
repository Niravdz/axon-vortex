"use client";

import React, { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CheckSquare, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { TactileButton } from "@/components/ui/TactileButton";
import { MatteSection } from "@/components/ui/MatteSection";
import { RaisedCard } from "@/components/ui/RaisedCard";
import { SiteTextureBackground } from "@/components/layout/SiteTextureBackground";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { getGSAP } from "@/lib/gsap";

interface ServiceItem {
  title: string;
  slug?: string;
  description: string;
  includes?: string[];
}

interface ApproachStep {
  number?: string;
  step?: string;
  title?: string;
  name?: string;
  description: string;
}

export interface CategoryPageData {
  hero: {
    badge: string;
    headline: string;
    paragraphs: string[];
    cta: { label: string; href: string };
  };
  problem: {
    badge?: string;
    headline: string;
    points?: string[];
    intro?: string;
    conclusion?: string;
    sequence?: string;
    opportunityPrimary?: string;
  };
  leadJourney?: {
    badge: string;
    stages: ApproachStep[];
  };
  services: ServiceItem[];
  approach: {
    badge?: string;
    steps: ApproachStep[];
  };
  purpose?: {
    badge: string;
    headline: string;
    description: string;
  };
  whoThisIsFor: {
    badge?: string;
    headline: string;
    points: string[];
  };
  finalCta: {
    headline: string;
    cta: { label: string; href: string };
  };
  globalCta?: {
    headline: string;
    cta?: { label: string; href: string };
  };
}

interface AnimatedCategoryPageProps {
  data: CategoryPageData;
  narrativeStyle?: "funnel" | "neural" | "blueprint" | "pipeline" | "integration";
}

const DOMAIN_DIAGRAMS: Record<string, string> = {
  funnel: "/images/bauhaus-diagram-marketing.png",
  neural: "/images/bauhaus-diagram-ai.png",
  blueprint: "/images/bauhaus-diagram-ecommerce.jpg",
  pipeline: "/images/bauhaus-diagram-leadgen.jpg",
  integration: "/images/bauhaus-diagram-technology.jpg",
};

export function AnimatedCategoryPage({
  data,
  narrativeStyle = "funnel",
}: AnimatedCategoryPageProps) {
  const { hero, problem, services, approach, whoThisIsFor, finalCta } = data;
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const diagramSrc = DOMAIN_DIAGRAMS[narrativeStyle] || "/images/bauhaus-tech-hero.png";

  useLayoutEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const { gsap } = getGSAP();
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll("[data-anim='cat-hero']"),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: "power3.out",
            clearProps: "transform,opacity",
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Split services into primary featured anchor and secondary architecture modules
  const primaryService = services[0];
  const secondaryServices = services.slice(1);

  return (
    <SiteTextureBackground className="overflow-x-clip">
      <div ref={containerRef} className="w-full text-[#EFECE4]">
        {/* 1. HERO - 3D Dimensional Split Section */}
        <section
          ref={heroRef}
          className="relative w-full border-b border-[#EFECE4]/[0.08] py-16 sm:py-24 px-4 sm:px-8 lg:px-12"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Hero Content (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-8">
              <div>
                <div data-anim="cat-hero" className="flex items-center gap-3 mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20252B] border border-[#3B82F6]/30 text-xs font-mono tracking-wider text-[#3B82F6] shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
                    <span>{hero.badge}</span>
                  </div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#9AA3B2]/70">
                    AXON·VORTEX DOMAIN
                  </span>
                </div>

                <h1
                  data-anim="cat-hero"
                  className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-heading font-semibold tracking-tight uppercase leading-[1.02] text-[#EFECE4]"
                >
                  {hero.headline}
                </h1>

                <div
                  data-anim="cat-hero"
                  className="mt-6 flex flex-col gap-4 font-body text-base text-[#9AA3B2] leading-relaxed border-l-2 border-[#3B82F6] pl-6 max-w-2xl"
                >
                  {hero.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>

              <div data-anim="cat-hero" className="pt-2 flex flex-wrap items-center gap-4">
                <TactileButton
                  variant="primary"
                  size="lg"
                  withArrow
                  asLink
                  href={hero.cta.href}
                  className="min-h-[50px]"
                >
                  {hero.cta.label}
                </TactileButton>

                <TactileButton
                  variant="charcoal"
                  size="lg"
                  asLink
                  href="#capabilities"
                  className="min-h-[50px]"
                >
                  Explore Capabilities
                </TactileButton>
              </div>
            </div>

            {/* Right Hero Diagram (5 cols) */}
            <div
              data-anim="cat-hero"
              className="lg:col-span-5 rounded-[20px] bg-[#1b1e22] border border-white/[0.08] p-5 sm:p-6 shadow-[0_24px_64px_-8px_rgba(0,0,0,0.85),0_8px_20px_-4px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)]"
            >
              <div className="flex items-center justify-between text-xs font-mono mb-3 text-[#9AA3B2]">
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-[4px] bg-[#101215] border border-white/[0.04]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
                  <span className="text-[#EFECE4]">SCHEMATIC SPEC</span>
                </div>
                <span className="text-[#F4BA00] text-[11px]">ARCHITECTURAL VIEW</span>
              </div>

              <div className="relative w-full aspect-[16/10] rounded-[12px] bg-[#101215] border border-white/[0.04] overflow-hidden shadow-[inset_0_2px_6px_rgba(0,0,0,0.85)]">
                <Image
                  src={diagramSrc}
                  alt={`${hero.headline} architecture schematic`}
                  fill
                  priority
                  className="object-contain p-3 opacity-90 hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>

              <div className="mt-4 flex items-center justify-between font-mono text-[11px] text-[#9AA3B2]">
                <span>[NODES: INTEGRATED]</span>
                <span className="text-[#3B82F6] font-semibold">AXON·VORTEX ENGINE</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. THE PROBLEM DIAGNOSIS */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto">
            <MatteSection radius="24" className="overflow-hidden">
              {/* Header Bar */}
              <div className="border-b border-white/[0.08] px-6 sm:px-10 py-4 bg-[#141619] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-[#EFECE4]/90">
                  <span className="w-2 h-2 rounded-full bg-[#F4BA00] animate-pulse" />
                  <span>{problem.badge || "DIAGNOSTIC AUDIT"}</span>
                </div>
                <span className="font-mono text-xs text-[#9AA3B2]">DOMAIN FRICTION SCAN</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                {/* Left Column: Statement & Impact (5 cols) */}
                <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/[0.08] bg-[#1b1e22] flex flex-col justify-between gap-8">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171a1e] border border-[#F4BA00]/30 text-xs font-mono tracking-wider text-[#F4BA00] mb-6 shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
                      CORE CHALLENGE
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold tracking-tight uppercase leading-[1.08] text-[#EFECE4]">
                      {problem.headline}
                    </h2>
                  </div>

                  {problem.conclusion && (
                    <div className="p-6 rounded-[14px] bg-[#101215] border border-[#F4BA00]/25 shadow-[inset_0_2px_5px_rgba(0,0,0,0.78),inset_0_1px_1px_rgba(0,0,0,0.92),0_1px_0_rgba(255,255,255,0.04)]">
                      <span className="font-mono text-xs font-semibold text-[#F4BA00] uppercase tracking-wider block mb-2">
                        IMPACT STATEMENT
                      </span>
                      <p className="font-heading font-medium text-sm sm:text-base text-[#EFECE4] leading-relaxed">
                        {problem.conclusion}
                      </p>
                    </div>
                  )}
                </div>

                {/* Right Column: Structured Diagnostic Ledger (7 cols) */}
                <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 bg-[#101215] flex flex-col gap-4 shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)]">
                  <div className="flex flex-col gap-3">
                    {problem.points?.map((pt, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-[12px] bg-[#171a1e] border border-white/[0.08] shadow-[0_4px_14px_-2px_rgba(0,0,0,0.72),inset_0_1px_0_rgba(255,255,255,0.08)] flex items-start gap-4 hover:bg-[#21252a] hover:border-[#3B82F6]/40 transition-all group"
                      >
                        <span className="font-mono text-xs font-semibold text-[#3B82F6] px-2.5 py-1 rounded-[6px] bg-[#101215] border border-white/[0.05] shrink-0 group-hover:border-[#3B82F6]/60 transition-colors shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <p className="font-body text-xs sm:text-sm text-[#9AA3B2] leading-relaxed pt-0.5">
                          {pt}
                        </p>
                      </div>
                    ))}
                  </div>

                  {problem.sequence && (
                    <div className="mt-2 p-4 rounded-[12px] bg-[#171a1e] border border-white/[0.06] shadow-[0_2px_8px_rgba(0,0,0,0.4)] text-center font-heading font-medium text-xs sm:text-sm uppercase tracking-wider text-[#F4BA00]">
                      {problem.sequence}
                    </div>
                  )}
                </div>
              </div>
            </MatteSection>
          </div>
        </section>

        {/* 3. CAPABILITIES ARCHITECTURE (REDESIGNED: ASYMMETRICAL SHOWCASE) */}
        <section
          id="capabilities"
          className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]"
        >
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#EFECE4]/[0.08] mb-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20252B] border border-[#3B82F6]/30 text-xs font-mono tracking-wider text-[#3B82F6] mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                  <span>ARCHITECTURE</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-tight uppercase text-[#EFECE4]">
                  What We Build
                </h2>
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#9AA3B2]">
                [{services.length} CORE CAPABILITY MODULES]
              </span>
            </div>

            {/* Asymmetrical Layout: Primary Anchor Module (5 cols) + Secondary Architecture Stack (7 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Primary Anchor Module */}
              {primaryService && (
                <div className="lg:col-span-5 flex flex-col">
                  <MatteSection radius="20" className="p-8 sm:p-10 h-full flex flex-col justify-between border-[#3B82F6]/30 hover:border-[#3B82F6]/50 transition-all duration-300">
                    <div>
                      <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                        <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-[6px] bg-[#101215] text-[#3B82F6] border border-white/[0.04] shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]">
                          PRIMARY ANCHOR 01
                        </span>
                        {primaryService.slug && (
                          <Link
                            href={`/services/${primaryService.slug}`}
                            className="font-mono text-xs text-[#3B82F6] hover:text-[#60A5FA] inline-flex items-center gap-1 transition-colors"
                          >
                            <span>Inspect Specs</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-heading font-semibold uppercase tracking-tight text-[#EFECE4] mb-3">
                        {primaryService.title}
                      </h3>

                      <p className="font-body text-sm text-[#9AA3B2] leading-relaxed mb-6">
                        {primaryService.description}
                      </p>

                      {primaryService.includes && primaryService.includes.length > 0 && (
                        <div className="p-4 rounded-[12px] bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_5px_rgba(0,0,0,0.78)]">
                          <span className="font-mono text-[11px] uppercase tracking-wider text-[#F4BA00] block mb-2 font-medium">
                            DELIVERABLE SPECIFICATIONS:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {primaryService.includes.map((inc, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 rounded-[6px] bg-[#171a1e] border border-white/[0.06] font-mono text-xs text-[#EFECE4]/90 shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
                              >
                                {inc}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-8 border-t border-white/[0.08] mt-8 flex items-center justify-between">
                      <span className="font-mono text-xs text-[#9AA3B2]">
                        CORE CAPABILITY
                      </span>
                      {primaryService.slug && (
                        <Link
                          href={`/services/${primaryService.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#3B82F6] hover:text-[#60A5FA] transition-colors"
                        >
                          <span>Full Brief</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  </MatteSection>
                </div>
              )}

              {/* Secondary Architecture Modules (Structured 2-column or list) */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
                  {secondaryServices.map((svc, idx) => (
                    <RaisedCard
                      key={idx}
                      radius="16"
                      glowOnHover="blue"
                      className="p-6 sm:p-7 flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-3">
                          <span className="font-mono text-xs font-semibold text-[#3B82F6] px-2 py-0.5 rounded-[4px] bg-[#101215] border border-white/[0.04] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]">
                            0{idx + 2}
                          </span>
                          {svc.slug && (
                            <Link
                              href={`/services/${svc.slug}`}
                              className="font-mono text-xs text-[#9AA3B2] group-hover:text-[#3B82F6] inline-flex items-center gap-1 transition-colors"
                            >
                              <span>Specs</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </Link>
                          )}
                        </div>

                        <h4 className="text-lg font-heading font-semibold uppercase tracking-tight text-[#EFECE4] group-hover:text-[#60A5FA] transition-colors mb-2 leading-snug">
                          {svc.title}
                        </h4>

                        <p className="font-body text-xs sm:text-sm text-[#9AA3B2] leading-relaxed">
                          {svc.description}
                        </p>
                      </div>

                      {svc.includes && svc.includes.length > 0 && (
                        <div className="pt-4 border-t border-white/[0.06] mt-4 flex flex-wrap gap-1.5">
                          {svc.includes.slice(0, 3).map((inc, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded-[4px] bg-[#101215] border border-white/[0.04] font-mono text-[10px] text-[#EFECE4]/80"
                            >
                              {inc}
                            </span>
                          ))}
                        </div>
                      )}
                    </RaisedCard>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. EXECUTION METHODOLOGY (REDESIGNED: CONNECTED LINEAR PIPELINE) */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto">
            <MatteSection radius="24" className="p-6 sm:p-10 lg:p-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#EFECE4]/[0.08] mb-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20252B] border border-[#F4BA00]/30 text-xs font-mono tracking-wider text-[#F4BA00] mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F4BA00] animate-pulse" />
                    <span>{approach.badge || "METHODOLOGY"}</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-tight uppercase text-[#EFECE4]">
                    How This System Works
                  </h2>
                </div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#9AA3B2]">
                  [{approach.steps.length} SEQUENTIAL STAGES]
                </span>
              </div>

              {/* Connecting Conduit Pipeline */}
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="hidden xl:block absolute top-6 left-6 right-6 h-[2px] bg-gradient-to-r from-[#3B82F6] via-[#2D5BB9] to-[#F4BA00] z-0 shadow-[0_0_12px_rgba(59,130,246,0.4)]"
                />

                <div
                  className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${
                    approach.steps.length >= 5 ? "xl:grid-cols-5" : "xl:grid-cols-4"
                  } gap-4 relative z-10`}
                >
                  {approach.steps.map((st, i) => {
                    const isLast = i === approach.steps.length - 1;

                    return (
                      <RaisedCard
                        key={i}
                        radius="16"
                        glowOnHover={isLast ? "amber" : "blue"}
                        className={`p-5 sm:p-6 flex flex-col justify-between group ${
                          isLast ? "border-[#F4BA00]/40 shadow-[0_8px_24px_rgba(0,0,0,0.6),0_0_16px_rgba(244,186,0,0.15)]" : ""
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-3">
                            <span className="font-mono text-xs font-semibold text-[#3B82F6] px-2 py-0.5 rounded-[4px] bg-[#101215] border border-white/[0.04]">
                              0{i + 1}
                            </span>
                            <span
                              className={`w-2 h-2 rounded-full ${
                                isLast ? "bg-[#F4BA00] shadow-[0_0_8px_#F4BA00]" : "bg-[#3B82F6]/60 group-hover:bg-[#3B82F6]"
                              }`}
                            />
                          </div>

                          <h3 className="font-heading font-semibold text-sm sm:text-base uppercase text-[#EFECE4] group-hover:text-[#60A5FA] transition-colors mb-2 leading-tight">
                            {st.title || st.name}
                          </h3>
                        </div>

                        <p className="font-body text-xs text-[#9AA3B2] leading-relaxed pt-2">
                          {st.description}
                        </p>
                      </RaisedCard>
                    );
                  })}
                </div>

                {/* Continuous Loop Feedback Strip */}
                <div className="mt-8 p-4 sm:p-5 rounded-[14px] bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_5px_rgba(0,0,0,0.78),inset_0_1px_1px_rgba(0,0,0,0.92),0_1px_0_rgba(255,255,255,0.04)] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F4BA00] animate-pulse" />
                    <span className="font-mono text-xs uppercase tracking-wider text-[#EFECE4]/90 font-medium">
                      CONTINUOUS ADAPTATION LOOP
                    </span>
                  </div>
                  <p className="text-xs font-body text-[#9AA3B2] text-center sm:text-right max-w-md">
                    Each stage feeds performance data into downstream automations to prevent channel stagnation.
                  </p>
                </div>
              </div>
            </MatteSection>
          </div>
        </section>

        {/* 5. WHO THIS IS FOR (REDESIGNED: SPLIT QUALIFICATION CONSOLE) */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto">
            <MatteSection radius="24" className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                {/* Left Side: Mandate (5 cols) */}
                <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/[0.08] bg-[#1b1e22] flex flex-col justify-between gap-8">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20252B] border border-[#3B82F6]/30 text-xs font-mono tracking-wider text-[#3B82F6] mb-6 shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{whoThisIsFor.badge || "QUALIFICATION"}</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold tracking-tight uppercase leading-[1.08] text-[#EFECE4]">
                      {whoThisIsFor.headline}
                    </h2>

                    <p className="mt-4 font-body text-sm text-[#9AA3B2] leading-relaxed">
                      We engineer this domain specifically for operators who prioritize commercial predictability over disconnected vanity metrics.
                    </p>
                  </div>

                  <div className="p-5 rounded-[12px] bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_4px_rgba(0,0,0,0.7)]">
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#F4BA00] block mb-1">
                      READINESS CRITERIA
                    </span>
                    <p className="font-body text-xs text-[#EFECE4]/85 leading-relaxed">
                      Designed for businesses ready to scale infrastructure rather than run unmeasured experiments.
                    </p>
                  </div>
                </div>

                {/* Right Side: Structured Criteria Ledger (7 cols) */}
                <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 bg-[#101215] flex flex-col justify-center gap-3 shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)]">
                  {whoThisIsFor.points.map((pt, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-[12px] bg-[#171a1e] border border-white/[0.08] shadow-[0_4px_14px_-2px_rgba(0,0,0,0.72),inset_0_1px_0_rgba(255,255,255,0.08)] flex items-start gap-4 hover:bg-[#21252a] hover:border-[#3B82F6]/40 transition-all group"
                    >
                      <div className="w-6 h-6 rounded-[6px] bg-[#101215] border border-white/[0.04] shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)] flex items-center justify-center shrink-0 mt-0.5">
                        <CheckSquare className="w-3.5 h-3.5 text-[#3B82F6] group-hover:text-[#60A5FA] transition-colors" />
                      </div>
                      <span className="font-body text-xs sm:text-sm text-[#EFECE4]/90 group-hover:text-[#EFECE4] leading-relaxed">
                        {pt}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </MatteSection>
          </div>
        </section>

        {/* 6. FINAL DOMAIN CTA */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 text-center">
          <div className="max-w-4xl mx-auto">
            <MatteSection radius="24" className="p-8 sm:p-12 lg:p-16 flex flex-col items-center border-[#3B82F6]/30">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20252B] border border-[#F4BA00]/30 text-xs font-mono tracking-wider text-[#F4BA00] mb-6">
                <Zap className="w-3.5 h-3.5" />
                <span>READY TO DEPLOY</span>
              </div>

              <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-semibold uppercase tracking-tight text-[#EFECE4] leading-tight max-w-3xl">
                {finalCta.headline}
              </h2>

              <p className="mt-4 text-sm sm:text-base text-[#9AA3B2] max-w-xl">
                Schedule a diagnostic consultation to evaluate your existing stack, bottlenecks, and commercial targets.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <TactileButton
                  variant="primary"
                  size="lg"
                  withArrow
                  asLink
                  href={finalCta.cta.href}
                  className="min-h-[50px] shadow-[0_4px_20px_rgba(244,186,0,0.35)]"
                >
                  {finalCta.cta.label}
                </TactileButton>

                <TactileButton
                  variant="charcoal"
                  size="lg"
                  asLink
                  href="/growth-audit"
                  className="min-h-[50px]"
                >
                  Request Growth Audit
                </TactileButton>
              </div>
            </MatteSection>
          </div>
        </section>
      </div>
    </SiteTextureBackground>
  );
}
