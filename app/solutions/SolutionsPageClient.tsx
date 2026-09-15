"use client";

import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, CheckSquare, Network } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BauhausBadge } from "@/components/ui/BauhausBadge";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { solutionsData } from "@/data/content/solutions";
import { getGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

const DOMAIN_VISUALS: Record<string, string> = {
  "digital-marketing": "/images/bauhaus-diagram-marketing.png",
  "ai-automation": "/images/bauhaus-diagram-ai.png",
  "websites-ecommerce": "/images/bauhaus-diagram-ecommerce.jpg",
  "lead-generation": "/images/bauhaus-diagram-leadgen.jpg",
  "technology-digital-transformation": "/images/bauhaus-diagram-technology.jpg",
};

export default function SolutionsPageClient() {
  const { hero, growthSystem, solutions, problemMatcher, connectedGrowth, finalCta } = solutionsData;
  const [activeDomainIndex, setActiveDomainIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const connectedNodesRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Hero entrance animation
  useLayoutEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;
    const { gsap } = getGSAP();

    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll("[data-anim='solutions-hero']"),
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

  // Center-outward capability node stagger in Connected Growth architecture
  useEffect(() => {
    if (prefersReducedMotion || !connectedNodesRef.current) return;
    const { gsap } = getGSAP();
    const cards = connectedNodesRef.current.querySelectorAll<HTMLElement>("[data-node-card]");
    if (cards.length >= 6) {
      // 3-column grid center: index 1 and 4, then outer nodes 0, 2, 3, 5
      const centerNodes = [cards[1], cards[4]];
      const outerNodes = [cards[0], cards[2], cards[3], cards[5]];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: connectedNodesRef.current,
          start: "top 82%",
          once: true,
        },
      });

      tl.fromTo(
        centerNodes,
        { opacity: 0, scale: 0.94, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          clearProps: "transform,opacity",
        }
      ).fromTo(
        outerNodes,
        { opacity: 0, scale: 0.94, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          clearProps: "transform,opacity",
        },
        "-=0.25"
      );
    }
  }, [prefersReducedMotion]);

  // IntersectionObserver to synchronize the sticky domain index with the active capability section
  useEffect(() => {
    const domainElements = solutions.map((d) => document.getElementById(`domain-${d.id}`));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = domainElements.findIndex((el) => el === entry.target);
            if (index !== -1) {
              setActiveDomainIndex(index);
            }
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" }
    );

    domainElements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [solutions]);

  const scrollToDomain = (id: string, idx: number) => {
    setActiveDomainIndex(idx);
    const element = document.getElementById(`domain-${id}`);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="w-full bg-white text-[#090909] overflow-x-clip">
      {/* 1. HERO - Editorial Bauhaus Opening */}
      <section ref={heroRef} className="relative w-full bg-[#E9EDF2] border-b-4 border-[#090909] py-16 sm:py-24 px-6 sm:px-12 lg:px-16">
        <div className="max-w-[1560px] mx-auto flex flex-col justify-between gap-10">
          <div data-anim="solutions-hero" className="flex flex-wrap items-center gap-3">
            <BauhausBadge variant="red" shape="square" size="sm">
              {hero.badge}
            </BauhausBadge>
            <span className="font-mono text-xs uppercase tracking-widest text-[#090909]/60 font-bold">
              CONNECTED ARCHITECTURE
            </span>
          </div>

          <div data-anim="solutions-hero" className="max-w-4xl">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-heading font-bold tracking-[0.015em] uppercase leading-[0.95] text-[#090909]">
              DIGITAL SOLUTIONS BUILT AROUND YOUR GROWTH.
            </h1>
            <p className="mt-6 text-xl sm:text-2xl font-heading font-bold text-[#2F5FA7] leading-snug">
              {hero.intro}
            </p>
          </div>

          <div data-anim="solutions-hero" className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t-4 border-[#090909] max-w-4xl">
            <div className="p-4 bg-white border-2 border-[#090909] shadow-[3px_3px_0px_0px_#090909]">
              <span className="font-mono text-xs font-bold text-[#090909]/60 uppercase tracking-wider block mb-1">
                FIRST PRINCIPLE
              </span>
              <p className="font-heading font-bold text-sm uppercase text-[#090909]">
                {hero.statementPrimary}
              </p>
            </div>
            <div className="p-4 bg-[#FFD447] border-2 border-[#090909] shadow-[3px_3px_0px_0px_#090909]">
              <span className="font-mono text-xs font-bold text-[#090909]/60 uppercase tracking-wider block mb-1">
                STRATEGIC FOCUS
              </span>
              <p className="font-heading font-bold text-sm uppercase text-[#090909]">
                {hero.statementSecondary}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE GROWTH SYSTEM PHILOSOPHY */}
      <section className="py-16 sm:py-24 px-6 sm:px-12 lg:px-16 border-b-4 border-[#090909] bg-white">
        <ScrollReveal variant="fade-up" className="max-w-[1560px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <BauhausBadge variant="yellow" shape="square" size="sm">
              {growthSystem.badge}
            </BauhausBadge>
            <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight uppercase leading-[1.0] text-[#090909]">
              {growthSystem.subtitle}
            </h2>
            <div className="flex flex-col gap-3 pl-6 border-l-4 border-[#F23B32] my-2">
              {growthSystem.needStatements.map((statement, idx) => (
                <p key={idx} className="text-base sm:text-lg font-body text-[#090909]/80">
                  {statement}
                </p>
              ))}
            </div>
            <div className="p-6 bg-[#0F2747] text-white border-2 border-[#090909] shadow-[4px_4px_0px_0px_#090909]">
              <p className="font-heading font-bold text-base sm:text-lg uppercase">
                {growthSystem.conclusion}
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#E9EDF2] border-4 border-[#090909] p-6 sm:p-10 shadow-[8px_8px_0px_0px_#090909] bauhaus-grid-bg">
            <div className="relative w-full aspect-[16/10] bg-white border-2 border-[#090909] overflow-hidden">
              <Image
                src="/images/bauhaus-diagram-growth-loop.jpg"
                alt="AxonVortex Growth Loop & Continuous Framework"
                fill
                className="object-contain p-2"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <span className="block mt-4 text-center font-mono text-xs uppercase tracking-widest text-[#090909]/70 font-bold">
              CONTINUOUS GROWTH LOOP SYSTEM
            </span>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. CONNECTED CAPABILITY MAP (Sticky Index + Synchronized Content) */}
      <section className="relative w-full bg-[#E9EDF2] border-b-4 border-[#090909]">
        <div className="max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-12">
          {/* Left Sticky Index (4 cols on desktop) */}
          <aside className="lg:col-span-4 bg-white border-b-4 lg:border-b-0 lg:border-r-4 border-[#090909] p-6 sm:p-10 lg:sticky lg:top-20 lg:h-[calc(100vh-80px)] lg:overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b-2 border-[#090909]">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#F23B32]">
                  CAPABILITY DIRECTORY
                </span>
                <span className="font-mono text-xs text-[#090909]/50">5 DOMAINS</span>
              </div>

              <nav className="flex flex-col gap-2 mt-6" aria-label="Solutions Domain Index">
                {solutions.map((dom, idx) => {
                  const isActive = activeDomainIndex === idx;
                  return (
                    <button
                      key={dom.id}
                      onClick={() => scrollToDomain(dom.id, idx)}
                      className={`text-left p-4 border-2 transition-all flex items-center justify-between group cursor-pointer ${
                        isActive
                          ? "bg-[#0F2747] text-white border-[#090909] shadow-[4px_4px_0px_0px_#090909]"
                          : "bg-white text-[#090909] border-[#090909]/20 hover:border-[#090909] hover:bg-[#E9EDF2]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-2 h-2 shrink-0 transition-colors ${
                            isActive ? "bg-[#FFD447]" : "bg-[#F23B32]"
                          }`}
                        />
                        <span className="font-heading font-black text-sm uppercase tracking-tight">
                          {dom.title}
                        </span>
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                          isActive ? "text-[#FFD447]" : "text-[#090909]/40"
                        }`}
                      />
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="hidden lg:block pt-8 border-t-2 border-[#090909] mt-8">
              <span className="font-mono text-xs uppercase tracking-wider text-[#090909]/60 block mb-3 font-bold">
                READY TO SCOPE?
              </span>
              <Button
                variant="primary"
                size="md"
                withArrow
                asLink
                href="/contact"
                className="w-full justify-center"
              >
                Start Your Project
              </Button>
            </div>
          </aside>

          {/* Right Scrolling Content (8 cols on desktop) */}
          <div className="lg:col-span-8 divide-y-4 divide-[#090909] bg-white">
            {solutions.map((domain) => {
              const imgSrc = DOMAIN_VISUALS[domain.id] || "/images/bauhaus-tech-hero.png";

              return (
                <article
                  id={`domain-${domain.id}`}
                  key={domain.id}
                  className="p-8 sm:p-12 lg:p-16 flex flex-col gap-10 bg-white"
                >
                  {/* Domain Header */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between pb-3 border-b-2 border-[#090909]/15">
                      <BauhausBadge variant="slate" shape="pill" size="sm">
                        DOMAIN
                      </BauhausBadge>
                    </div>

                    <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight text-[#090909] uppercase">
                      {domain.title}
                    </h2>
                    <p className="text-lg sm:text-xl font-heading font-bold text-[#2F5FA7]">
                      {domain.tagline}
                    </p>
                  </div>

                  {/* Visual Diagram */}
                  <div className="relative w-full aspect-[16/9] border-4 border-[#090909] bg-[#E9EDF2] p-2 shadow-[6px_6px_0px_0px_#090909] overflow-hidden">
                    <Image
                      src={imgSrc}
                      alt={`${domain.title} technical diagram`}
                      fill
                      className="object-contain p-2"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  </div>

                  {/* Description Paragraphs */}
                  <div className="flex flex-col gap-4 border-l-4 border-[#090909] pl-6">
                    {domain.descriptions.map((desc, idx) => (
                      <p key={idx} className="font-body text-base text-[#090909]/80 leading-relaxed">
                        {desc}
                      </p>
                    ))}
                  </div>

                  {/* 2-Column Split: What We Build vs Best For */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t-2 border-[#090909]/15 pt-8">
                    <div className="p-6 bg-[#E9EDF2] border-2 border-[#090909]">
                      <h3 className="font-heading font-black text-sm uppercase tracking-wider text-[#090909] mb-4 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 bg-[#F23B32]" />
                        <span>What We Build</span>
                      </h3>
                      <ul className="flex flex-col gap-3 font-body text-sm text-[#090909]">
                        {domain.helpWith.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <CheckSquare className="w-4 h-4 text-[#F23B32] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-6 bg-white border-2 border-[#090909] shadow-[3px_3px_0px_0px_#090909]">
                      <h3 className="font-heading font-black text-sm uppercase tracking-wider text-[#090909] mb-4 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 bg-[#2F5FA7]" />
                        <span>Best For Businesses That...</span>
                      </h3>
                      <ul className="flex flex-col gap-3 font-body text-sm text-[#090909]/80">
                        {domain.bestFor.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 bg-[#2F5FA7] shrink-0 mt-1.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Bar with Links to Domain Page and Individual Services */}
                  <div className="pt-6 border-t-2 border-[#090909] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <Button
                      variant="primary"
                      size="md"
                      withArrow
                      asLink
                      href={domain.cta.href}
                    >
                      {domain.cta.label}
                    </Button>

                    <Link
                      href={`/${domain.id}`}
                      className="font-mono text-xs font-bold uppercase text-[#090909] hover:text-[#F23B32] inline-flex items-center gap-1.5"
                    >
                      <span>Deep Dive into {domain.title}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. DIAGNOSTIC PROBLEM MATCHER */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 lg:px-16 max-w-[1560px] mx-auto">
        <ScrollReveal variant="fade-up" className="text-center max-w-3xl mx-auto mb-16">
          <BauhausBadge variant="slate" shape="square" size="sm" className="mb-4">
            {problemMatcher.badge}
          </BauhausBadge>
          <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight uppercase leading-tight text-[#090909]">
            {problemMatcher.title}
          </h2>
          <p className="mt-4 font-body text-base text-[#090909]/75">
            {problemMatcher.subtitle}
          </p>
        </ScrollReveal>

        <ScrollReveal variant="stagger" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {problemMatcher.items.map((item, i) => (
            <Link
              key={i}
              data-stagger-item
              href={item.href}
              className="group p-6 bg-white border-2 border-[#090909] shadow-[4px_4px_0px_0px_#090909] hover:bg-[#FFD447] hover:border-[#090909] transition-all flex items-center justify-between gap-4"
            >
              <div>
                <span className="font-mono text-xs font-bold text-[#F23B32] uppercase block mb-1">
                  BARRIER
                </span>
                <h3 className="font-heading font-bold text-base sm:text-lg uppercase text-[#090909]">
                  {item.problem}
                </h3>
                <span className="font-mono text-xs text-[#090909]/70 group-hover:text-[#090909] block mt-2">
                  → Recommendation: <strong className="uppercase">{item.recommendation}</strong>
                </span>
              </div>
              <ArrowRight className="w-5 h-5 text-[#090909] group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>
          ))}
        </ScrollReveal>

        <div className="mt-12 text-center">
          <Button
            variant="outline"
            size="lg"
            asLink
            href={problemMatcher.cta.href}
          >
            {problemMatcher.cta.label}
          </Button>
        </div>
      </section>

      {/* 5. CONNECTED GROWTH ARCHITECTURE */}
      <section className="py-20 px-6 sm:px-12 lg:px-16 bg-[#0F2747] text-white border-y-4 border-[#090909]">
        <div className="max-w-[1560px] mx-auto text-center flex flex-col items-center">
          <Network className="w-12 h-12 text-[#FFD447] mb-6" />
          <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight uppercase text-white">
            {connectedGrowth.title}
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-white/80 font-heading max-w-2xl">
            {connectedGrowth.subtitle}
          </p>

          <div
            ref={connectedNodesRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 w-full text-left"
          >
            {connectedGrowth.nodes.map((node, i) => (
              <div
                key={i}
                data-node-card
                className="p-6 bg-[#173359] border-2 border-white/20 shadow-[4px_4px_0px_0px_#090909] flex flex-col justify-between transition-shadow hover:shadow-[6px_6px_0px_0px_#FFD447]"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-[#FFD447] block mb-2">
                    NODE
                  </span>
                  <h3 className="font-heading font-bold text-lg uppercase text-white">
                    {node.name}
                  </h3>
                </div>
                <p className="mt-4 font-body text-xs sm:text-sm text-white/75 leading-relaxed">
                  {node.purpose}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-white/10 border-2 border-white/30 max-w-2xl w-full text-center">
            <h3 className="font-heading font-bold text-lg uppercase text-[#FFD447]">
              {connectedGrowth.approachPrimary}
            </h3>
            <p className="mt-2 font-body text-sm text-white/80">
              {connectedGrowth.approachSecondary}
            </p>
          </div>
        </div>
      </section>

      {/* 6. FINAL SOLUTIONS CTA */}
      <section className="py-24 px-6 sm:px-12 text-center bg-white border-b-4 border-[#090909]">
        <ScrollReveal variant="fade-up" className="max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="text-4xl sm:text-6xl font-heading font-black uppercase tracking-tight text-[#090909]">
            {finalCta.headline}
          </h2>
          <div className="flex flex-col gap-4 my-8">
            {finalCta.paragraphs.map((p, i) => (
              <p key={i} className="text-base sm:text-lg font-body text-[#090909]/80 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="primary"
              size="lg"
              withArrow
              asLink
              href={finalCta.primaryCta.href}
            >
              {finalCta.primaryCta.label}
            </Button>
            <Button
              variant="outline"
              size="lg"
              asLink
              href={finalCta.secondaryCta.href}
            >
              {finalCta.secondaryCta.label}
            </Button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
