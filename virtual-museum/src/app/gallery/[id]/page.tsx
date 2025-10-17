'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { VirtualGallery } from '@/components/VirtualGallery';
import { Gallery } from '@/types';

export default function GalleryViewPage() {
  const params = useParams();
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, this would fetch from a database
    // For now, we'll use the demo gallery
    const fetchGallery = async () => {
      try {
        setLoading(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Demo gallery data
        const demoGallery: Gallery = {
          id: params.id as string,
          title: 'Shared Art Gallery',
          description: 'A beautiful collection of digital artworks shared with you.',
          template: 'classic',
          exhibits: [
            {
              id: '1',
              title: 'Mountain Vista',
              description: 'A breathtaking view of mountain peaks at sunrise.',
              imageUrl: 'https://images.unsplash.com/photo-1506905925346-04b1e0b0f8e0?w=400&h=600&fit=crop',
              position: { x: -4, y: 1.5, z: -8 },
              rotation: { x: 0, y: 0, z: 0 },
              scale: { x: 1, y: 1, z: 1 }
            },
            {
              id: '2',
              title: 'Urban Abstract',
              description: 'Modern city architecture captured in abstract form.',
              imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=600&fit=crop',
              position: { x: 4, y: 1.5, z: -8 },
              rotation: { x: 0, y: 0, z: 0 },
              scale: { x: 1, y: 1, z: 1 }
            },
            {
              id: '3',
              title: 'Forest Serenity',
              description: 'Peaceful forest scene with morning light filtering through trees.',
              imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop',
              position: { x: 0, y: 1.5, z: -8 },
              rotation: { x: 0, y: 0, z: 0 },
              scale: { x: 1, y: 1, z: 1 }
            },
            {
              id: '4',
              title: 'Ocean Waves',
              description: 'Powerful ocean waves crashing against rocky shores.',
              imageUrl: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=600&fit=crop',
              position: { x: -6, y: 1.5, z: 8 },
              rotation: { x: 0, y: Math.PI, z: 0 },
              scale: { x: 1, y: 1, z: 1 }
            },
            {
              id: '5',
              title: 'Desert Sunset',
              description: 'Golden hour in the desert with dramatic cloud formations.',
              imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=600&fit=crop',
              position: { x: 6, y: 1.5, z: 8 },
              rotation: { x: 0, y: Math.PI, z: 0 },
              scale: { x: 1, y: 1, z: 1 }
            }
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isPublic: true,
          shareId: params.id as string
        };
        
        setGallery(demoGallery);
      } catch (err) {
        setError('Failed to load gallery');
        console.error('Error fetching gallery:', err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchGallery();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  if (error || !gallery) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Gallery Not Found</h1>
          <p className="text-gray-600 mb-6">
            The gallery you&apos;re looking for doesn&apos;t exist or is no longer available.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen relative">
      <VirtualGallery
        gallery={gallery}
        isEditMode={false}
      />
      
      {/* Share Button */}
      <button
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          alert('Gallery link copied to clipboard!');
        }}
        className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-lg hover:bg-white transition-colors flex items-center space-x-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
        <span>Share</span>
      </button>
    </div>
  );
}
