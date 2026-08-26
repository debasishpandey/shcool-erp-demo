import { Bell, User } from 'lucide-react';
import { teacherProfile, notificationsList } from '../../data/teacherMockData';
import { useNavigate } from 'react-router-dom';

export default function TeacherHeader() {
  const navigate = useNavigate();
  const unreadCount = notificationsList.filter(n => n.unread).length;

  return (
    <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between z-10 shadow-sm sticky top-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
          <User size={20} />
        </div>
        <div>
          <h1 className="font-semibold text-gray-900 leading-tight">
            Good morning, {teacherProfile.name.split(' ')[0]} 👋
          </h1>
          <p className="text-xs text-gray-500 font-medium">
            {teacherProfile.role} • {teacherProfile.classTeacherOf}
          </p>
        </div>
      </div>
      <button 
        onClick={() => navigate('/teacher/notifications')}
        className="p-2 rounded-full hover:bg-gray-50 relative text-gray-600"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-red-500 text-white rounded-full border-2 border-white flex items-center justify-center text-[8px] font-black">
            {unreadCount}
          </span>
        )}
      </button>
    </header>
  );
}
