import { Bell, Search, Menu } from 'lucide-react';

export default function Navbar({ toggleMobileMenu }) {
  return (
    <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-10 w-full">
      <div className="flex items-center flex-1 gap-4">
        <button 
          className="lg:hidden p-2 -ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="max-w-md w-full lg:max-w-xs relative hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="Search students, staff, etc..."
            type="search"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 relative">
          <span className="sr-only">View notifications</span>
          <Bell className="h-6 w-6" />
          <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Academic Year 2026-27</span>
        </div>
      </div>
    </header>
  );
}
