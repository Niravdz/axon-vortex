import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { homeContent } from "@/data/content/home";
import { MotionSection } from "@/components/animation/MotionSection";

const AUDIENCE_PATHS: Record<number, string> = {
  0: "/websites-ecommerce",
  1: "/solutions",
  2: "/digital-marketing",
  3: "/growth-audit",
  4: "/services/meta-ads",
  5: "/ai-automation",
};

export function WhoWeHelpSection() {
  const { whoWeHelp } = homeContent;

  return (
    <MotionSection
      as="section"
      signature="staggered-audience-matrix"
      className="relative w-full bg-[#121519] text-[#EFECE4] py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08] overflow-x-clip"
    >
      {/* Background Subtle Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 right-1/4 w-[500px] h-[400px] bg-[#3B82F6]/[0.05] rounded-full blur-[140px]"
      />

      <div className="max-w-7xl mx-auto flex flex-col gap-12 sm:gap-16">
        {/* Open Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4">
          <div className="max-w-3xl flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e22] border border-[#3B82F6]/30 text-xs font-mono tracking-wider w-fit text-[#93C5FD] shadow-box-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
              <span>{whoWeHelp.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-tight uppercase leading-[1.06] text-[#EFECE4]">
              {whoWeHelp.headline}
            </h2>

            <p className="font-body text-base sm:text-lg text-[#9AA3B2] leading-relaxed">
              We work with ambitious organizations at critical inflexion points—transforming isolated digital efforts into an integrated growth engine.
            </p>
          </div>

          <div className="font-mono text-xs text-[#9AA3B2]">
            [GROWTH STAGE &amp; SITUATION MATCHER]
          </div>
        </div>

        {/* Open 2-Column Responsive List (No enclosing card box) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {whoWeHelp.audiences.map((aud, idx) => (
            <div
              key={idx}
              className="motion-item flex items-start gap-5 pt-6 border-t border-white/[0.08] group"
            >
              <span className="font-mono text-xs font-semibold text-[#3B82F6] px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] shadow-box-inset shrink-0 mt-0.5">
                0{idx + 1}
              </span>

              <div className="flex-1 flex flex-col gap-2">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-heading font-semibold text-lg text-[#EFECE4] group-hover:text-[#60A5FA] transition-colors">
                    {aud.title}
                  </h3>

                  <Link
                    href={AUDIENCE_PATHS[idx] || "/contact"}
                    className="text-[#9AA3B2] hover:text-[#3B82F6] transition-colors p-1"
                    aria-label={`Explore solutions for ${aud.title}`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>

                <p className="font-body text-sm text-[#9AA3B2] leading-relaxed">
                  {aud.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
