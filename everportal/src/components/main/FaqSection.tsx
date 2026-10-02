import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchMainFaqs, type MainFaqArticle } from '@/api/mainApi';
import '@/components/main/main.css';

const FaqSection = () => {
  const [faqList, setFaqList] = useState<MainFaqArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const loadFaqs = async () => {
      setLoading(true);
      try {
        const data = await fetchMainFaqs(3);
        if (isMounted) {
          setFaqList(data);
        }
      } catch (error) {
        console.error('메인 FAQ 로드 실패:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadFaqs();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="faq-section glass">
      <div className="section-head">
        <h2>
          자주하는 질문 <span className="highlight">FAQ</span>
        </h2>
        <p>표준프레임워크 경량화 서비스에 대한 자주하는 질문의 답변들을 볼 수 있습니다.</p>
      </div>

      <div className="faq-list">
        {loading ? (
          <div className="board-loading">
            <div className="loading-spinner"></div>
            <span>FAQ를 불러오는 중입니다...</span>
          </div>
        ) : faqList.length === 0 ? (
          <div className="board-empty">
            <p>등록된 자주하는 질문이 없습니다.</p>
          </div>
        ) : (
          faqList.map((item) => (
            <dl key={item.id} className="faq-item">
              <dt>
                <span className="icon-q">Q</span>
                <Link to={`/faq/${item.id}`}>{item.question}</Link>
              </dt>
              <dd>
                <span className="icon-a">A</span>
                <p>{item.answer || '상세 내용을 확인하려면 클릭하세요.'}</p>
              </dd>
            </dl>
          ))
        )}
      </div>

      <Link to="/faq" className="btn-outline-more">
        FAQ 더보기
      </Link>
    </div>
  );
};

export default FaqSection;
