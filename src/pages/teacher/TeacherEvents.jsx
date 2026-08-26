import { ArrowLeft, Calendar, MapPin, Clock } from 'lucide-react';
import { eventsList, holidaysList } from '../../data/teacherMockData';
import { useNavigate } from 'react-router-dom';

export default function TeacherEvents() {
  const navigate = useNavigate();

  const getCategoryColor = (type) => {
    switch (type) {
      case 'Celebration': return 'bg-purple-100 text-purple-700';
      case 'Academic': return 'bg-blue-100 text-blue-700';
      case 'Staff': return 'bg-orange-100 text-orange-700';
      case 'Sports': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-20 relative">
      <div className="bg-white px-4 py-4 shadow-sm z-10 sticky top-0 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-black text-gray-900 text-lg">Events & Holidays</h1>
      </div>

      <div className="p-4 space-y-6">
        
        {/* Events Section */}
        <section>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Calendar size={16} /> Upcoming Events
          </h2>
          <div className="space-y-3">
            {eventsList.map(event => (
              <div key={event.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900 text-base leading-tight">{event.title}</h3>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shrink-0 ml-2 ${getCategoryColor(event.type)}`}>
                    {event.type}
                  </span>
                </div>
                
                <div className="flex flex-col gap-1.5 mt-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                    <Calendar size={14} className="text-primary-500" />
                    <span>{event.date} • {event.day}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                    <Clock size={14} className="text-primary-500" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                    <MapPin size={14} className="text-primary-500" />
                    <span>{event.venue}</span>
                  </div>
                </div>
                
                {event.note && (
                  <div className="mt-3 bg-gray-50 p-2.5 rounded-xl border border-gray-100 text-xs font-semibold text-gray-700">
                    {event.note}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Holidays Section */}
        <section>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 mt-8">
            Upcoming Holidays
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {holidaysList.map((holiday, idx) => (
              <div 
                key={holiday.id} 
                className={`p-4 flex items-center gap-4 ${idx !== holidaysList.length - 1 ? 'border-b border-gray-50' : ''}`}
              >
                <div className="bg-red-50 w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0 border border-red-100">
                  <span className="text-lg font-black text-red-600 leading-none">{holiday.date.split(' ')[0]}</span>
                  <span className="text-[10px] font-bold text-red-400 mt-0.5 uppercase tracking-wider">{holiday.date.split(' ')[1]}</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 leading-tight">{holiday.title}</h3>
                  <p className="text-xs text-gray-500 font-bold mt-1 uppercase tracking-wider">{holiday.day}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
