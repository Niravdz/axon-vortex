import type { Metadata } from "next";
import PrivacyPolicyContent from "@/components/legal/PrivacyPolicyContent";

export const metadata: Metadata = {
  title: "Privacy Policy — AxonVortex DPDP / GDPR Compliance",
  description: "Official Privacy Policy of AxonVortex adhering to India's DPDP Act 2023, EU/UK GDPR, and California CCPA/CPRA.",
};

export default function PrivacyPage() {
  return <PrivacyPolicyContent />;
}
