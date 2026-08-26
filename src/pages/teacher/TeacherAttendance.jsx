import { useState } from 'react';
import { CheckCircle2, ArrowLeft, Calendar } from 'lucide-react';
import { studentsAttendanceList, teacherProfile } from '../../data/teacherMockData';
import { useNavigate } from 'react-router-dom';

export default function TeacherAttendance() {
  const navigate = useNavigate();
  const [students, setStudents] = useState(studentsAttendanceList);
  const [isSaved, setIsSaved] = useState(false);
  const [absentCountSaved, setAbsentCountSaved] = useState(0);

  const presentCount = students.filter(s => s.status === 'Present').length;
  const absentCount = students.filter(s => s.status === 'Absent').length;
  const percentage = Math.round((presentCount / students.length) * 100);

  const markAllPresent = () => {
    setStudents(students.map(s => ({ ...s, status: 'Present' })));
  };

  const toggleStatus = (rollNo, status) => {
    setStudents(students.map(s => s.rollNo === rollNo ? { ...s, status } : s));
  };

  const handleSave = () => {
    setAbsentCountSaved(absentCount);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      navigate('/teacher/home');
    }, 3000);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 relative pb-20">
      
      {/* Top Controls */}
      <div className="bg-white px-4 py-4 shadow-sm z-10 sticky top-0">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600">
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <h1 className="font-black text-gray-900 text-xl">{teacherProfile.classTeacherOf}</h1>
            <p className="text-sm font-semibold text-primary-700">Class Teacher</p>
          </div>
          <div className="text-sm font-bold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200">
            26 Aug 2026
          </div>
        </div>
        
        <div className="flex justify-between items-center bg-gray-50 p-2 rounded-xl border border-gray-100">
          <span className="text-gray-900 font-bold px-2">{students.length} Total</span>
          <div className="flex gap-2">
            <button 
              onClick={() => navigate('/teacher/attendance/summary')}
              className="text-gray-600 font-semibold text-xs py-1.5 px-3 rounded-lg border border-gray-200 bg-white active:bg-gray-50 flex items-center gap-1"
            >
              <Calendar size={14} /> Monthly
            </button>
            <button 
              onClick={markAllPresent}
              className="text-primary-700 font-bold text-xs py-1.5 px-3 rounded-lg bg-primary-50 active:bg-primary-100 border border-primary-100"
            >
              Mark All Present
            </button>
          </div>
        </div>
      </div>

      {/* Student List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 pb-32">
        {students.map((student) => (
          <div key={student.rollNo} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-600 font-bold text-sm">
                {student.rollNo}
              </div>
              <span className="font-bold text-gray-900">{student.name}</span>
            </div>
            
            <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
              <button
                onClick={() => toggleStatus(student.rollNo, 'Present')}
                className={`px-5 py-2.5 rounded-md text-sm font-black transition-colors ${
                  student.status === 'Present' 
                    ? 'bg-green-500 text-white shadow-sm' 
                    : 'text-gray-400 hover:bg-gray-200'
                }`}
              >
                P
              </button>
              <button
                onClick={() => toggleStatus(student.rollNo, 'Absent')}
                className={`px-5 py-2.5 rounded-md text-sm font-black transition-colors ${
                  student.status === 'Absent' 
                    ? 'bg-red-500 text-white shadow-sm' 
                    : 'text-gray-400 hover:bg-gray-200'
                }`}
              >
                A
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Save Summary Toast */}
      {isSaved && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 w-11/12 max-w-[400px] z-50">
          <div className="bg-green-600 text-white p-4 rounded-xl shadow-lg flex flex-col gap-2">
            <div className="flex items-center gap-2 font-bold">
              <CheckCircle2 size={20} />
              <span>Attendance saved</span>
            </div>
            {absentCountSaved > 0 && (
              <div className="text-sm bg-white/20 px-3 py-1 rounded-lg font-medium">
                Parent notifications prepared for {absentCountSaved} absent students
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sticky Bottom Summary & Save Button */}
      <div className="fixed bottom-16 w-full max-w-[480px] bg-white border-t border-gray-200 p-4 pb-safe z-40 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-center mb-3 px-1">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-gray-900">{percentage}%</span>
            <span className="text-sm text-gray-500 font-bold">Present</span>
          </div>
          <div className="flex gap-4 text-sm font-black">
            <span className="text-green-600 bg-green-50 px-2 py-1 rounded-md">{presentCount} P</span>
            <span className="text-red-500 bg-red-50 px-2 py-1 rounded-md">{absentCount} A</span>
          </div>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaved}
          className="w-full bg-primary-600 text-white font-black text-lg py-4 rounded-xl shadow-sm hover:bg-primary-700 active:scale-[0.98] transition-all disabled:opacity-70"
        >
          {isSaved ? 'Saved...' : 'Save Attendance'}
        </button>
      </div>

    </div>
  );
}
