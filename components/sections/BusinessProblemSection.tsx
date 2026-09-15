"use client";

import React, { useRef, useLayoutEffect } from "react";
import { homeContent } from "@/data/content/home";
import { BauhausBadge } from "@/components/ui/BauhausBadge";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { getGSAP } from "@/lib/gsap";

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
            trigger: ".problem-index-row",
            start: "top 85%",
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
      className="relative w-full bg-white text-[#090909] border-b-4 border-[#090909]"
    >
      {/* Top Banner Header */}
      <div className="border-b-4 border-[#090909] px-6 sm:px-12 py-4 bg-[#FFD447] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-widest text-[#090909]">
          <span className="w-3 h-3 bg-[#F23B32] border border-[#090909]" />
          <span>{businessProblem.badge}</span>
        </div>
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#090909]">
          FRICTION AUDIT
        </span>
      </div>

      {/* Split Editorial Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Column: Editorial Statement (5 cols) */}
        <div
          data-problem-editorial
          className="lg:col-span-5 p-8 sm:p-12 lg:p-16 border-b-4 lg:border-b-0 lg:border-r-4 border-[#090909] bg-[#E9EDF2] flex flex-col justify-between gap-8 will-change-[transform,opacity]"
        >
          <div>
            <BauhausBadge variant="red" shape="square" size="sm" className="mb-6">
              DIAGNOSIS
            </BauhausBadge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight uppercase leading-[1.05] text-[#090909]">
              {businessProblem.headline}
            </h2>
            <p className="mt-6 font-body text-base text-[#090909]/80 leading-relaxed">
              {businessProblem.intro}
            </p>
          </div>

          <div className="border-t-4 border-[#090909] pt-6 bg-white p-6 border-2 shadow-[4px_4px_0px_0px_#090909]">
            <span className="font-mono text-xs font-bold text-[#F23B32] uppercase tracking-wider block mb-2">
              CORE THESIS
            </span>
            <p className="font-heading font-bold text-lg sm:text-xl uppercase text-[#090909] leading-snug">
              &ldquo;{businessProblem.statement}&rdquo;
            </p>
          </div>
        </div>

        {/* Right Column: Problem Index (7 cols) */}
        <div className="lg:col-span-7 bg-white divide-y-2 divide-[#090909]">
          {businessProblem.problems.map((item, index) => (
            <div
              key={index}
              className="problem-index-row p-6 sm:p-8 flex items-start sm:items-center justify-between gap-4 sm:gap-8 hover:bg-[#E9EDF2]/40 transition-colors group will-change-[transform,opacity]"
            >
              {/* Problem Content */}
              <div className="flex-1">
                <h3 className="font-heading font-bold text-xl uppercase tracking-tight text-[#090909] group-hover:text-[#F23B32] transition-colors">
                  {item.title}
                </h3>
                <p className="mt-1 font-body text-sm text-[#090909]/75 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Status indicator */}
              <div className="hidden sm:block w-3 h-3 border-2 border-[#090909] bg-white group-hover:bg-[#F23B32] transition-colors shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
