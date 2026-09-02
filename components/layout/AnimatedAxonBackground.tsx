"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

const VERTEX_SHADER_SOURCE = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SOURCE = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_reduced_motion;

// 2D Rotation matrix
mat2 rot(float a) {
  float s = sin(a), c = cos(a);
  return mat2(c, -s, s, c);
}

// C2-continuous smooth noise
vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float smoothNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  // Quintic Hermite interpolant (eliminates all banding/striping artifacts)
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  return mix(
    mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
        dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
    mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
        dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
    u.y
  );
}

// Multi-scale fluid turbulence FBM
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 r = rot(0.55);
  for (int i = 0; i < 3; i++) {
    v += a * smoothNoise(p);
    p = r * p * 2.05;
    a *= 0.5;
  }
  return v;
}

void main() {
  // Aspect-ratio normalized coordinates
  vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

  // Time speed tuned for smooth, dignified liquid movement (0.72 speed preserved)
  float t = u_reduced_motion > 0.5 ? 2.5 : u_time * 0.72;

  // Spatial bias: liquid streams flow across right ~55%, calm Sand White on left
  vec2 st = p;
  st.x -= 0.32;
  st *= 1.15;

  // --- LAYER 1: Directional Fluid Transport & Curl Advection ---
  vec2 v1 = vec2(
    sin(st.y * 1.4 + t * 0.55),
    cos(st.x * 1.2 - t * 0.45)
  ) * 0.40;

  vec2 p1 = st + v1 + vec2(
    fbm(st * 0.9 + vec2(t * 0.30, -t * 0.25)),
    fbm(st * 0.9 + vec2(-t * 0.22, t * 0.32) + vec2(4.2, 1.7))
  ) * 0.65;

  // --- LAYER 2: Secondary Harmonic Warp (Stretching necks & merging pools) ---
  vec2 v2 = vec2(
    cos(p1.y * 1.8 - t * 0.65),
    sin(p1.x * 1.6 + t * 0.50)
  ) * 0.35;

  vec2 p2 = p1 + v2 + vec2(
    fbm(p1 * 1.3 + vec2(-t * 0.40, t * 0.35)),
    fbm(p1 * 1.3 + vec2(t * 0.38, -t * 0.42) + vec2(2.8, 6.1))
  ) * 0.50;

  // --- DYNAMIC LIQUID STREAM CONTOURS ---
  float s1 = 0.5 + 0.5 * cos(p2.x * 2.2 + p2.y * 1.6 + t * 0.60);
  float s2 = 0.5 + 0.5 * sin(p2.x * 1.8 - p2.y * 2.2 - t * 0.52 + 1.2);
  float s3 = 0.5 + 0.5 * cos(p1.x * 2.5 + p2.y * 1.4 + t * 0.70 + 2.4);

  // --- OFFICIAL BRAND COLORS & PURE WHITE BASE ---
  vec3 colBaseWhite  = vec3(1.0, 1.0, 1.0);          // #FFFFFF (Pure White Base)
  vec3 colTurquoise  = vec3(0.0, 0.761, 0.780);      // #00C2C7 (10% Turquoise Accent)
  vec3 colCoral      = vec3(1.0, 0.478, 0.349);      // #FF7A59 (Primary Coral)
  vec3 colYellow     = vec3(1.0, 0.824, 0.541);      // #FFD28A (Secondary Warm Yellow)

  // --- REFINED COLOR BLENDING (Coral Dominant, Yellow Transition, Turquoise Accent) ---
  float wCoral     = smoothstep(0.05, 0.85, s1 * 0.55 + s2 * 0.45) * 1.2;
  float wYellow    = smoothstep(0.30, 0.85, (1.0 - s1) * 0.60 + s3 * 0.40) * 0.6;
  // A narrow independent stream: visible turquoise over roughly 10% of the field.
  float turquoiseField = s2 * 0.35 + s3 * 0.65;
  float turquoiseAccent = smoothstep(0.82, 0.94, turquoiseField);

  float totalW = wCoral + wYellow + 0.0001;
  vec3 warmLiquidColor = (wCoral * colCoral + wYellow * colYellow) / totalW;
  // The accent is chromatically clear inside its small footprint, rather than
  // being diluted into coral everywhere and becoming visually imperceptible.
  vec3 liquidColor = mix(warmLiquidColor, colTurquoise, turquoiseAccent * 0.72);

  // --- SUBTLE TONAL DEPTH WITHIN LIQUID FIELD ---
  float streamDepth = smoothstep(0.15, 0.85, s1 * 0.6 + s2 * 0.4);
  liquidColor = mix(liquidColor * 0.94, liquidColor * 1.03, streamDepth);

  // --- OVERALL LIQUID FORMATION DENSITY ---
  float fluidDensity = smoothstep(0.05, 0.85, s1 * 0.50 + s2 * 0.40 + s3 * 0.30);

  // --- ASYMMETRICAL SPATIAL ENVELOPE (Positioned across center and major visible area) ---
  float spatialEnv = smoothstep(-1.20, 0.20, p.x + 0.40 * sin(p.y * 1.2 + t * 0.40));
  float liquidMask = clamp(fluidDensity * spatialEnv, 0.0, 1.0);

  // --- DYNAMIC OPACITY INTENSITY ---
  // Preserve the warm field density; only the narrow accent stream changes hue.
  float dynamicIntensity = (wCoral * 0.42 + wYellow * 0.25) / totalW;

  // Soft frosted blend into pure white #FFFFFF base
  vec3 finalColor = mix(colBaseWhite, liquidColor, liquidMask * dynamicIntensity);

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

export function AnimatedAxonBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize WebGL context
    const gl =
      canvas.getContext("webgl", { alpha: false, antialias: true, depth: false }) ||
      (canvas.getContext("experimental-webgl", { alpha: false }) as WebGLRenderingContext | null);

    if (!gl) {
      console.warn("WebGL not supported, falling back to static canvas");
      return;
    }

    // Compile shader utility
    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
    const fragShader = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Fullscreen quad geometry (2 triangles covering clip space -1 to 1)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
        1.0, -1.0,
        -1.0, 1.0,
        -1.0, 1.0,
        1.0, -1.0,
        1.0, 1.0,
      ]),
      gl.STATIC_DRAW
    );

    const aPositionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPositionLocation);
    gl.vertexAttribPointer(aPositionLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uResolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const uTimeLocation = gl.getUniformLocation(program, "u_time");
    const uReducedMotionLocation = gl.getUniformLocation(program, "u_reduced_motion");

    let animationFrameId: number;
    let startTime = performance.now();
    let isPaused = false;

    // Handle high-DPI resize & orientation change
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.0 : 1.5);
      const displayWidth = Math.floor(window.innerWidth * dpr);
      const displayHeight = Math.floor(window.innerHeight * dpr);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, displayWidth, displayHeight);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, { passive: true });

    // Handle visibility changes to pause rendering in hidden tabs
    const handleVisibilityChange = () => {
      isPaused = document.hidden;
      if (!isPaused) {
        startTime = performance.now();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Continuous real-time render loop
    const render = (currentTime: number) => {
      if (isPaused) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const elapsed = (currentTime - startTime) * 0.001; // Seconds

      gl.useProgram(program);
      gl.uniform2f(uResolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(uTimeLocation, elapsed);
      gl.uniform1f(uReducedMotionLocation, prefersReducedMotion ? 1.0 : 0.0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (positionBuffer) gl.deleteBuffer(positionBuffer);
      if (vertShader) gl.deleteShader(vertShader);
      if (fragShader) gl.deleteShader(fragShader);
      if (program) gl.deleteProgram(program);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* 1. Underlying Base Pure White Surface */}
      <div className="absolute inset-0 bg-[#FFFFFF]" />

      {/* 2. Fullscreen Dynamic Procedural Liquid Shader (Frosted Glass Diffusion, Refined Highlights) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
        style={{
          filter: "blur(16px)", // Soft frosted diffusion with silky, controlled contours
          transform: "scale(1.02)",
          transformOrigin: "center center",
        }}
      />

      {/* 3. Smooth Frosted Translucent Edge Softener */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(255, 255, 255, 0.60) 0%, rgba(255, 255, 255, 0.15) 45%, rgba(255, 255, 255, 0.0) 80%)",
        }}
      />
    </div>
  );
}
