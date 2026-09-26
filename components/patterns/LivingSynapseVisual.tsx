"use client";

import React, { useState } from "react";
import { Zap, Cpu, Network, BarChart3, Target, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface SynapseNode {
  id: string;
  step: string;
  name: string;
  category: string;
  metric: string;
  metricLabel: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NODES: SynapseNode[] = [
  {
    id: "challenge",
    step: "01",
    name: "Business Challenge",
    category: "INGESTION",
    metric: "100%",
    metricLabel: "Friction Diagnostic",
    description: "Silos, wasted ad spend, or manual bottlenecks enter the system for root-cause analysis.",
    icon: Target,
  },
  {
    id: "strategy",
    step: "02",
    name: "Growth Strategy",
    category: "DIRECTION",
    metric: "01",
    metricLabel: "Unified Roadmap",
    description: "Architecting the exact growth path before selecting tools, platforms, or campaigns.",
    icon: Sparkles,
  },
  {
    id: "technology",
    step: "03",
    name: "Connected Tech",
    category: "INFRASTRUCTURE",
    metric: "Unified",
    metricLabel: "System Stack",
    description: "Connecting websites, CRMs, and APIs into one synchronized operational backbone.",
    icon: Network,
  },
  {
    id: "automation",
    step: "04",
    name: "AI & Automation",
    category: "EFFICIENCY",
    metric: "-80%",
    metricLabel: "Manual Work",
    description: "Deploying autonomous agents, chatbots, and workflow pipelines that operate 24/7.",
    icon: Cpu,
  },
  {
    id: "marketing",
    step: "05",
    name: "Market Attention",
    category: "VISIBILITY",
    metric: "High-Intent",
    metricLabel: "Audience Flow",
    description: "Multi-channel content, targeted advertising, and SEO driving qualified demand.",
    icon: Zap,
  },
  {
    id: "revenue",
    step: "06",
    name: "Compounding Growth",
    category: "OUTCOME",
    metric: "Continuous",
    metricLabel: "Feedback Loop",
    description: "Data-driven closed loops that learn, optimize, and accelerate business opportunity.",
    icon: BarChart3,
  },
];

export function LivingSynapseVisual({ className }: { className?: string }) {
  const [activeNodeId, setActiveNodeId] = useState<string>("challenge");
  const activeNode = NODES.find((n) => n.id === activeNodeId) || NODES[0];

  return (
    <div
      className={cn(
        "w-full rounded-[24px] bg-[#141619] border border-white/[0.08] p-6 sm:p-8 lg:p-10 shadow-box-lg relative overflow-x-clip",
        className
      )}
    >
      {/* Background Subtle Ambient Energy */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 bg-[#3B82F6]/[0.08] rounded-full blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-20 w-80 h-80 bg-[#F4BA00]/[0.06] rounded-full blur-[100px]"
      />

      {/* Top Header Console Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.08] mb-8">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e22] border border-[#3B82F6]/30 text-xs font-mono text-[#93C5FD] shadow-box-sm">
            <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
            <span>LIVING GROWTH ENGINE</span>
          </div>
          <span className="hidden sm:inline font-mono text-xs text-[#9AA3B2]">
            AUTONOMOUS PIPELINE SYNAPSE
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-[#F4BA00]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F4BA00]" />
          <span>REAL-TIME TELEMETRY</span>
        </div>
      </div>

      {/* Node Sequence Pathway (Desktop Horizontal / Mobile Stacked) */}
      <div className="relative mb-8">
        {/* Connecting SVG Vector Rail (Desktop) */}
        <div className="hidden lg:block absolute top-7 left-8 right-8 h-[2px] z-0">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <line
              x1="0%"
              y1="50%"
              x2="100%"
              y2="50%"
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <line
              x1="0%"
              y1="50%"
              x2="100%"
              y2="50%"
              stroke="url(#synapse-gradient)"
              strokeWidth="2"
            />
            <defs>
              <linearGradient id="synapse-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#F4BA00" stopOpacity="0.9" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Node Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 relative z-10">
          {NODES.map((node) => {
            const Icon = node.icon;
            const isActive = node.id === activeNodeId;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setActiveNodeId(node.id)}
                className={cn(
                  "p-3.5 sm:p-4 rounded-[14px] text-left box-interactive flex flex-col justify-between gap-3 group relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]",
                  isActive
                    ? "bg-[#1b1e22] border border-[#3B82F6] shadow-box-selected"
                    : "bg-[#101215] border border-white/[0.06] shadow-box-sm hover:shadow-box-hover hover:border-white/[0.15] hover:bg-[#16191d]"
                )}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={cn(
                      "font-mono text-[11px] font-semibold tracking-wider",
                      isActive ? "text-[#3B82F6]" : "text-[#9AA3B2]"
                    )}
                  >
                    {node.step}
                  </span>
                  <div
                    className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center transition-colors",
                      isActive
                        ? "bg-[#3B82F6] text-white shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                        : "bg-white/[0.04] text-[#9AA3B2] group-hover:text-[#EFECE4]"
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div>
                  <span className="block font-mono text-[10px] text-[#9AA3B2] uppercase tracking-wider mb-0.5">
                    {node.category}
                  </span>
                  <h4
                    className={cn(
                      "font-heading text-xs sm:text-sm font-semibold leading-tight",
                      isActive ? "text-[#EFECE4]" : "text-[#EFECE4]/80"
                    )}
                  >
                    {node.name}
                  </h4>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Node Live Spec Console */}
      <div className="rounded-[16px] bg-[#101215] border border-white/[0.06] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-box-inset">
        <div className="max-w-xl flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[#F4BA00] font-semibold">
              STAGE {activeNode.step} {"//"} {activeNode.category}
            </span>
          </div>
          <h3 className="font-heading font-semibold text-xl sm:text-2xl text-[#EFECE4]">
            {activeNode.name}
          </h3>
          <p className="font-body text-sm text-[#9AA3B2] leading-relaxed">
            {activeNode.description}
          </p>
        </div>

        {/* Live Metric Readout */}
        <div className="flex items-center gap-6 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-white/[0.06] w-full md:w-auto justify-between md:justify-end">
          <div className="text-left md:text-right">
            <span className="block font-heading font-semibold text-2xl sm:text-3xl text-[#3B82F6]">
              {activeNode.metric}
            </span>
            <span className="block font-mono text-[11px] text-[#9AA3B2] uppercase tracking-wider">
              {activeNode.metricLabel}
            </span>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] animate-pulse" />
        </div>
      </div>
    </div>
  );
}
