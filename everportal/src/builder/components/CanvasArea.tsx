import React, { useCallback } from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  rectSortingStrategy,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { ScreenDefinition, FieldDefinition, ApiAction, PageType } from '../types/screenDefinition';

// ─────────────────────────────────────────────────────────────────────
// 정렬 가능한 필드 카드
// ─────────────────────────────────────────────────────────────────────

interface SortableFieldCardProps {
  field: FieldDefinition;
  isSelected: boolean;
  pageType: PageType;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

function SortableFieldCard({
  field,
  isSelected,
  pageType,
  onSelect,
  onDelete,
}: SortableFieldCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

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
      onClick={() => onSelect(field.id)}
      {...attributes}
      {...listeners}
    >
      {/* 드래그 핸들 (이제 전체 카드가 드래그되므로 시각적 요소로만 남김) */}
      <span
        className="canvas-field-drag-handle"
        title="드래그하여 순서 변경"
      >
        ⠿
      </span>

      {/* 필드 정보 */}
      <div className="canvas-field-info">
        <div className="canvas-field-name">{field.fieldName || '(미설정)'}</div>
        <div className="canvas-field-label-text">{field.label || '라벨 없음'}</div>
      </div>

      {/* 배지 영역 */}
      <div className="canvas-field-badges">
        <span className="canvas-field-type-badge">{field.type}</span>
        {field.required && <span className="canvas-field-badge-required">필수</span>}
        {pageType === 'list' && field.isSearchCondition && (
          <span className="canvas-field-badge-search">검색</span>
        )}
        {pageType === 'list' && field.isTableColumn && (
          <span className="canvas-field-badge-column">컬럼</span>
        )}
      </div>

      {/* 삭제 버튼 */}
      <button
        className="canvas-field-delete"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(field.id);
        }}
        title="필드 삭제"
      >
        ✕
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// 액션(버튼) 섹션
// ─────────────────────────────────────────────────────────────────────

interface ActionsSectionProps {
  actions: ApiAction[];
  onAddAction: () => void;
  onDeleteAction: (id: string) => void;
  onUpdateAction: (id: string, key: keyof ApiAction, value: string) => void;
}

function ActionsSection({ actions, onAddAction, onDeleteAction, onUpdateAction }: ActionsSectionProps) {
  return (
    <div style={{ marginTop: '20px' }}>
      <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
        API 액션 / 버튼
      </div>
      <div className="action-list">
        {actions.map(action => (
          <div key={action.id} className="action-item">
            <div className="action-item-header">
              <span className="action-item-label">{action.label || '(이름 없음)'}</span>
              <button
                className="canvas-field-delete"
                onClick={() => onDeleteAction(action.id)}
                title="액션 삭제"
              >✕</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              <input
                className="canvas-field-input"
                placeholder="버튼명"
                value={action.label}
                onChange={e => onUpdateAction(action.id, 'label', e.target.value)}
              />
              <select
                className="canvas-field-select"
                value={action.buttonType}
                onChange={e => onUpdateAction(action.id, 'buttonType', e.target.value)}
              >
                <option value="search">조회(검색)</option>
                <option value="submit">저장(등록)</option>
                <option value="delete">삭제</option>
                <option value="navigate">페이지이동</option>
                <option value="custom">커스텀</option>
              </select>
              <select
                className="canvas-field-select"
                value={action.method}
                onChange={e => onUpdateAction(action.id, 'method', e.target.value)}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
              <input
                className="canvas-field-input"
                placeholder="API 경로 (/api/...)"
                value={action.endpoint}
                onChange={e => onUpdateAction(action.id, 'endpoint', e.target.value)}
              />
            </div>
            {action.buttonType === 'navigate' && (
              <input
                className="canvas-field-input"
                placeholder="이동 경로 (예: /admin/member)"
                value={action.navigateTo || ''}
                onChange={e => onUpdateAction(action.id, 'navigateTo', e.target.value)}
                style={{ marginTop: '6px', width: '100%', boxSizing: 'border-box' }}
              />
            )}
          </div>
        ))}
      </div>
      <button className="action-add-btn" onClick={onAddAction}>
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
  selectedFieldId: string | null;
  onSelectField: (id: string | null) => void;
  onDeleteField: (id: string) => void;
  onUpdateScreen: (key: keyof ScreenDefinition, value: any) => void;
  onAddAction: () => void;
  onDeleteAction: (id: string) => void;
  onUpdateAction: (id: string, key: keyof ApiAction, value: string) => void;
}

const PAGE_TYPE_OPTIONS: { value: PageType; label: string }[] = [
  { value: 'list',   label: '목록 화면' },
  { value: 'form',   label: '등록/수정 화면' },
  { value: 'detail', label: '상세 조회 화면' },
];

const CanvasArea: React.FC<CanvasAreaProps> = ({
  screen,
  selectedFieldId,
  onSelectField,
  onDeleteField,
  onUpdateScreen,
  onAddAction,
  onDeleteAction,
  onUpdateAction,
}) => {
  const { setNodeRef: setFormNodeRef, isOver: isFormOver } = useDroppable({ id: 'canvas-drop-zone' });
  const { setNodeRef: setGridNodeRef, isOver: isGridOver } = useDroppable({ id: 'canvas-drop-grid-zone' });

  const handleCanvasClick = useCallback(
    (e: React.MouseEvent) => {
      // 카드 외부 클릭 시 선택 해제
      if ((e.target as HTMLElement).classList.contains('canvas-drop-zone')) {
        onSelectField(null);
      }
    },
    [onSelectField]
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

  const fieldIds = screen.fields.map(f => f.id);

  return (
    <div className="builder-canvas">
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
          <div>
            <div className="canvas-field-label">폼 단수 (그리드 컬럼)</div>
            <select
              className="canvas-field-select"
              value={screen.formColumns || 1}
              onChange={e => onUpdateScreen('formColumns', Number(e.target.value))}
            >
              <option value={1}>1단</option>
              <option value={2}>2단</option>
              <option value={3}>3단</option>
              <option value={4}>4단</option>
            </select>
          </div>
          <div>
            <div className="canvas-field-label">액션 버튼 위치</div>
            <select
              className="canvas-field-select"
              value={screen.actionPosition || 'middle'}
              onChange={e => onUpdateScreen('actionPosition', e.target.value)}
            >
              <option value="top">상단 (헤더 바로 아래)</option>
              <option value="middle">중간 (폼과 그리드 사이)</option>
              <option value="bottom">하단 (그리드 하단)</option>
            </select>
          </div>
          {screen.pageType === 'list' && (
            <>
              <div>
                <div className="canvas-field-label">하단 그리드 넓이(Width)</div>
                <input
                  className="canvas-field-input"
                  placeholder="예: 100%"
                  value={screen.gridWidth || ''}
                  onChange={e => onUpdateScreen('gridWidth', e.target.value)}
                />
              </div>
              <div>
                <div className="canvas-field-label">하단 그리드 높이(Height)</div>
                <input
                  className="canvas-field-input"
                  placeholder="예: 400px"
                  value={screen.gridHeight || ''}
                  onChange={e => onUpdateScreen('gridHeight', e.target.value)}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* 드롭 존 1 — 검색 폼 / 입력 필드 배치 영역 */}
      <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
        {screen.pageType === 'list' ? '상단 검색 조건 (Form)' : '입력 필드 배치'} <span style={{ color: '#374151', fontWeight: 400 }}>(왼쪽 팔레트에서 추가)</span>
      </div>

      <SortableContext items={fieldIds} strategy={rectSortingStrategy}>
        <div
          ref={setFormNodeRef}
          className={`canvas-drop-zone${isFormOver ? ' drag-over' : ''}`}
          onClick={handleCanvasClick}
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${screen.formColumns || 1}, 1fr)`,
            gap: '12px'
          }}
        >
          {screen.fields.length === 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '120px', color: '#374151', fontSize: '0.85rem', gridColumn: '1 / -1' }}>
              ← 검색 조건 또는 입력 필드를 추가하세요
            </div>
          ) : (
            screen.fields.map(field => (
              <SortableFieldCard
                key={field.id}
                field={field}
                isSelected={selectedFieldId === field.id}
                pageType={screen.pageType}
                onSelect={onSelectField}
                onDelete={onDeleteField}
              />
            ))
          )}
        </div>
      </SortableContext>

      {/* 드롭 존 2 — 하단 데이터 그리드 영역 (pageType === 'list' 인 경우에만 노출) */}
      {screen.pageType === 'list' && (
        <div style={{ marginTop: '24px' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
            하단 데이터 그리드 컬럼 <span style={{ color: '#374151', fontWeight: 400 }}>(목록에 표시할 항목 추가)</span>
          </div>
          
          <SortableContext items={(screen.gridColumns || []).map(c => c.id)} strategy={horizontalListSortingStrategy}>
            <div
              ref={setGridNodeRef}
              className={`canvas-drop-zone${isGridOver ? ' drag-over' : ''}`}
              onClick={handleCanvasClick}
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
              {(screen.gridColumns || []).length === 0 ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', color: '#374151', fontSize: '0.85rem' }}>
                  ← 그리드(테이블)에 표시될 컬럼을 추가하세요
                </div>
              ) : (
                (screen.gridColumns || []).map(col => (
                  <div key={col.id} style={{ minWidth: '150px', maxWidth: '200px' }}>
                    <SortableFieldCard
                      field={col}
                      isSelected={selectedFieldId === col.id}
                      pageType={screen.pageType}
                      onSelect={onSelectField}
                      onDelete={onDeleteField}
                    />
                  </div>
                ))
              )}
            </div>
          </SortableContext>
        </div>
      )}

      {/* 액션 섹션 */}
      <ActionsSection
        actions={screen.actions}
        onAddAction={onAddAction}
        onDeleteAction={onDeleteAction}
        onUpdateAction={onUpdateAction}
      />
    </div>
  );
};

export default CanvasArea;
