"use client";

import React, { useRef, useLayoutEffect } from "react";
import { homeContent } from "@/data/content/home";
import { BauhausBadge } from "@/components/ui/BauhausBadge";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { getGSAP } from "@/lib/gsap";

export function WhyAxonSection() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { whyAxon } = homeContent;

  useLayoutEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const { gsap } = getGSAP();
    const ctx = gsap.context(() => {
      // Manifesto left-side reveal
      gsap.fromTo(
        "[data-manifesto-left]",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      // Staggered pillars reveal
      gsap.fromTo(
        ".pillar-box",
        { opacity: 0, y: 24, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: ".pillar-box",
            start: "top 80%",
            once: true,
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
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* Left Side: Manifesto Statement (5 cols, Deep Slate) */}
        <div
          data-manifesto-left
          className="lg:col-span-5 bg-[#0F2747] text-white p-8 sm:p-12 lg:p-16 border-b-4 lg:border-b-0 lg:border-r-4 border-[#090909] flex flex-col justify-between gap-10 will-change-[transform,opacity]"
        >
          <div>
            <BauhausBadge variant="yellow" shape="square" size="sm" className="mb-6">
              {whyAxon.badge}
            </BauhausBadge>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight uppercase leading-[1.05] text-white">
              TECHNOLOGY IS EVERYWHERE.<br />
              <span className="text-[#FFD447]">STRATEGIC THINKING ISN&apos;T.</span>
            </h2>

            <p className="mt-6 font-body text-base text-white/80 leading-relaxed">
              {whyAxon.subheading}
            </p>
          </div>

          <div className="p-6 bg-white/10 border-2 border-white/30 backdrop-blur-xs">
            <span className="font-mono text-xs uppercase tracking-widest text-[#FFD447] block mb-2 font-bold">
              THE AXONVORTEX PROMISE
            </span>
            <p className="font-heading font-bold text-base text-white uppercase leading-snug">
              Execution without strategy produces noise. Strategy with automation produces compound growth.
            </p>
          </div>
        </div>

        {/* Right Side: 6 Core Pillars Grid (7 cols, White) */}
        <div className="lg:col-span-7 bg-[#E9EDF2] p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {whyAxon.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="pillar-box bg-white border-2 border-[#090909] p-6 shadow-[4px_4px_0px_0px_#090909] flex flex-col justify-between hover:border-[#F23B32] transition-colors will-change-[transform,opacity]"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 border-b-2 border-[#090909]/10 pb-2">
                    <span className="font-mono text-xs font-bold text-[#F23B32]">
                      PILLAR
                    </span>
                    <span className="w-2.5 h-2.5 bg-[#090909]" />
                  </div>

                  <h3 className="font-heading font-black text-lg uppercase tracking-tight text-[#090909]">
                    {pillar.title}
                  </h3>

                  <p className="mt-3 font-body text-xs sm:text-sm text-[#090909]/75 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
