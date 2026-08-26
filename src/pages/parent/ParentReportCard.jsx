import { ArrowLeft, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { childProfile, examResults } from '../../data/parentMockData';

export default function ParentReportCard() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 relative">
      <div className="bg-white px-4 py-4 shadow-sm z-10 sticky top-0 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600">
            <ArrowLeft size={24} />
          </button>
          <h1 className="font-black text-gray-900 text-lg">Report Card</h1>
        </div>
        <button className="text-primary-600 p-2 rounded-full hover:bg-primary-50">
          <Download size={20} />
        </button>
      </div>

      <div className="p-4 sm:p-6 lg:p-8 flex-1 flex justify-center">
        {/* Printable Area Container */}
        <div className="w-full max-w-2xl bg-white shadow-xl rounded-none sm:rounded-2xl border-t-8 border-t-primary-600 relative overflow-hidden">
          
          <div className="p-6 sm:p-8">
            <div className="text-center mb-8 border-b border-gray-200 pb-6">
              <h2 className="font-black text-2xl tracking-tight text-gray-900 mb-1">{childProfile.school}</h2>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Academic Report</p>
            </div>

            <div className="grid grid-cols-2 gap-y-4 mb-8">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Student Name</p>
                <p className="font-black text-gray-900">{childProfile.name}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Class</p>
                <p className="font-black text-gray-900">{childProfile.class}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Roll Number</p>
                <p className="font-black text-gray-900">{childProfile.rollNo}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Examination</p>
                <p className="font-black text-gray-900">{examResults.examName}</p>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 overflow-hidden mb-8">
              <div className="grid grid-cols-12 bg-gray-50 border-b border-gray-200 py-3 px-4">
                <div className="col-span-6 text-xs font-black text-gray-500 uppercase tracking-wider">Subject</div>
                <div className="col-span-3 text-right text-xs font-black text-gray-500 uppercase tracking-wider">Marks</div>
                <div className="col-span-3 text-right text-xs font-black text-gray-500 uppercase tracking-wider">Grade</div>
              </div>
              
              <div className="divide-y divide-gray-100">
                {examResults.subjects.map((subj, idx) => (
                  <div key={idx} className="grid grid-cols-12 py-3 px-4 items-center">
                    <div className="col-span-6 font-bold text-gray-900">{subj.name}</div>
                    <div className="col-span-3 text-right font-black text-gray-700">{subj.marks} / {subj.total}</div>
                    <div className="col-span-3 text-right font-black text-gray-900">{subj.grade}</div>
                  </div>
                ))}
              </div>

              <div className="bg-primary-50 py-4 px-4 border-t border-primary-200 grid grid-cols-12 items-center">
                <div className="col-span-6 text-sm font-black text-primary-900 uppercase tracking-wider">Total</div>
                <div className="col-span-3 text-right font-black text-primary-700 text-lg">{examResults.totalMarks}</div>
                <div className="col-span-3 text-right font-black text-primary-700 text-lg">{examResults.percentage}%</div>
              </div>
            </div>

            <div className="flex justify-between items-end pt-12 border-t border-gray-200">
              <div className="text-center w-32 border-t border-gray-300 pt-2">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Class Teacher</span>
              </div>
              <div className="text-center w-32 border-t border-gray-300 pt-2">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Principal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
