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
      className={`relative z-20 w-full flex flex-col gap-2.5 pb-4 border-b border-brand-navy/12 ${className}`}
    >
      <div className="flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
        {/* Left: Compact Content-Width Eyebrow Chip */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/95 border border-brand-navy/15 shadow-2xs shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-turquoise animate-pulse shrink-0" />
          <span className="text-[11px] font-heading font-semibold text-editorial-primary uppercase tracking-wider">
            {badge}
          </span>
        </div>

        {/* Centre: Supporting Context/Descriptor */}
        {descriptor && (
          <div className="hidden md:flex items-center text-center text-[11px] font-mono text-editorial-secondary uppercase tracking-widest truncate">
            {descriptor}
          </div>
        )}

        {/* Right: Counter, Status Label or Custom Children */}
        <div className="flex items-center gap-3 text-right shrink-0">
          {children}
          {rightLabel && (
            <span className="text-[11px] font-mono text-brand-turquoise font-semibold uppercase tracking-wider">
              {rightLabel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
