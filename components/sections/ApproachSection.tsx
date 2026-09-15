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

export function ApproachSection() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { howWeWork } = homeContent;

  useLayoutEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".timeline-step",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#E9EDF2] text-[#090909] border-b-4 border-[#090909] py-16 sm:py-24 px-6 sm:px-12 lg:px-16"
    >
      <div className="max-w-[1560px] mx-auto">
        {/* Masthead */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b-4 border-[#090909]">
          <div className="max-w-2xl">
            <BauhausBadge variant="yellow" shape="square" size="sm" className="mb-4">
              {howWeWork.badge}
            </BauhausBadge>
            <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight uppercase leading-[0.98] text-[#090909]">
              {howWeWork.headline}
            </h2>
          </div>

          <div className="border-2 border-[#090909] bg-white p-4 shadow-[4px_4px_0px_0px_#090909] max-w-md">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#F23B32] block mb-1">
              PHILOSOPHY
            </span>
            <p className="font-body text-xs text-[#090909]/80 leading-relaxed">
              {howWeWork.conclusion}
            </p>
          </div>
        </div>

        {/* 6-Step Timeline Framework */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {howWeWork.steps.map((item, idx) => (
            <div
              key={idx}
              className="timeline-step bg-white border-4 border-[#090909] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#090909] flex flex-col justify-between hover:-translate-y-1 transition-transform"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-[#090909]">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#F23B32]">
                    STAGE
                  </span>
                  <div className="w-2.5 h-2.5 bg-[#090909]" aria-hidden="true" />
                </div>

                <h3 className="mt-4 font-heading font-black text-xl uppercase tracking-tight text-[#090909]">
                  {item.title}
                </h3>
              </div>

              <p className="mt-4 pt-4 border-t-2 border-[#090909]/10 font-body text-sm text-[#090909]/80 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
