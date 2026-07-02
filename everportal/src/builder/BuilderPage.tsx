import React, { useState, useCallback, useRef } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import type { DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { v4 as uuidv4 } from 'uuid';

import type {
  ScreenDefinition,
  FieldDefinition,
  ApiAction,
  LayoutBlock,
  FormBlock,
  GridBlock,
  ActionBlock,
  BlockType,
  BuilderComponentType
} from './types/screenDefinition';
import { generateCode } from './utils/codeGenerator';
import { generateAndSaveFiles } from './api/builderApi';

import ComponentPalette from './components/ComponentPalette';
import CanvasArea from './components/CanvasArea';
import PropertyPanel from './components/PropertyPanel';
import CodePreviewModal from './components/CodePreviewModal';

import './builder.css';

// ─────────────────────────────────────────────────────────────────────
// 기본 데이터 생성 헬퍼
// ─────────────────────────────────────────────────────────────────────

const createNewScreen = (): ScreenDefinition => ({
  screenId: uuidv4(),
  screenName: '',
  title: '',
  description: '',
  domainPath: '',
  blocks: [
    {
      id: uuidv4(),
      type: 'form',
      formId: 'mainForm',
      title: '메인 폼',
      width: '100%',
      columns: 1,
      fields: [],
    } as FormBlock
  ],
  pagination: { recordCountPerPage: 10, pageSize: 10 },
  updatedAt: new Date().toISOString(),
});

const createNewField = (type: BuilderComponentType): FieldDefinition => ({
  id: uuidv4(),
  fieldName: '',
  label: '',
  type,
  inputType: type === 'input' ? 'text' : undefined,
  required: false,
});

const createNewAction = (): ApiAction => ({
  id: uuidv4(),
  label: '새 액션',
  method: 'GET',
  endpoint: '',
  buttonType: 'search',
});

// ─────────────────────────────────────────────────────────────────────
// BuilderPage 메인
// ─────────────────────────────────────────────────────────────────────

const BuilderPage: React.FC = () => {
  const [theme, setTheme] = React.useState<'dark' | 'light'>(() => (localStorage.getItem('builder-ui-theme') as 'dark' | 'light') || 'dark');
  const [activeScreen, setActiveScreen] = useState<ScreenDefinition | null>(null);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('builder-ui-theme', next);
      return next;
    });
  }, []);
  
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<ReturnType<typeof generateCode> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const [draggingType, setDraggingType] = useState<BuilderComponentType | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  // ── 파일 관리 (New / Open) ──────────────────────────────────────────
  const handleNewFile = useCallback(() => {
    if (activeScreen && !window.confirm('새 파일을 작성하시겠습니까? (저장하지 않은 내용은 사라집니다)')) return;
    setActiveScreen(createNewScreen());
    setSelectedElementId(null);
  }, [activeScreen]);

  const handleOpenFileClick = useCallback(() => {
    if (activeScreen && !window.confirm('파일을 불러오시겠습니까? (저장하지 않은 내용은 사라집니다)')) return;
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  }, [activeScreen]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;

      // 1. 단일 행 매치 시도
      const singleLineMatch = text.match(/\/\/\s*@everportal-screen-definition:\s*({.*})/);
      if (singleLineMatch && singleLineMatch[1]) {
        try {
          const parsed = JSON.parse(singleLineMatch[1]);
          setActiveScreen(parsed);
          setSelectedElementId(null);
          return;
        } catch (err) {
          // 파싱 에러 시 다중 행 처리로 넘어감
        }
      }

      // 2. 다중 행 처리 (포매터 등에 의해 주석이 줄바꿈된 경우 대응)
      const marker = '@everportal-screen-definition:';
      const index = text.indexOf(marker);
      if (index !== -1) {
        try {
          const rawContent = text.substring(index + marker.length).trim();
          // 각 행의 '//' 주석 접두사 제거
          const cleanedLines = rawContent
            .split('\n')
            .map(line => line.trim().replace(/^\/\/\s*/, ''))
            .join('\n')
            .trim();

          const firstBrace = cleanedLines.indexOf('{');
          const lastBrace = cleanedLines.lastIndexOf('}');
          if (firstBrace !== -1 && lastBrace !== -1) {
            const jsonText = cleanedLines.substring(firstBrace, lastBrace + 1);
            const parsed = JSON.parse(jsonText);
            setActiveScreen(parsed);
            setSelectedElementId(null);
            return;
          }
        } catch (err) {
          // 다중 행 처리 실패
        }
      }

      alert('이 파일에는 올바른 형식의 Screen Builder 화면 정의 메타데이터가 존재하지 않거나 파일 파싱에 실패했습니다.');
    };
    reader.readAsText(file);
  }, []);

  // ── 화면 속성 관리 ───────────────────────────────────────────────────
  const handleUpdateScreen = useCallback((key: keyof ScreenDefinition, value: any) => {
    setActiveScreen(prev => prev ? { ...prev, [key]: value, updatedAt: new Date().toISOString() } : null);
  }, []);

  // ── 블록 관리 ────────────────────────────────────────────────────────
  const handleAddBlock = useCallback((type: BlockType) => {
    setActiveScreen(prev => {
      if (!prev) return null;
      let newBlock: LayoutBlock;
      if (type === 'form') {
        newBlock = { id: uuidv4(), type: 'form', formId: `form_${uuidv4().substring(0,4)}`, title: '새 폼', width: '100%', columns: 1, fields: [] } as FormBlock;
      } else if (type === 'grid') {
        const defaultColumns = Array.from({ length: 10 }).map((_, i) => ({
          id: uuidv4(),
          fieldName: `col${i+1}`,
          label: `컬럼 ${i+1}`,
          type: 'grid_column',
          gridColumnType: 'text',
          width: '100',
          editable: false,
          required: false,
          align: 'center',
        } as FieldDefinition));
        newBlock = { id: uuidv4(), type: 'grid', gridId: `grid_${uuidv4().substring(0,4)}`, title: '새 그리드', width: '100%', gridColumns: defaultColumns } as GridBlock;
      } else {
        newBlock = { id: uuidv4(), type: 'action', title: '액션 영역', width: '100%', actions: [] } as ActionBlock;
      }
      return { ...prev, blocks: [...(prev.blocks || []), newBlock], updatedAt: new Date().toISOString() };
    });
  }, []);

  const handleDeleteBlock = useCallback((blockId: string) => {
    setActiveScreen(prev => prev ? { ...prev, blocks: prev.blocks.filter(b => b.id !== blockId), updatedAt: new Date().toISOString() } : null);
    setSelectedElementId(prev => (prev === blockId ? null : prev));
  }, []);

  const handleUpdateBlock = useCallback((blockId: string, updates: Partial<LayoutBlock>) => {
    setActiveScreen(prev => {
      if (!prev) return null;
      return {
        ...prev,
        blocks: prev.blocks.map(b => b.id === blockId ? { ...b, ...updates } as LayoutBlock : b),
        updatedAt: new Date().toISOString()
      };
    });
  }, []);

  // ── 필드 / 액션 관리 ─────────────────────────────────────────────────
  const handleUpdateField = useCallback((fieldId: string, blockId: string, updates: Partial<FieldDefinition>) => {
    setActiveScreen(prev => {
      if (!prev) return null;
      return {
        ...prev,
        blocks: prev.blocks.map(b => {
          if (b.id !== blockId) return b;
          if (b.type === 'form') return { ...b, fields: b.fields.map(f => f.id === fieldId ? { ...f, ...updates } : f) } as FormBlock;
          if (b.type === 'grid') return { ...b, gridColumns: b.gridColumns.map(f => f.id === fieldId ? { ...f, ...updates } : f) } as GridBlock;
          return b;
        })
      };
    });
  }, []);

  const handleDeleteField = useCallback((fieldId: string, blockId: string) => {
    setActiveScreen(prev => {
      if (!prev) return null;
      return {
        ...prev,
        blocks: prev.blocks.map(b => {
          if (b.id !== blockId) return b;
          if (b.type === 'form') return { ...b, fields: b.fields.filter(f => f.id !== fieldId) } as FormBlock;
          if (b.type === 'grid') return { ...b, gridColumns: b.gridColumns.filter(f => f.id !== fieldId) } as GridBlock;
          return b;
        })
      };
    });
    setSelectedElementId(prev => (prev === fieldId ? null : prev));
  }, []);

  const handleAddAction = useCallback((blockId: string) => {
    const newAction = createNewAction();
    setActiveScreen(prev => {
      if (!prev) return null;
      return {
        ...prev,
        blocks: prev.blocks.map(b => {
          if (b.id === blockId && b.type === 'action') {
            return { ...b, actions: [...b.actions, newAction] } as ActionBlock;
          }
          return b;
        })
      };
    });
  }, []);

  const handleDeleteAction = useCallback((actionId: string, blockId: string) => {
    setActiveScreen(prev => {
      if (!prev) return null;
      return {
        ...prev,
        blocks: prev.blocks.map(b => {
          if (b.id === blockId && b.type === 'action') {
            return { ...b, actions: b.actions.filter(a => a.id !== actionId) } as ActionBlock;
          }
          return b;
        })
      };
    });
    setSelectedElementId(prev => (prev === actionId ? null : prev));
  }, []);

  const handleUpdateAction = useCallback((actionId: string, blockId: string, updates: Partial<ApiAction>) => {
    setActiveScreen(prev => {
      if (!prev) return null;
      return {
        ...prev,
        blocks: prev.blocks.map(b => {
          if (b.id === blockId && b.type === 'action') {
            return { ...b, actions: b.actions.map(a => a.id === actionId ? { ...a, ...updates } : a) } as ActionBlock;
          }
          return b;
        })
      };
    });
  }, []);

  // ── DnD 이벤트 ───────────────────────────────────────────────────────
  const handleDragStart = useCallback((event: DragStartEvent) => {
    const data = event.active.data.current;
    if (data?.source === 'palette') {
      setDraggingType(data.type as BuilderComponentType);
    }
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    setDraggingType(null);
    if (!activeScreen) return;

    const { active, over } = event;
    if (!over) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    // 팔레트 → 블록(Form/Grid)으로 드롭
    if (activeData?.source === 'palette' && String(over.id).startsWith('drop-zone-')) {
      const blockId = String(over.id).replace('drop-zone-', '');
      const newField = createNewField(activeData.type as BuilderComponentType);
      
      setActiveScreen(prev => {
        if (!prev) return null;
        return {
          ...prev,
          blocks: prev.blocks.map(b => {
            if (b.id === blockId) {
              if (b.type === 'form') return { ...b, fields: [...b.fields, newField] } as FormBlock;
              if (b.type === 'grid') return { ...b, gridColumns: [...b.gridColumns, newField] } as GridBlock;
            }
            return b;
          })
        };
      });
      setSelectedElementId(newField.id);
      return;
    }

    // 캔버스 내 블록 정렬
    if (activeData?.type === 'block' && active.id !== over.id) {
      setActiveScreen(prev => {
        if (!prev) return null;
        const oldIdx = prev.blocks.findIndex(b => b.id === active.id);
        const newIdx = prev.blocks.findIndex(b => b.id === over.id);
        if (oldIdx !== -1 && newIdx !== -1) {
          return { ...prev, blocks: arrayMove(prev.blocks, oldIdx, newIdx), updatedAt: new Date().toISOString() };
        }
        return prev;
      });
      return;
    }

    // 캔버스 내 정렬 (동일 블록 내부에서만 정렬 지원)
    if (active.id !== over.id && activeData?.blockId && overData?.blockId && activeData.blockId === overData.blockId) {
      const blockId = activeData.blockId;
      setActiveScreen(prev => {
        if (!prev) return null;
        return {
          ...prev,
          blocks: prev.blocks.map(b => {
            if (b.id !== blockId) return b;
            
            if (b.type === 'form') {
              const oldIdx = b.fields.findIndex(f => f.id === active.id);
              const newIdx = b.fields.findIndex(f => f.id === over.id);
              if (oldIdx !== -1 && newIdx !== -1) {
                return { ...b, fields: arrayMove(b.fields, oldIdx, newIdx) } as FormBlock;
              }
            }
            if (b.type === 'grid') {
              const oldIdx = b.gridColumns.findIndex(f => f.id === active.id);
              const newIdx = b.gridColumns.findIndex(f => f.id === over.id);
              if (oldIdx !== -1 && newIdx !== -1) {
                return { ...b, gridColumns: arrayMove(b.gridColumns, oldIdx, newIdx) } as GridBlock;
              }
            }
            return b;
          })
        };
      });
    }
  }, [activeScreen]);

  // ── 코드 생성 / 저장 ──────────────────────────────────────────────────
  const handleGenerateCode = useCallback(() => {
    if (!activeScreen) return alert('화면을 선택하세요.');
    if (!activeScreen.screenName) return alert('화면ID(컴포넌트명)을 입력하세요.');
    if (!activeScreen.domainPath) return alert('도메인 경로를 입력하세요. (예: user/member)');
    const code = generateCode(activeScreen);
    setGeneratedCode(code);
    setShowCodeModal(true);
  }, [activeScreen]);

  const handleSaveToServer = useCallback(async () => {
    if (!activeScreen || !generatedCode) return;
    try {
      setIsSaving(true);
      const result = await generateAndSaveFiles(activeScreen, generatedCode);
      if (result.resultCode === 'SUCCESS') {
        setSaveStatus('✓ 서버 저장 완료!');
        setTimeout(() => setSaveStatus(null), 3000);
      } else {
        alert(`저장 실패: ${result.resultMessage}`);
      }
    } catch (error: any) {
      alert(`서버 통신 오류: ${error.message}\n\n코드 복사/다운로드를 이용해 수동으로 파일을 생성할 수 있습니다.`);
    } finally {
      setIsSaving(false);
    }
  }, [activeScreen, generatedCode]);

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className={`builder-app ${theme}`} style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".tsx" style={{ display: 'none' }} />
        
        <div className="builder-main" style={{ flex: 1 }}>
          <div className="builder-toolbar">
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn-builder btn-builder-ghost" onClick={handleNewFile}>📝 New File</button>
              <button className="btn-builder btn-builder-ghost" onClick={handleOpenFileClick}>📂 Open File</button>
            </div>
            
            <div className="builder-toolbar-title" style={{ flex: 1, textAlign: 'center' }}>
              {activeScreen ? `✏ ${activeScreen.screenName || '새 화면ID'} — ${activeScreen.title || '화면명 없음'}` : '화면을 생성하거나 불러오세요'}
            </div>

            <div className="builder-toolbar-actions">
              {saveStatus && <span style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 600, marginRight: '12px' }}>{saveStatus}</span>}
              <button 
                className="btn-builder btn-builder-ghost" 
                onClick={toggleTheme}
                title={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
              >
                {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
              </button>
              {activeScreen && (
                <button className="btn-builder btn-builder-primary" onClick={handleGenerateCode}>⚡ 코드 생성</button>
              )}
            </div>
          </div>

          <div className="builder-editor">
            {activeScreen && <ComponentPalette />}
            
            <CanvasArea
              theme={theme}
              screen={activeScreen}
              selectedElementId={selectedElementId}
              onSelectElement={setSelectedElementId}
              onDeleteField={handleDeleteField}
              onUpdateScreen={handleUpdateScreen}
              onAddBlock={handleAddBlock}
              onDeleteBlock={handleDeleteBlock}
              onAddAction={handleAddAction}
              onDeleteAction={handleDeleteAction}
              onUpdateAction={handleUpdateAction}
            />
            
            {activeScreen && (
              <PropertyPanel
                theme={theme}
                screen={activeScreen}
                selectedElementId={selectedElementId}
                onUpdateField={handleUpdateField}
                onUpdateBlock={handleUpdateBlock}
                onUpdateAction={handleUpdateAction}
              />
            )}
          </div>
        </div>

        <DragOverlay>
          {draggingType ? (
            <div style={{ padding: '8px 16px', background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', borderRadius: '6px', color: 'white', fontSize: '0.8rem', fontWeight: 600, boxShadow: '0 8px 24px rgba(99, 102, 241, 0.4)', cursor: 'grabbing' }}>
              + {draggingType}
            </div>
          ) : null}
        </DragOverlay>

        {showCodeModal && generatedCode && (
          <CodePreviewModal generatedCode={generatedCode} onClose={() => setShowCodeModal(false)} onSaveToServer={handleSaveToServer} isSaving={isSaving} />
        )}
      </div>
    </DndContext>
  );
};

export default BuilderPage;
