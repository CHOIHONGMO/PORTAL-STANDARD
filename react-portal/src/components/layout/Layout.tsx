import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

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
