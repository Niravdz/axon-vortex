"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { individualServicesData } from "@/data/content/individualServices";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { getGSAP } from "@/lib/gsap";

interface DomainMeta {
  id: string;
  name: string;
  href: string;
  services: string[];
  desc: string;
}

const DOMAINS: DomainMeta[] = [
  {
    id: "domain-01",
    name: "DIGITAL MARKETING",
    href: "/digital-marketing",
    services: ["social-media-marketing", "meta-ads", "google-ads", "seo"],
    desc: "Signals moving systematically from visibility toward direct business action.",
  },
  {
    id: "domain-02",
    name: "AI & AUTOMATION",
    href: "/ai-automation",
    services: ["ai-chatbots", "ai-agents", "ai-automation", "voice-ai"],
    desc: "An intelligent technical workflow connecting raw inbound input to automated action.",
  },
  {
    id: "domain-03",
    name: "WEBSITES & E-COMMERCE",
    href: "/websites-ecommerce",
    services: ["website-development", "ecommerce-development", "shopify"],
    desc: "High-performance digital experiences constructed from architecture to commercial conversion.",
  },
  {
    id: "domain-04",
    name: "LEAD GENERATION",
    href: "/lead-generation",
    services: ["lead-generation"],
    desc: "Transforming high-intent attention into verifiable, qualified commercial opportunities.",
  },
  {
    id: "domain-05",
    name: "TECH & DIGITAL TRANSFORMATION",
    href: "/technology-digital-transformation",
    services: ["crm", "custom-software"],
    desc: "Converting fragmented point-tools into a single connected business operating system.",
  },
];

const ServiceRow = ({ slug }: { slug: string }) => {
  const svc = individualServicesData[slug];
  if (!svc) return null;

  return (
    <Link
      href={`/services/${slug}`}
      className="group relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 p-7 sm:p-8 border-b border-white/[0.06] transition-all duration-200 hover:bg-[#171a1e] text-[#EFECE4]"
    >
      <div className="flex flex-col md:flex-row md:items-center gap-4 lg:gap-6 w-full lg:w-auto">
        <span className="w-2 h-2 rounded-full bg-[#3B82F6] shrink-0 group-hover:shadow-[0_0_8px_#3B82F6] transition-all" />
        <h3 className="text-xl md:text-2xl font-heading font-semibold uppercase tracking-tight group-hover:text-[#60A5FA] transition-colors">
          {svc.title}
        </h3>
      </div>

      <p className="text-xs sm:text-sm max-w-xl font-body text-[#9AA3B2] leading-relaxed">
        {svc.hero.headline}
      </p>

      <div className="shrink-0 flex items-center gap-2 font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-[6px] bg-[#171a1e] border border-white/[0.08] text-[#EFECE4] shadow-[0_2px_4px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] group-hover:border-[#3B82F6]/60 group-hover:text-[#3B82F6] transition-all">
        <span>Inspect</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
};

export default function ServicesDirectoryPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeDomain, setActiveDomain] = useState<string>("domain-01");
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const { gsap, ScrollTrigger } = getGSAP();
    const ctx = gsap.context(() => {
      DOMAINS.forEach((domain) => {
        ScrollTrigger.create({
          trigger: `#${domain.id}`,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setActiveDomain(domain.id);
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const scrollToDomain = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full bg-void text-soft-white overflow-x-clip"
    >
      {/* 1. HERO SECTION */}
      <section className="relative pt-16 md:pt-24 pb-16 px-6 sm:px-10 lg:px-12 border-b border-white/[0.08] bg-[#121519]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="flex flex-col gap-6 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e22] border border-[#3B82F6]/35 text-xs font-mono tracking-wider text-[#3B82F6] shadow-[0_2px_6px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
                <span>INDEX</span>
              </div>
              <span className="font-mono text-xs text-[#9AA3B2] uppercase tracking-widest">
                5 DOMAINS // 14 CAPABILITIES
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-semibold uppercase tracking-tight leading-[1.02] text-[#EFECE4]">
              All Services &amp; <br />
              <span className="text-[#3B82F6]">Capabilities.</span>
            </h1>

            <p className="text-base sm:text-lg font-body text-[#9AA3B2] max-w-2xl leading-relaxed border-l-2 border-[#3B82F6] pl-5">
              AxonVortex delivers specialized digital capabilities connected into one unified growth architecture. Capabilities can be deployed independently or integrated as a complete operating system.
            </p>
          </div>

          <div className="flex flex-col gap-4 rounded-[14px] border border-white/[0.08] bg-[#1b1e22] p-6 shadow-[0_12px_28px_-4px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)] min-w-[280px]">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <span className="font-mono text-xs uppercase text-[#9AA3B2]">Volume</span>
              <span className="font-heading font-semibold text-lg text-[#EFECE4]">14 Capabilities</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <span className="font-mono text-xs uppercase text-[#9AA3B2]">Architecture</span>
              <span className="font-heading font-semibold text-lg text-[#3B82F6]">5 Domains</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase text-[#9AA3B2]">Integration</span>
              <span className="font-heading font-semibold text-xs text-[#F4BA00] uppercase">Full Growth Loop</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DIRECTORY LAYOUT (STICKY INDEX + DOMAIN BLOCKS) */}
      <div className="flex flex-col lg:flex-row relative max-w-7xl mx-auto">
        {/* LEFT: Sticky Domain Index */}
        <aside className="w-full lg:w-1/4 xl:w-1/5 lg:border-r border-white/[0.08] bg-[#141619] relative z-40">
          <div className="sticky top-20 p-6 border-b lg:border-b-0 border-white/[0.08] z-30 overflow-x-auto whitespace-nowrap lg:whitespace-normal">
            <span className="hidden lg:block text-xs font-mono uppercase tracking-widest text-[#9AA3B2] mb-5 border-b border-white/[0.06] pb-2 font-medium">
              Domain Switcher
            </span>
            <nav className="flex lg:flex-col gap-2">
              {DOMAINS.map((domain) => {
                const isActive = activeDomain === domain.id;
                return (
                  <button
                    key={domain.id}
                    onClick={() => scrollToDomain(domain.id)}
                    aria-current={isActive ? "step" : undefined}
                    className={`group text-left px-3.5 py-2.5 rounded-[8px] border font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-between cursor-pointer ${
                      isActive
                        ? "bg-[#21252a] text-[#3B82F6] border-[#3B82F6]/50 shadow-[0_4px_16px_rgba(59,130,246,0.2),inset_0_1px_0_rgba(255,255,255,0.1)]"
                        : "bg-[#171a1e] text-[#EFECE4]/80 border-white/[0.06] shadow-[0_2px_4px_rgba(0,0,0,0.4)] hover:border-[#3B82F6]/40 hover:bg-[#21252a]"
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? "bg-[#3B82F6]" : "bg-[#9AA3B2]/50"}`} />
                      <span className="truncate">{domain.name}</span>
                    </div>
                    <ChevronRight
                      className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                        isActive ? "rotate-90 lg:rotate-0 text-[#3B82F6]" : "opacity-0 group-hover:opacity-100"
                      }`}
                    />
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* RIGHT: Domain Chapters */}
        <div className="w-full lg:w-3/4 xl:w-4/5 flex flex-col divide-y divide-white/[0.08]">
          {DOMAINS.map((domain) => {
            return (
              <section
                key={domain.id}
                id={domain.id}
                className="py-16 md:py-20 px-6 sm:px-10 lg:px-12 relative bg-[#141619]"
              >
                <div className="flex flex-col gap-8">
                  {/* Domain Header Box */}
                  <div className="p-7 sm:p-8 rounded-[16px] border border-white/[0.08] bg-[#1b1e22] shadow-[0_12px_28px_-4px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex flex-col gap-2.5 max-w-2xl">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171a1e] border border-[#3B82F6]/35 text-xs font-mono tracking-wider text-[#3B82F6] w-fit shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                        <span>{domain.name}</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-heading font-semibold uppercase tracking-tight text-[#EFECE4] mt-1">
                        {domain.name}
                      </h2>
                      <p className="text-sm font-body text-[#9AA3B2] leading-relaxed">
                        {domain.desc}
                      </p>
                    </div>

                    <Link
                      href={domain.href}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[8px] bg-[#171a1e] border border-white/[0.08] text-[#EFECE4] font-mono text-xs uppercase tracking-wider shadow-[0_2px_6px_rgba(0,0,0,0.4)] hover:bg-[#21252a] hover:border-[#3B82F6]/50 transition-all shrink-0"
                    >
                      <span>Explore Architecture</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#3B82F6]" />
                    </Link>
                  </div>

                  {/* Services List in 3D Recessed Box */}
                  <div className="rounded-[16px] border border-white/[0.08] bg-[#101215] overflow-hidden shadow-[inset_0_2px_6px_rgba(0,0,0,0.85)]">
                    {domain.services.map((slug) => (
                      <ServiceRow key={slug} slug={slug} />
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* 3. FINAL CTA */}
      <section className="py-20 px-6 sm:px-10 lg:px-12 bg-[#121519] text-[#EFECE4] border-t border-white/[0.08] text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16335C]/60 border border-[#F4BA00]/35 text-xs font-mono tracking-wider text-[#F4BA00] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F4BA00] animate-pulse" />
            <span>SYSTEM DIAGNOSIS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-semibold uppercase tracking-tight text-[#EFECE4] mb-4 leading-tight">
            Not Sure Which Capability You Need First?
          </h2>

          <p className="text-base text-[#9AA3B2] max-w-2xl leading-relaxed mb-8">
            Run a Growth Audit. We inspect your acquisition channels, conversion infrastructure, automation workflows, and software systems to identify highest-impact priorities.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="amber"
              size="lg"
              withArrow
              asLink
              href="/growth-audit"
              className="shadow-[0_4px_20px_rgba(244,186,0,0.4)]"
            >
              Request Free Growth Audit
            </Button>

            <Button
              variant="outline"
              size="lg"
              asLink
              href="/contact"
            >
              Book Strategy Call
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
