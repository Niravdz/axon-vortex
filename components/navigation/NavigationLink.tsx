"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface NavigationLinkProps {
  href: string;
  label: string;
  badge?: string;
  description?: string;
  isActive?: boolean;
  onClick?: () => void;
  variant?: "card" | "line" | "compact";
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
        className={`group relative p-4 border-2 transition-all flex flex-col justify-between min-h-[96px] ${
          isActive
            ? "bg-brand-yellow/30 border-brand-black shadow-[3px_3px_0px_0px_#090909]"
            : "bg-white border-brand-black/20 hover:border-brand-black hover:bg-brand-gray/40 hover:shadow-[3px_3px_0px_0px_#090909] hover:-translate-x-0.5 hover:-translate-y-0.5"
        } ${className}`}
      >
        <div className="flex items-center justify-between gap-2 border-b border-brand-black/10 pb-2 mb-2">
          <span className="w-2 h-2 bg-brand-black/30 group-hover:bg-brand-red transition-colors" aria-hidden="true" />
          <ArrowUpRight
            className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
              isActive ? "text-brand-red" : "text-brand-black/40 group-hover:text-brand-black"
            }`}
            aria-hidden="true"
          />
        </div>
        <div>
          <span className="font-heading font-black text-xs uppercase tracking-tight text-brand-black block group-hover:text-brand-red transition-colors">
            {label}
          </span>
          {description && (
            <span className="text-[11px] font-sans text-brand-black/70 line-clamp-2 mt-1 leading-snug">
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
        className={`group flex items-center justify-between p-2.5 border-b border-brand-black/10 hover:bg-brand-yellow/20 transition-colors ${
          isActive ? "bg-brand-yellow/30 text-brand-red" : "text-brand-black"
        } ${className}`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-1.5 h-1.5 bg-brand-black/30 group-hover:bg-brand-red shrink-0 transition-colors" aria-hidden="true" />
          <span className="font-heading font-bold text-xs uppercase tracking-tight truncate group-hover:text-brand-red transition-colors">
            {label}
          </span>
        </div>
        <ArrowUpRight
          className="w-3 h-3 text-brand-black/30 group-hover:text-brand-red shrink-0 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </Link>
    );
  }

  // Default "line" variant (editorial list row)
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group flex items-start gap-3 p-3 border border-transparent hover:border-brand-black hover:bg-white hover:shadow-[2px_2px_0px_0px_#090909] transition-all rounded-none ${
        isActive ? "bg-white border-brand-black shadow-[2px_2px_0px_0px_#090909]" : ""
      } ${className}`}
    >
      <div className="flex flex-col min-w-0">
        <span className="font-heading font-black text-xs uppercase tracking-tight text-brand-black group-hover:text-brand-red transition-colors flex items-center gap-1.5">
          <span>{label}</span>
          <ArrowUpRight
            className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-brand-red"
            aria-hidden="true"
          />
        </span>
        {description && (
          <span className="text-[11px] font-sans text-brand-black/70 leading-tight mt-0.5">
            {description}
          </span>
        )}
      </div>
    </Link>
  );
}
