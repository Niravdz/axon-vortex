"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
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

// Exact waypoint coordinates in the unified SVG track coordinate system (5400 x 640)
// 01: Circle ABOVE content (x: 450, y: 150)
// 02: Circle BELOW content (x: 1350, y: 490)
// 03: Circle ABOVE content (x: 2250, y: 150)
// 04: Circle BELOW content (x: 3150, y: 490)
// 05: Circle ABOVE content (x: 4050, y: 150)
// 06: Circle BELOW content (x: 4950, y: 490)
const CIRCLE_WAYPOINTS = [
  { x: 450, y: 150, isCircleAbove: true },
  { x: 1350, y: 490, isCircleAbove: false },
  { x: 2250, y: 150, isCircleAbove: true },
  { x: 3150, y: 490, isCircleAbove: false },
  { x: 4050, y: 150, isCircleAbove: true },
  { x: 4950, y: 490, isCircleAbove: false },
];

// Smooth, continuous path with EXACTLY ONE simple, softly rounded oval loop per connection (5 loops total)
// Gentle connecting sweep -> clean modest oval loop -> gentle approach to the next circle
const FLOWING_FIVE_LOOP_PATH = `
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

export function ApproachSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const signalRef = useRef<SVGCircleElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const { howWeWork } = homeContent;
  const steps = howWeWork.steps;

  useLayoutEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !pinContainerRef.current || !trackRef.current) return;

    const { gsap } = getGSAP();
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const section = sectionRef.current;
      const pinContainer = pinContainerRef.current;
      const track = trackRef.current;
      const path = pathRef.current;
      const signal = signalRef.current;

      if (!section || !pinContainer || !track || !path || !signal) return;

      const pathLength = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      // Calculate exact distance along the path to each circle waypoint
      const contactDistances: number[] = [];
      const sampleCount = 800;
      CIRCLE_WAYPOINTS.forEach((circle) => {
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

      // Ensure first waypoint starts at 0
      contactDistances[0] = 0;

      // Place initial leading dot at start
      const startPt = path.getPointAtLength(0);
      gsap.set(signal, { cx: startPt.x, cy: startPt.y });

      const maxScrollX = track.scrollWidth - window.innerWidth + 160;

      // Master ScrollTrigger timeline mapping scroll strictly to cumulative arc length
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${maxScrollX + 900}`,
          pin: pinContainer,
          pinSpacing: true,
          scrub: 0.3,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const currentDist = self.progress * pathLength;
            
            // 1. Advance strokeDashoffset based on master distance
            gsap.set(path, { strokeDashoffset: pathLength - currentDist });

            // 2. Position clean leading dot at exact physical tip
            const pt = path.getPointAtLength(currentDist);
            signal.setAttribute("cx", pt.x.toString());
            signal.setAttribute("cy", pt.y.toString());

            // 3. Determine active step based strictly on physical contact with the circle
            let currentActive = 0;
            for (let i = 0; i < contactDistances.length; i++) {
              if (currentDist >= contactDistances[i] - 16) {
                currentActive = i;
              }
            }
            setActiveStep(currentActive);
          },
        },
      });

      // Synchronized Linear Horizontal Track Movement
      tl.to(
        track,
        {
          x: () => -maxScrollX,
          ease: "none",
          duration: 1.0,
        },
        0
      );

      return () => {
        tl.kill();
      };
    });

    mm.add("(max-width: 1023px)", () => {
      if (trackRef.current) gsap.set(trackRef.current, { clearProps: "all" });
    });

    return () => mm.revert();
  }, [prefersReducedMotion, steps.length]);

  // Handler to smoothly scroll to a specific phase
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
      {/* Pinned Desktop Viewport Stage */}
      <div
        ref={pinContainerRef}
        className="w-full lg:h-screen flex flex-col justify-between py-8 lg:py-12 overflow-hidden"
      >
        {/* Stationary Top Section Header HUD with Step Navigation */}
        <div className="relative z-30 max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-3.5 mb-2">
          <div className="flex items-center gap-3">
            <Badge variant="code">{howWeWork.badge}</Badge>
            <span className="text-[11px] font-mono text-editorial-secondary uppercase tracking-widest">
              {howWeWork.headline}
            </span>
          </div>

          {/* Interactive 6-Step Progress Navigation */}
          <div className="flex items-center gap-2 sm:gap-4" role="tablist" aria-label="Process Journey Phases">
            {steps.map((st, idx) => {
              const isActive = activeStep === idx;
              const isCompleted = activeStep > idx;

              return (
                <button
                  key={st.step}
                  onClick={() => handleStepClick(idx)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono transition-all duration-300 ${
                    isActive
                      ? "bg-accent-orange text-white font-bold shadow-[0_0_16px_rgba(255,138,0,0.4)] scale-105"
                      : isCompleted
                      ? "bg-editorial-primary/10 text-editorial-primary font-semibold hover:bg-editorial-primary/20"
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
            {/* Unified SVG Canvas for Line, Milestones, and Text Exclusions */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-auto"
              viewBox="0 0 5400 640"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* 1. Background Reference Path (Muted Preview Route) */}
              <path
                d={FLOWING_FIVE_LOOP_PATH}
                stroke="#0F2747"
                strokeOpacity="0.10"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="4 6"
              />

              {/* 2. Foreground Progressive Line (Deep Slate #0F2747) */}
              <path
                ref={pathRef}
                d={FLOWING_FIVE_LOOP_PATH}
                stroke="#0F2747"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* 3. Small Clean Leading Explorer Dot at the Drawing Tip */}
              <circle
                ref={signalRef}
                r="6.5"
                fill="#FF8A00"
                stroke="#FFF8EC"
                strokeWidth="2"
              />

              {/* 4. Render All Six Milestones & Text in the Exact Same SVG Grid */}
              {steps.map((step, idx) => {
                const IconComponent = STEP_ICONS[idx % STEP_ICONS.length];
                const waypoint = CIRCLE_WAYPOINTS[idx];
                const isCircleAbove = waypoint.isCircleAbove;
                const isActive = activeStep === idx;
                const isCompleted = activeStep >= idx;

                return (
                  <g key={step.step} className="select-none">
                    {/* A. MANDATORY WAYPOINT CIRCLE (Exact Center at waypoint.x, waypoint.y) */}
                    <g
                      transform={`translate(${waypoint.x}, ${waypoint.y})`}
                      className="cursor-pointer"
                      onClick={() => handleStepClick(idx)}
                    >
                      {/* Solid Sand White Circle (Masks underlying SVG path completely) */}
                      <circle
                        r="38"
                        fill="#FFF8EC"
                        stroke={isActive ? "#FF8A00" : isCompleted ? "#0F2747" : "rgba(15,39,71,0.25)"}
                        strokeWidth="3.5"
                        filter="drop-shadow(0 0 14px rgba(15,39,71,0.08))"
                        className="transition-colors duration-300"
                      />

                      {/* Icon inside Circle */}
                      <foreignObject x="-18" y="-18" width="36" height="36" className="pointer-events-none">
                        <div className="w-full h-full flex items-center justify-center">
                          <IconComponent
                            className={`w-6 h-6 transition-colors duration-300 ${
                              isActive ? "text-accent-orange" : isCompleted ? "text-editorial-primary" : "text-editorial-muted"
                            }`}
                          />
                        </div>
                      </foreignObject>

                      {/* Step Number Tag Badge */}
                      <foreignObject x="-24" y="24" width="48" height="26" className="pointer-events-none">
                        <div className="w-full h-full flex items-center justify-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border transition-colors duration-300 ${
                              isActive
                                ? "bg-accent-orange text-white border-accent-orange"
                                : isCompleted
                                ? "bg-editorial-primary text-white border-editorial-primary"
                                : "bg-[#FFF8EC] text-editorial-muted border-[rgba(15,39,71,0.20)]"
                            }`}
                          >
                            {step.step}
                          </span>
                        </div>
                      </foreignObject>
                    </g>

                    {/* B. DEDICATED TOPIC CONTENT IN SAFE EXCLUSION ZONE (Never Touched by Path) */}
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
                            isActive ? "text-accent-orange" : isCompleted ? "text-editorial-primary" : "text-editorial-muted"
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
        {/* MOBILE & TABLET: Vertical Connected Process Timeline with Alternating Nodes */}
        {/* ========================================================================= */}
        <div className="lg:hidden max-w-7xl mx-auto w-full px-6 py-8 flex flex-col gap-10">
          {steps.map((step, idx) => {
            const IconComponent = STEP_ICONS[idx % STEP_ICONS.length];
            const isCircleAbove = idx % 2 === 0;

            return (
              <div
                key={step.step}
                className="relative flex flex-col items-center text-center gap-4 bg-[#FFF8EC]/95 border border-[rgba(15,39,71,0.12)] rounded-[28px] p-6 shadow-sm"
              >
                {/* Circle (Above or Below in Mobile Card) */}
                <div
                  className={`w-14 h-14 rounded-full bg-[#FFF8EC] border-2 border-accent-orange flex items-center justify-center shrink-0 shadow-sm text-accent-orange ${
                    isCircleAbove ? "order-1" : "order-2"
                  }`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>

                {/* Topic Heading and Description */}
                <div className={isCircleAbove ? "order-2" : "order-1"}>
                  <span className="text-xs font-mono font-bold text-accent-orange tracking-wider block mb-1">
                    PHASE {step.step}
                  </span>
                  <h3 className="text-2xl font-heading font-bold uppercase tracking-tight text-editorial-primary leading-tight mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-editorial-secondary font-sans leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stationary Bottom HUD Bar */}
        <div className="relative z-30 max-w-7xl mx-auto w-full px-6 md:px-12 flex items-center justify-between border-t border-border pt-3.5 text-xs font-mono text-editorial-muted">
          <span className="text-[10px] uppercase tracking-widest text-editorial-secondary font-medium">
            {howWeWork.conclusion}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-accent-orange font-bold">
            PROGRESS // PHASE 0{activeStep + 1} OF 06
          </span>
        </div>
      </div>
    </section>
  );
}
