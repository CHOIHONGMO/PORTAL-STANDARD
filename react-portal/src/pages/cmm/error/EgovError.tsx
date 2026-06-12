import { useNavigate } from 'react-router-dom';
import '../../pages.css';

const EgovError = () => {
  const navigate = useNavigate();

  return (
    <div className="container p_main error-container">
      <div className="error-card glass gen-error hover-lift">
        <div className="error-icon-wrapper">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <h2 className="error-title">System Error</h2>
        <p className="error-message">
          알 수 없는 오류가 발생하였습니다.<br />
          지속적으로 발생할 경우 관리자에게 문의해 주세요.
        </p>
        <div className="error-actions">
          <button onClick={() => navigate(-1)} className="btn-back">이전페이지</button>
          <button onClick={() => navigate('/')} className="btn-home">메인으로</button>
        </div>
      </div>
    </div>
  );
};

export default EgovError;
