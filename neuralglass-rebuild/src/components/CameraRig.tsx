'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function CameraRig() {
  const { camera, pointer } = useThree();
  const targetRef = useRef(new THREE.Vector3());

  useFrame(() => {
    // Smooth camera follow mouse using pointer (which is normalized)
    targetRef.current.x = THREE.MathUtils.lerp(
      targetRef.current.x,
      pointer.x * 2,
      0.05
    );
    targetRef.current.y = THREE.MathUtils.lerp(
      targetRef.current.y,
      pointer.y * 1.5,
      0.05
    );

    // Update camera position smoothly
    const newX = THREE.MathUtils.lerp(
      camera.position.x,
      targetRef.current.x,
      0.05
    );
    const newY = THREE.MathUtils.lerp(
      camera.position.y,
      targetRef.current.y,
      0.05
    );
    
    camera.position.set(newX, newY, camera.position.z);
    camera.lookAt(0, 0, 0);
  });

  return null;
}
