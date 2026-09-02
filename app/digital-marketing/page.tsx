import type { Metadata } from "next";
import { digitalMarketingData } from "@/data/content/digitalMarketing";
import { AnimatedCategoryPage } from "@/components/sections/AnimatedCategoryPage";

export const metadata: Metadata = {
  title: "Digital Marketing — AxonVortex Growth Systems",
  description:
    "Build visibility, attract the right audience and create meaningful demand with strategic Digital Marketing, Meta Ads, Google Ads and SEO.",
};

export default function DigitalMarketingPage() {
  return <AnimatedCategoryPage data={digitalMarketingData} narrativeStyle="funnel" />;
}
