import { useNavigate } from 'react-router-dom';
import '@/pages/pages.css';

const EgovBizException = () => {
  const navigate = useNavigate();

  return (
    <div className="container p_main error-container">
      <div className="error-card glass biz-error hover-lift">
        <div className="error-icon-wrapper">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
          </svg>
        </div>
        <h2 className="error-title">Execution Error</h2>
        <p className="error-message">
          수행 중 오류가 발생하였습니다.<br />
          요청한 작업을 처리할 수 없습니다.
        </p>
        <div className="error-actions">
          <button onClick={() => navigate(-1)} className="btn-back">이전페이지</button>
          <button onClick={() => navigate('/')} className="btn-home">메인으로</button>
        </div>
      </div>
    </div>
  );
};

export default EgovBizException;
