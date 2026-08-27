import { Users, BookOpen, CreditCard, UserCheck, TrendingUp, TrendingDown, FileText, Bell, Bus, Calendar, AlertCircle, Clock, ChevronRight } from 'lucide-react';
import { useMockData } from '../context/MockDataContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Link } from 'react-router-dom';

const attendanceData = [
  { name: 'Mon', attendance: 92 },
  { name: 'Tue', attendance: 95 },
  { name: 'Wed', attendance: 91 },
  { name: 'Thu', attendance: 94 },
  { name: 'Fri', attendance: 96 },
  { name: 'Sat', attendance: 85 },
];

const feeData = [
  { name: 'Apr', collected: 4.2 },
  { name: 'May', collected: 3.8 },
  { name: 'Jun', collected: 4.5 },
  { name: 'Jul', collected: 5.1 },
  { name: 'Aug', collected: 3.2 },
];

export default function Dashboard() {
  const { data } = useMockData();
  // Ensure we fall back to defaults if data is not fully loaded
  const dashboardStats = data?.dashboardStats || { students: 1142, teachers: 68, classes: 32, attendance: 94.9, feesCollectedToday: 47500, pendingFees: 320000 };
  const todayStatus = data?.todayStatus || { studentsPresent: 1084, studentsTotal: 1142, teachersPresent: 61, teachersTotal: 68, teachersAbsent: 7, classesRunning: 30, classesTotal: 32, examsToday: 2, homeworkPending: 128, noticesUnread: 3 };
  const activities = data?.activities || [];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Good morning, Principal 👋</h1>
          <p className="mt-1 text-md text-gray-500">Wednesday, 26 August 2026. Here is your school's operational snapshot for today.</p>
        </div>
      </div>

      {/* 4. PRINCIPAL ACTION REQUIRED / NEEDS ATTENTION */}
      <div className="bg-red-50 border border-red-100 rounded-xl p-6">
        <h2 className="text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          Needs Your Attention
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white rounded-lg p-4 border-l-4 border-red-500 shadow-sm flex flex-col justify-between">
            <div>
              <p className="font-semibold text-gray-900">🔴 3 Classes Need Teacher Adjustment</p>
              <p className="text-sm text-gray-600 mt-1">Mathematics and Social Science teachers absent.</p>
            </div>
            <Link to="/staff-adjustments" className="mt-3 text-sm font-medium text-red-600 hover:text-red-700 flex items-center gap-1">
              View Adjustment <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500 shadow-sm flex flex-col justify-between">
            <div>
              <p className="font-semibold text-gray-900">🟠 12 Students Below 75% Attendance</p>
              <p className="text-sm text-gray-600 mt-1">Class VIII and IX students below threshold.</p>
            </div>
            <Link to="/student-reports?filter=attendance" className="mt-3 text-sm font-medium text-orange-600 hover:text-orange-700 flex items-center gap-1">
              View Students <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white rounded-lg p-4 border-l-4 border-amber-500 shadow-sm flex flex-col justify-between">
            <div>
              <p className="font-semibold text-gray-900">🟠 ₹{dashboardStats.pendingFees / 100000}L Fee Pending</p>
              <p className="text-sm text-gray-600 mt-1">Overdue from 45 students across classes.</p>
            </div>
            <Link to="/accounts" className="mt-3 text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1">
              View Dues <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500 shadow-sm flex flex-col justify-between">
            <div>
              <p className="font-semibold text-gray-900">🔵 4 Admissions Awaiting Approval</p>
              <p className="text-sm text-gray-600 mt-1">New applications for Class XI Science.</p>
            </div>
            <Link to="/admissions" className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
              Review Admissions <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>

      {/* 2. TOP SUMMARY (Compact) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Students</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{dashboardStats.students}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Teachers</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{dashboardStats.teachers}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Classes</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{dashboardStats.classes}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Today's Att.</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{dashboardStats.attendance}%</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Fees Today</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">₹{(dashboardStats.feesCollectedToday / 1000).toFixed(1)}k</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Pending</p>
          <p className="text-2xl font-bold text-red-600 mt-1">₹{(dashboardStats.pendingFees / 100000).toFixed(1)}L</p>
        </div>
      </div>

      {/* 3. TODAY'S SCHOOL STATUS */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary-600" />
          Today's School Status
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <div>
            <p className="text-sm font-medium text-gray-500">Students Present</p>
            <p className="text-xl font-bold text-gray-900 mt-1">{todayStatus.studentsPresent} <span className="text-sm font-normal text-gray-500">/ {todayStatus.studentsTotal}</span></p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Teachers Present</p>
            <p className="text-xl font-bold text-gray-900 mt-1">{todayStatus.teachersPresent} <span className="text-sm font-normal text-gray-500">/ {todayStatus.teachersTotal}</span></p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Teachers Absent</p>
            <p className="text-xl font-bold text-red-600 mt-1">{todayStatus.teachersAbsent}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Classes Running</p>
            <p className="text-xl font-bold text-gray-900 mt-1">{todayStatus.classesRunning} <span className="text-sm font-normal text-gray-500">/ {todayStatus.classesTotal}</span></p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Exams Today</p>
            <p className="text-xl font-bold text-gray-900 mt-1">{todayStatus.examsToday}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">School Notices</p>
            <p className="text-xl font-bold text-primary-600 mt-1">{todayStatus.noticesUnread} unread</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Attendance Overview (7 Days)</h2>
            <Link to="/attendance" className="text-sm font-medium text-primary-600 hover:text-primary-700">Detailed Report</Link>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAtt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} domain={[80, 100]} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="attendance" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorAtt)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Fee Collection (in Lakhs)</h2>
            <Link to="/reports" className="text-sm font-medium text-primary-600 hover:text-primary-700">Financial Reports</Link>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={feeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} cursor={{fill: '#f3f4f6'}} />
                <Bar dataKey="collected" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Principal Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Principal Activity</h3>
        </div>
        <ul className="divide-y divide-gray-100">
          {activities.length > 0 ? activities.slice(0, 5).map((activity) => {
            const isFee = activity.text.toLowerCase().includes('fee') || activity.text.toLowerCase().includes('payment');
            const isAtt = activity.text.toLowerCase().includes('absent') || activity.text.toLowerCase().includes('attendance') || activity.text.toLowerCase().includes('adjustment');
            const isStu = activity.text.toLowerCase().includes('student') || activity.text.toLowerCase().includes('admission');
            const isHw = activity.text.toLowerCase().includes('homework');
            
            return (
              <li key={activity.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                    isFee ? 'bg-green-100 text-green-600' :
                    isAtt ? 'bg-red-100 text-red-600' :
                    isStu ? 'bg-blue-100 text-blue-600' :
                    isHw ? 'bg-purple-100 text-purple-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {isFee ? <CreditCard size={18} /> : 
                     isAtt ? <UserCheck size={18} /> : 
                     isStu ? <Users size={18} /> : 
                     isHw ? <BookOpen size={18} /> : 
                     <Bell size={18} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.text}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              </li>
            );
          }) : (
            <li className="px-6 py-8 text-center text-sm text-gray-500">No recent activity</li>
          )}
        </ul>
      </div>
    </div>
  );
}
