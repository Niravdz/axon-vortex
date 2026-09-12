"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { NavigationLink } from "./NavigationLink";
import { NavLinkItem } from "./navigationConfig";

interface DropdownMenuProps {
  id: string;
  isOpen: boolean;
  type: "solutions" | "company";
  title: string;
  number: string;
  tagline: string;
  description: string;
  items: NavLinkItem[];
  viewAll?: NavLinkItem;
  currentPath: string;
  onLinkClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function DropdownMenu({
  id,
  isOpen,
  type,
  title,
  number,
  tagline,
  description,
  items,
  viewAll,
  currentPath,
  onLinkClick,
  onMouseEnter,
  onMouseLeave,
}: DropdownMenuProps) {
  if (!isOpen) return null;

  return (
    <div
      id={id}
      role="region"
      aria-label={`${title} Submenu`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 ${
        type === "solutions"
          ? "fixed top-20 left-1/2 -translate-x-1/2"
          : "absolute top-full left-1/2 -translate-x-1/2"
      }`}
    >
      {/* Invisible hover bridge connecting trigger to menu */}
      <div className="absolute top-0 left-0 right-0 h-3 pointer-events-auto" />

      {type === "solutions" ? (
        /* SOLUTIONS DROPDOWN (Wide multi-column Bauhaus grid) */
        <div className="w-[720px] max-w-[calc(100vw-32px)] border-2 border-brand-black bg-white shadow-[6px_6px_0px_0px_#090909] overflow-hidden">
          {/* Header Strip */}
          <div className="bg-brand-gray border-b-2 border-brand-black p-4 px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-black px-2 py-0.5 bg-brand-red text-white border border-brand-black">
                {number}
              </span>
              <span className="font-heading font-black text-xs uppercase tracking-widest text-brand-black">
                {tagline}
              </span>
            </div>
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="w-2.5 h-2.5 bg-brand-red border border-brand-black" />
              <span className="w-2.5 h-2.5 bg-brand-yellow border border-brand-black" />
              <span className="w-2.5 h-2.5 bg-brand-blue border border-brand-black" />
            </div>
          </div>

          {/* Solutions Content Grid (Structured 2-column Bauhaus matrix) */}
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-brand-white">
            {items.map((item) => {
              const isActive = currentPath === item.href;
              return (
                <NavigationLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  badge={item.badge}
                  description={item.description}
                  isActive={isActive}
                  onClick={onLinkClick}
                  variant="card"
                />
              );
            })}
          </div>

          {/* Bottom Action Strip */}
          {viewAll && (
            <div className="border-t-2 border-brand-black bg-brand-gray p-3.5 px-6 flex items-center justify-between">
              <span className="text-xs font-sans text-brand-black/70">
                Need to map all capabilities into an integrated operating system?
              </span>
              <Link
                href={viewAll.href}
                onClick={onLinkClick}
                className="font-heading font-black text-xs uppercase tracking-wider text-brand-black hover:text-brand-red flex items-center gap-1.5 transition-colors"
              >
                <span>{viewAll.label}</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
      ) : (
        /* COMPANY DROPDOWN (Compact structured editorial list) */
        <div className="w-[420px] max-w-[calc(100vw-32px)] border-2 border-brand-black bg-white shadow-[6px_6px_0px_0px_#090909] overflow-hidden">
          {/* Header Strip */}
          <div className="bg-brand-gray border-b-2 border-brand-black p-4 px-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-black px-2 py-0.5 bg-brand-yellow text-brand-black border border-brand-black">
                {number}
              </span>
              <span className="font-heading font-black text-xs uppercase tracking-widest text-brand-black">
                {tagline}
              </span>
            </div>
            <span className="font-mono text-[10px] uppercase font-bold text-brand-black/50">
              AXONVORTEX
            </span>
          </div>

          {/* Company Links List */}
          <div className="p-3 divide-y divide-brand-black/10 flex flex-col bg-white">
            {items.map((item) => {
              const isActive = currentPath === item.href;
              return (
                <NavigationLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  badge={item.badge}
                  description={item.description}
                  isActive={isActive}
                  onClick={onLinkClick}
                  variant="line"
                />
              );
            })}
          </div>

          {/* Footer Notice */}
          <div className="border-t-2 border-brand-black bg-brand-gray/50 p-3 px-5 flex items-center justify-between text-[11px] font-mono text-brand-black/70">
            <span>Direct consultation desk</span>
            <Link
              href="/contact"
              onClick={onLinkClick}
              className="text-brand-red font-bold hover:underline flex items-center gap-1"
            >
              <span>Intake Form</span>
              <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
