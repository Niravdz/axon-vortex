"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TactileButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "charcoal" | "ghost";
  size?: "sm" | "md" | "lg";
  withArrow?: boolean;
  asLink?: boolean;
  href?: string;
  loading?: boolean;
}

export function TactileButton({
  children,
  className,
  variant = "primary",
  size = "md",
  withArrow = false,
  asLink = false,
  href,
  loading = false,
  disabled,
  ...props
}: TactileButtonProps) {
  const baseStyles = cn(
    "group relative inline-flex items-center justify-center font-button font-medium select-none rounded-[8px] transition-all duration-200 cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electricBlue focus-visible:ring-offset-2 focus-visible:ring-offset-[#121519]",
    "disabled:cursor-not-allowed disabled:opacity-45 disabled:transform-none disabled:shadow-none"
  );

  const sizeStyles = {
    sm: "text-xs px-4 py-2 gap-2 h-9",
    md: "text-sm px-6 py-2.5 gap-2.5 h-11",
    lg: "text-base px-8 py-3.5 gap-3 h-13",
  };

  const variantStyles = {
    // Primary Growth CTA: Amber Gold with Tactile 3D Depth
    primary: cn(
      "bg-gradient-to-b from-[#F4BA00] to-[#DCA400] text-[#0D1014] font-semibold border border-[#FFD84D]/40",
      "shadow-[0_4px_14px_rgba(244,186,0,0.35),0_2px_4px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.45)]",
      "hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(244,186,0,0.5),0_4px_8px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.6)]",
      "active:translate-y-0.5 active:shadow-[0_1px_4px_rgba(244,186,0,0.2),inset_0_2px_4px_rgba(0,0,0,0.3)]"
    ),

    // Secondary Tech Accent: Electric Blue with Tactile 3D Depth
    secondary: cn(
      "bg-gradient-to-b from-[#3B82F6] to-[#2563EB] text-[#EFECE4] font-semibold border border-[#93C5FD]/30",
      "shadow-[0_4px_14px_rgba(59,130,246,0.35),0_2px_4px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.3)]",
      "hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(59,130,246,0.5),0_4px_8px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.45)]",
      "active:translate-y-0.5 active:shadow-[0_1px_4px_rgba(59,130,246,0.2),inset_0_2px_4px_rgba(0,0,0,0.3)]"
    ),

    // Charcoal Tactile Surface (From 3D UI Reference)
    charcoal: cn(
      "bg-[#20252B] text-[#EFECE4] border border-[#EFECE4]/[0.12]",
      "shadow-box-sm box-interactive",
      "hover:bg-[#282E36] hover:border-[#3B82F6]/50 hover:shadow-box-hover",
      "active:shadow-box-pressed"
    ),

    // Ghost
    ghost: cn(
      "bg-transparent text-[#9AA3B2] hover:text-[#EFECE4] hover:bg-[#20252B]/60 p-2"
    ),
  };

  const content = (
    <>
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
      ) : null}
      <span className="relative z-10">{children}</span>
      {withArrow && (
        <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0" />
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
