import type { Metadata } from "next";
import { leadGenerationData } from "@/data/content/leadGeneration";
import { AnimatedCategoryPage } from "@/components/sections/AnimatedCategoryPage";

export const metadata: Metadata = {
  title: "Lead Generation — AxonVortex Acquisition Systems",
  description:
    "Traffic and followers don't automatically become customers. We build lead-generation systems that connect marketing, landing pages, lead capture, CRM and follow-up.",
};

export default function LeadGenerationPage() {
  const unifiedData = {
    hero: leadGenerationData.hero,
    problem: leadGenerationData.problem,
    services: leadGenerationData.services,
    approach: {
      badge: leadGenerationData.leadJourney.badge,
      steps: leadGenerationData.leadJourney.stages.map((st) => ({
        title: st.name,
        description: st.description,
      })),
    },
    whoThisIsFor: leadGenerationData.whoThisIsFor,
    finalCta: leadGenerationData.finalCta,
  };

  return <AnimatedCategoryPage data={unifiedData} narrativeStyle="pipeline" />;
}
