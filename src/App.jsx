import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import ParentLayout from './components/layout/ParentLayout';
import TeacherLayout from './components/layout/TeacherLayout';
import Marketing from './pages/Marketing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Admissions from './pages/Admissions';
import Students from './pages/Students';
import StudentProfile from './pages/StudentProfile';
import Teachers from './pages/Teachers';
import Classes from './pages/Classes';
import Attendance from './pages/Attendance';
import Accounts from './pages/Accounts';
import Expenses from './pages/Expenses';
import Examinations from './pages/Examinations';
import Results from './pages/Results';
import Timetable from './pages/Timetable';
import Notices from './pages/Notices';
import Communication from './pages/Communication';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Homework from './pages/Homework';
import Documents from './pages/Documents';
import RecordPayment from './pages/RecordPayment';
import ParentDashboard from './pages/parent/ParentDashboard';
import ParentAcademics from './pages/parent/ParentAcademics';
import ParentReportCard from './pages/parent/ParentReportCard';
import ParentFees from './pages/parent/ParentFees';
import ParentReceipt from './pages/parent/ParentReceipt';
import ParentNotifications from './pages/parent/ParentNotifications';
import ParentNotices from './pages/parent/ParentNotices';
import ParentMore from './pages/parent/ParentMore';
import ParentChildProfile from './pages/parent/ParentChildProfile';
import ParentHomework from './pages/parent/ParentHomework';
import ParentAttendance from './pages/parent/ParentAttendance';
import ParentEvents from './pages/parent/ParentEvents';
import ParentFeedback from './pages/parent/ParentFeedback';

// Teacher Pages
import TeacherHome from './pages/teacher/TeacherHome';
import TeacherAttendance from './pages/teacher/TeacherAttendance';
import ClassAttendanceSummary from './pages/teacher/ClassAttendanceSummary';
import ClassOverview from './pages/teacher/ClassOverview';
import TeacherHomework from './pages/teacher/TeacherHomework';
import TeacherConcerns from './pages/teacher/TeacherConcerns';
import TeacherNotifications from './pages/teacher/TeacherNotifications';
import TeacherEvents from './pages/teacher/TeacherEvents';
import TeacherMore from './pages/teacher/TeacherMore';
import TeacherExams from './pages/teacher/TeacherExams';
import TeacherEnterMarks from './pages/teacher/TeacherEnterMarks';
import TeacherClassReports from './pages/teacher/TeacherClassReports';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Marketing />} />
        <Route path="/login" element={<Login />} />
        
        {/* Admin/Staff Routes */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/:id" element={<StudentProfile />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/homework" element={<Homework />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/accountant" element={<Accounts />} />
          <Route path="/accountant/record-payment" element={<RecordPayment />} />
          <Route path="/record-payment" element={<RecordPayment />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/exams" element={<Examinations />} />
          <Route path="/results" element={<Results />} />
          <Route path="/timetable" element={<Timetable />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/communication" element={<Communication />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Parent Portal Routes */}
        <Route element={<ParentLayout />}>
          <Route path="/parent/dashboard" element={<ParentDashboard />} />
          <Route path="/parent/academics" element={<ParentAcademics />} />
          <Route path="/parent/report-card" element={<ParentReportCard />} />
          <Route path="/parent/fees" element={<ParentFees />} />
          <Route path="/parent/receipt" element={<ParentReceipt />} />
          <Route path="/parent/notifications" element={<ParentNotifications />} />
          <Route path="/parent/notices" element={<ParentNotices />} />
          <Route path="/parent/more" element={<ParentMore />} />
          <Route path="/parent/child-profile" element={<ParentChildProfile />} />
          <Route path="/parent/homework" element={<ParentHomework />} />
          <Route path="/parent/attendance" element={<ParentAttendance />} />
          <Route path="/parent/events" element={<ParentEvents />} />
          <Route path="/parent/feedback" element={<ParentFeedback />} />
        </Route>
        
        {/* Teacher Mobile App Routes */}
        <Route element={<TeacherLayout />}>
          <Route path="/teacher/home" element={<TeacherHome />} />
          <Route path="/teacher/attendance" element={<TeacherAttendance />} />
          <Route path="/teacher/attendance/summary" element={<ClassAttendanceSummary />} />
          <Route path="/teacher/class-overview" element={<ClassOverview />} />
          <Route path="/teacher/homework" element={<TeacherHomework />} />
          <Route path="/teacher/concerns" element={<TeacherConcerns />} />
          <Route path="/teacher/notifications" element={<TeacherNotifications />} />
          <Route path="/teacher/events" element={<TeacherEvents />} />
          <Route path="/teacher/more" element={<TeacherMore />} />
          <Route path="/teacher/exams" element={<TeacherExams />} />
          <Route path="/teacher/exams/enter-marks" element={<TeacherEnterMarks />} />
          <Route path="/teacher/exams/reports" element={<TeacherClassReports />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
