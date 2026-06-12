import { useState } from 'react';
import { Link } from 'react-router-dom';
import IntroModal from '../main/IntroModal';
import './layout.css';

const Header = () => {
  const [isIntroOpen, setIsIntroOpen] = useState(false);

  return (
    <header className="header glass">
      <div className="container header-container">
        <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link to="/">
            <span className="logo-icon"></span>
            <strong>eGov</strong>Framework
          </Link>
          <button 
            onClick={() => setIsIntroOpen(true)}
            style={{ 
              background: 'none', border: 'none', padding: 0, cursor: 'pointer',
              display: 'flex', alignItems: 'center'
            }}
            title="메뉴구성 설명"
          >
            <img src="/images/ico_question.png" alt="메뉴구성 설명" style={{ width: '18px', height: '18px' }} />
          </button>
        </div>
        <nav className="gnb">
          <ul>
            <li><Link to="/about" className="nav-item">포털소개</Link></li>
            <li><Link to="/service/issuance" className="nav-item">민원광장</Link></li>
            <li><Link to="/board/notice" className="nav-item">정보마당</Link></li>
            <li><Link to="/faq" className="nav-item">고객지원</Link></li>
            <li><Link to="/admin/member" className="nav-item">회원관리</Link></li>
            <li><Link to="/admin/board" className="nav-item">게시판생성관리</Link></li>
            <li><Link to="/admin/usage" className="nav-item">게시판사용관리</Link></li>
            <li><Link to="/admin/template" className="nav-item">템플릿관리</Link></li>
          </ul>
        </nav>
        <div className="header-utils">
          <Link to="/login" className="btn-login">로그인</Link>
          <Link to="/signup" className="btn-signup">회원가입</Link>
        </div>
      </div>

      <IntroModal isOpen={isIntroOpen} onClose={() => setIsIntroOpen(false)} />
    </header>
  );
};

export default Header;
