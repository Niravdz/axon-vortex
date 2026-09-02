"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
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
    "group relative inline-flex items-center justify-center font-heading font-semibold uppercase tracking-widest text-[11px] select-none rounded-sm transition-all duration-300 overflow-hidden";

  const sizeStyles = {
    sm: "px-5 py-2.5 gap-2",
    md: "px-6 py-3.5 gap-2.5",
    lg: "px-8 py-4.5 gap-3",
  };

  const variantStyles = {
    primary:
      "bg-brand-coral text-brand-navy border border-brand-coral hover:bg-brand-navy hover:border-brand-navy hover:text-white shadow-sm",
    secondary:
      "bg-white/80 backdrop-blur-sm text-brand-navy border border-border hover:border-brand-turquoise hover:bg-white hover:text-brand-turquoise",
    outline:
      "bg-transparent text-brand-navy border border-brand-navy hover:border-brand-turquoise hover:bg-brand-turquoise hover:text-white",
    ghost:
      "text-editorial-secondary hover:text-brand-turquoise border-none p-0 bg-transparent tracking-normal capitalize font-sans text-xs",
  };

  const content = (
    <span className="relative z-10 flex items-center gap-2">
      <span>{children}</span>
      {withArrow && (
        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </span>
  );

  const buttonElement = asLink && href ? (
    <a
      href={href}
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
    >
      {content}
    </a>
  ) : (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {content}
    </button>
  );

  if (magnetic) {
    return <Magnetic strength={0.25}>{buttonElement}</Magnetic>;
  }

  return buttonElement;
}
