import React, { useCallback } from 'react';
import type { FieldDefinition, FieldOption, PageType } from '../types/screenDefinition';

interface PropertyPanelProps {
  field: FieldDefinition | null;
  pageType: PageType;
  onUpdate: (id: string, updates: Partial<FieldDefinition>) => void;
}

// ─────────────────────────────────────────────────────────────────────
// 옵션 편집기 (combo/radio/checkbox용)
// ─────────────────────────────────────────────────────────────────────

interface OptionsEditorProps {
  options: FieldOption[];
  onChange: (options: FieldOption[]) => void;
}

function OptionsEditor({ options, onChange }: OptionsEditorProps) {
  const handleAdd = () => {
    onChange([...options, { value: '', label: '' }]);
  };

  const handleRemove = (idx: number) => {
    onChange(options.filter((_, i) => i !== idx));
  };

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
          <button
            className="option-remove-btn"
            onClick={() => handleRemove(idx)}
            title="옵션 삭제"
          >✕</button>
        </div>
      ))}
      <button className="option-add-btn" onClick={handleAdd}>
        + 옵션 추가
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// 메인 PropertyPanel
// ─────────────────────────────────────────────────────────────────────

const PropertyPanel: React.FC<PropertyPanelProps> = ({ field, pageType, onUpdate }) => {
  const handleChange = useCallback(
    <K extends keyof FieldDefinition>(key: K, value: FieldDefinition[K]) => {
      if (field) {
        onUpdate(field.id, { [key]: value });
      }
    },
    [field, onUpdate]
  );

  const hasOptions = field?.type === 'combo' || field?.type === 'radio' || field?.type === 'checkbox';

  return (
    <div className="builder-property">
      <div className="property-header">속성 패널</div>

      {!field ? (
        <div className="property-empty">
          캔버스에서 필드를 클릭하면<br />속성을 편집할 수 있습니다.
        </div>
      ) : (
        <>
          {/* 기본 정보 */}
          <div className="property-section">
            <div className="property-section-title">기본 정보</div>

            <div className="property-field">
              <div className="property-label">
                필드명 (SQL ALIAS)
                <span className="required-star">*</span>
              </div>
              <input
                className="property-input"
                placeholder="예: userId (SQL ALIAS와 동일)"
                value={field.fieldName}
                onChange={e => handleChange('fieldName', e.target.value)}
              />
            </div>

            <div className="property-field">
              <div className="property-label">
                한글 라벨
                <span className="required-star">*</span>
              </div>
              <input
                className="property-input"
                placeholder="예: 아이디"
                value={field.label}
                onChange={e => handleChange('label', e.target.value)}
              />
            </div>

            <div className="property-field">
              <div className="property-label">입력 타입</div>
              <select
                className="property-select"
                value={field.type}
                onChange={e => handleChange('type', e.target.value as FieldDefinition['type'])}
              >
                <option value="text">text — 텍스트</option>
                <option value="number">number — 숫자</option>
                <option value="email">email — 이메일</option>
                <option value="password">password — 비밀번호</option>
                <option value="tel">tel — 전화번호</option>
                <option value="date">date — 날짜</option>
                <option value="combo">combo — 셀렉트박스</option>
                <option value="radio">radio — 라디오</option>
                <option value="checkbox">checkbox — 체크박스</option>
                <option value="textarea">textarea — 여러줄</option>
              </select>
            </div>

            <div className="property-field">
              <div className="property-label">플레이스홀더</div>
              <input
                className="property-input"
                placeholder="힌트 텍스트"
                value={field.placeholder || ''}
                onChange={e => handleChange('placeholder', e.target.value)}
              />
            </div>
          </div>

          {/* 유효성 검증 */}
          <div className="property-section">
            <div className="property-section-title">유효성 검증</div>

            <div className="property-checkbox-row">
              <input
                type="checkbox"
                id="prop-required"
                checked={!!field.required}
                onChange={e => handleChange('required', e.target.checked)}
              />
              <label className="property-checkbox-label" htmlFor="prop-required">필수 입력</label>
            </div>

            {(field.type === 'text' || field.type === 'textarea' || field.type === 'password') && (
              <>
                <div className="property-field">
                  <div className="property-label">최대 글자수</div>
                  <input
                    type="number"
                    className="property-input"
                    placeholder="예: 50"
                    value={field.maxlength || ''}
                    onChange={e => handleChange('maxlength', e.target.value ? Number(e.target.value) : undefined)}
                  />
                </div>
                <div className="property-field">
                  <div className="property-label">최소 글자수</div>
                  <input
                    type="number"
                    className="property-input"
                    placeholder="예: 4"
                    value={field.minlength || ''}
                    onChange={e => handleChange('minlength', e.target.value ? Number(e.target.value) : undefined)}
                  />
                </div>
              </>
            )}

            {field.type === 'number' && (
              <>
                <div className="property-field">
                  <div className="property-label">최솟값</div>
                  <input
                    type="number"
                    className="property-input"
                    placeholder="예: 0"
                    value={field.min ?? ''}
                    onChange={e => handleChange('min', e.target.value ? Number(e.target.value) : undefined)}
                  />
                </div>
                <div className="property-field">
                  <div className="property-label">최댓값</div>
                  <input
                    type="number"
                    className="property-input"
                    placeholder="예: 999"
                    value={field.max ?? ''}
                    onChange={e => handleChange('max', e.target.value ? Number(e.target.value) : undefined)}
                  />
                </div>
              </>
            )}

            <div className="property-field">
              <div className="property-label">정규식 패턴</div>
              <input
                className="property-input"
                placeholder="예: ^[a-zA-Z0-9]+$"
                value={field.pattern || ''}
                onChange={e => handleChange('pattern', e.target.value)}
              />
            </div>
          </div>

          {/* 표시 옵션 */}
          <div className="property-section">
            <div className="property-section-title">표시 옵션</div>
            <div className="property-checkbox-row">
              <input
                type="checkbox"
                id="prop-disabled"
                checked={!!field.disabled}
                onChange={e => handleChange('disabled', e.target.checked)}
              />
              <label className="property-checkbox-label" htmlFor="prop-disabled">비활성화</label>
            </div>
            <div className="property-checkbox-row">
              <input
                type="checkbox"
                id="prop-readonly"
                checked={!!field.readOnly}
                onChange={e => handleChange('readOnly', e.target.checked)}
              />
              <label className="property-checkbox-label" htmlFor="prop-readonly">읽기 전용</label>
            </div>

            {field.type === 'textarea' && (
              <div className="property-field" style={{ marginTop: '8px' }}>
                <div className="property-label">행 수 (rows)</div>
                <input
                  type="number"
                  className="property-input"
                  placeholder="예: 4"
                  value={field.rows || ''}
                  onChange={e => handleChange('rows', e.target.value ? Number(e.target.value) : undefined)}
                />
              </div>
            )}
          </div>

          {/* 레이아웃 옵션 */}
          <div className="property-section">
            <div className="property-section-title">레이아웃 옵션</div>
            <div className="property-field">
              <div className="property-label">컬럼 차지 수 (colSpan)</div>
              <input
                type="number"
                className="property-input"
                placeholder="예: 1"
                value={field.layout?.colSpan || ''}
                onChange={e => {
                  const val = e.target.value ? Number(e.target.value) : undefined;
                  handleChange('layout', { ...field.layout, colSpan: val });
                }}
              />
            </div>
            <div className="property-field" style={{ marginTop: '8px' }}>
              <div className="property-label">행 차지 수 (rowSpan)</div>
              <input
                type="number"
                className="property-input"
                placeholder="예: 1"
                value={field.layout?.rowSpan || ''}
                onChange={e => {
                  const val = e.target.value ? Number(e.target.value) : undefined;
                  handleChange('layout', { ...field.layout, rowSpan: val });
                }}
              />
            </div>
          </div>

          {/* 목록 화면 전용 옵션 */}
          {pageType === 'list' && (
            <div className="property-section">
              <div className="property-section-title">목록 화면 옵션</div>
              <div className="property-checkbox-row">
                <input
                  type="checkbox"
                  id="prop-search"
                  checked={!!field.isSearchCondition}
                  onChange={e => handleChange('isSearchCondition', e.target.checked)}
                />
                <label className="property-checkbox-label" htmlFor="prop-search">검색 조건으로 사용</label>
              </div>
              <div className="property-checkbox-row">
                <input
                  type="checkbox"
                  id="prop-column"
                  checked={!!field.isTableColumn}
                  onChange={e => handleChange('isTableColumn', e.target.checked)}
                />
                <label className="property-checkbox-label" htmlFor="prop-column">테이블 컬럼으로 표시</label>
              </div>
              {field.isTableColumn && (
                <>
                  <div className="property-field" style={{ marginTop: '8px' }}>
                    <div className="property-label">컬럼 너비 (%)</div>
                    <input
                      type="number"
                      className="property-input"
                      placeholder="예: 15"
                      value={field.columnWidth || ''}
                      onChange={e => handleChange('columnWidth', e.target.value ? Number(e.target.value) : undefined)}
                    />
                  </div>
                  <div className="property-field" style={{ marginTop: '8px' }}>
                    <div className="property-label">타이틀 위치 (정렬)</div>
                    <select
                      className="property-select"
                      value={field.align || 'center'}
                      onChange={e => handleChange('align', e.target.value as FieldDefinition['align'])}
                    >
                      <option value="left">왼쪽 (Left)</option>
                      <option value="center">가운데 (Center)</option>
                      <option value="right">오른쪽 (Right)</option>
                    </select>
                  </div>
                </>
              )}
            </div>
          )}

          {/* 옵션 편집기 (combo/radio/checkbox) */}
          {hasOptions && (
            <div className="property-section">
              <div className="property-section-title">선택 옵션 목록</div>
              <OptionsEditor
                options={field.options || []}
                onChange={opts => handleChange('options', opts)}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PropertyPanel;
