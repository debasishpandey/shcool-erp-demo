import { useState } from 'react';
import { ArrowLeft, Check, X, AlertCircle } from 'lucide-react';
import { studentsVIII_A, summaryStats, teacherProfile } from '../../data/teacherMockData';
import { useNavigate } from 'react-router-dom';

export default function ClassOverview() {
  const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState(null);

  const subjects = ['Math', 'Science', 'English', 'SST', 'Hindi'];

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-20 relative">
      
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm z-10 sticky top-0 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600">
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="font-black text-gray-900 text-lg leading-tight">{teacherProfile.classTeacherOf} Overview</h1>
          <p className="text-sm font-semibold text-primary-700">42 Students</p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Top Summary */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 grid grid-cols-3 gap-2">
          <div className="bg-gray-50 p-2 rounded-xl text-center border border-gray-100">
            <p className="text-xs text-gray-500 font-bold mb-0.5">Attendance</p>
            <p className="text-lg font-black text-green-600">{summaryStats.attendancePercentage}%</p>
          </div>
          <div className="bg-gray-50 p-2 rounded-xl text-center border border-gray-100">
            <p className="text-xs text-gray-500 font-bold mb-0.5">HW Done</p>
            <p className="text-lg font-black text-gray-900">34<span className="text-sm text-gray-400 font-semibold">/42</span></p>
          </div>
          <div className="bg-gray-50 p-2 rounded-xl text-center border border-gray-100">
            <p className="text-xs text-gray-500 font-bold mb-0.5">Concerns</p>
            <p className="text-lg font-black text-orange-600">{summaryStats.concernsOpen}</p>
          </div>
        </div>

        {/* Student List Matrix */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Student Status Matrix</h2>
          {studentsVIII_A.map((student) => (
            <div 
              key={student.rollNo} 
              onClick={() => setSelectedStudent(student)}
              className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 active:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-gray-900">{student.name}</span>
                <div className="flex gap-2 text-xs font-bold">
                  <span className={`${student.attendance < 85 ? 'text-orange-600 bg-orange-50' : 'text-gray-600 bg-gray-100'} px-2 py-0.5 rounded`}>
                    Attd: {student.attendance}%
                  </span>
                  {student.concerns > 0 && (
                    <span className="text-orange-600 bg-orange-50 px-2 py-0.5 rounded flex items-center gap-1">
                      <AlertCircle size={12} /> {student.concerns}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1.5">
                {subjects.map(sub => (
                  <div 
                    key={sub} 
                    className={`flex items-center gap-1 px-2 py-1 rounded border text-[10px] font-bold ${
                      student.subjects[sub] 
                        ? 'border-green-200 bg-green-50 text-green-700' 
                        : 'border-red-200 bg-red-50 text-red-700'
                    }`}
                  >
                    <span>{sub}</span>
                    {student.subjects[sub] ? <Check size={12} strokeWidth={3} /> : <X size={12} strokeWidth={3} />}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-gray-900/40 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-[480px] rounded-t-3xl sm:rounded-3xl max-h-[85vh] flex flex-col shadow-2xl">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white rounded-t-3xl sm:rounded-3xl">
              <div>
                <h2 className="font-black text-gray-900 text-xl">{selectedStudent.name}</h2>
                <p className="text-sm font-semibold text-primary-600">{teacherProfile.classTeacherOf}</p>
              </div>
              <button onClick={() => setSelectedStudent(null)} className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto space-y-6">
              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Attendance</h3>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg ${
                    selectedStudent.attendance >= 85 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {selectedStudent.attendance}%
                  </div>
                  <span className="text-sm font-semibold text-gray-600">
                    {selectedStudent.attendance >= 85 ? 'Good attendance record' : 'Needs improvement'}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Homework Status</h3>
                <div className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
                  {subjects.map((sub, idx) => (
                    <div key={sub} className={`flex justify-between items-center p-3 ${idx !== subjects.length - 1 ? 'border-b border-gray-100' : ''}`}>
                      <span className="font-bold text-gray-800">{sub}</span>
                      {selectedStudent.subjects[sub] ? (
                        <span className="flex items-center gap-1.5 text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                          <Check size={16} strokeWidth={3} /> Done
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-sm font-bold text-red-500 bg-red-50 px-2 py-1 rounded">
                          <X size={16} strokeWidth={3} /> Pending
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {selectedStudent.concerns > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-orange-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <AlertCircle size={16} /> Open Concerns
                  </h3>
                  <div className="bg-orange-50 border border-orange-100 p-3 rounded-xl">
                    <p className="text-sm font-semibold text-orange-800">Homework pending repeatedly</p>
                    <p className="text-xs text-orange-600 mt-1">Reported by Class Teacher</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-gray-100 pb-safe">
              <button 
                onClick={() => {
                  setSelectedStudent(null);
                  navigate('/teacher/concerns');
                }}
                className="w-full bg-white border border-gray-200 text-gray-800 py-3 rounded-xl font-bold shadow-sm hover:bg-gray-50 active:bg-gray-100"
              >
                Raise New Concern
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
