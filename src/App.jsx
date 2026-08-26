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
import Fees from './pages/Fees';
import Examinations from './pages/Examinations';
import Results from './pages/Results';
import Timetable from './pages/Timetable';
import Notices from './pages/Notices';
import Communication from './pages/Communication';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Homework from './pages/Homework';
import Documents from './pages/Documents';
import ParentDashboard from './pages/parent/ParentDashboard';

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
          <Route path="/fees" element={<Fees />} />
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
          <Route path="/parent/fees" element={<div className="p-8 text-center text-gray-500">Fees module coming soon to parent portal</div>} />
          <Route path="/parent/homework" element={<div className="p-8 text-center text-gray-500">Homework module coming soon to parent portal</div>} />
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
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
