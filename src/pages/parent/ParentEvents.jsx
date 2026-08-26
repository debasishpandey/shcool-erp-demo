import { ArrowLeft, Calendar, MapPin, Clock, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { parentEvents, parentHolidays } from '../../data/parentMockData';

export default function ParentEvents() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-20 relative">
      <div className="bg-white px-4 py-4 shadow-sm z-10 sticky top-0 border-b border-gray-100 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-black text-gray-900 text-lg">Events & Holidays</h1>
      </div>

      <div className="p-4 space-y-6">
        
        {/* Events */}
        <section>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Upcoming Events</h2>
          <div className="space-y-3">
            {parentEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex flex-col items-center justify-center shrink-0 border border-blue-100">
                    <span className="font-black text-lg leading-none">{event.date.split(' ')[0]}</span>
                    <span className="text-[10px] font-bold uppercase mt-0.5">{event.date.split(' ')[1]}</span>
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 text-base leading-tight mb-2">{event.title}</h3>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                        <Clock size={14} className="text-gray-400" /> {event.time}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                        <MapPin size={14} className="text-gray-400" /> {event.venue}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Holidays */}
        <section>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Upcoming Holidays</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {parentHolidays.map((holiday, idx) => (
              <div key={holiday.id} className={`p-4 flex items-center gap-4 ${idx !== parentHolidays.length - 1 ? 'border-b border-gray-50' : ''}`}>
                <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex flex-col items-center justify-center shrink-0">
                  <span className="text-[10px] font-black uppercase tracking-wider">{holiday.date.split(' ')[1]}</span>
                  <span className="font-black leading-none">{holiday.date.split(' ')[0]}</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 leading-tight">{holiday.title}</h3>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-0.5">School Holiday</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
