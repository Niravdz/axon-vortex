"use client";

import React from "react";
import Link from "next/link";
import { SiteTextureBackground } from "@/components/layout/SiteTextureBackground";
import { EditorialSplit } from "@/components/patterns/EditorialSplit";
import { OpenNumberedList } from "@/components/patterns/OpenNumberedList";
import { RecessedAccordion } from "@/components/patterns/RecessedAccordion";
import { CTASection } from "@/components/patterns/CTASection";

const principles = [
  {
    number: "01",
    title: "Strategy Before Technology",
    description: "Understand the commercial problem thoroughly before choosing any technological or creative tool.",
  },
  {
    number: "02",
    title: "Practical AI",
    description: "Use AI where it creates measurable, direct business value rather than adopting novelty for marketing optics.",
  },
  {
    number: "03",
    title: "Human + AI",
    description: "Combine computational automation and speed with strategic human judgment, empathy, and accountability.",
  },
  {
    number: "04",
    title: "Connected Growth",
    description: "Ensure all digital touchpoints, acquisition channels, CRM pipelines, and workflows operate as one synchronized engine.",
  },
  {
    number: "05",
    title: "Continuous Improvement",
    description: "Build, deploy, measure against empirical data, learn from operational friction, and continuously iterate.",
  },
  {
    number: "06",
    title: "Business Impact",
    description: "Prioritize revenue-driving metrics, pipeline velocity, and client capacity over vanity engagement numbers.",
  },
];

const faqs = [
  {
    title: "What is AxonVortex?",
    content: (
      <p>
        AxonVortex is an AI-driven digital growth agency helping businesses build, market and scale smarter through a combination of strategy, marketing, creativity, technology, AI, automation and data.
      </p>
    ),
  },
  {
    title: "Do you only provide AI services?",
    content: (
      <p>
        No. AI is one component of our broader digital growth approach. Depending on the business challenge, the right solution may involve marketing, websites, lead generation, technology, automation, AI or a synchronized combination.
      </p>
    ),
  },
  {
    title: "Do I need to know which service I need?",
    content: (
      <p>
        No. You can start by explaining your business challenge and commercial goal. We&apos;ll help diagnose friction points and identify the highest-leverage next step.
      </p>
    ),
  },
  {
    title: "Are you a new agency?",
    content: (
      <p>
        Yes. AxonVortex is being built from zero in public. We believe radical transparency and modern engineering discipline are more valuable than manufactured legacy awards.
      </p>
    ),
  },
  {
    title: "Do you work with existing systems?",
    content: (
      <p>
        Yes, where appropriate. We evaluate your existing websites, ad accounts, CRM tools, and internal workflows before recommending changes or integrations.
      </p>
    ),
  },
];

export default function AuthorityPageClient() {
  return (
    <SiteTextureBackground className="overflow-x-clip">
      <div className="w-full text-[#EFECE4]">
        {/* 0. BREADCRUMB */}
        <div className="w-full border-b border-white/[0.08] bg-[#101215] px-4 sm:px-8 lg:px-12 py-3">
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

        {/* 1. HERO - Editorial Split */}
        <section className="relative w-full border-b border-[#EFECE4]/[0.08] py-16 sm:py-24 px-4 sm:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <EditorialSplit
              badge="STRATEGIC POSITIONING"
              badgeAccent="blue"
              systemLabel="COMMERCIAL DISCIPLINE"
              title={
                <>
                  Authority &amp; <br />
                  <span className="text-[#3B82F6]">Conversion.</span>
                </>
              }
              subtitle="Visibility gets you noticed. True authority and frictionless conversion get you chosen."
              paragraphs={[
                "A sustainable agency relationship requires mutual transparency, measurable engineering standards, and shared commercial incentives.",
                "Explore the foundational doctrines that guide how we engage, diagnose, build, and support our partners.",
              ]}
              primaryCta={{
                label: "Explore Operating Code",
                href: "#principles",
              }}
              secondaryCta={{
                label: "Request Growth Audit",
                href: "/growth-audit",
              }}
              rightContent={
                <div className="rounded-[20px] bg-[#1b1e22] border border-white/[0.08] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col gap-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#F4BA00] font-semibold">
                    AGENCY PHILOSOPHY
                  </span>
                  <p className="font-heading font-medium text-lg sm:text-xl text-[#EFECE4] leading-snug">
                    &ldquo;We don&apos;t sell disconnected digital services. We build connected growth systems.&rdquo;
                  </p>
                  <div className="p-4 rounded-xl bg-[#101215] border border-white/[0.04] text-xs font-mono text-[#9AA3B2] leading-relaxed">
                    Closed-loop systems designed around clear commercial targets.
                  </div>
                </div>
              }
            />
          </div>
        </section>

        {/* 2. OPERATIONAL PRINCIPLES (OPEN NUMBERED LIST) */}
        <section id="principles" className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto">
            <OpenNumberedList
              badge="CORE PRINCIPLES"
              title="Six Operational Doctrines"
              subtitle="The foundational engineering principles that dictate every client recommendation."
              items={principles}
            />
          </div>
        </section>

        {/* 3. FREQUENTLY ASKED QUESTIONS */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-4xl mx-auto flex flex-col gap-10">
            <div className="flex flex-col gap-3 text-center items-center">
              <span className="font-mono text-xs uppercase tracking-widest text-[#3B82F6] font-semibold">
                COMMISSION CLARIFICATIONS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold uppercase tracking-tight text-[#EFECE4]">
                Agency FAQs
              </h2>
            </div>

            <RecessedAccordion items={faqs} defaultOpenIndex={0} />
          </div>
        </section>

        {/* 4. FINAL CTA */}
        <CTASection
          badge="COMMISSION AN ENGAGEMENT"
          headline="Ready to Engineer a Measurable Growth System?"
          description="Speak with our engineering leads to review your commercial requirements, identify system bottlenecks, and build an intentional roadmap."
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
