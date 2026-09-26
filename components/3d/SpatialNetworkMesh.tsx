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
    const count = y === 0 ? 7 : 5;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 1.4 + (Math.abs(y) === 0 ? 0.3 : 0);
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
  const orbitalRef = useRef<THREE.Mesh>(null);
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
    const glassNavy = new THREE.Color("#2D5BB9");
    const electricBlue = new THREE.Color("#3B82F6");
    const amberGold = new THREE.Color("#F4BA00");

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].distanceTo(nodes[j]);
        if (dist < 1.4) {
          positions.push(nodes[i].x, nodes[i].y, nodes[i].z);
          positions.push(nodes[j].x, nodes[j].y, nodes[j].z);

          // Energy path: blue-to-amber transition
          const isAmber = (i + j) % 5 === 0;
          const isBlue = (i + j) % 3 === 0;
          const color = isAmber ? amberGold : isBlue ? electricBlue : glassNavy;

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

    // Slow, stately architectural rotation
    groupRef.current.rotation.y += delta * 0.06;
    groupRef.current.rotation.x = currentMouse.current.y * 0.15;
    groupRef.current.rotation.z = currentMouse.current.x * 0.1;

    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.12;
      coreRef.current.rotation.y += delta * 0.16;
    }

    if (orbitalRef.current) {
      orbitalRef.current.rotation.y -= delta * 0.1;
      orbitalRef.current.rotation.z += delta * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Axon/Vortex Glass Knot with Blue/Amber Lighting */}
      <mesh ref={coreRef} scale={0.75}>
        <torusKnotGeometry args={[0.9, 0.24, 128, 32, 2, 3]} />
        <meshPhysicalMaterial
          color="#163560"
          roughness={0.2}
          metalness={0.75}
          transmission={0.4}
          ior={1.5}
          emissive="#3B82F6"
          emissiveIntensity={0.25}
          clearcoat={1.0}
          clearcoatRoughness={0.15}
        />
      </mesh>

      {/* Outer Vortex Growth Ring */}
      <mesh ref={orbitalRef} scale={1.2}>
        <torusGeometry args={[1.5, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#F4BA00"
          emissive="#F4BA00"
          emissiveIntensity={0.6}
          roughness={0.3}
          metalness={0.9}
        />
      </mesh>

      {/* Network Light Paths */}
      <lineSegments>
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
          opacity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Luminous System Nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#EFECE4"
          transparent={true}
          opacity={0.85}
        />
      </points>
    </group>
  );
}
