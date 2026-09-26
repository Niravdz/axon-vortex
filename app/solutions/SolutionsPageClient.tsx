"use client";

import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, CheckSquare, Network } from "lucide-react";
import { Button } from "@/components/ui/Button";
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

  // Node stagger in Connected Growth architecture
  useEffect(() => {
    if (prefersReducedMotion || !connectedNodesRef.current) return;
    const { gsap } = getGSAP();
    const cards = connectedNodesRef.current.querySelectorAll<HTMLElement>("[data-node-card]");
    if (cards.length) {
      gsap.fromTo(
        cards,
        { opacity: 0, scale: 0.96, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: connectedNodesRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );
    }
  }, [prefersReducedMotion]);

  // Synchronize sticky domain index with active section
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
    <div ref={containerRef} className="w-full bg-void text-soft-white overflow-x-clip">
      {/* 1. HERO - 3D Dimensional Opening */}
      <section ref={heroRef} className="relative w-full bg-[#121519] border-b border-white/[0.08] py-16 sm:py-24 px-6 sm:px-10 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col justify-between gap-10">
          <div data-anim="solutions-hero" className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e22] border border-[#3B82F6]/35 text-xs font-mono tracking-wider text-[#3B82F6] shadow-[0_2px_6px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
              <span>{hero.badge}</span>
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#9AA3B2]">
              CONNECTED ARCHITECTURE
            </span>
          </div>

          <div data-anim="solutions-hero" className="max-w-4xl">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-semibold tracking-tight uppercase leading-[1.02] text-[#EFECE4]">
              Digital Solutions Built Around Your Growth.
            </h1>
            <p className="mt-6 text-lg sm:text-xl font-heading font-medium text-[#60A5FA] leading-snug">
              {hero.intro}
            </p>
          </div>

          <div data-anim="solutions-hero" className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-white/[0.08] max-w-4xl">
            <div className="p-5 rounded-[12px] bg-[#171a1e] border border-white/[0.08] shadow-[0_6px_18px_-2px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.08)]">
              <span className="font-mono text-xs font-semibold text-[#3B82F6] uppercase tracking-wider block mb-1">
                FIRST PRINCIPLE
              </span>
              <p className="font-heading font-medium text-sm text-[#EFECE4] leading-relaxed">
                {hero.statementPrimary}
              </p>
            </div>
            <div className="p-5 rounded-[12px] bg-[#171a1e] border border-[#F4BA00]/30 shadow-[0_6px_18px_-2px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.08)]">
              <span className="font-mono text-xs font-semibold text-[#F4BA00] uppercase tracking-wider block mb-1">
                STRATEGIC FOCUS
              </span>
              <p className="font-heading font-medium text-sm text-[#EFECE4] leading-relaxed">
                {hero.statementSecondary}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE GROWTH SYSTEM PHILOSOPHY */}
      <section className="py-16 sm:py-24 px-6 sm:px-10 lg:px-12 border-b border-white/[0.08] bg-[#141619]">
        <ScrollReveal variant="fade-up" className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e22] border border-[#F4BA00]/35 text-xs font-mono tracking-wider text-[#F4BA00] w-fit shadow-[0_2px_6px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F4BA00] animate-pulse" />
              <span>{growthSystem.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-semibold tracking-tight uppercase leading-[1.05] text-[#EFECE4]">
              {growthSystem.subtitle}
            </h2>
            <div className="flex flex-col gap-3 pl-5 border-l-2 border-[#3B82F6] my-2">
              {growthSystem.needStatements.map((statement, idx) => (
                <p key={idx} className="text-sm sm:text-base font-body text-[#9AA3B2] leading-relaxed">
                  {statement}
                </p>
              ))}
            </div>
            <div className="p-6 rounded-[12px] bg-[#1b1e22] border border-white/[0.08] shadow-[0_12px_28px_-4px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)]">
              <p className="font-heading font-medium text-sm sm:text-base text-[#EFECE4] leading-relaxed">
                {growthSystem.conclusion}
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-[16px] bg-[#1b1e22] border border-white/[0.08] p-6 sm:p-8 shadow-[0_16px_38px_-6px_rgba(0,0,0,0.72),0_6px_14px_-3px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col items-center">
            <div className="relative w-full aspect-[16/10] rounded-[10px] bg-[#101215] border border-white/[0.04] overflow-hidden shadow-[inset_0_2px_6px_rgba(0,0,0,0.85)]">
              <Image
                src="/images/bauhaus-diagram-growth-loop.jpg"
                alt="AxonVortex Growth Loop & Continuous Framework"
                fill
                className="object-contain p-2 opacity-90 hover:opacity-100 transition-opacity"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <span className="block mt-4 text-center font-mono text-xs uppercase tracking-widest text-[#9AA3B2] font-medium">
              CONTINUOUS GROWTH LOOP SYSTEM
            </span>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. CONNECTED CAPABILITY MAP (Sticky Index + Synchronized Content) */}
      <section className="relative w-full bg-[#121519] border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12">
          {/* Left Sticky Index (4 cols on desktop) */}
          <aside className="lg:col-span-4 bg-[#1b1e22] border-b lg:border-b-0 lg:border-r border-white/[0.08] p-6 sm:p-8 lg:sticky lg:top-20 lg:h-[calc(100vh-80px)] lg:overflow-y-auto flex flex-col justify-between shadow-[0_8px_24px_rgba(0,0,0,0.6)]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#3B82F6]">
                  CAPABILITY DIRECTORY
                </span>
                <span className="font-mono text-xs text-[#9AA3B2]">5 DOMAINS</span>
              </div>

              <nav className="flex flex-col gap-2 mt-6" aria-label="Solutions Domain Index">
                {solutions.map((dom, idx) => {
                  const isActive = activeDomainIndex === idx;
                  return (
                    <button
                      key={dom.id}
                      onClick={() => scrollToDomain(dom.id, idx)}
                      className={`text-left p-3.5 rounded-[10px] border transition-all flex items-center justify-between group cursor-pointer ${
                        isActive
                          ? "bg-[#21252a] text-[#3B82F6] border-[#3B82F6]/50 shadow-[0_4px_16px_rgba(59,130,246,0.2),inset_0_1px_0_rgba(255,255,255,0.12)]"
                          : "bg-[#171a1e] text-[#EFECE4]/85 border-white/[0.06] shadow-[0_2px_6px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-[#3B82F6]/40 hover:bg-[#21252a]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 transition-colors ${
                            isActive ? "bg-[#3B82F6] shadow-[0_0_8px_#3B82F6]" : "bg-[#9AA3B2]/40"
                          }`}
                        />
                        <span className="font-heading font-medium text-xs sm:text-sm tracking-wide">
                          {dom.title}
                        </span>
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                          isActive ? "text-[#3B82F6]" : "text-[#9AA3B2]/50"
                        }`}
                      />
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="hidden lg:block pt-6 border-t border-white/[0.08] mt-6">
              <span className="font-mono text-xs uppercase tracking-wider text-[#9AA3B2] block mb-3">
                READY TO SCOPE?
              </span>
              <Button
                variant="amber"
                size="md"
                withArrow
                asLink
                href="/contact"
                className="w-full justify-center shadow-[0_4px_16px_rgba(244,186,0,0.35)]"
              >
                Start Your Project
              </Button>
            </div>
          </aside>

          {/* Right Scrolling Content (8 cols on desktop) */}
          <div className="lg:col-span-8 divide-y divide-white/[0.08] bg-[#141619]">
            {solutions.map((domain, domIdx) => {
              const imgSrc = DOMAIN_VISUALS[domain.id] || "/images/bauhaus-tech-hero.png";

              return (
                <article
                  id={`domain-${domain.id}`}
                  key={domain.id}
                  className="p-8 sm:p-12 lg:p-14 flex flex-col gap-8 bg-[#141619]"
                >
                  {/* Domain Header */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                      <span className="font-mono text-xs font-semibold text-[#3B82F6] px-2.5 py-1 rounded-[4px] bg-[#171a1e] border border-white/[0.08] shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                        DOMAIN {String(domIdx + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-heading font-semibold tracking-tight text-[#EFECE4] uppercase mt-2">
                      {domain.title}
                    </h2>
                    <p className="text-base sm:text-lg font-heading font-medium text-[#60A5FA]">
                      {domain.tagline}
                    </p>
                  </div>

                  {/* Visual Diagram */}
                  <div className="relative w-full aspect-[16/9] rounded-[14px] border border-white/[0.06] bg-[#101215] p-2 shadow-[inset_0_2px_8px_rgba(0,0,0,0.85)] overflow-hidden">
                    <Image
                      src={imgSrc}
                      alt={`${domain.title} technical diagram`}
                      fill
                      className="object-contain p-2 opacity-90"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  </div>

                  {/* Description Paragraphs */}
                  <div className="flex flex-col gap-3 border-l-2 border-[#3B82F6] pl-5">
                    {domain.descriptions.map((desc, idx) => (
                      <p key={idx} className="font-body text-sm sm:text-base text-[#9AA3B2] leading-relaxed">
                        {desc}
                      </p>
                    ))}
                  </div>

                  {/* 2-Column Split: What We Build vs Best For */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/[0.08] pt-6">
                    <div className="p-6 rounded-[12px] bg-[#171a1e] border border-white/[0.08] shadow-[0_8px_24px_-4px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)]">
                      <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-[#EFECE4] mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                        <span>What We Build</span>
                      </h3>
                      <ul className="flex flex-col gap-2.5 font-body text-xs sm:text-sm text-[#9AA3B2]">
                        {domain.helpWith.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <CheckSquare className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-6 rounded-[12px] bg-[#171a1e] border border-white/[0.08] shadow-[0_8px_24px_-4px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)]">
                      <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-[#EFECE4] mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#F4BA00]" />
                        <span>Best For Businesses That...</span>
                      </h3>
                      <ul className="flex flex-col gap-2.5 font-body text-xs sm:text-sm text-[#9AA3B2]">
                        {domain.bestFor.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F4BA00] shrink-0 mt-1.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <Button
                      variant="amber"
                      size="md"
                      withArrow
                      asLink
                      href={domain.cta.href}
                    >
                      {domain.cta.label}
                    </Button>

                    <Link
                      href={`/${domain.id}`}
                      className="font-mono text-xs uppercase text-[#EFECE4]/80 hover:text-[#3B82F6] inline-flex items-center gap-1.5 transition-colors"
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
      <section className="py-20 sm:py-28 px-6 sm:px-10 lg:px-12 max-w-7xl mx-auto">
        <ScrollReveal variant="fade-up" className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e22] border border-[#3B82F6]/35 text-xs font-mono tracking-wider text-[#3B82F6] mb-4 shadow-[0_2px_6px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]">
            <span>{problemMatcher.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-semibold tracking-tight uppercase leading-tight text-[#EFECE4]">
            {problemMatcher.title}
          </h2>
          <p className="mt-4 font-body text-base text-[#9AA3B2]">
            {problemMatcher.subtitle}
          </p>
        </ScrollReveal>

        <ScrollReveal variant="stagger" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {problemMatcher.items.map((item, i) => (
            <Link
              key={i}
              data-stagger-item
              href={item.href}
              className="group p-6 rounded-[12px] bg-[#171a1e] border border-white/[0.08] shadow-[0_8px_24px_-4px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-[#3B82F6]/50 hover:bg-[#21252a] hover:-translate-y-0.5 transition-all flex items-center justify-between gap-4"
            >
              <div>
                <span className="font-mono text-xs font-semibold text-[#3B82F6] group-hover:text-[#60A5FA] block mb-1 transition-colors">
                  DIAGNOSTIC {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading font-semibold text-base sm:text-lg uppercase text-[#EFECE4] group-hover:text-[#60A5FA] transition-colors leading-snug">
                  {item.problem}
                </h3>
                <div className="mt-3 px-3 py-1.5 rounded-[6px] bg-[#101215] border border-white/[0.04] shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)] w-fit">
                  <span className="font-mono text-xs text-[#9AA3B2] transition-colors">
                    → Recommendation: <strong className="text-[#F4BA00] font-medium">{item.recommendation}</strong>
                  </span>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-[#9AA3B2] group-hover:text-[#3B82F6] group-hover:translate-x-1 transition-all shrink-0" />
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
      <section className="py-20 px-6 sm:px-10 lg:px-12 bg-[#121519] text-[#EFECE4] border-y border-white/[0.08]">
        <div className="max-w-7xl mx-auto text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-[#171a1e] border border-white/[0.08] flex items-center justify-center text-[#F4BA00] mb-6 shadow-[0_4px_14px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)]">
            <Network className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-semibold tracking-tight uppercase text-[#EFECE4]">
            {connectedGrowth.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#9AA3B2] font-heading max-w-2xl">
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
                className="p-6 sm:p-7 rounded-[12px] bg-[#171a1e] border border-white/[0.08] shadow-[0_8px_24px_-4px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col justify-between hover:border-[#3B82F6]/50 hover:bg-[#21252a] transition-all duration-200"
              >
                <div>
                  <span className="font-mono text-xs font-semibold text-[#F4BA00] px-2 py-0.5 rounded-[4px] bg-[#101215] border border-white/[0.04] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] inline-block mb-2">
                    NODE {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-heading font-semibold text-lg uppercase text-[#EFECE4]">
                    {node.name}
                  </h3>
                </div>
                <p className="mt-4 font-body text-xs sm:text-sm text-[#9AA3B2] leading-relaxed">
                  {node.purpose}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-[12px] bg-[#1b1e22] border border-white/[0.08] max-w-2xl w-full text-center shadow-[0_12px_28px_-4px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)]">
            <h3 className="font-heading font-semibold text-base sm:text-lg uppercase text-[#F4BA00]">
              {connectedGrowth.approachPrimary}
            </h3>
            <p className="mt-2 font-body text-sm text-[#9AA3B2]">
              {connectedGrowth.approachSecondary}
            </p>
          </div>
        </div>
      </section>

      {/* 6. FINAL SOLUTIONS CTA */}
      <section className="py-24 px-6 sm:px-10 text-center bg-void">
        <ScrollReveal variant="fade-up" className="max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="text-4xl sm:text-6xl font-heading font-semibold uppercase tracking-tight text-[#EFECE4]">
            {finalCta.headline}
          </h2>
          <div className="flex flex-col gap-4 my-8">
            {finalCta.paragraphs.map((p, i) => (
              <p key={i} className="text-base sm:text-lg font-body text-[#9AA3B2] leading-relaxed">
                {p}
              </p>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="amber"
              size="lg"
              withArrow
              asLink
              href={finalCta.primaryCta.href}
              className="shadow-[0_4px_20px_rgba(244,186,0,0.4)]"
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
