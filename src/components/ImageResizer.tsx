import React, { useState } from 'react';
import { Image, Settings2, Lock, Unlock } from 'lucide-react';
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

    // Get original image dimensions
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      setSettings(prev => ({
        ...prev,
        width: img.width,
        height: img.height,
        originalAspectRatio: aspectRatio
      }));
      URL.revokeObjectURL(url);
    };
    
    img.src = url;
  };

  return (
    <div className="relative">
      <Widget
        title="Image Resizer"
        icon={<Image className="w-6 h-6 text-purple-400" />}
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