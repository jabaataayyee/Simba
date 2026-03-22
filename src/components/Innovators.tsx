import React from 'react';
import { motion } from 'motion/react';

const INNOVATORS = [
  {
    name: 'Albert Einstein',
    role: 'Theoretical Physicist',
    story: 'Developed the theory of relativity and the famous equation E=mc², fundamentally changing our understanding of space and time.',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=400',
    color: 'border-blue-200'
  },
  {
    name: 'Marie Curie',
    role: 'Physicist & Chemist',
    story: 'A pioneer in radioactivity research and the first person to win Nobel Prizes in two different scientific fields.',
    image: 'https://images.unsplash.com/photo-1579154235828-4519e39f181d?auto=format&fit=crop&q=80&w=400',
    color: 'border-emerald-200'
  },
  {
    name: 'Isaac Newton',
    role: 'Mathematician & Physicist',
    story: 'Formulated the laws of motion and universal gravitation, laying the foundation for classical mechanics and calculus.',
    image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=400',
    color: 'border-amber-200'
  },
  {
    name: 'Richard Feynman',
    role: 'Quantum Physicist',
    story: 'Known for his work in quantum electrodynamics and his ability to explain complex scientific concepts with infectious enthusiasm.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400',
    color: 'border-indigo-200'
  }
];

export function Innovators() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {INNOVATORS.map((innovator, idx) => (
        <motion.div
          key={innovator.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className={`bg-white rounded-[2.5rem] overflow-hidden border ${innovator.color} shadow-sm hover:shadow-xl transition-all group`}
        >
          <div className="h-48 overflow-hidden relative">
            <img 
              src={innovator.image} 
              alt={innovator.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-6">
              <p className="text-white font-black text-lg leading-tight">{innovator.name}</p>
              <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest">{innovator.role}</p>
            </div>
          </div>
          <div className="p-6">
            <p className="text-slate-600 text-sm leading-relaxed italic">
              "{innovator.story}"
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
