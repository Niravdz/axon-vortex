import React from "react";
import { ArrowRight, Plus } from "lucide-react";
import { BauhausBadge } from "@/components/ui/BauhausBadge";
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
    <div className="pt-12 pb-24 px-6 md:px-12 flex flex-col gap-20 max-w-7xl mx-auto text-brand-black">
      {/* 1. Hero */}
      <div className="flex flex-col gap-6 max-w-4xl">
        <div className="flex items-center gap-3">
          <BauhausBadge variant="red" shape="square">
            CAPABILITY
          </BauhausBadge>
          <span className="font-mono text-xs uppercase font-bold tracking-widest text-brand-black/60">
            {category}
          </span>
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black uppercase tracking-tight text-brand-black leading-tight">
          {title}
        </h1>
        <p className="text-lg sm:text-xl font-display font-bold text-brand-black/80">
          {tagline}
        </p>
        <p className="text-sm text-brand-black/70 font-sans leading-relaxed max-w-2xl border-l-4 border-brand-red pl-4">
          {description}
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <Button variant="primary" size="md" asLink href="/contact">
            {ctaText}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <Button variant="outline" size="md" asLink href="/services">
            Explore All Services
          </Button>
        </div>
      </div>

      {/* 2. Problem Diagnosis Box */}
      <div className="border-2 border-brand-black bg-brand-gray p-8 sm:p-12 flex flex-col gap-8 shadow-hard-md">
        <div className="flex flex-col gap-2">
          <BauhausBadge variant="yellow" shape="square">
            SYSTEM FRICTION
          </BauhausBadge>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-brand-black uppercase tracking-tight">
            {problemHeadline}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problemPoints.map((pt, i) => (
            <div key={i} className="p-6 bg-brand-white border-2 border-brand-black flex flex-col gap-2 shadow-hard-sm">
              <span className="font-mono text-xs text-brand-red font-black">FRICTION</span>
              <p className="text-xs sm:text-sm text-brand-black/80 font-sans leading-relaxed">{pt}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Capabilities / What We Do */}
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <BauhausBadge variant="blue" shape="square">
            CAPABILITIES MATRIX
          </BauhausBadge>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-brand-black uppercase tracking-tight">
            Architectural Capabilities
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => (
            <div key={i} className="p-8 border-2 border-brand-black bg-brand-white shadow-hard-md flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="flex items-center justify-between border-b-2 border-brand-black pb-3 mb-4">
                  <span className="font-mono text-xs font-black text-brand-black">WORKSTREAM</span>
                  <Plus className="w-4 h-4 text-brand-black" />
                </div>
                <h3 className="text-lg font-display font-black uppercase text-brand-black mb-2">{cap.title}</h3>
                <p className="text-xs text-brand-black/80 font-sans leading-relaxed">{cap.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Execution Process */}
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <BauhausBadge variant="red" shape="square">
            EXECUTION PIPELINE
          </BauhausBadge>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-brand-black uppercase tracking-tight">
            Implementation Process
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processSteps.map((st, i) => (
            <div key={i} className="p-6 border-2 border-brand-black bg-brand-gray/40 flex flex-col gap-2 shadow-hard-sm">
              <h3 className="text-base font-display font-black uppercase text-brand-black">{st.title}</h3>
              <p className="text-xs text-brand-black/70 font-sans leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
