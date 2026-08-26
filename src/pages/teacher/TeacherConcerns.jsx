import { useState } from 'react';
import { Plus, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { initialConcerns, studentsVIII_A, teacherProfile } from '../../data/teacherMockData';

export default function TeacherConcerns() {
  const [concerns, setConcerns] = useState(initialConcerns);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Form State
  const [student, setStudent] = useState('');
  const [type, setType] = useState('Homework');
  const [message, setMessage] = useState('');
  const [urgency, setUrgency] = useState('Normal');

  const concernTypes = ['Attendance', 'Homework', 'Behaviour', 'Academic', 'Other'];
  const urgencyLevels = ['Normal', 'Needs Attention', 'Urgent'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!student || !message) return;

    const newConcern = {
      id: Date.now(),
      student,
      type,
      message,
      status: 'Open',
      date: '26 Aug 2026',
      parentNotified: true
    };

    setConcerns([newConcern, ...concerns]);
    setIsSaved(true);
    
    setTimeout(() => {
      setIsSaved(false);
      setIsFormOpen(false);
      setStudent('');
      setType('Homework');
      setMessage('');
      setUrgency('Normal');
    }, 2500);
  };

  const getUrgencyColor = (urg) => {
    switch(urg) {
      case 'Urgent': return 'text-red-700 bg-red-50 border-red-200';
      case 'Needs Attention': return 'text-orange-700 bg-orange-50 border-orange-200';
      default: return 'text-blue-700 bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-20 relative">
      <div className="bg-white px-4 py-4 shadow-sm z-10 sticky top-0 flex justify-between items-center">
        <div>
          <h1 className="font-black text-gray-900 text-lg">Student Concerns</h1>
          <p className="text-sm font-semibold text-primary-700">{teacherProfile.classTeacherOf} (My Class)</p>
        </div>
        {!isFormOpen && (
          <button 
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-1 bg-primary-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold active:bg-primary-700"
          >
            <Plus size={16} /> New
          </button>
        )}
      </div>

      {/* Save Success Toast */}
      {isSaved && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 w-11/12 max-w-[400px] z-50">
          <div className="bg-green-600 text-white p-4 rounded-xl shadow-lg flex flex-col gap-2">
            <div className="flex items-center gap-2 font-bold">
              <CheckCircle2 size={20} />
              <span>Concern raised successfully</span>
            </div>
            <div className="text-sm bg-white/20 px-3 py-1 rounded-lg font-medium">
              Parent notification prepared
            </div>
          </div>
        </div>
      )}

      {/* Concern Form Full-Screen Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col max-w-[480px] mx-auto overflow-hidden">
          <div className="px-4 py-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0">
            <div>
              <h2 className="font-black text-gray-900 text-lg">Raise Concern</h2>
              <p className="text-sm font-semibold text-primary-700">{teacherProfile.classTeacherOf}</p>
            </div>
            <button onClick={() => setIsFormOpen(false)} className="p-2 -mr-2 text-gray-500 hover:bg-gray-100 rounded-full">
              <X size={24} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">1. Select Student</label>
              <select 
                value={student} 
                onChange={(e) => setStudent(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl p-3 focus:ring-2 focus:ring-primary-500 font-medium outline-none"
                required
              >
                <option value="" disabled>Select from class VIII-A...</option>
                {studentsVIII_A.map(s => (
                  <option key={s.rollNo} value={s.name}>{s.rollNo} - {s.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">2. Concern Type</label>
              <div className="flex flex-wrap gap-2">
                {concernTypes.map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                      type === t 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-gray-50 text-gray-600 border border-gray-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">3. Message</label>
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Briefly describe the concern..."
                rows={4}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl p-3 focus:ring-2 focus:ring-primary-500 font-medium outline-none resize-none"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">4. Urgency (Optional)</label>
              <div className="flex flex-wrap gap-2">
                {urgencyLevels.map(u => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => setUrgency(u)}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-colors border ${
                      urgency === u 
                        ? getUrgencyColor(u)
                        : 'bg-gray-50 text-gray-600 border-gray-200'
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 pb-20">
              <button 
                type="submit"
                disabled={isSaved || !student || !message}
                className="w-full bg-primary-600 text-white font-black text-lg py-4 rounded-xl shadow-sm hover:bg-primary-700 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isSaved ? 'Saving...' : 'Raise Concern'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Concerns List */}
      <div className="p-4 space-y-4">
        {concerns.map(concern => (
          <div key={concern.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                  <AlertCircle size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 leading-tight">{concern.student}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mt-1">{concern.type} • {concern.date}</p>
                </div>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                concern.status === 'Open' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {concern.status}
              </span>
            </div>
            
            <p className="text-gray-800 text-sm font-medium bg-gray-50 p-3 rounded-xl border border-gray-100 mb-3">
              "{concern.message}"
            </p>
            
            {concern.parentNotified && (
              <div className="flex items-center gap-1.5 text-xs font-bold text-green-700">
                <CheckCircle2 size={14} /> Parent Notified
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
