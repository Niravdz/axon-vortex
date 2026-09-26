import type { Metadata } from "next";
import { TechnologyTransformationClient } from "./TechnologyTransformationClient";

export const metadata: Metadata = {
  title: "Technology & Digital Transformation — AxonVortex Systems",
  description:
    "Connect your business, simplify operations and build for what's next. Strategic CRM, custom software and digital transformation architecture.",
};

export default function TechnologyDigitalTransformationPage() {
  return <TechnologyTransformationClient />;
}
