"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ThreeDHeroFallbackProps {
  className?: string;
}

export function ThreeDHeroFallback({ className }: ThreeDHeroFallbackProps) {
  return (
    <div
      className={cn(
        "relative w-full h-full flex items-center justify-center overflow-hidden select-none",
        className
      )}
    >
      {/* Deep Radial Glow Base */}
      <div
        aria-hidden="true"
        className="absolute w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] rounded-full bg-gradient-to-tr from-[#2D5BB9]/25 via-[#3B82F6]/20 to-[#F4BA00]/15 blur-3xl pointer-events-none"
      />

      {/* Outer Rotating Architectural Ring */}
      <div
        aria-hidden="true"
        className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-[#2D5BB9]/30 pointer-events-none animate-[spin_40s_linear_infinite]"
        style={{
          borderTopColor: "rgba(59, 130, 246, 0.6)",
          borderRightColor: "rgba(244, 186, 0, 0.4)",
        }}
      />

      {/* Middle Counter-Rotating Ring */}
      <div
        aria-hidden="true"
        className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full border border-dashed border-[#3B82F6]/25 pointer-events-none animate-[spin_25s_linear_infinite_reverse]"
      />

      {/* Layered Floating Panel in Perspective (Raised Outer Shell with Recessed Badge) */}
      <div className="relative z-10 p-6 sm:p-8 rounded-2xl bg-[#1b1e22]/95 backdrop-blur-xl border border-white/[0.08] shadow-[0_24px_50px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col items-center justify-center gap-4">
        {/* Luminous Official Monogram */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
          <Image
            src="/brand/axon-vortex-monogram.png"
            alt="AxonVortex System Monogram"
            width={140}
            height={120}
            priority
            className="object-contain drop-shadow-[0_0_24px_rgba(59,130,246,0.45)]"
          />
        </div>

        {/* System Coordinates Pill (Inner Recessed Tray) */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#101215] border border-white/[0.04] text-[11px] font-mono tracking-wider shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
          <span className="text-[#EFECE4]/90">AXON·VORTEX SYSTEM 2.0</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#F4BA00]" />
        </div>
      </div>
    </div>
  );
}
