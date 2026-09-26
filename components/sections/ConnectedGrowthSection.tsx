"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Zap, Target, Globe, Database, Cpu, TrendingUp } from "lucide-react";
import { homeContent } from "@/data/content/home";
import { MotionSection } from "@/components/animation/MotionSection";
import { cn } from "@/lib/utils";

const STAGE_ICONS = [Zap, Globe, Target, Database, Cpu, TrendingUp];
const STAGE_ROUTES = [
  "/digital-marketing",
  "/websites-ecommerce",
  "/lead-generation",
  "/technology-digital-transformation",
  "/ai-automation",
  "/approach",
];

export function ConnectedGrowthSection() {
  const { connectedGrowth } = homeContent;
  const [activeStageIdx, setActiveStageIdx] = useState<number>(0);
  const activeStep = connectedGrowth.steps[activeStageIdx] || connectedGrowth.steps[0];

  return (
    <MotionSection
      signature="pipeline-assembly-stagger"
      direction="right"
      threshold="top 80%"
      className="relative w-full bg-[#101215] text-[#EFECE4] py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08] overflow-x-clip"
    >
      {/* Background Subtle Gradient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/3 w-[600px] h-[500px] bg-[#3B82F6]/[0.05] rounded-full blur-[160px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-[#F4BA00]/[0.04] rounded-full blur-[140px]"
      />

      <div className="max-w-7xl mx-auto flex flex-col gap-14 sm:gap-16">
        {/* Open Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4">
          <div data-motion-title className="max-w-3xl flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e22] border border-[#3B82F6]/30 text-xs font-mono tracking-wider w-fit text-[#93C5FD] shadow-box-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
              <span>{connectedGrowth.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-tight uppercase leading-[1.06] text-[#EFECE4]">
              {connectedGrowth.headline}
            </h2>

            <p className="font-body text-base sm:text-lg text-[#9AA3B2] leading-relaxed">
              {connectedGrowth.subheading}{" "}
              <span className="text-[#EFECE4] font-medium">{connectedGrowth.objective}</span>
            </p>
          </div>

          <div data-motion-title className="flex items-center gap-3 font-mono text-xs text-[#9AA3B2]">
            <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-ping" />
            <span>CONTINUOUS CLOSED-LOOP ARCHITECTURE</span>
          </div>
        </div>

        {/* The Living Connected System Architecture Stream */}
        <div className="w-full flex flex-col gap-8">
          {/* Continuous Connected Nodes (Desktop Horizontal / Mobile Vertical) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4 relative">
            {connectedGrowth.steps.map((step, idx) => {
              const Icon = STAGE_ICONS[idx % STAGE_ICONS.length];
              const isSelected = idx === activeStageIdx;
              return (
                <button
                  key={idx}
                  data-motion-card
                  type="button"
                  onClick={() => setActiveStageIdx(idx)}
                  className={cn(
                    "p-5 rounded-[16px] text-left box-interactive flex flex-col justify-between gap-4 group cursor-pointer relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] will-change-[transform,opacity]",
                    isSelected
                      ? "bg-[#1b1e22] border border-[#3B82F6] shadow-box-selected"
                      : "bg-[#141619] border border-white/[0.06] shadow-box-sm hover:shadow-box-hover hover:border-white/[0.14] hover:bg-[#181c20]"
                  )}
                >
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={cn(
                        "font-mono text-xs font-semibold tracking-wider",
                        isSelected ? "text-[#3B82F6]" : "text-[#9AA3B2]"
                      )}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>

                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                        isSelected
                          ? "bg-[#3B82F6] text-white shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                          : "bg-white/[0.04] text-[#9AA3B2] group-hover:text-[#EFECE4]"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h3
                      className={cn(
                        "font-heading font-semibold text-lg uppercase leading-tight mb-1",
                        isSelected ? "text-[#EFECE4]" : "text-[#EFECE4]/85"
                      )}
                    >
                      {step.name}
                    </h3>
                    <span className="block font-mono text-[11px] text-[#F4BA00] uppercase tracking-wider mb-2">
                      {step.category}
                    </span>
                    <p className="font-body text-xs text-[#9AA3B2] leading-relaxed line-clamp-2">
                      {step.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Stage Live Deep Dive Telemetry */}
          <div
            data-motion-card
            className="rounded-[20px] bg-[#141619] border border-white/[0.08] p-6 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-box-lg will-change-[transform,opacity]"
          >
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-[#3B82F6] font-semibold px-2.5 py-1 rounded bg-[#3B82F6]/10 border border-[#3B82F6]/20">
                  SYSTEM NODE 0{activeStageIdx + 1} {"//"} {activeStep.category}
                </span>
              </div>
              <h4 className="font-heading font-semibold text-2xl sm:text-3xl text-[#EFECE4]">
                Phase {activeStageIdx + 1}: {activeStep.name}
              </h4>
              <p className="font-body text-sm sm:text-base text-[#9AA3B2] leading-relaxed">
                {activeStep.description} This stage feeds real-time performance telemetry directly into the adjacent operational layers, ensuring marketing, technology, and AI execution compound synergistically.
              </p>
            </div>

            <Link
              href={STAGE_ROUTES[activeStageIdx] || "/solutions"}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1b1e22] border border-[#3B82F6]/40 hover:border-[#3B82F6] hover:bg-[#20252b] text-[#EFECE4] hover:text-white font-mono text-xs uppercase tracking-wider transition-all shrink-0 shadow-box-sm hover:shadow-box-hover box-interactive group"
            >
              <span>Explore {activeStep.category} Architecture</span>
              <ArrowUpRight className="w-4 h-4 text-[#3B82F6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Feedback Loop Telemetry Bar */}
          <div
            data-motion-card
            className="p-4 sm:p-5 rounded-[14px] bg-[#121519] border border-white/[0.04] shadow-box-inset flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#9AA3B2] will-change-[transform,opacity]"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F4BA00]" />
              <span className="text-[#EFECE4] font-medium">CONTINUOUS IMPROVEMENT LOOP:</span>
              <span className="hidden sm:inline">Build → Launch → Measure → Learn → Improve → Scale</span>
            </div>
            <span className="text-[#3B82F6] uppercase tracking-wider">
              CLOSED-LOOP REVENUE ARCHITECTURE
            </span>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
