import React from 'react';
import { Plus, Trash2, Search, FileText, Clock } from 'lucide-react';
import { Note } from '../types';
import { cn } from '../lib/utils';
import { format } from 'date-fns';

export function Notes() {
  const [notes, setNotes] = React.useState<Note[]>(() => {
    const saved = localStorage.getItem('hitech_notes');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeNoteId, setActiveNoteId] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');

  const activeNote = notes.find(n => n.id === activeNoteId);

  React.useEffect(() => {
    localStorage.setItem('hitech_notes', JSON.stringify(notes));
  }, [notes]);

  const createNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: 'Untitled Note',
      content: '',
      updatedAt: Date.now(),
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(notes.map(n => 
      n.id === id ? { ...n, ...updates, updatedAt: Date.now() } : n
    ));
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
    if (activeNoteId === id) setActiveNoteId(null);
  };

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[500px]">
      {/* Sidebar */}
      <div className="w-80 border-r border-slate-100 flex flex-col bg-slate-50/50">
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-900">My Notes</h2>
            <button
              onClick={createNote}
              className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus size={18} />
            </button>
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              onClick={() => setActiveNoteId(note.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActiveNoteId(note.id);
                }
              }}
              role="button"
              tabIndex={0}
              className={cn(
                "w-full text-left p-3 rounded-xl transition-all group cursor-pointer outline-none",
                activeNoteId === note.id 
                  ? "bg-white shadow-sm border border-slate-200 ring-1 ring-indigo-500/10" 
                  : "hover:bg-white/50"
              )}
            >
              <h3 className="font-semibold text-slate-900 text-sm truncate mb-1">{note.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-2 mb-2">
                {note.content || 'No content yet...'}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Clock size={10} />
                  {format(note.updatedAt, 'MMM d, h:mm a')}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNote(note.id);
                  }}
                  className="p-1 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col bg-white">
        {activeNote ? (
          <>
            <div className="p-6 border-b border-slate-50">
              <input
                type="text"
                value={activeNote.title}
                onChange={(e) => updateNote(activeNote.id, { title: e.target.value })}
                className="w-full text-2xl font-bold text-slate-900 focus:outline-none placeholder:text-slate-300"
                placeholder="Note Title"
              />
            </div>
            <textarea
              value={activeNote.content}
              onChange={(e) => updateNote(activeNote.id, { content: e.target.value })}
              className="flex-1 p-6 text-slate-700 focus:outline-none resize-none leading-relaxed placeholder:text-slate-300"
              placeholder="Start writing your notes here..."
            />
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 space-y-4">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
              <FileText size={32} />
            </div>
            <div className="text-center">
              <p className="font-medium">No note selected</p>
              <p className="text-sm">Select a note from the sidebar or create a new one.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
