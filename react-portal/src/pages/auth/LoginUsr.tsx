import { useNavigate } from 'react-router-dom';
import '@/pages/pages.css';

const LoginUsr = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 로그인 처리 후 메인으로 이동
    navigate('/');
  };

  return (
    <div className="container p_main login-container">
      <div className="login-card glass hover-lift">
        <div className="login-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
        <h2 className="login-title">포털 로그인</h2>
        <p className="login-desc">전자정부 표준프레임워크 포털에 오신 것을 환영합니다.</p>
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">아이디</label>
            <input type="text" className="form-input" placeholder="아이디를 입력하세요" required defaultValue="USER" />
          </div>
          <div className="form-group">
            <label className="form-label">비밀번호</label>
            <input type="password" className="form-input" placeholder="비밀번호를 입력하세요" required defaultValue="rhdxhd12" />
          </div>
          
          <button type="submit" className="btn-submit">로그인</button>
        </form>
      </div>
    </div>
  );
};

export default LoginUsr;
