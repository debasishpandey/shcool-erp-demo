import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, Users, BookOpen, UserCheck, 
  CreditCard, FileText, Award, Calendar, 
  Bell, MessageSquare, BarChart2, Settings,
  LogOut, ClipboardList, FolderOpen, UserPlus, MonitorSmartphone
} from 'lucide-react';
import clsx from 'clsx';

const navGroups = [
  {
    title: "DASHBOARD",
    items: [
      { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard }
    ]
  },
  {
    title: "ACADEMIC",
    items: [
      { name: 'Students', path: '/students', icon: Users },
      { name: 'Admissions', path: '/admissions', icon: UserPlus },
      { name: 'Teachers', path: '/teachers', icon: BookOpen },
      { name: 'Classes', path: '/classes', icon: BookOpen },
      { name: 'Attendance', path: '/attendance', icon: UserCheck },
      { name: 'Timetable', path: '/timetable', icon: Calendar },
      { name: 'Homework', path: '/homework', icon: ClipboardList },
      { name: 'Examinations', path: '/exams', icon: FileText },
      { name: 'Results', path: '/results', icon: Award },
    ]
  },
  {
    title: "FINANCE",
    items: [
      { name: 'Accounts', path: '/accounts', icon: CreditCard },
      { name: 'Expenses', path: '/expenses', icon: FileText },
      { name: 'Reports', path: '/reports', icon: BarChart2 },
    ]
  },
  {
    title: "COMMUNICATION",
    items: [
      { name: 'Notices', path: '/notices', icon: Bell },
      { name: 'Communication', path: '/communication', icon: MessageSquare },
    ]
  },
  {
    title: "RECORDS",
    items: [
      { name: 'Documents', path: '/documents', icon: FolderOpen },
    ]
  },
  {
    title: "PORTAL",
    items: [
      { name: 'Parent Portal', path: '/parent/dashboard', icon: MonitorSmartphone },
    ]
  },
  {
    title: "SETTINGS",
    items: [
      { name: 'Settings', path: '/settings', icon: Settings },
    ]
  }
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const role = localStorage.getItem('demoUserRole') || 'admin';

  const roleFilteredNavGroups = navGroups.map(group => {
    if (role === 'admin') return group;
    
    if (role === 'accountant') {
      const allowedPaths = ['/dashboard', '/students', '/classes', '/accountant', '/accounts', '/expenses', '/reports', '/notices', '/settings'];
      const filteredItems = group.items.filter(item => allowedPaths.includes(item.path));
      if (filteredItems.length > 0) {
        return { ...group, items: filteredItems };
      }
      return null;
    }
    return group;
  }).filter(Boolean);

  let profileName = "Admin";
  let profileRole = "Administrator";
  let profileInitial = "A";
  
  if (role === 'accountant') {
    profileName = "Ravi Kumar";
    profileRole = "Accounts & Finance";
    profileInitial = "R";
  } else if (role === 'teacher') {
    profileName = "Teacher";
    profileRole = "Faculty";
    profileInitial = "T";
  } else if (role === 'parent') {
    profileName = "Parent";
    profileRole = "Parent Portal";
    profileInitial = "P";
  }

  return (
    <div className={clsx(
      "flex flex-col w-64 bg-white border-r border-gray-200 h-screen fixed top-0 left-0 z-50 transition-transform duration-300 ease-in-out lg:translate-x-0",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="flex items-center justify-between h-16 border-b border-gray-200 px-6 lg:justify-center">
        <h1 className="text-xl font-bold text-primary-700 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-primary-600" />
          SchoolERP
        </h1>
        <button 
          className="lg:hidden text-gray-500 hover:text-gray-700"
          onClick={() => setIsOpen(false)}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto py-4 sidebar-scroll">
        <nav className="space-y-4 px-3">
          {roleFilteredNavGroups.map((group, idx) => (
            <div key={idx}>
              <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                {group.title}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => clsx(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive 
                        ? "bg-primary-50 text-primary-700" 
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    )}
                  >
                    <item.icon className={clsx("mr-3 h-5 w-5 flex-shrink-0")} />
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                {profileInitial}
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{profileName}</p>
              <p className="text-xs font-medium text-gray-500">{profileRole}</p>
            </div>
          </div>
          <Link to="/login" className="text-gray-400 hover:text-red-600 transition-colors p-2 rounded-md hover:bg-red-50 hidden lg:block" title="Logout">
            <LogOut className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
