'use client';

import { useState } from 'react';
import { blockTemplates, categories } from '@/data/blocks';
import { BlockInstance } from '@/types';
import { ChevronDown, ChevronRight, Search } from 'lucide-react';

// Icon components for each category
const CategoryIcons: Record<string, React.ReactNode> = {
  Buttons: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="8" width="18" height="8" rx="4"/></svg>,
  Cards: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/></svg>,
  Navigation: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>,
  Hero: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><line x1="6" y1="10" x2="18" y2="10"/><line x1="8" y1="14" x2="16" y2="14"/></svg>,
  Forms: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="7" y1="8" x2="17" y2="8"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="7" y1="16" x2="12" y2="16"/></svg>,
  Features: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12,2 15,8.5 22,9.3 17,14 18.2,21 12,17.8 5.8,21 7,14 2,9.3 9,8.5"/></svg>,
  Pricing: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  Footer: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><line x1="2" y1="14" x2="22" y2="14"/></svg>,
  Text: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="4,7 4,4 20,4 20,7"/><line x1="12" y1="4" x2="12" y2="20"/><line x1="8" y1="20" x2="16" y2="20"/></svg>,
  Media: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>,
  Layout: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>,
  Elements: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>,
};

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
    <aside className="w-[260px] glass border-r border-black/5 flex flex-col flex-shrink-0 h-full overflow-hidden">
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#86868b]" size={15} />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-black/[0.04] border-none rounded-lg text-[13px] text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 transition-shadow"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-3">
        {categories.map(category => {
          const categoryBlocks = filteredBlocks.filter(b => b.category === category);
          if (categoryBlocks.length === 0) return null;

          const isExpanded = expandedCategories.includes(category);

          return (
            <div key={category} className="mb-1">
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between px-2 py-2 text-[12px] font-semibold text-[#86868b] uppercase tracking-wider hover:text-[#1d1d1f] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[#86868b]">{CategoryIcons[category]}</span>
                  <span>{category}</span>
                </div>
                <span className="flex items-center gap-1 text-[#aeaeb2]">
                  <span className="text-[10px] font-medium">{categoryBlocks.length}</span>
                  {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </span>
              </button>

              {isExpanded && (
                <div className="mt-0.5 space-y-0.5">
                  {categoryBlocks.map(block => (
                    <div
                      key={block.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, block.id)}
                      onDoubleClick={() => handleDoubleClick(block.id)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-grab active:cursor-grabbing transition-all hover:bg-black/[0.04] active:bg-black/[0.06] group"
                      title="Drag to workspace or double-click to add"
                    >
                      <span className="text-[13px] text-[#1d1d1f] font-medium">{block.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-black/5">
        <p className="text-[11px] text-[#86868b] text-center leading-relaxed">
          Drag to canvas or double-click to add
        </p>
      </div>
    </aside>
  );
}
