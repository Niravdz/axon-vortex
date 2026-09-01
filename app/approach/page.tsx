import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { homeContent } from "@/data/content/home";
import { Plus } from "lucide-react";

export const metadata = {
  title: "Our Approach — AxonVortex Methodology",
  description: "From Business Challenge to Growth System: Understand → Diagnose → Strategize → Create → Automate → Measure → Improve.",
};

export default function ApproachPage() {
  const { howWeWork, growthJourney } = homeContent;

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col gap-24 text-editorial-primary">
      {/* Hero */}
      <div className="flex flex-col gap-4 max-w-3xl">
        <Badge variant="dot">STRATEGIC METHODOLOGY</Badge>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-bold uppercase tracking-tight text-editorial-primary leading-tight">
          Our Approach
        </h1>
        <p className="text-base sm:text-lg text-editorial-secondary font-heading">
          {howWeWork.headline}
        </p>
        <p className="text-xs sm:text-sm text-editorial-muted font-sans leading-relaxed">
          {howWeWork.conclusion}
        </p>
      </div>

      {/* 6 Step Process */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Badge variant="code">THE 6-PHASE FRAMEWORK</Badge>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-editorial-primary uppercase tracking-tight">
            Systematic Engineering for Predictable Growth
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {howWeWork.steps.map((step) => (
            <div
              key={step.step}
              className="editorial-card p-8 flex flex-col justify-between min-h-[220px] group"
            >
              <div className="card-hover-accent" />
              <div className="card-shift-content flex flex-col justify-between h-full">
                <div className="flex items-center justify-between text-editorial-muted border-b border-border pb-3 mb-4">
                  <span className="font-mono text-xs font-bold text-accent-orange">
                    PHASE // {step.step}
                  </span>
                  <Plus className="w-4 h-4 text-editorial-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-editorial-primary uppercase tracking-tight mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-editorial-secondary font-sans leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Growth Journey Stages */}
      <div className="editorial-card p-8 sm:p-12 flex flex-col gap-8">
        <div className="card-shift-content flex flex-col gap-2">
          <Badge variant="dot">{growthJourney.badge}</Badge>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-editorial-primary uppercase tracking-tight">
            {growthJourney.headline}
          </h2>
          <p className="text-xs sm:text-sm text-editorial-secondary font-sans">
            {growthJourney.subtext}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {growthJourney.stages.map((stage, idx) => (
            <div key={stage.name} className="p-6 rounded-sm bg-surface-muted border border-border flex flex-col gap-2">
              <span className="font-mono text-xs text-accent-orange font-bold">STAGE 0{idx + 1}</span>
              <h4 className="text-base font-heading font-bold text-editorial-primary uppercase">{stage.name}</h4>
              <p className="text-xs text-editorial-muted font-sans leading-relaxed">{stage.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="p-10 sm:p-14 rounded-sm bg-surface border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <div className="flex flex-col gap-2 max-w-xl">
          <h3 className="text-2xl sm:text-3xl font-heading font-bold text-editorial-primary uppercase tracking-tight">
            Start Where You Are.
          </h3>
          <p className="text-xs sm:text-sm text-editorial-secondary font-sans">
            We&apos;ll help you identify where digital strategy, marketing, technology or AI can make the biggest difference.
          </p>
        </div>
        <Button variant="primary" size="md" withArrow asLink href="/contact">
          Schedule Diagnostic
        </Button>
      </div>
    </div>
  );
}

