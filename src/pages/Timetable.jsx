import { Calendar, Filter, Printer } from 'lucide-react';

export default function Timetable() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const periods = [
    { time: '08:00 - 08:45', label: 'Period 1' },
    { time: '08:45 - 09:30', label: 'Period 2' },
    { time: '09:30 - 10:15', label: 'Period 3' },
    { time: '10:15 - 11:00', label: 'Period 4' },
    { time: '11:00 - 11:30', label: 'Break' },
    { time: '11:30 - 12:15', label: 'Period 5' },
    { time: '12:15 - 13:00', label: 'Period 6' },
  ];

  const schedule = {
    'Monday': ['Maths (SS)', 'Physics (RS)', 'English (JD)', 'Chemistry (VS)', 'LUNCH', 'Biology (AK)', 'Comp.Sc (AB)'],
    'Tuesday': ['Physics (RS)', 'Maths (SS)', 'Chemistry (VS)', 'English (JD)', 'LUNCH', 'Games (PT)', 'Biology (AK)'],
    'Wednesday': ['Chemistry (VS)', 'Physics (RS)', 'Maths (SS)', 'Biology (AK)', 'LUNCH', 'Comp.Sc (AB)', 'English (JD)'],
    'Thursday': ['English (JD)', 'Maths (SS)', 'Physics (RS)', 'Chemistry (VS)', 'LUNCH', 'Library', 'Biology (AK)'],
    'Friday': ['Maths (SS)', 'Chemistry (VS)', 'Physics (RS)', 'Comp.Sc (AB)', 'LUNCH', 'English (JD)', 'Games (PT)'],
    'Saturday': ['Physics (RS)', 'Maths (SS)', 'Chemistry (VS)', 'English (JD)', 'LUNCH', '-', '-'],
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Class Timetable</h1>
          <p className="mt-1 text-sm text-gray-500">View and manage weekly schedules.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 items-center">
        <label className="text-sm font-medium text-gray-700">Select Class:</label>
        <select className="block w-48 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border py-2 pl-3">
          <option>Class X - A</option>
          <option>Class IX - B</option>
        </select>
        <label className="text-sm font-medium text-gray-700 ml-4">Select Teacher:</label>
        <select className="block w-48 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border py-2 pl-3">
          <option>All Teachers</option>
          <option>Sunita Sharma</option>
          <option>Ravi Shankar</option>
        </select>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-100 overflow-hidden overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider bg-gray-100 w-32 border-r border-gray-200">
                Time / Day
              </th>
              {days.map(day => (
                <th key={day} scope="col" className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider min-w-[140px]">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {periods.map((period, index) => (
              <tr key={period.label} className={period.label === 'Break' ? 'bg-gray-50' : 'hover:bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-200 bg-gray-50">
                  <div className="text-sm font-bold text-gray-900">{period.label}</div>
                  <div className="text-xs text-gray-500">{period.time}</div>
                </td>
                {period.label === 'Break' ? (
                  <td colSpan={6} className="px-6 py-4 text-center text-sm font-bold text-gray-400 tracking-widest uppercase bg-gray-100">
                    Lunch Break
                  </td>
                ) : (
                  days.map(day => (
                    <td key={`${day}-${period.label}`} className="px-6 py-4 text-center border-l border-gray-100">
                      {schedule[day][index] !== '-' ? (
                        <div className={`inline-flex flex-col items-center justify-center p-2 rounded-lg w-full ${
                          schedule[day][index].includes('Maths') ? 'bg-blue-50 text-blue-800 border border-blue-100' :
                          schedule[day][index].includes('Physics') ? 'bg-purple-50 text-purple-800 border border-purple-100' :
                          schedule[day][index].includes('Chemistry') ? 'bg-green-50 text-green-800 border border-green-100' :
                          schedule[day][index].includes('English') ? 'bg-amber-50 text-amber-800 border border-amber-100' :
                          'bg-gray-50 text-gray-800 border border-gray-200'
                        }`}>
                          <span className="text-sm font-bold">{schedule[day][index].split(' (')[0]}</span>
                          {schedule[day][index].includes('(') && (
                            <span className="text-xs opacity-75 mt-1">{schedule[day][index].split(' (')[1].replace(')', '')}</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </td>
                  ))
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
