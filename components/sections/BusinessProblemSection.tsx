"use client";

import React from "react";
import { homeContent } from "@/data/content/home";
import { InteractiveDiagnosticEngine } from "@/components/patterns/InteractiveDiagnosticEngine";
import { MotionSection } from "@/components/animation/MotionSection";

export function BusinessProblemSection() {
  const { businessProblem } = homeContent;

  return (
    <MotionSection
      signature="diagnostic-radar-reveal"
      direction="up"
      threshold="top 82%"
      className="relative w-full bg-[#121519] text-[#EFECE4] py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08] overflow-hidden"
    >
      {/* Background Soft Blue Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 left-1/4 w-[500px] h-[400px] bg-[#3B82F6]/[0.05] rounded-full blur-[140px]"
      />

      <div className="max-w-7xl mx-auto flex flex-col gap-12 sm:gap-16">
        {/* Open Editorial Header — No enclosing box */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4">
          <div data-motion-title className="max-w-3xl flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e22] border border-[#3B82F6]/30 text-xs font-mono tracking-wider w-fit text-[#93C5FD]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
              <span>{businessProblem.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-tight uppercase leading-[1.06] text-[#EFECE4]">
              {businessProblem.headline}
            </h2>

            <p className="font-body text-base sm:text-lg text-[#9AA3B2] leading-relaxed">
              {businessProblem.intro}
            </p>
          </div>

          {/* Pull Statement */}
          <div data-motion-card className="max-w-md p-6 rounded-[16px] bg-[#16191e] border-l-2 border-[#F4BA00] border-y border-r border-white/[0.04] shadow-[0_8px_20px_rgba(0,0,0,0.5)]">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#F4BA00] block mb-2 font-semibold">
              CORE PRINCIPLE
            </span>
            <p className="font-heading font-medium text-base text-[#EFECE4] leading-snug">
              &ldquo;{businessProblem.statement}&rdquo;
            </p>
          </div>
        </div>

        {/* Interactive Problem-to-Solution Diagnostic Engine */}
        <div data-motion-card>
          <InteractiveDiagnosticEngine problems={businessProblem.problems} />
        </div>
      </div>
    </MotionSection>
  );
}
