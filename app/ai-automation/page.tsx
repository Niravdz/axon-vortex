import type { Metadata } from "next";
import { aiAutomationData } from "@/data/content/aiAutomation";
import { AnimatedCategoryPage } from "@/components/sections/AnimatedCategoryPage";

export const metadata: Metadata = {
  title: "AI & Automation — AxonVortex Digital Operations",
  description:
    "AI shouldn't be another expensive tool. We implement practical AI and automation to improve efficiency, customer experience and business processes.",
};

export default function AiAutomationPage() {
  const unifiedData = {
    hero: aiAutomationData.hero,
    problem: aiAutomationData.problem,
    services: aiAutomationData.services,
    approach: {
      badge: aiAutomationData.approach.badge,
      steps: aiAutomationData.approach.steps.map((st) => ({
        title: st.name,
        description: st.question,
      })),
    },
    whoThisIsFor: aiAutomationData.whoThisIsFor,
    finalCta: {
      headline: `${aiAutomationData.finalCta.statement1} ${aiAutomationData.finalCta.statement2}`,
      cta: aiAutomationData.finalCta.cta,
    },
  };

  return <AnimatedCategoryPage data={unifiedData} narrativeStyle="neural" />;
}
