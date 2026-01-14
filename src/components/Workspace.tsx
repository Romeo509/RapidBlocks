'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { BlockInstance } from '@/types';
import { blockTemplates } from '@/data/blocks';
import WorkspaceComponent from './WorkspaceComponent';

interface WorkspaceProps {
  blocks: BlockInstance[];
  selectedBlockId: string | null;
  onSelectBlock: (id: string | null) => void;
  onUpdateBlock: (id: string, updates: Partial<BlockInstance>) => void;
  onDeleteBlock: (id: string) => void;
  onDuplicateBlock: (id: string) => void;
  onAddBlock: (block: BlockInstance) => void;
}

export default function Workspace({
  blocks,
  selectedBlockId,
  onSelectBlock,
  onUpdateBlock,
  onDeleteBlock,
  onDuplicateBlock,
  onAddBlock,
}: WorkspaceProps) {
  const workspaceRef = useRef<HTMLDivElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const blockId = e.dataTransfer.getData('blockId');
    if (!blockId || !workspaceRef.current) return;

    const template = blockTemplates.find(b => b.id === blockId);
    if (!template) return;

    const rect = workspaceRef.current.getBoundingClientRect();
    let x = e.clientX - rect.left - template.defaultWidth / 2;
    let y = e.clientY - rect.top - template.defaultHeight / 2;

    // Keep within bounds
    x = Math.max(0, Math.min(x, rect.width - template.defaultWidth));
    y = Math.max(0, Math.min(y, rect.height - template.defaultHeight));

    const maxZ = blocks.length > 0 
      ? Math.max(...blocks.map(b => b.zIndex)) 
      : 0;

    const newBlock: BlockInstance = {
      id: crypto.randomUUID(),
      templateId: template.id,
      name: template.name,
      html: template.html,
      css: template.css,
      x,
      y,
      width: template.defaultWidth,
      height: template.defaultHeight,
      zIndex: maxZ + 1,
    };

    onAddBlock(newBlock);
  };

  const handleWorkspaceClick = (e: React.MouseEvent) => {
    if (e.target === workspaceRef.current) {
      onSelectBlock(null);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedBlockId) return;
      
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        onDeleteBlock(selectedBlockId);
      }

      if (e.key === 'd' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        onDuplicateBlock(selectedBlockId);
      }

      // Arrow key movement
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        const block = blocks.find(b => b.id === selectedBlockId);
        if (!block || !workspaceRef.current) return;

        const step = e.shiftKey ? 10 : 1;
        const rect = workspaceRef.current.getBoundingClientRect();
        let newX = block.x;
        let newY = block.y;

        switch (e.key) {
          case 'ArrowUp': newY -= step; break;
          case 'ArrowDown': newY += step; break;
          case 'ArrowLeft': newX -= step; break;
          case 'ArrowRight': newX += step; break;
        }

        // Keep within bounds
        newX = Math.max(0, Math.min(newX, rect.width - block.width));
        newY = Math.max(0, Math.min(newY, rect.height - block.height));

        onUpdateBlock(selectedBlockId, { x: newX, y: newY });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedBlockId, blocks, onDeleteBlock, onDuplicateBlock, onUpdateBlock]);

  return (
    <main className="flex-1 p-5 overflow-hidden">
      <div
        ref={workspaceRef}
        className={`relative w-full h-full bg-white rounded-2xl shadow-sm transition-all duration-200 overflow-hidden ${
          isDragOver 
            ? 'ring-2 ring-[#0071e3] ring-offset-2 bg-[#f5f5f7]' 
            : 'ring-1 ring-black/[0.04]'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleWorkspaceClick}
      >
        {/* Grid pattern background */}
        <div 
          className="absolute inset-0 opacity-[0.4] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #d2d2d7 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {blocks.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-[#0071e3]/10 to-[#40c8e0]/10 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0071e3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <path d="M14 17.5h7M17.5 14v7" />
              </svg>
            </div>
            <p className="text-[15px] font-medium text-[#1d1d1f]">Start building</p>
            <p className="text-[13px] text-[#86868b] mt-1">Drag components from the sidebar</p>
          </div>
        )}

        {blocks.map(block => (
          <WorkspaceComponent
            key={block.id}
            block={block}
            isSelected={selectedBlockId === block.id}
            workspaceRef={workspaceRef}
            onSelect={() => onSelectBlock(block.id)}
            onUpdate={(updates) => onUpdateBlock(block.id, updates)}
            onDelete={() => onDeleteBlock(block.id)}
            onDuplicate={() => onDuplicateBlock(block.id)}
            onBringToFront={() => {
              const maxZ = Math.max(...blocks.map(b => b.zIndex));
              onUpdateBlock(block.id, { zIndex: maxZ + 1 });
            }}
            onSendToBack={() => {
              const minZ = Math.min(...blocks.map(b => b.zIndex));
              onUpdateBlock(block.id, { zIndex: minZ - 1 });
            }}
          />
        ))}
      </div>
    </main>
  );
}
