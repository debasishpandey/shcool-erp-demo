import { ArrowLeft, Bell, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { parentNotices } from '../../data/parentMockData';

export default function ParentNotices() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-20 relative">
      <div className="bg-white px-4 py-4 shadow-sm z-10 sticky top-0 border-b border-gray-100 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-black text-gray-900 text-lg">School Notices</h1>
      </div>

      <div className="p-4 space-y-4">
        {parentNotices.map((notice) => (
          <div key={notice.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-primary-50 px-4 py-2 border-b border-primary-100 flex justify-between items-center">
              <span className="text-[10px] font-black text-primary-700 uppercase tracking-wider">{notice.category}</span>
              <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1">
                <Calendar size={12} /> {notice.date}
              </span>
            </div>
            <div className="p-4">
              <div className="flex gap-3 mb-2">
                <div className="mt-0.5 text-primary-600">
                  <Bell size={20} />
                </div>
                <div>
                  <h3 className="font-black text-gray-900 text-base leading-tight mb-2">{notice.title}</h3>
                  <p className="text-sm font-medium text-gray-600 leading-relaxed mb-3">
                    {notice.message}
                  </p>
                  {notice.details && (
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-xs font-bold text-gray-700">
                      {notice.details}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
