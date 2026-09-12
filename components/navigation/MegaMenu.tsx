"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Cpu, Activity, LayoutTemplate, Layers } from "lucide-react";
import { NavigationLink } from "./NavigationLink";
import { ServiceDomainColumn, NavLinkItem } from "./navigationConfig";

interface MegaMenuProps {
  id: string;
  isOpen: boolean;
  number: string;
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
  number,
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
      className="fixed top-20 left-1/2 -translate-x-1/2 pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
    >
      {/* Invisible hover bridge connecting trigger to menu */}
      <div className="absolute top-0 left-0 right-0 h-3 pointer-events-auto" />

      {/* Main Container */}
      <div className="w-[1180px] max-w-[calc(100vw-32px)] border-2 border-brand-black bg-white shadow-[8px_8px_0px_0px_#090909] overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="bg-brand-gray border-b-2 border-brand-black p-3.5 px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-black px-2.5 py-0.5 bg-brand-red text-white border border-brand-black">
              {number}
            </span>
            <span className="font-heading font-black text-xs uppercase tracking-widest text-brand-black">
              {tagline}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-brand-black/60 font-bold uppercase">Architecture:</span>
            <span className="font-black text-brand-red">4 DOMAINS</span>
            <span className="text-brand-black/30">|</span>
            <span className="font-black text-brand-blue">14 WORKSTREAMS</span>
          </div>
        </div>

        {/* Content Body: Left Rail + 4 Domain Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Rail: Overview & Bauhaus Primitives */}
          <div className="lg:col-span-3 border-b-2 lg:border-b-0 lg:border-r-2 border-brand-black bg-brand-slate text-white p-6 sm:p-8 flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[11px] uppercase tracking-widest text-brand-yellow font-bold">
                ENGINEERING DIRECTORY
              </span>
              <h3 className="font-heading font-black text-2xl uppercase tracking-tight text-white leading-tight">
                Architectural Capabilities
              </h3>
              <p className="text-xs font-sans text-brand-gray leading-relaxed">
                {description}
              </p>
            </div>

            {/* Geometric Bauhaus Art Block */}
            <div className="pt-8 flex flex-col gap-4 border-t border-white/20 mt-6">
              <div className="flex items-center gap-2" aria-hidden="true">
                <div className="w-8 h-8 bg-brand-red border border-white flex items-center justify-center font-mono text-xs font-black text-white">
                  ▲
                </div>
                <div className="w-8 h-8 rounded-full bg-brand-yellow border border-white flex items-center justify-center font-mono text-xs font-black text-brand-black">
                  ●
                </div>
                <div className="w-8 h-8 bg-brand-blue border border-white flex items-center justify-center font-mono text-xs font-black text-white">
                  ■
                </div>
              </div>
              <span className="font-mono text-[10px] uppercase text-white/60">
                Discrete pods. Unified delivery.
              </span>
            </div>
          </div>

          {/* Main Area: 4 Columns */}
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x-2 divide-brand-black bg-white">
            {columns.map((col) => (
              <div key={col.number} className="p-5 flex flex-col justify-between">
                <div>
                  {/* Column Header */}
                  <div className="border-b-2 border-brand-black pb-3 mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[10px] font-black text-brand-red">
                        DOM-{col.number}
                      </span>
                      <span className="w-2 h-2 bg-brand-black" aria-hidden="true" />
                    </div>
                    <h4 className="font-heading font-black text-xs uppercase tracking-tight text-brand-black truncate">
                      {col.domain}
                    </h4>
                    <p className="text-[10px] font-sans text-brand-black/60 truncate mt-0.5">
                      {col.description}
                    </p>
                  </div>

                  {/* Column Links */}
                  <div className="flex flex-col">
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
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Strip: Actions */}
        <div className="border-t-2 border-brand-black bg-brand-gray p-4 px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" aria-hidden="true" />
            <span className="text-xs font-sans text-brand-black/80 font-medium">
              Every capability is built around real business targets.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href={viewAll.href}
              onClick={onLinkClick}
              className="font-heading font-black text-xs uppercase tracking-wider text-brand-black hover:text-brand-red flex items-center gap-1.5 transition-colors"
            >
              <span>{viewAll.label}</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>

            <Link
              href={cta.href}
              onClick={onLinkClick}
              className="px-4 py-2 border-2 border-brand-black bg-brand-black text-white hover:bg-brand-red hover:border-brand-black font-mono text-xs uppercase font-bold tracking-wider transition-colors shadow-[2px_2px_0px_0px_#090909]"
            >
              <span>{cta.label}</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
