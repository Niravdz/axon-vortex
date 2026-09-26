"use client";

import React, { Suspense, useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { SpatialNetworkMesh } from "./SpatialNetworkMesh";
import { ThreeDHeroFallback } from "./ThreeDHeroFallback";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export default function HeroCanvas() {
  const [isMounted, setIsMounted] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setIsMounted(true);
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    if (!containerRef.current || typeof IntersectionObserver === "undefined") {
      return () => window.removeEventListener("resize", handleResize);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isMounted) {
    return <ThreeDHeroFallback />;
  }

  // Use lightweight 3D fallback on mobile or when reduced motion is preferred
  if (isMobile || prefersReducedMotion) {
    return <ThreeDHeroFallback />;
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative cursor-grab active:cursor-grabbing select-none pointer-events-auto"
    >
      <ErrorBoundary fallback={<ThreeDHeroFallback />}>
        {isInView && (
          <Canvas
            camera={{ position: [0, 0, 4.2], fov: 42 }}
            dpr={[1, 1.5]}
            frameloop="always"
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 8, 5]} intensity={1.2} color="#EFECE4" />
            <pointLight position={[-4, -3, 2]} intensity={1.4} color="#3B82F6" />
            <pointLight position={[3, -2, -2]} intensity={1.2} color="#F4BA00" />

            <Suspense fallback={<ThreeDHeroFallback />}>
              <SpatialNetworkMesh />
            </Suspense>
          </Canvas>
        )}
      </ErrorBoundary>
    </div>
  );
}
