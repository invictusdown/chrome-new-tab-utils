import React from 'react';
import { X, Lock, Unlock } from 'lucide-react';

interface ResizeSettings {
  width: number;
  height: number;
  maintainAspectRatio: boolean;
  originalAspectRatio?: number;
}

interface ResizerSettingsProps {
  settings: ResizeSettings;
  onClose: () => void;
  onChange: (settings: ResizeSettings) => void;
}

export const ResizerSettings: React.FC<ResizerSettingsProps> = ({
  settings,
  onClose,
  onChange
}) => {
  const handleWidthChange = (width: number) => {
    if (settings.maintainAspectRatio && settings.originalAspectRatio) {
      onChange({
        ...settings,
        width,
        height: Math.round(width / settings.originalAspectRatio)
      });
    } else {
      onChange({ ...settings, width });
    }
  };

  const handleHeightChange = (height: number) => {
    if (settings.maintainAspectRatio && settings.originalAspectRatio) {
      onChange({
        ...settings,
        height,
        width: Math.round(height * settings.originalAspectRatio)
      });
    } else {
      onChange({ ...settings, height });
    }
  };

  return (
    <div className="absolute top-full mt-2 right-0 w-72 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-10">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-medium text-gray-100">Resize Settings</h4>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Width (px)
              </label>
              <input
                type="number"
                value={settings.width}
                onChange={(e) => handleWidthChange(Number(e.target.value))}
                min="1"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-gray-100 
                         focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Height (px)
              </label>
              <input
                type="number"
                value={settings.height}
                onChange={(e) => handleHeightChange(Number(e.target.value))}
                min="1"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-gray-100 
                         focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
          </div>
          
          <div>
            <button
              onClick={() => onChange({ ...settings, maintainAspectRatio: !settings.maintainAspectRatio })}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
                       hover:bg-gray-700 transition-colors"
            >
              {settings.maintainAspectRatio ? (
                <Lock className="w-4 h-4 text-purple-400" />
              ) : (
                <Unlock className="w-4 h-4 text-gray-400" />
              )}
              <span className={settings.maintainAspectRatio ? 'text-purple-400' : 'text-gray-400'}>
                Maintain Aspect Ratio
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};