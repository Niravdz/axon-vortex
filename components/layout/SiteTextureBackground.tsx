"use client";

import React from "react";

interface SiteTextureBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * SiteTextureBackground
 * 
 * Single source of truth background primitive extending the approved Home page's
 * flat dark-charcoal procedural grain texture to every route.
 * 
 * Requirements:
 * - Flat dark charcoal (#141619)
 * - Uniform, fine-grained, high-density procedural noise (SVG turbulence)
 * - Monochromatic, matte, static (no canvas, WebGL, moving grain, or gradients)
 * - Behind all page content (z-index: -1, isolation: isolate)
 */
export function SiteTextureBackground({
  children,
  className = "",
}: SiteTextureBackgroundProps) {
  return (
    <div className={`site-grain-theme relative w-full min-h-screen ${className}`}>
      {children}
    </div>
  );
}
