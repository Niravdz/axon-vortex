"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface BrandLogoProps {
  className?: string;
  showText?: boolean;
  tone?: "light" | "dark";
}

/** Render the supplied AxonVortex artwork without redrawing or recolouring it. */
export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <Link
      href="/"
      aria-label="AxonVortex home"
      className={`group block size-12 sm:size-14 shrink-0 overflow-hidden rounded-full select-none transition-opacity hover:opacity-90 ${className || ""}`}
    >
      <Image
        src="/assets/axon-vortex-logo.jpeg"
        alt="AxonVortex"
        width={56}
        height={56}
        priority
        className="size-full object-cover"
      />
    </Link>
  );
}
