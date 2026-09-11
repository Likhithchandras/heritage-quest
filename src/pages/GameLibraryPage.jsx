import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gamepad2, Search, Filter, Sparkles, Layers } from 'lucide-react';
import GameCard from '@/components/cards/GameCard';
import { GAMES_DATA } from '@/data/gamesData';
import { useAudio } from '@/context/AudioContext';

export const GameLibraryPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'ALL';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const { playBell } = useAudio();

  const categories = [
    { id: 'ALL', label: 'All Quests' },
    { id: 'Artifact Investigation', label: 'Artifact 3D' },
    { id: 'Story Adventures', label: 'Story & Ethics' },
    { id: 'Puzzle', label: 'Glyph Decoding' },
    { id: 'Architecture', label: 'Reconstruct Monoliths' },
    { id: 'Strategy & Trade', label: 'Silk & Spice Barter' },
    { id: 'Historical Dialogue', label: 'Council of Luminaries' },
    { id: 'Acoustics & Sound', label: 'Harmonic Lithophones' },
    { id: 'Art & Craft', label: 'Pietra Dura Inlays' },
  ];

  const difficulties = ['ALL', 'Easy', 'Medium', 'Hard'];

  const filteredGames = GAMES_DATA.filter((game) => {
    const matchesCategory = selectedCategory === 'ALL' || game.category === selectedCategory || game.archetype === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'ALL' || game.difficulty === selectedDifficulty;
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.civilization.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C86D51]">
          8 Playable Archetypes
        </span>
        <h1 className="font-serif-title font-bold text-3xl sm:text-5xl text-[#1C1917] mt-1.5 mb-3">
          Expedition Game Library
        </h1>
        <p className="text-sm sm:text-base text-[#57534E]">
          Choose an interactive game loop to uncover the metallurgical secrets, epigraphs, and architectural marvels of Indian heritage.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        {/* Search & Difficulty */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FFFDF9] border border-[#C5A059]/30 rounded-3xl p-4 shadow-sm">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#57534E]" />
            <input
              type="text"
              placeholder="Search by title, era or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-[#FAF7F2] border border-[#EADCC9] text-xs sm:text-sm text-[#1C1917] placeholder-[#57534E]/60 focus:outline-none focus:border-[#C5A059]"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#57534E] uppercase">Difficulty:</span>
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => {
                  playBell(500);
                  setSelectedDifficulty(diff);
                }}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedDifficulty === diff
                    ? 'bg-[#C5A059] text-[#1C1917] font-bold shadow-sm'
                    : 'bg-[#FAF7F2] text-[#57534E] hover:bg-[#EADCC9]'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                playBell(550);
                setSelectedCategory(cat.id);
              }}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#1C1917] text-[#FAF7F2] font-semibold shadow-md'
                  : 'bg-[#FFFDF9] text-[#57534E] border border-[#C5A059]/30 hover:border-[#C5A059]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Games Grid */}
      {filteredGames.length === 0 ? (
        <div className="text-center py-16 bg-[#FFFDF9] rounded-3xl border border-[#EADCC9]">
          <p className="text-sm text-[#57534E]">No expeditions found matching your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GameLibraryPage;
