"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { homeContent } from "@/data/content/home";
import { HorizontalJourney } from "@/components/patterns/HorizontalJourney";

export function GrowthJourneySection() {
  const { growthJourney } = homeContent;

  const journeyStages = growthJourney.stages.map((st, idx) => ({
    step: String(idx + 1).padStart(2, "0"),
    name: st.name,
    description: st.description,
  }));

  return (
    <section className="relative w-full bg-[#121519] text-[#EFECE4] py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08] overflow-hidden">
      {/* Background Subtle Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/4 right-1/4 w-[500px] h-[400px] bg-[#F4BA00]/[0.05] rounded-full blur-[140px]"
      />

      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <HorizontalJourney
          badge={growthJourney.badge}
          title={growthJourney.headline}
          subtitle={growthJourney.subtext}
          stages={journeyStages}
          conclusion="No matter where your digital systems stand today, the path forward begins with clear diagnostic understanding."
        />

        <div className="flex justify-end pt-4">
          <Link
            href="/growth-audit"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#F4BA00] hover:text-[#FDE68A] transition-colors"
          >
            <span>Request A Digital Growth Audit</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
