import React from 'react';
import { cn } from '../lib/utils';
import { Info, X } from 'lucide-react';

interface Element {
  number: number;
  symbol: string;
  name: string;
  mass: number;
  category: string;
  x: number;
  y: number;
  details?: string;
}

const ELEMENTS: Element[] = [
  { number: 1, symbol: 'H', name: 'Hydrogen', mass: 1.008, category: 'nonmetal', x: 1, y: 1, details: 'The most abundant chemical substance in the Universe.' },
  { number: 2, symbol: 'He', name: 'Helium', mass: 4.0026, category: 'noble-gas', x: 18, y: 1, details: 'Colorless, odorless, tasteless, non-toxic, inert, monatomic gas.' },
  { number: 3, symbol: 'Li', name: 'Lithium', mass: 6.94, category: 'alkali-metal', x: 1, y: 2, details: 'The lightest metal and the lightest solid element.' },
  { number: 4, symbol: 'Be', name: 'Beryllium', mass: 9.0122, category: 'alkaline-earth', x: 2, y: 2, details: 'A steel-gray, strong, lightweight and brittle alkaline earth metal.' },
  { number: 5, symbol: 'B', name: 'Boron', mass: 10.81, category: 'metalloid', x: 13, y: 2, details: 'A metalloid element, found in the Earth\'s crust.' },
  { number: 6, symbol: 'C', name: 'Carbon', mass: 12.011, category: 'nonmetal', x: 14, y: 2, details: 'The basis of all known life.' },
  { number: 7, symbol: 'N', name: 'Nitrogen', mass: 14.007, category: 'nonmetal', x: 15, y: 2, details: 'Makes up about 78% of Earth\'s atmosphere.' },
  { number: 8, symbol: 'O', name: 'Oxygen', mass: 15.999, category: 'nonmetal', x: 16, y: 2, details: 'Essential for respiration in most living organisms.' },
  { number: 9, symbol: 'F', name: 'Fluorine', mass: 18.998, category: 'halogen', x: 17, y: 2, details: 'The most electronegative element and extremely reactive.' },
  { number: 10, symbol: 'Ne', name: 'Neon', mass: 20.180, category: 'noble-gas', x: 18, y: 2, details: 'Used in neon signs and high-voltage indicators.' },
  { number: 11, symbol: 'Na', name: 'Sodium', mass: 22.990, category: 'alkali-metal', x: 1, y: 3, details: 'A soft, silvery-white, highly reactive alkali metal.' },
  { number: 12, symbol: 'Mg', name: 'Magnesium', mass: 24.305, category: 'alkaline-earth', x: 2, y: 3, details: 'Essential for human health and used in lightweight alloys.' },
  { number: 13, symbol: 'Al', name: 'Aluminum', mass: 26.982, category: 'post-transition', x: 13, y: 3, details: 'The most abundant metal in the Earth\'s crust.' },
  { number: 14, symbol: 'Si', name: 'Silicon', mass: 28.085, category: 'metalloid', x: 14, y: 3, details: 'A semiconductor, essential for modern electronics.' },
  { number: 15, symbol: 'P', name: 'Phosphorus', mass: 30.974, category: 'nonmetal', x: 15, y: 3, details: 'Exists in several forms, including white and red phosphorus.' },
  { number: 16, symbol: 'S', name: 'Sulfur', mass: 32.06, category: 'nonmetal', x: 16, y: 3, details: 'Found in nature as pure element or as sulfide and sulfate minerals.' },
  { number: 17, symbol: 'Cl', name: 'Chlorine', mass: 35.45, category: 'halogen', x: 17, y: 3, details: 'Used for water purification and in bleach.' },
  { number: 18, symbol: 'Ar', name: 'Argon', mass: 39.948, category: 'noble-gas', x: 18, y: 3, details: 'The third-most abundant gas in the Earth\'s atmosphere.' },
  { number: 19, symbol: 'K', name: 'Potassium', mass: 39.098, category: 'alkali-metal', x: 1, y: 4 },
  { number: 20, symbol: 'Ca', name: 'Calcium', mass: 40.078, category: 'alkaline-earth', x: 2, y: 4 },
  { number: 21, symbol: 'Sc', name: 'Scandium', mass: 44.956, category: 'transition-metal', x: 3, y: 4 },
  { number: 22, symbol: 'Ti', name: 'Titanium', mass: 47.867, category: 'transition-metal', x: 4, y: 4 },
  { number: 23, symbol: 'V', name: 'Vanadium', mass: 50.942, category: 'transition-metal', x: 5, y: 4 },
  { number: 24, symbol: 'Cr', name: 'Chromium', mass: 51.996, category: 'transition-metal', x: 6, y: 4 },
  { number: 25, symbol: 'Mn', name: 'Manganese', mass: 54.938, category: 'transition-metal', x: 7, y: 4 },
  { number: 26, symbol: 'Fe', name: 'Iron', mass: 55.845, category: 'transition-metal', x: 8, y: 4 },
  { number: 27, symbol: 'Co', name: 'Cobalt', mass: 58.933, category: 'transition-metal', x: 9, y: 4 },
  { number: 28, symbol: 'Ni', name: 'Nickel', mass: 58.693, category: 'transition-metal', x: 10, y: 4 },
  { number: 29, symbol: 'Cu', name: 'Copper', mass: 63.546, category: 'transition-metal', x: 11, y: 4 },
  { number: 30, symbol: 'Zn', name: 'Zinc', mass: 65.38, category: 'transition-metal', x: 12, y: 4 },
  { number: 31, symbol: 'Ga', name: 'Gallium', mass: 69.723, category: 'post-transition', x: 13, y: 4 },
  { number: 32, symbol: 'Ge', name: 'Germanium', mass: 72.63, category: 'metalloid', x: 14, y: 4 },
  { number: 33, symbol: 'As', name: 'Arsenic', mass: 74.922, category: 'metalloid', x: 15, y: 4 },
  { number: 34, symbol: 'Se', name: 'Selenium', mass: 78.971, category: 'nonmetal', x: 16, y: 4 },
  { number: 35, symbol: 'Br', name: 'Bromine', mass: 79.904, category: 'halogen', x: 17, y: 4 },
  { number: 36, symbol: 'Kr', name: 'Krypton', mass: 83.798, category: 'noble-gas', x: 18, y: 4 },
  { number: 37, symbol: 'Rb', name: 'Rubidium', mass: 85.468, category: 'alkali-metal', x: 1, y: 5 },
  { number: 38, symbol: 'Sr', name: 'Strontium', mass: 87.62, category: 'alkaline-earth', x: 2, y: 5 },
  { number: 39, symbol: 'Y', name: 'Yttrium', mass: 88.906, category: 'transition-metal', x: 3, y: 5 },
  { number: 40, symbol: 'Zr', name: 'Zirconium', mass: 91.224, category: 'transition-metal', x: 4, y: 5 },
  { number: 41, symbol: 'Nb', name: 'Niobium', mass: 92.906, category: 'transition-metal', x: 5, y: 5 },
  { number: 42, symbol: 'Mo', name: 'Molybdenum', mass: 95.95, category: 'transition-metal', x: 6, y: 5 },
  { number: 43, symbol: 'Tc', name: 'Technetium', mass: 98, category: 'transition-metal', x: 7, y: 5 },
  { number: 44, symbol: 'Ru', name: 'Ruthenium', mass: 101.07, category: 'transition-metal', x: 8, y: 5 },
  { number: 45, symbol: 'Rh', name: 'Rhodium', mass: 102.91, category: 'transition-metal', x: 9, y: 5 },
  { number: 46, symbol: 'Pd', name: 'Palladium', mass: 106.42, category: 'transition-metal', x: 10, y: 5 },
  { number: 47, symbol: 'Ag', name: 'Silver', mass: 107.87, category: 'transition-metal', x: 11, y: 5 },
  { number: 48, symbol: 'Cd', name: 'Cadmium', mass: 112.41, category: 'transition-metal', x: 12, y: 5 },
  { number: 49, symbol: 'In', name: 'Indium', mass: 114.82, category: 'post-transition', x: 13, y: 5 },
  { number: 50, symbol: 'Sn', name: 'Tin', mass: 118.71, category: 'post-transition', x: 14, y: 5 },
  { number: 51, symbol: 'Sb', name: 'Antimony', mass: 121.76, category: 'metalloid', x: 15, y: 5 },
  { number: 52, symbol: 'Te', name: 'Tellurium', mass: 127.6, category: 'metalloid', x: 16, y: 5 },
  { number: 53, symbol: 'I', name: 'Iodine', mass: 126.9, category: 'halogen', x: 17, y: 5 },
  { number: 54, symbol: 'Xe', name: 'Xenon', mass: 131.29, category: 'noble-gas', x: 18, y: 5 },
  { number: 55, symbol: 'Cs', name: 'Cesium', mass: 132.91, category: 'alkali-metal', x: 1, y: 6 },
  { number: 56, symbol: 'Ba', name: 'Barium', mass: 137.33, category: 'alkaline-earth', x: 2, y: 6 },
  { number: 57, symbol: 'La', name: 'Lanthanum', mass: 138.91, category: 'lanthanide', x: 4, y: 9 },
  { number: 58, symbol: 'Ce', name: 'Cerium', mass: 140.12, category: 'lanthanide', x: 5, y: 9 },
  { number: 59, symbol: 'Pr', name: 'Praseodymium', mass: 140.91, category: 'lanthanide', x: 6, y: 9 },
  { number: 60, symbol: 'Nd', name: 'Neodymium', mass: 144.24, category: 'lanthanide', x: 7, y: 9 },
  { number: 61, symbol: 'Pm', name: 'Promethium', mass: 145, category: 'lanthanide', x: 8, y: 9 },
  { number: 62, symbol: 'Sm', name: 'Samarium', mass: 150.36, category: 'lanthanide', x: 9, y: 9 },
  { number: 63, symbol: 'Eu', name: 'Europium', mass: 151.96, category: 'lanthanide', x: 10, y: 9 },
  { number: 64, symbol: 'Gd', name: 'Gadolinium', mass: 157.25, category: 'lanthanide', x: 11, y: 9 },
  { number: 65, symbol: 'Tb', name: 'Terbium', mass: 158.93, category: 'lanthanide', x: 12, y: 9 },
  { number: 66, symbol: 'Dy', name: 'Dysprosium', mass: 162.5, category: 'lanthanide', x: 13, y: 9 },
  { number: 67, symbol: 'Ho', name: 'Holmium', mass: 164.93, category: 'lanthanide', x: 14, y: 9 },
  { number: 68, symbol: 'Er', name: 'Erbium', mass: 167.26, category: 'lanthanide', x: 15, y: 9 },
  { number: 69, symbol: 'Tm', name: 'Thulium', mass: 168.93, category: 'lanthanide', x: 16, y: 9 },
  { number: 70, symbol: 'Yb', name: 'Ytterbium', mass: 173.05, category: 'lanthanide', x: 17, y: 9 },
  { number: 71, symbol: 'Lu', name: 'Lutetium', mass: 174.97, category: 'lanthanide', x: 18, y: 9 },
  { number: 72, symbol: 'Hf', name: 'Hafnium', mass: 178.49, category: 'transition-metal', x: 4, y: 6 },
  { number: 73, symbol: 'Ta', name: 'Tantalum', mass: 180.95, category: 'transition-metal', x: 5, y: 6 },
  { number: 74, symbol: 'W', name: 'Tungsten', mass: 183.84, category: 'transition-metal', x: 6, y: 6 },
  { number: 75, symbol: 'Re', name: 'Rhenium', mass: 186.21, category: 'transition-metal', x: 7, y: 6 },
  { number: 76, symbol: 'Os', name: 'Osmium', mass: 190.23, category: 'transition-metal', x: 8, y: 6 },
  { number: 77, symbol: 'Ir', name: 'Iridium', mass: 192.22, category: 'transition-metal', x: 9, y: 6 },
  { number: 78, symbol: 'Pt', name: 'Platinum', mass: 195.08, category: 'transition-metal', x: 10, y: 6 },
  { number: 79, symbol: 'Au', name: 'Gold', mass: 196.97, category: 'transition-metal', x: 11, y: 6 },
  { number: 80, symbol: 'Hg', name: 'Mercury', mass: 200.59, category: 'transition-metal', x: 12, y: 6 },
  { number: 81, symbol: 'Tl', name: 'Thallium', mass: 204.38, category: 'post-transition', x: 13, y: 6 },
  { number: 82, symbol: 'Pb', name: 'Lead', mass: 207.2, category: 'post-transition', x: 14, y: 6 },
  { number: 83, symbol: 'Bi', name: 'Bismuth', mass: 208.98, category: 'post-transition', x: 15, y: 6 },
  { number: 84, symbol: 'Po', name: 'Polonium', mass: 209, category: 'post-transition', x: 16, y: 6 },
  { number: 85, symbol: 'At', name: 'Astatine', mass: 210, category: 'metalloid', x: 17, y: 6 },
  { number: 86, symbol: 'Rn', name: 'Radon', mass: 222, category: 'noble-gas', x: 18, y: 6 },
  { number: 87, symbol: 'Fr', name: 'Francium', mass: 223, category: 'alkali-metal', x: 1, y: 7 },
  { number: 88, symbol: 'Ra', name: 'Radium', mass: 226, category: 'alkaline-earth', x: 2, y: 7 },
  { number: 89, symbol: 'Ac', name: 'Actinium', mass: 227, category: 'actinide', x: 4, y: 10 },
  { number: 90, symbol: 'Th', name: 'Thorium', mass: 232.04, category: 'actinide', x: 5, y: 10 },
  { number: 91, symbol: 'Pa', name: 'Protactinium', mass: 231.04, category: 'actinide', x: 6, y: 10 },
  { number: 92, symbol: 'U', name: 'Uranium', mass: 238.03, category: 'actinide', x: 7, y: 10 },
  { number: 93, symbol: 'Np', name: 'Neptunium', mass: 237, category: 'actinide', x: 8, y: 10 },
  { number: 94, symbol: 'Pu', name: 'Plutonium', mass: 244, category: 'actinide', x: 9, y: 10 },
  { number: 95, symbol: 'Am', name: 'Americium', mass: 243, category: 'actinide', x: 10, y: 10 },
  { number: 96, symbol: 'Cm', name: 'Curium', mass: 247, category: 'actinide', x: 11, y: 10 },
  { number: 97, symbol: 'Bk', name: 'Berkelium', mass: 247, category: 'actinide', x: 12, y: 10 },
  { number: 98, symbol: 'Cf', name: 'Californium', mass: 251, category: 'actinide', x: 13, y: 10 },
  { number: 99, symbol: 'Es', name: 'Einsteinium', mass: 252, category: 'actinide', x: 14, y: 10 },
  { number: 100, symbol: 'Fm', name: 'Fermium', mass: 257, category: 'actinide', x: 15, y: 10 },
  { number: 101, symbol: 'Md', name: 'Mendelevium', mass: 258, category: 'actinide', x: 16, y: 10 },
  { number: 102, symbol: 'No', name: 'Nobelium', mass: 259, category: 'actinide', x: 17, y: 10 },
  { number: 103, symbol: 'Lr', name: 'Lawrencium', mass: 262, category: 'actinide', x: 18, y: 10 },
  { number: 104, symbol: 'Rf', name: 'Rutherfordium', mass: 267, category: 'transition-metal', x: 4, y: 7 },
  { number: 105, symbol: 'Db', name: 'Dubnium', mass: 268, category: 'transition-metal', x: 5, y: 7 },
  { number: 106, symbol: 'Sg', name: 'Seaborgium', mass: 271, category: 'transition-metal', x: 6, y: 7 },
  { number: 107, symbol: 'Bh', name: 'Bohrium', mass: 270, category: 'transition-metal', x: 7, y: 7 },
  { number: 108, symbol: 'Hs', name: 'Hassium', mass: 277, category: 'transition-metal', x: 8, y: 7 },
  { number: 109, symbol: 'Mt', name: 'Meitnerium', mass: 276, category: 'transition-metal', x: 9, y: 7 },
  { number: 110, symbol: 'Ds', name: 'Darmstadtium', mass: 281, category: 'transition-metal', x: 10, y: 7 },
  { number: 111, symbol: 'Rg', name: 'Roentgenium', mass: 280, category: 'transition-metal', x: 11, y: 7 },
  { number: 112, symbol: 'Cn', name: 'Copernicium', mass: 285, category: 'transition-metal', x: 12, y: 7 },
  { number: 113, symbol: 'Nh', name: 'Nihonium', mass: 284, category: 'post-transition', x: 13, y: 7 },
  { number: 114, symbol: 'Fl', name: 'Flerovium', mass: 289, category: 'post-transition', x: 14, y: 7 },
  { number: 115, symbol: 'Mc', name: 'Moscovium', mass: 288, category: 'post-transition', x: 15, y: 7 },
  { number: 116, symbol: 'Lv', name: 'Livermorium', mass: 293, category: 'post-transition', x: 16, y: 7 },
  { number: 117, symbol: 'Ts', name: 'Tennessine', mass: 294, category: 'halogen', x: 17, y: 7 },
  { number: 118, symbol: 'Og', name: 'Oganesson', mass: 294, category: 'noble-gas', x: 18, y: 7 },
];

const CATEGORY_COLORS: Record<string, string> = {
  'nonmetal': 'bg-green-100 border-green-200 text-green-800',
  'noble-gas': 'bg-purple-100 border-purple-200 text-purple-800',
  'alkali-metal': 'bg-red-100 border-red-200 text-red-800',
  'alkaline-earth': 'bg-orange-100 border-orange-200 text-orange-800',
  'metalloid': 'bg-yellow-100 border-yellow-200 text-yellow-800',
  'halogen': 'bg-blue-100 border-blue-200 text-blue-800',
  'post-transition': 'bg-teal-100 border-teal-200 text-teal-800',
  'transition-metal': 'bg-pink-100 border-pink-200 text-pink-800',
  'lanthanide': 'bg-indigo-100 border-indigo-200 text-indigo-800',
  'actinide': 'bg-rose-100 border-rose-200 text-rose-800',
};

export function PeriodicTable() {
  const [selectedElement, setSelectedElement] = React.useState<Element | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Interactive Periodic Table</h3>
          <p className="text-sm text-slate-500">Explore all 118 elements of the building blocks of the universe.</p>
        </div>
      </div>

      <div className="relative bg-white p-6 rounded-3xl border border-slate-200 shadow-sm overflow-x-auto">
        <div className="grid grid-cols-18 gap-1 min-w-[1000px]">
          {/* Main Table (Periods 1-7) */}
          {Array.from({ length: 7 * 18 }, (_, i) => {
            const x = (i % 18) + 1;
            const y = Math.floor(i / 18) + 1;
            const element = ELEMENTS.find(e => e.x === x && e.y === y);

            if (!element) return <div key={i} className="aspect-square" />;

            return (
              <button
                key={i}
                onClick={() => setSelectedElement(element)}
                className={cn(
                  "aspect-square border rounded-lg p-1 flex flex-col items-center justify-center transition-all hover:scale-110 hover:shadow-lg active:scale-95",
                  CATEGORY_COLORS[element.category] || 'bg-slate-50 border-slate-200 text-slate-600'
                )}
              >
                <span className="text-[8px] font-bold opacity-70">{element.number}</span>
                <span className="text-xs font-black tracking-tight">{element.symbol}</span>
                <span className="text-[6px] font-medium truncate w-full text-center">{element.name}</span>
              </button>
            );
          })}

          {/* Spacer for Lanthanides/Actinides */}
          <div className="col-span-18 h-4" />

          {/* Lanthanides (Period 9 in our grid) */}
          <div className="col-span-3 flex items-center justify-end pr-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lanthanides</div>
          {Array.from({ length: 15 }, (_, i) => {
            const x = i + 4;
            const y = 9;
            const element = ELEMENTS.find(e => e.x === x && e.y === y);
            if (!element) return <div key={`lan-${i}`} className="aspect-square" />;
            return (
              <button
                key={`lan-${i}`}
                onClick={() => setSelectedElement(element)}
                className={cn(
                  "aspect-square border rounded-lg p-1 flex flex-col items-center justify-center transition-all hover:scale-110 hover:shadow-lg active:scale-95",
                  CATEGORY_COLORS[element.category]
                )}
              >
                <span className="text-[8px] font-bold opacity-70">{element.number}</span>
                <span className="text-xs font-black tracking-tight">{element.symbol}</span>
                <span className="text-[6px] font-medium truncate w-full text-center">{element.name}</span>
              </button>
            );
          })}

          {/* Actinides (Period 10 in our grid) */}
          <div className="col-span-3 flex items-center justify-end pr-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Actinides</div>
          {Array.from({ length: 15 }, (_, i) => {
            const x = i + 4;
            const y = 10;
            const element = ELEMENTS.find(e => e.x === x && e.y === y);
            if (!element) return <div key={`act-${i}`} className="aspect-square" />;
            return (
              <button
                key={`act-${i}`}
                onClick={() => setSelectedElement(element)}
                className={cn(
                  "aspect-square border rounded-lg p-1 flex flex-col items-center justify-center transition-all hover:scale-110 hover:shadow-lg active:scale-95",
                  CATEGORY_COLORS[element.category]
                )}
              >
                <span className="text-[8px] font-bold opacity-70">{element.number}</span>
                <span className="text-xs font-black tracking-tight">{element.symbol}</span>
                <span className="text-[6px] font-medium truncate w-full text-center">{element.name}</span>
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          {Object.entries(CATEGORY_COLORS).map(([cat, colorClass]) => (
            <div key={cat} className="flex items-center gap-2">
              <div className={cn("w-3 h-3 rounded border", colorClass.split(' ')[0], colorClass.split(' ')[1])} />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{cat.replace('-', ' ')}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Element Detail Modal */}
      {selectedElement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-start mb-6">
              <div className={cn(
                "w-24 h-24 rounded-3xl flex flex-col items-center justify-center border-2",
                CATEGORY_COLORS[selectedElement.category]
              )}>
                <span className="text-sm font-bold opacity-70">{selectedElement.number}</span>
                <span className="text-3xl font-black">{selectedElement.symbol}</span>
                <span className="text-[10px] font-bold">{selectedElement.mass}</span>
              </div>
              <button 
                onClick={() => setSelectedElement(null)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={24} className="text-slate-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-2xl font-bold text-slate-900">{selectedElement.name}</h4>
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-slate-100 text-slate-500 mt-1">
                  {selectedElement.category.replace('-', ' ')}
                </span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-start gap-3">
                  <Info className="text-indigo-500 shrink-0 mt-1" size={18} />
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {selectedElement.details || 'More detailed information about this element is coming soon to the Hi-tech Academy Science Lab!'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase block mb-1">Atomic Mass</span>
                  <span className="text-sm font-bold text-indigo-700">{selectedElement.mass} u</span>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase block mb-1">Atomic No.</span>
                  <span className="text-sm font-bold text-emerald-700">{selectedElement.number}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
