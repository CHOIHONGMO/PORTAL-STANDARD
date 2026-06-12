import { useNavigate } from 'react-router-dom';
import '@/pages/pages.css';

const DataAccessFailure = () => {
  const navigate = useNavigate();

  return (
    <div className="container p_main error-container">
      <div className="error-card glass db-fail hover-lift">
        <div className="error-icon-wrapper">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
            <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path>
            <line x1="3" y1="12" x2="21" y2="12" stroke="#dc2626" strokeWidth="2" strokeDasharray="3 3"></line>
          </svg>
        </div>
        <h2 className="error-title">Database Error</h2>
        <p className="error-message">
          데이터 처리 중 오류가 발생하였습니다.<br />
          잠시 후 다시 시도해 주세요.
        </p>
        <div className="error-actions">
          <button onClick={() => navigate(-1)} className="btn-back">이전페이지</button>
          <button onClick={() => navigate('/')} className="btn-home">메인으로</button>
        </div>
      </div>
    </div>
  );
};

export default DataAccessFailure;
