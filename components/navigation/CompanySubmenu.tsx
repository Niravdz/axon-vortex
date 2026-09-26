"use client";

import React from "react";
import Link from "next/link";
import {
  Building2,
  Workflow,
  Gauge,
  BookOpen,
  Send,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { MegaMenuShell } from "./MegaMenuShell";
import { NavLinkItem } from "./navigationConfig";
import { cn } from "@/lib/utils";

interface CompanySubmenuProps {
  id: string;
  isOpen: boolean;
  tagline: string;
  description: string;
  items: NavLinkItem[];
  currentPath: string;
  anchorLeft?: number;
  onLinkClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function CompanySubmenu({
  id,
  isOpen,
  tagline,
  items,
  currentPath,
  anchorLeft,
  onLinkClick,
  onMouseEnter,
  onMouseLeave,
}: CompanySubmenuProps) {
  // Line icon mapping for Company items
  const getItemIcon = (href: string) => {
    switch (href) {
      case "/about":
        return <Building2 className="w-4 h-4 text-[#3B82F6]" />;
      case "/approach":
        return <Workflow className="w-4 h-4 text-[#60A5FA]" />;
      case "/growth-audit":
        return <Gauge className="w-4 h-4 text-[#F4BA00]" />;
      case "/insights":
        return <BookOpen className="w-4 h-4 text-[#38BDF8]" />;
      case "/contact":
        return <Send className="w-4 h-4 text-[#F4BA00]" />;
      default:
        return <Building2 className="w-4 h-4 text-[#3B82F6]" />;
    }
  };

  const headerContent = (
    <>
      <div className="flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-[#EFECE4]/90 font-medium">
          {tagline}
        </span>
      </div>
      <div className="flex items-center gap-2 text-xs font-mono">
        <span className="text-[#9AA3B2] uppercase text-[10px] tracking-wider">CORP:</span>
        <span className="font-semibold text-[#3B82F6]">5 CHANNELS</span>
      </div>
    </>
  );

  return (
    <MegaMenuShell
      id={id}
      isOpen={isOpen}
      variant="medium"
      positionMode="anchor"
      anchorLeft={anchorLeft}
      ariaLabel="Company Systems Console"
      header={headerContent}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 bg-[#111316]">
        {/* Left Navigation List (~58%) */}
        <div className="md:col-span-7 p-4 sm:p-5 flex flex-col gap-1.5">
          {items.map((item) => {
            const isActive = currentPath === item.href;
            const icon = getItemIcon(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onLinkClick}
                className={cn(
                  "group p-3 rounded-[12px] border transition-all flex items-center justify-between gap-3 box-interactive",
                  isActive
                    ? "bg-[#18263E]/85 border-[#3B82F6]/60 shadow-[0_4px_16px_rgba(59,130,246,0.2)] text-[#3B82F6]"
                    : "bg-[#14161A]/70 border-white/[0.06] hover:bg-[#1C2026] hover:border-[#3B82F6]/50 text-[#EFECE4]"
                )}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div
                    className={cn(
                      "p-2 rounded-[8px] shrink-0 transition-colors mt-0.5",
                      isActive
                        ? "bg-[#3B82F6]/20 border border-[#3B82F6]/40"
                        : "bg-white/[0.05] border border-white/[0.08] group-hover:bg-[#3B82F6]/15 group-hover:border-[#3B82F6]/30"
                    )}
                  >
                    {icon}
                  </div>
                  <div className="min-w-0">
                    <span
                      className={cn(
                        "font-heading font-medium text-xs tracking-wide block transition-colors leading-tight",
                        isActive ? "text-[#3B82F6]" : "text-[#EFECE4] group-hover:text-[#60A5FA]"
                      )}
                    >
                      {item.label}
                    </span>
                    {item.description && (
                      <p className="text-[11px] text-[#9AA3B2] leading-tight mt-1 line-clamp-1">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>

                <ArrowUpRight
                  className={cn(
                    "w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                    isActive ? "text-[#3B82F6]" : "text-[#9AA3B2]/50 group-hover:text-[#3B82F6]"
                  )}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </div>

        {/* Right Featured Panel (~42%) */}
        <div className="relative overflow-hidden md:col-span-5 p-5 sm:p-6 bg-[#14171A]/90 border-t md:border-t-0 md:border-l border-white/[0.07] flex flex-col justify-between gap-5">
          {/* Subtle Ambient Glow */}
          <div
            className="absolute top-0 right-0 w-36 h-36 bg-[#3B82F6]/10 rounded-full blur-2xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#F4BA00]" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#F4BA00] font-medium">
                REQUEST AN AUDIT
              </span>
            </div>

            <div>
              <h4 className="font-heading font-semibold text-base text-[#EFECE4] leading-snug">
                Digital Growth Audit
              </h4>
              <p className="text-xs text-[#9AA3B2] leading-relaxed mt-2">
                Full-system evaluation across 28 checkpoints to identify friction, operational silos, and uncaptured revenue.
              </p>
            </div>
          </div>

          <div className="relative z-10 pt-2">
            <Link
              href="/growth-audit"
              onClick={onLinkClick}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[10px] bg-gradient-to-b from-[#F4BA00] to-[#E5AC00] text-[#0A1628] font-semibold text-xs tracking-wider shadow-[0_4px_16px_rgba(244,186,0,0.35)] hover:-translate-y-0.5 transition-all group"
            >
              <span>Book Growth Audit</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Geometric decoration */}
          <div
            className="absolute -bottom-8 -right-8 w-32 h-32 opacity-10 pointer-events-none"
            aria-hidden="true"
          >
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full stroke-[#F4BA00]">
              <rect x="15" y="15" width="70" height="70" rx="8" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="22" strokeWidth="1" strokeDasharray="3 3" />
            </svg>
          </div>
        </div>
      </div>
    </MegaMenuShell>
  );
}
