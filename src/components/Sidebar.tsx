import React from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  CheckSquare, 
  MessageSquare, 
  BookOpen,
  Settings,
  LogOut,
  GraduationCap,
  ChevronLeft,
  Menu,
  Beaker,
  Info
} from 'lucide-react';
import { cn } from '../lib/utils';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'timetable', label: 'Timetable', icon: Calendar },
  { id: 'assignments', label: 'Assignments', icon: CheckSquare },
  { id: 'library', label: 'Library', icon: BookOpen },
  { id: 'science-lab', label: 'Science Lab', icon: Beaker },
  { id: 'notes', label: 'Notes', icon: BookOpen },
  { id: 'ai-assistant', label: 'Simba AI', icon: MessageSquare },
  { id: 'about', label: 'About', icon: Info },
] as const;

export function Sidebar({ currentView, onViewChange, isCollapsed, onToggleCollapse }: SidebarProps) {
  return (
    <aside className={cn(
      "bg-white border-r border-slate-200 flex flex-col h-full sticky top-0 transition-all duration-300 ease-in-out z-20",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div className={cn(
        "p-6 flex items-center justify-between",
        isCollapsed && "px-4"
      )}>
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shrink-0">
            <GraduationCap size={24} />
          </div>
          {!isCollapsed && (
            <h1 className="font-bold text-xl tracking-tight text-slate-900 whitespace-nowrap">Hi Tech Academy</h1>
          )}
        </div>
        <button 
          onClick={onToggleCollapse}
          className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors"
        >
          {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as View)}
            title={isCollapsed ? item.label : undefined}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
              currentView === item.id
                ? "bg-indigo-50 text-indigo-700 shadow-sm"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
              isCollapsed && "justify-center px-0"
            )}
          >
            <item.icon size={20} className={cn(
              currentView === item.id ? "text-indigo-600" : "text-slate-400"
            )} />
            {!isCollapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button className={cn(
          "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors",
          isCollapsed && "justify-center px-0"
        )}>
          <Settings size={20} className="text-slate-400" />
          {!isCollapsed && <span>Settings</span>}
        </button>
        <button className={cn(
          "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors mt-1",
          isCollapsed && "justify-center px-0"
        )}>
          <LogOut size={20} className="text-red-400" />
          {!isCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
