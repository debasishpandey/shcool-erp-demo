import React, { useState } from 'react';
import { Search, Filter, UserCheck, UserX, AlertCircle, Download, Users, TrendingUp } from 'lucide-react';
import { students as mockStudents } from '../data/mockData';

export default function Attendance() {
  const [filter, setFilter] = useState('All');
  const [students] = useState(mockStudents);

  const filteredStudents = students.filter(s => {
    if (filter === 'All') return true;
    if (filter === 'Present') return parseInt(s.overallAttendance) >= 90;
    if (filter === 'Absent') return parseInt(s.overallAttendance) < 90;
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">School Attendance Reports</h1>
          <p className="mt-1 text-md text-gray-500">Daily attendance and overall analytics.</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <input type="date" defaultValue="2026-08-26" className="border-gray-300 rounded-lg text-sm px-3 py-2 text-gray-700" />
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">School Average</p>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-2">94.9%</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Total Present Today</p>
            <UserCheck className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-2">1,084 <span className="text-sm font-normal text-gray-500">/ 1,142</span></p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-red-200 bg-red-50">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-red-600">Total Absent Today</p>
            <UserX className="w-4 h-4 text-red-500" />
          </div>
          <p className="text-3xl font-bold text-red-700 mt-2">58</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Below 75% Target</p>
            <AlertCircle className="w-4 h-4 text-orange-500" />
          </div>
          <p className="text-3xl font-bold text-orange-600 mt-2">12 <span className="text-sm font-normal text-gray-500">students</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Col: Analytics Insights */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b pb-2 mb-3">Class Comparison</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">Class X</span>
                  <span className="font-bold text-green-600">95%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">Class IX</span>
                  <span className="font-bold text-green-600">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">Class VIII</span>
                  <span className="font-bold text-orange-500">89%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '89%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">Class V</span>
                  <span className="font-bold text-green-600">93%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '93%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 rounded-xl shadow-sm border border-orange-200 p-5">
            <h3 className="text-sm font-bold text-orange-900 uppercase tracking-wider border-b border-orange-200 pb-2 mb-3">Action Needed</h3>
            <p className="text-xs text-orange-700 mb-3">Students below attendance threshold.</p>
            <div className="space-y-3">
              {students.filter(s => parseInt(s.overallAttendance) < 75).map(s => (
                <div key={s.id} className="flex justify-between items-center bg-white p-2 rounded border border-orange-100">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{s.name}</p>
                    <p className="text-xs text-gray-500">{s.class}-{s.section}</p>
                  </div>
                  <span className="text-red-600 font-bold text-sm">{s.overallAttendance}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Daily Report Table */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-2">
              <button onClick={() => setFilter('All')} className={`px-4 py-1.5 rounded-full text-sm font-medium ${filter === 'All' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>All</button>
              <button onClick={() => setFilter('Present')} className={`px-4 py-1.5 rounded-full text-sm font-medium ${filter === 'Present' ? 'bg-green-600 text-white' : 'bg-green-50 text-green-700 hover:bg-green-100'}`}>Present</button>
              <button onClick={() => setFilter('Absent')} className={`px-4 py-1.5 rounded-full text-sm font-medium ${filter === 'Absent' ? 'bg-red-600 text-white' : 'bg-red-50 text-red-700 hover:bg-red-100'}`}>Absent</button>
            </div>
            
            <div className="flex items-center gap-2">
              <select className="border-gray-300 rounded-md text-sm py-1.5 pl-3 pr-8 focus:ring-primary-500 focus:border-primary-500">
                <option>All Classes</option>
                <option>Class X</option>
                <option>Class VIII</option>
              </select>
              <select className="border-gray-300 rounded-md text-sm py-1.5 pl-3 pr-8 focus:ring-primary-500 focus:border-primary-500">
                <option>All Sections</option>
                <option>A</option>
                <option>B</option>
              </select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="p-4">Student</th>
                  <th className="p-4">Class</th>
                  <th className="p-4">Roll No</th>
                  <th className="p-4">Today's Status</th>
                  <th className="p-4">Time / Marked By</th>
                  <th className="p-4">Overall %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStudents.map(student => {
                  const isPresent = parseInt(student.overallAttendance) >= 80;
                  return (
                    <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <p className="text-sm font-semibold text-gray-900">{student.name}</p>
                        <p className="text-xs text-gray-500">{student.admissionNo}</p>
                      </td>
                      <td className="p-4 text-sm text-gray-700">{student.class}-{student.section}</td>
                      <td className="p-4 text-sm text-gray-700">{student.rollNo}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          isPresent ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {isPresent ? 'Present' : 'Absent'}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-700">
                        {isPresent ? (
                          <>
                            <p className="font-medium">08:21 AM</p>
                            <p className="text-xs text-gray-500">Auto (RFID)</p>
                          </>
                        ) : (
                          <>
                            <p className="font-medium">—</p>
                            <p className="text-xs text-gray-500">Sunita Sharma</p>
                          </>
                        )}
                      </td>
                      <td className="p-4">
                        <p className={`text-sm font-bold ${parseInt(student.overallAttendance) >= 75 ? 'text-green-600' : 'text-red-600'}`}>
                          {student.overallAttendance}%
                        </p>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
