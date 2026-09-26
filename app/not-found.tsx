import React from "react";
import { Home, Layers } from "lucide-react";
import { TactileButton } from "@/components/ui/TactileButton";
import { SiteTextureBackground } from "@/components/layout/SiteTextureBackground";

export default function NotFound() {
  return (
    <SiteTextureBackground>
      <div className="w-full min-h-[85vh] flex items-center justify-center px-4 sm:px-8 lg:px-12 py-20 text-[#EFECE4] selection:bg-[#3B82F6] selection:text-white relative overflow-hidden">
        {/* Raised Console Container */}
        <div className="w-full max-w-xl mx-auto rounded-[24px] border border-white/[0.08] bg-[#1b1e22] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] p-8 sm:p-14 text-center flex flex-col items-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-widest bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#93C5FD] uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
            <span>ERROR 404 // COORDINATE NOT FOUND</span>
          </div>

          {/* Simple Branded Visual */}
          <div className="w-full max-w-xs p-6 rounded-[16px] bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_6px_rgba(0,0,0,0.85)] mb-6 flex flex-col items-center">
            <div className="font-heading font-semibold text-6xl sm:text-7xl tracking-tighter text-[#EFECE4] drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">
              4<span className="text-[#3B82F6]">0</span>4
            </div>
            <span className="font-mono text-[11px] text-[#9AA3B2] uppercase tracking-widest mt-2">
              AXON·VORTEX SYSTEM 2.0
            </span>
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
        </div>
      </div>
    </SiteTextureBackground>
  );
}
