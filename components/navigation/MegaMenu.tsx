"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { NavigationLink } from "./NavigationLink";
import { ServiceDomainColumn, NavLinkItem } from "./navigationConfig";

interface MegaMenuProps {
  id: string;
  isOpen: boolean;
  number?: string;
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

export function MegaMenu({
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
}: MegaMenuProps) {
  if (!isOpen) return null;

  return (
    <div
      id={id}
      role="region"
      aria-label="Services Mega Menu"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="fixed top-20 left-1/2 -translate-x-1/2 pt-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
    >
      {/* Invisible hover bridge connecting trigger to menu */}
      <div className="absolute top-0 left-0 right-0 h-4 pointer-events-auto" />

      {/* Main 3D Neumorphic Raised Container */}
      <div className="w-[1180px] max-w-[calc(100vw-32px)] rounded-[16px] border border-white/[0.08] bg-[#1b1e22] shadow-[0_24px_64px_-8px_rgba(0,0,0,0.88),0_8px_24px_-4px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.12)] overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="bg-[#141619] border-b border-white/[0.06] p-3.5 px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#EFECE4]/90 font-medium">
              {tagline}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-[#9AA3B2] uppercase">Framework:</span>
            <span className="font-semibold text-[#3B82F6]">4 DOMAINS</span>
            <span className="text-white/20">|</span>
            <span className="font-semibold text-[#F4BA00]">14 CAPABILITIES</span>
          </div>
        </div>

        {/* Content Body: Left Rail + 4 Domain Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 bg-[#101215]">
          
          {/* Left Rail: Overview & Dimensional Focus Panel */}
          <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-white/[0.06] bg-[#141619]/90 p-6 sm:p-7 flex flex-col justify-between">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#F4BA00] font-medium">
                INTELLIGENCE & ARCHITECTURE
              </span>
              <h3 className="font-heading font-semibold text-xl tracking-tight text-[#EFECE4] leading-snug">
                Unified Growth Services
              </h3>
              <p className="text-xs text-[#9AA3B2] leading-relaxed">
                {description}
              </p>
            </div>

            {/* Dimensional Focus Callout (Recessed/Raised Sub-Panel) */}
            <div className="pt-6 flex flex-col gap-3 border-t border-white/[0.06] mt-6">
              <div className="p-3.5 rounded-[10px] bg-[#171a1e] border border-white/[0.08] shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]">
                <div className="flex items-center gap-2 text-xs font-medium text-[#3B82F6] mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#F4BA00]" />
                  <span>Modular Delivery</span>
                </div>
                <p className="text-[11px] text-[#9AA3B2] leading-normal">
                  Deploy standalone specialized capabilities or synchronize them into a full continuous growth pipeline.
                </p>
              </div>
            </div>
          </div>

          {/* 4 Domain Columns Grid */}
          <div className="lg:col-span-9 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {columns.map((col, idx) => (
              <div key={idx} className="flex flex-col gap-3">
                {/* Column Domain Heading */}
                <div className="border-b border-white/[0.06] pb-2">
                  <h4 className="font-heading font-semibold text-xs uppercase tracking-wider text-[#EFECE4]">
                    {col.domain}
                  </h4>
                  <p className="text-[10px] text-[#9AA3B2] line-clamp-1 mt-0.5">
                    {col.description}
                  </p>
                </div>

                {/* Sub-Service Capability Items */}
                <div className="flex flex-col gap-0.5">
                  {col.items.map((item) => {
                    const isActive = currentPath === item.href;
                    return (
                      <NavigationLink
                        key={item.href}
                        href={item.href}
                        label={item.label}
                        isActive={isActive}
                        onClick={onLinkClick}
                        variant="compact"
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Action Footer Bar */}
        <div className="border-t border-white/[0.06] bg-[#141619] p-4 px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#9AA3B2]">
              Need help structuring the exact growth roadmap for your business?
            </span>
          </div>
          <div className="flex items-center gap-5">
            <Link
              href={viewAll.href}
              onClick={onLinkClick}
              className="text-xs font-medium tracking-wide text-[#EFECE4]/80 hover:text-[#3B82F6] transition-colors"
            >
              {viewAll.label}
            </Link>
            <Link
              href={cta.href}
              onClick={onLinkClick}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[8px] bg-gradient-to-b from-[#F4BA00] to-[#DFA700] text-[#0A1628] font-semibold text-xs tracking-wider shadow-[0_4px_14px_rgba(244,186,0,0.35)] hover:-translate-y-0.5 transition-all"
            >
              <span>{cta.label}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
