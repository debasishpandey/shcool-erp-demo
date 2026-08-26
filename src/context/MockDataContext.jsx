import React, { createContext, useContext, useState, useEffect } from 'react';
import * as initialMockData from '../data/mockData';

const MockDataContext = createContext();

export const useMockData = () => useContext(MockDataContext);

export const MockDataProvider = ({ children }) => {
  const DEMO_DATA_VERSION = 'v4';
  const STORAGE_KEY = `schoolERPDemoData_${DEMO_DATA_VERSION}`;

  // Try to load from localStorage first
  const loadInitialState = () => {
    const defaultState = {
      students: initialMockData.students || [],
      teachers: initialMockData.teachers || [],
      classes: initialMockData.classes || [],
      feeTransactions: initialMockData.feeTransactions || [],
      exams: initialMockData.exams || [],
      notices: initialMockData.notices || [],
      expenses: initialMockData.expenses || [],
      dashboardStats: initialMockData.dashboardStats || {},
      admissions: [
        { id: "ENQ-001", studentName: "Rohan Khanna", parentName: "Vivek Khanna", phone: "9876543111", appliedClass: "Class X", date: "2026-08-20", status: "New" },
        { id: "ENQ-002", studentName: "Sara Ali", parentName: "Ahmed Ali", phone: "9876543222", appliedClass: "Class VIII", date: "2026-08-21", status: "Application" },
        { id: "ENQ-003", studentName: "Arjun Nair", parentName: "Rahul Nair", phone: "9876543333", appliedClass: "Class IX", date: "2026-08-22", status: "Approved" }
      ],
      homework: [
        { id: "HW-001", subject: "Mathematics", class: "Class X", title: "Chapter 4 — Algebra", assignedDate: "2026-08-22", dueDate: "2026-08-25", assigned: 120, submitted: 95, pending: 25 },
        { id: "HW-002", subject: "Science", class: "Class VIII", title: "Photosynthesis Diagram", assignedDate: "2026-08-23", dueDate: "2026-08-26", assigned: 150, submitted: 80, pending: 70 }
      ],
      activities: [
        { id: 1, text: "System initialized", time: "Just now" }
      ],
      documents: []
    };

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const savedData = JSON.parse(saved);
        return {
          ...defaultState,
          ...savedData,
          students: Array.isArray(savedData.students) ? savedData.students : defaultState.students,
          teachers: Array.isArray(savedData.teachers) ? savedData.teachers : defaultState.teachers,
          classes: Array.isArray(savedData.classes) ? savedData.classes : defaultState.classes,
          feeTransactions: Array.isArray(savedData.feeTransactions) ? savedData.feeTransactions : defaultState.feeTransactions,
          exams: Array.isArray(savedData.exams) ? savedData.exams : defaultState.exams,
          notices: Array.isArray(savedData.notices) ? savedData.notices : defaultState.notices,
          expenses: Array.isArray(savedData.expenses) ? savedData.expenses : defaultState.expenses,
          admissions: Array.isArray(savedData.admissions) ? savedData.admissions : defaultState.admissions,
          homework: Array.isArray(savedData.homework) ? savedData.homework : defaultState.homework,
          activities: Array.isArray(savedData.activities) ? savedData.activities : defaultState.activities,
          documents: Array.isArray(savedData.documents) ? savedData.documents : defaultState.documents,
        };
      } catch (e) {
        console.error("Failed to parse local storage data", e);
      }
    }
    
    return defaultState;
  };

  const [data, setData] = useState(loadInitialState);

  // Persist to local storage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  // Actions
  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setData(loadInitialState());
  };

  const addActivity = (text) => {
    setData(prev => ({
      ...prev,
      activities: [{ id: Date.now(), text, time: "Just now" }, ...prev.activities].slice(0, 15) // Keep last 15
    }));
  };

  const addAdmission = (enquiry) => {
    const newEnquiry = { ...enquiry, id: `ENQ-${Date.now()}`, date: new Date().toISOString().split('T')[0], status: "New" };
    setData(prev => ({ ...prev, admissions: [newEnquiry, ...prev.admissions] }));
    addActivity(`New admission enquiry for ${enquiry.studentName}`);
  };

  const convertAdmissionToStudent = (enquiryId, classSection, rollNo) => {
    setData(prev => {
      const admission = prev.admissions.find(a => a.id === enquiryId);
      if (!admission) return prev;

      // Update admission status
      const updatedAdmissions = prev.admissions.map(a => 
        a.id === enquiryId ? { ...a, status: "Admitted" } : a
      );

      // Create new student
      const newStudent = {
        id: Date.now(),
        name: admission.studentName,
        admissionNo: `ADM-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        class: admission.appliedClass.replace("Class ", ""),
        section: classSection || "A",
        parent: admission.parentName,
        phone: admission.phone,
        attendance: "100%",
        feeStatus: "Pending",
        status: "Active",
        gender: "Not specified",
        dob: "2010-01-01",
        bg: "O+",
        rollNo: rollNo || Math.floor(Math.random() * 50) + 1,
        address: "Address not provided",
        parentEmail: "",
        totalFee: 45000,
        paidFee: 0,
        pendingFee: 45000
      };

      // Update dashboard stats
      const updatedStats = { ...prev.dashboardStats, students: prev.dashboardStats.students + 1 };

      return {
        ...prev,
        admissions: updatedAdmissions,
        students: [newStudent, ...prev.students],
        dashboardStats: updatedStats
      };
    });
    addActivity(`Admission converted to student`);
  };

  const recordFeePayment = (studentId, amount, method, remarks) => {
    const student = data.students.find(s => s.id === studentId);
    if (!student) return null;

    const exactTxn = {
      id: `TXN-${Date.now()}`,
      receiptNo: `REC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      student: student.name,
      studentId: student.id,
      admissionNo: student.admissionNo,
      class: `${student.class}-${student.section}`,
      amount: amount,
      method: method,
      feeType: remarks || "Tuition Fee",
      date: new Date().toISOString().split('T')[0],
      status: "Successful"
    };

    setData(prev => {
      const studentIndex = prev.students.findIndex(s => s.id === studentId);
      if (studentIndex === -1) return prev;

      const currentStudent = prev.students[studentIndex];
      const newPaid = currentStudent.paidFee + amount;
      const newPending = currentStudent.totalFee - newPaid;
      
      let newFeeStatus = "Pending";
      if (newPending <= 0) newFeeStatus = "Paid";
      else if (currentStudent.feeStatus === "Overdue") newFeeStatus = "Overdue";

      const updatedStudent = {
        ...currentStudent,
        paidFee: newPaid,
        pendingFee: Math.max(0, newPending),
        feeStatus: newFeeStatus
      };

      const newStudents = [...prev.students];
      newStudents[studentIndex] = updatedStudent;

      return {
        ...prev,
        students: newStudents,
        feeTransactions: [exactTxn, ...prev.feeTransactions]
      };
    });
    
    addActivity(`₹${amount} fee payment recorded`);
    return exactTxn;
  };

  const markAttendance = (studentId, status) => {
    // For demo purposes, we will just log the activity if they are marked absent
    if (status === 'Absent' || status === 'Late') {
      setData(prev => {
        const student = prev.students.find(s => s.id === studentId);
        if (student) {
          addActivity(`${student.name} was marked ${status.toLowerCase()}`);
        }
        return prev;
      });
    }
  };

  const addNotice = (notice) => {
    const newNotice = { ...notice, id: Date.now(), date: new Date().toISOString().split('T')[0] };
    setData(prev => ({ ...prev, notices: [newNotice, ...prev.notices] }));
    addActivity(`Notice published: ${notice.title}`);
  };

  const addHomework = (hw) => {
    const newHw = { ...hw, id: `HW-${Date.now()}`, assignedDate: new Date().toISOString().split('T')[0], assigned: Math.floor(Math.random() * 40) + 30, submitted: 0, pending: 0 };
    newHw.pending = newHw.assigned;
    setData(prev => ({ ...prev, homework: [newHw, ...prev.homework] }));
    addActivity(`Homework assigned to ${hw.class}`);
  };

  const recordExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: `EXP-${Date.now()}`,
    };
    setData(prev => ({
      ...prev,
      expenses: [newExpense, ...prev.expenses]
    }));
    addActivity(`Recorded expense: ₹${expense.amount} for ${expense.category}`);
  };

  const sendFeeReminder = (studentName, amount) => {
    addActivity(`Fee reminder sent to ${studentName}'s parent for ₹${amount}`);
  };

  return (
    <MockDataContext.Provider value={{ 
      data, 
      resetDemoData,
      addAdmission,
      convertAdmissionToStudent,
      recordFeePayment,
      recordExpense,
      sendFeeReminder,
      markAttendance,
      addNotice,
      addHomework,
      addActivity
    }}>
      {children}
    </MockDataContext.Provider>
  );
};
