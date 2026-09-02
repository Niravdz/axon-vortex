"use client";

import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";

export function VortexMesh() {
  const coreRef = useRef<THREE.Mesh>(null);
  const orbitalRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

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

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * 0.035;
    currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * 0.035;

    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.18;
      coreRef.current.rotation.y += delta * 0.22;
    }

    if (orbitalRef.current) {
      orbitalRef.current.rotation.y -= delta * 0.12;
      orbitalRef.current.rotation.z += delta * 0.15;
    }

    groupRef.current.rotation.x = currentMouse.current.y * 0.3;
    groupRef.current.rotation.y = currentMouse.current.x * 0.35;
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.3}
      floatIntensity={0.5}
      floatingRange={[-0.08, 0.08]}
    >
      <group ref={groupRef}>
        {/* Central Metallic Knot */}
        <mesh ref={coreRef} scale={1.15}>
          <torusKnotGeometry args={[1.0, 0.3, 96, 24, 2, 3]} />
          <meshPhysicalMaterial
            color="#1E1E2E"
            roughness={0.25}
            metalness={0.85}
            clearcoat={0.8}
            clearcoatRoughness={0.2}
            emissive="#00C2C7"
            emissiveIntensity={0.12}
          />
        </mesh>

        {/* Outer Wireframe Lattice */}
        <mesh ref={orbitalRef} scale={1.22}>
          <torusKnotGeometry args={[1.0, 0.3, 48, 12, 2, 3]} />
          <meshBasicMaterial
            color="#FF7A59"
            wireframe={true}
            transparent={true}
            opacity={0.18}
          />
        </mesh>
      </group>
    </Float>
  );
}
