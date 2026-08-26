import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { BookOpen, User, Bell, LayoutDashboard, CreditCard, ClipboardList, LogOut } from 'lucide-react';
import clsx from 'clsx';

export default function ParentLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/parent/dashboard', icon: LayoutDashboard },
    { name: 'Fees', path: '/parent/fees', icon: CreditCard },
    { name: 'Homework', path: '/parent/homework', icon: ClipboardList },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile Topbar */}
      <div className="lg:hidden bg-primary-700 text-white flex items-center justify-between p-4 sticky top-0 z-50">
        <div className="flex items-center gap-2 font-bold text-lg">
          <BookOpen className="w-5 h-5" /> SchoolERP
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} /></svg>
        </button>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:flex bg-primary-700 text-white h-16 items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 font-bold text-xl">
            <BookOpen className="w-6 h-6" /> SchoolERP Parent
          </div>
          <nav className="flex gap-1">
            {navItems.map(item => (
              <Link 
                key={item.name} 
                to={item.path}
                className={clsx(
                  "px-4 py-2 rounded-md font-medium text-sm transition-colors flex items-center gap-2",
                  location.pathname === item.path ? "bg-primary-800 text-white" : "text-primary-100 hover:bg-primary-600"
                )}
              >
                <item.icon className="w-4 h-4" /> {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-primary-600 transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center gap-3 border-l border-primary-600 pl-4">
            <div className="w-8 h-8 rounded-full bg-white text-primary-700 flex items-center justify-center font-bold text-sm">
              R
            </div>
            <div className="text-sm">
              <p className="font-bold">Rajesh Sharma</p>
              <p className="text-primary-200 text-xs">Parent of Aarav</p>
            </div>
          </div>
          <Link to="/" className="ml-4 px-3 py-1.5 bg-white text-primary-700 rounded text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-1 border border-primary-600 shadow-sm">
            <LogOut className="w-4 h-4" /> Exit Demo
          </Link>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 shadow-sm absolute w-full z-40">
          <div className="p-4 space-y-2">
            {navItems.map(item => (
              <Link 
                key={item.name} 
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={clsx(
                  "flex items-center gap-3 p-3 rounded-lg font-medium",
                  location.pathname === item.path ? "bg-primary-50 text-primary-700" : "text-gray-600"
                )}
              >
                <item.icon className="w-5 h-5" /> {item.name}
              </Link>
            ))}
            <div className="pt-4 mt-2 border-t border-gray-100">
              <Link to="/" className="flex items-center justify-center w-full gap-2 p-3 bg-gray-100 text-gray-700 rounded-lg font-medium">
                <LogOut className="w-5 h-5" /> Exit to Login
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}
