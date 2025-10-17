'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { GalleryTemplate } from '@/types';

interface GalleryRoomProps {
  template: GalleryTemplate;
}

export function GalleryRoom({ template }: GalleryRoomProps) {
  const floorRef = useRef<Mesh>(null);
  const wallRef = useRef<Mesh>(null);

  // Rotate the room slightly for visual interest
  useFrame((state) => {
    if (floorRef.current) {
      floorRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.01;
    }
  });

  if (template === 'classic') {
    return (
      <group>
        {/* Floor */}
        <mesh ref={floorRef} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshLambertMaterial color="#f5f5f5" />
        </mesh>
        
        {/* Walls */}
        <mesh ref={wallRef} position={[0, 3, -10]} receiveShadow>
          <planeGeometry args={[20, 6]} />
          <meshLambertMaterial color="#ffffff" />
        </mesh>
        
        <mesh position={[0, 3, 10]} receiveShadow>
          <planeGeometry args={[20, 6]} />
          <meshLambertMaterial color="#ffffff" />
        </mesh>
        
        <mesh position={[-10, 3, 0]} receiveShadow rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[20, 6]} />
          <meshLambertMaterial color="#ffffff" />
        </mesh>
        
        <mesh position={[10, 3, 0]} receiveShadow rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[20, 6]} />
          <meshLambertMaterial color="#ffffff" />
        </mesh>
        
        {/* Ceiling */}
        <mesh position={[0, 6, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshLambertMaterial color="#f8f8f8" />
        </mesh>
        
        {/* Decorative elements */}
        <mesh position={[0, 0.1, 0]}>
          <planeGeometry args={[18, 18]} />
          <meshLambertMaterial color="#e8e8e8" />
        </mesh>
      </group>
    );
  }

  // Modern template
  return (
    <group>
      {/* Floor */}
      <mesh ref={floorRef} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshLambertMaterial color="#1a1a1a" />
      </mesh>
      
      {/* Walls with gradient effect */}
      <mesh position={[0, 3, -10]} receiveShadow>
        <planeGeometry args={[20, 6]} />
        <meshLambertMaterial color="#2a2a2a" />
      </mesh>
      
      <mesh position={[0, 3, 10]} receiveShadow>
        <planeGeometry args={[20, 6]} />
        <meshLambertMaterial color="#2a2a2a" />
      </mesh>
      
      <mesh position={[-10, 3, 0]} receiveShadow rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[20, 6]} />
        <meshLambertMaterial color="#2a2a2a" />
      </mesh>
      
      <mesh position={[10, 3, 0]} receiveShadow rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[20, 6]} />
        <meshLambertMaterial color="#2a2a2a" />
      </mesh>
      
      {/* Ceiling */}
      <mesh position={[0, 6, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshLambertMaterial color="#1a1a1a" />
      </mesh>
      
      {/* Accent lighting strips */}
      <mesh position={[0, 5.8, 0]}>
        <planeGeometry args={[18, 0.2]} />
        <meshLambertMaterial color="#00ff88" />
      </mesh>
      
      <mesh position={[0, 5.8, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[18, 0.2]} />
        <meshLambertMaterial color="#00ff88" />
      </mesh>
    </group>
  );
}
