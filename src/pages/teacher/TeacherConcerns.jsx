import { useState } from 'react';
import { Plus, CheckCircle2, AlertCircle, X, MessageCircle, User } from 'lucide-react';
import { initialConcerns, parentSuggestionsList, studentsVIII_A, teacherProfile } from '../../data/teacherMockData';

export default function TeacherConcerns() {
  const [activeTab, setActiveTab] = useState('My Concerns'); // 'My Concerns' or 'Parent Suggestions'
  
  // My Concerns State
  const [concerns, setConcerns] = useState(initialConcerns);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [student, setStudent] = useState('');
  const [type, setType] = useState('Homework');
  const [message, setMessage] = useState('');
  const [urgency, setUrgency] = useState('Normal');

  // Parent Suggestions State
  const [suggestions, setSuggestions] = useState(parentSuggestionsList);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const concernTypes = ['Attendance', 'Homework', 'Behaviour', 'Academic', 'Other'];
  const urgencyLevels = ['Normal', 'Needs Attention', 'Urgent'];

  const handleRaiseConcern = (e) => {
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
    setToastMessage('Concern raised successfully');
    
    setTimeout(() => {
      setIsSaved(false);
      setIsFormOpen(false);
      setToastMessage('');
      setStudent('');
      setType('Homework');
      setMessage('');
      setUrgency('Normal');
    }, 2500);
  };

  const markSuggestionReviewed = (id) => {
    setSuggestions(suggestions.map(s => s.id === id ? { ...s, status: 'Reviewed' } : s));
    setSelectedSuggestion(null);
    setIsSaved(true);
    setToastMessage('Suggestion marked as reviewed');
    setTimeout(() => {
      setIsSaved(false);
      setToastMessage('');
    }, 2500);
  };

  const getUrgencyColor = (urg) => {
    switch(urg) {
      case 'Urgent': return 'text-red-700 bg-red-50 border-red-200';
      case 'Needs Attention': return 'text-orange-700 bg-orange-50 border-orange-200';
      default: return 'text-blue-700 bg-blue-50 border-blue-200';
    }
  };

  const newSuggestionsCount = suggestions.filter(s => s.status === 'New').length;
  const reviewedSuggestionsCount = suggestions.filter(s => s.status === 'Reviewed').length;

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-20 relative">
      <div className="bg-white shadow-sm z-10 sticky top-0 border-b border-gray-100">
        <div className="px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="font-black text-gray-900 text-lg">Communication</h1>
            <p className="text-sm font-semibold text-primary-700">{teacherProfile.classTeacherOf} (My Class)</p>
          </div>
          {activeTab === 'My Concerns' && !isFormOpen && (
            <button 
              onClick={() => setIsFormOpen(true)}
              className="flex items-center gap-1 bg-primary-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold active:bg-primary-700"
            >
              <Plus size={16} /> New
            </button>
          )}
        </div>
        
        {/* Segmented Control */}
        <div className="px-4 pb-3">
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('My Concerns')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${
                activeTab === 'My Concerns' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              My Concerns
            </button>
            <button
              onClick={() => setActiveTab('Parent Suggestions')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'Parent Suggestions' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Parent Suggestions
              {newSuggestionsCount > 0 && (
                <span className="w-4 h-4 bg-red-500 text-white rounded-full text-[10px] flex items-center justify-center">
                  {newSuggestionsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      {isSaved && (
        <div className="fixed top-32 left-1/2 transform -translate-x-1/2 w-11/12 max-w-[400px] z-50">
          <div className="bg-gray-900 text-white p-4 rounded-xl shadow-xl flex items-center gap-2 font-bold border border-gray-700">
            <CheckCircle2 size={20} className="text-green-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* --- TAB: MY CONCERNS --- */}
      {activeTab === 'My Concerns' && (
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
      )}

      {/* --- TAB: PARENT SUGGESTIONS --- */}
      {activeTab === 'Parent Suggestions' && (
        <div className="p-4 space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-2 mb-2">
            <div className="bg-white p-3 rounded-xl border border-gray-200 text-center shadow-sm">
              <span className="block text-2xl font-black text-blue-600">{newSuggestionsCount}</span>
              <span className="text-[10px] uppercase font-bold text-gray-500">New</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-gray-200 text-center shadow-sm">
              <span className="block text-2xl font-black text-green-600">{reviewedSuggestionsCount}</span>
              <span className="text-[10px] uppercase font-bold text-gray-500">Reviewed</span>
            </div>
            <div className="bg-gray-100 p-3 rounded-xl border border-gray-200 text-center shadow-sm">
              <span className="block text-2xl font-black text-gray-900">{suggestions.length}</span>
              <span className="text-[10px] uppercase font-bold text-gray-500">Total</span>
            </div>
          </div>

          {/* Suggestions List */}
          {suggestions.map(s => (
            <div 
              key={s.id} 
              onClick={() => setSelectedSuggestion(s)}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 active:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                    s.anonymous ? 'bg-gray-50 border-gray-200 text-gray-400' : 'bg-primary-50 border-primary-100 text-primary-600'
                  }`}>
                    <User size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 leading-tight">{s.author}</h3>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mt-1">{s.category} • {s.date}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wider ${
                  s.status === 'New' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {s.status}
                </span>
              </div>
              <p className="text-gray-600 text-sm font-medium line-clamp-2">
                "{s.message}"
              </p>
            </div>
          ))}
        </div>
      )}

      {/* --- MODALS --- */}

      {/* Raise Concern Form */}
      {isFormOpen && (
        <div 
          className="fixed inset-0 bg-white z-40 flex flex-col max-w-[480px] mx-auto overflow-hidden"
          style={{ paddingBottom: 'var(--app-bottom-space)' }}
        >
          <div className="px-4 py-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 shrink-0">
            <div>
              <h2 className="font-black text-gray-900 text-lg">Raise Concern</h2>
              <p className="text-sm font-semibold text-primary-700">{teacherProfile.classTeacherOf}</p>
            </div>
            <button onClick={() => setIsFormOpen(false)} className="p-2 -mr-2 text-gray-500 hover:bg-gray-100 rounded-full">
              <X size={24} />
            </button>
          </div>
          
          <form onSubmit={handleRaiseConcern} className="flex-1 overflow-y-auto p-4 space-y-6">
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
                      type === t ? 'bg-primary-600 text-white' : 'bg-gray-50 text-gray-600 border border-gray-200'
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
            <div className="pt-4 pb-4 shrink-0 bg-white border-t border-gray-100 px-4">
              <button 
                type="submit"
                disabled={!student || !message}
                className="w-full bg-primary-600 text-white font-black text-lg py-4 rounded-xl shadow-sm hover:bg-primary-700 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                Raise Concern
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Suggestion Detail Sheet */}
      {selectedSuggestion && (
        <div 
          className="fixed inset-0 bg-gray-900/40 z-50 flex items-end justify-center"
          style={{ paddingBottom: 'var(--app-bottom-space)' }}
        >
          <div className="bg-white w-full max-w-[480px] rounded-t-3xl p-6 shadow-2xl flex flex-col max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${
                  selectedSuggestion.anonymous ? 'bg-gray-50 border-gray-200 text-gray-400' : 'bg-primary-50 border-primary-100 text-primary-600'
                }`}>
                  <User size={24} />
                </div>
                <div>
                  <h3 className="font-black text-gray-900 text-lg leading-tight">{selectedSuggestion.author}</h3>
                  {selectedSuggestion.context && (
                    <p className="text-sm font-semibold text-primary-700">{selectedSuggestion.context}</p>
                  )}
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mt-1">{selectedSuggestion.category} • {selectedSuggestion.date}</p>
                </div>
              </div>
              <button onClick={() => setSelectedSuggestion(null)} className="p-2 bg-gray-100 rounded-full text-gray-600">
                <X size={20} />
              </button>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-gray-800 text-sm font-medium leading-relaxed italic mb-6">
              "{selectedSuggestion.message}"
            </div>
            
            <div className="flex gap-3">
              {selectedSuggestion.status === 'New' && (
                <button 
                  onClick={() => markSuggestionReviewed(selectedSuggestion.id)}
                  className="flex-1 bg-primary-600 text-white py-3.5 rounded-xl font-bold shadow-sm hover:bg-primary-700 flex justify-center items-center gap-2"
                >
                  <CheckCircle2 size={20} /> Mark Reviewed
                </button>
              )}
              <button 
                onClick={() => setSelectedSuggestion(null)}
                className="flex-1 bg-white border border-gray-200 text-gray-800 py-3.5 rounded-xl font-bold shadow-sm hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
