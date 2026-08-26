import { useState } from 'react';
import { students } from '../data/mockData';
import { Calendar as CalendarIcon, CheckCircle2, XCircle, Clock, Save, Users } from 'lucide-react';

export default function Attendance() {
  // Generate 50 students for a realistic attendance view
  const baseStudents = students.slice(0, 5);
  const classStudents = Array.from({ length: 50 }, (_, i) => {
    const base = baseStudents[i % 5];
    return {
      ...base,
      id: `std-${i + 1}`,
      rollNo: i + 1,
      name: `${base.name.split(' ')[0]} ${String.fromCharCode(65 + (i % 26))}`,
      admissionNo: `ADM-${2000 + i}`
    };
  });
  
  const [attendance, setAttendance] = useState(
    classStudents.reduce((acc, student) => ({ ...acc, [student.id]: 'Present' }), {})
  );

  const [saved, setSaved] = useState(false);

  const handleStatusChange = (id, status) => {
    setAttendance(prev => ({ ...prev, [id]: status }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 5000);
  };

  const stats = {
    present: Object.values(attendance).filter(v => v === 'Present').length,
    absent: Object.values(attendance).filter(v => v === 'Absent').length,
    late: Object.values(attendance).filter(v => v === 'Late').length,
  };

  const total = classStudents.length;
  const percentage = Math.round((stats.present / total) * 100);

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mark Attendance</h1>
          <p className="mt-1 text-sm text-gray-500">Record daily attendance for classes.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
          <select className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border py-2 pl-3">
            <option>Class X</option>
            <option>Class IX</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
          <select className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border py-2 pl-3">
            <option>A</option>
            <option>B</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <div className="relative">
            <input type="date" defaultValue="2026-08-20" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border py-2 pl-3" />
          </div>
        </div>
        <div className="flex items-end">
          <button className="w-full bg-primary-50 text-primary-700 border border-primary-200 py-2 px-4 rounded-md font-medium hover:bg-primary-100 transition">
            Fetch Students
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total</p>
            <p className="text-2xl font-bold text-gray-900">{total}</p>
          </div>
          <Users className="w-8 h-8 text-gray-300" />
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow-sm border border-green-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-green-700">Present</p>
            <p className="text-2xl font-bold text-green-900">{stats.present}</p>
          </div>
          <CheckCircle2 className="w-8 h-8 text-green-300" />
        </div>
        <div className="bg-red-50 p-4 rounded-lg shadow-sm border border-red-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-red-700">Absent</p>
            <p className="text-2xl font-bold text-red-900">{stats.absent}</p>
          </div>
          <XCircle className="w-8 h-8 text-red-300" />
        </div>
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-700">Attendance</p>
            <p className="text-2xl font-bold text-blue-900">{percentage}%</p>
          </div>
          <div className="w-8 h-8 rounded-full border-4 border-blue-300 flex items-center justify-center"></div>
        </div>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <p className="font-medium">Attendance saved successfully! {stats.absent > 0 ? `Sent ${stats.absent} automated absent notifications to parents via SMS.` : ''}</p>
        </div>
      )}

      <div className="bg-white shadow-sm rounded-lg border border-gray-100 overflow-hidden">
        {/* Removed overflow-x-auto so it naturally fits, table-fixed prevents stretch */}
        <div className="w-full">
          <table className="w-full table-fixed divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="w-12 sm:w-16 px-2 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th scope="col" className="w-32 sm:w-64 px-2 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {classStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-2 sm:px-6 py-2 sm:py-3 whitespace-nowrap text-xs font-medium text-gray-500 text-center">
                    {student.rollNo}
                  </td>
                  <td className="px-2 sm:px-6 py-2 sm:py-3 whitespace-nowrap overflow-hidden">
                    <div className="text-sm font-semibold text-gray-900 truncate">{student.name}</div>
                    <div className="text-xs text-gray-500 hidden sm:block truncate">{student.admissionNo}</div>
                  </td>
                  <td className="px-2 sm:px-6 py-2 sm:py-3 whitespace-nowrap text-right">
                    <div className="flex justify-end gap-1 sm:gap-2">
                      <button
                        onClick={() => handleStatusChange(student.id, 'Present')}
                        className={`flex items-center justify-center h-8 w-8 sm:h-10 sm:w-auto sm:px-4 rounded sm:rounded-md transition-colors ${
                          attendance[student.id] === 'Present' 
                            ? 'bg-green-500 text-white shadow-inner' 
                            : 'bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-700'
                        }`}
                        title="Present"
                      >
                        <span className="sm:hidden font-bold text-xs">P</span>
                        <span className="hidden sm:inline text-sm font-semibold flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> Present</span>
                      </button>
                      
                      <button
                        onClick={() => handleStatusChange(student.id, 'Absent')}
                        className={`flex items-center justify-center h-8 w-8 sm:h-10 sm:w-auto sm:px-4 rounded sm:rounded-md transition-colors ${
                          attendance[student.id] === 'Absent' 
                            ? 'bg-red-500 text-white shadow-inner' 
                            : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-700'
                        }`}
                        title="Absent"
                      >
                        <span className="sm:hidden font-bold text-xs">A</span>
                        <span className="hidden sm:inline text-sm font-semibold flex items-center gap-1"><XCircle className="w-4 h-4"/> Absent</span>
                      </button>
                      
                      <button
                        onClick={() => handleStatusChange(student.id, 'Late')}
                        className={`flex items-center justify-center h-8 w-8 sm:h-10 sm:w-auto sm:px-4 rounded sm:rounded-md transition-colors ${
                          attendance[student.id] === 'Late' 
                            ? 'bg-amber-500 text-white shadow-inner' 
                            : 'bg-gray-100 text-gray-600 hover:bg-amber-100 hover:text-amber-700'
                        }`}
                        title="Late"
                      >
                        <span className="sm:hidden font-bold text-xs">L</span>
                        <span className="hidden sm:inline text-sm font-semibold flex items-center gap-1"><Clock className="w-4 h-4"/> Late</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
          <button 
            onClick={handleSave}
            className="inline-flex items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Attendance
          </button>
        </div>
      </div>
    </div>
  );
}
