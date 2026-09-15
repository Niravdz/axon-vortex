"use client";

import React, { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { homeContent } from "@/data/content/home";
import { BauhausBadge } from "@/components/ui/BauhausBadge";
import { Button } from "@/components/ui/Button";
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

      // Each domain block reveals when its own threshold enters the viewport
      const blocks = containerRef.current?.querySelectorAll(".solution-block");
      blocks?.forEach((block) => {
        gsap.fromTo(
          block,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            clearProps: "transform,opacity",
            scrollTrigger: {
              trigger: block,
              start: "top 82%",
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
      className="relative w-full bg-[#E9EDF2] text-[#090909] border-b-4 border-[#090909] py-16 sm:py-24 px-6 sm:px-12 lg:px-16"
    >
      <div className="max-w-[1560px] mx-auto">
        {/* Header Block */}
        <div
          data-solutions-header
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b-4 border-[#090909] will-change-[transform,opacity]"
        >
          <div className="max-w-2xl">
            <BauhausBadge variant="red" shape="square" size="sm" className="mb-4">
              {solutionsOverview.badge}
            </BauhausBadge>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight uppercase leading-[0.98] text-[#090909]">
              {solutionsOverview.headline}
            </h2>
          </div>

          <div className="bg-white border-2 border-[#090909] p-6 shadow-[4px_4px_0px_0px_#090909] max-w-md">
            <span className="font-mono text-xs font-bold text-[#F23B32] uppercase tracking-wider block mb-1">
              OUR APPROACH
            </span>
            <p className="font-body text-xs sm:text-sm text-[#090909]/80 leading-relaxed">
              {solutionsOverview.philosophy}
            </p>
          </div>
        </div>

        {/* 5 Domain Blocks with Visual Panels */}
        <div className="mt-12 flex flex-col gap-10">
          {solutionsOverview.solutions.map((sol, idx) => {
            const isEven = idx % 2 === 1;
            const imgSrc = DOMAIN_IMAGES[sol.id] || "/images/bauhaus-tech-hero.png";

            return (
              <div
                key={sol.id}
                className={`solution-block grid grid-cols-1 lg:grid-cols-12 bg-white border-4 border-[#090909] shadow-[8px_8px_0px_0px_#090909] overflow-hidden will-change-[transform,opacity] ${
                  isEven ? "lg:direction-rtl" : ""
                }`}
              >
                {/* Content Side (7 cols) */}
                <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between gap-6 border-b-4 lg:border-b-0 lg:border-r-4 border-[#090909]">
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b-2 border-[#090909]/10">
                      <span className="font-mono text-xs uppercase tracking-widest text-[#090909]/60 font-bold">
                        CAPABILITY DOMAIN
                      </span>
                      <span className="w-2.5 h-2.5 bg-[#F23B32]" aria-hidden="true" />
                    </div>

                    <h3 className="text-2xl sm:text-4xl font-heading font-black tracking-tight text-[#090909] uppercase">
                      {sol.title}
                    </h3>

                    <p className="mt-2 text-base sm:text-lg font-heading font-bold text-[#2F5FA7]">
                      {sol.tagline}
                    </p>

                    <p className="mt-4 font-body text-sm sm:text-base text-[#090909]/80 leading-relaxed max-w-xl">
                      {sol.description}
                    </p>

                    {/* Services Chips */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {sol.services.map((svc, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-[#E9EDF2] border border-[#090909] font-mono text-xs font-semibold text-[#090909]"
                        >
                          {svc}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t-2 border-[#090909]/15 flex items-center justify-between">
                    <Button
                      variant="primary"
                      size="md"
                      withArrow
                      asLink
                      href={sol.href}
                    >
                      Explore {sol.title}
                    </Button>

                    <Link
                      href="/contact"
                      className="font-mono text-xs font-bold uppercase text-[#090909] hover:text-[#F23B32] underline"
                    >
                      Initialize Scope →
                    </Link>
                  </div>
                </div>

                {/* Visual Side (5 cols) */}
                <div className="lg:col-span-5 bg-[#E9EDF2] p-6 sm:p-8 flex items-center justify-center relative overflow-hidden bauhaus-grid-bg">
                  <div className="relative w-full aspect-[16/10] border-2 border-[#090909] bg-white shadow-[4px_4px_0px_0px_#090909] overflow-hidden">
                    <Image
                      src={imgSrc}
                      alt={`${sol.title} diagram`}
                      fill
                      className="object-cover p-1"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
