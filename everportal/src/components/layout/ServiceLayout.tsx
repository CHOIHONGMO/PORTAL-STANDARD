import { Outlet } from 'react-router-dom';

const ServiceLayout = () => {
  return (
    <div className="container p_main" style={{ marginTop: '40px', minHeight: '600px' }}>
      {/* Main Content */}
      <main style={{ minWidth: 0 }}>
        <Outlet />
      </main>
    </div>
  );
};

export default ServiceLayout;
