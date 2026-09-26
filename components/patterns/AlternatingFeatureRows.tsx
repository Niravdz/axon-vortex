"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FeatureItem {
  id?: string;
  step?: string;
  title: string;
  slug?: string;
  description: string;
  deliverables?: string[];
  specs?: { label: string; value: string }[];
  cta?: {
    label: string;
    href: string;
  };
  visual?: React.ReactNode;
}

export interface AlternatingFeatureRowsProps {
  items: FeatureItem[];
  className?: string;
}

export function AlternatingFeatureRows({
  items,
  className,
}: AlternatingFeatureRowsProps) {
  return (
    <div className={cn("flex flex-col divide-y divide-white/[0.08]", className)}>
      {items.map((item, idx) => {
        const isEven = idx % 2 === 0;

        return (
          <article
            key={item.id || item.slug || idx}
            className="py-14 sm:py-20 first:pt-4 last:pb-4 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
          >
            {/* Text & Deliverables Column */}
            <div
              className={cn(
                "flex flex-col gap-6 lg:col-span-6",
                isEven ? "lg:order-1" : "lg:order-2"
              )}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-[6px] bg-[#101215] text-[#3B82F6] border border-white/[0.06] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]">
                  {item.step || String(idx + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-[#9AA3B2]">
                  CAPABILITY SPECIFICATION
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold uppercase tracking-tight text-[#EFECE4] leading-tight">
                  {item.title}
                </h3>
                <p className="mt-4 font-body text-sm sm:text-base text-[#9AA3B2] leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Deliverable chips */}
              {item.deliverables && item.deliverables.length > 0 && (
                <div className="pt-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#F4BA00] block mb-2.5 font-medium">
                    Deliverable Modules:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {item.deliverables.map((deliv, dIdx) => (
                      <span
                        key={dIdx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] bg-[#101215] border border-white/[0.06] text-xs font-mono text-[#EFECE4]/90 shadow-[inset_0_1px_2px_rgba(0,0,0,0.7)]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                        <span>{deliv}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA link if available */}
              {(item.cta || item.slug) && (
                <div className="pt-2">
                  <Link
                    href={item.cta?.href || `/services/${item.slug}`}
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#3B82F6] hover:text-[#60A5FA] group transition-colors"
                  >
                    <span>{item.cta?.label || "Inspect Technical Specs"}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              )}
            </div>

            {/* Visual / Technical Data Column */}
            <div
              className={cn(
                "flex flex-col lg:col-span-6 w-full",
                isEven ? "lg:order-2" : "lg:order-1"
              )}
            >
              {item.visual ? (
                item.visual
              ) : item.specs && item.specs.length > 0 ? (
                <div className="rounded-[18px] bg-[#101215] border border-white/[0.08] p-6 sm:p-8 shadow-[inset_0_2px_8px_rgba(0,0,0,0.85)] flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                    <span className="font-mono text-xs font-semibold uppercase text-[#3B82F6]">
                      Architecture Blueprint
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#F4BA00] animate-pulse" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {item.specs.map((spec, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3.5 rounded-[10px] bg-[#171a1e] border border-white/[0.04] flex flex-col gap-1"
                      >
                        <span className="font-mono text-[11px] uppercase text-[#9AA3B2]">
                          {spec.label}
                        </span>
                        <span className="font-heading font-medium text-xs sm:text-sm text-[#EFECE4]">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="rounded-[18px] bg-[#101215] border border-white/[0.06] p-6 sm:p-8 shadow-[inset_0_2px_8px_rgba(0,0,0,0.85)] flex flex-col justify-between min-h-[160px]">
                  <div className="flex items-center justify-between text-xs font-mono text-[#9AA3B2] border-b border-white/[0.06] pb-3">
                    <span className="text-[#3B82F6] font-semibold">PRODUCTION WORKSTREAM</span>
                    <span>AXON·VORTEX</span>
                  </div>
                  <p className="text-xs sm:text-sm font-mono text-[#9AA3B2] leading-relaxed my-4">
                    Continuous feedback loops connect this capability with upstream acquisition and downstream conversion.
                  </p>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#F4BA00]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>SYSTEM COMPATIBLE</span>
                  </div>
                </div>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
