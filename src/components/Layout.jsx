import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => (
  <div className="flex min-h-screen flex-col bg-[#f7faf9] text-slate-900">
    <Navbar />
    <main className="min-h-0 flex-1 p-4">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;
