"use client";

import React, { useRef, useLayoutEffect } from "react";
import { cn } from "@/lib/utils";
import { getGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface ParallaxLayerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  speed?: number; // e.g. -0.2 (slower) to 0.4 (faster)
  className?: string;
}

export function ParallaxLayer({
  children,
  speed = 0.15,
  className,
  ...props
}: ParallaxLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion || !layerRef.current) return;

    const { gsap } = getGSAP();
    const el = layerRef.current;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: () => speed * 120,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, layerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, speed]);

  return (
    <div ref={layerRef} className={cn("will-change-transform", className)} {...props}>
      {children}
    </div>
  );
}
