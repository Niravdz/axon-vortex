"use client";

import React from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { authorityData } from "@/data/content/authorityConversion";
import { SiteTextureBackground } from "@/components/layout/SiteTextureBackground";
import { EditorialSplit } from "@/components/patterns/EditorialSplit";
import { ManifestoSection } from "@/components/patterns/ManifestoSection";
import { OpenNumberedList } from "@/components/patterns/OpenNumberedList";
import { RecessedAccordion } from "@/components/patterns/RecessedAccordion";
import { CTASection } from "@/components/patterns/CTASection";
import { MotionSection } from "@/components/animation/MotionSection";

export function AboutPageClient() {
  const {
    about,
    whyExists,
    beliefs,
    buildingInPublic,
    whatWeDontBelieveIn,
    whatWeDoBelieveIn,
  } = authorityData;

  // Convert beliefs groups into an open numbered list
  const beliefPillars = beliefs.groups.map((group, idx) => ({
    number: String(idx + 1).padStart(2, "0"),
    title: group.title,
    description: group.subtitle || (group.statements ? group.statements[0] : ""),
    subtext: group.statements && group.statements[1] ? group.statements[1] : undefined,
    tags: group.items,
  }));

  // Building in Public accordion items
  const publicAccordionRows = [
    {
      title: "What We Document & Share Publicly",
      content: (
        <div className="flex flex-col gap-3">
          <p className="font-body text-xs sm:text-sm text-[#9AA3B2]">
            {buildingInPublic.shareLabel}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
            {buildingInPublic.shareItems.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-[8px] bg-[#141619] border border-white/[0.04] text-xs font-mono text-[#EFECE4] flex items-center gap-2.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Why We Build From Zero",
      content: (
        <p className="font-body text-xs sm:text-sm text-[#9AA3B2] leading-relaxed">
          Starting from zero means we carry zero legacy agency debt, zero inflated overhead, and zero obligation to push outdated marketing retainers. Every client solution is built with modern tooling, AI automation, and clean architectural principles.
        </p>
      ),
    },
  ];

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
              <span className="text-[#3B82F6] font-semibold">About &amp; Manifesto</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-block w-2 h-2 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6] animate-pulse" />
              <span className="font-semibold text-[#EFECE4] tracking-widest text-[11px]">
                AGENCY FROM ZERO // MANIFESTO
              </span>
            </div>
          </div>
        </div>

        {/* 1. HERO - Editorial Brand Story */}
        <section className="relative w-full border-b border-[#EFECE4]/[0.08] py-16 sm:py-24 px-4 sm:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <EditorialSplit
              badge={about.badge}
              badgeAccent="amber"
              systemLabel="RADICAL TRANSPARENCY"
              title={
                <>
                  {about.headlinePrimary} <br />
                  <span className="text-[#3B82F6]">{about.headlineSecondary}</span>
                </>
              }
              subtitle={about.beliefParagraph1}
              paragraphs={[
                about.beliefParagraph2,
                "We don't manufacture awards or make unverifiable claims. We engineer practical digital growth systems that prove their value in hard commercial outcomes.",
              ]}
              primaryCta={{
                label: "Start Your Growth Journey",
                href: "/contact",
              }}
              secondaryCta={{
                label: "Request Growth Audit",
                href: "/growth-audit",
              }}
              rightContent={
                <div className="rounded-[20px] bg-[#141619] border border-white/[0.08] p-6 sm:p-8 shadow-box-lg flex flex-col gap-6">
                  <div className="border-b border-white/[0.06] pb-3">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#9AA3B2] block mb-1">
                      MULTI-DOMAIN DISCIPLINE
                    </span>
                    <p className="text-xs font-body text-[#9AA3B2]">
                      {about.intersectionLabel}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {about.intersections.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-[#101215] border border-white/[0.04] font-mono text-xs font-semibold text-[#EFECE4] flex items-center justify-between shadow-box-inset"
                      >
                        <span>{item}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-white/[0.06] text-xs font-mono text-[#F4BA00]">
                    ENGINEERED TO ELIMINATE DIGITAL FRICTION
                  </div>
                </div>
              }
            />
          </div>
        </section>

        {/* 2. WHY AXONVORTEX EXISTS (MANIFESTO & 5 CRITICAL CHECKS) */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto flex flex-col gap-12">
            <ManifestoSection
              badge={whyExists.badge}
              badgeAccent="amber"
              statement={whyExists.contrastStatement}
              supportingText={whyExists.conclusion}
            />

            {/* 5 Critical Checks - Open Numbered Ledger */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <span className="font-mono text-xs uppercase tracking-wider text-[#3B82F6] font-semibold">
                  {whyExists.challengeIntro}
                </span>
                <span className="font-mono text-xs text-[#9AA3B2]">5 ESSENTIAL CRITERIA</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {whyExists.questions.map((q, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-[14px] bg-[#141619] border border-white/[0.06] shadow-box-sm hover:shadow-box-hover box-interactive flex items-start gap-3.5 hover:border-[#3B82F6]/40"
                  >
                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#101215] border border-white/[0.04] shadow-box-inset text-[#3B82F6] shrink-0">
                      0{idx + 1}
                    </span>
                    <p className="font-heading font-medium text-xs sm:text-sm text-[#EFECE4] leading-snug">
                      {q}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. STRUCTURAL CONVICTION PILLARS (OPEN NUMBERED LIST - BREAKING REPETITIVE 2X2 CARDS) */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto">
            <OpenNumberedList
              badge={beliefs.badge}
              title={beliefs.title}
              subtitle="Four structural convictions that dictate how we architect solutions, allocate budget, and evaluate client success."
              items={beliefPillars}
            />
          </div>
        </section>

        {/* 4. BUILDING IN PUBLIC SPLIT & EXPERIMENT ACCORDION */}
        <MotionSection
          as="section"
          signature="editorial-alternate-reveal"
          className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="motion-left lg:col-span-5 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e22] border border-[#3B82F6]/30 text-xs font-mono tracking-wider w-fit text-[#93C5FD] shadow-box-sm">
                <span>{buildingInPublic.badge}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold uppercase tracking-tight text-[#EFECE4] leading-tight">
                {buildingInPublic.title}
              </h2>

              <p className="text-base font-body text-[#9AA3B2] leading-relaxed border-l-2 border-[#3B82F6] pl-4">
                {buildingInPublic.opening}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {buildingInPublic.verbs.map((verb, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-full bg-[#101215] border border-white/[0.06] font-mono text-xs uppercase font-medium text-[#F4BA00] shadow-box-inset"
                  >
                    {verb}
                  </span>
                ))}
              </div>

              <div className="p-5 rounded-[12px] bg-[#141619] border border-white/[0.06] shadow-box-sm text-xs font-mono text-[#EFECE4]">
                &ldquo;{buildingInPublic.closing}&rdquo;
              </div>
            </div>

            {/* Recessed Accordion Column */}
            <div className="motion-right lg:col-span-7 flex flex-col gap-4">
              <RecessedAccordion items={publicAccordionRows} defaultOpenIndex={0} />
            </div>
          </div>
        </MotionSection>

        {/* 5. CODE OF INTEGRITY: REJECTION VS EMBRACE */}
        <MotionSection
          as="section"
          signature="contrast-dual-slide"
          className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]"
        >
          <div className="max-w-7xl mx-auto flex flex-col gap-10">
            <div className="max-w-2xl flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e22] border border-[#3B82F6]/30 text-xs font-mono tracking-wider w-fit text-[#93C5FD] shadow-box-sm">
                <span>DISCRIMINATION MATRIX</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold uppercase tracking-tight text-[#EFECE4]">
                What We Reject vs. What We Embrace
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* What We Reject */}
              <div className="motion-left p-8 rounded-[20px] bg-[#141619] border border-white/[0.08] shadow-box-lg flex flex-col gap-5">
                <div className="flex items-center gap-3 border-b border-white/[0.06] pb-3">
                  <X className="w-5 h-5 text-red-400" />
                  <h3 className="font-heading font-semibold text-lg uppercase text-red-300">
                    What We Reject
                  </h3>
                </div>
                <div className="flex flex-col gap-3">
                  {whatWeDontBelieveIn.items.map((it, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-body text-[#9AA3B2]">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-2" />
                      <span>{it}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What We Embrace */}
              <div className="motion-right p-8 rounded-[20px] bg-[#141619] border border-white/[0.08] shadow-box-lg flex flex-col gap-5">
                <div className="flex items-center gap-3 border-b border-white/[0.06] pb-3">
                  <Check className="w-5 h-5 text-[#3B82F6]" />
                  <h3 className="font-heading font-semibold text-lg uppercase text-[#60A5FA]">
                    What We Embrace
                  </h3>
                </div>
                <div className="flex flex-col gap-3">
                  {whatWeDoBelieveIn.items.map((it, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-body text-[#9AA3B2]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] shrink-0 mt-2" />
                      <span className="text-[#EFECE4]">{it}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </MotionSection>

        {/* 6. FINAL ABOUT CTA */}
        <CTASection
          badge="AMBITION IN PUBLIC"
          headline="Built From Zero. Engineered for Scale."
          description="If you value radical honesty, engineering rigor, and measurable commercial results over agency vanity, we would love to build with you."
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

export default AboutPageClient;
