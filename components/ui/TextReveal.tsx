"use client";

import React, { useRef, useEffect } from "react";
import { getGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  stagger?: number;
  triggerOnScroll?: boolean;
}

export function TextReveal({
  text,
  className,
  tag: Tag = "h1",
  delay = 0.2,
  stagger = 0.03,
  triggerOnScroll = false,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const words = text.split(" ");

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const { gsap } = getGSAP();
    const el = containerRef.current;
    const wordElements = el.querySelectorAll(".reveal-word-inner");

    const ctx = gsap.context(() => {
      if (triggerOnScroll) {
        gsap.fromTo(
          wordElements,
          { y: "110%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 1,
            stagger: stagger,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      } else {
        gsap.fromTo(
          wordElements,
          { y: "110%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 1,
            delay: delay,
            stagger: stagger,
            ease: "power3.out",
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [delay, stagger, triggerOnScroll, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    // @ts-expect-error - Tag dynamic component polymorphism
    <Tag ref={containerRef} className={cn("inline-block overflow-hidden", className)}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden mr-[0.28em] last:mr-0 align-top"
        >
          <span className="reveal-word-inner inline-block will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}
