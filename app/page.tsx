import { HomeHero } from "@/components/sections/HomeHero";
import { BusinessProblemSection } from "@/components/sections/BusinessProblemSection";
import { ConnectedGrowthSection } from "@/components/sections/ConnectedGrowthSection";
import { SolutionsOverviewSection } from "@/components/sections/SolutionsOverviewSection";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { WhyAxonSection } from "@/components/sections/WhyAxonSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";

export default function HomePage() {
  return (
    <>
      {/* 1. Full-Screen 100vh Hero with Scrubbed Pinned Transition */}
      <HomeHero />

      {/* 2. Business Problem Pinned Story (Single-Screen System Diagnosis) */}
      <BusinessProblemSection />

      {/* 3. Connected Growth System Pinned Spatial Narrative (Attract -> Engage -> Convert -> Manage -> Automate -> Optimize) */}
      <ConnectedGrowthSection />

      {/* 4. Pinned Horizontal-Scroll Services Exploration */}
      <SolutionsOverviewSection />

      {/* 5. Connected Approach Process Timeline (Understand -> Diagnose -> Strategize -> Create -> Automate -> Measure) */}
      <ApproachSection />

      {/* 6. Strategic Philosophy (Human + AI, Strategy Before Technology) */}
      <WhyAxonSection />

      {/* 7. Cinematic Final Conversion CTA with Growth Beam & Brand Telemetry */}
      <FinalCTASection />
    </>
  );
}
