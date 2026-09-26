"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { MotionSection } from "@/components/animation/MotionSection";

export interface StackLayer {
  id: string;
  title: string;
  slug?: string;
  description: string;
  useCasesLabel?: string;
  useCases?: string[];
  deliverables?: string[];
  specs?: { label: string; value: string }[];
}

export interface LayeredContentStackProps {
  badge?: string;
  title: string;
  subtitle?: string;
  layers: StackLayer[];
  className?: string;
}

export function LayeredContentStack({
  badge,
  title,
  subtitle,
  layers,
  className,
}: LayeredContentStackProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeLayer = layers[activeIndex] || layers[0];

  return (
    <MotionSection
      signature="interactive-matrix-slide"
      className={cn("w-full flex flex-col gap-10", className)}
    >
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
        <span className="font-mono text-xs uppercase tracking-wider text-[#9AA3B2] shrink-0">
          [{layers.length} INTERFACE LAYERS]
        </span>
      </div>

      {/* Layered Desktop Console / Mobile Stacked Accordion */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Layer Selector Column (5 cols) */}
        <div className="motion-left lg:col-span-5 flex flex-col gap-3">
          {layers.map((layer, idx) => {
            const isActive = activeIndex === idx;

            return (
              <div key={layer.id || idx}>
                <button
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    "w-full text-left p-4 sm:p-5 rounded-[14px] border box-interactive flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]",
                    isActive
                      ? "bg-[#1b1e22] border-[#3B82F6] shadow-box-selected text-[#EFECE4]"
                      : "bg-[#141619] border-white/[0.06] shadow-box-sm hover:shadow-box-hover hover:border-white/[0.12] hover:bg-[#171a1e] text-[#9AA3B2] hover:text-[#EFECE4]"
                  )}
                  aria-expanded={isActive}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "w-2 h-2 rounded-full shrink-0 transition-colors",
                        isActive
                          ? "bg-[#3B82F6] shadow-[0_0_8px_#3B82F6]"
                          : "bg-white/20"
                      )}
                    />
                    <span className="font-heading font-semibold text-sm sm:text-base uppercase tracking-tight">
                      {layer.title}
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 shrink-0 transition-transform lg:hidden",
                      isActive ? "rotate-180 text-[#3B82F6]" : "text-[#9AA3B2]"
                    )}
                  />
                </button>

                {/* Mobile Dropdown Preview when Active */}
                {isActive && (
                  <div className="lg:hidden mt-2 p-5 rounded-[12px] bg-[#101215] border border-white/[0.08] shadow-box-inset flex flex-col gap-4">
                    <p className="text-xs sm:text-sm font-body text-[#9AA3B2] leading-relaxed">
                      {layer.description}
                    </p>

                    {layer.useCases && layer.useCases.length > 0 && (
                      <div className="flex flex-col gap-2">
                        <span className="font-mono text-[11px] uppercase tracking-wider text-[#F4BA00]">
                          {layer.useCasesLabel || "Use Cases:"}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {layer.useCases.map((uc, uIdx) => (
                            <span
                              key={uIdx}
                              className="px-2.5 py-1 rounded bg-[#171a1e] border border-white/[0.04] text-[11px] font-mono text-[#EFECE4] shadow-box-inset"
                            >
                              {uc}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {layer.slug && (
                      <Link
                        href={`/services/${layer.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-[#3B82F6] hover:text-[#60A5FA]"
                      >
                        <span>View Specifications</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop Active Layer Preview Console (7 cols) */}
        <div className="motion-right hidden lg:flex lg:col-span-7 flex-col rounded-[20px] bg-[#141619] border border-white/[0.08] p-8 sm:p-10 shadow-box-lg gap-6">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-[#101215] text-[#3B82F6] border border-white/[0.04]">
              ACTIVE LAYER // {String(activeIndex + 1).padStart(2, "0")}
            </span>
            {activeLayer.slug && (
              <Link
                href={`/services/${activeLayer.slug}`}
                className="font-mono text-xs text-[#3B82F6] hover:text-[#60A5FA] inline-flex items-center gap-1 transition-colors"
              >
                <span>Inspect Full Specs</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-heading font-semibold uppercase tracking-tight text-[#EFECE4] mb-3">
              {activeLayer.title}
            </h3>
            <p className="text-sm sm:text-base font-body text-[#9AA3B2] leading-relaxed">
              {activeLayer.description}
            </p>
          </div>

          {/* Practical Use Cases or Deliverables */}
          {activeLayer.useCases && activeLayer.useCases.length > 0 && (
            <div className="p-6 rounded-[14px] bg-[#101215] border border-white/[0.04] shadow-box-inset">
              <span className="font-mono text-xs uppercase tracking-wider text-[#F4BA00] block mb-3 font-medium">
                {activeLayer.useCasesLabel || "DEPLOYMENT SCENARIOS & WORKFLOWS:"}
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                {activeLayer.useCases.map((uc, uIdx) => (
                  <div
                    key={uIdx}
                    className="p-3 rounded-[8px] bg-[#171a1e] border border-white/[0.04] shadow-box-inset font-mono text-xs text-[#EFECE4] flex items-center gap-2"
                  >
                    <Check className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
                    <span>{uc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeLayer.deliverables && activeLayer.deliverables.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.06]">
              {activeLayer.deliverables.map((deliv, dIdx) => (
                <span
                  key={dIdx}
                  className="px-3 py-1 rounded-[6px] bg-[#101215] border border-white/[0.04] text-xs font-mono text-[#EFECE4]"
                >
                  {deliv}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </MotionSection>
  );
}
