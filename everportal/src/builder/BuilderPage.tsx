import React, { useState, useCallback, useEffect } from 'react';
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
  PageType,
} from './types/screenDefinition';
import type { FieldType } from '@/common/validator/types';
import { generateCode } from './utils/codeGenerator';
import { generateAndSaveFiles, saveScreenDefinition, fetchScreenList, deleteScreenDefinition } from './api/builderApi';

import ScreenListSidebar from './components/ScreenListSidebar';
import ComponentPalette from './components/ComponentPalette';
import CanvasArea from './components/CanvasArea';
import PropertyPanel from './components/PropertyPanel';
import CodePreviewModal from './components/CodePreviewModal';

import './builder.css';

// ─────────────────────────────────────────────────────────────────────
// 기본 화면 정의 생성 헬퍼
// ─────────────────────────────────────────────────────────────────────

const createNewScreen = (): ScreenDefinition => ({
  screenId: uuidv4(),
  screenName: '',
  title: '',
  description: '',
  route: '',
  domainPath: '',
  pageType: 'form',
  formColumns: 1,
  fields: [],
  gridColumns: [],
  actions: [],
  pagination: { recordCountPerPage: 10, pageSize: 10 },
  updatedAt: new Date().toISOString(),
});

const createNewField = (type: FieldType): FieldDefinition => ({
  id: uuidv4(),
  fieldName: '',
  label: '',
  type,
  required: false,
});

const createNewAction = (): ApiAction => ({
  id: uuidv4(),
  label: '',
  method: 'GET',
  endpoint: '',
  buttonType: 'search',
});

// ─────────────────────────────────────────────────────────────────────
// LocalStorage 유틸
// ─────────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'everportal_builder_screens';

const loadScreensFromStorage = (): ScreenDefinition[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveScreensToStorage = (screens: ScreenDefinition[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(screens));
  } catch (e) {
    console.error('LocalStorage 저장 실패', e);
  }
};

// ─────────────────────────────────────────────────────────────────────
// BuilderPage 메인
// ─────────────────────────────────────────────────────────────────────

const BuilderPage: React.FC = () => {
  // 화면 목록
  const [screens, setScreens] = useState<ScreenDefinition[]>(() => loadScreensFromStorage());
  // 현재 선택된 화면
  const [activeScreenId, setActiveScreenId] = useState<string | null>(null);
  // 현재 선택된 필드
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  // 코드 프리뷰 모달
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<ReturnType<typeof generateCode> | null>(null);
  // 저장 상태
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // 드래그 중인 아이템 타입
  const [draggingType, setDraggingType] = useState<FieldType | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  // 현재 활성 화면
  const activeScreen = screens.find(s => s.screenId === activeScreenId) ?? null;

  // screens 변경 시 LocalStorage 저장
  useEffect(() => {
    saveScreensToStorage(screens);
  }, [screens]);

  // ── 화면 관리 ──────────────────────────────────────────────────────

  const handleNewScreen = useCallback(() => {
    const newScreen = createNewScreen();
    setScreens(prev => [...prev, newScreen]);
    setActiveScreenId(newScreen.screenId);
    setSelectedFieldId(null);
  }, []);

  const handleSelectScreen = useCallback((id: string) => {
    setActiveScreenId(id);
    setSelectedFieldId(null);
  }, []);

  const handleDeleteScreen = useCallback((id: string) => {
    setScreens(prev => prev.filter(s => s.screenId !== id));
    setActiveScreenId(prev => (prev === id ? null : prev));
    setSelectedFieldId(null);
  }, []);

  const handleUpdateScreen = useCallback((key: keyof ScreenDefinition, value: any) => {
    if (!activeScreenId) return;
    setScreens(prev =>
      prev.map(s =>
        s.screenId === activeScreenId
          ? { ...s, [key]: value, updatedAt: new Date().toISOString() }
          : s
      )
    );
  }, [activeScreenId]);

  // ── 필드 관리 ──────────────────────────────────────────────────────

  const handleUpdateField = useCallback((id: string, updates: Partial<FieldDefinition>) => {
    if (!activeScreenId) return;
    setScreens(prev =>
      prev.map(s => {
        if (s.screenId !== activeScreenId) return s;
        return {
          ...s,
          fields: s.fields.map(f => f.id === id ? { ...f, ...updates } : f),
          gridColumns: (s.gridColumns || []).map(f => f.id === id ? { ...f, ...updates } : f),
          updatedAt: new Date().toISOString(),
        };
      })
    );
  }, [activeScreenId]);

  const handleDeleteField = useCallback((id: string) => {
    if (!activeScreenId) return;
    setScreens(prev =>
      prev.map(s => {
        if (s.screenId !== activeScreenId) return s;
        return {
          ...s,
          fields: s.fields.filter(f => f.id !== id),
          gridColumns: (s.gridColumns || []).filter(f => f.id !== id)
        };
      })
    );
    setSelectedFieldId(prev => (prev === id ? null : prev));
  }, [activeScreenId]);

  // ── 액션 관리 ──────────────────────────────────────────────────────

  const handleAddAction = useCallback(() => {
    if (!activeScreenId) return;
    const newAction = createNewAction();
    setScreens(prev =>
      prev.map(s =>
        s.screenId === activeScreenId
          ? { ...s, actions: [...s.actions, newAction] }
          : s
      )
    );
  }, [activeScreenId]);

  const handleDeleteAction = useCallback((id: string) => {
    if (!activeScreenId) return;
    setScreens(prev =>
      prev.map(s =>
        s.screenId === activeScreenId
          ? { ...s, actions: s.actions.filter(a => a.id !== id) }
          : s
      )
    );
  }, [activeScreenId]);

  const handleUpdateAction = useCallback((id: string, key: keyof ApiAction, value: string) => {
    if (!activeScreenId) return;
    setScreens(prev =>
      prev.map(s => {
        if (s.screenId !== activeScreenId) return s;
        return {
          ...s,
          actions: s.actions.map(a => a.id === id ? { ...a, [key]: value } : a),
        };
      })
    );
  }, [activeScreenId]);

  // ── DnD 이벤트 ────────────────────────────────────────────────────

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const data = event.active.data.current;
    if (data?.source === 'palette') {
      setDraggingType(data.type as FieldType);
    }
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    setDraggingType(null);
    if (!activeScreenId) return;

    const { active, over } = event;
    if (!over) return;

    const activeData = active.data.current;

    // 팔레트 → 캔버스 (검색 폼) 드롭
    if (activeData?.source === 'palette' && over.id === 'canvas-drop-zone') {
      const newField = createNewField(activeData.type as FieldType);
      setScreens(prev =>
        prev.map(s =>
          s.screenId === activeScreenId
            ? { ...s, fields: [...s.fields, newField] }
            : s
        )
      );
      setSelectedFieldId(newField.id);
      return;
    }

    // 팔레트 → 캔버스 (데이터 그리드) 드롭
    if (activeData?.source === 'palette' && over.id === 'canvas-drop-grid-zone') {
      const newField = createNewField(activeData.type as FieldType);
      setScreens(prev =>
        prev.map(s =>
          s.screenId === activeScreenId
            ? { ...s, gridColumns: [...(s.gridColumns || []), newField] }
            : s
        )
      );
      setSelectedFieldId(newField.id);
      return;
    }

    // 캔버스 내 정렬
    if (active.id !== over.id) {
      setScreens(prev =>
        prev.map(s => {
          if (s.screenId !== activeScreenId) return s;

          // fields 영역에서의 이동
          let oldIdx = s.fields.findIndex(f => f.id === active.id);
          let newIdx = s.fields.findIndex(f => f.id === over.id);
          if (oldIdx !== -1 && newIdx !== -1) {
            return { ...s, fields: arrayMove(s.fields, oldIdx, newIdx) };
          }

          // gridColumns 영역에서의 이동
          if (s.gridColumns) {
            oldIdx = s.gridColumns.findIndex(f => f.id === active.id);
            newIdx = s.gridColumns.findIndex(f => f.id === over.id);
            if (oldIdx !== -1 && newIdx !== -1) {
              return { ...s, gridColumns: arrayMove(s.gridColumns, oldIdx, newIdx) };
            }
          }

          return s;
        })
      );
    }
  }, [activeScreenId]);

  // ── 코드 생성 ─────────────────────────────────────────────────────

  const handleGenerateCode = useCallback(() => {
    if (!activeScreen) {
      alert('화면을 선택하세요.');
      return;
    }
    if (!activeScreen.screenName) {
      alert('화면명(컴포넌트명)을 입력하세요.');
      return;
    }
    if (!activeScreen.domainPath) {
      alert('도메인 경로를 입력하세요. (예: user/member)');
      return;
    }
    const code = generateCode(activeScreen);
    setGeneratedCode(code);
    setShowCodeModal(true);
  }, [activeScreen]);

  // ── 서버에 파일 생성 ─────────────────────────────────────────────

  const handleSaveToServer = useCallback(async () => {
    if (!activeScreen || !generatedCode) return;
    try {
      setIsSaving(true);
      const result = await generateAndSaveFiles(activeScreen, generatedCode);
      if (result.resultCode === 'SUCCESS') {
        setSaveStatus('✓ 파일 생성 완료!');
        // 화면 정의도 서버에 저장
        await saveScreenDefinition(activeScreen);
        setTimeout(() => setSaveStatus(null), 3000);
      } else {
        alert(`파일 생성 실패: ${result.resultMessage}`);
      }
    } catch (error: any) {
      // 서버 연결 실패 시 안내 (개발 중 서버가 꺼진 경우 등)
      alert(`서버 통신 오류: ${error.message}\n\n코드 복사/다운로드를 이용해 수동으로 파일을 생성할 수 있습니다.`);
    } finally {
      setIsSaving(false);
    }
  }, [activeScreen, generatedCode]);

  // ── 현재 선택된 필드 객체 ────────────────────────────────────────

  const selectedField = activeScreen?.fields.find(f => f.id === selectedFieldId) ?? null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="builder-app">
        {/* 1) 좌측: 화면 목록 사이드바 */}
        <ScreenListSidebar
          screens={screens}
          activeScreenId={activeScreenId}
          onSelectScreen={handleSelectScreen}
          onNewScreen={handleNewScreen}
          onDeleteScreen={handleDeleteScreen}
        />

        {/* 2) 메인 에디터 */}
        <div className="builder-main">
          {/* 상단 툴바 */}
          <div className="builder-toolbar">
            <div className="builder-toolbar-title">
              {activeScreen
                ? `✏ ${activeScreen.screenName || '새 화면'} — ${activeScreen.title || '제목 없음'}`
                : '화면을 선택하거나 새로 만드세요'}
            </div>
            {saveStatus && (
              <span style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 600 }}>{saveStatus}</span>
            )}
            <div className="builder-toolbar-actions">
              {activeScreen && (
                <>
                  <button
                    className="btn-builder btn-builder-ghost"
                    onClick={() => {
                      // 현재 상태를 LocalStorage에 강제 저장
                      saveScreensToStorage(screens);
                      setSaveStatus('✓ 임시 저장됨');
                      setTimeout(() => setSaveStatus(null), 2000);
                    }}
                  >
                    💾 임시저장
                  </button>
                  <button
                    className="btn-builder btn-builder-primary"
                    onClick={handleGenerateCode}
                  >
                    ⚡ 코드 생성
                  </button>
                </>
              )}
            </div>
          </div>

          {/* 3-panel 에디터 */}
          <div className="builder-editor">
            {/* 왼쪽: 컴포넌트 팔레트 */}
            <ComponentPalette />

            {/* 중앙: 캔버스 */}
            <CanvasArea
              screen={activeScreen}
              selectedFieldId={selectedFieldId}
              onSelectField={setSelectedFieldId}
              onDeleteField={handleDeleteField}
              onUpdateScreen={handleUpdateScreen}
              onAddAction={handleAddAction}
              onDeleteAction={handleDeleteAction}
              onUpdateAction={handleUpdateAction}
            />

            {/* 우측: 속성 패널 */}
            <PropertyPanel
              field={selectedField}
              pageType={activeScreen?.pageType ?? 'form'}
              onUpdate={handleUpdateField}
            />
          </div>
        </div>

        {/* DragOverlay: 드래그 중 표시 */}
        <DragOverlay>
          {draggingType ? (
            <div
              style={{
                padding: '8px 16px',
                background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                borderRadius: '6px',
                color: 'white',
                fontSize: '0.8rem',
                fontWeight: 600,
                boxShadow: '0 8px 24px rgba(99, 102, 241, 0.4)',
                cursor: 'grabbing',
              }}
            >
              + {draggingType}
            </div>
          ) : null}
        </DragOverlay>

        {/* 코드 프리뷰 모달 */}
        {showCodeModal && generatedCode && (
          <CodePreviewModal
            generatedCode={generatedCode}
            onClose={() => setShowCodeModal(false)}
            onSaveToServer={handleSaveToServer}
            isSaving={isSaving}
          />
        )}
      </div>
    </DndContext>
  );
};

export default BuilderPage;
