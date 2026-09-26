"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GlassSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "navy" | "subtle" | "elevated" | "accent-blue" | "accent-amber";
  radius?: "sm" | "md" | "lg" | "xl" | "full";
  borderWidth?: "subtle" | "standard" | "prominent";
  shadow?: "none" | "level-1" | "level-2" | "level-3" | "glow-blue" | "glow-amber";
  className?: string;
  glowEdge?: "none" | "blue" | "amber";
}

export function GlassSurface({
  children,
  variant = "navy",
  radius = "lg",
  borderWidth = "standard",
  shadow = "level-2",
  glowEdge = "none",
  className,
  ...props
}: GlassSurfaceProps) {
  const variantStyles = {
    navy: "bg-[#1b1e22]/90 backdrop-blur-md",
    subtle: "bg-[#171a1e]/85 backdrop-blur-sm",
    elevated: "bg-[#21252a]/95 backdrop-blur-lg",
    "accent-blue": "bg-[#1b1e22]/95 backdrop-blur-md",
    "accent-amber": "bg-[#1b1e22]/95 backdrop-blur-md",
  };

  const radiusStyles = {
    sm: "rounded-[4px]",
    md: "rounded-[8px]",
    lg: "rounded-[12px]",
    xl: "rounded-[16px]",
    full: "rounded-full",
  };

  const borderStyles = {
    subtle: "border border-white/[0.04]",
    standard: "border border-white/[0.08]",
    prominent: "border-[1.5px] border-[#3B82F6]/40",
  };

  const shadowStyles = {
    none: "",
    "level-1": "shadow-[0_4px_14px_-2px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]",
    "level-2": "shadow-[0_10px_28px_-4px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)]",
    "level-3": "shadow-[0_20px_48px_-8px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)]",
    "glow-blue": "shadow-[0_0_24px_rgba(59,130,246,0.25),0_8px_24px_-4px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)]",
    "glow-amber": "shadow-[0_0_24px_rgba(244,186,0,0.25),0_8px_24px_-4px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)]",
  };

  const glowStyles = {
    none: "",
    blue: "after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:bg-gradient-to-r after:from-transparent after:via-[#3B82F6] after:to-transparent after:opacity-80",
    amber: "after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:bg-gradient-to-r after:from-transparent after:via-[#F4BA00] after:to-transparent after:opacity-80",
  };

  return (
    <div
      className={cn(
        "relative transition-all duration-200",
        variantStyles[variant],
        radiusStyles[radius],
        borderStyles[borderWidth],
        shadowStyles[shadow],
        glowStyles[glowEdge],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
