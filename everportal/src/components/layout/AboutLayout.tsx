import { NavLink, Outlet } from 'react-router-dom';

const AboutLayout = () => {
  return (
    <div className="container p_main" style={{ display: 'flex', gap: '40px', marginTop: '40px', minHeight: '600px' }}>
      {/* Sidebar */}
      <aside style={{ width: '220px', flexShrink: 0 }}>
        <div className="glass" style={{ padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px', color: 'var(--text-main)', borderBottom: '2px solid var(--primary-color)', paddingBottom: '10px' }}>포털소개</h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li>
              <NavLink 
                to="/about" 
                end
                style={({ isActive }) => ({
                  color: isActive ? 'var(--primary-color)' : 'var(--text-muted)',
                  fontWeight: isActive ? '700' : '500',
                  textDecoration: 'none',
                  fontSize: '0.975rem',
                  display: 'block',
                  padding: '4px 0'
                })}
              >
                사이트소개
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about/history" 
                style={({ isActive }) => ({
                  color: isActive ? 'var(--primary-color)' : 'var(--text-muted)',
                  fontWeight: isActive ? '700' : '500',
                  textDecoration: 'none',
                  fontSize: '0.975rem',
                  display: 'block',
                  padding: '4px 0'
                })}
              >
                연혁
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about/organization" 
                style={({ isActive }) => ({
                  color: isActive ? 'var(--primary-color)' : 'var(--text-muted)',
                  fontWeight: isActive ? '700' : '500',
                  textDecoration: 'none',
                  fontSize: '0.975rem',
                  display: 'block',
                  padding: '4px 0'
                })}
              >
                조직소개
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about/location" 
                style={({ isActive }) => ({
                  color: isActive ? 'var(--primary-color)' : 'var(--text-muted)',
                  fontWeight: isActive ? '700' : '500',
                  textDecoration: 'none',
                  fontSize: '0.975rem',
                  display: 'block',
                  padding: '4px 0'
                })}
              >
                찾아오시는 길
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, minWidth: 0 }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AboutLayout;
