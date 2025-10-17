'use client';

import { useState, useCallback } from 'react';
import { Plus, Save, Eye } from 'lucide-react';
import { Gallery, Exhibit, GalleryTemplate } from '@/types';
import { VirtualGallery } from './VirtualGallery';
import { ImageUpload } from './ImageUpload';
import { ExhibitEditor } from './ExhibitEditor';

interface GalleryBuilderProps {
  gallery: Gallery;
  onGalleryUpdate: (gallery: Gallery) => void;
  onSave: () => void;
  onPreview: () => void;
}

export function GalleryBuilder({ 
  gallery, 
  onGalleryUpdate, 
  onSave, 
  onPreview 
}: GalleryBuilderProps) {
  const [selectedExhibit, setSelectedExhibit] = useState<Exhibit | null>(null);
  const [isAddingExhibit, setIsAddingExhibit] = useState(false);
  const [newExhibit, setNewExhibit] = useState<Partial<Exhibit>>({
    title: '',
    description: '',
    imageUrl: '',
    position: { x: 0, y: 1.5, z: -8 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 }
  });

  const handleAddExhibit = useCallback(() => {
    if (newExhibit.title && newExhibit.imageUrl) {
      const exhibit: Exhibit = {
        id: Math.random().toString(36).substr(2, 9),
        title: newExhibit.title,
        description: newExhibit.description || '',
        imageUrl: newExhibit.imageUrl,
        position: newExhibit.position || { x: 0, y: 1.5, z: -8 },
        rotation: newExhibit.rotation || { x: 0, y: 0, z: 0 },
        scale: newExhibit.scale || { x: 1, y: 1, z: 1 }
      };

      const updatedGallery = {
        ...gallery,
        exhibits: [...gallery.exhibits, exhibit]
      };
      
      onGalleryUpdate(updatedGallery);
      setNewExhibit({
        title: '',
        description: '',
        imageUrl: '',
        position: { x: 0, y: 1.5, z: -8 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 }
      });
      setIsAddingExhibit(false);
    }
  }, [gallery, newExhibit, onGalleryUpdate]);

  const handleExhibitUpdate = useCallback((exhibit: Exhibit) => {
    setSelectedExhibit(exhibit);
  }, []);

  const handleExhibitEdit = useCallback((updatedExhibit: Exhibit) => {
    const updatedGallery = {
      ...gallery,
      exhibits: gallery.exhibits.map(ex => 
        ex.id === updatedExhibit.id ? updatedExhibit : ex
      )
    };
    onGalleryUpdate(updatedGallery);
    setSelectedExhibit(null);
  }, [gallery, onGalleryUpdate]);

  const handleImageSelect = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setNewExhibit(prev => ({
        ...prev,
        imageUrl: e.target?.result as string
      }));
    };
    reader.readAsDataURL(file);
  }, []);

  const handleTemplateChange = useCallback((template: GalleryTemplate) => {
    onGalleryUpdate({ ...gallery, template });
  }, [gallery, onGalleryUpdate]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 3D View */}
      <div className="flex-1 relative">
        <VirtualGallery
          gallery={gallery}
          isEditMode={true}
          onExhibitUpdate={handleExhibitUpdate}
        />
      </div>

      {/* Sidebar */}
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Gallery Builder</h2>
            <div className="flex space-x-2">
              <button
                onClick={onPreview}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                title="Preview"
              >
                <Eye size={20} />
              </button>
              <button
                onClick={onSave}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                title="Save"
              >
                <Save size={20} />
              </button>
            </div>
          </div>

          {/* Gallery Info */}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gallery Title
              </label>
              <input
                type="text"
                value={gallery.title}
                onChange={(e) => onGalleryUpdate({ ...gallery, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter gallery title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={gallery.description}
                onChange={(e) => onGalleryUpdate({ ...gallery, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Describe your gallery"
              />
            </div>

            {/* Template Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gallery Style
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleTemplateChange('classic')}
                  className={`flex-1 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    gallery.template === 'classic'
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Classic
                </button>
                <button
                  onClick={() => handleTemplateChange('modern')}
                  className={`flex-1 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    gallery.template === 'modern'
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Modern
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {selectedExhibit ? (
            <ExhibitEditor
              exhibit={selectedExhibit}
              onSave={handleExhibitEdit}
              onCancel={() => setSelectedExhibit(null)}
            />
          ) : isAddingExhibit ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Add New Exhibit</h3>
                <button
                  onClick={() => setIsAddingExhibit(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              </div>

              <ImageUpload
                onImageSelect={handleImageSelect}
                currentImage={newExhibit.imageUrl}
                onImageRemove={() => setNewExhibit(prev => ({ ...prev, imageUrl: '' }))}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newExhibit.title || ''}
                  onChange={(e) => setNewExhibit(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Exhibit title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newExhibit.description || ''}
                  onChange={(e) => setNewExhibit(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Describe this exhibit"
                />
              </div>

              <button
                onClick={handleAddExhibit}
                disabled={!newExhibit.title || !newExhibit.imageUrl}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Add Exhibit
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Exhibits ({gallery.exhibits.length})
                </h3>
                <button
                  onClick={() => setIsAddingExhibit(true)}
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Plus size={16} />
                  <span>Add Exhibit</span>
                </button>
              </div>

              <div className="space-y-2">
                {gallery.exhibits.map((exhibit) => (
                  <div
                    key={exhibit.id}
                    className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedExhibit(exhibit)}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={exhibit.imageUrl}
                        alt={exhibit.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">
                          {exhibit.title}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {exhibit.description || 'No description'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
