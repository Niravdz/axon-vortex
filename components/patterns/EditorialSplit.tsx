"use client";

import React from "react";
import { TactileButton } from "@/components/ui/TactileButton";
import { cn } from "@/lib/utils";

export interface EditorialSplitProps {
  badge?: string;
  badgeAccent?: "blue" | "amber";
  systemLabel?: string;
  title: React.ReactNode;
  subtitle?: string;
  paragraphs?: string[];
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  rightContent?: React.ReactNode;
  reverse?: boolean;
  className?: string;
}

export function EditorialSplit({
  badge,
  badgeAccent = "blue",
  systemLabel,
  title,
  subtitle,
  paragraphs = [],
  primaryCta,
  secondaryCta,
  rightContent,
  reverse = false,
  className,
}: EditorialSplitProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center",
        className
      )}
    >
      {/* Editorial Content Column */}
      <div
        className={cn(
          "w-full flex flex-col justify-center",
          rightContent ? "lg:col-span-7" : "lg:col-span-12 max-w-4xl",
          reverse && rightContent ? "lg:order-2" : "lg:order-1"
        )}
      >
        {/* Eyebrow System Badge */}
        {(badge || systemLabel) && (
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {badge && (
              <div
                className={cn(
                  "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e22] border text-xs font-mono tracking-wider shadow-[0_2px_8px_rgba(0,0,0,0.4)]",
                  badgeAccent === "amber"
                    ? "border-[#F4BA00]/30 text-[#FDE68A]"
                    : "border-[#3B82F6]/30 text-[#93C5FD]"
                )}
              >
                <span
                  className={cn(
                    "w-1.5 h-1.5 rounded-full animate-pulse",
                    badgeAccent === "amber" ? "bg-[#F4BA00]" : "bg-[#3B82F6]"
                  )}
                />
                <span className="font-medium uppercase">{badge}</span>
              </div>
            )}
            {systemLabel && (
              <span className="font-mono text-xs uppercase tracking-widest text-[#9AA3B2]/80">
                {systemLabel}
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-semibold tracking-tight uppercase leading-[1.04] text-[#EFECE4]">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="mt-6 text-base sm:text-lg md:text-xl font-heading font-medium text-[#EFECE4]/90 leading-snug border-l-2 border-[#3B82F6] pl-4">
            {subtitle}
          </p>
        )}

        {/* Paragraphs */}
        {paragraphs.length > 0 && (
          <div className="mt-5 text-sm sm:text-base font-body text-[#9AA3B2] leading-relaxed space-y-3.5 max-w-2xl">
            {paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        {(primaryCta || secondaryCta) && (
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {primaryCta && (
              <TactileButton
                variant={badgeAccent === "amber" ? "primary" : "primary"}
                size="lg"
                withArrow
                asLink
                href={primaryCta.href}
                className="min-h-[48px] justify-center"
              >
                {primaryCta.label}
              </TactileButton>
            )}

            {secondaryCta && (
              <TactileButton
                variant="charcoal"
                size="lg"
                asLink
                href={secondaryCta.href}
                className="min-h-[48px] justify-center"
              >
                {secondaryCta.label}
              </TactileButton>
            )}
          </div>
        )}
      </div>

      {/* Supporting Visual / Detail Column */}
      {rightContent && (
        <div
          className={cn(
            "w-full lg:col-span-5 flex flex-col justify-center",
            reverse ? "lg:order-1" : "lg:order-2"
          )}
        >
          {rightContent}
        </div>
      )}
    </div>
  );
}
