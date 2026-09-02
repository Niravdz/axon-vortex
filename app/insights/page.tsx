import type { Metadata } from "next";
import InsightsPageClient from "./InsightsPageClient";

export const metadata: Metadata = {
  title: "Insights — AxonVortex Knowledge Hub",
  description:
    "Ideas for businesses growing in a digital world. Practical thinking around marketing, AI, automation, digital transformation and business growth.",
};

export default function InsightsPage() {
  return <InsightsPageClient />;
}
