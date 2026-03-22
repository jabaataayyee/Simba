import React from 'react';
import { 
  GraduationCap, 
  Rocket, 
  Target, 
  Users, 
  Globe, 
  Cpu, 
  ShieldCheck,
  Zap,
  MapPin
} from 'lucide-react';
import { motion } from 'motion/react';
import { Innovators } from './Innovators';

export function About() {
  const stats = [
    { label: 'Students', value: '5,000+', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Courses', value: '120+', icon: GraduationCap, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Global Reach', value: '45+', icon: Globe, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Success Rate', value: '98%', icon: Target, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  const features = [
    {
      title: 'Advanced AI Tutoring',
      description: 'Personalized learning paths powered by the latest artificial intelligence models, adapting to your unique pace and style.',
      icon: Cpu,
      color: 'bg-indigo-600'
    },
    {
      title: 'Interactive Labs',
      description: 'Hands-on experience with virtual science labs, space exploration tools, and real-time data analysis.',
      icon: Zap,
      color: 'bg-emerald-600'
    },
    {
      title: 'Secure Learning',
      description: 'Your data and progress are protected with enterprise-grade security, ensuring a safe environment for all students.',
      icon: ShieldCheck,
      color: 'bg-blue-600'
    },
    {
      title: 'Future-Ready Skills',
      description: 'Curriculum designed by industry experts to prepare you for the high-tech careers of tomorrow.',
      icon: Rocket,
      color: 'bg-amber-600'
    }
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-[3rem] bg-slate-900 text-white p-8 md:p-16">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 blur-[100px] -mr-48 -mt-48 rounded-full" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 blur-[100px] -ml-48 -mb-48 rounded-full" />
        
        <div className="relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest border border-white/10 mb-6 inline-block">
              Empowering the Next Generation
            </span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none">
              Hi Tech <span className="text-indigo-400">Academy.</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
              We are more than just an educational platform. We are a digital ecosystem designed to accelerate human potential through technology, innovation, and community.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center text-center gap-3"
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg}`}>
              <stat.icon className={stat.color} size={24} />
            </div>
            <div>
              <p className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mission Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h3 className="text-3xl font-bold text-slate-900 tracking-tight">Our Mission</h3>
          <p className="text-slate-600 leading-relaxed text-lg">
            At Hi Tech Academy, we believe that quality education should be accessible, interactive, and aligned with the rapidly evolving technological landscape. Our mission is to provide students with the tools they need to not just learn, but to master the skills that will shape the future.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-600">
                <Target size={20} />
              </div>
              <p className="font-semibold text-slate-700">Personalized Learning Experience</p>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-emerald-600">
                <Globe size={20} />
              </div>
              <p className="font-semibold text-slate-700">Global Community of Learners</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000" 
              alt="Technology and Education" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-indigo-600 rounded-3xl p-6 text-white shadow-xl flex flex-col justify-end">
            <p className="text-4xl font-black mb-1">#1</p>
            <p className="text-xs font-bold uppercase tracking-widest opacity-80">Tech Academy 2026</p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold text-slate-900 tracking-tight">Why Choose Us?</h3>
          <p className="text-slate-500 mt-2">We combine cutting-edge technology with proven pedagogical methods.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-md transition-all group"
            >
              <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                <feature.icon size={28} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h4>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Innovators Section */}
      <div className="space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="px-4 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-widest border border-indigo-100 mb-4 inline-block">
            Inspirational Figures
          </span>
          <h3 className="text-3xl font-bold text-slate-900 tracking-tight">Pioneers of Innovation</h3>
          <p className="text-slate-500 mt-2">Learn from the giants whose shoulders we stand upon to build the future.</p>
        </div>

        <Innovators />
      </div>

      {/* Map Section */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center justify-center gap-3">
            <MapPin className="text-rose-600" size={32} />
            Visit Our Campus
          </h3>
          <p className="text-slate-500 mt-2">Located in the heart of the technology district, our campus is designed for innovation and collaboration.</p>
        </div>
        <div className="rounded-[3rem] overflow-hidden border border-slate-200 shadow-xl bg-white p-4">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.639290622367!2d-122.08374688469247!3d37.42199987982519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fba02425dad8f%3A0x6c296c66619367e0!2sGoogleplex!5e0!3m2!1sen!2sus!4v1647950000000!5m2!1sen!2sus" 
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-[2.5rem]"
          ></iframe>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-indigo-600 rounded-[3rem] p-12 text-center text-white">
        <h3 className="text-3xl font-bold mb-4">Ready to start your journey?</h3>
        <p className="text-indigo-100 mb-8 max-w-xl mx-auto">Join thousands of students who are already mastering the future at Hi Tech Academy.</p>
        <button className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold hover:bg-indigo-50 transition-colors shadow-xl shadow-indigo-900/20">
          Get Started Today
        </button>
      </div>
    </div>
  );
}
