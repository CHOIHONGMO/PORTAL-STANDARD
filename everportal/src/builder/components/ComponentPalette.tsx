import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { BuilderComponentType } from '../types/screenDefinition';

interface PaletteComponentItem {
  type: BuilderComponentType;
  label: string;
  icon: string;
  iconBg: string;
  description: string;
}

interface PaletteGroup {
  id: string;
  title: string;
  items: PaletteComponentItem[];
}

const PALETTE_GROUPS: PaletteGroup[] = [
  {
    id: 'group-text',
    title: '텍스트 (Text)',
    items: [
      { type: 'text',    label: 'Text',    icon: '𝐓', iconBg: '#1e3a5f', description: '일반 텍스트 또는 라벨' },
      { type: 'heading', label: 'Heading', icon: '𝐇', iconBg: '#2d1e5f', description: '제목 (H1~H6)' },
    ]
  },
  {
    id: 'group-input',
    title: '입력 요소 (Form)',
    items: [
      { type: 'input',    label: 'Input',    icon: '✎', iconBg: '#1e3a3a', description: '단일행 입력 (Text, Number, Email 등)' },
      { type: 'textarea', label: 'TextArea', icon: '¶', iconBg: '#3a3a1e', description: '다중행 텍스트 입력' },
      { type: 'select',   label: 'Select',   icon: '▽', iconBg: '#1e2d4a', description: '드롭다운 선택' },
      { type: 'radio',    label: 'Radio',    icon: '◎', iconBg: '#2a1e3a', description: '라디오 버튼 그룹' },
      { type: 'checkbox', label: 'Check',    icon: '☑', iconBg: '#1e3a2a', description: '체크박스' },
      { type: 'hidden',   label: 'Hidden',   icon: '∅', iconBg: '#4b5563', description: '숨김 필드' },
    ]
  },
  {
    id: 'group-action',
    title: '액션 (Action)',
    items: [
      { type: 'button',   label: 'Button',   icon: 'B', iconBg: '#6b21a8', description: '동작을 실행하는 버튼' },
    ]
  }
];

interface DraggablePaletteItemProps {
  item: PaletteComponentItem;
}

function DraggablePaletteItem({ item }: DraggablePaletteItemProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${item.type}`,
    data: { type: item.type, source: 'palette' },
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="palette-item"
      style={{ opacity: isDragging ? 0.4 : 1 }}
      title={item.description}
    >
      <div className="palette-item-icon" style={{ background: item.iconBg, color: '#ffffff' }}>
        {item.icon}
      </div>
      <span>{item.label}</span>
    </div>
  );
}

const ComponentPalette: React.FC = () => {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['group-text', 'group-input', 'group-action']);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupId) ? prev.filter(id => id !== groupId) : [...prev, groupId]
    );
  };

  return (
    <div className="builder-palette">
      {PALETTE_GROUPS.map(group => {
        const isExpanded = expandedGroups.includes(group.id);
        return (
          <div key={group.id} className="palette-group">
            <div 
              className="palette-section-title" 
              onClick={() => toggleGroup(group.id)}
              style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <span>{group.title}</span>
              <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>{isExpanded ? '▲' : '▼'}</span>
            </div>
            {isExpanded && (
              <div className="palette-items-container" style={{ paddingBottom: '12px' }}>
                {group.items.map(item => (
                  <DraggablePaletteItem key={item.type} item={item} />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ComponentPalette;
