import { useState } from 'react';
import { Link } from 'react-router-dom';
import IntroModal from '@/components/main/IntroModal';
import '@/components/layout/layout.css';

const Header = () => {
  const [isIntroOpen, setIsIntroOpen] = useState(false);

  return (
    <header className="header glass">
      <div className="container header-container">
        <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link to="/">
            <span className="logo-icon"></span>
            <strong>ST-ones</strong> Portal
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
            <li><Link to="/qna" className="nav-item">Q&A</Link></li>
            <li><Link to="/qustnr-respond" className="nav-item">설문참여</Link></li>
            <li className="dropdown">
              <span className="nav-item dropdown-trigger">사이트 관리</span>
              <ul className="dropdown-menu">
                <li><Link to="/admin/member">회원관리</Link></li>
                <li><Link to="/admin/board">게시판생성관리</Link></li>
                <li><Link to="/admin/usage">게시판사용관리</Link></li>
                <li><Link to="/admin/template">템플릿관리</Link></li>
                <li><Link to="/admin/qna">Q&A답변관리</Link></li>
                <li><Link to="/admin/qustnr">설문지관리</Link></li>
                <li><Link to="/admin/qustnr-tmplat">설문템플릿관리</Link></li>
                <li><Link to="/admin/qustnr-respond-info">설문응답결과</Link></li>
                <li><Link to="/admin/qustnr-respond-manage">설문응답자정보</Link></li>
                <li><Link to="/admin/policy">개인정보보호</Link></li>
                <li><Link to="/admin/stplat">약관관리</Link></li>
              </ul>
            </li>
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
