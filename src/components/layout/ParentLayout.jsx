import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, CreditCard, Bell, Menu, LogOut, ChevronLeft } from 'lucide-react';
import clsx from 'clsx';
import { parentProfile, childProfile, parentNotifications } from '../../data/parentMockData';

export default function ParentLayout() {
  const location = useLocation();
  const isNested = location.pathname.split('/').length > 3 || location.pathname.includes('/receipt') || location.pathname.includes('/report-card');
  const unreadNotifs = parentNotifications.filter(n => n.unread).length;

  const navItems = [
    { name: 'Home', path: '/parent/dashboard', icon: Home },
    { name: 'Academics', path: '/parent/academics', icon: BookOpen },
    { name: 'Fees', path: '/parent/fees', icon: CreditCard },
    { name: 'Notices', path: '/parent/notifications', icon: Bell, badge: unreadNotifs },
    { name: 'More', path: '/parent/more', icon: Menu },
  ];

  return (
    <div className="min-h-screen bg-gray-900 md:flex md:items-center md:justify-center">
      {/* Mobile Container (Centered on Desktop) */}
      <div className="w-full h-screen md:h-[844px] md:w-[390px] bg-gray-50 md:rounded-[3rem] md:shadow-2xl md:overflow-hidden relative flex flex-col md:border-[8px] md:border-gray-800">
        
        {/* Dynamic Header */}
        {!isNested && (
          <div className="bg-primary-700 text-white px-4 pt-safe pb-4 sticky top-0 z-50 shadow-sm rounded-b-2xl">
            <div className="flex justify-between items-start mt-2">
              <div>
                <p className="text-primary-100 text-xs font-bold uppercase tracking-wider mb-0.5">Good evening, {parentProfile.name} 👋</p>
                <h1 className="font-black text-xl leading-tight">{childProfile.name}</h1>
                <p className="text-primary-100 text-sm font-semibold">{childProfile.school} • Class {childProfile.class}</p>
              </div>
              <Link to="/parent/notifications" className="p-2 bg-primary-800 rounded-full text-white relative hover:bg-primary-600 transition-colors">
                <Bell size={20} />
                {unreadNotifs > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-primary-800"></span>
                )}
              </Link>
            </div>
          </div>
        )}

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto no-scrollbar" style={{ paddingBottom: 'var(--app-bottom-space)' }}>
          <Outlet />
        </main>

        {/* Fixed Bottom Navigation */}
        <div 
          className="bg-white border-t border-gray-100 absolute bottom-0 left-0 right-0 z-[100] px-2 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]"
          style={{ height: 'var(--app-bottom-nav-height)', paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <div className="flex justify-around items-center h-full pt-1">
            {navItems.map((item) => {
              const isActive = location.pathname.includes(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className="flex flex-col items-center p-2 min-w-[64px] relative"
                >
                  <div className={clsx(
                    "p-1.5 rounded-xl transition-all duration-200 mb-1 relative",
                    isActive ? "bg-primary-50 text-primary-600" : "text-gray-400 hover:text-gray-600"
                  )}>
                    <item.icon size={22} className={isActive ? "stroke-[2.5]" : "stroke-2"} />
                    {item.badge > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className={clsx(
                    "text-[10px] font-bold tracking-wide transition-colors",
                    isActive ? "text-primary-700" : "text-gray-500"
                  )}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
