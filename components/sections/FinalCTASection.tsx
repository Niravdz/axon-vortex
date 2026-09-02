"use client";

import React, { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { homeContent } from "@/data/content/home";
import { siteConfig } from "@/data/siteConfig";
import { getGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function FinalCTASection() {
  const containerRef = useRef<HTMLElement>(null);
  const glowBeamRef = useRef<HTMLDivElement>(null);
  const ctaButtonsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { finalCta } = homeContent;

  useLayoutEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const { gsap } = getGSAP();
    const container = containerRef.current;
    const beam = glowBeamRef.current;
    const buttons = ctaButtonsRef.current;

    const ctx = gsap.context(() => {
      if (beam) {
        gsap.fromTo(
          beam,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: container,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (buttons) {
        gsap.fromTo(
          buttons,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            delay: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative z-10 py-20 sm:py-28 lg:py-32 px-4 sm:px-6 md:px-12 bg-transparent text-editorial-primary overflow-clip border-t border-border"
      style={{ isolation: "isolate" }}
    >
      {/* Thin Horizontal Accent Beam */}
      <div
        ref={glowBeamRef}
        className="absolute top-0 left-0 right-0 h-[1px] bg-brand-turquoise origin-center will-change-transform"
      />

      <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-6 sm:gap-8 relative z-10">
        <div className="relative w-12 h-12 rounded-sm overflow-hidden bg-charcoal border border-border p-1 mb-1 sm:mb-2">
          <Image
            src="/assets/axon-vortex-logo.jpeg"
            alt="AxonVortex Logo"
            fill
            sizes="48px"
            className="object-contain"
          />
        </div>

        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#1E1E2E]/15 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-turquoise animate-pulse" />
          <span className="text-[11px] font-heading font-semibold text-editorial-primary uppercase tracking-wider">
            {siteConfig.tagline}
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold uppercase tracking-tight text-editorial-primary max-w-4xl leading-[1.0] break-words">
          {finalCta.headline}
        </h2>

        <p className="text-sm sm:text-base lg:text-lg text-brand-turquoise font-heading font-semibold max-w-2xl">
          {finalCta.subheading}
        </p>

        <div className="flex flex-col gap-2.5 text-xs sm:text-sm text-editorial-secondary font-sans max-w-xl leading-relaxed">
          <p>
            Tell us about your business, your challenge and your goal.
          </p>
          <p>
            We&apos;ll help identify where digital strategy, marketing, technology or AI can make the biggest difference.
          </p>
        </div>

        <div className="flex flex-col items-center gap-1 font-heading font-bold text-sm sm:text-base text-editorial-primary uppercase tracking-wide pt-2">
          <span>Your vision deserves more than a digital presence.</span>
          <span className="text-brand-turquoise">It deserves a growth system.</span>
        </div>

        <div
          ref={ctaButtonsRef}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-3 sm:pt-4 w-full sm:w-auto will-change-transform"
        >
          <Button
            variant="primary"
            size="lg"
            withArrow
            magnetic
            asLink
            href={finalCta.primaryCta.href}
            className="w-full sm:w-auto text-center justify-center min-h-[48px]"
          >
            {finalCta.primaryCta.label}
          </Button>

          <Button
            variant="secondary"
            size="lg"
            asLink
            href={finalCta.secondaryCta.href}
            className="w-full sm:w-auto text-center justify-center min-h-[48px]"
          >
            {finalCta.secondaryCta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
