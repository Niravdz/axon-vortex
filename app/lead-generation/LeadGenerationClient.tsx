"use client";

import React from "react";
import Image from "next/image";
import { leadGenerationData } from "@/data/content/leadGeneration";
import { SiteTextureBackground } from "@/components/layout/SiteTextureBackground";
import { EditorialSplit } from "@/components/patterns/EditorialSplit";
import { HorizontalJourney } from "@/components/patterns/HorizontalJourney";
import { AlternatingFeatureRows } from "@/components/patterns/AlternatingFeatureRows";
import { DiagnosticMatrix } from "@/components/patterns/DiagnosticMatrix";
import { AudienceFitChecklist } from "@/components/patterns/AudienceFitChecklist";
import { CTASection } from "@/components/patterns/CTASection";

export function LeadGenerationClient() {
  const { hero, leadJourney, services, problem, whoThisIsFor, finalCta } = leadGenerationData;

  // Problem matcher items mapping lead system breakdowns to solutions
  const leadBreakdowns = [
    {
      problem: "If your core offer is unclear, more advertising traffic simply burns budget",
      recommendation: "Offer Clarification & Value Proposition Engineering",
    },
    {
      problem: "If your landing page doesn't convert, ad traffic bounces without taking action",
      recommendation: "High-Intent Dedicated Landing Pages",
      href: "/services/website-development",
    },
    {
      problem: "If inquiries sit uncontacted for 24+ hours, leads go cold and choose competitors",
      recommendation: "Automated Instant Follow-Ups & CRM Routing",
      href: "/services/ai-automation",
    },
  ];

  // Map services into alternating feature rows
  const serviceItems = services.map((svc, idx) => ({
    id: svc.slug || String(idx),
    step: String(idx + 1).padStart(2, "0"),
    title: svc.title,
    slug: svc.slug,
    description: svc.description,
    deliverables: [
      "Inbound funnel architecture",
      "Lead scoring & qualification",
      "Automated notification triggers",
      "CRM pipeline sync",
    ],
    cta: svc.slug
      ? {
          label: "View Service Specifications",
          href: `/services/${svc.slug}`,
        }
      : undefined,
  }));

  return (
    <SiteTextureBackground className="overflow-x-clip">
      <div className="w-full text-[#EFECE4]">
        {/* 1. ATTENTION-TO-OPPORTUNITY EDITORIAL HERO */}
        <section className="relative w-full border-b border-[#EFECE4]/[0.08] py-16 sm:py-24 px-4 sm:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <EditorialSplit
              badge={hero.badge}
              badgeAccent="amber"
              systemLabel="ACQUISITION ARCHITECTURE"
              title={
                <>
                  Turn Attention <br />
                  <span className="text-[#3B82F6]">Into Verified</span> <br />
                  <span className="text-[#F4BA00]">Opportunity.</span>
                </>
              }
              subtitle="Traffic is not the same as leads. Leads are not the same as customers."
              paragraphs={[
                "A strong lead-generation system connects every stage between attention and revenue.",
                "AxonVortex builds the entire conversion bridge: from high-intent campaigns and landing pages to CRM routing and automated follow-ups.",
              ]}
              primaryCta={hero.cta}
              secondaryCta={{
                label: "Inspect Pipeline",
                href: "#pipeline",
              }}
              rightContent={
                <div className="rounded-[20px] bg-[#1b1e22] border border-white/[0.08] p-5 sm:p-7 shadow-box-lg flex flex-col gap-4">
                  <div className="flex items-center justify-between text-xs font-mono text-[#9AA3B2] border-b border-white/[0.06] pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#F4BA00] animate-pulse" />
                      <span className="text-[#EFECE4] uppercase">FUNNEL PIPELINE</span>
                    </div>
                    <span className="text-[#3B82F6]">CLOSED LOOP</span>
                  </div>

                  <div className="relative w-full aspect-[16/10] rounded-[12px] bg-[#101215] border border-white/[0.04] overflow-hidden shadow-box-inset">
                    <Image
                      src="/images/bauhaus-diagram-leadgen.jpg"
                      alt="Lead Generation Pipeline Architecture and CRM Conversion Schematic"
                      fill
                      priority
                      className="object-contain p-3 opacity-90 hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-[#9AA3B2] pt-1">
                    <span>ATTENTION → REVENUE</span>
                    <span className="text-[#F4BA00] font-semibold">AUTOMATED TRIAGE</span>
                  </div>
                </div>
              }
            />
          </div>
        </section>

        {/* 2. ATTENTION-TO-OPPORTUNITY CONNECTED FUNNEL */}
        <section id="pipeline" className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto">
            <HorizontalJourney
              badge={leadJourney.badge}
              title="The 8-Stage Lead Journey"
              subtitle="From cold attention down to qualified sales opportunity and closed customer."
              stages={leadJourney.stages}
              conclusion={problem.sequence}
            />
          </div>
        </section>

        {/* 3. LEAD-SYSTEM ARCHITECTURE & CAPABILITIES */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto flex flex-col gap-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
              <div className="flex flex-col gap-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e22] border border-[#3B82F6]/30 text-xs font-mono tracking-wider w-fit text-[#93C5FD]">
                  <span>PRODUCTION WORKSTREAMS</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold uppercase tracking-tight text-[#EFECE4]">
                  Lead System Architecture
                </h2>
                <p className="text-sm sm:text-base font-body text-[#9AA3B2] leading-relaxed">
                  Five specialized systems working together so no commercial inquiry slips through the cracks.
                </p>
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#9AA3B2] shrink-0">
                [{services.length} CONNECTED MODULES]
              </span>
            </div>

            <AlternatingFeatureRows items={serviceItems} />
          </div>
        </section>

        {/* 4. PROBLEM MATCHER & FULL-SYSTEM DIAGNOSTIC */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto">
            <DiagnosticMatrix
              badge={problem.badge}
              title={problem.headline}
              subtitle="More leads aren't always the answer. If the downstream bridge is broken, adding more traffic simply compounds operational waste."
              items={leadBreakdowns}
              conclusion={problem.conclusion}
            />
          </div>
        </section>

        {/* 5. QUALIFICATION STEPS & AUDIENCE FIT */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto">
            <AudienceFitChecklist
              badge={whoThisIsFor.badge}
              headline={whoThisIsFor.headline}
              points={whoThisIsFor.points}
              conclusion="We engineer predictable client acquisition pipelines for businesses ready to move past word-of-mouth uncertainty."
            />
          </div>
        </section>

        {/* 6. FINAL LEAD GEN CTA */}
        <CTASection
          badge="ACQUISITION COMMISSION"
          headline={finalCta.headline}
          description="Schedule a lead system evaluation. We'll map your existing funnel, pinpoint drop-off points, and construct an automated acquisition engine."
          primaryCta={finalCta.cta}
          secondaryCta={{
            label: "Request Growth Audit",
            href: "/growth-audit",
          }}
        />
      </div>
    </SiteTextureBackground>
  );
}
