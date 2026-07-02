import React from 'react';
import type { ScreenDefinition } from '../types/screenDefinition';

interface ScreenListSidebarProps {
  screens: ScreenDefinition[];
  activeScreenId: string | null;
  onSelectScreen: (id: string) => void;
  onNewScreen: () => void;
  onDeleteScreen: (id: string) => void;
}



const ScreenListSidebar: React.FC<ScreenListSidebarProps> = ({
  screens,
  activeScreenId,
  onSelectScreen,
  onNewScreen,
  onDeleteScreen,
}) => {
  return (
    <div className="builder-sidebar">
      {/* 로고 */}
      <div className="builder-sidebar-header">
        <div className="builder-logo">🔧</div>
        <div>
          <div className="builder-sidebar-title">Screen Builder</div>
          <div style={{ fontSize: '0.65rem', color: '#4b5563', marginTop: '1px' }}>EverPortal</div>
        </div>
      </div>

      {/* 새 화면 버튼 */}
      <button className="builder-new-btn" onClick={onNewScreen}>
        ＋ 새 화면
      </button>

      {/* 화면 목록 */}
      <div className="builder-sidebar-section">화면 목록</div>
      <div className="builder-screen-list">
        {screens.length === 0 ? (
          <div style={{ padding: '12px 10px', color: '#374151', fontSize: '0.78rem', textAlign: 'center' }}>
            화면이 없습니다.<br />새 화면을 만드세요.
          </div>
        ) : (
          screens.map(screen => (
            <div
              key={screen.screenId}
              className={`builder-screen-item${activeScreenId === screen.screenId ? ' active' : ''}`}
              onClick={() => onSelectScreen(screen.screenId)}
            >

              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {screen.screenName || '(이름 없음)'}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm(`"${screen.screenName || '화면'}"을 삭제하시겠습니까?`)) {
                    onDeleteScreen(screen.screenId);
                  }
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#374151',
                  cursor: 'pointer',
                  fontSize: '12px',
                  padding: '2px 4px',
                  borderRadius: '3px',
                  flexShrink: 0,
                  lineHeight: 1,
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#f87171')}
                onMouseLeave={e => (e.currentTarget.style.color = '#374151')}
                title="삭제"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {/* 하단 버전 표시 */}
      <div style={{ padding: '10px 16px', borderTop: '1px solid #1e2535', fontSize: '0.65rem', color: '#374151' }}>
        v1.0 — Schema-Driven Builder
      </div>
    </div>
  );
};

export default ScreenListSidebar;
