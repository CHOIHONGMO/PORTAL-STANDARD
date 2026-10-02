import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchMainNotices, type MainBoardArticle } from '@/api/mainApi';
import { newsList } from '@/common/stOnesData';
import '@/components/main/main.css';

const BoardTabs = () => {
  const [activeTab, setActiveTab] = useState<'notice' | 'news'>('notice');
  const [notices, setNotices] = useState<MainBoardArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const loadBoardData = async () => {
      setLoading(true);
      try {
        const noticeData = await fetchMainNotices(5);
        if (isMounted) {
          setNotices(noticeData);
        }
      } catch (error) {
        console.error('메인 게시판 데이터 로드 실패:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadBoardData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="dashboard glass">
      <div className="tab-header">
        <button
          type="button"
          className={`tab-btn ${activeTab === 'notice' ? 'active' : ''}`}
          onClick={() => setActiveTab('notice')}
        >
          공지사항 {notices.length > 0 && <span className="tab-badge">{notices.length}</span>}
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'news' ? 'active' : ''}`}
          onClick={() => setActiveTab('news')}
        >
          보도자료 / 뉴스 <span className="tab-badge" style={{ background: '#3b82f6', color: '#fff' }}>{newsList.length}</span>
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'notice' ? (
          loading ? (
            <div className="board-loading">
              <div className="loading-spinner"></div>
              <span>공지사항을 불러오는 중입니다...</span>
            </div>
          ) : notices.length === 0 ? (
            <div className="board-empty">
              <p>등록된 공지사항이 없습니다.</p>
            </div>
          ) : (
            <ul className="board-list">
              {notices.map((item) => (
                <li key={item.id} className="board-item hover-lift">
                  <Link to={`/board/notice/${item.id}`}>
                    <div className="board-info">
                      <h3 className="board-title">{item.title}</h3>
                      {item.content && <p className="board-desc">{item.content}</p>}
                    </div>
                    <div className="board-meta">
                      <span className="board-writer">{item.writer}</span>
                      <span className="board-date">{item.date}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )
        ) : (
          /* 에스티원즈 공식 보도자료 목록 */
          <ul className="board-list">
            {newsList.map((item) => (
              <li key={item.id} className="board-item hover-lift">
                <a 
                  href={item.url || 'https://www.st-ones.com'} 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{ textDecoration: 'none' }}
                >
                  <div className="board-info">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2563eb', background: '#dbeafe', padding: '2px 6px', borderRadius: '4px' }}>
                        {item.source || '언론보도'}
                      </span>
                      <h3 className="board-title" style={{ margin: 0 }}>{item.title}</h3>
                    </div>
                    <p className="board-desc">{item.desc}</p>
                  </div>
                  <div className="board-meta">
                    <span className="board-writer">에스티원즈 홍보팀</span>
                    <span className="board-date">{item.date}</span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
          {activeTab === 'notice' ? (
            <Link to="/board/notice" className="btn-more">
              <span>공지사항 전체보기</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <a href="https://www.st-ones.com/#news" target="_blank" rel="noreferrer" className="btn-more">
              <span>보도자료 원문 더보기 ↗</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default BoardTabs;
