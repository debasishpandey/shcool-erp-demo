import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, AlertCircle, ChevronRight, CheckCircle2 } from 'lucide-react';
import { teacherProfile, todaysTeaching, summaryStats } from '../../data/teacherMockData';

export default function TeacherHome() {
  const navigate = useNavigate();

  return (
    <div className="p-4 space-y-6">
      
      {/* MY CLASS */}
      <section>
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">My Class</h2>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-primary-100 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-50 rounded-full opacity-50"></div>
          
          <div className="flex justify-between items-start relative z-10">
            <div>
              <h3 className="font-black text-gray-900 text-2xl">{teacherProfile.classTeacherOf}</h3>
              <p className="text-primary-700 font-semibold text-sm">Class Teacher</p>
            </div>
            <div className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-bold">
              42 Students
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 relative z-10">
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
              <p className="text-xs text-gray-500 font-semibold mb-1">Today's Attendance</p>
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                <span className="text-sm font-bold text-gray-900">Not Marked</span>
              </div>
              <button 
                onClick={() => navigate('/teacher/attendance')}
                className="w-full bg-primary-600 text-white py-1.5 rounded-lg text-xs font-bold hover:bg-primary-700 transition-colors"
              >
                Mark Now
              </button>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex flex-col justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold mb-1">Overview</p>
                <div className="flex items-center gap-2 mb-1 text-sm font-bold text-gray-900">
                  <span className="text-green-600">92%</span> Attendance
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                  34/42 HW • 2 Concerns
                </div>
              </div>
              <button 
                onClick={() => navigate('/teacher/class-overview')}
                className="w-full bg-white border border-gray-200 text-gray-700 py-1.5 rounded-lg text-xs font-bold mt-2 hover:bg-gray-50 transition-colors"
              >
                View Class
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TODAY'S TEACHING */}
      <section>
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Today's Teaching</h2>
        <div className="space-y-3">
          {todaysTeaching.map((cls) => (
            <div key={cls.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex flex-col items-center justify-center">
                    <span className="text-sm font-bold text-gray-900 leading-none">{cls.time.split(':')[0]}</span>
                    <span className="text-[10px] text-gray-500 font-semibold mt-0.5">{cls.time.split(':')[1]}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight">{cls.class} <span className="text-gray-400 font-normal">—</span> {cls.subject}</h3>
                    {cls.isClassTeacher && (
                      <span className="text-[10px] font-bold text-primary-600 uppercase tracking-wide">My Class</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="pt-3 border-t border-gray-50 flex gap-2">
                {cls.isClassTeacher && (
                  <button 
                    onClick={() => navigate('/teacher/attendance')}
                    className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-1 border border-gray-100"
                  >
                    <Users size={16} /> Attendance
                  </button>
                )}
                <button 
                  onClick={() => navigate('/teacher/homework')}
                  className={`flex-1 hover:bg-primary-700 text-white py-2 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-1 ${
                    cls.isClassTeacher ? 'bg-primary-600' : 'bg-gray-900'
                  }`}
                >
                  <BookOpen size={16} /> Homework
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOME SUMMARY */}
      <section>
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Quick Summary</h2>
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-white rounded-xl p-3 border border-gray-100 flex flex-col items-center justify-center text-center col-span-1">
            <span className="text-xl font-bold text-green-600">{summaryStats.attendancePercentage}%</span>
            <span className="text-[10px] text-gray-500 font-bold mt-1 leading-tight">Class Attd.</span>
          </div>
          <div className="bg-white rounded-xl p-3 border border-gray-100 flex flex-col items-center justify-center text-center col-span-1">
            <span className="text-xl font-bold text-gray-900">{summaryStats.homeworkAssigned}</span>
            <span className="text-[10px] text-gray-500 font-bold mt-1 leading-tight">HW Given</span>
          </div>
          <div className="bg-white rounded-xl p-3 border border-gray-100 flex flex-col items-center justify-center text-center col-span-1">
            <span className="text-xl font-bold text-gray-900">{summaryStats.homeworkPending}</span>
            <span className="text-[10px] text-gray-500 font-bold mt-1 leading-tight">HW Pending</span>
          </div>
          <div className="bg-white rounded-xl p-3 border border-gray-100 flex flex-col items-center justify-center text-center col-span-1">
            <span className="text-xl font-bold text-orange-600">{summaryStats.concernsOpen}</span>
            <span className="text-[10px] text-gray-500 font-bold mt-1 leading-tight">Concerns</span>
          </div>
        </div>
      </section>
      
    </div>
  );
}
