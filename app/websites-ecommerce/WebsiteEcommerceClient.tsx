"use client";

import React from "react";
import Image from "next/image";
import { websiteEcommerceData } from "@/data/content/websiteEcommerce";
import { SiteTextureBackground } from "@/components/layout/SiteTextureBackground";
import { EditorialSplit } from "@/components/patterns/EditorialSplit";
import { DiagnosticMatrix } from "@/components/patterns/DiagnosticMatrix";
import { AlternatingFeatureRows } from "@/components/patterns/AlternatingFeatureRows";
import { ProcessTimeline } from "@/components/patterns/ProcessTimeline";
import { ManifestoSection } from "@/components/patterns/ManifestoSection";
import { CTASection } from "@/components/patterns/CTASection";

export function WebsiteEcommerceClient() {
  const { hero, problem, services, approach, purpose, finalCta } = websiteEcommerceData;

  // Diagnostic items mapping digital friction to conversion architecture fixes
  const conversionDiagnostic = [
    {
      problem: "Visitors leave within seconds without understanding what you do",
      recommendation: "Clear Messaging Hierarchy & Above-the-Fold Positioning",
      href: "/services/website-development",
    },
    {
      problem: "Desktop site is acceptable, but mobile experience is slow and clunky",
      recommendation: "Mobile-First Fluid Responsive Architecture (Touch Targets >= 44px)",
      href: "/services/website-development",
    },
    {
      problem: "Landing pages receive paid traffic but generate virtually no inquiries",
      recommendation: "High-Intent Dedicated Landing Page Engineering",
    },
    {
      problem: "E-commerce store has cart abandonment and checkout friction",
      recommendation: "Frictionless Checkout & Shopify / Custom Commerce Architecture",
      href: "/services/shopify",
    },
  ];

  // Map services into alternating feature rows
  const serviceItems = services.map((svc, idx) => ({
    id: svc.slug || String(idx),
    step: String(idx + 1).padStart(2, "0"),
    title: svc.title,
    slug: svc.slug,
    description: svc.description,
    deliverables: [
      "Custom responsive design",
      "Semantic SEO foundation",
      "Fast Core Web Vitals",
      "Conversion tracking",
    ],
    cta: svc.slug
      ? {
          label: "Inspect Architecture Specs",
          href: `/services/${svc.slug}`,
        }
      : undefined,
  }));

  // Timeline steps for website delivery lifecycle
  const lifecycleSteps = approach.steps.map((st, idx) => ({
    number: String(idx + 1).padStart(2, "0"),
    title: st.title,
    description: st.description,
  }));

  return (
    <SiteTextureBackground className="overflow-x-clip">
      <div className="w-full text-[#EFECE4]">
        {/* 1. LAYERED INTERFACE COMPOSITION HERO */}
        <section className="relative w-full border-b border-[#EFECE4]/[0.08] py-16 sm:py-24 px-4 sm:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <EditorialSplit
              badge={hero.badge}
              badgeAccent="blue"
              systemLabel="EXPERIENCE ENGINEERING"
              title={
                <>
                  Your Website <br />
                  <span className="text-[#3B82F6]">Should Do More</span> <br />
                  <span className="text-[#F4BA00]">Than Just Exist.</span>
                </>
              }
              subtitle="Your website is not an online brochure. It is your primary digital salesperson, credibility engine and conversion bridge."
              paragraphs={hero.paragraphs.slice(1)}
              primaryCta={hero.cta}
              secondaryCta={{
                label: "Inspect Capabilities",
                href: "#capabilities",
              }}
              rightContent={
                <div className="rounded-[20px] bg-[#1b1e22] border border-white/[0.08] p-5 sm:p-7 shadow-box-lg flex flex-col gap-4">
                  <div className="flex items-center justify-between text-xs font-mono text-[#9AA3B2] border-b border-white/[0.06] pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
                      <span className="text-[#EFECE4] uppercase">BLUEPRINT SPEC</span>
                    </div>
                    <span className="text-[#F4BA00]">CONVERSION ARCHITECTURE</span>
                  </div>

                  <div className="relative w-full aspect-[16/10] rounded-[12px] bg-[#101215] border border-white/[0.04] overflow-hidden shadow-box-inset">
                    <Image
                      src="/images/bauhaus-diagram-ecommerce.jpg"
                      alt="Website Interface & E-Commerce Conversion Architecture Schematic"
                      fill
                      priority
                      className="object-contain p-3 opacity-90 hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-[#9AA3B2] pt-1">
                    <span>NEXT.JS &amp; SHOPIFY</span>
                    <span className="text-[#3B82F6] font-semibold">PERFORMANCE RATED</span>
                  </div>
                </div>
              }
            />
          </div>
        </section>

        {/* 2. CONVERSION ARCHITECTURE & FRICTION DIAGNOSTIC */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto flex flex-col gap-10">
            <DiagnosticMatrix
              badge={problem.badge}
              title={problem.headline}
              subtitle="A site can win design awards and still completely fail at commercial conversion if information hierarchy, speed, and call-to-action pathways are broken."
              items={conversionDiagnostic}
              conclusion={problem.conclusion}
            />
          </div>
        </section>

        {/* 3. OPEN SERVICE LIST (Business Sites, Landing Pages, E-Com, Shopify) */}
        <section id="capabilities" className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto flex flex-col gap-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
              <div className="flex flex-col gap-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e22] border border-[#3B82F6]/30 text-xs font-mono tracking-wider w-fit text-[#93C5FD]">
                  <span>TECHNICAL DISCIPLINES</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold uppercase tracking-tight text-[#EFECE4]">
                  What We Build
                </h2>
                <p className="text-sm sm:text-base font-body text-[#9AA3B2] leading-relaxed">
                  Tailored web and e-commerce platforms engineered for speed, responsiveness and commercial conversion.
                </p>
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#9AA3B2] shrink-0">
                [{services.length} CORE CAPABILITIES]
              </span>
            </div>

            <AlternatingFeatureRows items={serviceItems} />
          </div>
        </section>

        {/* 4. DESIGN & DEVELOPMENT PROCESS TIMELINE */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto">
            <ProcessTimeline
              badge={approach.badge}
              title="End-to-End Build Framework"
              subtitle="From first strategy session to launch and continuous post-launch optimization."
              steps={lifecycleSteps}
              accent="blue"
            />
          </div>
        </section>

        {/* 5. PURPOSE & OUTCOME MANIFESTO */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto">
            <ManifestoSection
              badge={purpose.badge}
              badgeAccent="amber"
              statement={purpose.headline}
              supportingText="A website must do more than look modern. It must explain your value clearly, earn trust with skeptical prospects, and make taking the next step completely effortless."
              items={purpose.points}
              conclusion="A website should explain your value, build credibility, and convert opportunities."
            />
          </div>
        </section>

        {/* 6. FINAL WEBSITE CTA */}
        <CTASection
          badge="DIGITAL INFRASTRUCTURE"
          headline={finalCta.headline}
          description="Speak with our interface architects to evaluate your existing digital presence or map out a high-converting new build."
          primaryCta={finalCta.cta}
          secondaryCta={{
            label: "Explore Growth Audit",
            href: "/growth-audit",
          }}
        />
      </div>
    </SiteTextureBackground>
  );
}
