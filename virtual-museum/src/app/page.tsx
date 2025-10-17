'use client';

import { useState } from 'react';
import { Plus, Eye, Share2, Palette, Users } from 'lucide-react';
import { Gallery } from '@/types';
import { GalleryBuilder } from '@/components/GalleryBuilder';
import { VirtualGallery } from '@/components/VirtualGallery';

export default function HomePage() {
  const [currentView, setCurrentView] = useState<'home' | 'builder' | 'viewer'>('home');
  const [currentGallery, setCurrentGallery] = useState<Gallery | null>(null);

  // Sample gallery data for demo
  const sampleGallery: Gallery = {
    id: 'demo-gallery',
    title: 'My Art Collection',
    description: 'A curated collection of digital artworks and photographs.',
    template: 'classic',
    exhibits: [
      {
        id: '1',
        title: 'Sunset Dreams',
        description: 'A beautiful sunset captured during golden hour.',
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-04b1e0b0f8e0?w=400&h=600&fit=crop',
        position: { x: -4, y: 1.5, z: -8 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 }
      },
      {
        id: '2',
        title: 'Urban Geometry',
        description: 'Abstract architectural photography exploring lines and shapes.',
        imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=600&fit=crop',
        position: { x: 4, y: 1.5, z: -8 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 }
      },
      {
        id: '3',
        title: 'Nature\'s Canvas',
        description: 'A serene forest landscape with morning mist.',
        imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop',
        position: { x: 0, y: 1.5, z: -8 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 }
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isPublic: true,
    shareId: 'demo-gallery'
  };

  const handleCreateGallery = () => {
    const newGallery: Gallery = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'Untitled Gallery',
      description: 'A new virtual gallery space',
      template: 'classic',
      exhibits: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPublic: false
    };
    setCurrentGallery(newGallery);
    setCurrentView('builder');
  };

  const handleViewGallery = (gallery: Gallery) => {
    setCurrentGallery(gallery);
    setCurrentView('viewer');
  };

  const handleSaveGallery = () => {
    // In a real app, this would save to a database
    console.log('Saving gallery:', currentGallery);
    alert('Gallery saved! (This is a demo - no actual saving occurs)');
  };

  const handlePreviewGallery = () => {
    if (currentGallery) {
      setCurrentView('viewer');
    }
  };

  if (currentView === 'builder' && currentGallery) {
    return (
      <GalleryBuilder
        gallery={currentGallery}
        onGalleryUpdate={setCurrentGallery}
        onSave={handleSaveGallery}
        onPreview={handlePreviewGallery}
      />
    );
  }

  if (currentView === 'viewer' && currentGallery) {
    return (
      <div className="h-screen relative">
        <VirtualGallery
          gallery={currentGallery}
          isEditMode={false}
        />
        <button
          onClick={() => setCurrentView('home')}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-lg hover:bg-white transition-colors"
        >
          ← Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Virtual Museum</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Explore</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Create</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Create & Explore
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Virtual Museums
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Build immersive virtual gallery spaces, showcase your art collection, 
            and share your creativity with the world. No complex 3D skills required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleCreateGallery}
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
            >
              <Plus size={24} />
              <span>Create Gallery</span>
            </button>
            <button
              onClick={() => handleViewGallery(sampleGallery)}
              className="inline-flex items-center space-x-2 bg-white text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg border border-gray-200"
            >
              <Eye size={24} />
              <span>View Demo</span>
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-white/80 transition-colors">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Palette className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Easy Creation</h3>
            <p className="text-gray-600">
              Upload your images and arrange them in beautiful virtual gallery spaces. 
              No technical skills required.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-white/80 transition-colors">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Share2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Instant Sharing</h3>
            <p className="text-gray-600">
              Share your galleries with a simple link. Perfect for showcasing 
              student work, art collections, or portfolios.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-white/80 transition-colors">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Immersive Experience</h3>
            <p className="text-gray-600">
              Explore galleries in 3D with intuitive navigation. 
              Click and drag to look around, scroll to zoom.
            </p>
          </div>
        </div>

        {/* Demo Gallery Preview */}
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-gray-900">Featured Gallery</h3>
            <button
              onClick={() => handleViewGallery(sampleGallery)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View Full Gallery →
            </button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {sampleGallery.exhibits.map((exhibit) => (
              <div key={exhibit.id} className="group cursor-pointer" onClick={() => handleViewGallery(sampleGallery)}>
                <div className="aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden mb-3 group-hover:scale-105 transition-transform">
                  <img
                    src={exhibit.imageUrl}
                    alt={exhibit.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-medium text-gray-900">{exhibit.title}</h4>
                <p className="text-sm text-gray-600">{exhibit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/60 backdrop-blur-sm border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 Virtual Museum. Built with Next.js and Three.js.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
