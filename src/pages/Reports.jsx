import { BarChart2, Download, FileText, PieChart, ChevronRight } from 'lucide-react';

export default function Reports() {
  const reports = [
    { title: 'Student Attendance Report', desc: 'Detailed attendance records by class and section.', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Fee Collection Report', desc: 'Daily, monthly, and yearly fee collection summaries.', icon: BarChart2, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Academic Performance', desc: 'Class-wise result analysis and comparative charts.', icon: PieChart, color: 'text-purple-600', bg: 'bg-purple-50' },
    { title: 'Teacher Attendance', desc: 'Staff attendance and leave records.', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: 'Defaulter List', desc: 'List of students with pending fee dues over 30 days.', icon: FileText, color: 'text-red-600', bg: 'bg-red-50' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="mt-1 text-sm text-gray-500">Generate and download comprehensive school reports.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${report.bg} ${report.color}`}>
                <report.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{report.title}</h3>
              <p className="text-gray-500 text-sm">{report.desc}</p>
            </div>
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-between items-center">
              <button className="text-sm font-medium text-gray-700 hover:text-primary-600 flex items-center gap-2">
                Generate <ChevronRight className="w-4 h-4" />
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
