import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Users, Navigation, Clock, CheckCircle2, 
  XCircle, AlertCircle, Phone, Navigation2
} from 'lucide-react';
import { mockBuses, mockStops_PatiaRoute, mockStudents_BUS01 } from '../data/transportMockData';

export default function TransportDetail() {
  const { busId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('map');

  // Find bus or use mock default (since we only fully mocked BUS-01 in data)
  const bus = mockBuses.find(b => b.id === busId) || mockBuses[0];
  const isBus01 = bus.id === 'BUS-01'; // Use detailed mock data if it's BUS-01

  const stops = isBus01 ? mockStops_PatiaRoute : [];
  const students = isBus01 ? mockStudents_BUS01 : [];

  // SVG Map Component (Mock Visualization)
  const RouteMap = () => {
    // A simple mock map using SVG
    return (
      <div className="relative w-full h-[400px] bg-blue-50 rounded-xl overflow-hidden border border-blue-100 flex items-center justify-center">
        {/* Background grid/map texture simulation */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#4a90e2 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        <svg viewBox="0 0 800 400" className="w-full h-full drop-shadow-md">
           {/* Route Line */}
           <path 
             d="M 100 200 Q 200 150 300 220 T 500 180 T 700 200" 
             fill="none" 
             stroke="#3b82f6" 
             strokeWidth="6"
             strokeLinecap="round"
             strokeDasharray="10 10"
             className="animate-[dash_20s_linear_infinite]"
           />
           <style>{`
             @keyframes dash {
               to {
                 stroke-dashoffset: -1000;
               }
             }
           `}</style>

           {/* Stops (Pins) */}
           {/* Patia */}
           <g transform="translate(100, 200)">
              <circle cx="0" cy="0" r="8" fill="white" stroke="#3b82f6" strokeWidth="3" />
              <text x="0" y="-15" textAnchor="middle" className="text-xs font-bold fill-gray-700">Patia Square</text>
              <text x="0" y="20" textAnchor="middle" className="text-[10px] fill-gray-500">7:05 AM</text>
           </g>
           
           {/* KIIT Square */}
           <g transform="translate(200, 175)">
              <circle cx="0" cy="0" r="8" fill="white" stroke="#3b82f6" strokeWidth="3" />
              <text x="0" y="-15" textAnchor="middle" className="text-xs font-bold fill-gray-700">KIIT Square</text>
              <text x="0" y="20" textAnchor="middle" className="text-[10px] fill-gray-500">7:15 AM</text>
           </g>

           {/* Infocity (Current Location of BUS-01) */}
           <g transform="translate(300, 220)">
              <circle cx="0" cy="0" r="8" fill="#3b82f6" stroke="white" strokeWidth="2" />
              {/* Pulsing ring */}
              <circle cx="0" cy="0" r="15" fill="none" stroke="#3b82f6" strokeWidth="2" className="animate-ping opacity-75" />
              <text x="0" y="-20" textAnchor="middle" className="text-xs font-bold fill-blue-800">Infocity</text>
              
              {/* Bus Icon Marker */}
              <g transform="translate(-12, -45)">
                <rect x="0" y="0" width="24" height="20" rx="4" fill="#1e40af" />
                <circle cx="6" cy="20" r="3" fill="#1e3a8a" />
                <circle cx="18" cy="20" r="3" fill="#1e3a8a" />
                <rect x="4" y="4" width="16" height="8" rx="1" fill="#bfdbfe" />
              </g>
           </g>

           {/* Chandrasekharpur */}
           <g transform="translate(420, 195)">
              <circle cx="0" cy="0" r="8" fill="white" stroke="#3b82f6" strokeWidth="3" />
              <text x="0" y="-15" textAnchor="middle" className="text-xs font-bold fill-gray-700">Chandrasekharpur</text>
           </g>

           {/* Nandankanan Road */}
           <g transform="translate(560, 185)">
              <circle cx="0" cy="0" r="8" fill="white" stroke="#3b82f6" strokeWidth="3" />
              <text x="0" y="-15" textAnchor="middle" className="text-xs font-bold fill-gray-700">Nandankanan Rd</text>
           </g>

           {/* School */}
           <g transform="translate(700, 200)">
              <circle cx="0" cy="0" r="12" fill="#16a34a" stroke="white" strokeWidth="3" />
              <path d="M-5 -3 L0 -8 L5 -3 L5 5 L-5 5 Z" fill="white" transform="translate(0, 0) scale(0.8)" />
              <text x="0" y="-20" textAnchor="middle" className="text-sm font-bold fill-green-800">School Campus</text>
           </g>
        </svg>

        {/* Floating Legend / Status */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-gray-100">
           <div className="text-sm font-bold text-gray-800 mb-2">Live Tracking (Mock)</div>
           <div className="space-y-1">
             <div className="flex justify-between gap-4 text-xs">
               <span className="text-gray-500">Speed</span>
               <span className="font-semibold text-gray-900">{bus.speed}</span>
             </div>
             <div className="flex justify-between gap-4 text-xs">
               <span className="text-gray-500">Next Stop</span>
               <span className="font-semibold text-blue-700">{bus.nextStop}</span>
             </div>
             <div className="flex justify-between gap-4 text-xs">
               <span className="text-gray-500">ETA</span>
               <span className="font-semibold text-gray-900">{bus.eta}</span>
             </div>
           </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10">
      {/* Header & Back Button */}
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/transport')} className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            {bus.id} Details 
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              bus.status === 'On Route' ? 'bg-blue-100 text-blue-800' :
              bus.status === 'Delayed' ? 'bg-amber-100 text-amber-800' :
              'bg-green-100 text-green-800'
            }`}>
              {bus.status}
            </span>
          </h1>
          <p className="mt-1 text-sm text-gray-500">{bus.route} | Vehicle: {bus.vehicleNo}</p>
        </div>
      </div>

      {/* Profile Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm col-span-2 md:col-span-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Driver</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-bold text-gray-900">{bus.driver}</span>
                <a href={`tel:${bus.driverPhone}`} className="text-primary-600 hover:text-primary-800"><Phone className="w-3 h-3" /></a>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{bus.driverPhone}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Attendant</p>
              <p className="font-bold text-gray-900 mt-1">{bus.attendant}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Route</p>
              <p className="font-bold text-gray-900 mt-1">{bus.route}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Capacity</p>
              <p className="font-bold text-gray-900 mt-1">{bus.students} / {bus.capacity} <span className="text-xs text-gray-500 font-normal">Students</span></p>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1.5">
                <div className="bg-primary-600 h-1.5 rounded-full" style={{ width: `${(bus.students / bus.capacity) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Status Highlight */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-5 rounded-xl shadow-sm text-white flex flex-col justify-center">
          <p className="text-blue-100 text-xs font-semibold uppercase flex items-center gap-1">
            <Navigation2 className="w-4 h-4" /> Current Location
          </p>
          <p className="text-xl font-bold mt-1">{bus.location}</p>
          <div className="mt-3 flex justify-between items-end border-t border-blue-400/50 pt-3">
            <div>
              <p className="text-blue-100 text-[10px] uppercase">Next Stop</p>
              <p className="font-medium text-sm">{bus.nextStop}</p>
            </div>
            <div className="text-right">
              <p className="text-blue-100 text-[10px] uppercase">ETA</p>
              <p className="font-bold text-lg">{bus.eta}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs for detail view */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200 bg-gray-50">
          <button onClick={() => setActiveTab('map')} className={`px-5 py-3 text-sm font-medium border-b-2 ${activeTab === 'map' ? 'border-primary-600 text-primary-600 bg-white' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Map & Tracking</button>
          <button onClick={() => setActiveTab('boarding')} className={`px-5 py-3 text-sm font-medium border-b-2 ${activeTab === 'boarding' ? 'border-primary-600 text-primary-600 bg-white' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Student Boarding</button>
          <button onClick={() => setActiveTab('stops')} className={`px-5 py-3 text-sm font-medium border-b-2 ${activeTab === 'stops' ? 'border-primary-600 text-primary-600 bg-white' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Stop List</button>
        </div>

        <div className="p-5">
          {/* MAP TAB */}
          {activeTab === 'map' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-500" /> Route Visualization
              </h3>
              <RouteMap />
            </div>
          )}

          {/* BOARDING TAB */}
          {activeTab === 'boarding' && (
            <div>
               <div className="flex justify-between items-center mb-4">
                 <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                   <Users className="w-5 h-5 text-gray-500" /> Today's Boarding List
                 </h3>
                 <div className="flex gap-4">
                   <div className="flex items-center gap-1.5 text-sm"><CheckCircle2 className="w-4 h-4 text-green-500"/> <span className="font-bold">35</span> Boarded</div>
                   <div className="flex items-center gap-1.5 text-sm"><Clock className="w-4 h-4 text-amber-500"/> <span className="font-bold">2</span> Pending</div>
                   <div className="flex items-center gap-1.5 text-sm"><XCircle className="w-4 h-4 text-red-500"/> <span className="font-bold">1</span> Absent</div>
                 </div>
               </div>
               
               {isBus01 ? (
                 <div className="overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                        <tr>
                          <th className="px-5 py-3 font-medium">Student</th>
                          <th className="px-5 py-3 font-medium">Stop</th>
                          <th className="px-5 py-3 font-medium">Scheduled</th>
                          <th className="px-5 py-3 font-medium">Status</th>
                          <th className="px-5 py-3 font-medium">Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {students.map(st => (
                          <tr key={st.id}>
                            <td className="px-5 py-3">
                              <div className="font-bold text-gray-900">{st.name}</div>
                              <div className="text-xs text-gray-500">{st.class} | Roll: {st.roll}</div>
                            </td>
                            <td className="px-5 py-3 text-gray-600">{st.stop}</td>
                            <td className="px-5 py-3 text-gray-600">{st.pickupTime}</td>
                            <td className="px-5 py-3">
                              {st.status === 'Boarded' && <span className="flex items-center gap-1 text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-md w-max"><CheckCircle2 className="w-3 h-3"/> Boarded</span>}
                              {st.status === 'Not Boarded' && <span className="flex items-center gap-1 text-red-600 text-xs font-bold bg-red-50 px-2 py-1 rounded-md w-max"><XCircle className="w-3 h-3"/> Not Boarded</span>}
                              {st.status === 'Pending' && <span className="flex items-center gap-1 text-amber-600 text-xs font-bold bg-amber-50 px-2 py-1 rounded-md w-max"><Clock className="w-3 h-3"/> Pending</span>}
                              {st.status === 'Absent' && <span className="flex items-center gap-1 text-gray-600 text-xs font-bold bg-gray-100 px-2 py-1 rounded-md w-max"><AlertCircle className="w-3 h-3"/> Absent</span>}
                            </td>
                            <td className="px-5 py-3 font-medium text-gray-700">{st.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                 </div>
               ) : (
                 <p className="text-gray-500 p-4 border border-gray-200 rounded-lg text-center bg-gray-50">No detailed boarding data mock available for this bus. Check BUS-01.</p>
               )}
            </div>
          )}

          {/* STOPS TAB */}
          {activeTab === 'stops' && (
            <div>
               <h3 className="text-lg font-bold text-gray-900 mb-4">Route Schedule</h3>
               {isBus01 ? (
                 <div className="relative border-l-2 border-gray-200 ml-3 space-y-6 pb-4">
                   {stops.map((stop, idx) => (
                     <div key={stop.id} className="relative pl-6">
                       {/* Timeline dot */}
                       <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white ${
                         idx < 2 ? 'bg-green-500' : // Passed
                         idx === 2 ? 'bg-blue-500 animate-pulse ring-4 ring-blue-100' : // Current
                         'bg-gray-300' // Upcoming
                       }`}></div>
                       
                       <div className="bg-white border border-gray-100 p-4 rounded-lg shadow-sm">
                         <div className="flex justify-between items-start">
                           <div>
                             <h4 className={`font-bold ${idx === 2 ? 'text-blue-700' : 'text-gray-900'}`}>{stop.name}</h4>
                             <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                               <Clock className="w-3.5 h-3.5" /> Scheduled: {stop.time}
                             </p>
                           </div>
                           <div className="bg-gray-50 px-3 py-1 rounded-md text-center">
                             <span className="block text-lg font-bold text-gray-900">{stop.students}</span>
                             <span className="block text-[10px] uppercase font-semibold text-gray-500">Students</span>
                           </div>
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
               ) : (
                 <p className="text-gray-500 p-4 border border-gray-200 rounded-lg text-center bg-gray-50">No detailed stop data mock available for this bus. Check BUS-01.</p>
               )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
