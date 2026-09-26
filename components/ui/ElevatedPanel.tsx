"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ElevatedPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  elevation?: 1 | 2 | 3;
  radius?: "sm" | "md" | "lg" | "xl";
  className?: string;
  interactive?: boolean;
}

export function ElevatedPanel({
  children,
  elevation = 2,
  radius = "lg",
  interactive = false,
  className,
  ...props
}: ElevatedPanelProps) {
  const elevationStyles = {
    1: "shadow-[0_4px_14px_-2px_rgba(0,0,0,0.72),0_2px_6px_-1px_rgba(0,0,0,0.38),inset_0_1px_0_0_rgba(255,255,255,0.08)]",
    2: "shadow-[0_16px_36px_-6px_rgba(0,0,0,0.72),0_6px_14px_-3px_rgba(0,0,0,0.38),inset_0_1px_0_0_rgba(255,255,255,0.08)]",
    3: "shadow-[0_24px_50px_-8px_rgba(0,0,0,0.85),0_8px_18px_-4px_rgba(0,0,0,0.45),inset_0_1px_0_0_rgba(255,255,255,0.12)]",
  };

  const radiusStyles = {
    sm: "rounded-[6px]",
    md: "rounded-[10px]",
    lg: "rounded-[14px]",
    xl: "rounded-[20px]",
  };

  return (
    <div
      className={cn(
        "bg-[#1b1e22] border border-white/[0.08] text-[#EFECE4] transition-all duration-200",
        radiusStyles[radius],
        elevationStyles[elevation],
        interactive &&
          "hover:-translate-y-1 hover:border-[#3B82F6]/40 hover:shadow-[0_20px_42px_-6px_rgba(0,0,0,0.8),0_0_18px_rgba(59,130,246,0.2),inset_0_1px_0_0_rgba(255,255,255,0.14)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
