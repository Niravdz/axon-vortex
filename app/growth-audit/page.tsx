import type { Metadata } from "next";
import GrowthAuditPageClient from "./GrowthAuditPageClient";

export const metadata: Metadata = {
  title: "Digital Growth Audit — AxonVortex Gap & Opportunity Analysis",
  description:
    "Find what's holding your digital growth back. Comprehensive assessment across Digital Presence, Social Media, Marketing, Lead Gen, AI & Systems.",
};

export default function GrowthAuditPage() {
  return <GrowthAuditPageClient />;
}
