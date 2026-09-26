"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { authorityData } from "@/data/content/authorityConversion";
import { SiteTextureBackground } from "@/components/layout/SiteTextureBackground";
import { EditorialSplit } from "@/components/patterns/EditorialSplit";
import { ProcessTimeline } from "@/components/patterns/ProcessTimeline";
import { AudienceFitChecklist } from "@/components/patterns/AudienceFitChecklist";
import { CTASection } from "@/components/patterns/CTASection";
import { cn } from "@/lib/utils";

export default function GrowthAuditPageClient() {
  const {
    growthAuditIntro: hero,
    whatWeLookAt: scope,
    whatYouGet: deliverables,
    auditFramework: framework,
    whoShouldRequestAudit: ideal,
  } = authorityData;

  const [activeCategoryIdx, setActiveCategoryIdx] = useState<number>(0);
  const activeCategory = scope.categories[activeCategoryIdx] || scope.categories[0];

  // Process timeline steps for audit framework
  const frameworkSteps = framework.steps.map((st, idx) => ({
    number: String(idx + 1).padStart(2, "0"),
    title: st.name,
    description: st.description || "",
  }));

  return (
    <SiteTextureBackground className="overflow-x-clip">
      <div className="w-full text-[#EFECE4]">
        {/* 0. TOP SPEC BAR */}
        <div className="w-full border-b border-white/[0.08] bg-[#101215] px-4 sm:px-8 lg:px-12 py-3">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-wider">
            <div className="flex items-center gap-2 text-[#9AA3B2]">
              <Link href="/" className="hover:text-[#3B82F6] font-medium transition-colors">
                Home
              </Link>
              <span className="text-white/30">/</span>
              <span className="text-[#3B82F6] font-semibold">Digital Growth Audit</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-block w-2 h-2 rounded-full bg-[#F4BA00] shadow-[0_0_8px_#F4BA00] animate-pulse" />
              <span className="font-semibold text-[#EFECE4] tracking-widest text-[11px]">
                FULL-SYSTEM DIAGNOSTIC // 28 CHECKPOINTS
              </span>
            </div>
          </div>
        </div>

        {/* 1. HERO - Diagnostic Interface */}
        <section className="relative w-full border-b border-[#EFECE4]/[0.08] py-16 sm:py-24 px-4 sm:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <EditorialSplit
              badge={hero.badge}
              badgeAccent="amber"
              systemLabel="OBJECTIVE SYSTEM DIAGNOSTIC"
              title={
                <>
                  Find What&apos;s Holding <br />
                  <span className="text-[#F4BA00]">Your Digital Growth</span> <br />
                  <span className="text-[#3B82F6]">Back.</span>
                </>
              }
              subtitle="An exhaustive 28-checkpoint evaluation across acquisition, conversion, automation and technology systems."
              paragraphs={[
                "Most businesses don't need more tools or more random marketing campaigns. They need to identify the exact friction point preventing scale.",
                "The AxonVortex Growth Audit inspects your end-to-end architecture, delivering actionable prioritization backed by commercial data.",
              ]}
              primaryCta={{
                label: "Request Growth Audit",
                href: "/contact",
              }}
              secondaryCta={{
                label: "Inspect 28 Checkpoints",
                href: "#checkpoints",
              }}
              rightContent={
                <div className="rounded-[20px] bg-[#1b1e22] border border-white/[0.08] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col gap-6">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 text-xs font-mono">
                    <span className="text-[#3B82F6] font-semibold">DIAGNOSTIC SCOPE</span>
                    <span className="text-[#F4BA00]">ZERO FLUFF</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                    <div className="p-3.5 rounded-xl bg-[#101215] border border-white/[0.04]">
                      <span className="text-[#9AA3B2] block mb-1">AREAS INSPECTED:</span>
                      <span className="font-semibold text-[#EFECE4]">4 System Domains</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#101215] border border-white/[0.04]">
                      <span className="text-[#9AA3B2] block mb-1">TOTAL CHECKPOINTS:</span>
                      <span className="font-semibold text-[#F4BA00]">28 Inspection Nodes</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#101215] border border-white/[0.04]">
                      <span className="text-[#9AA3B2] block mb-1">DELIVERY TIME:</span>
                      <span className="font-semibold text-[#EFECE4]">5-7 Business Days</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#101215] border border-white/[0.04]">
                      <span className="text-[#9AA3B2] block mb-1">OUTPUT FORMAT:</span>
                      <span className="font-semibold text-[#3B82F6]">Actionable Roadmap</span>
                    </div>
                  </div>

                  <p className="text-xs font-body text-[#9AA3B2] leading-relaxed pt-1">
                    No automated generic scans. Every audit is conducted by senior growth engineers reviewing your real accounts.
                  </p>
                </div>
              }
            />
          </div>
        </section>

        {/* 2. AUDIT-CATEGORY MATRIX (28 CHECKPOINTS ACROSS 4 DOMAINS) */}
        <section id="checkpoints" className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto flex flex-col gap-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
              <div className="flex flex-col gap-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e22] border border-[#F4BA00]/30 text-xs font-mono tracking-wider w-fit text-[#FDE68A]">
                  <span>28 CHECKPOINT INSPECTION</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold uppercase tracking-tight text-[#EFECE4]">
                  {scope.title}
                </h2>
                <p className="text-sm sm:text-base font-body text-[#9AA3B2] leading-relaxed">
                  Select a category to review the specific technical and commercial checkpoints evaluated.
                </p>
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#9AA3B2] shrink-0">
                [4 SYSTEM PILLARS]
              </span>
            </div>

            {/* Desktop Category Selector + Details Console */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Category Buttons Column (4 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                {scope.categories.map((cat, idx) => {
                  const isActive = activeCategoryIdx === idx;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveCategoryIdx(idx)}
                      className={cn(
                        "w-full text-left p-5 rounded-[14px] border transition-all duration-200 flex items-center justify-between cursor-pointer",
                        isActive
                          ? "bg-[#1b1e22] text-[#EFECE4] border-[#F4BA00]/50 shadow-[0_8px_20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)]"
                          : "bg-[#141619] text-[#9AA3B2] border-white/[0.06] hover:bg-[#171a1e] hover:border-white/[0.12] hover:text-[#EFECE4]"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "w-2 h-2 rounded-full shrink-0",
                            isActive ? "bg-[#F4BA00] shadow-[0_0_8px_#F4BA00]" : "bg-white/20"
                          )}
                        />
                        <span className="font-heading font-semibold text-sm sm:text-base uppercase tracking-tight">
                          {cat.name}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-[#9AA3B2]">
                        {cat.items.length} Points
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Inspection Checkpoints Console (7 cols) */}
              <div className="lg:col-span-7 rounded-[20px] bg-[#1b1e22] border border-white/[0.08] p-8 sm:p-10 shadow-[0_16px_38px_-6px_rgba(0,0,0,0.72),inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <span className="font-mono text-xs font-semibold text-[#F4BA00] uppercase tracking-wider">
                    CHECKPOINT LEDGER // {activeCategory.name}
                  </span>
                  <span className="font-mono text-xs text-[#9AA3B2]">
                    [AUDIT MODULE]
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeCategory.items.map((it, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-[10px] bg-[#101215] border border-white/[0.04] shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)] flex items-start gap-2.5 text-xs font-body text-[#EFECE4]"
                    >
                      <Check className="w-3.5 h-3.5 text-[#3B82F6] shrink-0 mt-0.5" />
                      <span>{it}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between font-mono text-xs text-[#9AA3B2]">
                  <span>RIGOROUS EVALUATION STANDARD</span>
                  <span className="text-[#3B82F6]">AXON·VORTEX</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. LAYERED DELIVERABLES STACK */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto flex flex-col gap-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
              <div className="flex flex-col gap-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e22] border border-[#3B82F6]/30 text-xs font-mono tracking-wider w-fit text-[#93C5FD]">
                  <span>DELIVERABLE ARTIFACTS</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold uppercase tracking-tight text-[#EFECE4]">
                  {deliverables.title}
                </h2>
                <p className="text-sm sm:text-base font-body text-[#9AA3B2] leading-relaxed">
                  You receive an executive briefing and technical action plan you can execute independently or partner with AxonVortex to deploy.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {deliverables.items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-[16px] bg-[#141619] border border-white/[0.06] flex flex-col justify-between gap-4"
                >
                  <div className="flex flex-col gap-3">
                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#101215] border border-white/[0.04] text-[#3B82F6] w-fit">
                      ARTIFACT 0{idx + 1}
                    </span>
                    <h3 className="font-heading font-semibold text-lg uppercase tracking-tight text-[#EFECE4]">
                      {item.title}
                    </h3>
                    <p className="font-body text-xs sm:text-sm text-[#9AA3B2] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. AUDIT PROCESS TIMELINE */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto">
            <ProcessTimeline
              badge={framework.badge}
              title={framework.title}
              subtitle="A focused 5 to 7 day engagement with minimal disruption to your daily operations."
              steps={frameworkSteps}
              accent="amber"
            />
          </div>
        </section>

        {/* 5. IDEAL CANDIDATE CHECKLIST */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto">
            <AudienceFitChecklist
              badge={ideal.badge}
              headline={ideal.title}
              points={ideal.situations}
              conclusion="If you need unvarnished truth about what is capping your digital growth, this audit delivers complete clarity."
            />
          </div>
        </section>

        {/* 6. FINAL AUDIT CTA */}
        <CTASection
          badge="DIAGNOSTIC COMMISSION"
          headline="Stop Guessing Where Your Growth Leaks."
          description="Request a Digital Growth Audit. We'll conduct an initial preliminary review to confirm suitability before commencing the full inspection."
          primaryCta={{
            label: "Request Your Growth Audit",
            href: "/contact",
          }}
          secondaryCta={{
            label: "Explore Solutions Ecosystem",
            href: "/solutions",
          }}
        />
      </div>
    </SiteTextureBackground>
  );
}

export { GrowthAuditPageClient };
