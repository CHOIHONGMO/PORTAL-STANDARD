import React, { useCallback, useMemo } from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  rectSortingStrategy,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { v4 as uuidv4 } from 'uuid';
import type { ScreenDefinition, FieldDefinition, ApiAction, LayoutBlock, FormBlock, GridBlock, ActionBlock, BlockType } from '../types/screenDefinition';

export const THEME_STYLES: Record<string, {
  screenBg: string;
  blockBg: string;
  borderColor: string;
  textColor: string;
  buttonGradient: string;
  isLight: boolean;
}> = {
  'business-light': {
    screenBg: '#f8fafc',
    blockBg: '#ffffff',
    borderColor: '#cbd5e1',
    textColor: '#0f172a',
    buttonGradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    isLight: true
  },
  'business-dark': {
    screenBg: '#0f172a',
    blockBg: '#1e293b',
    borderColor: '#334155',
    textColor: '#f8fafc',
    buttonGradient: 'linear-gradient(135deg, #6366f1, #4f46e5)',
    isLight: false
  },
  'navy-modern': {
    screenBg: '#f0f4f8',
    blockBg: '#ffffff',
    borderColor: '#cbd5e1',
    textColor: '#1e293b',
    buttonGradient: 'linear-gradient(135deg, #1e3a8a, #1d4ed8)',
    isLight: true
  },
  'emerald-clean': {
    screenBg: '#f4fbf7',
    blockBg: '#ffffff',
    borderColor: '#a7f3d0',
    textColor: '#064e3b',
    buttonGradient: 'linear-gradient(135deg, #059669, #047857)',
    isLight: true
  }
};

// Helper function to check if color is light based on perceived brightness
const isColorLight = (hex: string): boolean => {
  if (!hex) return false;
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16);
    const g = parseInt(cleanHex[1] + cleanHex[1], 16);
    const b = parseInt(cleanHex[2] + cleanHex[2], 16);
    return (r * 0.299 + g * 0.587 + b * 0.114) > 186;
  }
  if (cleanHex.length === 6) {
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return (r * 0.299 + g * 0.587 + b * 0.114) > 186;
  }
  return false;
};

const getIsLightTheme = (block: LayoutBlock, theme: 'dark' | 'light', screenTheme?: string): boolean => {
  if (block.backgroundColor) {
    return isColorLight(block.backgroundColor);
  }
  if (screenTheme) {
    return ['business-light', 'navy-modern', 'emerald-clean'].includes(screenTheme);
  }
  return theme === 'light';
};

// ─────────────────────────────────────────────────────────────────────
// 정렬 가능한 필드 카드
// ─────────────────────────────────────────────────────────────────────

interface SortableFieldCardProps {
  field: FieldDefinition;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string, blockId: string) => void;
  blockId: string;
}

function SortableFieldCard({
  field,
  isSelected,
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
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    gridColumn: field.layout?.colSpan ? `span ${field.layout.colSpan}` : undefined,
    gridRow: field.layout?.rowSpan ? `span ${field.layout.rowSpan}` : undefined,
    backgroundColor: field.editable ? 'rgba(253, 224, 71, 0.1)' : undefined, // editable 표시
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`canvas-field-card${isSelected ? ' selected' : ''}${field.type === 'grid_column' ? ' grid-col-card' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(field.id);
      }}
      {...attributes}
      {...listeners}
    >
      {/* 상단: 드래그 핸들 + 삭제 버튼 */}
      <div className="canvas-field-card-top">
        <span className="canvas-field-drag-handle" title="드래그하여 순서 변경">⠿</span>
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

      {/* 중단: 제목(label) - 크게 표시 */}
      <div className="canvas-field-label-main">
        {field.label || field.fieldName || '(미설정)'}
      </div>

      {/* 하단: 필드명 + 배지들 */}
      <div className="canvas-field-footer">
        <div className="canvas-field-name">{field.fieldName || '(미설정)'}</div>
        <div className="canvas-field-badges">
          <span className="canvas-field-type-badge">
            {field.type === 'grid_column'
              ? (field.gridColumnType || 'text')
              : field.type === 'input' && field.inputType
              ? `${field.type} (${field.inputType})`
              : field.type}
          </span>
          {field.parentHeader && <span className="canvas-field-type-badge" style={{ backgroundColor: '#475569' }}>{field.parentHeader}</span>}
          {field.required && <span className="canvas-field-badge-required">필수</span>}
          {field.editable && <span className="canvas-field-type-badge" style={{ backgroundColor: '#eab308', color: '#fff' }}>수정가능</span>}
        </div>
      </div>
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

interface SortableBlockProps {
  block: LayoutBlock;
  theme: 'dark' | 'light';
  screenTheme?: string;
  isLightTheme: boolean;
  selectedElementId: string | null;
  onSelectElement: (id: string | null) => void;
  onDeleteBlock: (blockId: string) => void;
  children: () => React.ReactNode;
}

function SortableBlock({
  block,
  theme,
  screenTheme,
  isLightTheme,
  selectedElementId,
  onSelectElement,
  onDeleteBlock,
  children,
}: SortableBlockProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id, data: { type: 'block' } });

  const currentTheme = screenTheme || (theme === 'light' ? 'business-light' : 'business-dark');
  const styleConf = THEME_STYLES[currentTheme] || THEME_STYLES['business-dark'];

  const widthStyle = useMemo(() => {
    const width = block.width || '100%';
    if (width.endsWith('%')) {
      const pct = parseFloat(width);
      if (pct < 100) {
        const fraction = pct / 100;
        const subtract = (1 - fraction) * 16;
        return `calc(${width} - ${subtract.toFixed(2)}px)`;
      }
    }
    return width;
  }, [block.width]);

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    width: widthStyle,
    padding: '16px',
    border: '1px solid',
    borderColor: styleConf.borderColor,
    borderRadius: '8px',
    marginBottom: '16px',
    backgroundColor: block.backgroundColor || styleConf.blockBg,
    color: styleConf.textColor,
    boxShadow: selectedElementId === block.id 
      ? (styleConf.isLight ? '0 0 0 2px #3b82f6' : '0 0 0 2px #60a5fa') 
      : undefined,
    borderLeft: `4px solid ${block.type === 'form' ? '#3b82f6' : block.type === 'grid' ? '#10b981' : '#8b5cf6'}`,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`layout-block ${block.type}-block ${isLightTheme ? 'theme-light' : 'theme-dark'} ${selectedElementId === block.id ? 'selected' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onSelectElement(block.id);
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            {...attributes}
            {...listeners}
            className="block-drag-handle"
            style={{ cursor: 'grab', padding: '4px', color: isLightTheme ? '#94a3b8' : '#64748b', userSelect: 'none', fontSize: '16px' }}
            title="드래그하여 블록 순서 변경"
          >
            ⠿
          </span>
          <div className="block-title" style={{ fontWeight: 'bold', color: isLightTheme ? '#1e293b' : '#e2e8f0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ 
              padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', color: '#fff',
              backgroundColor: block.type === 'form' ? '#3b82f6' : block.type === 'grid' ? '#10b981' : '#8b5cf6' 
            }}>
              {block.type === 'form' ? '폼 영역' : block.type === 'grid' ? '그리드 영역' : '액션 영역'}
            </span>
            {block.title || (block.type === 'form' ? '새 폼' : block.type === 'grid' ? '새 그리드' : '새 액션')} ({block.width || '100%'})
          </div>
        </div>
        <button
          className="canvas-field-delete"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteBlock(block.id);
          }}
        >
          ✕ 블록삭제
        </button>
      </div>

      {children()}
    </div>
  );
}

function FormBlockView({ block, ...props }: BlockProps & { block: FormBlock }) {
  const { setNodeRef, isOver } = useDroppable({ id: `drop-zone-${block.id}`, data: { blockId: block.id, type: 'form' } });
  
  return (
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
              onSelect={props.onSelectElement}
              onDelete={props.onDeleteField}
              blockId={block.id}
            />
          ))
        )}
      </div>
    </SortableContext>
  );
}

function GridBlockView({ block, isLightTheme, ...props }: BlockProps & { block: GridBlock; isLightTheme: boolean }) {
  const { setNodeRef, isOver } = useDroppable({ id: `drop-zone-${block.id}`, data: { blockId: block.id, type: 'grid' } });
  
  return (
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
          backgroundColor: isLightTheme ? '#f8fafc' : '#0f172a',
          border: isLightTheme ? '1px dashed #cbd5e1' : '1px dashed #334155'
        }}
      >
        {block.gridColumns.length === 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', color: '#374151', fontSize: '0.85rem' }}>
            ← 그리드 컬럼을 드롭하세요
          </div>
        ) : (
          block.gridColumns.map(col => (
            <div key={col.id} style={{ width: '160px', flexShrink: 0 }}>
              <SortableFieldCard
                field={col}
                isSelected={props.selectedElementId === col.id}
                onSelect={props.onSelectElement}
                onDelete={props.onDeleteField}
                blockId={block.id}
              />
            </div>
          ))
        )}
      </div>
    </SortableContext>
  );
}

function ActionBlockView({ block, ...props }: BlockProps & { block: ActionBlock }) {
  return (
    <>
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
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────
// 메인 CanvasArea
// ─────────────────────────────────────────────────────────────────────

interface CanvasAreaProps {
  theme: 'dark' | 'light';
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

const CanvasArea: React.FC<CanvasAreaProps> = ({
  theme,
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
  const currentTheme = screen?.screenTheme || (theme === 'light' ? 'business-light' : 'business-dark');
  const styleConf = THEME_STYLES[currentTheme] || THEME_STYLES['business-dark'];

  const applyLayoutTemplate = useCallback((templateType: 'search-grid' | 'master-detail') => {
    if (!window.confirm('선택하신 템플릿을 적용하시겠습니까? (현재 배치된 블록과 필드는 모두 초기화됩니다.)')) {
      return;
    }
    
    if (templateType === 'search-grid') {
      const newBlocks: LayoutBlock[] = [
        {
          id: uuidv4(),
          type: 'form',
          formId: 'searchForm',
          title: '조회 조건',
          width: '100%',
          columns: 3,
          fields: [
            { id: uuidv4(), fieldName: 'PR_NUM', label: '구매요청번호', type: 'input', inputType: 'text', placeholder: '구매요청번호 입력', required: false },
            { id: uuidv4(), fieldName: 'PR_SUBJECT', label: '구매요청명', type: 'input', inputType: 'text', placeholder: '구매요청명 입력', required: false },
            { id: uuidv4(), fieldName: 'REG_USER_NM', label: '등록자', type: 'input', inputType: 'text', placeholder: '등록자명 입력', required: false }
          ]
        } as FormBlock,
        {
          id: uuidv4(),
          type: 'action',
          title: '액션 영역',
          width: '100%',
          align: 'right',
          actions: [
            { id: uuidv4(), label: '조회', method: 'POST', endpoint: '/api/pr/doSearch', buttonType: 'search' },
            { id: uuidv4(), label: '신규', method: 'GET', endpoint: '', buttonType: 'navigate', navigateTo: '/pr/new' },
            { id: uuidv4(), label: '삭제', method: 'DELETE', endpoint: '/api/pr/doDelete', buttonType: 'delete', confirmMessage: '선택한 요청건을 삭제하시겠습니까?' }
          ]
        } as ActionBlock,
        {
          id: uuidv4(),
          type: 'grid',
          gridId: 'listGrid',
          title: '구매요청 목록',
          width: '100%',
          gridColumns: [
            { id: uuidv4(), fieldName: 'PR_NUM', label: '구매요청번호', type: 'grid_column', gridColumnType: 'text', width: '150', align: 'center' },
            { id: uuidv4(), fieldName: 'PR_SUBJECT', label: '구매요청명', type: 'grid_column', gridColumnType: 'text', width: 'auto', align: 'left' },
            { id: uuidv4(), fieldName: 'REG_USER_NM', label: '등록자', type: 'grid_column', gridColumnType: 'text', width: '120', align: 'center' },
            { id: uuidv4(), fieldName: 'REG_DATE', label: '등록일자', type: 'grid_column', gridColumnType: 'date', width: '120', align: 'center' }
          ]
        } as GridBlock
      ];
      onUpdateScreen('blocks', newBlocks);
    } else if (templateType === 'master-detail') {
      const newBlocks: LayoutBlock[] = [
        {
          id: uuidv4(),
          type: 'form',
          formId: 'masterForm',
          title: '구매요청 기본정보',
          width: '100%',
          columns: 2,
          fields: [
            { id: uuidv4(), fieldName: 'PR_NUM', label: '구매요청번호', type: 'input', inputType: 'text', required: true, disabled: true, placeholder: '(저장 시 자동 생성)' },
            { id: uuidv4(), fieldName: 'PR_SUBJECT', label: '구매요청명', type: 'input', inputType: 'text', required: true, placeholder: '구매요청명 입력' },
            { id: uuidv4(), fieldName: 'PR_DATE', label: '요청일자', type: 'input', inputType: 'text', required: true, placeholder: 'YYYY-MM-DD' },
            { id: uuidv4(), fieldName: 'DEPT_NM', label: '요청부서', type: 'input', inputType: 'text', required: false, placeholder: '부서명 입력' }
          ]
        } as FormBlock,
        {
          id: uuidv4(),
          type: 'action',
          title: '상세 액션',
          width: '100%',
          align: 'right',
          actions: [
            { id: uuidv4(), label: '저장', method: 'POST', endpoint: '/api/pr/save', buttonType: 'submit' },
            { id: uuidv4(), label: '삭제', method: 'DELETE', endpoint: '/api/pr/delete', buttonType: 'delete', confirmMessage: '정말 삭제하시겠습니까?' },
            { id: uuidv4(), label: '목록', method: 'GET', endpoint: '', buttonType: 'navigate', navigateTo: '/pr/list' }
          ]
        } as ActionBlock,
        {
          id: uuidv4(),
          type: 'grid',
          gridId: 'itemGrid',
          title: '상세 품목 목록',
          width: '100%',
          gridColumns: [
            { id: uuidv4(), fieldName: 'ITEM_CD', label: '품목코드', type: 'grid_column', gridColumnType: 'text', width: '120', align: 'center', editable: true },
            { id: uuidv4(), fieldName: 'ITEM_NM', label: '품목명', type: 'grid_column', gridColumnType: 'text', width: 'auto', align: 'left' },
            { id: uuidv4(), fieldName: 'SPEC', label: '규격', type: 'grid_column', gridColumnType: 'text', width: '150', align: 'left' },
            { id: uuidv4(), fieldName: 'QTY', label: '수량', type: 'grid_column', gridColumnType: 'number', width: '100', align: 'right', editable: true, fractionDigits: 0, useThousandSeparator: true },
            { id: uuidv4(), fieldName: 'PRICE', label: '단가', type: 'grid_column', gridColumnType: 'number', width: '120', align: 'right', editable: true, fractionDigits: 0, useThousandSeparator: true },
            { id: uuidv4(), fieldName: 'AMT', label: '금액', type: 'grid_column', gridColumnType: 'number', width: '140', align: 'right', fractionDigits: 0, useThousandSeparator: true }
          ]
        } as GridBlock
      ];
      onUpdateScreen('blocks', newBlocks);
    }
  }, [onUpdateScreen]);

  const handleOpenDirModal = useCallback(async () => {
    try {
      if (!('showDirectoryPicker' in window)) {
        alert('이 브라우저는 폴더 선택 기능을 지원하지 않습니다.\n\nChrome / Edge 브라우저를 사용해 주세요.');
        return;
      }
      const dirHandle = await (window as any).showDirectoryPicker({ mode: 'read' });
      const folderName: string = dirHandle.name;
      onUpdateScreen('domainPath', `src/pages/${folderName}`);
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== 'AbortError') {
        alert('폴더 선택 중 오류가 발생했습니다.');
      }
    }
  }, [onUpdateScreen]);

  const handleCanvasClick = useCallback(
    (e: React.MouseEvent) => {
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
    <div className="builder-canvas" style={{ backgroundColor: styleConf.screenBg, transition: 'background-color 0.2s' }} onClick={handleCanvasClick}>
      {/* 화면 메타 정보 */}
      <div className="canvas-screen-meta">
        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
          화면 기본 정보
        </div>
        <div className="canvas-screen-meta-grid">
          <div>
            <div className="canvas-field-label">화면ID (영문/숫자/_)</div>
            <input
              className="canvas-field-input"
              placeholder="예: EgovMberManage"
              value={screen.screenName}
              onChange={e => onUpdateScreen('screenName', e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
            />
          </div>
          <div>
            <div className="canvas-field-label">화면명</div>
            <input
              className="canvas-field-input"
              placeholder="예: 회원관리"
              value={screen.title}
              onChange={e => onUpdateScreen('title', e.target.value)}
            />
          </div>
          <div>
            <div className="canvas-field-label">도메인 경로 (파일 생성 위치)</div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <div style={{ display: 'flex', flex: 1, alignItems: 'stretch' }}>
                <input
                  className="canvas-field-input"
                  style={{ borderRadius: '6px' }}
                  placeholder="예: src/pages/user/member"
                  value={screen.domainPath || ''}
                  onChange={e => onUpdateScreen('domainPath', e.target.value)}
                />
              </div>
              <button 
                type="button" 
                className="btn-builder btn-builder-ghost" 
                style={{ padding: '0 12px' }}
                onClick={handleOpenDirModal}
                title="도메인 폴더 선택"
              >
                🔍
              </button>
            </div>
          </div>
          <div>
            <div className="canvas-field-label">화면설명</div>
            <input
              className="canvas-field-input"
              placeholder="화면 설명 (선택)"
              value={screen.description || ''}
              onChange={e => onUpdateScreen('description', e.target.value)}
            />
          </div>
          <div>
            <div className="canvas-field-label">공통 테마 (Global Theme)</div>
            <select
              className="canvas-field-select"
              value={screen.screenTheme || 'business-dark'}
              onChange={e => onUpdateScreen('screenTheme', e.target.value)}
            >
              <option value="business-light">💼 비즈니스 라이트 (Business Light)</option>
              <option value="business-dark">🌑 비즈니스 다크 (Business Dark)</option>
              <option value="navy-modern">⚓ 네이비 모던 (Navy Modern)</option>
              <option value="emerald-clean">🌿 에메랄드 클린 (Emerald Clean)</option>
            </select>
          </div>
          <div>
            <div className="canvas-field-label">화면 템플릿 적용 (Apply Layout Template)</div>
            <select
              className="canvas-field-select"
              defaultValue=""
              onChange={e => {
                const val = e.target.value;
                if (val === 'search-grid' || val === 'master-detail') {
                  applyLayoutTemplate(val);
                  e.target.value = '';
                }
              }}
            >
              <option value="" disabled>-- 템플릿을 선택하세요 --</option>
              <option value="search-grid">🔎 일반 조회 및 목록 화면 (Search & Grid)</option>
              <option value="master-detail">🗂️ 등록 및 마스터-상세 정보 화면 (Master-Detail)</option>
            </select>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
        <button className="btn-builder btn-builder-ghost" onClick={() => onAddBlock('form')}>+ 폼 영역 추가</button>
        <button className="btn-builder btn-builder-ghost" onClick={() => onAddBlock('grid')}>+ 그리드 영역 추가</button>
        <button className="btn-builder btn-builder-ghost" onClick={() => onAddBlock('action')}>+ 액션 영역 추가</button>
      </div>

      <SortableContext items={screen.blocks.map(b => b.id)} strategy={rectSortingStrategy}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-start', width: '100%' }}>
          {screen.blocks && screen.blocks.map(block => {
            const isLightTheme = getIsLightTheme(block, theme, screen.screenTheme);
            return (
              <SortableBlock
                key={block.id}
                block={block}
                theme={theme}
                screenTheme={screen.screenTheme}
                isLightTheme={isLightTheme}
                selectedElementId={selectedElementId}
                onSelectElement={onSelectElement}
                onDeleteBlock={onDeleteBlock}
              >
                {() => {
                  if (block.type === 'form') {
                    return (
                      <FormBlockView
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
                        block={block as GridBlock}
                        isLightTheme={isLightTheme}
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
                }}
              </SortableBlock>
            );
          })}
        </div>
      </SortableContext>
    </div>
  );
};

export default CanvasArea;
