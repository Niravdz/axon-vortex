"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { MegaMenuShell } from "./MegaMenuShell";
import { NavLinkItem } from "./navigationConfig";
import { cn } from "@/lib/utils";

interface SolutionsSubmenuProps {
  id: string;
  isOpen: boolean;
  tagline: string;
  description: string;
  items: NavLinkItem[];
  viewAll: NavLinkItem;
  currentPath: string;
  onLinkClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function SolutionsSubmenu({
  id,
  isOpen,
  tagline,
  description,
  items,
  viewAll,
  currentPath,
  onLinkClick,
  onMouseEnter,
  onMouseLeave,
}: SolutionsSubmenuProps) {
  const headerContent = (
    <>
      <div className="flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-[#EFECE4]/90 font-medium">
          {tagline}
        </span>
      </div>
      <div className="flex items-center gap-3 text-xs font-mono">
        <span className="text-[#9AA3B2] uppercase text-[10px] tracking-wider">ARCHITECTURE:</span>
        <span className="font-semibold text-[#3B82F6]">05 CORE DOMAINS</span>
        <span className="text-white/20">|</span>
        <span className="text-[#F4BA00] font-semibold text-[11px]">SYNCHRONIZED</span>
      </div>
    </>
  );

  return (
    <MegaMenuShell
      id={id}
      isOpen={isOpen}
      variant="large"
      ariaLabel="Solutions Systems Console"
      header={headerContent}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex flex-col lg:flex-row bg-[#111316]">
        {/* Left Editorial Introduction Panel (~32%) */}
        <div className="relative overflow-hidden w-full lg:w-[32%] shrink-0 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-white/[0.07] bg-[#14171A]/75 flex flex-col justify-between gap-6">
          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#3B82F6] font-medium">
                SYSTEMS CONSOLE // DOMAINS
              </span>
            </div>

            <div>
              <h3 className="font-heading font-semibold text-2xl tracking-tight text-[#EFECE4] leading-tight">
                Solutions
              </h3>
              <p className="text-xs text-[#9AA3B2] leading-relaxed mt-2.5">
                {description}
              </p>
            </div>

            {/* Subtle blue-to-amber visual line */}
            <div
              className="h-[2px] w-24 rounded-full bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-[#F4BA00]"
              aria-hidden="true"
            />
          </div>

          <div className="relative z-10 pt-2">
            <Link
              href={viewAll.href}
              onClick={onLinkClick}
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-[12px] bg-[#181C21] border border-white/[0.09] text-xs font-medium text-[#3B82F6] hover:text-[#EFECE4] hover:border-[#3B82F6]/60 hover:bg-[#1C222B] transition-all group shadow-box-sm"
            >
              <span>{viewAll.label}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Abstract geometric brand pattern in background */}
          <div
            className="absolute -bottom-6 -right-6 w-48 h-48 opacity-[0.08] pointer-events-none"
            aria-hidden="true"
          >
            <svg viewBox="0 0 160 160" fill="none" className="w-full h-full stroke-[#3B82F6]">
              <circle cx="80" cy="80" r="70" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="80" cy="80" r="50" strokeWidth="1" />
              <circle cx="80" cy="80" r="30" strokeWidth="1" strokeDasharray="4 2" />
              <line x1="80" y1="0" x2="80" y2="160" strokeWidth="1" opacity="0.4" />
              <line x1="0" y1="80" x2="160" y2="80" strokeWidth="1" opacity="0.4" />
            </svg>
          </div>
        </div>

        {/* Right Solutions Grid (~68%) */}
        <div className="w-full lg:w-[68%] p-6 sm:p-7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {items.map((item, idx) => {
              const isActive = currentPath === item.href;
              const indexFormatted = String(idx + 1).padStart(2, "0");
              const isFifthItem = idx === 4;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onLinkClick}
                  className={cn(
                    "group relative p-4 rounded-[14px] border flex flex-col justify-between solution-card-hover",
                    isFifthItem ? "col-span-1 md:col-span-2 min-h-[82px]" : "min-h-[104px]",
                    isActive
                      ? "bg-[#181C22] border-[#3B82F6] shadow-[0_4px_18px_rgba(59,130,246,0.18),inset_0_1px_0_rgba(59,130,246,0.35)]"
                      : "bg-[#14161A] border-white/[0.07] shadow-box-sm hover:border-[#3B82F6]/70 hover:bg-[#181C21]"
                  )}
                >
                  {isFifthItem ? (
                    /* Balanced Wide Layout for Fifth Item to prevent empty space */
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full">
                      <div className="flex items-start sm:items-center gap-3">
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded-[4px] font-mono text-[10px] font-semibold tracking-wider transition-colors shrink-0",
                            isActive
                              ? "bg-[#3B82F6] text-white"
                              : "bg-white/[0.06] text-[#9AA3B2] group-hover:bg-[#3B82F6] group-hover:text-white"
                          )}
                        >
                          {indexFormatted}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                "w-1.5 h-1.5 rounded-full transition-colors shrink-0",
                                isActive ? "bg-[#3B82F6]" : "bg-[#9AA3B2]/40 group-hover:bg-[#3B82F6]"
                              )}
                              aria-hidden="true"
                            />
                            <h4
                              className={cn(
                                "font-heading font-medium text-sm tracking-wide transition-colors",
                                isActive ? "text-[#3B82F6]" : "text-[#EFECE4] group-hover:text-[#60A5FA]"
                              )}
                            >
                              {item.label}
                            </h4>
                          </div>
                          {item.description && (
                            <p className="text-xs text-[#9AA3B2] leading-snug mt-1 pl-3.5">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="self-end sm:self-center shrink-0">
                        <ArrowUpRight
                          className={cn(
                            "w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1",
                            isActive ? "text-[#3B82F6]" : "text-[#9AA3B2]/50 group-hover:text-[#3B82F6]"
                          )}
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  ) : (
                    /* Standard 2-Column Card */
                    <>
                      <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] pb-2.5 mb-2.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "px-2 py-0.5 rounded-[4px] font-mono text-[10px] font-semibold tracking-wider transition-colors",
                              isActive
                                ? "bg-[#3B82F6] text-white"
                                : "bg-white/[0.06] text-[#9AA3B2] group-hover:bg-[#3B82F6] group-hover:text-white"
                            )}
                          >
                            {indexFormatted}
                          </span>
                          <span
                            className={cn(
                              "w-1.5 h-1.5 rounded-full transition-colors",
                              isActive ? "bg-[#3B82F6]" : "bg-[#9AA3B2]/40 group-hover:bg-[#3B82F6]"
                            )}
                            aria-hidden="true"
                          />
                        </div>

                        <ArrowUpRight
                          className={cn(
                            "w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1",
                            isActive ? "text-[#3B82F6]" : "text-[#9AA3B2]/50 group-hover:text-[#3B82F6]"
                          )}
                          aria-hidden="true"
                        />
                      </div>

                      <div>
                        <h4
                          className={cn(
                            "font-heading font-medium text-sm tracking-wide transition-colors",
                            isActive ? "text-[#3B82F6]" : "text-[#EFECE4] group-hover:text-[#60A5FA]"
                          )}
                        >
                          {item.label}
                        </h4>
                        {item.description && (
                          <p className="text-xs text-[#9AA3B2] leading-snug line-clamp-2 mt-1">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </MegaMenuShell>
  );
}
