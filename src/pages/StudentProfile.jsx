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
                    <div className="text-2xl font-bold text-red-600">8 Days</div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                    <div className="text-sm font-medium text-gray-500 mb-1">On Leave</div>
                    <div className="text-2xl font-bold text-amber-600">2 Days</div>
                  </div>
                </div>
                <div className="bg-white border border-gray-100 rounded-lg p-8 text-center text-gray-500 shadow-sm">
                  Calendar view of attendance will render here.
                </div>
              </div>
            )}

            {activeTab === 'academics' && (
              <div className="bg-white border border-gray-100 rounded-lg p-8 text-center text-gray-500 shadow-sm">
                Subject-wise marks and performance charts will render here.
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
              <div className="bg-white border border-gray-100 rounded-lg p-8 text-center text-gray-500 shadow-sm">
                Exam schedule and results will render here.
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {['Birth Certificate', 'Aadhaar Card', 'Previous Marksheet', 'Transfer Certificate', 'Address Proof'].map((doc, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4 flex items-start gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><FileText size={20} /></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{doc}</p>
                      <p className="text-xs text-green-600 mt-1 flex items-center gap-1"><CheckCircle2 size={12} /> Uploaded</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'communication' && (
              <div className="bg-white border border-gray-100 rounded-lg p-8 text-center text-gray-500 shadow-sm">
                SMS and WhatsApp communication history will render here.
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
