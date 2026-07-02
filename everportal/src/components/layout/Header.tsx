import { Link, useLocation } from 'react-router-dom';
import { menuData } from '@/common/menuData';
import { getActiveMenuId } from '@/components/layout/LeftSidebar';
import '@/components/layout/layout.css';

const Header = () => {
  const location = useLocation();
  const activeMenuId = getActiveMenuId(location.pathname);

  return (
    <>
      {/* USWDS Official Website Banner */}
      <div className="usa-banner">
        <div className="layout-container usa-banner-container">
          <div className="usa-banner-inner">
            <span className="usa-banner-flag">🇰🇷</span>
            <p className="usa-banner-text">
              <strong>ST-ones Portal</strong>은 공식 웹사이트 서비스 플랫폼입니다.
            </p>
          </div>
        </div>
      </div>

      <header className="header glass">
        <div className="layout-container header-container">
          <div className="logo">
            <Link to="/">
              <span className="logo-icon"></span>
              <strong>ST-ones</strong> Portal
            </Link>
          </div>
          <nav className="gnb">
            <ul>
              {menuData.map((menu) => {
                const isActive = activeMenuId === menu.id;
                return (
                  <li key={menu.id}>
                    <Link 
                      to={menu.path} 
                      className={`nav-item ${isActive ? 'active' : ''}`}
                    >
                      {menu.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="header-utils">
            <Link to="/login" className="btn-login">로그인</Link>
            <Link to="/signup" className="btn-signup">회원가입</Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
