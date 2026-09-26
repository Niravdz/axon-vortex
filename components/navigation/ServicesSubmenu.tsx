"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { MegaMenuShell } from "./MegaMenuShell";
import { ServiceDomainColumn, NavLinkItem } from "./navigationConfig";
import { cn } from "@/lib/utils";

interface ServicesSubmenuProps {
  id: string;
  isOpen: boolean;
  tagline: string;
  description: string;
  columns: ServiceDomainColumn[];
  viewAll: NavLinkItem;
  cta: NavLinkItem;
  currentPath: string;
  onLinkClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function ServicesSubmenu({
  id,
  isOpen,
  tagline,
  description,
  columns,
  viewAll,
  cta,
  currentPath,
  onLinkClick,
  onMouseEnter,
  onMouseLeave,
}: ServicesSubmenuProps) {
  const headerContent = (
    <>
      <div className="flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-[#EFECE4]/90 font-medium">
          {tagline}
        </span>
      </div>
      <div className="flex items-center gap-3 text-xs font-mono">
        <span className="text-[#9AA3B2] uppercase text-[10px] tracking-wider">DIRECTORY:</span>
        <span className="font-semibold text-[#3B82F6]">4 DOMAINS</span>
        <span className="text-white/20">|</span>
        <span className="font-semibold text-[#F4BA00]">14 CAPABILITIES</span>
      </div>
    </>
  );

  const footerContent = (
    <>
      <div className="flex items-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#F4BA00]" aria-hidden="true" />
        <span className="text-xs text-[#9AA3B2]">
          Need help structuring the exact growth roadmap for your business?
        </span>
      </div>
      <div className="flex items-center gap-5">
        <Link
          href={viewAll.href}
          onClick={onLinkClick}
          className="text-xs font-medium tracking-wide text-[#EFECE4]/85 hover:text-[#3B82F6] transition-colors"
        >
          {viewAll.label}
        </Link>
        <Link
          href={cta.href}
          onClick={onLinkClick}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-[10px] bg-gradient-to-b from-[#F4BA00] to-[#E5AC00] text-[#0A1628] font-semibold text-xs tracking-wider shadow-[0_4px_14px_rgba(244,186,0,0.35)] hover:-translate-y-0.5 transition-all"
        >
          <span>{cta.label}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </>
  );

  // Domain accent colors
  const domainColors = [
    { accent: "#3B82F6", border: "rgba(59, 130, 246, 0.4)" },
    { accent: "#60A5FA", border: "rgba(96, 165, 250, 0.4)" },
    { accent: "#F4BA00", border: "rgba(244, 186, 0, 0.4)" },
    { accent: "#38BDF8", border: "rgba(56, 189, 248, 0.4)" },
  ];

  return (
    <MegaMenuShell
      id={id}
      isOpen={isOpen}
      variant="large"
      ariaLabel="Services Systems Console Directory"
      header={headerContent}
      footer={footerContent}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex flex-col lg:flex-row bg-[#111316]">
        {/* Left Strategy Overview Panel (~26%) */}
        <div className="relative overflow-hidden w-full lg:w-[26%] shrink-0 p-6 sm:p-7 border-b lg:border-b-0 lg:border-r border-white/[0.07] bg-[#14171A]/75 flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F4BA00]" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#F4BA00] font-medium">
                INTELLIGENCE & ARCHITECTURE
              </span>
            </div>

            <div>
              <h3 className="font-heading font-semibold text-2xl tracking-tight text-[#EFECE4] leading-tight">
                Services
              </h3>
              <p className="text-xs text-[#9AA3B2] leading-relaxed mt-2.5">
                {description}
              </p>
            </div>

            {/* Total service metric pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-[6px] bg-[#181C21] border border-white/[0.08] font-mono text-[10px] text-[#3B82F6] font-semibold">
                14 CAPABILITIES
              </span>
              <span className="px-2.5 py-1 rounded-[6px] bg-[#181C21] border border-white/[0.08] font-mono text-[10px] text-[#F4BA00] font-semibold">
                4 DOMAINS
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            {/* Modular Delivery compact featured callout */}
            <div className="p-3.5 rounded-[12px] bg-[#111316] border border-white/[0.08] shadow-box-sm">
              <div className="flex items-center gap-2 text-xs font-medium text-[#3B82F6] mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#F4BA00]" />
                <span className="text-[#EFECE4] font-medium">Modular Delivery</span>
              </div>
              <p className="text-[11px] text-[#9AA3B2] leading-normal">
                Deploy standalone specialized capabilities or synchronize them into a full continuous growth pipeline.
              </p>
            </div>

            <Link
              href={viewAll.href}
              onClick={onLinkClick}
              className="inline-flex items-center gap-2 text-xs font-medium text-[#3B82F6] hover:text-[#60A5FA] transition-colors group pt-1"
            >
              <span>{viewAll.label}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Service Directory Grid (~74%) */}
        <div className="w-full lg:w-[74%] p-6 sm:p-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {columns.map((col, idx) => {
              const colorTheme = domainColors[idx % domainColors.length];

              return (
                <div key={idx} className="flex flex-col gap-3">
                  {/* Category Header */}
                  <div className="border-b border-white/[0.06] pb-2.5">
                    <h4 className="font-heading font-semibold text-xs uppercase tracking-wider text-[#EFECE4]">
                      {col.domain}
                    </h4>
                    <div
                      className="h-[2px] w-6 rounded-full mt-1.5 mb-1"
                      style={{ backgroundColor: colorTheme.accent }}
                      aria-hidden="true"
                    />
                    <p className="text-[11px] text-[#9AA3B2]/80 leading-normal">
                      {col.description}
                    </p>
                  </div>

                  {/* Clean Interactive Service Rows (No truncation!) */}
                  <div className="flex flex-col gap-1">
                    {col.items.map((item) => {
                      const isActive = currentPath === item.href;

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={onLinkClick}
                          className={cn(
                            "group min-h-[38px] px-2.5 py-1.5 rounded-[8px] flex items-center justify-between gap-2 service-row-hover",
                            isActive
                              ? "bg-[#18263E]/85 text-[#3B82F6] border border-[#3B82F6]/30"
                              : "text-[#EFECE4]/85 hover:text-[#EFECE4]"
                          )}
                        >
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <span
                              className={cn(
                                "w-1.5 h-1.5 rounded-full shrink-0 transition-all",
                                isActive
                                  ? "bg-[#3B82F6] scale-110"
                                  : "bg-[#9AA3B2]/40 group-hover:scale-125"
                              )}
                              style={{
                                backgroundColor: isActive ? "#3B82F6" : undefined,
                              }}
                              aria-hidden="true"
                            />
                            {/* Full service name: wrapped cleanly, no ellipsis truncation! */}
                            <span className="text-xs font-medium tracking-wide leading-snug group-hover:text-[#60A5FA] transition-colors break-words">
                              {item.label}
                            </span>
                          </div>

                          <ArrowRight
                            className={cn(
                              "w-3.5 h-3.5 shrink-0 transition-all duration-160",
                              isActive
                                ? "text-[#3B82F6] opacity-100 translate-x-0"
                                : "text-[#9AA3B2]/40 opacity-0 group-hover:opacity-100 group-hover:text-[#3B82F6] group-hover:translate-x-1"
                            )}
                            aria-hidden="true"
                          />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MegaMenuShell>
  );
}
