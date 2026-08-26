import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, AlertCircle, CheckCircle2 } from 'lucide-react';
import { todaysClasses, summaryStats } from '../../data/teacherMockData';

export default function TeacherHome() {
  const navigate = useNavigate();

  const handleMarkAttendance = (classId) => {
    navigate('/teacher/attendance');
  };

  return (
    <div className="p-4 space-y-6">
      
      {/* Today's Classes */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">Today's Classes</h2>
        <div className="space-y-3">
          {todaysClasses.map((cls) => (
            <div key={cls.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{cls.class}</h3>
                  <p className="text-gray-500 text-sm">{cls.subject} • {cls.time}</p>
                </div>
                <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                  {cls.studentCount} Students
                </div>
              </div>
              
              <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${cls.attendanceMarked ? 'bg-green-500' : 'bg-amber-400'}`}></div>
                  <span className="text-sm text-gray-600">
                    {cls.attendanceMarked ? 'Attendance Marked' : 'Attendance Not Marked'}
                  </span>
                </div>
                {!cls.attendanceMarked && (
                  <button 
                    onClick={() => handleMarkAttendance(cls.id)}
                    className="bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary-700 active:scale-95 transition-all"
                  >
                    Mark
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => navigate('/teacher/attendance')}
            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2 hover:border-primary-200 active:bg-gray-50 transition-all"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-1">
              <Users size={24} />
            </div>
            <span className="font-semibold text-sm text-gray-800">Attendance</span>
          </button>
          
          <button 
            onClick={() => navigate('/teacher/homework')}
            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2 hover:border-primary-200 active:bg-gray-50 transition-all"
          >
            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 mb-1">
              <BookOpen size={24} />
            </div>
            <span className="font-semibold text-sm text-gray-800">Homework</span>
          </button>
          
          <button 
            onClick={() => navigate('/teacher/concerns')}
            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2 hover:border-primary-200 active:bg-gray-50 transition-all col-span-2"
          >
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 mb-1">
              <AlertCircle size={24} />
            </div>
            <span className="font-semibold text-sm text-gray-800">Raise Concern</span>
          </button>
        </div>
      </section>

      {/* Today Summary */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">Today Summary</h2>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white rounded-xl p-3 border border-gray-100 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-bold text-gray-900">{summaryStats.attendanceCompleted}/{summaryStats.attendanceTotal}</span>
            <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mt-1">Attendance</span>
          </div>
          <div className="bg-white rounded-xl p-3 border border-gray-100 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-bold text-gray-900">{summaryStats.homeworkAssigned}</span>
            <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mt-1">HW Assigned</span>
          </div>
          <div className="bg-white rounded-xl p-3 border border-gray-100 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-bold text-gray-900">{summaryStats.concernsOpen}</span>
            <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mt-1">Concerns</span>
          </div>
        </div>
      </section>
      
    </div>
  );
}
