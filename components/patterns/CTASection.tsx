"use client";

import React from "react";
import { Zap } from "lucide-react";
import { TactileButton } from "@/components/ui/TactileButton";
import { MatteSection } from "@/components/ui/MatteSection";
import { cn } from "@/lib/utils";

export interface CTASectionProps {
  badge?: string;
  headline: string;
  description?: string | string[];
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  className?: string;
}

export function CTASection({
  badge = "GROWTH ENGAGEMENT",
  headline,
  description,
  primaryCta,
  secondaryCta,
  className,
}: CTASectionProps) {
  const descParagraphs = Array.isArray(description)
    ? description
    : description
    ? [description]
    : [];

  return (
    <section className={cn("py-20 sm:py-28 px-4 sm:px-8 lg:px-12 text-center", className)}>
      <div className="max-w-4xl mx-auto">
        <MatteSection
          radius="24"
          glow="amber"
          className="p-8 sm:p-14 lg:p-16 flex flex-col items-center border-[#F4BA00]/25"
        >
          {badge && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#20252B] border border-[#F4BA00]/30 text-xs font-mono tracking-wider text-[#FDE68A] mb-6">
              <Zap className="w-3.5 h-3.5 text-[#F4BA00]" />
              <span>{badge}</span>
            </div>
          )}

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-semibold uppercase tracking-tight text-[#EFECE4] leading-tight">
            {headline}
          </h2>

          {descParagraphs.length > 0 && (
            <div className="flex flex-col gap-3 my-6 max-w-2xl text-center">
              {descParagraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-sm sm:text-base font-body text-[#9AA3B2] leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
            <TactileButton
              variant="primary"
              size="lg"
              withArrow
              asLink
              href={primaryCta.href}
              className="w-full sm:w-auto min-h-[50px] shadow-[0_4px_20px_rgba(244,186,0,0.35)]"
            >
              {primaryCta.label}
            </TactileButton>

            {secondaryCta && (
              <TactileButton
                variant="charcoal"
                size="lg"
                asLink
                href={secondaryCta.href}
                className="w-full sm:w-auto min-h-[50px]"
              >
                {secondaryCta.label}
              </TactileButton>
            )}
          </div>
        </MatteSection>
      </div>
    </section>
  );
}
