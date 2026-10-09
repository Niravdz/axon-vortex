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
  size?: "sm" | "md" | "lg" | "xl";
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
  size = "lg",
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
      {/* 1. Responsive supplied brand lockup */}
      {variant === "responsive" && (
        <div className="flex items-center">
          <div
            className={cn(
              "relative sm:hidden flex items-center",
              size === "sm" && "h-8 w-28",
              size === "md" && "h-10 w-32",
              size === "lg" && "h-12 w-40",
              size === "xl" && "h-14 w-48"
            )}
          >
            <Image
              src="/brand/axon-vortex-logo.png"
              alt="AxonVortex"
              width={2172}
              height={724}
              priority={priority}
              className="h-full w-auto object-contain drop-shadow-[0_0_14px_rgba(59,130,246,0.35)]"
            />
          </div>

          <div
            className={cn(
              "relative hidden sm:flex items-center",
              size === "sm" && "sm:h-10 sm:w-36 md:h-11 md:w-40",
              size === "md" && "sm:h-11 sm:w-44 md:h-12 md:w-48",
              size === "lg" && "sm:h-14 sm:w-52 md:h-16 md:w-60 lg:h-[68px] lg:w-[230px]",
              size === "xl" && "sm:h-16 sm:w-56 md:h-20 md:w-72 lg:h-[76px] lg:w-[250px]"
            )}
          >
            <Image
              src="/brand/axon-vortex-logo.png"
              alt="AxonVortex"
              width={2172}
              height={724}
              priority={priority}
              className="h-full w-auto object-contain drop-shadow-[0_0_18px_rgba(59,130,246,0.35)]"
            />
          </div>
        </div>
      )}

      {/* 2. Explicit Horizontal Lockup */}
      {variant === "horizontal" && (
        <div
          className={cn(
            "relative flex items-center",
            size === "sm" && "h-9 w-36 md:h-10 md:w-40",
            size === "md" && "h-11 w-44 md:h-12 md:w-48",
            size === "lg" && "h-14 w-52 md:h-16 md:w-60 lg:h-[68px] lg:w-[230px]",
            size === "xl" && "h-16 w-56 md:h-20 md:w-72"
          )}
        >
          <Image
            src="/brand/axon-vortex-logo.png"
            alt="AxonVortex"
            width={2172}
            height={724}
            priority={priority}
            className="h-full w-auto object-contain drop-shadow-[0_0_16px_rgba(59,130,246,0.3)]"
          />
        </div>
      )}

      {/* 3. Explicit Monogram Icon */}
      {variant === "monogram" && (
        <div className="relative h-12 w-36 flex items-center justify-center">
          <Image
            src="/brand/axon-vortex-logo.png"
            alt="AxonVortex"
            width={2172}
            height={724}
            priority={priority}
            className="h-full w-auto object-contain drop-shadow-[0_0_14px_rgba(59,130,246,0.4)]"
          />
        </div>
      )}

      {/* 4. Explicit Stacked Lockup */}
      {variant === "stacked" && (
        <div className="relative h-16 w-48 flex items-center justify-center">
          <Image
            src="/brand/axon-vortex-logo.png"
            alt="AxonVortex"
            width={2172}
            height={724}
            priority={priority}
            className="h-full w-auto object-contain drop-shadow-[0_0_16px_rgba(59,130,246,0.35)]"
          />
        </div>
      )}
    </Link>
  );
}
