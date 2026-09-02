"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import { SectionMasthead } from "@/components/ui/SectionMasthead";
import { homeContent } from "@/data/content/home";
import { getGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import {
  Compass,
  Activity,
  Target,
  Layers,
  Cpu,
  TrendingUp,
} from "lucide-react";

// Icons tailored to each execution phase
const STEP_ICONS = [
  Compass,     // 01 UNDERSTAND
  Activity,    // 02 DIAGNOSE
  Target,      // 03 STRATEGIZE
  Layers,      // 04 CREATE
  Cpu,         // 05 AUTOMATE
  TrendingUp,  // 06 MEASURE & IMPROVE
];

// Desktop Waypoints (5400 x 640)
const DESKTOP_WAYPOINTS = [
  { x: 450, y: 150, isCircleAbove: true },
  { x: 1350, y: 490, isCircleAbove: false },
  { x: 2250, y: 150, isCircleAbove: true },
  { x: 3150, y: 490, isCircleAbove: false },
  { x: 4050, y: 150, isCircleAbove: true },
  { x: 4950, y: 490, isCircleAbove: false },
];

// Desktop Continuous Horizontal 5-Loop Path
const DESKTOP_PATH = `
  M 450 150
  C 650 150, 800 240, 880 260
  C 960 280, 960 380, 900 380
  C 840 380, 840 280, 920 300
  C 1000 320, 1150 490, 1350 490
  C 1550 490, 1700 400, 1780 380
  C 1860 360, 1860 260, 1800 260
  C 1740 260, 1740 360, 1820 340
  C 1900 320, 2050 150, 2250 150
  C 2450 150, 2600 240, 2680 260
  C 2760 280, 2760 380, 2700 380
  C 2640 380, 2640 280, 2720 300
  C 2800 320, 2950 490, 3150 490
  C 3350 490, 3500 400, 3580 380
  C 3660 360, 3660 260, 3600 260
  C 3540 260, 3540 360, 3620 340
  C 3700 320, 3850 150, 4050 150
  C 4250 150, 4400 240, 4480 260
  C 4560 280, 4560 380, 4500 380
  C 4440 380, 4440 280, 4520 300
  C 4600 320, 4750 490, 4950 490
`.replace(/\s+/g, " ").trim();

// Mobile Waypoints (380 x 2400)
const MOBILE_WAYPOINTS = [
  { x: 70, y: 160, isLeft: true },
  { x: 310, y: 560, isLeft: false },
  { x: 70, y: 960, isLeft: true },
  { x: 310, y: 1360, isLeft: false },
  { x: 70, y: 1760, isLeft: true },
  { x: 310, y: 2160, isLeft: false },
];

// Mobile Continuous Vertical 5-Loop Path (380 x 2400)
const MOBILE_PATH = `
  M 70 160
  C 70 280, 150 320, 180 330
  C 220 345, 230 385, 190 390
  C 150 395, 150 355, 190 360
  C 230 365, 310 440, 310 560
  C 310 680, 230 720, 200 730
  C 160 745, 150 785, 190 790
  C 230 795, 230 755, 190 760
  C 150 765, 70 840, 70 960
  C 70 1080, 150 1120, 180 1130
  C 220 1145, 230 1185, 190 1190
  C 150 1195, 150 1155, 190 1160
  C 230 1165, 310 1240, 310 1360
  C 310 1480, 230 1520, 200 1530
  C 160 1545, 150 1585, 190 1590
  C 230 1595, 230 1555, 190 1560
  C 150 1565, 70 1640, 70 1760
  C 70 1880, 150 1920, 180 1930
  C 220 1945, 230 1985, 190 1990
  C 150 1995, 150 1955, 190 1960
  C 230 1965, 310 2040, 310 2160
`.replace(/\s+/g, " ").trim();

export function ApproachSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const desktopPathRef = useRef<SVGPathElement>(null);
  const desktopSignalRef = useRef<SVGCircleElement>(null);
  const mobilePathRef = useRef<SVGPathElement>(null);
  const mobileSignalRef = useRef<SVGCircleElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const activeStepRef = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  const { howWeWork } = homeContent;
  const steps = howWeWork.steps;

  useLayoutEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const { gsap } = getGSAP();
    const mm = gsap.matchMedia();

    // -------------------------------------------------------------------------
    // DESKTOP: Horizontal Pinned S-Curve Journey (≥1024px)
    // -------------------------------------------------------------------------
    mm.add("(min-width: 1024px)", () => {
      const section = sectionRef.current;
      const pinContainer = pinContainerRef.current;
      const track = trackRef.current;
      const path = desktopPathRef.current;
      const signal = desktopSignalRef.current;

      if (!section || !pinContainer || !track || !path || !signal) return;

      const pathLength = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      const contactDistances: number[] = [];
      const sampleCount = 800;
      DESKTOP_WAYPOINTS.forEach((circle) => {
        let minDist = Infinity;
        let bestLength = 0;
        for (let s = 0; s <= sampleCount; s++) {
          const l = (s / sampleCount) * pathLength;
          const pt = path.getPointAtLength(l);
          const distSq = (pt.x - circle.x) ** 2 + (pt.y - circle.y) ** 2;
          if (distSq < minDist) {
            minDist = distSq;
            bestLength = l;
          }
        }
        contactDistances.push(bestLength);
      });
      contactDistances[0] = 0;

      const startPt = path.getPointAtLength(0);
      gsap.set(signal, { cx: startPt.x, cy: startPt.y });

      const maxScrollX = track.scrollWidth - window.innerWidth + 160;
      const drawDuration = 1.0;
      const finalHold = 0.25;
      const totalTimelineDuration = drawDuration + finalHold;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${maxScrollX + 750}`,
          pin: pinContainer,
          pinSpacing: true,
          scrub: 0.25, // Snappy response (zero lag drift)
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const masterProgress = Math.min(1, self.progress / (drawDuration / totalTimelineDuration));
            const currentDist = masterProgress * pathLength;

            gsap.set(path, { strokeDashoffset: pathLength - currentDist });

            const pt = path.getPointAtLength(currentDist);
            signal.setAttribute("cx", pt.x.toString());
            signal.setAttribute("cy", pt.y.toString());

            let currentActive = 0;
            for (let i = 0; i < contactDistances.length; i++) {
              if (currentDist >= contactDistances[i] - 16) {
                currentActive = i;
              }
            }
            if (currentActive !== activeStepRef.current) {
              activeStepRef.current = currentActive;
              setActiveStep(currentActive);
            }
          },
        },
      });

      // Synchronized Track Translation
      tl.to(
        track,
        {
          x: () => -maxScrollX,
          ease: "none",
          duration: drawDuration,
        },
        0
      );

      // Final hold buffer before releasing cleanly into Philosophy & Footer
      tl.to({}, { duration: finalHold }, drawDuration);

      return () => {
        tl.kill();
      };
    });

    // -------------------------------------------------------------------------
    // MOBILE: Vertical Connected-Line Journey (<1024px)
    // -------------------------------------------------------------------------
    mm.add("(max-width: 1023px)", () => {
      const section = sectionRef.current;
      const path = mobilePathRef.current;
      const signal = mobileSignalRef.current;

      if (!section || !path || !signal) return;

      const pathLength = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      const contactDistances: number[] = [];
      const sampleCount = 600;
      MOBILE_WAYPOINTS.forEach((circle) => {
        let minDist = Infinity;
        let bestLength = 0;
        for (let s = 0; s <= sampleCount; s++) {
          const l = (s / sampleCount) * pathLength;
          const pt = path.getPointAtLength(l);
          const distSq = (pt.x - circle.x) ** 2 + (pt.y - circle.y) ** 2;
          if (distSq < minDist) {
            minDist = distSq;
            bestLength = l;
          }
        }
        contactDistances.push(bestLength);
      });
      contactDistances[0] = 0;

      const startPt = path.getPointAtLength(0);
      gsap.set(signal, { cx: startPt.x, cy: startPt.y });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          end: "bottom 80%",
          scrub: 0.25,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const currentDist = self.progress * pathLength;
            gsap.set(path, { strokeDashoffset: pathLength - currentDist });

            const pt = path.getPointAtLength(currentDist);
            signal.setAttribute("cx", pt.x.toString());
            signal.setAttribute("cy", pt.y.toString());

            let currentActive = 0;
            for (let i = 0; i < contactDistances.length; i++) {
              if (currentDist >= contactDistances[i] - 12) {
                currentActive = i;
              }
            }
            if (currentActive !== activeStepRef.current) {
              activeStepRef.current = currentActive;
              setActiveStep(currentActive);
            }
          },
        },
      });

      return () => {
        tl.kill();
      };
    });

    return () => mm.revert();
  }, [prefersReducedMotion, steps.length]);

  const handleStepClick = (index: number) => {
    if (!sectionRef.current) return;
    const { ScrollTrigger } = getGSAP();
    const allTriggers = ScrollTrigger.getAll();
    const st = allTriggers.find((t) => t.trigger === sectionRef.current);
    if (st) {
      const targetScroll = st.start + (index / (steps.length - 1)) * (st.end - st.start);
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="approach"
      className="relative w-full bg-transparent text-editorial-primary border-t border-border"
      style={{ isolation: "isolate" }}
    >
      {/* Container */}
      <div
        ref={pinContainerRef}
        className="w-full lg:h-screen flex flex-col justify-between py-6 sm:py-8 lg:py-12 overflow-hidden"
      >
        {/* Top Header Masthead with Step Navigation */}
        <div className="relative z-30 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-12 flex flex-col gap-3 mb-2">
          <SectionMasthead
            badge={howWeWork.badge}
            descriptor={howWeWork.headline}
            rightLabel={`PHASE 0${activeStep + 1} OF 06`}
          >
            {/* Interactive 6-Step Progress Navigation */}
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1" role="tablist" aria-label="Process Journey Phases">
              {steps.map((st, idx) => {
                const isActive = activeStep === idx;
                const isCompleted = activeStep > idx;

                return (
                  <button
                    key={st.step}
                    onClick={() => handleStepClick(idx)}
                    className={`flex min-w-11 min-h-11 items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono transition-all duration-300 ${
                      isActive
                        ? "bg-brand-coral text-brand-navy font-bold shadow-xs scale-105"
                        : isCompleted
                        ? "bg-brand-turquoise/10 text-brand-turquoise font-semibold hover:bg-brand-turquoise/20"
                        : "text-editorial-muted hover:text-editorial-primary"
                    }`}
                    aria-label={`Jump to Phase ${st.step}: ${st.title}`}
                    role="tab"
                    aria-selected={isActive}
                  >
                    <span>{isCompleted ? "✓" : `0${idx + 1}`}</span>
                    <span className="hidden md:inline uppercase text-[10px] tracking-wider">
                      {st.title.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </SectionMasthead>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP: Flowing Path with 5 Open Loops in Unified SVG Grid (5400 x 640)   */}
        {/* ========================================================================= */}
        <div className="hidden lg:block relative w-full flex-1 my-auto overflow-hidden">
          <div
            ref={trackRef}
            className="relative h-[640px] will-change-transform"
            style={{ width: "5400px" }}
          >
            <svg
              className="absolute inset-0 w-full h-full pointer-events-auto"
              viewBox="0 0 5400 640"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="desktopPathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--brand-turquoise)" />
                  <stop offset="100%" stopColor="var(--brand-coral)" />
                </linearGradient>
              </defs>
              {/* Reference Path */}
              <path
                d={DESKTOP_PATH}
                stroke="#1E1E2E"
                strokeOpacity="0.10"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="4 6"
              />

              {/* Progressive Deep Slate Line */}
              <path
                ref={desktopPathRef}
                d={DESKTOP_PATH}
                stroke="url(#desktopPathGradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Leading Tip Explorer Dot */}
              <circle
                ref={desktopSignalRef}
                r="6.5"
                fill="var(--brand-coral)"
                stroke="#F4F7FA"
                strokeWidth="2"
              />

              {/* Six Desktop Milestones */}
              {steps.map((step, idx) => {
                const IconComponent = STEP_ICONS[idx % STEP_ICONS.length];
                const waypoint = DESKTOP_WAYPOINTS[idx];
                const isCircleAbove = waypoint.isCircleAbove;
                const isActive = activeStep === idx;
                const isCompleted = activeStep >= idx;

                return (
                  <g key={step.step} className="select-none">
                    <g
                      transform={`translate(${waypoint.x}, ${waypoint.y})`}
                      className="cursor-pointer"
                      onClick={() => handleStepClick(idx)}
                    >
                      <circle
                        r="38"
                        fill="#F4F7FA"
                        stroke={isActive ? "var(--brand-coral)" : isCompleted ? "var(--brand-turquoise)" : "rgba(15,39,71,0.25)"}
                        strokeWidth="3.5"
                        filter="drop-shadow(0 0 14px rgba(15,39,71,0.08))"
                        className="transition-colors duration-300"
                      />
                      <foreignObject x="-18" y="-18" width="36" height="36" className="pointer-events-none">
                        <div className="w-full h-full flex items-center justify-center">
                          <IconComponent
                            className={`w-6 h-6 transition-colors duration-300 ${
                              isActive ? "text-brand-turquoise" : isCompleted ? "text-editorial-primary" : "text-editorial-muted"
                            }`}
                          />
                        </div>
                      </foreignObject>
                      <foreignObject x="-24" y="24" width="48" height="26" className="pointer-events-none">
                        <div className="w-full h-full flex items-center justify-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border transition-colors duration-300 ${
                              isActive
                                ? "bg-brand-coral text-brand-navy border-brand-coral"
                                : isCompleted
                                ? "bg-brand-turquoise text-white border-brand-turquoise"
                                : "bg-[#F4F7FA] text-editorial-muted border-[rgba(15,39,71,0.20)]"
                            }`}
                          >
                            {step.step}
                          </span>
                        </div>
                      </foreignObject>
                    </g>

                    <foreignObject
                      x={waypoint.x - 220}
                      y={isCircleAbove ? waypoint.y + 54 : waypoint.y - 230}
                      width="440"
                      height="220"
                      className="pointer-events-none"
                    >
                      <div
                        className={`w-full flex flex-col items-center text-center transition-all duration-300 ${
                          isActive
                            ? "opacity-100"
                            : isCompleted
                            ? "opacity-90"
                            : "opacity-45"
                        }`}
                      >
                        <span
                          className={`text-[11px] font-mono uppercase tracking-widest font-semibold mb-1.5 transition-colors duration-300 ${
                            isActive ? "text-brand-coral" : isCompleted ? "text-brand-turquoise" : "text-editorial-muted"
                          }`}
                        >
                          {`PHASE 0${idx + 1} // MILESTONE`}
                        </span>

                        <h3
                          className={`text-3xl xl:text-[34px] font-heading font-bold uppercase tracking-tight leading-tight mb-2.5 transition-colors duration-300 ${
                            isActive || isCompleted ? "text-editorial-primary" : "text-editorial-secondary"
                          }`}
                        >
                          {step.title}
                        </h3>

                        <p
                          className={`text-sm xl:text-[15px] font-sans leading-relaxed transition-colors duration-300 max-w-sm ${
                            isActive || isCompleted ? "text-editorial-secondary font-medium" : "text-editorial-muted"
                          }`}
                        >
                          {step.description}
                        </p>
                      </div>
                    </foreignObject>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE & TABLET: Vertical Connected-Line Journey with 5 Loops (380 x 2400)*/}
        {/* ========================================================================= */}
        <div className="lg:hidden relative w-full max-w-md mx-auto px-4 py-8">
          <div className="relative w-full h-[2400px]">
            <svg
              className="absolute inset-0 w-full h-full pointer-events-auto"
              viewBox="0 0 380 2400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="mobilePathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="var(--brand-turquoise)" />
                  <stop offset="100%" stopColor="var(--brand-coral)" />
                </linearGradient>
              </defs>
              {/* Reference Dashed Route */}
              <path
                d={MOBILE_PATH}
                stroke="#1E1E2E"
                strokeOpacity="0.12"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="4 6"
              />

              {/* Foreground Progressive Deep Slate Line */}
              <path
                ref={mobilePathRef}
                d={MOBILE_PATH}
                stroke="url(#mobilePathGradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Leading Tip Explorer Dot */}
              <circle
                ref={mobileSignalRef}
                r="6.5"
                fill="var(--brand-coral)"
                stroke="#FFFFFF"
                strokeWidth="2"
              />

              {/* Six Mobile Milestones & Cards in Shared SVG Coordinate System */}
              {steps.map((step, idx) => {
                const IconComponent = STEP_ICONS[idx % STEP_ICONS.length];
                const waypoint = MOBILE_WAYPOINTS[idx];
                const isLeft = waypoint.isLeft;
                const isActive = activeStep === idx;
                const isCompleted = activeStep >= idx;

                return (
                  <g key={step.step} className="select-none">
                    {/* Circle Node */}
                    <g
                      transform={`translate(${waypoint.x}, ${waypoint.y})`}
                      className="cursor-pointer"
                      onClick={() => handleStepClick(idx)}
                    >
                      <circle
                        r="32"
                        fill="#FFFFFF"
                        stroke={isActive ? "var(--brand-coral)" : isCompleted ? "var(--brand-turquoise)" : "rgba(15,39,71,0.25)"}
                        strokeWidth="3"
                        filter="drop-shadow(0 0 12px rgba(15,39,71,0.08))"
                        className="transition-colors duration-300"
                      />
                      <foreignObject x="-14" y="-14" width="28" height="28" className="pointer-events-none">
                        <div className="w-full h-full flex items-center justify-center">
                          <IconComponent
                            className={`w-5 h-5 transition-colors duration-300 ${
                              isActive ? "text-brand-turquoise" : isCompleted ? "text-editorial-primary" : "text-editorial-muted"
                            }`}
                          />
                        </div>
                      </foreignObject>
                      <foreignObject x="-20" y="20" width="40" height="22" className="pointer-events-none">
                        <div className="w-full h-full flex items-center justify-center">
                          <span
                            className={`px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold border transition-colors duration-300 ${
                              isActive
                                ? "bg-brand-coral text-brand-navy border-brand-coral"
                                : isCompleted
                                ? "bg-brand-turquoise text-white border-brand-turquoise"
                                : "bg-[#FFFFFF] text-editorial-muted border-[rgba(15,39,71,0.20)]"
                            }`}
                          >
                            {step.step}
                          </span>
                        </div>
                      </foreignObject>
                    </g>

                    {/* Topic Content Card alongside circle */}
                    <foreignObject
                      x={isLeft ? 120 : 16}
                      y={waypoint.y - 60}
                      width="240"
                      height="170"
                      className="pointer-events-none"
                    >
                      <div
                        className={`w-full p-4 rounded-xl bg-white/90 border transition-all duration-300 shadow-xs ${
                          isActive
                            ? "border-brand-turquoise/80 opacity-100 scale-[1.02]"
                            : isCompleted
                            ? "border-[#1E1E2E]/20 opacity-90"
                            : "border-[#1E1E2E]/10 opacity-50"
                        }`}
                      >
                        <span
                          className={`text-[9px] font-mono uppercase tracking-widest font-bold block mb-1 ${
                            isActive ? "text-brand-coral" : isCompleted ? "text-brand-turquoise" : "text-editorial-muted"
                          }`}
                        >
                          {`PHASE 0${idx + 1}`}
                        </span>
                        <h4
                          className={`text-base font-heading font-bold uppercase tracking-tight leading-snug mb-1.5 ${
                            isActive || isCompleted ? "text-editorial-primary" : "text-editorial-secondary"
                          }`}
                        >
                          {step.title}
                        </h4>
                        <p
                          className={`text-xs font-sans leading-relaxed ${
                            isActive || isCompleted ? "text-editorial-secondary font-medium" : "text-editorial-muted"
                          }`}
                        >
                          {step.description}
                        </p>
                      </div>
                    </foreignObject>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Stationary Bottom HUD Bar */}
        <div className="relative z-30 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-12 flex items-center justify-between border-t border-border pt-3 text-xs font-mono text-editorial-muted">
          <span className="text-[10px] uppercase tracking-widest text-editorial-secondary font-medium truncate">
            {howWeWork.conclusion}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-brand-coral font-bold shrink-0">
            PHASE 0{activeStep + 1} OF 06
          </span>
        </div>
      </div>
    </section>
  );
}
