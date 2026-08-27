import React, { useState } from 'react';
import { Search, Filter, Plus, Calendar, FileText, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { exams as mockExams } from '../data/mockData';

export default function Examinations() {
  const [exams, setExams] = useState(mockExams);
  
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Examination Control</h1>
          <p className="mt-1 text-md text-gray-500">Manage exams, schedules, and operational readiness.</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Exam
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {exams.map(exam => (
          <div key={exam.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-200 bg-gray-50 flex justify-between items-start md:items-center">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-gray-900">{exam.name}</h2>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    exam.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                    exam.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {exam.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4" /> {exam.startDate} to {exam.endDate} • Classes: {exam.classes}
                </p>
              </div>
              
              {exam.status !== 'Completed' && (
                <button className="mt-3 md:mt-0 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 shadow-sm">
                  Manage Schedule
                </button>
              )}
            </div>
            
            <div className="p-5">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Exam Readiness Control</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className={`p-4 rounded-lg border ${exam.readiness?.questionPaper ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <p className={`font-semibold ${exam.readiness?.questionPaper ? 'text-green-900' : 'text-orange-900'}`}>Question Papers</p>
                    {exam.readiness?.questionPaper ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <AlertCircle className="w-5 h-5 text-orange-500" />}
                  </div>
                  <p className={`text-sm ${exam.readiness?.questionPaper ? 'text-green-700' : 'text-orange-700'}`}>
                    {exam.readiness?.questionPaper ? 'Printed and locked in strongroom' : 'Pending printing (Due in 2 days)'}
                  </p>
                </div>

                <div className={`p-4 rounded-lg border ${exam.readiness?.roomAssigned ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <p className={`font-semibold ${exam.readiness?.roomAssigned ? 'text-green-900' : 'text-orange-900'}`}>Room Allocation</p>
                    {exam.readiness?.roomAssigned ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <AlertCircle className="w-5 h-5 text-orange-500" />}
                  </div>
                  <p className={`text-sm ${exam.readiness?.roomAssigned ? 'text-green-700' : 'text-orange-700'}`}>
                    {exam.readiness?.roomAssigned ? 'All 18 rooms allocated' : 'Pending allocation'}
                  </p>
                </div>

                <div className={`p-4 rounded-lg border ${exam.readiness?.invigilator ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <p className={`font-semibold ${exam.readiness?.invigilator ? 'text-green-900' : 'text-orange-900'}`}>Invigilators</p>
                    {exam.readiness?.invigilator ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <AlertCircle className="w-5 h-5 text-orange-500" />}
                  </div>
                  <p className={`text-sm ${exam.readiness?.invigilator ? 'text-green-700' : 'text-orange-700'}`}>
                    {exam.readiness?.invigilator ? 'Duty roster published' : 'Duty roster pending'}
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-white border-gray-200 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-semibold text-gray-900">Marks Entry</p>
                    <FileText className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary-500 h-2 rounded-full" style={{ width: exam.readiness?.marksEntry === '42 / 42' ? '100%' : exam.readiness?.marksEntry === '0 / 42' ? '0%' : '50%' }}></div>
                    </div>
                    <span className="text-sm font-bold text-gray-700 whitespace-nowrap">{exam.readiness?.marksEntry || '0 / 42'}</span>
                  </div>
                </div>

              </div>
            </div>
            
            {exam.status === 'Upcoming' && (
               <div className="border-t border-gray-100 bg-gray-50 px-5 py-3">
                 <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
                   <Clock className="w-4 h-4 text-orange-500" /> Next Paper: Mathematics (Class X) - Tomorrow 09:00 AM
                 </p>
               </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
