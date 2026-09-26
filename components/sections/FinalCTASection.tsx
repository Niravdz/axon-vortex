"use client";

import React from "react";
import { homeContent } from "@/data/content/home";
import { CTASection } from "@/components/patterns/CTASection";

export function FinalCTASection() {
  const { finalCta } = homeContent;

  return (
    <section className="relative w-full bg-[#121519]">
      <CTASection
        badge="TAKE ACTION"
        headline={finalCta.headline}
        description={`${finalCta.subheading} ${finalCta.body}`}
        primaryCta={finalCta.primaryCta}
        secondaryCta={finalCta.secondaryCta}
      />
    </section>
  );
}
