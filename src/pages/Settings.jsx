import { Building2, Save, Upload } from 'lucide-react';
import { useState } from 'react';

export default function Settings() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">Manage school profile and system preferences.</p>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
          <Building2 className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-medium leading-6 text-gray-900">School Profile</h3>
        </div>
        
        <form onSubmit={handleSave} className="p-6 space-y-6">
          <div className="flex items-center gap-6 mb-8">
            <div className="h-24 w-24 rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
              <span className="text-gray-400 text-sm font-medium">Logo</span>
            </div>
            <div>
              <button type="button" className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <Upload className="mr-2 h-4 w-4 text-gray-500" /> Upload Logo
              </button>
              <p className="mt-2 text-xs text-gray-500">JPG, GIF or PNG. Max size of 2MB.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">School Name</label>
              <input type="text" defaultValue="SchoolERP Academy" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" defaultValue="admin@schoolerp.com" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input type="text" defaultValue="+91 98765 43210" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea rows="3" defaultValue="123 Education Hub, Knowledge City, 10001" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Academic Year</label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                <option>2026-2027</option>
                <option>2025-2026</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Principal Name</label>
              <input type="text" defaultValue="Dr. A. K. Sharma" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <h4 className="text-base font-medium text-gray-900 mb-4">Preferences</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="email_notifications" type="checkbox" defaultChecked className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded" />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="email_notifications" className="font-medium text-gray-700">Email Notifications</label>
                  <p className="text-gray-500">Receive daily summary reports via email.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="sms_notifications" type="checkbox" defaultChecked className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded" />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="sms_notifications" className="font-medium text-gray-700">SMS Gateway</label>
                  <p className="text-gray-500">Enable automatic SMS for attendance and fee dues.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
            {saved ? (
              <span className="text-green-600 text-sm font-medium">Settings saved successfully.</span>
            ) : (
              <span></span>
            )}
            <button type="submit" className="inline-flex items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
