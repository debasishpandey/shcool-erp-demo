import { useState } from 'react';
import { useMockData } from '../context/MockDataContext';
import { CreditCard, Search, Filter, Plus, FileText, CheckCircle2, AlertCircle, BarChart2, MessageSquare, Printer, Eye, X } from 'lucide-react';

export default function Accounts() {
  const { data, recordFeePayment, sendFeeReminder } = useMockData();
  const { feeTransactions, students, expenses } = data;

  const [activeTab, setActiveTab] = useState('overview'); // overview, collections, dues, receipts

  // Modal States
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showClassDetailModal, setShowClassDetailModal] = useState(false);
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Selected entities for modals
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);

  // Filters
  const [dueClassFilter, setDueClassFilter] = useState('All Classes');
  const [feeStatusFilter, setFeeStatusFilter] = useState('All Fee Statuses');
  const [searchQuery, setSearchQuery] = useState('');

  // Payment Form State
  const [payStudentId, setPayStudentId] = useState('');
  const [payAmount, setPayAmount] = useState('');
  const [payMethod, setPayMethod] = useState('UPI');
  const [payFeeType, setPayFeeType] = useState('Tuition Fee');

  // Reminder Form State
  const [reminderMethod, setReminderMethod] = useState('Both');

  // Compute Class Summaries
  const classSummariesMap = students.reduce((acc, student) => {
    if (!acc[student.class]) {
      acc[student.class] = { class: student.class, students: 0, totalFee: 0, collected: 0, due: 0, defaulters: 0 };
    }
    acc[student.class].students += 1;
    acc[student.class].totalFee += student.totalFee || 0;
    acc[student.class].collected += student.paidFee || 0;
    acc[student.class].due += student.pendingFee || 0;
    if (student.feeStatus === "Overdue") acc[student.class].defaulters += 1;
    return acc;
  }, {});
  
  const classSummaries = Object.values(classSummariesMap).sort((a, b) => {
    const order = { 'I': 1, 'III': 3, 'V': 5, 'VIII': 8, 'IX': 9, 'X': 10, 'XI': 11, 'XII': 12 };
    return (order[a.class] || 0) - (order[b.class] || 0);
  });

  const filteredDues = students.filter(s => {
    const matchClass = dueClassFilter === 'All Classes' || s.class === dueClassFilter;
    const matchStatus = feeStatusFilter === 'All Fee Statuses' || s.feeStatus === feeStatusFilter;
    const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        s.admissionNo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchClass && matchStatus && matchSearch && s.pendingFee > 0;
  });

  const filteredReceipts = feeTransactions.filter(txn => {
    return txn.receiptNo.toLowerCase().includes(searchQuery.toLowerCase()) || 
           txn.student.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (payStudentId && payAmount) {
      const student = students.find(s => s.admissionNo === payStudentId || s.name.toLowerCase() === payStudentId.toLowerCase() || s.id.toString() === payStudentId);
      if (student) {
        recordFeePayment(student.id, parseInt(payAmount), payMethod, payFeeType);
        setShowPaymentModal(false);
        setSuccessMessage("Payment recorded successfully! Receipt generated.");
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        setPayStudentId('');
        setPayAmount('');
      } else {
        alert("Student not found!");
      }
    }
  };

  const openPaymentModal = (student) => {
    setPayStudentId(student ? student.name : '');
    setPayAmount(student ? student.pendingFee.toString() : '');
    setShowPaymentModal(true);
  };

  const handleSendReminder = () => {
    sendFeeReminder(selectedStudent.name, selectedStudent.pendingFee);
    setShowReminderModal(false);
    setSuccessMessage(`Reminder sent successfully to ${selectedStudent.name}'s parent.`);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const openReminderModal = (student) => {
    setSelectedStudent(student);
    setShowReminderModal(true);
  };

  const openReceiptModal = (txn) => {
    setSelectedReceipt(txn);
    setShowReceiptModal(true);
  };

  const openClassDetailModal = (className) => {
    setSelectedClass(className);
    setShowClassDetailModal(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 no-print">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Accounts</h1>
          <p className="mt-1 text-sm text-gray-500">Fee collection, dues, payments and receipts</p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-3">
          <button 
            onClick={() => openPaymentModal(null)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Record Payment
          </button>
        </div>
      </div>

      {showSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5" />
          <p className="font-medium">{successMessage}</p>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px overflow-x-auto">
            {['overview', 'collections', 'dues', 'receipts'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-primary-500 text-primary-600 bg-primary-50/50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Top Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <p className="text-xs font-medium text-gray-500 mb-1">Total Fee Collection</p>
                  <p className="text-xl font-bold text-gray-900">₹18,40,000</p>
                  <p className="text-xs text-gray-400 mt-1">This Year</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                  <p className="text-xs font-medium text-amber-700 mb-1">Pending Fees</p>
                  <p className="text-xl font-bold text-amber-700">₹3,20,000</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                  <p className="text-xs font-medium text-red-700 mb-1">Overdue</p>
                  <p className="text-xl font-bold text-red-700">₹1,15,000</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <p className="text-xs font-medium text-green-700 mb-1">Today's Collection</p>
                  <p className="text-xl font-bold text-green-700">₹45,000</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <p className="text-xs font-medium text-gray-500 mb-1">Total Expenses</p>
                  <p className="text-xl font-bold text-gray-900">₹6,85,000</p>
                </div>
                <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
                  <p className="text-xs font-medium text-primary-700 mb-1">Net Collection</p>
                  <p className="text-xl font-bold text-primary-700">₹11,55,000</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Class-wise Collection */}
                <div className="lg:col-span-2">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Class-wise Fee Summary</h3>
                  <div className="overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total Fee</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Collected</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Due</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Collection %</th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Action</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {classSummaries.map((summary) => {
                          const percent = summary.totalFee > 0 ? Math.round((summary.collected / summary.totalFee) * 100) : 0;
                          return (
                            <tr key={summary.class} className="hover:bg-gray-50">
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                {summary.class}
                                <span className="ml-2 text-xs text-gray-500 font-normal">{summary.students} students</span>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">₹{summary.totalFee.toLocaleString()}</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600 font-medium text-right">₹{summary.collected.toLocaleString()}</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600 font-medium text-right">₹{summary.due.toLocaleString()}</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                    <div className={`h-1.5 rounded-full ${percent >= 90 ? 'bg-green-500' : percent >= 75 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${percent}%` }}></div>
                                  </div>
                                  <span className="w-8">{percent}%</span>
                                </div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium">
                                <button 
                                  onClick={() => openClassDetailModal(summary.class)}
                                  className="text-primary-600 hover:text-primary-900"
                                >
                                  View Details
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Secondary Widgets */}
                <div className="space-y-6">
                  {/* Today's Breakup */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Today's Collection Breakdown</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Cash</span>
                        <span className="text-sm font-medium text-gray-900">₹12,000</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">UPI</span>
                        <span className="text-sm font-medium text-gray-900">₹21,000</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Card</span>
                        <span className="text-sm font-medium text-gray-900">₹8,000</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Bank Transfer</span>
                        <span className="text-sm font-medium text-gray-900">₹4,000</span>
                      </div>
                      <div className="pt-3 mt-3 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-sm font-bold text-gray-900">Total</span>
                        <span className="text-sm font-bold text-green-600">₹45,000</span>
                      </div>
                    </div>
                  </div>

                  {/* Trend */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Collection Trend (7 Days)</h3>
                    <div className="space-y-2">
                      {[
                        { d: 'Mon', v: 32000, p: 60 },
                        { d: 'Tue', v: 41000, p: 75 },
                        { d: 'Wed', v: 37000, p: 70 },
                        { d: 'Thu', v: 45000, p: 85 },
                        { d: 'Fri', v: 39000, p: 72 },
                        { d: 'Sat', v: 52000, p: 100 }
                      ].map(day => (
                        <div key={day.d} className="flex items-center gap-3">
                          <span className="text-xs text-gray-500 w-8">{day.d}</span>
                          <div className="flex-1 bg-gray-100 rounded-sm h-4 overflow-hidden">
                            <div className="bg-primary-400 h-full rounded-sm" style={{ width: `${day.p}%` }}></div>
                          </div>
                          <span className="text-xs font-medium text-gray-900 w-16 text-right">₹{day.v.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* COLLECTIONS TAB (Recent Transactions) */}
          {activeTab === 'collections' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Recent Transactions</h3>
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt No</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method & Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {feeTransactions.map((txn) => (
                      <tr key={txn.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{txn.receiptNo}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{txn.student}</div>
                          <div className="text-sm text-gray-500">Class {txn.class}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{txn.feeType || 'Tuition Fee'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">₹{txn.amount.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center gap-1">
                            <CreditCard className="w-3 h-3 text-gray-400" /> {txn.method}
                          </div>
                          <div className="text-sm text-gray-500">{txn.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            txn.status === 'Successful' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {txn.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* DUES TAB */}
          {activeTab === 'dues' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="relative flex-1 max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Search student or admission no..."
                  />
                </div>
                <div className="flex gap-2">
                  <select 
                    value={dueClassFilter}
                    onChange={(e) => setDueClassFilter(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  >
                    <option>All Classes</option>
                    {Array.from(new Set(students.map(s => s.class))).map(c => (
                      <option key={c} value={c}>Class {c}</option>
                    ))}
                  </select>
                  <select 
                    value={feeStatusFilter}
                    onChange={(e) => setFeeStatusFilter(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  >
                    <option>All Fee Statuses</option>
                    <option value="Overdue">Overdue</option>
                    <option value="Pending">Pending Due</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Details</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Fee</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredDues.length > 0 ? filteredDues.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-500">Class {student.class}-{student.section} • {student.admissionNo}</div>
                          <div className="text-xs text-gray-400">Parent: {student.parent} ({student.phone})</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{student.totalFee.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">₹{student.paidFee.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-red-600">₹{student.pendingFee.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            student.feeStatus === 'Overdue' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {student.feeStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-center gap-2">
                            <button 
                              onClick={() => openPaymentModal(student)}
                              className="text-primary-600 hover:text-primary-900 px-2 py-1 border border-primary-200 rounded-md hover:bg-primary-50"
                              title="Record Payment"
                            >
                              Pay
                            </button>
                            <button 
                              onClick={() => openReminderModal(student)}
                              className="text-amber-600 hover:text-amber-900 px-2 py-1 border border-amber-200 rounded-md hover:bg-amber-50"
                              title="Send Reminder"
                            >
                              Remind
                            </button>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-10 text-center text-sm text-gray-500">
                          No pending dues found matching filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* RECEIPTS TAB */}
          {activeTab === 'receipts' && (
            <div className="space-y-4">
              <div className="flex mb-4">
                <div className="relative w-full max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Search receipt no or student name..."
                  />
                </div>
              </div>
              
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filteredReceipts.map((txn) => (
                  <div key={txn.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded">
                          {txn.receiptNo}
                        </span>
                        <div className="mt-1 text-xs text-gray-500">{txn.date}</div>
                      </div>
                      <span className="text-lg font-bold text-gray-900">₹{txn.amount.toLocaleString()}</span>
                    </div>
                    <div className="mb-4">
                      <div className="font-medium text-gray-900">{txn.student}</div>
                      <div className="text-sm text-gray-500">Class {txn.class} • {txn.feeType || 'Tuition Fee'}</div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => openReceiptModal(txn)}
                        className="flex-1 flex justify-center items-center gap-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium"
                      >
                        <Eye className="w-4 h-4" /> View
                      </button>
                      <button 
                        onClick={() => { openReceiptModal(txn); setTimeout(handlePrint, 100); }}
                        className="flex-1 flex justify-center items-center gap-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium"
                      >
                        <Printer className="w-4 h-4" /> Print
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RECORD PAYMENT MODAL */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowPaymentModal(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handlePaymentSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 sm:mx-0 sm:h-10 sm:w-10">
                      <CreditCard className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Record Payment</h3>
                      <div className="mt-4 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Student (Name or Admission No.)</label>
                          <input 
                            required
                            type="text" 
                            value={payStudentId}
                            onChange={(e) => setPayStudentId(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" 
                            placeholder="e.g. Aarav Sharma" 
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Fee Type</label>
                            <select 
                              value={payFeeType}
                              onChange={(e) => setPayFeeType(e.target.value)}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            >
                              <option>Tuition Fee</option>
                              <option>Transport Fee</option>
                              <option>Exam Fee</option>
                              <option>Activity Fee</option>
                              <option>Annual Fee</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Amount Paid (₹)</label>
                            <input 
                              required
                              type="number" 
                              value={payAmount}
                              onChange={(e) => setPayAmount(e.target.value)}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" 
                              placeholder="0.00" 
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Payment Mode</label>
                          <select 
                            value={payMethod}
                            onChange={(e) => setPayMethod(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          >
                            <option>Cash</option>
                            <option>UPI</option>
                            <option>Bank Transfer</option>
                            <option>Card</option>
                            <option>Cheque</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Remarks</label>
                          <input 
                            type="text" 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            placeholder="Optional reference no or note"
                          />
                        </div>

                        {/* Confirmation Preview */}
                        {payStudentId && payAmount && (
                          <div className="mt-4 bg-gray-50 border border-gray-200 rounded-md p-3 text-sm">
                            <p className="font-medium text-gray-700 mb-2">Confirmation Preview:</p>
                            <ul className="text-gray-600 space-y-1">
                              <li>Student: <span className="font-medium">{payStudentId}</span></li>
                              <li>Amount: <span className="font-medium">₹{payAmount}</span></li>
                              <li>Method: <span className="font-medium">{payMethod}</span></li>
                              <li>Type: <span className="font-medium">{payFeeType}</span></li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                    Confirm Payment
                  </button>
                  <button type="button" onClick={() => setShowPaymentModal(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* SEND REMINDER MODAL */}
      {showReminderModal && selectedStudent && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowReminderModal(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-amber-100 sm:mx-0 sm:h-10 sm:w-10">
                    <MessageSquare className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Fee Reminder</h3>
                    <div className="mt-4 space-y-3 text-sm text-gray-600">
                      <div className="flex justify-between border-b pb-2">
                        <span>Student:</span>
                        <span className="font-medium text-gray-900">{selectedStudent.name}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span>Parent:</span>
                        <span className="font-medium text-gray-900">{selectedStudent.parent} ({selectedStudent.phone})</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span>Pending Due:</span>
                        <span className="font-bold text-red-600">₹{selectedStudent.pendingFee.toLocaleString()}</span>
                      </div>
                      
                      <div className="pt-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Send Via</label>
                        <select 
                          value={reminderMethod}
                          onChange={(e) => setReminderMethod(e.target.value)}
                          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        >
                          <option>SMS</option>
                          <option>WhatsApp</option>
                          <option>Both</option>
                        </select>
                      </div>

                      <div className="mt-4 bg-gray-50 border border-gray-200 rounded-md p-3">
                        <p className="text-xs font-semibold text-gray-500 mb-1">Message Preview:</p>
                        <p className="italic text-gray-700">"Dear Parent, ₹{selectedStudent.pendingFee.toLocaleString()} school fee for {selectedStudent.name} is pending. Kindly clear the dues at the earliest."</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" onClick={handleSendReminder} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                  Send Reminder
                </button>
                <button type="button" onClick={() => setShowReminderModal(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CLASS DETAIL MODAL */}
      {showClassDetailModal && selectedClass && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowClassDetailModal(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-xl leading-6 font-bold text-gray-900" id="modal-title">Class {selectedClass} Dues</h3>
                  <button onClick={() => setShowClassDetailModal(false)} className="text-gray-400 hover:text-gray-500">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="overflow-x-auto border border-gray-200 rounded-lg max-h-[60vh] overflow-y-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Fee</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {students.filter(s => s.class === selectedClass).map((student) => (
                        <tr key={student.id} className="hover:bg-gray-50">
                          <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                          <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">{student.rollNo}</td>
                          <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">₹{student.totalFee.toLocaleString()}</td>
                          <td className="px-6 py-3 whitespace-nowrap text-sm text-green-600">₹{student.paidFee.toLocaleString()}</td>
                          <td className="px-6 py-3 whitespace-nowrap text-sm font-bold text-red-600">₹{student.pendingFee.toLocaleString()}</td>
                          <td className="px-6 py-3 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              student.feeStatus === 'Overdue' ? 'bg-red-100 text-red-800' :
                              student.feeStatus === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {student.feeStatus}
                            </span>
                          </td>
                          <td className="px-6 py-3 whitespace-nowrap text-center text-sm font-medium">
                            {student.pendingFee > 0 ? (
                              <button onClick={() => { setShowClassDetailModal(false); openPaymentModal(student); }} className="text-primary-600 hover:text-primary-900 text-xs border border-primary-200 rounded px-2 py-1">Record Payment</button>
                            ) : (
                              <span className="text-gray-400 text-xs">Cleared</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PRINTABLE RECEIPT / MODAL */}
      {showReceiptModal && selectedReceipt && (
        <>
          {/* Modal Overlay (Hidden in print) */}
          <div className="fixed inset-0 z-50 overflow-y-auto no-print" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowReceiptModal(false)}></div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
                
                {/* Visual Preview for Modal */}
                <div className="bg-white px-6 pt-5 pb-6">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest">Sunrise Public School</h2>
                    <p className="text-sm text-gray-500 mt-1">Fee Receipt</p>
                  </div>
                  
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between pb-3 border-b border-gray-100">
                      <span className="text-gray-500">Receipt No:</span>
                      <span className="font-semibold text-gray-900">{selectedReceipt.receiptNo}</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-gray-100">
                      <span className="text-gray-500">Date:</span>
                      <span className="font-medium text-gray-900">{selectedReceipt.date}</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-gray-100">
                      <span className="text-gray-500">Student:</span>
                      <span className="font-medium text-gray-900">{selectedReceipt.student}</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-gray-100">
                      <span className="text-gray-500">Class:</span>
                      <span className="font-medium text-gray-900">{selectedReceipt.class}</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-gray-100">
                      <span className="text-gray-500">Fee Type:</span>
                      <span className="font-medium text-gray-900">{selectedReceipt.feeType || 'Tuition Fee'}</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-gray-100">
                      <span className="text-gray-500">Payment Mode:</span>
                      <span className="font-medium text-gray-900">{selectedReceipt.method}</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="text-base font-bold text-gray-900">Amount Paid:</span>
                      <span className="text-base font-bold text-green-600">₹{selectedReceipt.amount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-200">
                  <button type="button" onClick={handlePrint} className="w-full inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                    <Printer className="w-4 h-4 mr-2" /> Print Receipt
                  </button>
                  <button type="button" onClick={() => setShowReceiptModal(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Actual Print Area (Hidden in screen, visible in print) */}
          <div className="hidden print-area p-8 max-w-2xl mx-auto">
            <div className="text-center mb-8 border-b-2 border-gray-900 pb-6">
              <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-widest">Sunrise Public School</h1>
              <p className="text-gray-600 mt-2">123 Education Hub, Knowledge City - 110001</p>
              <h2 className="text-xl font-semibold text-gray-800 mt-6 border-2 border-gray-800 inline-block px-4 py-1">FEE RECEIPT</h2>
            </div>
            
            <div className="flex justify-between mb-8 text-lg">
              <div><span className="font-semibold">Receipt No:</span> {selectedReceipt.receiptNo}</div>
              <div><span className="font-semibold">Date:</span> {selectedReceipt.date}</div>
            </div>

            <div className="border border-gray-400 rounded-lg p-6 space-y-6 text-lg">
              <div className="grid grid-cols-3">
                <div className="text-gray-600 font-medium">Received From:</div>
                <div className="col-span-2 font-bold text-xl">{selectedReceipt.student}</div>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-gray-600 font-medium">Class & Section:</div>
                <div className="col-span-2 font-medium">{selectedReceipt.class}</div>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-gray-600 font-medium">Payment For:</div>
                <div className="col-span-2 font-medium">{selectedReceipt.feeType || 'Tuition Fee'}</div>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-gray-600 font-medium">Payment Mode:</div>
                <div className="col-span-2 font-medium">{selectedReceipt.method}</div>
              </div>
              <div className="grid grid-cols-3 pt-6 border-t border-gray-300 items-center">
                <div className="text-gray-600 font-bold text-xl">Amount Paid:</div>
                <div className="col-span-2 font-bold text-2xl">₹ {selectedReceipt.amount.toLocaleString()}/-</div>
              </div>
            </div>

            <div className="mt-20 flex justify-between">
              <div className="text-gray-500 italic">This is a computer generated receipt.</div>
              <div className="text-center">
                <div className="w-48 border-b border-gray-500 mb-2"></div>
                <div className="font-medium">Authorized Signatory</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
