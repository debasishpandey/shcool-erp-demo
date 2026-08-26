import { useState } from 'react';
import { ArrowLeft, Bell, Check, BookOpen, Clock, AlertTriangle, GraduationCap, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { parentNotifications } from '../../data/parentMockData';

export default function ParentNotifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(parentNotifications);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const getIconForType = (type) => {
    switch (type) {
      case 'Exam Reminder': return <GraduationCap size={20} className="text-purple-600" />;
      case 'Homework Reminder': return <BookOpen size={20} className="text-blue-600" />;
      case 'Fee Reminder': return <Clock size={20} className="text-orange-600" />;
      case 'Attendance Alert': return <AlertTriangle size={20} className="text-red-600" />;
      case 'School Notice': return <Bell size={20} className="text-primary-600" />;
      default: return <Bell size={20} className="text-gray-600" />;
    }
  };

  const getBgForType = (type) => {
    switch (type) {
      case 'Exam Reminder': return 'bg-purple-50 border-purple-100';
      case 'Homework Reminder': return 'bg-blue-50 border-blue-100';
      case 'Fee Reminder': return 'bg-orange-50 border-orange-100';
      case 'Attendance Alert': return 'bg-red-50 border-red-100';
      case 'School Notice': return 'bg-primary-50 border-primary-100';
      default: return 'bg-gray-50 border-gray-100';
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-20 relative">
      <div className="bg-white px-4 py-4 shadow-sm z-10 sticky top-0 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600">
            <ArrowLeft size={24} />
          </button>
          <h1 className="font-black text-gray-900 text-lg">Notifications</h1>
        </div>
        {unreadCount > 0 && (
          <button 
            onClick={markAllRead}
            className="text-xs font-bold text-primary-600 flex items-center gap-1 bg-primary-50 px-3 py-1.5 rounded-full"
          >
            <Check size={14} /> Mark all read
          </button>
        )}
      </div>

      <div className="p-4 space-y-3">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`p-4 rounded-2xl shadow-sm border transition-colors cursor-pointer active:scale-[0.99] ${
              notification.unread ? 'bg-white border-primary-200 shadow-[0_2px_10px_rgba(0,0,0,0.04)]' : 'bg-gray-50/50 border-gray-100'
            }`}
            onClick={() => {
              if (notification.unread) {
                setNotifications(notifications.map(n => 
                  n.id === notification.id ? { ...n, unread: false } : n
                ));
              }
            }}
          >
            <div className="flex gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border ${getBgForType(notification.type)}`}>
                {getIconForType(notification.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-[10px] font-black uppercase tracking-wider ${notification.unread ? 'text-primary-600' : 'text-gray-500'}`}>
                    {notification.type}
                  </span>
                  <span className="text-[10px] font-bold text-gray-400">{notification.date}</span>
                </div>
                <h3 className={`text-sm leading-tight mb-1 ${notification.unread ? 'font-black text-gray-900' : 'font-bold text-gray-700'}`}>
                  {notification.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
        
        {notifications.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="font-black text-gray-900 text-lg mb-1">All caught up!</h3>
            <p className="text-sm font-semibold text-gray-500">You have no new notifications.</p>
          </div>
        )}
      </div>
    </div>
  );
}
