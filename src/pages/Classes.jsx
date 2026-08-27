import React, { useState } from 'react';
import { Search, Users, BookOpen, UserCheck, AlertCircle, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import { classes as mockClasses } from '../data/mockData';

export default function Classes() {
  const [classes, setClasses] = useState(mockClasses);
  const [selectedClass, setSelectedClass] = useState(null);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Class Management</h1>
          <p className="mt-1 text-md text-gray-500">Monitor class performance, attendance, and details.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Side: Class List */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 h-fit">
          {classes.map(cls => (
            <div 
              key={cls.id} 
              onClick={() => setSelectedClass(cls)}
              className={`bg-white rounded-xl shadow-sm border p-5 cursor-pointer transition-colors ${selectedClass?.id === cls.id ? 'border-primary-500 ring-1 ring-primary-500' : 'border-gray-200 hover:border-primary-300'}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{cls.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{cls.students} Students</p>
                </div>
                <div className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-semibold">
                  {cls.todayClasses} Classes Today
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-700"><strong>Class Teacher:</strong> <span className="text-primary-600">{cls.classTeacher}</span></p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {cls.subjects.map(s => <span key={s} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">{s}</span>)}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-4 mt-2">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Attendance</p>
                  <p className={`font-bold ${parseInt(cls.attendance) >= 90 ? 'text-green-600' : 'text-orange-500'}`}>{cls.attendance}</p>
                </div>
                <div className="text-center border-l border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Fees</p>
                  <p className="font-bold text-gray-900">{cls.feeCollection}</p>
                </div>
                <div className="text-center border-l border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Alerts</p>
                  <p className={`font-bold ${cls.openConcerns > 0 ? 'text-red-600' : 'text-gray-400'}`}>{cls.openConcerns || '-'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Class Detail View */}
        {selectedClass && (
          <div className="w-full lg:w-96 bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-fit sticky top-6">
            <div className="border-b border-gray-200 pb-4 mb-4">
              <div className="flex justify-between items-center mb-1">
                <h2 className="text-2xl font-bold text-gray-900">{selectedClass.name}</h2>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">Active</span>
              </div>
              <p className="text-sm text-gray-500">{selectedClass.students} Students • {selectedClass.classTeacher}</p>
            </div>

            <div className="space-y-6">
              
              {/* Today's Snapshot */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Today's Snapshot</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <p className="text-xs text-gray-500 flex items-center gap-1"><UserCheck className="w-3 h-3"/> Attendance</p>
                    <p className="text-lg font-bold text-gray-900 mt-1">38 <span className="text-sm font-normal text-gray-500">/ 42</span></p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <p className="text-xs text-gray-500 flex items-center gap-1"><BookOpen className="w-3 h-3"/> Homework</p>
                    <p className="text-lg font-bold text-gray-900 mt-1">34 <span className="text-sm font-normal text-gray-500">/ 42</span></p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 col-span-2 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500 flex items-center gap-1"><Users className="w-3 h-3"/> Class Teacher</p>
                      <p className="text-sm font-bold text-gray-900 mt-1">{selectedClass.classTeacher}</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">Present</span>
                  </div>
                </div>
              </div>

              {/* Class Alerts */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Class Alerts</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 bg-red-50 p-3 rounded-lg border border-red-100">
                    <AlertCircle className="w-4 h-4 text-red-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-red-900">4 students absent</p>
                      <p className="text-xs text-red-700">Attendance below 90% target today.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 bg-orange-50 p-3 rounded-lg border border-orange-100">
                    <Clock className="w-4 h-4 text-orange-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-orange-900">8 students homework pending</p>
                      <p className="text-xs text-orange-700">Mathematics assignment from yesterday.</p>
                    </div>
                  </div>
                  {selectedClass.openConcerns > 0 && (
                    <div className="flex items-start gap-2 bg-blue-50 p-3 rounded-lg border border-blue-100">
                      <Users className="w-4 h-4 text-blue-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-blue-900">{selectedClass.openConcerns} parent concerns</p>
                        <p className="text-xs text-blue-700">Pending response from Class Teacher.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Teachers */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Assigned Teachers</h3>
                <div className="space-y-2">
                  {selectedClass.teachers.map((t, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <p className="text-sm font-medium text-gray-900">{t}</p>
                      <span className="text-xs text-gray-500">{selectedClass.subjects[idx] || 'Subject'}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4">
                <button className="py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">View Timetable</button>
                <button className="py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700">Student List</button>
              </div>

            </div>
          </div>
        )}
      </div>

    </div>
  );
}
