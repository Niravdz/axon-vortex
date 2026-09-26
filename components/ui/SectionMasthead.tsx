"use client";

import React, { ReactNode } from "react";

interface SectionMastheadProps {
  badge: string;
  descriptor?: string | ReactNode;
  rightLabel?: string | ReactNode;
  children?: ReactNode;
  className?: string;
}

export function SectionMasthead({
  badge,
  descriptor,
  rightLabel,
  children,
  className = "",
}: SectionMastheadProps) {
  return (
    <div
      className={`relative z-20 w-full flex flex-col gap-2.5 pb-4 border-b border-white/[0.08] ${className}`}
    >
      <div className="flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
        {/* Left: Compact Content-Width Eyebrow Chip */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#1b1e22] border border-white/[0.08] text-xs font-mono tracking-wider shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse shrink-0" />
          <span className="text-[11px] font-heading font-medium text-[#EFECE4] uppercase tracking-wider">
            {badge}
          </span>
        </div>

        {/* Centre: Supporting Context/Descriptor */}
        {descriptor && (
          <div className="hidden md:flex items-center text-center text-[11px] font-mono text-[#9AA3B2] uppercase tracking-widest truncate">
            {descriptor}
          </div>
        )}

        {/* Right: Counter, Status Label or Custom Children */}
        <div className="flex items-center gap-3 text-right shrink-0">
          {children}
          {rightLabel && (
            <span className="text-[11px] font-mono text-[#F4BA00] font-medium uppercase tracking-wider">
              {rightLabel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
