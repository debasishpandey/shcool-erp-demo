import React, { useState } from 'react';
import { Search, Calendar as CalendarIcon, Clock, Edit, Save, UserX, X } from 'lucide-react';
import { teachers as mockTeachers } from '../data/mockData';

export default function Timetable() {
  const [selectedClass, setSelectedClass] = useState('VIII-A');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  
  const periods = [
    { id: 1, time: '08:00 - 08:45' },
    { id: 2, time: '08:45 - 09:30' },
    { id: 3, time: '09:30 - 10:15' },
    { id: 4, time: '10:15 - 11:00' },
    { id: 5, time: '11:30 - 12:15' },
    { id: 6, time: '12:15 - 13:00' },
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const [timetable, setTimetable] = useState({
    'Monday': {
      1: { subject: 'Mathematics', teacher: 'Sunita Sharma', room: '201' },
      2: { subject: 'Science', teacher: 'Ravi Shankar', room: '201' },
      3: { subject: 'English', teacher: 'Neha Patel', room: '201' },
      4: { subject: 'Social Science', teacher: 'Meenakshi Iyer', room: '201' },
      5: { subject: 'Hindi', teacher: 'Amit Das', room: '201' },
      6: { subject: 'Computer', teacher: 'Amitabh Bachchan', room: 'Lab 1' },
    },
    'Tuesday': {
      1: { subject: 'Science', teacher: 'Ravi Shankar', room: '201' },
      2: { subject: 'Mathematics', teacher: 'Sunita Sharma', room: '201' },
      3: { subject: 'Social Science', teacher: 'Meenakshi Iyer', room: '201' },
      4: { subject: 'English', teacher: 'Neha Patel', room: '201' },
      5: { subject: 'Hindi', teacher: 'Amit Das', room: '201' },
      6: { subject: 'Physical Ed', teacher: 'Ramesh Kumar', room: 'Ground' },
    },
    'Wednesday': {
      1: { subject: 'English', teacher: 'Neha Patel', room: '201' },
      2: { subject: 'Mathematics', teacher: 'Sunita Sharma', room: '201' },
      3: { subject: 'Science', teacher: 'Ravi Shankar', room: '201' },
      4: { subject: 'Social Science', teacher: 'Meenakshi Iyer', room: '201' },
      5: { subject: 'Hindi', teacher: 'Amit Das', room: '201' },
      6: { subject: 'Art', teacher: 'Priya Menon', room: 'Art Room' },
    },
    'Thursday': {
      1: { subject: 'Mathematics', teacher: 'Sunita Sharma', room: '201' },
      2: { subject: 'English', teacher: 'Neha Patel', room: '201' },
      3: { subject: 'Social Science', teacher: 'Meenakshi Iyer', room: '201' },
      4: { subject: 'Science', teacher: 'Ravi Shankar', room: '201' },
      5: { subject: 'Hindi', teacher: 'Amit Das', room: '201' },
      6: { subject: 'Computer', teacher: 'Amitabh Bachchan', room: 'Lab 1' },
    },
    'Friday': {
      1: { subject: 'Social Science', teacher: 'Meenakshi Iyer', room: '201' },
      2: { subject: 'Science', teacher: 'Ravi Shankar', room: '201' },
      3: { subject: 'Mathematics', teacher: 'Sunita Sharma', room: '201' },
      4: { subject: 'English', teacher: 'Neha Patel', room: '201' },
      5: { subject: 'Hindi', teacher: 'Amit Das', room: '201' },
      6: { subject: 'Library', teacher: 'John D\'Souza', room: 'Library' },
    }
  });

  const handleSlotClick = (day, period) => {
    if (!isEditing) return;
    setSelectedSlot({ day, period, data: timetable[day][period] });
  };

  const handleSaveSlot = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setTimetable({
      ...timetable,
      [selectedSlot.day]: {
        ...timetable[selectedSlot.day],
        [selectedSlot.period]: {
          subject: formData.get('subject'),
          teacher: formData.get('teacher'),
          room: formData.get('room'),
        }
      }
    });
    setSelectedSlot(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Schedule & Availability</h1>
          <p className="mt-1 text-md text-gray-500">Manage class timetables and teacher availability.</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <select 
            className="border-gray-300 rounded-lg text-sm pl-3 pr-8 focus:ring-primary-500 focus:border-primary-500 font-medium"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option>VIII-A</option>
            <option>VIII-B</option>
            <option>IX-A</option>
            <option>X-A</option>
          </select>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
              isEditing ? 'bg-primary-600 border-primary-600 text-white hover:bg-primary-700' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {isEditing ? <><Save className="w-4 h-4 mr-2" /> Finish Editing</> : <><Edit className="w-4 h-4 mr-2" /> Edit Schedule</>}
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Side: Timetable Grid */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-primary-600" />
              Class {selectedClass} Weekly Schedule
            </h3>
            {isEditing && <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-1 rounded animate-pulse">Edit Mode Active</span>}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-white border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="p-4 border-r border-gray-100 w-32">Time</th>
                  {days.map(day => <th key={day} className="p-4 border-r border-gray-100 w-48 text-center">{day}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {periods.map(period => (
                  <tr key={period.id}>
                    <td className="p-4 border-r border-gray-100 bg-gray-50 text-center">
                      <p className="text-sm font-bold text-gray-900">P{period.id}</p>
                      <p className="text-xs text-gray-500 whitespace-nowrap">{period.time}</p>
                    </td>
                    {days.map(day => {
                      const slot = timetable[day][period.id];
                      const isFree = !slot;
                      return (
                        <td 
                          key={`${day}-${period.id}`} 
                          onClick={() => handleSlotClick(day, period.id)}
                          className={`p-3 border-r border-gray-100 align-top transition-colors ${
                            isEditing ? 'cursor-pointer hover:bg-primary-50 ring-inset hover:ring-2 hover:ring-primary-300' : ''
                          } ${selectedSlot?.day === day && selectedSlot?.period === period.id ? 'bg-primary-50 ring-2 ring-primary-500' : ''}`}
                        >
                          {isFree ? (
                            <div className="h-full w-full min-h-[4rem] flex flex-col items-center justify-center text-gray-400">
                              <span className="text-xs font-medium uppercase tracking-wider">- Free -</span>
                            </div>
                          ) : (
                            <div className="flex flex-col h-full">
                              <p className="text-sm font-bold text-gray-900">{slot.subject}</p>
                              <p className="text-xs font-medium text-primary-700 mt-1">{slot.teacher}</p>
                              <p className="text-xs text-gray-500 mt-2">{slot.room}</p>
                            </div>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Free Teachers Now (Important for Principal) */}
        {!isEditing && (
          <div className="w-full lg:w-80 bg-gray-50 rounded-xl shadow-sm border border-gray-200 p-6 h-fit sticky top-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-600" />
              Free Teachers Now
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg p-3 mb-4 shadow-sm text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Current Period</p>
              <p className="text-lg font-bold text-gray-900">Period 2</p>
              <p className="text-sm text-gray-600">08:45 - 09:30</p>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {mockTeachers.filter(t => t.status === 'Active' && t.todaySchedule.some(s => s.period === 2 && s.type === 'free')).map(teacher => (
                <div key={teacher.id} className="bg-white p-3 rounded-lg border border-gray-200 flex flex-col shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{teacher.name}</p>
                      <p className="text-xs text-gray-500">{teacher.department}</p>
                    </div>
                    <span className="px-2 py-0.5 bg-green-100 text-green-800 text-[10px] font-bold uppercase tracking-wider rounded">Free</span>
                  </div>
                  <button className="w-full mt-1 py-1.5 bg-white border border-gray-300 text-gray-700 text-xs font-medium rounded hover:bg-gray-50 transition-colors">
                    Assign to Class
                  </button>
                </div>
              ))}
              {mockTeachers.filter(t => t.status === 'Active' && t.todaySchedule.some(s => s.period === 2 && s.type === 'free')).length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4 italic">No teachers currently free.</p>
              )}
            </div>
          </div>
        )}

        {/* Edit Slot Panel (Shows only when editing and a slot is selected) */}
        {isEditing && selectedSlot && (
          <div className="w-full lg:w-80 bg-white rounded-xl shadow-lg border border-primary-200 p-6 h-fit sticky top-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900">Edit Slot</h2>
              <button onClick={() => setSelectedSlot(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-6">
              <p className="text-sm text-gray-500">{selectedSlot.day}</p>
              <p className="font-bold text-gray-900">Period {selectedSlot.period}</p>
            </div>

            <form onSubmit={handleSaveSlot} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input 
                  type="text" 
                  name="subject" 
                  defaultValue={selectedSlot.data?.subject || ''} 
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teacher</label>
                <select 
                  name="teacher" 
                  defaultValue={selectedSlot.data?.teacher || ''} 
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  required
                >
                  <option value="">Select Teacher...</option>
                  {mockTeachers.map(t => <option key={t.id} value={t.name}>{t.name} ({t.department})</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
                <input 
                  type="text" 
                  name="room" 
                  defaultValue={selectedSlot.data?.room || ''} 
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm" 
                  required
                />
              </div>
              
              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setSelectedSlot(null)}
                  className="flex-1 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700"
                >
                  Save Slot
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
