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
    1: "shadow-box-sm",
    2: "shadow-box-md",
    3: "shadow-box-lg",
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
        "bg-[#1b1e22] border border-white/[0.08] text-[#EFECE4]",
        radiusStyles[radius],
        elevationStyles[elevation],
        interactive &&
          "box-interactive hover:border-[#3B82F6]/40 hover:shadow-box-hover active:shadow-box-pressed",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
