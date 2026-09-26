"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { individualServicesData, IndividualServiceData } from "@/data/content/individualServices";
import { SiteTextureBackground } from "@/components/layout/SiteTextureBackground";
import { EditorialSplit } from "@/components/patterns/EditorialSplit";
import { AlternatingFeatureRows } from "@/components/patterns/AlternatingFeatureRows";
import { ProcessTimeline } from "@/components/patterns/ProcessTimeline";
import { AudienceFitChecklist } from "@/components/patterns/AudienceFitChecklist";
import { CTASection } from "@/components/patterns/CTASection";

const CATEGORY_TO_DOMAIN: Record<string, { href: string; name: string }> = {
  "DIGITAL MARKETING": { href: "/digital-marketing", name: "Digital Marketing" },
  "AI & AUTOMATION": { href: "/ai-automation", name: "AI & Automation" },
  "WEBSITES & E-COMMERCE": { href: "/websites-ecommerce", name: "Websites & E-Commerce" },
  "LEAD GENERATION": { href: "/lead-generation", name: "Lead Generation" },
  "TECHNOLOGY & DIGITAL TRANSFORMATION": { href: "/technology-digital-transformation", name: "Tech Transformation" },
};

export default function ServicePageClient({ slug }: { slug: string }) {
  const data: IndividualServiceData | undefined = individualServicesData[slug];

  if (!data) return null;

  const domainInfo = CATEGORY_TO_DOMAIN[data.category] || { href: "/solutions", name: data.category };

  const relatedServices = Object.values(individualServicesData)
    .filter((s) => s.category === data.category && s.slug !== slug)
    .slice(0, 3);

  // Map whatWeDo deliverables into alternating feature rows
  const deliverableItems = data.whatWeDo.items.map((it, idx) => ({
    id: String(idx),
    step: String(idx + 1).padStart(2, "0"),
    title: it.title,
    description: it.description,
  }));

  // Map approach steps to process timeline if available
  const timelineSteps = data.approach?.steps.map((st, idx) => ({
    number: st.number || String(idx + 1).padStart(2, "0"),
    title: st.title,
    description: st.description,
  }));

  return (
    <SiteTextureBackground className="overflow-x-clip">
      <div className="w-full text-[#EFECE4]">
        {/* 0. BREADCRUMB / TOP SPEC BAR */}
        <div className="w-full border-b border-[#EFECE4]/[0.08] px-4 sm:px-8 lg:px-12 py-3 bg-[#101215]/60 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-wider">
            <div className="flex items-center gap-2 text-[#9AA3B2]">
              <Link href="/services" className="hover:text-[#3B82F6] font-medium transition-colors">
                Services
              </Link>
              <span className="text-white/30">/</span>
              <Link href={domainInfo.href} className="hover:text-[#3B82F6] font-medium transition-colors">
                {data.category}
              </Link>
              <span className="text-white/30">/</span>
              <span className="text-[#3B82F6] font-semibold">{data.title}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="inline-block w-2 h-2 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6] animate-pulse" />
              <span className="font-semibold text-[#EFECE4] tracking-widest text-[11px]">
                PRODUCTION SPECIFICATION
              </span>
            </div>
          </div>
        </div>

        {/* 1. HERO - Editorial Split with Specification Console */}
        <section className="relative w-full border-b border-[#EFECE4]/[0.08] py-16 sm:py-24 px-4 sm:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <EditorialSplit
              badge="CAPABILITY SPEC"
              badgeAccent="blue"
              systemLabel={data.category}
              title={data.hero.headline}
              paragraphs={data.hero.paragraphs}
              primaryCta={data.hero.cta}
              secondaryCta={{
                label: "Request Growth Audit",
                href: "/growth-audit",
              }}
              rightContent={
                <div className="rounded-[20px] bg-[#1b1e22] border border-white/[0.08] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col gap-6">
                  <div className="border-b border-white/[0.08] pb-4">
                    <span className="font-mono text-xs font-semibold tracking-widest text-[#9AA3B2] block mb-1 uppercase">
                      Capability Module
                    </span>
                    <h2 className="font-heading font-semibold text-2xl text-[#EFECE4] uppercase">
                      {data.title}
                    </h2>
                  </div>

                  {/* Specification Details Grid */}
                  <div className="grid grid-cols-2 gap-3.5 p-4 rounded-xl bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_5px_rgba(0,0,0,0.7)] text-xs font-mono">
                    <div>
                      <span className="text-[#9AA3B2] block mb-1">DOMAIN:</span>
                      <span className="font-semibold text-[#EFECE4] uppercase">{domainInfo.name}</span>
                    </div>
                    <div>
                      <span className="text-[#9AA3B2] block mb-1">STANDARD:</span>
                      <span className="font-semibold text-[#F4BA00]">ENTERPRISE</span>
                    </div>
                    <div>
                      <span className="text-[#9AA3B2] block mb-1">SCOPE:</span>
                      <span className="font-semibold text-[#EFECE4]">{data.whatWeDo.items.length} Deliverables</span>
                    </div>
                    <div>
                      <span className="text-[#9AA3B2] block mb-1">INTEGRATION:</span>
                      <span className="font-semibold text-[#3B82F6]">Closed Loop</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_5px_rgba(0,0,0,0.7)]">
                    <span className="font-mono text-xs font-semibold tracking-widest text-[#F4BA00] uppercase block mb-1">
                      System Alignment
                    </span>
                    <p className="text-xs text-[#9AA3B2] font-body leading-relaxed">
                      Engineered to synchronize upstream demand generation directly with downstream conversion and retention.
                    </p>
                  </div>

                  <Link
                    href={domainInfo.href}
                    className="inline-flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#3B82F6] hover:text-[#60A5FA] pt-2"
                  >
                    <span>View {domainInfo.name} Architecture</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              }
            />
          </div>
        </section>

        {/* 2. THE PROBLEM (SYSTEM FRICTION) */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e22] border border-[#F4BA00]/30 text-xs font-mono tracking-wider w-fit text-[#FDE68A]">
                <span>SYSTEM FRICTION</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold tracking-tight uppercase leading-[1.08] text-[#EFECE4]">
                {data.problem.headline}
              </h2>

              {data.problem.purposeLead && (
                <p className="text-sm font-heading font-medium text-[#F4BA00] p-4 rounded-xl bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_4px_rgba(0,0,0,0.7)]">
                  {data.problem.purposeLead}
                </p>
              )}

              {data.problem.paragraphs && (
                <div className="flex flex-col gap-3 text-sm text-[#9AA3B2] font-body leading-relaxed border-l-2 border-[#3B82F6] pl-4">
                  {data.problem.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              )}
            </div>

            {/* Friction Points Ledger */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {data.problem.points && (
                <div className="flex flex-col gap-3">
                  {data.problem.points.map((pt, idx) => (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 rounded-[12px] bg-[#141619] border border-white/[0.06] hover:border-[#3B82F6]/40 transition-colors flex items-start gap-4"
                    >
                      <span className="font-mono text-xs font-semibold text-[#3B82F6] px-2.5 py-1 rounded bg-[#101215] border border-white/[0.04] shrink-0">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <p className="font-body text-xs sm:text-sm text-[#9AA3B2] leading-relaxed pt-0.5">
                        {pt}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {data.problem.flow && (
                <div className="p-5 rounded-[14px] bg-[#141619] border border-white/[0.06] flex flex-col gap-3">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#F4BA00]">
                    OPTIMIZED WORKFLOW CONDUIT:
                  </span>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {data.problem.flow.map((item, idx) => (
                      <React.Fragment key={idx}>
                        <span className="px-3 py-1 rounded-[6px] bg-[#101215] border border-white/[0.04] font-mono text-xs text-[#EFECE4]">
                          {item}
                        </span>
                        {idx < data.problem.flow!.length - 1 && (
                          <ArrowRight className="text-[#3B82F6] w-3.5 h-3.5 shrink-0" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}

              {data.problem.conclusion && (
                <div className="p-4 rounded-[12px] bg-[#101215] border border-white/[0.04] text-xs font-mono text-[#EFECE4]">
                  <strong className="text-[#3B82F6] mr-2">MANDATE:</strong>
                  {data.problem.conclusion}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 3. WHAT WE DO (DELIVERABLE MODULES) */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto flex flex-col gap-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
              <div className="flex flex-col gap-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e22] border border-[#3B82F6]/30 text-xs font-mono tracking-wider w-fit text-[#93C5FD]">
                  <span>DELIVERABLE SCOPE</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold uppercase tracking-tight text-[#EFECE4]">
                  {data.whatWeDo.title}
                </h2>
                <p className="text-sm sm:text-base font-body text-[#9AA3B2] leading-relaxed">
                  Every scope item is structured with clear inputs, production milestones, and verifiable deliverables.
                </p>
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#9AA3B2] shrink-0">
                [{data.whatWeDo.items.length} MODULES]
              </span>
            </div>

            <AlternatingFeatureRows items={deliverableItems} />
          </div>
        </section>

        {/* 4. EXECUTION PROCESS (IF AVAILABLE) */}
        {timelineSteps && timelineSteps.length > 0 && (
          <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
            <div className="max-w-7xl mx-auto">
              <ProcessTimeline
                badge="EXECUTION METHODOLOGY"
                title={data.approach?.title || "How We Deliver"}
                subtitle="A systematic step-by-step process designed to eliminate project surprises."
                steps={timelineSteps}
                accent="blue"
              />
            </div>
          </section>
        )}

        {/* 5. SUITABLE BUSINESSES (AUDIENCE FIT) */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto">
            <AudienceFitChecklist
              badge="QUALIFICATION CRITERIA"
              headline={data.whoItIsFor.headline}
              points={data.whoItIsFor.points}
              conclusion="We evaluate your specific commercial requirements to ensure this capability delivers maximum return on investment."
            />
          </div>
        </section>

        {/* 6. RELATED SERVICES RAIL */}
        {relatedServices.length > 0 && (
          <section className="py-20 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
            <div className="max-w-7xl mx-auto flex flex-col gap-8">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#3B82F6] block mb-1">
                    CONNECTED ECOSYSTEM
                  </span>
                  <h3 className="text-xl sm:text-2xl font-heading font-semibold uppercase tracking-tight text-[#EFECE4]">
                    Related Capabilities in {domainInfo.name}
                  </h3>
                </div>
                <Link
                  href={domainInfo.href}
                  className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs uppercase text-[#9AA3B2] hover:text-[#3B82F6] transition-colors"
                >
                  <span>View All in {domainInfo.name}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedServices.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/services/${rel.slug}`}
                    className="p-6 rounded-[16px] bg-[#141619] border border-white/[0.06] hover:bg-[#171a1e] hover:border-[#3B82F6]/50 transition-all flex flex-col justify-between gap-4 group"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-white/[0.04] mb-3">
                        <span className="font-mono text-xs text-[#9AA3B2] uppercase">
                          {rel.category}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#9AA3B2] group-hover:text-[#3B82F6] transition-colors" />
                      </div>
                      <h4 className="font-heading font-semibold text-base uppercase tracking-tight text-[#EFECE4] group-hover:text-[#60A5FA] transition-colors mb-2">
                        {rel.title}
                      </h4>
                      <p className="font-body text-xs text-[#9AA3B2] line-clamp-2 leading-relaxed">
                        {rel.hero.headline}
                      </p>
                    </div>

                    <span className="font-mono text-[11px] text-[#3B82F6] uppercase tracking-wider">
                      Inspect Specs →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 7. FINAL SERVICE CTA */}
        <CTASection
          badge="CAPABILITY COMMISSION"
          headline={data.finalCta.headline}
          description="Speak with our engineering leads to review your requirements, define scope parameters, and receive a transparent production timeline."
          primaryCta={data.finalCta.cta}
          secondaryCta={{
            label: "Request Growth Audit",
            href: "/growth-audit",
          }}
        />
      </div>
    </SiteTextureBackground>
  );
}
