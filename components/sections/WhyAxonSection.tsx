"use client";

import React, { useRef, useLayoutEffect } from "react";
import { Badge } from "@/components/ui/Badge";
import { homeContent } from "@/data/content/home";
import { getGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function WhyAxonSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { whyAxon } = homeContent;

  useLayoutEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !cardsRef.current) return;

    const { gsap } = getGSAP();
    const cards = cardsRef.current.querySelectorAll(".why-editorial-card");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 25 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="why-axon"
      className="relative z-10 py-24 lg:py-32 px-6 md:px-12 bg-transparent text-editorial-primary border-t border-border overflow-clip"
      style={{ isolation: "isolate" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border">
          <div className="flex flex-col gap-3 max-w-2xl">
            <Badge variant="dot">{whyAxon.badge}</Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold uppercase tracking-tight text-editorial-primary">
              {whyAxon.headline}
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-editorial-secondary max-w-md leading-relaxed">
            {whyAxon.subheading}
          </p>
        </div>

        {/* 6 Architectural Principle Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {whyAxon.pillars.map((pillar, idx) => (
            <article
              key={idx}
              className="why-editorial-card editorial-card p-8 flex flex-col justify-between min-h-[220px] group"
            >
              <div className="card-hover-accent" />

              <div className="card-shift-content flex flex-col justify-between h-full">
                <div className="flex items-center justify-between text-editorial-muted mb-4 border-b border-border pb-3">
                  <span className="font-mono text-xs text-accent-orange font-bold">
                    0{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-editorial-secondary">
                    PRINCIPLE
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-heading font-bold text-editorial-primary mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-editorial-secondary font-sans leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
