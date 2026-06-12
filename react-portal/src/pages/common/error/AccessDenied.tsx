import { useNavigate } from 'react-router-dom';
import '@/pages/pages.css';

const AccessDenied = () => {
  const navigate = useNavigate();

  return (
    <div className="container p_main error-container">
      <div className="error-card glass access-denied hover-lift">
        <div className="error-icon-wrapper">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            <circle cx="12" cy="16" r="1"></circle>
          </svg>
        </div>
        <h2 className="error-title">Access Denied</h2>
        <p className="error-message">
          세션이 만료되었거나 접근 권한이 없습니다.<br />
          허용되지 않는 요청을 하셨습니다.
        </p>
        <div className="error-actions">
          <button onClick={() => navigate(-1)} className="btn-back">이전페이지</button>
          <button onClick={() => navigate('/')} className="btn-home">메인으로</button>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
