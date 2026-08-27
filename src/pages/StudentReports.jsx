import React, { useState } from 'react';
import { Search, Filter, Download, UserPlus, FileText, CheckCircle, AlertCircle, Phone } from 'lucide-react';
import { students as mockStudents, mockAdmissionsAnalytics } from '../data/mockData';
import { Link } from 'react-router-dom';

export default function StudentReports() {
  const [activeTab, setActiveTab] = useState('directory');
  const [students] = useState(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.admissionNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Reports</h1>
          <p className="mt-1 text-md text-gray-500">Comprehensive student analytics and directory.</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button 
            onClick={() => setActiveTab('directory')}
            className={`${activeTab === 'directory' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
          >
            Student Directory
          </button>
          <button 
            onClick={() => setActiveTab('admissions')}
            className={`${activeTab === 'admissions' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
          >
            Admission Sources ("Who came how")
          </button>
        </nav>
      </div>

      {activeTab === 'directory' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by student name, admission no..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden">
                <span className="pl-3 pr-2 text-gray-500"><Filter className="w-4 h-4" /></span>
                <select className="border-0 text-sm py-2 pr-8 focus:ring-0 bg-transparent text-gray-700 font-medium">
                  <option>All Classes</option>
                  <option>Class X</option>
                  <option>Class VIII</option>
                </select>
              </div>
              <select className="border-gray-300 rounded-lg text-sm py-2 pl-3 pr-8 focus:ring-primary-500 focus:border-primary-500 font-medium">
                <option>All Sections</option>
                <option>A</option>
                <option>B</option>
              </select>
              <select className="border-gray-300 rounded-lg text-sm py-2 pl-3 pr-8 focus:ring-primary-500 focus:border-primary-500 font-medium">
                <option>All Attendance</option>
                <option>Below 75%</option>
                <option>Above 90%</option>
              </select>
              <select className="border-gray-300 rounded-lg text-sm py-2 pl-3 pr-8 focus:ring-primary-500 focus:border-primary-500 font-medium">
                <option>Fee Status</option>
                <option>Pending</option>
                <option>Overdue</option>
              </select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="p-4">Student</th>
                  <th className="p-4">Class</th>
                  <th className="p-4">Attendance</th>
                  <th className="p-4">Homework</th>
                  <th className="p-4">Exam %</th>
                  <th className="p-4">Fee Due</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStudents.map(student => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                          {student.name.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-semibold text-gray-900">{student.name}</p>
                          <p className="text-xs text-gray-500">{student.admissionNo}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-700">{student.class}-{student.section}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        parseInt(student.overallAttendance) >= 75 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {student.overallAttendance}%
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-700">{student.homework || '-'}</td>
                    <td className="p-4 text-sm font-semibold text-gray-700">{student.examPerformance}%</td>
                    <td className="p-4">
                      {student.pendingFee > 0 ? (
                        <span className={`text-sm font-bold ${student.feeStatus === 'Overdue' ? 'text-red-600' : 'text-orange-600'}`}>
                          ₹{student.pendingFee}
                        </span>
                      ) : (
                        <span className="text-sm text-green-600 font-medium flex items-center"><CheckCircle className="w-3 h-3 mr-1" /> Paid</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <Link to={`/students/${student.id}`} className="text-primary-600 hover:text-primary-900 text-sm font-medium mr-3">
                        View 360°
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'admissions' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-fit">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Admissions Summary</h3>
              <div className="space-y-4">
                {mockAdmissionsAnalytics.sources.map((s, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">{s.source}</span>
                      <span className="font-bold text-gray-900">{s.count}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-primary-500 h-2 rounded-full" style={{ width: `${(s.count / 111) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t border-gray-100 mt-4">
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-gray-900">Total New Admissions</span>
                    <span className="font-bold text-primary-600">111</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Recently Admitted Students</h3>
                <div className="flex gap-2">
                  <select className="border-gray-300 rounded-md text-sm py-1.5 pl-3 pr-8">
                    <option>All Sources</option>
                    <option>Online Enquiry</option>
                    <option>Walk-in</option>
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <th className="p-4">Student</th>
                      <th className="p-4">Class</th>
                      <th className="p-4">Source</th>
                      <th className="p-4">Parent Contact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {students.slice(0, 10).map(student => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="p-4">
                          <p className="text-sm font-semibold text-gray-900">{student.name}</p>
                          <p className="text-xs text-gray-500">{student.admissionNo}</p>
                        </td>
                        <td className="p-4 text-sm text-gray-700">{student.class}-{student.section}</td>
                        <td className="p-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                            {student.admissionSource || 'Online Enquiry'}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-gray-700 flex flex-col">
                          <span className="font-medium">{student.parent}</span>
                          <span className="text-xs text-gray-500 flex items-center mt-0.5"><Phone className="w-3 h-3 mr-1" /> {student.phone}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
