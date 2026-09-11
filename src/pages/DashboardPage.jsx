import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Award, 
  Compass, 
  CheckCircle2, 
  Clock, 
  Play, 
  Eye, 
  BookOpen,
  ArrowRight
} from 'lucide-react';
import ArtifactCard from '@/components/cards/ArtifactCard';
import AchievementBadge from '@/components/cards/AchievementBadge';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import { useAuth } from '@/context/AuthContext';
import { ARTIFACTS_DATA } from '@/data/artifactsData';
import { ACHIEVEMENTS_DATA } from '@/data/achievementsData';
import { GAMES_DATA } from '@/data/gamesData';
import { useAudio } from '@/context/AudioContext';

export const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { playBell } = useAudio();
  const [inspectedArtifact, setInspectedArtifact] = useState(null);

  const activeGames = GAMES_DATA.slice(0, 2);
  const userArtifacts = ARTIFACTS_DATA.slice(0, 4);
  const nextLevelXp = 2500;
  const xpPercent = Math.min(100, Math.round(((user?.culturalXp || 1450) / nextLevelXp) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* ========================================================
          1. PLAYER HQ HERO BANNER
          ======================================================== */}
      <div className="bg-[#FFFDF9] border border-[#C5A059]/30 rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#EADCC9]">
          
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
              alt={user?.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#C5A059] object-cover shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif-title font-bold text-2xl sm:text-3xl text-[#1C1917]">
                  {user?.name || 'Scholar Explorer'}
                </h1>
                <span className="text-xs bg-[#5E7A68]/15 text-[#5E7A68] font-mono font-bold px-2.5 py-0.5 rounded-full">
                  Level {user?.level || 4}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-[#C86D51] mt-0.5">
                {user?.levelTitle || 'Senior Epigraphist'}
              </p>
            </div>
          </div>

          {/* XP Counter Pill */}
          <div className="bg-[#FAF7F2] border border-[#C5A059]/40 rounded-2xl p-4 text-right min-w-[200px]">
            <span className="text-[10px] font-mono font-bold uppercase text-[#57534E]">
              Total Cultural Score
            </span>
            <div className="text-2xl font-mono font-bold text-[#1C1917] flex items-center justify-end gap-1.5 mt-0.5">
              <Sparkles className="w-5 h-5 text-[#C5A059]" />
              {(user?.culturalXp || 1450).toLocaleString()} XP
            </div>
          </div>
        </div>

        {/* Level Progression Bar */}
        <div className="pt-6">
          <div className="flex items-center justify-between text-xs font-mono text-[#57534E] mb-2">
            <span>Progress to Next Rank: <b>Grand Master Chronicler</b></span>
            <span>{user?.culturalXp || 1450} / {nextLevelXp} XP ({xpPercent}%)</span>
          </div>
          <div className="w-full h-3 bg-[#EADCC9] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#C5A059] to-[#C86D51] rounded-full transition-all duration-700"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* ========================================================
          2. CONTINUE EXPEDITIONS SHELF
          ======================================================== */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C86D51]">
              In-Progress
            </span>
            <h2 className="font-serif-title font-bold text-2xl text-[#1C1917] mt-1">
              Active Expeditions
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => navigate('/library')}
          >
            All Quests
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeGames.map((game) => (
            <div
              key={game.id}
              className="bg-[#FFFDF9] border border-[#C5A059]/30 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-center gap-4"
            >
              <img
                src={game.coverImage}
                alt={game.title}
                className="w-full sm:w-36 h-28 object-cover rounded-2xl border border-[#EADCC9]"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-mono font-bold uppercase text-[#C5A059]">
                  {game.archetypeName}
                </span>
                <h4 className="font-serif-title font-bold text-base text-[#1C1917] truncate mb-1">
                  {game.title}
                </h4>
                <p className="text-xs text-[#57534E] line-clamp-1 mb-3">
                  {game.civilization} • {game.era}
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  icon={Play}
                  onClick={() => navigate(`/games/${game.id}`)}
                >
                  Resume (+{game.xpReward} XP)
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================
          3. ARTIFACT CODEX COLLECTION
          ======================================================== */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#5E7A68]">
              Sanctuary Relics
            </span>
            <h2 className="font-serif-title font-bold text-2xl text-[#1C1917] mt-1">
              Discovered Artifact Collection ({userArtifacts.length})
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {userArtifacts.map((art) => (
            <ArtifactCard
              key={art.id}
              artifact={art}
              onInspect={(selected) => setInspectedArtifact(selected)}
            />
          ))}
        </div>
      </div>

      {/* ========================================================
          4. BADGES & ACHIEVEMENTS SHELF
          ======================================================== */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C5A059]">
              Medals of Lore
            </span>
            <h2 className="font-serif-title font-bold text-2xl text-[#1C1917] mt-1">
              Honors & Certifications
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {ACHIEVEMENTS_DATA.map((ach) => (
            <AchievementBadge
              key={ach.id}
              badge={ach}
              isUnlocked={user?.unlockedBadges?.includes(ach.id) ?? true}
            />
          ))}
        </div>
      </div>

      {/* Inspected Artifact Modal */}
      {inspectedArtifact && (
        <Modal
          isOpen={!!inspectedArtifact}
          onClose={() => setInspectedArtifact(null)}
          title={inspectedArtifact.name}
          subtitle={`${inspectedArtifact.period} • ${inspectedArtifact.origin}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-4">
            <img
              src={inspectedArtifact.imageUrl}
              alt={inspectedArtifact.name}
              className="w-full h-64 object-cover rounded-2xl border border-[#EADCC9]"
            />
            <div>
              <h4 className="font-serif-title font-bold text-base text-[#1C1917] mb-1">
                Archaeological & Cultural Significance
              </h4>
              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                {inspectedArtifact.culturalSignificance}
              </p>
            </div>
            <div className="bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#EADCC9] text-xs text-[#1C1917]">
              <span className="font-bold text-[#C86D51]">Material & Craft: </span>
              {inspectedArtifact.material}
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};

export default DashboardPage;
