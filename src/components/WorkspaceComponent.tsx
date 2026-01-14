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
    };

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
    };

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

  // Handle keyboard delete when selected
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSelected && (e.key === 'Delete' || e.key === 'Backspace')) {
        // Don't delete if user is typing in an input
        if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
        e.preventDefault();
        onDelete();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isSelected, onDelete]);

  return (
    <>
      <div
        className={`workspace-component absolute bg-white rounded-xl overflow-hidden ${
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
        {/* Drag overlay - captures mouse events during drag/resize */}
        <div 
          className="absolute inset-0 z-[5]"
          style={{ 
            cursor: isDragging ? 'grabbing' : 'grab',
            background: 'transparent'
          }}
        />

        <iframe
          ref={iframeRef}
          className="component-preview-frame rounded-xl"
          title={block.name}
          style={{ pointerEvents: 'none' }}
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
          <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#1d1d1f] text-white text-[11px] font-medium px-2.5 py-1 rounded-md whitespace-nowrap z-20 shadow-lg">
            {Math.round(block.width)} × {Math.round(block.height)}
          </div>
        )}
      </div>

      {/* Delete button - floats outside the block, appears when selected */}
      {isSelected && !isDragging && !isResizing && (
        <button
          className="absolute w-7 h-7 bg-[#ff3b30] hover:bg-[#ff453a] rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
          style={{
            left: block.x + block.width - 6,
            top: block.y - 8,
            zIndex: block.zIndex + 1000,
          }}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => { 
            e.stopPropagation(); 
            e.preventDefault();
            onDelete(); 
          }}
          title="Delete component"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      )}

      {/* Global drag overlay to capture mouse during drag/resize */}
      {(isDragging || isResizing) && (
        <div className="fixed inset-0 z-[9998] cursor-grabbing" />
      )}

      {/* Context menu - Apple style */}
      {showContextMenu && (
        <div
          className="fixed glass rounded-xl shadow-2xl border border-black/10 py-1.5 z-[9999] min-w-[180px] overflow-hidden"
          style={{ left: contextMenuPos.x, top: contextMenuPos.y }}
        >
          <button
            className="w-full px-3 py-2 text-left text-[13px] text-[#1d1d1f] hover:bg-black/[0.06] flex items-center gap-3 transition-colors"
            onClick={(e) => { e.stopPropagation(); onDuplicate(); setShowContextMenu(false); }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            Duplicate
          </button>
          <button
            className="w-full px-3 py-2 text-left text-[13px] text-[#1d1d1f] hover:bg-black/[0.06] flex items-center gap-3 transition-colors"
            onClick={(e) => { e.stopPropagation(); onBringToFront(); setShowContextMenu(false); }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="8" width="13" height="13" rx="2"/><path d="M8 8V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2"/></svg>
            Bring to Front
          </button>
          <button
            className="w-full px-3 py-2 text-left text-[13px] text-[#1d1d1f] hover:bg-black/[0.06] flex items-center gap-3 transition-colors"
            onClick={(e) => { e.stopPropagation(); onSendToBack(); setShowContextMenu(false); }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="8" y="3" width="13" height="13" rx="2"/><path d="M16 16v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2"/></svg>
            Send to Back
          </button>
          <div className="border-t border-black/[0.08] my-1.5 mx-2" />
          <button
            className="w-full px-3 py-2 text-left text-[13px] text-[#ff3b30] hover:bg-[#ff3b30]/10 flex items-center gap-3 transition-colors"
            onClick={(e) => { e.stopPropagation(); onDelete(); setShowContextMenu(false); }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z"/></svg>
            Delete
          </button>
        </div>
      )}
    </>
  );
}
