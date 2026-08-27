// Expanded mock data for the Principal Demo
export const dashboardStats = {
  students: 1142,
  teachers: 68,
  classes: 32,
  attendance: 94.9,
  feesCollectedToday: 47500,
  pendingFees: 320000,
};

export const todayStatus = {
  studentsPresent: 1084,
  studentsTotal: 1142,
  teachersPresent: 61,
  teachersTotal: 68,
  teachersAbsent: 7,
  classesRunning: 30,
  classesTotal: 32,
  examsToday: 2,
  homeworkPending: 128,
  noticesUnread: 3,
};

export const students = [
  // Class X - A
  { id: 1, name: "Rahul Sharma", admissionNo: "ADM-2026-001", class: "X", section: "A", parent: "Amit Sharma", phone: "9876543210", attendance: "94%", overallAttendance: 94, feeStatus: "Paid", status: "Active", gender: "Male", dob: "2010-05-14", rollNo: 15, totalFee: 51000, paidFee: 51000, pendingFee: 0, admissionSource: "Online Enquiry", examPerformance: 85, homework: "4/5" },
  { id: 2, name: "Priya Das", admissionNo: "ADM-2026-002", class: "X", section: "A", parent: "Vikram Das", phone: "9876543211", attendance: "88%", overallAttendance: 88, feeStatus: "Paid", status: "Active", gender: "Female", dob: "2010-08-22", rollNo: 12, totalFee: 51000, paidFee: 51000, pendingFee: 0, admissionSource: "Walk-in", examPerformance: 92, homework: "5/5" },
  { id: 6, name: "Ishita Reddy", admissionNo: "ADM-2026-006", class: "X", section: "A", parent: "Krishna Reddy", phone: "9876543215", attendance: "98%", overallAttendance: 98, feeStatus: "Pending", status: "Active", gender: "Female", dob: "2010-03-30", rollNo: 18, totalFee: 51000, paidFee: 26000, pendingFee: 25000, admissionSource: "Referral", examPerformance: 76, homework: "3/5" },
  
  // Class VIII - A (Important for demo scenarios)
  { id: 4, name: "Ananya Singh", admissionNo: "ADM-2026-004", class: "VIII", section: "A", parent: "Rajesh Singh", phone: "9876543213", attendance: "91%", overallAttendance: 91, feeStatus: "Pending", status: "Active", gender: "Female", dob: "2012-11-05", rollNo: 8, totalFee: 45000, paidFee: 30000, pendingFee: 15000, admissionSource: "Online Enquiry", examPerformance: 78, homework: "4/5" },
  { id: 5, name: "Vihaan Gupta", admissionNo: "ADM-2026-005", class: "VIII", section: "A", parent: "Manish Gupta", phone: "9876543214", attendance: "85%", overallAttendance: 85, feeStatus: "Overdue", status: "Active", gender: "Male", dob: "2012-07-19", rollNo: 21, totalFee: 45000, paidFee: 10000, pendingFee: 35000, admissionSource: "Walk-in", examPerformance: 81, homework: "3/5" },
  { id: 301, name: "Aarav Sharma", admissionNo: "ADM-2026-301", class: "VIII", section: "A", parent: "Ravi Sharma", phone: "9876543100", attendance: "92%", overallAttendance: 92, feeStatus: "Paid", status: "Active", gender: "Male", dob: "2012-01-15", rollNo: 1, totalFee: 45000, paidFee: 45000, pendingFee: 0, admissionSource: "Existing Parent", examPerformance: 94, homework: "5/5" },
  { id: 302, name: "Sneha Patel", admissionNo: "ADM-2026-302", class: "VIII", section: "A", parent: "Sunil Patel", phone: "9876543101", attendance: "69%", overallAttendance: 69, feeStatus: "Pending", status: "Active", gender: "Female", dob: "2012-04-10", rollNo: 2, totalFee: 45000, paidFee: 20000, pendingFee: 25000, admissionSource: "Advertisement", examPerformance: 61, homework: "2/5" },
  { id: 303, name: "Rohan Das", admissionNo: "ADM-2026-303", class: "VIII", section: "A", parent: "Alok Das", phone: "9876543102", attendance: "74%", overallAttendance: 74, feeStatus: "Overdue", status: "Active", gender: "Male", dob: "2012-06-22", rollNo: 3, totalFee: 45000, paidFee: 15000, pendingFee: 30000, admissionSource: "School Website", examPerformance: 58, homework: "1/5" },
  { id: 304, name: "Priya Das", admissionNo: "ADM-2026-304", class: "VIII", section: "A", parent: "Anil Das", phone: "9876543103", attendance: "98%", overallAttendance: 98, feeStatus: "Paid", status: "Active", gender: "Female", dob: "2012-08-11", rollNo: 4, totalFee: 45000, paidFee: 45000, pendingFee: 0, admissionSource: "Online Enquiry", examPerformance: 92, homework: "5/5" },
  { id: 305, name: "Rahul Chawla", admissionNo: "ADM-2026-305", class: "VIII", section: "A", parent: "Ramesh Chawla", phone: "9876543104", attendance: "95%", overallAttendance: 95, feeStatus: "Paid", status: "Active", gender: "Male", dob: "2012-03-05", rollNo: 14, totalFee: 45000, paidFee: 45000, pendingFee: 0, admissionSource: "Walk-in", examPerformance: 91, homework: "4/5" },
  { id: 306, name: "Vikash Kumar", admissionNo: "ADM-2026-306", class: "VIII", section: "A", parent: "Sanjay Kumar", phone: "9876543105", attendance: "80%", overallAttendance: 80, feeStatus: "Pending", status: "Active", gender: "Male", dob: "2012-09-19", rollNo: 15, totalFee: 45000, paidFee: 22500, pendingFee: 22500, admissionSource: "Referral", examPerformance: 64, homework: "3/5" },
];

export const teachers = [
  { id: "EMP-021", name: "Sunita Sharma", department: "Mathematics", subjects: ["Mathematics"], isClassTeacher: true, classTeacherOf: "VIII-A", teachingClasses: ["VIII-A", "IX-B", "X-A"], contact: "9876500002", email: "sunita@sunriseschool.edu", status: "Absent", todayStatus: "Absent Today", 
    todaySchedule: [
      { period: 1, time: "08:00 - 08:45", class: "VIII-A", subject: "Mathematics", type: "class" },
      { period: 2, time: "08:45 - 09:30", class: "VIII-A", subject: "Mathematics", type: "class" },
      { period: 3, time: "09:30 - 10:15", class: "IX-B", subject: "Mathematics", type: "class" },
      { period: 4, time: "10:15 - 11:00", class: "", subject: "", type: "free" },
      { period: 5, time: "11:30 - 12:15", class: "X-A", subject: "Mathematics", type: "class" },
    ]
  },
  { id: "EMP-034", name: "Amit Das", department: "Mathematics", subjects: ["Mathematics"], isClassTeacher: false, classTeacherOf: "", teachingClasses: ["V-A", "VIII-B"], contact: "9876500034", email: "amit.das@sunriseschool.edu", status: "Active", todayStatus: "Present",
    todaySchedule: [
      { period: 1, time: "08:00 - 08:45", class: "V-A", subject: "Mathematics", type: "class" },
      { period: 2, time: "08:45 - 09:30", class: "", subject: "", type: "free" },
      { period: 3, time: "09:30 - 10:15", class: "", subject: "", type: "free" },
      { period: 4, time: "10:15 - 11:00", class: "V-A", subject: "Mathematics", type: "class" },
      { period: 5, time: "11:30 - 12:15", class: "", subject: "", type: "free" },
    ]
  },
  { id: "EMP-041", name: "Neha Patel", department: "English", subjects: ["English"], isClassTeacher: true, classTeacherOf: "IX-A", teachingClasses: ["VIII-A", "IX-A"], contact: "9876500041", email: "neha.patel@sunriseschool.edu", status: "Active", todayStatus: "Present",
    todaySchedule: [
      { period: 1, time: "08:00 - 08:45", class: "IX-A", subject: "English", type: "class" },
      { period: 2, time: "08:45 - 09:30", class: "", subject: "", type: "free" },
      { period: 3, time: "09:30 - 10:15", class: "", subject: "", type: "free" },
      { period: 4, time: "10:15 - 11:00", class: "VIII-A", subject: "English", type: "class" },
      { period: 5, time: "11:30 - 12:15", class: "", subject: "", type: "free" },
    ]
  },
  { id: "EMP-012", name: "Ravi Shankar", department: "Science", subjects: ["Science", "Physics"], isClassTeacher: true, classTeacherOf: "X-A", teachingClasses: ["VIII-A", "IX-B", "X-A"], contact: "9876500001", email: "ravi.s@sunriseschool.edu", status: "Active", todayStatus: "Present",
    todaySchedule: [
      { period: 1, time: "08:00 - 08:45", class: "", subject: "", type: "free" },
      { period: 2, time: "08:45 - 09:30", class: "", subject: "", type: "free" },
      { period: 3, time: "09:30 - 10:15", class: "VIII-A", subject: "Science", type: "class" },
      { period: 5, time: "11:30 - 12:15", class: "IX-B", subject: "Physics", type: "class" },
    ]
  },
  { id: "EMP-055", name: "Meenakshi Iyer", department: "Social Science", subjects: ["History", "Civics"], isClassTeacher: false, classTeacherOf: "", teachingClasses: ["VII-A", "VIII-A"], contact: "9876500004", email: "meenakshi@sunriseschool.edu", status: "Absent", todayStatus: "Absent Today",
    todaySchedule: []
  },
  { id: "EMP-062", name: "Kiran Rao", department: "Science", subjects: ["Biology"], isClassTeacher: false, classTeacherOf: "", teachingClasses: ["IX-A", "X-B"], contact: "9876500062", email: "kiran@sunriseschool.edu", status: "Active", todayStatus: "Present",
    todaySchedule: [
      { period: 1, time: "08:00 - 08:45", class: "IX-A", subject: "Biology", type: "class" },
      { period: 2, time: "08:45 - 09:30", class: "X-B", subject: "Biology", type: "class" },
      { period: 3, time: "09:30 - 10:15", class: "", subject: "", type: "free" },
      { period: 5, time: "11:30 - 12:15", class: "", subject: "", type: "free" },
    ]
  }
];

export const classes = [
  { id: 1, name: "VIII-A", students: 42, classTeacher: "Sunita Sharma", attendance: "92%", feeCollection: "90%", homeworkCompletion: "81%", openConcerns: 2, todayClasses: 6, subjects: ["Mathematics", "Science", "English", "Social Science", "Hindi"], teachers: ["Sunita Sharma", "Ravi Shankar", "Neha Patel"] },
  { id: 2, name: "VIII-B", students: 40, classTeacher: "Ravi Shankar", attendance: "94%", feeCollection: "95%", homeworkCompletion: "88%", openConcerns: 0, todayClasses: 6, subjects: ["Mathematics", "Science", "English", "Social Science", "Hindi"], teachers: ["Amit Das", "Ravi Shankar", "Neha Patel"] },
  { id: 3, name: "IX-A", students: 38, classTeacher: "Neha Patel", attendance: "91%", feeCollection: "88%", homeworkCompletion: "92%", openConcerns: 1, todayClasses: 6, subjects: ["Mathematics", "Science", "English", "Social Science", "Hindi"], teachers: ["Sunita Sharma", "Ravi Shankar", "Neha Patel"] },
  { id: 4, name: "IX-B", students: 39, classTeacher: "Amit Das", attendance: "88%", feeCollection: "85%", homeworkCompletion: "85%", openConcerns: 3, todayClasses: 6, subjects: ["Mathematics", "Science", "English", "Social Science", "Hindi"], teachers: ["Sunita Sharma", "Ravi Shankar", "Neha Patel"] },
  { id: 5, name: "X-A", students: 45, classTeacher: "Ravi Shankar", attendance: "95%", feeCollection: "92%", homeworkCompletion: "95%", openConcerns: 0, todayClasses: 7, subjects: ["Mathematics", "Science", "English", "Social Science", "Hindi"], teachers: ["Sunita Sharma", "Ravi Shankar", "Neha Patel"] },
];

export const mockAbsences = [
  { id: 1, teacherId: "EMP-021", teacherName: "Sunita Sharma", department: "Mathematics", affectedClasses: 3, periods: [1, 2, 3], adjustmentsNeeded: 3 },
  { id: 2, teacherId: "EMP-055", teacherName: "Meenakshi Iyer", department: "Social Science", affectedClasses: 2, periods: [2, 4], adjustmentsNeeded: 2 },
];

export const mockAdjustments = [
  { class: "VIII-A", period: 2, subject: "Mathematics", originalTeacher: "Sunita Sharma", status: "Pending", replacement: null },
  { class: "IX-B", period: 3, subject: "Mathematics", originalTeacher: "Sunita Sharma", status: "Pending", replacement: null },
  { class: "X-A", period: 5, subject: "Mathematics", originalTeacher: "Sunita Sharma", status: "Pending", replacement: null },
];

export const mockLeaveRequests = [
  { id: 1, teacher: "Neha Patel", type: "Casual Leave", from: "27 Aug 2026", to: "27 Aug 2026", days: 1, reason: "Personal work", status: "Pending" },
  { id: 2, teacher: "Amit Das", type: "Sick Leave", from: "01 Sep 2026", to: "02 Sep 2026", days: 2, reason: "Medical", status: "Approved" },
];

export const mockAdmissionsAnalytics = {
  sources: [
    { source: "Online Enquiry", count: 42 },
    { source: "Walk-in", count: 28 },
    { source: "Referral", count: 15 },
    { source: "Existing Parent", count: 12 },
    { source: "Advertisement", count: 8 },
    { source: "School Website", count: 6 },
  ]
};

export const feeTransactions = [
  { id: "TXN-001", receiptNo: "REC-2026-1001", student: "Rahul Sharma", class: "X-A", amount: 15000, method: "UPI", feeType: "Tuition Fee", date: "2026-08-10", status: "Successful" },
  { id: "TXN-002", receiptNo: "REC-2026-1002", student: "Ananya Singh", class: "VIII-A", amount: 20000, method: "Bank Transfer", feeType: "Term Fee", date: "2026-08-12", status: "Successful" },
  { id: "TXN-003", receiptNo: "REC-2026-1003", student: "Vihaan Gupta", class: "VIII-A", amount: 10000, method: "Cash", feeType: "Tuition Fee", date: "2026-08-15", status: "Successful" },
];

export const expenses = [];

export const exams = [
  { id: 1, name: "Half Yearly Examination", classes: "I to XII", startDate: "2026-09-15", endDate: "2026-09-30", status: "Upcoming", readiness: { questionPaper: true, roomAssigned: true, invigilator: false, marksEntry: "0 / 42" } },
  { id: 2, name: "Unit Test 1", classes: "I to XII", startDate: "2026-07-20", endDate: "2026-07-25", status: "Completed", readiness: { questionPaper: true, roomAssigned: true, invigilator: true, marksEntry: "42 / 42" } },
];

export const notices = [
  { id: 1, title: "Independence Day Holiday", date: "2026-08-14", author: "Principal", audience: "All School", category: "Holiday", content: "The school will remain closed on 15th August 2026." },
  { id: 2, title: "Parent Teacher Meeting", date: "2026-08-25", author: "Admin", audience: "Parents + Teachers", category: "Event", content: "A Parent Teacher Meeting is scheduled on 30th August 2026." },
];
