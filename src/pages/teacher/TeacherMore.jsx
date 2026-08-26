import { User, Calendar, Bell, MessageSquare, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { teacherProfile } from '../../data/teacherMockData';
import { useNavigate } from 'react-router-dom';

export default function TeacherMore() {
  const navigate = useNavigate();

  const menuItems = [
    { icon: <User size={20} />, label: 'Teacher Profile', action: () => alert('Profile demo') },
    { icon: <Calendar size={20} />, label: 'Events & Holidays', action: () => navigate('/teacher/events') },
    { icon: <Bell size={20} />, label: 'Notifications', action: () => navigate('/teacher/notifications') },
    { icon: <MessageSquare size={20} />, label: 'Parent Suggestions', action: () => navigate('/teacher/concerns') },
    { icon: <HelpCircle size={20} />, label: 'Help & Support', action: () => alert('Help demo') },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-20 relative">
      <div className="bg-white px-4 py-4 shadow-sm z-10 sticky top-0">
        <h1 className="font-black text-gray-900 text-lg">Menu</h1>
      </div>

      <div className="p-4 space-y-6">
        
        {/* Profile Card */}
        <div className="bg-primary-600 rounded-2xl p-4 flex items-center gap-4 text-white shadow-sm">
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
            <User size={28} />
          </div>
          <div>
            <h2 className="font-black text-xl">{teacherProfile.name}</h2>
            <p className="font-medium text-primary-100">{teacherProfile.role}</p>
            <p className="text-xs font-bold bg-white/20 inline-block px-2 py-0.5 rounded mt-1 uppercase tracking-wider">
              {teacherProfile.classTeacherOf}
            </p>
          </div>
        </div>

        {/* Menu List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {menuItems.map((item, idx) => (
            <div 
              key={item.label}
              onClick={item.action}
              className={`p-4 flex items-center justify-between active:bg-gray-50 cursor-pointer transition-colors ${
                idx !== menuItems.length - 1 ? 'border-b border-gray-50' : ''
              }`}
            >
              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500">
                  {item.icon}
                </div>
                <span className="font-bold">{item.label}</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          ))}
        </div>

        {/* Exit Demo */}
        <div 
          onClick={() => navigate('/login')}
          className="bg-white rounded-2xl shadow-sm border border-red-100 p-4 flex items-center justify-between active:bg-red-50 cursor-pointer transition-colors group"
        >
          <div className="flex items-center gap-3 text-red-600">
            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center group-active:bg-red-100 transition-colors">
              <LogOut size={20} />
            </div>
            <span className="font-bold">Exit Demo</span>
          </div>
          <ChevronRight size={20} className="text-red-300" />
        </div>

      </div>
    </div>
  );
}
