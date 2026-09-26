"use client";

import React, { useState } from "react";
import Link from "next/link";
import { authorityData } from "@/data/content/authorityConversion";
import { SiteTextureBackground } from "@/components/layout/SiteTextureBackground";
import { EditorialSplit } from "@/components/patterns/EditorialSplit";
import { HorizontalJourney } from "@/components/patterns/HorizontalJourney";
import { OpenNumberedList } from "@/components/patterns/OpenNumberedList";
import { CTASection } from "@/components/patterns/CTASection";
import { MotionSection } from "@/components/animation/MotionSection";
import { cn } from "@/lib/utils";

export default function InsightsPageClient() {
  const { insights, contentTypes, contentLoop } = authorityData;
  const [activeTopicIdx, setActiveTopicIdx] = useState<number>(0);
  const activeTopic = insights.topics[activeTopicIdx] || insights.topics[0];

  // Convert content types into OpenNumberedList items
  const formatList = contentTypes.items.map((fmt, idx) => ({
    number: String(idx + 1).padStart(2, "0"),
    title: fmt.type,
    description: fmt.description,
  }));

  // Knowledge loop stages for HorizontalJourney
  const loopStages = contentLoop.steps.map((st, idx) => ({
    step: String(idx + 1).padStart(2, "0"),
    name: st.stage,
    description: st.description,
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
              <span className="text-[#3B82F6] font-semibold">Insights &amp; Knowledge</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-block w-2 h-2 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6] animate-pulse" />
              <span className="font-semibold text-[#EFECE4] tracking-widest text-[11px]">
                PRACTICAL THINKING HUB // ZERO HYPE
              </span>
            </div>
          </div>
        </div>

        {/* 1. HERO - Editorial Opening */}
        <section className="relative w-full border-b border-[#EFECE4]/[0.08] py-16 sm:py-24 px-4 sm:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <EditorialSplit
              badge={insights.badge}
              badgeAccent="blue"
              systemLabel="ENGINEERED ESSAYS"
              title={
                <>
                  Practical Thinking. <br />
                  <span className="text-[#3B82F6]">Zero Agency Hype.</span>
                </>
              }
              subtitle="We document the exact technical decisions, automation workflows and marketing architectures we build in production."
              paragraphs={[
                "The digital landscape is flooded with superficial marketing advice and buzzword-heavy AI promises.",
                "Our insights are written for founders, CTOs and growth operators who need rigorous, repeatable systems rather than theoretical trends.",
              ]}
              primaryCta={{
                label: "Explore Knowledge Taxonomy",
                href: "#taxonomy",
              }}
              secondaryCta={{
                label: "Request Growth Audit",
                href: "/growth-audit",
              }}
              rightContent={
                <div className="rounded-[20px] bg-[#1b1e22] border border-white/[0.08] p-6 sm:p-8 shadow-box-lg flex flex-col gap-5">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 text-xs font-mono">
                    <span className="text-[#3B82F6] font-semibold">TAXONOMY METRICS</span>
                    <span className="text-[#F4BA00]">UPDATED WEEKLY</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-3.5 rounded-xl bg-[#101215] border border-white/[0.04] shadow-box-inset">
                      <span className="text-[#9AA3B2] block mb-1">CORE TOPICS:</span>
                      <span className="font-semibold text-[#EFECE4]">5 Disciplines</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#101215] border border-white/[0.04] shadow-box-inset">
                      <span className="text-[#9AA3B2] block mb-1">ESSAY FORMATS:</span>
                      <span className="font-semibold text-[#F4BA00]">5 Deep Formats</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#101215] border border-white/[0.04] shadow-box-inset">
                      <span className="text-[#9AA3B2] block mb-1">FOUNDATION:</span>
                      <span className="font-semibold text-[#EFECE4]">Production Code</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#101215] border border-white/[0.04] shadow-box-inset">
                      <span className="text-[#9AA3B2] block mb-1">ACCESS:</span>
                      <span className="font-semibold text-[#3B82F6]">100% Open Access</span>
                    </div>
                  </div>

                  <p className="text-xs font-body text-[#9AA3B2] leading-relaxed pt-1">
                    Every article and breakdown is synthesized directly from active client deployments and empirical experiments.
                  </p>
                </div>
              }
            />
          </div>
        </section>

        {/* 2. TOPIC TAXONOMY INDEX & SYNCHRONIZED TOPIC CONTENT */}
        <MotionSection
          id="taxonomy"
          signature="editorial-alternate-reveal"
          className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]"
        >
          <div className="max-w-7xl mx-auto flex flex-col gap-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
              <div className="flex flex-col gap-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e22] border border-[#3B82F6]/30 text-xs font-mono tracking-wider w-fit text-[#93C5FD]">
                  <span>KNOWLEDGE TAXONOMY</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold uppercase tracking-tight text-[#EFECE4]">
                  Five Core Disciplines
                </h2>
                <p className="text-sm sm:text-base font-body text-[#9AA3B2] leading-relaxed">
                  Filter by discipline to inspect the key operational questions and strategic frameworks covered.
                </p>
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#9AA3B2] shrink-0">
                [SYNCHRONIZED DIRECTORY]
              </span>
            </div>

            {/* Desktop & Mobile Responsive Topic Switcher */}
            <div className="flex flex-wrap items-center gap-2 p-2 rounded-[16px] bg-[#141619] border border-white/[0.08] shadow-box-inset">
              {insights.topics.map((topic, idx) => {
                const isActive = activeTopicIdx === idx;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveTopicIdx(idx)}
                    className={cn(
                      "py-2.5 px-4 sm:px-5 rounded-[10px] font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2",
                      isActive
                        ? "bg-[#1b1e22] text-[#3B82F6] border border-[#3B82F6]/50 shadow-box-selected font-semibold"
                        : "text-[#9AA3B2] hover:text-[#EFECE4] hover:bg-[#171a1e] shadow-box-sm hover:shadow-box-hover box-interactive"
                    )}
                  >
                    <span
                      className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        isActive ? "bg-[#3B82F6] shadow-[0_0_6px_#3B82F6]" : "bg-white/20"
                      )}
                    />
                    <span>{topic.category}</span>
                  </button>
                );
              })}
            </div>

            {/* Synchronized Content Console (No blank columns, natural height!) */}
            <div className="rounded-[20px] bg-[#1b1e22] border border-white/[0.08] p-8 sm:p-12 shadow-box-lg flex flex-col gap-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#F4BA00] block mb-1">
                    TAXONOMY DISCIPLINE
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-heading font-semibold uppercase tracking-tight text-[#EFECE4]">
                    {activeTopic.category}
                  </h3>
                </div>
                <div className="font-mono text-xs text-[#9AA3B2]">
                  AXON·VORTEX KNOWLEDGE ARCHIVE
                </div>
              </div>

              <p className="font-body text-base text-[#9AA3B2] leading-relaxed max-w-3xl">
                {activeTopic.intro}
              </p>

              {/* Focus Areas */}
              {activeTopic.items && (
                <div className="flex flex-col gap-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#3B82F6] font-medium">
                    Core Focus Areas:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {activeTopic.items.map((item, qIdx) => (
                      <div
                        key={qIdx}
                        className="p-4 rounded-[12px] bg-[#101215] border border-white/[0.04] flex items-center gap-3 shadow-box-inset"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] shrink-0" />
                        <p className="font-heading font-medium text-xs sm:text-sm text-[#EFECE4] leading-snug">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </MotionSection>

        {/* 3. EDITORIAL CONTENT-TYPE DIRECTORY */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto">
            <OpenNumberedList
              badge={contentTypes.badge}
              title={contentTypes.title}
              subtitle="We deliver insights across five structured technical formats engineered for direct application."
              items={formatList}
            />
          </div>
        </section>

        {/* 4. KNOWLEDGE / CONTENT LOOP */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto">
            <HorizontalJourney
              badge={contentLoop.badge}
              title={contentLoop.title}
              subtitle="How real client challenges evolve into tested code, public architectures, and repeatable frameworks."
              stages={loopStages}
              conclusion={contentLoop.startWithProblem + " " + contentLoop.helpThinkThrough}
            />
          </div>
        </section>

        {/* 5. FINAL INSIGHTS CTA */}
        <CTASection
          badge="KNOWLEDGE INTO ACTION"
          headline="Turn Theoretical Insights Into Operational Revenue."
          description="Reading about modern growth architectures is valuable. Deploying them inside your business is transformative. Request a Growth Audit to evaluate your current systems."
          primaryCta={{
            label: "Request Growth Audit",
            href: "/growth-audit",
          }}
          secondaryCta={{
            label: "Explore Solutions",
            href: "/solutions",
          }}
        />
      </div>
    </SiteTextureBackground>
  );
}
