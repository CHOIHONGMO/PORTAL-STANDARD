import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { FieldType } from '@/common/validator/types';

interface PaletteComponentItem {
  type: FieldType;
  label: string;
  icon: string;
  iconBg: string;
  description: string;
}

const PALETTE_ITEMS: PaletteComponentItem[] = [
  { type: 'text',     label: '텍스트',     icon: '𝐓',  iconBg: '#1e3a5f', description: 'input text' },
  { type: 'number',   label: '숫자',       icon: '#',  iconBg: '#1e3a3a', description: 'input number' },
  { type: 'email',    label: '이메일',     icon: '@',  iconBg: '#2d1e5f', description: 'input email' },
  { type: 'password', label: '비밀번호',   icon: '🔒', iconBg: '#3a1e2a', description: 'input password' },
  { type: 'tel',      label: '전화번호',   icon: '📞', iconBg: '#1e3a2f', description: 'input tel' },
  { type: 'date',     label: '날짜',       icon: '📅', iconBg: '#3a2a1e', description: 'input date' },
  { type: 'combo',    label: '셀렉트박스', icon: '▽',  iconBg: '#1e2d4a', description: 'select' },
  { type: 'radio',    label: '라디오',     icon: '◎',  iconBg: '#2a1e3a', description: 'radio group' },
  { type: 'checkbox', label: '체크박스',   icon: '☑',  iconBg: '#1e3a2a', description: 'checkbox' },
  { type: 'textarea', label: '텍스트영역', icon: '¶',  iconBg: '#3a3a1e', description: 'textarea' },
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
      <div className="palette-item-icon" style={{ background: item.iconBg }}>
        {item.icon}
      </div>
      <span>{item.label}</span>
    </div>
  );
}

const ComponentPalette: React.FC = () => {
  return (
    <div className="builder-palette">
      <div className="palette-section-title">입력 컴포넌트</div>
      {PALETTE_ITEMS.map(item => (
        <DraggablePaletteItem key={item.type} item={item} />
      ))}
    </div>
  );
};

export default ComponentPalette;
