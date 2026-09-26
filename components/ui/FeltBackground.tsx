import React from "react";
import { cn } from "@/lib/utils";

interface FeltBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  withGlow?: boolean;
  withVignette?: boolean;
}

export function FeltBackground({
  children,
  className,
  withGlow = true,
  withVignette = false,
}: FeltBackgroundProps) {
  return (
    <div
      className={cn(
        "relative w-full bg-[#121519] text-[#EFECE4] overflow-hidden",
        className
      )}
    >
      {/* 1. Atmospheric Ambient Glow */}
      {withGlow && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 left-1/4 w-[600px] h-[500px] rounded-full bg-[#2D5BB9]/10 blur-[130px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 right-1/4 w-[500px] h-[400px] rounded-full bg-[#F4BA00]/06 blur-[120px]"
          />
        </>
      )}

      {/* 2. Fine Grain Texture Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='feltNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23feltNoise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 3. Optional Surface Vignette */}
      {withVignette && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 surface-vignette"
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
