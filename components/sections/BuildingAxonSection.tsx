"use client";

import React, { useRef, useLayoutEffect } from "react";
import { homeContent } from "@/data/content/home";
import { BauhausBadge } from "@/components/ui/BauhausBadge";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function BuildingAxonSection() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { buildingAxon } = homeContent;

  useLayoutEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".building-row",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white text-[#090909] border-b-4 border-[#090909]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Editorial Manifesto (5 cols, Soft Gray) */}
        <div className="lg:col-span-5 bg-[#E9EDF2] p-8 sm:p-12 lg:p-16 border-b-4 lg:border-b-0 lg:border-r-4 border-[#090909] flex flex-col justify-between gap-8">
          <div>
            <BauhausBadge variant="red" shape="square" size="sm" className="mb-6">
              {buildingAxon.badge}
            </BauhausBadge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight uppercase leading-[1.02] text-[#090909]">
              {buildingAxon.headline}
            </h2>
            <p className="mt-6 font-body text-base text-[#090909]/80 leading-relaxed">
              {buildingAxon.intro}
            </p>
          </div>

          <div className="p-6 bg-[#F23B32] text-white border-2 border-[#090909] shadow-[4px_4px_0px_0px_#090909]">
            <span className="font-mono text-xs uppercase tracking-widest text-[#FFD447] block mb-2 font-bold">
              TRANSPARENCY STANDARD
            </span>
            <p className="font-heading font-bold text-base uppercase leading-snug">
              &ldquo;{buildingAxon.closing}&rdquo;
            </p>
          </div>
        </div>

        {/* Right 5-Point Roadmap List (7 cols, White) */}
        <div className="lg:col-span-7 bg-white divide-y-2 divide-[#090909]">
          {buildingAxon.points.map((pt, idx) => (
            <div
              key={idx}
              className="building-row p-6 sm:p-8 flex items-start sm:items-center justify-between gap-4 sm:gap-6 hover:bg-[#E9EDF2]/40 transition-colors group"
            >
              <div className="flex-1">
                <h3 className="font-heading font-bold text-lg uppercase tracking-tight text-[#090909] group-hover:text-[#F23B32] transition-colors">
                  {pt.title}
                </h3>
                <p className="mt-1 font-body text-sm text-[#090909]/70 leading-relaxed">
                  {pt.description}
                </p>
              </div>
              <div className="w-2.5 h-2.5 bg-[#090909] group-hover:bg-[#F23B32] transition-colors shrink-0 hidden sm:block" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
