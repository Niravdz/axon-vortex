"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface JourneyStage {
  step?: string;
  name: string;
  description: string;
  detail?: string;
}

export interface HorizontalJourneyProps {
  badge?: string;
  title: string;
  subtitle?: string;
  stages: JourneyStage[];
  conclusion?: string;
  className?: string;
}

export function HorizontalJourney({
  badge,
  title,
  subtitle,
  stages,
  conclusion,
  className,
}: HorizontalJourneyProps) {
  const [activeStage, setActiveStage] = useState<number>(0);

  return (
    <div className={cn("w-full flex flex-col gap-10", className)}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
        <div className="flex flex-col gap-3 max-w-2xl">
          {badge && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e22] border border-[#3B82F6]/30 text-xs font-mono tracking-wider w-fit text-[#93C5FD]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
              <span>{badge}</span>
            </div>
          )}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold uppercase tracking-tight text-[#EFECE4]">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm sm:text-base font-body text-[#9AA3B2] leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        <span className="font-mono text-xs uppercase tracking-wider text-[#F4BA00] font-semibold">
          {stages[0]?.name} → {stages[stages.length - 1]?.name}
        </span>
      </div>

      {/* Journey Stages Pipeline */}
      <div className="relative">
        {/* Desktop Connected Line behind nodes */}
        <div
          aria-hidden="true"
          className="hidden xl:block absolute top-7 left-8 right-8 h-[2px] bg-gradient-to-r from-[#3B82F6] via-[#2D5BB9] to-[#F4BA00] z-0 opacity-40"
        />

        {/* Responsive Grid: Vertical on mobile/tablet, 4 or 8 across on large displays without overflow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          {stages.map((st, idx) => {
            const isSelected = activeStage === idx;
            const isLast = idx === stages.length - 1;
            const num = st.step || String(idx + 1).padStart(2, "0");

            return (
              <div
                key={idx}
                onClick={() => setActiveStage(idx)}
                className={cn(
                  "p-5 rounded-[16px] border flex flex-col justify-between gap-4 transition-all duration-200 cursor-pointer group",
                  isSelected
                    ? "bg-[#1b1e22] border-[#3B82F6]/50 shadow-[0_8px_24px_rgba(0,0,0,0.6),0_0_16px_rgba(59,130,246,0.15),inset_0_1px_0_rgba(255,255,255,0.1)]"
                    : isLast
                    ? "bg-[#141619] border-[#F4BA00]/30 hover:bg-[#171a1e]"
                    : "bg-[#141619] border-white/[0.06] hover:bg-[#171a1e] hover:border-white/[0.12]"
                )}
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-3">
                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#101215] border border-white/[0.04] text-[#3B82F6]">
                      {num}
                    </span>
                    <span
                      className={cn(
                        "w-2 h-2 rounded-full",
                        isSelected
                          ? "bg-[#3B82F6] shadow-[0_0_8px_#3B82F6] animate-pulse"
                          : isLast
                          ? "bg-[#F4BA00]"
                          : "bg-white/20"
                      )}
                    />
                  </div>

                  <h3 className="font-heading font-semibold text-sm sm:text-base uppercase tracking-tight text-[#EFECE4] group-hover:text-[#60A5FA] transition-colors leading-tight mb-2">
                    {st.name}
                  </h3>

                  <p className="font-body text-xs text-[#9AA3B2] leading-relaxed">
                    {st.description}
                  </p>
                </div>

                {st.detail && (
                  <div className="pt-2 border-t border-white/[0.04] text-[11px] font-mono text-[#F4BA00]">
                    {st.detail}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Recessed Conclusion Strip */}
      {conclusion && (
        <div className="p-5 rounded-[14px] bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_5px_rgba(0,0,0,0.78)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#F4BA00] animate-pulse" />
            <p className="font-heading font-semibold text-xs sm:text-sm uppercase text-[#F4BA00]">
              Continuous Pipeline Integration
            </p>
          </div>
          <p className="font-body text-xs text-[#9AA3B2] text-center sm:text-right max-w-xl leading-relaxed">
            {conclusion}
          </p>
        </div>
      )}
    </div>
  );
}
