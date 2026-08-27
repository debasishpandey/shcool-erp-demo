import React, { useState } from 'react';
import { Search, Filter, Plus, BookOpen, Phone, Mail, Clock, Calendar, MoreVertical, Edit, UserCheck } from 'lucide-react';
import { teachers as mockTeachers } from '../data/mockData';

export default function Teachers() {
  const [teachers, setTeachers] = useState(mockTeachers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const filteredTeachers = teachers.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssignClass = (teacher) => {
    setSelectedTeacher(teacher);
    setShowAssignModal(true);
  };

  const handleConfirmAssignment = (e) => {
    e.preventDefault();
    // Local state mock update
    setShowAssignModal(false);
    alert('Teaching assignment added successfully.');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
          <p className="mt-1 text-md text-gray-500">Manage teaching and non-teaching staff.</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Staff
          </button>
        </div>
      </div>

      {/* Main Layout: List/Table and Detail View */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Side: Teacher List Table */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search staff by name, ID, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="p-4">Employee</th>
                  <th className="p-4">Department</th>
                  <th className="p-4">Classes / Roles</th>
                  <th className="p-4">Today's Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTeachers.map(teacher => (
                  <tr 
                    key={teacher.id} 
                    onClick={() => setSelectedTeacher(teacher)}
                    className={`cursor-pointer hover:bg-primary-50 transition-colors ${selectedTeacher?.id === teacher.id ? 'bg-primary-50' : ''}`}
                  >
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                          {teacher.name.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-semibold text-gray-900">{teacher.name}</p>
                          <p className="text-xs text-gray-500">{teacher.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-700">{teacher.department}</td>
                    <td className="p-4">
                      {teacher.isClassTeacher && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mb-1">
                          Class Teacher: {teacher.classTeacherOf}
                        </span>
                      )}
                      <p className="text-xs text-gray-500">Teaching: {teacher.teachingClasses.join(', ')}</p>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        teacher.todayStatus === 'Present' ? 'bg-green-100 text-green-800' : 
                        teacher.todayStatus === 'Absent Today' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {teacher.todayStatus}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleAssignClass(teacher); }}
                        className="text-primary-600 hover:text-primary-900 text-sm font-medium mr-3"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Teacher Detail View */}
        {selectedTeacher && (
          <div className="w-full lg:w-96 bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-fit sticky top-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-2xl">
                  {selectedTeacher.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold text-gray-900">{selectedTeacher.name}</h2>
                  <p className="text-sm text-gray-500">{selectedTeacher.id}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Contact & Info</h3>
                <div className="space-y-3 text-sm">
                  <p className="flex items-center text-gray-700"><BookOpen className="w-4 h-4 mr-3 text-gray-400" /> Dept: <span className="font-medium ml-1">{selectedTeacher.department}</span></p>
                  <p className="flex items-center text-gray-700"><Phone className="w-4 h-4 mr-3 text-gray-400" /> {selectedTeacher.contact}</p>
                  <p className="flex items-center text-gray-700"><Mail className="w-4 h-4 mr-3 text-gray-400" /> {selectedTeacher.email}</p>
                  <p className="flex items-center text-gray-700">
                    <UserCheck className="w-4 h-4 mr-3 text-gray-400" /> Status: 
                    <span className={`ml-2 font-medium ${selectedTeacher.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>{selectedTeacher.status}</span>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Responsibilities</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2 border border-gray-100 text-sm">
                  <p className="text-gray-700"><strong>Class Teacher:</strong> {selectedTeacher.isClassTeacher ? selectedTeacher.classTeacherOf : 'None'}</p>
                  <p className="text-gray-700"><strong>Subjects:</strong> {selectedTeacher.subjects.join(', ')}</p>
                  <p className="text-gray-700"><strong>Teaching Classes:</strong> {selectedTeacher.teachingClasses.join(', ')}</p>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex justify-between items-center">
                  Today's Schedule
                  <span className={`text-xs px-2 py-0.5 rounded ${selectedTeacher.todayStatus === 'Present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {selectedTeacher.todayStatus}
                  </span>
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                  {selectedTeacher.todaySchedule.length > 0 ? (
                    selectedTeacher.todaySchedule.map((slot, i) => (
                      <div key={i} className={`p-3 rounded-lg flex items-center justify-between border ${slot.type === 'free' ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-100'}`}>
                        <div>
                          <p className="text-xs font-semibold text-gray-500">Period {slot.period} <span className="font-normal text-gray-400">({slot.time})</span></p>
                          {slot.type === 'class' ? (
                            <p className="text-sm font-bold text-gray-900 mt-1">{slot.class} <span className="font-medium text-gray-600 text-xs ml-1">• {slot.subject}</span></p>
                          ) : (
                            <p className="text-sm font-medium text-gray-500 mt-1 italic">Free Period</p>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 italic">No schedule available.</p>
                  )}
                </div>
              </div>
              
              <button 
                onClick={() => handleAssignClass(selectedTeacher)}
                className="w-full py-2 bg-white border-2 border-primary-600 text-primary-700 rounded-lg text-sm font-bold hover:bg-primary-50 transition-colors"
              >
                Assign Class / Subject
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Assign Class Modal */}
      {showAssignModal && selectedTeacher && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowAssignModal(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
              <form onSubmit={handleConfirmAssignment}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg leading-6 font-bold text-gray-900 mb-4">Assign Class to {selectedTeacher.name}</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                      <select className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                        <option>Subject Teacher</option>
                        <option>Class Teacher</option>
                      </select>
                      <p className="text-xs text-amber-600 mt-1 mt-1">Note: A class can only have ONE Class Teacher. Assigning this will replace the current Class Teacher.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                        <select className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                          <option>VIII</option>
                          <option>IX</option>
                          <option>X</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                        <select className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                          <option>A</option>
                          <option>B</option>
                          <option>C</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                      <select className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                        {selectedTeacher.subjects.map(s => <option key={s}>{s}</option>)}
                        <option>Other...</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Periods per week</label>
                      <input type="number" min="1" max="10" defaultValue="6" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 flex flex-row-reverse">
                  <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                    Assign
                  </button>
                  <button type="button" onClick={() => setShowAssignModal(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm">
                    Cancel
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
