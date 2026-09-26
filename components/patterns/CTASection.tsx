"use client";

import React, { useRef, useEffect } from "react";
import { Zap } from "lucide-react";
import { TactileButton } from "@/components/ui/TactileButton";
import { MatteSection } from "@/components/ui/MatteSection";
import { cn } from "@/lib/utils";
import { getGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const { gsap } = getGSAP();
    const el = containerRef.current;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          scale: 0.96,
          y: 24,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const descParagraphs = Array.isArray(description)
    ? description
    : description
    ? [description]
    : [];

  return (
    <section className={cn("py-20 sm:py-28 px-4 sm:px-8 lg:px-12 text-center", className)}>
      <div ref={containerRef} className="max-w-4xl mx-auto will-change-[transform,opacity]">
        <MatteSection
          radius="24"
          glow="amber"
          className="p-8 sm:p-14 lg:p-16 flex flex-col items-center border-[#F4BA00]/25 shadow-[0_0_60px_rgba(244,186,0,0.08),0_20px_50px_rgba(0,0,0,0.6)]"
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
