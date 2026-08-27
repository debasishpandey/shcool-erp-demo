import React, { useState } from 'react';
import { UserX, Clock, BookOpen, UserCheck, Calendar, ArrowRight, CheckCircle2, Star, AlertCircle, ChevronDown } from 'lucide-react';
import { mockAbsences, mockAdjustments, teachers as mockTeachers } from '../data/mockData';

export default function StaffAdjustments() {
  const [absences, setAbsences] = useState(mockAbsences);
  const [adjustments, setAdjustments] = useState(mockAdjustments);
  const [selectedAdjustment, setSelectedAdjustment] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [widgetPeriod, setWidgetPeriod] = useState(2);

  const stats = {
    absent: absences.length,
    affected: adjustments.length,
    needed: adjustments.filter(a => a.status === 'Pending').length,
    adjusted: adjustments.filter(a => a.status === 'Adjusted').length,
  };

  const getSuggestedTeachers = (adjustment, targetPeriod) => {
    const periodToUse = adjustment ? adjustment.period : targetPeriod;
    
    let candidates = mockTeachers.filter(t => {
      // Exclude absent teachers entirely
      if (t.status === 'Absent' || t.todayStatus === 'Absent Today') return false;
      // Exclude the original teacher for this adjustment
      if (adjustment && t.name === adjustment.originalTeacher) return false;
      return true;
    });

    return candidates.map(t => {
      let score = 0;
      let recommendationType = 'Backup option';
      let isFree = false;
      let isSameSubject = false;
      let currentAssignment = 'Free / No class';
      
      const scheduleEntry = t.todaySchedule.find(s => s.period === periodToUse);
      if (scheduleEntry) {
        if (scheduleEntry.type === 'free' || !scheduleEntry.class) {
          isFree = true;
          score += 50;
        } else {
          // If they have a class, they can only be a backup if it's not the affected class
          if (adjustment && scheduleEntry.class === adjustment.class) {
             return null;
          }
          currentAssignment = `${scheduleEntry.class} — ${scheduleEntry.subject}`;
        }
      } else {
        // Assume free if no explicit schedule blocks them, but give lower confidence
        isFree = true;
        score += 30;
      }

      if (adjustment && t.subjects.includes(adjustment.subject)) {
        isSameSubject = true;
        score += 100;
      }
      
      score += 20; // Base active score

      if (isSameSubject && isFree) recommendationType = 'Preferred — Same Subject';
      else if (isFree) recommendationType = 'Available';

      return {
        ...t,
        score,
        isFree,
        isSameSubject,
        recommendationType,
        currentAssignment
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score);
  };

  const handleAssignClick = (adj) => {
    setSelectedAdjustment(adj);
    setShowAssignModal(true);
  };

  const handleAssignInit = (teacher) => {
    setSelectedTeacher(teacher);
    setShowAssignModal(false);
    setShowConfirmModal(true);
  };

  const handleConfirmAssignment = () => {
    setAdjustments(prev => prev.map(a => {
      if (a === selectedAdjustment) {
        return { ...a, status: 'Adjusted', replacement: selectedTeacher.name };
      }
      return a;
    }));
    setShowConfirmModal(false);
    setSelectedAdjustment(null);
    setSelectedTeacher(null);
  };

  const suggestedForModal = selectedAdjustment ? getSuggestedTeachers(selectedAdjustment) : [];
  const widgetTeachers = getSuggestedTeachers(null, widgetPeriod).filter(t => t.isFree);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Today's Staff Adjustment</h1>
          <p className="mt-1 text-md text-gray-500">Wednesday, 26 Aug 2026</p>
        </div>
      </div>

      {/* ADJUSTMENT DASHBOARD */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Teachers Absent</p>
          <p className="text-3xl font-bold text-red-600 mt-2">{stats.absent}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Classes Affected</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.affected}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Adjustments Needed</p>
          <p className="text-3xl font-bold text-orange-500 mt-2">{stats.needed}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Adjusted</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.adjusted}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Absences & Affected Classes */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 border-b pb-2">Classes Needing Adjustment</h2>
          
          <div className="space-y-4">
            {adjustments.map((adj, idx) => (
              <div key={idx} className={`bg-white rounded-xl border ${adj.status === 'Adjusted' ? 'border-green-200' : 'border-red-200'} shadow-sm p-5 transition-colors`}>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 font-bold rounded-md text-lg">{adj.class}</span>
                      <span className="text-md font-medium text-gray-700 bg-gray-50 px-2 py-1 rounded">Period {adj.period}</span>
                      <span className="text-md text-gray-600 font-medium">{adj.subject}</span>
                    </div>
                    <p className="mt-3 text-sm text-gray-500 flex items-center gap-1">
                      <UserX className="w-4 h-4 text-red-500" />
                      Original: <span className="font-semibold text-gray-700">{adj.originalTeacher}</span> (Absent)
                    </p>
                  </div>
                  
                  {adj.status === 'Pending' ? (
                    <button 
                      onClick={() => handleAssignClick(adj)}
                      className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
                    >
                      Find Teacher
                    </button>
                  ) : (
                    <div className="text-right">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-2">
                        <CheckCircle2 className="w-4 h-4" /> Adjusted
                      </span>
                      <p className="text-sm text-gray-700 font-medium">
                        Covered by: <span className="text-green-700">{adj.replacement}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Free Teachers Overview */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 h-fit">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-600" />
              Free Teachers Now
            </h2>
            <select 
              value={widgetPeriod}
              onChange={(e) => setWidgetPeriod(Number(e.target.value))}
              className="text-sm border-gray-300 rounded-md bg-white shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              {[1,2,3,4,5].map(p => (
                <option key={p} value={p}>Period {p}</option>
              ))}
            </select>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {widgetTeachers.length === 0 ? (
               <p className="text-sm text-gray-500 italic text-center py-4">No teachers explicitly free in this period.</p>
            ) : (
              widgetTeachers.map(teacher => (
                <div key={teacher.id} className="bg-white p-3 rounded-lg border border-gray-200 flex justify-between items-center shadow-sm">
                  <div>
                    <p className="font-medium text-gray-900">{teacher.name}</p>
                    <p className="text-xs text-gray-500">{teacher.subjects.join(", ")}</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-md">Free</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Assign Modal (Suggestions) */}
      {showAssignModal && selectedAdjustment && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setShowAssignModal(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl leading-6 font-bold text-gray-900">Suggested Teachers</h3>
                  <button onClick={() => setShowAssignModal(false)} className="text-gray-400 hover:text-gray-500">
                    <UserX className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Class & Period</p>
                    <p className="font-bold text-lg text-gray-900">{selectedAdjustment.class} • Period {selectedAdjustment.period}</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Subject</p>
                    <p className="font-bold text-lg text-gray-900">{selectedAdjustment.subject}</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Absent Teacher</p>
                    <p className="font-bold text-lg text-gray-900 text-red-600">{selectedAdjustment.originalTeacher}</p>
                  </div>
                </div>

                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                  {!suggestedForModal.some(t => t.isFree) && (
                    <div className="bg-orange-50 border border-orange-200 text-orange-800 p-4 rounded-lg flex gap-3">
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm">No teacher marked explicitly free</h4>
                        <p className="text-sm mt-1 text-orange-700">These teachers are active but have no free class assigned for this period in the demo schedule. Showing possible backup teachers.</p>
                      </div>
                    </div>
                  )}

                  {suggestedForModal.map((teacher, index) => {
                    const isTopMatch = index === 0 && teacher.isSameSubject && teacher.isFree;
                    
                    return (
                      <div key={teacher.id} className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white border ${isTopMatch ? 'border-primary-500 shadow-md ring-1 ring-primary-500' : 'border-gray-200'} rounded-lg hover:border-primary-300 transition-all gap-4`}>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {isTopMatch && <Star className="w-4 h-4 text-amber-500 fill-amber-500" />}
                            <p className={`font-bold text-lg ${isTopMatch ? 'text-primary-700' : 'text-gray-900'}`}>{teacher.name}</p>
                            {isTopMatch && <span className="px-2 py-0.5 bg-primary-100 text-primary-800 text-xs font-bold rounded-full uppercase tracking-wider">Recommended</span>}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                            <p className="text-gray-600"><span className="text-gray-400">Dept:</span> {teacher.department}</p>
                            <p className="text-gray-600"><span className="text-gray-400">Subject:</span> {teacher.subjects.join(', ')}</p>
                            
                            <p className={`flex items-center gap-1 font-medium mt-1 ${teacher.isFree ? 'text-green-600' : 'text-gray-600'}`}>
                              {teacher.isFree ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                              Status: {teacher.isFree ? `Free in Period ${selectedAdjustment.period}` : 'Active'}
                            </p>
                            <p className="text-gray-500 mt-1 truncate" title={teacher.currentAssignment}>
                              <span className="text-gray-400">Current P{selectedAdjustment.period}:</span> {teacher.currentAssignment}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2 w-full sm:w-auto">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-md w-fit
                            ${teacher.recommendationType.includes('Preferred') ? 'bg-blue-100 text-blue-800' : 
                              teacher.recommendationType === 'Available' ? 'bg-green-100 text-green-800' : 
                              'bg-gray-100 text-gray-700'}`}>
                            {teacher.recommendationType}
                          </span>
                          <button
                            onClick={() => handleAssignInit(teacher)}
                            className="w-full sm:w-auto px-6 py-2.5 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
                          >
                            Assign
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-200">
                <button type="button" onClick={() => setShowAssignModal(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && selectedAdjustment && selectedTeacher && (
        <div className="fixed inset-0 z-[60] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setShowConfirmModal(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
              
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                  <UserCheck className="h-6 w-6 text-green-600" aria-hidden="true" />
                </div>
                <h3 className="text-xl leading-6 font-bold text-gray-900 mb-2">Confirm Class Adjustment</h3>
                
                <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200 text-left space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Class:</span>
                    <span className="font-semibold text-gray-900">{selectedAdjustment.class}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Period:</span>
                    <span className="font-semibold text-gray-900">{selectedAdjustment.period}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Subject:</span>
                    <span className="font-semibold text-gray-900">{selectedAdjustment.subject}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-2">
                    <span className="text-sm text-gray-500">Absent Teacher:</span>
                    <span className="font-medium text-red-600">{selectedAdjustment.originalTeacher}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Replacement:</span>
                    <span className="font-bold text-green-700">{selectedTeacher.name}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-200">
                <button 
                  type="button" 
                  onClick={handleConfirmAssignment} 
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Confirm Adjustment
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setShowConfirmModal(false);
                    setShowAssignModal(true);
                  }} 
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

