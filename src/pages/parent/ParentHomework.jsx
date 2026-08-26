import { useState } from 'react';
import { ArrowLeft, BookOpen, CheckCircle2, Circle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { childHomework } from '../../data/parentMockData';

export default function ParentHomework() {
  const navigate = useNavigate();
  const [homeworkList, setHomeworkList] = useState(childHomework);
  const [selectedHomework, setSelectedHomework] = useState(null);
  const [isToastVisible, setIsToastVisible] = useState(false);

  const completedCount = homeworkList.filter(h => h.status === 'Completed').length;
  const totalCount = homeworkList.length;

  const handleMarkComplete = () => {
    setHomeworkList(homeworkList.map(h => 
      h.id === selectedHomework.id ? { ...h, status: 'Completed' } : h
    ));
    setSelectedHomework(null);
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-20 relative">
      <div className="bg-white px-4 py-4 shadow-sm z-10 sticky top-0 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600">
            <ArrowLeft size={24} />
          </button>
          <h1 className="font-black text-gray-900 text-lg">Homework</h1>
        </div>
      </div>

      {isToastVisible && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-11/12 max-w-[400px] z-50">
          <div className="bg-gray-900 text-white p-4 rounded-xl shadow-xl flex items-center gap-2 font-bold border border-gray-700">
            <CheckCircle2 size={20} className="text-green-400" />
            <span>Homework marked completed</span>
          </div>
        </div>
      )}

      <div className="p-4 space-y-4">
        
        {/* Summary */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Today's Summary</h2>
            <div className="flex items-center gap-2">
              <span className="font-black text-2xl text-gray-900 leading-none">{completedCount}</span>
              <span className="text-gray-400 font-bold text-lg leading-none">/ {totalCount}</span>
              <span className="ml-1 text-xs font-bold text-gray-500 uppercase tracking-wider">Completed</span>
            </div>
          </div>
          <div className="w-14 h-14 rounded-full border-4 border-gray-100 flex items-center justify-center relative">
            <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-primary-500"
                strokeDasharray={`${(completedCount/totalCount)*100}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
              />
            </svg>
            <BookOpen size={20} className="text-primary-600" />
          </div>
        </div>

        {/* List */}
        <div className="space-y-3">
          {homeworkList.map((hw) => (
            <div 
              key={hw.id} 
              onClick={() => setSelectedHomework(hw)}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-start gap-4 cursor-pointer active:bg-gray-50"
            >
              <div className={`mt-1 ${hw.status === 'Completed' ? 'text-green-500' : 'text-gray-300'}`}>
                {hw.status === 'Completed' ? <CheckCircle2 size={24} /> : <Circle size={24} />}
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">{hw.subject}</p>
                <h3 className={`font-bold text-base leading-tight mb-1 ${hw.status === 'Completed' ? 'text-gray-500 line-through decoration-2' : 'text-gray-900'}`}>
                  {hw.title}
                </h3>
                <p className="text-xs font-semibold text-gray-500">Due: {hw.due}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Homework Detail Sheet */}
      {selectedHomework && (
        <div className="fixed inset-0 bg-gray-900/60 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-[480px] rounded-t-3xl pt-2 pb-safe shadow-2xl flex flex-col">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
            </div>
            
            <div className="px-6 py-2 flex justify-between items-start mb-2">
              <div>
                <p className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-1">{selectedHomework.subject}</p>
                <h2 className="font-black text-gray-900 text-2xl leading-tight">{selectedHomework.title}</h2>
              </div>
              <button onClick={() => setSelectedHomework(null)} className="p-2 bg-gray-100 rounded-full text-gray-600 shrink-0">
                <X size={20} />
              </button>
            </div>

            <div className="px-6 mb-6">
              <div className="flex gap-4 mb-6 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Status</p>
                  <span className={`px-2.5 py-1 rounded-md text-xs font-black uppercase tracking-wider ${
                    selectedHomework.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {selectedHomework.status}
                  </span>
                </div>
                <div className="border-l border-gray-200 pl-4">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Due Date</p>
                  <p className="font-bold text-gray-900 text-sm">{selectedHomework.due}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Description</p>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-gray-700 font-medium text-sm leading-relaxed">
                  {selectedHomework.description}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100">
              {selectedHomework.status === 'Pending' ? (
                <button 
                  onClick={handleMarkComplete}
                  className="w-full bg-primary-600 text-white font-black py-4 rounded-xl shadow-sm hover:bg-primary-700 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={20} /> Mark as Completed
                </button>
              ) : (
                <button 
                  onClick={() => setSelectedHomework(null)}
                  className="w-full bg-gray-100 text-gray-700 font-black py-4 rounded-xl hover:bg-gray-200"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
