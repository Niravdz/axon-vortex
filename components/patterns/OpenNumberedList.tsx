"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export interface NumberedListItem {
  number?: string;
  title: string;
  description: string;
  subtext?: string;
  tags?: string[];
  link?: {
    label: string;
    href: string;
  };
}

export interface OpenNumberedListProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  items: NumberedListItem[];
  className?: string;
}

export function OpenNumberedList({
  badge,
  title,
  subtitle,
  items,
  className,
}: OpenNumberedListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const { gsap } = getGSAP();
    const el = containerRef.current;

    const ctx = gsap.context(() => {
      const rows = el.querySelectorAll(".numbered-list-row");
      gsap.fromTo(
        rows,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className={cn("w-full flex flex-col gap-10", className)}>
      {(badge || title) && (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
          <div className="flex flex-col gap-3 max-w-2xl">
            {badge && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e22] border border-[#3B82F6]/30 text-xs font-mono tracking-wider w-fit text-[#93C5FD]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
                <span>{badge}</span>
              </div>
            )}
            {title && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold uppercase tracking-tight text-[#EFECE4]">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-sm sm:text-base font-body text-[#9AA3B2] leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Open Editorial Stream */}
      <div className="flex flex-col divide-y divide-white/[0.08]">
        {items.map((item, idx) => {
          const num = item.number || String(idx + 1).padStart(2, "0");

          return (
            <div
              key={idx}
              className="numbered-list-row py-10 sm:py-12 first:pt-4 last:pb-4 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-baseline group will-change-[transform,opacity]"
            >
              {/* Massive Tech Number */}
              <div className="lg:col-span-2 font-mono text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3B82F6]/70 group-hover:text-[#3B82F6] transition-colors">
                {num}.
              </div>

              {/* Heading & Tags */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-heading font-semibold uppercase tracking-tight text-[#EFECE4] group-hover:text-[#60A5FA] transition-colors leading-snug">
                  {item.title}
                </h3>
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 rounded-[4px] bg-[#101215] border border-white/[0.04] text-[11px] font-mono text-[#F4BA00]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Description & Link */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <p className="font-body text-sm sm:text-base text-[#9AA3B2] leading-relaxed">
                  {item.description}
                </p>
                {item.subtext && (
                  <p className="text-xs font-mono text-[#9AA3B2]/70 leading-relaxed border-l border-[#3B82F6] pl-3">
                    {item.subtext}
                  </p>
                )}
                {item.link && (
                  <Link
                    href={item.link.href}
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#3B82F6] hover:text-[#60A5FA] group transition-colors pt-1"
                  >
                    <span>{item.link.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
