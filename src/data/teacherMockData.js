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

// Helper to generate a stable mock matrix
const generateMonthlyMatrix = () => {
  const dates = [];
  for(let i=1; i<=31; i++) {
    const d = new Date(2026, 7, i); // August 2026
    const day = d.toLocaleDateString('en-US', { weekday: 'short' });
    dates.push({ date: i.toString().padStart(2, '0'), day, isWeekend: d.getDay() === 0 || d.getDay() === 6 });
  }
  
  // Use a predictable pseudo-random approach based on roll number so it doesn't change on re-render
  const matrix = studentsVIII_A.map((s, idx) => {
    const statuses = [];
    let presentCount = 0;
    let absentCount = 0;
    let lateCount = 0;
    
    for(let i=1; i<=31; i++) {
       const isWeekend = dates[i-1].isWeekend;
       if (isWeekend) {
         statuses.push('-');
         continue;
       }
       
       // Deterministic logic
       let st = 'P';
       if ((i + idx) % 15 === 0) st = 'A';
       else if ((i + idx) % 11 === 0) st = 'L';
       
       statuses.push(st);
       if(st==='P') presentCount++;
       if(st==='A') absentCount++;
       if(st==='L') lateCount++;
    }
    const percentage = Math.round((presentCount / (presentCount + absentCount + lateCount)) * 100) || 100;
    return { ...s, statuses, presentCount, absentCount, lateCount, percentage };
  });

  return { dates, matrix };
};

export const monthlyAttendanceData = generateMonthlyMatrix();

export const notificationsList = [
  { id: 1, type: 'School Notice', title: 'School Holiday', description: 'School will remain closed tomorrow for Janmashtami.', date: 'Today • 10:30 AM', unread: true },
  { id: 2, type: 'Event', title: 'Independence Day Celebration', description: '28 Aug • School Auditorium. All teachers report by 8:30 AM.', date: 'Yesterday • 2:00 PM', unread: true },
  { id: 3, type: 'Academic', title: 'Unit Test Schedule', description: 'Unit Test for Class VIII begins from 2 Sep.', date: '24 Aug 2026', unread: true },
  { id: 4, type: 'Parent Message', title: 'Parent suggestion received', description: 'New suggestion received for VIII-A regarding homework.', date: '24 Aug 2026', unread: true },
  { id: 5, type: 'Staff Notice', title: 'Staff Meeting', description: 'Staff meeting at 3:30 PM in the conference room.', date: '23 Aug 2026', unread: false }
];

export const eventsList = [
  { id: 1, title: 'Independence Day Celebration', date: '28 Aug 2026', day: 'Friday', time: '9:00 AM', venue: 'School Auditorium', note: 'Teacher reporting: 8:30 AM', type: 'Celebration' },
  { id: 2, title: 'Parent-Teacher Meeting', date: '30 Aug 2026', day: 'Sunday', time: '10:00 AM – 1:00 PM', venue: 'Classrooms', note: 'All class teachers must be present.', type: 'Academic' },
  { id: 3, title: 'Teachers\' Training Workshop', date: '3 Sep 2026', day: 'Thursday', time: '2:00 PM – 4:00 PM', venue: 'Staff Room', note: 'Topic: NEP 2020 Implementation', type: 'Staff' },
  { id: 4, title: 'Annual Sports Practice', date: '6 Sep 2026', day: 'Sunday', time: '8:00 AM', venue: 'School Ground', note: 'For selected students only.', type: 'Sports' }
];

export const holidaysList = [
  { id: 1, title: 'Independence Day Holiday', date: '29 Aug 2026', day: 'Saturday' },
  { id: 2, title: 'Ganesh Chaturthi Holiday', date: '12 Sep 2026', day: 'Saturday' },
  { id: 3, title: 'Gandhi Jayanti', date: '2 Oct 2026', day: 'Friday' },
  { id: 4, title: 'Diwali Holiday', date: '20 Oct 2026', day: 'Tuesday' }
];

export const parentSuggestionsList = [
  { id: 1, author: 'Rajesh Sharma', context: 'Parent of Aarav Sharma', category: 'Homework', message: 'Could the school consider sharing homework earlier in the evening so children have enough time to complete it?', date: '26 Aug 2026', status: 'New', anonymous: false },
  { id: 2, author: 'Anonymous Parent', context: '', category: 'Facilities', message: 'Please improve the drinking water arrangements near the senior classrooms.', date: '25 Aug 2026', status: 'New', anonymous: true },
  { id: 3, author: 'Neha Patel', context: 'Parent of Ananya Patel', category: 'Academic', message: 'Please consider adding more revision worksheets before the monthly test.', date: '22 Aug 2026', status: 'Reviewed', anonymous: false },
  { id: 4, author: 'Anonymous Parent', context: '', category: 'Homework', message: 'Could the school provide a little more notice before holiday homework is assigned?', date: '20 Aug 2026', status: 'Reviewed', anonymous: true }
];
