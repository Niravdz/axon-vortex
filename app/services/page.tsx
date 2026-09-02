"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Activity, Cpu, LayoutTemplate, Filter, Network } from "lucide-react";
import { SectionMasthead } from "@/components/ui/SectionMasthead";
import { individualServicesData } from "@/data/content/individualServices";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DOMAINS = [
  { id: "domain-01", num: "01", name: "DIGITAL MARKETING", services: ["social-media-marketing", "meta-ads", "google-ads", "seo"], desc: "Signals moving from visibility toward business action.", theme: "light" },
  { id: "domain-02", num: "02", name: "AI & AUTOMATION", services: ["ai-chatbots", "ai-agents", "ai-automation", "voice-ai"], desc: "An intelligent workflow connecting input to action.", theme: "dark" },
  { id: "domain-03", num: "03", name: "WEBSITES & E-COMMERCE", services: ["website-development", "ecommerce-development", "shopify"], desc: "A digital experience constructed from structure to conversion.", theme: "light" },
  { id: "domain-04", num: "04", name: "LEAD GENERATION", services: ["lead-generation"], desc: "Attention becoming a qualified opportunity.", theme: "brand-coral" },
  { id: "domain-05", num: "05", name: "TECHNOLOGY & DIGITAL TRANSFORMATION", services: ["crm", "custom-software"], desc: "Disconnected tools becoming a connected operating system.", theme: "dark" },
];

const ServiceRow = ({ slug, isDark, index }: { slug: string, isDark: boolean, index: number }) => {
  const svc = individualServicesData[slug];
  const accentColor = index % 2 === 0 ? 'text-brand-turquoise' : 'text-brand-coral';
  const hoverColor = index % 2 === 0 ? 'group-hover:text-brand-turquoise' : 'group-hover:text-brand-coral';

  if (!svc) return null;
  return (
    <Link href={`/services/${slug}`} className={`group relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 p-8 md:p-10 border-b transition-all duration-500 overflow-hidden ${isDark ? 'border-white/10 hover:bg-white/5' : 'border-slate/10 hover:bg-slate/5'}`}>
      {/* Background Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-coral/0 via-brand-coral/5 to-brand-coral/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center gap-4 lg:gap-16 w-full lg:w-auto relative z-10">
        <span className={`font-mono text-sm font-bold tracking-widest ${accentColor}`}>{svc.number}</span>
        <h3 className={`text-2xl md:text-3xl font-headline font-bold uppercase tracking-tight ${isDark ? 'text-sand' : 'text-slate'} ${hoverColor} transition-colors duration-300`}>{svc.title}</h3>
      </div>

      <p className={`text-sm md:text-base max-w-xl leading-relaxed relative z-10 ${isDark ? 'text-sand/70' : 'text-slate/70'}`}>
        {svc.hero.headline}
      </p>

      <div className={`shrink-0 flex items-center gap-3 font-mono text-xs uppercase tracking-widest font-bold relative z-10 ${isDark ? 'text-white' : 'text-slate'} ${hoverColor} transition-colors duration-300 mt-4 lg:mt-0`}>
        <span>View Service</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
};

export default function ServicesDirectoryPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeDomain, setActiveDomain] = useState<string>("domain-01");
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Setup ScrollTrigger for each domain section to update the sticky nav active state
      DOMAINS.forEach((domain) => {
        ScrollTrigger.create({
          trigger: `#${domain.id}`,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setActiveDomain(domain.id);
          }
        });
      });

      // Domain 01 Metaphor: Signal Path
      const d1 = document.getElementById("domain-01");
      if (d1) {
        gsap.to(d1.querySelector(".d1-signal"), {
          x: "100%",
          ease: "none",
          scrollTrigger: { trigger: d1, start: "top bottom", end: "bottom top", scrub: 0.5 }
        });
      }

      // Domain 02 Metaphor: Workflow Nodes
      const d2 = document.getElementById("domain-02");
      if (d2) {
        gsap.fromTo(d2.querySelectorAll(".d2-node"),
          { scale: 0.8, opacity: 0.3, backgroundColor: "#1E1E2E" },
          {
            scale: 1, opacity: 1, backgroundColor: "#00C2C7",
            stagger: 0.2,
            scrollTrigger: { trigger: d2, start: "top 60%", end: "center center", scrub: 1 }
          }
        );
      }

      // Domain 03 Metaphor: Interface Frames
      const d3 = document.getElementById("domain-03");
      if (d3) {
        gsap.fromTo(d3.querySelectorAll(".d3-frame"),
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.15, scrollTrigger: { trigger: d3, start: "top 70%", end: "center center", scrub: 1 } }
        );
      }

      // Domain 04 Metaphor: Opportunity Pipeline
      const d4 = document.getElementById("domain-04");
      if (d4) {
        gsap.to(d4.querySelector(".d4-progress"), {
          height: "100%",
          ease: "none",
          scrollTrigger: { trigger: d4, start: "top 70%", end: "bottom 60%", scrub: true }
        });
        gsap.to(d4.querySelectorAll(".d4-step"), {
          color: "#FF7A59",
          stagger: 0.1,
          scrollTrigger: { trigger: d4, start: "top 60%", end: "bottom 60%", scrub: true }
        });
      }

      // Domain 05 Metaphor: Fragmentation to Connection
      const d5 = document.getElementById("domain-05");
      if (d5) {
        gsap.fromTo(d5.querySelectorAll(".d5-fragment"),
          { x: () => gsap.utils.random(-100, 100), y: () => gsap.utils.random(-100, 100), opacity: 0 },
          { x: 0, y: 0, opacity: 1, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: d5, start: "top 80%", end: "center center", scrub: 1 } }
        );
      }

    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Smooth scroll to section
  const scrollToDomain = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="w-full bg-sand text-slate selection:bg-brand-coral selection:text-sand overflow-x-clip">

      {/* 1. EDITORIAL HERO (No cards) */}
      <section className="relative min-h-[70vh] flex flex-col justify-center px-6 md:px-12 pt-32 pb-20 max-w-screen-2xl mx-auto border-b border-brand-turquoise/20 z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:items-end justify-between">
          <div className="flex flex-col gap-6 max-w-4xl">
            <div className="inline-block px-4 py-1.5 border border-brand-turquoise/30 rounded-full bg-brand-turquoise/5 text-brand-turquoise font-label text-xs uppercase tracking-widest font-semibold self-start">
              08 // ARCHITECTURAL DIRECTORY
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-black uppercase tracking-tighter leading-[0.85]">
              All Services <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-turquoise to-brand-coral">
                &amp; Capabilities.
              </span>
            </h1>
            <p className="text-xl md:text-2xl font-body font-light text-slate/80 leading-relaxed max-w-2xl mt-4">
              AxonVortex delivers specialized digital capabilities connected into one unified growth architecture. Capabilities can be deployed independently or integrated as a complete system.
            </p>
          </div>

          <div className="flex flex-col gap-6 font-mono text-sm uppercase tracking-widest border-l-2 border-brand-turquoise/30 pl-6 lg:pb-4">
            <div className="flex flex-col">
              <span className="text-slate/50 font-bold mb-1">Index Volume</span>
              <span className="text-2xl text-slate font-bold">14 Capabilities</span>
            </div>
            <div className="flex flex-col">
              <span className="text-slate/50 font-bold mb-1">Architecture</span>
              <span className="text-2xl text-brand-turquoise font-bold">5 Domains</span>
            </div>
          </div>
        </div>

        {/* Abstract Architectural Visual Cue in Hero */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full opacity-10 pointer-events-none hidden lg:block">
          <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 50 H350 V350 H50 Z" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M200 50 V350" stroke="currentColor" strokeWidth="1" />
            <path d="M50 200 H350" stroke="currentColor" strokeWidth="1" />
            <circle cx="200" cy="200" r="100" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      </section>

      {/* DIRECTORY LAYOUT: Split Screen Sticky Index & Chapters */}
      <div className="flex flex-col lg:flex-row relative">

        {/* LEFT: Sticky Domain Index */}
        <aside className="w-full lg:w-1/4 xl:w-1/5 lg:border-r border-slate/10 bg-sand relative z-40">
          <div className="sticky top-0 lg:top-24 p-6 lg:p-8 border-b lg:border-b-0 border-slate/10 bg-sand/90 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none z-50 overflow-x-auto whitespace-nowrap lg:whitespace-normal no-scrollbar">
            <span className="hidden lg:block text-xs font-mono font-bold uppercase tracking-widest text-slate/40 mb-8">Navigation Index</span>
            <nav className="flex lg:flex-col gap-4 lg:gap-2">
              {DOMAINS.map((domain) => {
                const isActive = activeDomain === domain.id;
                return (
                  <button
                    key={domain.id}
                    onClick={() => scrollToDomain(domain.id)}
                    aria-current={isActive ? "step" : undefined}
                    className={`group text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-4 border ${isActive
                      ? 'bg-brand-coral/10 border-brand-coral/20 text-brand-coral'
                      : 'bg-transparent border-transparent text-slate/60 hover:bg-slate/5 hover:text-slate'
                      }`}
                  >
                    <span className="font-mono text-xs font-bold shrink-0">{domain.num}</span>
                    <span className="font-headline font-bold text-sm uppercase tracking-wide truncate">{domain.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* RIGHT: Domain Chapters (Narrative Data Path) */}
        <div className="w-full lg:w-3/4 xl:w-4/5 flex flex-col relative border-l border-white/5">

          {/* Continuous Architectural Line (Visible only on Desktop for Dark backgrounds, handled per section) */}

          {/* DOMAIN 01: DIGITAL MARKETING */}
          <section id="domain-01" className="min-h-screen py-24 md:py-32 bg-sand text-slate border-b border-slate/10 relative">
            <div className="px-6 md:px-12 max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
              <div className="lg:col-span-4 flex flex-col gap-6">
                <SectionMasthead badge="DOMAIN 01" descriptor="DIGITAL MARKETING" />
                <p className="text-xl font-body text-slate/70">{DOMAINS[0].desc}</p>
                {/* Visual Metaphor: Horizontal Signal */}
                <div className="h-16 w-full border border-slate/10 rounded-lg bg-white relative overflow-hidden flex items-center mt-4">
                  <div className="absolute left-0 right-0 h-[1px] bg-slate/10" />
                  <div className="d1-signal w-32 h-full absolute left-[-100%] bg-gradient-to-r from-transparent via-brand-turquoise/20 to-transparent blur-sm" />
                  <Activity className="absolute text-brand-turquoise w-6 h-6 left-1/2 -translate-x-1/2" />
                </div>
              </div>
              <div className="lg:col-span-8 flex flex-col border-t border-slate/10">
                {DOMAINS[0].services.map((slug, i) => (
                  <ServiceRow key={slug} slug={slug} isDark={false} index={i} />
                ))}
              </div>
            </div>
          </section>

          {/* DOMAIN 02: AI & AUTOMATION */}
          <section id="domain-02" className="min-h-screen py-24 md:py-32 bg-slate text-sand border-b border-white/10 relative">
            {/* Dark Path Line */}
            <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-[1px] bg-white/5" />
            <div className="px-6 md:px-12 max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
              <div className="lg:col-span-4 flex flex-col gap-6 relative z-10">
                <SectionMasthead badge="DOMAIN 02" descriptor="AI & AUTOMATION" />
                <p className="text-xl font-body text-sand/70">{DOMAINS[1].desc}</p>
                {/* Visual Metaphor: Workflow Nodes */}
                <div className="h-32 w-full mt-4 flex items-center justify-between relative px-4">
                  <div className="absolute left-4 right-4 h-[1px] border-t-2 border-dashed border-white/20 top-1/2 -translate-y-1/2" />
                  {[1, 2, 3].map(i => (
                    <div key={i} className="d2-node w-12 h-12 rounded-xl bg-white/5 border border-white/20 relative z-10 flex items-center justify-center shadow-lg">
                      <Cpu className="w-5 h-5 text-sand" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-8 flex flex-col border-t border-white/10 relative z-10">
                {DOMAINS[1].services.map((slug, i) => (
                  <ServiceRow key={slug} slug={slug} isDark={true} index={i} />
                ))}
              </div>
            </div>
          </section>

          {/* DOMAIN 03: WEBSITES & E-COMMERCE */}
          <section id="domain-03" className="min-h-screen py-24 md:py-32 bg-white text-slate border-b border-slate/10 relative">
            <div className="px-6 md:px-12 max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
              <div className="lg:col-span-4 flex flex-col gap-6">
                <SectionMasthead badge="DOMAIN 03" descriptor="WEBSITES & E-COMMERCE" />
                <p className="text-xl font-body text-slate/70">{DOMAINS[2].desc}</p>
                {/* Visual Metaphor: Interface Frames */}
                <div className="h-40 w-full mt-4 relative">
                  <div className="d3-frame absolute top-0 left-0 w-3/4 h-24 bg-slate/5 border border-slate/10 rounded-lg shadow-sm" />
                  <div className="d3-frame absolute top-4 left-4 w-3/4 h-24 bg-slate/10 border border-slate/20 rounded-lg shadow-md backdrop-blur-sm" />
                  <div className="d3-frame absolute top-8 left-8 w-3/4 h-24 bg-slate border border-slate rounded-lg shadow-xl flex items-center justify-center text-sand">
                    <LayoutTemplate className="w-8 h-8 opacity-50" />
                  </div>
                </div>
              </div>
              <div className="lg:col-span-8 flex flex-col border-t border-slate/10">
                {DOMAINS[2].services.map((slug, i) => (
                  <ServiceRow key={slug} slug={slug} isDark={false} index={i} />
                ))}
              </div>
            </div>
          </section>

          {/* DOMAIN 04: LEAD GENERATION */}
          <section id="domain-04" className="min-h-screen py-24 md:py-32 bg-sand text-slate border-b border-brand-coral/20 relative overflow-hidden">
            <div className="px-6 md:px-12 max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
              <div className="lg:col-span-4 flex flex-col gap-6">
                <SectionMasthead badge="DOMAIN 04" descriptor="LEAD GENERATION" />
                <p className="text-xl font-body text-slate/70">{DOMAINS[3].desc}</p>
                {/* Visual Metaphor: Vertical Pipeline */}
                <div className="w-full bg-white rounded-3xl border border-slate/10 shadow-xl p-6 relative overflow-hidden mt-4">
                  <div className="absolute top-0 left-8 bottom-0 w-1 bg-slate/5" />
                  <div className="d4-progress absolute top-0 left-8 bottom-0 w-1 bg-brand-coral/10 border-l-4 border-brand-coral" style={{ height: "0%" }} />

                  <div className="relative z-10 flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                      <Filter className="w-6 h-6 text-brand-coral shrink-0" />
                      <span className="d4-step text-slate/40 font-headline font-bold uppercase tracking-widest text-xs">Attention</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <ArrowRight className="w-6 h-6 text-brand-coral shrink-0" />
                      <span className="d4-step text-slate/40 font-headline font-bold uppercase tracking-widest text-xs">Landing</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Activity className="w-6 h-6 text-brand-coral shrink-0" />
                      <span className="d4-step text-slate/40 font-headline font-bold uppercase tracking-widest text-xs">Opportunity</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 flex flex-col border-t border-slate/10">
                {DOMAINS[3].services.map((slug, i) => (
                  <ServiceRow key={slug} slug={slug} isDark={false} index={i} />
                ))}
              </div>
            </div>
          </section>

          {/* DOMAIN 05: TECHNOLOGY & TRANSFORMATION */}
          <section id="domain-05" className="min-h-screen py-24 md:py-32 bg-slate text-sand border-b border-slate/10 relative">
            <div className="px-6 md:px-12 max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
              <div className="lg:col-span-4 flex flex-col gap-6">
                <SectionMasthead badge="DOMAIN 05" descriptor="TECHNOLOGY & DIGITAL TRANSFORMATION" />
                <p className="text-xl font-body text-sand/70">{DOMAINS[4].desc}</p>
                {/* Visual Metaphor: Fragmented to Connected Grid */}
                <div className="h-40 w-full mt-4 relative grid grid-cols-3 gap-2 p-4">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className={`d5-fragment rounded-md border ${i === 4 ? 'bg-brand-turquoise border-brand-turquoise' : 'bg-white/5 border-white/10'} flex items-center justify-center`}>
                      {i === 4 && <Network className="w-6 h-6 text-white" />}
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-8 flex flex-col border-t border-white/10">
                {DOMAINS[4].services.map((slug, i) => (
                  <ServiceRow key={slug} slug={slug} isDark={true} index={i} />
                ))}
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
