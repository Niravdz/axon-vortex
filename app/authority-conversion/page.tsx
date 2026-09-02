import type { Metadata } from "next";
import AuthorityPageClient from "./AuthorityPageClient";

export const metadata: Metadata = {
  title: "Authority & Conversion — AxonVortex Growth Principles",
  description: "Strategy-first AI positioning, Human + AI philosophy, Building in Public, and Digital Growth Audits.",
};

export default function AuthorityConversionPage() {
  return <AuthorityPageClient />;
}
