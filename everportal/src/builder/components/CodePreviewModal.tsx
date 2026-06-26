import React, { useState } from 'react';
import type { GeneratedCode } from '../types/screenDefinition';

interface CodePreviewModalProps {
  generatedCode: GeneratedCode;
  onClose: () => void;
  onSaveToServer: () => Promise<void>;
  isSaving: boolean;
}

type TabKey = 'page' | 'schema' | 'handler';

const TAB_INFO: Record<TabKey, { label: string; pathKey: keyof GeneratedCode['filePaths']; contentKey: keyof Omit<GeneratedCode, 'filePaths'> }> = {
  page:    { label: 'Page.tsx',    pathKey: 'page',    contentKey: 'pageTsx' },
  schema:  { label: 'Schema.ts',   pathKey: 'schema',  contentKey: 'schemaTts' },
  handler: { label: 'Handler.ts',  pathKey: 'handler', contentKey: 'handlerTs' },
};

const CodePreviewModal: React.FC<CodePreviewModalProps> = ({
  generatedCode,
  onClose,
  onSaveToServer,
  isSaving,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('page');
  const [copiedTab, setCopiedTab] = useState<TabKey | null>(null);

  const currentTab = TAB_INFO[activeTab];
  const code = generatedCode[currentTab.contentKey] as string;
  const filePath = generatedCode.filePaths[currentTab.pathKey];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedTab(activeTab);
      setTimeout(() => setCopiedTab(null), 2000);
    } catch {
      // clipboard API 실패 시 fallback
      const el = document.createElement('textarea');
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopiedTab(activeTab);
      setTimeout(() => setCopiedTab(null), 2000);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filePath.split('/').pop() || 'generated.ts';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="code-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="code-modal">
        {/* 헤더 */}
        <div className="code-modal-header">
          <div className="code-modal-title">
            코드 생성 결과
            <span className="badge">Auto-Generated</span>
          </div>
          <button className="code-modal-close" onClick={onClose} title="닫기">✕</button>
        </div>

        {/* 탭 */}
        <div className="code-modal-tabs">
          {(Object.keys(TAB_INFO) as TabKey[]).map(key => (
            <button
              key={key}
              className={`code-modal-tab${activeTab === key ? ' active' : ''}`}
              onClick={() => setActiveTab(key)}
            >
              {TAB_INFO[key].label}
            </button>
          ))}
        </div>

        {/* 코드 영역 */}
        <div className="code-modal-body">
          <div className="code-file-path">
            <span>📄 {filePath}</span>
            <span style={{ color: '#374151' }}>eversrm → 파일 시스템 저장</span>
          </div>
          <div className="code-block">{code}</div>
        </div>

        {/* 푸터 */}
        <div className="code-modal-footer">
          <div className="code-save-info">
            <span>💾</span>
            <span>서버에 저장하면 <strong style={{ color: '#a5b4fc' }}>eversrm</strong> 파일 시스템에 직접 생성됩니다.</span>
          </div>
          <div className="code-modal-actions">
            <button
              className="btn-builder btn-builder-ghost"
              onClick={handleCopy}
            >
              {copiedTab === activeTab ? '✓ 복사됨' : '📋 복사'}
            </button>
            <button
              className="btn-builder btn-builder-ghost"
              onClick={handleDownload}
            >
              ⬇ 다운로드
            </button>
            <button
              className="btn-builder btn-builder-success"
              onClick={onSaveToServer}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <div className="builder-spinner" />
                  저장 중...
                </>
              ) : (
                '🚀 서버에 파일 생성'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePreviewModal;
