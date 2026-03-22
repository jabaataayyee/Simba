/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Timetable } from './components/Timetable';
import { Assignments } from './components/Assignments';
import { Library } from './components/Library';
import { AIAssistant } from './components/AIAssistant';
import { Notes } from './components/Notes';
import { ScienceLab } from './components/ScienceLab';
import { About } from './components/About';
import { View } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentView, setCurrentView] = React.useState<View>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onViewChange={setCurrentView} />;
      case 'timetable':
        return <Timetable />;
      case 'assignments':
        return <Assignments />;
      case 'notes':
        return <Notes />;
      case 'library':
        return <Library />;
      case 'science-lab':
        return <ScienceLab />;
      case 'ai-assistant':
        return <AIAssistant />;
      case 'about':
        return <About />;
      default:
        return <Dashboard onViewChange={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-[100dvh] bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

