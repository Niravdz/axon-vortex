"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationLinkProps {
  href: string;
  label: string;
  badge?: string;
  description?: string;
  isActive?: boolean;
  onClick?: () => void;
  variant?: "card" | "line" | "compact" | "simple";
  className?: string;
}

export function NavigationLink({
  href,
  label,
  description,
  isActive = false,
  onClick,
  variant = "line",
  className = "",
}: NavigationLinkProps) {
  if (variant === "card") {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={cn(
          "group relative p-3.5 rounded-[10px] border box-interactive flex flex-col justify-between min-h-[92px]",
          isActive
            ? "bg-[#1b1e22] border-[#3B82F6] shadow-box-selected"
            : "bg-[#141619] border-white/[0.06] shadow-box-sm hover:shadow-box-hover hover:border-[#3B82F6]/45 hover:bg-[#181c20]",
          className
        )}
      >
        <div className="flex items-center justify-between gap-2 border-b border-white/[0.08] pb-2 mb-2">
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full transition-colors",
              isActive ? "bg-[#3B82F6]" : "bg-[#9AA3B2]/40 group-hover:bg-[#3B82F6]"
            )}
            aria-hidden="true"
          />
          <ArrowUpRight
            className={cn(
              "w-3.5 h-3.5 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
              isActive ? "text-[#3B82F6]" : "text-[#9AA3B2]/50 group-hover:text-[#3B82F6]"
            )}
            aria-hidden="true"
          />
        </div>
        <div>
          <span
            className={cn(
              "font-heading font-medium text-xs tracking-wide block transition-colors",
              isActive ? "text-[#3B82F6]" : "text-[#EFECE4] group-hover:text-[#60A5FA]"
            )}
          >
            {label}
          </span>
          {description && (
            <span className="text-[11px] text-[#9AA3B2] line-clamp-2 mt-1 leading-snug">
              {description}
            </span>
          )}
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={cn(
          "group flex items-center justify-between p-2.5 rounded-[6px] transition-all duration-150",
          isActive
            ? "bg-[#183968]/70 text-[#3B82F6]"
            : "text-[#EFECE4]/85 hover:text-[#EFECE4] hover:bg-white/[0.06]",
          className
        )}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full shrink-0 transition-colors",
              isActive ? "bg-[#3B82F6]" : "bg-[#9AA3B2]/40 group-hover:bg-[#3B82F6]"
            )}
            aria-hidden="true"
          />
          <span className="text-xs font-medium tracking-wide truncate">
            {label}
          </span>
        </div>
        <ArrowUpRight
          className="w-3 h-3 text-[#9AA3B2]/40 group-hover:text-[#3B82F6] shrink-0 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </Link>
    );
  }

  if (variant === "simple") {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={cn(
          "group flex items-center justify-between px-3.5 py-2.5 rounded-[8px] text-xs font-medium tracking-wide transition-all duration-150",
          isActive
            ? "bg-[#183968]/75 text-[#3B82F6] border border-[#3B82F6]/30"
            : "text-[#EFECE4]/85 hover:text-[#EFECE4] hover:bg-white/[0.06]",
          className
        )}
      >
        <span>{label}</span>
        <ArrowUpRight
          className="w-3 h-3 opacity-0 group-hover:opacity-100 text-[#3B82F6] transition-opacity"
          aria-hidden="true"
        />
      </Link>
    );
  }

  // Default "line" variant
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group flex items-start gap-2.5 p-2 rounded-[6px] transition-all duration-150",
        isActive ? "text-[#3B82F6]" : "text-[#EFECE4]/85 hover:text-[#EFECE4] hover:bg-white/[0.05]",
        className
      )}
    >
      <div className="flex flex-col min-w-0">
        <span className="text-xs font-medium tracking-wide group-hover:text-[#60A5FA] transition-colors flex items-center gap-1.5">
          <span>{label}</span>
          <ArrowUpRight
            className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#3B82F6]"
            aria-hidden="true"
          />
        </span>
        {description && (
          <span className="text-[11px] text-[#9AA3B2]/80 leading-snug mt-0.5">
            {description}
          </span>
        )}
      </div>
    </Link>
  );
}
