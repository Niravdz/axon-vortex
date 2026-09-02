import type { Metadata } from "next";
import ApproachPageClient from "./ApproachPageClient";

export const metadata: Metadata = {
  title: "Our Approach — AxonVortex Growth Methodology",
  description:
    "AI is powerful. Strategy makes it useful. Explore the AxonVortex growth framework, continuous learning loop, and Human + AI synthesis.",
};

export default function ApproachPage() {
  return <ApproachPageClient />;
}
