import { HomeHero } from "@/components/sections/HomeHero";
import { BusinessProblemSection } from "@/components/sections/BusinessProblemSection";
import { ConnectedGrowthSection } from "@/components/sections/ConnectedGrowthSection";
import { SolutionsOverviewSection } from "@/components/sections/SolutionsOverviewSection";
import { WhyAxonSection } from "@/components/sections/WhyAxonSection";
import { WhoWeHelpSection } from "@/components/sections/WhoWeHelpSection";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { GrowthJourneySection } from "@/components/sections/GrowthJourneySection";
import { BuildingAxonSection } from "@/components/sections/BuildingAxonSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <HomeHero />

      {/* 2. Your Business Is Growing / System Diagnosis */}
      <BusinessProblemSection />

      {/* 3. One Growth System */}
      <ConnectedGrowthSection />

      {/* 4. Our Solutions */}
      <SolutionsOverviewSection />

      {/* 5. Why AxonVortex */}
      <WhyAxonSection />

      {/* 6. Who We Help */}
      <WhoWeHelpSection />

      {/* 7. How We Work */}
      <ApproachSection />

      {/* 8. The Growth Journey */}
      <GrowthJourneySection />

      {/* 9. Building AxonVortex */}
      <BuildingAxonSection />

      {/* 10. Final Homepage CTA */}
      <FinalCTASection />
    </>
  );
}
