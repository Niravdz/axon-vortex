"use client";

import React from "react";
import Image from "next/image";
import { aiAutomationData } from "@/data/content/aiAutomation";
import { SiteTextureBackground } from "@/components/layout/SiteTextureBackground";
import { EditorialSplit } from "@/components/patterns/EditorialSplit";
import { DiagnosticMatrix } from "@/components/patterns/DiagnosticMatrix";
import { LayeredContentStack } from "@/components/patterns/LayeredContentStack";
import { ProcessTimeline } from "@/components/patterns/ProcessTimeline";
import { ManifestoSection } from "@/components/patterns/ManifestoSection";
import { AudienceFitChecklist } from "@/components/patterns/AudienceFitChecklist";
import { CTASection } from "@/components/patterns/CTASection";

export function AiAutomationClient() {
  const { hero, problem, services, approach, whoThisIsFor, finalCta } = aiAutomationData;

  // Diagnostic items mapping manual time drains to automated resolution pathways
  const frictionLedger = [
    {
      problem: "Repetitive customer questions draining support capacity",
      recommendation: "24/7 Context-Aware AI Chatbot & Knowledge Base",
      href: "/services/ai-chatbots",
    },
    {
      problem: "Slow response times causing inbound leads to go cold",
      recommendation: "Instant Lead Routing & Automated Follow-Up Workflows",
      href: "/services/ai-automation",
    },
    {
      problem: "Friction in meeting bookings and discovery call scheduling",
      recommendation: "Automated Conversational Appointment Booking",
    },
    {
      problem: "Manual data re-entry between marketing tools and internal CRM",
      recommendation: "Automated Webhook & API Data Synchronization",
      href: "/services/crm",
    },
    {
      problem: "Complex multi-step research and lead qualification",
      recommendation: "Autonomous Multi-Step AI Agents",
      href: "/services/ai-agents",
    },
  ];

  // Convert services into layered capability stack format
  const capabilityLayers = services.map((svc) => ({
    id: svc.slug || svc.title.toLowerCase().replace(/\s+/g, "-"),
    title: svc.title,
    slug: svc.slug,
    description: svc.description,
    useCasesLabel: svc.useCasesLabel,
    useCases: svc.useCases || [
      "Customer response automation",
      "Lead triage and qualification",
      "Internal knowledge queries",
      "Process optimization",
    ],
  }));

  // Timeline steps for AI execution methodology
  const timelineSteps = approach.steps.map((st, idx) => ({
    number: String(idx + 1).padStart(2, "0"),
    title: st.name,
    description: st.question,
    detail: "Focused on measurable operational return before wide deployment.",
  }));

  return (
    <SiteTextureBackground className="overflow-x-clip">
      <div className="w-full text-[#EFECE4]">
        {/* 1. HUMAN + AI SPLIT HERO */}
        <section className="relative w-full border-b border-[#EFECE4]/[0.08] py-16 sm:py-24 px-4 sm:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <EditorialSplit
              badge={hero.badge}
              badgeAccent="amber"
              systemLabel="PRACTICAL AI WORKFLOWS"
              title={
                <>
                  AI That Works <br />
                  <span className="text-[#3B82F6]">For Your Business,</span> <br />
                  <span className="text-[#F4BA00]">Not Instead of It.</span>
                </>
              }
              subtitle="AI shouldn't be about chasing the latest tool. It should be about solving real business friction."
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
                      <span className="w-2 h-2 rounded-full bg-[#F4BA00] animate-pulse" />
                      <span className="text-[#EFECE4] uppercase">COGNITIVE ENGINE</span>
                    </div>
                    <span className="text-[#3B82F6]">ACTIVE RUNTIME</span>
                  </div>

                  <div className="relative w-full aspect-[16/10] rounded-[12px] bg-[#101215] border border-white/[0.04] overflow-hidden shadow-box-inset">
                    <Image
                      src="/images/bauhaus-diagram-ai.png"
                      alt="Neural Workflow Architecture and Systematic Integration Schematic"
                      fill
                      priority
                      className="object-contain p-3 opacity-90 hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-[#9AA3B2] pt-1">
                    <span>WORKFLOW AUTOMATION</span>
                    <span className="text-[#F4BA00] font-semibold">HUMAN-IN-THE-LOOP</span>
                  </div>
                </div>
              }
            />
          </div>
        </section>

        {/* 2. CONNECTED AI WORKFLOW & FRICTION DIAGNOSTIC */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto flex flex-col gap-10">
            <DiagnosticMatrix
              badge={problem.badge}
              title={problem.headline}
              subtitle="Your team shouldn't spend valuable human energy doing repetitive manual work that machines handle faster and error-free."
              items={frictionLedger}
              conclusion="We evaluate your operational workflows first, deploying automation precisely where it protects staff hours and accelerates customer responses."
            />
          </div>
        </section>

        {/* 3. LAYERED CAPABILITY STACK & PRACTICAL USE CASES */}
        <section id="capabilities" className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto">
            <LayeredContentStack
              badge="INTELLIGENT SYSTEMS"
              title="Automations & AI Capabilities"
              subtitle="Modular AI components built on proven frameworks and connected into your existing business stack."
              layers={capabilityLayers}
            />
          </div>
        </section>

        {/* 4. AUTOMATION PROCESS JOURNEY */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto">
            <ProcessTimeline
              badge={approach.badge}
              title="Practical AI Deployment Cycle"
              subtitle="How we introduce intelligent automations without operational disruption or tool sprawl."
              steps={timelineSteps}
              accent="amber"
            />
          </div>
        </section>

        {/* 5. HUMAN + AI MANIFESTO & QUALIFICATION */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto flex flex-col gap-16">
            <ManifestoSection
              badge="STRATEGIC DIRECTIVE"
              badgeAccent="amber"
              statement={problem.opportunityPrimary + " " + problem.opportunitySecondary}
              supportingText="We combine computational speed with strategic human judgment. Repetitive tasks belong to software; high-stakes strategy, creative nuance and client relationships belong to humans."
            />

            <AudienceFitChecklist
              badge={whoThisIsFor.badge}
              headline={whoThisIsFor.headline}
              points={whoThisIsFor.points}
              conclusion="If you want to reduce overhead and improve customer experience without adopting overly complicated software, we engineer the right bridge."
            />
          </div>
        </section>

        {/* 6. FINAL AI CTA */}
        <CTASection
          badge="OPERATIONAL AUTOMATION"
          headline={`${finalCta.statement1} ${finalCta.statement2}`}
          description="Schedule an operational review with our team. We'll analyze your repetitive touchpoints and demonstrate exactly where automation saves time."
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
