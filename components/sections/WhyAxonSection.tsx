"use client";

import React, { useRef, useLayoutEffect } from "react";
import { SectionMasthead } from "@/components/ui/SectionMasthead";
import { homeContent } from "@/data/content/home";
import { getGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function WhyAxonSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { whyAxon } = homeContent;

  useLayoutEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !cardsRef.current) return;

    const { gsap } = getGSAP();
    const cards = cardsRef.current.querySelectorAll(".why-editorial-card");

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
      id="why-axon"
      className="relative z-10 py-16 sm:py-20 lg:py-28 px-4 sm:px-6 md:px-12 bg-transparent text-editorial-primary border-t border-border overflow-clip"
      style={{ isolation: "isolate" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-8 sm:gap-12">
        {/* Section Masthead */}
        <SectionMasthead
          badge={whyAxon.badge}
          descriptor="WHY AXONVORTEX"
          rightLabel="[CORE OPERATING PRINCIPLES]"
        />

        {/* Section Heading & Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-2">
          <div className="flex flex-col gap-2 max-w-2xl">
            <span className="text-[10px] sm:text-[11px] font-mono text-brand-turquoise uppercase tracking-wider font-semibold">
              STRATEGIC FOUNDATION
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold uppercase tracking-tight text-editorial-primary leading-tight">
              {whyAxon.headline}
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-editorial-secondary max-w-md leading-relaxed">
            {whyAxon.subheading}
          </p>
        </div>

        {/* 6 Architectural Principle Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {whyAxon.pillars.map((pillar, idx) => {
            const isContinuousImprovement = pillar.title.toLowerCase().includes("continuous improvement");

            return (
              <article
                key={idx}
                className="why-editorial-card p-6 sm:p-8 rounded-[16px] sm:rounded-[20px] bg-[#FFFFFF] border border-[#1E1E2E]/15 shadow-sm flex flex-col justify-between min-h-[220px] transition-all hover:border-brand-turquoise/60 group"
              >
                <div>
                  <div className="flex items-center justify-between text-editorial-muted mb-4 border-b border-border pb-3">
                    <span className="font-mono text-xs text-brand-turquoise font-bold">
                      0{idx + 1}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-editorial-secondary">
                      PRINCIPLE
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-heading font-bold text-editorial-primary mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-[13.5px] text-editorial-secondary font-sans leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>

                {isContinuousImprovement && (
                  <div className="mt-4 pt-3 border-t border-[#1E1E2E]/10 flex flex-wrap items-center gap-1 text-[10px] font-mono text-brand-turquoise font-semibold">
                    <span>Build</span>
                    <span>→</span>
                    <span>Launch</span>
                    <span>→</span>
                    <span>Measure</span>
                    <span>→</span>
                    <span>Learn</span>
                    <span>→</span>
                    <span>Improve</span>
                    <span>→</span>
                    <span>Scale</span>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
