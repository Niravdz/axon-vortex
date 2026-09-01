"use client";

import React, { useRef, useLayoutEffect } from "react";
import HeroCanvas from "@/components/3d/HeroCanvas";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
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

    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
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
          y: -80,
          scale: 0.92,
          opacity: 0.25,
          ease: "power2.inOut",
        },
        0
      )
        .to(
          copy,
          {
            y: -50,
            opacity: 0,
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

    mm.add("(max-width: 1023px)", () => {
      gsap.set(pinContainer, { clearProps: "all" });
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
        className="relative w-full min-h-screen lg:h-screen flex flex-col justify-between pt-28 pb-10 px-6 md:px-12 bg-transparent"
      >
        {/* Editorial Grid Texture */}
        <div className="absolute inset-0 editorial-grid opacity-25 pointer-events-none" />

        {/* 3D Architectural Spatial Mesh */}
        <div
          ref={visualRef}
          className="absolute inset-0 z-canvas pointer-events-auto flex items-center justify-end will-change-transform opacity-75 pr-0 md:pr-12"
        >
          <div className="w-full h-full max-w-4xl max-h-[750px]">
            <HeroCanvas />
          </div>
        </div>

        {/* Thin Graphic Line Boundary */}
        <div
          ref={linesRef}
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-border pointer-events-none will-change-transform"
        />

        {/* Top Technical Metadata */}
        <div className="relative z-10 flex items-center justify-between max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <Badge variant="dot">
              {homeContent.hero.tagline}
            </Badge>
            <span className="hidden md:inline-block font-mono text-[10px] text-editorial-muted tracking-widest uppercase">
              ARCHITECTURAL GROWTH ENGINE
            </span>
          </div>

          <span className="font-mono text-[10px] text-editorial-secondary uppercase tracking-widest">
            01 / 07 EXPLORATION
          </span>
        </div>

        {/* Editorial Headline & Statement */}
        <div className="relative z-10 max-w-7xl mx-auto w-full my-auto flex flex-col justify-center pointer-events-none py-8">
          <div ref={headlineRef} className="will-change-transform max-w-4xl">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[88px] font-heading font-bold tracking-tighter uppercase leading-[0.96] text-editorial-primary select-none">
              BUILD SMARTER.
              <br />
              <span className="text-accent-orange">
                MARKET BETTER.
              </span>
              <br />
              GROW FASTER.
            </h1>
          </div>

          <div
            ref={copyRef}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end max-w-4xl mt-8 will-change-transform"
          >
            <div className="md:col-span-8 flex flex-col gap-3">
              <p className="text-sm sm:text-base font-heading font-medium text-editorial-primary">
                {homeContent.hero.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-editorial-secondary font-sans leading-relaxed max-w-xl">
                {homeContent.hero.description}
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 pointer-events-auto">
              <Button
                variant="primary"
                size="md"
                withArrow
                magnetic
                asLink
                href={homeContent.hero.primaryCta.href}
                className="w-full sm:w-auto"
              >
                {homeContent.hero.primaryCta.label}
              </Button>

              <Button
                variant="secondary"
                size="md"
                asLink
                href={homeContent.hero.secondaryCta.href}
                className="w-full sm:w-auto text-center"
              >
                {homeContent.hero.secondaryCta.label}
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Coordinates */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex items-end justify-between border-t border-border pt-4 text-xs font-mono text-editorial-muted">
          <div className="flex items-center gap-4">
            <span className="text-editorial-primary font-medium">
              {siteConfig.positioning}
            </span>
            <span className="hidden sm:inline text-border">|</span>
            <span className="hidden sm:inline text-editorial-secondary">
              {siteConfig.name} © {new Date().getFullYear()}
            </span>
          </div>

          <div
            className="flex items-center gap-2 text-editorial-secondary hover:text-accent-orange cursor-pointer transition-colors"
            onClick={() => {
              window.scrollTo({ top: window.innerHeight * 1.2, behavior: "smooth" });
            }}
          >
            <span className="text-[10px] tracking-widest uppercase hidden sm:inline-block">
              SCROLL TO DIAGNOSE
            </span>
            <span className="text-accent-orange text-xs">↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}
