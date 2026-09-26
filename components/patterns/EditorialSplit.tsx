"use client";

import React, { useRef, useEffect } from "react";
import { TactileButton } from "@/components/ui/TactileButton";
import { cn } from "@/lib/utils";
import { getGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const { gsap } = getGSAP();
    const el = containerRef.current;

    const ctx = gsap.context(() => {
      const leftCol = el.querySelector(".editorial-left-col");
      const rightCol = el.querySelector(".editorial-right-col");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });

      if (leftCol) {
        tl.fromTo(
          leftCol,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "transform,opacity",
          },
          0
        );
      }

      if (rightCol) {
        tl.fromTo(
          rightCol,
          { opacity: 0, scale: 0.96, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "transform,opacity",
          },
          0.15
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center will-change-[transform,opacity]",
        className
      )}
    >
      {/* Editorial Content Column */}
      <div
        className={cn(
          "editorial-left-col w-full flex flex-col justify-center",
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
                  "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e22] border text-xs font-mono tracking-wider w-fit",
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
                <span>{badge}</span>
              </div>
            )}
            {systemLabel && (
              <span className="font-mono text-xs uppercase tracking-widest text-[#9AA3B2]/80">
                {systemLabel}
              </span>
            )}
          </div>
        )}

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-semibold tracking-tight uppercase leading-[1.05] text-[#EFECE4]">
          {title}
        </h1>

        {/* Subtitle / Focus Statement */}
        {subtitle && (
          <p className="mt-4 text-lg sm:text-xl font-heading font-medium text-[#EFECE4]/90 leading-snug border-l-2 border-[#3B82F6] pl-4">
            {subtitle}
          </p>
        )}

        {/* Paragraphs */}
        {paragraphs.length > 0 && (
          <div className="mt-4 flex flex-col gap-3 font-body text-sm sm:text-base text-[#9AA3B2] leading-relaxed max-w-2xl">
            {paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        )}

        {/* Dual Actions */}
        {(primaryCta || secondaryCta) && (
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {primaryCta && (
              <TactileButton
                variant="primary"
                size="lg"
                withArrow
                asLink
                href={primaryCta.href}
                className="justify-center min-h-[50px]"
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
                className="justify-center min-h-[50px]"
              >
                {secondaryCta.label}
              </TactileButton>
            )}
          </div>
        )}
      </div>

      {/* Right Architecture / Visual Column */}
      {rightContent && (
        <div
          className={cn(
            "editorial-right-col w-full flex flex-col justify-center",
            "lg:col-span-5",
            reverse ? "lg:order-1" : "lg:order-2"
          )}
        >
          {rightContent}
        </div>
      )}
    </div>
  );
}
