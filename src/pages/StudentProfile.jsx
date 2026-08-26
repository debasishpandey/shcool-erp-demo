import { useParams, Link } from 'react-router-dom';
import { useMockData } from '../context/MockDataContext';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Droplet, User, Users, UserCheck, BookOpen, CreditCard, Award, Download, MessageSquare, Plus, FileText, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function StudentProfile() {
  const { id } = useParams();
  const { data, recordFeePayment, markAttendance } = useMockData();
  const { students } = data;
  
  const student = students.find(s => s.id === parseInt(id) || s.id === id) || students[0];
  const [activeTab, setActiveTab] = useState('overview');
  const [showFeeModal, setShowFeeModal] = useState(false);
  const [feeAmount, setFeeAmount] = useState('');
  const [showToast, setShowToast] = useState('');

  if (!student) return <div>Student not found</div>;

  const handleRecordFee = (e) => {
    e.preventDefault();
    if (feeAmount) {
      recordFeePayment(student.id, parseInt(feeAmount), "Online", "Demo payment");
      setShowFeeModal(false);
      setFeeAmount('');
      setShowToast('Fee payment recorded successfully.');
      setTimeout(() => setShowToast(''), 3000);
    }
  };

  const handleMarkAbsent = () => {
    markAttendance(student.id, 'Absent');
    setShowToast(`Attendance marked Absent. Parent notification sent via mock SMS.`);
    setTimeout(() => setShowToast(''), 5000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {showToast && (
        <div className="fixed top-4 right-4 bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-3 animate-fade-in-up">
          <CheckCircle2 className="w-5 h-5 text-green-400" />
          <p className="font-medium text-sm">{showToast}</p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/students" className="p-2 rounded-full hover:bg-gray-200 text-gray-500 transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Student 360° Profile</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={handleMarkAbsent} className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
            <UserCheck className="w-4 h-4" /> Mark Absent
          </button>
          <button onClick={() => setShowFeeModal(true)} className="px-3 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 flex items-center gap-2">
            <CreditCard className="w-4 h-4" /> Record Fee
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary-500 to-primary-700"></div>
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-12 mb-6 flex-wrap gap-4">
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

          <div className="border-b border-gray-200 overflow-x-auto sidebar-scroll">
            <nav className="-mb-px flex space-x-6 min-w-max">
              {['overview', 'attendance', 'academics', 'fees', 'examinations', 'documents', 'communication'].map((tab) => (
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  {/* Overview Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-center">
                      <p className="text-sm font-medium text-blue-600 mb-1">Attendance</p>
                      <p className="text-xl font-bold text-blue-900">{student.attendance}</p>
                    </div>
                    <div className="bg-green-50 border border-green-100 rounded-lg p-4 text-center">
                      <p className="text-sm font-medium text-green-600 mb-1">Fee Paid</p>
                      <p className="text-xl font-bold text-green-900">₹{student.paidFee.toLocaleString()}</p>
                    </div>
                    <div className="bg-red-50 border border-red-100 rounded-lg p-4 text-center">
                      <p className="text-sm font-medium text-red-600 mb-1">Fee Due</p>
                      <p className="text-xl font-bold text-red-900">₹{student.pendingFee.toLocaleString()}</p>
                    </div>
                    <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 text-center">
                      <p className="text-sm font-medium text-purple-600 mb-1">Class Rank</p>
                      <p className="text-xl font-bold text-purple-900">4th</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-gray-400" />
                        Personal Information
                      </h3>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-4 border border-gray-100">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-sm text-gray-500">Date of Birth</div>
                          <div className="col-span-2 text-sm font-medium text-gray-900">{student.dob}</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-sm text-gray-500">Gender</div>
                          <div className="col-span-2 text-sm font-medium text-gray-900">{student.gender}</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-sm text-gray-500">Blood Group</div>
                          <div className="col-span-2 text-sm font-medium text-gray-900">{student.bg}</div>
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
                          <div className="col-span-2 text-sm font-medium text-gray-900">{student.phone}</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-sm text-gray-500">Email</div>
                          <div className="col-span-2 text-sm font-medium text-gray-900">{student.parentEmail || "N/A"}</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-sm text-gray-500">Address</div>
                          <div className="col-span-2 text-sm font-medium text-gray-900">{student.address}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Side Activity */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                  <div className="bg-white border border-gray-100 rounded-lg shadow-sm">
                    <ul className="divide-y divide-gray-100">
                      <li className="p-4">
                        <p className="text-sm font-medium text-gray-900">Mathematics Homework Assigned</p>
                        <p className="text-xs text-gray-500 mt-1">Today</p>
                      </li>
                      <li className="p-4">
                        <p className="text-sm font-medium text-gray-900">Term 1 Fee Paid (₹{student.paidFee})</p>
                        <p className="text-xs text-gray-500 mt-1">Last week</p>
                      </li>
                      <li className="p-4">
                        <p className="text-sm font-medium text-gray-900">Marked Absent</p>
                        <p className="text-xs text-gray-500 mt-1">2 weeks ago</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'attendance' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                    <div className="text-sm font-medium text-gray-500 mb-1">Overall Percentage</div>
                    <div className="text-2xl font-bold text-blue-600">{student.attendance}</div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                    <div className="text-sm font-medium text-gray-500 mb-1">Total Present</div>
                    <div className="text-2xl font-bold text-green-600">142 Days</div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                    <div className="text-sm font-medium text-gray-500 mb-1">Total Absent</div>
                    <div className="text-2xl font-bold text-red-600">3 Days</div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                    <div className="text-sm font-medium text-gray-500 mb-1">Late</div>
                    <div className="text-2xl font-bold text-amber-600">1 Day</div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">August 2026</h3>
                    <span className="text-sm text-gray-500">Attendance Trend: <span className="text-green-600 font-medium">Improving</span> (Last 7 Days)</span>
                  </div>
                  <div className="grid grid-cols-7 gap-2 text-center text-sm">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                      <div key={d} className="font-medium text-gray-500 py-2">{d}</div>
                    ))}
                    {Array.from({ length: 31 }).map((_, i) => {
                      const date = i + 1;
                      let status = 'P';
                      let colorClass = 'bg-green-100 text-green-700 font-bold';
                      
                      if (date === 8 || date === 14 || date === 20) {
                        status = 'A';
                        colorClass = 'bg-red-100 text-red-700 font-bold';
                      } else if (date === 5) {
                        status = 'L';
                        colorClass = 'bg-amber-100 text-amber-700 font-bold';
                      } else if (date % 7 === 1 || date % 7 === 2) {
                        // Weekends
                        status = '-';
                        colorClass = 'text-gray-400 bg-gray-50';
                      }
                      
                      return (
                        <div key={i} className={`p-3 rounded-md flex flex-col items-center justify-center border border-transparent ${date <= 26 ? colorClass : 'text-gray-300'}`}>
                          <span className="text-xs mb-1 opacity-70">{date}</span>
                          {date <= 26 ? status : ''}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'academics' && (
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Current Performance</h3>
                    <p className="text-sm text-gray-500">Based on recent tests and assignments.</p>
                  </div>
                  <div className="flex gap-6 text-center">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Overall</p>
                      <p className="text-2xl font-bold text-gray-900">78%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Grade</p>
                      <p className="text-2xl font-bold text-primary-600">B+</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Class Avg</p>
                      <p className="text-2xl font-bold text-gray-600">76.8%</p>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 mt-8 mb-4">Subject Wise Performance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { sub: 'Mathematics', score: '84 / 100', grade: 'B+', color: 'text-green-600', bg: 'bg-green-50' },
                    { sub: 'Science', score: '78 / 100', grade: 'B+', color: 'text-blue-600', bg: 'bg-blue-50' },
                    { sub: 'English', score: '72 / 100', grade: 'B', color: 'text-amber-600', bg: 'bg-amber-50' },
                    { sub: 'Social Science', score: '81 / 100', grade: 'A', color: 'text-purple-600', bg: 'bg-purple-50' },
                    { sub: 'Hindi', score: '75 / 100', grade: 'B+', color: 'text-pink-600', bg: 'bg-pink-50' },
                  ].map(subject => (
                    <div key={subject.sub} className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 mb-1">{subject.sub}</p>
                        <p className="text-xl font-bold text-gray-700">{subject.score}</p>
                      </div>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${subject.bg} ${subject.color}`}>
                        {subject.grade}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'fees' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                    <div className="text-sm font-medium text-gray-500 mb-1">Total Fee (Yearly)</div>
                    <div className="text-2xl font-bold text-gray-900">₹{student.totalFee.toLocaleString()}</div>
                  </div>
                  <div className="bg-white border border-green-200 rounded-xl p-5 shadow-sm bg-green-50">
                    <div className="text-sm font-medium text-green-700 mb-1">Total Paid</div>
                    <div className="text-2xl font-bold text-green-700">₹{student.paidFee.toLocaleString()}</div>
                  </div>
                  <div className="bg-white border border-red-200 rounded-xl p-5 shadow-sm bg-red-50">
                    <div className="text-sm font-medium text-red-700 mb-1">Pending Due</div>
                    <div className="text-2xl font-bold text-red-700">₹{student.pendingFee.toLocaleString()}</div>
                  </div>
                </div>
                <div className="bg-white shadow-sm rounded-lg border border-gray-100 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">Payment History</h3>
                    <button onClick={() => setShowFeeModal(true)} className="text-sm text-primary-600 font-medium">Record Payment</button>
                  </div>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt No</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2026-04-10</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">REC-2026-0412</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹{student.paidFee.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Online</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-primary-600 cursor-pointer">Preview Receipt</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'examinations' && (
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="inline-block px-2 py-1 bg-primary-100 text-primary-800 text-xs font-semibold rounded mb-2">Latest Exam</span>
                      <h3 className="text-xl font-bold text-gray-900">Unit Test 1</h3>
                      <p className="text-sm text-gray-500">Conducted on 10 Aug 2026</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-black text-gray-900">390 <span className="text-xl text-gray-400 font-medium">/ 500</span></p>
                      <p className="text-sm font-medium text-green-600">78% • Grade B+</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4 border-t border-gray-100">
                    <div><p className="text-xs text-gray-500">Mathematics</p><p className="font-semibold text-gray-900">84</p></div>
                    <div><p className="text-xs text-gray-500">Science</p><p className="font-semibold text-gray-900">78</p></div>
                    <div><p className="text-xs text-gray-500">English</p><p className="font-semibold text-gray-900">72</p></div>
                    <div><p className="text-xs text-gray-500">Social Science</p><p className="font-semibold text-gray-900">81</p></div>
                    <div><p className="text-xs text-gray-500">Hindi</p><p className="font-semibold text-gray-900">75</p></div>
                  </div>
                </div>

                <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">Upcoming Exams</h3>
                <div className="bg-white shadow-sm rounded-lg border border-gray-200 divide-y divide-gray-100">
                  <div className="flex justify-between items-center p-4 hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-50 text-blue-700 rounded-md p-2 text-center w-14">
                        <div className="text-xs font-bold uppercase">Aug</div>
                        <div className="text-lg font-black leading-none">28</div>
                      </div>
                      <p className="font-medium text-gray-900">Mathematics (Unit Test 2)</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4 hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-50 text-blue-700 rounded-md p-2 text-center w-14">
                        <div className="text-xs font-bold uppercase">Aug</div>
                        <div className="text-lg font-black leading-none">30</div>
                      </div>
                      <p className="font-medium text-gray-900">Science (Unit Test 2)</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4 hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-50 text-blue-700 rounded-md p-2 text-center w-14">
                        <div className="text-xs font-bold uppercase">Sep</div>
                        <div className="text-lg font-black leading-none">02</div>
                      </div>
                      <p className="font-medium text-gray-900">English (Unit Test 2)</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'Birth Certificate', status: 'Uploaded' },
                  { name: 'Aadhaar Card / ID', status: 'Uploaded' },
                  { name: 'Previous Marksheet', status: 'Uploaded' },
                  { name: 'Transfer Certificate', status: 'Missing' },
                  { name: 'Address Proof', status: 'Uploaded' },
                ].map((doc, idx) => (
                  <div key={idx} className="border border-gray-200 bg-white rounded-lg p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3 mb-4">
                      <div className={`p-2 rounded-lg ${doc.status === 'Uploaded' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                        <FileText size={24} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                        {doc.status === 'Uploaded' ? (
                          <p className="text-xs text-green-600 mt-1 flex items-center gap-1 font-medium"><CheckCircle2 size={12} /> Uploaded</p>
                        ) : (
                          <p className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium"><Plus size={12} /> Not Uploaded</p>
                        )}
                      </div>
                    </div>
                    <div>
                      {doc.status === 'Uploaded' ? (
                        <button className="w-full py-1.5 text-sm font-medium border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">View Document</button>
                      ) : (
                        <button className="w-full py-1.5 text-sm font-medium border border-primary-300 rounded-md text-primary-700 bg-primary-50 hover:bg-primary-100">Upload Now</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'communication' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium text-gray-900">Recent Communication</h3>
                </div>
                <div className="relative border-l border-gray-200 ml-3 space-y-6 pb-4">
                  <div className="relative pl-6">
                    <span className="absolute -left-1.5 top-1 bg-white border-2 border-primary-500 w-3 h-3 rounded-full"></span>
                    <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm relative -top-3">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-sm font-bold text-gray-900">Parent Suggestion</span>
                        <span className="text-xs text-gray-500">Today, 9:15 AM</span>
                      </div>
                      <p className="text-sm text-gray-600">"Could homework be shared before 6 PM on the app?"</p>
                    </div>
                  </div>
                  <div className="relative pl-6">
                    <span className="absolute -left-1.5 top-1 bg-white border-2 border-red-500 w-3 h-3 rounded-full"></span>
                    <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm relative -top-3">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-sm font-bold text-gray-900">Attendance Alert</span>
                        <span className="text-xs text-gray-500">20 Aug 2026</span>
                      </div>
                      <p className="text-sm text-gray-600">SMS sent to parent: Aarav was marked absent today.</p>
                    </div>
                  </div>
                  <div className="relative pl-6">
                    <span className="absolute -left-1.5 top-1 bg-white border-2 border-amber-500 w-3 h-3 rounded-full"></span>
                    <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm relative -top-3">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-sm font-bold text-gray-900">Fee Reminder</span>
                        <span className="text-xs text-gray-500">18 Aug 2026</span>
                      </div>
                      <p className="text-sm text-gray-600">WhatsApp message sent regarding ₹6,000 pending fee due.</p>
                    </div>
                  </div>
                  <div className="relative pl-6">
                    <span className="absolute -left-1.5 top-1 bg-white border-2 border-blue-500 w-3 h-3 rounded-full"></span>
                    <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm relative -top-3">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-sm font-bold text-gray-900">Homework Update</span>
                        <span className="text-xs text-gray-500">15 Aug 2026</span>
                      </div>
                      <p className="text-sm text-gray-600">App Notification: English homework pending submission.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showFeeModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowFeeModal(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleRecordFee}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Record Payment for {student.name}</h3>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">Pending Due: <span className="font-bold text-red-600">₹{student.pendingFee.toLocaleString()}</span></p>
                    <label className="block text-sm font-medium text-gray-700">Amount to pay (₹)</label>
                    <input 
                      type="number" 
                      required 
                      value={feeAmount}
                      onChange={e => setFeeAmount(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" 
                      placeholder="e.g. 5000" 
                    />
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 sm:ml-3 sm:w-auto sm:text-sm">
                    Record Payment
                  </button>
                  <button type="button" onClick={() => setShowFeeModal(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
