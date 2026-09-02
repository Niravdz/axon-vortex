"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Hash } from "lucide-react";
import { SectionMasthead } from "@/components/ui/SectionMasthead";
import { Button } from "@/components/ui/Button";
import { authorityData } from "@/data/content/authorityConversion";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Stable positions keep the server and client markup identical during hydration.
const HERO_KEYWORD_POSITIONS = [
  { left: 8, top: 24 },
  { left: 58, top: 38 },
  { left: 24, top: 66 },
  { left: 68, top: 72 },
  { left: 42, top: 18 },
] as const;

export default function InsightsPageClient() {
  const {
    insights,
    contentTypes,
    contentLoop
  } = authorityData;

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const taxonomyRef = useRef<HTMLElement>(null);
  const loopRef = useRef<HTMLElement>(null);

  const prefersReducedMotion = useReducedMotion();
  const [activeTopic, setActiveTopic] = useState<number>(0);
  const [activePhase, setActivePhase] = useState<number>(0);

  useLayoutEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        // 1. Hero Parallax
        gsap.to(heroRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          y: 80,
          opacity: 0,
        });

        // Hero floating keywords
        const keywords = document.querySelectorAll('.hero-keyword');
        keywords.forEach((kw, i) => {
          gsap.to(kw, {
            y: (Math.random() * -60) - 20,
            x: (Math.random() * 40) - 20,
            rotation: (Math.random() * 10) - 5,
            duration: 10 + Math.random() * 5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.5
          });
        });

        // 2. Taxonomy Scroll (Update active topic)
        const topicArticles = taxonomyRef.current?.querySelectorAll("article.topic-article");
        topicArticles?.forEach((article, i) => {
          ScrollTrigger.create({
            trigger: article,
            start: "top center",
            end: "bottom center",
            onEnter: () => setActiveTopic(i),
            onEnterBack: () => setActiveTopic(i),
          });
        });

        // 3. Knowledge Loop (Scroll-controlled build)
        const phaseArticles = loopRef.current?.querySelectorAll("article.phase-article");
        const loopPath = document.querySelector('.loop-progress-path');

        if (loopPath) {
          gsap.fromTo(loopPath,
            { height: "0%" },
            {
              height: "100%",
              ease: "none",
              scrollTrigger: {
                trigger: loopRef.current,
                start: "top 40%",
                end: "bottom 80%",
                scrub: true,
              }
            }
          );
        }

        phaseArticles?.forEach((article, i) => {
          ScrollTrigger.create({
            trigger: article,
            start: "top center",
            end: "bottom center",
            onEnter: () => setActivePhase(i),
            onEnterBack: () => setActivePhase(i),
          });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className="w-full bg-slate text-sand overflow-x-clip selection:bg-brand-coral selection:text-sand">

      {/* 1. HERO - Editorial Masthead */}
      <section ref={heroRef} className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-12 pt-32 pb-20 border-b border-brand-coral/20 overflow-hidden">
        {/* Floating Keywords Background */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none overflow-hidden flex items-center justify-center">
          {insights.topics.map((t, i) => (
            <div key={i} className={`hero-keyword absolute font-headline font-bold uppercase tracking-widest text-[4rem] md:text-[8rem] text-white whitespace-nowrap blur-[2px]`}
              style={{
                left: `${HERO_KEYWORD_POSITIONS[i % HERO_KEYWORD_POSITIONS.length].left}%`,
                top: `${HERO_KEYWORD_POSITIONS[i % HERO_KEYWORD_POSITIONS.length].top}%`,
              }}>
              {t.category}
            </div>
          ))}
        </div>

        <div className="max-w-screen-2xl mx-auto w-full relative z-10 flex flex-col">
          <div className="inline-block mb-12 px-4 py-1.5 border border-white/20 rounded-full bg-white/5 text-sand font-label text-xs uppercase tracking-widest font-semibold self-start">
            {insights.badge}
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-headline font-black uppercase tracking-tighter leading-[0.85] mb-12 max-w-6xl text-white">
            {insights.headline.split('.').map((part, i, arr) => (
              <React.Fragment key={i}>
                {i === arr.length - 1 ? (
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-coral to-gold">
                    {part}
                  </span>
                ) : (
                  <>{part}.<br /></>
                )}
              </React.Fragment>
            ))}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8 max-w-5xl">
            <div>
              <p className="text-2xl md:text-3xl font-headline font-bold text-brand-coral mb-4">
                {insights.welcome}
              </p>
              <p className="text-xl font-body text-sand/80 leading-relaxed">
                {insights.subWelcome}
              </p>
            </div>
            <div className="flex flex-col gap-4 border-l-4 border-white/10 pl-6">
              {insights.principles.map((p, i) => (
                <p key={i} className="text-lg font-body text-sand/70">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. TOPIC TAXONOMY */}
      <section ref={taxonomyRef} className="relative w-full border-b border-white/10 bg-slate">
        <div className="grid grid-cols-1 lg:grid-cols-12 max-w-screen-2xl mx-auto">

          {/* LEFT: Vertical Topic Index (Sticky) */}
          <div className="hidden lg:flex lg:col-span-5 flex-col h-screen sticky top-0 border-r border-white/10 pl-6 md:pl-12 py-24 bg-slate z-20">
            <h2 className="text-sm font-label font-bold uppercase tracking-widest text-brand-coral mb-16">
              Taxonomy Index
            </h2>
            <div className="relative flex-1">
              {/* Connecting Line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />
              <div className="absolute left-0 top-0 w-px bg-gradient-to-b from-brand-turquoise to-brand-coral transition-all duration-500 ease-out"
                style={{ height: `${((activeTopic + 1) / insights.topics.length) * 100}%` }} />

              <ul className="flex flex-col h-full justify-between py-8">
                {insights.topics.map((t, i) => (
                  <li key={i} className="relative pl-8 transition-all duration-300"
                    style={{ opacity: activeTopic === i ? 1 : 0.4 }}>
                    <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full -ml-[5px] transition-colors ${activeTopic === i ? 'bg-brand-coral shadow-[0_0_10px_rgba(255,138,0,0.8)]' : 'bg-transparent border border-white/20'}`} />
                    <span className={`font-headline uppercase font-bold tracking-tight transition-all duration-300 ${activeTopic === i ? 'text-4xl lg:text-5xl text-sand' : 'text-2xl text-sand/60'}`}>
                      {t.category}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT: Asymmetric Editorial Panel (Scrolling) */}
          <div className="flex flex-col lg:col-span-7 w-full relative z-10">
            {insights.topics.map((t, i) => (
              <article key={i} className="topic-article min-h-[80vh] flex flex-col justify-center p-8 md:p-16 lg:p-24 border-b border-white/5 transition-opacity duration-500"
                style={{ opacity: activeTopic === i ? 1 : 0.5 }}>
                <div className="lg:hidden mb-8">
                  <span className="text-sm font-label font-bold uppercase tracking-widest text-brand-coral mb-2 block">
                    Taxonomy 0{i + 1}
                  </span>
                  <h3 className="text-4xl font-headline font-bold uppercase text-sand">
                    {t.category}
                  </h3>
                </div>

                <div className="mb-12">
                  <h4 className="text-2xl font-headline font-bold text-white mb-6">
                    {t.intro}
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {t.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/5 hover:border-brand-coral/30 hover:bg-brand-coral/5 transition-colors cursor-pointer group">
                        <Hash className="w-4 h-4 text-brand-coral/50 group-hover:text-brand-coral" />
                        <span className="font-body text-lg text-sand/80 group-hover:text-sand">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CONTENT TYPES (Magazine Composition) */}
      <section className="py-32 px-6 md:px-12 max-w-screen-2xl mx-auto border-b border-white/10 bg-slate">
        <SectionMasthead badge={contentTypes.badge} descriptor={contentTypes.title} />

        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {contentTypes.items.map((format, i) => {
            // Create varied typographic scales and column spans for a magazine feel
            const isFeatured = i % 4 === 0;
            return (
              <div key={i} className={`flex flex-col ${isFeatured ? 'md:col-span-2 lg:col-span-3 border-b-2 border-brand-coral pb-8' : 'border-t border-white/10 pt-8'}`}>
                <div className="flex items-baseline justify-between mb-4">
                  <h3 className={`font-headline font-bold uppercase tracking-tight text-white ${isFeatured ? 'text-4xl md:text-6xl' : 'text-2xl md:text-3xl'}`}>
                    {format.type}
                  </h3>
                  <span className="text-brand-coral font-mono text-sm">0{i + 1}</span>
                </div>
                <p className={`font-body text-sand/70 ${isFeatured ? 'text-xl max-w-3xl' : 'text-lg'}`}>
                  {format.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. KNOWLEDGE LOOP & CTA */}
      <section ref={loopRef} className="py-32 px-6 md:px-12 bg-sand text-slate border-b border-slate/10 relative">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">

          <div className="lg:col-span-5 flex flex-col relative z-20">
            <div className="sticky top-32">
              <SectionMasthead badge={contentLoop.badge} descriptor={contentLoop.title} />

              <div className="mt-16 bg-white p-8 md:p-12 rounded-3xl border border-slate/10 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-coral/10 rounded-bl-full -mr-16 -mt-16" />
                <h3 className="text-3xl md:text-4xl font-headline font-bold uppercase tracking-tight text-slate mb-6">
                  {contentLoop.questionCallout}
                </h3>
                <p className="text-xl font-body text-slate/80 font-medium mb-2">
                  {contentLoop.startWithProblem}
                </p>
                <p className="text-xl font-body text-slate/70 mb-8">
                  {contentLoop.helpThinkThrough}
                </p>
                <Link href={contentLoop.cta.href}>
                  <Button size="lg" className="bg-brand-coral text-brand-navy hover:bg-brand-coral/90 w-full sm:w-auto">
                    {contentLoop.cta.label}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 relative z-10 pl-8 md:pl-16 pt-16">
            {/* The Loop Path */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate/10 ml-[11px] md:ml-[27px] rounded-full" />
            <div className="absolute left-0 top-0 w-1 bg-gradient-to-b from-brand-turquoise to-brand-coral ml-[11px] md:ml-[27px] rounded-full loop-progress-path" />

            <div className="flex flex-col gap-24">
              {contentLoop.steps.map((step, i) => (
                <article key={i} className="phase-article relative flex flex-col transition-opacity duration-500"
                  style={{ opacity: activePhase === i ? 1 : 0.5 }}>

                  {/* Phase Node */}
                  <div className={`absolute -left-[30px] md:-left-[46px] top-1 w-6 h-6 rounded-full border-4 transition-colors duration-300 ${activePhase === i ? 'bg-brand-coral border-white shadow-[0_0_10px_rgba(255,138,0,0.5)]' : 'bg-slate/20 border-sand'}`} />

                  <span className="text-sm font-label font-bold uppercase tracking-widest text-brand-coral mb-2">
                    Phase 0{i + 1}
                  </span>
                  <h4 className="text-3xl md:text-5xl font-headline font-bold uppercase tracking-tight text-slate mb-4">
                    {step.stage}
                  </h4>
                  <p className="text-xl font-body text-slate/70 max-w-lg border-l-2 border-slate/20 pl-4">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
