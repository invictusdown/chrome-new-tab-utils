import React, { useState } from 'react';
import { Image, Settings2 } from 'lucide-react';
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

  const handleDrop = (files: File[]) => {
    console.log('Converting images with settings:', settings);
    console.log('Files:', files);
    // Implement conversion logic
  };

  return (
    <div className="relative">
      <Widget
        title="Image Converter"
        icon={<Image className="w-6 h-6 text-purple-400" />}
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