export type Priority = 'low' | 'medium' | 'high';

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  priority: Priority;
  completed: boolean;
  notes?: string;
}

export interface ClassSession {
  id: string;
  subject: string;
  room: string;
  day: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  color: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
}

export type View = 'dashboard' | 'timetable' | 'assignments' | 'ai-assistant' | 'notes' | 'library' | 'science-lab' | 'about';
