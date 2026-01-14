'use client';

import { Download, Trash2 } from 'lucide-react';
import { BlockInstance } from '@/types';

interface HeaderProps {
  blocks: BlockInstance[];
  onClear: () => void;
}

export default function Header({ blocks, onClear }: HeaderProps) {
  const exportHTML = () => {
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
  <title>My Website — Built with RapidBlocks</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; min-height: 100vh; position: relative; }
    ${styles}
  </style>
</head>
<body>
  ${html}
</body>
</html>`;

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
    <header className="h-[56px] glass border-b border-black/5 flex items-center justify-between px-5 flex-shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-[#0071e3] to-[#40c8e0] rounded-[10px] flex items-center justify-center shadow-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        </div>
        <div className="flex items-baseline gap-2">
          <h1 className="text-[15px] font-semibold text-[#1d1d1f] tracking-tight">RapidBlocks</h1>
          <span className="text-[10px] font-medium text-[#86868b] uppercase tracking-wider">Beta</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[13px] text-[#86868b] mr-2">
          {blocks.length} {blocks.length === 1 ? 'element' : 'elements'}
        </span>
        
        <button
          onClick={onClear}
          disabled={blocks.length === 0}
          className="apple-btn apple-btn-secondary disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Trash2 size={14} strokeWidth={2} />
          <span>Clear</span>
        </button>

        <button
          onClick={exportHTML}
          disabled={blocks.length === 0}
          className="apple-btn apple-btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Download size={14} strokeWidth={2} />
          <span>Export</span>
        </button>
      </div>
    </header>
  );
}
