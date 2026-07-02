import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LeftSidebar, { getActiveMenuId } from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';

const Layout = () => {
  const location = useLocation();
  const hasLnb = getActiveMenuId(location.pathname) !== null;
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  return (
    <div className="wrap">
      <Header />
      
      <div className={`layout-body-container ${hasLnb ? 'layout-has-lnb' : 'layout-no-lnb'}`}>
        {hasLnb && <LeftSidebar />}
        
        <main className="layout-main-content">
          <Outlet />
        </main>
        
        <RightSidebar isOpen={isRightSidebarOpen} onClose={() => setIsRightSidebarOpen(false)} />
      </div>

      {!isRightSidebarOpen && (
        <button 
          className="right-sidebar-toggle-btn"
          onClick={() => setIsRightSidebarOpen(true)}
          title="고객센터 & 알림 열기"
        >
          <span className="toggle-icon">📞</span>
          <span>고객센터 & 알림</span>
        </button>
      )}

      <Footer />
    </div>
  );
};

export default Layout;
