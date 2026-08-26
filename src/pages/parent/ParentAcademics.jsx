import { useNavigate } from 'react-router-dom';
import { BookOpen, GraduationCap, ChevronRight, FileText } from 'lucide-react';
import { childProfile, childPerformance, examResults, upcomingExams } from '../../data/parentMockData';

export default function ParentAcademics() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-20 relative">
      <div className="bg-white px-4 py-4 shadow-sm z-10 sticky top-0 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h1 className="font-black text-gray-900 text-lg">Academics</h1>
          <p className="text-xs font-bold text-primary-700 uppercase tracking-wider">{childProfile.name} • {childProfile.class}</p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        
        {/* Current Performance Overview */}
        <section>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Current Performance</h2>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 grid grid-cols-3 gap-2 text-center">
            <div>
              <span className="block text-2xl font-black text-primary-600">{childPerformance.overall.percentage}%</span>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Overall</span>
            </div>
            <div className="border-l border-r border-gray-100">
              <span className="block text-2xl font-black text-green-600">{childPerformance.overall.grade}</span>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Grade</span>
            </div>
            <div>
              <span className="block text-2xl font-black text-gray-900">{childPerformance.overall.classAverage}%</span>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Class Avg</span>
            </div>
          </div>
        </section>

        {/* Latest Exam Summary */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Latest Exam</h2>
            <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wider">
              {examResults.date}
            </span>
          </div>
          
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <GraduationCap size={20} />
              </div>
              <div>
                <h3 className="font-black text-gray-900 text-base leading-tight">{examResults.examName}</h3>
                <p className="text-xs font-bold text-gray-500 mt-0.5">Total: {examResults.totalMarks} / {examResults.maxMarks}</p>
              </div>
              <div className="ml-auto text-right">
                <span className="block text-xl font-black text-primary-600 leading-tight">{examResults.percentage}%</span>
                <span className="text-xs font-bold text-green-600">{examResults.grade}</span>
              </div>
            </div>

            <button 
              onClick={() => navigate('/parent/report-card')}
              className="w-full bg-primary-50 text-primary-700 border border-primary-100 py-2.5 rounded-xl text-sm font-bold hover:bg-primary-100 transition-colors flex justify-center items-center gap-2"
            >
              <FileText size={16} /> View Report Card
            </button>
          </div>
        </section>

        {/* Subjects Performance */}
        <section>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Subjects</h2>
          <div className="space-y-3">
            {examResults.subjects.map((subj, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer active:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-500 flex items-center justify-center shrink-0 border border-gray-100">
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 leading-tight">{subj.name}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-bold text-gray-500">{subj.marks} / {subj.total}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 text-green-700 font-black px-3 py-1.5 rounded-lg text-sm border border-green-100">
                  {subj.grade}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Exams */}
        <section>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Upcoming Exams</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {upcomingExams.map((exam, idx) => (
              <div key={exam.id} className={`p-4 flex items-center justify-between ${idx !== upcomingExams.length - 1 ? 'border-b border-gray-50' : ''}`}>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm leading-tight">{exam.subject}</h3>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900 text-sm">{exam.date}</p>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-0.5">{exam.time}</p>
                </div>
              </div>
            ))}
            <div className="bg-gray-50 p-3 text-center border-t border-gray-100">
              <span className="text-xs font-bold text-primary-600">View Full Schedule</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
