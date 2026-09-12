"use client";

import React, { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { ArrowRight, CornerDownRight, X, Check, Eye, Target, Compass, Sparkles, Layers } from "lucide-react";
import { BauhausBadge } from "@/components/ui/BauhausBadge";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { authorityData } from "@/data/content/authorityConversion";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { getGSAP } from "@/lib/gsap";

export default function AboutPageClient() {
  const {
    about,
    whyExists,
    beliefs,
    buildingInPublic,
    whatWeAreBuilding,
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
      // Subtle entrance animations
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
      className="w-full bg-brand-white text-brand-black selection:bg-brand-red selection:text-white overflow-x-clip"
    >
      {/* 0. TOP SPEC BAR */}
      <div className="w-full border-b-2 border-brand-black bg-brand-gray/50 px-6 md:px-12 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase">
          <div className="flex items-center gap-2 text-brand-black/70">
            <Link href="/" className="hover:text-brand-red font-bold transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-brand-red font-black">About &amp; Manifesto</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-brand-red animate-pulse" />
            <span className="font-bold text-brand-black tracking-wider">AGENCY FROM ZERO // MANIFESTO</span>
          </div>
        </div>
      </div>

      {/* 1. HERO - Editorial Opening */}
      <section
        ref={heroRef}
        className="relative pt-16 md:pt-24 pb-20 px-6 md:px-12 border-b-2 border-brand-black bg-brand-white"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div data-anim="about-hero" className="flex flex-wrap items-center gap-3">
              <BauhausBadge variant="red" shape="square">
                {about.badge}
              </BauhausBadge>
              <BauhausBadge variant="yellow" shape="pill">
                {about.title}
              </BauhausBadge>
              <span className="font-mono text-xs text-brand-black/60 font-bold uppercase tracking-widest">
                ZERO BULLSHIT // REAL SYSTEMS
              </span>
            </div>

            <h1 data-anim="about-hero" className="text-4xl sm:text-6xl md:text-7xl font-display font-black uppercase tracking-tighter leading-[0.92] text-brand-black">
              {about.headlinePrimary} <br />
              <span className="text-brand-red">{about.headlineSecondary}</span>
            </h1>

            <div data-anim="about-hero" className="flex flex-col gap-4 text-lg md:text-xl font-body text-brand-black/80 max-w-3xl leading-relaxed border-l-4 border-brand-red pl-6 py-2 bg-brand-gray/30">
              <p>{about.beliefParagraph1}</p>
              <p className="font-display font-black text-brand-black text-xl md:text-2xl">
                &ldquo;{about.beliefParagraph2}&rdquo;
              </p>
            </div>

            <div data-anim="about-hero" className="flex flex-wrap items-center gap-4 pt-4">
              <Button
                variant="primary"
                size="lg"
                className="bg-brand-red text-white hover:bg-brand-black text-base px-8 py-4"
                asLink
                href="/contact"
              >
                Start Your Growth Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-2 border-brand-black text-brand-black hover:bg-brand-yellow text-base px-6 py-4"
                asLink
                href="/growth-audit"
              >
                Request Growth Audit
              </Button>
            </div>
          </div>

          {/* Right Column: Bauhaus Intersection Plate */}
          <div data-anim="about-hero" className="lg:col-span-4 flex flex-col">
            <div className="border-2 border-brand-black bg-brand-gray p-6 sm:p-8 shadow-hard-lg flex flex-col gap-6">
              <div className="border-b-2 border-brand-black pb-4">
                <span className="font-mono text-xs font-black uppercase tracking-widest text-brand-black/60 block mb-1">
                  CORE INTERSECTION
                </span>
                <p className="text-xs font-sans text-brand-black/80 leading-relaxed">
                  {about.intersectionLabel}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {about.intersections.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-brand-white border-2 border-brand-black font-mono text-xs font-black uppercase text-brand-black flex items-center justify-between shadow-hard-sm"
                  >
                    <span>{item}</span>
                    <span className="w-2 h-2 bg-brand-red" />
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t-2 border-brand-black">
                <span className="font-mono text-[11px] text-brand-black/70 block leading-tight">
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
        className="py-20 md:py-28 px-6 md:px-12 bg-brand-gray border-b-2 border-brand-black"
      >
        <ScrollReveal variant="fade-up" className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-5 flex flex-col gap-6 sticky top-24">
            <div className="flex items-center gap-2">
              <BauhausBadge variant="yellow" shape="square">
                {whyExists.badge}
              </BauhausBadge>
              <span className="font-mono text-xs uppercase font-bold tracking-widest text-brand-black/60">
                THE DIGITAL TOOL DILEMMA
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-brand-black leading-tight">
              {whyExists.title}
            </h2>

            <div className="p-6 bg-brand-white border-2 border-brand-black shadow-hard-md">
              <p className="text-lg font-display font-black text-brand-red uppercase">
                {whyExists.contrastStatement}
              </p>
              <p className="text-sm font-sans text-brand-black/80 mt-3">
                {whyExists.conclusion}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* The "More" Inventory */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-black/60">
                The Reality of Modern Business
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {whyExists.moreStatements.map((stmt, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-brand-white border-2 border-brand-black font-display font-bold text-xs uppercase text-brand-black shadow-hard-sm"
                  >
                    + {stmt.replace("Businesses have ", "")}
                  </div>
                ))}
              </div>
            </div>

            {/* The 5 Critical Questions */}
            <div className="p-8 bg-brand-white border-2 border-brand-black shadow-hard-md flex flex-col gap-6">
              <div className="flex items-center justify-between border-b-2 border-brand-black pb-3">
                <span className="font-mono text-xs font-black uppercase text-brand-black">
                  {whyExists.challengeIntro}
                </span>
                <span className="font-mono text-xs text-brand-red font-black">5 ESSENTIAL CHECKS</span>
              </div>

              <div className="flex flex-col gap-3">
                {whyExists.questions.map((q, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-brand-gray border border-brand-black flex items-center justify-between font-display font-black text-sm uppercase text-brand-black"
                  >
                    <span>{q}</span>
                    <span className="font-mono text-xs text-brand-red">0{idx + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </ScrollReveal>
      </section>

      {/* 3. WHAT WE BELIEVE (CORE CONVICTIONS) */}
      <section
        ref={beliefsRef}
        className="py-20 md:py-28 px-6 md:px-12 bg-brand-white border-b-2 border-brand-black"
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          <ScrollReveal variant="fade-up" className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-brand-black pb-8">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <BauhausBadge variant="yellow" shape="square">
                  {beliefs.badge}
                </BauhausBadge>
                <span className="font-mono text-xs uppercase font-bold tracking-widest text-brand-black/60">
                  PHILOSOPHICAL FOUNDATIONS
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-brand-black">
                {beliefs.title}
              </h2>
            </div>
            <span className="font-mono text-xs uppercase font-bold text-brand-black/60">
              4 Structural Pillars
            </span>
          </ScrollReveal>

          <ScrollReveal variant="stagger" className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {beliefs.groups.map((group, idx) => (
              <div
                key={idx}
                data-stagger-item
                className="p-8 border-2 border-brand-black bg-brand-white shadow-hard-md flex flex-col justify-between"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b-2 border-brand-black pb-3">
                    <span className="font-mono text-xs font-black px-2 py-1 bg-brand-yellow text-brand-black border border-brand-black">
                      BELIEF 0{idx + 1}
                    </span>
                    <span className="w-2.5 h-2.5 bg-brand-black" />
                  </div>

                  <h3 className="text-2xl font-display font-black uppercase text-brand-black">
                    {group.title}
                  </h3>

                  {group.subtitle && (
                    <p className="text-sm font-display font-bold uppercase text-brand-red">
                      {group.subtitle}
                    </p>
                  )}

                  {group.intro && (
                    <p className="text-xs font-mono uppercase text-brand-black/60 font-bold">
                      {group.intro}
                    </p>
                  )}

                  {group.items && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                      {group.items.map((item, i) => (
                        <div
                          key={i}
                          className="p-2.5 bg-brand-gray/60 border border-brand-black/20 text-xs font-sans text-brand-black font-medium flex items-center gap-2"
                        >
                          <Check className="w-3.5 h-3.5 text-brand-red shrink-0" />
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
                          className="text-xs sm:text-sm font-sans text-brand-black/80 font-medium border-l-2 border-brand-red pl-3"
                        >
                          {stmt}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </ScrollReveal>

        </div>
      </section>

      {/* 4. BUILDING IN PUBLIC (RADICAL TRANSPARENCY) */}
      <section
        ref={publicRef}
        className="py-20 md:py-28 px-6 md:px-12 bg-brand-slate text-white border-b-2 border-brand-black"
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          <ScrollReveal variant="fade-up" className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-white/20 pb-8">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <BauhausBadge variant="red" shape="square">
                  {buildingInPublic.badge}
                </BauhausBadge>
                <span className="font-mono text-xs uppercase font-bold tracking-widest text-brand-gray">
                  HONEST ENGINEERING
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white">
                {buildingInPublic.title}
              </h2>
            </div>
            <div className="font-mono text-xs text-brand-yellow font-bold uppercase">
              {buildingInPublic.statement}
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Narrative */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <p className="text-xl sm:text-2xl font-display font-black text-white uppercase leading-snug">
                {buildingInPublic.opening}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {buildingInPublic.verbs.map((verb, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-white/10 border border-white/20 font-mono text-xs uppercase font-bold text-brand-yellow"
                  >
                    {verb}
                  </span>
                ))}
              </div>

              <div className="p-6 bg-white/5 border border-white/20 mt-4">
                <p className="font-display font-black text-lg uppercase text-white">
                  &ldquo;{buildingInPublic.closing}&rdquo;
                </p>
              </div>
            </div>

            {/* Right: What We Share */}
            <div className="lg:col-span-7 border-2 border-white/30 bg-white/5 p-8 flex flex-col gap-6">
              <span className="font-mono text-xs font-black uppercase tracking-widest text-brand-yellow">
                {buildingInPublic.shareLabel}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {buildingInPublic.shareItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-white/10 border border-white/10 font-mono text-xs uppercase text-white flex items-center gap-3"
                  >
                    <span className="w-2 h-2 bg-brand-red shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </ScrollReveal>

        </div>
      </section>

      {/* 5. WHAT WE REJECT VS WHAT WE EMBRACE */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-brand-white border-b-2 border-brand-black">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          <ScrollReveal variant="fade-up" className="flex flex-col gap-3 max-w-2xl border-b-2 border-brand-black pb-8">
            <div className="flex items-center gap-2">
              <BauhausBadge variant="blue" shape="square">
                CODE OF INTEGRITY
              </BauhausBadge>
              <span className="font-mono text-xs uppercase font-bold tracking-widest text-brand-black/60">
                DISCRIMINATION MATRIX
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-brand-black">
              Convictions Over Compromise
            </h2>
          </ScrollReveal>

          <ScrollReveal variant="stagger" className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* What We Don't Believe In */}
            <div data-stagger-item className="p-8 border-2 border-brand-black bg-brand-gray shadow-hard-md flex flex-col gap-6">
              <div className="flex items-center justify-between border-b-2 border-brand-black pb-4">
                <span className="font-display font-black text-2xl uppercase text-brand-black">
                  {whatWeDontBelieveIn.title}
                </span>
                <span className="font-mono text-xs font-black px-2 py-1 bg-brand-red text-white">
                  REJECTED
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {whatWeDontBelieveIn.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-brand-white border border-brand-black flex items-center gap-3 font-sans text-sm text-brand-black/90 font-medium"
                  >
                    <X className="w-4 h-4 text-brand-red shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What We Do Believe In */}
            <div data-stagger-item className="p-8 border-2 border-brand-black bg-brand-yellow/20 shadow-hard-md flex flex-col gap-6">
              <div className="flex items-center justify-between border-b-2 border-brand-black pb-4">
                <span className="font-display font-black text-2xl uppercase text-brand-black">
                  {whatWeDoBelieveIn.title}
                </span>
                <span className="font-mono text-xs font-black px-2 py-1 bg-brand-yellow text-brand-black border border-brand-black">
                  EMBRACED
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {whatWeDoBelieveIn.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-brand-white border border-brand-black flex items-center gap-3 font-sans text-sm text-brand-black font-bold"
                  >
                    <Check className="w-4 h-4 text-brand-blue shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </ScrollReveal>

        </div>
      </section>

      {/* 6. FINAL HIGH-IMPACT CTA */}
      <section className="py-24 px-6 md:px-12 bg-brand-red text-white border-b-2 border-brand-black">
        <ScrollReveal variant="fade-up" className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="inline-block px-4 py-1.5 bg-brand-white text-brand-black border-2 border-brand-black font-mono text-xs font-black uppercase mb-8 shadow-hard-sm">
            BUILD SMARTER
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black uppercase tracking-tighter text-white mb-8 max-w-3xl leading-[0.95]">
            {whatWeDoBelieveIn.ctaHeadline}
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              className="bg-brand-black text-white hover:bg-brand-white hover:text-brand-black text-lg px-10 py-5 border-2 border-brand-black shadow-hard-md"
              asLink
              href={whatWeDoBelieveIn.cta.href}
            >
              {whatWeDoBelieveIn.cta.label}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-brand-black text-lg px-8 py-5"
              asLink
              href="/growth-audit"
            >
              Request Growth Audit
            </Button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
