"use client";

import React, { useRef, useLayoutEffect } from "react";
import { SectionMasthead } from "@/components/ui/SectionMasthead";
import { Button } from "@/components/ui/Button";
import { homeContent } from "@/data/content/home";
import { getGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { Sparkles, Code2, FlaskConical, BarChart3, BookOpen } from "lucide-react";

const ACTIVITY_ICONS = [
  Sparkles,
  Code2,
  FlaskConical,
  BarChart3,
  BookOpen,
];

export function BuildingAxonSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { buildingAxon } = homeContent;

  useLayoutEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !cardsRef.current) return;

    const { gsap } = getGSAP();
    const cards = cardsRef.current.querySelectorAll(".building-item-card");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 25 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="building-axon"
      className="relative z-10 py-16 sm:py-20 lg:py-28 px-4 sm:px-6 md:px-12 bg-transparent text-editorial-primary border-t border-border overflow-clip"
      style={{ isolation: "isolate" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-8 sm:gap-12">
        {/* Section Masthead */}
        <SectionMasthead
          badge={buildingAxon.badge}
          descriptor="BUILDING AXONVORTEX"
          rightLabel="[RADICAL TRANSPARENCY]"
        />

        {/* Section Heading & Multi-paragraph Narrative */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-2">
          <div className="flex flex-col gap-2 max-w-2xl">
            <span className="text-[10px] sm:text-[11px] font-mono text-brand-turquoise uppercase tracking-wider font-semibold">
              TRANSPARENT EVOLUTION
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold uppercase tracking-tight text-editorial-primary leading-tight">
              {buildingAxon.headline}
            </h2>
          </div>

          <div className="flex flex-col gap-2.5 max-w-xl text-xs sm:text-sm font-sans text-editorial-secondary leading-relaxed">
            <p>
              AxonVortex is a new AI-driven digital growth agency. We&apos;re not here to pretend we&apos;ve already built something huge. We&apos;re here to build something valuable.
            </p>
            <p>
              That means testing ideas, experimenting with AI, developing systems, studying what works, learning from what doesn&apos;t and continuously improving.
            </p>
            <p className="font-heading font-semibold text-editorial-primary uppercase tracking-wider text-xs pt-0.5">
              We&apos;re building in public.
            </p>
          </div>
        </div>

        {/* 5 In-Public Activity Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {buildingAxon.points.map((pt, idx) => {
            const Icon = ACTIVITY_ICONS[idx % ACTIVITY_ICONS.length];

            return (
              <article
                key={idx}
                className="building-item-card p-6 sm:p-8 rounded-[16px] sm:rounded-[20px] bg-[#FFFFFF] border border-[#1E1E2E]/15 shadow-sm flex flex-col justify-between min-h-[200px] transition-all hover:border-brand-turquoise/60 group"
              >
                <div>
                  <div className="flex items-center justify-between text-editorial-muted mb-4 border-b border-border pb-3">
                    <span className="font-mono text-xs text-brand-turquoise font-bold">
                      0{idx + 1}
                    </span>
                    <Icon className="w-4 h-4 text-editorial-secondary group-hover:text-brand-turquoise transition-colors" />
                  </div>

                  <div>
                    <h3 className="text-lg font-heading font-bold text-editorial-primary mb-2">
                      {pt.title}
                    </h3>
                    <p className="text-xs sm:text-[13.5px] text-editorial-secondary font-sans leading-relaxed">
                      {pt.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}

          {/* 6th Tile: Radical Transparency Statement */}
          <article className="building-item-card p-6 sm:p-8 rounded-[16px] sm:rounded-[20px] bg-[#F4F7FA] border border-brand-turquoise/30 shadow-sm flex flex-col justify-between min-h-[200px]">
            <div>
              <span className="font-mono text-xs text-brand-turquoise font-bold block mb-4 border-b border-brand-turquoise/20 pb-3">
                TRANSPARENCY // ETHOS
              </span>
              <div className="flex flex-col gap-1.5 text-xs sm:text-[13.5px] font-heading font-bold uppercase text-editorial-primary tracking-tight leading-snug">
                <span>No manufactured success stories.</span>
                <span>No inflated promises.</span>
                <span className="text-brand-turquoise">Just the process of building something that works.</span>
              </div>
            </div>
          </article>
        </div>

        {/* Bottom CTA Row */}
        <div className="flex items-center justify-between border-t border-border pt-6 sm:pt-8">
          <span className="text-xs font-mono text-editorial-muted uppercase tracking-widest hidden sm:inline">
            RADICAL TRANSPARENCY
          </span>

          <Button
            variant="primary"
            size="md"
            withArrow
            asLink
            href="/contact"
            className="w-full sm:w-auto text-center justify-center min-h-[46px]"
          >
            Follow Our Journey
          </Button>
        </div>
      </div>
    </section>
  );
}
