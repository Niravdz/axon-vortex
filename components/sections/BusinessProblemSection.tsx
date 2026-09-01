"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { getGSAP } from "@/lib/gsap";
import { homeContent } from "@/data/content/home";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

// Distinct subtle brand-tinted solid card background surfaces with 3px derived borders and 4-sided diffused shadows
const CARD_THEMES = [
  {
    gradient: "bg-gradient-to-br from-[#FFF6E9] via-[#FFF1E0] to-[#FFE7CE]",
    border: "border-[3px] border-[#B39A82]", // 70% #FFF1E0 + 30% Black (3px)
    shadow: "shadow-[0_0_28px_5px_rgba(179,154,130,0.25)]", // 4-sided diffused shadow
    badgeBg: "bg-[rgba(255,138,0,0.10)]",
    badgeBorder: "border-[rgba(255,138,0,0.25)]",
    badgeText: "text-accent-orange",
  },
  {
    gradient: "bg-gradient-to-br from-[#FFFBF0] via-[#FFF8E4] to-[#FFF0CD]",
    border: "border-[3px] border-[#B5A87F]", // 70% #FFF8E4 + 30% Black (3px)
    shadow: "shadow-[0_0_28px_5px_rgba(181,168,127,0.25)]", // 4-sided diffused shadow
    badgeBg: "bg-[rgba(244,196,48,0.12)]",
    badgeBorder: "border-[rgba(244,196,48,0.30)]",
    badgeText: "text-[#B8860B]",
  },
  {
    gradient: "bg-gradient-to-br from-[#F7F9FC] via-[#EFF3F8] to-[#E1EAF4]",
    border: "border-[3px] border-[#8E9DAE]", // 70% #EFF3F8 + 30% Black (3px)
    shadow: "shadow-[0_0_28px_5px_rgba(142,157,174,0.25)]", // 4-sided diffused shadow
    badgeBg: "bg-[rgba(15,39,71,0.08)]",
    badgeBorder: "border-[rgba(15,39,71,0.20)]",
    badgeText: "text-editorial-primary",
  },
  {
    gradient: "bg-gradient-to-br from-[#FFF6E9] via-[#FFF1E0] to-[#FFE7CE]",
    border: "border-[3px] border-[#B39A82]",
    shadow: "shadow-[0_0_28px_5px_rgba(179,154,130,0.25)]",
    badgeBg: "bg-[rgba(255,138,0,0.10)]",
    badgeBorder: "border-[rgba(255,138,0,0.25)]",
    badgeText: "text-accent-orange",
  },
  {
    gradient: "bg-gradient-to-br from-[#FFFBF0] via-[#FFF8E4] to-[#FFF0CD]",
    border: "border-[3px] border-[#B5A87F]",
    shadow: "shadow-[0_0_28px_5px_rgba(181,168,127,0.25)]",
    badgeBg: "bg-[rgba(244,196,48,0.12)]",
    badgeBorder: "border-[rgba(244,196,48,0.30)]",
    badgeText: "text-[#B8860B]",
  },
  {
    gradient: "bg-gradient-to-br from-[#F7F9FC] via-[#EFF3F8] to-[#E1EAF4]",
    border: "border-[3px] border-[#8E9DAE]",
    shadow: "shadow-[0_0_28px_5px_rgba(142,157,174,0.25)]",
    badgeBg: "bg-[rgba(15,39,71,0.08)]",
    badgeBorder: "border-[rgba(15,39,71,0.20)]",
    badgeText: "text-editorial-primary",
  },
];

// Contextual diagnostic workflow schematics derived directly from each item's actual text
const DIAGNOSTIC_SCHEMATICS = [
  {
    step1: "ONLINE PRESENCE",
    friction: "DISCOVERY GAP",
    step3: "LOST AUDIENCE",
  },
  {
    step1: "CONTENT & ADS",
    friction: "SILOED EFFORTS",
    step3: "DILUTED IMPACT",
  },
  {
    step1: "MARKETING SPEND",
    friction: "TRACKING GAP",
    step3: "UNMEASURED ROI",
  },
  {
    step1: "INBOUND LEADS",
    friction: "SLOW FOLLOW-UP",
    step3: "LOST CUSTOMERS",
  },
  {
    step1: "MANUAL WORKFLOWS",
    friction: "CAPACITY CHOKEPOINT",
    step3: "GROWTH CAPPED",
  },
  {
    step1: "AI CAPABILITIES",
    friction: "STRATEGIC VOID",
    step3: "ZERO REAL VALUE",
  },
];

export function BusinessProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const { businessProblem } = homeContent;
  const problems = businessProblem.problems;

  useLayoutEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !pinContainerRef.current) return;

    const { gsap } = getGSAP();
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const section = sectionRef.current;
      const pinContainer = pinContainerRef.current;
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

      if (!section || !pinContainer || cards.length === 0) return;

      // Set initial positions: Card 0 at resting position (0), Cards 1..5 fully below stage (105%)
      cards.forEach((card, i) => {
        if (i === 0) {
          gsap.set(card, { yPercent: 0, zIndex: 10 });
        } else {
          gsap.set(card, { yPercent: 105, zIndex: 10 + i });
        }
      });

      // Construct scroll-scrubbed timeline for physical overlapping stack
      const scrollDistance = (problems.length - 1) * 110;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${scrollDistance}%`,
          pin: pinContainer,
          pinSpacing: true,
          scrub: 0.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const rawIdx = self.progress * (problems.length - 1);
            const currentIdx = Math.min(Math.round(rawIdx), problems.length - 1);
            setActiveIndex(currentIdx);
          },
        },
      });

      // Sequence: Each incoming card slides from yPercent: 105 to 0, covering the previous card
      for (let i = 1; i < cards.length; i++) {
        tl.to(
          cards[i],
          {
            yPercent: 0,
            ease: "none",
            duration: 1.0,
          },
          `card-${i}`
        );

        // Reading pause at resting position before next card begins rising
        if (i < cards.length - 1) {
          tl.to({}, { duration: 0.35 });
        }
      }

      return () => {
        tl.kill();
      };
    });

    mm.add("(max-width: 1023px)", () => {
      cardsRef.current.forEach((card) => {
        if (card) gsap.set(card, { clearProps: "all" });
      });
    });

    return () => mm.revert();
  }, [prefersReducedMotion, problems.length]);

  return (
    <section
      ref={sectionRef}
      id="diagnosis"
      className="relative w-full bg-transparent text-editorial-primary border-t border-border"
      style={{ isolation: "isolate" }}
    >
      {/* Pinned Desktop Stage / Natural Mobile Flow Container */}
      <div
        ref={pinContainerRef}
        className="w-full lg:h-screen flex flex-col justify-between py-8 lg:py-12 max-w-7xl mx-auto px-6 md:px-12 overflow-hidden"
      >
        {/* Section Header HUD with Synchronized 01-06 Progress Indicator */}
        <div className="relative z-30 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-3.5 mb-2 lg:mb-4">
          <div className="flex items-center gap-3">
            <Badge variant="code">{businessProblem.badge}</Badge>
            <span className="text-[11px] font-mono text-editorial-secondary uppercase tracking-widest">
              SYSTEM DIAGNOSIS // 0{activeIndex + 1} OF 06
            </span>
          </div>

          {/* 01-06 Step Indicators */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-3">
              {problems.map((_, idx) => (
                <span
                  key={idx}
                  className={`text-[11px] font-mono transition-colors font-bold ${
                    activeIndex === idx
                      ? "text-accent-orange"
                      : "text-editorial-muted"
                  }`}
                >
                  0{idx + 1}
                </span>
              ))}
            </div>

            <span className="text-xs font-mono text-accent-orange uppercase tracking-wider font-semibold hidden sm:inline-block">
              [IDENTIFYING FRICTION]
            </span>
          </div>
        </div>

        {/* Card Stage Container: Desktop Pinned Overlapping Stack (Clipped with 48px rounded corners) */}
        <div className="relative w-full flex-1 min-h-[540px] lg:min-h-[580px] max-h-[80vh] my-auto flex items-center overflow-hidden rounded-[48px]">
          <div className="relative w-full h-full min-h-[520px] lg:min-h-[560px] max-h-[78vh] flex flex-col lg:block">
            {problems.map((problem, idx) => {
              const theme = CARD_THEMES[idx % CARD_THEMES.length];
              const schematic = DIAGNOSTIC_SCHEMATICS[idx % DIAGNOSTIC_SCHEMATICS.length];

              return (
                <div
                  key={idx}
                  ref={(el) => {
                    cardsRef.current[idx] = el;
                  }}
                  className={`w-full lg:absolute lg:inset-0 rounded-[48px] box-border ${theme.border} ${theme.gradient} ${theme.shadow} p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-between mb-8 lg:mb-0 transition-shadow duration-300`}
                >
                  {/* ZONE 1: TOP METADATA ROW */}
                  <div className="flex items-center justify-between border-b border-[rgba(15,39,71,0.09)] pb-3 mb-3 sm:mb-4">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider border ${theme.badgeBg} ${theme.badgeBorder} ${theme.badgeText}`}
                      >
                        0{idx + 1} — BOTTLENECK
                      </span>
                      <span className="text-[11px] font-mono text-editorial-muted tracking-widest uppercase hidden sm:inline-block">
                        [BARRIER TO SCALE]
                      </span>
                    </div>

                    <span className="text-[11px] font-mono text-editorial-secondary uppercase tracking-widest">
                      {`SECTOR 0${idx + 1} // AUDIT LOG`}
                    </span>
                  </div>

                  {/* ZONE 2: MAIN CONTENT AREA (58% Narrative Left / 42% Inset System Log Right) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center flex-1 my-auto py-1">
                    {/* Left Column: Diagnosis Story Narrative + Contextual Schematic */}
                    <div className="lg:col-span-7 flex flex-col justify-center gap-3 sm:gap-3.5 lg:gap-4">
                      {/* Previous size for comparison: text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[50px] */}
                      <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[58px] font-heading font-bold uppercase tracking-tight text-editorial-primary leading-[0.98] sm:leading-[1.0] lg:leading-[1.02] max-w-xl">
                        {problem.title}
                      </h3>

                      <p className="text-base sm:text-lg lg:text-[18px] xl:text-[19px] text-editorial-secondary font-sans leading-relaxed max-w-xl">
                        {problem.description}
                      </p>

                      {/* Small Content-Related Diagnostic Schematic */}
                      <div
                        className="flex items-center gap-2 pt-1 text-[10px] sm:text-[11px] font-mono select-none max-w-xl"
                        aria-hidden="true"
                      >
                        <div className="flex-1 py-1.5 px-2.5 rounded-lg bg-white/75 border border-[rgba(15,39,71,0.10)] text-editorial-secondary font-medium text-center truncate">
                          {schematic.step1}
                        </div>
                        <svg
                          className="w-3.5 h-3.5 text-editorial-muted shrink-0"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            d="M6 3l5 5-5 5"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex-1 py-1.5 px-2.5 rounded-lg bg-[rgba(255,138,0,0.12)] border border-[rgba(255,138,0,0.30)] text-accent-orange font-bold text-center truncate shadow-sm">
                          ⚠ {schematic.friction}
                        </div>
                        <svg
                          className="w-3.5 h-3.5 text-editorial-muted shrink-0"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            d="M6 3l5 5-5 5"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex-1 py-1.5 px-2.5 rounded-lg bg-white/75 border border-[rgba(15,39,71,0.10)] text-editorial-secondary font-medium text-center truncate">
                          {schematic.step3}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Raised Inset System Log Module */}
                    <div className="lg:col-span-5 flex flex-col items-center justify-center">
                      <div className="w-full bg-[#FFF8EC] border-2 border-[#B2AEA5] rounded-[24px] box-border p-5 sm:p-7 flex flex-col justify-between shadow-[0_0_20px_3px_rgba(178,174,165,0.22)] min-h-[240px] lg:min-h-[270px]">
                        <div className="flex items-center justify-between text-[10px] font-mono text-editorial-muted border-b border-[rgba(15,39,71,0.08)] pb-3">
                          <span className="font-semibold tracking-wider text-editorial-secondary">
                            SYSTEM LOG
                          </span>
                          <span className="text-accent-orange font-bold font-mono">
                            SECTOR 0{idx + 1}
                          </span>
                        </div>

                        <div className="flex flex-col gap-2 py-3.5">
                          <span className="font-mono text-[10px] sm:text-[11px] text-editorial-muted uppercase tracking-wider">
                            CURRENT DIAGNOSTIC:
                          </span>
                          <span className="font-heading font-bold text-base sm:text-[17px] lg:text-[18px] uppercase text-editorial-primary leading-snug">
                            {problem.title}
                          </span>
                          <p className="text-sm sm:text-[14px] lg:text-[15px] font-sans text-editorial-secondary leading-relaxed">
                            {problem.description}
                          </p>
                        </div>

                        <div className="pt-2.5 border-t border-[rgba(15,39,71,0.08)] text-[10px] font-mono text-editorial-muted uppercase tracking-widest">
                          {`STATUS // ACTIVE BOTTLENECK`}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ZONE 3: BOTTOM DETAIL ROW (Fully Readable, No Truncation) */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-[rgba(15,39,71,0.09)] pt-3 mt-3 text-[11px] sm:text-xs font-mono text-editorial-muted">
                    <span className="leading-relaxed text-editorial-secondary font-medium">
                      {businessProblem.statement}
                    </span>
                    <span className="text-editorial-muted tracking-widest shrink-0 font-mono text-[10px] sm:text-[11px]">
                      {`DIAGNOSTIC 0${idx + 1}/06`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
