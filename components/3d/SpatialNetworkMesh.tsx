"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

// Generate architectural geometric node coordinates with controlled density
function generateArchitecturalNodes() {
  const nodes: THREE.Vector3[] = [];
  const levels = [-1.0, -0.5, 0, 0.5, 1.0];

  levels.forEach((y) => {
    const count = y === 0 ? 6 : 5;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 1.35 + (Math.abs(y) === 0 ? 0.25 : 0);
      nodes.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius
        )
      );
    }
  });

  return nodes;
}

export function SpatialNetworkMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const prefersReducedMotion = useReducedMotion();
  const nodes = useMemo(() => generateArchitecturalNodes(), []);

  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const { linePositions, lineColors } = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];
    const deepSlate = new THREE.Color("#0F2747");
    const accentGold = new THREE.Color("#F4C430");
    const accentOrange = new THREE.Color("#FF8A00");

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].distanceTo(nodes[j]);
        if (dist < 1.35) {
          positions.push(nodes[i].x, nodes[i].y, nodes[i].z);
          positions.push(nodes[j].x, nodes[j].y, nodes[j].z);

          const isAccent = (i + j) % 7 === 0;
          const color = isAccent ? accentOrange : Math.random() > 0.5 ? accentGold : deepSlate;
          colors.push(color.r, color.g, color.b);
          colors.push(color.r, color.g, color.b);
        }
      }
    }
    return {
      linePositions: new Float32Array(positions),
      lineColors: new Float32Array(colors),
    };
  }, [nodes]);

  const particlePositions = useMemo(() => {
    const pos = new Float32Array(nodes.length * 3);
    for (let i = 0; i < nodes.length; i++) {
      pos[i * 3] = nodes[i].x;
      pos[i * 3 + 1] = nodes[i].y;
      pos[i * 3 + 2] = nodes[i].z;
    }
    return pos;
  }, [nodes]);

  useFrame((_, delta) => {
    if (!groupRef.current || prefersReducedMotion) return;

    currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * 0.03;
    currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * 0.03;

    // Slow, steady architectural rotation
    groupRef.current.rotation.y += delta * 0.07;
    groupRef.current.rotation.x = currentMouse.current.y * 0.2;
    groupRef.current.rotation.z = currentMouse.current.x * 0.12;

    if (coreRef.current) {
      coreRef.current.rotation.x -= delta * 0.08;
      coreRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Structural Connecting Lattice Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors={true}
          transparent={true}
          opacity={0.4}
        />
      </lineSegments>

      {/* 2. Structured Node Points */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#FF8A00"
          transparent={true}
          opacity={0.85}
        />
      </points>

      {/* 3. Central Metallic Architectural Core */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.45, 0]} />
        <meshStandardMaterial
          color="#0F2747"
          roughness={0.2}
          metalness={0.8}
          wireframe={true}
        />
      </mesh>

      {/* 4. Subtle Outer Bounds Wireframe */}
      <mesh scale={1.6}>
        <boxGeometry args={[1.4, 1.4, 1.4]} />
        <meshBasicMaterial
          color="#0F2747"
          wireframe={true}
          transparent={true}
          opacity={0.08}
        />
      </mesh>
    </group>
  );
}
