"use client";

import React from "react";
import Image from "next/image";
import { digitalMarketingData } from "@/data/content/digitalMarketing";
import { SiteTextureBackground } from "@/components/layout/SiteTextureBackground";
import { EditorialSplit } from "@/components/patterns/EditorialSplit";
import { HorizontalJourney } from "@/components/patterns/HorizontalJourney";
import { AlternatingFeatureRows } from "@/components/patterns/AlternatingFeatureRows";
import { ProcessTimeline } from "@/components/patterns/ProcessTimeline";
import { AudienceFitChecklist } from "@/components/patterns/AudienceFitChecklist";
import { CTASection } from "@/components/patterns/CTASection";
import { MotionSection } from "@/components/animation/MotionSection";

export function DigitalMarketingClient() {
  const { hero, problem, services, approach, whoThisIsFor, finalCta } = digitalMarketingData;

  // Convert problem sequence into connected flow stages
  const sequenceStages = [
    { name: "Strategy", description: "Audit positioning, core audience, and market demand." },
    { name: "Content", description: "Develop authoritative creative and messaging assets." },
    { name: "Distribution", description: "Deploy through targeted organic and paid channels." },
    { name: "Traffic", description: "Capture high-intent search and social demand." },
    { name: "Conversion", description: "Direct visitors into high-performing conversion points." },
    { name: "Measurement", description: "Analyze real revenue signals and optimize spend." },
  ];

  // Map services into alternating feature rows
  const featureItems = services.map((svc, idx) => ({
    id: svc.slug || String(idx),
    step: String(idx + 1).padStart(2, "0"),
    title: svc.title,
    slug: svc.slug,
    description: svc.description,
    deliverables: svc.includes,
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
        {/* 1. VISIBILITY / SIGNAL HERO */}
        <section className="relative w-full border-b border-[#EFECE4]/[0.08] py-16 sm:py-24 px-4 sm:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <EditorialSplit
              badge={hero.badge}
              badgeAccent="blue"
              systemLabel="MARKETING ENGINEERING"
              title={
                <>
                  Get Seen. <br />
                  <span className="text-[#3B82F6]">Get Remembered.</span> <br />
                  <span className="text-[#F4BA00]">Get Chosen.</span>
                </>
              }
              subtitle="Digital marketing should do more than keep your business active online."
              paragraphs={hero.paragraphs.slice(1)}
              primaryCta={hero.cta}
              secondaryCta={{
                label: "Inspect Capabilities",
                href: "#capabilities",
              }}
              rightContent={
                <div className="rounded-[20px] bg-[#1b1e22] border border-white/[0.08] p-5 sm:p-7 shadow-box-lg flex flex-col gap-4">
                  <div className="flex items-center justify-between text-xs font-mono text-[#9AA3B2] border-b border-white/[0.06] pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
                      <span className="text-[#EFECE4] uppercase">SIGNAL ARCHITECTURE</span>
                    </div>
                    <span className="text-[#F4BA00]">MULTI-CHANNEL</span>
                  </div>

                  <div className="relative w-full aspect-[16/10] rounded-[12px] bg-[#101215] border border-white/[0.04] overflow-hidden shadow-box-inset">
                    <Image
                      src="/images/bauhaus-diagram-marketing.png"
                      alt="Digital Marketing Funnel & Signal Distribution Schematic"
                      fill
                      priority
                      className="object-contain p-3 opacity-90 hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-[#9AA3B2] pt-1">
                    <span>ACQUISITION CONDUIT</span>
                    <span className="text-[#3B82F6] font-semibold">CLOSED-LOOP SYSTEM</span>
                  </div>
                </div>
              }
            />
          </div>
        </section>

        {/* 2. AUDIENCE-TO-CONVERSION FLOW (Marketing Friction & Pipeline) */}
        <MotionSection
          as="section"
          signature="signal-path-reveal"
          className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]"
        >
          <div className="max-w-7xl mx-auto flex flex-col gap-12">
            <div className="max-w-3xl flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e22] border border-[#F4BA00]/30 text-xs font-mono tracking-wider w-fit text-[#FDE68A]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F4BA00] animate-pulse" />
                <span>{problem.badge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold uppercase tracking-tight text-[#EFECE4]">
                {problem.headline}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {problem.points.map((pt, i) => (
                  <div
                    key={i}
                    className="motion-item p-3.5 rounded-[10px] bg-[#141619] border border-white/[0.04] shadow-box-sm text-xs font-body text-[#9AA3B2]"
                  >
                    {pt}
                  </div>
                ))}
              </div>
            </div>

            {/* Continuous Audience-to-Conversion Flow */}
            <HorizontalJourney
              badge="CONTINUOUS MARKETING ENGINE"
              title="Audience-to-Conversion Journey"
              subtitle="We align every marketing interaction from initial awareness down to conversion and measurement."
              stages={sequenceStages}
              conclusion={problem.conclusion}
            />
          </div>
        </MotionSection>

        {/* 3. ALTERNATING SERVICE ROWS & CAPABILITIES */}
        <section id="capabilities" className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto flex flex-col gap-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
              <div className="flex flex-col gap-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e22] border border-[#3B82F6]/30 text-xs font-mono tracking-wider w-fit text-[#93C5FD]">
                  <span>CORE PRODUCTION CAPABILITIES</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold uppercase tracking-tight text-[#EFECE4]">
                  What We Build &amp; Deploy
                </h2>
                <p className="text-sm sm:text-base font-body text-[#9AA3B2] leading-relaxed">
                  Five specialized digital marketing disciplines delivered with engineering precision.
                </p>
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#9AA3B2] shrink-0">
                [{services.length} ACTIVE WORKSTREAMS]
              </span>
            </div>

            {/* Alternating Feature Rows */}
            <AlternatingFeatureRows items={featureItems} />
          </div>
        </section>

        {/* 4. MARKETING PROCESS TIMELINE */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto">
            <ProcessTimeline
              badge={approach.badge}
              title="Strategic Execution Framework"
              subtitle="How we take digital marketing from arbitrary posting to a predictable growth system."
              steps={approach.steps}
              accent="blue"
            />
          </div>
        </section>

        {/* 5. OUTCOME STATEMENTS & AUDIENCE FIT */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto">
            <AudienceFitChecklist
              badge={whoThisIsFor.badge}
              headline={whoThisIsFor.headline}
              points={whoThisIsFor.points}
              conclusion="If your marketing feels fragmented across too many agencies, tools or freelancers, we bring it together under one strategic discipline."
            />
          </div>
        </section>

        {/* 6. FINAL MARKETING CTA */}
        <CTASection
          badge="STRATEGIC GROWTH COMMISSION"
          headline={finalCta.headline}
          description="Speak with our marketing engineers to map your channels, address conversion bottlenecks, and build an intentional acquisition architecture."
          primaryCta={finalCta.cta}
          secondaryCta={{
            label: "Explore Growth Audit",
            href: "/growth-audit",
          }}
        />
      </div>
    </SiteTextureBackground>
  );
}
