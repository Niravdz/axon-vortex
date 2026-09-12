"use client";

import React, { useRef, useLayoutEffect } from "react";
import { homeContent } from "@/data/content/home";
import { Button } from "@/components/ui/Button";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { getGSAP } from "@/lib/gsap";

export function FinalCTASection() {
  const containerRef = useRef<HTMLElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const squareRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { finalCta } = homeContent;

  useLayoutEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const { gsap } = getGSAP();
    const ctx = gsap.context(() => {
      // Content reveal
      gsap.fromTo(
        ".cta-content",
        { opacity: 0, y: 32, scale: 0.98 },
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

      // Slow independent geometric motion
      if (circleRef.current) {
        gsap.to(circleRef.current, {
          y: -18,
          x: 10,
          rotation: 8,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (squareRef.current) {
        gsap.to(squareRef.current, {
          y: 16,
          x: -12,
          rotation: -10,
          duration: 7,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      const handleVisibility = () => {
        if (document.hidden) {
          gsap.ticker.sleep();
        } else {
          gsap.ticker.wake();
        }
      };
      document.addEventListener("visibilitychange", handleVisibility);
      return () => document.removeEventListener("visibilitychange", handleVisibility);
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#F23B32] text-white border-b-4 border-[#090909] py-20 sm:py-28 px-6 sm:px-12 lg:px-16 overflow-hidden"
    >
      {/* Bauhaus Decorative Geometric Shapes in Background with gentle float */}
      <div
        ref={circleRef}
        aria-hidden="true"
        className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#FFD447] border-4 border-[#090909] opacity-40 pointer-events-none will-change-transform"
      />
      <div
        ref={squareRef}
        aria-hidden="true"
        className="absolute -bottom-16 -left-16 w-56 h-56 bg-[#0F2747] border-4 border-[#090909] opacity-30 pointer-events-none will-change-transform"
      />

      <div className="max-w-4xl mx-auto text-center relative z-10 cta-content will-change-[transform,opacity]">
        <div className="inline-block px-4 py-1.5 bg-[#090909] text-white font-mono text-xs font-bold uppercase tracking-widest border border-white mb-6 shadow-hard-sm">
          COMMISSION SCOPING
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tight uppercase leading-[0.98] text-white">
          {finalCta.headline}
        </h2>

        <p className="mt-6 text-lg sm:text-xl font-heading font-semibold text-[#FFD447] leading-relaxed max-w-2xl mx-auto">
          {finalCta.subheading}
        </p>

        <p className="mt-4 font-body text-sm sm:text-base text-white/90 leading-relaxed max-w-2xl mx-auto">
          {finalCta.body}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="yellow"
            size="lg"
            withArrow
            asLink
            href={finalCta.primaryCta.href}
            className="w-full sm:w-auto min-h-[54px] text-base"
          >
            {finalCta.primaryCta.label}
          </Button>

          <Button
            variant="outline"
            size="lg"
            asLink
            href="/growth-audit"
            className="w-full sm:w-auto min-h-[54px] text-base bg-white text-[#090909]"
          >
            {finalCta.secondaryCta.label}
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t-2 border-white/20 flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-white/80">
          <span>NO OBLIGATION</span>
          <span>·</span>
          <span>STRATEGIC ALIGNMENT</span>
          <span>·</span>
          <span>DIRECT EXPERT REVIEW</span>
        </div>
      </div>
    </section>
  );
}
