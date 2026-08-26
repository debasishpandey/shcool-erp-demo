import { useState } from 'react';
import { CheckCircle2, Circle, ChevronRight, ArrowLeft } from 'lucide-react';
import { homeworkStatus as initialHomeworkStatus, studentsHomeworkVIII_A } from '../../data/teacherMockData';

export default function TeacherHomework() {
  const [homeworkStatus, setHomeworkStatus] = useState(initialHomeworkStatus);
  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState(studentsHomeworkVIII_A);

  const toggleHomeworkGiven = (id, given) => {
    setHomeworkStatus(homeworkStatus.map(hw => hw.id === id ? { ...hw, given } : hw));
  };

  const toggleStudentCompleted = (rollNo) => {
    setStudents(students.map(s => s.rollNo === rollNo ? { ...s, completed: !s.completed } : s));
  };

  const completedCount = students.filter(s => s.completed).length;

  if (selectedClass) {
    return (
      <div className="flex flex-col h-full bg-gray-50 pb-20">
        <div className="bg-white px-4 py-4 shadow-sm z-10 sticky top-0 flex items-center gap-3">
          <button onClick={() => setSelectedClass(null)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="font-bold text-gray-900 leading-tight">{selectedClass.class} • {selectedClass.subject}</h1>
            <p className="text-sm text-gray-500">{selectedClass.chapter || 'No chapter specified'}</p>
          </div>
        </div>

        <div className="px-4 py-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex justify-between items-center mb-6">
            <div>
              <p className="text-sm text-gray-500 font-medium">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{completedCount} <span className="text-base text-gray-400 font-medium">/ {students.length}</span></p>
            </div>
            <div className="w-16 h-16 rounded-full border-4 border-gray-100 flex items-center justify-center relative">
              <svg className="absolute top-0 left-0 w-full h-full transform -rotate-90">
                <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-100" />
                <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="4" fill="transparent" 
                  strokeDasharray="188.5" 
                  strokeDashoffset={188.5 - (188.5 * completedCount) / students.length} 
                  className="text-primary-500 transition-all duration-500" 
                />
              </svg>
              <span className="font-bold text-sm text-primary-600">{Math.round((completedCount/students.length)*100)}%</span>
            </div>
          </div>

          <div className="space-y-2">
            {students.map(student => (
              <div 
                key={student.rollNo} 
                onClick={() => toggleStudentCompleted(student.rollNo)}
                className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between active:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 font-bold text-sm">
                    {student.rollNo}
                  </div>
                  <span className="font-semibold text-gray-900">{student.name}</span>
                </div>
                <div>
                  {student.completed ? (
                    <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-3 py-1.5 rounded-lg font-medium text-sm">
                      <CheckCircle2 size={18} /> Completed
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg font-medium text-sm">
                      <Circle size={18} /> Pending
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-20">
      <div className="bg-white px-4 py-4 shadow-sm z-10 sticky top-0 flex justify-between items-center">
        <h1 className="font-bold text-gray-900 text-lg">Homework Status</h1>
        <div className="text-sm font-medium text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
          26 Aug 2026
        </div>
      </div>

      <div className="p-4 space-y-4">
        {homeworkStatus.map(hw => (
          <div key={hw.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="font-bold text-gray-900 text-lg">{hw.class}</h2>
                <p className="text-sm text-gray-500">{hw.subject}</p>
              </div>
              
              <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
                <button
                  onClick={() => toggleHomeworkGiven(hw.id, true)}
                  className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${
                    hw.given 
                      ? 'bg-green-500 text-white shadow-sm' 
                      : 'text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  Given
                </button>
                <button
                  onClick={() => toggleHomeworkGiven(hw.id, false)}
                  className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${
                    !hw.given 
                      ? 'bg-gray-400 text-white shadow-sm' 
                      : 'text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  Not Given
                </button>
              </div>
            </div>

            {hw.given && (
              <div 
                onClick={() => setSelectedClass(hw)}
                className="mt-2 pt-3 border-t border-gray-50 flex items-center justify-between active:bg-gray-50 rounded-lg -mx-2 px-2 pb-2 transition-colors"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-800">{hw.chapter || 'View Completion Status'}</p>
                  {hw.completed !== undefined && (
                    <p className="text-xs text-gray-500 mt-0.5">{hw.completed} / {hw.total} Completed</p>
                  )}
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
