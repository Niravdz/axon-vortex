"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { homeContent } from "@/data/content/home";
import { MotionSection } from "@/components/animation/MotionSection";
import { cn } from "@/lib/utils";

export function SolutionsOverviewSection() {
  const { solutionsOverview } = homeContent;
  const [activeDomainIdx, setActiveDomainIdx] = useState<number>(0);
  const [expandedMobileIdx, setExpandedMobileIdx] = useState<number | null>(0);
  const activeSolution = solutionsOverview.solutions[activeDomainIdx] || solutionsOverview.solutions[0];

  return (
    <MotionSection
      signature="staggered-system-grid"
      direction="scale"
      threshold="top 80%"
      className="relative w-full bg-[#121519] text-[#EFECE4] py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08] overflow-x-clip"
    >
      {/* Background Subtle Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#3B82F6]/[0.05] rounded-full blur-[160px]"
      />

      <div className="max-w-7xl mx-auto flex flex-col gap-12 sm:gap-16">
        {/* Open Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4">
          <div data-motion-title className="max-w-3xl flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e22] border border-[#3B82F6]/30 text-xs font-mono tracking-wider w-fit text-[#93C5FD] shadow-box-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
              <span>{solutionsOverview.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-tight uppercase leading-[1.06] text-[#EFECE4]">
              {solutionsOverview.headline}
            </h2>

            <p className="font-body text-base sm:text-lg text-[#9AA3B2] leading-relaxed">
              {solutionsOverview.philosophy}
            </p>
          </div>

          <Link
            data-motion-title
            href="/solutions"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#3B82F6] hover:text-[#60A5FA] transition-colors"
          >
            <span>View Full Solutions Ecosystem</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Desktop: Interactive Domain Explorer Console (Hidden on Mobile) */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-stretch">
          {/* Left Column: 5 Domain Navigation Switcher (5 cols) */}
          <div className="col-span-5 flex flex-col gap-3">
            {solutionsOverview.solutions.map((domain, idx) => {
              const isSelected = idx === activeDomainIdx;
              return (
                <button
                  key={domain.id}
                  data-motion-card
                  type="button"
                  onClick={() => setActiveDomainIdx(idx)}
                  className={cn(
                    "p-5 rounded-[16px] text-left box-interactive flex items-center justify-between group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] will-change-[transform,opacity]",
                    isSelected
                      ? "bg-[#1b1e22] border border-[#3B82F6] shadow-box-selected"
                      : "bg-[#141619] border border-white/[0.06] shadow-box-sm hover:shadow-box-hover hover:border-white/[0.14] hover:bg-[#181c20]"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={cn(
                        "font-mono text-sm font-semibold tracking-wider px-2 py-0.5 rounded transition-colors",
                        isSelected
                          ? "bg-[#3B82F6] text-[#0A0D12]"
                          : "bg-white/[0.05] text-[#9AA3B2]"
                      )}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <h3
                        className={cn(
                          "font-heading font-semibold text-base uppercase leading-snug transition-colors",
                          isSelected ? "text-[#EFECE4]" : "text-[#9AA3B2] group-hover:text-[#EFECE4]"
                        )}
                      >
                        {domain.title}
                      </h3>
                      <span className="font-mono text-[11px] text-[#9AA3B2]/80">
                        {domain.services.length} Specialized Capabilities
                      </span>
                    </div>
                  </div>

                  <ArrowUpRight
                    className={cn(
                      "w-4 h-4 transition-transform duration-200",
                      isSelected ? "text-[#3B82F6] translate-x-1 -translate-y-1" : "text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    )}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Live Architectural Preview Console (7 cols) */}
          <div
            data-motion-card
            className="col-span-7 p-8 sm:p-10 rounded-[20px] bg-[#141619] border border-white/[0.08] flex flex-col justify-between gap-8 shadow-box-lg will-change-[transform,opacity]"
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                <span className="font-mono text-xs uppercase tracking-widest text-[#F4BA00] font-semibold">
                  DOMAIN 0{activeDomainIdx + 1} ARCHITECTURE
                </span>
                <span className="font-mono text-xs text-[#9AA3B2]">
                  AXON·VORTEX OPERATING SYSTEM
                </span>
              </div>

              <div>
                <h3 className="font-heading font-semibold text-2xl sm:text-3xl text-[#EFECE4]">
                  {activeSolution.title}
                </h3>
                <p className="font-heading font-medium text-lg text-[#F4BA00] mt-1">
                  {activeSolution.tagline}
                </p>
                <p className="font-body text-base text-[#9AA3B2] mt-3 leading-relaxed">
                  {activeSolution.description}
                </p>
              </div>

              {/* Specialized Services Deliverable Pills */}
              <div className="flex flex-col gap-3 pt-2">
                <span className="font-mono text-xs uppercase tracking-wider text-[#9AA3B2]">
                  Integrated Service Deliverables:
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {activeSolution.services.map((srv, sIdx) => (
                    <div
                      key={sIdx}
                      className="px-3 py-1.5 rounded-[8px] bg-[#101215] border border-white/[0.06] font-mono text-xs text-[#EFECE4] flex items-center gap-2 shadow-box-inset"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                      <span>{srv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between">
              <Link
                href={activeSolution.href}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1b1e22] border border-[#3B82F6]/40 hover:border-[#3B82F6] hover:bg-[#20252b] text-[#EFECE4] hover:text-white font-mono text-xs uppercase tracking-wider transition-all shadow-box-sm hover:shadow-box-hover box-interactive group"
              >
                <span>Explore {activeSolution.title} Details</span>
                <ArrowUpRight className="w-4 h-4 text-[#3B82F6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile: Tactile Domain Accordion Stream (Hidden on Desktop) */}
        <div className="flex flex-col gap-3 lg:hidden">
          {solutionsOverview.solutions.map((domain, idx) => {
            const isExpanded = expandedMobileIdx === idx;
            return (
              <div
                key={domain.id}
                data-motion-card
                className="rounded-[16px] border border-white/[0.06] bg-[#141619] shadow-box-sm overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setExpandedMobileIdx(isExpanded ? null : idx)}
                  className="w-full p-4 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-white/[0.05] text-[#3B82F6] font-semibold">
                      0{idx + 1}
                    </span>
                    <h3 className="font-heading font-semibold text-sm uppercase text-[#EFECE4]">
                      {domain.title}
                    </h3>
                  </div>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-[#9AA3B2] transition-transform duration-200",
                      isExpanded && "rotate-180 text-[#3B82F6]"
                    )}
                  />
                </button>

                {isExpanded && (
                  <div className="p-4 pt-0 border-t border-white/[0.04] bg-[#101215] flex flex-col gap-3">
                    <p className="font-heading font-medium text-xs text-[#F4BA00] pt-3">
                      {domain.tagline}
                    </p>
                    <p className="font-body text-xs text-[#9AA3B2] leading-relaxed">
                      {domain.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {domain.services.map((srv, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded bg-[#141619] border border-white/[0.06] font-mono text-[10px] text-[#EFECE4]"
                        >
                          {srv}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={domain.href}
                      className="mt-2 inline-flex items-center gap-1.5 text-xs font-mono uppercase text-[#3B82F6]"
                    >
                      <span>Explore Domain</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </MotionSection>
  );
}
