import { useState } from 'react';
import { ChevronRight, Plus, X, CheckCircle2, ArrowLeft } from 'lucide-react';
import { myAssignments, allSubjectHomeworkVIII_A, teachingCombinations, teacherProfile } from '../../data/teacherMockData';

export default function TeacherHomework() {
  const [assignments, setAssignments] = useState(myAssignments);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [viewClassTeacherMode, setViewClassTeacherMode] = useState(false);

  // Form State
  const [selectedCombo, setSelectedCombo] = useState('');
  const [title, setTitle] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCombo || !title) return;

    const [cls, subj] = selectedCombo.split('|');
    
    const newAssignment = {
      id: Date.now(),
      class: cls,
      subject: subj,
      title,
      completed: 0,
      total: 40 // mock
    };

    setAssignments([newAssignment, ...assignments]);
    setIsSaved(true);
    
    setTimeout(() => {
      setIsSaved(false);
      setIsFormOpen(false);
      setSelectedCombo('');
      setTitle('');
    }, 2000);
  };

  if (viewClassTeacherMode) {
    return (
      <div className="flex flex-col h-full bg-gray-50 pb-20 relative">
        <div className="bg-white px-4 py-4 shadow-sm z-10 sticky top-0 flex items-center gap-3">
          <button onClick={() => setViewClassTeacherMode(false)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="font-black text-gray-900 leading-tight">{teacherProfile.classTeacherOf}</h1>
            <p className="text-sm font-semibold text-primary-700">All Subject Homework</p>
          </div>
        </div>
        
        <div className="p-4 space-y-3">
          <div className="bg-primary-50 p-3 rounded-xl border border-primary-100 mb-4 text-sm font-medium text-primary-800">
            Monitoring homework completion across all subjects for your assigned class.
          </div>
          
          {allSubjectHomeworkVIII_A.map((hw, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 active:bg-gray-50 transition-colors flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-900">{hw.subject}</h3>
                <p className="text-sm text-gray-500">{hw.title}</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-black text-gray-900">{hw.completed}<span className="text-sm text-gray-400 font-semibold">/{hw.total}</span></span>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mt-0.5">Completed</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-20 relative">
      <div className="bg-white px-4 py-4 shadow-sm z-10 sticky top-0 flex justify-between items-center">
        <h1 className="font-black text-gray-900 text-lg">Homework</h1>
        {!isFormOpen && (
          <button 
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-1 bg-primary-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold active:bg-primary-700"
          >
            <Plus size={16} /> Assign
          </button>
        )}
      </div>

      {/* Save Success Toast */}
      {isSaved && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 w-11/12 max-w-[400px] z-50">
          <div className="bg-green-600 text-white p-4 rounded-xl shadow-lg flex items-center gap-2 font-bold">
            <CheckCircle2 size={20} />
            <span>Homework assigned successfully</span>
          </div>
        </div>
      )}

      {/* Give Homework Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col max-w-[480px] mx-auto overflow-hidden">
          <div className="px-4 py-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0">
            <h2 className="font-black text-gray-900 text-lg">Assign Homework</h2>
            <button onClick={() => setIsFormOpen(false)} className="p-2 -mr-2 text-gray-500 hover:bg-gray-100 rounded-full">
              <X size={24} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">1. Select Class & Subject</label>
              <select 
                value={selectedCombo} 
                onChange={(e) => setSelectedCombo(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl p-3 focus:ring-2 focus:ring-primary-500 font-medium outline-none"
                required
              >
                <option value="" disabled>Select your teaching assignment...</option>
                {teachingCombinations.map(combo => (
                  <option key={`${combo.class}|${combo.subject}`} value={`${combo.class}|${combo.subject}`}>
                    {combo.class} — {combo.subject}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">2. Title / Topic</label>
              <input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Chapter 4 Exercises"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl p-3 focus:ring-2 focus:ring-primary-500 font-medium outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">3. Due Date</label>
              <input 
                type="date"
                defaultValue="2026-08-28"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl p-3 focus:ring-2 focus:ring-primary-500 font-medium outline-none"
                required
              />
            </div>

            <div className="pt-4 pb-20">
              <button 
                type="submit"
                disabled={isSaved || !selectedCombo || !title}
                className="w-full bg-primary-600 text-white font-black text-lg py-4 rounded-xl shadow-sm hover:bg-primary-700 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isSaved ? 'Assigning...' : 'Give Homework'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="p-4 space-y-6">
        
        {/* My Class - Monitor All Subjects */}
        <section>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">My Class</h2>
          <div 
            onClick={() => setViewClassTeacherMode(true)}
            className="bg-primary-600 rounded-2xl p-4 shadow-sm text-white active:bg-primary-700 transition-colors flex justify-between items-center cursor-pointer"
          >
            <div>
              <h3 className="font-black text-xl">{teacherProfile.classTeacherOf}</h3>
              <p className="text-primary-100 font-medium text-sm mt-1">View All Subject Homework</p>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <ChevronRight size={24} />
            </div>
          </div>
        </section>

        {/* My Assignments */}
        <section>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">My Assignments</h2>
          <div className="space-y-3">
            {assignments.map(hw => (
              <div key={hw.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center active:bg-gray-50 transition-colors cursor-pointer">
                <div>
                  <div className="flex gap-2 items-center mb-1">
                    <span className="font-bold text-gray-900">{hw.class}</span>
                    <span className="text-gray-400 text-sm font-bold">•</span>
                    <span className="text-gray-600 font-semibold text-sm">{hw.subject}</span>
                  </div>
                  <p className="text-sm text-gray-800 font-medium">{hw.title}</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-gray-900">{hw.completed}<span className="text-sm text-gray-400 font-semibold">/{hw.total}</span></span>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mt-0.5">Completed</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
