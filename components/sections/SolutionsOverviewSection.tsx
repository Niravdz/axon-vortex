"use client";

import React, { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { homeContent } from "@/data/content/home";
import { TactileButton } from "@/components/ui/TactileButton";
import { MatteSection } from "@/components/ui/MatteSection";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { getGSAP } from "@/lib/gsap";

const DOMAIN_IMAGES: Record<string, string> = {
  "digital-marketing": "/images/bauhaus-diagram-marketing.png",
  "ai-automation": "/images/bauhaus-diagram-ai.png",
  "websites-ecommerce": "/images/bauhaus-diagram-ecommerce.jpg",
  "lead-generation": "/images/bauhaus-diagram-leadgen.jpg",
  "technology-digital-transformation": "/images/bauhaus-diagram-technology.jpg",
};

export function SolutionsOverviewSection() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { solutionsOverview } = homeContent;

  useLayoutEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const { gsap } = getGSAP();
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        "[data-solutions-header]",
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

      // Each domain block reveals with elevation when entering viewport
      const blocks = containerRef.current?.querySelectorAll(".solution-block");
      blocks?.forEach((block) => {
        gsap.fromTo(
          block,
          { opacity: 0, y: 28, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            clearProps: "transform,opacity",
            scrollTrigger: {
              trigger: block,
              start: "top 84%",
              once: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="solutions"
      ref={containerRef}
      className="relative w-full bg-[#121519] text-[#EFECE4] border-b border-[#EFECE4]/[0.08] py-16 sm:py-24 px-4 sm:px-8 lg:px-12 overflow-hidden"
    >
      {/* Background Subtle Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/4 w-[600px] h-[500px] bg-[#3B82F6]/[0.05] rounded-full blur-[150px]"
      />

      <div className="max-w-7xl mx-auto">
        <MatteSection radius="24" className="p-6 sm:p-10 lg:p-12 mb-10">
          {/* Header Block */}
          <div
            data-solutions-header
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-[#EFECE4]/[0.08] will-change-[transform,opacity]"
          >
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20252B] border border-[#3B82F6]/30 text-xs font-mono tracking-wider text-[#3B82F6] mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
                <span>{solutionsOverview.badge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-tight uppercase leading-[1.05] text-[#EFECE4]">
                {solutionsOverview.headline}
              </h2>
            </div>

            <div className="rounded-[14px] bg-[#171a1e] border border-white/[0.08] p-5 shadow-[0_8px_20px_-3px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)] max-w-md shrink-0">
              <span className="font-mono text-xs font-semibold text-[#F4BA00] uppercase tracking-wider block mb-1">
                OUR ARCHITECTURAL PHILOSOPHY
              </span>
              <p className="font-body text-xs sm:text-sm text-[#9AA3B2] leading-relaxed">
                {solutionsOverview.philosophy}
              </p>
            </div>
          </div>
        </MatteSection>

        {/* 5 Domain Blocks as Tactile Matte Modules */}
        <div className="flex flex-col gap-8">
          {solutionsOverview.solutions.map((sol) => {
            const imgSrc = DOMAIN_IMAGES[sol.id] || "/images/bauhaus-tech-hero.png";

            return (
              <MatteSection
                key={sol.id}
                radius="20"
                className="solution-block overflow-hidden transition-all duration-300 hover:border-[#3B82F6]/40 hover:shadow-[0_20px_48px_rgba(0,0,0,0.8),0_0_24px_rgba(59,130,246,0.15)] will-change-[transform,opacity]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  {/* Content Side (7 cols) */}
                  <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-between gap-6 border-b lg:border-b-0 lg:border-r border-white/[0.08] bg-[#1b1e22]">
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-2xl sm:text-3xl font-heading font-semibold tracking-tight text-[#EFECE4] uppercase">
                          {sol.title}
                        </h3>
                        <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] shrink-0 mt-2 shadow-[0_0_8px_#3B82F6]" aria-hidden="true" />
                      </div>

                      <p className="mt-2 text-base font-heading font-medium text-[#60A5FA]">
                        {sol.tagline}
                      </p>

                      <p className="mt-4 font-body text-sm text-[#9AA3B2] leading-relaxed max-w-xl">
                        {sol.description}
                      </p>

                      {/* Recessed Services Track */}
                      <div className="mt-6 p-3 rounded-[10px] bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_5px_rgba(0,0,0,0.78),inset_0_1px_1px_rgba(0,0,0,0.92),0_1px_0_rgba(255,255,255,0.04)] flex flex-wrap gap-2">
                        {sol.services.map((svc, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-[6px] bg-[#171a1e] border border-white/[0.06] font-mono text-xs text-[#EFECE4]/90 shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04)]"
                          >
                            {svc}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                      <TactileButton
                        variant="secondary"
                        size="md"
                        withArrow
                        asLink
                        href={sol.href}
                      >
                        Explore {sol.title}
                      </TactileButton>

                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#9AA3B2] hover:text-[#EFECE4] transition-colors group"
                      >
                        <span>Discuss this solution</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>

                  {/* Visual Side (5 cols) */}
                  <div className="lg:col-span-5 relative min-h-[260px] sm:min-h-[320px] bg-[#141619] flex items-center justify-center p-8 overflow-hidden">
                    <div className="relative w-full h-full max-h-[320px] rounded-[14px] overflow-hidden border border-white/[0.06] bg-[#101215] shadow-[inset_0_2px_6px_rgba(0,0,0,0.85)]">
                      <Image
                        src={imgSrc}
                        alt={`${sol.title} architecture diagram`}
                        fill
                        className="object-cover opacity-85 hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#141619]/80 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                </div>
              </MatteSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
