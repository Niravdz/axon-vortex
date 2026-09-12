import type { Metadata } from "next";
import TermsOfServiceContent from "@/components/legal/TermsOfServiceContent";

export const metadata: Metadata = {
  title: "Terms of Service — AxonVortex Commercial Governance",
  description: "Official Terms of Service of AxonVortex governing client engagements, deliverables, IP ownership, and commercial terms.",
};

export default function TermsOfServicePage() {
  return <TermsOfServiceContent />;
}
