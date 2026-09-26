"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GlowProps {
  children?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "radial";
  intensity?: "subtle" | "medium" | "prominent";
  pulsing?: boolean;
}

export function AmberGlow({
  children,
  className,
  size = "md",
  intensity = "medium",
  pulsing = false,
}: GlowProps) {
  const intensityMap = {
    subtle: "opacity-30",
    medium: "opacity-60",
    prominent: "opacity-90",
  };

  const sizeMap = {
    sm: "w-32 h-16 blur-xl",
    md: "w-64 h-32 blur-2xl",
    lg: "w-96 h-48 blur-3xl",
    radial: "w-full h-full blur-3xl rounded-full",
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <div
        aria-hidden="true"
        className={cn(
          "absolute pointer-events-none rounded-full bg-gradient-to-r from-[#F4BA00] via-[#FBBF24] to-[#F59E0B]",
          sizeMap[size],
          intensityMap[intensity],
          pulsing && "pulse-amber"
        )}
      />
      {children}
    </div>
  );
}
