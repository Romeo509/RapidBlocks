'use client';

import { useState } from 'react';
import { blockTemplates, categories } from '@/data/blocks';
import { BlockInstance } from '@/types';
import { ChevronDown, ChevronRight, Search } from 'lucide-react';

interface SidebarProps {
  onAddBlock: (block: BlockInstance) => void;
}

export default function Sidebar({ onAddBlock }: SidebarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(categories);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredBlocks = blockTemplates.filter(block =>
    block.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    block.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDragStart = (e: React.DragEvent, blockId: string) => {
    e.dataTransfer.setData('blockId', blockId);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDoubleClick = (blockId: string) => {
    const template = blockTemplates.find(b => b.id === blockId);
    if (template) {
      const newBlock: BlockInstance = {
        id: crypto.randomUUID(),
        templateId: template.id,
        name: template.name,
        html: template.html,
        css: template.css,
        x: 50,
        y: 50,
        width: template.defaultWidth,
        height: template.defaultHeight,
        zIndex: 1,
      };
      onAddBlock(newBlock);
    }
  };

  return (
    <aside className="w-[280px] bg-white border-r border-gray-200 flex flex-col flex-shrink-0 h-full overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search components..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {categories.map(category => {
          const categoryBlocks = filteredBlocks.filter(b => b.category === category);
          if (categoryBlocks.length === 0) return null;

          const isExpanded = expandedCategories.includes(category);

          return (
            <div key={category} className="mb-2">
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between p-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <span>{category}</span>
                <span className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{categoryBlocks.length}</span>
                  {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </span>
              </button>

              {isExpanded && (
                <div className="mt-1 space-y-1">
                  {categoryBlocks.map(block => (
                    <div
                      key={block.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, block.id)}
                      onDoubleClick={() => handleDoubleClick(block.id)}
                      className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-blue-50 rounded-lg cursor-grab active:cursor-grabbing transition-colors border border-transparent hover:border-blue-200"
                      title="Drag to workspace or double-click to add"
                    >
                      <span className="text-xl">{block.icon}</span>
                      <span className="text-sm text-gray-700">{block.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <p className="text-xs text-gray-500 text-center">
          Drag components to the workspace<br />
          or double-click to add
        </p>
      </div>
    </aside>
  );
}
