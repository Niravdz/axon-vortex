"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  variant?: "responsive" | "horizontal" | "monogram" | "stacked";
  tone?: "light" | "dark";
  priority?: boolean;
}

/**
 * Official AxonVortex Brand Logo Component
 * Uses the official Brand Guidelines Version 2.0 assets
 * Preserves exact aspect ratios, clear space, and brand colors
 */
export function BrandLogo({
  className = "",
  variant = "responsive",
  priority = true,
}: BrandLogoProps) {
  return (
    <Link
      href="/"
      aria-label="AxonVortex Home"
      className={cn(
        "group inline-flex items-center select-none transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electricBlue focus-visible:ring-offset-2 focus-visible:ring-offset-void rounded-md",
        className
      )}
    >
      {/* 1. Responsive: Monogram on mobile, Full horizontal lockup on sm+ */}
      {variant === "responsive" && (
        <div className="flex items-center">
          {/* Mobile compact monogram */}
          <div className="relative h-10 w-11 sm:hidden flex items-center justify-center">
            <Image
              src="/brand/axon-vortex-monogram.png"
              alt="AxonVortex"
              width={130}
              height={112}
              priority={priority}
              className="h-full w-auto object-contain drop-shadow-[0_0_12px_rgba(59,130,246,0.35)]"
            />
          </div>

          {/* Desktop horizontal lockup */}
          <div className="relative hidden sm:flex items-center h-11 w-44 md:h-12 md:w-48">
            <Image
              src="/brand/axon-vortex-horizontal-logo.png"
              alt="AxonVortex"
              width={288}
              height={98}
              priority={priority}
              className="h-full w-auto object-contain drop-shadow-[0_0_16px_rgba(59,130,246,0.3)]"
            />
          </div>
        </div>
      )}

      {/* 2. Explicit Horizontal Lockup */}
      {variant === "horizontal" && (
        <div className="relative h-11 w-44 md:h-12 md:w-48 flex items-center">
          <Image
            src="/brand/axon-vortex-horizontal-logo.png"
            alt="AxonVortex"
            width={288}
            height={98}
            priority={priority}
            className="h-full w-auto object-contain drop-shadow-[0_0_16px_rgba(59,130,246,0.3)]"
          />
        </div>
      )}

      {/* 3. Explicit Monogram Icon */}
      {variant === "monogram" && (
        <div className="relative h-12 w-12 flex items-center justify-center">
          <Image
            src="/brand/axon-vortex-monogram.png"
            alt="AxonVortex Monogram"
            width={130}
            height={112}
            priority={priority}
            className="h-full w-auto object-contain drop-shadow-[0_0_14px_rgba(59,130,246,0.4)]"
          />
        </div>
      )}

      {/* 4. Explicit Stacked Lockup */}
      {variant === "stacked" && (
        <div className="relative h-20 w-24 flex items-center justify-center">
          <Image
            src="/brand/axon-vortex-stacked-logo.png"
            alt="AxonVortex Stacked Logo"
            width={145}
            height={122}
            priority={priority}
            className="h-full w-auto object-contain drop-shadow-[0_0_16px_rgba(59,130,246,0.35)]"
          />
        </div>
      )}
    </Link>
  );
}
