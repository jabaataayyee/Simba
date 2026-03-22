import React from 'react';
import { Book, Download, ExternalLink, Search, Filter, Bookmark } from 'lucide-react';
import { cn } from '../lib/utils';

interface Textbook {
  id: string;
  title: string;
  subject: string;
  description: string;
  coverColor: string;
  pages: number;
  downloadUrl: string;
}

const GRADE_9_BOOKS: Textbook[] = [
  { id: 'math-9', title: 'Mathematics Grade 9', subject: 'Mathematics', description: 'Comprehensive guide to algebra, geometry, and statistics for grade 9 students.', coverColor: 'bg-indigo-600', pages: 342, downloadUrl: 'https://ethiopianteachers.com/textbooks/grade9/math_g9.pdf' },
  { id: 'phys-9', title: 'Physics Grade 9', subject: 'Physics', description: 'Introduction to mechanics, energy, and waves.', coverColor: 'bg-blue-600', pages: 280, downloadUrl: 'https://ethiopianteachers.com/textbooks/grade9/physics_g9.pdf' },
  { id: 'chem-9', title: 'Chemistry Grade 9', subject: 'Chemistry', description: 'Exploring matter, atomic structure, and chemical bonding.', coverColor: 'bg-emerald-600', pages: 265, downloadUrl: 'https://ethiopianteachers.com/textbooks/grade9/chemistry_g9.pdf' },
  { id: 'bio-9', title: 'Biology Grade 9', subject: 'Biology', description: 'Study of living organisms, cells, and ecosystems.', coverColor: 'bg-green-600', pages: 310, downloadUrl: 'https://ethiopianteachers.com/textbooks/grade9/biology_g9.pdf' },
  { id: 'eng-9', title: 'English Grade 9', subject: 'English', description: 'Developing language skills through literature and grammar.', coverColor: 'bg-rose-600', pages: 240, downloadUrl: 'https://ethiopianteachers.com/textbooks/grade9/english_g9.pdf' },
  { id: 'amh-9', title: 'Amharic Grade 9', subject: 'Amharic', description: 'Advanced Amharic language and literature study.', coverColor: 'bg-red-600', pages: 220, downloadUrl: 'https://ethiopianteachers.com/textbooks/grade9/amharic_g9.pdf' },
  { id: 'geo-9', title: 'Geography Grade 9', subject: 'Geography', description: 'Physical and human geography of Ethiopia and the world.', coverColor: 'bg-amber-600', pages: 295, downloadUrl: 'https://ethiopianteachers.com/textbooks/grade9/geography_g9.pdf' },
  { id: 'hist-9', title: 'History Grade 9', subject: 'History', description: 'World history and Ethiopian history from ancient to modern times.', coverColor: 'bg-orange-600', pages: 275, downloadUrl: 'https://ethiopianteachers.com/textbooks/grade9/history_g9.pdf' },
  { id: 'cit-9', title: 'Citizenship Education Grade 9', subject: 'Citizenship', description: 'Understanding rights, responsibilities, and democratic values.', coverColor: 'bg-violet-600', pages: 180, downloadUrl: 'https://ethiopianteachers.com/textbooks/grade9/citizenship_g9.pdf' },
  { id: 'it-9', title: 'Information Technology Grade 9', subject: 'IT', description: 'Introduction to computer systems, software, and basic programming.', coverColor: 'bg-slate-700', pages: 210, downloadUrl: 'https://ethiopianteachers.com/textbooks/grade9/it_g9.pdf' },
  { id: 'econ-9', title: 'Economics Grade 9', subject: 'Economics', description: 'Basic principles of micro and macroeconomics.', coverColor: 'bg-teal-600', pages: 195, downloadUrl: 'https://ethiopianteachers.com/textbooks/grade9/economics_g9.pdf' },
  { id: 'bus-9', title: 'Business Studies Grade 9', subject: 'Business', description: 'Introduction to business management and entrepreneurship.', coverColor: 'bg-cyan-600', pages: 205, downloadUrl: 'https://ethiopianteachers.com/textbooks/grade9/business_g9.pdf' },
  { id: 'test-book', title: 'Test Connection Book', subject: 'Test', description: 'A sample PDF to verify that the download system is working correctly.', coverColor: 'bg-slate-400', pages: 1, downloadUrl: 'https://www.africau.edu/images/default/sample.pdf' },
];

export function Library() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedSubject, setSelectedSubject] = React.useState<string | null>(null);
  const [bookToDownload, setBookToDownload] = React.useState<Textbook | null>(null);

  const subjects = Array.from(new Set(GRADE_9_BOOKS.map(b => b.subject)));

  const filteredBooks = GRADE_9_BOOKS.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          book.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = !selectedSubject || book.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="space-y-8">
      {/* Download Confirmation Modal */}
      {bookToDownload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mb-6 mx-auto">
              <Download className="text-indigo-600" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 text-center mb-2">Confirm Download</h3>
            <p className="text-slate-500 text-center mb-8 leading-relaxed">
              Are you sure you want to download <span className="font-bold text-slate-900">"{bookToDownload.title}"</span>? 
              This will start a PDF download for your offline study.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setBookToDownload(null)}
                className="flex-1 px-6 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all active:scale-95"
              >
                Cancel
              </button>
              <a 
                href={`/api/download-book?url=${encodeURIComponent(bookToDownload.downloadUrl)}&filename=${encodeURIComponent(bookToDownload.title + '.pdf')}`}
                onClick={() => setBookToDownload(null)}
                className="flex-1 px-6 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all text-center shadow-lg shadow-indigo-200 active:scale-95"
              >
                Download Now
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Digital Library</h2>
          <p className="text-slate-500 mt-1">Grade 9 Ethiopian National Curriculum Textbooks</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search textbooks..."
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64 shadow-sm"
            />
          </div>
          <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        <button
          onClick={() => setSelectedSubject(null)}
          className={cn(
            "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap",
            !selectedSubject ? "bg-indigo-600 text-white shadow-md" : "bg-white text-slate-600 border border-slate-200 hover:border-indigo-300"
          )}
        >
          All Subjects
        </button>
        {subjects.map(subject => (
          <button
            key={subject}
            onClick={() => setSelectedSubject(subject)}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap",
              selectedSubject === subject ? "bg-indigo-600 text-white shadow-md" : "bg-white text-slate-600 border border-slate-200 hover:border-indigo-300"
            )}
          >
            {subject}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <div key={book.id} className="group bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className={cn("h-48 flex items-center justify-center relative overflow-hidden", book.coverColor)}>
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Book size={64} className="text-white/40 group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="px-2 py-1 bg-white/20 backdrop-blur-md rounded text-[10px] font-bold text-white uppercase tracking-widest">
                  Grade 9
                </span>
              </div>
              <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-lg text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/40">
                <Bookmark size={16} />
              </button>
            </div>
            
            <div className="p-5 space-y-3">
              <div>
                <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{book.title}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{book.description}</p>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                <span className="text-[10px] font-bold text-slate-400 uppercase">{book.pages} Pages</span>
                <div className="flex items-center gap-2">
                  <a 
                    href={book.downloadUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" 
                    title="View Online"
                  >
                    <ExternalLink size={16} />
                  </a>
                  <button 
                    onClick={() => setBookToDownload(book)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-all shadow-sm active:scale-95"
                  >
                    <Download size={14} />
                    PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
          <Book size={48} className="mx-auto text-slate-200 mb-4" />
          <h3 className="text-lg font-bold text-slate-900">No books found</h3>
          <p className="text-slate-500">Try adjusting your search or filter to find what you're looking for.</p>
        </div>
      )}
    </div>
  );
}
