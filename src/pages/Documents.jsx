import { useState } from 'react';
import { Search, Filter, FolderOpen, FileText, Upload, MoreVertical, Download } from 'lucide-react';

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState('');

  const documents = [
    { id: 1, name: "Student_Guidelines_2026.pdf", type: "PDF", size: "2.4 MB", date: "2026-08-10", category: "General", author: "Admin" },
    { id: 2, name: "Half_Yearly_Datesheet.xlsx", type: "Excel", size: "1.1 MB", date: "2026-08-15", category: "Academic", author: "Exam Dept" },
    { id: 3, name: "Fee_Structure_2026_27.pdf", type: "PDF", size: "850 KB", date: "2026-07-20", category: "Finance", author: "Accounts" },
    { id: 4, name: "Holiday_Calendar.pdf", type: "PDF", size: "1.5 MB", date: "2026-01-05", category: "General", author: "Admin" },
    { id: 5, name: "ClassX_Math_Syllabus.docx", type: "Word", size: "450 KB", date: "2026-04-10", category: "Academic", author: "Sunita Sharma" },
  ];

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Digital Records & Documents</h1>
          <p className="mt-1 text-sm text-gray-500">Centralized repository for all school documents and records.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-3">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700">
            <Upload className="mr-2 h-4 w-4" />
            Upload File
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {['General', 'Academic', 'Finance', 'Student Records'].map((folder, idx) => (
          <div key={idx} className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4 cursor-pointer hover:border-primary-300 transition-colors">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <FolderOpen size={24} />
            </div>
            <div>
              <p className="font-medium text-gray-900">{folder}</p>
              <p className="text-xs text-gray-500">12 Files</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <Filter className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded By</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FileText className={`h-5 w-5 mr-3 ${doc.type === 'PDF' ? 'text-red-500' : doc.type === 'Excel' ? 'text-green-500' : 'text-blue-500'}`} />
                    <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="px-2 py-1 bg-gray-100 rounded-md text-xs">{doc.category}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.author}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{doc.size}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-gray-400 hover:text-primary-600 mr-3"><Download className="w-4 h-4" /></button>
                  <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
