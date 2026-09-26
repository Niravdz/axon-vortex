"use client";

import React, { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
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

  return (
    <div ref={containerRef} className="w-full bg-void text-soft-white overflow-x-clip">
      {/* 1. HERO - 3D Dimensional Split Section */}
      <section
        ref={heroRef}
        className="relative w-full border-b border-white/[0.08] py-16 sm:py-24 px-6 sm:px-10 lg:px-12 bg-[#121519]"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-8">
            <div>
              <div data-anim="cat-hero" className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e22] border border-[#3B82F6]/35 text-xs font-mono tracking-wider text-[#3B82F6] shadow-[0_2px_6px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
                  <span>{hero.badge}</span>
                </div>
              </div>

              <h1 data-anim="cat-hero" className="text-4xl sm:text-6xl lg:text-7xl font-heading font-semibold tracking-tight uppercase leading-[1.02] text-[#EFECE4]">
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

            <div data-anim="cat-hero" className="pt-2">
              <Button
                variant="amber"
                size="lg"
                withArrow
                asLink
                href={hero.cta.href}
                className="min-h-[50px] shadow-[0_4px_20px_rgba(244,186,0,0.4)]"
              >
                {hero.cta.label}
              </Button>
            </div>
          </div>

          {/* Right Hero Diagram (5 cols) */}
          <div data-anim="cat-hero" className="lg:col-span-5 rounded-[16px] bg-[#1b1e22] border border-white/[0.08] p-4 sm:p-6 shadow-[0_16px_38px_-6px_rgba(0,0,0,0.72),0_6px_14px_-3px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)]">
            <div className="relative w-full aspect-[16/10] rounded-[10px] bg-[#101215] border border-white/[0.04] overflow-hidden shadow-[inset_0_2px_6px_rgba(0,0,0,0.85)]">
              <Image
                src={diagramSrc}
                alt={`${hero.headline} architecture schematic`}
                fill
                priority
                className="object-contain p-2 opacity-90"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
            <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-[#9AA3B2]">
              <span>[SCHEMATIC SPECIFICATION]</span>
              <span className="text-[#3B82F6] font-semibold">AXONVORTEX ARCHITECTURE</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM DIAGNOSIS */}
      <section className="py-16 sm:py-24 px-6 sm:px-10 lg:px-12 border-b border-white/[0.08] bg-[#141619]">
        <ScrollReveal variant="fade-up" className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171a1e] border border-[#F4BA00]/30 text-xs font-mono tracking-wider text-[#F4BA00] mb-4 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F4BA00] animate-pulse" />
                <span>{problem.badge || "THE PROBLEM"}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-tight uppercase leading-tight text-[#EFECE4]">
                {problem.headline}
              </h2>
            </div>

            {problem.conclusion && (
              <div className="p-6 rounded-[12px] bg-[#1b1e22] border border-white/[0.08] shadow-[0_12px_28px_-4px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)]">
                <span className="font-mono text-xs font-semibold text-[#F4BA00] uppercase block mb-1">
                  IMPACT STATEMENT
                </span>
                <p className="font-heading font-medium text-sm sm:text-base text-[#EFECE4] leading-relaxed">
                  {problem.conclusion}
                </p>
              </div>
            )}
          </div>

          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {problem.points?.map((pt, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-[12px] bg-[#171a1e] border border-white/[0.08] shadow-[0_6px_18px_-2px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col justify-between hover:border-[#3B82F6]/40 hover:bg-[#21252a] transition-all"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono text-xs font-semibold text-[#3B82F6] px-2 py-0.5 rounded-[4px] bg-[#101215] border border-white/[0.04] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]">
                      FRICTION {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="font-body text-xs sm:text-sm text-[#9AA3B2] leading-relaxed">
                    {pt}
                  </p>
                </div>
              ))}
            </div>

            {problem.sequence && (
              <div className="p-4 rounded-[10px] bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_4px_rgba(0,0,0,0.7)] text-center font-heading font-medium text-sm uppercase tracking-wider text-[#EFECE4]">
                {problem.sequence}
              </div>
            )}
          </div>
        </ScrollReveal>
      </section>

      {/* 3. CAPABILITIES / SERVICES GRID */}
      <section className="py-16 sm:py-24 px-6 sm:px-10 lg:px-12 border-b border-white/[0.08] bg-[#121519]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal variant="fade-up" className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/[0.08]">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e22] border border-[#3B82F6]/35 text-xs font-mono tracking-wider text-[#3B82F6] mb-4 shadow-[0_2px_6px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]">
                <span>CAPABILITIES</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-heading font-semibold tracking-tight uppercase text-[#EFECE4]">
                What We Build
              </h2>
            </div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#9AA3B2]">
              [{services.length} CORE MODULES]
            </span>
          </ScrollReveal>

          <ScrollReveal variant="stagger" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 items-stretch">
            {services.map((svc, idx) => (
              <article
                key={idx}
                data-stagger-item
                className="rounded-[14px] bg-[#171a1e] border border-white/[0.08] p-6 sm:p-8 shadow-[0_10px_28px_-4px_rgba(0,0,0,0.72),0_4px_10px_-2px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col justify-between hover:border-[#3B82F6]/50 hover:bg-[#21252a] hover:shadow-[0_16px_34px_rgba(0,0,0,0.8),0_0_20px_rgba(59,130,246,0.15)] hover:-translate-y-1 transition-all duration-200 group"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-4 transition-colors">
                    <span className="w-2 h-2 rounded-full bg-[#3B82F6] group-hover:shadow-[0_0_8px_#3B82F6] transition-colors" />
                    {svc.slug && (
                      <Link
                        href={`/services/${svc.slug}`}
                        className="font-mono text-xs font-medium text-[#3B82F6] group-hover:text-[#60A5FA] inline-flex items-center gap-1 transition-colors"
                      >
                        <span>Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-heading font-semibold uppercase tracking-tight text-[#EFECE4] mb-2 group-hover:text-[#60A5FA] transition-colors leading-snug">
                    {svc.title}
                  </h3>

                  <p className="font-body text-xs sm:text-sm text-[#9AA3B2] leading-relaxed mb-4 transition-colors">
                    {svc.description}
                  </p>
                </div>

                {svc.includes && svc.includes.length > 0 && (
                  <div className="pt-4 border-t border-white/[0.06] transition-colors">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#9AA3B2] block mb-2 font-medium">
                      MODULE DELIVERABLES:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {svc.includes.map((inc, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-[4px] bg-[#101215] border border-white/[0.04] shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)] font-mono text-[11px] text-[#EFECE4]/90"
                        >
                          {inc}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* 4. EXECUTION METHODOLOGY / APPROACH STEPS */}
      <section className="py-16 sm:py-24 px-6 sm:px-10 lg:px-12 border-b border-white/[0.08] bg-[#141619]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal variant="fade-up" className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/[0.08]">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e22] border border-[#F4BA00]/35 text-xs font-mono tracking-wider text-[#F4BA00] mb-4 shadow-[0_2px_6px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]">
                <span>{approach.badge || "METHODOLOGY"}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-heading font-semibold tracking-tight uppercase text-[#EFECE4]">
                How This System Works
              </h2>
            </div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#9AA3B2]">
              [{approach.steps.length} EXECUTION STAGES]
            </span>
          </ScrollReveal>

          <ScrollReveal variant="stagger" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 items-stretch">
            {approach.steps.map((st, i) => (
              <div
                key={i}
                data-stagger-item
                className="p-6 sm:p-7 rounded-[12px] bg-[#171a1e] border border-white/[0.08] shadow-[0_8px_24px_-4px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col justify-between hover:border-[#3B82F6]/50 hover:bg-[#21252a] transition-all duration-200 group"
              >
                <div>
                  <div className="flex items-center gap-2 pb-3 border-b border-white/[0.06] mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F4BA00]" />
                    <span className="font-mono text-xs font-semibold tracking-wider text-[#F4BA00] px-2 py-0.5 rounded-[4px] bg-[#101215] border border-white/[0.04] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]">
                      STAGE {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-heading font-semibold uppercase text-[#EFECE4] mb-2 leading-snug">
                    {st.title || st.name}
                  </h3>
                </div>
                <p className="font-body text-xs sm:text-sm text-[#9AA3B2] leading-relaxed">
                  {st.description}
                </p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* 5. WHO THIS IS FOR */}
      <section className="py-16 sm:py-24 px-6 sm:px-10 lg:px-12 border-b border-white/[0.08] bg-[#121519]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal variant="fade-up" className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/[0.08]">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e22] border border-[#3B82F6]/35 text-xs font-mono tracking-wider text-[#3B82F6] mb-4 shadow-[0_2px_6px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]">
                <span>{whoThisIsFor.badge || "QUALIFICATION"}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-heading font-semibold tracking-tight uppercase text-[#EFECE4]">
                {whoThisIsFor.headline}
              </h2>
            </div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#9AA3B2]">
              PROFILE MATRIX
            </span>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            {whoThisIsFor.points.map((pt, idx) => (
              <div
                key={idx}
                className="p-6 rounded-[12px] bg-[#171a1e] border border-white/[0.08] shadow-[0_6px_18px_-2px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.08)] flex items-start gap-3.5 hover:border-[#3B82F6]/40 hover:bg-[#21252a] transition-all duration-200 group"
              >
                <div className="w-7 h-7 rounded-[6px] bg-[#101215] border border-white/[0.04] shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckSquare className="w-4 h-4 text-[#3B82F6]" />
                </div>
                <span className="font-body text-xs sm:text-sm font-medium text-[#EFECE4]/90 group-hover:text-[#EFECE4] leading-relaxed transition-colors">
                  {pt}
                </span>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* 6. FINAL DOMAIN CTA */}
      <section className="py-20 sm:py-28 px-6 sm:px-10 text-center bg-[#141619]">
        <ScrollReveal variant="fade-up" className="max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-semibold uppercase tracking-tight text-[#EFECE4] leading-tight">
            {finalCta.headline}
          </h2>

          <div className="mt-8">
            <Button
              variant="amber"
              size="lg"
              withArrow
              asLink
              href={finalCta.cta.href}
              className="min-h-[50px] shadow-[0_4px_20px_rgba(244,186,0,0.4)]"
            >
              {finalCta.cta.label}
            </Button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
