import React from "react";
import Link from "next/link";
import { ArrowUpRight, Terminal } from "lucide-react";
import { homeContent } from "@/data/content/home";
import { MotionSection } from "@/components/animation/MotionSection";

export function BuildingAxonSection() {
  const { buildingAxon } = homeContent;

  return (
    <MotionSection
      as="section"
      signature="editorial-terminal-reveal"
      className="relative w-full bg-[#101215] text-[#EFECE4] py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08] overflow-x-clip"
    >
      {/* Background Subtle Gradient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/3 w-[500px] h-[400px] bg-[#3B82F6]/[0.05] rounded-full blur-[160px]"
      />

      <div className="max-w-7xl mx-auto flex flex-col gap-12 sm:gap-16">
        {/* Open Editorial Narrative Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Human Perspective & Manifesto (5 cols) */}
          <div className="motion-left lg:col-span-5 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e22] border border-[#3B82F6]/30 text-xs font-mono tracking-wider w-fit text-[#93C5FD] shadow-box-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
              <span>{buildingAxon.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-tight uppercase leading-[1.06] text-[#EFECE4]">
              {buildingAxon.headline}
            </h2>

            <p className="font-body text-base text-[#9AA3B2] leading-relaxed">
              {buildingAxon.intro}
            </p>

            {/* Closing Conviction Callout */}
            <div className="p-6 rounded-[16px] bg-[#141619] border-l-2 border-[#3B82F6] border-y border-r border-white/[0.06] shadow-box-md">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#3B82F6] block mb-2 font-semibold">
                OUR COMMITMENT
              </span>
              <p className="font-heading font-medium text-sm sm:text-base text-[#EFECE4] leading-snug">
                &ldquo;{buildingAxon.closing}&rdquo;
              </p>
            </div>

            <Link
              href="/insights"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#3B82F6] hover:text-[#60A5FA] transition-colors pt-2"
            >
              <span>Explore Public Insights &amp; Experiments</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right Column: Open Experimentation Log (7 cols) */}
          <div className="motion-right lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] font-mono text-xs text-[#9AA3B2]">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#F4BA00]" />
                <span>PUBLIC LAB EXPERIMENTS</span>
              </div>
              <span>STATUS: ACTIVE SPRINT</span>
            </div>

            <div className="flex flex-col gap-3">
              {buildingAxon.points.map((pt, idx) => (
                <div
                  key={idx}
                  className="motion-item p-5 sm:p-6 rounded-[16px] bg-[#141619] border border-white/[0.06] shadow-box-sm hover:shadow-box-hover box-interactive hover:border-white/[0.14] flex items-start gap-4 sm:gap-5"
                >
                  <span className="font-mono text-xs font-semibold text-[#F4BA00] px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] shadow-box-inset shrink-0 mt-0.5">
                    0{idx + 1}
                  </span>

                  <div className="flex-1 flex flex-col gap-1">
                    <h3 className="font-heading font-semibold text-base sm:text-lg text-[#EFECE4]">
                      {pt.title}
                    </h3>
                    <p className="font-body text-xs sm:text-sm text-[#9AA3B2] leading-relaxed">
                      {pt.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
