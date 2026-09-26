"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { homeContent } from "@/data/content/home";
import { TactileButton } from "@/components/ui/TactileButton";
import { LivingSynapseVisual } from "@/components/patterns/LivingSynapseVisual";
import { getGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function HomeHero() {
  const { hero } = homeContent;
  const heroRef = useRef<HTMLElement>(null);
  const glow1Ref = useRef<HTMLDivElement>(null);
  const glow2Ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !heroRef.current) return;

    const { gsap } = getGSAP();
    const el = heroRef.current;

    const ctx = gsap.context(() => {
      const eyebrow = el.querySelector(".hero-eyebrow");
      const titleLines = el.querySelectorAll(".hero-title-line");
      const subtitle = el.querySelector(".hero-subtitle");
      const desc = el.querySelector(".hero-desc");
      const ctas = el.querySelector(".hero-ctas");
      const domains = el.querySelector(".hero-domains");
      const synapse = el.querySelector(".hero-synapse");

      // 1. Cinematic entrance sequence
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (eyebrow) {
        tl.fromTo(eyebrow, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.6 }, 0);
      }

      if (titleLines.length > 0) {
        tl.fromTo(
          titleLines,
          { y: "115%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 0.85, stagger: 0.12, clearProps: "transform,opacity" },
          0.15
        );
      }

      if (subtitle) {
        tl.fromTo(subtitle, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.7 }, 0.45);
      }

      if (desc) {
        tl.fromTo(desc, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.65 }, 0.55);
      }

      if (ctas) {
        tl.fromTo(ctas, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.65);
      }

      if (domains) {
        tl.fromTo(domains, { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.7 }, 0.5);
      }

      if (synapse) {
        tl.fromTo(synapse, { opacity: 0, scale: 0.95, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 1.0 }, 0.4);
      }

      // 2. Subtle pointer-ambient lighting on desktop
      const handlePointerMove = (e: MouseEvent) => {
        if (!glow1Ref.current || !glow2Ref.current) return;
        const { clientX, clientY } = e;
        const xOffset = (clientX / window.innerWidth - 0.5) * 40;
        const yOffset = (clientY / window.innerHeight - 0.5) * 40;

        gsap.to(glow1Ref.current, {
          x: xOffset,
          y: yOffset,
          duration: 1.8,
          ease: "power2.out",
        });

        gsap.to(glow2Ref.current, {
          x: -xOffset * 0.8,
          y: -yOffset * 0.8,
          duration: 2.2,
          ease: "power2.out",
        });
      };

      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      return () => window.removeEventListener("pointermove", handlePointerMove);
    }, heroRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={heroRef}
      data-motion-signature="masked-hero-depth"
      className="relative w-full bg-[#121519] text-[#EFECE4] overflow-x-clip border-b border-[#EFECE4]/[0.08] pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-24 opacity-100"
    >
      {/* Background Radial Glow Spotlights with subtle pointer tracking */}
      <div
        ref={glow1Ref}
        aria-hidden="true"
        className="pointer-events-none absolute top-10 left-1/4 w-[600px] h-[500px] bg-[#3B82F6]/[0.07] rounded-full blur-[160px] will-change-transform"
      />
      <div
        ref={glow2Ref}
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 right-1/4 w-[500px] h-[400px] bg-[#F4BA00]/[0.05] rounded-full blur-[150px] will-change-transform"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col gap-12 sm:gap-16 relative z-10">
        {/* Top: Confident Editorial Title Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-4">
          <div className="max-w-3xl flex flex-col gap-5">
            {/* Live Telemetry Eyebrow */}
            <div className="hero-eyebrow flex items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e22] border border-[#3B82F6]/30 text-xs font-mono tracking-wider shadow-box-sm">
                <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
                <span className="text-[#EFECE4] font-medium">AXON·VORTEX // LIVING GROWTH SYSTEM</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#F4BA00]" />
              </div>
              <span className="hidden sm:inline font-mono text-xs uppercase tracking-widest text-[#9AA3B2]/70">
                SYSTEM 2.0
              </span>
            </div>

            {/* Core Headline with Line-by-Line Masking */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-semibold tracking-tight uppercase leading-[1.02] text-[#EFECE4]">
              <span className="block overflow-hidden pb-1 -mb-1">
                <span className="hero-title-line block will-change-[transform,opacity]">
                  Build Smarter.
                </span>
              </span>
              <span className="block overflow-hidden pb-1 -mb-1 text-[#3B82F6]">
                <span className="hero-title-line block will-change-[transform,opacity]">
                  Market Better.
                </span>
              </span>
              <span className="block overflow-hidden pb-1 -mb-1 text-[#F4BA00]">
                <span className="hero-title-line block will-change-[transform,opacity]">
                  Grow Faster.
                </span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle text-lg sm:text-xl font-heading font-medium text-[#EFECE4]/90 leading-snug border-l-2 border-[#3B82F6] pl-4 mt-2">
              {hero.subtitle}
            </p>

            {/* Thesis description */}
            <p className="hero-desc text-sm sm:text-base font-body text-[#9AA3B2] leading-relaxed max-w-2xl">
              {hero.description}
            </p>

            {/* Dual CTAs */}
            <div className="hero-ctas flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <TactileButton
                variant="primary"
                size="lg"
                withArrow
                asLink
                href={hero.primaryCta.href}
                className="justify-center min-h-[50px]"
              >
                {hero.primaryCta.label}
              </TactileButton>

              <TactileButton
                variant="charcoal"
                size="lg"
                asLink
                href="#solutions"
                className="justify-center min-h-[50px]"
              >
                {hero.secondaryCta.label}
              </TactileButton>
            </div>
          </div>

          {/* Quick Domain Directory Navigation */}
          <div className="hero-domains flex flex-col gap-3 font-mono text-xs text-[#9AA3B2] max-w-sm lg:text-right">
            <span className="uppercase tracking-widest text-[#9AA3B2]/70">
              SIX CONNECTED DOMAINS:
            </span>
            <div className="flex flex-wrap lg:justify-end gap-2">
              <Link
                href="/digital-marketing"
                className="px-3 py-1.5 rounded-full bg-[#141619] border border-white/[0.06] shadow-box-sm hover:shadow-box-hover box-interactive hover:border-[#3B82F6]/50 text-xs text-[#EFECE4] hover:text-[#3B82F6] transition-colors"
              >
                Marketing
              </Link>
              <Link
                href="/ai-automation"
                className="px-3 py-1.5 rounded-full bg-[#141619] border border-white/[0.06] shadow-box-sm hover:shadow-box-hover box-interactive hover:border-[#3B82F6]/50 text-xs text-[#EFECE4] hover:text-[#3B82F6] transition-colors"
              >
                AI &amp; Automation
              </Link>
              <Link
                href="/websites-ecommerce"
                className="px-3 py-1.5 rounded-full bg-[#141619] border border-white/[0.06] shadow-box-sm hover:shadow-box-hover box-interactive hover:border-[#3B82F6]/50 text-xs text-[#EFECE4] hover:text-[#3B82F6] transition-colors"
              >
                Web &amp; E-Commerce
              </Link>
              <Link
                href="/lead-generation"
                className="px-3 py-1.5 rounded-full bg-[#141619] border border-white/[0.06] shadow-box-sm hover:shadow-box-hover box-interactive hover:border-[#3B82F6]/50 text-xs text-[#EFECE4] hover:text-[#3B82F6] transition-colors"
              >
                Lead Generation
              </Link>
              <Link
                href="/technology-digital-transformation"
                className="px-3 py-1.5 rounded-full bg-[#141619] border border-white/[0.06] shadow-box-sm hover:shadow-box-hover box-interactive hover:border-[#3B82F6]/50 text-xs text-[#EFECE4] hover:text-[#3B82F6] transition-colors"
              >
                Technology
              </Link>
            </div>
          </div>
        </div>

        {/* Signature Interactive System Synapse Visual */}
        <div className="hero-synapse">
          <LivingSynapseVisual />
        </div>
      </div>
    </section>
  );
}
