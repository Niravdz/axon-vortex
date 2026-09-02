"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, CornerDownRight } from "lucide-react";
import { SectionMasthead } from "@/components/ui/SectionMasthead";
import { Button } from "@/components/ui/Button";
import { authorityData } from "@/data/content/authorityConversion";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GrowthAuditPageClient() {
  const {
    growthAuditIntro: hero,
    whatWeLookAt: scope,
    auditFramework: framework,
    whoShouldRequestAudit: ideal,
  } = authorityData;

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const mapContainerRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const methodRef = useRef<HTMLElement>(null);
  
  const prefersReducedMotion = useReducedMotion();
  const [activeDomain, setActiveDomain] = useState<number | null>(0);

  useLayoutEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        // 1. Hero Parallax & Scanline
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

        const scanline = document.querySelector('.hero-scanline');
        if (scanline) {
          gsap.to(scanline, {
            y: "100%",
            duration: 3,
            repeat: -1,
            ease: "linear",
          });
        }

        // 2. Audit Scope (Pinned Diagnostic Map)
        const mapContainer = mapContainerRef.current;
        const visual = visualRef.current;
        const scrollItems = scrollRef.current?.querySelectorAll('article');

        if (mapContainer && visual && scrollItems) {
          ScrollTrigger.create({
            trigger: mapContainer,
            start: "top top",
            end: "bottom bottom",
            pin: visual,
            pinSpacing: false,
          });

          scrollItems.forEach((item, i) => {
            ScrollTrigger.create({
              trigger: item,
              start: "top center",
              end: "bottom center",
              onEnter: () => setActiveDomain(i),
              onEnterBack: () => setActiveDomain(i),
              onLeave: () => { if (i === scrollItems.length - 1) setActiveDomain(scrollItems.length - 1); },
              onLeaveBack: () => { if (i === 0) setActiveDomain(0); }
            });
          });
        }

        // 3. Methodology Path
        const methodPath = document.querySelector('.methodology-path');
        if (methodPath) {
          gsap.fromTo(methodPath, 
            { height: "0%" },
            {
              height: "100%",
              ease: "none",
              scrollTrigger: {
                trigger: methodRef.current,
                start: "top 50%",
                end: "bottom 80%",
                scrub: true,
              }
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className="w-full bg-slate text-sand overflow-x-clip selection:bg-brand-coral selection:text-sand">
      
      {/* 1. HERO - Diagnostic Scan Experience */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-32 pb-20 border-b border-brand-coral/20 overflow-hidden">
        {/* Subtle Background Grid */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '4rem 4rem' }} 
        />
        
        {/* Scan Line Visual */}
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none overflow-hidden">
           <div className="hero-scanline absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-brand-coral/20 to-transparent blur-md" />
        </div>

        <div className="max-w-screen-2xl mx-auto w-full relative z-10 flex flex-col items-start text-left">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 border border-brand-coral/30 rounded-full bg-brand-coral/5 text-brand-coral font-label text-xs uppercase tracking-widest font-semibold">
            <span className="w-2 h-2 rounded-full bg-brand-coral animate-pulse" />
            {hero.badge}
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-black uppercase tracking-tighter leading-[0.85] mb-8 max-w-5xl">
            {hero.headline.replace(/\.$/, '').split('.').map((part, i, arr) => (
              <React.Fragment key={i}>
                {i === arr.length - 1 ? (
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-coral to-gold">
                    {part}.
                  </span>
                ) : (
                  <>{part}.<br/></>
                )}
              </React.Fragment>
            ))}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 w-full max-w-6xl">
            <div className="flex flex-col gap-6 text-xl md:text-2xl font-body text-sand/80">
              {hero.questions.map((q, i) => (
                <p key={i}>{q}</p>
              ))}
            </div>
            <div className="flex flex-col items-start justify-end p-8 bg-white/5 border-l-4 border-brand-coral rounded-r-3xl">
              <p className="text-xl font-body text-sand font-medium mb-8">
                {hero.explanation}
              </p>
              <Link href={hero.cta.href}>
                <Button size="lg" className="bg-brand-coral text-brand-navy hover:bg-brand-coral/90 w-full sm:w-auto">
                  {hero.cta.label}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. AUDIT SCOPE (Pinned Diagnostic Map) */}
      <section ref={mapContainerRef} className="relative w-full bg-slate text-sand border-b border-white/10">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 pt-16 pb-8 border-b border-white/10 relative z-20 bg-slate">
          <SectionMasthead badge={scope.badge} descriptor={scope.title} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 w-full">
          
          {/* LEFT: Pinned Central System */}
          <div ref={visualRef} className="hidden lg:flex lg:col-span-6 xl:col-span-7 flex-col h-screen border-r border-white/10 p-12 bg-slate overflow-hidden justify-center relative">
            <div className="absolute inset-0 pointer-events-none opacity-20"
                 style={{ backgroundImage: 'radial-gradient(circle at center, rgba(255,138,0,0.4) 0%, transparent 60%)' }}
            />
            <div className="relative z-10 w-full max-w-lg mx-auto aspect-square rounded-full border border-white/10 flex items-center justify-center animate-[spin_60s_linear_infinite]">
              <div className="w-3/4 h-3/4 rounded-full border border-brand-coral/30 flex items-center justify-center animate-[spin_40s_linear_infinite_reverse]">
                 <div className="w-1/2 h-1/2 rounded-full border border-gold/50 flex items-center justify-center bg-white/5 backdrop-blur-md">
                    <span className="text-brand-coral font-mono text-sm uppercase tracking-widest animate-pulse">System Core</span>
                 </div>
              </div>
            </div>

            {/* Orbiting labels around the core */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               {scope.categories.map((cat, i) => {
                 const angle = (i / scope.categories.length) * Math.PI * 2 - Math.PI / 2;
                 const radius = 280;
                 const x = Math.cos(angle) * radius;
                 const y = Math.sin(angle) * radius;
                 const isActive = activeDomain === i;
                 return (
                   <div key={i} 
                        className="absolute transition-all duration-500 flex items-center justify-center"
                        style={{ 
                          transform: `translate(${x}px, ${y}px)`,
                          opacity: isActive ? 1 : 0.2,
                          scale: isActive ? 1.1 : 0.9
                        }}>
                     <div className={`px-4 py-2 rounded-full border backdrop-blur-md ${isActive ? 'bg-brand-coral/20 border-brand-coral text-brand-coral' : 'bg-white/5 border-white/10 text-sand/50'}`}>
                       <span className="font-headline text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                         {cat.name}
                       </span>
                     </div>
                   </div>
                 )
               })}
            </div>
          </div>

          {/* RIGHT: Scrolling Scope Content */}
          <div ref={scrollRef} className="flex flex-col lg:col-span-6 xl:col-span-5 w-full relative z-10 bg-slate">
            {scope.categories.map((cat, i) => (
              <article 
                key={i} 
                className="min-h-screen flex flex-col justify-center p-8 md:p-16 border-b border-white/5 transition-opacity duration-500"
                style={{ opacity: activeDomain === null || activeDomain === i ? 1 : 0.5 }}
              >
                <div className="text-brand-coral font-mono text-sm font-bold tracking-widest mb-4">
                  0{i + 1}{" // DOMAIN"}
                </div>
                <h2 className="text-4xl md:text-5xl font-headline font-bold uppercase tracking-tight mb-6 text-sand">
                  {cat.name}
                </h2>
                
                {cat.description && (
                   <p className="text-xl text-sand/80 font-body mb-8 leading-relaxed">
                     {cat.description}
                   </p>
                )}

                <div className="bg-white/5 border-l-2 border-brand-coral/50 p-8 rounded-r-2xl">
                  <h4 className="text-sm font-label font-bold uppercase tracking-widest text-gold mb-6">
                    {cat.intro}
                  </h4>
                  <ul className="flex flex-col gap-4">
                    {cat.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CornerDownRight className="w-5 h-5 text-brand-coral shrink-0 mt-0.5" />
                        <span className="text-sand/90 font-body text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. METHODOLOGY (The Audit Framework Path) */}
      <section ref={methodRef} className="py-32 px-6 md:px-12 max-w-screen-xl mx-auto border-b border-white/10 relative">
        <div className="text-center mb-24 relative z-10">
          <SectionMasthead badge={framework.badge} descriptor={framework.title} />
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Continuous Diagnostic Path Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-white/5 -ml-[2px]">
             <div className="methodology-path w-full bg-gradient-to-b from-brand-coral to-gold origin-top" />
          </div>

          <div className="flex flex-col gap-24 relative z-10">
            {framework.steps.map((step, i) => (
              <div key={i} className="relative flex flex-col md:flex-row items-center gap-8 md:gap-16 group">
                {/* Left Side (Desktop) */}
                <div className="md:w-1/2 text-left md:text-right hidden md:block">
                  {i % 2 === 0 ? (
                    <div className="pr-12">
                      <h3 className="text-4xl lg:text-5xl font-headline font-bold uppercase tracking-tight text-white mb-4 group-hover:text-brand-coral transition-colors">
                        {step.name}
                      </h3>
                    </div>
                  ) : (
                    <div className="pr-12">
                      <p className="text-xl font-body text-sand/70">
                        {step.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Node */}
                <div className="absolute left-8 md:left-1/2 w-6 h-6 rounded-full bg-slate border-4 border-brand-coral -ml-3 z-10 shadow-[0_0_15px_rgba(255,138,0,0.5)]" />

                {/* Right Side (Desktop) & Mobile Full */}
                <div className="md:w-1/2 pl-20 md:pl-0">
                  <div className="md:pl-12">
                    {/* Mobile shows both heading and description on the right */}
                    <div className="md:hidden">
                       <h3 className="text-3xl font-headline font-bold uppercase tracking-tight text-white mb-4">
                         {step.name}
                       </h3>
                    </div>
                    
                    {i % 2 === 0 ? (
                      <p className="text-xl font-body text-sand/70">
                        {step.description}
                      </p>
                    ) : (
                      <h3 className="text-4xl lg:text-5xl font-headline font-bold uppercase tracking-tight text-white mb-4 hidden md:block group-hover:text-brand-coral transition-colors">
                        {step.name}
                      </h3>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. IDEAL CANDIDATES & CTA (Structured Checklist Path) */}
      <section className="py-32 px-6 md:px-12 bg-sand text-slate">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-5 flex flex-col">
            <SectionMasthead badge={ideal.badge} descriptor={ideal.title} />
            <p className="text-2xl font-body text-slate/80 mt-12 mb-12 border-l-4 border-brand-coral pl-6">
              {ideal.intro}
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-4">
            {ideal.situations.map((sit, i) => (
              <div key={i} className="flex items-start gap-4 p-6 bg-white rounded-xl border border-slate/10 shadow-sm hover:border-brand-coral/50 transition-colors">
                <CheckCircle2 className="w-6 h-6 text-brand-coral shrink-0 mt-0.5" />
                <span className="text-xl font-body text-slate font-medium">{sit}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-40 text-center max-w-4xl mx-auto flex flex-col items-center">
           <h2 className="text-5xl md:text-7xl font-headline font-black uppercase tracking-tighter text-slate mb-8 leading-[0.9]">
             {ideal.closingHeadline1} <br/>
             <span className="text-brand-coral">{ideal.closingHeadline2}</span>
           </h2>
           <Link href={ideal.cta.href}>
              <Button size="lg" className="bg-slate text-white hover:bg-brand-coral hover:text-brand-navy transition-colors mt-8">
                {ideal.cta.label}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
           </Link>
        </div>
      </section>

    </div>
  );
}
