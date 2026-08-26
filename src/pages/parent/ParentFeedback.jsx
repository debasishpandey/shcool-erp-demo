import { useState } from 'react';
import { ArrowLeft, MessageSquare, Plus, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { parentSuggestions } from '../../data/parentMockData';

export default function ParentFeedback() {
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState(parentSuggestions);
  const [isCreating, setIsCreating] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);

  const [formCategory, setFormCategory] = useState('Academic');
  const [formMessage, setFormMessage] = useState('');
  const [formAnonymous, setFormAnonymous] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formMessage.trim()) return;

    const newSuggestion = {
      id: Date.now(),
      message: formMessage,
      status: 'Under Review',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    setSuggestions([newSuggestion, ...suggestions]);
    setIsCreating(false);
    setFormMessage('');
    setFormAnonymous(false);
    
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 2500);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-20 relative">
      <div className="bg-white px-4 py-4 shadow-sm z-10 sticky top-0 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600">
            <ArrowLeft size={24} />
          </button>
          <h1 className="font-black text-gray-900 text-lg">My Suggestions</h1>
        </div>
      </div>

      {isToastVisible && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-11/12 max-w-[400px] z-50">
          <div className="bg-gray-900 text-white p-4 rounded-xl shadow-xl flex items-center gap-2 font-bold border border-gray-700">
            <CheckCircle2 size={20} className="text-green-400" />
            <div>
              <p className="text-sm font-black">Suggestion submitted</p>
              <p className="text-xs font-semibold text-gray-300">School will review it shortly.</p>
            </div>
          </div>
        </div>
      )}

      <div className="p-4 space-y-4">
        
        <button 
          onClick={() => setIsCreating(true)}
          className="w-full bg-white border border-gray-200 text-gray-800 py-3 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-50 active:bg-gray-100 transition-colors flex justify-center items-center gap-2"
        >
          <Plus size={18} /> Send Suggestion
        </button>

        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mt-4">History</h2>
        
        <div className="space-y-3">
          {suggestions.map((s) => (
            <div key={s.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider ${
                  s.status === 'Reviewed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  {s.status}
                </span>
                <span className="text-[10px] font-bold text-gray-400">{s.date}</span>
              </div>
              <p className="text-sm font-medium text-gray-700 leading-relaxed">
                "{s.message}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Create Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-gray-900/60 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-[480px] rounded-t-3xl pt-2 pb-safe shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex justify-center mb-2">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
            </div>
            
            <div className="px-6 py-2 flex justify-between items-center mb-4">
              <h2 className="font-black text-gray-900 text-xl">New Suggestion</h2>
              <button onClick={() => setIsCreating(false)} className="p-2 bg-gray-100 rounded-full text-gray-600 shrink-0">
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto px-6 pb-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Category</label>
                  <select 
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-primary-500 outline-none"
                  >
                    <option>Academic</option>
                    <option>Homework</option>
                    <option>Transport</option>
                    <option>Facilities</option>
                    <option>Communication</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Message</label>
                  <textarea 
                    rows="4"
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="Write your suggestion here..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm font-medium text-gray-900 focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                    required
                  ></textarea>
                </div>

                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <input 
                    type="checkbox" 
                    id="anonymous" 
                    checked={formAnonymous}
                    onChange={(e) => setFormAnonymous(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <div>
                    <label htmlFor="anonymous" className="font-bold text-gray-900 text-sm block">Send anonymously</label>
                    <p className="text-xs text-gray-500">Your name will not be visible to teachers.</p>
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full bg-primary-600 text-white font-black text-lg py-4 rounded-xl shadow-sm hover:bg-primary-700 active:scale-[0.98] transition-all"
                  >
                    Submit Suggestion
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
