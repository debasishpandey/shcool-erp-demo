import { useState } from 'react';
import { ArrowLeft, Check, Info, Calendar, BookOpen, MessageSquare, Users, CheckCheck, X } from 'lucide-react';
import { notificationsList } from '../../data/teacherMockData';
import { useNavigate } from 'react-router-dom';

export default function TeacherNotifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(notificationsList);
  const [selectedNotif, setSelectedNotif] = useState(null);

  const getIcon = (type) => {
    switch (type) {
      case 'Event': return <Calendar size={18} className="text-purple-600" />;
      case 'Academic': return <BookOpen size={18} className="text-blue-600" />;
      case 'Parent Message': return <MessageSquare size={18} className="text-green-600" />;
      case 'Staff Notice': return <Users size={18} className="text-orange-600" />;
      default: return <Info size={18} className="text-gray-600" />;
    }
  };

  const getIconBg = (type) => {
    switch (type) {
      case 'Event': return 'bg-purple-100';
      case 'Academic': return 'bg-blue-100';
      case 'Parent Message': return 'bg-green-100';
      case 'Staff Notice': return 'bg-orange-100';
      default: return 'bg-gray-100';
    }
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const handleNotificationClick = (notif) => {
    setNotifications(notifications.map(n => n.id === notif.id ? { ...n, unread: false } : n));
    setSelectedNotif(notif);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-20 relative">
      <div className="bg-white px-4 py-4 shadow-sm z-10 sticky top-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600">
            <ArrowLeft size={24} />
          </button>
          <h1 className="font-black text-gray-900 text-lg">Notifications</h1>
        </div>
        <button onClick={markAllRead} className="flex items-center gap-1 text-sm font-bold text-primary-600 hover:text-primary-700">
          <CheckCheck size={16} /> Mark all read
        </button>
      </div>

      <div className="p-4 space-y-2">
        {notifications.map(notif => (
          <div 
            key={notif.id}
            onClick={() => handleNotificationClick(notif)}
            className={`p-4 rounded-2xl flex gap-3 shadow-sm border transition-colors cursor-pointer ${
              notif.unread ? 'bg-primary-50/50 border-primary-100' : 'bg-white border-gray-100 active:bg-gray-50'
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${getIconBg(notif.type)}`}>
              {getIcon(notif.type)}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className={`font-bold text-sm ${notif.unread ? 'text-gray-900' : 'text-gray-800'}`}>
                  {notif.title}
                </h3>
                {notif.unread && <span className="w-2 h-2 rounded-full bg-primary-500 mt-1.5 shrink-0"></span>}
              </div>
              <p className={`text-xs mb-2 line-clamp-2 ${notif.unread ? 'text-gray-700 font-medium' : 'text-gray-500'}`}>
                {notif.description}
              </p>
              <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                <span>{notif.type}</span>
                <span>{notif.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedNotif && (
        <div className="fixed inset-0 bg-gray-900/40 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-[480px] rounded-t-3xl p-6 pb-safe shadow-2xl flex flex-col max-h-[80vh]">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-wider">
                {getIcon(selectedNotif.type)} {selectedNotif.type}
              </div>
              <button onClick={() => setSelectedNotif(null)} className="p-2 bg-gray-100 rounded-full text-gray-600">
                <X size={20} />
              </button>
            </div>
            
            <div className="overflow-y-auto">
              <h2 className="font-black text-gray-900 text-xl mb-2">{selectedNotif.title}</h2>
              <p className="text-sm font-bold text-primary-600 mb-6">{selectedNotif.date}</p>
              
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-gray-800 text-sm font-medium leading-relaxed">
                {selectedNotif.description}
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-100">
              <button 
                onClick={() => setSelectedNotif(null)}
                className="w-full bg-primary-600 text-white py-3.5 rounded-xl font-bold shadow-sm hover:bg-primary-700"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
