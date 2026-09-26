"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { homeContent } from "@/data/content/home";
import { ProcessTimeline } from "@/components/patterns/ProcessTimeline";

export function ApproachSection() {
  const { howWeWork } = homeContent;

  const timelineSteps = howWeWork.steps.map((st, idx) => ({
    number: String(idx + 1).padStart(2, "0"),
    title: st.title,
    description: st.description,
  }));

  return (
    <section className="relative w-full bg-[#101215] text-[#EFECE4] py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08] overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#3B82F6]/[0.05] rounded-full blur-[160px]"
      />

      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <ProcessTimeline
          badge={howWeWork.badge}
          title={howWeWork.headline}
          subtitle={howWeWork.conclusion}
          steps={timelineSteps}
        />

        <div className="flex justify-end pt-4">
          <Link
            href="/approach"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#3B82F6] hover:text-[#60A5FA] transition-colors"
          >
            <span>Explore The Full Methodology &amp; Framework</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
