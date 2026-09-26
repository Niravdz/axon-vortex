"use client";

import React, { useRef, useLayoutEffect } from "react";
import { homeContent } from "@/data/content/home";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { getGSAP } from "@/lib/gsap";
import { MatteSection } from "@/components/ui/MatteSection";
import { DimensionalAccordion } from "@/components/ui/DimensionalAccordion";

export function BuildingAxonSection() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { buildingAxon } = homeContent;

  useLayoutEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const { gsap } = getGSAP();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-building-manifesto]",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        "[data-building-accordion]",
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const accordionItems = buildingAxon.points.map((pt, idx) => ({
    id: idx,
    title: pt.title,
    description: pt.description,
  }));

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#121519] text-[#EFECE4] py-16 sm:py-24 px-4 sm:px-8 lg:px-12 overflow-hidden border-b border-[#EFECE4]/[0.08]"
    >
      {/* Background Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/4 right-1/4 w-[500px] h-[400px] bg-[#F4BA00]/[0.05] rounded-full blur-[140px]"
      />

      <div className="max-w-7xl mx-auto">
        <MatteSection radius="24" className="p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Editorial Manifesto */}
            <div data-building-manifesto className="lg:col-span-5 flex flex-col justify-between gap-8">
              <div>
                {/* Eyebrow System Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171a1e] border border-[#3B82F6]/30 text-xs font-mono tracking-wider text-[#3B82F6] mb-5 shadow-[0_2px_6px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
                  <span>{buildingAxon.badge}</span>
                </div>

                {/* Prominent Editorial Headline */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold tracking-tight uppercase leading-[1.08] text-[#EFECE4]">
                  {buildingAxon.headline}
                </h2>

                {/* Supporting Body Copy */}
                <p className="mt-5 font-body text-sm sm:text-base text-[#9AA3B2] leading-relaxed">
                  {buildingAxon.intro}
                </p>
              </div>

              {/* Recessed Amber Transparency Standard Module */}
              <div className="p-6 rounded-[14px] bg-[#101215] border border-[#F4BA00]/25 shadow-[inset_0_2px_5px_rgba(0,0,0,0.78),inset_0_1px_1px_rgba(0,0,0,0.92),0_1px_0_rgba(255,255,255,0.04)]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#F4BA00] shadow-[0_0_8px_#F4BA00]" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[#F4BA00] font-semibold">
                    TRANSPARENCY STANDARD
                  </span>
                </div>
                <p className="font-heading font-medium text-sm sm:text-base text-[#EFECE4] uppercase leading-snug">
                  &ldquo;{buildingAxon.closing}&rdquo;
                </p>
              </div>
            </div>

            {/* Right Column: Stacked Dimensional Accordion Rows on Recessed Track */}
            <div data-building-accordion className="lg:col-span-7">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-[#9AA3B2]">
                  [OPERATIONAL BLUEPRINT]
                </span>
                <span className="text-xs text-[#9AA3B2]/70 font-mono">
                  {buildingAxon.points.length} PRACTICE AREAS
                </span>
              </div>

              <DimensionalAccordion
                items={accordionItems}
                defaultOpenId={0}
                allowMultiple={false}
              />
            </div>
          </div>
        </MatteSection>
      </div>
    </section>
  );
}
