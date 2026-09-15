"use client";

import React, { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { BauhausBadge } from "@/components/ui/BauhausBadge";
import { homeContent } from "@/data/content/home";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { getGSAP } from "@/lib/gsap";

export function HomeHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const { gsap } = getGSAP();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Eyebrow badge and metadata
      tl.fromTo(
        "[data-hero-eyebrow]",
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5 }
      )
        // 2. Headline line-by-line masked reveals
        .fromTo(
          ".hero-headline-line",
          { y: "115%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 0.8, stagger: 0.12 },
          "-=0.2"
        )
        // 3. Supporting thesis border & paragraphs
        .fromTo(
          "[data-hero-paragraph]",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          "-=0.4"
        )
        // 4. CTA buttons with short stagger
        .fromTo(
          "[data-hero-cta]",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          "-=0.3"
        )
        // 5. Bauhaus geometric artwork enters separately
        .fromTo(
          visualRef.current,
          { opacity: 0, scale: 0.96, y: 16 },
          { opacity: 1, scale: 1, y: 0, duration: 0.85 },
          "-=0.6"
        )
        // 6. Corner geometry elements
        .fromTo(
          "[data-hero-geometry]",
          { opacity: 0, scale: 0.6 },
          { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1 },
          "-=0.4"
        );

      // Controlled, dignified floating background motion for geometric accents
      const handleVisibilityChange = () => {
        if (document.hidden) {
          gsap.ticker.sleep();
        } else {
          gsap.ticker.wake();
        }
      };
      document.addEventListener("visibilitychange", handleVisibilityChange);

      gsap.to("[data-hero-float-1]", {
        y: -10,
        rotation: 6,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to("[data-hero-float-2]", {
        y: 8,
        rotation: -8,
        duration: 5.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white text-[#090909] border-b-4 border-[#090909] overflow-hidden"
    >
      <div className="w-full flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
        {/* Left Side: Content-Led Split (54% width on desktop) */}
        <div className="w-full lg:w-[54%] p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col justify-between border-b-4 lg:border-b-0 lg:border-r-4 border-[#090909] bg-white relative">
          {/* Bauhaus Top Meta Label */}
          <div data-hero-eyebrow className="flex flex-wrap items-center gap-3 mb-8">
            <BauhausBadge variant="red" shape="square" size="sm">
              AI-DRIVEN DIGITAL GROWTH
            </BauhausBadge>
            <span className="font-mono text-xs uppercase tracking-widest text-[#090909]/60">
              AXONVORTEX · EST. 2026
            </span>
          </div>

          {/* Headline & Paragraph */}
          <div className="my-auto max-w-2xl py-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] xl:text-[84px] font-heading font-bold tracking-[0.015em] uppercase leading-[0.95] text-[#090909]">
              <span className="block overflow-hidden pb-1">
                <span className="hero-headline-line block will-change-transform">BUILD SMARTER.</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="hero-headline-line block will-change-transform">MARKET BETTER.</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="hero-headline-line block text-[#F23B32] will-change-transform">GROW FASTER.</span>
              </span>
            </h1>

            <p
              data-hero-paragraph
              className="mt-6 text-lg sm:text-xl font-heading font-semibold text-[#090909] leading-snug border-l-4 border-[#F23B32] pl-4"
            >
              {homeContent.hero.subtitle}
            </p>

            <div
              data-hero-paragraph
              className="mt-6 text-sm sm:text-base font-body text-[#090909]/80 leading-relaxed max-w-xl space-y-3"
            >
              <p>
                AxonVortex helps businesses build, market and scale smarter by combining AI, human strategy, creativity, marketing, automation and data.
              </p>
              <p>
                From building your digital presence to generating leads, improving customer experiences and automating repetitive work, we create practical digital growth systems around your business goals.
              </p>
            </div>

            {/* CTAs */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div data-hero-cta className="flex-1 sm:flex-initial">
                <Button
                  variant="primary"
                  size="lg"
                  withArrow
                  asLink
                  href={homeContent.hero.primaryCta.href}
                  className="w-full justify-center min-h-[52px]"
                >
                  {homeContent.hero.primaryCta.label}
                </Button>
              </div>

              <div data-hero-cta className="flex-1 sm:flex-initial">
                <Button
                  variant="outline"
                  size="lg"
                  asLink
                  href="#solutions"
                  className="w-full justify-center min-h-[52px]"
                >
                  {homeContent.hero.secondaryCta.label}
                </Button>
              </div>
            </div>
          </div>

          {/* Left Side Bottom Coordinates */}
          <div className="pt-8 border-t-2 border-[#090909]/15 flex items-center justify-between text-xs font-mono text-[#090909]/60">
            <span>STRATEGY · MARKETING · AI · AUTOMATION</span>
            <span className="hidden sm:inline font-bold text-[#090909]">CONCEPT 9: SWISS MODERNISM</span>
          </div>

          {/* Decorative Corner Geometry */}
          <div
            data-hero-geometry
            data-hero-float-1
            className="absolute top-4 right-4 w-4 h-4 rounded-full bg-[#FFD447] border-2 border-[#090909] will-change-transform"
          />
          <div
            data-hero-geometry
            data-hero-float-2
            className="absolute bottom-4 left-4 w-3 h-3 bg-[#2F5FA7] border border-[#090909] will-change-transform"
          />
        </div>

        {/* Right Side: Architectural Visual Composition (46% width on desktop) */}
        <div className="w-full lg:w-[46%] bg-[#E9EDF2] p-6 sm:p-10 md:p-12 flex flex-col justify-center items-center relative overflow-hidden bauhaus-grid-bg">
          {/* Domain Badges Floating Frame */}
          <div
            ref={visualRef}
            className="relative w-full max-w-[620px] bg-white border-4 border-[#090909] p-3 sm:p-5 shadow-[8px_8px_0px_0px_#090909] will-change-transform"
          >
            {/* Header tab in frame */}
            <div className="flex items-center justify-between border-b-2 border-[#090909] pb-3 mb-3 font-mono text-xs font-bold uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#F23B32] border border-[#090909]" />
                <span className="w-3 h-3 bg-[#FFD447] border border-[#090909]" />
                <span className="w-3 h-3 bg-[#2F5FA7] border border-[#090909]" />
                <span className="text-[#090909] ml-2">SYSTEM SCHEMATIC v1.0</span>
              </div>
              <span className="text-[#F23B32]">5 CORE CAPABILITIES</span>
            </div>

            {/* Isometric Technology Assembly */}
            <div className="relative w-full aspect-[16/9] border-2 border-[#090909] overflow-hidden bg-white">
              <Image
                src="/images/bauhaus-tech-hero.png"
                alt="AxonVortex Bauhaus Tech Isometric Machine"
                fill
                priority
                className="object-contain p-2"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>

            {/* Domain tags grid at bottom of frame */}
            <div className="mt-4 pt-3 border-t-2 border-[#090909] grid grid-cols-3 sm:grid-cols-5 gap-2 text-center">
              <Link
                href="/digital-marketing"
                className="group py-2.5 px-2 bg-[#E9EDF2] hover:bg-[#F23B32] hover:text-white border border-[#090909] transition-colors flex items-center justify-center"
              >
                <span className="font-heading text-[11px] font-bold uppercase leading-tight">Marketing</span>
              </Link>
              <Link
                href="/ai-automation"
                className="group py-2.5 px-2 bg-[#E9EDF2] hover:bg-[#2F5FA7] hover:text-white border border-[#090909] transition-colors flex items-center justify-center"
              >
                <span className="font-heading text-[11px] font-bold uppercase leading-tight">AI & Auto</span>
              </Link>
              <Link
                href="/websites-ecommerce"
                className="group py-2.5 px-2 bg-[#E9EDF2] hover:bg-[#FFD447] hover:text-[#090909] border border-[#090909] transition-colors flex items-center justify-center"
              >
                <span className="font-heading text-[11px] font-bold uppercase leading-tight">Web & Shop</span>
              </Link>
              <Link
                href="/lead-generation"
                className="group py-2.5 px-2 bg-[#E9EDF2] hover:bg-[#F23B32] hover:text-white border border-[#090909] transition-colors flex items-center justify-center"
              >
                <span className="font-heading text-[11px] font-bold uppercase leading-tight">Lead Gen</span>
              </Link>
              <Link
                href="/technology-digital-transformation"
                className="group py-2.5 px-2 bg-[#E9EDF2] hover:bg-[#0F2747] hover:text-white border border-[#090909] transition-colors col-span-2 sm:col-span-1 flex items-center justify-center"
              >
                <span className="font-heading text-[11px] font-bold uppercase leading-tight">Tech Trans</span>
              </Link>
            </div>
          </div>

          {/* Architectural Swiss Corner Stamps */}
          <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-widest text-[#090909]/40">
            [SYS-CANVAS: 12-COL]
          </div>
          <div className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-widest text-[#090909]/40">
            [NODE-GRID: ACTIVE]
          </div>
        </div>
      </div>
    </section>
  );
}
