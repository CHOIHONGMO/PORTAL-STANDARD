import React, { useMemo, useState, useRef } from 'react';
import { createPortal } from 'react-dom';

const toCamelCase = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toLowerCase() + str.slice(1);
};
import type { ScreenDefinition, FieldDefinition, LayoutBlock, FormBlock, GridBlock, ActionBlock, ApiAction } from '../types/screenDefinition';
import type { FieldOption } from '@/common/validator/types';

interface PropertyPanelProps {
  theme: 'dark' | 'light';
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

const PropertyPanel: React.FC<PropertyPanelProps> = ({ theme, screen, selectedElementId, onUpdateField, onUpdateBlock, onUpdateAction }) => {
  const [isScriptModalOpen, setIsScriptModalOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
    const block = selectionInfo.block!;
    
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
            <select
              className="property-select"
              value={['100%', '50%', '33.3%', '25%'].includes(block.width || '100%') ? (block.width || '100%') : 'custom'}
              onChange={e => {
                const val = e.target.value;
                if (val !== 'custom') {
                  handleChange('width', val);
                } else {
                  handleChange('width', '50%');
                }
              }}
            >
              <option value="100%">100% (전체)</option>
              <option value="50%">50% (반)</option>
              <option value="33.3%">33.3% (3분의 1)</option>
              <option value="25%">25% (4분의 1)</option>
              <option value="custom">직접 입력 (Custom)</option>
            </select>
            {!['100%', '50%', '33.3%', '25%'].includes(block.width || '100%') && (
              <input
                className="property-input"
                style={{ marginTop: '6px' }}
                value={block.width || ''}
                onChange={e => handleChange('width', e.target.value)}
                placeholder="예: 50%, 300px, calc(50% - 8px)"
              />
            )}
          </div>

          <div className="property-field">
            <div className="property-label">배경색 (Background Color)</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input 
                  className="property-input" 
                  type="color" 
                  style={{ padding: '0', height: '32px', cursor: 'pointer', flex: 1 }} 
                  value={block.backgroundColor || (theme === 'light' ? '#ffffff' : '#161b27')} 
                  onChange={e => handleChange('backgroundColor', e.target.value)} 
                />
                <button 
                  type="button" 
                  className="btn-builder btn-builder-ghost" 
                  style={{ padding: '0 12px', height: '32px', fontSize: '0.75rem', whiteSpace: 'nowrap' }}
                  disabled={!block.backgroundColor}
                  onClick={() => handleChange('backgroundColor', undefined)}
                >
                  기본값
                </button>
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--builder-text-muted)', lineHeight: '1.4' }}>
                {block.backgroundColor 
                  ? `지정된 배경색: ${block.backgroundColor}` 
                  : '테마 기본 배경색이 자동으로 적용되고 있습니다.'}
              </div>
            </div>
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
    const action = selectionInfo.action!;
    const blockId = selectionInfo.blockId!;
    const handleChange = (key: keyof ApiAction, value: any) => {
      onUpdateAction(action.id, blockId, { [key]: value });
    };

    const grids = (screen.blocks || []).filter(b => b.type === 'grid') as GridBlock[];

    const insertSnippet = (snippet: string) => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = action.customScript || '';
      const newText = text.substring(0, start) + snippet + text.substring(end);
      
      handleChange('customScript', newText);
      
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + snippet.length, start + snippet.length);
      }, 50);
    };

    const getDefaultScript = (act: ApiAction) => {
      const fnName = act.actionName || toCamelCase(act.label.replace(/\s/g, '')) || 'actionName';
      const method = act.method || 'POST';
      const endpoint = act.endpoint || '/api/...';
      return `export const ${fnName} = async (data?: any): Promise<any> => {
  const response: any = await apiClient.${method.toLowerCase()}('${endpoint}', data);
  return response;
};`;
    };

    const loadScriptTemplate = (type: string) => {
      let template = '';
      const fnName = action.actionName || toCamelCase(action.label.replace(/\s/g, '')) || 'actionName';
      const endpoint = action.endpoint || '/api/...';
      const navigateTo = action.navigateTo || '/path';
      
      if (type === 'search') {
        template = `export const ${fnName} = async (data?: any): Promise<any> => {
  try {
    // 폼 데이터를 담아 조회 API 호출
    const response = await apiClient.post('${endpoint}', data);
    
    // TODO: 아래와 같이 Grid State에 맞게 데이터를 바인딩하세요.
    // (예: setData_grid_xxxx(response.data || []))
    
    return response;
  } catch (error) {
    console.error('Search failed:', error);
    alert('조회 중 에러가 발생했습니다.');
  }
};`;
      } else if (type === 'submit') {
        template = `export const ${fnName} = async (data?: any): Promise<any> => {
  try {
    // 저장 API 호출
    const response = await apiClient.post('${endpoint}', data);
    alert('저장되었습니다.');
    
    // 저장 성공 후 리로드 등 추가 작업
    // (예: await doSearch();)
    
    return response;
  } catch (error) {
    console.error('Save failed:', error);
    alert('저장 중 에러가 발생했습니다.');
  }
};`;
      } else if (type === 'delete') {
        template = `export const ${fnName} = async (data?: any): Promise<any> => {
  try {
    // 삭제 API 호출 (DELETE Method의 경우 { data } 형태로 전달)
    const response = await apiClient.delete('${endpoint}', { data });
    alert('삭제되었습니다.');
    
    // 삭제 성공 후 리로드 등 추가 작업
    // (예: await doSearch();)
    
    return response;
  } catch (error) {
    console.error('Delete failed:', error);
    alert('삭제 중 에러가 발생했습니다.');
  }
};`;
      } else if (type === 'navigate') {
        template = `export const ${fnName} = async (data?: any): Promise<any> => {
  // 페이지 이동 처리
  // 주의: navigate는 React Component 내부에서 useNavigate 훅으로 호출하는 것이 권장됩니다.
  // 아래 코드는 window.location.href를 사용한 예시입니다.
  window.location.href = '${navigateTo}';
};`;
      } else {
        template = `export const ${fnName} = async (data?: any): Promise<any> => {
  // 커스텀 로직 작성
  console.log('Custom action triggered', data);
};`;
      }
      handleChange('customScript', template);
    };

    return (
      <div className="builder-property">
        <div className="property-header">액션 버튼 속성</div>
        <div className="property-section">
          <div className="property-section-title">기본 정보</div>
          <div className="property-field">
            <div className="property-label">버튼명</div>
            <input className="property-input" value={action.label} onChange={e => handleChange('label', e.target.value)} />
          </div>
          <div className="property-field">
            <div className="property-label">액션 함수명 (onClick/Handler 명)</div>
            <input
              className="property-input"
              value={action.actionName || ''}
              onChange={e => handleChange('actionName', e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
              placeholder="예: doSearch (미입력시 버튼명 기준)"
            />
          </div>
          <div className="property-field">
            <div className="property-label">액션 타입</div>
            <select
              className="property-select"
              value={action.buttonType || 'search'}
              onChange={e => handleChange('buttonType', e.target.value)}
            >
              <option value="search">조회(검색)</option>
              <option value="submit">저장(등록)</option>
              <option value="delete">삭제</option>
              <option value="navigate">페이지이동</option>
              <option value="custom">커스텀</option>
            </select>
          </div>
          {action.buttonType === 'navigate' && (
            <div className="property-field">
              <div className="property-label">이동 경로 (navigateTo)</div>
              <input
                className="property-input"
                value={action.navigateTo || ''}
                onChange={e => handleChange('navigateTo', e.target.value)}
                placeholder="예: /pr/detail"
              />
            </div>
          )}
          <div className="property-field">
            <div className="property-label">가로 너비 (width)</div>
            <input className="property-input" value={action.width || ''} onChange={e => handleChange('width', e.target.value)} placeholder="예: 120px, 100%" />
          </div>
          <div className="property-field">
            <div className="property-label">세로 높이 (height)</div>
            <input className="property-input" value={action.height || ''} onChange={e => handleChange('height', e.target.value)} placeholder="예: 40px" />
          </div>
        </div>

        {action.buttonType !== 'navigate' && (
          <div className="property-section">
            <div className="property-section-title">API 정보</div>
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
        )}

        <div className="property-section">
          <div className="property-section-title">추가 설정</div>
          <div className="property-field">
            <div className="property-label">클릭 확인 메시지 (confirmMessage)</div>
            <input
              className="property-input"
              value={action.confirmMessage || ''}
              onChange={e => handleChange('confirmMessage', e.target.value)}
              placeholder="예: 정말 삭제하시겠습니까?"
            />
          </div>
        </div>

        <div className="property-section">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div className="property-section-title" style={{ margin: 0 }}>onClick 스크립트</div>
            <button 
              type="button" 
              className="btn-builder btn-builder-ghost" 
              style={{ fontSize: '0.7rem', padding: '3px 8px', color: 'var(--builder-badge-text)', backgroundColor: 'var(--builder-badge-bg)', border: 'none' }}
              onClick={() => setIsScriptModalOpen(true)}
            >
              🖥️ 크게 편집
            </button>
          </div>
          
          <div className="property-field">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', marginBottom: '8px' }}>
              <button type="button" className="btn-builder btn-builder-ghost" style={{ justifyContent: 'center', fontSize: '0.65rem', padding: '4px' }} onClick={() => loadScriptTemplate('search')} title="데이터 조회용 템플릿">조회</button>
              <button type="button" className="btn-builder btn-builder-ghost" style={{ justifyContent: 'center', fontSize: '0.65rem', padding: '4px' }} onClick={() => loadScriptTemplate('submit')} title="데이터 저장/등록용 템플릿">저장</button>
              <button type="button" className="btn-builder btn-builder-ghost" style={{ justifyContent: 'center', fontSize: '0.65rem', padding: '4px' }} onClick={() => loadScriptTemplate('delete')} title="선택된 데이터 삭제용 템플릿">삭제</button>
              <button type="button" className="btn-builder btn-builder-ghost" style={{ justifyContent: 'center', fontSize: '0.65rem', padding: '4px' }} onClick={() => loadScriptTemplate('custom')} title="빈 커스텀 템플릿">커스텀</button>
            </div>
            <textarea
              className="property-input"
              style={{
                fontFamily: "'JetBrains Mono', 'Cascadia Code', monospace",
                fontSize: '0.72rem',
                lineHeight: '1.4',
                height: '180px',
                whiteSpace: 'pre',
                overflow: 'auto',
                backgroundColor: 'var(--builder-code-bg)',
                color: 'var(--builder-text-main)',
                border: '1px solid var(--builder-input-border)',
                padding: '8px'
              }}
              value={action.customScript || getDefaultScript(action)}
              onChange={e => handleChange('customScript', e.target.value)}
              placeholder="이곳에 onClick 실행 시 동작할 핸들러 함수 코드를 작성하세요."
            />
            <div style={{ fontSize: '0.65rem', color: 'var(--builder-text-label)', marginTop: '4px', lineHeight: '1.4' }}>
              💡 우측 상단의 <strong>[🖥️ 크게 편집]</strong> 버튼을 누르면 넓은 화면에서 스크립트를 상세히 편집하실 수 있습니다.
            </div>
          </div>
        </div>

        {isScriptModalOpen && createPortal(
          <div className={`builder-app ${theme}`} style={{ display: 'block', height: 'auto', background: 'transparent' }}>
            <div className="code-modal-overlay">
              <div 
                className="code-modal" 
                style={{ 
                  width: '70vw', 
                  height: '70vh', 
                  minWidth: '850px', 
                  minHeight: '600px', 
                  maxWidth: '95vw', 
                  maxHeight: '95vh', 
                  display: 'flex', 
                  flexDirection: 'column' 
                }} 
                onClick={e => e.stopPropagation()}
              >
                <div className="code-modal-header">
                  <div className="code-modal-title">
                    🖥️ onClick 스크립트 상세 편집
                    <span className="badge" style={{ backgroundColor: '#4f46e5', marginLeft: '8px' }}>{action.label} ({action.actionName || '자동명칭'})</span>
                  </div>
                  <button className="code-modal-close" onClick={() => setIsScriptModalOpen(false)}>✕</button>
                </div>
                
                <div className="code-modal-body" style={{ display: 'flex', flexDirection: 'row', flex: 1, overflow: 'hidden' }}>
                  <div style={{ width: '250px', minWidth: '250px', borderRight: '1px solid var(--builder-border)', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--builder-surface)', padding: '12px', boxSizing: 'border-box', overflowY: 'auto' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--builder-text-main)', marginBottom: '4px' }}>스크립트 가이드</div>
                    <p style={{ fontSize: '0.68rem', color: 'var(--builder-text-muted)', lineHeight: '1.4', margin: '0 0 10px' }}>
                      비동기(async) 실행부입니다.
                    </p>
                    
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--builder-text-main)', marginBottom: '6px' }}>기본 템플릿 (덮어쓰기)</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '14px' }}>
                      <button type="button" className="btn-builder btn-builder-ghost" style={{ justifyContent: 'center', fontSize: '0.7rem', padding: '5px 8px' }} onClick={() => loadScriptTemplate('search')}>
                        🔍 조회
                      </button>
                      <button type="button" className="btn-builder btn-builder-ghost" style={{ justifyContent: 'center', fontSize: '0.7rem', padding: '5px 8px' }} onClick={() => loadScriptTemplate('submit')}>
                        💾 저장
                      </button>
                      <button type="button" className="btn-builder btn-builder-ghost" style={{ justifyContent: 'center', fontSize: '0.7rem', padding: '5px 8px' }} onClick={() => loadScriptTemplate('delete')}>
                        ✕ 삭제
                      </button>
                      <button type="button" className="btn-builder btn-builder-ghost" style={{ justifyContent: 'center', fontSize: '0.7rem', padding: '5px 8px' }} onClick={() => loadScriptTemplate('custom')}>
                        ⚙️ 커스텀
                      </button>
                    </div>

                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--builder-text-main)', marginBottom: '6px' }}>자주 쓰는 코드 (커서 삽입)</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <button type="button" className="btn-builder btn-builder-ghost" style={{ justifyContent: 'flex-start', fontSize: '0.7rem', padding: '5px 8px' }} onClick={() => insertSnippet("alert('알림 메시지');")}>
                        🔔 알림창 (alert)
                      </button>
                      <button type="button" className="btn-builder btn-builder-ghost" style={{ justifyContent: 'flex-start', fontSize: '0.7rem', padding: '5px 8px' }} onClick={() => insertSnippet("if (window.confirm('정말 진행하시겠습니까?')) {\n  // 실행할 코드 작성\n}")}>
                        ❓ 확인창 (confirm)
                      </button>
                      <button type="button" className="btn-builder btn-builder-ghost" style={{ justifyContent: 'flex-start', fontSize: '0.7rem', padding: '5px 8px' }} onClick={() => insertSnippet(`const response = await apiClient.post('${action.endpoint || '/api/...'}', data);`)}>
                        📤 API 호출 (POST)
                      </button>
                      <button type="button" className="btn-builder btn-builder-ghost" style={{ justifyContent: 'flex-start', fontSize: '0.7rem', padding: '5px 8px' }} onClick={() => insertSnippet(`const response = await apiClient.get('${action.endpoint || '/api/...'}');`)}>
                        📥 API 호출 (GET)
                      </button>
                      {grids.map(g => (
                        <button key={g.id} type="button" className="btn-builder btn-builder-ghost" style={{ justifyContent: 'flex-start', fontSize: '0.7rem', padding: '5px 8px', color: 'var(--builder-badge-text)' }} onClick={() => insertSnippet(`setData_${g.gridId}(response.data || []);`)}>
                          📊 grid[{g.gridId}] 바인딩
                        </button>
                      ))}
                      {grids.length === 0 && (
                        <button type="button" className="btn-builder btn-builder-ghost" style={{ justifyContent: 'flex-start', fontSize: '0.7rem', padding: '5px 8px' }} onClick={() => insertSnippet("setData_그리드ID(response.data || []);")}>
                          📊 그리드 데이터 바인딩
                        </button>
                      )}
                      <button type="button" className="btn-builder btn-builder-ghost" style={{ justifyContent: 'flex-start', fontSize: '0.7rem', padding: '5px 8px' }} onClick={() => insertSnippet("navigate('/경로');")}>
                        ➡️ 페이지 이동 (navigate)
                      </button>
                      <button type="button" className="btn-builder btn-builder-ghost" style={{ justifyContent: 'flex-start', fontSize: '0.7rem', padding: '5px 8px' }} onClick={() => insertSnippet("console.log('데이터 로그:', response);")}>
                        💻 콘솔 로그 (console.log)
                      </button>
                    </div>
                  </div>
                  
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{ 
                      padding: '10px 16px', 
                      background: theme === 'light' ? '#f1f5f9' : '#0f172a', 
                      fontSize: '0.8rem', 
                      color: 'var(--builder-text-muted)', 
                      borderBottom: '1px solid var(--builder-border)', 
                      fontFamily: "'JetBrains Mono', 'Cascadia Code', monospace",
                      borderTopLeftRadius: '8px',
                      borderTopRightRadius: '8px',
                      userSelect: 'none'
                    }}>
                      📄 전체 함수 소스 코드 수정 (선언부 포함)
                    </div>
                    <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                      <textarea
                        ref={textareaRef}
                        className="property-input"
                        style={{
                          fontFamily: "'JetBrains Mono', 'Cascadia Code', 'Consolas', monospace",
                          fontSize: '0.82rem',
                          lineHeight: '1.5',
                          width: '100%',
                          height: '100%',
                          whiteSpace: 'pre',
                          overflow: 'auto',
                          backgroundColor: 'var(--builder-code-bg)',
                          color: 'var(--builder-text-main)',
                          border: 'none',
                          padding: '16px',
                          boxSizing: 'border-box',
                          resize: 'none',
                          outline: 'none'
                        }}
                        value={action.customScript || getDefaultScript(action)}
                        onChange={e => handleChange('customScript', e.target.value)}
                        placeholder="  // 여기에 함수 선언을 포함하여 동작할 코드를 작성하세요."
                      />
                    </div>
                  </div>
                </div>
                
                <div className="code-modal-footer" style={{ justifyContent: 'flex-end', gap: '8px' }}>
                  <button type="button" className="btn-builder btn-builder-primary" style={{ padding: '8px 24px' }} onClick={() => setIsScriptModalOpen(false)}>
                    편집 완료 (자동 저장됨)
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    );
  }

  // === 필드 속성 패널 ===
  if (selectionInfo.type === 'field') {
    const field = selectionInfo.field!;
    const blockId = selectionInfo.blockId!;
    const handleChange = <K extends keyof FieldDefinition>(key: K, value: FieldDefinition[K]) => {
      onUpdateField(field.id, blockId, { [key]: value });
    };

    const isFormInput = ['input', 'textarea', 'select', 'radio', 'checkbox', 'hidden'].includes(field.type);
    const isGridColumn = field.type === 'grid_column';
    const hasOptions = field.type === 'select' || field.type === 'radio' || field.type === 'checkbox' || (isGridColumn && (field.gridColumnType === 'combo' || field.gridColumnType === 'multicombo'));

    if (isGridColumn) {
      return (
        <div className="builder-property">
          <div className="property-header">그리드 컬럼 속성</div>
          <div className="property-section">
            <div className="property-section-title">기본 정보</div>
            <div className="property-field">
              <div className="property-label">컬럼 제목 (Header Text) <span className="required-star">*</span></div>
              <input className="property-input" value={field.label} onChange={e => handleChange('label', e.target.value)} />
            </div>
            <div className="property-field">
              <div className="property-label">데이터 필드명 (DB Alias) <span className="required-star">*</span></div>
              <input className="property-input" value={field.fieldName} onChange={e => handleChange('fieldName', e.target.value)} placeholder="예: userNm" />
            </div>
            <div className="property-field">
              <div className="property-label">상위 그룹 헤더 (다단 헤더)</div>
              <input className="property-input" value={field.parentHeader || ''} onChange={e => handleChange('parentHeader', e.target.value)} placeholder="비워두면 1단 헤더" />
            </div>
          </div>

          <div className="property-section">
            <div className="property-section-title">컬럼 속성</div>
            <div className="property-field">
              <div className="property-label">컬럼 타입</div>
              <select className="property-select" value={field.gridColumnType || 'text'} onChange={e => handleChange('gridColumnType', e.target.value as any)}>
                <option value="text">text (일반 텍스트)</option>
                <option value="number">number (숫자)</option>
                <option value="date">date (날짜)</option>
                <option value="combo">combo (단일선택 드롭다운)</option>
                <option value="multicombo">multicombo (다중선택)</option>
                <option value="textarea">textarea (다중행)</option>
                <option value="textlink">textlink (팝업 링크)</option>
                <option value="search">search (돋보기 아이콘)</option>
              </select>
            </div>
            <div className="property-field">
              <div className="property-label">너비 (예: 100px, 20%, 0)</div>
              <input className="property-input" value={field.width || ''} onChange={e => handleChange('width', e.target.value)} placeholder="0이면 숨김" />
            </div>
            <div className="property-field">
              <div className="property-label">정렬</div>
              <select className="property-select" value={field.align || 'center'} onChange={e => handleChange('align', e.target.value as any)}>
                <option value="left">왼쪽 (Left)</option>
                <option value="center">가운데 (Center)</option>
                <option value="right">오른쪽 (Right)</option>
              </select>
            </div>
          </div>

          <div className="property-section">
            <div className="property-section-title">동작 / 검증</div>
            <div className="property-checkbox-row">
              <input type="checkbox" id="prop-editable" checked={!!field.editable} onChange={e => handleChange('editable', e.target.checked)} />
              <label className="property-checkbox-label" htmlFor="prop-editable">수정 가능 여부</label>
            </div>
            <div className="property-checkbox-row">
              <input type="checkbox" id="prop-required" checked={!!field.required} onChange={e => handleChange('required', e.target.checked)} />
              <label className="property-checkbox-label" htmlFor="prop-required">필수 항목</label>
            </div>
            {(field.gridColumnType === 'text' || field.gridColumnType === 'textarea' || field.gridColumnType === 'search') && (
              <div className="property-field" style={{ marginTop: '12px' }}>
                <div className="property-label">최대 글자수 (MaxLength)</div>
                <input type="number" className="property-input" value={field.maxlength || ''} onChange={e => handleChange('maxlength', e.target.value ? Number(e.target.value) : undefined)} />
              </div>
            )}
            {field.gridColumnType === 'number' && (
              <>
                <div className="property-field" style={{ marginTop: '12px' }}>
                  <div className="property-label">소수점 자릿수</div>
                  <input type="number" className="property-input" value={field.fractionDigits || ''} onChange={e => handleChange('fractionDigits', e.target.value ? Number(e.target.value) : undefined)} />
                </div>
                <div className="property-checkbox-row" style={{ marginTop: '8px' }}>
                  <input type="checkbox" id="prop-comma" checked={!!field.useThousandSeparator} onChange={e => handleChange('useThousandSeparator', e.target.checked)} />
                  <label className="property-checkbox-label" htmlFor="prop-comma">천 단위 콤마(,) 표시</label>
                </div>
              </>
            )}
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

    return (
      <div className="builder-property">
        <div className="property-header">항목(필드) 속성</div>
        <div className="property-section">
          <div className="property-section-title">기본 정보</div>
          {isFormInput && (
            <div className="property-field">
              <div className="property-label">필드명 (SQL ALIAS) <span className="required-star">*</span></div>
              <input className="property-input" value={field.fieldName} onChange={e => handleChange('fieldName', e.target.value)} placeholder="예: userId" />
            </div>
          )}
          <div className="property-field">
            <div className="property-label">{isFormInput ? '한글 라벨' : '표시 텍스트'} <span className="required-star">*</span></div>
            <input className="property-input" value={field.label} onChange={e => handleChange('label', e.target.value)} />
          </div>
          
          <div className="property-field">
            <div className="property-label">컴포넌트 뼈대 타입</div>
            <div style={{ padding: '8px', background: 'var(--builder-bg)', borderRadius: '4px', fontSize: '0.8rem', color: 'var(--builder-text-muted)' }}>
              {field.type}
            </div>
          </div>

          {field.type === 'input' && (
            <div className="property-field">
              <div className="property-label">세부 입력 타입 (Input Type)</div>
              <select className="property-select" value={field.inputType || 'text'} onChange={e => handleChange('inputType', e.target.value as any)}>
                <option value="text">text (일반 문자열)</option>
                <option value="number">number (숫자)</option>
                <option value="email">email (이메일)</option>
                <option value="password">password (비밀번호)</option>
                <option value="tel">tel (전화번호)</option>
                <option value="date">date (날짜)</option>
              </select>
            </div>
          )}

          {field.type === 'heading' && (
            <div className="property-field">
              <div className="property-label">헤딩 레벨</div>
              <select className="property-select" value={field.headingLevel || 'h3'} onChange={e => handleChange('headingLevel', e.target.value as any)}>
                <option value="h1">H1</option>
                <option value="h2">H2</option>
                <option value="h3">H3</option>
                <option value="h4">H4</option>
                <option value="h5">H5</option>
                <option value="h6">H6</option>
              </select>
            </div>
          )}
          
          {field.type === 'button' && (
            <div className="property-field">
              <div className="property-label">버튼 역할</div>
              <select className="property-select" value={field.buttonRole || 'button'} onChange={e => handleChange('buttonRole', e.target.value as any)}>
                <option value="button">일반 버튼 (Button)</option>
                <option value="submit">제출 (Submit)</option>
                <option value="reset">초기화 (Reset)</option>
              </select>
            </div>
          )}

          {isFormInput && (
            <>
              <div className="property-field">
                <div className="property-label">플레이스홀더</div>
                <input className="property-input" value={field.placeholder || ''} onChange={e => handleChange('placeholder', e.target.value)} />
              </div>
              <div className="property-field">
                <div className="property-label">기본값 (defaultValue)</div>
                <input className="property-input" value={field.defaultValue || ''} onChange={e => handleChange('defaultValue', e.target.value)} placeholder="초기값 설정" />
              </div>
              <div className="property-field">
                <div className="property-label">강제 고정값 (Override Value)</div>
                <input className="property-input" value={field.overrideValue || ''} onChange={e => handleChange('overrideValue', e.target.value)} placeholder="기본 매핑 무시 시 입력" />
              </div>
            </>
          )}
        </div>

        {isFormInput && (
          <div className="property-section">
            <div className="property-section-title">유효성 검증</div>
            <div className="property-checkbox-row">
              <input type="checkbox" id="prop-required" checked={!!field.required} onChange={e => handleChange('required', e.target.checked)} />
              <label className="property-checkbox-label" htmlFor="prop-required">필수 입력</label>
            </div>
            {(field.inputType === 'text' || field.inputType === 'email' || field.type === 'textarea') && (
              <>
                <div className="property-field">
                  <div className="property-label">최대 글자수</div>
                  <input type="number" className="property-input" value={field.maxlength || ''} onChange={e => handleChange('maxlength', e.target.value ? Number(e.target.value) : undefined)} />
                </div>
              </>
            )}
          </div>
        )}

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
