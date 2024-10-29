import React from 'react';
import { FileText, Settings, Download, Search, File } from 'lucide-react';
import { ImageConverter } from './components/ImageConverter';
import { ImageResizer } from './components/ImageResizer';
import { Widget } from './components/Widget';

function App() {
  const handlePDFDrop = (files: File[]) => {
    console.log('PDF files:', files);
    // Implement PDF conversion logic
  };

  const handleOCRDrop = (files: File[]) => {
    console.log('OCR files:', files);
    // Implement OCR logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Settings className="w-6 h-6 text-purple-400" />
              <h1 className="text-xl font-bold text-gray-100">Tab Utilities</h1>
            </div>
            <button
              id="installBtn"
              className="hidden px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 
                        transition-colors font-medium flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Install App
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ImageConverter />
          <ImageResizer />
          <Widget
            title="PDF Converter"
            icon={<File className="w-6 h-6 text-purple-400" />}
            acceptedFiles={['.pdf']}
            onDrop={handlePDFDrop}
          />
          <Widget
            title="OCR Tool"
            icon={<FileText className="w-6 h-6 text-purple-400" />}
            acceptedFiles={['.jpg', '.jpeg', '.png', '.pdf']}
            onDrop={handleOCRDrop}
          />
        </div>

        <div className="mt-12 bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <Search className="w-6 h-6 text-purple-400" />
            <h2 className="text-lg font-semibold text-gray-100">Recent Conversions</h2>
          </div>
          <div className="text-center text-gray-400 py-8">
            Your recent file conversions will appear here
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;