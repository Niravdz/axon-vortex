"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { getGSAP } from "@/lib/gsap";
import { homeContent } from "@/data/content/home";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function ConnectedGrowthSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const { connectedGrowth } = homeContent;
  const steps = connectedGrowth.steps;

  useLayoutEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !pinRef.current) return;

    const { gsap } = getGSAP();
    const section = sectionRef.current;
    const pinContainer = pinRef.current;
    const cards = pinContainer.querySelectorAll(".growth-stage-panel");

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const scrollLength = steps.length * 80;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${scrollLength}%`,
          pin: pinContainer,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const rawProgress = self.progress * steps.length;
            const idx = Math.min(Math.floor(rawProgress), steps.length - 1);
            setActiveStage(idx);
          },
        },
      });

      cards.forEach((card, idx) => {
        if (idx === 0) {
          gsap.set(card, { autoAlpha: 1, x: 0 });
        } else {
          const startTime = (idx - 0.2) / steps.length;
          tl.fromTo(
            card,
            { autoAlpha: 0, x: 60 },
            { autoAlpha: 1, x: 0, duration: 0.25, ease: "power2.out" },
            startTime
          );
        }

        if (idx < cards.length - 1) {
          const endTime = (idx + 0.8) / steps.length;
          tl.to(
            card,
            { autoAlpha: 0, x: -40, duration: 0.25, ease: "power2.in" },
            endTime
          );
        }
      });
    });

    mm.add("(max-width: 1023px)", () => {
      gsap.set(cards, { clearProps: "all" });
      gsap.set(pinContainer, { clearProps: "all" });
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
        className="relative w-full min-h-screen lg:h-screen max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-between py-16 lg:py-24"
      >
        <div className="absolute inset-0 editorial-grid opacity-15 pointer-events-none" />

        {/* Top Header */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div className="flex items-center gap-3">
            <Badge variant="dot">{connectedGrowth.badge}</Badge>
            <span className="text-[11px] font-mono text-editorial-secondary uppercase tracking-widest">
              SYSTEM PIPELINE // STAGE 0{activeStage + 1} OF 06
            </span>
          </div>

          <span className="text-xs font-mono text-accent-orange uppercase tracking-wider font-semibold">
            [ONE CONNECTED ARCHITECTURE]
          </span>
        </div>

        {/* Center Spatial Narrative Grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto py-8">
          {/* Left Column: Architectural Pipeline Rail */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            <span className="font-mono text-[10px] text-editorial-muted tracking-widest uppercase mb-2">
              PIPELINE SEQUENCE
            </span>
            {steps.map((st, i) => {
              const isActive = activeStage === i;
              return (
                <div
                  key={st.step}
                  className={`flex items-center justify-between p-3 rounded-sm border transition-all duration-300 ${
                    isActive
                      ? "bg-white border-accent-orange/80 text-editorial-primary shadow-sm"
                      : "bg-surface-muted/60 border-border text-editorial-muted hover:text-editorial-primary"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-accent-orange">{st.step}</span>
                    <span className="font-heading font-semibold text-xs uppercase tracking-wider">
                      {st.name}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-editorial-secondary">
                    {st.category}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Stage Presentation */}
          <div className="lg:col-span-8 relative min-h-[260px] lg:min-h-[320px] flex items-center">
            {steps.map((step, idx) => (
              <div
                key={step.step}
                className={`growth-stage-panel w-full lg:absolute lg:inset-0 flex flex-col justify-center gap-6 ${
                  idx !== activeStage ? "hidden lg:flex" : "flex"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-accent-orange font-bold">
                    STAGE 0{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono text-editorial-muted tracking-widest uppercase">
                    DOMAIN: {step.category}
                  </span>
                </div>

                <h3 className="text-4xl sm:text-6xl md:text-7xl font-heading font-bold uppercase tracking-tight text-editorial-primary leading-none">
                  {step.name}
                </h3>

                <p className="text-base sm:text-lg text-editorial-secondary font-sans max-w-xl leading-relaxed">
                  {step.description}
                </p>

                <div className="pt-4 border-t border-border flex items-center gap-4 text-xs font-mono text-editorial-muted">
                  <span>DISCIPLINE: {step.category.toUpperCase()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Rail */}
        <div className="relative z-10 flex items-center justify-between border-t border-border pt-4 text-xs font-mono text-editorial-muted">
          <span className="text-[10px] uppercase tracking-widest text-editorial-primary font-semibold">
            {connectedGrowth.objective}
          </span>
          <span className="text-accent-orange font-mono font-bold">0{activeStage + 1} / 06</span>
        </div>
      </div>
    </section>
  );
}
