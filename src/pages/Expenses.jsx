import { useState } from 'react';
import { useMockData } from '../context/MockDataContext';
import { Plus, CheckCircle2, FileText, Search, CreditCard, Edit3 } from 'lucide-react';

export default function Expenses() {
  const { data, recordExpense } = useMockData();
  const { expenses } = data;

  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [expDate, setExpDate] = useState(new Date().toISOString().split('T')[0]);
  const [expCategory, setExpCategory] = useState('Stationery');
  const [expDescription, setExpDescription] = useState('');
  const [expVendor, setExpVendor] = useState('');
  const [expAmount, setExpAmount] = useState('');
  const [expMethod, setExpMethod] = useState('UPI');
  const [expRef, setExpRef] = useState('');

  const filteredExpenses = expenses.filter(e => 
    e.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (expAmount && expCategory) {
      recordExpense({
        date: expDate,
        category: expCategory,
        description: expDescription,
        vendor: expVendor,
        amount: parseInt(expAmount),
        method: expMethod,
        refNo: expRef,
        remarks: ""
      });
      setShowExpenseModal(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
      // Reset form
      setExpDescription('');
      setExpVendor('');
      setExpAmount('');
      setExpRef('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>
          <p className="mt-1 text-sm text-gray-500">Track and record school-related expenses</p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-3">
          <button 
            onClick={() => setShowExpenseModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Record Expense
          </button>
        </div>
      </div>

      {showSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5" />
          <p className="font-medium">Expense recorded successfully!</p>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500 mb-1">Total Expenses</p>
          <p className="text-2xl font-bold text-gray-900">₹6,85,000</p>
          <p className="text-xs text-gray-400 mt-1">This Year</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500 mb-1">This Month</p>
          <p className="text-2xl font-bold text-gray-900">₹1,12,500</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500 mb-1">Today's Expenses</p>
          <p className="text-2xl font-bold text-gray-900">₹8,400</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-amber-600 mb-1">Pending Reimbursements</p>
          <p className="text-2xl font-bold text-amber-600">₹14,000</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
          <h3 className="text-lg font-medium text-gray-900">Recent Expenses</h3>
          <div className="relative w-full sm:max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Search category, vendor, description..."
            />
          </div>
        </div>

        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category & Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Mode</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredExpenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded mb-1">
                      {expense.category}
                    </span>
                    <div className="text-sm font-medium text-gray-900">{expense.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{expense.vendor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                    ₹{expense.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center gap-1">
                      <CreditCard className="w-3 h-3 text-gray-400" /> {expense.method}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-gray-400 hover:text-primary-600" title="Edit Expense">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-primary-600" title="Print Voucher">
                        <FileText className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RECORD EXPENSE MODAL */}
      {showExpenseModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowExpenseModal(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 border-b pb-3 mb-4" id="modal-title">Record New Expense</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Expense Date</label>
                      <input 
                        type="date" 
                        required
                        value={expDate}
                        onChange={e => setExpDate(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      <select 
                        required
                        value={expCategory}
                        onChange={e => setExpCategory(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      >
                        <option>Electricity</option>
                        <option>Water</option>
                        <option>Internet</option>
                        <option>Stationery</option>
                        <option>Printing</option>
                        <option>Maintenance</option>
                        <option>Cleaning</option>
                        <option>Transport</option>
                        <option>Sports</option>
                        <option>Events</option>
                        <option>Classroom Supplies</option>
                        <option>Office Supplies</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <input 
                        type="text" 
                        required
                        value={expDescription}
                        onChange={e => setExpDescription(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" 
                        placeholder="e.g. August electricity bill, Whiteboard markers" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Vendor / Paid To</label>
                      <input 
                        type="text" 
                        required
                        value={expVendor}
                        onChange={e => setExpVendor(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" 
                        placeholder="Name of person or company" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Amount (₹)</label>
                      <input 
                        type="number" 
                        required
                        value={expAmount}
                        onChange={e => setExpAmount(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" 
                        placeholder="0.00" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Payment Mode</label>
                      <select 
                        required
                        value={expMethod}
                        onChange={e => setExpMethod(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      >
                        <option>Cash</option>
                        <option>UPI</option>
                        <option>Card</option>
                        <option>Bank Transfer</option>
                        <option>Cheque</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Reference / Bill No.</label>
                      <input 
                        type="text" 
                        value={expRef}
                        onChange={e => setExpRef(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" 
                        placeholder="Optional" 
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-200">
                  <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                    Save Expense
                  </button>
                  <button type="button" onClick={() => setShowExpenseModal(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
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
