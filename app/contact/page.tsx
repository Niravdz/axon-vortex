import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact & Intake — AxonVortex Growth Systems",
  description: "Start the conversation about your digital growth. We build systems to attract, convert and scale.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
