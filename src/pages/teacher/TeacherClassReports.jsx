import { useState } from 'react';
import { ArrowLeft, ChevronDown, User, FileText, CheckCircle2, AlertCircle, X, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { latestExam, teacherProfile, examResultsVIII_A } from '../../data/teacherMockData';

export default function TeacherClassReports() {
  const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Calculate Class Metrics
  const totalPercentage = examResultsVIII_A.reduce((acc, curr) => acc + curr.percentage, 0);
  const classAverage = Math.round(totalPercentage / examResultsVIII_A.length);
  const highest = Math.max(...examResultsVIII_A.map(s => s.percentage));
  const lowest = Math.min(...examResultsVIII_A.map(s => s.percentage));

  const subjectKeys = ['Mathematics', 'Science', 'English', 'Social Science', 'Hindi'];
  const subjectAverages = subjectKeys.map(subj => {
    const total = examResultsVIII_A.reduce((acc, curr) => acc + curr.marks[subj], 0);
    return { name: subj, average: Math.round(total / examResultsVIII_A.length) };
  });

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-20 relative">
      <div className="bg-white px-4 py-4 shadow-sm z-10 sticky top-0 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="font-black text-gray-900 text-lg">Class Reports</h1>
            <p className="text-xs font-bold text-primary-700 uppercase tracking-wider">{teacherProfile.classTeacherOf}</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        
        {/* Class Performance Summary */}
        <section>
          <div className="flex justify-between items-end mb-3">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Class Performance</h2>
            <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wider">
              {latestExam.name}
            </span>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-3">
            <div className="grid grid-cols-3 gap-2 text-center border-b border-gray-50 pb-4 mb-4">
              <div>
                <span className="block text-2xl font-black text-primary-600">{classAverage}%</span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Average</span>
              </div>
              <div className="border-l border-r border-gray-100">
                <span className="block text-2xl font-black text-green-600">{highest}%</span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Highest</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-orange-600">{lowest}%</span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Lowest</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider text-center mb-1">Subject Averages</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {subjectAverages.map(subj => (
                  <div key={subj.name} className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
                    <span className="text-xs font-bold text-gray-700">{subj.name === 'Social Science' ? 'SST' : subj.name}</span>
                    <span className="text-xs font-black text-primary-700">{subj.average}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Student Reports List */}
        <section>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
            Student Reports ({examResultsVIII_A.length})
          </h2>
          <div className="space-y-3">
            {examResultsVIII_A.map(student => (
              <div key={student.rollNo} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-black text-gray-600">
                      {student.rollNo}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 leading-tight">{student.name}</h3>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-0.5">Overall: {student.percentage}%</p>
                    </div>
                  </div>
                  <div className="bg-green-100 text-green-800 font-black px-2 py-1 rounded text-sm">
                    {student.grade}
                  </div>
                </div>

                <div className="flex gap-2 mb-4">
                  <span className="flex-1 bg-gray-50 text-center py-1.5 rounded-lg text-[10px] font-bold text-gray-600">
                    Attd: {student.attendance}%
                  </span>
                  <span className="flex-1 bg-gray-50 text-center py-1.5 rounded-lg text-[10px] font-bold text-gray-600">
                    HW: {student.homeworkPending} Pending
                  </span>
                </div>

                <button 
                  onClick={() => setSelectedStudent(student)}
                  className="w-full bg-white border border-gray-200 text-gray-800 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-50 active:bg-gray-100 transition-colors flex justify-center items-center gap-2"
                >
                  <FileText size={16} /> View Report
                </button>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Complete Student Report Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-gray-900/60 z-50 flex items-end justify-center">
          <div className="bg-gray-50 w-full max-w-[480px] rounded-t-3xl pt-2 pb-safe shadow-2xl flex flex-col max-h-[90vh]">
            
            <div className="flex justify-center mb-2">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
            </div>

            <div className="px-6 py-2 flex justify-between items-center mb-4">
              <h2 className="font-black text-gray-900 text-xl">Academic Report</h2>
              <button onClick={() => setSelectedStudent(null)} className="p-2 bg-gray-200 rounded-full text-gray-600">
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto px-6 pb-6 space-y-4">
              {/* Report Header */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-primary-500"></div>
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">School ERP Demo</h3>
                
                <h4 className="font-black text-2xl text-gray-900 mb-1">{selectedStudent.name}</h4>
                <p className="text-sm font-bold text-gray-500 mb-4">
                  Class {teacherProfile.classTeacherOf} • Roll No. {selectedStudent.rollNo}
                </p>

                <div className="inline-block bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider mb-4 border border-blue-100">
                  {latestExam.name} • {latestExam.month}
                </div>

                <div className="flex justify-center gap-6 mt-2">
                  <div>
                    <span className="block text-3xl font-black text-primary-600">{selectedStudent.percentage}%</span>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Overall</span>
                  </div>
                  <div className="w-px bg-gray-200"></div>
                  <div>
                    <span className="block text-3xl font-black text-green-600">{selectedStudent.grade}</span>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Grade</span>
                  </div>
                </div>
              </div>

              {/* Subject Marks List */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Subject</span>
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Marks / 100</span>
                </div>
                
                {subjectKeys.map((subj, idx) => (
                  <div key={subj} className={`px-4 py-3 flex justify-between items-center ${idx !== subjectKeys.length-1 ? 'border-b border-gray-50' : ''}`}>
                    <span className="font-bold text-gray-800">{subj}</span>
                    <span className="font-black text-gray-900 text-lg">{selectedStudent.marks[subj]}</span>
                  </div>
                ))}
                
                <div className="bg-primary-50 px-4 py-3 border-t border-primary-100 flex justify-between items-center">
                  <span className="font-black text-primary-900 uppercase tracking-wider text-xs">Total Marks</span>
                  <span className="font-black text-primary-700 text-xl">{selectedStudent.total} / 500</span>
                </div>
              </div>

              {/* Other Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <span className="block text-sm font-black text-gray-900">{selectedStudent.attendance}%</span>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Attendance</span>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                    <AlertCircle size={16} />
                  </div>
                  <div>
                    <span className="block text-sm font-black text-gray-900">{selectedStudent.concerns}</span>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Concerns</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <button 
                  onClick={() => setSelectedStudent(null)}
                  className="w-full bg-gray-900 text-white font-black py-4 rounded-xl shadow-sm hover:bg-gray-800"
                >
                  Close Report
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
