import type { Metadata } from "next";
import { AiAutomationClient } from "./AiAutomationClient";

export const metadata: Metadata = {
  title: "AI & Automation — AxonVortex Digital Operations",
  description:
    "AI shouldn't be another expensive tool. We implement practical AI and automation to improve efficiency, customer experience and business processes.",
};

export default function AiAutomationPage() {
  return <AiAutomationClient />;
}
