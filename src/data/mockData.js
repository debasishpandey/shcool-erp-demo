export const students = [
  { id: 1, name: "Rahul Sharma", admissionNo: "ADM-2026-001", class: "X", section: "A", parent: "Amit Sharma", phone: "9876543210", attendance: "94%", feeStatus: "Paid", status: "Active", gender: "Male", dob: "2010-05-14", bg: "O+", rollNo: 15, address: "123, MG Road, Bangalore", parentEmail: "amit.sharma@example.com", totalFee: 45000, paidFee: 45000, pendingFee: 0 },
  { id: 2, name: "Priya Das", admissionNo: "ADM-2026-002", class: "X", section: "A", parent: "Vikram Das", phone: "9876543211", attendance: "88%", feeStatus: "Pending", status: "Active", gender: "Female", dob: "2010-08-22", bg: "A+", rollNo: 12, address: "45, Park Street, Kolkata", parentEmail: "vikram.das@example.com", totalFee: 45000, paidFee: 20000, pendingFee: 25000 },
  { id: 3, name: "Aarav Patel", admissionNo: "ADM-2026-003", class: "IX", section: "B", parent: "Sanjay Patel", phone: "9876543212", attendance: "96%", feeStatus: "Paid", status: "Active", gender: "Male", dob: "2011-02-10", bg: "B+", rollNo: 5, address: "78, SG Highway, Ahmedabad", parentEmail: "sanjay.patel@example.com", totalFee: 40000, paidFee: 40000, pendingFee: 0 },
  { id: 4, name: "Ananya Singh", admissionNo: "ADM-2026-004", class: "XI", section: "Science", parent: "Rajesh Singh", phone: "9876543213", attendance: "91%", feeStatus: "Paid", status: "Active", gender: "Female", dob: "2009-11-05", bg: "AB+", rollNo: 8, address: "22, Civil Lines, Delhi", parentEmail: "rajesh.singh@example.com", totalFee: 55000, paidFee: 55000, pendingFee: 0 },
  { id: 5, name: "Vihaan Gupta", admissionNo: "ADM-2026-005", class: "VIII", section: "C", parent: "Manish Gupta", phone: "9876543214", attendance: "85%", feeStatus: "Overdue", status: "Active", gender: "Male", dob: "2012-07-19", bg: "O-", rollNo: 21, address: "56, Mall Road, Shimla", parentEmail: "manish.gupta@example.com", totalFee: 35000, paidFee: 10000, pendingFee: 25000 },
  { id: 6, name: "Ishita Reddy", admissionNo: "ADM-2026-006", class: "X", section: "B", parent: "Krishna Reddy", phone: "9876543215", attendance: "98%", feeStatus: "Paid", status: "Active", gender: "Female", dob: "2010-03-30", bg: "A-", rollNo: 18, address: "89, Jubilee Hills, Hyderabad", parentEmail: "krishna.reddy@example.com", totalFee: 45000, paidFee: 45000, pendingFee: 0 },
  { id: 7, name: "Rohan Verma", admissionNo: "ADM-2026-007", class: "VII", section: "A", parent: "Anil Verma", phone: "9876543216", attendance: "92%", feeStatus: "Paid", status: "Active", gender: "Male", dob: "2013-09-12", bg: "B-", rollNo: 10, address: "34, Kankarbagh, Patna", parentEmail: "anil.verma@example.com", totalFee: 30000, paidFee: 30000, pendingFee: 0 },
  { id: 8, name: "Meera Nair", admissionNo: "ADM-2026-008", class: "XII", section: "Commerce", parent: "Suresh Nair", phone: "9876543217", attendance: "95%", feeStatus: "Paid", status: "Active", gender: "Female", dob: "2008-06-25", bg: "O+", rollNo: 25, address: "67, Marine Drive, Kochi", parentEmail: "suresh.nair@example.com", totalFee: 60000, paidFee: 60000, pendingFee: 0 },
  { id: 9, name: "Aditya Kumar", admissionNo: "ADM-2026-009", class: "IX", section: "A", parent: "Manoj Kumar", phone: "9876543218", attendance: "89%", feeStatus: "Pending", status: "Active", gender: "Male", dob: "2011-12-08", bg: "A+", rollNo: 3, address: "12, Gomti Nagar, Lucknow", parentEmail: "manoj.kumar@example.com", totalFee: 40000, paidFee: 20000, pendingFee: 20000 },
  { id: 10, name: "Sneha Joshi", admissionNo: "ADM-2026-010", class: "X", section: "A", parent: "Prakash Joshi", phone: "9876543219", attendance: "97%", feeStatus: "Paid", status: "Active", gender: "Female", dob: "2010-01-15", bg: "AB-", rollNo: 22, address: "90, Deccan Gymkhana, Pune", parentEmail: "prakash.joshi@example.com", totalFee: 45000, paidFee: 45000, pendingFee: 0 }
];

export const teachers = [
  { id: 1, name: "Ravi Shankar", department: "Science", subject: "Physics", classes: "IX, X, XI, XII", contact: "9876500001", status: "Active" },
  { id: 2, name: "Sunita Sharma", department: "Mathematics", subject: "Math", classes: "VIII, IX, X", contact: "9876500002", status: "Active" },
  { id: 3, name: "John D'Souza", department: "Languages", subject: "English", classes: "X, XI, XII", contact: "9876500003", status: "Active" },
  { id: 4, name: "Meenakshi Iyer", department: "Social Science", subject: "History", classes: "VII, VIII, IX", contact: "9876500004", status: "On Leave" },
  { id: 5, name: "Amitabh Bachchan", department: "Computer Science", subject: "Computer", classes: "IX, X, XI, XII", contact: "9876500005", status: "Active" }
];

export const classes = [
  { id: 1, name: "Class X", sections: 3, students: 120, classTeacher: "Sunita Sharma", attendance: "95%" },
  { id: 2, name: "Class IX", sections: 3, students: 115, classTeacher: "Ravi Shankar", attendance: "93%" },
  { id: 3, name: "Class XI (Science)", sections: 2, students: 80, classTeacher: "John D'Souza", attendance: "91%" },
  { id: 4, name: "Class XII (Commerce)", sections: 2, students: 75, classTeacher: "Meenakshi Iyer", attendance: "96%" },
  { id: 5, name: "Class VIII", sections: 4, students: 150, classTeacher: "Amitabh Bachchan", attendance: "92%" }
];

export const feeTransactions = [
  { id: "TXN-001", receiptNo: "REC-2026-1001", student: "Rahul Sharma", class: "X-A", amount: 15000, method: "Online", date: "2026-08-10", status: "Successful" },
  { id: "TXN-002", receiptNo: "REC-2026-1002", student: "Ananya Singh", class: "XI-Science", amount: 20000, method: "Bank Transfer", date: "2026-08-12", status: "Successful" },
  { id: "TXN-003", receiptNo: "REC-2026-1003", student: "Vihaan Gupta", class: "VIII-C", amount: 10000, method: "Cash", date: "2026-08-15", status: "Successful" },
  { id: "TXN-004", receiptNo: "REC-2026-1004", student: "Priya Das", class: "X-A", amount: 20000, method: "Cheque", date: "2026-08-18", status: "Pending" }
];

export const exams = [
  { id: 1, name: "Half Yearly Examination", classes: "I to XII", startDate: "2026-09-15", endDate: "2026-09-30", status: "Upcoming" },
  { id: 2, name: "Unit Test 1", classes: "I to XII", startDate: "2026-07-20", endDate: "2026-07-25", status: "Completed" },
  { id: 3, name: "Annual Examination", classes: "I to IX, XI", startDate: "2027-03-01", endDate: "2027-03-20", status: "Scheduled" }
];

export const notices = [
  { id: 1, title: "Independence Day Holiday", date: "2026-08-14", author: "Principal", category: "Holiday", content: "The school will remain closed on 15th August 2026 on account of Independence Day." },
  { id: 2, title: "Parent Teacher Meeting", date: "2026-08-25", author: "Admin", category: "Event", content: "A Parent Teacher Meeting for classes I to XII is scheduled on 30th August 2026 from 9:00 AM to 1:00 PM." },
  { id: 3, title: "Half Yearly Examination Schedule", date: "2026-09-01", author: "Examination Dept", category: "Academic", content: "The datesheet for the upcoming Half Yearly Examinations has been published on the notice board and student portal." }
];

export const dashboardStats = {
  students: 1248,
  teachers: 68,
  classes: 42,
  attendance: 94.2,
  feeCollection: "18.4L",
  pendingFees: "3.2L"
};
