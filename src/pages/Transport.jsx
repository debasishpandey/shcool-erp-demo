import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bus, Map, Users, UserSquare2, AlertCircle, AlertTriangle, 
  CheckCircle2, Clock, MapPin, Navigation, Search, Filter 
} from 'lucide-react';
import { mockBuses, mockRoutes, mockDrivers, mockStudents_BUS01 } from '../data/transportMockData';

export default function Transport() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  // Dashboard Summary Metrics
  const summary = {
    totalBuses: mockBuses.length,
    activeToday: mockBuses.filter(b => b.status === 'On Route' || b.status === 'Boarding' || b.status === 'Reached School' || b.status === 'Delayed').length,
    studentsUsing: 642, // Mock total
    routesCount: mockRoutes.length,
    driversPresent: mockDrivers.filter(d => d.status === 'Present').length,
    utilization: '82%',
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'On Route': return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">On Route</span>;
      case 'Reached School': return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Reached School</span>;
      case 'Delayed': return <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">Delayed</span>;
      case 'Boarding': return <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">Boarding</span>;
      case 'Maintenance': return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">Maintenance</span>;
      case 'Driver Absent': return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Driver Absent</span>;
      default: return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">{status}</span>;
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Bus },
    { id: 'buses', label: 'Buses', icon: Bus },
    { id: 'routes', label: 'Routes', icon: Map },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'drivers', label: 'Drivers', icon: UserSquare2 },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Transport Management</h1>
        <p className="mt-1 text-sm text-gray-500">Monitor buses, routes, and student transportation</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 border-b border-gray-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ─── DASHBOARD TAB ─── */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Buses</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{summary.totalBuses}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Active Today</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{summary.activeToday}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Students Using</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{summary.studentsUsing}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Routes</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{summary.routesCount}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Drivers Present</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{summary.driversPresent}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Utilization</p>
              <p className="text-2xl font-bold text-primary-600 mt-1">{summary.utilization}</p>
            </div>
          </div>

          {/* Alerts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-amber-800">BUS-03 Delayed</h3>
                <p className="text-sm text-amber-700 mt-1">Khandagiri Route • 25 minutes behind schedule due to Heavy Traffic</p>
                <button onClick={() => navigate('/transport/BUS-03')} className="mt-2 text-xs font-bold text-amber-700 hover:text-amber-900 underline">
                  View Bus Details
                </button>
              </div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-red-800">Driver Absent</h3>
                <p className="text-sm text-red-700 mt-1">BUS-08 (Jagamara Route) requires a replacement driver.</p>
                <button onClick={() => navigate('/transport/BUS-08')} className="mt-2 text-xs font-bold text-red-700 hover:text-red-900 underline">
                  Manage Assignment
                </button>
              </div>
            </div>
          </div>

          {/* Today's Status Table */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Today's Transport Status</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-500">
                  <tr>
                    <th className="px-5 py-3 font-medium">Bus</th>
                    <th className="px-5 py-3 font-medium">Route</th>
                    <th className="px-5 py-3 font-medium">Driver</th>
                    <th className="px-5 py-3 font-medium">Location</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockBuses.slice(0, 8).map((bus) => (
                    <tr key={bus.id} className="hover:bg-gray-50">
                      <td className="px-5 py-3 font-medium text-gray-900">{bus.id}</td>
                      <td className="px-5 py-3 text-gray-600">{bus.route}</td>
                      <td className="px-5 py-3 text-gray-600">{bus.driver}</td>
                      <td className="px-5 py-3 text-gray-600">{bus.location}</td>
                      <td className="px-5 py-3">{getStatusBadge(bus.status)}</td>
                      <td className="px-5 py-3">
                        <button onClick={() => navigate(`/transport/${bus.id}`)} className="text-primary-600 hover:text-primary-800 font-medium">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ─── BUSES TAB ─── */}
      {activeTab === 'buses' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search buses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary-500 focus:border-primary-500 w-64"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                <tr>
                  <th className="px-5 py-3 font-medium">Bus Number</th>
                  <th className="px-5 py-3 font-medium">Vehicle No</th>
                  <th className="px-5 py-3 font-medium">Driver & Attendant</th>
                  <th className="px-5 py-3 font-medium">Route</th>
                  <th className="px-5 py-3 font-medium">Capacity / Students</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockBuses
                  .filter(b => b.id.toLowerCase().includes(searchTerm.toLowerCase()) || b.route.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((bus) => (
                  <tr key={bus.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 font-bold text-gray-900">{bus.id}</td>
                    <td className="px-5 py-4 text-gray-600 font-mono text-xs">{bus.vehicleNo}</td>
                    <td className="px-5 py-4">
                      <div className="text-gray-900 font-medium">{bus.driver}</div>
                      <div className="text-gray-500 text-xs">Attendant: {bus.attendant}</div>
                    </td>
                    <td className="px-5 py-4 text-gray-600">{bus.route}</td>
                    <td className="px-5 py-4">
                      <div className="text-gray-900">{bus.students} / {bus.capacity}</div>
                      <div className="w-24 bg-gray-200 rounded-full h-1.5 mt-1">
                        <div className="bg-primary-600 h-1.5 rounded-full" style={{ width: `${(bus.students / bus.capacity) * 100}%` }}></div>
                      </div>
                    </td>
                    <td className="px-5 py-4">{getStatusBadge(bus.status)}</td>
                    <td className="px-5 py-4 text-right">
                      <button onClick={() => navigate(`/transport/${bus.id}`)} className="px-3 py-1.5 bg-primary-50 text-primary-600 hover:bg-primary-100 rounded-lg text-sm font-medium transition-colors">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── ROUTES TAB ─── */}
      {activeTab === 'routes' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                <tr>
                  <th className="px-5 py-3 font-medium">Route Name</th>
                  <th className="px-5 py-3 font-medium">Bus</th>
                  <th className="px-5 py-3 font-medium">Stops</th>
                  <th className="px-5 py-3 font-medium">Distance</th>
                  <th className="px-5 py-3 font-medium">Students</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockRoutes.map((route) => (
                  <tr key={route.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 font-bold text-gray-900">{route.name}</td>
                    <td className="px-5 py-4 text-gray-600">{route.bus}</td>
                    <td className="px-5 py-4 text-gray-600">{route.stopsCount} Stops</td>
                    <td className="px-5 py-4 text-gray-600">{route.distance}</td>
                    <td className="px-5 py-4 text-gray-600">{route.students}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        route.status === 'Active' ? 'bg-green-100 text-green-800' :
                        route.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                        route.status === 'Delayed' ? 'bg-amber-100 text-amber-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {route.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button className="text-primary-600 hover:text-primary-800 font-medium">View Route</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── STUDENTS TAB ─── */}
      {activeTab === 'students' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
           <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search students..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-64" />
            </div>
            <div className="flex gap-2">
              <select className="border border-gray-300 rounded-lg text-sm px-3 py-2 bg-white">
                <option>All Buses</option>
                <option>BUS-01</option>
              </select>
              <select className="border border-gray-300 rounded-lg text-sm px-3 py-2 bg-white">
                <option>All Routes</option>
                <option>Patia Route</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                <tr>
                  <th className="px-5 py-3 font-medium">Student</th>
                  <th className="px-5 py-3 font-medium">Class/Roll</th>
                  <th className="px-5 py-3 font-medium">Bus</th>
                  <th className="px-5 py-3 font-medium">Stop</th>
                  <th className="px-5 py-3 font-medium">Parent & Phone</th>
                  <th className="px-5 py-3 font-medium">Pickup Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockStudents_BUS01.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-5 py-3 font-medium text-gray-900">{student.name}</td>
                    <td className="px-5 py-3 text-gray-600">{student.class} (Roll: {student.roll})</td>
                    <td className="px-5 py-3 text-gray-600">BUS-01</td>
                    <td className="px-5 py-3 text-gray-600">{student.stop}</td>
                    <td className="px-5 py-3">
                      <div className="text-gray-900">{student.parent}</div>
                      <div className="text-gray-500 text-xs">{student.phone}</div>
                    </td>
                    <td className="px-5 py-3 text-gray-600">{student.pickupTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── DRIVERS TAB ─── */}
      {activeTab === 'drivers' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                <tr>
                  <th className="px-5 py-3 font-medium">Driver Name</th>
                  <th className="px-5 py-3 font-medium">License No</th>
                  <th className="px-5 py-3 font-medium">Phone</th>
                  <th className="px-5 py-3 font-medium">Assigned Bus</th>
                  <th className="px-5 py-3 font-medium">Experience</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockDrivers.map((driver, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-5 py-4 font-bold text-gray-900 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <UserSquare2 className="w-4 h-4 text-gray-500" />
                      </div>
                      {driver.name}
                    </td>
                    <td className="px-5 py-4 text-gray-600 font-mono text-xs">{driver.license || '-'}</td>
                    <td className="px-5 py-4 text-gray-600">{driver.phone}</td>
                    <td className="px-5 py-4 text-gray-900 font-medium">{driver.bus || 'Unassigned'}</td>
                    <td className="px-5 py-4 text-gray-600">{driver.experience || '-'}</td>
                    <td className="px-5 py-4">
                      {driver.status === 'Present' ? (
                        <span className="flex items-center gap-1 text-green-600 text-xs font-medium bg-green-50 px-2 py-1 rounded-full w-max">
                          <CheckCircle2 className="w-3 h-3" /> Present
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-red-600 text-xs font-medium bg-red-50 px-2 py-1 rounded-full w-max">
                          <AlertCircle className="w-3 h-3" /> Absent
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
