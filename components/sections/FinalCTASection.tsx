"use client";

import React, { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
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
            duration: 1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: container,
              start: "top 75%",
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
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: "top 70%",
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
      className="relative z-10 py-32 px-6 md:px-12 bg-transparent text-editorial-primary overflow-clip border-t border-border"
      style={{ isolation: "isolate" }}
    >
      {/* Thin Horizontal Accent Beam */}
      <div
        ref={glowBeamRef}
        className="absolute top-0 left-0 right-0 h-[1px] bg-accent-orange origin-center will-change-transform"
      />

      <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-8 relative z-10">
        <div className="relative w-12 h-12 rounded-sm overflow-hidden bg-charcoal border border-border p-1 mb-2">
          <Image
            src="/assets/axon-vortex-logo.jpeg"
            alt="AxonVortex Logo"
            fill
            sizes="48px"
            className="object-contain"
          />
        </div>

        <Badge variant="dot">
          {siteConfig.tagline}
        </Badge>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-heading font-bold uppercase tracking-tight text-editorial-primary max-w-4xl leading-[1.0]">
          {finalCta.headline}
        </h2>

        <p className="text-base sm:text-lg text-accent-orange font-heading font-medium max-w-2xl">
          {finalCta.subheading}
        </p>

        <p className="text-xs sm:text-sm text-editorial-secondary font-sans max-w-xl leading-relaxed">
          {finalCta.body}
        </p>

        <div
          ref={ctaButtonsRef}
          className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto will-change-transform"
        >
          <Button
            variant="primary"
            size="lg"
            withArrow
            magnetic
            asLink
            href={finalCta.primaryCta.href}
            className="w-full sm:w-auto"
          >
            {finalCta.primaryCta.label}
          </Button>

          <Button
            variant="secondary"
            size="lg"
            asLink
            href={finalCta.secondaryCta.href}
            className="w-full sm:w-auto"
          >
            {finalCta.secondaryCta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
