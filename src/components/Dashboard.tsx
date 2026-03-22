import React from 'react';
import { 
  Calendar, 
  CheckSquare, 
  Clock, 
  BookOpen, 
  ChevronRight,
  TrendingUp,
  Award,
  AlertCircle,
  Beaker,
  Info
} from 'lucide-react';
import { Assignment, ClassSession, View } from '../types';
import { format, isToday, isTomorrow, parseISO } from 'date-fns';
import { cn } from '../lib/utils';

interface DashboardProps {
  onViewChange: (view: View) => void;
}

export function Dashboard({ onViewChange }: DashboardProps) {
  const [assignments] = React.useState<Assignment[]>(() => {
    const saved = localStorage.getItem('hitech_assignments');
    return saved ? JSON.parse(saved) : [];
  });

  const [classes] = React.useState<ClassSession[]>(() => {
    const saved = localStorage.getItem('hitech_classes');
    return saved ? JSON.parse(saved) : [];
  });

  const today = new Date().getDay() - 1; // Adjust for Monday start
  const todayClasses = classes
    .filter(c => c.day === (today < 0 ? 6 : today))
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const upcomingAssignments = assignments
    .filter(a => !a.completed)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 3);

  const stats = [
    { label: 'Assignments', value: assignments.filter(a => !a.completed).length, icon: CheckSquare, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Classes Today', value: todayClasses.length, icon: Calendar, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Science Lab', value: 'New!', icon: Beaker, color: 'text-emerald-600', bg: 'bg-emerald-50', onClick: () => onViewChange('science-lab') },
    { label: 'GPA', value: '3.8', icon: Award, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Welcome back, Student!</h2>
          <p className="text-slate-500 mt-1">Here's what's happening today, {format(new Date(), 'EEEE, MMMM do')}.</p>
        </div>
        <button 
          onClick={() => onViewChange('about')}
          className="hidden md:flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
        >
          <Info size={18} className="text-indigo-600" />
          About Academy
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div 
            key={stat.label} 
            onClick={stat.onClick}
            className={cn(
              "bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 transition-all",
              stat.onClick && "cursor-pointer hover:border-emerald-300 hover:shadow-md active:scale-95"
            )}
          >
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", stat.bg)}>
              <stat.icon className={stat.color} size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calendar size={20} className="text-indigo-600" />
              Today's Schedule
            </h3>
            <button 
              onClick={() => onViewChange('timetable')}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              View Full Timetable <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {todayClasses.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-slate-500 text-sm">No classes scheduled for today. Enjoy your break!</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {todayClasses.map((c) => (
                  <div key={c.id} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                    <div className="w-16 text-center">
                      <p className="text-xs font-bold text-slate-900">{c.startTime}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">{c.endTime}</p>
                    </div>
                    <div className={cn("w-1.5 h-10 rounded-full", c.color)} />
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900">{c.subject}</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <TrendingUp size={12} />
                        Room {c.room}
                      </p>
                    </div>
                    <div className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      In 2 hours
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <AlertCircle size={20} className="text-amber-600" />
              Deadlines
            </h3>
            <button 
              onClick={() => onViewChange('assignments')}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              All Tasks <ChevronRight size={16} />
            </button>
          </div>

          <div className="space-y-3">
            {upcomingAssignments.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-300">
                <p className="text-slate-400 text-sm italic">All caught up!</p>
              </div>
            ) : (
              upcomingAssignments.map((a) => (
                <div key={a.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{a.subject}</span>
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase",
                      a.priority === 'high' ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"
                    )}>
                      {a.priority}
                    </span>
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-1">{a.title}</h4>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock size={12} />
                    Due {format(parseISO(a.dueDate), 'MMM d')}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
