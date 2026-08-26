export const parentProfile = {
  name: 'Rajesh Sharma',
  relation: 'Father',
  contact: '9876543210',
  motherName: 'Neha Sharma',
};

export const childProfile = {
  name: 'Aarav Sharma',
  class: 'VIII-A',
  rollNo: '12',
  admissionNo: 'ADM-2026-012',
  dob: '15 May 2013',
  bloodGroup: 'O+',
  school: 'Sunrise Public School'
};

export const childPerformance = {
  attendance: {
    percentage: 92,
    month: 'August 2026',
    present: 23,
    absent: 3,
    late: 1,
    concern: 'Attendance has fallen below 80% on some days.'
  },
  overall: {
    percentage: 78,
    grade: 'B+',
    classAverage: 76.8
  },
  fees: {
    total: 45000,
    paid: 39000,
    pending: 6000,
    dueDate: '31 Aug 2026',
    breakdown: [
      { id: 1, name: 'Tuition Fee', amount: 25000, status: 'Paid' },
      { id: 2, name: 'Transport', amount: 8000, status: 'Paid' },
      { id: 3, name: 'Activity Fee', amount: 5000, status: 'Paid' },
      { id: 4, name: 'Exam Fee', amount: 3000, status: 'Pending' },
      { id: 5, name: 'Library', amount: 4000, status: 'Pending' }
    ]
  },
  concerns: {
    open: 1
  }
};

export const childHomework = [
  { id: 1, subject: 'Mathematics', title: 'Chapter 4 — Algebra', status: 'Completed', due: '28 Aug 2026', description: 'Complete exercises 4.1 and 4.2 in the notebook.' },
  { id: 2, subject: 'Science', title: 'Photosynthesis Diagram', status: 'Completed', due: '28 Aug 2026', description: 'Draw and label the photosynthesis process.' },
  { id: 3, subject: 'English', title: 'Essay Writing', status: 'Pending', due: '28 Aug 2026', description: 'Write a 250-word essay on "My School".' },
  { id: 4, subject: 'Social Science', title: 'Chapter 3 Questions', status: 'Completed', due: '29 Aug 2026', description: 'Answer questions 1-5 on page 45.' },
  { id: 5, subject: 'Hindi', title: 'Grammar Exercise', status: 'Completed', due: '29 Aug 2026', description: 'Complete the grammar worksheet.' }
];

export const examResults = {
  examName: 'Unit Test 1',
  date: 'August 2026',
  subjects: [
    { name: 'Mathematics', marks: 84, total: 100, grade: 'B+' },
    { name: 'Science', marks: 78, total: 100, grade: 'B+' },
    { name: 'English', marks: 72, total: 100, grade: 'B' },
    { name: 'Social Science', marks: 81, total: 100, grade: 'A' },
    { name: 'Hindi', marks: 75, total: 100, grade: 'B+' }
  ],
  totalMarks: 390,
  maxMarks: 500,
  percentage: 78,
  grade: 'B+'
};

export const upcomingExams = [
  { id: 1, subject: 'Mathematics', date: '28 Aug', time: '9:00 AM' },
  { id: 2, subject: 'Science', date: '30 Aug', time: '9:00 AM' },
  { id: 3, subject: 'English', date: '2 Sep', time: '9:00 AM' }
];

export const parentNotifications = [
  { id: 1, type: 'Exam Reminder', title: 'Mathematics exam is on 28 Aug', date: 'Today • 8:00 AM', unread: true },
  { id: 2, type: 'Homework Reminder', title: 'English homework is due tomorrow', date: 'Today • 7:30 AM', unread: true },
  { id: 3, type: 'Fee Reminder', title: '₹6,000 fee is due on 31 Aug', date: 'Yesterday • 10:00 AM', unread: false },
  { id: 4, type: 'School Notice', title: 'School will remain closed on 29 Aug', date: '24 Aug 2026', unread: false },
  { id: 5, type: 'Attendance Alert', title: 'Aarav Sharma was marked absent today', date: '20 Aug 2026', unread: false }
];

export const parentNotices = [
  { id: 1, title: 'School Holiday', message: 'School will remain closed on 29 Aug.', date: '26 Aug 2026', category: 'General' },
  { id: 2, title: 'Parent-Teacher Meeting', message: 'Meeting scheduled for 30 Aug.', date: '24 Aug 2026', details: 'Class: VIII-A | Time: 10 AM – 1 PM', category: 'Academic' }
];

export const parentEvents = [
  { id: 1, title: 'Independence Day Celebration', date: '28 Aug', time: '9:00 AM', venue: 'School Auditorium', type: 'Event' },
  { id: 2, title: 'Parent-Teacher Meeting', date: '30 Aug', time: '10:00 AM – 1:00 PM', venue: 'Classrooms', type: 'Event' },
  { id: 3, title: 'Teachers\' Workshop', date: '3 Sep', time: 'All Day', venue: 'Staff Room', type: 'Event' }
];

export const parentHolidays = [
  { id: 1, title: 'School Holiday', date: '29 Aug' },
  { id: 2, title: 'Gandhi Jayanti', date: '2 Oct' },
  { id: 3, title: 'Festival Holiday', date: '12 Oct' }
];

export const parentSuggestions = [
  { id: 1, message: 'Could homework be shared before 6 PM?', status: 'Reviewed', date: '20 Aug 2026' },
  { id: 2, message: 'Please improve drinking water near senior classrooms.', status: 'Under Review', date: '25 Aug 2026' }
];

// Helper to generate a stable mock matrix for attendance calendar
export const generateMonthlyCalendar = () => {
  const days = [];
  let present = 23;
  let absent = 3;
  let late = 1;
  
  for(let i=1; i<=31; i++) {
    const d = new Date(2026, 7, i); // August 2026
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    
    let status = 'P'; // Default present
    if (isWeekend) {
      status = '-';
    } else if (i === 4 || i === 12 || i === 20) {
      status = 'A';
    } else if (i === 18) {
      status = 'L';
    }

    days.push({
      date: i,
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      isWeekend,
      status
    });
  }

  return days;
};

export const monthlyAttendanceCalendar = generateMonthlyCalendar();
