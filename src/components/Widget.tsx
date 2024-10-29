import React from 'react';
import { useDropzone } from 'react-dropzone';

interface WidgetProps {
  title: string;
  icon: React.ReactNode;
  acceptedFiles: string[];
  onDrop: (files: File[]) => void;
  actionButton?: React.ReactNode;
}

export const Widget: React.FC<WidgetProps> = ({
  title,
  icon,
  acceptedFiles,
  onDrop,
  actionButton
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': acceptedFiles },
    onDrop
  });

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {icon}
            <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
          </div>
          {actionButton}
        </div>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors
            ${isDragActive ? 'border-purple-500 bg-purple-500/10' : 'border-gray-600 hover:border-purple-400'}`}
        >
          <input {...getInputProps()} />
          <p className="text-gray-400">
            {isDragActive ? 'Drop files here' : 'Drag & drop files here, or click to select'}
          </p>
        </div>
      </div>
    </div>
  );
};