"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionRow {
  id?: string;
  title: string;
  content: React.ReactNode;
  badge?: string;
}

export interface RecessedAccordionProps {
  items: AccordionRow[];
  allowMultiple?: boolean;
  defaultOpenIndex?: number;
  className?: string;
}

export function RecessedAccordion({
  items,
  allowMultiple = false,
  defaultOpenIndex = 0,
  className,
}: RecessedAccordionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>(
    defaultOpenIndex !== -1 ? [defaultOpenIndex] : []
  );

  const toggle = (idx: number) => {
    if (allowMultiple) {
      setOpenIndices((prev) =>
        prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
      );
    } else {
      setOpenIndices((prev) => (prev.includes(idx) ? [] : [idx]));
    }
  };

  return (
    <div
      className={cn(
        "rounded-[20px] bg-[#141619] border border-white/[0.08] overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.7)] divide-y divide-white/[0.06]",
        className
      )}
    >
      {items.map((item, idx) => {
        const isOpen = openIndices.includes(idx);
        const headerId = `acc-header-${idx}`;
        const panelId = `acc-panel-${idx}`;

        return (
          <div key={item.id || idx} className="transition-colors">
            <button
              id={headerId}
              type="button"
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className={cn(
                "w-full text-left p-6 sm:p-7 flex items-center justify-between gap-6 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:bg-[#1b1e22]",
                isOpen ? "bg-[#1b1e22]" : "hover:bg-[#171a1e]"
              )}
            >
              <div className="flex items-center gap-4">
                <span
                  className={cn(
                    "w-2 h-2 rounded-full shrink-0 transition-colors",
                    isOpen
                      ? "bg-[#3B82F6] shadow-[0_0_8px_#3B82F6]"
                      : "bg-[#9AA3B2]/40"
                  )}
                />
                <span className="font-heading font-semibold text-base sm:text-lg uppercase tracking-tight text-[#EFECE4]">
                  {item.title}
                </span>
                {item.badge && (
                  <span className="hidden sm:inline-block px-2.5 py-0.5 rounded bg-[#101215] border border-white/[0.04] text-[11px] font-mono text-[#F4BA00]">
                    {item.badge}
                  </span>
                )}
              </div>

              <div
                className={cn(
                  "w-8 h-8 rounded-[8px] bg-[#101215] border border-white/[0.06] flex items-center justify-center shrink-0 transition-transform duration-200",
                  isOpen ? "rotate-180 border-[#3B82F6]/50 text-[#3B82F6]" : "text-[#9AA3B2]"
                )}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {/* Recessed Content Channel */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              hidden={!isOpen}
              className={cn(
                "transition-all duration-300 overflow-hidden",
                isOpen
                  ? "p-6 sm:p-7 pt-0 bg-[#1b1e22]"
                  : "max-h-0"
              )}
            >
              <div className="p-5 sm:p-6 rounded-[12px] bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_5px_rgba(0,0,0,0.85)] font-body text-xs sm:text-sm text-[#9AA3B2] leading-relaxed">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
