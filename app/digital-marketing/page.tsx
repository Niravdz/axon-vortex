import { ServicePageShell } from "@/components/sections/ServicePageShell";

export const metadata = {
  title: "Digital Marketing — AxonVortex",
  description: "Get Seen. Get Remembered. Get Chosen. Social Media Marketing, Meta Ads, Google Ads, SEO, and Content.",
};

export default function DigitalMarketingPage() {
  return (
    <ServicePageShell
      category="SOLUTIONS // 01"
      title="Digital Marketing"
      tagline="Get Seen. Get Remembered. Get Chosen."
      description="Build visibility, attract the right audience and create meaningful demand through cohesive, multi-channel marketing campaigns engineered for business growth."
      problemHeadline="Why Most Digital Marketing Falls Flat"
      problemPoints={[
        "Random posting without audience targeting or measurable business outcomes.",
        "Wasting ad budget on vanity impressions rather than qualified acquisition.",
        "Disconnected messaging across search, paid media, and social channels.",
      ]}
      capabilities={[
        { title: "Meta Ads (Instagram & Facebook)", desc: "High-converting creative formats, audience testing, and continuous ROAS optimization." },
        { title: "Google Ads & Search", desc: "Intent-driven search capture, high-converting keyword architecture, and performance tracking." },
        { title: "Search Engine Optimization (SEO)", desc: "Technical on-page architecture, authority backlink strategies, and local search dominance." },
        { title: "Social Media & Content Marketing", desc: "Positioning your brand with strategic thought leadership, video assets, and editorial rhythm." },
      ]}
      processSteps={[
        { step: "01", title: "Audience Diagnosis", desc: "Identifying target buyer personas, intent stages, and competitor positioning." },
        { step: "02", title: "Creative Architecture", desc: "Producing copy, visual assets, and high-converting message hooks." },
        { step: "03", title: "Campaign Launch", desc: "Deploying multi-channel tests with granular attribution tracking." },
        { step: "04", title: "Continuous Optimization", desc: "Refining bids, scaling top-performing assets, and lowering CAC." },
      ]}
      benefits={[
        "Predictable customer acquisition",
        "Transparent real-time attribution",
        "Compounding organic brand equity",
      ]}
    />
  );
}
