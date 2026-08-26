import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMockData } from '../context/MockDataContext';
import { ArrowLeft, CheckCircle2, Printer, Eye } from 'lucide-react';

export default function RecordPayment() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data } = useMockData();
  const { students } = data;

  // Extract unique classes
  const classes = Array.from(new Set(students.map(s => s.class))).sort((a, b) => {
    const order = { 'I': 1, 'III': 3, 'V': 5, 'VIII': 8, 'IX': 9, 'X': 10, 'XI': 11, 'XII': 12 };
    return (order[a] || 0) - (order[b] || 0);
  });

  const [selectedClass, setSelectedClass] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [feeType, setFeeType] = useState('Tuition Fee');
  const [paymentMode, setPaymentMode] = useState('UPI');
  const [paidBy, setPaidBy] = useState('Parent');
  const [otherName, setOtherName] = useState('');
  const [remarks, setRemarks] = useState('');
  
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  // Auto-select if navigated from somewhere else with a studentId
  useEffect(() => {
    const sId = searchParams.get('studentId');
    if (sId) {
      const student = students.find(s => s.id.toString() === sId);
      if (student) {
        setSelectedClass(student.class);
        setSelectedStudentId(student.id.toString());
      }
    }
  }, [searchParams, students]);

  const selectedStudent = students.find(s => s.id.toString() === selectedStudentId);
  const filteredStudents = students.filter(s => s.class === selectedClass);

  // Auto-populate amount
  useEffect(() => {
    if (selectedStudent && !isSuccess) {
      setAmountPaid(selectedStudent.pendingFee.toString());
      setError('');
    } else if (!selectedStudent) {
      setAmountPaid('');
    }
  }, [selectedStudent, isSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedStudent) {
      setError('Please select a student.');
      return;
    }
    const amt = parseInt(amountPaid);
    if (isNaN(amt) || amt <= 0) {
      setError('Please enter a valid amount greater than 0.');
      return;
    }
    if (amt > selectedStudent.pendingFee) {
      setError(`Amount cannot exceed current due of ₹${selectedStudent.pendingFee.toLocaleString()}.`);
      return;
    }

    setError('');
    
    // Determine payer info
    let payerInfo = '';
    if (paidBy === 'Parent') {
      payerInfo = `${selectedStudent.parent} (Father)`;
    } else if (paidBy === 'Student') {
      payerInfo = 'Paid by student';
    } else {
      payerInfo = otherName || 'Other';
    }

    // Mock receipt data (NO ACTUAL SAVING)
    const mockReceipt = {
      receiptNo: `REC-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      date: '26 Aug 2026',
      student: selectedStudent.name,
      admissionNo: selectedStudent.admissionNo,
      class: `${selectedStudent.class}-${selectedStudent.section}`,
      feeType,
      method: paymentMode,
      paidBy: payerInfo,
      amount: amt,
      previousDue: selectedStudent.pendingFee,
      remainingDue: selectedStudent.pendingFee - amt,
      remarks
    };

    setReceiptData(mockReceipt);
    setIsSuccess(true);
  };

  const handlePrintReceipt = () => {
    setShowReceiptModal(true);
    setIsPrinting(true);
  };

  useEffect(() => {
    if (isPrinting && showReceiptModal && receiptData) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.print();
          setIsPrinting(false);
        });
      });
    }
  }, [isPrinting, showReceiptModal, receiptData]);

  const parentName = selectedStudent ? selectedStudent.parent : '';
  const parentPhone = selectedStudent ? selectedStudent.phone : '';

  return (
    <>
      <div className="max-w-7xl mx-auto space-y-6 no-print">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Record Fee Payment</h1>
            <p className="mt-1 text-sm text-gray-500">Record a student's school fee payment</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button 
              onClick={() => navigate('/accounts')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Accounts
            </button>
          </div>
        </div>

        {isSuccess && receiptData ? (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 sm:p-10 max-w-3xl mx-auto text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Recorded Successfully</h2>
            <p className="text-gray-500 mb-8">This is a mock workflow demo. No data was actually persisted.</p>
            
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-sm text-left mb-8 space-y-3">
              <div className="flex justify-between border-b border-gray-100 pb-3">
                <span className="text-gray-500 font-medium">Receipt No:</span>
                <span className="font-bold text-gray-900">{receiptData.receiptNo}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-3">
                <span className="text-gray-500 font-medium">Student:</span>
                <span className="font-semibold text-gray-900">{receiptData.student}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-3">
                <span className="text-gray-500 font-medium">Class:</span>
                <span className="font-semibold text-gray-900">{receiptData.class}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-3">
                <span className="text-gray-500 font-medium">Amount Paid:</span>
                <span className="font-bold text-green-600 text-base">₹{receiptData.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-3">
                <span className="text-gray-500 font-medium">Previous Due:</span>
                <span className="font-medium text-gray-900">₹{receiptData.previousDue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-3">
                <span className="text-gray-500 font-medium">Remaining Due:</span>
                <span className="font-bold text-red-600">₹{receiptData.remainingDue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-3">
                <span className="text-gray-500 font-medium">Payment Mode:</span>
                <span className="font-medium text-gray-900">{receiptData.method}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-gray-500 font-medium">Paid By:</span>
                <span className="font-medium text-gray-900">{receiptData.paidBy}</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setShowReceiptModal(true)}
                className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                <Eye className="mr-2 h-5 w-5" /> View Receipt
              </button>
              <button 
                onClick={handlePrintReceipt}
                className="inline-flex justify-center items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none"
              >
                <Printer className="mr-2 h-5 w-5" /> Print Receipt
              </button>
              <button 
                onClick={() => navigate('/accounts')}
                className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                Back to Accounts
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <form onSubmit={handleSubmit}>
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900 flex items-center mb-4">
                      <span className="bg-primary-100 text-primary-700 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                      Student Details
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Class <span className="text-red-500">*</span></label>
                        <select 
                          required
                          value={selectedClass}
                          onChange={(e) => {
                            setSelectedClass(e.target.value);
                            setSelectedStudentId('');
                          }}
                          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        >
                          <option value="">Select a class...</option>
                          {classes.map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Student <span className="text-red-500">*</span></label>
                        <select 
                          required
                          value={selectedStudentId}
                          onChange={(e) => setSelectedStudentId(e.target.value)}
                          disabled={!selectedClass}
                          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm disabled:bg-gray-100"
                        >
                          <option value="">{selectedClass ? 'Select a student...' : 'Select a class first'}</option>
                          {filteredStudents.map(s => (
                            <option key={s.id} value={s.id}>
                              {s.name} — Roll {s.rollNo} — {s.admissionNo}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {selectedStudent && (
                      <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-5">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{selectedStudent.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">Class: <span className="font-medium">{selectedStudent.class}-{selectedStudent.section}</span> | Roll: <span className="font-medium">{selectedStudent.rollNo}</span> | ADM: <span className="font-medium">{selectedStudent.admissionNo}</span></p>
                          </div>
                          <div className="mt-4 sm:mt-0 text-left sm:text-right">
                            <p className="text-sm text-gray-500">Total Fee: ₹{selectedStudent.totalFee.toLocaleString()}</p>
                            <p className="text-sm text-green-600 font-medium">Paid: ₹{selectedStudent.paidFee.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-blue-200 flex justify-between items-center">
                          <span className="text-sm font-bold text-gray-900">Current Due:</span>
                          <span className="text-2xl font-bold text-red-600">₹{selectedStudent.pendingFee.toLocaleString()}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900 flex items-center mb-4">
                      <span className="bg-primary-100 text-primary-700 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                      Payment Details
                    </h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Amount Paid (₹) <span className="text-red-500">*</span></label>
                        <input 
                          required
                          type="number" 
                          value={amountPaid}
                          onChange={(e) => setAmountPaid(e.target.value)}
                          disabled={!selectedStudent || selectedStudent.pendingFee === 0}
                          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm disabled:bg-gray-100 font-medium text-gray-900" 
                          placeholder="0" 
                        />
                        {error && (
                          <p className="mt-1 text-sm text-red-600 font-medium">{error}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Fee Type</label>
                        <select 
                          value={feeType}
                          onChange={(e) => setFeeType(e.target.value)}
                          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        >
                          <option>Tuition Fee</option>
                          <option>Transport Fee</option>
                          <option>Exam Fee</option>
                          <option>Activity Fee</option>
                          <option>Annual Fee</option>
                          <option>Library Fee</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Payment Mode</label>
                        <select 
                          value={paymentMode}
                          onChange={(e) => setPaymentMode(e.target.value)}
                          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        >
                          <option>Cash</option>
                          <option>UPI</option>
                          <option>Card</option>
                          <option>Bank Transfer</option>
                          <option>Cheque</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Payment Made By</label>
                        <select 
                          value={paidBy}
                          onChange={(e) => setPaidBy(e.target.value)}
                          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        >
                          <option value="Parent">Parent</option>
                          <option value="Student">Student</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    {paidBy === 'Parent' && selectedStudent && (
                      <div className="mt-4 bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                        <span className="text-gray-500">Parent Name:</span> <span className="font-medium text-gray-900">{parentName}</span>
                        <span className="mx-2 text-gray-300">|</span>
                        <span className="text-gray-500">Relation:</span> <span className="font-medium text-gray-900">Father</span>
                        <span className="mx-2 text-gray-300">|</span>
                        <span className="text-gray-500">Phone:</span> <span className="font-medium text-gray-900">{parentPhone}</span>
                      </div>
                    )}
                    
                    {paidBy === 'Student' && selectedStudent && (
                      <div className="mt-4 bg-gray-50 p-3 rounded border border-gray-200 text-sm text-gray-600">
                        Paid directly by student.
                      </div>
                    )}

                    {paidBy === 'Other' && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Payer Name</label>
                        <input 
                          type="text" 
                          value={otherName}
                          onChange={(e) => setOtherName(e.target.value)}
                          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          placeholder="Name of person paying"
                        />
                      </div>
                    )}

                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Reference / Remarks (Optional)</label>
                      <input 
                        type="text" 
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        placeholder="e.g. UPI Ref: 3245190281 or Cheque No"
                      />
                    </div>
                    
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
                      <input 
                        type="text" 
                        disabled
                        value="26 Aug 2026"
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50 text-gray-500 sm:text-sm cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="p-6 bg-gray-50 rounded-b-lg flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Please verify details in the summary before saving.</p>
                    </div>
                    <button 
                      type="submit" 
                      disabled={!selectedStudent || selectedStudent.pendingFee === 0}
                      className="inline-flex justify-center items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none disabled:opacity-50"
                    >
                      Save Payment
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-6">
                <div className="p-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Payment Summary</h3>
                </div>
                <div className="p-5 space-y-4">
                  {selectedStudent ? (
                    <>
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-sm text-gray-500">Student</span>
                        <span className="text-sm font-bold text-gray-900 text-right">{selectedStudent.name}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-sm text-gray-500">Class</span>
                        <span className="text-sm font-medium text-gray-900 text-right">{selectedStudent.class}-{selectedStudent.section}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-sm text-gray-500">Current Due</span>
                        <span className="text-sm font-medium text-red-600 text-right">₹{selectedStudent.pendingFee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-sm font-bold text-gray-900">Amount Paid</span>
                        <span className="text-sm font-bold text-green-600 text-right">₹{parseInt(amountPaid || 0).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-sm text-gray-500">Remaining Due</span>
                        <span className="text-sm font-medium text-gray-900 text-right">₹{Math.max(0, selectedStudent.pendingFee - parseInt(amountPaid || 0)).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-sm text-gray-500">Fee Type</span>
                        <span className="text-sm font-medium text-gray-900 text-right">{feeType}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-sm text-gray-500">Payment Mode</span>
                        <span className="text-sm font-medium text-gray-900 text-right">{paymentMode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Paid By</span>
                        <span className="text-sm font-medium text-gray-900 text-right">
                          {paidBy === 'Parent' ? `${parentName} (Father)` : paidBy === 'Student' ? 'Student' : (otherName || 'Other')}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-10 text-gray-400 text-sm">
                      Select a student to see the payment summary.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showReceiptModal && receiptData && (
        <>
          <div className="fixed inset-0 z-50 overflow-y-auto no-print" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowReceiptModal(false)}></div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
                
                <div className="bg-white px-6 pt-5 pb-6">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest">Sunrise Public School</h2>
                    <p className="text-sm text-gray-500 mt-1">Fee Receipt</p>
                  </div>
                  
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between pb-3 border-b border-gray-100">
                      <span className="text-gray-500">Receipt No:</span>
                      <span className="font-semibold text-gray-900">{receiptData.receiptNo}</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-gray-100">
                      <span className="text-gray-500">Date:</span>
                      <span className="font-medium text-gray-900">{receiptData.date}</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-gray-100">
                      <span className="text-gray-500">Student:</span>
                      <span className="font-medium text-gray-900">{receiptData.student}</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-gray-100">
                      <span className="text-gray-500">Admission No:</span>
                      <span className="font-medium text-gray-900">{receiptData.admissionNo}</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-gray-100">
                      <span className="text-gray-500">Class:</span>
                      <span className="font-medium text-gray-900">{receiptData.class}</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-gray-100">
                      <span className="text-gray-500">Fee Type:</span>
                      <span className="font-medium text-gray-900">{receiptData.feeType}</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-gray-100">
                      <span className="text-gray-500">Payment Mode:</span>
                      <span className="font-medium text-gray-900">{receiptData.method}</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-gray-100">
                      <span className="text-gray-500">Paid By:</span>
                      <span className="font-medium text-gray-900">{receiptData.paidBy}</span>
                    </div>
                    {receiptData.remarks && (
                      <div className="flex justify-between pb-3 border-b border-gray-100">
                        <span className="text-gray-500">Reference:</span>
                        <span className="font-medium text-gray-900 italic">{receiptData.remarks}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2 pb-2">
                      <span className="text-gray-500 font-medium">Previous Due:</span>
                      <span className="font-medium text-gray-900">₹{receiptData.previousDue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200">
                      <span className="text-base font-bold text-gray-900">Amount Paid:</span>
                      <span className="text-base font-bold text-green-600">₹{receiptData.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-100 mt-2">
                      <span className="text-gray-500 font-medium">Balance Due:</span>
                      <span className="font-medium text-red-600">₹{receiptData.remainingDue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-200">
                  <button type="button" onClick={handlePrintReceipt} className="w-full inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                    <Printer className="w-4 h-4 mr-2" /> Print Receipt
                  </button>
                  <button type="button" onClick={() => setShowReceiptModal(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden print-area p-8 max-w-2xl mx-auto">
            <div className="text-center mb-8 border-b-2 border-gray-900 pb-6">
              <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-widest">Sunrise Public School</h1>
              <p className="text-gray-600 mt-2">123 Education Hub, Knowledge City - 110001</p>
              <h2 className="text-xl font-semibold text-gray-800 mt-6 border-2 border-gray-800 inline-block px-4 py-1">FEE RECEIPT</h2>
            </div>
            
            <div className="flex justify-between mb-8 text-lg">
              <div><span className="font-semibold">Receipt No:</span> {receiptData.receiptNo}</div>
              <div><span className="font-semibold">Date:</span> {receiptData.date}</div>
            </div>

            <div className="border border-gray-400 rounded-lg p-6 space-y-6 text-lg">
              <div className="grid grid-cols-3">
                <div className="text-gray-600 font-medium">Student Name:</div>
                <div className="col-span-2 font-bold text-xl">{receiptData.student}</div>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-gray-600 font-medium">Admission No:</div>
                <div className="col-span-2 font-medium">{receiptData.admissionNo}</div>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-gray-600 font-medium">Class & Section:</div>
                <div className="col-span-2 font-medium">{receiptData.class}</div>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-gray-600 font-medium">Payment For:</div>
                <div className="col-span-2 font-medium">{receiptData.feeType}</div>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-gray-600 font-medium">Payment Mode:</div>
                <div className="col-span-2 font-medium">{receiptData.method}</div>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-gray-600 font-medium">Paid By:</div>
                <div className="col-span-2 font-medium">{receiptData.paidBy}</div>
              </div>
              {receiptData.remarks && (
                <div className="grid grid-cols-3">
                  <div className="text-gray-600 font-medium">Reference:</div>
                  <div className="col-span-2 font-medium italic">{receiptData.remarks}</div>
                </div>
              )}
              <div className="grid grid-cols-3 pt-6 border-t border-gray-300">
                <div className="text-gray-600 font-medium">Previous Due:</div>
                <div className="col-span-2 font-medium">₹ {receiptData.previousDue.toLocaleString()}</div>
              </div>
              <div className="grid grid-cols-3 items-center">
                <div className="text-gray-600 font-bold text-xl">Amount Paid:</div>
                <div className="col-span-2 font-bold text-2xl text-green-700">₹ {receiptData.amount.toLocaleString()}/-</div>
              </div>
              <div className="grid grid-cols-3 pb-2 border-b border-gray-300">
                <div className="text-gray-600 font-medium">Balance Due:</div>
                <div className="col-span-2 font-medium text-red-600">₹ {receiptData.remainingDue.toLocaleString()}</div>
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
    </>
  );
}
