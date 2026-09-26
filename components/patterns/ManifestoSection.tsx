"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { getGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export interface ManifestoSectionProps {
  badge?: string;
  badgeAccent?: "blue" | "amber";
  statement: string;
  supportingText?: string;
  items?: string[];
  conclusion?: string;
  className?: string;
}

export function ManifestoSection({
  badge,
  badgeAccent = "amber",
  statement,
  supportingText,
  items,
  conclusion,
  className,
}: ManifestoSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const { gsap } = getGSAP();
    const el = containerRef.current;

    const ctx = gsap.context(() => {
      const quote = el.querySelector(".manifesto-quote");
      const support = el.querySelector(".manifesto-support");
      const itemCards = el.querySelectorAll(".manifesto-card");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          once: true,
        },
      });

      if (quote) {
        tl.fromTo(
          quote,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            clearProps: "transform,opacity",
          },
          0
        );
      }

      if (support) {
        tl.fromTo(
          support,
          { opacity: 0, x: -24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.75,
            ease: "power3.out",
            clearProps: "transform,opacity",
          },
          0.15
        );
      }

      if (itemCards.length > 0) {
        tl.fromTo(
          itemCards,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: "power3.out",
            clearProps: "transform,opacity",
          },
          0.25
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full max-w-5xl mx-auto flex flex-col gap-8 py-8 sm:py-12 will-change-[transform,opacity]",
        className
      )}
    >
      {badge && (
        <div className="flex items-center gap-2">
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
        </div>
      )}

      {/* Large Typography Statement */}
      <blockquote className="manifesto-quote text-3xl sm:text-5xl md:text-6xl font-heading font-semibold tracking-tight uppercase leading-[1.08] text-[#EFECE4]">
        &ldquo;{statement}&rdquo;
      </blockquote>

      {/* Supporting Text */}
      {supportingText && (
        <p className="manifesto-support text-base sm:text-xl font-body text-[#9AA3B2] max-w-3xl leading-relaxed border-l-2 border-[#3B82F6] pl-6">
          {supportingText}
        </p>
      )}

      {/* Optional Bulleted / Numbered Convictions */}
      {items && items.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="manifesto-card p-4 rounded-[12px] bg-[#101215] border border-white/[0.04] shadow-box-inset flex items-start gap-3 will-change-[transform,opacity]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#F4BA00] shrink-0 mt-2" />
              <p className="font-heading font-medium text-xs sm:text-sm text-[#EFECE4] leading-relaxed">
                {item}
              </p>
            </div>
          ))}
        </div>
      )}

      {conclusion && (
        <div className="pt-4 border-t border-white/[0.08]">
          <p className="font-mono text-xs uppercase tracking-wider text-[#9AA3B2]">
            {conclusion}
          </p>
        </div>
      )}
    </div>
  );
}
