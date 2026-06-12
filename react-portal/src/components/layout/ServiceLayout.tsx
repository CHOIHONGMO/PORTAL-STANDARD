import { NavLink, Outlet } from 'react-router-dom';

const ServiceLayout = () => {
  return (
    <div className="container p_main" style={{ display: 'flex', gap: '40px', marginTop: '40px', minHeight: '600px' }}>
      {/* Sidebar */}
      <aside style={{ width: '220px', flexShrink: 0 }}>
        <div className="glass" style={{ padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px', color: 'var(--text-main)', borderBottom: '2px solid var(--primary-color)', paddingBottom: '10px' }}>민원광장</h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li>
              <NavLink 
                to="/service/issuance" 
                style={({ isActive }) => ({
                  color: isActive ? 'var(--primary-color)' : 'var(--text-muted)',
                  fontWeight: isActive ? '700' : '500',
                  textDecoration: 'none',
                  fontSize: '0.975rem',
                  display: 'block',
                  padding: '4px 0'
                })}
              >
                민원발급
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/service/apply" 
                style={({ isActive }) => ({
                  color: isActive ? 'var(--primary-color)' : 'var(--text-muted)',
                  fontWeight: isActive ? '700' : '500',
                  textDecoration: 'none',
                  fontSize: '0.975rem',
                  display: 'block',
                  padding: '4px 0'
                })}
              >
                민원신청
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/service/result" 
                style={({ isActive }) => ({
                  color: isActive ? 'var(--primary-color)' : 'var(--text-muted)',
                  fontWeight: isActive ? '700' : '500',
                  textDecoration: 'none',
                  fontSize: '0.975rem',
                  display: 'block',
                  padding: '4px 0'
                })}
              >
                민원결과확인
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

export default ServiceLayout;
