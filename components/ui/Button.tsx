"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "yellow" | "outline" | "dark" | "ghost";
  size?: "sm" | "md" | "lg";
  withArrow?: boolean;
  magnetic?: boolean;
  asLink?: boolean;
  href?: string;
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
  ...props
}: ButtonProps) {
  const baseStyles =
    "group relative inline-flex items-center justify-center font-heading font-bold uppercase tracking-wider select-none rounded-none transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F23B32] focus-visible:ring-offset-2 hover:-translate-x-0.5 hover:-translate-y-0.5";

  const sizeStyles = {
    sm: "text-xs px-4 py-2 gap-2",
    md: "text-xs md:text-sm px-6 py-3.5 gap-2.5",
    lg: "text-sm md:text-base px-8 py-4 gap-3",
  };

  const variantStyles = {
    primary:
      "bg-[#F23B32] text-white border-2 border-[#090909] shadow-[4px_4px_0px_0px_#090909] hover:bg-[#d92c24] hover:shadow-[6px_6px_0px_0px_#090909] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#090909]",
    secondary:
      "bg-[#2F5FA7] text-white border-2 border-[#090909] shadow-[4px_4px_0px_0px_#090909] hover:bg-[#244d87] hover:shadow-[6px_6px_0px_0px_#090909] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#090909]",
    yellow:
      "bg-[#FFD447] text-[#090909] border-2 border-[#090909] shadow-[4px_4px_0px_0px_#090909] hover:bg-[#f5c633] hover:shadow-[6px_6px_0px_0px_#090909] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#090909]",
    outline:
      "bg-white text-[#090909] border-2 border-[#090909] shadow-[4px_4px_0px_0px_#090909] hover:bg-[#E9EDF2] hover:shadow-[6px_6px_0px_0px_#090909] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#090909]",
    dark:
      "bg-[#0F2747] text-white border-2 border-[#090909] shadow-[4px_4px_0px_0px_#090909] hover:bg-[#090909] hover:shadow-[6px_6px_0px_0px_#090909] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#090909]",
    ghost:
      "bg-transparent text-[#090909] border-b-2 border-[#090909] hover:text-[#F23B32] hover:border-[#F23B32] p-0 tracking-widest hover:translate-x-0.5",
  };

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {withArrow && (
        <ArrowUpRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1 group-hover:-translate-y-0.5 group-focus-visible:translate-x-1 shrink-0" />
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
          className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
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
          className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        >
          {content}
        </a>
      );
    }
  } else {
    buttonElement = (
      <button
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
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
