"use client";

import React, { useRef, useLayoutEffect } from "react";
import { Button } from "@/components/ui/Button";
import { BauhausBadge } from "@/components/ui/BauhausBadge";
import { homeContent } from "@/data/content/home";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function GrowthJourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { growthJourney } = homeContent;

  useLayoutEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll(".journey-stage-card");
      if (cards && cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="growth-journey"
      className="relative z-10 py-16 sm:py-24 px-6 sm:px-12 lg:px-16 bg-white text-[#090909] border-b-4 border-[#090909]"
    >
      <div className="max-w-[1560px] mx-auto flex flex-col gap-10">
        {/* Section Masthead */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b-4 border-[#090909]">
          <div>
            <BauhausBadge variant="red" shape="square" size="sm" className="mb-4">
              {growthJourney.badge}
            </BauhausBadge>
            <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight uppercase leading-[0.98] text-[#090909]">
              {growthJourney.headline}
            </h2>
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#090909]/60 font-bold">
            [PROGRESSIVE EVOLUTION]
          </span>
        </div>

        {/* 6 Sequential Growth Stages in Bauhaus Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {growthJourney.stages.map((stage) => (
            <article
              key={stage.name}
              className="journey-stage-card p-6 sm:p-8 rounded-none bg-[#E9EDF2] border-2 border-[#090909] shadow-[4px_4px_0px_0px_#090909] flex flex-col justify-between min-h-[220px] hover:bg-white hover:border-[#F23B32] transition-colors group"
            >
              <div>
                <div className="flex items-center justify-between text-[#090909]/60 mb-4 border-b-2 border-[#090909]/10 pb-3">
                  <span className="font-mono text-sm text-[#F23B32] font-black">
                    STAGE
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#090909] group-hover:translate-x-1 transition-transform" />
                </div>

                <div>
                  <h3 className="text-xl font-heading font-black text-[#090909] uppercase mb-2 group-hover:text-[#F23B32] transition-colors">
                    {stage.name}
                  </h3>
                  <p className="text-sm text-[#090909]/75 font-body leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Callout & Action */}
        <div className="p-8 sm:p-10 bg-[#FFD447] border-4 border-[#090909] shadow-[6px_6px_0px_0px_#090909] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-col gap-1 max-w-xl">
            <h3 className="text-xl sm:text-2xl font-heading font-black text-[#090909] uppercase">
              Every business starts somewhere.
            </h3>
            <p className="text-sm font-body text-[#090909]/85 font-medium leading-relaxed">
              {growthJourney.subtext}
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            withArrow
            asLink
            href="/contact"
            className="w-full sm:w-auto min-h-[50px]"
          >
            Start Your Growth Journey
          </Button>
        </div>
      </div>
    </section>
  );
}
