"use client";

import React, { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { ArrowRight, CornerDownRight, X, Check } from "lucide-react";
import { SectionMasthead } from "@/components/ui/SectionMasthead";
import { Button } from "@/components/ui/Button";
import { authorityData } from "@/data/content/authorityConversion";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const ambitionRef = useRef<HTMLElement>(null);
  const beliefsRef = useRef<HTMLElement>(null);
  const publicRef = useRef<HTMLElement>(null);

  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        // Hero Parallax
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

        // Fragmentation to Connection Animation (Ambition Section)
        const fragments = document.querySelectorAll('.ambition-fragment');
        const centerTarget = document.querySelector('.ambition-center');

        if (fragments.length && centerTarget) {
          gsap.fromTo(fragments,
            { x: () => (Math.random() - 0.5) * 800, y: () => (Math.random() - 0.5) * 800, opacity: 0, rotation: () => Math.random() * 90 },
            {
              x: 0, y: 0, opacity: 1, rotation: 0,
              duration: 1.5,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ambitionRef.current,
                start: "top 60%",
              }
            }
          );
        }

        // Drawing the line in Building in Public
        const line = document.querySelector('.public-timeline-line');
        if (line) {
          gsap.fromTo(line,
            { height: "0%" },
            {
              height: "100%",
              ease: "none",
              scrollTrigger: {
                trigger: publicRef.current,
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
    <div ref={containerRef} className="w-full overflow-x-clip selection:bg-brand-coral selection:text-sand">

      {/* 1. HERO - Editorial Manifesto */}
      <section ref={heroRef} className="relative min-h-[95vh] flex flex-col justify-center px-6 md:px-12 pt-32 pb-20 bg-slate text-sand border-b border-brand-coral/20 z-10">
        <div className="max-w-screen-2xl mx-auto w-full">
          <div className="inline-block mb-12 px-4 py-1.5 border border-white/20 rounded-full bg-white/5 text-sand font-label text-xs uppercase tracking-widest font-semibold self-start">
            {about.badge}
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-9xl font-headline font-black uppercase tracking-tighter leading-[0.85] mb-8 max-w-7xl">
            {about.headlinePrimary} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-coral to-gold">
              {about.headlineSecondary}
            </span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-20 border-t border-white/10 pt-12">
            <div className="md:col-span-5">
              <p className="text-2xl lg:text-3xl font-headline font-bold uppercase tracking-tight text-white mb-6">
                {about.beliefParagraph1}
              </p>
              <p className="text-xl lg:text-2xl font-body font-light text-sand/70">
                {about.beliefParagraph2}
              </p>
            </div>
            <div className="md:col-span-7 flex flex-col justify-end">
              <span className="text-sm font-label uppercase tracking-widest text-brand-coral mb-6 block">
                {about.intersectionLabel}
              </span>
              <div className="flex flex-wrap gap-4">
                {about.intersections.map((item, i) => (
                  <div key={i} className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-sand font-headline uppercase tracking-wider text-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ORIGIN STORY */}
      <section ref={originsRef} className="py-32 px-6 md:px-12 bg-sand text-slate border-b border-slate/10">
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-32">
          <div className="lg:w-1/3">
            <SectionMasthead badge={whyExists.badge} descriptor={whyExists.title} />
          </div>
          <div className="lg:w-2/3 flex flex-col gap-12">
            <h2 className="text-4xl md:text-5xl font-headline font-bold uppercase tracking-tight text-slate">
              {whyExists.contrastStatement}
            </h2>

            <div className="flex flex-col gap-6 text-xl md:text-2xl font-body text-slate/70">
              {whyExists.moreStatements.map((stmt, i) => (
                <p key={i}>{stmt}</p>
              ))}
            </div>

            <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate/10 mt-8">
              <span className="text-brand-coral font-label text-sm uppercase tracking-widest font-bold mb-6 block">
                {whyExists.challengeIntro}
              </span>
              <ul className="flex flex-col gap-6">
                {whyExists.questions.map((q, i) => (
                  <li key={i} className="text-2xl md:text-3xl font-headline font-bold uppercase tracking-tight text-slate flex items-center gap-6">
                    <span className="text-slate/20 font-mono text-xl">0{i + 1}</span>
                    {q}
                  </li>
                ))}
              </ul>
              <div className="mt-12 pt-8 border-t border-slate/10">
                <p className="text-2xl font-body font-medium text-brand-coral">
                  {whyExists.conclusion}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SYSTEM AMBITION (Fragmentation to Connection) */}
      <section ref={ambitionRef} className="py-40 px-6 md:px-12 bg-slate text-sand border-y border-brand-coral/20 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto text-center relative z-10">
          <SectionMasthead badge={whatWeAreBuilding.badge} descriptor={whatWeAreBuilding.title} />

          <h2 className="text-3xl md:text-5xl font-headline font-bold uppercase tracking-tight text-white max-w-4xl mx-auto mt-12 mb-24 leading-tight">
            {whatWeAreBuilding.ambition}
          </h2>

          <div className="relative h-96 flex items-center justify-center mb-24 ambition-center">
            <div className="absolute inset-0 bg-brand-coral/5 blur-3xl rounded-full" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
              {whatWeAreBuilding.connectors.map((c, i) => (
                <div key={i} className="ambition-fragment bg-white/10 backdrop-blur-md border border-white/20 px-8 py-6 rounded-2xl flex items-center justify-center">
                  <span className="text-xl font-headline font-bold uppercase tracking-wider text-sand">
                    {c}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-4xl md:text-7xl font-headline font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-brand-coral to-gold">
            {whatWeAreBuilding.conclusion}
          </p>
        </div>
      </section>

      {/* 4. CORE CONVICTIONS (Alternating Typography) */}
      <section ref={beliefsRef} className="w-full flex flex-col">
        {beliefs.groups.map((group, i) => {
          const isDark = i % 2 === 0;
          return (
            <article
              key={i}
              className={`py-32 px-6 md:px-12 ${isDark ? 'bg-slate text-sand border-b border-white/10' : 'bg-sand text-slate border-b border-slate/10'}`}
            >
              <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-5 flex flex-col">
                  <div className="text-[120px] font-headline font-black leading-none tracking-tighter opacity-10 mb-8">
                    0{i + 1}
                  </div>
                  <h2 className="text-4xl md:text-5xl font-headline font-bold uppercase tracking-tight mb-4">
                    {group.title}
                  </h2>
                  {group.subtitle && (
                    <h3 className={`text-xl font-body ${isDark ? 'text-gold' : 'text-brand-coral'}`}>
                      {group.subtitle}
                    </h3>
                  )}
                </div>

                <div className="lg:col-span-7 flex flex-col justify-center">
                  {group.intro && (
                    <p className={`text-2xl font-body mb-8 ${isDark ? 'text-sand/80' : 'text-slate/80'}`}>
                      {group.intro}
                    </p>
                  )}

                  {group.items && (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                      {group.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-4">
                          <CornerDownRight className={`w-6 h-6 shrink-0 mt-1 ${isDark ? 'text-brand-coral' : 'text-slate/40'}`} />
                          <span className="text-xl font-body">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {group.statements && (
                    <div className="flex flex-col gap-6">
                      {group.statements.map((stmt, idx) => (
                        <p key={idx} className={`text-2xl lg:text-3xl font-headline font-bold uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate'} border-l-4 ${isDark ? 'border-brand-coral' : 'border-slate'} pl-6`}>
                          {stmt}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* 5. BUILDING IN PUBLIC (Living Timeline) */}
      <section ref={publicRef} className="py-40 px-6 md:px-12 bg-sand border-b border-slate/10 relative overflow-hidden">
        <div className="max-w-screen-lg mx-auto relative z-10">
          <SectionMasthead badge={buildingInPublic.badge} descriptor={buildingInPublic.title} />

          <div className="mt-20 relative">
            {/* The line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-slate/10 -ml-px">
              <div className="public-timeline-line w-full bg-brand-coral origin-top" />
            </div>

            <div className="flex flex-col gap-24">
              <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-16">
                <div className="md:w-1/2 text-left md:text-right">
                  <h3 className="text-3xl md:text-4xl font-headline font-bold uppercase tracking-tight text-slate">
                    {buildingInPublic.opening}
                  </h3>
                </div>
                <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-sand border-2 border-brand-coral -ml-2 z-10" />
                <div className="md:w-1/2" />
              </div>

              <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-16">
                <div className="md:w-1/2 hidden md:block" />
                <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-sand border-2 border-brand-coral -ml-2 z-10" />
                <div className="md:w-1/2 pl-16 md:pl-0">
                  <div className="bg-slate text-sand p-8 rounded-3xl shadow-xl">
                    <p className="text-3xl font-headline font-bold uppercase text-brand-coral mb-6">
                      {buildingInPublic.statement}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {buildingInPublic.verbs.map((v, i) => (
                        <span key={i} className="text-lg font-body text-sand/80">{v}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative flex flex-col md:flex-row items-start gap-8 md:gap-16">
                <div className="md:w-1/2 text-left md:text-right pl-16 md:pl-0">
                  <span className="text-sm font-label uppercase tracking-widest font-bold text-slate/50 mb-6 block">
                    {buildingInPublic.shareLabel}
                  </span>
                  <ul className="flex flex-col gap-4 items-start md:items-end">
                    {buildingInPublic.shareItems.map((item, i) => (
                      <li key={i} className="text-xl font-body text-slate flex items-center gap-4">
                        <span className="md:hidden w-1.5 h-1.5 bg-brand-coral rounded-full" />
                        {item}
                        <span className="hidden md:block w-1.5 h-1.5 bg-brand-coral rounded-full" />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-sand border-2 border-brand-coral -ml-2 z-10 mt-2" />
                <div className="md:w-1/2" />
              </div>
            </div>

            <div className="text-center mt-32 relative z-10">
              <p className="text-4xl font-headline font-black uppercase tracking-tight text-slate bg-sand inline-block px-8 py-4 border-2 border-slate rounded-full">
                {buildingInPublic.closing}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. REJECT & EMBRACE */}
      <section className="py-32 px-6 md:px-12 bg-slate text-sand">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="border border-white/10 rounded-3xl p-12 bg-white/5 relative overflow-hidden">
            <SectionMasthead badge={whatWeDontBelieveIn.badge} descriptor="Reject" />
            <h2 className="text-3xl font-headline font-bold uppercase tracking-tight text-white mt-12 mb-8">
              {whatWeDontBelieveIn.title}
            </h2>
            <ul className="flex flex-col gap-6">
              {whatWeDontBelieveIn.items.map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-xl font-body text-sand/80">
                  <X className="w-6 h-6 text-white/50 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-brand-coral/30 rounded-3xl p-12 bg-brand-coral/5 relative overflow-hidden">
            <SectionMasthead badge={whatWeDoBelieveIn.badge} descriptor="Embrace" />
            <h2 className="text-3xl font-headline font-bold uppercase tracking-tight text-brand-coral mt-12 mb-8">
              {whatWeDoBelieveIn.title}
            </h2>
            <ul className="flex flex-col gap-6">
              {whatWeDoBelieveIn.items.map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-xl font-body text-sand">
                  <Check className="w-6 h-6 text-brand-coral shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-32 text-center flex flex-col items-center">
          <h2 className="text-5xl md:text-7xl font-headline font-black uppercase tracking-tighter text-white mb-12">
            {whatWeDoBelieveIn.ctaHeadline}
          </h2>
          <Link href={whatWeDoBelieveIn.cta.href}>
            <Button size="lg" className="bg-brand-navy text-white hover:bg-brand-coral hover:text-brand-navy">
              {whatWeDoBelieveIn.cta.label}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
