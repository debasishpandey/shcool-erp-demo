import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle2, AlertCircle, IndianRupee, FileText } from 'lucide-react';
import { childProfile, childPerformance } from '../../data/parentMockData';

export default function ParentFees() {
  const navigate = useNavigate();
  const [isPaying, setIsPaying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Read fees from mock data
  const fees = childPerformance.fees;
  // If payment succeeded in our mock flow, override pending to 0
  const pendingAmount = isSuccess ? 0 : fees.pending;
  const paidAmount = isSuccess ? fees.total : fees.paid;

  const handlePay = () => {
    // Simulate payment delay
    setTimeout(() => {
      setIsPaying(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-20 relative">
      <div className="bg-white px-4 py-4 shadow-sm z-10 sticky top-0 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h1 className="font-black text-gray-900 text-lg">Fees</h1>
          <p className="text-xs font-bold text-primary-700 uppercase tracking-wider">{childProfile.name} • {childProfile.class}</p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        
        {/* Fee Summary */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
            <div className={`p-6 text-center ${pendingAmount > 0 ? 'bg-orange-50' : 'bg-green-50'}`}>
              <h2 className="text-xs font-black uppercase tracking-wider mb-2 text-gray-500">
                {pendingAmount > 0 ? 'Total Due Amount' : 'All Fees Cleared'}
              </h2>
              <div className="flex items-center justify-center gap-1 text-4xl font-black text-gray-900 mb-2">
                <IndianRupee size={28} /> {pendingAmount.toLocaleString('en-IN')}
              </div>
              {pendingAmount > 0 ? (
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-700 bg-orange-100/50 px-3 py-1 rounded-full">
                  <AlertCircle size={14} /> Due Date: {fees.dueDate}
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-green-700 bg-green-100/50 px-3 py-1 rounded-full">
                  <CheckCircle2 size={14} /> No pending dues
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 divide-x divide-gray-100 border-t border-gray-100 bg-white">
              <div className="p-4 text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Total Fee</p>
                <p className="font-black text-gray-900">₹{fees.total.toLocaleString('en-IN')}</p>
              </div>
              <div className="p-4 text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Paid</p>
                <p className="font-black text-green-600">₹{paidAmount.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Action Button / Success State */}
        {pendingAmount > 0 && !isPaying && !isSuccess && (
          <button 
            onClick={() => setIsPaying(true)}
            className="w-full bg-gray-900 text-white font-black text-lg py-4 rounded-2xl shadow-sm hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            Pay ₹{pendingAmount.toLocaleString('en-IN')} Now
          </button>
        )}

        {isSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mb-3">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="font-black text-gray-900 text-lg mb-1">Payment Successful</h3>
            <p className="text-sm font-semibold text-gray-600 mb-4">Receipt No: REC-2026-00482</p>
            <button 
              onClick={() => navigate('/parent/receipt')}
              className="w-full bg-white border border-gray-200 text-gray-800 py-3 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              <FileText size={16} /> View Receipt
            </button>
          </div>
        )}

        {/* Breakdown */}
        <section>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Payment Breakdown</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
            {fees.breakdown.map((item) => {
              const isItemPaid = isSuccess || item.status === 'Paid';
              return (
                <div key={item.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{item.name}</p>
                    <p className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${isItemPaid ? 'text-green-600' : 'text-orange-600'}`}>
                      {isItemPaid ? 'Paid' : 'Pending'}
                    </p>
                  </div>
                  <div className="font-black text-gray-700">
                    ₹{item.amount.toLocaleString('en-IN')}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>

      {/* Payment Sheet Overlay */}
      {isPaying && (
        <div 
          className="fixed inset-0 bg-gray-900/60 z-50 flex items-end justify-center"
          style={{ paddingBottom: 'var(--app-bottom-space)' }}
        >
          <div className="bg-white w-full max-w-[480px] rounded-t-3xl pt-2 shadow-2xl flex flex-col max-h-[85vh]">
            <div className="flex justify-center mb-4 shrink-0">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
            </div>
            
            <div className="px-6 py-2 mb-2 shrink-0 border-b border-gray-100 pb-4">
              <h2 className="font-black text-gray-900 text-xl mb-1">Pay School Fee</h2>
              <p className="text-sm font-bold text-gray-500">Pending Amount: ₹{pendingAmount.toLocaleString('en-IN')}</p>
            </div>

            <div className="px-6 py-4 overflow-y-auto flex-1 space-y-3">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Select Payment Method</p>
              
              <div className="border-2 border-primary-600 bg-primary-50 p-4 rounded-xl flex items-center justify-between cursor-pointer">
                <span className="font-bold text-primary-900">UPI / QR Code</span>
                <div className="w-5 h-5 rounded-full border-4 border-primary-600"></div>
              </div>
              <div className="border border-gray-200 p-4 rounded-xl flex items-center justify-between cursor-pointer text-gray-400">
                <span className="font-bold">Debit / Credit Card</span>
                <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
              </div>
              <div className="border border-gray-200 p-4 rounded-xl flex items-center justify-between cursor-pointer text-gray-400">
                <span className="font-bold">Net Banking</span>
                <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 flex gap-3 shrink-0 bg-white">
              <button 
                onClick={() => setIsPaying(false)}
                className="flex-1 py-4 font-black text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200"
              >
                Cancel
              </button>
              <button 
                onClick={handlePay}
                className="flex-[2] py-4 font-black text-white bg-primary-600 rounded-xl hover:bg-primary-700 shadow-sm flex items-center justify-center gap-2"
              >
                Pay ₹{pendingAmount.toLocaleString('en-IN')}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
