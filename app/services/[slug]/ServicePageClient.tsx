"use client";

import React, { useRef, useLayoutEffect } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { SectionMasthead } from "@/components/ui/SectionMasthead";
import { Button } from "@/components/ui/Button";
import { individualServicesData } from "@/data/content/individualServices";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ServicePageClient({ slug }: { slug: string }) {
  const data = individualServicesData[slug];

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const problemRef = useRef<HTMLElement>(null);
  const capabilitiesRef = useRef<HTMLElement>(null);
  const approachRef = useRef<HTMLElement>(null);
  const audienceRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Hero
        if (heroRef.current) {
          gsap.fromTo(heroRef.current.querySelectorAll("[data-anim]"),
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out" }
          );
        }

        // Problem
        if (problemRef.current) {
          const m = problemRef.current.querySelector("[data-anim='p-masthead']");
          const l = problemRef.current.querySelector("[data-anim='p-left']");
          const points = problemRef.current.querySelectorAll("[data-anim='p-point']");
          const flow = problemRef.current.querySelector("[data-anim='p-flow']");

          const pTl = gsap.timeline({ scrollTrigger: { trigger: problemRef.current, start: "top 80%" } });
          if (m) pTl.fromTo(m, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 });
          if (l) pTl.fromTo(l, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7 }, 0.1);
          if (points.length) pTl.fromTo(points, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, 0.3);
          if (flow) pTl.fromTo(flow, { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7 }, 0.6);
        }

        // Capabilities
        if (capabilitiesRef.current) {
          const cTl = gsap.timeline({ scrollTrigger: { trigger: capabilitiesRef.current, start: "top 80%" } });
          const m = capabilitiesRef.current.querySelector("[data-anim='c-masthead']");
          const cards = capabilitiesRef.current.querySelectorAll("[data-anim='c-card']");
          if (m) cTl.fromTo(m, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 });
          if (cards.length) cTl.fromTo(cards, { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, 0.2);
        }

        // Approach
        if (approachRef.current) {
          const aTl = gsap.timeline({ scrollTrigger: { trigger: approachRef.current, start: "top 80%" } });
          const m = approachRef.current.querySelector("[data-anim='a-masthead']");
          const nodes = approachRef.current.querySelectorAll("[data-anim='a-node']");
          if (m) aTl.fromTo(m, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 });
          if (nodes.length) aTl.fromTo(nodes, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, 0.2);
        }

        // Audience
        if (audienceRef.current) {
          const wTl = gsap.timeline({ scrollTrigger: { trigger: audienceRef.current, start: "top 80%" } });
          const m = audienceRef.current.querySelector("[data-anim='w-masthead']");
          const block = audienceRef.current.querySelector("[data-anim='w-block']");
          const points = audienceRef.current.querySelectorAll("[data-anim='w-point']");
          if (m) wTl.fromTo(m, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 });
          if (block) wTl.fromTo(block, { scale: 0.96, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8 }, 0.2);
          if (points.length) wTl.fromTo(points, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.1 }, 0.6);
        }

        // CTA
        if (ctaRef.current) {
          gsap.fromTo(ctaRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, scrollTrigger: { trigger: ctaRef.current, start: "top 85%" } });
        }
      });

      mm.add("(max-width: 767px)", () => {
        // Fallback mobile triggers
        if (heroRef.current) gsap.fromTo(heroRef.current.querySelectorAll("[data-anim]"), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 });
        if (problemRef.current) gsap.fromTo(problemRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, scrollTrigger: { trigger: problemRef.current, start: "top 90%" } });
        if (capabilitiesRef.current) gsap.fromTo(capabilitiesRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, scrollTrigger: { trigger: capabilitiesRef.current, start: "top 90%" } });
        if (approachRef.current) gsap.fromTo(approachRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, scrollTrigger: { trigger: approachRef.current, start: "top 90%" } });
        if (audienceRef.current) gsap.fromTo(audienceRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, scrollTrigger: { trigger: audienceRef.current, start: "top 90%" } });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, slug]);

  if (!data) return null;

  return (
    <div ref={containerRef} className="w-full bg-slate text-sand selection:bg-brand-coral selection:text-sand overflow-x-clip min-h-screen">

      {/* 1. HERO */}
      <section ref={heroRef} className="relative min-h-[70vh] flex flex-col justify-center px-6 md:px-12 pt-32 pb-20 border-b border-brand-coral/20 overflow-hidden">
        {/* Dynamic Background Variant based on category */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none flex items-center justify-center overflow-hidden">
          <div className={`absolute w-[150vw] h-[150vw] md:w-[80vw] md:h-[80vw] rounded-full blur-[100px] 
            ${data.category === 'Digital Marketing' ? 'bg-brand-coral/20' :
              data.category === 'AI & Automation' ? 'bg-gold/20' :
                data.category === 'Websites & E-Commerce' ? 'bg-white/10' : 'bg-brand-coral/10'}`}
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
        </div>

        <div className="max-w-screen-xl mx-auto w-full relative z-10">
          <div data-anim="h-masthead" className="inline-block mb-8 px-4 py-1.5 border border-white/20 rounded-full bg-white/5 text-sand font-label text-xs uppercase tracking-widest font-semibold">
            {data.number}{" // "}{data.category}
          </div>
          <h1 data-anim="h-head" className="text-4xl sm:text-6xl md:text-7xl lg:text-[6rem] font-headline font-black uppercase tracking-tighter leading-[0.9] mb-8 text-white max-w-5xl">
            {data.hero.headline}
          </h1>
          <div data-anim="h-copy" className="flex flex-col gap-4 text-xl md:text-2xl font-body text-sand/70 max-w-3xl leading-relaxed mb-10 border-l-4 border-brand-coral pl-6">
            {data.hero.paragraphs.map((p, idx) => <p key={idx}>{p}</p>)}
          </div>
          <div data-anim="h-cta">
            <Button variant="primary" size="lg" className="bg-brand-navy text-white hover:bg-brand-coral hover:text-brand-navy text-lg px-8" asLink href={data.hero.cta.href}>
              {data.hero.cta.label}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM */}
      <section ref={problemRef} className="py-24 md:py-32 px-6 md:px-12 bg-white text-slate border-b border-slate/10 relative">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div data-anim="p-masthead" className="lg:col-span-12">
            <SectionMasthead badge="DIAGNOSIS" descriptor="THE PROBLEM" />
          </div>

          <div data-anim="p-left" className="lg:col-span-5 flex flex-col gap-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold uppercase tracking-tight text-slate leading-tight">
              {data.problem.headline}
            </h2>
            {data.problem.purposeLead && (
              <p className="text-xl font-headline font-bold text-slate/80">
                {data.problem.purposeLead}
              </p>
            )}
            {data.problem.paragraphs && (
              <div className="flex flex-col gap-4 text-lg text-slate/70 font-body leading-relaxed">
                {data.problem.paragraphs.map((p, idx) => <p key={idx}>{p}</p>)}
              </div>
            )}
            {data.problem.conclusion && (
              <p className="text-lg font-headline font-bold text-brand-coral pt-4">
                {data.problem.conclusion}
              </p>
            )}
          </div>

          <div className="lg:col-span-7 flex flex-col gap-8">
            {data.problem.points && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.problem.points.map((pt, idx) => (
                  <div key={idx} data-anim="p-point" className="p-6 rounded-2xl bg-surface-muted border border-[#1E1E2E]/10 text-base font-body text-slate/80 flex items-start gap-4">
                    <span className="font-mono text-sm text-brand-coral font-bold mt-1">0{idx + 1}</span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            )}
            {data.problem.flow && (
              <div data-anim="p-flow" className="p-8 rounded-3xl bg-[#F4F7FA] border border-brand-coral/20 flex flex-wrap items-center gap-4 text-sm font-headline font-bold uppercase text-slate mt-4">
                {data.problem.flow.map((item, idx) => (
                  <React.Fragment key={idx}>
                    <span className="px-4 py-2 rounded-lg bg-white border border-brand-coral/10 shadow-sm">{item}</span>
                    {idx < data.problem.flow!.length - 1 && <ArrowRight className="text-brand-coral w-5 h-5" />}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. CAPABILITIES */}
      <section ref={capabilitiesRef} className="py-24 md:py-32 px-6 md:px-12 bg-slate text-sand border-b border-white/10">
        <div className="max-w-screen-xl mx-auto flex flex-col gap-12">
          <div data-anim="c-masthead">
            <SectionMasthead badge="CAPABILITIES" descriptor={data.whatWeDo.title} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.whatWeDo.items.map((item, idx) => (
              <div key={idx} data-anim="c-card" className="p-8 md:p-10 rounded-3xl bg-white/5 border border-white/10 flex flex-col justify-between min-h-[200px] hover:bg-white/10 transition-colors group">
                <div>
                  <span className="font-mono text-sm text-brand-coral font-bold block mb-4 border-b border-white/10 pb-4">
                    0{idx + 1}
                  </span>
                  <h3 className="text-2xl font-headline font-bold uppercase text-white mb-4 group-hover:text-brand-coral transition-colors">
                    {item.title}
                  </h3>
                </div>
                <p className="text-base text-sand/70 font-body leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. APPROACH */}
      {data.approach && (
        <section ref={approachRef} className="py-24 px-6 md:px-12 bg-white text-slate border-b border-slate/10">
          <div className="max-w-screen-xl mx-auto flex flex-col gap-16">
            <div data-anim="a-masthead">
              <SectionMasthead badge="METHODOLOGY" descriptor={data.approach.title} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 relative">
              <div className="hidden xl:block absolute top-12 left-0 right-0 h-0.5 bg-slate/10 z-0" />
              {data.approach.steps.map((st) => (
                <div key={st.number} data-anim="a-node" className="relative z-10 flex flex-col gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-coral text-white flex items-center justify-center font-mono text-sm font-bold shadow-lg">
                    {st.number}
                  </div>
                  <h3 className="text-lg font-headline font-bold uppercase text-slate mt-2">
                    {st.title}
                  </h3>
                  <p className="text-sm text-slate/70 font-body leading-relaxed pr-4 border-l-2 border-slate/10 pl-3">
                    {st.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. AUDIENCE */}
      <section ref={audienceRef} className="py-24 px-6 md:px-12 bg-slate text-sand">
        <div className="max-w-screen-xl mx-auto flex flex-col gap-12">
          <div data-anim="w-masthead">
            <SectionMasthead badge="AUDIENCE FIT" descriptor="WHO IT'S FOR" />
          </div>
          <div data-anim="w-block" className="p-10 sm:p-16 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-10">
            <h2 className="text-3xl md:text-4xl font-headline font-bold uppercase tracking-tight text-white max-w-2xl">
              {data.whoItIsFor.headline}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.whoItIsFor.points.map((pt, idx) => (
                <div key={idx} data-anim="w-point" className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4 text-base font-body text-sand/80">
                  <CheckCircle2 className="w-6 h-6 text-brand-coral shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section ref={ctaRef} className="py-24 px-6 md:px-12 bg-sand text-slate border-t border-slate/10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-headline font-black uppercase tracking-tighter text-slate mb-8 max-w-3xl leading-tight">
            {data.finalCta.headline}
          </h2>
          <Button variant="primary" size="lg" className="bg-brand-navy text-white hover:bg-brand-coral hover:text-brand-navy text-xl px-12 py-6 h-auto" asLink href={data.finalCta.cta.href}>
            {data.finalCta.cta.label}
            <ArrowRight className="ml-2 w-6 h-6" />
          </Button>
        </div>
      </section>
    </div>
  );
}
