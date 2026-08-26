import { useState } from 'react';
import { useMockData } from '../context/MockDataContext';
import { Plus, Search, Filter, BookOpen, CheckCircle2, Clock } from 'lucide-react';

export default function Homework() {
  const { data, addHomework } = useMockData();
  const { homework } = data;
  
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    subject: 'Mathematics',
    class: 'Class X',
    title: '',
    dueDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addHomework(formData);
    setShowModal(false);
    setShowSuccess('Homework assigned successfully! It will now appear in the Parent Portal.');
    setTimeout(() => setShowSuccess(''), 3000);
    setFormData({ subject: 'Mathematics', class: 'Class X', title: '', dueDate: '' });
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Homework & Assignments</h1>
          <p className="mt-1 text-sm text-gray-500">Manage and assign homework to classes.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-3">
          <button 
            onClick={() => setShowModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Assign Homework
          </button>
        </div>
      </div>

      {showSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5" />
          <p className="font-medium">{showSuccess}</p>
        </div>
      )}

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="Search assignments..."
          />
        </div>
        <div className="flex gap-2">
          <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md border">
            <option>All Classes</option>
            <option>Class X</option>
            <option>Class IX</option>
            <option>Class VIII</option>
          </select>
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <Filter className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {homework.map((hw) => (
          <div key={hw.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{hw.subject}</h3>
                  <p className="text-sm text-gray-500">{hw.class}</p>
                </div>
              </div>
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
                {hw.assignedDate}
              </span>
            </div>
            
            <div className="flex-1">
              <p className="text-gray-800 font-medium mb-4">{hw.title}</p>
              
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <Clock size={16} /> Due: <span className="font-medium text-gray-700">{hw.dueDate}</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-100">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Submissions</span>
                <span className="font-medium">{hw.submitted} / {hw.assigned}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${(hw.submitted / hw.assigned) * 100}%` }}
                ></div>
              </div>
              <div className="mt-3 flex justify-between text-xs font-medium">
                <span className="text-green-600">{hw.submitted} Submitted</span>
                <span className="text-amber-600">{hw.pending} Pending</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowModal(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Assign New Homework</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Class</label>
                      <select value={formData.class} onChange={e => setFormData({...formData, class: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                        <option>Class X</option>
                        <option>Class IX</option>
                        <option>Class VIII</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Subject</label>
                      <select value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                        <option>Mathematics</option>
                        <option>Science</option>
                        <option>English</option>
                        <option>Social Science</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Topic / Title</label>
                      <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="e.g. Chapter 5 Exercises" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Due Date</label>
                      <input required type="date" value={formData.dueDate} onChange={e => setFormData({...formData, dueDate: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 sm:ml-3 sm:w-auto sm:text-sm">
                    Assign
                  </button>
                  <button type="button" onClick={() => setShowModal(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
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
