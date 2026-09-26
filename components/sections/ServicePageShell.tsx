"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ServicePageShellProps {
  category: string;
  title: string;
  tagline: string;
  description: string;
  problemHeadline: string;
  problemPoints: string[];
  capabilities: { title: string; desc: string }[];
  processSteps: { step: string; title: string; desc: string }[];
  benefits?: string[];
  ctaText?: string;
}

export function ServicePageShell({
  category,
  title,
  tagline,
  description,
  problemHeadline,
  problemPoints,
  capabilities,
  processSteps,
  ctaText = "Schedule Strategy Session",
}: ServicePageShellProps) {
  return (
    <div className="pt-8 pb-24 px-6 sm:px-10 lg:px-12 flex flex-col gap-20 max-w-7xl mx-auto text-[#EFECE4]">
      {/* 1. Hero Section */}
      <div className="flex flex-col gap-6 max-w-4xl pt-6">
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16335C]/60 border border-[#3B82F6]/35 text-xs font-mono tracking-wider text-[#3B82F6]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
            <span>CAPABILITY</span>
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#9AA3B2]">
            {category}
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-semibold uppercase tracking-tight text-[#EFECE4] leading-[1.04]">
          {title}
        </h1>

        <p className="text-lg sm:text-xl font-heading font-medium text-[#60A5FA]">
          {tagline}
        </p>

        <p className="text-sm sm:text-base text-[#9AA3B2] font-body leading-relaxed max-w-2xl border-l-2 border-[#3B82F6] pl-4">
          {description}
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <Button variant="amber" size="md" withArrow asLink href="/contact">
            {ctaText}
          </Button>
          <Button variant="outline" size="md" asLink href="/services">
            Explore All Services
          </Button>
        </div>
      </div>

      {/* 2. Problem Diagnosis Box */}
      <div className="rounded-[16px] border border-white/[0.08] bg-[#1b1e22] p-8 sm:p-12 flex flex-col gap-8 shadow-[0_16px_38px_-6px_rgba(0,0,0,0.72),0_6px_14px_-3px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)]">
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171a1e] border border-[#F4BA00]/30 text-xs font-mono tracking-wider text-[#F4BA00] w-fit shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F4BA00] animate-pulse" />
            <span>SYSTEM FRICTION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-[#EFECE4] uppercase tracking-tight mt-1">
            {problemHeadline}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {problemPoints.map((pt, i) => (
            <div
              key={i}
              className="p-6 rounded-[12px] bg-[#101215] border border-white/[0.04] flex flex-col gap-3 shadow-[inset_0_2px_5px_rgba(0,0,0,0.78),inset_0_1px_1px_rgba(0,0,0,0.92),0_1px_0_rgba(255,255,255,0.04)] hover:border-[#3B82F6]/30 transition-colors"
            >
              <span className="font-mono text-xs text-[#3B82F6] px-2.5 py-1 rounded-[4px] bg-[#171a1e] border border-white/[0.06] w-fit font-semibold shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-xs sm:text-sm text-[#9AA3B2] font-body leading-relaxed">
                {pt}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Capabilities / What We Do */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e22] border border-[#3B82F6]/35 text-xs font-mono tracking-wider text-[#3B82F6] w-fit shadow-[0_2px_6px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]">
            <span>CAPABILITIES MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-[#EFECE4] uppercase tracking-tight mt-1">
            Architectural Capabilities
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {capabilities.map((cap, i) => (
            <div
              key={i}
              className="p-7 sm:p-8 rounded-[14px] border border-white/[0.08] bg-[#171a1e] shadow-[0_10px_28px_-4px_rgba(0,0,0,0.72),0_4px_10px_-2px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col justify-between hover:border-[#3B82F6]/50 hover:bg-[#21252a] hover:shadow-[0_16px_34px_rgba(0,0,0,0.8),0_0_20px_rgba(59,130,246,0.15)] hover:-translate-y-1 transition-all duration-200 group"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4 transition-colors">
                  <span className="font-mono text-xs font-semibold text-[#3B82F6] px-2 py-0.5 rounded-[4px] bg-[#101215] border border-white/[0.05] shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)] group-hover:text-[#60A5FA] transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Plus className="w-4 h-4 text-[#9AA3B2] group-hover:text-[#3B82F6] group-hover:rotate-90 transition-all duration-200" />
                </div>
                <h3 className="text-lg font-heading font-semibold uppercase text-[#EFECE4] group-hover:text-[#60A5FA] mb-2 transition-colors leading-snug">
                  {cap.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#9AA3B2] font-body leading-relaxed transition-colors">
                  {cap.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Execution Process */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e22] border border-[#3B82F6]/35 text-xs font-mono tracking-wider text-[#3B82F6] w-fit shadow-[0_2px_6px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]">
            <span>EXECUTION PIPELINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-[#EFECE4] uppercase tracking-tight mt-1">
            Implementation Process
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {processSteps.map((st, i) => (
            <div
              key={i}
              className="p-6 rounded-[12px] border border-white/[0.08] bg-[#171a1e] flex flex-col gap-2 shadow-[0_8px_20px_-3px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-[#3B82F6]/40 hover:bg-[#21252a] transition-all"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs text-[#F4BA00] font-semibold px-2 py-0.5 rounded-[4px] bg-[#101215] border border-white/[0.04] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]">
                  STEP {st.step || String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-base font-heading font-semibold uppercase text-[#EFECE4]">
                {st.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#9AA3B2] font-body leading-relaxed">
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Bottom Conversion Callout */}
      <div className="rounded-[16px] bg-[#1b1e22] border border-white/[0.08] p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_16px_38px_-6px_rgba(0,0,0,0.72),0_6px_14px_-3px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)]">
        <div>
          <h3 className="text-2xl font-heading font-semibold uppercase text-[#EFECE4]">
            Ready to deploy {title}?
          </h3>
          <p className="text-sm text-[#9AA3B2] mt-1">
            Schedule a strategy session to evaluate your current architecture and timeline.
          </p>
        </div>
        <Button
          variant="amber"
          size="lg"
          withArrow
          asLink
          href="/contact"
          className="shrink-0 shadow-[0_4px_16px_rgba(244,186,0,0.35)]"
        >
          {ctaText}
        </Button>
      </div>
    </div>
  );
}
