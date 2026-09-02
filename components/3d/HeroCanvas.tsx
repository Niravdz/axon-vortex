"use client";

import React, { Suspense, useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { SpatialNetworkMesh } from "./SpatialNetworkMesh";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

export default function HeroCanvas() {
  const [isMounted, setIsMounted] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);

    if (!containerRef.current || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative cursor-grab active:cursor-grabbing select-none pointer-events-auto"
    >
      <ErrorBoundary fallback={<div className="w-full h-full bg-transparent" />}>
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
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 8, 5]} intensity={1.0} color="#F4F1EA" />
            <pointLight position={[-4, -3, 2]} intensity={0.8} color="#00C2C7" />

            <Suspense fallback={null}>
              <SpatialNetworkMesh />
            </Suspense>
          </Canvas>
        )}
      </ErrorBoundary>
    </div>
  );
}
