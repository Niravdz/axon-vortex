"use client";

import React, { useRef, useLayoutEffect } from "react";
import { homeContent } from "@/data/content/home";
import { BauhausBadge } from "@/components/ui/BauhausBadge";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { getGSAP } from "@/lib/gsap";

export function ConnectedGrowthSection() {
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { connectedGrowth } = homeContent;

  useLayoutEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const { gsap } = getGSAP();
    const ctx = gsap.context(() => {
      // Header block entrance
      gsap.fromTo(
        "[data-growth-header]",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      // Connecting conduit line draw
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: lineRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Sequential activation of the 6 framework nodes
      gsap.fromTo(
        ".pipeline-node",
        { opacity: 0, y: 32, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: ".pipeline-node",
            start: "top 82%",
            once: true,
          },
        }
      );

      // Feedback loop conduit bar
      gsap.fromTo(
        "[data-conduit-bar]",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.6,
          ease: "power2.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: ".pipeline-node",
            start: "top 82%",
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#0F2747] text-white border-b-4 border-[#090909] py-16 sm:py-24 px-6 sm:px-12 lg:px-16 overflow-hidden"
    >
      <div className="max-w-[1560px] mx-auto">
        {/* Header Block */}
        <div
          data-growth-header
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b-2 border-white/20 will-change-[transform,opacity]"
        >
          <div className="max-w-3xl">
            <BauhausBadge variant="yellow" shape="square" size="sm" className="mb-4">
              {connectedGrowth.badge}
            </BauhausBadge>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight uppercase leading-[0.98] text-white">
              {connectedGrowth.headline}
            </h2>
            <p className="mt-4 font-body text-base sm:text-lg text-white/80">
              {connectedGrowth.subheading}
            </p>
          </div>

          <div className="border-2 border-white p-4 bg-white/5 backdrop-blur-xs max-w-sm">
            <span className="font-mono text-xs uppercase tracking-widest text-[#FFD447] block mb-1">
              SYSTEM MANDATE
            </span>
            <p className="font-body text-xs text-white/90 leading-relaxed">
              {connectedGrowth.objective}
            </p>
          </div>
        </div>

        {/* Connected Growth System Diagram with Conduit Line */}
        <div className="mt-12 pt-4 relative">
          {/* Subtle architectural conduit connector line */}
          <div
            ref={lineRef}
            aria-hidden="true"
            className="hidden xl:block absolute top-0 left-4 right-4 h-1 bg-gradient-to-r from-[#F23B32] via-[#FFD447] to-[#2F5FA7] z-0 will-change-transform"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 relative z-10">
            {connectedGrowth.steps.map((step, idx) => {
              const nodeColors = [
                "border-t-4 border-t-[#F23B32]",
                "border-t-4 border-t-[#FFD447]",
                "border-t-4 border-t-[#2F5FA7]",
                "border-t-4 border-t-white",
                "border-t-4 border-t-[#F23B32]",
                "border-t-4 border-t-[#FFD447]",
              ][idx];

              return (
                <div
                  key={idx}
                  className={`pipeline-node relative bg-[#173359] border-2 border-white/20 p-5 flex flex-col justify-between min-h-[220px] shadow-[4px_4px_0px_0px_#090909] ${nodeColors} group hover:border-white transition-all hover:-translate-y-1 will-change-[transform,opacity]`}
                >
                  <div>
                    {/* Top Row: Step number and indicator */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <span className="font-mono text-xl font-black text-[#FFD447]">
                        {step.step}
                      </span>
                      <span className="font-mono text-[10px] tracking-widest uppercase text-white/50">
                        STAGE
                      </span>
                    </div>

                    {/* Step Name & Category */}
                    <h3 className="mt-4 font-heading font-black text-xl tracking-tight text-white uppercase group-hover:text-[#FFD447] transition-colors">
                      {step.name}
                    </h3>
                    <span className="inline-block mt-1 font-mono text-xs uppercase tracking-wider text-[#FFD447]/90">
                      {step.category}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-4 pt-3 border-t border-white/10 font-body text-xs text-white/75 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Connected Conduit Indicator Bar */}
          <div
            data-conduit-bar
            className="hidden xl:flex items-center justify-between mt-6 px-4 py-3 bg-[#091a30] border-2 border-white/20 font-mono text-xs text-white/70 will-change-[transform,opacity]"
          >
            <span className="text-[#FFD447] font-bold">PIPELINE SYNCHRONIZATION:</span>
            <span>ATTRACT → ENGAGE → CONVERT → MANAGE → AUTOMATE → OPTIMIZE</span>
            <span className="text-[#F23B32] font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#F23B32] animate-ping" />
              CONTINUOUS FEEDBACK LOOP ↻
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
