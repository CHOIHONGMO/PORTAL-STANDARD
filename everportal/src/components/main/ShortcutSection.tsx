import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchMainPolls, type MainPollItem } from '@/api/mainApi';
import '@/components/main/main.css';

const ShortcutSection = () => {
  const [latestPoll, setLatestPoll] = useState<MainPollItem | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadPoll = async () => {
      try {
        const polls = await fetchMainPolls(1);
        if (isMounted && polls.length > 0) {
          setLatestPoll(polls[0]);
        }
      } catch (error) {
        console.error('설문조사 조회 실패:', error);
      }
    };

    loadPoll();

    return () => {
      isMounted = false;
    };
  }, []);

  const surveyLink = latestPoll?.id ? `/qustnr-respond/${latestPoll.id}/participate` : '/qustnr-respond';

  return (
    <div className="shortcut-section">
      {/* Solution Quick Service Card */}
      <div className="shortcut-card complaint hover-lift" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #172554 100%)', color: '#fff' }}>
        <div className="card-content">
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#93c5fd', letterSpacing: '1px' }}>
            QUICK ACCESS
          </span>
          <h2 style={{ color: '#fff', margin: '6px 0 16px 0' }}>
            전자구매 &amp; <span>업무 바로가기</span>
          </h2>
          <div className="shortcut-links">
            <Link to="/test/pr" className="btn-shortcut" style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }}>
              전자구매 관리
              <br />
              <strong style={{ color: '#60a5fa' }}>구매요청현황 (PR)</strong>
            </Link>
            <Link to="/qna/new" className="btn-shortcut" style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }}>
              솔루션 도입
              <br />
              <strong style={{ color: '#38bdf8' }}>데모 &amp; 견적 문의</strong>
            </Link>
          </div>
        </div>
      </div>

      {/* Survey & Feedback Card */}
      <div className="shortcut-card survey hover-lift">
        <div className="card-content">
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-color)', letterSpacing: '1px' }}>
            USER FEEDBACK
          </span>
          <h2 style={{ margin: '6px 0 12px 0' }}>
            포털 설문조사 <span>참여</span>
          </h2>
          {latestPoll ? (
            <>
              <p className="poll-title-highlight">
                <strong>{latestPoll.title}</strong>
              </p>
              {latestPoll.purpose && <p className="poll-purpose">{latestPoll.purpose}</p>}
            </>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              (주)에스티원즈 포털 및 전자구매 솔루션 서비스 품질 향상을 위한 설문조사에 참여해 주세요.
            </p>
          )}
          <Link to={surveyLink} className="btn-survey">
            설문 참여하기 &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShortcutSection;
