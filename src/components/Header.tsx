'use client';

import { Download, Trash2 } from 'lucide-react';
import { BlockInstance } from '@/types';

interface HeaderProps {
  blocks: BlockInstance[];
  onClear: () => void;
}

export default function Header({ blocks, onClear }: HeaderProps) {
  const exportHTML = () => {
    // Generate full HTML document with all components
    const styles = blocks.map(block => block.css).join('\n');
    const html = blocks.map(block => {
      return `<div style="position: absolute; left: ${block.x}px; top: ${block.y}px; width: ${block.width}px; height: ${block.height}px;">
        ${block.html}
      </div>`;
    }).join('\n');

    const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website - Built with RapidBlocks</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; min-height: 100vh; position: relative; }
    ${styles}
  </style>
</head>
<body>
  ${html}
</body>
</html>`;

    // Download the file
    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-website.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <header className="h-[60px] bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">R</span>
        </div>
        <h1 className="text-xl font-bold text-gray-800">RapidBlocks</h1>
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Beta</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">
          {blocks.length} component{blocks.length !== 1 ? 's' : ''}
        </span>
        
        <button
          onClick={onClear}
          disabled={blocks.length === 0}
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 size={16} />
          Clear
        </button>

        <button
          onClick={exportHTML}
          disabled={blocks.length === 0}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download size={16} />
          Export HTML
        </button>
      </div>
    </header>
  );
}
