"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface BrandLogoProps {
  className?: string;
  showText?: boolean;
  tone?: "light" | "dark";
}

/** Render the official AxonVortex logo asset without redrawing, distortion, or artificial effects */
export function BrandLogo({
  className = "",
  showText = true,
  tone = "light",
}: BrandLogoProps) {
  const isDark = tone === "dark";

  return (
    <Link
      href="/"
      aria-label="AxonVortex home"
      className={`group inline-flex items-center gap-3 select-none transition-opacity hover:opacity-95 ${className}`}
    >
      <div className="relative size-10 sm:size-11 shrink-0 overflow-hidden rounded-full border-2 border-[#090909] shadow-[2px_2px_0px_0px_#090909] bg-white">
        <Image
          src="/assets/axon-vortex-logo.jpeg"
          alt="AxonVortex official logo"
          width={44}
          height={44}
          priority
          className="size-full object-cover"
        />
      </div>
      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className={`font-heading font-black text-lg sm:text-xl tracking-tight uppercase ${
              isDark ? "text-white" : "text-[#090909]"
            }`}
          >
            AXON<span className="text-[#F23B32]">VORTEX</span>
          </span>
          <span
            className={`font-mono text-[9px] tracking-widest uppercase mt-0.5 ${
              isDark ? "text-white/60" : "text-[#090909]/60"
            }`}
          >
            DIGITAL GROWTH
          </span>
        </div>
      )}
    </Link>
  );
}
