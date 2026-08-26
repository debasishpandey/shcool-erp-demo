import { Home, Users, BookOpen, AlertCircle, Menu } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function TeacherBottomNav() {
  const navItems = [
    { name: 'Home', path: '/teacher/home', icon: Home },
    { name: 'Attendance', path: '/teacher/attendance', icon: Users },
    { name: 'Homework', path: '/teacher/homework', icon: BookOpen },
    { name: 'Concerns', path: '/teacher/concerns', icon: AlertCircle },
    { name: 'More', path: '/teacher/more', icon: Menu },
  ];

  return (
    <nav 
      className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-gray-200 z-[100] px-2 sm:px-4 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]"
      style={{ 
        height: 'var(--app-bottom-nav-height)', 
        paddingBottom: 'env(safe-area-inset-bottom)' 
      }}
    >
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full space-y-1 ${
              isActive ? 'text-primary-600' : 'text-gray-500 hover:text-gray-900'
            }`
          }
        >
          <item.icon size={22} strokeWidth={2.5} className="mb-0.5" />
          <span className="text-[10px] font-medium leading-none">{item.name}</span>
        </NavLink>
      ))}
    </nav>
  );
}
