import { useNavigate } from 'react-router-dom';
import { User, Calendar, Bell, MessageSquare, Receipt, HelpCircle, LogOut, ChevronRight } from 'lucide-react';

export default function ParentMore() {
  const navigate = useNavigate();

  const menuItems = [
    { icon: <User size={20} />, label: 'Child Profile', action: () => navigate('/parent/child-profile') },
    { icon: <Calendar size={20} />, label: 'Events & Holidays', action: () => navigate('/parent/events') },
    { icon: <Bell size={20} />, label: 'School Notices', action: () => navigate('/parent/notices') },
    { icon: <MessageSquare size={20} />, label: 'My Suggestions', action: () => navigate('/parent/feedback') },
    { icon: <Receipt size={20} />, label: 'Fee Receipts', action: () => navigate('/parent/receipt') },
    { icon: <HelpCircle size={20} />, label: 'Help', action: () => alert('Help demo') },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-20 relative">
      <div className="bg-white px-4 py-4 shadow-sm z-10 sticky top-0 border-b border-gray-100">
        <h1 className="font-black text-gray-900 text-lg">More</h1>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={item.action}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                  {item.icon}
                </div>
                <span className="font-bold text-gray-700">{item.label}</span>
              </div>
              <ChevronRight size={20} className="text-gray-300 group-hover:text-primary-400 transition-colors" />
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate('/login')}
          className="w-full flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-red-100 hover:bg-red-50 active:bg-red-100 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-red-100 transition-colors">
              <LogOut size={20} />
            </div>
            <span className="font-bold text-red-600">Exit Demo</span>
          </div>
        </button>
      </div>
    </div>
  );
}
