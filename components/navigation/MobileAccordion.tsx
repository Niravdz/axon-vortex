"use client";

import React from "react";
import Link from "next/link";
import { ChevronDown, ArrowUpRight, ArrowRight } from "lucide-react";
import { NavLinkItem, ServiceDomainColumn } from "./navigationConfig";

interface AccordionSectionProps {
  id: string;
  number: string;
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export function AccordionSection({
  id,
  number,
  title,
  isOpen,
  onToggle,
  children,
}: AccordionSectionProps) {
  return (
    <div className="border-2 border-brand-black bg-white shadow-[3px_3px_0px_0px_#090909] mb-4 overflow-hidden transition-all">
      <button
        id={`mobile-accordion-btn-${id}`}
        type="button"
        aria-expanded={isOpen}
        aria-controls={`mobile-accordion-panel-${id}`}
        onClick={onToggle}
        className={`w-full min-h-[52px] px-4 py-3 flex items-center justify-between gap-3 text-left transition-colors select-none ${
          isOpen ? "bg-brand-gray border-b-2 border-brand-black" : "bg-white hover:bg-brand-gray/50"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-black px-2 py-0.5 bg-brand-red text-white border border-brand-black">
            {number}
          </span>
          <span className="font-heading font-black text-sm uppercase tracking-wider text-brand-black">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ChevronDown
            className={`w-4 h-4 text-brand-black transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </div>
      </button>

      {isOpen && (
        <div
          id={`mobile-accordion-panel-${id}`}
          role="region"
          aria-labelledby={`mobile-accordion-btn-${id}`}
          className="p-3 bg-brand-white animate-in fade-in slide-in-from-top-1 duration-150"
        >
          {children}
        </div>
      )}
    </div>
  );
}

interface SolutionsListProps {
  items: NavLinkItem[];
  viewAll: NavLinkItem;
  currentPath: string;
  onItemClick: () => void;
}

export function MobileSolutionsList({
  items,
  viewAll,
  currentPath,
  onItemClick,
}: SolutionsListProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-1 gap-2">
        {items.map((item) => {
          const isActive = currentPath === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onItemClick}
              className={`min-h-[48px] p-3 border border-brand-black/20 flex items-center justify-between gap-2 transition-colors ${
                isActive
                  ? "bg-brand-yellow/30 border-brand-black font-bold text-brand-red shadow-[2px_2px_0px_0px_#090909]"
                  : "bg-white hover:bg-brand-gray/50 text-brand-black"
              }`}
            >
              <div className="flex items-center gap-2.5">
                {item.badge && (
                  <span className="font-mono text-[10px] font-black text-brand-red">
                    {item.badge}
                  </span>
                )}
                <span className="font-heading font-bold text-xs uppercase tracking-tight">
                  {item.label}
                </span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-brand-black/40 shrink-0" aria-hidden="true" />
            </Link>
          );
        })}
      </div>

      <Link
        href={viewAll.href}
        onClick={onItemClick}
        className="mt-2 min-h-[44px] p-3 border-2 border-brand-black bg-brand-gray flex items-center justify-between text-xs font-heading font-black uppercase tracking-wider text-brand-black hover:bg-brand-black hover:text-white transition-colors"
      >
        <span>{viewAll.label}</span>
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </Link>
    </div>
  );
}

interface ServicesListProps {
  columns: ServiceDomainColumn[];
  viewAll: NavLinkItem;
  cta: NavLinkItem;
  currentPath: string;
  onItemClick: () => void;
}

export function MobileServicesList({
  columns,
  viewAll,
  cta,
  currentPath,
  onItemClick,
}: ServicesListProps) {
  const [openDomain, setOpenDomain] = React.useState<string | null>("01");

  const toggleDomain = (num: string) => {
    setOpenDomain((prev) => (prev === num ? null : num));
  };

  return (
    <div className="flex flex-col gap-3">
      {/* 4 Domain Accordions */}
      <div className="flex flex-col gap-2">
        {columns.map((col) => {
          const isDomainOpen = openDomain === col.number;
          return (
            <div key={col.number} className="border border-brand-black bg-white">
              <button
                type="button"
                onClick={() => toggleDomain(col.number)}
                className={`w-full min-h-[44px] px-3 py-2 flex items-center justify-between text-left transition-colors ${
                  isDomainOpen ? "bg-brand-gray border-b border-brand-black font-black" : "hover:bg-brand-gray/40"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-black text-brand-red">
                    {col.number}
                  </span>
                  <span className="font-heading font-bold text-xs uppercase tracking-tight text-brand-black">
                    {col.domain}
                  </span>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-brand-black transition-transform duration-150 ${
                    isDomainOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              {isDomainOpen && (
                <div className="p-2 divide-y divide-brand-black/10 bg-brand-white">
                  {col.items.map((item) => {
                    const isActive = currentPath === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onItemClick}
                        className={`min-h-[44px] px-2 py-2.5 flex items-center justify-between text-xs transition-colors ${
                          isActive
                            ? "font-black text-brand-red bg-brand-yellow/30"
                            : "text-brand-black hover:text-brand-red"
                        }`}
                      >
                        <span className="font-heading font-medium tracking-tight">
                          {item.label}
                        </span>
                        <ArrowUpRight className="w-3 h-3 text-brand-black/30" aria-hidden="true" />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Services Action Strip */}
      <div className="flex flex-col gap-2 pt-2 border-t border-brand-black/20">
        <Link
          href={viewAll.href}
          onClick={onItemClick}
          className="min-h-[44px] p-3 border-2 border-brand-black bg-brand-gray flex items-center justify-between text-xs font-heading font-black uppercase tracking-wider text-brand-black hover:bg-brand-black hover:text-white transition-colors"
        >
          <span>{viewAll.label}</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

interface CompanyListProps {
  items: NavLinkItem[];
  currentPath: string;
  onItemClick: () => void;
}

export function MobileCompanyList({
  items,
  currentPath,
  onItemClick,
}: CompanyListProps) {
  return (
    <div className="flex flex-col divide-y divide-brand-black/10">
      {items.map((item) => {
        const isActive = currentPath === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className={`min-h-[48px] p-3 flex items-center justify-between gap-2 transition-colors ${
              isActive
                ? "bg-brand-yellow/30 font-bold text-brand-red"
                : "text-brand-black hover:bg-brand-gray/50"
            }`}
          >
            <div className="flex items-center gap-2.5">
              {item.badge && (
                <span className="font-mono text-[10px] font-black text-brand-red">
                  {item.badge}
                </span>
              )}
              <span className="font-heading font-bold text-xs uppercase tracking-tight">
                {item.label}
              </span>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-brand-black/40" aria-hidden="true" />
          </Link>
        );
      })}
    </div>
  );
}
