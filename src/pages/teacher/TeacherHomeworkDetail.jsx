import { useState, useMemo } from 'react';
import { ArrowLeft, Check, X, Filter } from 'lucide-react';
import { studentsVIII_A } from '../../data/teacherMockData';

// Generate a larger mock list to simulate a full class (42 students)
const generateFullClass = (total, completed) => {
  const fullList = [];
  for(let i=0; i<total; i++) {
    // Reuse names from studentsVIII_A or generate generic ones
    const baseStudent = studentsVIII_A[i % studentsVIII_A.length];
    fullList.push({
      id: i + 1,
      rollNo: String(i + 1).padStart(2, '0'),
      name: i < studentsVIII_A.length ? baseStudent.name : `${baseStudent.name.split(' ')[0]} Student${i}`,
      // First 'completed' students are marked done
      isDone: i < completed
    });
  }
  return fullList;
};

export default function TeacherHomeworkDetail({ assignment, onBack, isClassTeacherView }) {
  // Initialize state based on the passed assignment stats
  const [students, setStudents] = useState(() => 
    generateFullClass(assignment.total, assignment.completed)
  );
  
  const [filter, setFilter] = useState('All'); // All, Done, Not Done

  const toggleStudent = (id) => {
    setStudents(students.map(s => s.id === id ? { ...s, isDone: !s.isDone } : s));
  };

  const completedCount = students.filter(s => s.isDone).length;
  const pendingCount = students.length - completedCount;
  const percentage = Math.round((completedCount / students.length) * 100) || 0;

  const filteredStudents = useMemo(() => {
    if (filter === 'Done') return students.filter(s => s.isDone);
    if (filter === 'Not Done') return students.filter(s => !s.isDone);
    return students;
  }, [students, filter]);

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-24 absolute inset-0 z-30">
      
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm sticky top-0 z-10 flex items-center gap-3 border-b border-gray-100">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="font-black text-gray-900 text-lg leading-tight">
            {isClassTeacherView ? `${assignment.subject} Homework` : assignment.subject}
          </h1>
          <p className="text-sm font-semibold text-primary-700">
            {isClassTeacherView ? `Class ${assignment.class || 'VIII-A'}` : `${assignment.class} • ${assignment.title}`}
          </p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white p-3 rounded-xl border border-gray-200 text-center shadow-sm">
            <span className="block text-2xl font-black text-green-600">{completedCount}</span>
            <span className="text-[10px] uppercase font-bold text-gray-500">Completed</span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-gray-200 text-center shadow-sm">
            <span className="block text-2xl font-black text-orange-500">{pendingCount}</span>
            <span className="text-[10px] uppercase font-bold text-gray-500">Pending</span>
          </div>
          <div className="bg-primary-50 p-3 rounded-xl border border-primary-100 text-center shadow-sm">
            <span className="block text-2xl font-black text-primary-700">{percentage}%</span>
            <span className="text-[10px] uppercase font-bold text-primary-600">Completion</span>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex bg-gray-200/60 p-1 rounded-xl sticky top-20 z-10 backdrop-blur-md">
          {['All', 'Done', 'Not Done'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 py-1.5 text-sm font-bold rounded-lg transition-colors ${
                filter === f 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Student List */}
        <div className="space-y-2 mt-2">
          <div className="flex justify-between items-center px-1 mb-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Student Name</span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status</span>
          </div>
          
          {filteredStudents.length === 0 ? (
            <div className="text-center py-8 text-gray-400 font-medium bg-white rounded-xl border border-gray-100">
              No students found for this filter.
            </div>
          ) : (
            filteredStudents.map(student => (
              <div 
                key={student.id} 
                onClick={() => toggleStudent(student.id)}
                className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between active:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 font-bold text-sm border border-gray-100">
                    {student.rollNo}
                  </div>
                  <span className="font-bold text-gray-900">{student.name}</span>
                </div>
                <div>
                  {student.isDone ? (
                    <div className="flex items-center gap-1.5 text-green-700 bg-green-50 border border-green-100 px-3 py-1.5 rounded-lg font-bold text-sm shadow-sm">
                      <Check size={16} strokeWidth={3} /> Done
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-orange-700 bg-orange-50 border border-orange-100 px-3 py-1.5 rounded-lg font-bold text-sm shadow-sm">
                      <X size={16} strokeWidth={3} /> Not Done
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
