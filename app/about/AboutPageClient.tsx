"use client";

import React, { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { ArrowRight, X, Check } from "lucide-react";
import { authorityData } from "@/data/content/authorityConversion";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { getGSAP } from "@/lib/gsap";
import { DimensionalButton } from "@/components/ui/DimensionalButton";
import { DimensionalCard } from "@/components/ui/DimensionalCard";

export default function AboutPageClient() {
  const {
    about,
    whyExists,
    beliefs,
    buildingInPublic,
    whatWeDontBelieveIn,
    whatWeDoBelieveIn,
  } = authorityData;

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const originsRef = useRef<HTMLElement>(null);
  const beliefsRef = useRef<HTMLElement>(null);
  const publicRef = useRef<HTMLElement>(null);

  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const { gsap } = getGSAP();
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll("[data-anim='about-hero']"),
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
            clearProps: "transform,opacity",
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="w-full bg-[#141619] text-[#EFECE4] selection:bg-[#3B82F6] selection:text-white overflow-x-clip"
    >
      {/* 0. TOP SPEC BAR */}
      <div className="w-full border-b border-white/[0.08] bg-[#101215] px-6 md:px-12 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-wider">
          <div className="flex items-center gap-2 text-[#9AA3B2]">
            <Link href="/" className="hover:text-[#3B82F6] font-medium transition-colors">
              Home
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-[#3B82F6] font-semibold">About &amp; Manifesto</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6] animate-pulse" />
            <span className="font-semibold text-[#EFECE4] tracking-widest text-[11px]">
              AGENCY FROM ZERO // MANIFESTO
            </span>
          </div>
        </div>
      </div>

      {/* 1. HERO - Editorial Opening */}
      <section
        ref={heroRef}
        className="relative pt-20 md:pt-28 pb-20 px-6 md:px-12 border-b border-white/[0.08] bg-[#141619]"
      >
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[300px] bg-[#3B82F6]/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div data-anim="about-hero" className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#93C5FD]">
                {about.badge}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-[#F4BA00]/15 border border-[#F4BA00]/30 text-[#FDE68A]">
                {about.title}
              </span>
              <span className="font-mono text-xs text-[#9AA3B2] uppercase tracking-widest">
                ZERO BULLSHIT // REAL SYSTEMS
              </span>
            </div>

            <h1 data-anim="about-hero" className="text-4xl sm:text-6xl md:text-7xl font-heading font-semibold tracking-tight leading-[1.05] text-[#EFECE4]">
              {about.headlinePrimary} <br />
              <span className="text-[#3B82F6] drop-shadow-[0_0_24px_rgba(59,130,246,0.3)]">
                {about.headlineSecondary}
              </span>
            </h1>

            <div data-anim="about-hero" className="flex flex-col gap-4 text-base md:text-lg font-body text-[#9AA3B2] max-w-3xl leading-relaxed border-l-2 border-[#3B82F6] pl-6 py-2 bg-[#1b1e22] rounded-r-xl">
              <p>{about.beliefParagraph1}</p>
              <p className="font-heading font-semibold text-[#EFECE4] text-lg md:text-xl">
                &ldquo;{about.beliefParagraph2}&rdquo;
              </p>
            </div>

            <div data-anim="about-hero" className="flex flex-wrap items-center gap-4 pt-4">
              <DimensionalButton
                variant="amber"
                size="lg"
                asLink
                href="/contact"
              >
                Start Your Growth Journey
                <ArrowRight className="ml-2 w-4 h-4" />
              </DimensionalButton>

              <DimensionalButton
                variant="outline"
                size="lg"
                asLink
                href="/growth-audit"
              >
                Request Growth Audit
              </DimensionalButton>
            </div>
          </div>

          {/* Right Column: Intersection Plate */}
          <div data-anim="about-hero" className="lg:col-span-4 flex flex-col">
            <div className="rounded-2xl border border-white/[0.08] bg-[#1b1e22] p-6 sm:p-8 shadow-[0_16px_38px_-6px_rgba(0,0,0,0.72),0_6px_14px_-3px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col gap-6">
              <div className="border-b border-white/10 pb-4">
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#9AA3B2] block mb-1">
                  CORE INTERSECTION
                </span>
                <p className="text-xs font-body text-[#9AA3B2] leading-relaxed">
                  {about.intersectionLabel}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {about.intersections.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#101215] border border-white/[0.04] font-mono text-xs font-semibold text-[#EFECE4] flex items-center justify-between shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
                  >
                    <span>{item}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-white/10">
                <span className="font-mono text-[11px] text-[#9AA3B2] block leading-relaxed">
                  A multi-domain engineering discipline designed to eliminate disconnected digital friction.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY AXONVORTEX EXISTS (ORIGIN & PURPOSE) */}
      <section
        ref={originsRef}
        className="py-20 md:py-28 px-6 md:px-12 bg-[#141619] border-b border-white/[0.08] relative"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 flex flex-col gap-6 sticky top-28">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#F4BA00]/15 border border-[#F4BA00]/30 text-[#FDE68A]">
                {whyExists.badge}
              </span>
              <span className="font-mono text-xs uppercase font-medium tracking-widest text-[#9AA3B2]">
                THE DIGITAL TOOL DILEMMA
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold tracking-tight text-[#EFECE4] leading-tight">
              {whyExists.title}
            </h2>

            <div className="p-6 rounded-2xl bg-[#1b1e22] border border-[#F4BA00]/30 shadow-[0_12px_28px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)]">
              <p className="text-base font-heading font-semibold text-[#F4BA00]">
                {whyExists.contrastStatement}
              </p>
              <p className="text-xs sm:text-sm font-body text-[#9AA3B2] mt-3 leading-relaxed">
                {whyExists.conclusion}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* The "More" Inventory */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs font-medium uppercase tracking-widest text-[#9AA3B2]">
                The Reality of Modern Business
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {whyExists.moreStatements.map((stmt, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#101215] border border-white/[0.04] font-heading font-medium text-xs text-[#EFECE4] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
                  >
                    + {stmt.replace("Businesses have ", "")}
                  </div>
                ))}
              </div>
            </div>

            {/* The 5 Critical Questions */}
            <div className="p-7 rounded-2xl bg-[#1b1e22] border border-white/[0.08] shadow-[0_16px_38px_-6px_rgba(0,0,0,0.72),inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col gap-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-mono text-xs font-semibold uppercase text-[#EFECE4]">
                  {whyExists.challengeIntro}
                </span>
                <span className="font-mono text-xs text-[#3B82F6] font-semibold">5 ESSENTIAL CHECKS</span>
              </div>

              <div className="flex flex-col gap-2.5">
                {whyExists.questions.map((q, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#101215] border border-white/[0.04] flex items-center justify-between font-heading font-medium text-xs sm:text-sm text-[#EFECE4] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
                  >
                    <span>{q}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT WE BELIEVE (CORE CONVICTIONS) */}
      <section
        ref={beliefsRef}
        className="py-20 md:py-28 px-6 md:px-12 bg-[#121519] border-b border-white/[0.08] relative"
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#F4BA00]/15 border border-[#F4BA00]/30 text-[#FDE68A]">
                  {beliefs.badge}
                </span>
                <span className="font-mono text-xs uppercase font-medium tracking-widest text-[#9AA3B2]">
                  PHILOSOPHICAL FOUNDATIONS
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold tracking-tight text-[#EFECE4]">
                {beliefs.title}
              </h2>
            </div>
            <span className="font-mono text-xs uppercase font-medium text-[#9AA3B2]">
              4 Structural Pillars
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {beliefs.groups.map((group, idx) => (
              <DimensionalCard
                key={idx}
                elevation="level2"
                glowColor={idx % 2 === 0 ? "blue" : "amber"}
                className="p-7 flex flex-col justify-between"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#101215] text-[#93C5FD] border border-[#3B82F6]/30 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#F4BA00]" />
                  </div>

                  <h3 className="text-xl font-heading font-semibold text-[#EFECE4]">
                    {group.title}
                  </h3>

                  {group.subtitle && (
                    <p className="text-xs sm:text-sm font-heading font-medium text-[#F4BA00]">
                      {group.subtitle}
                    </p>
                  )}

                  {group.intro && (
                    <p className="text-xs font-mono uppercase text-[#9AA3B2]">
                      {group.intro}
                    </p>
                  )}

                  {group.items && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                      {group.items.map((item, i) => (
                        <div
                          key={i}
                          className="p-2.5 rounded-lg bg-[#101215] border border-white/[0.04] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] text-xs font-body text-[#EFECE4] flex items-center gap-2"
                        >
                          <Check className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {group.statements && (
                    <div className="flex flex-col gap-2 pt-2">
                      {group.statements.map((stmt, i) => (
                        <p
                          key={i}
                          className="text-xs sm:text-sm font-body text-[#9AA3B2] border-l-2 border-[#3B82F6] pl-3 leading-relaxed"
                        >
                          {stmt}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </DimensionalCard>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BUILDING IN PUBLIC (RADICAL TRANSPARENCY) */}
      <section
        ref={publicRef}
        className="py-20 md:py-28 px-6 md:px-12 bg-[#141619] border-b border-white/[0.08] relative"
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#93C5FD]">
                  {buildingInPublic.badge}
                </span>
                <span className="font-mono text-xs uppercase font-medium tracking-widest text-[#9AA3B2]">
                  HONEST ENGINEERING
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold tracking-tight text-[#EFECE4]">
                {buildingInPublic.title}
              </h2>
            </div>
            <div className="font-mono text-xs text-[#F4BA00] font-semibold uppercase">
              {buildingInPublic.statement}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Narrative */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <p className="text-lg sm:text-xl font-heading font-medium text-[#EFECE4] leading-snug">
                {buildingInPublic.opening}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {buildingInPublic.verbs.map((verb, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-full bg-[#101215] border border-white/[0.06] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] font-mono text-xs uppercase font-medium text-[#F4BA00]"
                  >
                    {verb}
                  </span>
                ))}
              </div>

              <div className="p-6 rounded-2xl bg-[#1b1e22] border border-white/[0.08] shadow-[0_12px_28px_-4px_rgba(0,0,0,0.72),inset_0_1px_0_rgba(255,255,255,0.08)] mt-4">
                <p className="font-heading font-medium text-base text-[#EFECE4]">
                  &ldquo;{buildingInPublic.closing}&rdquo;
                </p>
              </div>
            </div>

            {/* Right: What We Share (Outer Raised Container with Inner Recessed Boxes) */}
            <div className="lg:col-span-7 rounded-2xl border border-white/[0.08] bg-[#1b1e22] p-8 flex flex-col gap-6 shadow-[0_16px_36px_-6px_rgba(0,0,0,0.72),0_6px_14px_-3px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)]">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#F4BA00]">
                {buildingInPublic.shareLabel}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {buildingInPublic.shareItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_4px_rgba(0,0,0,0.78),0_1px_0_rgba(255,255,255,0.035)] font-mono text-xs text-[#EFECE4] flex items-center gap-3"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#3B82F6] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHAT WE REJECT VS WHAT WE EMBRACE */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-[#121519] border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col gap-3 max-w-2xl border-b border-white/[0.08] pb-8">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#93C5FD]">
                CODE OF INTEGRITY
              </span>
              <span className="font-mono text-xs uppercase font-medium tracking-widest text-[#9AA3B2]">
                DISCRIMINATION MATRIX
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold tracking-tight text-[#EFECE4]">
              Convictions Over Compromise
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* What We Don't Believe In (Outer Raised with Inner Recessed Items) */}
            <div className="p-8 rounded-2xl border border-white/[0.08] bg-[#1b1e22] shadow-[0_16px_36px_-6px_rgba(0,0,0,0.72),0_6px_14px_-3px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                <span className="font-heading font-semibold text-xl text-[#EFECE4]">
                  {whatWeDontBelieveIn.title}
                </span>
                <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-red-500/20 text-red-300 border border-red-500/30">
                  REJECTED
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {whatWeDontBelieveIn.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_4px_rgba(0,0,0,0.78),0_1px_0_rgba(255,255,255,0.035)] flex items-center gap-3 font-body text-xs sm:text-sm text-[#9AA3B2]"
                  >
                    <X className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What We Do Believe In (Outer Raised with Inner Recessed Items) */}
            <div className="p-8 rounded-2xl border border-white/[0.08] bg-[#1b1e22] shadow-[0_16px_36px_-6px_rgba(0,0,0,0.72),0_6px_14px_-3px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                <span className="font-heading font-semibold text-xl text-[#EFECE4]">
                  {whatWeDoBelieveIn.title}
                </span>
                <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-[#3B82F6]/20 text-[#93C5FD] border border-[#3B82F6]/30">
                  EMBRACED
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {whatWeDoBelieveIn.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_4px_rgba(0,0,0,0.78),0_1px_0_rgba(255,255,255,0.035)] flex items-center gap-3 font-body text-xs sm:text-sm text-[#EFECE4] font-medium"
                  >
                    <Check className="w-4 h-4 text-[#3B82F6] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL HIGH-IMPACT CTA */}
      <section className="py-24 px-6 md:px-12 bg-[#141619] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[600px] h-[350px] bg-[#F4BA00]/10 blur-[140px] rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto text-center flex flex-col items-center relative z-10">
          <div className="inline-block px-3.5 py-1 rounded-full bg-[#F4BA00]/15 border border-[#F4BA00]/30 font-mono text-xs font-semibold uppercase text-[#FDE68A] mb-8">
            BUILD SMARTER
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-semibold tracking-tight text-[#EFECE4] mb-8 max-w-3xl leading-[1.05]">
            {whatWeDoBelieveIn.ctaHeadline}
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <DimensionalButton
              variant="amber"
              size="lg"
              asLink
              href={whatWeDoBelieveIn.cta.href}
            >
              {whatWeDoBelieveIn.cta.label}
              <ArrowRight className="ml-2 w-4 h-4" />
            </DimensionalButton>

            <DimensionalButton
              variant="outline"
              size="lg"
              asLink
              href="/growth-audit"
            >
              Request Growth Audit
            </DimensionalButton>
          </div>
        </div>
      </section>
    </div>
  );
}
