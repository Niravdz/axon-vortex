"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { SectionMasthead } from "@/components/ui/SectionMasthead";
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
  const activeCardIndexRef = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  const { solutionsOverview } = homeContent;
  const solutions = solutionsOverview.solutions;

  useLayoutEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !pinRef.current || !trackRef.current || !viewportRef.current) return;

    const { gsap } = getGSAP();
    const section = sectionRef.current;
    const pinContainer = pinRef.current;
    const track = trackRef.current;
    const progressBar = progressBarRef.current;

    const mm = gsap.matchMedia();

    // Universal Pinned Track Translation (Desktop & Mobile)
    mm.add("(min-width: 320px)", () => {
      const cards = track.querySelectorAll<HTMLElement>("article");
      const cardCount = solutions.length;
      if (cards.length === 0) return;

      const getCardOffset = (idx: number) => {
        if (!cards[idx]) return 0;
        return cards[idx].offsetLeft;
      };

      const isMobile = window.innerWidth < 1024;
      const scrollPerCard = isMobile ? 500 : 620;
      const totalScrollDistance = (cardCount - 1) * scrollPerCard + 350;

      const dwellDuration = 0.55;
      const slideDuration = 1.0;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScrollDistance}`,
          pin: pinContainer,
          pinSpacing: true,
          scrub: 0.25, // Snappy response without lagging drift
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const stepProgress = self.progress * (cardCount - 1);
            const settledIdx = Math.min(Math.round(stepProgress), cardCount - 1);
            if (settledIdx !== activeCardIndexRef.current) {
              activeCardIndexRef.current = settledIdx;
              setActiveCardIndex(settledIdx);
            }
          },
        },
      });

      // Build discrete plateau progression with explicit card reading holds
      for (let i = 0; i < cardCount - 1; i++) {
        // 1. Reading Dwell at Card i
        tl.to({}, { duration: dwellDuration });

        // 2. Smooth, continuous horizontal translation to Card i+1
        tl.to(
          track,
          {
            x: () => -getCardOffset(i + 1),
            ease: "power2.inOut",
            duration: slideDuration,
          }
        );
      }

      // 3. Final reading dwell on Card 05 before unpinning cleanly
      tl.to({}, { duration: dwellDuration });

      // Synchronized bottom progress bar
      if (progressBar) {
        tl.to(
          progressBar,
          {
            scaleX: 1,
            ease: "none",
            duration: tl.duration(),
          },
          0
        );
      }

      return () => {
        tl.kill();
      };
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
        className="services-pin relative w-full min-h-[100dvh] lg:h-screen flex flex-col justify-between overflow-hidden py-6 sm:py-8 lg:py-12 px-4 sm:px-6 md:px-12 max-w-[1720px] mx-auto"
      >
        {/* Top Section Masthead */}
        <SectionMasthead
          badge={solutionsOverview.badge}
          descriptor="ARCHITECTURAL CAPABILITIES"
          rightLabel={`0${activeCardIndex + 1} / 05 DOMAINS`}
          className="mb-3 lg:mb-6"
        />

        {/* ========================================================================= */}
        {/* 50/50 BALANCED STAGE (DESKTOP: SIDE-BY-SIDE / MOBILE: STACKED INTRO + TRACK) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 xl:gap-16 items-center flex-1 my-auto w-full">
          {/* ----------------------------------------------------------------------- */}
          {/* LEFT HALF (DESKTOP) / TOP INTRO (MOBILE)                                */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-6 flex flex-col justify-center gap-3 sm:gap-5 xl:gap-7">
            <div className="flex items-center gap-2">
              <Badge variant="dot">SYSTEM MATRIX</Badge>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[56px] 2xl:text-[62px] font-heading font-black uppercase tracking-tight text-editorial-primary leading-[1.04] break-words">
              ONE GROWTH PARTNER.<br className="hidden sm:inline" />
              MULTIPLE DIGITAL SOLUTIONS.
            </h2>

            <p className="text-xs sm:text-base text-editorial-secondary font-sans leading-relaxed max-w-xl">
              {solutionsOverview.philosophy}
            </p>

            <div className="hidden lg:flex items-center gap-2.5 text-xs font-mono text-brand-coral font-semibold pt-1">
              <span>EXPLORE ARCHITECTURE DOMAINS</span>
              <span>→</span>
            </div>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* RIGHT HALF (DESKTOP) / BOTTOM CARD TRACK (MOBILE)                       */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-6 relative w-full">
            {/* Clipped Outer Container */}
            <div
              ref={viewportRef}
              className="relative w-full h-[470px] sm:h-[500px] lg:h-[560px] xl:h-[600px] overflow-hidden rounded-[24px] sm:rounded-[36px] lg:rounded-[40px] border border-[#1E1E2E]/20 bg-[#F4F7FA]/70 backdrop-blur-md shadow-[0_8px_32px_-8px_rgba(15,39,71,0.08)] p-3 sm:p-4"
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
                      className={`w-full h-full flex-shrink-0 p-5 sm:p-8 xl:p-10 flex flex-col justify-between rounded-[18px] sm:rounded-[26px] lg:rounded-[30px] border bg-[#F4F7FA]/95 shadow-sm transition-colors duration-300 ${
                        !isLast ? "mr-4 sm:mr-6 lg:mr-8" : ""
                      } ${
                        isActive ? "border-brand-coral/70" : "border-[#1E1E2E]/15"
                      }`}
                      style={{ width: "100%" }}
                    >
                      {/* Top Metadata & Header Sequence */}
                      <div className="flex flex-col gap-2.5 sm:gap-3.5">
                        <div className="flex items-center justify-between border-b border-[#1E1E2E]/15 pb-2.5 sm:pb-3">
                          <div className="flex items-center gap-2.5 sm:gap-3">
                            <span className="font-mono text-xs sm:text-sm font-bold text-brand-coral">
                              0{idx + 1}
                            </span>
                            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-editorial-secondary font-medium">
                              ARCHITECTURE DOMAIN
                            </span>
                          </div>
                          <Plus className="w-4 h-4 text-editorial-secondary" />
                        </div>

                        <div>
                          <h3 className="text-xl sm:text-[28px] xl:text-[32px] font-heading font-bold uppercase tracking-tight text-editorial-primary mb-1 sm:mb-1.5 leading-snug break-words">
                            {svc.title}
                          </h3>
                          <p className="text-xs sm:text-[15px] xl:text-[15.5px] font-heading font-semibold text-brand-coral mb-1.5 sm:mb-2">
                            {svc.tagline}
                          </p>
                          <p className="text-xs sm:text-[13.5px] xl:text-[14px] text-editorial-secondary font-sans leading-relaxed">
                            {svc.description}
                          </p>
                        </div>

                        {/* Structured Rectangular Service Tiles Grid */}
                        <div className="pt-1.5 sm:pt-2">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2.5">
                            {svc.services.map((tag) => (
                              <div
                                key={tag}
                                className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-[4px] bg-[#F4F7FA] border border-[#1E1E2E]/12 shadow-xs"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-coral/70 shrink-0" />
                                <span className="text-[10px] sm:text-[11.5px] xl:text-[12px] font-mono text-editorial-primary font-medium leading-tight">
                                  {tag}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Card Bottom CTA Link */}
                      <div className="pt-3 sm:pt-4 border-t border-[#1E1E2E]/15 flex items-center justify-between">
                        <Link
                          href={svc.href}
                          className="inline-flex min-h-11 items-center gap-2 text-xs xl:text-sm font-heading font-bold uppercase tracking-wider text-editorial-primary hover:text-brand-coral transition-colors duration-200 group py-2"
                        >
                          <span>Explore Architecture</span>
                          <ArrowUpRight className="w-4 h-4 text-brand-coral transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
        <div className="relative z-20 w-full h-[2px] bg-[#1E1E2E]/10 mt-4 sm:mt-6">
          <div
            ref={progressBarRef}
            className="h-full w-full bg-brand-coral origin-left scale-x-0 will-change-transform"
          />
        </div>
      </div>
    </section>
  );
}
