"use client";

import React from "react";
import { Home, Layers } from "lucide-react";
import { TactileButton } from "@/components/ui/TactileButton";
import { SiteTextureBackground } from "@/components/layout/SiteTextureBackground";
import { MotionSection } from "@/components/animation/MotionSection";

export default function NotFound() {
  return (
    <SiteTextureBackground className="overflow-x-clip">
      <div className="w-full min-h-[85vh] flex items-center justify-center px-4 sm:px-8 lg:px-12 py-20 text-[#EFECE4] selection:bg-[#3B82F6] selection:text-white relative">
        {/* Raised Console Container */}
        <MotionSection
          signature="geometric-pulse-focus"
          className="w-full max-w-xl mx-auto rounded-[24px] border border-white/[0.08] bg-[#1b1e22] shadow-box-lg p-8 sm:p-14 text-center flex flex-col items-center relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-widest bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#93C5FD] uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
            <span>ERROR 404 // COORDINATE NOT FOUND</span>
          </div>

          {/* Tasteful Interactive Geometric Compass/Radar Accent */}
          <div className="relative w-44 h-44 mb-6 flex items-center justify-center">
            {/* Outer Rotating Concentric Ring */}
            <div className="absolute inset-0 rounded-full border border-dashed border-[#3B82F6]/30 animate-[spin_24s_linear_infinite]" />
            {/* Middle Amber Ring */}
            <div className="absolute inset-4 rounded-full border border-[#F4BA00]/25 animate-[spin_16s_linear_infinite_reverse]" />
            {/* Inner Core */}
            <div className="relative w-28 h-28 rounded-full bg-[#101215] border border-white/[0.08] shadow-box-inset flex flex-col items-center justify-center">
              <div className="font-heading font-bold text-4xl tracking-tighter text-[#EFECE4] drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                4<span className="text-[#3B82F6]">0</span>4
              </div>
              <span className="font-mono text-[9px] text-[#F4BA00] uppercase tracking-widest mt-0.5">
                DISCONNECTED
              </span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-heading font-semibold text-[#EFECE4] uppercase mb-3 leading-tight">
            Page Not Found
          </h1>

          <p className="text-xs sm:text-sm font-body text-[#9AA3B2] max-w-md mb-8 leading-relaxed">
            The page or resource coordinate you requested has shifted or does not exist in the AxonVortex system index.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            <TactileButton
              variant="primary"
              size="lg"
              withArrow
              asLink
              href="/"
              className="w-full sm:w-auto min-h-[48px]"
            >
              <Home className="mr-2 w-4 h-4" />
              Return to Homepage
            </TactileButton>

            <TactileButton
              variant="charcoal"
              size="lg"
              asLink
              href="/solutions"
              className="w-full sm:w-auto min-h-[48px]"
            >
              <Layers className="mr-2 w-4 h-4" />
              Explore Solutions
            </TactileButton>
          </div>
        </MotionSection>
      </div>
    </SiteTextureBackground>
  );
}
