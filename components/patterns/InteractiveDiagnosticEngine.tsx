"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, AlertCircle, CheckCircle2, ChevronRight, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProblemItem } from "@/data/content/home";

interface DiagnosticMapping {
  systemGap: string;
  rootCause: string;
  solutionTitle: string;
  solutionDescription: string;
  actionHref: string;
  actionLabel: string;
}

const PROBLEM_MAPPINGS: Record<number, DiagnosticMapping> = {
  0: {
    systemGap: "DISCOVERABILITY & POSITIONING GAP",
    rootCause: "Prospective clients perceive your brand as invisible or generic because the digital foundation lacks a clear narrative architecture.",
    solutionTitle: "Website & Digital Brand Architecture",
    solutionDescription: "Engineered web experience that articulates your unique value proposition, commands authority, and guides visitors to immediate engagement.",
    actionHref: "/websites-ecommerce",
    actionLabel: "Explore Website Architecture",
  },
  1: {
    systemGap: "CHANNEL FRAGMENTATION GAP",
    rootCause: "Marketing campaigns, organic social, and landing pages operate in isolated silos, causing high cognitive friction and lost visitor intent.",
    solutionTitle: "Omni-Channel Growth Synchronization",
    solutionDescription: "Connecting social proof, targeted advertising, and web touchpoints into a unified, high-converting customer journey.",
    actionHref: "/digital-marketing",
    actionLabel: "Explore Marketing Engine",
  },
  2: {
    systemGap: "ATTRIBUTION & CAPITAL EFFICIENCY GAP",
    rootCause: "Ad budgets are disbursed without closed-loop tracking, burning capital on vanity impressions rather than profitable customer acquisition.",
    solutionTitle: "Precision Performance Marketing",
    solutionDescription: "Data-informed paid search and social campaigns optimized strictly for qualified pipeline generation and quantifiable return on ad spend.",
    actionHref: "/services/meta-ads",
    actionLabel: "Explore Paid Performance",
  },
  3: {
    systemGap: "PIPELINE RESPONSE LATENCY GAP",
    rootCause: "Manual lead routing and delayed response times allow warm prospects to go cold, leaking revenue before conversations even begin.",
    solutionTitle: "Automated Lead Capture & Nurture System",
    solutionDescription: "Instantaneous qualification, CRM synchronization, and multi-channel follow-up sequences that convert inbound interest into booked calls.",
    actionHref: "/lead-generation",
    actionLabel: "Explore Lead Systems",
  },
  4: {
    systemGap: "OPERATIONAL BOTTLENECK GAP",
    rootCause: "High-value team members spend 40%+ of their working hours on administrative friction and repetitive data entry tasks.",
    solutionTitle: "Workflow & Process Automation",
    solutionDescription: "Autonomous background pipelines connecting internal tools, eliminating manual handoffs, and reducing operational overhead.",
    actionHref: "/ai-automation",
    actionLabel: "Explore Automation Systems",
  },
  5: {
    systemGap: "STRATEGIC AI APPLICATION GAP",
    rootCause: "Experimenting with disjointed consumer AI tools without architectural integration creates noise rather than compounding enterprise value.",
    solutionTitle: "Practical Enterprise AI Systems",
    solutionDescription: "Tailored AI agents, intelligent customer support models, and knowledge retrieval systems designed around specific business workflows.",
    actionHref: "/ai-automation",
    actionLabel: "Explore AI Solutions",
  },
};

export interface InteractiveDiagnosticEngineProps {
  problems: ProblemItem[];
  className?: string;
}

export function InteractiveDiagnosticEngine({
  problems,
  className,
}: InteractiveDiagnosticEngineProps) {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const activeProblem = problems[selectedIdx] || problems[0];
  const activeMapping = PROBLEM_MAPPINGS[selectedIdx] || PROBLEM_MAPPINGS[0];

  return (
    <div
      className={cn(
        "w-full rounded-[24px] bg-[#141619] border border-white/[0.08] shadow-box-lg overflow-hidden",
        className
      )}
    >
      {/* Console Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 sm:px-10 py-4 bg-[#101215] border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-[#EFECE4]">
          <Activity className="w-4 h-4 text-[#3B82F6]" />
          <span>INTERACTIVE SYSTEM DIAGNOSIS</span>
        </div>
        <div className="font-mono text-xs text-[#9AA3B2]">
          SELECT A BUSINESS FRICTION TO RESOLVE
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left Column: Selectable Friction List (5 cols) */}
        <div className="lg:col-span-5 p-4 sm:p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-white/[0.06] bg-[#121519] flex flex-col gap-2.5">
          <span className="font-mono text-xs uppercase tracking-wider text-[#9AA3B2] px-2 mb-1">
            Common Growth Roadblocks:
          </span>

          {problems.map((prob, idx) => {
            const isSelected = idx === selectedIdx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIdx(idx)}
                className={cn(
                  "p-3.5 sm:p-4 rounded-[12px] text-left box-interactive flex items-start gap-3 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]",
                  isSelected
                    ? "bg-[#1b1e22] border border-[#3B82F6] shadow-box-selected"
                    : "bg-[#141619] border border-white/[0.06] shadow-box-sm hover:shadow-box-hover hover:border-white/[0.14] hover:bg-[#181c20]"
                )}
              >
                <div
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs font-semibold",
                    isSelected
                      ? "bg-[#3B82F6] text-white"
                      : "bg-white/[0.05] text-[#9AA3B2] group-hover:text-[#EFECE4]"
                  )}
                >
                  {String(idx + 1).padStart(2, "0")}
                </div>

                <div className="flex-1 min-w-0">
                  <h4
                    className={cn(
                      "font-heading text-xs sm:text-sm font-semibold capitalize",
                      isSelected ? "text-[#EFECE4]" : "text-[#9AA3B2] group-hover:text-[#EFECE4]"
                    )}
                  >
                    {prob.title}
                  </h4>
                  <p className="font-body text-xs text-[#9AA3B2] mt-0.5 line-clamp-1">
                    {prob.description}
                  </p>
                </div>

                <ChevronRight
                  className={cn(
                    "w-4 h-4 shrink-0 transition-transform mt-1",
                    isSelected ? "text-[#3B82F6] translate-x-0.5" : "text-white/20 group-hover:text-white/50"
                  )}
                />
              </button>
            );
          })}
        </div>

        {/* Right Column: Live Diagnostic Resolution Viewport (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between gap-8 bg-[#15181d]">
          {/* Top Friction Diagnostic */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-widest text-red-400 font-semibold px-2.5 py-1 rounded bg-red-500/10 border border-red-500/20">
                {activeMapping.systemGap}
              </span>
            </div>

            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#9AA3B2] block mb-1">
                Selected Challenge:
              </span>
              <h3 className="font-heading font-semibold text-2xl sm:text-3xl text-[#EFECE4]">
                {activeProblem.title}
              </h3>
              <p className="font-body text-sm sm:text-base text-[#9AA3B2] mt-2 leading-relaxed">
                {activeProblem.description}
              </p>
            </div>

            {/* Root Cause Analysis Well */}
            <div className="p-5 rounded-[14px] bg-[#101215] border border-white/[0.04] shadow-box-inset flex items-start gap-3.5">
              <AlertCircle className="w-5 h-5 text-[#F4BA00] shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#F4BA00] font-semibold">
                  Root Cause Analysis
                </span>
                <p className="font-body text-xs sm:text-sm text-[#9AA3B2] leading-relaxed">
                  {activeMapping.rootCause}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Solution Recommendation */}
          <div className="p-6 rounded-[16px] bg-[#1b1e22] border border-[#3B82F6]/30 shadow-box-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex flex-col gap-1.5 max-w-md">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3B82F6]" />
                <span className="font-mono text-xs uppercase tracking-wider text-[#60A5FA] font-semibold">
                  Recommended AxonVortex System
                </span>
              </div>
              <h4 className="font-heading font-semibold text-lg text-[#EFECE4]">
                {activeMapping.solutionTitle}
              </h4>
              <p className="font-body text-xs text-[#9AA3B2] leading-relaxed">
                {activeMapping.solutionDescription}
              </p>
            </div>

            <Link
              href={activeMapping.actionHref}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#3B82F6] hover:bg-[#2563EB] text-[#0A0D12] font-mono text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 shadow-box-sm hover:shadow-box-hover"
            >
              <span>{activeMapping.actionLabel}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
