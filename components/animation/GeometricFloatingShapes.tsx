"use client";

import React, { useRef, useEffect } from "react";
import { getGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface GeometricFloatingShapesProps {
  className?: string;
  variant?: "hero" | "subtle" | "dots" | "square-circle";
}

export function GeometricFloatingShapes({
  className = "",
  variant = "subtle",
}: GeometricFloatingShapesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    // Check if touch device / mobile screen to conserve battery
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const { gsap } = getGSAP();
    const container = containerRef.current;
    const shapes = container.querySelectorAll<HTMLElement>("[data-float-shape]");

    const tweens: gsap.core.Tween[] = [];

    shapes.forEach((shape, i) => {
      const speed = parseFloat(shape.dataset.speed || "4");
      const distance = parseFloat(shape.dataset.distance || "12");
      const rotate = parseFloat(shape.dataset.rotate || "4");
      const direction = i % 2 === 0 ? 1 : -1;

      const tween = gsap.to(shape, {
        y: `+=${distance * direction}`,
        x: `-=${(distance * 0.5) * direction}`,
        rotation: `${rotate * direction}deg`,
        duration: speed,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      tweens.push(tween);
    });

    const handleVisibilityChange = () => {
      if (document.hidden) {
        tweens.forEach((t) => t.pause());
      } else {
        tweens.forEach((t) => t.resume());
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      tweens.forEach((t) => t.kill());
    };
  }, [prefersReducedMotion]);

  if (variant === "square-circle") {
    return (
      <div
        ref={containerRef}
        aria-hidden="true"
        className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      >
        <div
          data-float-shape
          data-speed="5.5"
          data-distance="14"
          data-rotate="5"
          className="absolute -top-6 -right-6 w-24 h-24 rounded-full border-2 border-brand-black/20 bg-brand-yellow/30"
        />
        <div
          data-float-shape
          data-speed="6.2"
          data-distance="10"
          data-rotate="-4"
          className="absolute -bottom-8 -left-8 w-20 h-20 border-2 border-brand-black/20 bg-brand-red/20"
        />
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div
        ref={containerRef}
        aria-hidden="true"
        className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      >
        <div
          data-float-shape
          data-speed="4.8"
          data-distance="8"
          data-rotate="3"
          className="absolute top-12 right-12 flex gap-1.5"
        >
          <span className="w-2 h-2 rounded-full bg-brand-red/60" />
          <span className="w-2 h-2 rounded-full bg-brand-yellow/60" />
          <span className="w-2 h-2 rounded-full bg-brand-blue/60" />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div
        data-float-shape
        data-speed="5"
        data-distance="12"
        data-rotate="4"
        className="absolute top-1/4 right-8 w-14 h-14 border-2 border-brand-black/15 bg-brand-yellow/20"
      />
      <div
        data-float-shape
        data-speed="6"
        data-distance="15"
        data-rotate="-5"
        className="absolute bottom-1/3 left-6 w-16 h-16 rounded-full border-2 border-brand-black/15 bg-brand-blue/15"
      />
    </div>
  );
}
