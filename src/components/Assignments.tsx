import React from 'react';
import { Plus, Trash2, CheckCircle2, Circle, Clock, CheckSquare, BookOpen } from 'lucide-react';
import { Assignment, Priority } from '../types';
import { cn } from '../lib/utils';
import { format } from 'date-fns';

export function Assignments() {
  const [assignments, setAssignments] = React.useState<Assignment[]>(() => {
    const saved = localStorage.getItem('hitech_assignments');
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdding, setIsAdding] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState('');
  const [newSubject, setNewSubject] = React.useState('');
  const [newDueDate, setNewDueDate] = React.useState('');
  const [newPriority, setNewPriority] = React.useState<Priority>('medium');

  React.useEffect(() => {
    localStorage.setItem('hitech_assignments', JSON.stringify(assignments));
  }, [assignments]);

  const addAssignment = () => {
    if (!newTitle || !newSubject || !newDueDate) return;
    
    const assignment: Assignment = {
      id: crypto.randomUUID(),
      title: newTitle,
      subject: newSubject,
      dueDate: newDueDate,
      priority: newPriority,
      completed: false,
    };

    setAssignments([assignment, ...assignments]);
    setNewTitle('');
    setNewSubject('');
    setNewDueDate('');
    setNewPriority('medium');
    setIsAdding(false);
  };

  const toggleComplete = (id: string) => {
    setAssignments(assignments.map(a => 
      a.id === id ? { ...a, completed: !a.completed } : a
    ));
  };

  const deleteAssignment = (id: string) => {
    setAssignments(assignments.filter(a => a.id !== id));
  };

  const priorityColors = {
    low: 'bg-blue-50 text-blue-700 border-blue-100',
    medium: 'bg-amber-50 text-amber-700 border-amber-100',
    high: 'bg-red-50 text-red-700 border-red-100',
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Assignments</h2>
          <p className="text-slate-500">Keep track of your homework and projects.</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus size={20} />
          New Assignment
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Math Homework"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Subject</label>
              <input
                type="text"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                placeholder="e.g. Mathematics"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Due Date</label>
              <input
                type="date"
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Priority</label>
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value as Priority)}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
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
              onClick={addAssignment}
              className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Add Assignment
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {assignments.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckSquare size={24} className="text-slate-400" />
            </div>
            <p className="text-slate-500 text-sm">No assignments yet. Add one to get started!</p>
          </div>
        ) : (
          assignments.map((assignment) => (
            <div
              key={assignment.id}
              className={cn(
                "group flex items-center gap-4 p-4 bg-white border rounded-2xl transition-all duration-200",
                assignment.completed ? "border-slate-100 opacity-60" : "border-slate-200 hover:border-indigo-200 hover:shadow-sm"
              )}
            >
              <button
                onClick={() => toggleComplete(assignment.id)}
                className={cn(
                  "shrink-0 transition-colors",
                  assignment.completed ? "text-indigo-600" : "text-slate-300 hover:text-indigo-400"
                )}
              >
                {assignment.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={cn(
                    "font-semibold text-slate-900 truncate",
                    assignment.completed && "line-through"
                  )}>
                    {assignment.title}
                  </h3>
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                    priorityColors[assignment.priority]
                  )}>
                    {assignment.priority}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <BookOpen size={12} />
                    {assignment.subject}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    Due {format(new Date(assignment.dueDate), 'MMM d, yyyy')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => deleteAssignment(assignment.id)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
