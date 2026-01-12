'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingGeometryProps {
  position: [number, number, number];
  geometry: 'sphere' | 'torus' | 'octahedron' | 'icosahedron';
  color: string;
  speed?: number;
  distort?: number;
}

export function FloatingGeometry({
  position,
  geometry,
  color,
  speed = 1,
  distort = 0.3,
}: FloatingGeometryProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    meshRef.current.rotation.x = state.clock.getElapsedTime() * speed * 0.2;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * speed * 0.3;
  });

  const GeometryComponent = useMemo(() => {
    switch (geometry) {
      case 'sphere':
        return <sphereGeometry args={[1, 64, 64]} />;
      case 'torus':
        return <torusGeometry args={[1, 0.4, 32, 100]} />;
      case 'octahedron':
        return <octahedronGeometry args={[1, 0]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[1, 0]} />;
      default:
        return <sphereGeometry args={[1, 64, 64]} />;
    }
  }, [geometry]);

  return (
    <Float
      speed={speed}
      rotationIntensity={0.5}
      floatIntensity={2}
      floatingRange={[-0.5, 0.5]}
    >
      <mesh ref={meshRef} position={position} castShadow>
        {GeometryComponent}
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
}
