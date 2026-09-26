import type { Metadata } from "next";
import { DigitalMarketingClient } from "./DigitalMarketingClient";

export const metadata: Metadata = {
  title: "Digital Marketing — AxonVortex Growth Systems",
  description:
    "Build visibility, attract the right audience and create meaningful demand with strategic Digital Marketing, Meta Ads, Google Ads and SEO.",
};

export default function DigitalMarketingPage() {
  return <DigitalMarketingClient />;
}
