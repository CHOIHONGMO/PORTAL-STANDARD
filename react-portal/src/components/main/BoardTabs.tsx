import { useState } from 'react';
import '@/components/main/main.css';

const MOCK_NOTICES = [
  { id: 1, title: '전자정부 표준프레임워크 v4.0.0 릴리즈 안내', desc: '새로운 스프링 부트 기반의 4.0.0 버전이 릴리즈 되었습니다.', date: '2026-06-11' },
  { id: 2, title: '경량환경 포털사이트 구축 가이드', desc: '경량환경 템플릿 프로젝트를 활용한 포털 구축 방법 안내입니다.', date: '2026-06-10' },
  { id: 3, title: '시스템 정기 점검 안내 (6/15)', desc: '안정적인 서비스 제공을 위해 정기 점검을 실시합니다.', date: '2026-06-08' },
];

const MOCK_FREEBOARD = [
  { id: 1, title: '안녕하세요! 가입인사 드립니다.', desc: '표준프레임워크 스터디를 시작하게 된 개발자입니다.', date: '2026-06-11' },
  { id: 2, title: 'React 전환 시 권장되는 폴더 구조가 있을까요?', desc: '현재 진행 중인 프로젝트의 폴더 구조를 고민 중입니다.', date: '2026-06-09' },
  { id: 3, title: '오류 해결에 도움주신 분들 감사합니다.', desc: '어제 올린 질문글에 답변 주신 분들 덕분에 해결했습니다.', date: '2026-06-07' },
];

const BoardTabs = () => {
  const [activeTab, setActiveTab] = useState<'notice' | 'free'>('notice');

  const currentList = activeTab === 'notice' ? MOCK_NOTICES : MOCK_FREEBOARD;

  return (
    <section className="dashboard glass">
      <div className="tab-header">
        <button 
          className={`tab-btn ${activeTab === 'notice' ? 'active' : ''}`}
          onClick={() => setActiveTab('notice')}
        >
          공지사항
        </button>
        <button 
          className={`tab-btn ${activeTab === 'free' ? 'active' : ''}`}
          onClick={() => setActiveTab('free')}
        >
          자유게시판
        </button>
      </div>

      <div className="tab-content">
        <ul className="board-list">
          {currentList.map(item => (
            <li key={item.id} className="board-item hover-lift">
              <a href="#detail">
                <div className="board-info">
                  <h3 className="board-title">{item.title}</h3>
                  <p className="board-desc">{item.desc}</p>
                </div>
                <span className="board-date">{item.date}</span>
              </a>
            </li>
          ))}
        </ul>
        <a href="#more" className="btn-more">
          <span>{activeTab === 'notice' ? '공지사항' : '자유게시판'} 더보기</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </section>
  );
};

export default BoardTabs;
