import { useState } from 'react';
import { ChevronDown, ArrowLeft, Download, CheckCircle2, X } from 'lucide-react';
import { monthlyAttendanceData, classAttendanceSummary } from '../../data/teacherMockData';
import { useNavigate } from 'react-router-dom';

export default function ClassAttendanceSummary() {
  const navigate = useNavigate();
  const { class: className, month, percentage, present, absent, late } = classAttendanceSummary;
  const { dates, matrix } = monthlyAttendanceData;

  const [showExportModal, setShowExportModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const handleExport = (type) => {
    setShowExportModal(false);
    setToastMessage(`Attendance ${type} exported successfully`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'P': return 'bg-green-100 text-green-700 font-black';
      case 'A': return 'bg-red-100 text-red-700 font-black';
      case 'L': return 'bg-amber-100 text-amber-700 font-black';
      default: return 'bg-gray-50 text-gray-400 font-medium';
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-20 relative">
      
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm z-10 sticky top-0 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="font-black text-gray-900 text-lg flex items-center gap-1">
              {className} <ChevronDown size={20} className="text-gray-500" />
            </h1>
            <p className="text-sm font-semibold text-primary-700">{month}</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        
        {/* Top Summary */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 font-bold mb-1 uppercase tracking-wider">Overall</p>
            <div className="text-3xl font-black text-gray-900">{percentage}%</div>
            <p className="text-xs text-gray-500 font-bold mt-1">42 Students</p>
          </div>
          <div className="flex flex-col gap-1.5 text-sm font-bold">
            <div className="flex items-center gap-2 bg-green-50 px-2 py-1 rounded">
              <span className="text-green-700 w-16">Present</span>
              <span className="text-green-800">{present}</span>
            </div>
            <div className="flex items-center gap-2 bg-red-50 px-2 py-1 rounded">
              <span className="text-red-700 w-16">Absent</span>
              <span className="text-red-800">{absent}</span>
            </div>
            <div className="flex items-center gap-2 bg-amber-50 px-2 py-1 rounded">
              <span className="text-amber-700 w-16">Late</span>
              <span className="text-amber-800">{late}</span>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex gap-2 pl-2 text-xs font-bold text-gray-600">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Present</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> Absent</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Late</span>
          </div>
          <button 
            onClick={() => setShowExportModal(true)}
            className="flex items-center gap-1.5 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold active:bg-gray-700 transition-colors"
          >
            <Download size={14} /> Export
          </button>
        </div>

        {/* Full Matrix Table Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-max text-sm">
              <thead>
                <tr>
                  <th className="sticky left-0 bg-white z-10 p-3 border-b border-r border-gray-200 font-black text-gray-900 shadow-[1px_0_0_0_#e5e7eb]">
                    Student
                  </th>
                  {dates.map((d, i) => (
                    <th key={i} className={`p-2 border-b border-r border-gray-100 text-center ${d.isWeekend ? 'bg-gray-50' : 'bg-white'}`}>
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] uppercase font-bold text-gray-400">{d.day}</span>
                        <span className="font-black text-gray-800">{d.date}</span>
                      </div>
                    </th>
                  ))}
                  <th className="p-3 border-b border-gray-200 font-black text-gray-900 text-center bg-gray-50">
                    %
                  </th>
                </tr>
              </thead>
              <tbody>
                {matrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="sticky left-0 bg-white z-10 p-3 border-b border-r border-gray-200 font-bold text-gray-800 whitespace-nowrap shadow-[1px_0_0_0_#e5e7eb]">
                      <span className="text-gray-400 text-xs mr-2">{row.rollNo}</span>{row.name}
                    </td>
                    {row.statuses.map((st, i) => (
                      <td key={i} className={`p-1.5 border-b border-r border-gray-100 text-center ${dates[i].isWeekend ? 'bg-gray-50' : ''}`}>
                        <div className={`w-6 h-6 mx-auto rounded-md flex items-center justify-center text-xs ${getStatusColor(st)}`}>
                          {st}
                        </div>
                      </td>
                    ))}
                    <td className="p-3 border-b border-gray-100 font-black text-center bg-gray-50 text-primary-700">
                      {row.percentage}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-gray-900/40 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-[480px] rounded-t-3xl p-6 pb-safe shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-black text-gray-900 text-lg">Export Attendance</h2>
              <button onClick={() => setShowExportModal(false)} className="p-2 bg-gray-100 rounded-full text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3 mb-6">
              <button onClick={() => handleExport('CSV')} className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 p-4 rounded-xl font-bold text-gray-900 flex justify-between items-center">
                <span>Download as CSV</span>
                <span className="text-gray-400">.csv</span>
              </button>
              <button onClick={() => handleExport('Excel')} className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 p-4 rounded-xl font-bold text-gray-900 flex justify-between items-center">
                <span>Download as Excel</span>
                <span className="text-gray-400">.xlsx</span>
              </button>
              <button onClick={() => handleExport('PDF')} className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 p-4 rounded-xl font-bold text-gray-900 flex justify-between items-center">
                <span>Download as PDF</span>
                <span className="text-gray-400">.pdf</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 w-11/12 max-w-[400px] z-50">
          <div className="bg-gray-900 text-white p-4 rounded-xl shadow-xl flex items-center gap-2 font-bold border border-gray-700">
            <CheckCircle2 size={20} className="text-green-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

    </div>
  );
}
