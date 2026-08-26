import { useMockData } from '../../context/MockDataContext';
import { Calendar, Clock, BookOpen, CreditCard, Award, UserCheck, Bell, ChevronRight, Download } from 'lucide-react';

export default function ParentDashboard() {
  const { data } = useMockData();
  const { students, homework, notices } = data;
  
  // For demo, we just pick the first student in the context and pretend it's their child
  const child = students[0];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row gap-6 items-center md:items-start justify-between">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-3xl font-bold shadow-sm">
            {child.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{child.name}</h1>
            <p className="text-gray-500 font-medium">Class {child.class}-{child.section} • Roll No: {child.rollNo}</p>
            <div className="mt-2 flex gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Attendance: {child.attendance}
              </span>
            </div>
          </div>
        </div>
        <div className="text-center md:text-right bg-gray-50 p-4 rounded-lg border border-gray-100 min-w-[200px]">
          <p className="text-sm font-medium text-gray-500">Pending Fees</p>
          <p className="text-2xl font-bold text-red-600">₹{child.pendingFee.toLocaleString()}</p>
          <button className="mt-2 text-xs font-medium text-primary-600 hover:text-primary-800">Pay Now →</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Homework Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-500" /> Recent Homework
              </h2>
              <button className="text-sm text-primary-600 font-medium">View All</button>
            </div>
            <ul className="divide-y divide-gray-100">
              {homework.slice(0, 3).map(hw => (
                <li key={hw.id} className="p-4 sm:px-6 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{hw.title}</h3>
                    <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded">Pending</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">{hw.subject}</p>
                  <div className="flex items-center text-xs text-gray-500 font-medium">
                    <Clock className="w-4 h-4 mr-1" /> Due: {hw.dueDate}
                  </div>
                </li>
              ))}
              {homework.length === 0 && (
                <li className="p-6 text-center text-gray-500 text-sm">No recent homework assigned.</li>
              )}
            </ul>
          </div>

          {/* Attendance Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-blue-500" /> Attendance Overview
              </h2>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-500">Current Month</span>
                <span className="text-sm font-bold text-gray-900">{child.attendance} Present</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: child.attendance }}></div>
              </div>
              
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {['M','T','W','T','F','S','S'].map((d,i) => <div key={i} className="font-medium text-gray-400 py-1">{d}</div>)}
                {[...Array(30)].map((_, i) => (
                  <div key={i} className={`aspect-square flex items-center justify-center rounded-sm ${
                    i === 14 ? 'bg-red-100 text-red-600 font-bold' : // One absent day
                    i > 25 ? 'bg-gray-50 text-gray-300' : // Future days
                    i % 7 === 6 ? 'bg-gray-100 text-gray-400' : // Sundays
                    'bg-green-100 text-green-700 font-bold' // Present
                  }`}>
                    {i+1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Notices */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Bell className="w-5 h-5 text-amber-500" /> School Notices
              </h2>
            </div>
            <ul className="divide-y divide-gray-100">
              {notices.slice(0, 3).map(notice => (
                <li key={notice.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <p className="text-xs text-gray-400 mb-1">{notice.date}</p>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{notice.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{notice.content}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Quick Links</h2>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-primary-300 hover:bg-primary-50 transition-colors">
                <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Award className="w-4 h-4 text-primary-500" /> View Report Card
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-primary-300 hover:bg-primary-50 transition-colors">
                <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Calendar className="w-4 h-4 text-primary-500" /> Exam Time Table
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-primary-300 hover:bg-primary-50 transition-colors">
                <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Download className="w-4 h-4 text-primary-500" /> Download Fee Receipt
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
