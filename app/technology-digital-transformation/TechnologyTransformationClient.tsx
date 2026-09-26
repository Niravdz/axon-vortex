"use client";

import React from "react";
import Image from "next/image";
import { technologyTransformationData } from "@/data/content/technologyTransformation";
import { SiteTextureBackground } from "@/components/layout/SiteTextureBackground";
import { EditorialSplit } from "@/components/patterns/EditorialSplit";
import { DiagnosticMatrix } from "@/components/patterns/DiagnosticMatrix";
import { LayeredContentStack } from "@/components/patterns/LayeredContentStack";
import { ProcessTimeline } from "@/components/patterns/ProcessTimeline";
import { ManifestoSection } from "@/components/patterns/ManifestoSection";
import { CTASection } from "@/components/patterns/CTASection";

export function TechnologyTransformationClient() {
  const { hero, problem, services, approach, purpose, finalCta } = technologyTransformationData;

  // Diagnostic items mapping tech complexity to architectural remedies
  const complexityDiagnostic = [
    {
      problem: "Customer and sales data fragmented across spreadsheets and point-tools",
      recommendation: "Single Unified CRM & Client Pipeline Architecture",
      href: "/services/crm",
    },
    {
      problem: "Operational bottlenecks caused by disconnected software and manual copy-pasting",
      recommendation: "Enterprise Business Process & API Integration",
      href: "/services/custom-software",
    },
    {
      problem: "Off-the-shelf software imposes rigid constraints on your business model",
      recommendation: "Purpose-Built Custom Software & Internal Tooling",
      href: "/services/custom-software",
    },
    {
      problem: "Leadership lacks real-time visibility into key operational metrics and revenue",
      recommendation: "Centralized ERP & Operational Intelligence Dashboards",
    },
  ];

  // Convert services into layered capability stack format
  const techLayers = services.map((svc) => ({
    id: svc.slug || svc.title.toLowerCase().replace(/\s+/g, "-"),
    title: svc.title,
    slug: svc.slug,
    description: svc.description,
    useCasesLabel: "Architecture Deliverables:",
    useCases: [
      "Custom system integration",
      "API webhook orchestration",
      "Database harmonization",
      "Role-based security & scalability",
    ],
  }));

  // Timeline steps for the transformation roadmap
  const roadmapSteps = approach.steps.map((st, idx) => ({
    number: String(idx + 1).padStart(2, "0"),
    title: st.title,
    description: st.description,
  }));

  return (
    <SiteTextureBackground className="overflow-x-clip">
      <div className="w-full text-[#EFECE4]">
        {/* 1. SYSTEM ARCHITECTURE EDITORIAL HERO */}
        <section className="relative w-full border-b border-[#EFECE4]/[0.08] py-16 sm:py-24 px-4 sm:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <EditorialSplit
              badge={hero.badge}
              badgeAccent="blue"
              systemLabel="ENTERPRISE ARCHITECTURE"
              title={
                <>
                  Connect Your Business. <br />
                  <span className="text-[#3B82F6]">Simplify the Work.</span> <br />
                  <span className="text-[#F4BA00]">Build for What&apos;s Next.</span>
                </>
              }
              subtitle="As businesses scale, disconnected tools, manual spreadsheets and outdated software become growth ceilings."
              paragraphs={hero.paragraphs.slice(1)}
              primaryCta={hero.cta}
              secondaryCta={{
                label: "Inspect Capabilities",
                href: "#capabilities",
              }}
              rightContent={
                <div className="rounded-[20px] bg-[#1b1e22] border border-white/[0.08] p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col gap-4">
                  <div className="flex items-center justify-between text-xs font-mono text-[#9AA3B2] border-b border-white/[0.06] pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
                      <span className="text-[#EFECE4] uppercase">INTEGRATION MAP</span>
                    </div>
                    <span className="text-[#F4BA00]">SINGLE OPERATING SYSTEM</span>
                  </div>

                  <div className="relative w-full aspect-[16/10] rounded-[12px] bg-[#101215] border border-white/[0.04] overflow-hidden shadow-[inset_0_2px_6px_rgba(0,0,0,0.85)]">
                    <Image
                      src="/images/bauhaus-diagram-technology.jpg"
                      alt="System Architecture & Digital Transformation Integration Schematic"
                      fill
                      priority
                      className="object-contain p-3 opacity-90 hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-[#9AA3B2] pt-1">
                    <span>LEGACY TO MODERN</span>
                    <span className="text-[#3B82F6] font-semibold">SCALABLE RUNTIME</span>
                  </div>
                </div>
              }
            />
          </div>
        </section>

        {/* 2. DISCONNECTED TOOLS VS UNIFIED SYSTEM DIAGNOSTIC */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto flex flex-col gap-10">
            <DiagnosticMatrix
              badge={problem.badge}
              title={problem.headline}
              subtitle="Growth inevitably creates complexity. Without intentional architecture, businesses end up with software silos, duplicate data entry, and zero operational clarity."
              items={complexityDiagnostic}
              conclusion={problem.conclusion}
            />
          </div>
        </section>

        {/* 3. TECHNOLOGY LAYERS SYSTEM MAP */}
        <section id="capabilities" className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto">
            <LayeredContentStack
              badge="INTEGRATED WORKSTREAMS"
              title="Technology &amp; Software Layers"
              subtitle="Five interconnected technical solutions that consolidate your operations into a single cohesive platform."
              layers={techLayers}
            />
          </div>
        </section>

        {/* 4. TRANSFORMATION ROADMAP TIMELINE */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto">
            <ProcessTimeline
              badge={approach.badge}
              title="Transformation Roadmap"
              subtitle="A structured, risk-mitigated progression for modernizing technology without disrupting day-to-day business."
              steps={roadmapSteps}
              accent="blue"
            />
          </div>
        </section>

        {/* 5. PURPOSE & OUTCOME MANIFESTO */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto">
            <ManifestoSection
              badge={purpose.badge}
              badgeAccent="amber"
              statement={purpose.headline + " " + purpose.subtitle}
              supportingText="Software is an operational instrument, not a badge of honor. We measure transformation success not by the number of tools adopted, but by hours saved, errors eliminated, and capacity unlocked."
              items={purpose.benefits}
              conclusion="A connected architecture that eliminates software silos."
            />
          </div>
        </section>

        {/* 6. FINAL TRANSFORMATION CTA */}
        <CTASection
          badge="SYSTEM TRANSFORMATION"
          headline={finalCta.headline}
          description="Speak with our solutions architects to map your current software stack, identify operational bottlenecks, and construct a cohesive integration roadmap."
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
