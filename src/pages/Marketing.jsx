import { Link } from 'react-router-dom';
import { BookOpen, Users, UserCheck, CreditCard, FileText, Calendar, MessageSquare, BarChart2, CheckCircle2 } from 'lucide-react';

export default function Marketing() {
  const features = [
    { name: 'Student Management', icon: Users, description: 'Manage admissions, profiles, and academic records seamlessly.' },
    { name: 'Teacher Management', icon: BookOpen, description: 'Track staff attendance, schedules, and assignments easily.' },
    { name: 'Smart Attendance', icon: UserCheck, description: 'Digital attendance tracking with instant parent notifications.' },
    { name: 'Fee Management', icon: CreditCard, description: 'Automated fee collection, receipt generation, and reminders.' },
    { name: 'Examination & Results', icon: FileText, description: 'Generate report cards, marksheets, and analyze performance.' },
    { name: 'Digital Records', icon: FileText, description: 'Replace physical files with secure, organized digital documents.' },
    { name: 'Parent Communication', icon: MessageSquare, description: 'Seamless messaging between teachers, parents, and admins.' },
    { name: 'Connected Workflow', icon: BarChart2, description: 'Actions sync across dashboards instantly, eliminating data entry.' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Header */}
      <header className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary-600 p-2 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">SchoolERP</span>
          </div>
          <nav className="hidden md:flex gap-8 font-medium text-gray-600">
            <a href="#features" className="hover:text-primary-600 transition">Features</a>
            <a href="#benefits" className="hover:text-primary-600 transition">Benefits</a>
            <a href="#pricing" className="hover:text-primary-600 transition">Pricing</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-primary-600 font-medium hover:text-primary-700 hidden md:block">Login</Link>
            <Link to="/login" className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-full font-medium transition-colors shadow-sm">
              Explore Demo
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 font-medium text-sm mb-8 border border-primary-100">
            <span className="w-2 h-2 rounded-full bg-primary-500"></span> Simple. Connected. Digital.
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8">
            Everything your school needs,<br />
            <span className="text-primary-600">in one place.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Replace registers, paper files, and manual communication. SchoolERP provides a simple, connected, and completely digital workflow that empowers teachers, delights parents, and simplifies administration.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
            <Link to="/login" className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors shadow-lg hover:shadow-xl">
              Explore Demo Dashboard
            </Link>
            <button className="bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold text-lg transition-colors">
              Talk to Sales
            </button>
          </div>
          
          <div className="relative mx-auto max-w-5xl">
            <div className="rounded-xl shadow-2xl overflow-hidden border border-gray-200 bg-gray-50">
              {/* Mock Dashboard Preview */}
              <div className="bg-gray-100 border-b border-gray-200 px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070" 
                alt="Dashboard Preview" 
                className="w-full h-auto opacity-90 object-cover object-top"
                style={{ maxHeight: '600px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">One Connected Workflow</h2>
            <p className="mt-4 text-xl text-gray-600">No more manual entry. Actions in one module instantly update everywhere else.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4 text-primary-600">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.name}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">Why choose SchoolERP?</h2>
              <div className="space-y-6">
                {[
                  'Easy for school staff to use without extensive training.',
                  'Students, attendance, fees, exams, and parents are all connected.',
                  'Digitize your paper files and stop searching through registers.',
                  'Automate fee collection with digital receipts and pending reminders.',
                  'Provide parents with complete visibility into their child\'s progress.',
                  'Get actionable insights to improve academic performance.'
                ].map((benefit, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    </div>
                    <p className="text-lg text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-xl">
                <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=2070" alt="Students in classroom" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-900 py-20 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">Ready to digitize your school?</h2>
        <p className="text-xl text-primary-200 mb-10 max-w-2xl mx-auto">Join hundreds of schools already using SchoolERP to simplify administration and empower educators.</p>
        <Link to="/login" className="inline-block bg-white text-primary-900 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-lg">
          Explore Demo Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 text-center">
        <div className="flex justify-center items-center gap-2 mb-6 text-white text-xl font-bold">
          <BookOpen className="w-6 h-6" /> SchoolERP
        </div>
        <p>© 2026 SchoolERP Demo. All rights reserved.</p>
      </footer>
    </div>
  );
}
