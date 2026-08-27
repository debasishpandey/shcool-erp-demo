import React, { useState } from 'react';
import { Search, Filter, Plus, Bell, Megaphone, Users, Calendar, CheckCircle2 } from 'lucide-react';
import { notices as mockNotices } from '../data/mockData';

export default function Notices() {
  const [notices, setNotices] = useState(mockNotices);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreateNotice = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newNotice = {
      id: notices.length + 1,
      title: formData.get('title'),
      date: '26 Aug 2026',
      author: 'Principal',
      audience: formData.get('audience'),
      category: formData.get('category'),
      content: formData.get('content'),
    };
    setNotices([newNotice, ...notices]);
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">School Notices</h1>
          <p className="mt-1 text-md text-gray-500">Publish and manage announcements across the school.</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 shadow-sm"
          >
            <Megaphone className="w-4 h-4 mr-2" />
            Create Notice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Notice List */}
        <div className="lg:col-span-2 space-y-4">
          {notices.map(notice => (
            <div key={notice.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      notice.category === 'Holiday' ? 'bg-green-100 text-green-800' :
                      notice.category === 'Event' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {notice.category}
                    </span>
                    <span className="text-sm font-medium text-gray-500 flex items-center"><Calendar className="w-3 h-3 mr-1" /> {notice.date}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{notice.title}</h2>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-700 whitespace-pre-wrap">{notice.content}</p>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
                  <span className="flex items-center gap-1 font-medium"><Users className="w-4 h-4" /> Audience: <span className="text-gray-900">{notice.audience || 'All School'}</span></span>
                  <span>By: <span className="font-medium text-gray-900">{notice.author}</span></span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-fit sticky top-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Notice Analytics</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <p className="text-sm font-medium text-gray-500">Published this month</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{notices.length}</p>
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Reach by Audience</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center"><span className="text-gray-600">Parents</span><span className="font-bold">85%</span></div>
                <div className="flex justify-between items-center"><span className="text-gray-600">Students</span><span className="font-bold">92%</span></div>
                <div className="flex justify-between items-center"><span className="text-gray-600">Teachers</span><span className="font-bold">100%</span></div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Create Notice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowCreateModal(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
              <form onSubmit={handleCreateNotice}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg leading-6 font-bold text-gray-900 mb-4">Create New Notice</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Notice Title</label>
                      <input name="title" type="text" required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="E.g., Tomorrow is a holiday" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select name="category" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                          <option>Academic</option>
                          <option>Holiday</option>
                          <option>Event</option>
                          <option>Administrative</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Audience</label>
                        <select name="audience" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                          <option>All School</option>
                          <option>Teachers Only</option>
                          <option>Parents Only</option>
                          <option>Students Only</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Notice Content</label>
                      <textarea name="content" rows={5} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="Write the notice details here..."></textarea>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 flex flex-row-reverse">
                  <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                    Publish Notice
                  </button>
                  <button type="button" onClick={() => setShowCreateModal(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm">
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
