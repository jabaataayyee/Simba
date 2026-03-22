import React from 'react';
import { cn } from '../lib/utils';
import { Info, ChevronLeft, ChevronRight, Globe } from 'lucide-react';

interface Planet {
  id: string;
  name: string;
  type: string;
  description: string;
  image: string;
  distance: string;
  diameter: string;
  gravity: string;
  color: string;
}

const PLANETS: Planet[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    type: 'Terrestrial',
    description: 'The smallest planet in our solar system and closest to the Sun—is only slightly larger than Earth\'s Moon.',
    image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?auto=format&fit=crop&q=80&w=1000',
    distance: '57.9 million km',
    diameter: '4,879 km',
    gravity: '3.7 m/s²',
    color: 'bg-slate-400'
  },
  {
    id: 'venus',
    name: 'Venus',
    type: 'Terrestrial',
    description: 'Spinning slowly in the opposite direction from most planets, Venus is the hottest planet in our solar system.',
    image: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?auto=format&fit=crop&q=80&w=1000',
    distance: '108.2 million km',
    diameter: '12,104 km',
    gravity: '8.87 m/s²',
    color: 'bg-orange-300'
  },
  {
    id: 'earth',
    name: 'Earth',
    type: 'Terrestrial',
    description: 'Our home planet is the only place we know of so far that’s inhabited by living things.',
    image: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&q=80&w=1000',
    distance: '149.6 million km',
    diameter: '12,742 km',
    gravity: '9.8 m/s²',
    color: 'bg-blue-500'
  },
  {
    id: 'mars',
    name: 'Mars',
    type: 'Terrestrial',
    description: 'Mars is a dusty, cold, desert world with a very thin atmosphere. There is strong evidence Mars was—billions of years ago—much wetter and warmer.',
    image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80&w=1000',
    distance: '227.9 million km',
    diameter: '6,779 km',
    gravity: '3.71 m/s²',
    color: 'bg-red-500'
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    type: 'Gas Giant',
    description: 'Jupiter is more than twice as massive than the other planets of our solar system combined. The giant planet\'s Great Red spot is a centuries-old storm bigger than Earth.',
    image: 'https://images.unsplash.com/photo-1614732484003-ef9881555dc3?auto=format&fit=crop&q=80&w=1000',
    distance: '778.5 million km',
    diameter: '139,820 km',
    gravity: '24.79 m/s²',
    color: 'bg-amber-200'
  },
  {
    id: 'saturn',
    name: 'Saturn',
    type: 'Gas Giant',
    description: 'Adorned with a dazzling, complex system of icy rings, Saturn is unique in our solar system. The other giant planets have rings, but none are as spectacular as Saturn\'s.',
    image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?auto=format&fit=crop&q=80&w=1000', // Using a placeholder as unsplash is tricky with saturn specific
    distance: '1.4 billion km',
    diameter: '116,460 km',
    gravity: '10.44 m/s²',
    color: 'bg-yellow-100'
  },
  {
    id: 'uranus',
    name: 'Uranus',
    type: 'Ice Giant',
    description: 'Uranus—seventh planet from the Sun—rotates at a nearly 90-degree angle from the plane of its orbit. This unique tilt makes Uranus appear to spin on its side.',
    image: 'https://images.unsplash.com/photo-1614732484003-ef9881555dc3?auto=format&fit=crop&q=80&w=1000',
    distance: '2.9 billion km',
    diameter: '50,724 km',
    gravity: '8.69 m/s²',
    color: 'bg-cyan-200'
  },
  {
    id: 'neptune',
    name: 'Neptune',
    type: 'Ice Giant',
    description: 'Neptune—the eighth and most distant major planet orbiting our Sun—is dark, cold and whipped by supersonic winds. It was the first planet located through mathematical calculations.',
    image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?auto=format&fit=crop&q=80&w=1000',
    distance: '4.5 billion km',
    diameter: '49,244 km',
    gravity: '11.15 m/s²',
    color: 'bg-blue-700'
  }
];

export function SpaceExplorer() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const activePlanet = PLANETS[activeIndex];

  const nextPlanet = () => setActiveIndex((prev) => (prev + 1) % PLANETS.length);
  const prevPlanet = () => setActiveIndex((prev) => (prev - 1 + PLANETS.length) % PLANETS.length);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Space Explorer</h3>
          <p className="text-sm text-slate-500">Journey through our magnificent Solar System.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-slate-900 rounded-[3rem] p-8 lg:p-12 text-white overflow-hidden relative shadow-2xl">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 blur-[100px] -mr-48 -mt-48 rounded-full" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 blur-[100px] -ml-48 -mb-48 rounded-full" />

        {/* Planet Image Section */}
        <div className="relative flex items-center justify-center min-h-[300px] lg:min-h-[400px]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={cn(
              "w-64 h-64 lg:w-80 lg:h-80 rounded-full blur-[60px] opacity-30 animate-pulse",
              activePlanet.color
            )} />
          </div>
          <img
            key={activePlanet.id}
            src={activePlanet.image}
            alt={activePlanet.name}
            referrerPolicy="no-referrer"
            className="relative z-10 w-64 h-64 lg:w-80 lg:h-80 object-cover rounded-full shadow-[0_0_50px_rgba(255,255,255,0.1)] animate-in zoom-in-75 duration-700"
          />
          
          {/* Navigation Buttons */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 lg:-px-8 z-20">
            <button 
              onClick={prevPlanet}
              className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all active:scale-90 border border-white/10"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextPlanet}
              className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all active:scale-90 border border-white/10"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Planet Info Section */}
        <div className="relative z-10 flex flex-col justify-center space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
                {activePlanet.type}
              </span>
              <span className="text-white/40 text-xs font-medium">Planet {activeIndex + 1} of 8</span>
            </div>
            <h4 className="text-5xl lg:text-7xl font-black tracking-tighter mb-4">{activePlanet.name}</h4>
            <p className="text-slate-300 text-lg leading-relaxed max-w-md">
              {activePlanet.description}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/5">
              <span className="text-[10px] font-bold text-white/40 uppercase block mb-1">Distance</span>
              <span className="text-sm font-bold">{activePlanet.distance}</span>
            </div>
            <div className="p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/5">
              <span className="text-[10px] font-bold text-white/40 uppercase block mb-1">Diameter</span>
              <span className="text-sm font-bold">{activePlanet.diameter}</span>
            </div>
            <div className="p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/5">
              <span className="text-[10px] font-bold text-white/40 uppercase block mb-1">Gravity</span>
              <span className="text-sm font-bold">{activePlanet.gravity}</span>
            </div>
          </div>

          <div className="flex gap-2">
            {PLANETS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  idx === activeIndex ? "w-8 bg-white" : "w-2 bg-white/20 hover:bg-white/40"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Space Fact Card */}
      <div className="bg-indigo-900/5 border border-indigo-100 p-6 rounded-3xl flex items-start gap-4">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 shrink-0">
          <Globe size={24} />
        </div>
        <div>
          <h4 className="font-bold text-indigo-900">Did you know?</h4>
          <p className="text-sm text-indigo-700 leading-relaxed mt-1">
            Space is completely silent. There is no atmosphere in space, which means sound has no medium or way to travel to be heard. 
            Astronauts use radios to stay in communication while in space, since radio waves can still be sent and received.
          </p>
        </div>
      </div>
    </div>
  );
}
