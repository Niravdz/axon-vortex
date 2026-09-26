"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NavigationLink } from "./NavigationLink";
import { NavLinkItem } from "./navigationConfig";

interface DropdownMenuProps {
  id: string;
  isOpen: boolean;
  type: "solutions" | "company";
  title: string;
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
  tagline,
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
      className={`pt-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200 ${
        type === "solutions"
          ? "fixed top-20 left-1/2 -translate-x-1/2"
          : "absolute top-full left-1/2 -translate-x-1/2"
      }`}
    >
      {/* Invisible hover bridge connecting trigger to menu */}
      <div className="absolute top-0 left-0 right-0 h-4 pointer-events-auto" />

      {type === "solutions" ? (
        /* SOLUTIONS DROPDOWN: Nested Neumorphic 3D Surface */
        <div className="w-[720px] max-w-[calc(100vw-32px)] rounded-[16px] border border-white/[0.08] bg-[#1b1e22] shadow-[0_24px_60px_-8px_rgba(0,0,0,0.85),0_8px_20px_-4px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.12)] overflow-hidden">
          {/* Header Strip */}
          <div className="bg-[#141619] border-b border-white/[0.06] p-4 px-6 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#EFECE4]/90 font-medium">
                {tagline}
              </span>
            </div>
            <div className="flex items-center gap-2" aria-hidden="true">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#F4BA00]" />
            </div>
          </div>

          {/* Solutions Content Grid (Recessed Container holding Inner Raised Cards) */}
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-[#101215]">
            {items.map((item) => {
              const isActive = currentPath === item.href;
              return (
                <NavigationLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
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
            <div className="border-t border-white/[0.06] bg-[#141619] p-3.5 px-6 flex items-center justify-between">
              <span className="text-xs text-[#9AA3B2]">
                Explore all 5 synchronized commercial domains
              </span>
              <Link
                href={viewAll.href}
                onClick={onLinkClick}
                className="font-medium text-xs tracking-wider text-[#3B82F6] hover:text-[#60A5FA] flex items-center gap-1.5 transition-colors group"
              >
                <span>{viewAll.label}</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}
        </div>
      ) : (
        /* COMPANY DROPDOWN: Compact Dimensional Raised Card */
        <div className="w-64 rounded-[14px] border border-white/[0.08] bg-[#1b1e22] shadow-[0_20px_48px_-8px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.12)] p-2.5 flex flex-col gap-1 overflow-hidden">
          {items.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <NavigationLink
                key={item.href}
                href={item.href}
                label={item.label}
                isActive={isActive}
                onClick={onLinkClick}
                variant="simple"
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
