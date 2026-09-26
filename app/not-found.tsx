import React from "react";
import { Home, Search } from "lucide-react";
import { DimensionalButton } from "@/components/ui/DimensionalButton";

export default function NotFound() {
  return (
    <div className="w-full min-h-[85vh] flex items-center justify-center px-6 md:px-12 py-24 bg-[#141619] text-[#EFECE4] selection:bg-[#3B82F6] selection:text-white relative overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#3B82F6]/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[250px] bg-[#F4BA00]/10 blur-[130px] pointer-events-none rounded-full" />

      {/* Raised Outer Container */}
      <div className="max-w-2xl mx-auto rounded-3xl border border-white/[0.08] bg-[#1b1e22] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] p-8 sm:p-14 text-center flex flex-col items-center relative z-10">
        <span className="px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-widest bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#93C5FD] uppercase mb-8">
          STATUS 404 // COORDINATE NOT FOUND
        </span>

        {/* Inner Recessed Display Tray */}
        <div className="w-full max-w-sm p-6 rounded-2xl bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_6px_rgba(0,0,0,0.8)] mb-6 flex flex-col items-center">
          <h1 className="text-7xl sm:text-8xl font-heading font-semibold tracking-tighter text-[#EFECE4] drop-shadow-[0_0_40px_rgba(59,130,246,0.25)]">
            4<span className="text-[#3B82F6]">0</span>4
          </h1>
          <span className="font-mono text-xs text-[#9AA3B2] uppercase tracking-widest mt-2">
            NULL_DIMENSIONAL_REFERENCE
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-[#EFECE4] mb-3">
          Dimensional Node Not Found
        </h2>

        <p className="text-sm sm:text-base font-body text-[#9AA3B2] max-w-lg mb-8 leading-relaxed">
          The pipeline or resource coordinate you requested has shifted or does not exist in the AxonVortex system index.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <DimensionalButton
            variant="amber"
            size="lg"
            asLink
            href="/"
          >
            <Home className="mr-2 w-4 h-4" />
            Return to Homepage
          </DimensionalButton>

          <DimensionalButton
            variant="outline"
            size="lg"
            asLink
            href="/services"
          >
            <Search className="mr-2 w-4 h-4" />
            Explore Services Directory
          </DimensionalButton>
        </div>
      </div>
    </div>
  );
}
