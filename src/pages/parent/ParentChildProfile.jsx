import { ArrowLeft, User, Phone, MapPin, Droplet, Calendar, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { childProfile, parentProfile, childPerformance } from '../../data/parentMockData';

export default function ParentChildProfile() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-20 relative">
      <div className="bg-white px-4 py-4 shadow-sm z-10 sticky top-0 border-b border-gray-100 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-black text-gray-900 text-lg">Child Profile</h1>
      </div>

      <div className="p-4 space-y-4">
        
        {/* Main Identity */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-24 bg-primary-50"></div>
          
          <div className="w-24 h-24 bg-white rounded-full mx-auto relative z-10 border-4 border-white shadow-sm flex items-center justify-center text-gray-300 mb-3">
            <User size={48} />
          </div>
          
          <h2 className="font-black text-2xl text-gray-900 leading-tight">{childProfile.name}</h2>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">Class {childProfile.class} • Roll {childProfile.rollNo}</p>
          
          <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-primary-700 bg-primary-50 px-3 py-1 rounded-full border border-primary-100">
            {childProfile.admissionNo}
          </div>
        </div>

        {/* Performance Snapshot */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Performance Snapshot</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
              <span className="block text-xl font-black text-green-600">{childPerformance.attendance.percentage}%</span>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Attendance</span>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
              <span className="block text-xl font-black text-primary-600">{childPerformance.overall.percentage}%</span>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Overall</span>
            </div>
          </div>
        </div>

        {/* Personal Details */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Personal Details</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Calendar size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Date of Birth</p>
                <p className="font-bold text-gray-900">{childProfile.dob}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <Droplet size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Blood Group</p>
                <p className="font-bold text-gray-900">{childProfile.bloodGroup}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Heart size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Parents</p>
                <p className="font-bold text-gray-900">{parentProfile.name} & {parentProfile.motherName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Contact</p>
                <p className="font-bold text-gray-900">{parentProfile.contact}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
