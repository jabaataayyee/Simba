import React from 'react';
import { Plus, Trash2, Clock, MapPin } from 'lucide-react';
import { ClassSession } from '../types';
import { cn } from '../lib/utils';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const HOURS = Array.from({ length: 13 }, (_, i) => i + 8); // 8 AM to 8 PM

export function Timetable() {
  const [classes, setClasses] = React.useState<ClassSession[]>(() => {
    const saved = localStorage.getItem('hitech_classes');
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdding, setIsAdding] = React.useState(false);
  const [newSubject, setNewSubject] = React.useState('');
  const [newRoom, setNewRoom] = React.useState('');
  const [newDay, setNewDay] = React.useState(0);
  const [newStart, setNewStart] = React.useState('09:00');
  const [newEnd, setNewEnd] = React.useState('10:00');

  React.useEffect(() => {
    localStorage.setItem('hitech_classes', JSON.stringify(classes));
  }, [classes]);

  const addClass = () => {
    if (!newSubject || !newRoom) return;
    
    const session: ClassSession = {
      id: crypto.randomUUID(),
      subject: newSubject,
      room: newRoom,
      day: newDay,
      startTime: newStart,
      endTime: newEnd,
      color: ['bg-indigo-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-violet-500', 'bg-sky-500'][Math.floor(Math.random() * 6)],
    };

    setClasses([...classes, session]);
    setNewSubject('');
    setNewRoom('');
    setIsAdding(false);
  };

  const deleteClass = (id: string) => {
    setClasses(classes.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Weekly Timetable</h2>
          <p className="text-slate-500">Your class schedule at a glance.</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus size={20} />
          Add Class
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 w-full">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Subject</label>
              <input
                type="text"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                placeholder="e.g. Physics"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Room</label>
              <input
                type="text"
                value={newRoom}
                onChange={(e) => setNewRoom(e.target.value)}
                placeholder="e.g. Lab 302"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Day</label>
              <select
                value={newDay}
                onChange={(e) => setNewDay(parseInt(e.target.value))}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {DAYS.map((day, idx) => (
                  <option key={day} value={idx}>{day}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Start</label>
                <input
                  type="time"
                  value={newStart}
                  onChange={(e) => setNewStart(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">End</label>
                <input
                  type="time"
                  value={newEnd}
                  onChange={(e) => setNewEnd(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={addClass}
              className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Save Class
            </button>
          </div>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-8 border-b border-slate-100">
            <div className="p-4 border-r border-slate-100"></div>
            {DAYS.map(day => (
              <div key={day} className="p-4 text-center border-r border-slate-100 last:border-r-0">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{day.slice(0, 3)}</span>
              </div>
            ))}
          </div>

          <div className="relative">
            {HOURS.map(hour => (
              <div key={hour} className="grid grid-cols-8 border-b border-slate-50 last:border-b-0 h-20">
                <div className="p-2 border-r border-slate-100 text-[10px] font-bold text-slate-400 text-right pr-4 pt-0 -mt-2">
                  {hour}:00
                </div>
                {DAYS.map((_, dayIdx) => (
                  <div key={dayIdx} className="border-r border-slate-50 last:border-r-0 relative">
                    {classes
                      .filter(c => c.day === dayIdx && parseInt(c.startTime.split(':')[0]) === hour)
                      .map(c => {
                        const startMin = parseInt(c.startTime.split(':')[1]);
                        const endHour = parseInt(c.endTime.split(':')[0]);
                        const endMin = parseInt(c.endTime.split(':')[1]);
                        const durationHrs = (endHour + endMin/60) - (hour + startMin/60);
                        
                        return (
                          <div
                            key={c.id}
                            style={{ 
                              top: `${(startMin / 60) * 100}%`,
                              height: `${durationHrs * 100}%`
                            }}
                            className={cn(
                              "absolute inset-x-1 z-10 p-2 rounded-lg text-white shadow-sm group transition-all hover:scale-[1.02]",
                              c.color
                            )}
                          >
                            <div className="flex justify-between items-start">
                              <h4 className="text-[10px] font-bold truncate leading-tight">{c.subject}</h4>
                              <button 
                                onClick={() => deleteClass(c.id)}
                                className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-white/20 rounded transition-opacity"
                              >
                                <Trash2 size={10} />
                              </button>
                            </div>
                            <div className="flex items-center gap-1 text-[8px] opacity-90 mt-0.5">
                              <MapPin size={8} />
                              {c.room}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
