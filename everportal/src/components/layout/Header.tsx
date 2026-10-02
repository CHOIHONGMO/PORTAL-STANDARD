import { Link, useLocation } from 'react-router-dom';
import { menuData } from '@/common/menuData';
import { getActiveMenuId } from '@/components/layout/LeftSidebar';
import '@/components/layout/layout.css';

const Header = () => {
  const location = useLocation();
  const activeMenuId = getActiveMenuId(location.pathname);

  return (
    <>
      {/* Official Top Banner */}
      <div className="usa-banner" style={{ background: '#0f172a', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="layout-container usa-banner-container" style={{ padding: '4px 20px', minHeight: '32px' }}>
          <div className="usa-banner-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', fontSize: '0.8rem', color: '#94a3b8' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '16px', height: '16px', borderRadius: '50%', background: '#3b82f6', color: '#fff', fontSize: '10px', fontWeight: 'bold' }}>ST</span>
              <span><strong>(주)에스티원즈</strong> 전자구매 및 AI 공급망 관리(SCM) 통합 포털</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <a href="https://www.st-ones.com" target="_blank" rel="noreferrer" style={{ color: '#38bdf8', textDecoration: 'none' }}>
                공식 홈페이지 ↗
              </a>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
              <span>문의: 02-6959-2625</span>
            </div>
          </div>
        </div>
      </div>

      <header className="header glass">
        <div className="layout-container header-container">
          <div className="logo">
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              <span className="logo-icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: '#fff', fontWeight: 900, fontSize: '16px', boxShadow: '0 2px 8px rgba(37,99,235,0.3)' }}>
                S
              </span>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.5px', lineHeight: 1.1 }}>
                  ST-ones
                </span>
                <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--primary-color)', letterSpacing: '0.5px' }}>
                  PORTAL SYSTEM
                </span>
              </div>
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
            <Link to="/about/solutions" className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.85rem', textDecoration: 'none', borderRadius: '6px', border: '1px solid var(--border-color)', color: 'var(--text-main)', background: 'var(--surface-color)', marginRight: '6px' }}>
              솔루션 안내
            </Link>
            <Link to="/login" className="btn-login">로그인</Link>
            <Link to="/signup" className="btn-signup">회원가입</Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
