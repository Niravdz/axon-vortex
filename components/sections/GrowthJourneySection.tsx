"use client";

import React, { useRef, useLayoutEffect } from "react";
import { SectionMasthead } from "@/components/ui/SectionMasthead";
import { Button } from "@/components/ui/Button";
import { homeContent } from "@/data/content/home";
import { getGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { ArrowRight } from "lucide-react";

export function GrowthJourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { growthJourney } = homeContent;

  useLayoutEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !cardsRef.current) return;

    const { gsap } = getGSAP();
    const cards = cardsRef.current.querySelectorAll(".journey-stage-card");

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
      id="growth-journey"
      className="relative z-10 py-16 sm:py-20 lg:py-28 px-4 sm:px-6 md:px-12 bg-transparent text-editorial-primary border-t border-border overflow-clip"
      style={{ isolation: "isolate" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-8 sm:gap-12">
        {/* Section Masthead */}
        <SectionMasthead
          badge={growthJourney.badge}
          descriptor="DEVELOPMENT PHASES"
          rightLabel="[PROGRESSIVE EVOLUTION]"
        />

        {/* Section Heading */}
        <div className="flex flex-col gap-2 max-w-3xl pb-2">
          <span className="text-[10px] sm:text-[11px] font-mono text-brand-turquoise uppercase tracking-wider font-semibold">
            ROADMAP EVOLUTION
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold uppercase tracking-tight text-editorial-primary leading-tight">
            {growthJourney.headline}
          </h2>
        </div>

        {/* 6 Sequential Growth Stages */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {growthJourney.stages.map((stage, idx) => (
            <article
              key={stage.name}
              className="journey-stage-card p-6 sm:p-8 rounded-[16px] sm:rounded-[20px] bg-[#FFFFFF] border border-[#1E1E2E]/15 shadow-sm flex flex-col justify-between min-h-[200px] transition-all hover:border-brand-turquoise/60"
            >
              <div>
                <div className="flex items-center justify-between text-editorial-muted mb-4 border-b border-border pb-3">
                  <span className="font-mono text-xs text-brand-turquoise font-bold">
                    STAGE 0{idx + 1}
                  </span>
                  <ArrowRight className="w-4 h-4 text-editorial-muted" />
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-heading font-bold text-editorial-primary uppercase mb-2">
                    {stage.name}
                  </h3>
                  <p className="text-xs sm:text-[13.5px] text-editorial-secondary font-sans leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Narrative & Action */}
        <div className="p-6 sm:p-10 rounded-[20px] bg-[#FFFFFF] border border-[#1E1E2E]/15 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-8">
          <div className="flex flex-col gap-1 max-w-xl">
            <h3 className="text-lg sm:text-xl font-heading font-bold text-editorial-primary uppercase">
              Every business starts somewhere.
            </h3>
            <p className="text-xs sm:text-sm text-editorial-secondary font-sans leading-relaxed">
              Your next stage starts with understanding where to begin.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            withArrow
            asLink
            href="/contact"
            className="w-full sm:w-auto text-center justify-center min-h-[46px]"
          >
            Start Your Growth Journey
          </Button>
        </div>
      </div>
    </section>
  );
}
