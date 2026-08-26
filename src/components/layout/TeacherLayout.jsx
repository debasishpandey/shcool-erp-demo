import { Outlet } from 'react-router-dom';
import TeacherHeader from './TeacherHeader';
import TeacherBottomNav from './TeacherBottomNav';

export default function TeacherLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-[480px] bg-white shadow-xl min-h-screen flex flex-col relative overflow-hidden">
        {/* Top Header */}
        <TeacherHeader />
        
        {/* Main Content Area - padded at bottom for the fixed nav */}
        <main 
          className="flex-1 overflow-y-auto bg-gray-50 pb-24"
          style={{ paddingBottom: 'calc(6rem + env(safe-area-inset-bottom))' }}
        >
          <Outlet />
        </main>
        
        {/* Bottom Navigation */}
        <TeacherBottomNav />
      </div>
    </div>
  );
}
