import React, { useState } from 'react';
import { UserX, Clock, BookOpen, UserCheck, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';
import { mockAbsences, mockAdjustments, teachers as mockTeachers } from '../data/mockData';

export default function StaffAdjustments() {
  const [absences, setAbsences] = useState(mockAbsences);
  const [adjustments, setAdjustments] = useState(mockAdjustments);
  const [selectedAdjustment, setSelectedAdjustment] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const stats = {
    absent: absences.length,
    affected: adjustments.length,
    needed: adjustments.filter(a => a.status === 'Pending').length,
    adjusted: adjustments.filter(a => a.status === 'Adjusted').length,
  };

  const handleAssignClick = (adj) => {
    setSelectedAdjustment(adj);
    setShowAssignModal(true);
  };

  const handleConfirmAssignment = (teacherId, teacherName) => {
    setAdjustments(prev => prev.map(a => {
      if (a === selectedAdjustment) {
        return { ...a, status: 'Adjusted', replacement: teacherName };
      }
      return a;
    }));
    setShowAssignModal(false);
    setSelectedAdjustment(null);
  };

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
              <div key={idx} className={`bg-white rounded-xl border ${adj.status === 'Adjusted' ? 'border-green-200' : 'border-red-200'} shadow-sm p-5`}>
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
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                        <CheckCircle2 className="w-4 h-4" /> Adjusted
                      </span>
                      <p className="mt-2 text-sm text-gray-700 font-medium">
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
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-green-600" />
            Free Teachers Now
          </h2>
          <p className="text-sm text-gray-500 mb-4">Currently in Period 2 (08:45 - 09:30)</p>
          
          <div className="space-y-3">
            {mockTeachers.filter(t => t.status === 'Active' && t.todaySchedule.some(s => s.period === 2 && s.type === 'free')).map(teacher => (
              <div key={teacher.id} className="bg-white p-3 rounded-lg border border-gray-200 flex justify-between items-center shadow-sm">
                <div>
                  <p className="font-medium text-gray-900">{teacher.name}</p>
                  <p className="text-xs text-gray-500">{teacher.department}</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-md">Free</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assign Modal */}
      {showAssignModal && selectedAdjustment && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setShowAssignModal(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-xl leading-6 font-bold text-gray-900 mb-2">Assign Teacher for Adjustment</h3>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Class & Period</p>
                    <p className="font-bold text-lg text-gray-900">{selectedAdjustment.class} • Period {selectedAdjustment.period}</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Subject</p>
                    <p className="font-bold text-lg text-gray-900">{selectedAdjustment.subject}</p>
                  </div>
                </div>

                <h4 className="text-md font-semibold text-gray-900 mb-3">Teachers Available (Period {selectedAdjustment.period})</h4>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {mockTeachers
                    .filter(t => t.status === 'Active' && t.todaySchedule.some(s => s.period === selectedAdjustment.period && s.type === 'free'))
                    .map(teacher => {
                      const isSameSubject = teacher.subjects.includes(selectedAdjustment.subject);
                      return (
                        <div key={teacher.id} className="flex justify-between items-center p-4 bg-white border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-gray-900">{teacher.name}</p>
                              {isSameSubject && <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-semibold rounded">Preferred (Same Subject)</span>}
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{teacher.department}</p>
                            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Free in Period {selectedAdjustment.period}
                            </p>
                          </div>
                          <button
                            onClick={() => handleConfirmAssignment(teacher.id, teacher.name)}
                            className="px-4 py-2 bg-white border border-primary-600 text-primary-600 font-medium rounded-lg hover:bg-primary-50 transition-colors"
                          >
                            Assign
                          </button>
                        </div>
                      )
                    })}
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" onClick={() => setShowAssignModal(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
