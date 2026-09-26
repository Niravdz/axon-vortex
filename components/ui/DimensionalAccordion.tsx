"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  id: string | number;
  title: string;
  description: string;
}

interface DimensionalAccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string | number | null;
  className?: string;
  allowMultiple?: boolean;
}

export function DimensionalAccordion({
  items,
  defaultOpenId = null,
  className,
  allowMultiple = false,
}: DimensionalAccordionProps) {
  const [openIds, setOpenIds] = useState<(string | number)[]>(
    defaultOpenId !== null ? [defaultOpenId] : []
  );

  const toggleItem = (id: string | number) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div
      className={cn(
        "p-2.5 sm:p-3 rounded-[16px] bg-[#101215] border border-white/[0.04]",
        "shadow-box-inset",
        "flex flex-col gap-2.5",
        className
      )}
    >
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);

        return (
          <div
            key={item.id}
            className={cn(
              "rounded-[10px] border transition-all duration-200 overflow-hidden",
              isOpen
                ? "bg-[#21252a] border-[#3B82F6]/50 shadow-box-selected"
                : "bg-[#171a1e] border-white/[0.08] shadow-box-sm hover:shadow-box-hover box-interactive hover:bg-[#21252a] hover:border-[#3B82F6]/30"
            )}
          >
            {/* Header Trigger */}
            <button
              type="button"
              id={`accordion-trigger-${item.id}`}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
              onClick={() => toggleItem(item.id)}
              className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electricBlue focus-visible:ring-inset"
            >
              <div className="flex items-center gap-3 sm:gap-4 flex-1">
                {/* Step indicator dot */}
                <div
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors shrink-0",
                    isOpen
                      ? "bg-[#3B82F6] shadow-[0_0_8px_#3B82F6]"
                      : "bg-[#9AA3B2]/40"
                  )}
                />
                <span
                  className={cn(
                    "font-heading font-semibold text-sm sm:text-base tracking-wide uppercase transition-colors",
                    isOpen ? "text-[#EFECE4]" : "text-[#EFECE4]/85"
                  )}
                >
                  {item.title}
                </span>
              </div>

              <div
                className={cn(
                  "p-1.5 rounded-[6px] transition-transform duration-200 shrink-0",
                  isOpen
                    ? "rotate-180 text-[#3B82F6] bg-[#3B82F6]/10"
                    : "text-[#9AA3B2] bg-[#20252B]"
                )}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {/* Expandable Content with Smooth Transition */}
            <div
              id={`accordion-content-${item.id}`}
              role="region"
              aria-labelledby={`accordion-trigger-${item.id}`}
              className={cn(
                "grid transition-all duration-200 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 pt-1 pl-9 sm:pl-10 text-sm font-body text-[#9AA3B2] leading-relaxed border-t border-[#EFECE4]/[0.06]">
                  {item.description}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
