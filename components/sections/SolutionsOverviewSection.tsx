"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { homeContent } from "@/data/content/home";
import { getGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function SolutionsOverviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const { solutionsOverview } = homeContent;
  const solutions = solutionsOverview.solutions;

  useLayoutEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !pinRef.current || !trackRef.current || !viewportRef.current) return;

    const { gsap } = getGSAP();
    const section = sectionRef.current;
    const pinContainer = pinRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const progressBar = progressBarRef.current;

    const mm = gsap.matchMedia();

    // Desktop: Pinned 50/50 Layout with Full-Width Single-Card Track Translation & Final Reading Hold
    mm.add("(min-width: 1024px)", () => {
      // Measure the exact offset of the last card relative to the track's origin
      const getFinalTranslation = () => {
        const lastCard = track.querySelector("article:last-child") as HTMLElement | null;
        return lastCard ? lastCard.offsetLeft : Math.max(0, track.scrollWidth - viewport.clientWidth);
      };

      // 1.0 for active horizontal travel + 0.22 for scroll-controlled final hold (~18-20vh)
      const travelDuration = 1.0;
      const holdDuration = 0.22;
      const totalTimelineDuration = travelDuration + holdDuration;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getFinalTranslation() + window.innerHeight * 0.20 + 900}`,
          pin: pinContainer,
          pinSpacing: true,
          scrub: 0.35,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const travelProgress = Math.min(1, self.progress / (travelDuration / totalTimelineDuration));
            const idx = Math.min(
              Math.floor(travelProgress * solutions.length),
              solutions.length - 1
            );
            setActiveCardIndex(idx);
          },
        },
      });

      // 1. Continuous, smooth horizontal track translation to exact Card 05 resting alignment
      tl.to(
        track,
        {
          x: () => -getFinalTranslation(),
          ease: "none",
          duration: travelDuration,
        },
        0
      );

      // 2. Synchronized bottom progress bar (completes upon Card 05 alignment)
      if (progressBar) {
        tl.to(
          progressBar,
          {
            scaleX: 1,
            ease: "none",
            duration: travelDuration,
          },
          0
        );
      }

      // 3. Explicit scroll-controlled final hold where Card 05 remains 100% stationary before release
      tl.to({}, { duration: holdDuration }, travelDuration);

      return () => {
        tl.kill();
      };
    });

    // Mobile / Tablet: Natural Vertical Flow
    mm.add("(max-width: 1023px)", () => {
      gsap.set(track, { clearProps: "all" });
      gsap.set(pinContainer, { clearProps: "all" });
    });

    return () => mm.revert();
  }, [prefersReducedMotion, solutions.length]);

  return (
    <section
      ref={sectionRef}
      id="services-sequence"
      className="services-section relative w-full bg-transparent text-editorial-primary border-t border-border"
      style={{ isolation: "isolate" }}
    >
      <div
        ref={pinRef}
        className="services-pin relative w-full min-h-screen lg:h-screen flex flex-col justify-between overflow-hidden py-8 lg:py-12 px-6 sm:px-8 md:px-12 max-w-[1720px] mx-auto"
      >
        {/* Top Section Header HUD */}
        <div className="relative z-20 flex items-center justify-between border-b border-border pb-4 mb-4 lg:mb-6">
          <div className="flex items-center gap-3">
            <Badge variant="code">{solutionsOverview.badge}</Badge>
            <span className="text-[11px] font-mono text-editorial-secondary uppercase hidden sm:inline tracking-widest">
              ARCHITECTURAL CAPABILITIES
            </span>
          </div>

          <span className="text-xs font-mono font-bold text-accent-orange uppercase tracking-widest">
            0{activeCardIndex + 1} / 05 DOMAINS
          </span>
        </div>

        {/* ========================================================================= */}
        {/* 50/50 BALANCED DESKTOP STAGE: LEFT INTRO (STATIONARY) / RIGHT CARD TRACK  */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center flex-1 my-auto w-full">
          {/* ----------------------------------------------------------------------- */}
          {/* LEFT HALF (STATIONARY): Oversized Dominant Heading & Introduction       */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-6 flex flex-col justify-center gap-5 xl:gap-7">
            <div className="flex items-center gap-2">
              <Badge variant="dot">SYSTEM MATRIX</Badge>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[56px] 2xl:text-[62px] font-heading font-black uppercase tracking-tight text-editorial-primary leading-[1.04]">
              ONE GROWTH PARTNER.<br className="hidden sm:inline" />
              MULTIPLE DIGITAL SOLUTIONS.
            </h2>

            <p className="text-sm sm:text-base text-editorial-secondary font-sans leading-relaxed max-w-xl">
              {solutionsOverview.philosophy}
            </p>

            <div className="hidden lg:flex items-center gap-2.5 text-xs font-mono text-accent-orange font-semibold pt-1">
              <span>EXPLORE ARCHITECTURE DOMAINS</span>
              <span>→</span>
            </div>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* RIGHT HALF: Clipped Viewport with Full-Width Solution Cards (40px/28px) */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-6 relative w-full">
            {/* Outer Container with ~40px corner radius & comfortable inset padding */}
            <div
              ref={viewportRef}
              className="relative w-full h-[520px] sm:h-[540px] lg:h-[560px] xl:h-[600px] overflow-hidden rounded-[36px] sm:rounded-[40px] border border-[#0F2747]/20 bg-[#FFF8EC]/70 backdrop-blur-md shadow-[0_8px_32px_-8px_rgba(15,39,71,0.08)] p-3.5 sm:p-4"
            >
              {/* Continuous Horizontal Flex Track (Full-Width Cards with Gap) */}
              <div
                ref={trackRef}
                className="flex items-stretch h-full will-change-transform"
              >
                {solutions.map((svc, idx) => {
                  const isActive = activeCardIndex === idx;
                  const isLast = idx === solutions.length - 1;

                  return (
                    <article
                      key={svc.id}
                      className={`w-full h-full flex-shrink-0 p-7 sm:p-9 xl:p-10 flex flex-col justify-between rounded-[26px] sm:rounded-[30px] border bg-[#FFF8EC]/95 shadow-sm transition-colors duration-300 ${
                        !isLast ? "mr-6 sm:mr-8" : ""
                      } ${
                        isActive ? "border-accent-orange/70" : "border-[#0F2747]/15"
                      }`}
                      style={{ width: "100%" }}
                    >
                      {/* Top Metadata & Header Sequence */}
                      <div className="flex flex-col gap-3.5">
                        <div className="flex items-center justify-between border-b border-[#0F2747]/15 pb-3">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-sm font-bold text-accent-orange">
                              0{idx + 1}
                            </span>
                            <span className="text-[11px] font-mono uppercase tracking-widest text-editorial-secondary font-medium">
                              ARCHITECTURE DOMAIN
                            </span>
                          </div>
                          <Plus className="w-4 h-4 text-editorial-secondary" />
                        </div>

                        <div>
                          <h3 className="text-2xl sm:text-[28px] xl:text-[32px] font-heading font-bold uppercase tracking-tight text-editorial-primary mb-1.5 leading-snug">
                            {svc.title}
                          </h3>
                          <p className="text-[14px] sm:text-[15px] xl:text-[15.5px] font-heading font-semibold text-accent-orange mb-2">
                            {svc.tagline}
                          </p>
                          <p className="text-[13px] sm:text-[13.5px] xl:text-[14px] text-editorial-secondary font-sans leading-relaxed">
                            {svc.description}
                          </p>
                        </div>

                        {/* Structured 2-Column Rectangular Service Tiles Grid */}
                        <div className="pt-2">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                            {svc.services.map((tag) => (
                              <div
                                key={tag}
                                className="flex items-center gap-2 px-3 py-2 rounded-[4px] bg-[#FFF8EC] border border-[#0F2747]/12 shadow-xs"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-orange/70 shrink-0" />
                                <span className="text-[11px] sm:text-[11.5px] xl:text-[12px] font-mono text-editorial-primary font-medium leading-tight">
                                  {tag}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Card Bottom CTA Link */}
                      <div className="pt-4 border-t border-[#0F2747]/15 flex items-center justify-between">
                        <Link
                          href={svc.href}
                          className="inline-flex items-center gap-2 text-xs xl:text-sm font-heading font-bold uppercase tracking-wider text-editorial-primary hover:text-accent-orange transition-colors duration-200 group"
                        >
                          <span>Explore Architecture</span>
                          <ArrowUpRight className="w-4 h-4 text-accent-orange transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Progress Bar */}
        <div className="relative z-20 w-full h-[2px] bg-[#0F2747]/10 mt-6">
          <div
            ref={progressBarRef}
            className="h-full w-full bg-accent-orange origin-left scale-x-0 will-change-transform"
          />
        </div>
      </div>
    </section>
  );
}
