import { useNavigate } from 'react-router-dom';
import { User, CheckCircle2, AlertCircle, BookOpen, CreditCard, Calendar, Bell, ChevronRight, GraduationCap, Clock } from 'lucide-react';
import { childProfile, childPerformance, parentEvents, parentNotices } from '../../data/parentMockData';

export default function ParentDashboard() {
  const navigate = useNavigate();
  const upcomingEvents = parentEvents.slice(0, 2);
  const notices = parentNotices.slice(0, 2);

  return (
    <div className="p-4 space-y-6">
      
      {/* Top Child Card */}
      <section>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-primary-100 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-50 rounded-full opacity-50"></div>
          
          <div className="flex justify-between items-start relative z-10">
            <div className="flex gap-4 items-center">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center font-black text-gray-400 text-xl border-2 border-white shadow-sm">
                <User size={28} />
              </div>
              <div>
                <h2 className="font-black text-gray-900 text-xl">{childProfile.name}</h2>
                <p className="text-primary-700 font-bold text-xs uppercase tracking-wider mt-0.5">
                  Class {childProfile.class} • Roll No. {childProfile.rollNo}
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-2 relative z-10 pt-2 border-t border-gray-50">
            <div className="text-center">
              <span className="block text-lg font-black text-green-600">{childPerformance.attendance.percentage}%</span>
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Attendance</span>
            </div>
            <div className="text-center border-l border-gray-100">
              <span className="block text-lg font-black text-gray-900">4/5</span>
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Homework</span>
            </div>
            <div className="text-center border-l border-gray-100">
              <span className="block text-lg font-black text-primary-600">{childPerformance.overall.percentage}%</span>
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Overall</span>
            </div>
            <div className="text-center border-l border-gray-100">
              <span className="block text-lg font-black text-orange-600">₹6k</span>
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Fee Due</span>
            </div>
          </div>
        </div>
      </section>

      {/* Today's Highlights */}
      <section>
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Today's Highlights</h2>
        <div className="grid grid-cols-2 gap-3">
          <div onClick={() => navigate('/parent/attendance')} className="bg-white p-3 rounded-xl border border-gray-100 flex flex-col gap-2 cursor-pointer active:bg-gray-50">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle2 size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">Attendance</span>
            </div>
            <p className="font-black text-gray-900 text-sm">Present today ✓</p>
          </div>
          
          <div onClick={() => navigate('/parent/homework')} className="bg-white p-3 rounded-xl border border-gray-100 flex flex-col gap-2 cursor-pointer active:bg-gray-50">
            <div className="flex items-center gap-2 text-blue-600">
              <BookOpen size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">Homework</span>
            </div>
            <p className="font-black text-gray-900 text-sm">1 pending</p>
          </div>

          <div onClick={() => navigate('/parent/academics')} className="bg-white p-3 rounded-xl border border-gray-100 flex flex-col gap-2 cursor-pointer active:bg-gray-50">
            <div className="flex items-center gap-2 text-purple-600">
              <GraduationCap size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">Exam</span>
            </div>
            <p className="font-black text-gray-900 text-sm">Math on 28 Aug</p>
          </div>

          <div onClick={() => navigate('/parent/fees')} className="bg-white p-3 rounded-xl border border-orange-200 bg-orange-50/30 flex flex-col gap-2 cursor-pointer active:bg-orange-50">
            <div className="flex items-center gap-2 text-orange-600">
              <CreditCard size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">Fees</span>
            </div>
            <p className="font-black text-gray-900 text-sm">₹6,000 due</p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Upcoming Events</h2>
          <button onClick={() => navigate('/parent/events')} className="text-xs font-bold text-primary-600">View All</button>
        </div>
        <div className="space-y-2">
          {upcomingEvents.map(event => (
            <div key={event.id} onClick={() => navigate('/parent/events')} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3 cursor-pointer active:bg-gray-50">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Calendar size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm leading-tight">{event.title}</h3>
                <p className="text-xs text-gray-500 font-medium mt-0.5">{event.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* School Notices */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">School Notices</h2>
          <button onClick={() => navigate('/parent/notices')} className="text-xs font-bold text-primary-600">View All</button>
        </div>
        <div className="space-y-3">
          {notices.map(notice => (
            <div key={notice.id} onClick={() => navigate('/parent/notices')} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-2 cursor-pointer active:bg-gray-50">
              <div className="flex items-center gap-2">
                <Bell size={14} className="text-primary-600" />
                <h3 className="font-black text-gray-900 text-sm">{notice.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{notice.message}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{notice.date}</p>
            </div>
          ))}
        </div>
      </section>
      
    </div>
  );
}
