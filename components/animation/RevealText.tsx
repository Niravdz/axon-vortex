"use client";

import React, { useRef, useEffect } from "react";
import { getGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface RevealTextProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "div" | "span";
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  threshold?: string;
}

export function RevealText({
  children,
  as: Component = "h2",
  className = "",
  delay = 0,
  duration = 0.8,
  stagger = 0.08,
  threshold = "top 85%",
}: RevealTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const { gsap } = getGSAP();
    const el = containerRef.current;

    const ctx = gsap.context(() => {
      // Find all masked lines inside the component
      const lines = el.querySelectorAll(".reveal-text-line");
      const targets = lines.length > 0 ? lines : el;

      gsap.fromTo(
        targets,
        {
          y: "110%",
          opacity: 0,
        },
        {
          y: "0%",
          opacity: 1,
          duration,
          delay,
          stagger,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: el,
            start: threshold,
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [delay, duration, stagger, threshold, prefersReducedMotion]);

  return (
    <Component
      ref={containerRef as React.RefObject<HTMLHeadingElement>}
      className={cn("reveal-text-container", className)}
    >
      {children}
    </Component>
  );
}

/**
 * Line wrapper for RevealText that sets up the clean vertical mask.
 * Adds subtle bottom padding so letter descenders (g, y, p, q, j) are never clipped.
 */
export function RevealLine({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("block overflow-hidden pb-1 -mb-1", className)}>
      <span className="reveal-text-line block will-change-[transform,opacity]">
        {children}
      </span>
    </span>
  );
}
