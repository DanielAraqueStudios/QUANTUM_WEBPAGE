'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { FloatingGeometry } from './FloatingGeometry';
import { CameraRig } from './CameraRig';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

function NeuralParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  const particles = new Float32Array(1000 * 3);
  for (let i = 0; i < 1000; i++) {
    particles[i * 3] = (Math.random() - 0.5) * 20;
    particles[i * 3 + 1] = (Math.random() - 0.5) * 20;
    particles[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  useFrame((state) => {
    if (!particlesRef.current) return;
    particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    particlesRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#e0a3ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      {/* Camera follows mouse */}
      <CameraRig />

      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -5]} color="#ff69b4" intensity={0.5} />
      <pointLight position={[10, 5, 5]} color="#00ffff" intensity={0.5} />

      {/* Neural Particles */}
      <NeuralParticles />

      {/* Floating Geometries */}
      <FloatingGeometry
        position={[-3, 2, -2]}
        geometry="icosahedron"
        color="#e0a3ff"
        speed={0.5}
        distort={0.4}
      />
      <FloatingGeometry
        position={[3, -1, -3]}
        geometry="torus"
        color="#ff69b4"
        speed={0.7}
        distort={0.3}
      />
      <FloatingGeometry
        position={[0, 0, -5]}
        geometry="octahedron"
        color="#9370db"
        speed={0.6}
        distort={0.5}
      />
      <FloatingGeometry
        position={[-2, -2, -4]}
        geometry="sphere"
        color="#00ffff"
        speed={0.4}
        distort={0.6}
      />
      <FloatingGeometry
        position={[2, 2, -1]}
        geometry="icosahedron"
        color="#e0a3ff"
        speed={0.8}
        distort={0.3}
      />

      {/* Environment and effects */}
      <Environment preset="night" />
      
      {/* Bloom effect for glow */}
      <EffectComposer>
        <Bloom
          intensity={0.5}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
        />
      </EffectComposer>
    </>
  );
}

export function Hero3DScene() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        style={{ background: 'transparent' }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
        <Scene />
      </Canvas>
    </div>
  );
}
