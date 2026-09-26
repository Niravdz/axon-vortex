import React from "react";
import Link from "next/link";
import { ArrowUpRight, Check, X } from "lucide-react";
import { homeContent } from "@/data/content/home";
import { MotionSection } from "@/components/animation/MotionSection";

export function WhyAxonSection() {
  const { whyAxon } = homeContent;

  return (
    <MotionSection
      as="section"
      signature="contrast-dual-slide"
      className="relative w-full bg-[#101215] text-[#EFECE4] py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08] overflow-x-clip"
    >
      {/* Background Subtle Amber Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 left-1/4 w-[500px] h-[400px] bg-[#F4BA00]/[0.05] rounded-full blur-[140px]"
      />

      <div className="max-w-7xl mx-auto flex flex-col gap-14 sm:gap-16">
        {/* Open Editorial Header — No box container */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4">
          <div className="max-w-3xl flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e22] border border-[#F4BA00]/30 text-xs font-mono tracking-wider w-fit text-[#FDE68A] shadow-box-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F4BA00] animate-pulse" />
              <span>{whyAxon.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-tight uppercase leading-[1.06] text-[#EFECE4]">
              {whyAxon.headline}
            </h2>

            <p className="font-body text-base sm:text-lg text-[#9AA3B2] leading-relaxed">
              {whyAxon.subheading}{" "}
              <span className="text-[#EFECE4]">We build systems where strategy dictates tooling, not the other way around.</span>
            </p>
          </div>

          <Link
            href="/about"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#F4BA00] hover:text-[#FDE68A] transition-colors"
          >
            <span>Read Our Full Ethos</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Two-Sided Contrast: Fragmented Model vs. AxonVortex Model */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Left: The Old Agency Model */}
          <div className="motion-left p-8 sm:p-10 rounded-[20px] bg-[#141619] border border-white/[0.06] flex flex-col justify-between gap-6 shadow-box-lg">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 pb-4 border-b border-white/[0.06]">
                <div className="w-7 h-7 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <X className="w-4 h-4 text-red-400" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-red-300 uppercase">
                  The Fragmented Agency Approach
                </h3>
              </div>

              <div className="flex flex-col gap-3 font-body text-sm text-[#9AA3B2]">
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400/60 shrink-0 mt-2" />
                  <span>Tools and software deployed before understanding the core business problem.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400/60 shrink-0 mt-2" />
                  <span>Vanity metrics (impressions, follower counts) that never translate to revenue.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400/60 shrink-0 mt-2" />
                  <span>Siloed vendors: marketing team doesn&apos;t talk to CRM, CRM doesn&apos;t talk to web.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400/60 shrink-0 mt-2" />
                  <span>Static quarterly retainers with zero feedback loops or iterative improvements.</span>
                </div>
              </div>
            </div>

            <div className="font-mono text-xs text-red-400/70 pt-4 border-t border-white/[0.04]">
              RESULT: HIGH EXPENSE, SYSTEMIC DRAG, DISCONNECTED EFFORT
            </div>
          </div>

          {/* Right: The AxonVortex Unified System Model */}
          <div className="motion-right p-8 sm:p-10 rounded-[20px] bg-[#16191e] border border-[#3B82F6]/30 shadow-box-lg flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 pb-4 border-b border-white/[0.06]">
                <div className="w-7 h-7 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/30 flex items-center justify-center">
                  <Check className="w-4 h-4 text-[#3B82F6]" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-[#60A5FA] uppercase">
                  The AxonVortex Growth System
                </h3>
              </div>

              <div className="flex flex-col gap-3 font-body text-sm text-[#9AA3B2]">
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] shrink-0 mt-2" />
                  <span className="text-[#EFECE4]">Rigorous root-cause diagnosis before any tool or ad dollar is spent.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] shrink-0 mt-2" />
                  <span className="text-[#EFECE4]">Direct pipeline focus: high-intent lead generation and closed-loop revenue.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] shrink-0 mt-2" />
                  <span className="text-[#EFECE4]">Unified architecture: web, ads, CRM, and AI workflows seamlessly synchronized.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] shrink-0 mt-2" />
                  <span className="text-[#EFECE4]">Continuous agile loops: Build → Measure → Learn → Improve → Scale.</span>
                </div>
              </div>
            </div>

            <div className="font-mono text-xs text-[#3B82F6] pt-4 border-t border-white/[0.04]">
              RESULT: AUTONOMOUS OPERATING MOMENTUM, PREDICTABLE YIELD
            </div>
          </div>
        </div>

        {/* 6 Core Pillars — Open Numbered List (No enclosing boxes) */}
        <div className="pt-8 border-t border-white/[0.08]">
          <span className="font-mono text-xs uppercase tracking-wider text-[#9AA3B2] block mb-6">
            OUR SIX OPERATING PILLARS:
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {whyAxon.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="motion-item flex flex-col gap-2 pt-4 border-t border-white/[0.08]"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-semibold text-[#F4BA00]">
                    0{idx + 1}
                  </span>
                  <h4 className="font-heading font-semibold text-base sm:text-lg text-[#EFECE4]">
                    {pillar.title}
                  </h4>
                </div>
                <p className="font-body text-xs sm:text-sm text-[#9AA3B2] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
