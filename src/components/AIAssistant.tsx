import React from 'react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Send, Bot, User, Sparkles, Loader2, BrainCircuit, Info } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function AIAssistant() {
  const [messages, setMessages] = React.useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm Simba, your advanced AI Tutor. I've analyzed your schedule and assignments. How can I help you excel today?" }
  ]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [streamingContent, setStreamingContent] = React.useState('');
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streamingContent]);

  const getContext = () => {
    const assignments = localStorage.getItem('hitech_assignments');
    const classes = localStorage.getItem('hitech_classes');
    const notes = localStorage.getItem('hitech_notes');
    
    return `
      Current Student Context:
      Assignments: ${assignments || 'None'}
      Classes: ${classes || 'None'}
      Recent Notes: ${notes ? JSON.parse(notes).slice(0, 3).map((n: any) => n.title).join(', ') : 'None'}
    `;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    setStreamingContent('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const context = getContext();
      
      const responseStream = await ai.models.generateContentStream({
        model: "gemini-3.1-pro-preview",
        contents: [
          { role: 'user', parts: [{ text: `${context}\n\nStudent Question: ${userMessage}` }] }
        ],
        config: {
          systemInstruction: "You are Simba, a world-class personal tutor at Hi-tech Academy. You have access to the student's assignments, schedule, and notes. Use this context to provide personalized help. Be encouraging, precise, and educational. If a student asks about their workload, refer to their assignments. If they ask for help with a topic, provide clear explanations and examples. Always aim to help them understand 'why', not just 'what'.",
        }
      });

      let fullText = '';
      for await (const chunk of responseStream) {
        const text = chunk.text;
        if (text) {
          fullText += text;
          setStreamingContent(fullText);
        }
      }

      setMessages(prev => [...prev, { role: 'assistant', content: fullText }]);
      setStreamingContent('');
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "I encountered an error while processing your request. Please try again or check your connection." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[500px]">
      <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <BrainCircuit size={18} />
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">Simba AI Tutor</h2>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <Sparkles size={10} className="text-indigo-500" />
              Powered by Gemini 3.1 Pro
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
          <Info size={12} />
          Context Aware
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={cn(
            "flex gap-4",
            msg.role === 'user' ? "flex-row-reverse" : "flex-row"
          )}>
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
              msg.role === 'user' ? "bg-slate-100 text-slate-600" : "bg-indigo-100 text-indigo-600"
            )}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={cn(
              "max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm",
              msg.role === 'user' 
                ? "bg-indigo-600 text-white rounded-tr-none" 
                : "bg-slate-50 text-slate-800 border border-slate-100 rounded-tl-none"
            )}>
              <div className="prose prose-sm max-w-none prose-slate">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        
        {streamingContent && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
              <Bot size={16} />
            </div>
            <div className="max-w-[85%] bg-slate-50 text-slate-800 border border-slate-100 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
              <div className="prose prose-sm max-w-none prose-slate">
                <ReactMarkdown>{streamingContent}</ReactMarkdown>
              </div>
            </div>
          </div>
        )}

        {isLoading && !streamingContent && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
              <Bot size={16} />
            </div>
            <div className="bg-slate-50 text-slate-800 border border-slate-100 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-2 shadow-sm">
              <Loader2 size={16} className="animate-spin text-indigo-600" />
              <span className="text-sm italic text-slate-500">Analyzing your data...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-100 bg-white">
        <div className="relative max-w-5xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about your homework, schedule, or any subject..."
            className="w-full pl-4 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-inner"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-all shadow-md active:scale-95"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-400 mt-2">
          Simba can help you manage your studies. Always verify important academic information.
        </p>
      </div>
    </div>
  );
}

