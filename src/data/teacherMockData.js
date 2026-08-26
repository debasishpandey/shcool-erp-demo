export const teacherProfile = {
  name: 'Priya Das',
  role: 'Mathematics Teacher',
  classTeacherOf: 'VIII-A'
};

export const todaysTeaching = [
  { id: 1, class: 'VIII-A', subject: 'Mathematics', time: '08:30', isClassTeacher: true },
  { id: 2, class: 'IX-B', subject: 'Mathematics', time: '09:30', isClassTeacher: false },
  { id: 3, class: 'X-A', subject: 'Mathematics', time: '11:00', isClassTeacher: false },
  { id: 4, class: 'VIII-B', subject: 'Science', time: '12:00', isClassTeacher: false }
];

export const teachingCombinations = [
  { class: 'VIII-A', subject: 'Mathematics' },
  { class: 'IX-B', subject: 'Mathematics' },
  { class: 'X-A', subject: 'Mathematics' },
  { class: 'VIII-B', subject: 'Science' }
];

export const summaryStats = {
  attendancePercentage: 92,
  homeworkAssigned: 3,
  homeworkPending: 18,
  concernsOpen: 2
};

export const studentsVIII_A = [
  { rollNo: '01', name: 'Aarav Sharma', attendance: 78, concerns: 1, homeworkPending: 1, subjects: { Math: true, Science: true, English: false, SST: true, Hindi: true } },
  { rollNo: '02', name: 'Priya Das', attendance: 81, concerns: 0, homeworkPending: 1, subjects: { Math: true, Science: true, English: true, SST: false, Hindi: true } },
  { rollNo: '03', name: 'Rahul Singh', attendance: 83, concerns: 0, homeworkPending: 2, subjects: { Math: false, Science: true, English: false, SST: true, Hindi: true } },
  { rollNo: '04', name: 'Diya Patel', attendance: 95, concerns: 0, homeworkPending: 0, subjects: { Math: true, Science: true, English: true, SST: true, Hindi: true } },
  { rollNo: '05', name: 'Ishaan Verma', attendance: 91, concerns: 0, homeworkPending: 1, subjects: { Math: false, Science: true, English: true, SST: true, Hindi: true } },
  { rollNo: '06', name: 'Kavya Mishra', attendance: 88, concerns: 0, homeworkPending: 0, subjects: { Math: true, Science: true, English: true, SST: true, Hindi: true } },
  { rollNo: '07', name: 'Krishna Rao', attendance: 99, concerns: 0, homeworkPending: 0, subjects: { Math: true, Science: true, English: true, SST: true, Hindi: true } },
  { rollNo: '08', name: 'Meera Reddy', attendance: 94, concerns: 0, homeworkPending: 0, subjects: { Math: true, Science: true, English: true, SST: true, Hindi: true } },
  { rollNo: '09', name: 'Neha Kumar', attendance: 85, concerns: 0, homeworkPending: 2, subjects: { Math: false, Science: false, English: true, SST: true, Hindi: true } },
  { rollNo: '10', name: 'Pranav Joshi', attendance: 96, concerns: 0, homeworkPending: 0, subjects: { Math: true, Science: true, English: true, SST: true, Hindi: true } },
  { rollNo: '11', name: 'Rohan Desai', attendance: 92, concerns: 0, homeworkPending: 0, subjects: { Math: true, Science: true, English: true, SST: true, Hindi: true } },
  { rollNo: '12', name: 'Sanya Nair', attendance: 89, concerns: 0, homeworkPending: 1, subjects: { Math: false, Science: true, English: true, SST: true, Hindi: true } },
  { rollNo: '13', name: 'Vikram Singh', attendance: 97, concerns: 0, homeworkPending: 0, subjects: { Math: true, Science: true, English: true, SST: true, Hindi: true } },
  { rollNo: '14', name: 'Riya Das', attendance: 81, concerns: 0, homeworkPending: 0, subjects: { Math: true, Science: true, English: true, SST: true, Hindi: true } },
  { rollNo: '15', name: 'Rahul Chawla', attendance: 83, concerns: 0, homeworkPending: 0, subjects: { Math: true, Science: true, English: true, SST: true, Hindi: true } }
];

export const studentsAttendanceList = studentsVIII_A.map(s => ({ rollNo: s.rollNo, name: s.name, status: 'Present' }));

export const classAttendanceSummary = {
  class: 'VIII-A',
  month: 'August 2026',
  percentage: 92,
  present: 38,
  absent: 4,
  late: 2,
  attentionNeeded: [
    { name: 'Aarav Sharma', percentage: 78 },
    { name: 'Priya Das', percentage: 81 },
    { name: 'Rahul Chawla', percentage: 83 }
  ]
};

// Homework Assigned by THIS teacher
export const myAssignments = [
  { id: 1, class: 'VIII-A', subject: 'Mathematics', title: 'Chapter 4 — Algebra', completed: 34, total: 42 },
  { id: 2, class: 'IX-B', subject: 'Mathematics', title: 'Exercise 5.2', completed: 31, total: 38 },
  { id: 3, class: 'VIII-B', subject: 'Science', title: 'Photosynthesis Diagram', completed: 29, total: 40 }
];

// All Subject Homework for VIII-A (Class Teacher View)
export const allSubjectHomeworkVIII_A = [
  { subject: 'Mathematics', title: 'Chapter 4 — Algebra', completed: 34, total: 42 },
  { subject: 'Science', title: 'Photosynthesis', completed: 38, total: 42 },
  { subject: 'English', title: 'Essay Writing', completed: 29, total: 42 },
  { subject: 'Social Science', title: 'Chapter 3 Questions', completed: 31, total: 42 },
  { subject: 'Hindi', title: 'Grammar Exercise', completed: 36, total: 42 }
];

export const initialConcerns = [
  { id: 1, student: 'Aarav Sharma', type: 'Homework', message: 'Homework has not been submitted for the last 3 assignments.', status: 'Open', date: '26 Aug 2026', parentNotified: true },
  { id: 2, student: 'Ishaan Verma', type: 'Attendance', message: 'Frequently absent in the first period.', status: 'Resolved', date: '15 Aug 2026', parentNotified: true }
];
