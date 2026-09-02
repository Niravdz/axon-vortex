"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import { SectionMasthead } from "@/components/ui/SectionMasthead";
import { getGSAP } from "@/lib/gsap";
import { homeContent } from "@/data/content/home";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function ConnectedGrowthSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const activeStageRef = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  const { connectedGrowth } = homeContent;
  const steps = connectedGrowth.steps;

  useLayoutEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !pinRef.current) return;

    const { gsap } = getGSAP();
    const section = sectionRef.current;
    const pinContainer = pinRef.current;
    const panels = pinContainer.querySelectorAll<HTMLDivElement>(".growth-stage-panel");

    if (!section || !pinContainer || panels.length === 0) return;

    const mm = gsap.matchMedia();

    // Universal Pinned Stage Progression (Desktop & Mobile)
    mm.add("(min-width: 320px)", () => {
      // Initialize: Stage 0 is visible at resting position (x:0, opacity:1), stages 1..5 hidden offscreen right (x:40, opacity:0)
      panels.forEach((panel, idx) => {
        if (idx === 0) {
          gsap.set(panel, { autoAlpha: 1, x: 0 });
        } else {
          gsap.set(panel, { autoAlpha: 0, x: 40 });
        }
      });

      const stageCount = steps.length;
      const transitionDuration = 0.45;
      const dwellDuration = 0.65;
      const finalHold = 0.4;
      const scrollPerStep = window.innerWidth < 768 ? 420 : 520;
      const totalScrollDistance = (stageCount - 1) * scrollPerStep + 300;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScrollDistance}`,
          pin: pinContainer,
          pinSpacing: true,
          scrub: 0.25, // Snappy response without lagging drift
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const rawStep = self.progress * (stageCount - 1);
            const settledIdx = Math.min(Math.round(rawStep), stageCount - 1);
            if (settledIdx !== activeStageRef.current) {
              activeStageRef.current = settledIdx;
              setActiveStage(settledIdx);
            }
          },
        },
      });

      // Sequential mutually exclusive step progression (Zero overlapping text collisions)
      for (let i = 0; i < stageCount - 1; i++) {
        // 1. Dwell at current Stage i
        tl.to({}, { duration: dwellDuration });

        // 2. Outgoing Stage i exits left
        tl.to(
          panels[i],
          {
            autoAlpha: 0,
            x: -30,
            ease: "power2.in",
            duration: transitionDuration,
          }
        );

        // 3. Incoming Stage i+1 enters from right to resting position
        tl.fromTo(
          panels[i + 1],
          { autoAlpha: 0, x: 35 },
          {
            autoAlpha: 1,
            x: 0,
            ease: "power2.out",
            duration: transitionDuration,
          },
          `<+0.08` // Smooth slight overlap between outgoing and incoming
        );
      }

      // Final reading hold for Stage 06 before unpinning cleanly into Our Solutions
      tl.to({}, { duration: finalHold });

      return () => {
        tl.kill();
      };
    });

    return () => mm.revert();
  }, [prefersReducedMotion, steps.length]);

  return (
    <section
      ref={sectionRef}
      id="growth-system"
      className="relative w-full bg-transparent text-editorial-primary overflow-clip border-t border-border"
      style={{ isolation: "isolate" }}
    >
      <div
        ref={pinRef}
        className="relative w-full min-h-[100dvh] lg:h-screen max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex flex-col justify-between py-6 sm:py-10 lg:py-16"
      >
        <div className="absolute inset-0 editorial-grid opacity-15 pointer-events-none" />

        {/* Section Masthead */}
        <SectionMasthead
          badge={connectedGrowth.badge}
          descriptor={`SYSTEM PIPELINE // STAGE 0${activeStage + 1} OF 06`}
          rightLabel="[ONE CONNECTED ARCHITECTURE]"
          className="mb-3 lg:mb-4"
        />

        {/* Section Headline & Intro Narrative */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-baseline justify-between gap-2 md:gap-6 mb-3 lg:mb-4">
          <h2 className="text-lg sm:text-xl md:text-2xl font-heading font-bold uppercase tracking-tight text-editorial-primary">
            {connectedGrowth.headline}
          </h2>
          <p className="text-xs sm:text-[13.5px] font-sans text-editorial-secondary max-w-xl">
            {connectedGrowth.subheading}
          </p>
        </div>

        {/* Center Spatial Narrative Grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center my-auto py-4">
          {/* Left Column: Architectural Pipeline Rail */}
          <div className="lg:col-span-4 flex flex-col gap-1.5 sm:gap-2">
            <span className="font-mono text-[9px] sm:text-[10px] text-editorial-muted tracking-widest uppercase mb-1 sm:mb-2">
              PIPELINE SEQUENCE
            </span>
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-1.5 sm:gap-2">
              {steps.map((st, i) => {
                const isActive = activeStage === i;
                return (
                  <div
                    key={st.step}
                    className={`flex items-center justify-between p-2 sm:p-3 rounded-md border transition-all duration-300 ${
                      isActive
                        ? "bg-white border-brand-turquoise/80 text-editorial-primary shadow-xs"
                        : "bg-white/40 border-border text-editorial-muted hover:text-editorial-primary"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 sm:gap-3">
                      <span className="font-mono text-[10px] sm:text-xs font-bold text-brand-turquoise">{st.step}</span>
                      <span className="font-heading font-semibold text-[10px] sm:text-xs uppercase tracking-wider truncate">
                        {st.name}
                      </span>
                    </div>
                    <span className="font-mono text-[8px] sm:text-[9px] text-editorial-secondary hidden sm:inline">
                      {st.category}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Stage Presentation with Clean Mutually Exclusive Stage Isolation */}
          <div className="lg:col-span-8 relative min-h-[220px] sm:min-h-[260px] lg:min-h-[320px] flex items-center overflow-hidden">
            {steps.map((step, idx) => (
              <div
                key={step.step}
                className="growth-stage-panel w-full absolute inset-0 flex flex-col justify-center gap-3 sm:gap-6 will-change-transform"
              >
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <span className="font-mono text-xs text-brand-turquoise font-bold">
                    STAGE 0{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono text-editorial-muted tracking-widest uppercase">
                    DOMAIN: {step.category}
                  </span>
                </div>

                <h3 className="text-3xl sm:text-6xl md:text-7xl font-heading font-bold uppercase tracking-tight text-editorial-primary leading-none break-words">
                  {step.name}
                </h3>

                <p className="text-sm sm:text-lg text-editorial-secondary font-sans max-w-xl leading-relaxed">
                  {step.description}
                </p>

                <div className="pt-2 sm:pt-4 border-t border-border flex items-center gap-4 text-[10px] sm:text-xs font-mono text-editorial-muted">
                  <span>DISCIPLINE: {step.category.toUpperCase()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Rail */}
        <div className="relative z-10 flex items-center justify-between border-t border-border pt-3 text-xs font-mono text-editorial-muted">
          <span className="text-[10px] uppercase tracking-widest text-editorial-primary font-semibold truncate">
            {connectedGrowth.objective}
          </span>
          <span className="text-brand-turquoise font-mono font-bold shrink-0">0{activeStage + 1} / 06</span>
        </div>
      </div>
    </section>
  );
}
