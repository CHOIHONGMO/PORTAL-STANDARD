import { useNavigate } from 'react-router-dom';
import '../../pages.css';

const TransactionFailure = () => {
  const navigate = useNavigate();

  return (
    <div className="container p_main error-container">
      <div className="error-card glass db-fail hover-lift">
        <div className="error-icon-wrapper">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="2" y1="10" x2="22" y2="10"></line>
            <line x1="6" y1="14" x2="8" y2="14"></line>
            <line x1="10" y1="14" x2="14" y2="14"></line>
            <circle cx="18" cy="14" r="1.5" stroke="#dc2626" strokeWidth="1.5"></circle>
            <line x1="16.5" y1="12.5" x2="19.5" y2="15.5" stroke="#dc2626" strokeWidth="1.5"></line>
            <line x1="19.5" y1="12.5" x2="16.5" y2="15.5" stroke="#dc2626" strokeWidth="1.5"></line>
          </svg>
        </div>
        <h2 className="error-title">Transaction Failure</h2>
        <p className="error-message">
          트랜잭션 수행 중 오류가 발생하였습니다.<br />
          거래가 취소되었거나 정상적으로 처리되지 못했습니다.
        </p>
        <div className="error-actions">
          <button onClick={() => navigate(-1)} className="btn-back">이전페이지</button>
          <button onClick={() => navigate('/')} className="btn-home">메인으로</button>
        </div>
      </div>
    </div>
  );
};

export default TransactionFailure;
