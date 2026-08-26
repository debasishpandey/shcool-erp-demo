export const teacherProfile = {
  name: 'Priya Das',
  role: 'Mathematics Teacher',
  assignedClasses: ['VIII-A', 'IX-B'],
  classTeacherOf: 'VIII-A'
};

export const todaysClasses = [
  { id: 1, class: 'VIII-A', subject: 'Mathematics', time: '08:30 AM', studentCount: 42, attendanceMarked: false },
  { id: 2, class: 'IX-B', subject: 'Mathematics', time: '09:30 AM', studentCount: 38, attendanceMarked: false },
  { id: 3, class: 'VIII-A', subject: 'Mathematics', time: '11:00 AM', studentCount: 42, attendanceMarked: false } // Assuming extra class or different period
];

export const summaryStats = {
  attendanceCompleted: 2,
  attendanceTotal: 3,
  homeworkAssigned: 2,
  homeworkPending: 1,
  concernsOpen: 1
};

export const studentsVIII_A = [
  { rollNo: '01', name: 'Aarav Sharma', status: 'Present' },
  { rollNo: '02', name: 'Aditi Gupta', status: 'Present' },
  { rollNo: '03', name: 'Arjun Singh', status: 'Present' },
  { rollNo: '04', name: 'Diya Patel', status: 'Present' },
  { rollNo: '05', name: 'Ishaan Verma', status: 'Present' },
  { rollNo: '06', name: 'Kavya Mishra', status: 'Present' },
  { rollNo: '07', name: 'Krishna Rao', status: 'Present' },
  { rollNo: '08', name: 'Meera Reddy', status: 'Present' },
  { rollNo: '09', name: 'Neha Kumar', status: 'Present' },
  { rollNo: '10', name: 'Pranav Joshi', status: 'Present' },
  { rollNo: '11', name: 'Rohan Desai', status: 'Present' },
  { rollNo: '12', name: 'Sanya Nair', status: 'Present' },
  // Adding just a subset for demo purposes to avoid huge lists
  { rollNo: '13', name: 'Vikram Singh', status: 'Present' },
  { rollNo: '14', name: 'Riya Das', status: 'Present' },
  { rollNo: '15', name: 'Rahul Chawla', status: 'Present' }
];

export const classAttendanceSummary = {
  class: 'VIII-A',
  month: 'August 2026',
  percentage: 92,
  present: 38,
  absent: 4,
  late: 2,
  attentionNeeded: [
    { name: 'Aarav Sharma', percentage: 78 },
    { name: 'Riya Das', percentage: 81 },
    { name: 'Rahul Chawla', percentage: 83 }
  ]
};

export const homeworkStatus = [
  { id: 1, class: 'VIII-A', subject: 'Mathematics', date: '26 Aug', given: true, chapter: 'Chapter 4 — Algebra', completed: 34, total: 42 },
  { id: 2, class: 'IX-B', subject: 'Mathematics', date: '26 Aug', given: false },
  { id: 3, class: 'VIII-B', subject: 'Mathematics', date: '26 Aug', given: false }
];

export const studentsHomeworkVIII_A = [
  { rollNo: '01', name: 'Aarav Sharma', completed: true },
  { rollNo: '02', name: 'Aditi Gupta', completed: true },
  { rollNo: '03', name: 'Arjun Singh', completed: true },
  { rollNo: '04', name: 'Diya Patel', completed: true },
  { rollNo: '05', name: 'Ishaan Verma', completed: false }, // Pending
  { rollNo: '06', name: 'Kavya Mishra', completed: true },
  { rollNo: '07', name: 'Krishna Rao', completed: true },
  { rollNo: '08', name: 'Meera Reddy', completed: true },
  { rollNo: '09', name: 'Neha Kumar', completed: false }, // Pending
  { rollNo: '10', name: 'Pranav Joshi', completed: true },
  { rollNo: '11', name: 'Rohan Desai', completed: true },
  { rollNo: '12', name: 'Sanya Nair', completed: false }, // Pending
];

export const initialConcerns = [
  { id: 1, student: 'Aarav Sharma', type: 'Homework', message: 'Homework has not been submitted for the last 3 assignments.', status: 'Open', date: '26 Aug 2026', parentNotified: true },
  { id: 2, student: 'Ishaan Verma', type: 'Attendance', message: 'Frequently absent in the first period.', status: 'Resolved', date: '15 Aug 2026', parentNotified: true }
];
