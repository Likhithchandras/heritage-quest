import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { heritageHunts } from '../data/heritageHuntsData';
import HuntCard from '../components/hunt/HuntCard';
import IndiaHeritageMap from '../components/map/IndiaHeritageMap';
import { Compass, Search, Award, MapPin, Sparkles, Filter, Landmark, BookOpen, Volume2, ShieldCheck, Star } from 'lucide-react';
import { useGameProgress } from '../context/GameProgressContext';
import { soundEffects } from '../utils/soundEffects';

export default function HomePage() {
  const { totalScore, badges, completedHunts, currentRank } = useGameProgress();
  const [selectedState, setSelectedState] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const states = ['ALL', 'Karnataka', 'Rajasthan', 'Maharashtra', 'Tamil Nadu', 'Odisha', 'Uttar Pradesh', 'Gujarat', 'Telangana'];

  const filteredHunts = heritageHunts.filter(hunt => {
    const matchesState = selectedState === 'ALL' || hunt.state.toLowerCase() === selectedState.toLowerCase();
    const matchesSearch = hunt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          hunt.huntIdea.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          hunt.state.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesSearch;
  });

  return (
    <div className="space-y-12 pb-16 animate-fadeIn">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 border-2 border-amber-500/40 p-8 md:p-14 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.15),transparent_50%)] pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs md:text-sm font-semibold">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Interactive Archaeological Expedition</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-amber-100 font-serif leading-tight tracking-tight">
            Discover India’s Timeless Wonders Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">Riddles & Quests</span>
          </h1>

          <p className="text-stone-300 text-base md:text-lg leading-relaxed font-sans">
            Step into the shoes of an ancient detective. Explore <strong>20 historic monuments</strong> and <strong>129 interactive checkpoints</strong> across India. Solve archaeological riddles, observe stone secrets, and earn official explorer certificates!
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#hunts-section"
              onClick={() => soundEffects.playClick()}
              className="px-6 py-3.5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 active:scale-95 text-stone-950 font-black rounded-2xl shadow-xl transition-all inline-flex items-center space-x-2 text-base"
            >
              <Compass className="w-5 h-5 text-stone-950" />
              <span>Choose Your Expedition</span>
            </a>
            <Link
              to="/map"
              onClick={() => soundEffects.playClick()}
              className="px-6 py-3.5 bg-stone-900/80 hover:bg-stone-800 active:scale-95 text-amber-200 border border-amber-500/40 font-bold rounded-2xl transition-all inline-flex items-center space-x-2 text-base"
            >
              <MapPin className="w-5 h-5 text-amber-400" />
              <span>View India Map</span>
            </Link>
          </div>
        </div>

        {/* Quick Stats Pill */}
        <div className="mt-8 pt-6 border-t border-stone-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-amber-200">
          <div className="p-3 bg-stone-950/60 rounded-xl border border-stone-800">
            <div className="text-2xl font-black text-amber-400">20</div>
            <div className="text-xs text-stone-400 font-semibold uppercase">Heritage Sites</div>
          </div>
          <div className="p-3 bg-stone-950/60 rounded-xl border border-stone-800">
            <div className="text-2xl font-black text-amber-400">129</div>
            <div className="text-xs text-stone-400 font-semibold uppercase">Curated Checkpoints</div>
          </div>
          <div className="p-3 bg-stone-950/60 rounded-xl border border-stone-800">
            <div className="text-2xl font-black text-amber-400">8</div>
            <div className="text-xs text-stone-400 font-semibold uppercase">States of India</div>
          </div>
          <div className="p-3 bg-stone-950/60 rounded-xl border border-stone-800">
            <div className="text-2xl font-black text-emerald-400">{completedHunts.length} / 20</div>
            <div className="text-xs text-stone-400 font-semibold uppercase">Hunts Solved</div>
          </div>
        </div>
      </section>

      {/* HCI Feature Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-stone-900/60 backdrop-blur-md p-6 rounded-2xl border border-stone-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Volume2 className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-amber-100 font-serif">Voice Narrator</h3>
          <p className="text-stone-400 text-sm leading-relaxed">
            Listen to ancient legends and riddles read aloud with an encouraging voice guide powered by Web Speech synthesis.
          </p>
        </div>

        <div className="bg-stone-900/60 backdrop-blur-md p-6 rounded-2xl border border-stone-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-amber-100 font-serif">GPS Radar & Virtual Mode</h3>
          <p className="text-stone-400 text-sm leading-relaxed">
            Walk to real monument coordinates on-site, or use the <em>Virtual Explorer Simulator</em> to play from your classroom or home.
          </p>
        </div>

        <div className="bg-stone-900/60 backdrop-blur-md p-6 rounded-2xl border border-stone-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-amber-100 font-serif">Printable Official Certificates</h3>
          <p className="text-stone-400 text-sm leading-relaxed">
            Complete all checkpoints of any monument to earn an official printable Certificate of Heritage Mastery.
          </p>
        </div>
      </section>

      {/* Interactive Map Preview */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-amber-100 font-serif">
              Pan-India Expedition Map
            </h2>
            <p className="text-stone-400 text-sm">
              Click on any pin across India to preview the treasure hunt and jump directly into the adventure.
            </p>
          </div>
          <Link
            to="/map"
            className="text-amber-400 hover:text-amber-300 font-bold text-sm inline-flex items-center space-x-1"
          >
            <span>Open Fullscreen Map</span>
            <span>→</span>
          </Link>
        </div>

        <IndiaHeritageMap selectedState={selectedState} />
      </section>

      {/* Hunts Catalog Section */}
      <section id="hunts-section" className="space-y-6 pt-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-amber-100 font-serif">
              All 20 Heritage Quests
            </h2>
            <p className="text-stone-400 text-sm">
              Filter by State or search for your favorite fort, temple, or royal palace.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search monuments or riddles..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 text-sm"
            />
          </div>
        </div>

        {/* State Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          <div className="text-xs text-stone-400 font-bold flex items-center gap-1 shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5 text-amber-400" />
            <span>State:</span>
          </div>
          {states.map((st) => (
            <button
              key={st}
              onClick={() => {
                soundEffects.playClick();
                setSelectedState(st);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                selectedState === st
                  ? 'bg-amber-500 text-stone-950 shadow-md scale-105'
                  : 'bg-stone-900 text-stone-400 hover:bg-stone-800 hover:text-stone-200 border border-stone-800'
              }`}
            >
              {st === 'ALL' ? 'All India (20)' : st}
            </button>
          ))}
        </div>

        {/* Hunt Cards Grid */}
        {filteredHunts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHunts.map((hunt) => (
              <HuntCard key={hunt.id} hunt={hunt} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-stone-900/40 rounded-3xl border border-stone-800 p-8 space-y-3">
            <div className="text-4xl">🏛️</div>
            <h3 className="text-xl font-bold text-amber-200">No Monuments Match Your Search</h3>
            <p className="text-stone-400 text-sm max-w-md mx-auto">
              Try choosing a different state or clear your search query to see all available heritage treasure hunts.
            </p>
            <button
              onClick={() => {
                setSelectedState('ALL');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
