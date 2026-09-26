"use client";

import React, { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CornerDownRight } from "lucide-react";
import { individualServicesData, IndividualServiceData } from "@/data/content/individualServices";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { getGSAP } from "@/lib/gsap";
import { DimensionalButton } from "@/components/ui/DimensionalButton";
import { DimensionalCard } from "@/components/ui/DimensionalCard";

const CATEGORY_TO_DOMAIN: Record<string, { href: string; name: string }> = {
  "DIGITAL MARKETING": { href: "/digital-marketing", name: "Digital Marketing" },
  "AI & AUTOMATION": { href: "/ai-automation", name: "AI & Automation" },
  "WEBSITES & E-COMMERCE": { href: "/websites-ecommerce", name: "Websites & E-Commerce" },
  "LEAD GENERATION": { href: "/lead-generation", name: "Lead Generation" },
  "TECHNOLOGY & DIGITAL TRANSFORMATION": { href: "/technology-digital-transformation", name: "Tech Transformation" },
};

export default function ServicePageClient({ slug }: { slug: string }) {
  const data: IndividualServiceData | undefined = individualServicesData[slug];

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

    const { gsap } = getGSAP();
    const ctx = gsap.context(() => {
      // Hero entrance
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll("[data-anim='hero']"),
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
  }, [prefersReducedMotion, slug]);

  if (!data) return null;

  // Domain info
  const domainInfo = CATEGORY_TO_DOMAIN[data.category] || { href: "/solutions", name: data.category };

  // Find other services in the same domain
  const relatedServices = Object.values(individualServicesData)
    .filter((s) => s.category === data.category && s.slug !== slug)
    .slice(0, 3);

  return (
    <div
      ref={containerRef}
      className="w-full bg-[#141619] text-[#EFECE4] selection:bg-[#3B82F6] selection:text-white overflow-x-clip"
    >
      {/* 0. BREADCRUMB / DOMAIN BAR */}
      <div className="w-full border-b border-white/[0.08] bg-[#141619]/90 backdrop-blur-md px-6 md:px-12 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-wider">
          <div className="flex items-center gap-2 text-[#9AA3B2]">
            <Link href="/services" className="hover:text-[#3B82F6] font-medium transition-colors">
              Services Directory
            </Link>
            <span className="text-white/30">/</span>
            <Link href={domainInfo.href} className="hover:text-[#3B82F6] font-medium transition-colors">
              {data.category}
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-[#3B82F6] font-semibold">{data.title}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6] animate-pulse" />
            <span className="font-semibold text-[#EFECE4] tracking-widest text-[11px]">
              PRODUCTION SPECIFICATION
            </span>
          </div>
        </div>
      </div>

      {/* 1. HERO SECTION */}
      <section
        ref={heroRef}
        className="relative px-6 md:px-12 pt-20 md:pt-28 pb-20 border-b border-white/[0.08] bg-[#141619]"
      >
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[300px] bg-[#3B82F6]/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
          {/* Left Column: Core Definition */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div data-anim="hero" className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#93C5FD]">
                CAPABILITY
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-[#F4BA00]/15 border border-[#F4BA00]/30 text-[#FDE68A]">
                {data.category}
              </span>
              <span className="font-mono text-xs text-[#9AA3B2] uppercase tracking-widest">
                ARCHITECTURAL CAPABILITY
              </span>
            </div>

            <h1
              data-anim="hero"
              className="text-4xl sm:text-6xl md:text-7xl font-heading font-semibold tracking-tight leading-[1.05] text-[#EFECE4]"
            >
              {data.hero.headline}
            </h1>

            <div
              data-anim="hero"
              className="flex flex-col gap-4 text-base md:text-lg font-body text-[#9AA3B2] max-w-3xl leading-relaxed border-l-2 border-[#3B82F6] pl-6 py-4 bg-[#101215] border border-white/[0.04] rounded-r-xl shadow-[inset_0_2px_5px_rgba(0,0,0,0.7)]"
            >
              {data.hero.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div data-anim="hero" className="flex flex-wrap items-center gap-4 pt-4">
              <DimensionalButton
                variant="amber"
                size="lg"
                asLink
                href="/contact"
              >
                {data.hero.cta.label}
                <ArrowRight className="ml-2 w-4 h-4" />
              </DimensionalButton>

              <DimensionalButton
                variant="outline"
                size="lg"
                asLink
                href="/growth-audit"
              >
                Request Growth Audit
              </DimensionalButton>
            </div>
          </div>

          {/* Right Column: Technical Spec Box (Raised Outer Shell with Recessed Data Trays) */}
          <div data-anim="hero" className="lg:col-span-4 flex flex-col">
            <div className="rounded-2xl border border-white/[0.08] bg-[#1b1e22] p-6 sm:p-8 shadow-[0_16px_38px_-6px_rgba(0,0,0,0.72),0_6px_14px_-3px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col gap-6 relative">
              <div className="border-b border-white/10 pb-4">
                <span className="font-mono text-xs font-semibold tracking-widest text-[#9AA3B2] block mb-1 uppercase">
                  Service Identifier
                </span>
                <span className="font-heading font-semibold text-2xl text-[#EFECE4] block">
                  {data.title}
                </span>
              </div>

              {/* Nested Recessed Grid */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_5px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(0,0,0,0.9)] text-xs font-mono">
                <div>
                  <span className="text-[#9AA3B2] block mb-1">DOMAIN:</span>
                  <span className="font-semibold text-[#EFECE4] uppercase">{data.category}</span>
                </div>
                <div>
                  <span className="text-[#9AA3B2] block mb-1">TYPE:</span>
                  <span className="font-semibold text-[#F4BA00]">CORE MODULE</span>
                </div>
                <div>
                  <span className="text-[#9AA3B2] block mb-1">SCOPE:</span>
                  <span className="font-semibold text-[#EFECE4]">{data.whatWeDo.items.length} Workstreams</span>
                </div>
                <div>
                  <span className="text-[#9AA3B2] block mb-1">DELIVERY:</span>
                  <span className="font-semibold text-[#EFECE4]">Dedicated Pod</span>
                </div>
              </div>

              {/* Nested Recessed System Linkage Panel */}
              <div className="p-4 rounded-xl bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_5px_rgba(0,0,0,0.7)] flex flex-col gap-2">
                <span className="font-mono text-xs font-semibold tracking-widest text-[#9AA3B2] uppercase">
                  System Linkage
                </span>
                <p className="text-xs text-[#9AA3B2] font-body leading-relaxed">
                  Integrates directly into your broader growth loop. Can be contracted standalone or as part of a multi-domain digital transformation.
                </p>
              </div>

              <div className="pt-2">
                <DimensionalButton
                  variant="outline"
                  size="sm"
                  asLink
                  href={domainInfo.href}
                  className="w-full justify-between"
                >
                  <span>View Full Domain</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </DimensionalButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM (SYSTEM FRICTION) */}
      <section
        ref={problemRef}
        className="py-20 md:py-28 px-6 md:px-12 bg-[#141619] border-b border-white/[0.08] relative"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Problem Lede */}
          <div className="lg:col-span-5 flex flex-col gap-6 sticky top-28">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#93C5FD]">
                DIAGNOSIS
              </span>
              <span className="font-mono text-xs uppercase font-medium tracking-widest text-[#9AA3B2]">
                SYSTEM FRICTION
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold tracking-tight text-[#EFECE4] leading-tight">
              {data.problem.headline}
            </h2>

            {data.problem.purposeLead && (
              <p className="text-base font-heading font-medium text-[#F4BA00] bg-[#101215] border border-amber-500/30 p-4 rounded-xl border-l-4 border-l-[#F4BA00] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
                {data.problem.purposeLead}
              </p>
            )}

            {data.problem.paragraphs && (
              <div className="flex flex-col gap-4 text-sm sm:text-base text-[#9AA3B2] font-body leading-relaxed">
                {data.problem.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            )}

            {data.problem.conclusion && (
              <div className="p-4 rounded-xl bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
                <p className="font-mono text-xs uppercase font-semibold text-[#3B82F6]">
                  Architectural Principle
                </p>
                <p className="text-sm font-heading font-medium text-[#EFECE4] mt-1">
                  {data.problem.conclusion}
                </p>
              </div>
            )}
          </div>

          {/* Problem Friction Points & Flow */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {data.problem.points && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                {data.problem.points.map((pt, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-[#171a1e] border border-white/[0.08] shadow-[0_8px_20px_-4px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)] flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                      <span className="font-mono text-xs font-semibold text-[#3B82F6] px-2 py-0.5 rounded-lg bg-[#101215] border border-white/[0.04] shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-[#F4BA00]" />
                    </div>
                    <p className="text-xs sm:text-sm text-[#EFECE4] font-body leading-relaxed">
                      {pt}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Extra points if present */}
            {data.problem.extraPoints && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                {data.problem.extraPoints.map((pt, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] text-xs font-body text-[#9AA3B2]"
                  >
                    {pt}
                  </div>
                ))}
              </div>
            )}

            {/* Problem Flow Diagram (Raised Outer Shell with Recessed Pipeline Trays) */}
            {data.problem.flow && (
              <div className="p-6 sm:p-8 rounded-2xl bg-[#1b1e22] border border-white/[0.08] shadow-[0_16px_38px_-6px_rgba(0,0,0,0.72),inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#EFECE4]">
                    Connected Failure Pipeline
                  </span>
                  <span className="font-mono text-xs text-[#F4BA00] font-semibold">DISCONNECTED SEQUENCE</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {data.problem.flow.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <span className="px-3.5 py-1.5 rounded-lg bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] font-mono text-xs uppercase text-[#EFECE4]">
                        {item}
                      </span>
                      {idx < data.problem.flow!.length - 1 && (
                        <ArrowRight className="text-[#3B82F6] w-4 h-4 shrink-0" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. CAPABILITIES / WHAT WE DO */}
      <section
        ref={capabilitiesRef}
        className="py-20 md:py-28 px-6 md:px-12 bg-[#141619] border-b border-white/[0.08] relative"
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#F4BA00]/15 border border-[#F4BA00]/30 text-[#FDE68A]">
                  WHAT WE DO
                </span>
                <span className="font-mono text-xs uppercase font-medium tracking-widest text-[#9AA3B2]">
                  SPECIFICATION
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold tracking-tight text-[#EFECE4]">
                {data.whatWeDo.title}
              </h2>
            </div>
            <span className="font-mono text-xs uppercase font-medium text-[#9AA3B2]">
              {data.whatWeDo.items.length} Production Deliverables
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {data.whatWeDo.items.map((item, idx) => (
              <DimensionalCard
                key={idx}
                elevation="level2"
                glowColor={idx % 2 === 0 ? "blue" : "amber"}
                className="p-7 flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-md bg-[#101215] text-[#93C5FD] border border-white/[0.04] shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#F4BA00]" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-[#EFECE4] mb-2">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#9AA3B2] font-body leading-relaxed pt-2">
                  {item.description}
                </p>
              </DimensionalCard>
            ))}
          </div>
        </div>
      </section>

      {/* 4. EXECUTION METHODOLOGY (APPROACH) */}
      {data.approach && (
        <section
          ref={approachRef}
          className="py-20 md:py-28 px-6 md:px-12 bg-[#141619] border-b border-white/[0.08] relative"
        >
          <div className="max-w-7xl mx-auto flex flex-col gap-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
              <div className="flex flex-col gap-3 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#93C5FD]">
                    METHODOLOGY
                  </span>
                  <span className="font-mono text-xs uppercase font-medium tracking-widest text-[#9AA3B2]">
                    EXECUTION FRAMEWORK
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold tracking-tight text-[#EFECE4]">
                  {data.approach.title}
                </h2>
              </div>
              <span className="font-mono text-xs uppercase font-medium text-[#9AA3B2]">
                Production Lifecycle
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
              {data.approach.steps.map((st) => (
                <div
                  key={st.number}
                  className="p-7 rounded-2xl border border-white/[0.08] bg-[#171a1e] shadow-[0_8px_20px_-4px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)] flex flex-col justify-between hover:border-white/20 transition-all min-h-[200px]"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                      <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                      <CornerDownRight className="w-4 h-4 text-[#F4BA00]" />
                    </div>
                    <h3 className="text-lg font-heading font-semibold text-[#EFECE4] mb-2">
                      {st.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#9AA3B2] font-body leading-relaxed pt-2">
                    {st.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. AUDIENCE FIT (WHO IT IS FOR) */}
      <section
        ref={audienceRef}
        className="py-20 md:py-28 px-6 md:px-12 bg-[#141619] border-b border-white/[0.08] relative"
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#F4BA00]/15 border border-[#F4BA00]/30 text-[#FDE68A]">
                  AUDIENCE FIT
                </span>
                <span className="font-mono text-xs uppercase font-medium tracking-widest text-[#9AA3B2]">
                  QUALIFICATION CRITERIA
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold tracking-tight text-[#EFECE4]">
                {data.whoItIsFor.headline}
              </h2>
            </div>
            <span className="font-mono text-xs uppercase font-medium text-[#9AA3B2]">
              Operational Criteria
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.whoItIsFor.points.map((pt, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#171a1e] border border-white/[0.08] shadow-[0_8px_20px_-4px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)] flex items-start gap-3.5 hover:border-white/20 transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-[#101215] border border-[#F4BA00]/40 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)] flex items-center justify-center font-bold text-xs text-[#FDE68A] shrink-0 mt-0.5">
                  ✓
                </div>
                <p className="text-xs sm:text-sm font-body text-[#EFECE4] leading-relaxed">
                  {pt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. RELATED SERVICES MATRIX */}
      {relatedServices.length > 0 && (
        <section className="py-16 px-6 md:px-12 bg-[#141619] border-b border-white/[0.08]">
          <div className="max-w-7xl mx-auto flex flex-col gap-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#9AA3B2]">
                Connected Capabilities in {data.category}
              </span>
              <Link
                href={domainInfo.href}
                className="font-mono text-xs uppercase font-semibold text-[#3B82F6] hover:text-[#93C5FD] flex items-center gap-1 transition-colors"
              >
                <span>View All In Domain</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {relatedServices.map((rel, idx) => (
                <Link
                  key={rel.slug}
                  href={`/services/${rel.slug}`}
                  className="p-6 rounded-2xl border border-white/[0.08] bg-[#171a1e] hover:bg-[#1b1e22] hover:border-white/20 shadow-[0_8px_20px_-4px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.7)] transition-all duration-200 flex flex-col justify-between group"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-[#9AA3B2] group-hover:text-[#F4BA00] transition-colors px-2 py-0.5 rounded bg-[#101215] border border-white/[0.04] shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-[#9AA3B2] group-hover:text-[#3B82F6] transition-colors" />
                    </div>
                    <h3 className="font-heading font-semibold text-base sm:text-lg text-[#EFECE4] group-hover:text-[#93C5FD] transition-colors">
                      {rel.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#9AA3B2] group-hover:text-[#EFECE4] line-clamp-2 mt-4 transition-colors">
                    {rel.hero.paragraphs[0]}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. FINAL HIGH-IMPACT CTA */}
      <section
        ref={ctaRef}
        className="py-24 px-6 md:px-12 bg-[#141619] relative overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[600px] h-[350px] bg-[#F4BA00]/10 blur-[140px] rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto rounded-3xl border border-white/[0.08] bg-[#1b1e22] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] p-10 md:p-14 text-center flex flex-col items-center relative z-10">
          <div className="inline-block px-3.5 py-1 rounded-full bg-[#F4BA00]/15 border border-[#F4BA00]/30 font-mono text-xs font-semibold uppercase text-[#FDE68A] mb-8">
            PRODUCTION READY ARCHITECTURE
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-semibold tracking-tight text-[#EFECE4] mb-8 max-w-3xl leading-[1.05]">
            {data.finalCta.headline}
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <DimensionalButton
              variant="amber"
              size="lg"
              asLink
              href={data.finalCta.cta.href}
            >
              {data.finalCta.cta.label}
              <ArrowRight className="ml-2 w-4 h-4" />
            </DimensionalButton>

            <DimensionalButton
              variant="outline"
              size="lg"
              asLink
              href="/services"
            >
              Explore Full Service Index
            </DimensionalButton>
          </div>
        </div>
      </section>
    </div>
  );
}
