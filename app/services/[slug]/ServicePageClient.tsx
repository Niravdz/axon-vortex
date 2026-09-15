"use client";

import React, { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CornerDownRight } from "lucide-react";
import { BauhausBadge } from "@/components/ui/BauhausBadge";
import { Button } from "@/components/ui/Button";
import { individualServicesData, IndividualServiceData } from "@/data/content/individualServices";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { getGSAP } from "@/lib/gsap";

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

      // Problem section
      if (problemRef.current) {
        gsap.fromTo(
          problemRef.current.querySelectorAll("[data-anim='prob-item']"),
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            clearProps: "transform,opacity",
            scrollTrigger: {
              trigger: problemRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      }

      // Capabilities grid
      if (capabilitiesRef.current) {
        gsap.fromTo(
          capabilitiesRef.current.querySelectorAll("[data-anim='cap-card']"),
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            clearProps: "transform,opacity",
            scrollTrigger: {
              trigger: capabilitiesRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      }

      // Approach steps
      if (approachRef.current) {
        gsap.fromTo(
          approachRef.current.querySelectorAll("[data-anim='app-step']"),
          { x: -16, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            clearProps: "transform,opacity",
            scrollTrigger: {
              trigger: approachRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      }

      // Audience items
      if (audienceRef.current) {
        gsap.fromTo(
          audienceRef.current.querySelectorAll("[data-anim='aud-item']"),
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: "power2.out",
            clearProps: "transform,opacity",
            scrollTrigger: {
              trigger: audienceRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      }

      // Final CTA
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            clearProps: "transform,opacity",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 85%",
              once: true,
            },
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
    <div ref={containerRef} className="w-full bg-brand-white text-brand-black selection:bg-brand-red selection:text-white overflow-x-clip">
      
      {/* 0. BREADCRUMB / DOMAIN BAR */}
      <div className="w-full border-b-2 border-brand-black bg-brand-gray/50 px-6 md:px-12 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase">
          <div className="flex items-center gap-2 text-brand-black/70">
            <Link href="/services" className="hover:text-brand-red font-bold transition-colors">
              Services Directory
            </Link>
            <span>/</span>
            <Link href={domainInfo.href} className="hover:text-brand-red font-bold transition-colors">
              {data.category}
            </Link>
            <span>/</span>
            <span className="text-brand-red font-black">{data.title}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-brand-red animate-pulse" />
            <span className="font-bold text-brand-black tracking-wider">PRODUCTION SPECIFICATION</span>
          </div>
        </div>
      </div>

      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative px-6 md:px-12 pt-16 md:pt-24 pb-20 border-b-2 border-brand-black bg-brand-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Core Definition */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div data-anim="hero" className="flex flex-wrap items-center gap-3">
              <BauhausBadge variant="red" shape="square">
                CAPABILITY
              </BauhausBadge>
              <BauhausBadge variant="yellow" shape="pill">
                {data.category}
              </BauhausBadge>
              <span className="font-mono text-xs text-brand-black/60 font-bold uppercase tracking-widest">
                ARCHITECTURAL CAPABILITY
              </span>
            </div>

            <h1 data-anim="hero" className="text-4xl sm:text-6xl md:text-7xl font-heading font-bold uppercase tracking-[0.015em] leading-[0.95] text-brand-black">
              {data.hero.headline}
            </h1>

            <div data-anim="hero" className="flex flex-col gap-4 text-lg md:text-xl font-body text-brand-black/80 max-w-3xl leading-relaxed border-l-4 border-brand-red pl-6 py-1 bg-brand-gray/30">
              {data.hero.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div data-anim="hero" className="flex flex-wrap items-center gap-4 pt-4">
              <Button
                variant="primary"
                size="lg"
                asLink
                href="/contact"
                className="bg-brand-red text-white hover:bg-brand-black text-base px-8 py-4"
              >
                {data.hero.cta.label}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                asLink
                href="/growth-audit"
                className="border-2 border-brand-black text-brand-black hover:bg-brand-yellow hover:text-brand-black text-base px-6 py-4"
              >
                Request Growth Audit
              </Button>
            </div>
          </div>

          {/* Right Column: Bauhaus Technical Spec Box */}
          <div data-anim="hero" className="lg:col-span-4 flex flex-col">
            <div className="border-2 border-brand-black bg-brand-gray p-6 sm:p-8 shadow-hard-lg flex flex-col gap-6 relative">
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-brand-yellow border-b-2 border-l-2 border-brand-black flex items-center justify-center font-mono text-xs font-bold">
                ✓
              </div>

              <div className="border-b-2 border-brand-black pb-4">
                <span className="font-mono text-xs font-bold tracking-widest text-brand-black/60 block mb-1 uppercase">
                  Service Identifier
                </span>
                <span className="font-display font-black text-2xl uppercase text-brand-black block">
                  {data.title}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 border-b-2 border-brand-black pb-4 text-xs font-mono">
                <div>
                  <span className="text-brand-black/60 block mb-1">DOMAIN:</span>
                  <span className="font-bold text-brand-black uppercase">{data.category}</span>
                </div>
                <div>
                  <span className="text-brand-black/60 block mb-1">TYPE:</span>
                  <span className="font-bold text-brand-red">CORE MODULE</span>
                </div>
                <div>
                  <span className="text-brand-black/60 block mb-1">SCOPE:</span>
                  <span className="font-bold text-brand-black">{data.whatWeDo.items.length} Workstreams</span>
                </div>
                <div>
                  <span className="text-brand-black/60 block mb-1">DELIVERY:</span>
                  <span className="font-bold text-brand-black">Dedicated Pod</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs font-bold tracking-widest text-brand-black/60 uppercase">
                  System Linkage
                </span>
                <p className="text-xs text-brand-black/80 font-sans leading-relaxed">
                  Integrates directly into your broader growth loop. Can be contracted standalone or as part of a multi-domain digital transformation.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href={domainInfo.href}
                  className="flex items-center justify-between w-full p-3 bg-brand-white border-2 border-brand-black font-mono text-xs uppercase font-bold text-brand-black hover:bg-brand-blue hover:text-white transition-colors"
                >
                  <span>View Full Domain</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. THE PROBLEM (SYSTEM FRICTION) */}
      <section ref={problemRef} className="py-20 md:py-28 px-6 md:px-12 bg-brand-gray border-b-2 border-brand-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Problem Lede */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <BauhausBadge variant="red" shape="square">
                DIAGNOSIS
              </BauhausBadge>
              <span className="font-mono text-xs uppercase font-bold tracking-widest text-brand-black/60">
                SYSTEM FRICTION
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-brand-black leading-tight">
              {data.problem.headline}
            </h2>

            {data.problem.purposeLead && (
              <p className="text-lg font-display font-bold text-brand-black/90 bg-brand-yellow/30 p-4 border-l-4 border-brand-yellow">
                {data.problem.purposeLead}
              </p>
            )}

            {data.problem.paragraphs && (
              <div className="flex flex-col gap-4 text-base text-brand-black/80 font-body leading-relaxed">
                {data.problem.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            )}

            {data.problem.conclusion && (
              <div className="p-4 bg-brand-white border-2 border-brand-black shadow-hard-sm">
                <p className="font-mono text-xs uppercase font-bold text-brand-red">
                  Architectural Principle
                </p>
                <p className="text-sm font-display font-bold text-brand-black mt-1">
                  {data.problem.conclusion}
                </p>
              </div>
            )}
          </div>

          {/* Problem Friction Points & Flow */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {data.problem.points && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.problem.points.map((pt, idx) => (
                  <div
                    key={idx}
                    data-anim="prob-item"
                    className="p-6 bg-brand-white border-2 border-brand-black shadow-hard-md flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between border-b-2 border-brand-black pb-3 mb-3">
                      <span className="font-mono text-xs font-black text-brand-red">
                        FRICTION
                      </span>
                      <span className="w-2.5 h-2.5 rounded-full bg-brand-black" />
                    </div>
                    <p className="text-sm text-brand-black/90 font-sans leading-relaxed">
                      {pt}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Extra points if present */}
            {data.problem.extraPoints && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.problem.extraPoints.map((pt, idx) => (
                  <div
                    key={idx}
                    data-anim="prob-item"
                    className="p-5 bg-brand-white border-2 border-brand-black shadow-hard-sm text-xs font-sans text-brand-black/80"
                  >
                    <span className="font-mono font-bold text-brand-blue block mb-1">NOTE:</span>
                    {pt}
                  </div>
                ))}
              </div>
            )}

            {/* Problem Flow Diagram */}
            {data.problem.flow && (
              <div className="p-6 sm:p-8 bg-brand-white border-2 border-brand-black shadow-hard-md flex flex-col gap-4">
                <div className="flex items-center justify-between border-b-2 border-brand-black pb-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-black">
                    Connected Failure Pipeline
                  </span>
                  <span className="font-mono text-xs text-brand-red font-bold">DISCONNECTED SEQUENCE</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {data.problem.flow.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <span className="px-4 py-2 bg-brand-gray border-2 border-brand-black font-display font-black text-xs uppercase text-brand-black">
                        {item}
                      </span>
                      {idx < data.problem.flow!.length - 1 && (
                        <ArrowRight className="text-brand-red w-4 h-4 shrink-0" />
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
      <section ref={capabilitiesRef} className="py-20 md:py-28 px-6 md:px-12 bg-brand-white border-b-2 border-brand-black">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-brand-black pb-8">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <BauhausBadge variant="yellow" shape="square">
                  WHAT WE DO
                </BauhausBadge>
                <span className="font-mono text-xs uppercase font-bold tracking-widest text-brand-black/60">
                  SPECIFICATION
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-brand-black">
                {data.whatWeDo.title}
              </h2>
            </div>
            <span className="font-mono text-xs uppercase font-bold text-brand-black/60">
              {data.whatWeDo.items.length} Production Deliverables
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.whatWeDo.items.map((item, idx) => (
              <div
                key={idx}
                data-anim="cap-card"
                className="p-8 border-2 border-brand-black bg-brand-white shadow-hard-md hover:shadow-hard-lg hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex flex-col justify-between min-h-[240px] group"
              >
                <div>
                  <div className="flex items-center justify-between border-b-2 border-brand-black pb-4 mb-4">
                    <span className="font-mono text-xs font-black text-brand-black px-2 py-1 bg-brand-yellow border border-brand-black">
                      DELIVERABLE
                    </span>
                    <span className="w-3 h-3 bg-brand-blue group-hover:bg-brand-red transition-colors" />
                  </div>
                  <h3 className="text-xl font-display font-black uppercase text-brand-black mb-3 group-hover:text-brand-red transition-colors">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-brand-black/80 font-sans leading-relaxed pt-2">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. EXECUTION METHODOLOGY (APPROACH) */}
      {data.approach && (
        <section ref={approachRef} className="py-20 md:py-28 px-6 md:px-12 bg-brand-slate text-white border-b-2 border-brand-black">
          <div className="max-w-7xl mx-auto flex flex-col gap-12">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-white/20 pb-8">
              <div className="flex flex-col gap-3 max-w-2xl">
                <div className="flex items-center gap-2">
                  <BauhausBadge variant="red" shape="square">
                    METHODOLOGY
                  </BauhausBadge>
                  <span className="font-mono text-xs uppercase font-bold tracking-widest text-brand-gray">
                    EXECUTION FRAMEWORK
                  </span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white">
                  {data.approach.title}
                </h2>
              </div>
              <span className="font-mono text-xs uppercase font-bold text-brand-gray">
                Production Lifecycle
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.approach.steps.map((st) => (
                <div
                  key={st.number}
                  data-anim="app-step"
                  className="p-8 border-2 border-white/30 bg-white/5 flex flex-col justify-between min-h-[220px] relative hover:border-brand-yellow transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-white/20 pb-4 mb-4">
                      <span className="w-2.5 h-2.5 bg-brand-red" />
                      <CornerDownRight className="w-4 h-4 text-brand-yellow" />
                    </div>
                    <h3 className="text-xl font-display font-black uppercase text-white mb-2">
                      {st.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-brand-gray font-sans leading-relaxed pt-3">
                    {st.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* 5. AUDIENCE FIT (WHO IT IS FOR) */}
      <section ref={audienceRef} className="py-20 md:py-28 px-6 md:px-12 bg-brand-gray border-b-2 border-brand-black">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-brand-black pb-8">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <BauhausBadge variant="blue" shape="square">
                  AUDIENCE FIT
                </BauhausBadge>
                <span className="font-mono text-xs uppercase font-bold tracking-widest text-brand-black/60">
                  QUALIFICATION CRITERIA
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-brand-black">
                {data.whoItIsFor.headline}
              </h2>
            </div>
            <span className="font-mono text-xs uppercase font-bold text-brand-black/60">
              Operational Criteria
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.whoItIsFor.points.map((pt, idx) => (
              <div
                key={idx}
                data-anim="aud-item"
                className="p-8 bg-brand-white border-2 border-brand-black shadow-hard-md flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-none bg-brand-yellow border-2 border-brand-black flex items-center justify-center font-mono font-black text-xs text-brand-black shrink-0 mt-0.5">
                  ✓
                </div>
                <p className="text-sm font-sans text-brand-black/90 leading-relaxed">
                  {pt}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. RELATED SERVICES MATRIX */}
      {relatedServices.length > 0 && (
        <section className="py-16 px-6 md:px-12 bg-brand-white border-b-2 border-brand-black">
          <div className="max-w-7xl mx-auto flex flex-col gap-8">
            <div className="flex items-center justify-between border-b-2 border-brand-black pb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-black">
                  Connected Capabilities in {data.category}
                </span>
              </div>
              <Link
                href={domainInfo.href}
                className="font-mono text-xs uppercase font-bold text-brand-red hover:underline flex items-center gap-1"
              >
                <span>View All In Domain</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/services/${rel.slug}`}
                  className="p-6 border-2 border-brand-black bg-brand-gray/40 hover:bg-brand-yellow/20 shadow-hard-sm hover:shadow-hard-md transition-all flex flex-col justify-between group"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-brand-black/60">
                        MODULE
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-brand-black group-hover:text-brand-red transition-colors" />
                    </div>
                    <h3 className="font-display font-black text-lg uppercase text-brand-black group-hover:text-brand-red transition-colors">
                      {rel.title}
                    </h3>
                  </div>
                  <p className="text-xs text-brand-black/70 line-clamp-2 mt-4">
                    {rel.hero.paragraphs[0]}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. FINAL HIGH-IMPACT CTA */}
      <section ref={ctaRef} className="py-24 px-6 md:px-12 bg-brand-red text-white border-b-2 border-brand-black">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="inline-block px-4 py-1.5 bg-brand-white text-brand-black border-2 border-brand-black font-mono text-xs font-black uppercase mb-8 shadow-hard-sm">
            PRODUCTION READY ARCHITECTURE
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black uppercase tracking-tighter text-white mb-8 max-w-3xl leading-[0.95]">
            {data.finalCta.headline}
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              className="bg-brand-black text-white hover:bg-brand-white hover:text-brand-black text-lg px-10 py-5 border-2 border-brand-black shadow-hard-md"
              asLink
              href={data.finalCta.cta.href}
            >
              {data.finalCta.cta.label}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-brand-black text-lg px-8 py-5"
              asLink
              href="/services"
            >
              Explore Full Service Index
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
