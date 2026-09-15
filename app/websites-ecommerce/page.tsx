import type { Metadata } from "next";
import { websiteEcommerceData } from "@/data/content/websiteEcommerce";
import { AnimatedCategoryPage } from "@/components/sections/AnimatedCategoryPage";

export const metadata: Metadata = {
  title: "Websites & E-Commerce — AxonVortex Architecture",
  description:
    "We build digital experiences designed to communicate your value, create trust, and move visitors toward action. Specializing in high-performance websites and Shopify.",
};

export default function WebsitesEcommercePage() {
  const unifiedData = {
    hero: websiteEcommerceData.hero,
    problem: websiteEcommerceData.problem,
    services: websiteEcommerceData.services,
    approach: {
      badge: websiteEcommerceData.approach.badge,
      steps: websiteEcommerceData.approach.steps.map((st) => ({
        title: st.title,
        description: st.description,
      })),
    },
    whoThisIsFor: websiteEcommerceData.whoThisIsFor,
    finalCta: websiteEcommerceData.finalCta,
  };

  return <AnimatedCategoryPage data={unifiedData} narrativeStyle="blueprint" />;
}
