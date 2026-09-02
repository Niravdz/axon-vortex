"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import Link from "next/link";
import { ArrowDown, CheckCircle2, ChevronRight, CornerDownRight, Cpu, User } from "lucide-react";
import { SectionMasthead } from "@/components/ui/SectionMasthead";
import { Button } from "@/components/ui/Button";
import { authorityData } from "@/data/content/authorityConversion";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ApproachPageClient() {
  const {
    hero,
    startWithProblem,
    framework,
    growthLoop,
    humanAi,
    dataPhilosophy,
    principles,
  } = authorityData;

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const problemRef = useRef<HTMLElement>(null);
  const processCanvasRef = useRef<HTMLDivElement>(null);
  const stagesRef = useRef<HTMLDivElement>(null);
  
  const prefersReducedMotion = useReducedMotion();
  const [activeStage, setActiveStage] = useState<number>(0);

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
          y: 100,
          opacity: 0,
        });

        // 2. Strategic Process Journey (Pinned Canvas)
        const stagesContainer = stagesRef.current;
        const canvas = processCanvasRef.current;
        if (stagesContainer && canvas) {
          ScrollTrigger.create({
            trigger: stagesContainer,
            start: "top top",
            end: "bottom bottom",
            pin: canvas,
            pinSpacing: false,
          });

          const articles = stagesContainer.querySelectorAll("article");
          articles.forEach((article, i) => {
            ScrollTrigger.create({
              trigger: article,
              start: "top center",
              end: "bottom center",
              onEnter: () => setActiveStage(i),
              onEnterBack: () => setActiveStage(i),
            });
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className="bg-sand text-slate w-full overflow-x-clip selection:bg-brand-coral selection:text-sand">
      
      {/* 1. HERO - Editorial Opening */}
      <section ref={heroRef} className="relative min-h-[85vh] flex flex-col justify-center px-6 md:px-12 pt-32 pb-20 max-w-screen-2xl mx-auto border-b border-brand-coral/20 z-10">
        <div className="inline-block mb-8 px-4 py-1.5 border border-brand-coral/30 rounded-full bg-brand-coral/5 text-brand-coral font-label text-xs uppercase tracking-widest font-semibold self-start">
          {hero.badge}
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-black uppercase tracking-tighter leading-[0.85] mb-8 max-w-5xl">
          {hero.headline.split('.').map((part, i, arr) => (
            <React.Fragment key={i}>
              {i === arr.length - 1 ? (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-coral to-gold">
                  {part}
                </span>
              ) : (
                <>{part}.<br/></>
              )}
            </React.Fragment>
          ))}
        </h1>
        <div className="flex flex-col gap-6 mt-8 max-w-3xl border-l-4 border-slate pl-6">
          {hero.paragraphs.map((p, i) => (
            <p key={i} className="text-xl md:text-2xl font-body font-light text-slate/80 leading-relaxed">
              {p}
            </p>
          ))}
        </div>
        <div className="mt-16">
          <Link href={hero.cta.href}>
            <Button size="lg" className="bg-slate text-sand hover:bg-brand-coral transition-colors">
              {hero.cta.label}
              <ArrowDown className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* 2. START WITH THE PROBLEM (Large Editorial) */}
      <section ref={problemRef} className="py-24 px-6 md:px-12 max-w-screen-2xl mx-auto border-b border-slate/10">
        <SectionMasthead badge={startWithProblem.badge} descriptor="Core Principle" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16 items-start">
          <h2 className="text-4xl md:text-6xl font-headline font-bold uppercase tracking-tight text-slate sticky top-32">
            {startWithProblem.headline}
          </h2>
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-6 text-xl md:text-2xl font-body text-slate/70">
              {startWithProblem.examples.map((ex, i) => (
                <p key={i}>{ex}</p>
              ))}
            </div>
            <div className="bg-brand-coral/5 p-8 md:p-12 border-l-4 border-brand-coral rounded-r-3xl">
              <span className="text-brand-coral font-label text-sm uppercase tracking-widest font-bold mb-4 block">
                {startWithProblem.centralQuestionLabel}
              </span>
              <p className="text-3xl md:text-4xl font-headline font-bold uppercase tracking-tight text-slate mb-6">
                {startWithProblem.centralQuestion}
              </p>
              <p className="text-lg font-body text-slate/80">
                {startWithProblem.conclusion}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STRATEGIC PROCESS JOURNEY (Split Screen: Pinned Canvas Left, Scroll Right) */}
      <section className="relative w-full bg-slate text-sand border-b border-brand-coral/20">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 pt-16 pb-8 border-b border-white/10">
          <SectionMasthead badge={framework.badge} descriptor={framework.sequence} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 w-full max-w-screen-2xl mx-auto">
          
          {/* LEFT: Pinned Canvas */}
          <div ref={processCanvasRef} className="hidden lg:flex lg:col-span-5 flex-col h-screen border-r border-white/10 p-12 bg-slate overflow-hidden justify-center relative">
            
            {/* The Path Line */}
            <div className="absolute left-16 top-0 bottom-0 w-1 bg-white/5">
               <div 
                 className="w-full bg-gradient-to-b from-brand-coral to-gold transition-all duration-700 ease-out" 
                 style={{ height: `${((activeStage + 1) / framework.stages.length) * 100}%` }}
               />
            </div>

            <div className="relative z-10 pl-16">
               <div className="text-[120px] lg:text-[180px] font-headline font-black text-white/5 tracking-tighter leading-none mb-4 transition-all duration-500">
                 {framework.stages[activeStage]?.number}
               </div>
               <h3 className="text-5xl lg:text-6xl font-headline font-bold uppercase text-sand mb-6">
                 {framework.stages[activeStage]?.name}
               </h3>
               <div className="w-12 h-1 bg-brand-coral mb-6" />
               <p className="text-2xl font-body text-sand/70 max-w-sm">
                 {framework.stages[activeStage]?.intro}
               </p>
            </div>
          </div>

          {/* RIGHT: Scrolling Content */}
          <div ref={stagesRef} className="flex flex-col lg:col-span-7 w-full relative z-10 bg-slate">
            {framework.stages.map((stage, i) => (
              <article 
                key={i} 
                className="min-h-screen flex flex-col justify-center p-8 md:p-16 lg:p-24 border-b border-white/5 transition-opacity duration-500"
                style={{ opacity: activeStage === i ? 1 : 0.5 }}
              >
                {/* Mobile Header (Hidden on Desktop) */}
                <div className="lg:hidden mb-8">
                  <div className="text-6xl font-headline font-black text-white/10 tracking-tighter leading-none mb-2">
                    {stage.number}
                  </div>
                  <h3 className="text-3xl font-headline font-bold uppercase text-sand mb-4">
                    {stage.name}
                  </h3>
                  <p className="text-xl font-body text-sand/70 border-l-2 border-brand-coral pl-4">
                    {stage.intro}
                  </p>
                </div>

                {stage.description && (
                  <p className="text-xl font-body text-sand/80 mb-8 leading-relaxed">
                    {stage.description}
                  </p>
                )}

                {stage.statements && (
                  <div className="flex flex-col gap-6 mb-12 border-l-4 border-brand-coral/50 pl-6 bg-white/5 p-8 rounded-r-2xl">
                    {stage.statements.map((stmt, idx) => (
                      <p key={idx} className="text-xl lg:text-2xl font-headline font-bold uppercase tracking-tight text-white">
                        {stmt}
                      </p>
                    ))}
                  </div>
                )}

                {stage.items && (
                  <div className="mt-4">
                    {stage.listLabel && (
                      <h4 className="text-sm font-label font-bold uppercase tracking-widest text-gold mb-6">
                        {stage.listLabel}
                      </h4>
                    )}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                      {stage.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-brand-coral shrink-0 mt-0.5" />
                          <span className="text-sand/90 font-body text-lg">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GROWTH LOOP */}
      <section className="py-24 px-6 md:px-12 max-w-screen-2xl mx-auto border-b border-slate/10 bg-sand">
        <SectionMasthead badge={growthLoop.badge} descriptor={growthLoop.sequence} />
        <div className="flex flex-col items-center text-center mt-16 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-headline font-bold uppercase tracking-tight text-slate mb-8">
            {growthLoop.title}
          </h2>
          <div className="flex flex-col gap-4 text-xl md:text-2xl font-body text-slate/80 mb-12">
            {growthLoop.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-12">
            {growthLoop.changeFactors.map((factor, i) => (
              <React.Fragment key={i}>
                <span className="text-sm font-label uppercase tracking-widest font-bold text-slate">
                  {factor}
                </span>
                {i < growthLoop.changeFactors.length - 1 && (
                  <ChevronRight className="hidden md:block w-4 h-4 text-brand-coral" />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="bg-brand-coral text-sand font-headline font-bold text-2xl uppercase tracking-wider px-12 py-6 rounded-full shadow-lg">
            {growthLoop.conclusion}
          </div>
        </div>
      </section>

      {/* 5. HUMAN + AI */}
      <section className="py-24 px-6 md:px-12 bg-slate text-sand border-b border-brand-coral/20">
        <SectionMasthead badge={humanAi.badge} descriptor={humanAi.title} />
        
        <div className="mt-16 text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-6xl font-headline font-bold uppercase tracking-tight mb-6">
            {humanAi.headline}
          </h2>
          <p className="text-2xl font-body text-sand/70">{humanAi.intro}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="bg-white/5 rounded-3xl p-12 border border-white/10 relative overflow-hidden group">
            <Cpu className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5 group-hover:text-gold/10 transition-colors duration-500" />
            <h3 className="text-2xl font-headline font-bold uppercase text-gold mb-8 flex items-center gap-3">
              <Cpu className="w-6 h-6" /> AI Capabilities
            </h3>
            <ul className="flex flex-col gap-4 relative z-10">
              {humanAi.aiCapabilities.map((cap, i) => (
                <li key={i} className="flex items-center gap-3 text-lg font-body text-sand/80">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full" /> {cap}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-brand-coral/10 rounded-3xl p-12 border border-brand-coral/20 relative overflow-hidden group">
            <User className="absolute -bottom-10 -right-10 w-48 h-48 text-brand-coral/5 group-hover:text-brand-coral/20 transition-colors duration-500" />
            <h3 className="text-2xl font-headline font-bold uppercase text-brand-coral mb-8 flex items-center gap-3">
              <User className="w-6 h-6" /> Human Capabilities
            </h3>
            <ul className="flex flex-col gap-4 relative z-10">
              {humanAi.humanCapabilities.map((cap, i) => (
                <li key={i} className="flex items-center gap-3 text-lg font-body text-sand/80">
                  <span className="w-1.5 h-1.5 bg-brand-coral rounded-full" /> {cap}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 text-center max-w-3xl mx-auto">
          {humanAi.conclusions.map((c, i) => (
            <p key={i} className="text-2xl md:text-3xl font-headline font-bold uppercase tracking-tight text-white mb-2">
              {c}
            </p>
          ))}
        </div>
      </section>

      {/* 6. DATA PHILOSOPHY */}
      <section className="py-24 px-6 md:px-12 bg-sand border-b border-slate/10">
        <div className="max-w-screen-2xl mx-auto">
          <SectionMasthead badge={dataPhilosophy.badge} descriptor="Measurement" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mt-16 items-start">
            <div className="lg:col-span-5 sticky top-32">
              <h2 className="text-5xl md:text-6xl font-headline font-black uppercase tracking-tighter text-slate mb-8">
                {dataPhilosophy.headline.split(',').map((part, i) => (
                  <React.Fragment key={i}>
                    {part}{i === 0 && ','}<br/>
                  </React.Fragment>
                ))}
              </h2>
              <div className="flex flex-col gap-4 border-l-4 border-brand-coral pl-6 mb-12">
                {dataPhilosophy.introStatements.map((stmt, i) => (
                  <p key={i} className="text-2xl font-body text-slate/70">
                    {stmt}
                  </p>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-7 flex flex-col gap-16">
              <div>
                <h3 className="text-sm font-label uppercase tracking-widest font-bold text-brand-coral mb-6">
                  {dataPhilosophy.coreQuestionsLabel}
                </h3>
                <div className="flex flex-col gap-4">
                  {dataPhilosophy.coreQuestions.map((q, i) => (
                    <div key={i} className="bg-white p-6 md:p-8 rounded-2xl border border-slate/10 shadow-sm flex items-center gap-6">
                      <div className="w-12 h-12 rounded-full bg-brand-coral/10 text-brand-coral flex items-center justify-center font-headline font-bold text-xl shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-2xl md:text-3xl font-headline font-bold uppercase text-slate">
                        {q}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-label uppercase tracking-widest font-bold text-slate mb-6">
                  The Reality of Metrics:
                </h3>
                <ul className="flex flex-col gap-4">
                  {dataPhilosophy.metricRealities.map((mr, i) => (
                    <li key={i} className="flex items-start gap-4 p-4 border-l-2 border-slate/20">
                      <CornerDownRight className="w-5 h-5 text-slate/40 shrink-0 mt-1" />
                      <span className="text-lg font-body text-slate/80">{mr}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate text-sand p-8 md:p-12 rounded-3xl">
                <p className="text-2xl font-headline font-bold uppercase tracking-wider text-brand-coral">
                  {dataPhilosophy.closing}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. OPERATING PRINCIPLES (Large Typographic Statements, NO CARDS) */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-slate text-sand">
        <div className="max-w-screen-2xl mx-auto">
          <SectionMasthead badge={principles.badge} descriptor={principles.title} />
          
          <div className="mt-20 flex flex-col gap-0 border-y border-white/10">
            {principles.items.map((item, i) => (
              <div key={i} className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-12 md:py-16 border-b border-white/10 last:border-b-0 items-center group hover:bg-white/5 transition-colors px-4 -mx-4 rounded-xl">
                <div className="lg:col-span-1 text-gold font-mono text-lg font-bold opacity-50 group-hover:opacity-100 transition-opacity">
                  0{i + 1}
                </div>
                <div className="lg:col-span-5">
                  <h3 className="text-3xl md:text-4xl font-headline font-bold uppercase tracking-tight text-white group-hover:text-brand-coral transition-colors">
                    {item.title}
                  </h3>
                </div>
                <div className="lg:col-span-6">
                  <p className="text-xl md:text-2xl font-body text-sand/70 group-hover:text-sand transition-colors">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-32 text-center flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl font-headline font-bold uppercase tracking-tight text-white mb-12">
              {principles.closingHeadline}
            </h2>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href={principles.primaryCta.href}>
                <Button size="lg" className="bg-brand-navy text-white hover:bg-brand-coral hover:text-brand-navy w-full sm:w-auto">
                  {principles.primaryCta.label}
                </Button>
              </Link>
              <Link href={principles.secondaryCta.href}>
                <Button size="lg" variant="outline" className="border-sand text-sand hover:bg-white hover:text-slate w-full sm:w-auto">
                  {principles.secondaryCta.label}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
