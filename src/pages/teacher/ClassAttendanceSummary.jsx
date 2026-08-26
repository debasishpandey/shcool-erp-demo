import { ChevronDown, AlertTriangle, ArrowLeft } from 'lucide-react';
import { classAttendanceSummary } from '../../data/teacherMockData';
import { useNavigate } from 'react-router-dom';

export default function ClassAttendanceSummary() {
  const navigate = useNavigate();
  const { class: className, month, percentage, present, absent, late, attentionNeeded } = classAttendanceSummary;

  // Mock calendar grid data (last 7 days)
  const last7Days = [
    { date: '20', status: 'P' },
    { date: '21', status: 'P' },
    { date: '22', status: 'P' },
    { date: '23', status: 'A' },
    { date: '24', status: 'P' },
    { date: '25', status: 'P' },
    { date: '26', status: 'P' },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-20">
      
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm z-10 sticky top-0 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="font-bold text-gray-900 text-lg flex items-center gap-1">
            {className} <ChevronDown size={20} className="text-gray-500" />
          </h1>
          <p className="text-sm text-gray-500">{month}</p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        
        {/* Top Summary */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">Overall Attendance</p>
            <div className="text-4xl font-black text-gray-900">{percentage}%</div>
          </div>
          <div className="flex flex-col gap-2 text-sm font-medium">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-gray-700">{present} Present</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-gray-700">{absent} Absent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="text-gray-700">{late} Late</span>
            </div>
          </div>
        </div>

        {/* Calendar Grid (Simplified) */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h2 className="text-sm font-bold text-gray-900 mb-4">Last 7 Days (Average)</h2>
          <div className="flex justify-between items-center">
            {last7Days.map((day, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <span className="text-xs text-gray-500 font-medium">{day.date}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  day.status === 'P' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {day.status === 'P' ? '✓' : 'A'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Needs Attention */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={20} className="text-orange-500" />
            <h2 className="text-sm font-bold text-gray-900">Needs Attention</h2>
          </div>
          <div className="space-y-3">
            {attentionNeeded.map((student, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-orange-50/50 border border-orange-100/50">
                <span className="font-semibold text-gray-900">{student.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-orange-600">{student.percentage}%</span>
                  <span className="text-xs text-orange-500">Attendance</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
