"use client";

import React, { useRef, useLayoutEffect } from "react";
import { homeContent } from "@/data/content/home";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { getGSAP } from "@/lib/gsap";
import { MatteSection } from "@/components/ui/MatteSection";

export function BusinessProblemSection() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { businessProblem } = homeContent;

  useLayoutEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const { gsap } = getGSAP();
    const ctx = gsap.context(() => {
      // Left side editorial statement reveal
      gsap.fromTo(
        "[data-problem-editorial]",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Progressive reveal of problem statements
      gsap.fromTo(
        ".problem-index-row",
        { opacity: 0, x: 28 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "transform,opacity",
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

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#121519] text-[#EFECE4] py-16 sm:py-24 px-4 sm:px-8 lg:px-12 overflow-hidden border-b border-[#EFECE4]/[0.08]"
    >
      {/* Background Soft Blue Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 left-1/4 w-[500px] h-[400px] bg-[#3B82F6]/[0.06] rounded-full blur-[140px]"
      />

      <div className="max-w-7xl mx-auto">
        <MatteSection radius="24" className="overflow-hidden">
          {/* Top Banner Header inside Matte Shell */}
          <div className="border-b border-white/[0.08] px-6 sm:px-10 py-4 bg-[#141619] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-[#EFECE4]/90">
              <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
              <span>{businessProblem.badge}</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#9AA3B2]">
              <span className="text-[#F4BA00]">●</span>
              <span>SYSTEM FRICTION AUDIT</span>
            </div>
          </div>

          {/* Split Dimensional Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left Column: Editorial Statement (5 cols) */}
            <div
              data-problem-editorial
              className="lg:col-span-5 p-8 sm:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/[0.08] bg-[#1b1e22] flex flex-col justify-between gap-8 will-change-[transform,opacity]"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171a1e] border border-[#3B82F6]/30 text-xs font-mono tracking-wider text-[#3B82F6] mb-6 shadow-[0_2px_6px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]">
                  DIAGNOSTIC
                </div>
                <h2 className="text-3xl sm:text-4xl font-heading font-semibold tracking-tight uppercase leading-[1.1] text-[#EFECE4]">
                  {businessProblem.headline}
                </h2>
                <p className="mt-5 font-body text-sm sm:text-base text-[#9AA3B2] leading-relaxed">
                  {businessProblem.intro}
                </p>
              </div>

              {/* Recessed Core Thesis Module */}
              <div className="p-6 rounded-[14px] bg-[#101215] border border-[#F4BA00]/25 shadow-[inset_0_2px_5px_rgba(0,0,0,0.78),inset_0_1px_1px_rgba(0,0,0,0.92),0_1px_0_rgba(255,255,255,0.04)]">
                <span className="font-mono text-xs font-semibold text-[#F4BA00] uppercase tracking-wider block mb-2">
                  CORE THESIS
                </span>
                <p className="font-heading font-medium text-base sm:text-lg text-[#EFECE4] leading-snug">
                  &ldquo;{businessProblem.statement}&rdquo;
                </p>
              </div>
            </div>

            {/* Right Column: Stacked Rows on Recessed Track (7 cols) */}
            <div className="lg:col-span-7 p-4 sm:p-6 lg:p-8 bg-[#101215] flex flex-col gap-3 shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)]">
              {businessProblem.problems.map((point, index) => (
                <div
                  key={index}
                  className="problem-index-row p-5 sm:p-6 rounded-[12px] bg-[#171a1e] border border-white/[0.08] shadow-[0_4px_14px_-2px_rgba(0,0,0,0.72),inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col sm:flex-row items-start gap-4 sm:gap-6 hover:bg-[#21252a] hover:border-[#3B82F6]/40 hover:shadow-[0_8px_20px_rgba(0,0,0,0.6),0_0_16px_rgba(59,130,246,0.15)] transition-all duration-200 group will-change-[transform,opacity]"
                >
                  {/* Numeric indicator */}
                  <div className="font-mono text-sm font-semibold text-[#3B82F6] px-2.5 py-1 rounded-[6px] bg-[#101215] border border-white/[0.05] shrink-0 group-hover:border-[#3B82F6]/60 transition-colors shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Point Title and Explanation */}
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold text-base sm:text-lg text-[#EFECE4] group-hover:text-[#60A5FA] transition-colors leading-snug mb-1.5">
                      {point.title}
                    </h3>
                    <p className="font-body text-xs sm:text-sm text-[#9AA3B2] leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MatteSection>
      </div>
    </section>
  );
}
