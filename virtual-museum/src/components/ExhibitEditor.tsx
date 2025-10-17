'use client';

import { useState, useCallback } from 'react';
import { Save, X, RotateCcw } from 'lucide-react';
import { Exhibit } from '@/types';

interface ExhibitEditorProps {
  exhibit: Exhibit;
  onSave: (exhibit: Exhibit) => void;
  onCancel: () => void;
}

export function ExhibitEditor({ exhibit, onSave, onCancel }: ExhibitEditorProps) {
  const [editedExhibit, setEditedExhibit] = useState<Exhibit>(exhibit);

  const handleSave = useCallback(() => {
    onSave(editedExhibit);
  }, [editedExhibit, onSave]);

  const handleReset = useCallback(() => {
    setEditedExhibit(exhibit);
  }, [exhibit]);

  const updatePosition = useCallback((axis: 'x' | 'y' | 'z', value: number) => {
    setEditedExhibit(prev => ({
      ...prev,
      position: { ...prev.position, [axis]: value }
    }));
  }, []);

  const updateRotation = useCallback((axis: 'x' | 'y' | 'z', value: number) => {
    setEditedExhibit(prev => ({
      ...prev,
      rotation: { ...prev.rotation, [axis]: value }
    }));
  }, []);

  const updateScale = useCallback((axis: 'x' | 'y' | 'z', value: number) => {
    setEditedExhibit(prev => ({
      ...prev,
      scale: { ...prev.scale, [axis]: value }
    }));
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Edit Exhibit</h3>
        <div className="flex space-x-2">
          <button
            onClick={handleReset}
            className="p-1 text-gray-500 hover:text-gray-700"
            title="Reset"
          >
            <RotateCcw size={16} />
          </button>
          <button
            onClick={onCancel}
            className="p-1 text-gray-500 hover:text-gray-700"
            title="Cancel"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Exhibit Preview */}
      <div className="border border-gray-200 rounded-lg p-4">
        <img
          src={editedExhibit.imageUrl}
          alt={editedExhibit.title}
          className="w-full h-32 object-cover rounded"
        />
      </div>

      {/* Basic Info */}
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={editedExhibit.title}
            onChange={(e) => setEditedExhibit(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={editedExhibit.description}
            onChange={(e) => setEditedExhibit(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
        </div>
      </div>

      {/* Position Controls */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Position</h4>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-xs text-gray-500 mb-1">X</label>
            <input
              type="number"
              step="0.1"
              value={editedExhibit.position.x}
              onChange={(e) => updatePosition('x', parseFloat(e.target.value) || 0)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Y</label>
            <input
              type="number"
              step="0.1"
              value={editedExhibit.position.y}
              onChange={(e) => updatePosition('y', parseFloat(e.target.value) || 0)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Z</label>
            <input
              type="number"
              step="0.1"
              value={editedExhibit.position.z}
              onChange={(e) => updatePosition('z', parseFloat(e.target.value) || 0)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Rotation Controls */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Rotation (degrees)</h4>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-xs text-gray-500 mb-1">X</label>
            <input
              type="number"
              step="1"
              value={Math.round((editedExhibit.rotation.x * 180) / Math.PI)}
              onChange={(e) => updateRotation('x', (parseFloat(e.target.value) || 0) * Math.PI / 180)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Y</label>
            <input
              type="number"
              step="1"
              value={Math.round((editedExhibit.rotation.y * 180) / Math.PI)}
              onChange={(e) => updateRotation('y', (parseFloat(e.target.value) || 0) * Math.PI / 180)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Z</label>
            <input
              type="number"
              step="1"
              value={Math.round((editedExhibit.rotation.z * 180) / Math.PI)}
              onChange={(e) => updateRotation('z', (parseFloat(e.target.value) || 0) * Math.PI / 180)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Scale Controls */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Scale</h4>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-xs text-gray-500 mb-1">X</label>
            <input
              type="number"
              step="0.1"
              min="0.1"
              value={editedExhibit.scale.x}
              onChange={(e) => updateScale('x', parseFloat(e.target.value) || 0.1)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Y</label>
            <input
              type="number"
              step="0.1"
              min="0.1"
              value={editedExhibit.scale.y}
              onChange={(e) => updateScale('y', parseFloat(e.target.value) || 0.1)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Z</label>
            <input
              type="number"
              step="0.1"
              min="0.1"
              value={editedExhibit.scale.z}
              onChange={(e) => updateScale('z', parseFloat(e.target.value) || 0.1)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Quick Presets */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700">Quick Presets</h4>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              setEditedExhibit(prev => ({
                ...prev,
                position: { x: -6, y: 1.5, z: -8 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
              }));
            }}
            className="px-3 py-2 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
          >
            Left Wall
          </button>
          <button
            onClick={() => {
              setEditedExhibit(prev => ({
                ...prev,
                position: { x: 6, y: 1.5, z: -8 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
              }));
            }}
            className="px-3 py-2 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
          >
            Right Wall
          </button>
          <button
            onClick={() => {
              setEditedExhibit(prev => ({
                ...prev,
                position: { x: 0, y: 1.5, z: -8 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
              }));
            }}
            className="px-3 py-2 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
          >
            Center
          </button>
          <button
            onClick={() => {
              setEditedExhibit(prev => ({
                ...prev,
                position: { x: 0, y: 1.5, z: 8 },
                rotation: { x: 0, y: Math.PI, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
              }));
            }}
            className="px-3 py-2 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
          >
            Back Wall
          </button>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
      >
        <Save size={16} />
        <span>Save Changes</span>
      </button>
    </div>
  );
}
