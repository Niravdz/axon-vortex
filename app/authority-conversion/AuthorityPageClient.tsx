"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, CheckCircle2, Workflow } from "lucide-react";
import { SectionMasthead } from "@/components/ui/SectionMasthead";
import { Button } from "@/components/ui/Button";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Deterministic signal coordinates prevent server/client hydration mismatches.
const VISIBILITY_SIGNAL_POSITIONS = Array.from({ length: 15 }, (_, index) => ({
  left: (index * 37 + 11) % 96,
  top: (index * 53 + 17) % 92,
}));

// Data exactly matching original
const principles = [
  { title: "Strategy Before Technology", desc: "Understand the problem before choosing the tool." },
  { title: "Practical AI", desc: "Use AI where it creates meaningful, measurable business value." },
  { title: "Human + AI", desc: "Combine computational automation with strategic human judgment." },
  { title: "Connected Growth", desc: "Make all digital systems, pipelines, and tools work together as one." },
  { title: "Continuous Improvement", desc: "Build, measure, learn, and continuously iterate." },
  { title: "Business Impact", desc: "Prioritize revenue-driving outcomes over vanity metrics." },
];

const faqs = [
  {
    q: "What is AxonVortex?",
    a: "AxonVortex is an AI-driven digital growth agency helping businesses build, market and scale smarter through a combination of strategy, marketing, creativity, technology, AI, automation and data.",
  },
  {
    q: "Do you only provide AI services?",
    a: "No. AI is one part of our broader digital growth approach. Depending on the business challenge, the right solution may involve marketing, websites, lead generation, technology, automation, AI or a combination.",
  },
  {
    q: "Do I need to know which service I need?",
    a: "No. You can start by explaining your business challenge and goal. We'll help identify the most relevant next step.",
  },
  {
    q: "Are you a new agency?",
    a: "Yes. AxonVortex is being built from zero. We believe transparency is more valuable than pretending to have achievements we don't have.",
  },
  {
    q: "Do you work with existing systems?",
    a: "Yes, where appropriate. We can evaluate existing websites, marketing channels, CRM systems, tools and workflows before recommending changes.",
  },
];

export default function AuthorityPageClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const synthesisRef = useRef<HTMLElement>(null);
  const principlesRef = useRef<HTMLElement>(null);
  const publicRef = useRef<HTMLElement>(null);
  
  const prefersReducedMotion = useReducedMotion();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activePrinciple, setActivePrinciple] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        // 1. Hero (VISIBILITY) - Scattered signals
        const signals = document.querySelectorAll('.visibility-signal');
        gsap.to(signals, {
          y: (i) => (i % 2 === 0 ? -100 : 100),
          x: (i) => (i % 3 === 0 ? 50 : -50),
          opacity: 0,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        });
        gsap.to(heroRef.current, {
          y: 50, opacity: 0.2,
          scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true }
        });

        // 2. Synthesis (RELEVANCE & CLARITY)
        const leftPanel = document.querySelector('.synth-left');
        const rightPanel = document.querySelector('.synth-right');
        if (leftPanel && rightPanel) {
          gsap.fromTo(leftPanel, { y: 100, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: synthesisRef.current, start: "top 70%" }
          });
          gsap.fromTo(rightPanel, { y: 150, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: synthesisRef.current, start: "top 60%" }
          });
        }

        // 3. Principles (EVIDENCE & AUTHORITY) Accumulating Stack
        const principleItems = document.querySelectorAll('.principle-item');
        principleItems.forEach((item, i) => {
          ScrollTrigger.create({
            trigger: item,
            start: "top 60%",
            end: "bottom 40%",
            onEnter: () => setActivePrinciple(i),
            onEnterBack: () => setActivePrinciple(i),
            onLeave: () => { if (i === principleItems.length - 1) setActivePrinciple(null); },
            onLeaveBack: () => { if (i === 0) setActivePrinciple(null); }
          });
          
          gsap.fromTo(item, 
            { opacity: 0, x: -50 },
            { 
              opacity: 1, x: 0, duration: 0.8, ease: "power2.out",
              scrollTrigger: { trigger: item, start: "top 80%" }
            }
          );
        });

        // 4. Building in Public (TRUST) Text reveal
        const words = document.querySelectorAll('.public-text-word');
        if (words.length > 0) {
          gsap.fromTo(words, 
            { opacity: 0.2 }, 
            { 
              opacity: 1, 
              stagger: 0.1, 
              scrollTrigger: { 
                trigger: publicRef.current, 
                start: "top 60%", 
                end: "center center", 
                scrub: true 
              } 
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const publicText = "We're not here to pretend we've already built something huge. We're here to build something valuable. That means testing ideas, experimenting with AI, developing systems, studying what works, learning from what doesn't and continuously improving in public. No manufactured success stories. No inflated promises.";

  return (
    <div ref={containerRef} className="w-full bg-slate text-sand overflow-x-clip selection:bg-brand-coral selection:text-sand">
      
      {/* 1. HERO - Visibility & Relevance */}
      <section ref={heroRef} className="relative min-h-[95vh] flex flex-col justify-center px-6 md:px-12 pt-32 pb-20 border-b border-brand-coral/20 overflow-hidden">
        {/* Scattered Visibility Signals */}
        <div className="absolute inset-0 z-0 pointer-events-none">
           {[...Array(15)].map((_, i) => (
             <div key={i} className={`visibility-signal absolute w-2 h-2 rounded-full ${i % 3 === 0 ? 'bg-brand-coral/60' : 'bg-white/20 blur-[1px]'}`}
                  style={{
                    left: `${VISIBILITY_SIGNAL_POSITIONS[i].left}%`,
                    top: `${VISIBILITY_SIGNAL_POSITIONS[i].top}%`,
                  }} />
           ))}
        </div>

        <div className="max-w-screen-xl mx-auto w-full relative z-10">
          <div className="inline-block mb-8 px-4 py-1.5 border border-white/20 rounded-full bg-white/5 text-sand font-label text-xs uppercase tracking-widest font-semibold">
            STRATEGIC POSITIONING
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-black uppercase tracking-tighter leading-[0.9] mb-8 text-white max-w-5xl">
            Authority &<br/><span className="text-brand-coral">Conversion</span>
          </h1>
          <p className="text-3xl md:text-4xl font-headline font-bold text-white mb-6">
            AI Is Powerful. Strategy Makes It Useful.
          </p>
          <p className="text-xl md:text-2xl font-body text-sand/70 max-w-3xl leading-relaxed">
            Technology can accelerate execution. But without the right strategy, faster execution simply creates more noise. AxonVortex builds practical digital growth systems around real business goals.
          </p>
        </div>
      </section>

      {/* 2. THE SYNTHESIS - Clarity */}
      <section ref={synthesisRef} className="py-32 px-6 md:px-12 bg-white text-slate border-b border-slate/10 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mb-16">
            <SectionMasthead badge="THE SYNTHESIS" descriptor="AI Brings Speed. Humans Bring Judgment." />
            <p className="text-2xl font-body text-slate/80 mt-8 max-w-2xl border-l-4 border-brand-coral pl-6">
              The goal isn&apos;t to choose between humans and AI. It&apos;s to make both work better together.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-slate/20 rounded-3xl overflow-hidden shadow-xl">
            <div className="synth-left bg-slate text-sand p-12 md:p-20 relative">
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-coral/10 rounded-bl-full -mr-16 -mt-16" />
               <span className="font-mono text-brand-coral font-bold uppercase tracking-wider mb-8 block border-b border-white/10 pb-4">
                 AI PROVIDES
               </span>
               <ul className="flex flex-col gap-6 text-xl font-body text-sand/90">
                 <li className="flex items-center gap-4"><Workflow className="w-5 h-5 text-brand-coral" /> Computational Speed</li>
                 <li className="flex items-center gap-4"><Workflow className="w-5 h-5 text-brand-coral" /> Scale & Triage</li>
                 <li className="flex items-center gap-4"><Workflow className="w-5 h-5 text-brand-coral" /> Pattern Recognition</li>
                 <li className="flex items-center gap-4"><Workflow className="w-5 h-5 text-brand-coral" /> 24/7 Automation</li>
                 <li className="flex items-center gap-4"><Workflow className="w-5 h-5 text-brand-coral" /> Rapid Processing</li>
               </ul>
            </div>
            
            <div className="synth-right bg-sand text-slate p-12 md:p-20 relative">
               <span className="font-mono text-slate font-bold uppercase tracking-wider mb-8 block border-b border-slate/20 pb-4">
                 HUMANS PROVIDE
               </span>
               <ul className="flex flex-col gap-6 text-xl font-body text-slate/90">
                 <li className="flex items-center gap-4"><CheckCircle2 className="w-5 h-5 text-slate/50" /> Business Strategy</li>
                 <li className="flex items-center gap-4"><CheckCircle2 className="w-5 h-5 text-slate/50" /> Market Context</li>
                 <li className="flex items-center gap-4"><CheckCircle2 className="w-5 h-5 text-slate/50" /> Creative Direction</li>
                 <li className="flex items-center gap-4"><CheckCircle2 className="w-5 h-5 text-slate/50" /> Critical Judgment</li>
                 <li className="flex items-center gap-4"><CheckCircle2 className="w-5 h-5 text-slate/50" /> Customer Empathy</li>
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OPERATING PRINCIPLES - Evidence & Authority */}
      <section ref={principlesRef} className="py-32 px-6 md:px-12 bg-slate text-sand border-b border-white/10 relative">
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3 lg:sticky lg:top-32 self-start">
            <SectionMasthead badge="OPERATING PRINCIPLES" descriptor="What Governs Every Growth System We Build" />
          </div>
          
          <div className="lg:w-2/3 flex flex-col relative pl-4 md:pl-12">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/5 rounded-full" />
            <div className="absolute left-0 top-0 w-1 bg-brand-coral rounded-full transition-all duration-500" 
                 style={{ height: activePrinciple !== null ? `${((activePrinciple + 1) / principles.length) * 100}%` : '0%' }} />
            
            <div className="flex flex-col gap-12 pt-8">
              {principles.map((pr, i) => (
                <div key={i} className="principle-item relative flex flex-col pl-8 transition-opacity duration-500"
                     style={{ opacity: activePrinciple === null || activePrinciple === i ? 1 : 0.5 }}>
                  <div className={`absolute -left-[30px] top-2 w-4 h-4 rounded-full border-2 transition-colors duration-300 ${activePrinciple === i ? 'bg-brand-coral border-white shadow-[0_0_10px_rgba(255,138,0,0.8)]' : 'bg-slate border-white/20'}`} />
                  
                  <span className="font-mono text-brand-coral text-sm uppercase tracking-widest mb-2 block">
                    0{i + 1} — PRINCIPLE
                  </span>
                  <h3 className="text-3xl md:text-4xl font-headline font-bold uppercase tracking-tight text-white mb-4">
                    {pr.title}
                  </h3>
                  <p className="text-xl font-body text-sand/80 max-w-xl leading-relaxed">
                    {pr.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. BUILDING IN PUBLIC - Trust */}
      <section ref={publicRef} className="py-40 px-6 md:px-12 bg-white text-slate border-b border-slate/10">
        <div className="max-w-screen-xl mx-auto text-center flex flex-col items-center">
          <SectionMasthead badge="RADICAL TRANSPARENCY" descriptor="We're Building AxonVortex From Zero." />
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-headline font-bold uppercase tracking-tighter leading-tight mt-16 max-w-5xl">
            {publicText.split(' ').map((word, i) => (
               <span key={i} className="public-text-word inline-block mr-[0.25em]">{word}</span>
            ))}
          </h2>
        </div>
      </section>

      {/* 5. FAQ - Decision */}
      <section className="py-32 px-6 md:px-12 bg-slate text-sand">
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <SectionMasthead badge="CLARITY & TRANSPARENCY" descriptor="Frequently Asked Questions" />
          </div>
          <div className="lg:w-2/3 flex flex-col">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-white/10 last:border-b-0">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full py-8 flex items-center justify-between text-left group"
                >
                  <h3 className="text-2xl md:text-3xl font-headline font-bold text-white group-hover:text-brand-coral transition-colors pr-8">
                    {faq.q}
                  </h3>
                  <ChevronDown className={`w-8 h-8 text-white/50 transition-transform duration-300 shrink-0 ${openFaq === i ? 'rotate-180 text-brand-coral' : ''}`} />
                </button>
                <div 
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ maxHeight: openFaq === i ? '500px' : '0px', opacity: openFaq === i ? 1 : 0 }}
                >
                  <p className="text-xl font-body text-sand/80 pb-8 max-w-3xl leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA - Conversion */}
      <section className="py-24 px-6 md:px-12 bg-sand text-slate">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <h2 className="text-5xl md:text-7xl font-headline font-black uppercase tracking-tighter text-slate mb-6">
            Let&apos;s Build Something Smarter.
          </h2>
          <p className="text-2xl font-body text-slate/80 mb-12 border-b border-brand-coral/20 pb-12 w-full">
            Find what&apos;s holding your digital growth back with a comprehensive diagnostic audit.
          </p>
          <Link href="/contact?type=audit">
            <Button size="lg" className="bg-brand-navy text-white hover:bg-brand-coral hover:text-brand-navy text-lg px-12 py-6 h-auto">
              Request Growth Audit
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
