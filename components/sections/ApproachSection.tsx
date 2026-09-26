"use client";

import React, { useRef, useState, useLayoutEffect } from "react";
import { homeContent } from "@/data/content/home";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { getGSAP } from "@/lib/gsap";
import { MatteSection } from "@/components/ui/MatteSection";
import { cn } from "@/lib/utils";

export function ApproachSection() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { howWeWork } = homeContent;
  const [activeCard, setActiveCard] = useState<number>(1); // Default to 02 DIAGNOSE as featured

  useLayoutEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const { gsap } = getGSAP();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".framework-card",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 72%",
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
      {/* Background Soft Blue Ambient Illumination */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/3 w-[600px] h-[450px] bg-[#3B82F6]/[0.07] rounded-full blur-[140px]"
      />

      <div className="max-w-7xl mx-auto">
        {/* Large Matte Charcoal Outer Shell (Base Surface) */}
        <MatteSection radius="24" className="p-6 sm:p-10 lg:p-12">
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-[#EFECE4]/[0.08]">
            <div className="max-w-2xl">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20252B] border border-[#3B82F6]/30 text-xs font-mono tracking-wider text-[#3B82F6] mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
                <span>{howWeWork.badge}</span>
              </div>

              {/* Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-tight uppercase leading-[1.05] text-[#EFECE4]">
                {howWeWork.headline}
              </h2>
            </div>

            {/* Elevated Philosophy Glass Panel */}
            <div className="p-5 rounded-[14px] bg-[#171a1e] border border-white/[0.08] shadow-[0_8px_20px_-3px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)] max-w-md shrink-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#F4BA00]" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#F4BA00]">
                  PHILOSOPHY
                </span>
              </div>
              <p className="font-body text-xs sm:text-sm text-[#9AA3B2] leading-relaxed">
                {howWeWork.conclusion}
              </p>
            </div>
          </div>

          {/* 6-Step Tactile Framework Grid */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
            {howWeWork.steps.map((item, idx) => {
              const isActive = activeCard === idx;

              return (
                <div
                  key={idx}
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveCard(idx)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveCard(idx);
                    }
                  }}
                  className={cn(
                    "framework-card relative p-6 sm:p-7 rounded-[16px] cursor-pointer flex flex-col justify-between transition-all duration-300 ease-out",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electricBlue",
                    isActive
                      ? "bg-[#21252a] border border-[#3B82F6]/60 -translate-y-1.5 shadow-[0_16px_36px_rgba(0,0,0,0.75),0_0_24px_rgba(59,130,246,0.22),inset_0_1px_0_rgba(255,255,255,0.15)]"
                      : "bg-[#171a1e] border border-white/[0.08] shadow-[0_6px_18px_-2px_rgba(0,0,0,0.72),0_2px_6px_-1px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)] hover:-translate-y-1 hover:border-[#3B82F6]/40 hover:bg-[#21252a]"
                  )}
                >
                  {/* Top Specular Sheen */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent"
                  />

                  <div>
                    {/* Number and Active Status */}
                    <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/[0.06]">
                      <span className="font-mono text-xs font-semibold tracking-widest text-[#F4BA00] px-2 py-0.5 rounded-[4px] bg-[#101215] border border-[#F4BA00]/25 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]">
                        {String(idx + 1).padStart(2, "0")}
                      </span>

                      <div
                        className={cn(
                          "w-2.5 h-2.5 rounded-full transition-colors",
                          isActive
                            ? "bg-[#3B82F6] shadow-[0_0_8px_#3B82F6]"
                            : "bg-[#9AA3B2]/30"
                        )}
                        aria-hidden="true"
                      />
                    </div>

                    {/* Step Title */}
                    <h3
                      className={cn(
                        "font-heading font-semibold text-lg sm:text-xl uppercase tracking-tight transition-colors leading-snug",
                        isActive ? "text-[#EFECE4]" : "text-[#EFECE4]/90"
                      )}
                    >
                      {item.title}
                    </h3>
                  </div>

                  {/* Step Description */}
                  <p className="mt-5 pt-4 border-t border-white/[0.06] font-body text-xs sm:text-sm text-[#9AA3B2] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </MatteSection>
      </div>
    </section>
  );
}
