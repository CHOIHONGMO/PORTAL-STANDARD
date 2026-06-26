import React, { useCallback, useMemo } from 'react';
import type { ScreenDefinition, FieldDefinition, PageType, LayoutBlock, FormBlock, GridBlock, ActionBlock, ApiAction } from '../types/screenDefinition';
import type { FieldOption } from '@/common/validator/types';

interface PropertyPanelProps {
  screen: ScreenDefinition | null;
  selectedElementId: string | null;
  onUpdateField: (id: string, blockId: string, updates: Partial<FieldDefinition>) => void;
  onUpdateBlock: (id: string, updates: Partial<LayoutBlock>) => void;
  onUpdateAction: (id: string, blockId: string, updates: Partial<ApiAction>) => void;
}

// ─────────────────────────────────────────────────────────────────────
// 옵션 편집기
// ─────────────────────────────────────────────────────────────────────
interface OptionsEditorProps {
  options: FieldOption[];
  onChange: (options: FieldOption[]) => void;
}

function OptionsEditor({ options, onChange }: OptionsEditorProps) {
  const handleAdd = () => onChange([...options, { value: '', label: '' }]);
  const handleRemove = (idx: number) => onChange(options.filter((_, i) => i !== idx));
  const handleChange = (idx: number, key: keyof FieldOption, val: string) => {
    const next = options.map((o, i) => i === idx ? { ...o, [key]: val } : o);
    onChange(next);
  };

  return (
    <div className="options-editor">
      {options.map((opt, idx) => (
        <div key={idx} className="option-row">
          <input
            placeholder="값(value)"
            value={opt.value}
            onChange={e => handleChange(idx, 'value', e.target.value)}
          />
          <input
            placeholder="라벨(label)"
            value={opt.label}
            onChange={e => handleChange(idx, 'label', e.target.value)}
          />
          <button className="option-remove-btn" onClick={() => handleRemove(idx)} title="옵션 삭제">✕</button>
        </div>
      ))}
      <button className="option-add-btn" onClick={handleAdd}>+ 옵션 추가</button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// 메인 PropertyPanel
// ─────────────────────────────────────────────────────────────────────

const PropertyPanel: React.FC<PropertyPanelProps> = ({ screen, selectedElementId, onUpdateField, onUpdateBlock, onUpdateAction }) => {
  // 현재 선택된 요소 찾기
  const selectionInfo = useMemo(() => {
    if (!screen || !selectedElementId) return null;
    
    // 블록인지 확인
    const block = screen.blocks?.find(b => b.id === selectedElementId);
    if (block) return { type: 'block', block };

    // 필드인지 확인
    for (const b of screen.blocks || []) {
      if (b.type === 'form') {
        const field = (b as FormBlock).fields.find(f => f.id === selectedElementId);
        if (field) return { type: 'field', field, blockId: b.id };
      } else if (b.type === 'grid') {
        const field = (b as GridBlock).gridColumns.find(f => f.id === selectedElementId);
        if (field) return { type: 'field', field, blockId: b.id };
      } else if (b.type === 'action') {
        const action = (b as ActionBlock).actions.find(a => a.id === selectedElementId);
        if (action) return { type: 'action', action, blockId: b.id };
      }
    }
    return null;
  }, [screen, selectedElementId]);

  if (!screen || !selectionInfo) {
    return (
      <div className="builder-property">
        <div className="property-header">속성 패널</div>
        <div className="property-empty">
          캔버스에서 블록이나 필드를 클릭하면<br />속성을 편집할 수 있습니다.
        </div>
      </div>
    );
  }

  // === 블록 속성 패널 ===
  if (selectionInfo.type === 'block') {
    const block = selectionInfo.block;
    
    const handleChange = (key: string, value: any) => {
      onUpdateBlock(block.id, { [key]: value } as any);
    };

    return (
      <div className="builder-property">
        <div className="property-header">영역(블록) 속성</div>
        <div className="property-section">
          <div className="property-section-title">기본 정보</div>
          
          <div className="property-field">
            <div className="property-label">블록 제목</div>
            <input className="property-input" value={block.title || ''} onChange={e => handleChange('title', e.target.value)} placeholder="영역 제목" />
          </div>
          
          <div className="property-field">
            <div className="property-label">블록 너비 (width)</div>
            <input className="property-input" value={block.width || ''} onChange={e => handleChange('width', e.target.value)} placeholder="예: 100%, 50%, 300px" />
          </div>

          <div className="property-field">
            <div className="property-label">테마 (Theme)</div>
            <select className="property-input" value={block.theme || 'dark'} onChange={e => handleChange('theme', e.target.value)}>
              <option value="dark">다크 테마 (Dark)</option>
              <option value="light">라이트 테마 (Light)</option>
            </select>
          </div>

          {block.type === 'form' && (
            <>
              <div className="property-field">
                <div className="property-label">폼 식별자 (formId)</div>
                <input className="property-input" value={(block as FormBlock).formId || ''} onChange={e => handleChange('formId', e.target.value)} placeholder="예: searchForm" />
              </div>
              <div className="property-field">
                <div className="property-label">폼 컬럼 갯수</div>
                <input type="number" className="property-input" value={(block as FormBlock).columns || 1} onChange={e => handleChange('columns', Number(e.target.value))} />
              </div>
              <div className="property-field">
                <div className="property-label">배경색 (Background Color)</div>
                <input className="property-input" type="color" style={{ padding: '0', height: '32px', cursor: 'pointer' }} value={(block as FormBlock).backgroundColor || '#ffffff'} onChange={e => handleChange('backgroundColor', e.target.value)} />
              </div>
            </>
          )}

          {block.type === 'grid' && (
            <div className="property-field">
              <div className="property-label">그리드 식별자 (gridId)</div>
              <input className="property-input" value={(block as GridBlock).gridId || ''} onChange={e => handleChange('gridId', e.target.value)} placeholder="예: listGrid" />
            </div>
          )}

          {block.type === 'action' && (
            <div className="property-field">
              <div className="property-label">버튼 정렬</div>
              <select className="property-input" value={(block as ActionBlock).align || 'flex-end'} onChange={e => handleChange('align', e.target.value)}>
                <option value="flex-start">왼쪽 (Left)</option>
                <option value="center">가운데 (Center)</option>
                <option value="flex-end">오른쪽 (Right)</option>
              </select>
            </div>
          )}
        </div>
      </div>
    );
  }

  // === 액션 속성 패널 ===
  if (selectionInfo.type === 'action') {
    const { action, blockId } = selectionInfo;
    const handleChange = (key: keyof ApiAction, value: any) => {
      onUpdateAction(action.id, blockId, { [key]: value });
    };

    return (
      <div className="builder-property">
        <div className="property-header">액션 버튼 속성</div>
        <div className="property-section">
          <div className="property-field">
            <div className="property-label">버튼명</div>
            <input className="property-input" value={action.label} onChange={e => handleChange('label', e.target.value)} />
          </div>
          <div className="property-field">
            <div className="property-label">가로 너비 (width)</div>
            <input className="property-input" value={action.width || ''} onChange={e => handleChange('width', e.target.value)} placeholder="예: 120px, 100%" />
          </div>
          <div className="property-field">
            <div className="property-label">세로 높이 (height)</div>
            <input className="property-input" value={action.height || ''} onChange={e => handleChange('height', e.target.value)} placeholder="예: 40px" />
          </div>
          <div className="property-field">
            <div className="property-label">API Method</div>
            <select className="property-select" value={action.method} onChange={e => handleChange('method', e.target.value)}>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>
          <div className="property-field">
            <div className="property-label">API 경로 (Endpoint)</div>
            <input className="property-input" value={action.endpoint || ''} onChange={e => handleChange('endpoint', e.target.value)} placeholder="/api/..." />
          </div>
        </div>
      </div>
    );
  }

  // === 필드 속성 패널 ===
  if (selectionInfo.type === 'field') {
    const { field, blockId } = selectionInfo;
    const handleChange = <K extends keyof FieldDefinition>(key: K, value: FieldDefinition[K]) => {
      onUpdateField(field.id, blockId, { [key]: value });
    };

    const hasOptions = field.type === 'combo' || field.type === 'radio' || field.type === 'checkbox';

    return (
      <div className="builder-property">
        <div className="property-header">항목(필드) 속성</div>
        <div className="property-section">
          <div className="property-section-title">기본 정보</div>
          <div className="property-field">
            <div className="property-label">필드명 (SQL ALIAS) <span className="required-star">*</span></div>
            <input className="property-input" value={field.fieldName} onChange={e => handleChange('fieldName', e.target.value)} placeholder="예: userId" />
          </div>
          <div className="property-field">
            <div className="property-label">한글 라벨 <span className="required-star">*</span></div>
            <input className="property-input" value={field.label} onChange={e => handleChange('label', e.target.value)} />
          </div>
          <div className="property-field">
            <div className="property-label">입력 타입</div>
            <select className="property-select" value={field.type} onChange={e => handleChange('type', e.target.value as any)}>
              <option value="text">text</option>
              <option value="number">number</option>
              <option value="email">email</option>
              <option value="combo">combo</option>
              <option value="radio">radio</option>
              <option value="checkbox">checkbox</option>
              <option value="textarea">textarea</option>
            </select>
          </div>
          <div className="property-field">
            <div className="property-label">플레이스홀더</div>
            <input className="property-input" value={field.placeholder || ''} onChange={e => handleChange('placeholder', e.target.value)} />
          </div>
          <div className="property-field">
            <div className="property-label">기본값 (defaultValue)</div>
            <input className="property-input" value={field.defaultValue || ''} onChange={e => handleChange('defaultValue', e.target.value)} placeholder="초기값 설정" />
          </div>
        </div>

        <div className="property-section">
          <div className="property-section-title">유효성 검증</div>
          <div className="property-checkbox-row">
            <input type="checkbox" id="prop-required" checked={!!field.required} onChange={e => handleChange('required', e.target.checked)} />
            <label className="property-checkbox-label" htmlFor="prop-required">필수 입력</label>
          </div>
          {(field.type === 'text' || field.type === 'textarea') && (
            <>
              <div className="property-field">
                <div className="property-label">최대 글자수</div>
                <input type="number" className="property-input" value={field.maxlength || ''} onChange={e => handleChange('maxlength', e.target.value ? Number(e.target.value) : undefined)} />
              </div>
            </>
          )}
        </div>

        <div className="property-section">
          <div className="property-section-title">레이아웃 옵션</div>
          <div className="property-field">
            <div className="property-label">컬럼 차지 수 (colSpan)</div>
            <input type="number" className="property-input" value={field.layout?.colSpan || ''} onChange={e => handleChange('layout', { ...field.layout, colSpan: e.target.value ? Number(e.target.value) : undefined })} />
          </div>
        </div>

        {hasOptions && (
          <div className="property-section">
            <div className="property-section-title">선택 옵션 목록</div>
            <OptionsEditor options={field.options || []} onChange={opts => handleChange('options', opts)} />
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default PropertyPanel;
