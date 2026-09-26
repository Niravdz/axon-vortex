"use client";

import React, { useRef, useEffect, useState } from "react";
import { getGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
}

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className = "",
  decimals = 0,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState<string>(`${prefix}${value}${suffix}`);
  const containerRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) {
      setDisplayValue(`${prefix}${value}${suffix}`);
      return;
    }

    const { gsap } = getGSAP();
    const el = containerRef.current;

    const counterObj = { val: 0 };

    const ctx = gsap.context(() => {
      gsap.to(counterObj, {
        val: value,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          const formatted =
            decimals > 0
              ? counterObj.val.toFixed(decimals)
              : Math.round(counterObj.val).toString();
          setDisplayValue(`${prefix}${formatted}${suffix}`);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [value, prefix, suffix, duration, decimals, prefersReducedMotion]);

  return (
    <span ref={containerRef} className={cn("font-mono font-bold tabular-nums", className)}>
      {displayValue}
    </span>
  );
}
