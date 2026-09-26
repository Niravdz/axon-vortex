"use client";

import React, { useRef, useLayoutEffect } from "react";
import { homeContent } from "@/data/content/home";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { getGSAP } from "@/lib/gsap";
import { MatteSection } from "@/components/ui/MatteSection";
import { RaisedCard } from "@/components/ui/RaisedCard";

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
      className="relative w-full bg-[#121519] text-[#EFECE4] border-b border-[#EFECE4]/[0.08] py-16 sm:py-24 px-4 sm:px-8 lg:px-12 overflow-hidden"
    >
      {/* Background Subtle Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 left-1/4 w-[500px] h-[400px] bg-[#F4BA00]/[0.05] rounded-full blur-[140px]"
      />

      <div className="max-w-7xl mx-auto">
        <MatteSection radius="24" className="overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left Side: Manifesto Statement (5 cols) */}
            <div
              data-manifesto-left
              className="lg:col-span-5 bg-[#1b1e22] text-[#EFECE4] p-8 sm:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/[0.08] flex flex-col justify-between gap-10 will-change-[transform,opacity]"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171a1e] border border-[#F4BA00]/30 text-xs font-mono tracking-wider text-[#F4BA00] mb-6 shadow-[0_2px_6px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F4BA00] animate-pulse" />
                  <span>{whyAxon.badge}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold tracking-tight uppercase leading-[1.08] text-[#EFECE4]">
                  Technology is everywhere.<br />
                  <span className="text-[#F4BA00]">Strategic thinking isn&apos;t.</span>
                </h2>

                <p className="mt-5 font-body text-sm sm:text-base text-[#9AA3B2] leading-relaxed">
                  {whyAxon.subheading}
                </p>
              </div>

              {/* Recessed Promise Panel */}
              <div className="p-6 rounded-[14px] bg-[#101215] border border-[#3B82F6]/25 shadow-[inset_0_2px_5px_rgba(0,0,0,0.78),inset_0_1px_1px_rgba(0,0,0,0.92),0_1px_0_rgba(255,255,255,0.04)]">
                <span className="font-mono text-xs uppercase tracking-widest text-[#3B82F6] block mb-2 font-semibold">
                  THE AXONVORTEX PROMISE
                </span>
                <p className="font-heading font-medium text-xs sm:text-sm text-[#EFECE4] leading-relaxed">
                  Execution without strategy produces noise. Strategy with automated systems produces compound, durable growth.
                </p>
              </div>
            </div>

            {/* Right Side: 6 Core Pillars Grid (7 cols) */}
            <div className="lg:col-span-7 bg-[#101215] p-6 sm:p-8 lg:p-10 shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 items-stretch">
                {whyAxon.pillars.map((pillar, idx) => (
                  <RaisedCard
                    key={idx}
                    radius="12"
                    glowOnHover="blue"
                    className="pillar-box p-6 flex flex-col justify-between group will-change-[transform,opacity]"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-3.5">
                        <span className="font-mono text-xs font-semibold text-[#3B82F6] px-2 py-0.5 rounded-[4px] bg-[#101215] border border-white/[0.04] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]/40 group-hover:bg-[#3B82F6] transition-colors" />
                      </div>

                      <h3 className="font-heading font-semibold text-base sm:text-lg text-[#EFECE4] group-hover:text-[#60A5FA] transition-colors leading-snug">
                        {pillar.title}
                      </h3>
                    </div>

                    <p className="mt-4 pt-3 border-t border-white/[0.06] font-body text-xs sm:text-sm text-[#9AA3B2] leading-relaxed">
                      {pillar.description}
                    </p>
                  </RaisedCard>
                ))}
              </div>
            </div>
          </div>
        </MatteSection>
      </div>
    </section>
  );
}
