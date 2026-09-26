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
    1: "shadow-box-sm",
    2: "shadow-box-md",
    3: "shadow-box-lg",
  };

  const glowHoverMap = {
    none: "hover:bg-[#21252a] hover:shadow-box-hover",
    blue: "hover:border-[#3B82F6]/50 hover:bg-[#21252a] hover:shadow-box-hover",
    amber: "hover:border-[#F4BA00]/50 hover:bg-[#21252a] hover:shadow-box-hover",
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
