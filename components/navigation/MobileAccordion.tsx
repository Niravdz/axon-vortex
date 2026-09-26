"use client";

import React from "react";
import Link from "next/link";
import {
  ChevronDown,
  ArrowUpRight,
  ArrowRight,
  Building2,
  Workflow,
  Gauge,
  BookOpen,
  Send,
} from "lucide-react";
import { NavLinkItem, ServiceDomainColumn } from "./navigationConfig";
import { cn } from "@/lib/utils";

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
    <div className="rounded-[16px] border border-white/[0.08] bg-[#141619] shadow-box-sm mb-3 overflow-hidden transition-all">
      <button
        id={`mobile-accordion-btn-${id}`}
        type="button"
        aria-expanded={isOpen}
        aria-controls={`mobile-accordion-panel-${id}`}
        onClick={onToggle}
        className={cn(
          "w-full min-h-[52px] px-4 py-3 flex items-center justify-between gap-3 text-left transition-colors select-none",
          isOpen
            ? "bg-[#181C22] border-b border-white/[0.08] text-[#3B82F6]"
            : "bg-[#141619] hover:bg-[#181C22] text-[#EFECE4]"
        )}
      >
        <div className="flex items-center gap-2.5">
          <span
            className={cn(
              "w-2 h-2 rounded-full transition-colors",
              isOpen ? "bg-[#3B82F6] animate-pulse" : "bg-white/20"
            )}
            aria-hidden="true"
          />
          <span className="font-heading font-medium text-sm tracking-wide">
            {title}
          </span>
        </div>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-[#9AA3B2] transition-transform duration-200",
            isOpen && "rotate-180 text-[#3B82F6]"
          )}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          id={`mobile-accordion-panel-${id}`}
          role="region"
          aria-labelledby={`mobile-accordion-btn-${id}`}
          className="p-3 sm:p-4 bg-[#101215] border-t border-white/[0.04] animate-in fade-in slide-in-from-top-1 duration-150"
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
        {items.map((item, idx) => {
          const isActive = currentPath === item.href;
          const indexFormatted = String(idx + 1).padStart(2, "0");

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onItemClick}
              className={cn(
                "min-h-[50px] p-3 rounded-[12px] border flex items-center justify-between gap-3 box-interactive transition-all",
                isActive
                  ? "bg-[#18263E]/90 border-[#3B82F6] text-[#3B82F6] shadow-[0_2px_10px_rgba(59,130,246,0.2)]"
                  : "bg-[#141619] border-white/[0.06] text-[#EFECE4] hover:bg-[#181C21] hover:border-[#3B82F6]/40"
              )}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className={cn(
                    "px-1.5 py-0.5 rounded-[4px] font-mono text-[10px] font-bold shrink-0",
                    isActive ? "bg-[#3B82F6] text-white" : "bg-white/[0.06] text-[#9AA3B2]"
                  )}
                >
                  {indexFormatted}
                </span>
                <span className="text-xs font-medium tracking-wide truncate">
                  {item.label}
                </span>
              </div>
              <ArrowUpRight
                className={cn(
                  "w-4 h-4 shrink-0 transition-colors",
                  isActive ? "text-[#3B82F6]" : "text-[#9AA3B2]"
                )}
                aria-hidden="true"
              />
            </Link>
          );
        })}
      </div>

      <Link
        href={viewAll.href}
        onClick={onItemClick}
        className="mt-2 min-h-[48px] px-4 rounded-[12px] bg-[#171A1F] border border-white/[0.08] text-xs font-medium text-[#3B82F6] flex items-center justify-between shadow-box-sm hover:bg-[#1D222A] transition-colors"
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
  const domainColors = ["#3B82F6", "#60A5FA", "#F4BA00", "#38BDF8"];

  return (
    <div className="flex flex-col gap-4">
      {columns.map((col, idx) => {
        const accent = domainColors[idx % domainColors.length];

        return (
          <div key={idx} className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 px-1">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: accent }}
                aria-hidden="true"
              />
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#EFECE4] font-semibold">
                {col.domain}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-1">
              {col.items.map((item) => {
                const isActive = currentPath === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onItemClick}
                    className={cn(
                      "min-h-[48px] px-3.5 py-2.5 rounded-[10px] text-xs transition-colors flex items-center justify-between gap-2",
                      isActive
                        ? "bg-[#18263E]/90 text-[#3B82F6] font-medium border border-[#3B82F6]/30 shadow-[0_2px_8px_rgba(59,130,246,0.18)]"
                        : "text-[#EFECE4]/85 hover:bg-white/[0.06] hover:text-[#EFECE4]"
                    )}
                  >
                    <span className="break-words leading-snug">{item.label}</span>
                    <ArrowUpRight
                      className={cn(
                        "w-3.5 h-3.5 shrink-0",
                        isActive ? "text-[#3B82F6]" : "text-[#9AA3B2]/50"
                      )}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}

      <Link
        href={viewAll.href}
        onClick={onItemClick}
        className="mt-1 min-h-[48px] px-4 rounded-[12px] bg-[#171A1F] border border-white/[0.08] text-xs font-medium text-[#3B82F6] flex items-center justify-between shadow-box-sm hover:bg-[#1D222A] transition-colors"
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
  const getIcon = (href: string) => {
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

  return (
    <div className="grid grid-cols-1 gap-2">
      {items.map((item) => {
        const isActive = currentPath === item.href;
        const icon = getIcon(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className={cn(
              "min-h-[50px] px-3.5 py-3 rounded-[12px] border text-xs font-medium tracking-wide flex items-center justify-between gap-3 box-interactive transition-all",
              isActive
                ? "bg-[#18263E]/90 border-[#3B82F6] text-[#3B82F6] shadow-[0_2px_10px_rgba(59,130,246,0.2)]"
                : "bg-[#141619] border-white/[0.06] text-[#EFECE4] hover:bg-[#181C21] hover:border-[#3B82F6]/40"
            )}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-1.5 rounded-[6px] bg-white/[0.05] border border-white/[0.06] shrink-0">
                {icon}
              </div>
              <span className="truncate">{item.label}</span>
            </div>
            <ArrowUpRight
              className={cn(
                "w-3.5 h-3.5 shrink-0",
                isActive ? "text-[#3B82F6]" : "text-[#9AA3B2]"
              )}
            />
          </Link>
        );
      })}
    </div>
  );
}
