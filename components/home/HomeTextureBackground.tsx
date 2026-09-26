"use client";

import React from "react";

/**
 * Layer 3: Fine-grain monochrome texture
 * Optimized seamless tile repeat with soft-light blending.
 */
export function HomeNoiseOverlay({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      data-layer="home-noise-overlay"
      className={`absolute inset-0 pointer-events-none z-[-2] ${className}`}
      style={{
        backgroundImage: 'url("/assets/textures/axon-charcoal-grain.webp")',
        backgroundRepeat: "repeat",
        backgroundSize: "320px 320px",
        opacity: 0.30,
        mixBlendMode: "soft-light",
      }}
    />
  );
}

/**
 * Layers 4 & 5: Centre Illumination and Edge Vignette
 * Creates a soft neutral centre falloff with dark perimeter vignette
 * avoiding a harsh circular effect.
 */
export function HomeVignette({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      data-layer="home-vignette"
      className={`absolute inset-0 pointer-events-none z-[-1] ${className}`}
      style={{
        background: `
          radial-gradient(
            ellipse 90% 70% at 50% 32%,
            rgba(255, 255, 255, 0.035) 0%,
            rgba(255, 255, 255, 0.015) 35%,
            transparent 70%
          ),
          radial-gradient(
            ellipse 95% 85% at 50% 50%,
            transparent 45%,
            rgba(0, 0, 0, 0.38) 100%
          ),
          linear-gradient(
            to right,
            rgba(0, 0, 0, 0.30) 0%,
            transparent 8%,
            transparent 92%,
            rgba(0, 0, 0, 0.30) 100%
          )
        `,
      }}
    />
  );
}

/**
 * Layer 6: Optional Brand Ambience
 * Extremely subtle Electric Blue and Amber Gold ambient glow
 * calibrated so the page remains predominantly dark charcoal.
 */
export function HomeAmbientGlow({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      data-layer="home-ambient-glow"
      className={`absolute inset-0 pointer-events-none z-[-1] overflow-hidden ${className}`}
    >
      {/* Upper Technology Accent (Electric Blue, ~5% opacity) */}
      <div
        className="absolute top-16 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[150px]"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)",
        }}
      />
      {/* Lower Mid Accent (Subtle Void Navy undertone, ~6% opacity) */}
      <div
        className="absolute top-[35%] left-1/3 w-[800px] h-[600px] rounded-full blur-[160px]"
        style={{
          background: "radial-gradient(circle, rgba(15, 39, 71, 0.08) 0%, transparent 70%)",
        }}
      />
      {/* Conversion Momentum Accent (Amber Gold, ~2% opacity) */}
      <div
        className="absolute bottom-[20%] right-1/4 w-[600px] h-[450px] rounded-full blur-[140px]"
        style={{
          background: "radial-gradient(circle, rgba(244, 186, 0, 0.025) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

/**
 * Complete Home-Page-Level Background System
 * Combines Layers 1 through 6 into a reusable, self-contained surface.
 */
export function HomeTextureBackground() {
  return (
    <div
      aria-hidden="true"
      data-bg="home-texture-background"
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
      style={{
        // Layer 1: Charcoal Base (#16181B to #0E1012)
        // Layer 2: Brand Navy Undertone (#0F2747 at low opacity)
        background: `
          radial-gradient(
            ellipse 80% 50% at 50% 40%,
            rgba(15, 39, 71, 0.06) 0%,
            transparent 75%
          ),
          linear-gradient(
            180deg,
            #16191C 0%,
            #121417 45%,
            #0E1012 100%
          )
        `,
      }}
    >
      {/* Layer 3: Fine-grain texture overlay */}
      <HomeNoiseOverlay />

      {/* Layers 4 & 5: Centre illumination and Edge vignette */}
      <HomeVignette />

      {/* Layer 6: Brand Ambience */}
      <HomeAmbientGlow />
    </div>
  );
}
