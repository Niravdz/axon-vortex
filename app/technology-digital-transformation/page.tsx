import type { Metadata } from "next";
import { technologyTransformationData } from "@/data/content/technologyTransformation";
import { AnimatedCategoryPage } from "@/components/sections/AnimatedCategoryPage";

export const metadata: Metadata = {
  title: "Technology & Digital Transformation — AxonVortex Architecture",
  description:
    "We help businesses identify where technology can simplify operations, connect systems and support future growth.",
};

export default function TechnologyTransformationPage() {
  const unifiedData = {
    hero: technologyTransformationData.hero,
    problem: technologyTransformationData.problem,
    services: technologyTransformationData.services,
    approach: {
      badge: technologyTransformationData.approach.badge,
      steps: technologyTransformationData.approach.steps.map((st) => ({
        title: st.title,
        description: st.description,
      })),
    },
    whoThisIsFor: technologyTransformationData.whoThisIsFor,
    finalCta: technologyTransformationData.finalCta,
  };

  return <AnimatedCategoryPage data={unifiedData} narrativeStyle="integration" />;
}
