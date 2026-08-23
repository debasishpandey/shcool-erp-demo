import { useState } from 'react';
import { Send, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function Communication() {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Communication</h1>
        <p className="mt-1 text-sm text-gray-500">Send messages and notifications to parents and staff.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Messages Sent', value: '4,285', color: 'text-gray-900' },
          { label: 'Delivered', value: '4,192', color: 'text-green-600' },
          { label: 'Failed', value: '93', color: 'text-red-600' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 text-center">
            <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
          <MessageSquare className="w-5 h-5 text-primary-600" />
          <h3 className="text-lg font-medium leading-6 text-gray-900">Compose Message</h3>
        </div>
        
        <form onSubmit={handleSend} className="p-6 space-y-6">
          {showSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5" />
              <p className="font-medium">Message queued for delivery successfully!</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Audience Type</label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                <option>Parents</option>
                <option>Teachers</option>
                <option>All Staff</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Target Class (If applicable)</label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                <option>All Classes</option>
                <option>Class X</option>
                <option>Class IX</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message Content (160 chars per SMS)</label>
            <textarea 
              rows="4" 
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Dear Parent, this is to inform you..."
            ></textarea>
            <p className="mt-2 text-xs text-gray-500 text-right">0 / 160 characters</p>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button type="submit" className="inline-flex items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none">
              <Send className="mr-2 h-4 w-4" />
              Send Notification (In-App)
            </button>
            <button type="submit" className="inline-flex items-center px-6 py-2 border border-primary-600 rounded-md shadow-sm text-sm font-medium text-primary-700 bg-white hover:bg-primary-50 focus:outline-none">
              <MessageSquare className="mr-2 h-4 w-4" />
              Send SMS
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
