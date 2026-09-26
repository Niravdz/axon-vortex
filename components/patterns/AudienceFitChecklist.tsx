"use client";

import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AudienceFitChecklistProps {
  badge?: string;
  headline: string;
  points: string[];
  conclusion?: string;
  className?: string;
}

export function AudienceFitChecklist({
  badge = "AUDIENCE FIT",
  headline,
  points,
  conclusion,
  className,
}: AudienceFitChecklistProps) {
  return (
    <div className={cn("w-full flex flex-col gap-8", className)}>
      <div className="flex flex-col gap-3 max-w-2xl">
        {badge && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e22] border border-[#3B82F6]/30 text-xs font-mono tracking-wider w-fit text-[#93C5FD]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
            <span>{badge}</span>
          </div>
        )}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold uppercase tracking-tight text-[#EFECE4] leading-tight">
          {headline}
        </h2>
      </div>

      {/* Clean Open Checkpoint List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
        {points.map((pt, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 rounded-[12px] bg-[#141619] border border-white/[0.06] hover:border-[#3B82F6]/40 transition-colors flex items-start gap-3.5 group"
          >
            <div className="w-6 h-6 rounded-[6px] bg-[#101215] border border-white/[0.08] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] flex items-center justify-center shrink-0 mt-0.5 group-hover:border-[#3B82F6]/60 transition-colors">
              <Check className="w-3.5 h-3.5 text-[#3B82F6]" />
            </div>
            <p className="font-body text-xs sm:text-sm text-[#EFECE4]/90 leading-relaxed pt-0.5">
              {pt}
            </p>
          </div>
        ))}
      </div>

      {conclusion && (
        <div className="p-4 sm:p-5 rounded-[12px] bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_4px_rgba(0,0,0,0.7)]">
          <p className="font-heading font-medium text-xs sm:text-sm text-[#F4BA00]">
            {conclusion}
          </p>
        </div>
      )}
    </div>
  );
}
