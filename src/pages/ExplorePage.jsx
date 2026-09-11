import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Search, Filter, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import CivilizationCard from '@/components/cards/CivilizationCard';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import { CIVILIZATIONS_DATA } from '@/data/civilizationsData';
import { GAMES_DATA } from '@/data/gamesData';
import { useAudio } from '@/context/AudioContext';

export const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [activeCivModal, setActiveCivModal] = useState(null);
  const navigate = useNavigate();
  const { playBell } = useAudio();

  const regions = [
    { id: 'ALL', label: 'All Regions' },
    { id: 'North', label: 'North India' },
    { id: 'South', label: 'South India & Deccan' },
    { id: 'Gujarat', label: 'Gujarat & West' },
  ];

  const filteredCivs = CIVILIZATIONS_DATA.filter((civ) => {
    const matchesSearch = civ.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      civ.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === 'ALL' || civ.region.toLowerCase().includes(selectedRegion.toLowerCase());
    return matchesSearch && matchesRegion;
  });

  const getRelatedGames = (civId) => {
    return GAMES_DATA.filter((g) => g.civilizationId === civId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C86D51]">
          Civilizational Archives
        </span>
        <h1 className="font-serif-title font-bold text-3xl sm:text-5xl text-[#1C1917] mt-1.5 mb-3">
          Explore Ancient Eras & Dynasties
        </h1>
        <p className="text-sm sm:text-base text-[#57534E]">
          Select an epoch to investigate architectural innovations, monumental cities, and playable investigative quests.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FFFDF9] border border-[#C5A059]/30 rounded-3xl p-4 shadow-sm">
        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#57534E]" />
          <input
            type="text"
            placeholder="Search civilization or era..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-[#FAF7F2] border border-[#EADCC9] text-xs sm:text-sm text-[#1C1917] placeholder-[#57534E]/60 focus:outline-none focus:border-[#C5A059]"
          />
        </div>

        {/* Region Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {regions.map((reg) => (
            <button
              key={reg.id}
              onClick={() => {
                playBell(500);
                setSelectedRegion(reg.id);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedRegion === reg.id
                  ? 'bg-[#1C1917] text-[#FAF7F2] font-semibold shadow-sm'
                  : 'bg-[#FAF7F2] text-[#57534E] hover:bg-[#EADCC9]'
              }`}
            >
              {reg.label}
            </button>
          ))}
        </div>
      </div>

      {/* Civilization Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCivs.map((civ) => (
          <CivilizationCard
            key={civ.id}
            civilization={civ}
            onSelect={(selected) => setActiveCivModal(selected)}
          />
        ))}
      </div>

      {/* Detailed Civilization Modal */}
      {activeCivModal && (
        <Modal
          isOpen={!!activeCivModal}
          onClose={() => setActiveCivModal(null)}
          title={activeCivModal.name}
          subtitle={`${activeCivModal.era} • ${activeCivModal.region}`}
          maxWidth="max-w-3xl"
        >
          <div className="space-y-6">
            <img
              src={activeCivModal.bannerImage || activeCivModal.coverImage}
              alt={activeCivModal.name}
              className="w-full h-52 object-cover rounded-2xl border border-[#EADCC9]"
            />

            <div>
              <h4 className="font-serif-title font-bold text-base text-[#1C1917] mb-2">
                Historical Overview
              </h4>
              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                {activeCivModal.description}
              </p>
            </div>

            {/* Key Themes & Notable Cities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EADCC9]">
                <h5 className="font-mono text-xs font-bold uppercase text-[#C86D51] mb-2">
                  Key Civilizational Themes
                </h5>
                <ul className="text-xs text-[#1C1917] space-y-1 list-disc pl-4">
                  {activeCivModal.keyThemes?.map((theme, i) => (
                    <li key={i}>{theme}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EADCC9]">
                <h5 className="font-mono text-xs font-bold uppercase text-[#5E7A68] mb-2">
                  Major Urban Centers
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {activeCivModal.notableCities?.map((city, i) => (
                    <span
                      key={i}
                      className="text-xs bg-[#FFFDF9] border border-[#EADCC9] px-2.5 py-1 rounded-md text-[#1C1917] font-medium"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Available Expeditions in this civ */}
            <div>
              <h4 className="font-serif-title font-bold text-base text-[#1C1917] mb-3">
                Playable Quests from this Era
              </h4>
              <div className="space-y-2">
                {getRelatedGames(activeCivModal.id).map((game) => (
                  <div
                    key={game.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#C5A059]/30 hover:border-[#C5A059] transition-all"
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#C86D51] uppercase">
                        {game.archetypeName}
                      </span>
                      <h5 className="font-serif-title font-bold text-xs sm:text-sm text-[#1C1917]">
                        {game.title}
                      </h5>
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        setActiveCivModal(null);
                        navigate(`/games/${game.id}`);
                      }}
                    >
                      Play (+{game.xpReward} XP)
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ExplorePage;
