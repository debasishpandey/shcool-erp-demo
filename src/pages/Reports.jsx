import React from 'react';
import { BookOpen, Users, UserCheck, DollarSign, Activity, FileText, Calendar, Bell, ChevronRight, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Reports() {
  const role = localStorage.getItem('demoUserRole') || 'admin';

  if (role !== 'admin' && role !== 'accountant') {
    return (
      <div className="max-w-7xl mx-auto flex items-center justify-center h-64">
        <p className="text-gray-500 text-lg">You do not have permission to view reports.</p>
      </div>
    );
  }

  const reportGroups = [
    {
      title: "Students",
      icon: Users,
      color: "blue",
      reports: [
        { name: "Student Directory", desc: "Complete list with filters", to: "/student-reports" },
        { name: "Attendance Analytics", desc: "Class-wise and threshold reports", to: "/attendance" },
        { name: "Admission Sources", desc: "Where students come from", to: "/student-reports" },
      ]
    },
    {
      title: "Staff",
      icon: UserCheck,
      color: "green",
      reports: [
        { name: "Staff Directory", desc: "Teacher and non-teaching list", to: "/teachers" },
        { name: "Staff Attendance", desc: "Daily punches and working hours", to: "/teachers" },
        { name: "Teaching Load", desc: "Periods assigned per teacher", to: "/teachers" },
        { name: "Class Teacher Assignments", desc: "View all class teachers", to: "/classes" },
      ]
    },
    {
      title: "Academics",
      icon: BookOpen,
      color: "purple",
      reports: [
        { name: "Exam Performance", desc: "Class and subject averages", to: "/results" },
        { name: "Top Performers", desc: "Rankings across classes", to: "/results" },
        { name: "Needs Attention", desc: "Students below academic targets", to: "/results" },
      ]
    },
    {
      title: "Finance",
      icon: DollarSign,
      color: "emerald",
      reports: [
        { name: "Fee Collection", desc: "YTD and daily collection", to: "/accounts" },
        { name: "Outstanding Dues", desc: "Pending fees by class", to: "/accounts" },
        { name: "Defaulters List", desc: "Overdue payments over 30 days", to: "/accounts" },
        { name: "Expense Summary", desc: "Categorized expenses", to: "/expenses" },
      ]
    },
    {
      title: "Operations",
      icon: Activity,
      color: "orange",
      reports: [
        { name: "Class Adjustments", desc: "Teacher substitution history", to: "/staff-adjustments" },
        { name: "Teacher Availability", desc: "Free slots across the week", to: "/timetable" },
        { name: "Active Schedule", desc: "Currently running classes", to: "/timetable" },
      ]
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Principal Reports Hub</h1>
          <p className="mt-1 text-md text-gray-500">Access all analytics and management reports from one place.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {reportGroups.map((group, idx) => {
          const Icon = group.icon;
          return (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className={`p-4 border-b border-gray-200 bg-gray-50 flex items-center gap-3`}>
                <div className={`p-2 rounded-lg bg-${group.color}-100 text-${group.color}-600`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">{group.title}</h2>
              </div>
              <ul className="divide-y divide-gray-100">
                {group.reports.map((report, i) => (
                  <li key={i}>
                    <Link to={report.to} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                      <div>
                        <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                          <BarChart2 className="w-4 h-4 text-gray-400" /> {report.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 ml-6">{report.desc}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
