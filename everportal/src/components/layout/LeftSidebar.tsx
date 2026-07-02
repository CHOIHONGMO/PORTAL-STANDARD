import { useLocation, Link } from 'react-router-dom';
import { menuData } from '@/common/menuData';

export const getActiveMenuId = (pathname: string): string | null => {
  if (pathname === '/' || pathname === '/login' || pathname === '/signup') return null;
  if (pathname.startsWith('/about') || pathname.startsWith('/board/notice')) return 'about';
  if (pathname.startsWith('/service') || pathname.startsWith('/qustnr-respond')) return 'service';
  if (pathname.startsWith('/faq') || pathname.startsWith('/qna')) return 'support';
  if (pathname.startsWith('/admin')) return 'admin';
  if (pathname.startsWith('/test')) return 'test';
  return null;
};

const LeftSidebar = () => {
  const location = useLocation();
  const activeMenuId = getActiveMenuId(location.pathname);

  if (!activeMenuId) return null;

  const currentMenu = menuData.find((menu) => menu.id === activeMenuId);
  if (!currentMenu) return null;

  return (
    <aside className="lnb-sidebar usa-sidenav-container">
      <div className="usa-sidenav-header">
        <h2>{currentMenu.title}</h2>
      </div>
      <nav className="usa-sidenav">
        {currentMenu.categories.map((category, catIdx) => (
          <div key={catIdx} className="usa-sidenav-group">
            <h3 className="usa-sidenav-cat-title">{category.title}</h3>
            <ul className="usa-sidenav-list">
              {category.items.map((item, itemIdx) => {
                const isActive = location.pathname === item.path || 
                  (item.path !== '/' && location.pathname.startsWith(item.path + '/')) ||
                  (item.path === '/board/notice' && location.pathname.startsWith('/board/notice')) ||
                  (item.path === '/qna' && location.pathname.startsWith('/qna')) ||
                  (item.path === '/faq' && location.pathname.startsWith('/faq')) ||
                  (item.path === '/qustnr-respond' && location.pathname.startsWith('/qustnr-respond'));

                return (
                  <li key={itemIdx} className="usa-sidenav-item">
                    <Link
                      to={item.path}
                      className={`usa-sidenav-link ${isActive ? 'usa-current' : ''}`}
                    >
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default LeftSidebar;
