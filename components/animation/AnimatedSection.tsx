"use client";

import React, { useRef, useLayoutEffect } from "react";
import { cn } from "@/lib/utils";
import { getGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface AnimatedSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
  staggerChildren?: string;
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up",
  staggerChildren,
  ...props
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const { gsap } = getGSAP();
    const el = sectionRef.current;

    const ctx = gsap.context(() => {
      let initialTransform = { y: 24, x: 0, scale: 1 };
      if (direction === "left") initialTransform = { y: 0, x: -28, scale: 1 };
      if (direction === "right") initialTransform = { y: 0, x: 28, scale: 1 };
      if (direction === "scale") initialTransform = { y: 16, x: 0, scale: 0.96 };

      const targets = staggerChildren ? el.querySelectorAll(staggerChildren) : el;

      gsap.fromTo(
        targets,
        {
          opacity: 0,
          ...initialTransform,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration: 0.75,
          delay,
          ease: "power3.out",
          stagger: staggerChildren ? 0.08 : 0,
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, delay, direction, staggerChildren]);

  return (
    <section
      ref={sectionRef}
      className={cn("relative w-full opacity-100", className)}
      {...props}
    >
      {children}
    </section>
  );
}
