"use client";

import React, { useRef, useLayoutEffect } from "react";
import { SectionMasthead } from "@/components/ui/SectionMasthead";
import { homeContent } from "@/data/content/home";
import { getGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { Users, Building2, Globe2, AlertCircle, TrendingDown, Cpu } from "lucide-react";

const AUDIENCE_ICONS = [
  Users,
  Building2,
  Globe2,
  AlertCircle,
  TrendingDown,
  Cpu,
];

export function WhoWeHelpSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { whoWeHelp } = homeContent;

  useLayoutEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !cardsRef.current) return;

    const { gsap } = getGSAP();
    const cards = cardsRef.current.querySelectorAll(".audience-card");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 25 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="who-we-help"
      className="relative z-10 py-16 sm:py-20 lg:py-28 px-4 sm:px-6 md:px-12 bg-transparent text-editorial-primary border-t border-border overflow-clip"
      style={{ isolation: "isolate" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-8 sm:gap-12">
        {/* Section Masthead */}
        <SectionMasthead
          badge={whoWeHelp.badge}
          descriptor="CLIENT TYPOLOGY"
          rightLabel="[STRATEGIC CLIENT PROFILES]"
        />

        {/* Section Heading */}
        <div className="flex flex-col gap-2 max-w-3xl pb-2">
          <span className="text-[10px] sm:text-[11px] font-mono text-brand-coral uppercase tracking-wider font-semibold">
            ALIGNMENT MATRIX
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold uppercase tracking-tight text-editorial-primary leading-tight">
            {whoWeHelp.headline}
          </h2>
        </div>

        {/* 6 Audience Profile Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {whoWeHelp.audiences.map((aud, idx) => {
            const Icon = AUDIENCE_ICONS[idx % AUDIENCE_ICONS.length];

            return (
              <article
                key={idx}
                className="audience-card p-6 sm:p-8 rounded-[16px] sm:rounded-[20px] bg-[#FFFFFF] border border-[#1E1E2E]/15 shadow-sm flex flex-col justify-between min-h-[200px] transition-all hover:border-brand-coral/60 group"
              >
                <div>
                  <div className="flex items-center justify-between text-editorial-muted mb-4 border-b border-border pb-3">
                    <span className="font-mono text-xs text-brand-coral font-bold">
                      0{idx + 1}
                    </span>
                    <Icon className="w-4 h-4 text-editorial-secondary group-hover:text-brand-coral transition-colors" />
                  </div>

                  <div>
                    <h3 className="text-lg font-heading font-bold text-editorial-primary mb-2">
                      {aud.title}
                    </h3>
                    <p className="text-xs sm:text-[13.5px] text-editorial-secondary font-sans leading-relaxed">
                      {aud.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
