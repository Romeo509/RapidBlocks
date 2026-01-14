'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Workspace from '@/components/Workspace';
import Header from '@/components/Header';
import { BlockInstance } from '@/types';

export default function Home() {
  const [workspaceBlocks, setWorkspaceBlocks] = useState<BlockInstance[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  const handleAddBlock = (block: BlockInstance) => {
    setWorkspaceBlocks(prev => [...prev, block]);
    setSelectedBlockId(block.id);
  };

  const handleUpdateBlock = (id: string, updates: Partial<BlockInstance>) => {
    setWorkspaceBlocks(prev =>
      prev.map(block => (block.id === id ? { ...block, ...updates } : block))
    );
  };

  const handleDeleteBlock = (id: string) => {
    setWorkspaceBlocks(prev => prev.filter(block => block.id !== id));
    if (selectedBlockId === id) {
      setSelectedBlockId(null);
    }
  };

  const handleDuplicateBlock = (id: string) => {
    const block = workspaceBlocks.find(b => b.id === id);
    if (block) {
      const newBlock: BlockInstance = {
        ...block,
        id: crypto.randomUUID(),
        x: block.x + 20,
        y: block.y + 20,
      };
      setWorkspaceBlocks(prev => [...prev, newBlock]);
      setSelectedBlockId(newBlock.id);
    }
  };

  const handleClearWorkspace = () => {
    setWorkspaceBlocks([]);
    setSelectedBlockId(null);
  };

  return (
    <div className="h-screen flex flex-col bg-[#f5f5f7] overflow-hidden">
      <Header
        blocks={workspaceBlocks}
        onClear={handleClearWorkspace}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar onAddBlock={handleAddBlock} />
        <Workspace
          blocks={workspaceBlocks}
          selectedBlockId={selectedBlockId}
          onSelectBlock={setSelectedBlockId}
          onUpdateBlock={handleUpdateBlock}
          onDeleteBlock={handleDeleteBlock}
          onDuplicateBlock={handleDuplicateBlock}
          onAddBlock={handleAddBlock}
        />
      </div>
    </div>
  );
}
