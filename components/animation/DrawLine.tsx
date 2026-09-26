"use client";

import React, { useRef, useEffect } from "react";
import { getGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface DrawLineProps {
  orientation?: "horizontal" | "vertical";
  color?: "blue" | "amber" | "gradient" | "subtle";
  duration?: number;
  delay?: number;
  threshold?: string;
  className?: string;
}

export function DrawLine({
  orientation = "horizontal",
  color = "blue",
  duration = 0.85,
  delay = 0,
  threshold = "top 85%",
  className = "",
}: DrawLineProps) {
  const lineRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !lineRef.current) return;

    const { gsap } = getGSAP();
    const el = lineRef.current;

    const isHorizontal = orientation === "horizontal";

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        isHorizontal
          ? { scaleX: 0, transformOrigin: "left center" }
          : { scaleY: 0, transformOrigin: "top center" },
        {
          scaleX: 1,
          scaleY: 1,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: threshold,
            once: true,
          },
        }
      );
    }, lineRef);

    return () => ctx.revert();
  }, [orientation, duration, delay, threshold, prefersReducedMotion]);

  const colorClasses = {
    blue: "bg-[#3B82F6]",
    amber: "bg-[#F4BA00]",
    gradient: "bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-[#F4BA00]",
    subtle: "bg-white/[0.08]",
  };

  return (
    <div
      ref={lineRef}
      className={cn(
        orientation === "horizontal" ? "w-full h-px" : "w-px h-full",
        colorClasses[color],
        "will-change-transform",
        className
      )}
      aria-hidden="true"
    />
  );
}
