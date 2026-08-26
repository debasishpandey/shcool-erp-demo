import { ArrowLeft, Download, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { childProfile, childPerformance } from '../../data/parentMockData';

export default function ParentReceipt() {
  const navigate = useNavigate();
  const feeAmount = childPerformance.fees.pending || childPerformance.fees.total; // Use pending if exists, otherwise mock a total receipt

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 relative">
      <div className="bg-white px-4 py-4 shadow-sm z-10 sticky top-0 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600">
            <ArrowLeft size={24} />
          </button>
          <h1 className="font-black text-gray-900 text-lg">Fee Receipt</h1>
        </div>
        <button className="text-primary-600 p-2 rounded-full hover:bg-primary-50">
          <Download size={20} />
        </button>
      </div>

      <div className="p-4 sm:p-6 lg:p-8 flex-1 flex justify-center">
        {/* Printable Area Container */}
        <div className="w-full max-w-xl bg-white shadow-xl rounded-none sm:rounded-2xl border-t-8 border-t-green-500 relative overflow-hidden">
          
          <div className="p-6 sm:p-8">
            <div className="text-center mb-6">
              <h2 className="font-black text-2xl tracking-tight text-gray-900 mb-1">{childProfile.school}</h2>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Fee Receipt</p>
            </div>

            <div className="flex justify-center mb-8">
              <div className="bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-200 flex items-center gap-2 font-black text-sm uppercase tracking-wider">
                <CheckCircle2 size={18} /> Payment Successful
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Receipt No</span>
                <span className="font-black text-gray-900">REC-2026-00482</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Payment Date</span>
                <span className="font-black text-gray-900">26 Aug 2026</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Student</span>
                <span className="font-black text-gray-900">{childProfile.name}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Class</span>
                <span className="font-black text-gray-900">{childProfile.class}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Payment Method</span>
                <span className="font-black text-gray-900">UPI</span>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 flex justify-between items-center">
              <span className="text-sm font-black text-gray-600 uppercase tracking-wider">Total Paid</span>
              <span className="text-3xl font-black text-gray-900">₹{feeAmount.toLocaleString('en-IN')}</span>
            </div>

            <div className="mt-8 text-center">
              <p className="text-xs font-bold text-gray-400">This is a computer generated receipt and does not require a physical signature.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
