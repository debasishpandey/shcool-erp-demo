import { classes } from '../data/mockData';
import { Users, UserCheck, BookOpen, ChevronRight } from 'lucide-react';

export default function Classes() {
  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Classes</h1>
          <p className="mt-1 text-sm text-gray-500">Overview of all classes, sections, and class teachers.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map((cls) => (
          <div key={cls.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:border-primary-300 transition-colors cursor-pointer group">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-900">{cls.name}</h2>
                <div className="bg-primary-50 text-primary-700 text-xs font-bold px-2 py-1 rounded">
                  {cls.sections} Sections
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center text-sm">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Total Students</p>
                    <p className="font-semibold text-gray-900">{cls.students}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-sm">
                  <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center mr-3">
                    <BookOpen className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Class Teacher</p>
                    <p className="font-semibold text-gray-900">{cls.classTeacher}</p>
                  </div>
                </div>

                <div className="flex items-center text-sm">
                  <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center mr-3">
                    <UserCheck className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Average Attendance</p>
                    <p className="font-semibold text-gray-900">{cls.attendance}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-between items-center group-hover:bg-primary-50 transition-colors">
              <span className="text-sm font-medium text-primary-600">View Details</span>
              <ChevronRight className="w-4 h-4 text-primary-600" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
