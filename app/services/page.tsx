"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { SiteTextureBackground } from "@/components/layout/SiteTextureBackground";
import { EditorialSplit } from "@/components/patterns/EditorialSplit";
import { CTASection } from "@/components/patterns/CTASection";
import { individualServicesData } from "@/data/content/individualServices";
import { cn } from "@/lib/utils";

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

export default function ServicesDirectoryPage() {
  const [activeDomainId, setActiveDomainId] = useState<string>("domain-01");
  const [hoveredSlug, setHoveredSlug] = useState<string | null>("social-media-marketing");
  const [mobileOpenDomains, setMobileOpenDomains] = useState<string[]>(["domain-01"]);

  const activeDomain = DOMAINS.find((d) => d.id === activeDomainId) || DOMAINS[0];
  const activeServiceData = hoveredSlug ? individualServicesData[hoveredSlug] : null;

  const toggleMobileDomain = (id: string) => {
    setMobileOpenDomains((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  return (
    <SiteTextureBackground className="overflow-x-clip">
      <div className="w-full text-[#EFECE4]">
        {/* 1. HERO - Editorial Split */}
        <section className="relative w-full border-b border-[#EFECE4]/[0.08] py-16 sm:py-24 px-4 sm:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <EditorialSplit
              badge="SERVICES DIRECTORY"
              badgeAccent="blue"
              systemLabel="5 DOMAINS // 14 CAPABILITIES"
              title={
                <>
                  All Services &amp; <br />
                  <span className="text-[#3B82F6]">Capabilities.</span>
                </>
              }
              subtitle="Specialized digital disciplines engineered to deploy standalone or integrate into a closed-loop operating system."
              paragraphs={[
                "AxonVortex delivers specialized digital capabilities connected into one unified growth architecture.",
                "Whether you require immediate performance advertising, custom software engineering, or autonomous AI agents, each deliverable is structured under the same rigorous standard.",
              ]}
              primaryCta={{
                label: "Request Growth Audit",
                href: "/growth-audit",
              }}
              secondaryCta={{
                label: "Book Strategy Call",
                href: "/contact",
              }}
              rightContent={
                <div className="rounded-[20px] border border-white/[0.08] bg-[#1b1e22] p-6 sm:p-8 shadow-[0_16px_38px_-6px_rgba(0,0,0,0.72),inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                    <span className="font-mono text-xs uppercase text-[#9AA3B2]">Total Capabilities</span>
                    <span className="font-heading font-semibold text-base text-[#EFECE4]">14 Workstreams</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                    <span className="font-mono text-xs uppercase text-[#9AA3B2]">Strategic Architecture</span>
                    <span className="font-heading font-semibold text-base text-[#3B82F6]">5 Domains</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase text-[#9AA3B2]">System Integration</span>
                    <span className="font-mono font-semibold text-xs text-[#F4BA00] uppercase">Closed Loop</span>
                  </div>
                </div>
              }
            />
          </div>
        </section>

        {/* 2. DIRECTORY LAYOUT */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto flex flex-col gap-10">
            {/* Desktop Domain Filter Tabs */}
            <div className="hidden lg:flex items-center gap-2 p-2 rounded-[16px] bg-[#141619] border border-white/[0.08] shadow-[inset_0_2px_6px_rgba(0,0,0,0.85)]">
              {DOMAINS.map((domain) => {
                const isActive = activeDomainId === domain.id;
                return (
                  <button
                    key={domain.id}
                    type="button"
                    onClick={() => {
                      setActiveDomainId(domain.id);
                      if (domain.services[0]) setHoveredSlug(domain.services[0]);
                    }}
                    className={cn(
                      "flex-1 py-3 px-4 rounded-[10px] font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5",
                      isActive
                        ? "bg-[#1b1e22] text-[#3B82F6] border border-[#3B82F6]/40 shadow-[0_4px_14px_rgba(59,130,246,0.2),inset_0_1px_0_rgba(255,255,255,0.1)] font-semibold"
                        : "text-[#9AA3B2] hover:text-[#EFECE4] hover:bg-[#171a1e]"
                    )}
                  >
                    <span
                      className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        isActive ? "bg-[#3B82F6] shadow-[0_0_6px_#3B82F6]" : "bg-white/20"
                      )}
                    />
                    <span>{domain.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Desktop Content Grid (8 cols list + 4 cols live preview) */}
            <div className="hidden lg:grid grid-cols-12 gap-8 items-start">
              {/* Services List Column (7 cols) */}
              <div className="col-span-7 flex flex-col rounded-[20px] bg-[#141619] border border-white/[0.08] divide-y divide-white/[0.06] overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.7)]">
                {activeDomain.services.map((slug, idx) => {
                  const svc = individualServicesData[slug];
                  if (!svc) return null;
                  const isHovered = hoveredSlug === slug;

                  return (
                    <div
                      key={slug}
                      onMouseEnter={() => setHoveredSlug(slug)}
                      onFocus={() => setHoveredSlug(slug)}
                      className={cn(
                        "p-6 sm:p-7 flex items-center justify-between gap-6 transition-colors duration-200 group",
                        isHovered ? "bg-[#1b1e22]" : "hover:bg-[#171a1e]"
                      )}
                    >
                      <div className="flex items-start gap-4">
                        <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#101215] border border-white/[0.04] text-[#3B82F6] shrink-0 mt-0.5">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h3 className="font-heading font-semibold text-lg uppercase tracking-tight text-[#EFECE4] group-hover:text-[#60A5FA] transition-colors">
                            {svc.title}
                          </h3>
                          <p className="font-body text-xs sm:text-sm text-[#9AA3B2] leading-relaxed line-clamp-2 mt-1">
                            {svc.hero.headline}
                          </p>
                        </div>
                      </div>

                      <Link
                        href={`/services/${slug}`}
                        className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[6px] bg-[#101215] border border-white/[0.06] text-xs font-mono uppercase tracking-wider text-[#EFECE4] hover:text-[#3B82F6] hover:border-[#3B82F6]/50 transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]"
                      >
                        <span>Inspect</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  );
                })}
              </div>

              {/* Desktop Live Preview Column (5 cols) */}
              <div className="col-span-5 rounded-[20px] bg-[#1b1e22] border border-white/[0.08] p-8 shadow-[0_16px_38px_-6px_rgba(0,0,0,0.72),inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col gap-6 sticky top-28">
                {activeServiceData ? (
                  <>
                    <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                      <span className="font-mono text-xs font-semibold text-[#3B82F6] uppercase tracking-wider">
                        SPECIFICATION PREVIEW
                      </span>
                      <span className="px-2.5 py-0.5 rounded bg-[#101215] border border-white/[0.04] text-[11px] font-mono text-[#F4BA00]">
                        {activeServiceData.category}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-2xl font-heading font-semibold uppercase tracking-tight text-[#EFECE4] leading-tight">
                        {activeServiceData.title}
                      </h4>
                      <p className="font-body text-xs sm:text-sm text-[#9AA3B2] leading-relaxed mt-2">
                        {activeServiceData.hero.paragraphs[0]}
                      </p>
                    </div>

                    {activeServiceData.whatWeDo?.items && (
                      <div className="p-4 rounded-[12px] bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_5px_rgba(0,0,0,0.78)] flex flex-col gap-2">
                        <span className="font-mono text-[11px] uppercase tracking-wider text-[#F4BA00] block mb-1">
                          Core Scope ({activeServiceData.whatWeDo.items.length} Deliverables):
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {activeServiceData.whatWeDo.items.slice(0, 4).map((it, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded bg-[#171a1e] border border-white/[0.04] text-[11px] font-mono text-[#EFECE4]"
                            >
                              {it.title}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-2">
                      <Link
                        href={`/services/${activeServiceData.slug}`}
                        className="w-full inline-flex items-center justify-between px-5 py-3 rounded-[8px] bg-[#171a1e] border border-[#3B82F6]/30 text-[#EFECE4] hover:text-[#3B82F6] hover:border-[#3B82F6]/60 transition-colors font-mono text-xs uppercase tracking-wider shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
                      >
                        <span>Full Deliverable Specifications</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </>
                ) : (
                  <p className="font-mono text-xs text-[#9AA3B2]">
                    Hover over any capability row to inspect detailed specifications.
                  </p>
                )}
              </div>
            </div>

            {/* Mobile View: Accessible Domain Accordions with Directly Tappable Links */}
            <div className="flex lg:hidden flex-col gap-4">
              {DOMAINS.map((domain) => {
                const isOpen = mobileOpenDomains.includes(domain.id);

                return (
                  <div
                    key={domain.id}
                    className="rounded-[16px] bg-[#141619] border border-white/[0.08] overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.6)]"
                  >
                    <button
                      type="button"
                      onClick={() => toggleMobileDomain(domain.id)}
                      aria-expanded={isOpen}
                      className={cn(
                        "w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer",
                        isOpen ? "bg-[#1b1e22]" : "hover:bg-[#171a1e]"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "w-2 h-2 rounded-full shrink-0",
                            isOpen ? "bg-[#3B82F6] shadow-[0_0_8px_#3B82F6]" : "bg-white/20"
                          )}
                        />
                        <div>
                          <h3 className="font-heading font-semibold text-base uppercase tracking-tight text-[#EFECE4]">
                            {domain.name}
                          </h3>
                          <span className="font-mono text-xs text-[#9AA3B2]">
                            {domain.services.length} Capabilities
                          </span>
                        </div>
                      </div>

                      <ChevronDown
                        className={cn(
                          "w-4 h-4 text-[#9AA3B2] transition-transform",
                          isOpen ? "rotate-180 text-[#3B82F6]" : ""
                        )}
                      />
                    </button>

                    {/* Accordion Content: Directly Tappable Capability Rows */}
                    {isOpen && (
                      <div className="p-4 bg-[#101215] border-t border-white/[0.06] flex flex-col gap-3">
                        {domain.services.map((slug, idx) => {
                          const svc = individualServicesData[slug];
                          if (!svc) return null;

                          return (
                            <div
                              key={slug}
                              className="p-4 rounded-[12px] bg-[#171a1e] border border-white/[0.06] flex flex-col gap-3"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-xs font-semibold text-[#3B82F6]">
                                  0{idx + 1}
                                </span>
                                <Link
                                  href={`/services/${slug}`}
                                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#101215] border border-white/[0.06] font-mono text-xs uppercase text-[#3B82F6] hover:text-[#60A5FA]"
                                >
                                  <span>Inspect</span>
                                  <ArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                              </div>

                              <h4 className="font-heading font-semibold text-base uppercase tracking-tight text-[#EFECE4]">
                                {svc.title}
                              </h4>

                              <p className="font-body text-xs text-[#9AA3B2] leading-relaxed">
                                {svc.hero.headline}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. FINAL DIRECTORY CTA */}
        <CTASection
          badge="SYSTEM DIAGNOSIS"
          headline="Not Sure Which Capability You Need First?"
          description="Run a Growth Audit. We inspect your acquisition channels, conversion infrastructure, automation workflows, and software systems to prioritize your highest-leverage actions."
          primaryCta={{
            label: "Request Growth Audit",
            href: "/growth-audit",
          }}
          secondaryCta={{
            label: "Book Strategy Call",
            href: "/contact",
          }}
        />
      </div>
    </SiteTextureBackground>
  );
}
