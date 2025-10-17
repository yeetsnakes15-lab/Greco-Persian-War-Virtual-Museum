'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Image } from '@react-three/drei';
import { Mesh } from 'three';
import { Exhibit } from '@/types';

interface ExhibitFrameProps {
  exhibit: Exhibit;
  onClick?: () => void;
  isEditMode?: boolean;
}

export function ExhibitFrame({ exhibit, onClick, isEditMode = false }: ExhibitFrameProps) {
  const frameRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Gentle floating animation
  useFrame((state) => {
    if (frameRef.current) {
      frameRef.current.position.y = exhibit.position.y + Math.sin(state.clock.elapsedTime + exhibit.position.x) * 0.02;
    }
  });

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <group
      position={[exhibit.position.x, exhibit.position.y, exhibit.position.z]}
      rotation={[exhibit.rotation.x, exhibit.rotation.y, exhibit.rotation.z]}
      scale={[exhibit.scale.x, exhibit.scale.y, exhibit.scale.z]}
    >
      {/* Frame */}
      <mesh
        ref={frameRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[2.2, 2.8, 0.1]} />
        <meshLambertMaterial 
          color={isEditMode ? (hovered ? "#ff6b6b" : "#4ecdc4") : "#8b4513"} 
          transparent
          opacity={isEditMode ? 0.8 : 1}
        />
      </mesh>
      
      {/* Artwork */}
      <mesh position={[0, 0, 0.06]} castShadow>
        <planeGeometry args={[2, 2.6]} />
        <meshBasicMaterial>
          <Image url={exhibit.imageUrl} />
        </meshBasicMaterial>
      </mesh>
      
      {/* Title */}
      <Text
        position={[0, -1.8, 0.1]}
        fontSize={0.2}
        color="#333"
        anchorX="center"
        anchorY="middle"
        maxWidth={3}
      >
        {exhibit.title}
      </Text>
      
      {/* Edit mode indicator */}
      {isEditMode && (
        <mesh position={[1.2, 1.2, 0.1]}>
          <sphereGeometry args={[0.1]} />
          <meshBasicMaterial color="#ff6b6b" />
        </mesh>
      )}
    </group>
  );
}
