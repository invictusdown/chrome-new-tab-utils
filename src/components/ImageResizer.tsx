import React, { useState } from 'react';
import { Image as ImageIcon, Settings2, Lock, Unlock } from 'lucide-react';
import { Widget } from './Widget';
import { ResizerSettings } from './ResizerSettings';

interface ResizeSettings {
  width: number;
  height: number;
  maintainAspectRatio: boolean;
  originalAspectRatio?: number;
}

export const ImageResizer: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<ResizeSettings>({
    width: 1920,
    height: 1080,
    maintainAspectRatio: true
  });

  const handleDrop = async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    try {
      // Get original image dimensions and update settings
      const img = new window.Image();
      const loadImagePromise = new Promise((resolve, reject) => {
        img.onload = () => {
          const aspectRatio = img.width / img.height;
          setSettings(prev => ({
            ...prev,
            width: img.width,
            height: img.height,
            originalAspectRatio: aspectRatio
          }));
          resolve(img);
        };
        img.onerror = reject;
      });

      img.src = URL.createObjectURL(file);
      await loadImagePromise;

      // Create canvas for resizing
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }

      // Set canvas dimensions to target size
      canvas.width = settings.width;
      canvas.height = settings.height;

      // Draw and resize image
      ctx.drawImage(img, 0, 0, settings.width, settings.height);

      // Convert to blob
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      // Get original filename
      const filename = file.name.replace(/\.[^/.]+$/, '.png');

      // Download using Chrome API
      chrome.downloads.download({
        url: blobUrl,
        filename: filename,
        saveAs: false
      });

      // Cleanup
      URL.revokeObjectURL(img.src);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error resizing image:', error);
    }
  };

  return (
    <div className="relative">
      <Widget
        title="Image Resizer"
        icon={<ImageIcon className="w-6 h-6 text-purple-400" />}
        acceptedFiles={['.jpg', '.jpeg', '.png', '.gif']}
        onDrop={handleDrop}
        actionButton={
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            title="Resize Settings"
          >
            <Settings2 className="w-5 h-5 text-purple-400" />
          </button>
        }
      />
      
      {showSettings && (
        <ResizerSettings
          settings={settings}
          onClose={() => setShowSettings(false)}
          onChange={setSettings}
        />
      )}
    </div>
  );
};