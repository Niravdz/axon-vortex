"use client";

import React, { useRef, useEffect } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { getGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const { gsap } = getGSAP();
    const el = containerRef.current;

    const ctx = gsap.context(() => {
      const cards = el.querySelectorAll(".checklist-item-card");
      gsap.fromTo(
        cards,
        { opacity: 0, scale: 0.94, y: 16 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
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
    <div ref={containerRef} className={cn("w-full flex flex-col gap-8", className)}>
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
            className="checklist-item-card p-4 sm:p-5 rounded-[12px] bg-[#141619] border border-white/[0.06] shadow-box-sm hover:shadow-box-hover box-interactive hover:border-[#3B82F6]/40 flex items-start gap-3.5 group will-change-[transform,opacity]"
          >
            <div className="w-6 h-6 rounded-[6px] bg-[#101215] border border-white/[0.08] shadow-box-inset flex items-center justify-center shrink-0 mt-0.5 group-hover:border-[#3B82F6]/60 transition-colors">
              <Check className="w-3.5 h-3.5 text-[#3B82F6]" />
            </div>
            <p className="font-body text-xs sm:text-sm text-[#EFECE4]/90 leading-relaxed pt-0.5">
              {pt}
            </p>
          </div>
        ))}
      </div>

      {conclusion && (
        <div className="p-4 sm:p-5 rounded-[12px] bg-[#101215] border border-white/[0.04] shadow-box-inset">
          <p className="font-heading font-medium text-xs sm:text-sm text-[#F4BA00]">
            {conclusion}
          </p>
        </div>
      )}
    </div>
  );
}
