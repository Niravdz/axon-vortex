import React from "react";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface ServicePageShellProps {
  category: string;
  title: string;
  tagline: string;
  description: string;
  problemHeadline: string;
  problemPoints: string[];
  capabilities: { title: string; desc: string }[];
  processSteps: { step: string; title: string; desc: string }[];
  benefits?: string[];
  ctaText?: string;
}

export function ServicePageShell({
  category,
  title,
  tagline,
  description,
  problemHeadline,
  problemPoints,
  capabilities,
  processSteps,
  ctaText = "Schedule Strategy Session",
}: ServicePageShellProps) {
  return (
    <div className="pt-8 sm:pt-12 pb-24 px-6 md:px-12 flex flex-col gap-24 max-w-7xl mx-auto text-editorial-primary">
      {/* 1. Hero */}
      <div className="flex flex-col gap-5 max-w-4xl">
        <Badge variant="dot">{category}</Badge>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-bold uppercase tracking-tight text-editorial-primary leading-tight">
          {title}
        </h1>
        <p className="text-lg sm:text-xl font-heading font-medium text-editorial-secondary">
          {tagline}
        </p>
        <p className="text-xs sm:text-sm text-editorial-muted font-sans leading-relaxed max-w-2xl">
          {description}
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <Button variant="primary" size="md" withArrow asLink href="/contact">
            {ctaText}
          </Button>
          <Button variant="secondary" size="md" asLink href="/solutions">
            Explore All Solutions
          </Button>
        </div>
      </div>

      {/* 2. Problem Diagnosis Box */}
      <div className="editorial-card p-8 sm:p-12 flex flex-col gap-8">
        <div className="card-shift-content flex flex-col gap-2">
          <Badge variant="code">SYSTEM FRICTION</Badge>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-editorial-primary uppercase tracking-tight">
            {problemHeadline}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problemPoints.map((pt, i) => (
            <div key={i} className="p-6 rounded-sm bg-surface-muted border border-border flex flex-col gap-2">
              <span className="font-mono text-xs text-brand-turquoise font-bold">0{i + 1}</span>
              <p className="text-xs sm:text-sm text-editorial-secondary font-sans leading-relaxed">{pt}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Capabilities / What We Do */}
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <Badge variant="dot">CAPABILITIES MATRIX</Badge>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-editorial-primary uppercase tracking-tight">
            Architectural Capabilities
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => (
            <div key={i} className="editorial-card p-8 flex flex-col justify-between min-h-[220px] group">
              <div className="card-hover-accent" />
              <div className="card-shift-content flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between text-editorial-muted border-b border-border pb-3 mb-4">
                    <span className="font-mono text-xs font-bold text-brand-turquoise">0{i + 1} — DOMAIN</span>
                    <Plus className="w-4 h-4 text-editorial-secondary" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-editorial-primary mb-2">{cap.title}</h3>
                  <p className="text-xs text-editorial-secondary font-sans leading-relaxed">{cap.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Execution Process */}
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <Badge variant="code">EXECUTION BLUEPRINT</Badge>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-editorial-primary uppercase tracking-tight">
            How We Execute
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, i) => (
            <div key={i} className="p-6 rounded-sm bg-surface border border-border flex flex-col gap-3">
              <span className="font-mono text-xs text-brand-turquoise font-bold">{step.step}</span>
              <h3 className="text-base font-heading font-semibold text-editorial-primary uppercase">{step.title}</h3>
              <p className="text-xs text-editorial-secondary font-sans leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Bottom CTA */}
      <div className="p-10 sm:p-14 rounded-sm bg-surface border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <div className="flex flex-col gap-2 max-w-xl">
          <h3 className="text-2xl sm:text-3xl font-heading font-bold text-editorial-primary uppercase tracking-tight">
            Ready to Build Your Growth System?
          </h3>
          <p className="text-xs sm:text-sm text-editorial-secondary font-sans">
            Schedule a diagnostic strategy session to evaluate your current architecture.
          </p>
        </div>
        <Button variant="primary" size="md" withArrow asLink href="/contact">
          Start Conversation
        </Button>
      </div>
    </div>
  );
}
