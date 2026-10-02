import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchMainNotices, fetchMainFreeArticles, type MainBoardArticle } from '@/api/mainApi';
import '@/components/main/main.css';

const BoardTabs = () => {
  const [activeTab, setActiveTab] = useState<'notice' | 'free'>('notice');
  const [notices, setNotices] = useState<MainBoardArticle[]>([]);
  const [freeArticles, setFreeArticles] = useState<MainBoardArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const loadBoardData = async () => {
      setLoading(true);
      try {
        const [noticeData, freeData] = await Promise.all([
          fetchMainNotices(5),
          fetchMainFreeArticles(5),
        ]);

        if (isMounted) {
          setNotices(noticeData);
          setFreeArticles(freeData);
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

  const currentList = activeTab === 'notice' ? notices : freeArticles;
  const moreLink = '/board/notice';
  const detailLinkPrefix = '/board/notice/';

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
          className={`tab-btn ${activeTab === 'free' ? 'active' : ''}`}
          onClick={() => setActiveTab('free')}
        >
          자유게시판 {freeArticles.length > 0 && <span className="tab-badge">{freeArticles.length}</span>}
        </button>
      </div>

      <div className="tab-content">
        {loading ? (
          <div className="board-loading">
            <div className="loading-spinner"></div>
            <span>게시물을 불러오는 중입니다...</span>
          </div>
        ) : currentList.length === 0 ? (
          <div className="board-empty">
            <p>등록된 게시물이 없습니다.</p>
          </div>
        ) : (
          <ul className="board-list">
            {currentList.map((item) => (
              <li key={item.id} className="board-item hover-lift">
                <Link to={`${detailLinkPrefix}${item.id}`}>
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
        )}

        <Link to={moreLink} className="btn-more">
          <span>{activeTab === 'notice' ? '공지사항' : '자유게시판'} 더보기</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default BoardTabs;
