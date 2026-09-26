"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "yellow" | "outline" | "dark" | "ghost" | "amber" | "blue" | "glass";
  size?: "sm" | "md" | "lg";
  withArrow?: boolean;
  magnetic?: boolean;
  asLink?: boolean;
  href?: string;
  loading?: boolean;
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  withArrow = false,
  magnetic = false,
  asLink = false,
  href,
  loading = false,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "group relative inline-flex items-center justify-center font-button font-medium select-none rounded-[8px] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electricBlue focus-visible:ring-offset-2 focus-visible:ring-offset-void disabled:cursor-not-allowed disabled:opacity-50 disabled:transform-none disabled:shadow-none";

  const sizeStyles = {
    sm: "text-xs px-4 py-2 gap-2 h-9",
    md: "text-sm px-6 py-2.5 gap-2.5 h-11",
    lg: "text-base px-8 py-3.5 gap-3 h-13",
  };

  const variantStyles: Record<string, string> = {
    /* Primary CTA / Growth: Amber Gold */
    primary:
      "bg-gradient-to-b from-[#F4BA00] to-[#E0A800] text-[#0A1628] font-semibold border border-[#FFD84D]/40 shadow-[0_4px_14px_rgba(244,186,0,0.35),0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.4)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(244,186,0,0.5),0_4px_8px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.6)] active:translate-y-0.5 active:shadow-[0_2px_8px_rgba(244,186,0,0.25)]",

    amber:
      "bg-gradient-to-b from-[#F4BA00] to-[#E0A800] text-[#0A1628] font-semibold border border-[#FFD84D]/40 shadow-[0_4px_14px_rgba(244,186,0,0.35),0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.4)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(244,186,0,0.5),0_4px_8px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.6)] active:translate-y-0.5 active:shadow-[0_2px_8px_rgba(244,186,0,0.25)]",

    yellow:
      "bg-gradient-to-b from-[#F4BA00] to-[#E0A800] text-[#0A1628] font-semibold border border-[#FFD84D]/40 shadow-[0_4px_14px_rgba(244,186,0,0.35),0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.4)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(244,186,0,0.5),0_4px_8px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.6)] active:translate-y-0.5 active:shadow-[0_2px_8px_rgba(244,186,0,0.25)]",

    /* Secondary Action / Intelligence: Electric Blue */
    secondary:
      "bg-gradient-to-b from-[#3B82F6] to-[#2563EB] text-[#EFECE4] font-semibold border border-[#93C5FD]/30 shadow-[0_4px_14px_rgba(59,130,246,0.35),0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(59,130,246,0.5),0_4px_8px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.45)] active:translate-y-0.5 active:shadow-[0_2px_8px_rgba(59,130,246,0.25)]",

    blue:
      "bg-gradient-to-b from-[#3B82F6] to-[#2563EB] text-[#EFECE4] font-semibold border border-[#93C5FD]/30 shadow-[0_4px_14px_rgba(59,130,246,0.35),0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(59,130,246,0.5),0_4px_8px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.45)] active:translate-y-0.5 active:shadow-[0_2px_8px_rgba(59,130,246,0.25)]",

    /* Dark Frosted Glass Surface */
    dark:
      "bg-[#1b1e22] text-[#EFECE4] border border-white/[0.08] shadow-[0_4px_14px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)] hover:-translate-y-0.5 hover:bg-[#21252a] hover:border-white/20 hover:shadow-[0_8px_22px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.12)] active:translate-y-0.5 active:shadow-[0_2px_8px_rgba(0,0,0,0.5)]",

    glass:
      "bg-[#1b1e22] text-[#EFECE4] border border-white/[0.08] shadow-[0_4px_14px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)] hover:-translate-y-0.5 hover:bg-[#21252a] hover:border-white/20 hover:shadow-[0_8px_22px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.12)] active:translate-y-0.5 active:shadow-[0_2px_8px_rgba(0,0,0,0.5)]",

    /* Outline with subtle glass border */
    outline:
      "bg-white/[0.04] backdrop-blur-sm text-[#EFECE4] border border-[#2D5BB9]/30 hover:-translate-y-0.5 hover:bg-white/[0.08] hover:border-[#3B82F6]/50 hover:shadow-[0_6px_18px_rgba(0,0,0,0.3)] active:translate-y-0.5",

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

  let buttonElement: React.ReactNode;

  if (asLink && href) {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      buttonElement = (
        <Link
          href={href}
          className={cn(baseStyles, sizeStyles[size], variantStyles[variant] || variantStyles.primary, className)}
        >
          {content}
        </Link>
      );
    } else {
      buttonElement = (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(baseStyles, sizeStyles[size], variantStyles[variant] || variantStyles.primary, className)}
        >
          {content}
        </a>
      );
    }
  } else {
    buttonElement = (
      <button
        disabled={disabled || loading}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant] || variantStyles.primary, className)}
        {...props}
      >
        {content}
      </button>
    );
  }

  if (magnetic) {
    return <Magnetic strength={0.2}>{buttonElement as React.ReactElement<{ className?: string }>}</Magnetic>;
  }

  return buttonElement;
}
