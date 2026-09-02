import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About AxonVortex — Transparent Digital Growth Agency",
  description:
    "We're building AxonVortex from zero at the intersection of AI, Strategy, Creativity, Marketing, Automation and Data. Building in public with radical transparency.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
