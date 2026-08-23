import { useState, useMemo } from 'react';
import { Search, Save, FileText, CheckCircle2 } from 'lucide-react';

export default function Results() {
  const subjects = ['English', 'Mathematics', 'Science', 'Social Science', 'Hindi', 'Computer'];
  const [marks, setMarks] = useState({
    'English': 84,
    'Mathematics': 91,
    'Science': 88,
    'Social Science': 82,
    'Hindi': 79,
    'Computer': 95
  });
  const [showReportCard, setShowReportCard] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleMarkChange = (subject, value) => {
    setMarks(prev => ({
      ...prev,
      [subject]: value === '' ? '' : Number(value)
    }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const totals = useMemo(() => {
    const totalMarks = Object.values(marks).reduce((a, b) => a + (Number(b) || 0), 0);
    const maxMarks = subjects.length * 100;
    const percentage = ((totalMarks / maxMarks) * 100).toFixed(1);
    
    let grade = 'F';
    if (percentage >= 90) grade = 'A+';
    else if (percentage >= 80) grade = 'A';
    else if (percentage >= 70) grade = 'B';
    else if (percentage >= 60) grade = 'C';
    else if (percentage >= 50) grade = 'D';

    return { totalMarks, maxMarks, percentage, grade };
  }, [marks, subjects]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marks Entry</h1>
          <p className="mt-1 text-sm text-gray-500">Record marks and generate report cards.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
          <select className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border py-2 pl-3">
            <option>Class X</option>
            <option>Class IX</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
          <select className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border py-2 pl-3">
            <option>A</option>
            <option>B</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Examination</label>
          <select className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border py-2 pl-3">
            <option>Half Yearly Examination</option>
            <option>Annual Examination</option>
          </select>
        </div>
        <div className="relative flex items-end">
          <div className="absolute inset-y-0 left-0 pl-3 pb-2.5 flex items-end pointer-events-none">
            <Search className="h-4 w-4 text-gray-400 mb-0.5" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="Search Student..."
            defaultValue="Rahul Sharma"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white shadow-sm rounded-lg border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Rahul Sharma</h3>
                <p className="text-sm text-gray-500">Class X-A | Roll No: 15</p>
              </div>
              <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">Active</span>
            </div>
            
            <div className="p-6">
              {saved && (
                <div className="mb-4 bg-green-50 border border-green-200 text-green-700 p-3 rounded-md flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <p className="text-sm font-medium">Marks saved successfully!</p>
                </div>
              )}
              
              <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">Subject</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-32 whitespace-nowrap">Max Marks</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-32 whitespace-nowrap">Marks Obtained</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {subjects.map((subject) => (
                    <tr key={subject}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap">{subject}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">100</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="number"
                          max="100"
                          min="0"
                          value={marks[subject] || ''}
                          onChange={(e) => handleMarkChange(subject, e.target.value)}
                          className="block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm text-center font-semibold"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button 
                  onClick={handleSave}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Draft
                </button>
                <button 
                  onClick={() => {
                    handleSave();
                    setShowReportCard(true);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Report Card
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-1">
          <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-6 sticky top-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between pb-3 border-b border-gray-100">
                <span className="text-gray-500">Total Marks</span>
                <span className="font-semibold text-gray-900">{totals.totalMarks} / {totals.maxMarks}</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-gray-100">
                <span className="text-gray-500">Percentage</span>
                <span className="font-bold text-primary-600 text-lg">{totals.percentage}%</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-gray-100">
                <span className="text-gray-500">Grade</span>
                <span className="font-bold text-gray-900 text-lg">{totals.grade}</span>
              </div>
              <div className="flex justify-between pb-3">
                <span className="text-gray-500">Class Rank</span>
                <span className="font-semibold text-gray-900">4th</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showReportCard && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowReportCard(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full border-t-8 border-primary-600">
              <div className="bg-white px-8 pt-8 pb-8">
                <div className="text-center border-b border-gray-200 pb-6 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wider">SchoolERP Academy</h2>
                  <p className="text-gray-500 text-sm mt-1">123 Education Hub, Knowledge City, 10001</p>
                  <h3 className="text-xl font-bold text-primary-700 mt-4 uppercase">Academic Report Card</h3>
                  <p className="font-medium text-gray-700">Half Yearly Examination 2026-27</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div><span className="text-gray-500">Student Name:</span> <span className="font-bold text-gray-900">Rahul Sharma</span></div>
                  <div><span className="text-gray-500">Admission No:</span> <span className="font-bold text-gray-900">ADM-2026-001</span></div>
                  <div><span className="text-gray-500">Class & Sec:</span> <span className="font-bold text-gray-900">X - A</span></div>
                  <div><span className="text-gray-500">Roll No:</span> <span className="font-bold text-gray-900">15</span></div>
                </div>

                <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-200 mb-6">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase whitespace-nowrap">Scholastic Subjects</th>
                      <th className="px-4 py-2 text-center text-xs font-bold text-gray-700 uppercase whitespace-nowrap">Max Marks</th>
                      <th className="px-4 py-2 text-center text-xs font-bold text-gray-700 uppercase whitespace-nowrap">Marks Obtained</th>
                      <th className="px-4 py-2 text-center text-xs font-bold text-gray-700 uppercase whitespace-nowrap">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {subjects.map((subject) => {
                      const m = marks[subject] || 0;
                      let g = 'F';
                      if(m>=90) g='A1'; else if(m>=80) g='A2'; else if(m>=70) g='B1'; else if(m>=60) g='B2'; else if(m>=50) g='C1';
                      return (
                        <tr key={subject}>
                          <td className="px-4 py-2 text-sm font-medium text-gray-900 whitespace-nowrap">{subject}</td>
                          <td className="px-4 py-2 text-sm text-gray-500 text-center whitespace-nowrap">100</td>
                          <td className="px-4 py-2 text-sm font-bold text-gray-900 text-center whitespace-nowrap">{m}</td>
                          <td className="px-4 py-2 text-sm font-bold text-primary-600 text-center whitespace-nowrap">{g}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot className="bg-gray-50 border-t border-gray-200 font-bold">
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right uppercase whitespace-nowrap">Grand Total</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-center whitespace-nowrap">{totals.maxMarks}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-center whitespace-nowrap">{totals.totalMarks}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-center whitespace-nowrap"></td>
                    </tr>
                  </tfoot>
                </table>
                </div>

                <div className="flex justify-between items-center border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 uppercase">Percentage</p>
                    <p className="text-xl font-bold text-gray-900">{totals.percentage}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 uppercase">Final Grade</p>
                    <p className="text-xl font-bold text-primary-600">{totals.grade}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 uppercase">Result</p>
                    <p className="text-xl font-bold text-green-600">PASS</p>
                  </div>
                </div>

                <div className="mt-12 flex justify-between px-8 text-sm font-medium text-gray-700">
                  <div className="border-t-2 border-gray-400 pt-2 px-4">Class Teacher</div>
                  <div className="border-t-2 border-gray-400 pt-2 px-4">Principal</div>
                  <div className="border-t-2 border-gray-400 pt-2 px-4">Parent/Guardian</div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-lg border-t border-gray-200">
                <button type="button" onClick={() => setShowReportCard(false)} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                  Download PDF
                </button>
                <button type="button" onClick={() => setShowReportCard(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
