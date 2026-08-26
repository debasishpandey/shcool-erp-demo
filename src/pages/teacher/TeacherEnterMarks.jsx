import { useState } from 'react';
import { ArrowLeft, CheckCircle2, ChevronDown, Edit3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { latestExam, teachingCombinations, examResultsVIII_A } from '../../data/teacherMockData';

export default function TeacherEnterMarks() {
  const navigate = useNavigate();
  
  const [selectedCombo, setSelectedCombo] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [marksState, setMarksState] = useState({});
  const [isSaved, setIsSaved] = useState(false);

  // Initialize marks state when a combo is selected
  const handleSelectCombo = (combo) => {
    setSelectedCombo(combo);
    setIsDropdownOpen(false);
    
    // Seed initial marks from mock data if available
    const initialMarks = {};
    examResultsVIII_A.forEach(student => {
      // Just use the Mathematics/Science marks as a realistic base for the demo
      initialMarks[student.rollNo] = student.marks?.[combo.subject] ?? '';
    });
    setMarksState(initialMarks);
  };

  const handleMarkChange = (studentId, value) => {
    // Only allow numbers up to 100
    if (value === '' || (/^\d+$/.test(value) && parseInt(value) <= 100)) {
      setMarksState(prev => ({
        ...prev,
        [studentId]: value
      }));
    }
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      navigate(-1);
    }, 2000);
  };

  // Calculate entered vs total
  const totalStudents = examResultsVIII_A.length;
  const enteredMarksCount = Object.values(marksState).filter(val => val !== '' && val !== null).length;

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-24 relative">
      <div className="bg-white px-4 py-4 shadow-sm z-20 sticky top-0 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600">
            <ArrowLeft size={24} />
          </button>
          <h1 className="font-black text-gray-900 text-lg">Enter Marks</h1>
        </div>

        {/* Custom Dropdown for Teaching Assignment */}
        <div className="relative">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Teaching Assignment</label>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl flex items-center justify-between text-left focus:ring-2 focus:ring-primary-500 transition-shadow"
          >
            {selectedCombo ? (
              <div>
                <span className="font-black text-gray-900">{selectedCombo.class}</span>
                <span className="text-gray-400 mx-2">—</span>
                <span className="font-semibold text-gray-700">{selectedCombo.subject}</span>
              </div>
            ) : (
              <span className="text-gray-400 font-semibold">Select Class & Subject...</span>
            )}
            <ChevronDown size={20} className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden z-30">
              {teachingCombinations.map((combo, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectCombo(combo)}
                  className="w-full text-left p-4 border-b border-gray-50 hover:bg-primary-50 active:bg-primary-100 transition-colors flex items-center justify-between group"
                >
                  <div>
                    <span className="font-black text-gray-900 group-hover:text-primary-900">{combo.class}</span>
                    <span className="text-gray-400 mx-2">—</span>
                    <span className="font-semibold text-gray-700 group-hover:text-primary-700">{combo.subject}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Success Toast */}
      {isSaved && (
        <div className="fixed top-36 left-1/2 transform -translate-x-1/2 w-11/12 max-w-[400px] z-50">
          <div className="bg-gray-900 text-white p-4 rounded-xl shadow-xl flex items-center gap-2 font-bold border border-gray-700">
            <CheckCircle2 size={20} className="text-green-400" />
            <span>Marks saved successfully</span>
          </div>
        </div>
      )}

      {/* Marks Entry List */}
      {selectedCombo ? (
        <div className="p-4 space-y-3">
          <div className="flex justify-between items-center mb-2 px-1">
            <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">{latestExam.name}</span>
            <span className={`text-sm font-black ${enteredMarksCount === totalStudents ? 'text-green-600' : 'text-blue-600'}`}>
              {enteredMarksCount} / {totalStudents} Entered
            </span>
          </div>

          {examResultsVIII_A.map(student => (
            <div key={student.rollNo} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900 text-base leading-tight">{student.name}</h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">Roll No. {student.rollNo}</p>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-xl border border-gray-200">
                <input 
                  type="text"
                  inputMode="numeric"
                  value={marksState[student.rollNo] ?? ''}
                  onChange={(e) => handleMarkChange(student.rollNo, e.target.value)}
                  className="w-16 h-12 bg-white border border-gray-200 rounded-lg text-center font-black text-xl text-gray-900 focus:ring-2 focus:ring-primary-500 outline-none shadow-inner"
                  placeholder="-"
                />
                <span className="text-gray-400 font-bold text-sm pr-2">/ 100</span>
              </div>
            </div>
          ))}

          {/* Sticky Save Button */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-10 pb-safe">
            <button 
              onClick={handleSave}
              disabled={isSaved}
              className="w-full bg-primary-600 text-white font-black text-lg py-4 rounded-xl shadow-sm hover:bg-primary-700 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={24} /> Save Marks
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-400">
          <Edit3 size={48} className="mb-4 text-gray-200" />
          <p className="font-bold">Select a class and subject above to start entering marks.</p>
        </div>
      )}

    </div>
  );
}
