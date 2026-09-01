"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";

interface BrandLogoProps {
  className?: string;
  showText?: boolean;
}

export function BrandLogo({ className, showText = true }: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={`group flex items-center gap-3 select-none transition-opacity hover:opacity-90 ${className || ""}`}
    >
      <div className="relative w-8 h-8 rounded-sm overflow-hidden bg-surface border border-border group-hover:border-accent-orange transition-colors flex-shrink-0">
        <Image
          src="/assets/axon-vortex-logo.jpeg"
          alt="AxonVortex Logo"
          fill
          sizes="32px"
          className="object-contain p-0.5"
          priority
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-heading font-bold tracking-tight text-sm text-editorial-primary leading-tight">
            {siteConfig.name}
          </span>
          <span className="font-mono text-[8px] uppercase tracking-widest text-editorial-muted">
            STUDIO // ARCHITECTURE
          </span>
        </div>
      )}
    </Link>
  );
}
