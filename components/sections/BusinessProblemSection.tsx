"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import { SectionMasthead } from "@/components/ui/SectionMasthead";
import { getGSAP } from "@/lib/gsap";
import { homeContent } from "@/data/content/home";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

// Distinct subtle brand-tinted solid card background surfaces with 3px derived borders and 4-sided diffused shadows
const CARD_THEMES = [
  {
    gradient: "bg-gradient-to-br from-[#FFF6E9] via-[#FFF1E0] to-[#FFE7CE]",
    border: "border-[2.5px] sm:border-[3px] border-[#B39A82]",
    shadow: "shadow-[0_0_28px_5px_rgba(179,154,130,0.25)]",
    badgeBg: "bg-[rgba(255,138,0,0.10)]",
    badgeBorder: "border-[rgba(255,138,0,0.25)]",
    badgeText: "text-brand-coral",
  },
  {
    gradient: "bg-gradient-to-br from-[#FFFBF0] via-[#FFF8E4] to-[#FFF0CD]",
    border: "border-[2.5px] sm:border-[3px] border-[#B5A87F]",
    shadow: "shadow-[0_0_28px_5px_rgba(181,168,127,0.25)]",
    badgeBg: "bg-[rgba(244,196,48,0.12)]",
    badgeBorder: "border-[rgba(244,196,48,0.30)]",
    badgeText: "text-[#B8860B]",
  },
  {
    gradient: "bg-gradient-to-br from-[#F7F9FC] via-[#EFF3F8] to-[#E1EAF4]",
    border: "border-[2.5px] sm:border-[3px] border-[#8E9DAE]",
    shadow: "shadow-[0_0_28px_5px_rgba(142,157,174,0.25)]",
    badgeBg: "bg-[rgba(15,39,71,0.08)]",
    badgeBorder: "border-[rgba(15,39,71,0.20)]",
    badgeText: "text-editorial-primary",
  },
  {
    gradient: "bg-gradient-to-br from-[#FFF6E9] via-[#FFF1E0] to-[#FFE7CE]",
    border: "border-[2.5px] sm:border-[3px] border-[#B39A82]",
    shadow: "shadow-[0_0_28px_5px_rgba(179,154,130,0.25)]",
    badgeBg: "bg-[rgba(255,138,0,0.10)]",
    badgeBorder: "border-[rgba(255,138,0,0.25)]",
    badgeText: "text-brand-coral",
  },
  {
    gradient: "bg-gradient-to-br from-[#FFFBF0] via-[#FFF8E4] to-[#FFF0CD]",
    border: "border-[2.5px] sm:border-[3px] border-[#B5A87F]",
    shadow: "shadow-[0_0_28px_5px_rgba(181,168,127,0.25)]",
    badgeBg: "bg-[rgba(244,196,48,0.12)]",
    badgeBorder: "border-[rgba(244,196,48,0.30)]",
    badgeText: "text-[#B8860B]",
  },
  {
    gradient: "bg-gradient-to-br from-[#F7F9FC] via-[#EFF3F8] to-[#E1EAF4]",
    border: "border-[2.5px] sm:border-[3px] border-[#8E9DAE]",
    shadow: "shadow-[0_0_28px_5px_rgba(142,157,174,0.25)]",
    badgeBg: "bg-[rgba(15,39,71,0.08)]",
    badgeBorder: "border-[rgba(15,39,71,0.20)]",
    badgeText: "text-editorial-primary",
  },
];

// Contextual diagnostic workflow schematics
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
  const activeIndexRef = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  const { businessProblem } = homeContent;
  const problems = businessProblem.problems;

  useLayoutEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !pinContainerRef.current) return;

    const { gsap } = getGSAP();
    const section = sectionRef.current;
    const pinContainer = pinContainerRef.current;
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    if (!section || !pinContainer || cards.length === 0) return;

    const mm = gsap.matchMedia();

    // Universal Pinned Overlapping Stack (Desktop & Mobile)
    mm.add("(min-width: 320px)", () => {
      // Set initial positions: Card 0 at resting position (0), Cards 1..5 fully below stage (105%)
      cards.forEach((card, i) => {
        if (i === 0) {
          gsap.set(card, { yPercent: 0, zIndex: 10 });
        } else {
          gsap.set(card, { yPercent: 105, zIndex: 10 + i });
        }
      });

      const cardCount = problems.length;
      const travelPerCard = 1.0;
      const dwellPerCard = 0.35;
      const finalHold = 0.35;

      // Exact scroll distance without oversized dead zone
      const scrollPerStep = window.innerWidth < 768 ? 480 : 580;
      const totalScrollDistance = (cardCount - 1) * scrollPerStep + 300;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScrollDistance}`,
          pin: pinContainer,
          pinSpacing: true,
          scrub: 0.25, // Snappy scrub response (zero lag drift)
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const rawStep = self.progress * (cardCount - 1);
            const settledIdx = Math.min(Math.round(rawStep), cardCount - 1);
            if (settledIdx !== activeIndexRef.current) {
              activeIndexRef.current = settledIdx;
              setActiveIndex(settledIdx);
            }
          },
        },
      });

      // Build sequential step progression: Card i rises from yPercent 105 -> 0, then dwells
      for (let i = 1; i < cardCount; i++) {
        tl.to(
          cards[i],
          {
            yPercent: 0,
            ease: "power2.inOut",
            duration: travelPerCard,
          }
        );

        // Reading dwell at settled position
        if (i < cardCount - 1) {
          tl.to({}, { duration: dwellPerCard });
        }
      }

      // Final reading hold for Card 06 before section unpins cleanly into ConnectedGrowthSection
      tl.to({}, { duration: finalHold });

      return () => {
        tl.kill();
      };
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
      {/* Pinned Stage Container */}
      <div
        ref={pinContainerRef}
        className="w-full min-h-[100dvh] lg:h-screen flex flex-col justify-between py-6 sm:py-8 lg:py-12 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 overflow-hidden"
      >
        {/* Section Masthead */}
        <SectionMasthead
          badge={businessProblem.badge}
          descriptor={`SYSTEM DIAGNOSIS // 0${activeIndex + 1} OF 06`}
          rightLabel="[IDENTIFYING FRICTION]"
          className="mb-3 lg:mb-4"
        >
          <div className="hidden sm:flex items-center gap-1.5 sm:gap-2 mr-2">
            {problems.map((_, idx) => (
              <span
                key={idx}
                className={`text-[10px] sm:text-[11px] font-mono transition-colors font-bold ${
                  activeIndex === idx
                    ? "text-brand-coral"
                    : "text-editorial-muted"
                }`}
              >
                0{idx + 1}
              </span>
            ))}
          </div>
        </SectionMasthead>

        {/* Unclipped Editorial Introduction Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-8 items-baseline mb-3 lg:mb-4">
          <div className="lg:col-span-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-heading font-bold uppercase tracking-tight text-editorial-primary leading-tight">
              {businessProblem.headline}
            </h2>
          </div>
          <div className="lg:col-span-6 flex flex-col gap-1">
            <p className="text-xs sm:text-[13.5px] font-sans text-editorial-secondary leading-relaxed">
              {businessProblem.intro}
            </p>
            <span className="text-[10px] font-mono text-brand-coral uppercase tracking-wider font-semibold">
              YOU MAY BE DEALING WITH:
            </span>
          </div>
        </div>

        {/* Card Stage Container: Pinned Overlapping Stack */}
        <div className="relative w-full flex-1 min-h-[500px] sm:min-h-[540px] lg:min-h-[580px] max-h-[82dvh] my-auto flex items-center overflow-hidden rounded-[24px] sm:rounded-[36px] lg:rounded-[48px]">
          <div className="relative w-full h-full min-h-[480px] sm:min-h-[520px] lg:min-h-[560px] max-h-[80dvh]">
            {problems.map((problem, idx) => {
              const theme = CARD_THEMES[idx % CARD_THEMES.length];
              const schematic = DIAGNOSTIC_SCHEMATICS[idx % DIAGNOSTIC_SCHEMATICS.length];

              return (
                <div
                  key={idx}
                  ref={(el) => {
                    cardsRef.current[idx] = el;
                  }}
                  className={`w-full absolute inset-0 rounded-[24px] sm:rounded-[36px] lg:rounded-[48px] box-border ${theme.border} ${theme.gradient} ${theme.shadow} p-4 sm:p-7 lg:p-10 xl:p-12 flex flex-col justify-between overflow-y-auto`}
                >
                  {/* ZONE 1: TOP METADATA ROW */}
                  <div className="flex items-center justify-between border-b border-[rgba(15,39,71,0.09)] pb-2.5 sm:pb-3 mb-2 sm:mb-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span
                        className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider border ${theme.badgeBg} ${theme.badgeBorder} ${theme.badgeText}`}
                      >
                        0{idx + 1} — BOTTLENECK
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-mono text-editorial-muted tracking-widest uppercase hidden sm:inline-block">
                        YOU MAY BE DEALING WITH:
                      </span>
                    </div>

                    <span className="text-[10px] sm:text-[11px] font-mono text-editorial-secondary uppercase tracking-widest">
                      {`SECTOR 0${idx + 1} // AUDIT LOG`}
                    </span>
                  </div>

                  {/* ZONE 2: MAIN CONTENT AREA */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 lg:gap-10 xl:gap-12 items-center flex-1 my-auto py-1">
                    {/* Left Column: Diagnosis Narrative & Schematic */}
                    <div className="lg:col-span-7 flex flex-col justify-center gap-2.5 sm:gap-3.5 lg:gap-4">
                      <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[58px] font-heading font-bold uppercase tracking-tight text-editorial-primary leading-[1.0] sm:leading-[1.0] lg:leading-[1.02] max-w-xl break-words">
                        {problem.title}
                      </h3>

                      <p className="text-xs sm:text-base lg:text-[18px] xl:text-[19px] text-editorial-secondary font-sans leading-relaxed max-w-xl">
                        {problem.description}
                      </p>

                      {/* 3-Part Diagnostic Flow (Vertical on Mobile / Horizontal on sm+) */}
                      <div
                        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 sm:gap-2 pt-1 text-[10px] sm:text-[11px] font-mono select-none max-w-xl"
                        aria-hidden="true"
                      >
                        <div className="py-1 sm:py-1.5 px-2 sm:px-2.5 rounded-md sm:rounded-lg bg-white/80 border border-[rgba(15,39,71,0.10)] text-editorial-secondary font-medium text-center truncate">
                          {schematic.step1}
                        </div>
                        <div className="hidden sm:flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-editorial-muted shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor">
                            <path d="M6 3l5 5-5 5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div className="sm:hidden text-center text-brand-turquoise text-xs">↓</div>
                        <div className="py-1 sm:py-1.5 px-2 sm:px-2.5 rounded-md sm:rounded-lg bg-[rgba(255,138,0,0.12)] border border-[rgba(255,138,0,0.30)] text-brand-turquoise font-bold text-center truncate shadow-xs">
                          ⚠ {schematic.friction}
                        </div>
                        <div className="hidden sm:flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-editorial-muted shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor">
                            <path d="M6 3l5 5-5 5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div className="sm:hidden text-center text-brand-turquoise text-xs">↓</div>
                        <div className="py-1 sm:py-1.5 px-2 sm:px-2.5 rounded-md sm:rounded-lg bg-white/80 border border-[rgba(15,39,71,0.10)] text-editorial-secondary font-medium text-center truncate">
                          {schematic.step3}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Inset System Log Module */}
                    <div className="lg:col-span-5 flex flex-col items-center justify-center">
                      <div className="w-full bg-[#FFFFFF] border-2 border-[#B2AEA5] rounded-[18px] sm:rounded-[24px] box-border p-4 sm:p-6 lg:p-7 flex flex-col justify-between shadow-[0_0_20px_3px_rgba(178,174,165,0.22)] min-h-[170px] sm:min-h-[220px] lg:min-h-[270px]">
                        <div className="flex items-center justify-between text-[10px] font-mono text-editorial-muted border-b border-[rgba(15,39,71,0.08)] pb-2 sm:pb-3">
                          <span className="font-semibold tracking-wider text-editorial-secondary">
                            SYSTEM LOG
                          </span>
                          <span className="text-brand-turquoise font-bold font-mono">
                            SECTOR 0{idx + 1}
                          </span>
                        </div>

                        <div className="flex flex-col gap-1.5 py-2 sm:py-3">
                          <span className="font-mono text-[9px] sm:text-[10px] text-editorial-muted uppercase tracking-wider">
                            CURRENT DIAGNOSTIC:
                          </span>
                          <span className="font-heading font-bold text-sm sm:text-base lg:text-[18px] uppercase text-editorial-primary leading-snug">
                            {problem.title}
                          </span>
                          <p className="text-xs sm:text-sm lg:text-[15px] font-sans text-editorial-secondary leading-relaxed">
                            {problem.description}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-[rgba(15,39,71,0.08)] text-[9px] sm:text-[10px] font-mono text-editorial-muted uppercase tracking-widest">
                          {`STATUS // ACTIVE BOTTLENECK`}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ZONE 3: BOTTOM DETAIL ROW */}
                  <div className="flex items-center justify-between gap-2 border-t border-[rgba(15,39,71,0.09)] pt-2.5 sm:pt-3 mt-2 text-[10px] sm:text-xs font-mono text-editorial-muted">
                    <span className="leading-relaxed text-editorial-secondary font-medium truncate">
                      {businessProblem.statement}
                    </span>
                    <span className="text-editorial-muted tracking-widest shrink-0 font-mono text-[9px] sm:text-[11px]">
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
