"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export interface DiagnosticItem {
  problem: string;
  recommendation: string;
  href?: string;
  impact?: string;
  indicators?: string[];
}

export interface DiagnosticMatrixProps {
  badge?: string;
  title: string;
  subtitle?: string;
  items: DiagnosticItem[];
  conclusion?: string;
  className?: string;
}

export function DiagnosticMatrix({
  badge,
  title,
  subtitle,
  items,
  conclusion,
  className,
}: DiagnosticMatrixProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const { gsap } = getGSAP();
    const el = containerRef.current;

    const ctx = gsap.context(() => {
      const rows = el.querySelectorAll(".diagnostic-matrix-row");
      gsap.fromTo(
        rows,
        { opacity: 0, x: -24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div className={cn("w-full flex flex-col gap-8", className)}>
      {/* Matrix Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
        <div className="flex flex-col gap-3 max-w-2xl">
          {badge && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e22] border border-[#F4BA00]/30 text-xs font-mono tracking-wider w-fit text-[#FDE68A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F4BA00] animate-pulse" />
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
        <span className="font-mono text-xs uppercase tracking-wider text-[#9AA3B2] shrink-0">
          [DECISION PATHWAY LEDGER]
        </span>
      </div>

      {/* Pathway Ledger Rows */}
      <div ref={containerRef} className="flex flex-col divide-y divide-white/[0.06] rounded-[20px] bg-[#141619] border border-white/[0.08] overflow-hidden shadow-box-lg">
        {items.map((item, idx) => {
          const isSelected = selectedIdx === idx;
          const content = (
            <div
              onClick={() => setSelectedIdx(isSelected ? null : idx)}
              className={cn(
                "diagnostic-matrix-row p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all duration-200 cursor-pointer group will-change-[transform,opacity]",
                isSelected
                  ? "bg-[#1b1e22]"
                  : "hover:bg-[#171a1e]"
              )}
            >
              {/* Problem / Situation Statement */}
              <div className="flex items-start gap-4 max-w-2xl">
                <span className="w-2 h-2 rounded-full bg-[#3B82F6] shrink-0 mt-2 shadow-[0_0_6px_#3B82F6]" />
                <div>
                  <h3 className="text-base sm:text-lg font-heading font-semibold uppercase text-[#EFECE4] group-hover:text-[#60A5FA] transition-colors leading-snug">
                    {item.problem}
                  </h3>
                  {item.indicators && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {item.indicators.map((ind, iIdx) => (
                        <span
                          key={iIdx}
                          className="font-mono text-[11px] text-[#9AA3B2] px-2 py-0.5 rounded bg-[#101215] border border-white/[0.04] shadow-box-inset"
                        >
                          {ind}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Solution / Outcome Pathway */}
              <div className="flex items-center gap-4 shrink-0 sm:self-end lg:self-center">
                <div className="px-4 py-2 rounded-[8px] bg-[#101215] border border-white/[0.06] shadow-box-inset flex items-center gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#9AA3B2]">
                    Pathway:
                  </span>
                  <strong className="font-heading font-semibold text-xs sm:text-sm uppercase tracking-wide text-[#F4BA00]">
                    {item.recommendation}
                  </strong>
                </div>

                {item.href ? (
                  <Link
                    href={item.href}
                    className="p-2.5 rounded-[8px] bg-[#171a1e] border border-white/[0.08] text-[#EFECE4] hover:text-[#3B82F6] hover:border-[#3B82F6]/50 transition-colors shadow-box-sm hover:shadow-box-hover box-interactive"
                    aria-label={`View ${item.recommendation}`}
                  >
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                ) : (
                  <ChevronRight
                    className={cn(
                      "w-4 h-4 text-[#9AA3B2] transition-transform",
                      isSelected ? "rotate-90 text-[#3B82F6]" : ""
                    )}
                  />
                )}
              </div>
            </div>
          );

          return <div key={idx}>{content}</div>;
        })}
      </div>

      {/* Recessed Conclusion Strip */}
      {conclusion && (
        <div className="p-5 sm:p-6 rounded-[14px] bg-[#101215] border border-white/[0.06] shadow-box-inset flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#3B82F6] shrink-0" />
            <p className="font-heading font-medium text-xs sm:text-sm text-[#EFECE4]">
              {conclusion}
            </p>
          </div>
          <span className="hidden sm:inline font-mono text-xs uppercase text-[#9AA3B2]">
            SYSTEM DIAGNOSIS COMPLETE
          </span>
        </div>
      )}
    </div>
  );
}
