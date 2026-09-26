"use client";

import React, { useRef, useLayoutEffect } from "react";
import { homeContent } from "@/data/content/home";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { getGSAP } from "@/lib/gsap";
import { MatteSection } from "@/components/ui/MatteSection";
import { RaisedCard } from "@/components/ui/RaisedCard";

export function WhoWeHelpSection() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { whoWeHelp } = homeContent;

  useLayoutEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const { gsap } = getGSAP();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".matrix-cell",
        { opacity: 0, scale: 0.96, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
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

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#121519] text-[#EFECE4] border-b border-[#EFECE4]/[0.08] py-16 sm:py-24 px-4 sm:px-8 lg:px-12 overflow-hidden"
    >
      {/* Background Subtle Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 right-1/4 w-[500px] h-[400px] bg-[#3B82F6]/[0.05] rounded-full blur-[140px]"
      />

      <div className="max-w-7xl mx-auto">
        <MatteSection radius="24" className="p-6 sm:p-10 lg:p-12">
          {/* Masthead */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#EFECE4]/[0.08]">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20252B] border border-[#3B82F6]/30 text-xs font-mono tracking-wider text-[#3B82F6] mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
                <span>{whoWeHelp.badge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-tight uppercase leading-[1.05] text-[#EFECE4]">
                {whoWeHelp.headline}
              </h2>
            </div>

            <span className="font-mono text-xs uppercase tracking-widest text-[#9AA3B2] font-medium">
              [STAGE & SITUATION MATRIX]
            </span>
          </div>

          {/* 3x2 Matrix of Raised Tactile Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-10">
            {whoWeHelp.audiences.map((aud, idx) => (
              <RaisedCard
                key={idx}
                radius="16"
                glowOnHover="blue"
                className="matrix-cell p-7 sm:p-8 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.06] mb-4 transition-colors">
                    <span className="font-mono text-xs font-semibold text-[#3B82F6] px-2 py-0.5 rounded-[4px] bg-[#101215] border border-white/[0.04] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-[#3B82F6]/40 group-hover:bg-[#3B82F6] transition-colors" />
                  </div>

                  <h3 className="mt-2 font-heading font-semibold text-lg sm:text-xl uppercase tracking-tight text-[#EFECE4] group-hover:text-[#60A5FA] transition-colors leading-snug">
                    {aud.title}
                  </h3>
                </div>

                <p className="mt-5 pt-4 border-t border-white/[0.06] font-body text-xs sm:text-sm text-[#9AA3B2] leading-relaxed transition-colors">
                  {aud.description}
                </p>
              </RaisedCard>
            ))}
          </div>
        </MatteSection>
      </div>
    </section>
  );
}
