"use client";

import React, { useRef, useLayoutEffect } from "react";
import HeroCanvas from "@/components/3d/HeroCanvas";
import { Button } from "@/components/ui/Button";
import { getGSAP } from "@/lib/gsap";
import { homeContent } from "@/data/content/home";
import { siteConfig } from "@/data/siteConfig";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !pinRef.current) return;

    const { gsap } = getGSAP();
    const section = sectionRef.current;
    const pinContainer = pinRef.current;
    const headline = headlineRef.current;
    const copy = copyRef.current;
    const visual = visualRef.current;
    const lines = linesRef.current;

    const mm = gsap.matchMedia();

    // Desktop Animation
    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 88px",
          end: "+=100%",
          pin: pinContainer,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        headline,
        {
          y: -120,
          scale: 0.95,
          opacity: 0.4,
          ease: "power2.inOut",
        },
        0
      )
        .to(
          copy,
          {
            y: -80,
            opacity: 0.2,
            ease: "power2.out",
          },
          0
        )
        .to(
          visual,
          {
            scale: 1.3,
            opacity: 0.15,
            ease: "power1.inOut",
          },
          0
        );

      if (lines) {
        tl.to(
          lines,
          {
            scaleX: 1.8,
            opacity: 0.4,
            ease: "expo.out",
          },
          0.1
        );
      }
    });

    // Mobile & Tablet: Fluid Scroll Fade & Translation
    mm.add("(max-width: 1023px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 88px",
          end: "bottom top",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        headline,
        {
          y: -40,
          opacity: 0.4,
          ease: "power2.out",
        },
        0
      )
        .to(
          copy,
          {
            y: -25,
            opacity: 0.2,
            ease: "power2.out",
          },
          0
        )
        .to(
          visual,
          {
            scale: 1.15,
            opacity: 0.1,
            ease: "power1.out",
          },
          0
        );
    });

    return () => mm.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-transparent text-editorial-primary overflow-clip"
      style={{ isolation: "isolate" }}
    >
      <div
        ref={pinRef}
        className="relative w-full min-h-[calc(100dvh-80px)] lg:h-[calc(100vh-88px)] flex flex-col justify-between pt-6 sm:pt-8 pb-8 sm:pb-10 px-4 sm:px-6 md:px-12 bg-transparent"
      >
        {/* Editorial Grid Texture */}
        <div className="absolute inset-0 editorial-grid opacity-25 pointer-events-none" />

        {/* 3D Architectural Spatial Mesh */}
        <div
          ref={visualRef}
          className="absolute inset-0 z-canvas pointer-events-auto flex items-center justify-end will-change-transform opacity-50 sm:opacity-75 pr-0 md:pr-12"
        >
          <div className="w-full h-full max-w-4xl max-h-[750px] pointer-events-none">
            <HeroCanvas />
          </div>
        </div>

        {/* Thin Graphic Line Boundary */}
        <div
          ref={linesRef}
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-border pointer-events-none will-change-transform hidden sm:block"
        />

        {/* Top Technical Metadata */}
        <div className="relative z-10 flex items-center justify-between max-w-7xl mx-auto w-full pt-1 pb-3 border-b border-[#1E1E2E]/10">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#1E1E2E]/15 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-turquoise animate-pulse" />
            <span className="text-[11px] font-heading font-semibold text-editorial-primary uppercase tracking-wider">
              {homeContent.hero.tagline}
            </span>
          </div>

          <span className="hidden md:inline-block font-mono text-[11px] text-brand-turquoise font-semibold tracking-widest uppercase">
            ARCHITECTURAL GROWTH ENGINE
          </span>
        </div>

        {/* Editorial Headline & Statement */}
        <div className="relative z-10 max-w-7xl mx-auto w-full my-auto flex flex-col justify-center py-6 sm:py-8">
          <div ref={headlineRef} className="will-change-transform max-w-4xl">
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-[88px] font-heading font-bold tracking-tighter uppercase leading-[0.98] sm:leading-[0.96] text-editorial-primary select-none break-words">
              BUILD SMARTER.
              <br />
              <span className="text-brand-turquoise">
                MARKET BETTER.
              </span>
              <br />
              GROW FASTER.
            </h1>
          </div>

          <div
            ref={copyRef}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-end max-w-4xl mt-6 sm:mt-8 will-change-transform"
          >
            <div className="md:col-span-8 flex flex-col gap-2.5 sm:gap-3">
              <p className="text-sm sm:text-base font-heading font-semibold text-editorial-primary">
                {homeContent.hero.subtitle}
              </p>
              <div className="flex flex-col gap-2 text-xs sm:text-sm text-editorial-secondary font-sans leading-relaxed max-w-xl">
                <p>
                  AxonVortex helps businesses build, market and scale smarter by combining AI, human strategy, creativity, marketing, automation and data.
                </p>
                <p>
                  From building your digital presence to generating leads, improving customer experiences and automating repetitive work, we create practical digital growth systems around your business goals.
                </p>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 pointer-events-auto w-full">
              <Button
                variant="primary"
                size="md"
                withArrow
                magnetic
                asLink
                href={homeContent.hero.primaryCta.href}
                className="w-full sm:w-auto text-center justify-center min-h-[46px]"
              >
                {homeContent.hero.primaryCta.label}
              </Button>

              <Button
                variant="secondary"
                size="md"
                asLink
                href="#services-sequence"
                className="w-full sm:w-auto text-center justify-center min-h-[46px]"
              >
                {homeContent.hero.secondaryCta.label}
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Coordinates */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex items-end justify-between border-t border-border pt-3.5 sm:pt-4 text-xs font-mono text-editorial-muted">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-editorial-primary font-medium text-[11px] sm:text-xs">
              {siteConfig.positioning}
            </span>
            <span className="hidden sm:inline text-border">|</span>
            <span className="hidden sm:inline text-editorial-secondary text-[11px] sm:text-xs">
              {siteConfig.name} © {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
