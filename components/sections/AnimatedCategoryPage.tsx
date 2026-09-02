"use client";

import React, { useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { SectionMasthead } from "@/components/ui/SectionMasthead";
import { Button } from "@/components/ui/Button";
import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";
import {
  fadeInUp,
  staggerCards,
  slideIn,
  scaleReveal,
  EASE,
} from "@/lib/animations/presets";

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
  /** Unique scroll narrative label for each page */
  narrativeStyle?: "funnel" | "neural" | "blueprint" | "pipeline" | "integration";
}

/**
 * Animated Category Page shell.
 * Wraps any category-level page (Digital Marketing, AI, Websites, Lead Gen, Tech)
 * with scroll-driven GSAP animations while preserving all content structure.
 *
 * Each narrativeStyle subtly varies the animation direction & timing
 * so pages feel connected but visually distinct.
 */
export function AnimatedCategoryPage({ data, narrativeStyle = "funnel" }: AnimatedCategoryPageProps) {
  const { hero, problem, services, approach, whoThisIsFor, finalCta } = data;

  const heroRef = useRef<HTMLElement>(null);
  const problemRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const approachRef = useRef<HTMLElement>(null);
  const audienceRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  // Animation direction map per narrative style
  const getDirection = useCallback((idx: number): "left" | "right" => {
    switch (narrativeStyle) {
      case "neural": return idx % 2 === 0 ? "right" : "left";
      case "blueprint": return "left";
      case "pipeline": return idx % 3 === 0 ? "left" : "right";
      case "integration": return idx % 2 === 0 ? "left" : "right";
      default: return idx % 2 === 0 ? "left" : "right";
    }
  }, [narrativeStyle]);

  const getCardDelay = useCallback((): number => {
    switch (narrativeStyle) {
      case "neural": return 0.06;
      case "blueprint": return 0.1;
      case "pipeline": return 0.08;
      case "integration": return 0.07;
      default: return 0.08;
    }
  }, [narrativeStyle]);

  const animationSetup = useCallback(
    ({
      gsap,
      mm,
      prefersReducedMotion,
    }: {
      gsap: typeof import("gsap").default;
      ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
      container: HTMLElement;
      mm: gsap.MatchMedia;
      prefersReducedMotion: boolean;
    }) => {
      if (prefersReducedMotion) return;

      // ═══════════════════════════════════════════
      // HERO: Dramatic headline reveal
      // ═══════════════════════════════════════════
      mm.add("(min-width: 768px)", () => {
        const heroSection = heroRef.current;
        if (!heroSection) return;

        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroSection,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });

        const elems = heroSection.querySelectorAll("[data-anim]");
        elems.forEach((el, i) => {
          heroTl.add(fadeInUp(gsap, el, { y: 40 - i * 5, duration: 0.7 + i * 0.05 }), i * 0.12);
        });

        // Parallax fade on scroll
        gsap.to(heroSection, {
          scrollTrigger: {
            trigger: heroSection,
            start: "bottom 80%",
            end: "bottom 20%",
            scrub: 1,
          },
          opacity: 0.3,
          y: -25,
          ease: "none",
        });
      });

      mm.add("(max-width: 767px)", () => {
        const heroSection = heroRef.current;
        if (!heroSection) return;

        gsap.fromTo(
          heroSection.querySelectorAll("[data-anim]"),
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: EASE.reveal,
            scrollTrigger: { trigger: heroSection, start: "top 92%", toggleActions: "play none none none" } }
        );
      });

      // ═══════════════════════════════════════════
      // PROBLEM DIAGNOSIS
      // ═══════════════════════════════════════════
      const problemSection = problemRef.current;
      if (problemSection) {
        mm.add("(min-width: 1024px)", () => {
          const leftCol = problemSection.querySelector("[data-anim='problem-left']");
          const cards = problemSection.querySelectorAll("[data-anim='problem-card']");
          const sequence = problemSection.querySelector("[data-anim='problem-sequence']");

          const pTl = gsap.timeline({
            scrollTrigger: { trigger: problemSection, start: "top 78%", toggleActions: "play none none none" },
          });

          if (leftCol) pTl.add(slideIn(gsap, leftCol, { from: "left", x: 50, duration: 0.7 }), 0);
          if (cards.length) pTl.add(staggerCards(gsap, cards, { y: 35, stagger: getCardDelay() }), 0.15);
          if (sequence) pTl.add(scaleReveal(gsap, sequence, { scale: 0.94, duration: 0.6 }), 0.5);
        });

        mm.add("(max-width: 1023px)", () => {
          gsap.fromTo(
            problemSection.querySelectorAll("[data-anim]"),
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: EASE.reveal,
              scrollTrigger: { trigger: problemSection, start: "top 85%", toggleActions: "play none none none" } }
          );
        });
      }

      // ═══════════════════════════════════════════
      // SERVICES GRID
      // ═══════════════════════════════════════════
      const servicesSection = servicesRef.current;
      if (servicesSection) {
        const sMasthead = servicesSection.querySelector("[data-anim='services-masthead']");
        const sCards = servicesSection.querySelectorAll("[data-anim='service-card']");

        const sTl = gsap.timeline({
          scrollTrigger: { trigger: servicesSection, start: "top 78%", toggleActions: "play none none none" },
        });

        if (sMasthead) sTl.add(fadeInUp(gsap, sMasthead, { y: 25, duration: 0.5 }), 0);

        if (sCards.length) {
          // Each card fades in with scale + subtle rotation based on narrative style
          sCards.forEach((card, idx) => {
            const rotateZ = narrativeStyle === "neural" ? (idx % 2 === 0 ? 1.5 : -1.5) : 0;
            sTl.add(
              gsap.fromTo(
                card,
                { y: 40, opacity: 0, scale: 0.96, rotateZ, willChange: "transform, opacity" },
                { y: 0, opacity: 1, scale: 1, rotateZ: 0, duration: 0.65, ease: EASE.snappy, clearProps: "willChange" }
              ),
              0.15 + idx * getCardDelay()
            );
          });
        }
      }

      // ═══════════════════════════════════════════
      // APPROACH STEPS
      // ═══════════════════════════════════════════
      const approachSection = approachRef.current;
      if (approachSection) {
        const aMasthead = approachSection.querySelector("[data-anim='approach-masthead']");
        const aSteps = approachSection.querySelectorAll("[data-anim='approach-step']");

        const aTl = gsap.timeline({
          scrollTrigger: { trigger: approachSection, start: "top 78%", toggleActions: "play none none none" },
        });

        if (aMasthead) aTl.add(fadeInUp(gsap, aMasthead, { y: 25, duration: 0.5 }), 0);

        // Progressive timeline reveal
        if (aSteps.length) {
          aSteps.forEach((step, idx) => {
            const direction = getDirection(idx);
            aTl.add(
              slideIn(gsap, step, { from: direction, x: 50, duration: 0.6, stagger: 0 }),
              0.2 + idx * 0.1
            );
          });
        }
      }

      // ═══════════════════════════════════════════
      // WHO THIS IS FOR
      // ═══════════════════════════════════════════
      const audienceSection = audienceRef.current;
      if (audienceSection) {
        const audCard = audienceSection.querySelector("[data-anim='audience-card']");
        const audChips = audienceSection.querySelectorAll("[data-anim='audience-chip']");

        const audTl = gsap.timeline({
          scrollTrigger: { trigger: audienceSection, start: "top 80%", toggleActions: "play none none none" },
        });

        if (audCard) audTl.add(scaleReveal(gsap, audCard, { scale: 0.94, duration: 0.8 }), 0);
        if (audChips.length) audTl.add(staggerCards(gsap, audChips, { y: 25, stagger: 0.05, duration: 0.5 }), 0.3);
      }

      // ═══════════════════════════════════════════
      // FINAL CTA
      // ═══════════════════════════════════════════
      const ctaSection = ctaRef.current;
      if (ctaSection) {
        const ctaCard = ctaSection.querySelector("[data-anim='cta-card']");
        if (ctaCard) {
          gsap.fromTo(
            ctaCard,
            { scale: 0.9, opacity: 0, y: 30 },
            {
              scale: 1, opacity: 1, y: 0, duration: 0.9, ease: EASE.smooth,
              scrollTrigger: { trigger: ctaSection, start: "top 82%", toggleActions: "play none none none" },
            }
          );
        }
      }
    },
    [getCardDelay, getDirection, narrativeStyle]
  );

  const containerRef = useScrollAnimation(animationSetup);

  return (
    <div
      ref={containerRef}
      className="pt-6 sm:pt-10 pb-28 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto flex flex-col gap-20 sm:gap-28 text-editorial-primary overflow-x-clip"
    >
      {/* 1. HERO */}
      <section ref={heroRef} id="hero" className="flex flex-col gap-6 max-w-5xl">
        <div data-anim="hero-masthead">
          <SectionMasthead
            badge={hero.badge}
            descriptor="STRATEGIC ACQUISITION"
            rightLabel="[CATEGORY OVERVIEW]"
          />
        </div>

        <div className="flex flex-col gap-5 pt-2">
          <h1
            data-anim="hero-headline"
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold uppercase tracking-tight text-editorial-primary leading-[1.02] break-words"
          >
            {hero.headline}
          </h1>

          <div data-anim="hero-copy" className="flex flex-col gap-2 text-sm sm:text-base md:text-lg text-editorial-secondary font-sans leading-relaxed max-w-3xl">
            {hero.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div data-anim="hero-cta" className="pt-4">
            <Button variant="primary" size="lg" withArrow asLink href={hero.cta.href}>
              {hero.cta.label}
            </Button>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM */}
      <section ref={problemRef} id="problem" className="flex flex-col gap-8 pt-6 border-t border-border">
        <div data-anim="problem-masthead">
          <SectionMasthead
            badge={problem.badge || "THE PROBLEM"}
            descriptor="MARKETING DIAGNOSIS"
            rightLabel="[SYSTEM ALIGNMENT]"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div data-anim="problem-left" className="lg:col-span-5 flex flex-col gap-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold uppercase tracking-tight text-editorial-primary leading-tight">
              {problem.headline}
            </h2>
            <p className="text-xs sm:text-sm text-editorial-secondary font-sans pt-2">
              {problem.conclusion}
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {problem.points?.map((pt, idx) => (
                <div
                  key={idx}
                  data-anim="problem-card"
                  className="p-4 sm:p-5 rounded-[14px] bg-white border border-[#1E1E2E]/12 text-xs sm:text-[13.5px] font-sans text-editorial-secondary flex items-start gap-2.5"
                >
                  <span className="font-mono text-xs text-brand-turquoise font-bold mt-0.5">
                    0{idx + 1}
                  </span>
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            {problem.sequence && (
              <div
                data-anim="problem-sequence"
                className="p-4 sm:p-5 rounded-[14px] bg-[#F4F7FA] border border-brand-turquoise/30 text-xs sm:text-sm font-heading font-bold uppercase text-editorial-primary tracking-wide text-center"
              >
                {problem.sequence}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. OUR SERVICES */}
      <section ref={servicesRef} id="services" className="flex flex-col gap-8 pt-6 border-t border-border">
        <div data-anim="services-masthead">
          <SectionMasthead
            badge="CAPABILITIES"
            descriptor={`OUR ${hero.badge.split("//")[1]?.trim() || ""} SERVICES`}
            rightLabel={`[${services.length} DOMAINS]`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, idx) => (
            <article
              key={idx}
              data-anim="service-card"
              className="p-6 sm:p-8 rounded-[20px] bg-white border border-[#1E1E2E]/15 shadow-sm flex flex-col justify-between min-h-[260px] hover:border-brand-turquoise/60 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-editorial-muted border-b border-border pb-3 mb-3">
                  <span className="font-mono text-xs text-brand-turquoise font-bold">
                    0{idx + 1}
                  </span>
                  {svc.slug && (
                    <Link
                      href={`/services/${svc.slug}`}
                      className="text-xs font-heading font-semibold text-brand-turquoise hover:underline flex items-center gap-1"
                    >
                      <span>Explore</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>

                <h3 className="text-lg font-heading font-bold uppercase text-editorial-primary mb-2">
                  {svc.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-editorial-secondary font-sans leading-relaxed mb-4">
                  {svc.description}
                </p>

                <div className="pt-3 border-t border-border">
                  <span className="text-[10px] font-mono text-editorial-muted uppercase tracking-wider block mb-2 font-semibold">
                    Includes:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {svc.includes?.map((inc) => (
                      <span
                        key={inc}
                        className="px-2.5 py-1 rounded-sm bg-[#F4F7FA] border border-brand-turquoise/20 text-[11px] font-sans text-editorial-primary"
                      >
                        {inc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. OUR APPROACH */}
      <section ref={approachRef} id="approach" className="flex flex-col gap-8 pt-6 border-t border-border">
        <div data-anim="approach-masthead">
          <SectionMasthead
            badge={approach.badge || "OUR APPROACH"}
            descriptor="EXECUTION METHODOLOGY"
            rightLabel={`[${approach.steps.length} STEPS]`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {approach.steps.map((st) => (
            <div
              key={st.number}
              data-anim="approach-step"
              className="p-6 rounded-[18px] bg-white border border-[#1E1E2E]/15 shadow-sm flex flex-col justify-between min-h-[160px]"
            >
              <div>
                <span className="font-mono text-xs text-brand-turquoise font-bold block mb-2">
                  STAGE {st.number}
                </span>
                <h3 className="text-base font-heading font-bold uppercase text-editorial-primary mb-1">
                  {st.number} — {st.title}
                </h3>
              </div>
              <p className="text-xs text-editorial-secondary font-sans leading-relaxed">
                {st.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. WHO THIS IS FOR */}
      <section ref={audienceRef} id="audience" className="flex flex-col gap-8 pt-6 border-t border-border">
        <SectionMasthead
          badge={whoThisIsFor.badge || "WHO THIS IS FOR"}
          descriptor="TARGET PROFILE"
          rightLabel="[QUALIFYING AUDIENCE]"
        />

        <div
          data-anim="audience-card"
          className="p-8 sm:p-12 rounded-[24px] bg-white border border-[#1E1E2E]/15 shadow-sm flex flex-col gap-6"
        >
          <h2 className="text-xl sm:text-2xl font-heading font-bold uppercase tracking-tight text-editorial-primary">
            {whoThisIsFor.headline}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {whoThisIsFor.points.map((pt, idx) => (
              <div
                key={idx}
                data-anim="audience-chip"
                className="p-4 rounded-[12px] bg-[#F4F7FA] border border-brand-turquoise/20 flex items-start gap-2.5 text-xs font-sans text-editorial-secondary"
              >
                <CheckCircle2 className="w-4 h-4 text-brand-turquoise shrink-0 mt-0.5" />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section ref={ctaRef} id="cta" className="flex flex-col gap-8 pt-6 border-t border-border">
        <div
          data-anim="cta-card"
          className="p-8 sm:p-12 lg:p-16 rounded-[24px] bg-[#F4F7FA] border border-brand-turquoise/30 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold uppercase tracking-tight text-editorial-primary max-w-xl leading-tight">
            {finalCta.headline}
          </h2>

          <Button
            variant="primary"
            size="lg"
            withArrow
            asLink
            href={finalCta.cta.href}
            className="w-full sm:w-auto text-center justify-center min-h-[48px]"
          >
            {finalCta.cta.label}
          </Button>
        </div>
      </section>
    </div>
  );
}
