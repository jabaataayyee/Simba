import React from 'react';
import { RefreshCw, ArrowRightLeft } from 'lucide-react';
import { cn } from '../lib/utils';

type UnitType = 'temperature' | 'mass' | 'length';

interface Unit {
  id: string;
  label: string;
  factor?: number; // Relative to base unit
  toBase?: (val: number) => number;
  fromBase?: (val: number) => number;
}

const UNITS: Record<UnitType, Unit[]> = {
  temperature: [
    { id: 'celsius', label: 'Celsius (°C)', toBase: (v) => v, fromBase: (v) => v },
    { id: 'fahrenheit', label: 'Fahrenheit (°F)', toBase: (v) => (v - 32) * 5/9, fromBase: (v) => (v * 9/5) + 32 },
    { id: 'kelvin', label: 'Kelvin (K)', toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
  ],
  mass: [
    { id: 'gram', label: 'Gram (g)', factor: 1 },
    { id: 'kilogram', label: 'Kilogram (kg)', factor: 1000 },
    { id: 'milligram', label: 'Milligram (mg)', factor: 0.001 },
    { id: 'pound', label: 'Pound (lb)', factor: 453.592 },
    { id: 'ounce', label: 'Ounce (oz)', factor: 28.3495 },
  ],
  length: [
    { id: 'meter', label: 'Meter (m)', factor: 1 },
    { id: 'kilometer', label: 'Kilometer (km)', factor: 1000 },
    { id: 'centimeter', label: 'Centimeter (cm)', factor: 0.01 },
    { id: 'millimeter', label: 'Millimeter (mm)', factor: 0.001 },
    { id: 'mile', label: 'Mile (mi)', factor: 1609.34 },
    { id: 'inch', label: 'Inch (in)', factor: 0.0254 },
  ],
};

export function UnitConverter() {
  const [type, setType] = React.useState<UnitType>('temperature');
  const [fromUnit, setFromUnit] = React.useState('');
  const [toUnit, setToUnit] = React.useState('');
  const [value, setValue] = React.useState<string>('0');
  const [result, setResult] = React.useState<number | null>(null);

  React.useEffect(() => {
    const units = UNITS[type];
    setFromUnit(units[0].id);
    setToUnit(units[1].id);
    setResult(null);
  }, [type]);

  const convert = () => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;

    const units = UNITS[type];
    const from = units.find(u => u.id === fromUnit);
    const to = units.find(u => u.id === toUnit);

    if (!from || !to) return;

    let baseValue: number;
    if (from.toBase) {
      baseValue = from.toBase(numValue);
    } else {
      baseValue = numValue * (from.factor || 1);
    }

    let finalValue: number;
    if (to.fromBase) {
      finalValue = to.fromBase(baseValue);
    } else {
      finalValue = baseValue / (to.factor || 1);
    }

    setResult(finalValue);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Unit Converter</h3>
          <p className="text-sm text-slate-500">Quickly convert between scientific units.</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl w-fit">
          {(['temperature', 'mass', 'length'] as UnitType[]).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={cn(
                "px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                type === t ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] items-center gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">From</label>
            <div className="space-y-3">
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                {UNITS[type].map(u => (
                  <option key={u.id} value={u.id}>{u.label}</option>
                ))}
              </select>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full px-6 py-4 bg-white border-2 border-slate-100 rounded-2xl text-2xl font-bold text-slate-900 focus:border-indigo-500 outline-none transition-colors"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 shadow-inner">
              <ArrowRightLeft size={20} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">To</label>
            <div className="space-y-3">
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                {UNITS[type].map(u => (
                  <option key={u.id} value={u.id}>{u.label}</option>
                ))}
              </select>
              <div className="w-full px-6 py-4 bg-indigo-600 rounded-2xl text-2xl font-bold text-white shadow-lg shadow-indigo-100 min-h-[4rem] flex items-center">
                {result !== null ? result.toLocaleString(undefined, { maximumFractionDigits: 4 }) : '---'}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <button
            onClick={convert}
            className="flex items-center gap-3 px-12 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-200"
          >
            <RefreshCw size={20} />
            Convert Now
          </button>
        </div>
      </div>
    </div>
  );
}
