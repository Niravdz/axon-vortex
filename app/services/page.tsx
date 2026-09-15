"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";
import { BauhausBadge } from "@/components/ui/BauhausBadge";
import { Button } from "@/components/ui/Button";
import { individualServicesData } from "@/data/content/individualServices";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface DomainMeta {
  id: string;
  name: string;
  href: string;
  services: string[];
  desc: string;
  theme: "white" | "gray" | "slate";
  badgeColor: "red" | "yellow" | "blue";
}

const DOMAINS: DomainMeta[] = [
  {
    id: "domain-01",
    name: "DIGITAL MARKETING",
    href: "/digital-marketing",
    services: ["social-media-marketing", "meta-ads", "google-ads", "seo"],
    desc: "Signals moving systematically from visibility toward direct business action.",
    theme: "white",
    badgeColor: "red",
  },
  {
    id: "domain-02",
    name: "AI & AUTOMATION",
    href: "/ai-automation",
    services: ["ai-chatbots", "ai-agents", "ai-automation", "voice-ai"],
    desc: "An intelligent technical workflow connecting raw inbound input to automated action.",
    theme: "slate",
    badgeColor: "yellow",
  },
  {
    id: "domain-03",
    name: "WEBSITES & E-COMMERCE",
    href: "/websites-ecommerce",
    services: ["website-development", "ecommerce-development", "shopify"],
    desc: "High-performance digital experiences constructed from architecture to commercial conversion.",
    theme: "white",
    badgeColor: "blue",
  },
  {
    id: "domain-04",
    name: "LEAD GENERATION",
    href: "/lead-generation",
    services: ["lead-generation"],
    desc: "Transforming high-intent attention into verifiable, qualified commercial opportunities.",
    theme: "gray",
    badgeColor: "red",
  },
  {
    id: "domain-05",
    name: "TECH & DIGITAL TRANSFORMATION",
    href: "/technology-digital-transformation",
    services: ["crm", "custom-software"],
    desc: "Converting fragmented point-tools into a single connected business operating system.",
    theme: "slate",
    badgeColor: "yellow",
  },
];

const ServiceRow = ({ slug, isDark }: { slug: string; isDark: boolean }) => {
  const svc = individualServicesData[slug];
  if (!svc) return null;

  return (
    <Link
      href={`/services/${slug}`}
      className={`group relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 p-8 border-b-2 transition-all ${
        isDark
          ? "border-white/20 hover:bg-white/10 text-white"
          : "border-brand-black hover:bg-brand-yellow/20 text-brand-black"
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-4 lg:gap-6 w-full lg:w-auto">
        <span
          className={`w-2 h-2 shrink-0 ${
            isDark ? "bg-brand-yellow" : "bg-brand-red"
          }`}
        />
        <h3 className="text-xl md:text-2xl font-display font-black uppercase tracking-tight group-hover:text-brand-red transition-colors">
          {svc.title}
        </h3>
      </div>

      <p
        className={`text-sm max-w-xl font-sans leading-relaxed ${
          isDark ? "text-white/80" : "text-brand-black/80"
        }`}
      >
        {svc.hero.headline}
      </p>

      <div
        className={`shrink-0 flex items-center gap-2 font-mono text-xs uppercase font-bold tracking-widest px-4 py-2 border-2 transition-all ${
          isDark
            ? "border-white text-white group-hover:bg-brand-yellow group-hover:text-brand-black group-hover:border-brand-yellow"
            : "border-brand-black text-brand-black group-hover:bg-brand-black group-hover:text-white"
        }`}
      >
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
      className="w-full bg-brand-white text-brand-black selection:bg-brand-red selection:text-white overflow-x-clip"
    >
      {/* 1. HERO SECTION */}
      <section className="relative pt-16 md:pt-24 pb-16 px-6 md:px-12 border-b-2 border-brand-black bg-brand-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          
          <div className="flex flex-col gap-6 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <BauhausBadge variant="red" shape="square">
                INDEX
              </BauhausBadge>
              <BauhausBadge variant="yellow" shape="pill">
                SERVICES DIRECTORY
              </BauhausBadge>
              <span className="font-mono text-xs text-brand-black/60 font-bold uppercase tracking-widest">
                5 DOMAINS // 14 CAPABILITIES
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-8xl font-heading font-bold uppercase tracking-[0.015em] leading-[0.95] text-brand-black">
              All Services &amp; <br />
              <span className="text-brand-red">Capabilities.</span>
            </h1>

            <p className="text-lg sm:text-xl font-body text-brand-black/80 max-w-2xl leading-relaxed border-l-4 border-brand-black pl-6">
              AxonVortex delivers specialized digital capabilities connected into one unified growth architecture. Capabilities can be deployed independently or integrated as a complete operating system.
            </p>
          </div>

          <div className="flex flex-col gap-4 border-2 border-brand-black bg-brand-gray p-6 shadow-hard-md min-w-[280px]">
            <div className="flex items-center justify-between border-b-2 border-brand-black pb-3">
              <span className="font-mono text-xs uppercase text-brand-black/60 font-bold">Volume</span>
              <span className="font-display font-black text-xl text-brand-black">14 Capabilities</span>
            </div>
            <div className="flex items-center justify-between border-b-2 border-brand-black pb-3">
              <span className="font-mono text-xs uppercase text-brand-black/60 font-bold">Architecture</span>
              <span className="font-display font-black text-xl text-brand-red">5 Domains</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase text-brand-black/60 font-bold">Integration</span>
              <span className="font-display font-black text-sm text-brand-blue uppercase">Full Growth Loop</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. DIRECTORY LAYOUT (STICKY INDEX + DOMAIN BLOCKS) */}
      <div className="flex flex-col lg:flex-row relative">
        
        {/* LEFT: Sticky Domain Index */}
        <aside className="w-full lg:w-1/4 xl:w-1/5 lg:border-r-2 border-brand-black bg-brand-gray relative z-40">
          <div className="sticky top-16 md:top-20 p-6 border-b-2 lg:border-b-0 border-brand-black bg-brand-gray z-30 overflow-x-auto whitespace-nowrap lg:whitespace-normal">
            <span className="hidden lg:block text-xs font-mono font-black uppercase tracking-widest text-brand-black/60 mb-6 border-b-2 border-brand-black pb-2">
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
                    className={`group text-left px-4 py-3 border-2 font-mono text-xs font-black uppercase transition-all flex items-center justify-between ${
                      isActive
                        ? "bg-brand-red text-white border-brand-black shadow-hard-sm -translate-y-0.5"
                        : "bg-brand-white text-brand-black border-brand-black/30 hover:border-brand-black hover:bg-brand-yellow/30"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 bg-current shrink-0 opacity-60" />
                      <span className="truncate">{domain.name}</span>
                    </div>
                    <ChevronRight
                      className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                        isActive ? "rotate-90 lg:rotate-0 text-white" : "opacity-0 group-hover:opacity-100"
                      }`}
                    />
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* RIGHT: Domain Chapters */}
        <div className="w-full lg:w-3/4 xl:w-4/5 flex flex-col">
          {DOMAINS.map((domain) => {
            const isDark = domain.theme === "slate";
            return (
              <section
                key={domain.id}
                id={domain.id}
                className={`py-16 md:py-24 px-6 md:px-12 border-b-2 border-brand-black relative ${
                  domain.theme === "white"
                    ? "bg-brand-white text-brand-black"
                    : domain.theme === "gray"
                    ? "bg-brand-gray text-brand-black"
                    : "bg-brand-slate text-white"
                }`}
              >
                <div className="max-w-6xl mx-auto flex flex-col gap-10">
                  
                  {/* Domain Header Box */}
                  <div
                    className={`p-8 border-2 flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                      isDark
                        ? "border-white/20 bg-white/5"
                        : "border-brand-black bg-brand-white shadow-hard-md"
                    }`}
                  >
                    <div className="flex flex-col gap-3 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <BauhausBadge variant={domain.badgeColor} shape="square">
                          DOMAIN
                        </BauhausBadge>
                        <span
                          className={`font-mono text-xs uppercase font-bold tracking-widest ${
                            isDark ? "text-white/60" : "text-brand-black/60"
                          }`}
                        >
                          ARCHITECTURAL SYSTEM
                        </span>
                      </div>
                      <h2
                        className={`text-2xl sm:text-4xl font-display font-black uppercase tracking-tight ${
                          isDark ? "text-white" : "text-brand-black"
                        }`}
                      >
                        {domain.name}
                      </h2>
                      <p
                        className={`text-sm md:text-base font-sans leading-relaxed ${
                          isDark ? "text-white/80" : "text-brand-black/80"
                        }`}
                      >
                        {domain.desc}
                      </p>
                    </div>

                    <Link
                      href={domain.href}
                      className={`inline-flex items-center gap-2 px-5 py-3 border-2 font-mono text-xs uppercase font-bold shrink-0 transition-all ${
                        isDark
                          ? "bg-brand-yellow text-brand-black border-white hover:bg-white"
                          : "bg-brand-black text-white border-brand-black hover:bg-brand-red hover:border-brand-black"
                      }`}
                    >
                      <span>Explore Domain Architecture</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Services List */}
                  <div
                    className={`border-2 ${
                      isDark ? "border-white/20 bg-white/5" : "border-brand-black bg-brand-white shadow-hard-md"
                    }`}
                  >
                    {domain.services.map((slug) => (
                      <ServiceRow key={slug} slug={slug} isDark={isDark} />
                    ))}
                  </div>

                </div>
              </section>
            );
          })}
        </div>

      </div>

      {/* 3. FINAL CTA */}
      <section className="py-20 px-6 md:px-12 bg-brand-yellow text-brand-black border-b-2 border-brand-black">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="px-4 py-1.5 bg-brand-white border-2 border-brand-black font-mono text-xs font-black uppercase mb-6 shadow-hard-sm">
            SYSTEM DIAGNOSIS
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tighter text-brand-black mb-6 leading-tight">
            Not Sure Which Capability You Need First?
          </h2>

          <p className="text-base sm:text-lg font-sans text-brand-black/80 max-w-2xl leading-relaxed mb-8">
            Run a Growth Audit. We inspect your acquisition channels, conversion infrastructure, automation workflows, and software systems to identify highest-impact priorities.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              className="bg-brand-black text-white hover:bg-brand-red hover:text-white text-base px-8 py-4 border-2 border-brand-black shadow-hard-md"
              asLink
              href="/growth-audit"
            >
              Request Free Growth Audit
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="bg-brand-white text-brand-black border-2 border-brand-black hover:bg-brand-gray text-base px-8 py-4 shadow-hard-sm"
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
