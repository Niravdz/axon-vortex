"use client";

import React, { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BauhausBadge } from "@/components/ui/BauhausBadge";
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

  const isDarkHero = narrativeStyle === "neural" || narrativeStyle === "integration";
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
    <div ref={containerRef} className="w-full bg-white text-[#090909] overflow-x-clip">
      {/* 1. HERO - Split Editorial Section */}
      <section
        ref={heroRef}
        className={`relative w-full border-b-4 border-[#090909] py-16 sm:py-24 px-6 sm:px-12 lg:px-16 ${
          isDarkHero ? "bg-[#0F2747] text-white" : "bg-white text-[#090909]"
        }`}
      >
        <div className="max-w-[1560px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-8">
            <div>
              <div data-anim="cat-hero" className="flex items-center gap-3 mb-6">
                <BauhausBadge
                  variant={isDarkHero ? "yellow" : "red"}
                  shape="square"
                  size="sm"
                >
                  {hero.badge}
                </BauhausBadge>
                <span
                  className={`font-mono text-xs uppercase tracking-widest ${
                    isDarkHero ? "text-white/60" : "text-[#090909]/60"
                  } font-bold`}
                >
                  CAPABILITY DOMAIN
                </span>
              </div>

              <h1 data-anim="cat-hero" className="text-4xl sm:text-6xl lg:text-7xl font-heading font-bold tracking-[0.015em] uppercase leading-[0.98]">
                {hero.headline}
              </h1>

              <div
                data-anim="cat-hero"
                className={`mt-6 flex flex-col gap-4 font-body text-base sm:text-lg leading-relaxed border-l-4 ${
                  isDarkHero ? "border-[#FFD447] text-white/80" : "border-[#F23B32] text-[#090909]/80"
                } pl-6 max-w-2xl`}
              >
                {hero.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            <div data-anim="cat-hero" className="pt-2">
              <Button
                variant={isDarkHero ? "yellow" : "primary"}
                size="lg"
                withArrow
                asLink
                href={hero.cta.href}
                className="min-h-[52px]"
              >
                {hero.cta.label}
              </Button>
            </div>
          </div>

          {/* Right Hero Diagram (5 cols) */}
          <div data-anim="cat-hero" className="lg:col-span-5 bg-[#E9EDF2] border-4 border-[#090909] p-4 sm:p-6 shadow-[8px_8px_0px_0px_#090909] bauhaus-grid-bg">
            <div className="relative w-full aspect-[16/10] bg-white border-2 border-[#090909] overflow-hidden">
              <Image
                src={diagramSrc}
                alt={`${hero.headline} architecture schematic`}
                fill
                priority
                className="object-contain p-2"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
            <div className="mt-3 flex items-center justify-between font-mono text-[11px] font-bold text-[#090909]">
              <span>[SCHEMATIC SPECIFICATION]</span>
              <span className="text-[#F23B32]">AXONVORTEX ARCHITECTURE</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM DIAGNOSIS */}
      <section className="py-16 sm:py-24 px-6 sm:px-12 lg:px-16 border-b-4 border-[#090909] bg-[#E9EDF2]">
        <ScrollReveal variant="fade-up" className="max-w-[1560px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div>
              <BauhausBadge variant="red" shape="square" size="sm" className="mb-4">
                {problem.badge || "THE PROBLEM"}
              </BauhausBadge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight uppercase leading-tight text-[#090909]">
                {problem.headline}
              </h2>
            </div>

            {problem.conclusion && (
              <div className="p-6 bg-white border-2 border-[#090909] shadow-[4px_4px_0px_0px_#090909]">
                <span className="font-mono text-xs font-bold text-[#F23B32] uppercase block mb-1">
                  IMPACT STATEMENT
                </span>
                <p className="font-heading font-bold text-base text-[#090909] uppercase">
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
                  className="p-6 bg-white border-2 border-[#090909] shadow-[3px_3px_0px_0px_#090909] flex flex-col justify-between hover:border-[#F23B32] transition-colors"
                >
                  <span className="font-mono text-xs font-bold text-[#F23B32] mb-3">
                    FRICTION
                  </span>
                  <p className="font-body text-sm text-[#090909]/80 leading-relaxed font-medium">
                    {pt}
                  </p>
                </div>
              ))}
            </div>

            {problem.sequence && (
              <div className="p-4 bg-[#FFD447] border-2 border-[#090909] text-center font-heading font-black text-sm uppercase tracking-wider text-[#090909]">
                {problem.sequence}
              </div>
            )}
          </div>
        </ScrollReveal>
      </section>

      {/* 3. CAPABILITIES / SERVICES GRID */}
      <section className="py-16 sm:py-24 px-6 sm:px-12 lg:px-16 border-b-4 border-[#090909] bg-white">
        <div className="max-w-[1560px] mx-auto">
          <ScrollReveal variant="fade-up" className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b-4 border-[#090909]">
            <div>
              <BauhausBadge variant="blue" shape="square" size="sm" className="mb-4">
                CAPABILITIES
              </BauhausBadge>
              <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight uppercase text-[#090909]">
                WHAT WE BUILD
              </h2>
            </div>
            <span className="font-mono text-xs font-bold uppercase text-[#090909]/60">
              [{services.length} CORE MODULES]
            </span>
          </ScrollReveal>

          <ScrollReveal variant="stagger" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {services.map((svc, idx) => (
              <article
                key={idx}
                data-stagger-item
                className="bg-[#E9EDF2] border-4 border-[#090909] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#090909] flex flex-col justify-between min-h-[280px] hover:bg-white transition-colors group"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b-2 border-[#090909] mb-4">
                    <span className="w-2 h-2 bg-[#F23B32]" />
                    {svc.slug && (
                      <Link
                        href={`/services/${svc.slug}`}
                        className="font-mono text-xs font-bold text-[#2F5FA7] hover:text-[#F23B32] inline-flex items-center gap-1 group-hover:underline"
                      >
                        <span>Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>

                  <h3 className="text-xl font-heading font-black uppercase tracking-tight text-[#090909] mb-2 group-hover:text-[#F23B32] transition-colors">
                    {svc.title}
                  </h3>

                  <p className="font-body text-xs sm:text-sm text-[#090909]/75 leading-relaxed mb-4">
                    {svc.description}
                  </p>
                </div>

                {svc.includes && svc.includes.length > 0 && (
                  <div className="pt-4 border-t-2 border-[#090909]/15">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#090909]/60 block mb-2">
                      MODULE DELIVERABLES:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {svc.includes.map((inc, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-white border border-[#090909] font-mono text-[11px] font-semibold text-[#090909]"
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
      <section className="py-16 sm:py-24 px-6 sm:px-12 lg:px-16 border-b-4 border-[#090909] bg-[#0F2747] text-white">
        <div className="max-w-[1560px] mx-auto">
          <ScrollReveal variant="fade-up" className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b-2 border-white/20">
            <div>
              <BauhausBadge variant="yellow" shape="square" size="sm" className="mb-4">
                {approach.badge || "METHODOLOGY"}
              </BauhausBadge>
              <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight uppercase text-white">
                HOW THIS SYSTEM WORKS
              </h2>
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#FFD447] font-bold">
              [{approach.steps.length} EXECUTION STAGES]
            </span>
          </ScrollReveal>

          <ScrollReveal variant="stagger" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {approach.steps.map((st, i) => (
              <div
                key={i}
                data-stagger-item
                className="p-6 sm:p-8 bg-[#173359] border-2 border-white/20 shadow-[4px_4px_0px_0px_#090909] flex flex-col justify-between min-h-[200px]"
              >
                <div>
                  <div className="flex items-center gap-2 pb-3 border-b border-white/15 mb-3">
                    <span className="w-2 h-2 bg-[#FFD447]" />
                    <span className="font-mono text-[10px] tracking-widest uppercase text-[#FFD447]">
                      STEP
                    </span>
                  </div>
                  <h3 className="text-lg font-heading font-black uppercase text-white mb-2">
                    {st.title || st.name}
                  </h3>
                </div>
                <p className="font-body text-xs sm:text-sm text-white/75 leading-relaxed">
                  {st.description}
                </p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* 5. WHO THIS IS FOR */}
      <section className="py-16 sm:py-24 px-6 sm:px-12 lg:px-16 border-b-4 border-[#090909] bg-white">
        <div className="max-w-[1560px] mx-auto">
          <ScrollReveal variant="fade-up" className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b-4 border-[#090909]">
            <div>
              <BauhausBadge variant="red" shape="square" size="sm" className="mb-4">
                {whoThisIsFor.badge || "QUALIFICATION"}
              </BauhausBadge>
              <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight uppercase text-[#090909]">
                {whoThisIsFor.headline}
              </h2>
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#090909]/60 font-bold">
              PROFILE MATRIX
            </span>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-4 border-[#090909] mt-12 bg-[#090909] gap-[2px]">
            {whoThisIsFor.points.map((pt, idx) => (
              <div
                key={idx}
                className="bg-white p-6 sm:p-8 flex items-start gap-3 hover:bg-[#FFD447]/20 transition-colors"
              >
                <CheckSquare className="w-5 h-5 text-[#F23B32] shrink-0 mt-0.5" />
                <span className="font-body text-sm font-semibold text-[#090909] leading-relaxed">
                  {pt}
                </span>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* 6. FINAL DOMAIN CTA */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 text-center bg-[#F23B32] text-white border-b-4 border-[#090909]">
        <ScrollReveal variant="fade-up" className="max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-black uppercase tracking-tight text-white leading-tight">
            {finalCta.headline}
          </h2>

          <div className="mt-8">
            <Button
              variant="yellow"
              size="lg"
              withArrow
              asLink
              href={finalCta.cta.href}
              className="min-h-[52px] text-base"
            >
              {finalCta.cta.label}
            </Button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
