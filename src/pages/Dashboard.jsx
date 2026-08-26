import { Users, BookOpen, CreditCard, UserCheck, TrendingUp, TrendingDown, FileText, Bell, Bus, Calendar } from 'lucide-react';
import { useMockData } from '../context/MockDataContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

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
  const { dashboardStats, activities } = data;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Good morning, Admin 👋</h1>
        <p className="mt-1 text-sm text-gray-500">Here's what's happening in your school today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { name: 'Total Students', stat: dashboardStats.students, icon: Users, change: '+4.7%', changeType: 'increase' },
          { name: 'Total Teachers', stat: dashboardStats.teachers, icon: BookOpen, change: '+1.2%', changeType: 'increase' },
          { name: 'Total Classes', stat: dashboardStats.classes, icon: BookOpen, change: '0%', changeType: 'neutral' },
          { name: 'Avg Attendance', stat: `${dashboardStats.attendance}%`, icon: UserCheck, change: '-1.1%', changeType: 'decrease' },
        ].map((item) => (
          <div key={item.name} className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow-sm rounded-xl border border-gray-100 overflow-hidden">
            <dt>
              <div className="absolute bg-primary-50 rounded-lg p-3">
                <item.icon className="h-6 w-6 text-primary-600" aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">{item.name}</p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
              <p className={`ml-2 flex items-baseline text-sm font-semibold ${
                item.changeType === 'increase' ? 'text-green-600' : item.changeType === 'decrease' ? 'text-red-600' : 'text-gray-500'
              }`}>
                {item.changeType === 'increase' ? <TrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500 mr-1" /> : item.changeType === 'decrease' ? <TrendingDown className="self-center flex-shrink-0 h-4 w-4 text-red-500 mr-1" /> : null}
                {item.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* Today's Operations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Today's Operations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <div className="flex items-center gap-2 mb-1">
              <UserCheck className="w-4 h-4 text-gray-400" />
              <p className="text-sm font-medium text-gray-500">Attendance</p>
            </div>
            <p className="text-lg font-bold text-gray-900">1,084 / 1,142 <span className="text-sm font-normal text-gray-500">Present</span></p>
            <p className="text-sm font-medium text-red-500 mt-1">58 Absent</p>
          </div>
          
          <div className="border-l-4 border-green-500 pl-4">
            <div className="flex items-center gap-2 mb-1">
              <CreditCard className="w-4 h-4 text-gray-400" />
              <p className="text-sm font-medium text-gray-500">Fees</p>
            </div>
            <p className="text-lg font-bold text-gray-900">₹42,500 <span className="text-sm font-normal text-gray-500">collected</span></p>
            <p className="text-sm font-medium text-amber-500 mt-1">₹18,200 pending today</p>
          </div>
          
          <div className="border-l-4 border-purple-500 pl-4">
            <div className="flex items-center gap-2 mb-1">
              <FileText className="w-4 h-4 text-gray-400" />
              <p className="text-sm font-medium text-gray-500">Examinations</p>
            </div>
            <p className="text-lg font-bold text-gray-900">Class X Mathematics</p>
            <p className="text-sm font-medium text-blue-500 mt-1">Tomorrow</p>
          </div>
          
          <div className="border-l-4 border-amber-500 pl-4">
            <div className="flex items-center gap-2 mb-1">
              <Bus className="w-4 h-4 text-gray-400" />
              <p className="text-sm font-medium text-gray-500">Transport</p>
            </div>
            <p className="text-lg font-bold text-gray-900">18 buses <span className="text-sm font-normal text-gray-500">active</span></p>
            <p className="text-sm font-medium text-red-500 mt-1">2 delayed</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Fee Collection (YTD)</p>
            <p className="mt-2 text-3xl font-semibold text-gray-900">₹{dashboardStats.feeCollection}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-full">
            <CreditCard className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Pending Fees</p>
            <p className="mt-2 text-3xl font-semibold text-gray-900">₹{dashboardStats.pendingFees}</p>
          </div>
          <div className="bg-amber-50 p-4 rounded-full">
            <CreditCard className="h-8 w-8 text-amber-600" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Attendance Overview (Last 7 Days)</h2>
          <div className="h-72 w-full">
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
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} domain={[0, 100]} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="attendance" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorAtt)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Fee Collection (in Lakhs)</h2>
          <div className="h-72 w-full">
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

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Activity</h3>
          <span className="text-sm text-primary-600 font-medium cursor-pointer">View all</span>
        </div>
        <ul className="divide-y divide-gray-100">
          {activities.length > 0 ? activities.slice(0, 5).map((activity) => {
            const isFee = activity.text.toLowerCase().includes('fee');
            const isAtt = activity.text.toLowerCase().includes('absent') || activity.text.toLowerCase().includes('attendance');
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
