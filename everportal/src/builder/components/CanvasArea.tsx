import React, { useCallback } from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  rectSortingStrategy,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { ScreenDefinition, FieldDefinition, ApiAction, PageType, LayoutBlock, FormBlock, GridBlock, ActionBlock, BlockType } from '../types/screenDefinition';

// ─────────────────────────────────────────────────────────────────────
// 정렬 가능한 필드 카드
// ─────────────────────────────────────────────────────────────────────

interface SortableFieldCardProps {
  field: FieldDefinition;
  isSelected: boolean;
  pageType: PageType;
  onSelect: (id: string) => void;
  onDelete: (id: string, blockId: string) => void;
  blockId: string;
}

function SortableFieldCard({
  field,
  isSelected,
  pageType,
  onSelect,
  onDelete,
  blockId,
}: SortableFieldCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id, data: { blockId } });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    gridColumn: field.layout?.colSpan ? `span ${field.layout.colSpan}` : undefined,
    gridRow: field.layout?.rowSpan ? `span ${field.layout.rowSpan}` : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`canvas-field-card${isSelected ? ' selected' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(field.id);
      }}
      {...attributes}
      {...listeners}
    >
      <span className="canvas-field-drag-handle" title="드래그하여 순서 변경">⠿</span>
      <div className="canvas-field-info">
        <div className="canvas-field-name">{field.fieldName || '(미설정)'}</div>
        <div className="canvas-field-label-text">{field.label || '라벨 없음'}</div>
      </div>
      <div className="canvas-field-badges">
        <span className="canvas-field-type-badge">{field.type}</span>
        {field.required && <span className="canvas-field-badge-required">필수</span>}
      </div>
      <button
        className="canvas-field-delete"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(field.id, blockId);
        }}
        title="필드 삭제"
      >
        ✕
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// 레이아웃 블록 렌더링
// ─────────────────────────────────────────────────────────────────────

interface BlockProps {
  block: LayoutBlock;
  screen: ScreenDefinition;
  selectedElementId: string | null;
  onSelectElement: (id: string | null) => void;
  onDeleteField: (fieldId: string, blockId: string) => void;
  onDeleteAction: (actionId: string, blockId: string) => void;
  onDeleteBlock: (blockId: string) => void;
  onUpdateAction: (actionId: string, blockId: string, updates: Partial<ApiAction>) => void;
  onAddAction: (blockId: string) => void;
}

function FormBlockView({ block, ...props }: BlockProps & { block: FormBlock }) {
  const { setNodeRef, isOver } = useDroppable({ id: `drop-zone-${block.id}`, data: { blockId: block.id, type: 'form' } });
  
  return (
    <div 
      className={`layout-block form-block ${props.selectedElementId === block.id ? 'selected' : ''}`}
      style={{ width: block.width || '100%', padding: '16px', border: '1px solid #334155', borderRadius: '8px', marginBottom: '16px', backgroundColor: block.backgroundColor || '#0f172a' }}
      onClick={(e) => {
        e.stopPropagation();
        props.onSelectElement(block.id);
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ fontWeight: 'bold', color: '#e2e8f0' }}>{block.title || '폼 영역'} ({block.width})</div>
        <button className="canvas-field-delete" onClick={(e) => { e.stopPropagation(); props.onDeleteBlock(block.id); }}>✕ 블록삭제</button>
      </div>

      <SortableContext items={block.fields.map(f => f.id)} strategy={rectSortingStrategy}>
        <div
          ref={setNodeRef}
          className={`canvas-drop-zone${isOver ? ' drag-over' : ''}`}
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${block.columns || 1}, 1fr)`,
            gap: '12px',
            minHeight: '80px'
          }}
        >
          {block.fields.length === 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#374151', fontSize: '0.85rem', gridColumn: '1 / -1' }}>
              ← 입력 필드를 드롭하세요
            </div>
          ) : (
            block.fields.map(field => (
              <SortableFieldCard
                key={field.id}
                field={field}
                isSelected={props.selectedElementId === field.id}
                pageType={props.screen.pageType}
                onSelect={props.onSelectElement}
                onDelete={props.onDeleteField}
                blockId={block.id}
              />
            ))
          )}
        </div>
      </SortableContext>
    </div>
  );
}

function GridBlockView({ block, ...props }: BlockProps & { block: GridBlock }) {
  const { setNodeRef, isOver } = useDroppable({ id: `drop-zone-${block.id}`, data: { blockId: block.id, type: 'grid' } });
  
  return (
    <div 
      className={`layout-block grid-block ${props.selectedElementId === block.id ? 'selected' : ''}`}
      style={{ width: block.width || '100%', padding: '16px', border: '1px solid #334155', borderRadius: '8px', marginBottom: '16px', backgroundColor: '#0f172a' }}
      onClick={(e) => {
        e.stopPropagation();
        props.onSelectElement(block.id);
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ fontWeight: 'bold', color: '#e2e8f0' }}>{block.title || '그리드 영역'} ({block.width})</div>
        <button className="canvas-field-delete" onClick={(e) => { e.stopPropagation(); props.onDeleteBlock(block.id); }}>✕ 블록삭제</button>
      </div>

      <SortableContext items={block.gridColumns.map(f => f.id)} strategy={horizontalListSortingStrategy}>
        <div
          ref={setNodeRef}
          className={`canvas-drop-zone${isOver ? ' drag-over' : ''}`}
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            gap: '8px',
            overflowX: 'auto',
            minHeight: '80px',
            padding: '16px',
            backgroundColor: '#0f172a',
            border: '1px dashed #334155'
          }}
        >
          {block.gridColumns.length === 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', color: '#374151', fontSize: '0.85rem' }}>
              ← 그리드 컬럼을 드롭하세요
            </div>
          ) : (
            block.gridColumns.map(col => (
              <div key={col.id} style={{ minWidth: '150px', maxWidth: '200px' }}>
                <SortableFieldCard
                  field={col}
                  isSelected={props.selectedElementId === col.id}
                  pageType={props.screen.pageType}
                  onSelect={props.onSelectElement}
                  onDelete={props.onDeleteField}
                  blockId={block.id}
                />
              </div>
            ))
          )}
        </div>
      </SortableContext>
    </div>
  );
}

function ActionBlockView({ block, ...props }: BlockProps & { block: ActionBlock }) {
  return (
    <div 
      className={`layout-block action-block ${props.selectedElementId === block.id ? 'selected' : ''}`}
      style={{ width: block.width || '100%', padding: '16px', border: '1px solid #334155', borderRadius: '8px', marginBottom: '16px', backgroundColor: '#0f172a' }}
      onClick={(e) => {
        e.stopPropagation();
        props.onSelectElement(block.id);
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ fontWeight: 'bold', color: '#e2e8f0' }}>{block.title || '액션 영역'} ({block.width})</div>
        <button className="canvas-field-delete" onClick={(e) => { e.stopPropagation(); props.onDeleteBlock(block.id); }}>✕ 블록삭제</button>
      </div>

      <div className="action-list">
        {block.actions.map(action => (
          <div key={action.id} className="action-item" onClick={(e) => { e.stopPropagation(); props.onSelectElement(action.id); }}>
            <div className="action-item-header">
              <span className="action-item-label">{action.label || '(이름 없음)'}</span>
              <button
                className="canvas-field-delete"
                onClick={(e) => { e.stopPropagation(); props.onDeleteAction(action.id, block.id); }}
                title="액션 삭제"
              >✕</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              <input
                className="canvas-field-input"
                placeholder="버튼명"
                value={action.label}
                onChange={e => props.onUpdateAction(action.id, block.id, { label: e.target.value })}
              />
              <select
                className="canvas-field-select"
                value={action.buttonType}
                onChange={e => props.onUpdateAction(action.id, block.id, { buttonType: e.target.value as any })}
              >
                <option value="search">조회(검색)</option>
                <option value="submit">저장(등록)</option>
                <option value="delete">삭제</option>
                <option value="navigate">페이지이동</option>
                <option value="custom">커스텀</option>
              </select>
            </div>
          </div>
        ))}
      </div>
      <button className="action-add-btn" onClick={(e) => { e.stopPropagation(); props.onAddAction(block.id); }}>
        + 액션 추가
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// 메인 CanvasArea
// ─────────────────────────────────────────────────────────────────────

interface CanvasAreaProps {
  screen: ScreenDefinition | null;
  selectedElementId: string | null;
  onSelectElement: (id: string | null) => void;
  onDeleteField: (id: string, blockId: string) => void;
  onUpdateScreen: (key: keyof ScreenDefinition, value: any) => void;
  onAddBlock: (type: BlockType) => void;
  onDeleteBlock: (blockId: string) => void;
  onAddAction: (blockId: string) => void;
  onDeleteAction: (id: string, blockId: string) => void;
  onUpdateAction: (id: string, blockId: string, updates: Partial<ApiAction>) => void;
}

const PAGE_TYPE_OPTIONS: { value: PageType; label: string }[] = [
  { value: 'list',   label: '목록 화면' },
  { value: 'form',   label: '등록/수정 화면' },
  { value: 'detail', label: '상세 조회 화면' },
];

const CanvasArea: React.FC<CanvasAreaProps> = ({
  screen,
  selectedElementId,
  onSelectElement,
  onDeleteField,
  onUpdateScreen,
  onAddBlock,
  onDeleteBlock,
  onAddAction,
  onDeleteAction,
  onUpdateAction,
}) => {
  const handleCanvasClick = useCallback(
    (e: React.MouseEvent) => {
      // 배경 클릭 시 선택 해제
      if ((e.target as HTMLElement).classList.contains('builder-canvas')) {
        onSelectElement(null);
      }
    },
    [onSelectElement]
  );

  if (!screen) {
    return (
      <div className="builder-canvas">
        <div className="canvas-empty">
          <div className="canvas-empty-icon">🎨</div>
          <div className="canvas-empty-text">
            왼쪽에서 화면을 선택하거나<br />
            새 화면을 만들어 시작하세요
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="builder-canvas" onClick={handleCanvasClick}>
      {/* 화면 메타 정보 */}
      <div className="canvas-screen-meta">
        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
          화면 기본 정보
        </div>
        <div className="canvas-screen-meta-grid">
          <div>
            <div className="canvas-field-label">화면명 (컴포넌트)</div>
            <input
              className="canvas-field-input"
              placeholder="예: EgovMberManage"
              value={screen.screenName}
              onChange={e => onUpdateScreen('screenName', e.target.value)}
            />
          </div>
          <div>
            <div className="canvas-field-label">화면 제목</div>
            <input
              className="canvas-field-input"
              placeholder="예: 회원관리"
              value={screen.title}
              onChange={e => onUpdateScreen('title', e.target.value)}
            />
          </div>
          <div>
            <div className="canvas-field-label">라우터 경로</div>
            <input
              className="canvas-field-input"
              placeholder="예: admin/member"
              value={screen.route}
              onChange={e => onUpdateScreen('route', e.target.value)}
            />
          </div>
          <div>
            <div className="canvas-field-label">도메인 경로 (파일 생성 위치)</div>
            <input
              className="canvas-field-input"
              placeholder="예: user/member"
              value={screen.domainPath}
              onChange={e => onUpdateScreen('domainPath', e.target.value)}
            />
          </div>
          <div>
            <div className="canvas-field-label">화면 유형</div>
            <select
              className="canvas-field-select"
              value={screen.pageType}
              onChange={e => onUpdateScreen('pageType', e.target.value as PageType)}
            >
              {PAGE_TYPE_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <div>
            <div className="canvas-field-label">화면 설명</div>
            <input
              className="canvas-field-input"
              placeholder="화면 설명 (선택)"
              value={screen.description || ''}
              onChange={e => onUpdateScreen('description', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
        <button className="btn-builder btn-builder-ghost" onClick={() => onAddBlock('form')}>+ 폼 영역 추가</button>
        <button className="btn-builder btn-builder-ghost" onClick={() => onAddBlock('grid')}>+ 그리드 영역 추가</button>
        <button className="btn-builder btn-builder-ghost" onClick={() => onAddBlock('action')}>+ 액션 영역 추가</button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-start' }}>
        {screen.blocks && screen.blocks.map(block => {
          if (block.type === 'form') {
            return (
              <FormBlockView
                key={block.id}
                block={block as FormBlock}
                screen={screen}
                selectedElementId={selectedElementId}
                onSelectElement={onSelectElement}
                onDeleteField={onDeleteField}
                onDeleteAction={onDeleteAction}
                onDeleteBlock={onDeleteBlock}
                onUpdateAction={onUpdateAction}
                onAddAction={onAddAction}
              />
            );
          } else if (block.type === 'grid') {
            return (
              <GridBlockView
                key={block.id}
                block={block as GridBlock}
                screen={screen}
                selectedElementId={selectedElementId}
                onSelectElement={onSelectElement}
                onDeleteField={onDeleteField}
                onDeleteAction={onDeleteAction}
                onDeleteBlock={onDeleteBlock}
                onUpdateAction={onUpdateAction}
                onAddAction={onAddAction}
              />
            );
          } else if (block.type === 'action') {
            return (
              <ActionBlockView
                key={block.id}
                block={block as ActionBlock}
                screen={screen}
                selectedElementId={selectedElementId}
                onSelectElement={onSelectElement}
                onDeleteField={onDeleteField}
                onDeleteAction={onDeleteAction}
                onDeleteBlock={onDeleteBlock}
                onUpdateAction={onUpdateAction}
                onAddAction={onAddAction}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default CanvasArea;
