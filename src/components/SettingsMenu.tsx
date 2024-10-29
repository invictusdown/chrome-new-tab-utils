import React from 'react';
import { X } from 'lucide-react';

interface ImageSettings {
  format: 'webp' | 'jpeg' | 'png';
  quality: number;
}

interface SettingsMenuProps {
  settings: ImageSettings;
  onClose: () => void;
  onChange: (settings: ImageSettings) => void;
}

export const SettingsMenu: React.FC<SettingsMenuProps> = ({
  settings,
  onClose,
  onChange
}) => {
  return (
    <div className="absolute top-full mt-2 right-0 w-64 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-10">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-medium text-gray-100">Conversion Settings</h4>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Output Format
            </label>
            <select
              value={settings.format}
              onChange={(e) => onChange({ ...settings, format: e.target.value as ImageSettings['format'] })}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-gray-100 
                       focus:outline-none focus:border-purple-500 transition-colors"
            >
              <option value="webp">WebP</option>
              <option value="jpeg">JPEG</option>
              <option value="png">PNG</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Quality: {settings.quality}%
            </label>
            <input
              type="range"
              min="1"
              max="100"
              value={settings.quality}
              onChange={(e) => onChange({ ...settings, quality: Number(e.target.value) })}
              className="w-full accent-purple-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};