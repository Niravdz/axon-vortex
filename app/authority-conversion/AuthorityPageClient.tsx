"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, CheckCircle2, Workflow } from "lucide-react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { getGSAP } from "@/lib/gsap";
import { DimensionalButton } from "@/components/ui/DimensionalButton";

// Deterministic signal coordinates prevent server/client hydration mismatches.
const VISIBILITY_SIGNAL_POSITIONS = Array.from({ length: 15 }, (_, index) => ({
  left: (index * 37 + 11) % 96,
  top: (index * 53 + 17) % 92,
}));

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

    const { gsap, ScrollTrigger } = getGSAP();
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        // 1. Hero signals
        const signals = document.querySelectorAll(".visibility-signal");
        gsap.to(signals, {
          y: (i) => (i % 2 === 0 ? -80 : 80),
          x: (i) => (i % 3 === 0 ? 40 : -40),
          opacity: 0.1,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        // 2. Synthesis
        const leftPanel = document.querySelector(".synth-left");
        const rightPanel = document.querySelector(".synth-right");
        if (leftPanel && rightPanel) {
          gsap.fromTo(
            leftPanel,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: synthesisRef.current, start: "top 70%" },
            }
          );
          gsap.fromTo(
            rightPanel,
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: synthesisRef.current, start: "top 65%" },
            }
          );
        }

        // 3. Principles
        const principleItems = document.querySelectorAll(".principle-item");
        principleItems.forEach((item, i) => {
          ScrollTrigger.create({
            trigger: item,
            start: "top 60%",
            end: "bottom 40%",
            onEnter: () => setActivePrinciple(i),
            onEnterBack: () => setActivePrinciple(i),
          });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const publicText =
    "We're not here to pretend we've already built something huge. We're here to build something valuable. That means testing ideas, experimenting with AI, developing systems, studying what works, learning from what doesn't and continuously improving in public. No manufactured success stories. No inflated promises.";

  return (
    <div
      ref={containerRef}
      className="w-full bg-[#141619] text-[#EFECE4] overflow-x-clip selection:bg-[#3B82F6] selection:text-white"
    >
      {/* 0. BREADCRUMB */}
      <div className="w-full border-b border-white/[0.08] bg-[#141619]/90 backdrop-blur-md px-6 md:px-12 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-wider">
          <div className="flex items-center gap-2 text-[#9AA3B2]">
            <Link href="/" className="hover:text-[#3B82F6] font-medium transition-colors">
              Home
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-[#3B82F6] font-semibold">Strategic Positioning</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6] animate-pulse" />
            <span className="font-semibold text-[#EFECE4] tracking-widest text-[11px]">
              AUTHORITY &amp; CONVERSION
            </span>
          </div>
        </div>
      </div>

      {/* 1. HERO - Visibility & Relevance */}
      <section
        ref={heroRef}
        className="relative min-h-[85vh] flex flex-col justify-center px-6 md:px-12 pt-24 pb-20 border-b border-white/[0.08] overflow-hidden bg-[#141619]"
      >
        {/* Scattered Visibility Signals */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className={`visibility-signal absolute w-2 h-2 rounded-full ${
                i % 3 === 0
                  ? "bg-[#3B82F6] shadow-[0_0_10px_#3B82F6]"
                  : i % 2 === 0
                  ? "bg-[#F4BA00] shadow-[0_0_8px_#F4BA00]"
                  : "bg-white/20 blur-[1px]"
              }`}
              style={{
                left: `${VISIBILITY_SIGNAL_POSITIONS[i].left}%`,
                top: `${VISIBILITY_SIGNAL_POSITIONS[i].top}%`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="inline-block mb-6 px-3.5 py-1 rounded-full bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#93C5FD] font-mono text-xs uppercase tracking-widest font-semibold">
            STRATEGIC POSITIONING
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-heading font-semibold uppercase tracking-tight leading-[0.95] mb-6 text-[#EFECE4] max-w-5xl">
            Authority &amp; <br />
            <span className="text-[#3B82F6] drop-shadow-[0_0_24px_rgba(59,130,246,0.3)]">
              Conversion
            </span>
          </h1>
          <p className="text-2xl sm:text-3xl font-heading font-semibold text-[#F4BA00] mb-6">
            AI Is Powerful. Strategy Makes It Useful.
          </p>
          <p className="text-base sm:text-xl font-body text-[#9AA3B2] max-w-3xl leading-relaxed">
            Technology can accelerate execution. But without the right strategy, faster execution simply creates more noise. AxonVortex builds practical digital growth systems around real business goals.
          </p>
        </div>
      </section>

      {/* 2. THE SYNTHESIS - Clarity */}
      <section
        ref={synthesisRef}
        className="py-24 md:py-32 px-6 md:px-12 bg-[#141619] border-b border-white/[0.08] relative"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#93C5FD]">
              THE SYNTHESIS
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-semibold text-[#EFECE4] mt-3">
              AI Brings Speed. Humans Bring Judgment.
            </h2>
            <p className="text-lg sm:text-xl font-body text-[#9AA3B2] mt-4 max-w-2xl border-l-2 border-[#3B82F6] pl-6">
              The goal isn&apos;t to choose between humans and AI. It&apos;s to make both work better together.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Side (Raised Container with Nested Recessed Trays) */}
            <div className="synth-left rounded-3xl border border-white/[0.08] bg-[#1b1e22] p-8 sm:p-12 shadow-[0_16px_38px_-6px_rgba(0,0,0,0.72),0_6px_14px_-3px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#3B82F6]/10 rounded-full blur-3xl pointer-events-none" />
              <span className="font-mono text-[#93C5FD] font-semibold uppercase tracking-wider mb-6 block border-b border-white/10 pb-3 text-xs">
                AI PROVIDES
              </span>
              <ul className="flex flex-col gap-3 text-base sm:text-lg font-body text-[#EFECE4]">
                <li className="flex items-center gap-3 p-3.5 rounded-xl bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
                  <Workflow className="w-5 h-5 text-[#3B82F6] shrink-0" />
                  <span>Computational Speed</span>
                </li>
                <li className="flex items-center gap-3 p-3.5 rounded-xl bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
                  <Workflow className="w-5 h-5 text-[#3B82F6] shrink-0" />
                  <span>Scale &amp; Triage</span>
                </li>
                <li className="flex items-center gap-3 p-3.5 rounded-xl bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
                  <Workflow className="w-5 h-5 text-[#3B82F6] shrink-0" />
                  <span>Pattern Recognition</span>
                </li>
                <li className="flex items-center gap-3 p-3.5 rounded-xl bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
                  <Workflow className="w-5 h-5 text-[#3B82F6] shrink-0" />
                  <span>24/7 Automation</span>
                </li>
                <li className="flex items-center gap-3 p-3.5 rounded-xl bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
                  <Workflow className="w-5 h-5 text-[#3B82F6] shrink-0" />
                  <span>Rapid Processing</span>
                </li>
              </ul>
            </div>

            {/* Human Side (Raised Container with Nested Recessed Trays) */}
            <div className="synth-right rounded-3xl border border-white/[0.08] bg-[#1b1e22] p-8 sm:p-12 shadow-[0_16px_38px_-6px_rgba(0,0,0,0.72),0_6px_14px_-3px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#F4BA00]/10 rounded-full blur-3xl pointer-events-none" />
              <span className="font-mono text-[#FDE68A] font-semibold uppercase tracking-wider mb-6 block border-b border-white/10 pb-3 text-xs">
                HUMANS PROVIDE
              </span>
              <ul className="flex flex-col gap-3 text-base sm:text-lg font-body text-[#EFECE4]">
                <li className="flex items-center gap-3 p-3.5 rounded-xl bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
                  <CheckCircle2 className="w-5 h-5 text-[#F4BA00] shrink-0" />
                  <span>Business Strategy</span>
                </li>
                <li className="flex items-center gap-3 p-3.5 rounded-xl bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
                  <CheckCircle2 className="w-5 h-5 text-[#F4BA00] shrink-0" />
                  <span>Market Context</span>
                </li>
                <li className="flex items-center gap-3 p-3.5 rounded-xl bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
                  <CheckCircle2 className="w-5 h-5 text-[#F4BA00] shrink-0" />
                  <span>Creative Direction</span>
                </li>
                <li className="flex items-center gap-3 p-3.5 rounded-xl bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
                  <CheckCircle2 className="w-5 h-5 text-[#F4BA00] shrink-0" />
                  <span>Critical Judgment</span>
                </li>
                <li className="flex items-center gap-3 p-3.5 rounded-xl bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
                  <CheckCircle2 className="w-5 h-5 text-[#F4BA00] shrink-0" />
                  <span>Customer Empathy</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OPERATING PRINCIPLES */}
      <section
        ref={principlesRef}
        className="py-24 md:py-32 px-6 md:px-12 bg-[#141619] border-b border-white/[0.08] relative"
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3 lg:sticky lg:top-32 self-start">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#F4BA00]/15 border border-[#F4BA00]/30 text-[#FDE68A]">
              OPERATING PRINCIPLES
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-[#EFECE4] mt-3">
              What Governs Every Growth System We Build
            </h2>
          </div>

          <div className="lg:w-2/3 flex flex-col relative pl-4 md:pl-12">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white/10 rounded-full" />
            <div
              className="absolute left-0 top-0 w-0.5 bg-gradient-to-b from-[#3B82F6] to-[#F4BA00] rounded-full transition-all duration-500"
              style={{
                height:
                  activePrinciple !== null
                    ? `${((activePrinciple + 1) / principles.length) * 100}%`
                    : "0%",
              }}
            />

            <div className="flex flex-col gap-6 pt-4">
              {principles.map((pr, i) => (
                <div
                  key={i}
                  className="principle-item relative flex flex-col p-6 rounded-2xl bg-[#171a1e] border border-white/[0.08] shadow-[0_8px_20px_-4px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300"
                  style={{
                    opacity: activePrinciple === null || activePrinciple === i ? 1 : 0.6,
                  }}
                >
                  <div
                    className={`absolute -left-[35px] top-6 w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${
                      activePrinciple === i
                        ? "bg-[#3B82F6] border-white shadow-[0_0_12px_#3B82F6]"
                        : "bg-[#101215] border-white/20"
                    }`}
                  />
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs font-semibold text-[#3B82F6] px-2 py-0.5 rounded-md bg-[#101215] border border-white/[0.04] shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-heading font-semibold text-[#EFECE4] mb-2">
                    {pr.title}
                  </h3>
                  <p className="text-sm sm:text-base font-body text-[#9AA3B2] max-w-xl leading-relaxed">
                    {pr.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. BUILDING IN PUBLIC */}
      <section
        ref={publicRef}
        className="py-24 md:py-32 px-6 md:px-12 bg-[#141619] border-b border-white/[0.08]"
      >
        <div className="max-w-5xl mx-auto rounded-3xl border border-white/[0.08] bg-[#1b1e22] p-8 sm:p-14 shadow-[0_16px_38px_-6px_rgba(0,0,0,0.72),inset_0_1px_0_rgba(255,255,255,0.08)] text-center flex flex-col items-center">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#93C5FD] mb-6">
            RADICAL TRANSPARENCY
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-semibold tracking-tight text-[#EFECE4] leading-relaxed">
            &ldquo;{publicText}&rdquo;
          </h2>
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#141619] border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#F4BA00]/15 border border-[#F4BA00]/30 text-[#FDE68A]">
              CLARITY &amp; TRANSPARENCY
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-[#EFECE4] mt-3">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="lg:w-2/3 flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/[0.08] bg-[#1b1e22] shadow-[0_8px_20px_-4px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 flex items-center justify-between text-left cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <h3 className="text-lg sm:text-xl font-heading font-semibold text-[#EFECE4] pr-6">
                    {faq.q}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-[#3B82F6] shrink-0 transition-transform duration-300 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="p-4 rounded-xl bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] mx-6 mb-6 text-sm font-body text-[#9AA3B2] leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="py-24 px-6 md:px-12 bg-[#141619] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[600px] h-[350px] bg-[#F4BA00]/10 blur-[140px] rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto rounded-3xl border border-white/[0.08] bg-[#1b1e22] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] p-10 md:p-14 text-center flex flex-col items-center relative z-10">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-semibold tracking-tight text-[#EFECE4] mb-4">
            Let&apos;s Build Something Smarter.
          </h2>
          <p className="text-lg sm:text-xl font-body text-[#9AA3B2] mb-10 max-w-2xl">
            Find what&apos;s holding your digital growth back with a comprehensive diagnostic audit.
          </p>
          <DimensionalButton
            variant="amber"
            size="lg"
            asLink
            href="/contact?type=audit"
          >
            Request Growth Audit
            <ArrowRight className="ml-2 w-4 h-4" />
          </DimensionalButton>
        </div>
      </section>
    </div>
  );
}
