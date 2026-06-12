import { Outlet } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Layout = () => {
  return (
    <div className="wrap">
      <Header />
      
      {/* The Outlet component is where the child routes will render */}
      <Outlet />

      <Footer />
    </div>
  );
};

export default Layout;
