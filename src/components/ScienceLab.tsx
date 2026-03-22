import React from 'react';
import { Beaker, FlaskConical, Atom, Ruler, Globe, GraduationCap } from 'lucide-react';
import { cn } from '../lib/utils';
import { PeriodicTable } from './PeriodicTable';
import { UnitConverter } from './UnitConverter';
import { SpaceExplorer } from './SpaceExplorer';
import { Innovators } from './Innovators';

type LabTool = 'periodic-table' | 'unit-converter' | 'space-explorer' | 'innovators';

export function ScienceLab() {
  const [activeTool, setActiveTool] = React.useState<LabTool>('periodic-table');

  const tools = [
    { id: 'periodic-table', label: 'Periodic Table', icon: Atom, description: 'Interactive element explorer' },
    { id: 'unit-converter', label: 'Unit Converter', icon: Ruler, description: 'Scientific unit conversions' },
    { id: 'space-explorer', label: 'Space Explorer', icon: Globe, description: 'Journey through the Solar System' },
    { id: 'innovators', label: 'Innovators', icon: GraduationCap, description: 'Pioneers of Physics' },
  ] as const;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
              <Beaker size={24} />
            </div>
            Science Lab
          </h2>
          <p className="text-slate-500 mt-1">Interactive tools for your scientific exploration.</p>
        </div>

        <div className="flex items-center gap-3 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-sm">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all",
                activeTool === tool.id 
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-100" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
              )}
            >
              <tool.icon size={16} />
              {tool.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {activeTool === 'periodic-table' && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <PeriodicTable />
          </div>
        )}
        {activeTool === 'unit-converter' && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <UnitConverter />
          </div>
        )}
        {activeTool === 'space-explorer' && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <SpaceExplorer />
          </div>
        )}
        {activeTool === 'innovators' && (
          <div className="animate-in fade-in zoom-in-95 duration-500 space-y-8">
            <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Physics Pioneers</h3>
              <p className="text-slate-500 mb-8 text-lg">Discover the brilliant minds who revolutionized our understanding of the universe.</p>
              <Innovators />
            </div>
          </div>
        )}
      </div>

      {/* Lab Footer Info */}
      <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-3xl flex items-start gap-4">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
          <FlaskConical size={24} />
        </div>
        <div>
          <h4 className="font-bold text-emerald-900">Did you know?</h4>
          <p className="text-sm text-emerald-700 leading-relaxed mt-1">
            The Periodic Table is organized by atomic number, which is the number of protons in an atom's nucleus. 
            This structure reveals periodic trends in the properties of elements, making it the most important tool in chemistry!
          </p>
        </div>
      </div>
    </div>
  );
}
