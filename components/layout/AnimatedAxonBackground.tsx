"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { usePathname } from "next/navigation";

export function AnimatedAxonBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle nodes for subtle floating systems network
    const particleCount = Math.min(24, Math.floor(width / 60));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      radius: Math.random() * 1.5 + 1,
      color: Math.random() > 0.85 ? "#F4BA00" : "#3B82F6",
      opacity: Math.random() * 0.3 + 0.1,
    }));

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastTime = performance.now();
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    let lastTime = performance.now();
    let time = 0;

    const render = (currentTime: number) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const delta = Math.min(currentTime - lastTime, 100) * 0.001;
      lastTime = currentTime;
      time += delta * 0.2;

      // 1. Clear with Charcoal Felt Base (#121519)
      ctx.fillStyle = "#121519";
      ctx.fillRect(0, 0, width, height);

      // 2. Slow-pulsing Radial Blue Illumination (Axon System - top right & center)
      const blueX = width * (0.65 + Math.sin(time * 0.8) * 0.08);
      const blueY = height * (0.28 + Math.cos(time * 0.6) * 0.06);
      const blueGrad = ctx.createRadialGradient(
        blueX,
        blueY,
        0,
        blueX,
        blueY,
        Math.max(width * 0.55, 450)
      );
      blueGrad.addColorStop(0, "rgba(45, 91, 185, 0.18)");
      blueGrad.addColorStop(0.5, "rgba(59, 130, 246, 0.06)");
      blueGrad.addColorStop(1, "rgba(18, 21, 25, 0)");
      ctx.fillStyle = blueGrad;
      ctx.fillRect(0, 0, width, height);

      // 3. Subtle Amber Illumination (Vortex Momentum - bottom left)
      const amberX = width * (0.22 + Math.cos(time * 0.7) * 0.06);
      const amberY = height * (0.78 + Math.sin(time * 0.5) * 0.06);
      const amberGrad = ctx.createRadialGradient(
        amberX,
        amberY,
        0,
        amberX,
        amberY,
        Math.max(width * 0.45, 350)
      );
      amberGrad.addColorStop(0, "rgba(244, 186, 0, 0.10)");
      amberGrad.addColorStop(0.4, "rgba(244, 186, 0, 0.025)");
      amberGrad.addColorStop(1, "rgba(18, 21, 25, 0)");
      ctx.fillStyle = amberGrad;
      ctx.fillRect(0, 0, width, height);

      // 4. Subtle Interconnected Network Nodes
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0) p1.x = width;
        if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        if (p1.y > height) p1.y = 0;

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.08;
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Draw particle dot
        ctx.fillStyle = p1.color;
        ctx.globalAlpha = p1.opacity;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [prefersReducedMotion, pathname]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
    >
      {prefersReducedMotion ? (
        <div className="w-full h-full bg-[#121519] felt-background" />
      ) : (
        <>
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover block will-change-transform"
          />
          {/* Subtle fine-grain texture layer */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
          {/* Subtle surface vignette */}
          <div className="absolute inset-0 surface-vignette pointer-events-none" />
        </>
      )}
    </div>
  );
}
