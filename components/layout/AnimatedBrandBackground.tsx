"use client";

import React, { useEffect, useRef } from "react";
import { getGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function AnimatedBrandBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const orb1Ref = useRef<HTMLDivElement>(null);
    const orb2Ref = useRef<HTMLDivElement>(null);
    const orb3Ref = useRef<HTMLDivElement>(null);
    const orb4Ref = useRef<HTMLDivElement>(null);

    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion || typeof window === "undefined" || !containerRef.current) return;

        const { gsap } = getGSAP();
        const orb1 = orb1Ref.current;
        const orb2 = orb2Ref.current;
        const orb3 = orb3Ref.current;
        const orb4 = orb4Ref.current;

        const ctx = gsap.context(() => {
            // 1. Continuous Organic Floating Ambient Movement
            if (orb1) {
                gsap.to(orb1, {
                    x: "15vw",
                    y: "10vh",
                    scale: 1.18,
                    duration: 18,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                });
            }

            if (orb2) {
                gsap.to(orb2, {
                    x: "-12vw",
                    y: "14vh",
                    scale: 1.15,
                    duration: 22,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: 2,
                });
            }

            if (orb3) {
                gsap.to(orb3, {
                    x: "8vw",
                    y: "-16vh",
                    scale: 1.2,
                    duration: 25,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: 4,
                });
            }

            if (orb4) {
                gsap.to(orb4, {
                    x: "-10vw",
                    y: "-8vh",
                    scale: 1.12,
                    duration: 20,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: 1,
                });
            }

            // 2. Global Scroll Connection (Gentle Parallax Depth across the entire page)
            gsap.to(containerRef.current, {
                y: "12vh",
                ease: "none",
                scrollTrigger: {
                    trigger: document.body,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.2,
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, [prefersReducedMotion]);

    return (
        <div
            ref={containerRef}
            aria-hidden="true"
            className="fixed inset-0 pointer-events-none z-behind overflow-hidden bg-[#0A121E]"
        >
            {/* Base Deep Slate Tone Layer */}
            <div className="absolute inset-0 bg-[#0A121E]" />

            {/* Layer 1: Oversized Sunrise Orange Flowing Cloud (Top-Left / Center) */}
            <div
                ref={orb1Ref}
                className="absolute -top-[20%] -left-[15%] w-[75vw] h-[75vw] max-w-[950px] max-h-[950px] rounded-full opacity-60 blur-[120px] mix-blend-screen will-change-transform"
                style={{
                    background:
                        "radial-gradient(circle, rgba(255,138,0,0.65) 0%, rgba(255,138,0,0.25) 45%, transparent 70%)",
                }}
            />

            {/* Layer 2: Warm Gold Luminous Core (Top-Right / Mid) */}
            <div
                ref={orb2Ref}
                className="absolute -top-[10%] -right-[10%] w-[65vw] h-[65vw] max-w-[850px] max-h-[850px] rounded-full opacity-50 blur-[130px] mix-blend-screen will-change-transform"
                style={{
                    background:
                        "radial-gradient(circle, rgba(244,196,48,0.55) 0%, rgba(244,196,48,0.2) 48%, transparent 72%)",
                }}
            />

            {/* Layer 3: Deep Slate Anchoring Density Shadow (Center-Bottom) */}
            <div
                ref={orb3Ref}
                className="absolute top-[35%] left-[20%] w-[80vw] h-[80vw] max-w-[1050px] max-h-[1050px] rounded-full opacity-85 blur-[140px] will-change-transform"
                style={{
                    background:
                        "radial-gradient(circle, rgba(15,39,71,0.95) 0%, rgba(10,25,48,0.8) 55%, transparent 78%)",
                }}
            />

            {/* Layer 4: Sand White & Soft Gray Luminous Mist (Bottom-Right / Floating) */}
            <div
                ref={orb4Ref}
                className="absolute -bottom-[20%] right-[10%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full opacity-45 blur-[120px] mix-blend-screen will-change-transform"
                style={{
                    background:
                        "radial-gradient(circle, rgba(255,138,0,0.4) 0%, rgba(255,248,236,0.15) 35%, rgba(233,237,242,0.05) 60%, transparent 75%)",
                }}
            />

            {/* Layer 5: Subtle Architectural Noise / Grain Texture */}
            <div
                className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(rgba(244,241,234,0.3) 1px, transparent 1px)`,
                    backgroundSize: "32px 32px",
                }}
            />

            {/* Layer 6: Soft Vignette Edge Softener */}
            <div className="absolute inset-0 bg-radial-vignette opacity-50 pointer-events-none" />
        </div>
    );
}
