"use client";

import React, { useRef, useLayoutEffect } from "react";
import { homeContent } from "@/data/content/home";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { getGSAP } from "@/lib/gsap";
import { MatteSection } from "@/components/ui/MatteSection";
import { RaisedCard } from "@/components/ui/RaisedCard";

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

      // Connecting energy conduit line draw
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
        { opacity: 0, y: 28, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
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
          delay: 0.4,
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
      className="relative w-full bg-[#121519] text-[#EFECE4] border-b border-[#EFECE4]/[0.08] py-16 sm:py-24 px-4 sm:px-8 lg:px-12 overflow-hidden"
    >
      {/* Background Subtle Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 right-1/4 w-[600px] h-[500px] bg-[#3B82F6]/[0.05] rounded-full blur-[140px]"
      />

      <div className="max-w-7xl mx-auto">
        <MatteSection radius="24" className="p-6 sm:p-10 lg:p-12">
          {/* Header Block */}
          <div
            data-growth-header
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#EFECE4]/[0.08] will-change-[transform,opacity]"
          >
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20252B] border border-[#3B82F6]/30 text-xs font-mono tracking-wider text-[#3B82F6] mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F4BA00] animate-pulse" />
                <span>{connectedGrowth.badge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-tight uppercase leading-[1.05] text-[#EFECE4]">
                {connectedGrowth.headline}
              </h2>
              <p className="mt-4 font-body text-sm sm:text-base text-[#9AA3B2]">
                {connectedGrowth.subheading}
              </p>
            </div>

            <div className="rounded-[14px] border border-white/[0.08] p-5 bg-[#171a1e] max-w-sm shrink-0 shadow-[0_8px_20px_-3px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)]">
              <span className="font-mono text-xs uppercase tracking-widest text-[#F4BA00] block mb-1 font-semibold">
                SYSTEM MANDATE
              </span>
              <p className="font-body text-xs text-[#EFECE4]/85 leading-relaxed">
                {connectedGrowth.objective}
              </p>
            </div>
          </div>

          {/* Connected Growth System Diagram with Conduit Line */}
          <div className="mt-10 pt-4 relative">
            {/* Architectural blue-to-amber energy conduit line */}
            <div
              ref={lineRef}
              aria-hidden="true"
              className="hidden xl:block absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r from-[#3B82F6] via-[#2D5BB9] to-[#F4BA00] z-0 will-change-transform shadow-[0_0_12px_rgba(59,130,246,0.4)]"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-stretch relative z-10">
              {connectedGrowth.steps.map((step, idx) => {
                const isAccent = idx === 5; // Final conversion step

                return (
                  <RaisedCard
                    key={idx}
                    radius="12"
                    glowOnHover={isAccent ? "amber" : "blue"}
                    className={`pipeline-node relative p-5 flex flex-col justify-between group will-change-[transform,opacity] ${
                      isAccent
                        ? "border-[#F4BA00]/40 shadow-[0_8px_24px_rgba(0,0,0,0.6),0_0_16px_rgba(244,186,0,0.2),inset_0_1px_0_rgba(239,236,228,0.2)]"
                        : ""
                    }`}
                  >
                    <div>
                      {/* Top Row: Category and indicator */}
                      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-3">
                        <span className="font-mono text-[11px] uppercase tracking-wider text-[#9AA3B2] font-medium truncate">
                          {step.category}
                        </span>
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 transition-colors ${
                            isAccent
                              ? "bg-[#F4BA00] shadow-[0_0_8px_#F4BA00]"
                              : "bg-[#3B82F6]/60 group-hover:bg-[#3B82F6]"
                          }`}
                          aria-hidden="true"
                        />
                      </div>

                      {/* Number and Step Name */}
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="font-mono text-xs font-semibold text-[#3B82F6]">
                          0{idx + 1}
                        </span>
                        <h3 className="font-heading font-semibold text-sm uppercase text-[#EFECE4] group-hover:text-[#60A5FA] transition-colors leading-tight">
                          {step.name}
                        </h3>
                      </div>

                      <p className="font-body text-xs text-[#9AA3B2] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </RaisedCard>
                );
              })}
            </div>

            {/* Recessed Continuous Feedback Loop Bar */}
            <div
              data-conduit-bar
              className="mt-8 p-4 sm:p-5 rounded-[14px] bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_5px_rgba(0,0,0,0.78),inset_0_1px_1px_rgba(0,0,0,0.92),0_1px_0_rgba(255,255,255,0.04)] flex flex-col sm:flex-row items-center justify-between gap-4 will-change-[transform,opacity]"
            >
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F4BA00] animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-wider text-[#EFECE4]/90 font-medium">
                  CONTINUOUS LOOP: DATA → ADAPTATION → SCALE
                </span>
              </div>
              <p className="text-xs font-body text-[#9AA3B2] text-center sm:text-right max-w-md">
                Systems don&apos;t end at conversion. Conversion data feeds directly back into positioning, paid acquisition, and automated follow-ups.
              </p>
            </div>
          </div>
        </MatteSection>
      </div>
    </section>
  );
}
