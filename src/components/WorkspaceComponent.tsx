'use client';

import { useState, useRef, useEffect, RefObject } from 'react';
import { BlockInstance } from '@/types';

interface WorkspaceComponentProps {
  block: BlockInstance;
  isSelected: boolean;
  workspaceRef: RefObject<HTMLDivElement>;
  onSelect: () => void;
  onUpdate: (updates: Partial<BlockInstance>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onBringToFront: () => void;
  onSendToBack: () => void;
}

const MIN_SIZE = 50;
const RESIZE_HANDLES = ['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se'] as const;

export default function WorkspaceComponent({
  block,
  isSelected,
  workspaceRef,
  onSelect,
  onUpdate,
  onDelete,
  onDuplicate,
  onBringToFront,
  onSendToBack,
}: WorkspaceComponentProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });
  const [showSizeIndicator, setShowSizeIndicator] = useState(false);

  // Write content to iframe
  useEffect(() => {
    if (!iframeRef.current) return;

    const doc = iframeRef.current.contentDocument;
    if (!doc) return;

    const content = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    ${block.css}
  </style>
</head>
<body>
  ${block.html}
</body>
</html>`;

    doc.open();
    doc.write(content);
    doc.close();
  }, [block.html, block.css]);

  // Handle dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains('resize-handle')) return;
    
    e.preventDefault();
    e.stopPropagation();
    onSelect();
    setIsDragging(true);

    const startX = e.clientX;
    const startY = e.clientY;
    const startLeft = block.x;
    const startTop = block.y;

    const handleMouseMove = (e: MouseEvent) => {
      if (!workspaceRef.current) return;

      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      const workspace = workspaceRef.current.getBoundingClientRect();
      let newX = startLeft + deltaX;
      let newY = startTop + deltaY;

      // Constrain to workspace bounds
      newX = Math.max(0, Math.min(newX, workspace.width - block.width));
      newY = Math.max(0, Math.min(newY, workspace.height - block.height));

      onUpdate({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      // Re-enable pointer events on all iframes
      document.querySelectorAll('iframe').forEach(iframe => {
        iframe.style.pointerEvents = '';
      });
    };

    // Disable pointer events on all iframes to prevent them from capturing mouse events
    document.querySelectorAll('iframe').forEach(iframe => {
      iframe.style.pointerEvents = 'none';
    });

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Handle resizing
  const handleResizeStart = (e: React.MouseEvent, handle: string) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect();
    setIsResizing(true);
    setShowSizeIndicator(true);

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = block.width;
    const startHeight = block.height;
    const startLeft = block.x;
    const startTop = block.y;

    const handleMouseMove = (e: MouseEvent) => {
      if (!workspaceRef.current) return;

      const workspace = workspaceRef.current.getBoundingClientRect();
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;
      let newX = startLeft;
      let newY = startTop;

      // Handle different resize directions
      if (handle.includes('e')) {
        newWidth = Math.max(MIN_SIZE, startWidth + deltaX);
        newWidth = Math.min(newWidth, workspace.width - startLeft);
      }
      if (handle.includes('w')) {
        const maxDelta = startWidth - MIN_SIZE;
        const clampedDelta = Math.max(-startLeft, Math.min(deltaX, maxDelta));
        newX = startLeft + clampedDelta;
        newWidth = startWidth - clampedDelta;
      }
      if (handle.includes('s')) {
        newHeight = Math.max(MIN_SIZE, startHeight + deltaY);
        newHeight = Math.min(newHeight, workspace.height - startTop);
      }
      if (handle.includes('n')) {
        const maxDelta = startHeight - MIN_SIZE;
        const clampedDelta = Math.max(-startTop, Math.min(deltaY, maxDelta));
        newY = startTop + clampedDelta;
        newHeight = startHeight - clampedDelta;
      }

      onUpdate({ x: newX, y: newY, width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setShowSizeIndicator(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      // Re-enable pointer events on all iframes
      document.querySelectorAll('iframe').forEach(iframe => {
        iframe.style.pointerEvents = '';
      });
    };

    // Disable pointer events on all iframes during resize
    document.querySelectorAll('iframe').forEach(iframe => {
      iframe.style.pointerEvents = 'none';
    });

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Context menu
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowContextMenu(true);
    setContextMenuPos({ x: e.clientX, y: e.clientY });
    onSelect();
  };

  // Close context menu on click outside
  useEffect(() => {
    const handleClick = () => setShowContextMenu(false);
    if (showContextMenu) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [showContextMenu]);

  return (
    <>
      <div
        className={`workspace-component absolute bg-white rounded overflow-hidden ${
          isDragging ? 'dragging cursor-grabbing' : 'cursor-grab'
        } ${isSelected ? 'selected' : ''}`}
        style={{
          left: block.x,
          top: block.y,
          width: block.width,
          height: block.height,
          zIndex: block.zIndex,
        }}
        onMouseDown={handleMouseDown}
        onContextMenu={handleContextMenu}
      >
        <iframe
          ref={iframeRef}
          className="component-preview-frame"
          title={block.name}
        />

        {/* Resize handles */}
        {RESIZE_HANDLES.map(handle => (
          <div
            key={handle}
            className={`resize-handle ${handle}`}
            onMouseDown={(e) => handleResizeStart(e, handle)}
          />
        ))}

        {/* Size indicator */}
        {showSizeIndicator && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            {Math.round(block.width)} × {Math.round(block.height)}
          </div>
        )}
      </div>

      {/* Context menu */}
      {showContextMenu && (
        <div
          className="fixed bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-[9999] min-w-[160px]"
          style={{ left: contextMenuPos.x, top: contextMenuPos.y }}
        >
          <button
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
            onClick={(e) => { e.stopPropagation(); onDuplicate(); setShowContextMenu(false); }}
          >
            <span>📋</span> Duplicate
          </button>
          <button
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
            onClick={(e) => { e.stopPropagation(); onBringToFront(); setShowContextMenu(false); }}
          >
            <span>⬆️</span> Bring to Front
          </button>
          <button
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
            onClick={(e) => { e.stopPropagation(); onSendToBack(); setShowContextMenu(false); }}
          >
            <span>⬇️</span> Send to Back
          </button>
          <div className="border-t border-gray-200 my-1" />
          <button
            className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 text-red-600 flex items-center gap-2"
            onClick={(e) => { e.stopPropagation(); onDelete(); setShowContextMenu(false); }}
          >
            <span>🗑️</span> Delete
          </button>
        </div>
      )}
    </>
  );
}
