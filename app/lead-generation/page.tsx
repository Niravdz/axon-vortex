import type { Metadata } from "next";
import { LeadGenerationClient } from "./LeadGenerationClient";

export const metadata: Metadata = {
  title: "Lead Generation — AxonVortex Acquisition Systems",
  description:
    "Turn attention into qualified opportunities. We build structured lead funnels, high-converting landing pages and automated CRM follow-up systems.",
};

export default function LeadGenerationPage() {
  return <LeadGenerationClient />;
}
