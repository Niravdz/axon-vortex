"use client";

import React, { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface DimensionalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  elevation?: 1 | 2 | 3 | "level1" | "level2" | "level3";
  glowOnHover?: "blue" | "amber" | "none";
  glowColor?: "blue" | "amber" | "none";
  enableTilt?: boolean;
  className?: string;
}

export function DimensionalCard({
  children,
  elevation = 2,
  glowOnHover,
  glowColor,
  enableTilt = true,
  className,
  ...props
}: DimensionalCardProps) {
  const activeGlow = glowColor || glowOnHover || "blue";
  const numElevation: 1 | 2 | 3 =
    elevation === "level1" ? 1 : elevation === "level3" ? 3 : typeof elevation === "number" ? elevation : 2;
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !enableTilt || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Restrained tilt max 2-3 degrees as requested
      const rotateX = ((y - centerY) / centerY) * -2.5;
      const rotateY = ((x - centerX) / centerX) * 2.5;

      setTilt({ x: rotateX, y: rotateY });
    },
    [prefersReducedMotion, enableTilt]
  );

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const elevationMap = {
    1: "shadow-[0_4px_14px_-2px_rgba(0,0,0,0.72),0_2px_6px_-1px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)]",
    2: "shadow-[0_10px_26px_-4px_rgba(0,0,0,0.75),0_4px_10px_-2px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.12)]",
    3: "shadow-[0_18px_40px_-6px_rgba(0,0,0,0.85),0_6px_14px_-2px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.16)]",
  };

  const glowHoverMap = {
    none: "hover:bg-[#21252a]",
    blue: "hover:border-[#3B82F6]/50 hover:bg-[#21252a] hover:shadow-[0_14px_32px_-4px_rgba(0,0,0,0.8),0_0_20px_rgba(59,130,246,0.22),inset_0_1px_0_rgba(255,255,255,0.18)]",
    amber: "hover:border-[#F4BA00]/50 hover:bg-[#21252a] hover:shadow-[0_14px_32px_-4px_rgba(0,0,0,0.8),0_0_20px_rgba(244,186,0,0.22),inset_0_1px_0_rgba(255,255,255,0.18)]",
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform:
          isHovered && !prefersReducedMotion && enableTilt
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-3px)`
            : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)",
      }}
      className={cn(
        "relative rounded-[12px] bg-[#171a1e] border border-white/[0.08] text-[#EFECE4] transition-all duration-200 overflow-hidden",
        elevationMap[numElevation],
        glowHoverMap[activeGlow],
        className
      )}
      {...props}
    >
      {/* Soft Top Highlight Edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.14] to-transparent"
      />
      {children}
    </div>
  );
}
