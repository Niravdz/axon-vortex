"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DimensionalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "amber" | "blue" | "glass" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  withArrow?: boolean;
  asLink?: boolean;
  href?: string;
  className?: string;
  loading?: boolean;
}

export function DimensionalButton({
  children,
  variant = "amber",
  size = "md",
  withArrow = false,
  asLink = false,
  href,
  className,
  loading = false,
  disabled,
  ...props
}: DimensionalButtonProps) {
  const baseStyles =
    "group relative inline-flex items-center justify-center font-button font-medium select-none rounded-[8px] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electricBlue focus-visible:ring-offset-2 focus-visible:ring-offset-void disabled:cursor-not-allowed disabled:opacity-50 disabled:transform-none disabled:shadow-none";

  const sizeStyles = {
    sm: "text-xs px-4 py-2 gap-2 h-9",
    md: "text-sm px-6 py-2.5 gap-2.5 h-11",
    lg: "text-base px-8 py-3.5 gap-3 h-13",
  };

  const variantStyles = {
    /* Amber Gold: Vortex Growth / Primary Action */
    amber:
      "bg-gradient-to-b from-[#F4BA00] to-[#E0A800] text-[#0A1628] font-semibold border border-[#FFD84D]/40 shadow-[0_4px_14px_rgba(244,186,0,0.35),0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.4)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(244,186,0,0.5),0_4px_8px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.6)] active:translate-y-0.5 active:shadow-[0_2px_8px_rgba(244,186,0,0.25)]",

    /* Electric Blue: Axon Intelligence / Secondary Action */
    blue:
      "bg-gradient-to-b from-[#3B82F6] to-[#2563EB] text-[#EFECE4] font-semibold border border-[#93C5FD]/30 shadow-[0_4px_14px_rgba(59,130,246,0.35),0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(59,130,246,0.5),0_4px_8px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.45)] active:translate-y-0.5 active:shadow-[0_2px_8px_rgba(59,130,246,0.25)]",

    /* Frosted Dark Glass Surface with soft illumination */
    glass:
      "bg-[#1b1e22] text-[#EFECE4] border border-white/[0.08] shadow-[0_4px_14px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)] hover:-translate-y-0.5 hover:bg-[#21252a] hover:border-white/20 hover:shadow-[0_8px_22px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.12)] active:translate-y-0.5 active:shadow-[0_2px_8px_rgba(0,0,0,0.5)]",

    /* Subtle Glass Outline */
    outline:
      "bg-transparent text-[#EFECE4] border border-[#EFECE4]/20 hover:-translate-y-0.5 hover:bg-white/[0.06] hover:border-white/40 hover:shadow-[0_6px_18px_rgba(0,0,0,0.3)] active:translate-y-0.5",

    /* Ghost button */
    ghost:
      "bg-transparent text-[#9AA3B2] hover:text-[#EFECE4] hover:bg-white/[0.05] p-2",
  };

  const content = (
    <>
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
      ) : null}
      <span className="relative z-10">{children}</span>
      {withArrow && (
        <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
      )}
    </>
  );

  if (asLink && href) {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return (
        <Link
          href={href}
          className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        >
          {content}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      disabled={disabled || loading}
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {content}
    </button>
  );
}
