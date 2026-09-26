"use client";

import React from "react";
import Link from "next/link";
import { ChevronDown, ArrowUpRight, ArrowRight } from "lucide-react";
import { NavLinkItem, ServiceDomainColumn } from "./navigationConfig";

interface AccordionSectionProps {
  id: string;
  number?: string;
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export function AccordionSection({
  id,
  title,
  isOpen,
  onToggle,
  children,
}: AccordionSectionProps) {
  return (
    <div className="rounded-[12px] border border-white/[0.08] bg-[#1b1e22] shadow-[0_8px_20px_-3px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)] mb-3 overflow-hidden transition-all">
      <button
        id={`mobile-accordion-btn-${id}`}
        type="button"
        aria-expanded={isOpen}
        aria-controls={`mobile-accordion-panel-${id}`}
        onClick={onToggle}
        className={`w-full min-h-[50px] px-4 py-3 flex items-center justify-between gap-3 text-left transition-colors select-none ${
          isOpen
            ? "bg-[#21252a] border-b border-white/[0.08] text-[#3B82F6]"
            : "bg-[#1b1e22] hover:bg-[#21252a] text-[#EFECE4]"
        }`}
      >
        <span className="font-heading font-medium text-sm tracking-wide">
          {title}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[#9AA3B2] transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#3B82F6]" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          id={`mobile-accordion-panel-${id}`}
          role="region"
          aria-labelledby={`mobile-accordion-btn-${id}`}
          className="p-3 bg-[#101215] shadow-[inset_0_2px_6px_rgba(0,0,0,0.85)] border-t border-white/[0.04] animate-in fade-in slide-in-from-top-1 duration-150"
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
      <div className="grid grid-cols-1 gap-1.5">
        {items.map((item) => {
          const isActive = currentPath === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onItemClick}
              className={`min-h-[44px] p-3 rounded-[8px] border flex items-center justify-between gap-2 transition-all ${
                isActive
                  ? "bg-[#21252a] border-[#3B82F6]/60 text-[#3B82F6] font-medium shadow-[0_2px_8px_rgba(59,130,246,0.2)]"
                  : "bg-[#171a1e] border-white/[0.06] shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-[#3B82F6]/40 text-[#EFECE4]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                <span className="text-xs font-medium tracking-wide">
                  {item.label}
                </span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#9AA3B2] shrink-0" aria-hidden="true" />
            </Link>
          );
        })}
      </div>

      <Link
        href={viewAll.href}
        onClick={onItemClick}
        className="mt-2 min-h-[42px] px-3.5 rounded-[8px] bg-[#171a1e] border border-white/[0.08] text-xs font-medium text-[#3B82F6] flex items-center justify-between shadow-[0_2px_6px_rgba(0,0,0,0.4)] hover:bg-[#21252a] transition-colors"
      >
        <span>{viewAll.label}</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}

interface ServicesListProps {
  columns: ServiceDomainColumn[];
  viewAll: NavLinkItem;
  currentPath: string;
  onItemClick: () => void;
}

export function MobileServicesList({
  columns,
  viewAll,
  currentPath,
  onItemClick,
}: ServicesListProps) {
  return (
    <div className="flex flex-col gap-3">
      {columns.map((col, idx) => (
        <div key={idx} className="flex flex-col gap-1.5">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#F4BA00] px-1 font-medium">
            {col.domain}
          </div>
          <div className="grid grid-cols-1 gap-1">
            {col.items.map((item) => {
              const isActive = currentPath === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onItemClick}
                  className={`min-h-[40px] px-3 py-2 rounded-[6px] text-xs transition-colors flex items-center justify-between ${
                    isActive
                      ? "bg-[#21252a] text-[#3B82F6] font-medium shadow-[0_2px_6px_rgba(59,130,246,0.2)]"
                      : "text-[#EFECE4]/85 hover:bg-white/[0.06] hover:text-[#EFECE4]"
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-3 h-3 text-[#9AA3B2]/50" />
                </Link>
              );
            })}
          </div>
        </div>
      ))}

      <Link
        href={viewAll.href}
        onClick={onItemClick}
        className="mt-2 min-h-[42px] px-3.5 rounded-[8px] bg-[#171a1e] border border-white/[0.08] text-xs font-medium text-[#3B82F6] flex items-center justify-between shadow-[0_2px_6px_rgba(0,0,0,0.4)] hover:bg-[#21252a] transition-colors"
      >
        <span>{viewAll.label}</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
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
    <div className="grid grid-cols-1 gap-1.5">
      {items.map((item) => {
        const isActive = currentPath === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className={`min-h-[42px] px-3.5 py-2.5 rounded-[8px] border text-xs font-medium tracking-wide flex items-center justify-between transition-all ${
              isActive
                ? "bg-[#21252a] border-[#3B82F6]/50 text-[#3B82F6] shadow-[0_2px_8px_rgba(59,130,246,0.2)]"
                : "bg-[#171a1e] border-white/[0.06] text-[#EFECE4] shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-[#3B82F6]/40 hover:bg-[#21252a]"
            }`}
          >
            <span>{item.label}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#9AA3B2]" />
          </Link>
        );
      })}
    </div>
  );
}
