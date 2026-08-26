import { useState } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function AppLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const role = localStorage.getItem('demoUserRole') || 'admin';

  if (role === 'accountant') {
    const allowedPaths = ['/dashboard', '/students', '/classes', '/accountant', '/accounts', '/expenses', '/reports', '/notices', '/settings', '/record-payment'];
    const isAllowed = allowedPaths.some(p => location.pathname.startsWith(p));
    if (!isAllowed) {
      return <Navigate to="/accounts" replace />;
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile sidebar backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
      
      <Sidebar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
      
      <div className="flex-1 flex flex-col lg:pl-64 overflow-hidden">
        <Navbar toggleMobileMenu={() => setIsMobileMenuOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
