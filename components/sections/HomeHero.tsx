"use client";

import React, { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { TactileButton } from "@/components/ui/TactileButton";
import { homeContent } from "@/data/content/home";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { getGSAP } from "@/lib/gsap";
import { ThreeDHeroFallback } from "@/components/3d/ThreeDHeroFallback";

const HeroCanvas = dynamic(() => import("@/components/3d/HeroCanvas"), {
  ssr: false,
  loading: () => <ThreeDHeroFallback />,
});

export function HomeHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const { gsap } = getGSAP();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Atmosphere fade and eyebrow badge
      tl.fromTo(
        "[data-hero-eyebrow]",
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.5 }
      )
        // 2. Headline line-by-line reveal
        .fromTo(
          ".hero-headline-line",
          { y: "115%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 0.8, stagger: 0.12 },
          "-=0.2"
        )
        // 3. Supporting thesis & description
        .fromTo(
          "[data-hero-paragraph]",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          "-=0.4"
        )
        // 4. CTAs entrance
        .fromTo(
          "[data-hero-cta]",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          "-=0.3"
        )
        // 5. 3D visual container
        .fromTo(
          visualRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.85 },
          "-=0.5"
        );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#121519] text-[#EFECE4] overflow-hidden border-b border-[#EFECE4]/[0.08]"
    >
      {/* Background Radial Glow Spotlights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 left-1/4 w-[500px] h-[400px] bg-[#3B82F6]/[0.08] rounded-full blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-1/4 w-[450px] h-[350px] bg-[#F4BA00]/[0.06] rounded-full blur-[140px]"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-12 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 min-h-[calc(100vh-80px)]">
        {/* Left Side: Content Hierarchy */}
        <div className="w-full lg:w-[54%] flex flex-col justify-center">
          {/* Eyebrow System Badge */}
          <div data-hero-eyebrow className="flex items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20252B] border border-[#3B82F6]/30 text-xs font-mono tracking-wider shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
              <span className="text-[#EFECE4]/90 font-medium">AI-DRIVEN DIGITAL GROWTH</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#F4BA00]" />
            </div>
            <span className="hidden sm:inline font-mono text-xs uppercase tracking-widest text-[#9AA3B2]/70">
              AXON·VORTEX SYSTEM 2.0
            </span>
          </div>

          {/* Core Headline: "Build Smarter. Market Better. Grow Faster." */}
          <div className="py-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-heading font-semibold tracking-tight uppercase leading-[1.02]">
              <span className="block overflow-hidden pb-1">
                <span className="hero-headline-line block text-[#3B82F6] drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  BUILD SMARTER.
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="hero-headline-line block text-[#EFECE4]">
                  MARKET BETTER.
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="hero-headline-line block text-[#F4BA00] drop-shadow-[0_0_20px_rgba(244,186,0,0.3)]">
                  GROW FASTER.
                </span>
              </span>
            </h1>

            {/* Subtitle with subtle edge indicator */}
            <p
              data-hero-paragraph
              className="mt-6 text-lg sm:text-xl font-heading font-medium text-[#EFECE4]/90 leading-snug border-l-2 border-[#3B82F6] pl-4"
            >
              {homeContent.hero.subtitle}
            </p>

            {/* Body Copy */}
            <div
              data-hero-paragraph
              className="mt-5 text-sm sm:text-base font-body text-[#9AA3B2] leading-relaxed max-w-xl space-y-3"
            >
              <p>
                AxonVortex helps businesses build, market and scale smarter by combining AI, human strategy, creativity, marketing, automation and data.
              </p>
              <p>
                From building your digital presence to generating leads, improving customer experiences and automating repetitive work, we create practical digital growth systems around your business goals.
              </p>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div data-hero-cta className="flex-1 sm:flex-initial">
                <TactileButton
                  variant="primary"
                  size="lg"
                  withArrow
                  asLink
                  href={homeContent.hero.primaryCta.href}
                  className="w-full justify-center min-h-[50px]"
                >
                  {homeContent.hero.primaryCta.label}
                </TactileButton>
              </div>

              <div data-hero-cta className="flex-1 sm:flex-initial">
                <TactileButton
                  variant="charcoal"
                  size="lg"
                  asLink
                  href="#solutions"
                  className="w-full justify-center min-h-[50px]"
                >
                  {homeContent.hero.secondaryCta.label}
                </TactileButton>
              </div>
            </div>

            {/* Domain Quick-Access Tags */}
            <div
              data-hero-paragraph
              className="mt-10 pt-6 border-t border-[#EFECE4]/[0.08] flex flex-wrap items-center gap-2"
            >
              <span className="text-xs font-mono text-[#9AA3B2]/70 mr-1">DOMAINS:</span>
              <Link
                href="/digital-marketing"
                className="px-3 py-1 rounded-[6px] bg-[#171a1e] border border-white/[0.06] hover:border-[#3B82F6]/50 text-xs font-medium text-[#EFECE4]/85 hover:text-[#3B82F6] transition-all shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04)]"
              >
                Marketing
              </Link>
              <Link
                href="/ai-automation"
                className="px-3 py-1 rounded-[6px] bg-[#171a1e] border border-white/[0.06] hover:border-[#3B82F6]/50 text-xs font-medium text-[#EFECE4]/85 hover:text-[#3B82F6] transition-all shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04)]"
              >
                AI & Automation
              </Link>
              <Link
                href="/websites-ecommerce"
                className="px-3 py-1 rounded-[6px] bg-[#171a1e] border border-white/[0.06] hover:border-[#3B82F6]/50 text-xs font-medium text-[#EFECE4]/85 hover:text-[#3B82F6] transition-all shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04)]"
              >
                Web & E-Commerce
              </Link>
              <Link
                href="/lead-generation"
                className="px-3 py-1 rounded-[6px] bg-[#171a1e] border border-white/[0.06] hover:border-[#3B82F6]/50 text-xs font-medium text-[#EFECE4]/85 hover:text-[#3B82F6] transition-all shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04)]"
              >
                Lead Generation
              </Link>
              <Link
                href="/technology-digital-transformation"
                className="px-3 py-1 rounded-[6px] bg-[#171a1e] border border-white/[0.06] hover:border-[#3B82F6]/50 text-xs font-medium text-[#EFECE4]/85 hover:text-[#3B82F6] transition-all shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04)]"
              >
                Technology
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side: Central 3D Dimensional Axon/Vortex Visual */}
        <div
          ref={visualRef}
          className="w-full lg:w-[46%] h-[420px] sm:h-[500px] lg:h-[560px] relative rounded-[20px] bg-[#1b1e22] border border-white/[0.08] shadow-[0_24px_64px_-8px_rgba(0,0,0,0.85),0_8px_20px_-4px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] overflow-hidden flex items-center justify-center"
        >
          {/* Top Panel Status Strip */}
          <div className="absolute top-4 left-5 right-5 z-10 flex items-center justify-between text-xs font-mono pointer-events-none">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-[4px] bg-[#101215]/80 border border-white/[0.04] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]">
              <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
              <span className="text-[#EFECE4]/90 font-medium">3D SPATIAL SYSTEM</span>
            </div>
            <span className="text-[#F4BA00] text-[11px] px-2 py-0.5 rounded-[4px] bg-[#101215]/80 border border-white/[0.04]">AXON·VORTEX ENGINE</span>
          </div>

          {/* Interactive 3D Canvas */}
          <div className="w-full h-full">
            <HeroCanvas />
          </div>

          {/* Bottom Coordinates & Node System Indicator */}
          <div className="absolute bottom-4 left-5 right-5 z-10 flex items-center justify-between text-[11px] font-mono text-[#9AA3B2]/70 pointer-events-none">
            <span className="px-2 py-0.5 rounded-[4px] bg-[#101215]/80 border border-white/[0.04]">[NODES: CONNECTED]</span>
            <span className="text-[#3B82F6] px-2 py-0.5 rounded-[4px] bg-[#101215]/80 border border-white/[0.04]">[ENERGY: OPTIMIZED]</span>
          </div>
        </div>
      </div>
    </section>
  );
}
