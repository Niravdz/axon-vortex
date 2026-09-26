"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface TimelineStep {
  number?: string;
  step?: string;
  title: string;
  description: string;
  deliverables?: string[];
  question?: string;
  detail?: string;
}

export interface ProcessTimelineProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  steps: TimelineStep[];
  className?: string;
  accent?: "blue" | "amber";
}

export function ProcessTimeline({
  badge,
  title,
  subtitle,
  steps,
  className,
  accent = "blue",
}: ProcessTimelineProps) {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <div className={cn("w-full flex flex-col gap-10", className)}>
      {/* Header if provided */}
      {(badge || title) && (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
          <div className="flex flex-col gap-3 max-w-2xl">
            {badge && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e22] border border-white/[0.08] text-xs font-mono tracking-wider w-fit text-[#93C5FD]">
                <span
                  className={cn(
                    "w-1.5 h-1.5 rounded-full animate-pulse",
                    accent === "amber" ? "bg-[#F4BA00]" : "bg-[#3B82F6]"
                  )}
                />
                <span>{badge}</span>
              </div>
            )}
            {title && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold uppercase tracking-tight text-[#EFECE4]">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-sm sm:text-base font-body text-[#9AA3B2] leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
          <span className="font-mono text-xs uppercase tracking-wider text-[#9AA3B2] shrink-0">
            [{steps.length} SEQUENTIAL STAGES]
          </span>
        </div>
      )}

      {/* Timeline Stream: Single column progressive flow on mobile, split with progress rail on desktop */}
      <div className="relative">
        {/* Continuous Recessed Vertical Track */}
        <div
          aria-hidden="true"
          className="absolute left-[19px] sm:left-[23px] top-6 bottom-6 w-[2px] bg-[#171a1e] border-r border-white/[0.06]"
        />

        <div className="flex flex-col gap-6 sm:gap-8">
          {steps.map((st, idx) => {
            const isSelected = activeStep === idx;
            const stepNum = st.number || st.step || String(idx + 1).padStart(2, "0");

            return (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className="group relative flex items-start gap-4 sm:gap-6 cursor-pointer"
              >
                {/* Node Marker */}
                <div
                  className={cn(
                    "relative z-10 shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-mono text-xs font-semibold transition-all duration-300",
                    isSelected
                      ? accent === "amber"
                        ? "bg-[#F4BA00] text-[#0D1014] shadow-[0_0_16px_rgba(244,186,0,0.5),inset_0_1px_0_rgba(255,255,255,0.4)] scale-105"
                        : "bg-[#3B82F6] text-white shadow-[0_0_16px_rgba(59,130,246,0.5),inset_0_1px_0_rgba(255,255,255,0.4)] scale-105"
                      : "bg-[#171a1e] text-[#9AA3B2] border border-white/[0.08] shadow-[0_2px_4px_rgba(0,0,0,0.6)] group-hover:border-[#3B82F6]/50 group-hover:text-[#EFECE4]"
                  )}
                >
                  {stepNum}
                </div>

                {/* Step Content Card / Open Content */}
                <div
                  className={cn(
                    "flex-1 p-5 sm:p-7 rounded-[16px] border transition-all duration-200",
                    isSelected
                      ? "bg-[#1b1e22] border-white/[0.14] shadow-[0_12px_28px_-4px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)]"
                      : "bg-[#141619] border-white/[0.05] hover:border-white/[0.1] hover:bg-[#171a1e]/60"
                  )}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
                    <h3
                      className={cn(
                        "text-lg sm:text-xl font-heading font-semibold uppercase tracking-tight transition-colors",
                        isSelected
                          ? accent === "amber"
                            ? "text-[#FDE68A]"
                            : "text-[#60A5FA]"
                          : "text-[#EFECE4]"
                      )}
                    >
                      {st.title}
                    </h3>
                    <span className="font-mono text-xs text-[#9AA3B2]/80 uppercase tracking-widest">
                      STAGE {stepNum}
                    </span>
                  </div>

                  <p className="font-body text-xs sm:text-sm text-[#9AA3B2] leading-relaxed mt-1">
                    {st.description}
                  </p>

                  {st.question && (
                    <div className="mt-3 p-3 rounded-[8px] bg-[#101215] border border-white/[0.04] text-xs font-mono text-[#F4BA00]">
                      <span className="text-[#9AA3B2] mr-2">PRIMARY INQUIRY:</span>
                      &ldquo;{st.question}&rdquo;
                    </div>
                  )}

                  {st.detail && (
                    <p className="mt-2 text-xs font-body text-[#9AA3B2]/90 border-l border-[#3B82F6] pl-3">
                      {st.detail}
                    </p>
                  )}

                  {st.deliverables && st.deliverables.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-wrap gap-2">
                      {st.deliverables.map((deliv, dIdx) => (
                        <span
                          key={dIdx}
                          className="px-2.5 py-1 rounded-[4px] bg-[#101215] border border-white/[0.04] font-mono text-[11px] text-[#EFECE4]"
                        >
                          {deliv}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
