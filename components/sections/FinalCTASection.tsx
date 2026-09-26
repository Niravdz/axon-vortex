"use client";

import React, { useRef, useLayoutEffect } from "react";
import { homeContent } from "@/data/content/home";
import { TactileButton } from "@/components/ui/TactileButton";
import { MatteSection } from "@/components/ui/MatteSection";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { getGSAP } from "@/lib/gsap";

export function FinalCTASection() {
  const containerRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { finalCta } = homeContent;

  useLayoutEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const { gsap } = getGSAP();
    const ctx = gsap.context(() => {
      // Content reveal
      gsap.fromTo(
        ".cta-content",
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Slow breathing ambient glow
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1.15,
          opacity: 0.25,
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#121519] text-[#EFECE4] border-b border-[#EFECE4]/[0.08] py-20 sm:py-28 px-4 sm:px-8 lg:px-12 overflow-hidden"
    >
      {/* Central Luminous Amber Growth Ambient Spotlight */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] rounded-full bg-gradient-to-r from-[#F4BA00]/15 via-[#3B82F6]/10 to-transparent blur-[130px] will-change-transform"
      />

      <div className="max-w-5xl mx-auto relative z-10 cta-content will-change-[transform,opacity]">
        <MatteSection radius="24" glow="amber" className="p-8 sm:p-14 lg:p-16 text-center">
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171a1e] border border-[#F4BA00]/30 text-xs font-mono tracking-wider text-[#F4BA00] mb-6 shadow-[0_2px_6px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F4BA00] animate-pulse" />
            <span>COMMISSION SCOPING READY</span>
          </div>

          {/* Section Headline */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-semibold tracking-tight uppercase leading-[1.05] text-[#EFECE4] max-w-3xl mx-auto">
            {finalCta.headline}
          </h2>

          {/* Supporting description */}
          <p className="mt-6 text-sm sm:text-lg font-body text-[#9AA3B2] max-w-2xl mx-auto leading-relaxed">
            {finalCta.subheading}
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <TactileButton
              variant="primary"
              size="lg"
              withArrow
              asLink
              href={finalCta.primaryCta.href}
              className="w-full sm:w-auto min-w-[200px]"
            >
              {finalCta.primaryCta.label}
            </TactileButton>

            <TactileButton
              variant="charcoal"
              size="lg"
              asLink
              href={finalCta.secondaryCta.href}
              className="w-full sm:w-auto min-w-[200px]"
            >
              {finalCta.secondaryCta.label}
            </TactileButton>
          </div>

          {/* Direct contact hint */}
          <p className="mt-8 font-mono text-xs text-[#9AA3B2]/70">
            Typical diagnostic turnaround: 48 hours · Direct strategic partnership
          </p>
        </MatteSection>
      </div>
    </section>
  );
}
