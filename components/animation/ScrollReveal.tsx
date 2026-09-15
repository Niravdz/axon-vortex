"use client";

import React, { useRef, useEffect } from "react";
import { getGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export type ScrollRevealVariant =
  | "fade-up"
  | "fade-left"
  | "fade-right"
  | "scale"
  | "line-horizontal"
  | "line-vertical"
  | "stagger"
  | "text-mask";

interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: ScrollRevealVariant;
  duration?: number;
  delay?: number;
  stagger?: number;
  threshold?: string; // e.g. "top 85%" (15% in viewport)
  className?: string;
  as?: "div" | "section" | "article" | "aside" | "header" | "footer" | "span";
}

export function ScrollReveal({
  children,
  variant = "fade-up",
  duration = 0.65,
  delay = 0,
  stagger = 0.08,
  threshold = "top 85%",
  className = "",
  as: Component = "div",
  ...props
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Keep 100% visible immediately if reduced motion is active or on SSR
    if (prefersReducedMotion || !elementRef.current) return;

    const { gsap } = getGSAP();
    const el = elementRef.current;

    const ctx = gsap.context(() => {
      let fromVars: gsap.TweenVars = { opacity: 0 };
      let toVars: gsap.TweenVars = {
        opacity: 1,
        duration,
        delay,
        ease: "power3.out",
        clearProps: "transform,opacity",
      };

      if (variant === "fade-up") {
        fromVars = { opacity: 0, y: 28 };
        toVars = { ...toVars, y: 0 };
        gsap.fromTo(el, fromVars, {
          ...toVars,
          scrollTrigger: {
            trigger: el,
            start: threshold,
            once: true,
          },
        });
      } else if (variant === "fade-left") {
        fromVars = { opacity: 0, x: -28 };
        toVars = { ...toVars, x: 0 };
        gsap.fromTo(el, fromVars, {
          ...toVars,
          scrollTrigger: {
            trigger: el,
            start: threshold,
            once: true,
          },
        });
      } else if (variant === "fade-right") {
        fromVars = { opacity: 0, x: 28 };
        toVars = { ...toVars, x: 0 };
        gsap.fromTo(el, fromVars, {
          ...toVars,
          scrollTrigger: {
            trigger: el,
            start: threshold,
            once: true,
          },
        });
      } else if (variant === "scale") {
        fromVars = { opacity: 0, scale: 0.96 };
        toVars = { ...toVars, scale: 1 };
        gsap.fromTo(el, fromVars, {
          ...toVars,
          scrollTrigger: {
            trigger: el,
            start: threshold,
            once: true,
          },
        });
      } else if (variant === "line-horizontal") {
        gsap.fromTo(
          el,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
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
      } else if (variant === "line-vertical") {
        gsap.fromTo(
          el,
          { scaleY: 0, transformOrigin: "top center" },
          {
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
      } else if (variant === "text-mask") {
        const textElements = el.querySelectorAll(".text-mask-inner");
        const targets = textElements.length > 0 ? textElements : el;
        gsap.fromTo(
          targets,
          { y: "115%", opacity: 0 },
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
      } else if (variant === "stagger") {
        const items = el.querySelectorAll("[data-stagger-item]");
        const targets = items.length > 0 ? items : el.children;
        gsap.fromTo(
          targets,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
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
      }
    }, elementRef);

    return () => ctx.revert();
  }, [variant, duration, delay, stagger, threshold, prefersReducedMotion]);

  return (
    <Component
      ref={elementRef}
      className={cn("will-change-[transform,opacity]", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
