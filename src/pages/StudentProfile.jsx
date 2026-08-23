import { useParams, Link } from 'react-router-dom';
import { students } from '../data/mockData';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Droplet, User, Users, UserCheck, BookOpen, CreditCard, Award } from 'lucide-react';
import { useState } from 'react';

export default function StudentProfile() {
  const { id } = useParams();
  const student = students.find(s => s.id === parseInt(id)) || students[0];
  const [activeTab, setActiveTab] = useState('overview');

  if (!student) return <div>Student not found</div>;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Link to="/students" className="p-2 rounded-full hover:bg-gray-200 text-gray-500 transition">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Profile</h1>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary-500 to-primary-700"></div>
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-12 mb-6">
            <div className="flex items-end gap-6">
              <div className="h-24 w-24 rounded-full border-4 border-white bg-primary-100 flex items-center justify-center text-3xl text-primary-700 font-bold shadow-sm">
                {student.name.charAt(0)}
              </div>
              <div className="pb-2">
                <h2 className="text-2xl font-bold text-gray-900">{student.name}</h2>
                <p className="text-gray-500 font-medium">{student.admissionNo} • Class {student.class}-{student.section} • Roll No {student.rollNo}</p>
              </div>
            </div>
            <div className="pb-2 flex gap-3">
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800 border border-green-200">
                {student.status}
              </span>
            </div>
          </div>

          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {['overview', 'academic', 'fees'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize
                    ${activeTab === tab 
                      ? 'border-primary-500 text-primary-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-8">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-gray-400" />
                    Personal Information
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-4 border border-gray-100">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-sm text-gray-500">Date of Birth</div>
                      <div className="col-span-2 text-sm font-medium text-gray-900 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" /> {student.dob}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-sm text-gray-500">Gender</div>
                      <div className="col-span-2 text-sm font-medium text-gray-900">{student.gender}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-sm text-gray-500">Blood Group</div>
                      <div className="col-span-2 text-sm font-medium text-gray-900 flex items-center gap-2">
                        <Droplet className="w-4 h-4 text-red-400" /> {student.bg}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-400" />
                    Parent Information
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-4 border border-gray-100">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-sm text-gray-500">Parent Name</div>
                      <div className="col-span-2 text-sm font-medium text-gray-900">{student.parent}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-sm text-gray-500">Phone</div>
                      <div className="col-span-2 text-sm font-medium text-gray-900 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" /> {student.phone}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="col-span-2 text-sm font-medium text-gray-900 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" /> {student.parentEmail}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-sm text-gray-500">Address</div>
                      <div className="col-span-2 text-sm font-medium text-gray-900 flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" /> {student.address}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'academic' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><UserCheck size={20} /></div>
                      <h4 className="font-semibold text-gray-900">Attendance Overview</h4>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{student.attendance}</div>
                    <p className="text-sm text-gray-500 mb-4">Overall attendance this year</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: student.attendance }}></div>
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-purple-50 rounded-lg text-purple-600"><Award size={20} /></div>
                      <h4 className="font-semibold text-gray-900">Latest Performance</h4>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">86.4%</div>
                    <p className="text-sm text-gray-500">Half Yearly Examination</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'fees' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                    <div className="text-sm font-medium text-gray-500 mb-1">Total Fee</div>
                    <div className="text-2xl font-bold text-gray-900">₹{student.totalFee}</div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                    <div className="text-sm font-medium text-gray-500 mb-1">Paid</div>
                    <div className="text-2xl font-bold text-green-600">₹{student.paidFee}</div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                    <div className="text-sm font-medium text-gray-500 mb-1">Pending</div>
                    <div className="text-2xl font-bold text-amber-600">₹{student.pendingFee}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
