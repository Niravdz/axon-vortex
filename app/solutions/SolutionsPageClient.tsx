"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CheckSquare, ChevronDown } from "lucide-react";
import { solutionsData } from "@/data/content/solutions";
import { SiteTextureBackground } from "@/components/layout/SiteTextureBackground";
import { TactileButton } from "@/components/ui/TactileButton";
import { MatteSection } from "@/components/ui/MatteSection";
import { EditorialSplit } from "@/components/patterns/EditorialSplit";
import { DiagnosticMatrix } from "@/components/patterns/DiagnosticMatrix";
import { HorizontalJourney } from "@/components/patterns/HorizontalJourney";
import { CTASection } from "@/components/patterns/CTASection";

const DOMAIN_VISUALS: Record<string, string> = {
  "digital-marketing": "/images/bauhaus-diagram-marketing.png",
  "ai-automation": "/images/bauhaus-diagram-ai.png",
  "websites-ecommerce": "/images/bauhaus-diagram-ecommerce.jpg",
  "lead-generation": "/images/bauhaus-diagram-leadgen.jpg",
  "technology-digital-transformation": "/images/bauhaus-diagram-technology.jpg",
};

export default function SolutionsPageClient() {
  const { hero, growthSystem, solutions, problemMatcher, connectedGrowth, finalCta } = solutionsData;
  const [activeDomainIdx, setActiveDomainIdx] = useState<number>(0);
  const activeDomain = solutions[activeDomainIdx] || solutions[0];

  return (
    <SiteTextureBackground className="overflow-x-clip">
      <div className="w-full text-[#EFECE4]">
        {/* 1. HERO - Editorial Split */}
        <section className="relative w-full border-b border-[#EFECE4]/[0.08] py-16 sm:py-24 px-4 sm:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <EditorialSplit
              badge={hero.badge}
              badgeAccent="blue"
              systemLabel="CONNECTED ARCHITECTURE"
              title={hero.headline}
              subtitle={hero.intro}
              paragraphs={[
                "Modern digital growth requires more than disjointed tools or isolated campaigns.",
                "We architect synchronized solutions where acquisition feeds directly into conversion, and automation streamlines operations.",
              ]}
              primaryCta={{
                label: "Explore Ecosystem",
                href: "#ecosystem",
              }}
              secondaryCta={{
                label: "Request Growth Audit",
                href: "/growth-audit",
              }}
              rightContent={
                <div className="flex flex-col gap-4">
                  <div className="p-6 rounded-[16px] bg-[#171a1e] border border-white/[0.08] shadow-[0_8px_20px_-3px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)]">
                    <span className="font-mono text-xs font-semibold text-[#3B82F6] uppercase tracking-wider block mb-2">
                      FIRST PRINCIPLE
                    </span>
                    <p className="font-heading font-medium text-sm sm:text-base text-[#EFECE4] leading-relaxed">
                      {hero.statementPrimary}
                    </p>
                  </div>
                  <div className="p-6 rounded-[16px] bg-[#171a1e] border border-[#F4BA00]/30 shadow-[0_8px_20px_-3px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)]">
                    <span className="font-mono text-xs font-semibold text-[#F4BA00] uppercase tracking-wider block mb-2">
                      STRATEGIC FOCUS
                    </span>
                    <p className="font-heading font-medium text-sm sm:text-base text-[#EFECE4] leading-relaxed">
                      {hero.statementSecondary}
                    </p>
                  </div>
                </div>
              }
            />
          </div>
        </section>

        {/* 2. THE GROWTH SYSTEM PHILOSOPHY */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto">
            <MatteSection radius="24" className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                <div className="lg:col-span-6 p-8 sm:p-10 lg:p-14 flex flex-col gap-6 border-b lg:border-b-0 lg:border-r border-white/[0.08] bg-[#1b1e22]">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171a1e] border border-[#F4BA00]/35 text-xs font-mono tracking-wider text-[#FDE68A] w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F4BA00] animate-pulse" />
                    <span>{growthSystem.badge}</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-tight uppercase leading-[1.05] text-[#EFECE4]">
                    {growthSystem.subtitle}
                  </h2>

                  <div className="flex flex-col gap-3 pl-5 border-l-2 border-[#3B82F6] my-2">
                    {growthSystem.needStatements.map((statement, idx) => (
                      <p key={idx} className="text-sm sm:text-base font-body text-[#9AA3B2] leading-relaxed">
                        {statement}
                      </p>
                    ))}
                  </div>

                  <div className="p-5 rounded-[12px] bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_5px_rgba(0,0,0,0.78)]">
                    <p className="font-heading font-medium text-xs sm:text-sm text-[#EFECE4] leading-relaxed">
                      {growthSystem.conclusion}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-6 p-8 sm:p-10 lg:p-14 bg-[#141619] flex flex-col items-center justify-center">
                  <div className="relative w-full aspect-[16/10] rounded-[16px] bg-[#101215] border border-white/[0.06] overflow-hidden shadow-[inset_0_2px_8px_rgba(0,0,0,0.85)]">
                    <Image
                      src="/images/bauhaus-diagram-growth-loop.jpg"
                      alt="AxonVortex Growth Loop & Continuous Framework"
                      fill
                      className="object-contain p-4 opacity-90 hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <span className="block mt-4 text-center font-mono text-xs uppercase tracking-widest text-[#9AA3B2]">
                    CONTINUOUS GROWTH LOOP SYSTEM
                  </span>
                </div>
              </div>
            </MatteSection>
          </div>
        </section>

        {/* 3. CONNECTED SOLUTION ECOSYSTEM (Large Active-Domain Index + Content Preview) */}
        <section id="ecosystem" className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto flex flex-col gap-10">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
              <div className="flex flex-col gap-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e22] border border-[#3B82F6]/30 text-xs font-mono tracking-wider w-fit text-[#93C5FD]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
                  <span>CONNECTED SOLUTION ECOSYSTEM</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold uppercase tracking-tight text-[#EFECE4]">
                  Five Strategic Domains
                </h2>
                <p className="text-sm sm:text-base font-body text-[#9AA3B2] leading-relaxed">
                  Select any domain below to inspect deliverables, suitability metrics, and technical architecture.
                </p>
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#9AA3B2] shrink-0">
                [5 CORE DISCIPLINES]
              </span>
            </div>

            {/* Desktop Ecosystem Split / Mobile Accordion Stack */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Domain Index Buttons (4 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                {solutions.map((dom, idx) => {
                  const isActive = activeDomainIdx === idx;
                  const num = String(idx + 1).padStart(2, "0");

                  return (
                    <div key={dom.id} className="flex flex-col">
                      <button
                        type="button"
                        onClick={() => setActiveDomainIdx(idx)}
                        className={`text-left p-5 rounded-[14px] border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                          isActive
                            ? "bg-[#1b1e22] text-[#EFECE4] border-[#3B82F6]/50 shadow-[0_8px_20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)]"
                            : "bg-[#141619] text-[#9AA3B2] border-white/[0.06] hover:bg-[#171a1e] hover:border-white/[0.12] hover:text-[#EFECE4]"
                        }`}
                        aria-expanded={isActive}
                      >
                        <div className="flex items-center gap-3.5">
                          <span
                            className={`font-mono text-xs font-semibold px-2 py-0.5 rounded ${
                              isActive
                                ? "bg-[#3B82F6] text-white"
                                : "bg-[#101215] text-[#9AA3B2]"
                            }`}
                          >
                            {num}
                          </span>
                          <div>
                            <h3 className="font-heading font-semibold text-sm sm:text-base uppercase tracking-tight">
                              {dom.title}
                            </h3>
                            <span className="font-mono text-[11px] text-[#9AA3B2] block sm:hidden mt-0.5">
                              {dom.tagline}
                            </span>
                          </div>
                        </div>

                        <ChevronDown
                          className={`w-4 h-4 shrink-0 transition-transform lg:hidden ${
                            isActive ? "rotate-180 text-[#3B82F6]" : "text-[#9AA3B2]"
                          }`}
                        />
                      </button>

                      {/* Mobile Expandable Preview (Under Active Item) */}
                      {isActive && (
                        <div className="lg:hidden mt-3 p-5 rounded-[14px] bg-[#101215] border border-white/[0.06] shadow-[inset_0_2px_6px_rgba(0,0,0,0.85)] flex flex-col gap-4">
                          <div className="relative w-full aspect-[16/9] rounded-[10px] bg-[#141619] overflow-hidden border border-white/[0.04]">
                            <Image
                              src={DOMAIN_VISUALS[dom.id] || "/images/bauhaus-tech-hero.png"}
                              alt={`${dom.title} diagram`}
                              fill
                              className="object-contain p-2"
                              sizes="100vw"
                            />
                          </div>

                          <p className="text-xs sm:text-sm font-body text-[#9AA3B2] leading-relaxed">
                            {dom.descriptions[0]}
                          </p>

                          <div className="flex flex-col gap-2">
                            <span className="font-mono text-[11px] uppercase text-[#F4BA00]">
                              What We Build:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {dom.helpWith.map((item, i) => (
                                <span
                                  key={i}
                                  className="px-2.5 py-1 rounded-[4px] bg-[#171a1e] border border-white/[0.04] text-[11px] font-mono text-[#EFECE4]"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="pt-2 flex items-center justify-between">
                            <Link
                              href={`/${dom.id}`}
                              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-[#3B82F6] hover:text-[#60A5FA]"
                            >
                              <span>Explore {dom.title}</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Desktop Live Preview Console (7 cols) */}
              <div className="hidden lg:flex lg:col-span-7 flex-col rounded-[20px] bg-[#1b1e22] border border-white/[0.08] p-8 sm:p-10 shadow-[0_16px_38px_-6px_rgba(0,0,0,0.72),inset_0_1px_0_rgba(255,255,255,0.08)] gap-6">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] animate-pulse" />
                    <span className="font-mono text-xs uppercase tracking-wider text-[#9AA3B2]">
                      SPECIFICATION PREVIEW
                    </span>
                  </div>
                  <Link
                    href={`/${activeDomain.id}`}
                    className="font-mono text-xs text-[#3B82F6] hover:text-[#60A5FA] inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Full Domain Blueprint</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-heading font-semibold uppercase tracking-tight text-[#EFECE4]">
                    {activeDomain.title}
                  </h3>
                  <p className="mt-1 font-heading font-medium text-sm sm:text-base text-[#60A5FA]">
                    {activeDomain.tagline}
                  </p>
                </div>

                {/* Architectural Diagram */}
                <div className="relative w-full aspect-[16/9] rounded-[14px] bg-[#101215] border border-white/[0.06] overflow-hidden shadow-[inset_0_2px_8px_rgba(0,0,0,0.85)]">
                  <Image
                    src={DOMAIN_VISUALS[activeDomain.id] || "/images/bauhaus-tech-hero.png"}
                    alt={`${activeDomain.title} technical diagram`}
                    fill
                    className="object-contain p-4 opacity-90 hover:scale-105 transition-transform duration-700"
                    sizes="50vw"
                  />
                </div>

                <div className="flex flex-col gap-2.5 border-l-2 border-[#3B82F6] pl-4">
                  {activeDomain.descriptions.map((desc, idx) => (
                    <p key={idx} className="font-body text-xs sm:text-sm text-[#9AA3B2] leading-relaxed">
                      {desc}
                    </p>
                  ))}
                </div>

                {/* 2-Column Specs: What We Build vs Best For */}
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/[0.08]">
                  <div className="p-4 rounded-[12px] bg-[#101215] border border-white/[0.04]">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#3B82F6] block mb-2 font-medium">
                      What We Build:
                    </span>
                    <ul className="flex flex-col gap-1.5 font-body text-xs text-[#9AA3B2]">
                      {activeDomain.helpWith.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckSquare className="w-3 h-3 text-[#3B82F6] shrink-0" />
                          <span className="truncate">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-[12px] bg-[#101215] border border-white/[0.04]">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#F4BA00] block mb-2 font-medium">
                      Best For Businesses That:
                    </span>
                    <ul className="flex flex-col gap-1.5 font-body text-xs text-[#9AA3B2]">
                      {activeDomain.bestFor.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F4BA00] shrink-0" />
                          <span className="truncate">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Row */}
                <div className="pt-2 flex items-center justify-between">
                  <TactileButton
                    variant="primary"
                    size="md"
                    withArrow
                    asLink
                    href={activeDomain.cta.href}
                  >
                    {activeDomain.cta.label}
                  </TactileButton>

                  <Link
                    href="/contact"
                    className="font-mono text-xs uppercase text-[#9AA3B2] hover:text-[#EFECE4] transition-colors"
                  >
                    Scope This Workstream →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. PROBLEM-TO-SOLUTION MATCHER */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto">
            <DiagnosticMatrix
              badge={problemMatcher.badge}
              title={problemMatcher.title}
              subtitle={problemMatcher.subtitle}
              items={problemMatcher.items}
              conclusion="AxonVortex diagnoses system bottlenecks first before prescribing specific technological, marketing or automation deliverables."
            />
          </div>
        </section>

        {/* 5. CONNECTED GROWTH JOURNEY */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto">
            <HorizontalJourney
              badge="LIFECYCLE PIPELINE"
              title={connectedGrowth.title}
              subtitle={connectedGrowth.subtitle}
              stages={connectedGrowth.nodes.map((n) => ({
                name: n.name,
                description: n.purpose,
              }))}
              conclusion={connectedGrowth.approachSecondary}
            />
          </div>
        </section>

        {/* 6. FINAL SOLUTIONS CTA */}
        <CTASection
          badge="UNIFIED ARCHITECTURE"
          headline={finalCta.headline}
          description={finalCta.paragraphs}
          primaryCta={finalCta.primaryCta}
          secondaryCta={finalCta.secondaryCta}
        />
      </div>
    </SiteTextureBackground>
  );
}
