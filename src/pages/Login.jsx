import { useNavigate } from 'react-router-dom';
import { BookOpen, User, Shield, Briefcase, GraduationCap, MonitorSmartphone, Calculator } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();

  const roles = [
    { id: 'admin', title: 'Admin / Principal', icon: Shield, color: 'bg-primary-100 text-primary-700', path: '/dashboard', desc: 'Full system access & operations overview' },
    { id: 'teacher', title: 'Teacher', icon: Briefcase, color: 'bg-blue-100 text-blue-700', path: '/teacher/home', desc: 'Manage classes, attendance & homework' },
    { id: 'accountant', title: 'Accountant', icon: Calculator, color: 'bg-emerald-100 text-emerald-700', path: '/accountant', desc: 'Manage collections, dues, receipts & school expenses' },
    { id: 'parent', title: 'Parent Portal', icon: MonitorSmartphone, color: 'bg-purple-100 text-purple-700', path: '/parent/dashboard', desc: 'View child progress, fees & attendance' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-primary-600 rounded-xl">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900">
          SchoolERP Demo
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Select a role to preview the customized experience.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
          <div className="grid grid-cols-1 gap-4">
            {roles.map((role) => (
              <div 
                key={role.id}
                onClick={() => {
                  localStorage.setItem('demoUserRole', role.id);
                  navigate(role.path);
                }}
                className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-primary-500 hover:shadow-md cursor-pointer transition-all bg-white group"
              >
                <div className={`p-4 rounded-lg ${role.color} group-hover:scale-110 transition-transform`}>
                  <role.icon size={24} />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{role.title}</h3>
                  <p className="text-sm text-gray-500">{role.desc}</p>
                </div>
                <div className="text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-500">
            Note: This is a static frontend prototype. No actual authentication is required.
          </div>
        </div>
      </div>
    </div>
  );
}
