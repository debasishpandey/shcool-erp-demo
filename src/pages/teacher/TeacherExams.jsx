import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit3, FileText, ChevronRight, GraduationCap } from 'lucide-react';
import { latestExam, teacherProfile } from '../../data/teacherMockData';

export default function TeacherExams() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-20 relative">
      <div className="bg-white px-4 py-4 shadow-sm z-10 sticky top-0 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-black text-gray-900 text-lg">Exam & Results</h1>
      </div>

      <div className="p-4 space-y-6">
        
        {/* Latest Exam Summary */}
        <div className="bg-primary-600 rounded-2xl p-5 text-white shadow-sm relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          
          <div className="flex items-center gap-2 text-primary-100 text-xs font-bold uppercase tracking-wider mb-2">
            <GraduationCap size={16} /> Latest Exam
          </div>
          
          <h2 className="text-2xl font-black mb-1">{latestExam.name}</h2>
          <p className="text-sm font-medium text-primary-100 mb-4">{latestExam.month}</p>
          
          <div className="bg-white/20 rounded-xl p-3 flex justify-between items-center border border-white/10 backdrop-blur-sm">
            <div>
              <p className="text-[10px] uppercase font-bold text-primary-100 tracking-wider">Status</p>
              <p className="text-sm font-bold">{latestExam.status}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase font-bold text-primary-100 tracking-wider">Entered</p>
              <p className="text-sm font-bold">{latestExam.enteredMarks} / {latestExam.totalStudents}</p>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Teacher Actions</h3>
          
          <div 
            onClick={() => navigate('/teacher/exams/enter-marks')}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer active:bg-gray-50 transition-colors"
          >
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex flex-col items-center justify-center shrink-0 border border-blue-100">
                <Edit3 size={24} />
              </div>
              <div>
                <h4 className="font-black text-gray-900 text-lg">Enter Marks</h4>
                <p className="text-xs font-semibold text-gray-500 mt-0.5">For subjects/classes I teach</p>
              </div>
            </div>
            <ChevronRight size={24} className="text-gray-400" />
          </div>

          <div 
            onClick={() => navigate('/teacher/exams/reports')}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer active:bg-gray-50 transition-colors"
          >
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex flex-col items-center justify-center shrink-0 border border-green-100">
                <FileText size={24} />
              </div>
              <div>
                <h4 className="font-black text-gray-900 text-lg">Class Reports</h4>
                <p className="text-xs font-semibold text-gray-500 mt-0.5">Complete report of my class {teacherProfile.classTeacherOf}</p>
              </div>
            </div>
            <ChevronRight size={24} className="text-gray-400" />
          </div>

        </div>

      </div>
    </div>
  );
}
