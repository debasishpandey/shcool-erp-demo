import { ArrowLeft, CheckCircle2, AlertTriangle, XCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { childProfile, childPerformance, monthlyAttendanceCalendar } from '../../data/parentMockData';

export default function ParentAttendance() {
  const navigate = useNavigate();
  const attData = childPerformance.attendance;

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-20 relative">
      <div className="bg-white px-4 py-4 shadow-sm z-10 sticky top-0 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="font-black text-gray-900 text-lg">Attendance</h1>
            <p className="text-xs font-bold text-primary-700 uppercase tracking-wider">{childProfile.name}</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        
        {/* Month Summary */}
        <section>
          <div className="flex justify-between items-end mb-3">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Month Summary</h2>
            <span className="bg-primary-100 text-primary-700 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wider">
              {attData.month}
            </span>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
            <div className="p-6 text-center border-b border-gray-50">
              <span className="block text-4xl font-black text-green-600 mb-1">{attData.percentage}%</span>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Overall Attendance</span>
            </div>
            
            <div className="grid grid-cols-3 divide-x divide-gray-100 bg-gray-50/50">
              <div className="p-3 text-center">
                <p className="font-black text-green-600 text-xl">{attData.present}</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Present</p>
              </div>
              <div className="p-3 text-center">
                <p className="font-black text-red-600 text-xl">{attData.absent}</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Absent</p>
              </div>
              <div className="p-3 text-center">
                <p className="font-black text-orange-600 text-xl">{attData.late}</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Late</p>
              </div>
            </div>
          </div>
        </section>

        {/* Concern Alert */}
        {attData.concern && (
          <section>
            <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex gap-3">
              <AlertTriangle size={20} className="text-red-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-black text-red-800 mb-1">Attendance Concern</h3>
                <p className="text-xs font-medium text-red-700 leading-relaxed">
                  {attData.concern} Regular attendance helps maintain academic consistency.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Calendar View */}
        <section>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Calendar Details</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            
            <div className="flex justify-center gap-4 mb-4 pb-4 border-b border-gray-50">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-green-500" />
                <span className="text-[10px] font-bold text-gray-500 uppercase">Present</span>
              </div>
              <div className="flex items-center gap-1.5">
                <XCircle size={14} className="text-red-500" />
                <span className="text-[10px] font-bold text-gray-500 uppercase">Absent</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-orange-500" />
                <span className="text-[10px] font-bold text-gray-500 uppercase">Late</span>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-y-3 gap-x-2">
              {/* Day Headers */}
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                <div key={i} className="text-center text-[10px] font-black text-gray-400 uppercase tracking-wider">
                  {day}
                </div>
              ))}
              
              {/* Empty offset for August 2026 (Starts on Saturday) */}
              {[...Array(5)].map((_, i) => (
                <div key={`empty-${i}`} className="h-8"></div>
              ))}

              {/* Days */}
              {monthlyAttendanceCalendar.map((day) => {
                let statusClass = "text-gray-400 bg-gray-50";
                let statusIcon = null;

                if (!day.isWeekend) {
                  if (day.status === 'P') {
                    statusClass = "bg-green-50 text-green-700 font-bold border border-green-100";
                  } else if (day.status === 'A') {
                    statusClass = "bg-red-50 text-red-700 font-bold border border-red-100";
                  } else if (day.status === 'L') {
                    statusClass = "bg-orange-50 text-orange-700 font-bold border border-orange-100";
                  }
                }

                return (
                  <div key={day.date} className="flex flex-col items-center gap-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${statusClass}`}>
                      {day.date}
                    </div>
                    {day.status === 'P' && <div className="w-1 h-1 rounded-full bg-green-500"></div>}
                    {day.status === 'A' && <div className="w-1 h-1 rounded-full bg-red-500"></div>}
                    {day.status === 'L' && <div className="w-1 h-1 rounded-full bg-orange-500"></div>}
                  </div>
                );
              })}
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
