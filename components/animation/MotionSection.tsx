"use client";

import React, { useRef, useEffect } from "react";
import { getGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export interface MotionSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  signature?: string;
  threshold?: string; // e.g. "top 82%"
  delay?: number;
  duration?: number;
  stagger?: number;
  direction?: "up" | "left" | "right" | "scale" | "radial";
  as?: "section" | "div" | "article";
  className?: string;
}

export function MotionSection({
  children,
  signature = "standard-reveal",
  threshold = "top 82%",
  delay = 0,
  duration = 0.75,
  stagger = 0.08,
  direction = "up",
  as: Component = "section",
  className = "",
  ...props
}: MotionSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // If reduced motion is requested or ref not available, keep 100% visible immediately
    if (prefersReducedMotion || !sectionRef.current) return;

    const { gsap } = getGSAP();
    const el = sectionRef.current;

    const ctx = gsap.context(() => {
      // Look for child elements with specific motion markup
      const cards = el.querySelectorAll("[data-motion-card]");
      const items = el.querySelectorAll("[data-motion-item]");
      const headings = el.querySelectorAll("[data-motion-title]");
      const lines = el.querySelectorAll("[data-motion-line]");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: threshold,
          once: true,
        },
      });

      // Directional parameters
      let startX = 0;
      let startY = 28;
      let startScale = 1;

      if (direction === "left") {
        startX = -36;
        startY = 0;
      } else if (direction === "right") {
        startX = 36;
        startY = 0;
      } else if (direction === "scale") {
        startY = 14;
        startScale = 0.95;
      } else if (direction === "radial") {
        startY = 20;
        startScale = 0.96;
      }

      // 1. Animate headings / masthead if present
      if (headings.length > 0) {
        tl.fromTo(
          headings,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            delay,
            ease: "power3.out",
            stagger: 0.08,
            clearProps: "transform,opacity",
          },
          0
        );
      }

      // 2. Animate architectural lines if present
      if (lines.length > 0) {
        tl.fromTo(
          lines,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "transform",
          },
          0.1
        );
      }

      // 3. Animate cards or stagger items
      const targetList = cards.length > 0 ? cards : items.length > 0 ? items : null;

      if (targetList && targetList.length > 0) {
        tl.fromTo(
          targetList,
          {
            opacity: 0,
            x: startX,
            y: startY,
            scale: startScale,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration,
            stagger,
            ease: "power3.out",
            clearProps: "transform,opacity",
          },
          headings.length > 0 ? 0.15 : 0
        );
      } else if (headings.length === 0 && lines.length === 0) {
        // Fallback: Animate container element itself
        tl.fromTo(
          el,
          {
            opacity: 0,
            x: startX,
            y: startY,
            scale: startScale,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration,
            delay,
            ease: "power3.out",
            clearProps: "transform,opacity",
          },
          0
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [signature, threshold, delay, duration, stagger, direction, prefersReducedMotion]);

  return (
    <Component
      ref={sectionRef as unknown as React.Ref<HTMLDivElement>}
      data-motion-signature={signature}
      className={cn("relative w-full opacity-100", className)}
      {...(props as React.HTMLAttributes<HTMLDivElement>)}
    >
      {children}
    </Component>
  );
}
