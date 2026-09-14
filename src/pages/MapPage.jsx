import React, { useState } from 'react';
import IndiaHeritageMap from '../components/map/IndiaHeritageMap';
import { heritageHunts } from '../data/heritageHuntsData';
import { Filter, MapPin, Compass, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { soundEffects } from '../utils/soundEffects';

export default function MapPage() {
  const [selectedState, setSelectedState] = useState('ALL');
  const states = ['ALL', 'Karnataka', 'Rajasthan', 'Maharashtra', 'Tamil Nadu', 'Odisha', 'Uttar Pradesh', 'Gujarat', 'Telangana'];

  return (
    <div className="space-y-6 pb-16 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <Link
            to="/"
            onClick={() => soundEffects.playClick()}
            className="inline-flex items-center space-x-1 text-stone-400 hover:text-amber-300 text-xs font-semibold mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Catalog</span>
          </Link>
          <h1 className="text-2xl md:text-4xl font-extrabold text-amber-100 font-serif">
            Interactive India Heritage Map
          </h1>
          <p className="text-stone-400 text-xs md:text-sm">
            Explore 20 archaeological marvels plotted with verified geographical coordinates.
          </p>
        </div>

        {/* State Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {states.map((st) => (
            <button
              key={st}
              onClick={() => {
                soundEffects.playClick();
                setSelectedState(st);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                selectedState === st
                  ? 'bg-amber-500 text-stone-950 shadow-md scale-105'
                  : 'bg-stone-900 text-stone-400 hover:bg-stone-800 hover:text-stone-200 border border-stone-800'
              }`}
            >
              {st === 'ALL' ? 'All India (20)' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Map */}
      <IndiaHeritageMap selectedState={selectedState} />
    </div>
  );
}
