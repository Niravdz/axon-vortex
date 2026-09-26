"use client";

import React, { useRef, useLayoutEffect } from "react";
import { homeContent } from "@/data/content/home";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { ArrowRight } from "lucide-react";
import { getGSAP } from "@/lib/gsap";
import { MatteSection } from "@/components/ui/MatteSection";
import { RaisedCard } from "@/components/ui/RaisedCard";
import { TactileButton } from "@/components/ui/TactileButton";

export function GrowthJourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { growthJourney } = homeContent;

  useLayoutEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !cardsRef.current) return;

    const { gsap } = getGSAP();
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
              once: true,
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
      className="relative z-10 py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-[#121519] text-[#EFECE4] border-b border-[#EFECE4]/[0.08] overflow-hidden"
    >
      {/* Background Subtle Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/4 w-[500px] h-[400px] bg-[#3B82F6]/[0.05] rounded-full blur-[140px]"
      />

      <div className="max-w-7xl mx-auto">
        <MatteSection radius="24" className="p-6 sm:p-10 lg:p-12">
          {/* Section Masthead */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#EFECE4]/[0.08]">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20252B] border border-[#3B82F6]/30 text-xs font-mono tracking-wider text-[#3B82F6] mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F4BA00] animate-pulse" />
                <span>{growthJourney.badge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-tight uppercase leading-[1.05] text-[#EFECE4]">
                {growthJourney.headline}
              </h2>
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#9AA3B2] font-medium">
              [PROGRESSIVE EVOLUTION TIMELINE]
            </span>
          </div>

          {/* 6 Sequential Growth Stages in Raised Tactile Cards */}
          <div
            ref={cardsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-10 items-stretch"
          >
            {growthJourney.stages.map((stage, idx) => (
              <RaisedCard
                key={stage.name}
                radius="16"
                glowOnHover="blue"
                className="journey-stage-card p-6 sm:p-7 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-[#9AA3B2] mb-4 border-b border-white/[0.06] pb-3 transition-colors">
                    <span className="font-mono text-xs text-[#3B82F6] px-2 py-0.5 rounded-[4px] bg-[#101215] border border-white/[0.04] font-semibold shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]">
                      PHASE {String(idx + 1).padStart(2, "0")}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#9AA3B2] group-hover:text-[#3B82F6] group-hover:translate-x-1 transition-all" />
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-heading font-semibold text-[#EFECE4] uppercase mb-2 group-hover:text-[#60A5FA] transition-colors leading-snug">
                      {stage.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#9AA3B2] font-body leading-relaxed transition-colors">
                      {stage.description}
                    </p>
                  </div>
                </div>
              </RaisedCard>
            ))}
          </div>

          {/* Bottom Tactile Action Strip */}
          <div className="mt-8 p-6 sm:p-8 rounded-[16px] bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_5px_rgba(0,0,0,0.78),inset_0_1px_1px_rgba(0,0,0,0.92),0_1px_0_rgba(255,255,255,0.04)] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-col gap-1 text-center sm:text-left">
              <span className="text-base sm:text-lg font-heading font-semibold text-[#EFECE4]">
                Ready to diagnose and execute your next growth phase?
              </span>
              <span className="text-xs sm:text-sm text-[#9AA3B2]">
                Start with our comprehensive commercial diagnostic audit.
              </span>
            </div>

            <TactileButton
              variant="primary"
              size="md"
              withArrow
              asLink
              href="/growth-audit"
              className="shrink-0"
            >
              Book Growth Audit
            </TactileButton>
          </div>
        </MatteSection>
      </div>
    </section>
  );
}
