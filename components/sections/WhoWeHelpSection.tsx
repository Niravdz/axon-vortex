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

export function WhoWeHelpSection() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { whoWeHelp } = homeContent;

  useLayoutEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".matrix-cell",
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
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
      className="relative w-full bg-white text-[#090909] border-b-4 border-[#090909] py-16 sm:py-24 px-6 sm:px-12 lg:px-16"
    >
      <div className="max-w-[1560px] mx-auto">
        {/* Masthead */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b-4 border-[#090909]">
          <div>
            <BauhausBadge variant="blue" shape="square" size="sm" className="mb-4">
              {whoWeHelp.badge}
            </BauhausBadge>
            <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight uppercase leading-[1.0] text-[#090909]">
              {whoWeHelp.headline}
            </h2>
          </div>

          <span className="font-mono text-xs uppercase tracking-widest text-[#090909]/60 font-bold">
            STAGE & SITUATION MATRIX
          </span>
        </div>

        {/* Structured 3x2 Matrix with Thick Grid Lines */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-4 border-[#090909] mt-12 bg-[#090909] gap-[2px]">
          {whoWeHelp.audiences.map((aud, idx) => (
            <div
              key={idx}
              className="matrix-cell bg-white p-8 sm:p-10 flex flex-col justify-between min-h-[240px] hover:bg-[#FFD447]/20 transition-colors group"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b-2 border-[#090909]/10">
                  <span className="font-mono text-sm font-bold text-[#F23B32]">
                    CASE 0{idx + 1}
                  </span>
                  <div className="w-3 h-3 border border-[#090909] bg-white group-hover:bg-[#F23B32] transition-colors" />
                </div>

                <h3 className="mt-4 font-heading font-black text-xl uppercase tracking-tight text-[#090909] group-hover:text-[#F23B32] transition-colors">
                  {aud.title}
                </h3>
              </div>

              <p className="mt-4 font-body text-sm text-[#090909]/75 leading-relaxed">
                {aud.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
