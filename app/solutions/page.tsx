import type { Metadata } from "next";
import SolutionsPageClient from "./SolutionsPageClient";

export const metadata: Metadata = {
  title: "Solutions — AxonVortex Digital Growth Systems",
  description:
    "Explore our multi-disciplinary growth systems combining Digital Marketing, AI Automation, Websites & E-Commerce, Lead Generation, and Technology & Digital Transformation.",
};

export default function SolutionsPage() {
  return <SolutionsPageClient />;
}
