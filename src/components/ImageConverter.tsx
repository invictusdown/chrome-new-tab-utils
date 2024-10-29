import React, { useState } from 'react';
import { Image as ImageIcon, Settings2 } from 'lucide-react';
import { Widget } from './Widget';
import { SettingsMenu } from './SettingsMenu';

interface ImageSettings {
  format: 'webp' | 'jpeg' | 'png';
  quality: number;
}

export const ImageConverter: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<ImageSettings>({
    format: 'webp',
    quality: 80
  });

  const handleDrop = async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    try {
      // Create a canvas to handle the image conversion
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }

      // Load the image
      await new Promise((resolve, reject) => {
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
      });
      
      // Set canvas dimensions
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw image to canvas
      ctx.drawImage(img, 0, 0);
      
      // Convert to desired format
      const mimeType = `image/${settings.format}`;
      const quality = settings.quality / 100;
      const dataUrl = canvas.toDataURL(mimeType, quality);
      
      // Convert data URL to blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      // Get original filename and replace extension
      const filename = file.name.replace(/\.[^/.]+$/, `.${settings.format}`);

      // Use Chrome's download API
      chrome.downloads.download({
        url: blobUrl,
        filename: filename,
        saveAs: false
      });

      // Cleanup
      URL.revokeObjectURL(img.src);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error converting image:', error);
    }
  };

  return (
    <div className="relative">
      <Widget
        title="Image Converter"
        icon={<ImageIcon className="w-6 h-6 text-purple-400" />}
        acceptedFiles={['.jpg', '.jpeg', '.png', '.gif']}
        onDrop={handleDrop}
        actionButton={
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            title="Conversion Settings"
          >
            <Settings2 className="w-5 h-5 text-purple-400" />
          </button>
        }
      />
      
      {showSettings && (
        <SettingsMenu
          settings={settings}
          onClose={() => setShowSettings(false)}
          onChange={setSettings}
        />
      )}
    </div>
  );
};