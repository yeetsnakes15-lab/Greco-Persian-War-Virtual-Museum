'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Gallery, Exhibit } from '@/types';
import { GalleryRoom } from './GalleryRoom';
import { ExhibitFrame } from './ExhibitFrame';

interface VirtualGalleryProps {
  gallery: Gallery;
  isEditMode?: boolean;
  onExhibitClick?: (exhibit: Exhibit) => void;
  onExhibitUpdate?: (exhibit: Exhibit) => void;
}

export function VirtualGallery({ 
  gallery, 
  isEditMode = false, 
  onExhibitClick,
  onExhibitUpdate 
}: VirtualGalleryProps) {

  const handleExhibitClick = (exhibit: Exhibit) => {
    if (isEditMode && onExhibitUpdate) {
      onExhibitUpdate(exhibit);
    } else if (onExhibitClick) {
      onExhibitClick(exhibit);
    }
  };

  return (
    <div className="w-full h-screen relative">
      <Canvas
        camera={{ position: [0, 1.6, 5], fov: 75 }}
        shadows
        className="bg-gray-100"
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <GalleryRoom template={gallery.template} />
        
        {gallery.exhibits.map((exhibit) => (
          <ExhibitFrame
            key={exhibit.id}
            exhibit={exhibit}
            onClick={() => handleExhibitClick(exhibit)}
            isEditMode={isEditMode}
          />
        ))}
        
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI - Math.PI / 6}
        />
        
        <Environment preset="apartment" />
      </Canvas>
      
      {/* Gallery Info Overlay */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 max-w-sm">
        <h1 className="text-2xl font-bold text-gray-800">{gallery.title}</h1>
        <p className="text-gray-600 mt-2">{gallery.description}</p>
        <p className="text-sm text-gray-500 mt-2">
          {gallery.exhibits.length} exhibit{gallery.exhibits.length !== 1 ? 's' : ''}
        </p>
      </div>
      
      {/* Navigation Instructions */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-sm text-gray-600">
        <p>🖱️ Click and drag to look around</p>
        <p>🔍 Scroll to zoom in/out</p>
        {isEditMode && <p>✏️ Click exhibits to edit</p>}
      </div>
    </div>
  );
}
