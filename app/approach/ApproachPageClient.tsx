"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Cpu, User, RefreshCw } from "lucide-react";
import { authorityData } from "@/data/content/authorityConversion";
import { SiteTextureBackground } from "@/components/layout/SiteTextureBackground";
import { EditorialSplit } from "@/components/patterns/EditorialSplit";
import { ProcessTimeline } from "@/components/patterns/ProcessTimeline";
import { DiagnosticMatrix } from "@/components/patterns/DiagnosticMatrix";
import { ManifestoSection } from "@/components/patterns/ManifestoSection";
import { OpenNumberedList } from "@/components/patterns/OpenNumberedList";
import { CTASection } from "@/components/patterns/CTASection";
import { MotionSection } from "@/components/animation/MotionSection";

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

  // Map symptom examples into diagnostic matrix format
  const problemDiagnostics = startWithProblem.examples.map((ex) => ({
    problem: ex,
    recommendation: "Systemic Root Cause Diagnosis",
  }));

  // Map framework stages to timeline format
  const frameworkSteps = framework.stages.map((st, idx) => ({
    number: String(idx + 1).padStart(2, "0"),
    title: st.name,
    description: st.intro || st.description || "",
    detail: st.statements ? st.statements[0] : undefined,
    deliverables: st.items,
  }));

  // Principles formatted for OpenNumberedList
  const principlesList = principles.items.map((p, idx) => ({
    number: String(idx + 1).padStart(2, "0"),
    title: p.title,
    description: p.description,
  }));

  return (
    <SiteTextureBackground className="overflow-x-clip">
      <div className="w-full text-[#EFECE4]">
        {/* 0. BREADCRUMB / TOP SPEC BAR */}
        <div className="w-full border-b border-white/[0.08] bg-[#101215] px-4 sm:px-8 lg:px-12 py-3">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-wider">
            <div className="flex items-center gap-2 text-[#9AA3B2]">
              <Link href="/" className="hover:text-[#3B82F6] font-medium transition-colors">
                Home
              </Link>
              <span className="text-white/30">/</span>
              <span className="text-[#3B82F6] font-semibold">Methodology &amp; Framework</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-block w-2 h-2 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6] animate-pulse" />
              <span className="font-semibold text-[#EFECE4] tracking-widest text-[11px]">
                SYSTEMATIC EXECUTION ENGINE
              </span>
            </div>
          </div>
        </div>

        {/* 1. HERO - Editorial Opening */}
        <section className="relative w-full border-b border-[#EFECE4]/[0.08] py-16 sm:py-24 px-4 sm:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <EditorialSplit
              badge={hero.badge}
              badgeAccent="amber"
              systemLabel="HUMAN + AI OPERATING SYSTEM"
              title={
                <>
                  AI is powerful. <br />
                  <span className="text-[#F4BA00]">Strategy makes it useful.</span>
                </>
              }
              subtitle="Technology without business alignment is pure operational overhead."
              paragraphs={hero.paragraphs}
              primaryCta={hero.cta}
              secondaryCta={{
                label: "Request Growth Audit",
                href: "/growth-audit",
              }}
              rightContent={
                <div className="rounded-[20px] bg-[#141619] border border-white/[0.08] p-6 sm:p-8 shadow-box-lg flex flex-col gap-6">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#F4BA00] font-semibold">
                    CORE OPERATING PRINCIPLE
                  </span>
                  <p className="font-heading font-medium text-lg sm:text-xl text-[#EFECE4] leading-snug">
                    &ldquo;{startWithProblem.centralQuestion}&rdquo;
                  </p>
                  <div className="p-4 rounded-xl bg-[#101215] border border-white/[0.04] shadow-box-inset text-xs font-body text-[#9AA3B2] leading-relaxed">
                    {startWithProblem.conclusion}
                  </div>
                </div>
              }
            />
          </div>
        </section>

        {/* 2. START WITH THE PROBLEM (FIRST PRINCIPLES) */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto">
            <DiagnosticMatrix
              badge={startWithProblem.badge}
              title={startWithProblem.headline}
              subtitle="We never prescribe software or campaigns before diagnosing the operational friction."
              items={problemDiagnostics}
              conclusion="Prescribing solutions without diagnosing the bottleneck wastes capital and burns momentum."
            />
          </div>
        </section>

        {/* 3. CONTINUOUS SYNCHRONIZED TIMELINE (7 INTEGRATED STAGES) */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto">
            <ProcessTimeline
              badge={framework.badge}
              title={framework.sequence}
              subtitle="Seven connected production stages that take client engagements from initial friction audit to continuous performance scaling."
              steps={frameworkSteps}
              accent="blue"
            />
          </div>
        </section>

        {/* 4. THE AXONVORTEX GROWTH LOOP */}
        <MotionSection
          as="section"
          signature="sticky-story-step"
          className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Column */}
            <div className="motion-left lg:col-span-6 rounded-[20px] border border-white/[0.08] p-4 bg-[#141619] shadow-box-lg">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[14px] border border-white/[0.04] bg-[#101215]">
                <Image
                  src="/images/bauhaus-diagram-growth-loop.jpg"
                  alt="AxonVortex Growth Loop Framework"
                  fill
                  className="object-contain p-4 opacity-90 hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Content Column */}
            <div className="motion-right lg:col-span-6 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e22] border border-[#F4BA00]/30 text-xs font-mono tracking-wider w-fit text-[#FDE68A] shadow-box-sm">
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{growthLoop.badge}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-tight uppercase text-[#EFECE4] leading-tight">
                {growthLoop.title}
              </h2>

              <div className="flex flex-col gap-2 font-body text-base text-[#9AA3B2] leading-relaxed border-l-2 border-[#3B82F6] pl-4">
                {growthLoop.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              <div className="p-5 rounded-[14px] bg-[#101215] border border-white/[0.04] shadow-box-inset text-xs sm:text-sm font-mono text-[#F4BA00]">
                {growthLoop.sequence}
              </div>
            </div>
          </div>
        </MotionSection>

        {/* 4.5 DATA PHILOSOPHY MANIFESTO */}
        <section className="border-b border-[#EFECE4]/[0.08] px-4 sm:px-8 lg:px-12 py-12">
          <ManifestoSection
            badge={dataPhilosophy.badge}
            badgeAccent="blue"
            statement={dataPhilosophy.headline}
            supportingText={dataPhilosophy.introStatements.join(" ")}
            items={dataPhilosophy.metricRealities}
            conclusion={dataPhilosophy.closing}
          />
        </section>

        {/* 5. HUMAN + AI CO-INTELLIGENCE MODEL */}
        <MotionSection
          as="section"
          signature="contrast-dual-slide"
          className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]"
        >
          <div className="max-w-7xl mx-auto flex flex-col gap-12">
            <div className="max-w-3xl flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e22] border border-[#3B82F6]/30 text-xs font-mono tracking-wider w-fit text-[#93C5FD] shadow-box-sm">
                <User className="w-3.5 h-3.5" />
                <span>{humanAi.badge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold uppercase tracking-tight text-[#EFECE4]">
                {humanAi.title}
              </h2>
              <p className="text-base font-body text-[#9AA3B2] leading-relaxed">
                {humanAi.headline} — {humanAi.intro}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left: What AI Handles */}
              <div className="motion-left p-8 rounded-[20px] bg-[#141619] border border-white/[0.08] shadow-box-lg flex flex-col gap-5">
                <div className="flex items-center gap-3 border-b border-white/[0.06] pb-3">
                  <Cpu className="w-5 h-5 text-[#3B82F6]" />
                  <h3 className="font-heading font-semibold text-lg uppercase text-[#EFECE4]">
                    What AI Handles Best
                  </h3>
                </div>
                <div className="flex flex-col gap-2.5">
                  {humanAi.aiCapabilities.map((it, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-body text-[#9AA3B2]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                      <span>{it}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: What Humans Handle */}
              <div className="motion-right p-8 rounded-[20px] bg-[#141619] border border-white/[0.08] shadow-box-lg flex flex-col gap-5">
                <div className="flex items-center gap-3 border-b border-white/[0.06] pb-3">
                  <User className="w-5 h-5 text-[#F4BA00]" />
                  <h3 className="font-heading font-semibold text-lg uppercase text-[#EFECE4]">
                    What Humans Handle Best
                  </h3>
                </div>
                <div className="flex flex-col gap-2.5">
                  {humanAi.humanCapabilities.map((it, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-body text-[#9AA3B2]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F4BA00]" />
                      <span>{it}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </MotionSection>

        {/* 6. NUMBERED OPERATING PRINCIPLES */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto">
            <OpenNumberedList
              badge="OPERATIONAL CODE"
              title="Six Core Disciplines"
              subtitle="The non-negotiable principles that govern how we build, deploy and scale systems."
              items={principlesList}
            />
          </div>
        </section>

        {/* 7. FINAL METHODOLOGY CTA */}
        <CTASection
          badge="COLLABORATIVE COMMISSION"
          headline="Ready to Work with a Structured Growth System?"
          description="We take on a limited number of client engagements to maintain deep senior engineering involvement on every project."
          primaryCta={{
            label: "Start Your Project",
            href: "/contact",
          }}
          secondaryCta={{
            label: "Request Growth Audit",
            href: "/growth-audit",
          }}
        />
      </div>
    </SiteTextureBackground>
  );
}
