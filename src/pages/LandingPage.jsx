import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Compass, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  MapPin, 
  ArrowRight, 
  Eye, 
  Layers, 
  Flame, 
  BookOpen,
  Volume2
} from 'lucide-react';
import FloatingArtifactCanvas from '@/components/3d/FloatingArtifactCanvas';
import IndiaCulturalMap from '@/components/map/IndiaCulturalMap';
import GameCard from '@/components/cards/GameCard';
import ArtifactCard from '@/components/cards/ArtifactCard';
import Button from '@/components/common/Button';
import { GAMES_DATA } from '@/data/gamesData';
import { CIVILIZATIONS_DATA } from '@/data/civilizationsData';
import { ARTIFACTS_DATA } from '@/data/artifactsData';
import { useAudio } from '@/context/AudioContext';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { playBell } = useAudio();

  const featuredGames = GAMES_DATA.slice(0, 6);
  const featuredArtifacts = ARTIFACTS_DATA.slice(0, 4);

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      
      {/* ========================================================
          1. HERO SECTION WITH 3D CANVAS
          ======================================================== */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background 3D Canvas with pointer-events-none so buttons are immediately clickable */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
          <FloatingArtifactCanvas />
        </div>

        {/* Ambient Gradient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none z-0" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-[#FFFDF9]/90 backdrop-blur-md border border-[#C5A059]/40 rounded-full px-4 py-1.5 shadow-sm mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#1C1917]">
              Next-Gen Civilizational Gamification
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif-title font-bold text-4xl sm:text-6xl lg:text-7xl text-[#1C1917] tracking-tight leading-[1.1] mb-6"
          >
            Step Into India’s History. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#C5A059] via-[#C86D51] to-[#9E7D3B] bg-clip-text text-transparent">
              Don’t Just Read It. Live It.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg lg:text-xl text-[#57534E] max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Decode Harappan seals, sculpt Chola bronzes in 3D, counsel Emperor Ashoka post-Kalinga, and navigate ancient trade routes across the subcontinent.
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              variant="primary"
              size="lg"
              icon={Compass}
              iconPosition="right"
              onClick={() => {
                playBell(660);
                navigate('/library');
              }}
            >
              Explore Expeditions
            </Button>
            <Button
              variant="outline"
              size="lg"
              icon={MapPin}
              onClick={() => {
                playBell(550);
                navigate('/map');
              }}
            >
              Interactive Map
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ========================================================
          STATS COUNTER STRIP
          ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-[#FFFDF9] border border-[#C5A059]/30 rounded-3xl p-6 sm:p-8 shadow-sm">
          {[
            { value: '6', label: 'Great Civilizations', icon: '🏛️' },
            { value: '8', label: 'Interactive Archetypes', icon: '🎮' },
            { value: '50+', label: 'Verified Monuments', icon: '🗺️' },
            { value: '100%', label: 'Archaeological Accuracy', icon: '📜' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <span className="text-2xl block mb-1">{stat.icon}</span>
              <div className="font-serif-title font-bold text-2xl sm:text-3xl text-[#1C1917]">
                {stat.value}
              </div>
              <div className="text-xs text-[#57534E] font-medium uppercase tracking-wider mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          2. HOW IT WORKS / 3-STEP FLOW
          ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C86D51]">
            Experiential Loop
          </span>
          <h2 className="font-serif-title font-bold text-3xl sm:text-4xl text-[#1C1917] mt-1.5">
            How Heritage Quest Works
          </h2>
          <p className="text-sm text-[#57534E] mt-2">
            A three-step loop combining tactile 3D investigation, decision-making, and codex rewards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              title: 'Select Era & Civilization',
              desc: 'Choose from the Indus Valley, Mauryan, Gupta, Chola, Vijayanagara, or Mughal eras.',
              icon: Compass,
              tag: 'Historical Immersion',
            },
            {
              step: '02',
              title: 'Play Story & Solve Mysteries',
              desc: 'Inspect 3D bronze relics, arrange Harappan glyphtiles, or negotiate spice barters.',
              icon: Layers,
              tag: '8 Game Archetypes',
            },
            {
              step: '03',
              title: 'Earn XP & Unlock Relics',
              desc: 'Level up your scholar rank, collect museum-grade 3D codex relics, and earn titles.',
              icon: Award,
              tag: 'Digital Preservation',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className="bg-[#FFFDF9] border border-[#C5A059]/30 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-3xl font-bold text-[#C5A059]/40">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#C5A059]/30 flex items-center justify-center text-[#C86D51]">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase font-bold text-[#5E7A68] tracking-wider block mb-1">
                    {item.tag}
                  </span>
                  <h3 className="font-serif-title font-bold text-xl text-[#1C1917] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          3. FEATURED PLAYABLE EXPEDITIONS
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C86D51]">
              Curated Quests
            </span>
            <h2 className="font-serif-title font-bold text-3xl sm:text-4xl text-[#1C1917] mt-1">
              Featured Game Archetypes
            </h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => navigate('/library')}
          >
            View All 8 Archetypes
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* ========================================================
          4. INTERACTIVE NATIONAL MAP PREVIEW
          ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-[#FFFDF9] border border-[#C5A059]/30 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#5E7A68]">
                Geofenced & Pan-India
              </span>
              <h2 className="font-serif-title font-bold text-2xl sm:text-3xl text-[#1C1917] mt-1">
                Explore The National Cultural Cartography
              </h2>
              <p className="text-xs sm:text-sm text-[#57534E] mt-1 max-w-xl">
                Trace ancient capitals from Pataliputra to Thanjavur, inspect UNESCO monuments, and uncover regional game missions.
              </p>
            </div>
            <Button
              variant="secondary"
              size="md"
              icon={MapPin}
              onClick={() => navigate('/map')}
            >
              Open Fullscreen Map
            </Button>
          </div>

          <IndiaCulturalMap />
        </div>
      </section>

      {/* ========================================================
          5. "WHY PLAY?" & DOCUMENTARY AUTHENTICITY
          ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-tr from-[#1C1917] via-[#2B2724] to-[#1C1917] text-[#FAF7F2] rounded-3xl p-8 sm:p-12 border border-[#C5A059]/30 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-3xl">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C5A059]">
              Documentary Philosophy
            </span>
            <h2 className="font-serif-title font-bold text-3xl sm:text-4xl text-[#FAF7F2] mt-2 mb-6">
              Engineered With Museum Integrity
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-[#FAF7F2]/80 leading-relaxed">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#C5A059] font-bold">
                  <ShieldCheck className="w-5 h-5 text-[#5E7A68]" />
                  <span>Zero AI Hallucinations</span>
                </div>
                <p className="text-xs">
                  Every epigraph, alchemical formula, and architectural ratio matches peer-reviewed ASI & UNESCO surveys.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#C5A059] font-bold">
                  <Eye className="w-5 h-5 text-[#C86D51]" />
                  <span>Observation-First Discovery</span>
                </div>
                <p className="text-xs">
                  No generic multiple-choice quizzes. Solve mysteries by rotating 3D bronzes, decoding script, and balancing harmonics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. HORIZONTAL ARTIFACT REEL
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C86D51]">
              Codex Collection
            </span>
            <h2 className="font-serif-title font-bold text-2xl sm:text-3xl text-[#1C1917] mt-1">
              Discovered Relics & Artifacts
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => navigate('/dashboard')}
          >
            View Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredArtifacts.map((art) => (
            <ArtifactCard key={art.id} artifact={art} />
          ))}
        </div>
      </section>

      {/* ========================================================
          7. FINAL CALL TO ACTION
          ======================================================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="bg-[#FFFDF9] border border-[#C5A059]/40 rounded-3xl p-10 sm:p-14 shadow-lg">
          <h2 className="font-serif-title font-bold text-3xl sm:text-4xl text-[#1C1917] mb-4">
            Begin Your Civilizational Odyssey Today
          </h2>
          <p className="text-sm sm:text-base text-[#57534E] max-w-xl mx-auto leading-relaxed mb-8">
            Immerse yourself in history through interactive games, collect rare cultural artifacts, and ascend the scholar ranks.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              icon={Sparkles}
              iconPosition="right"
              onClick={() => {
                playBell(700);
                navigate('/explore');
              }}
            >
              Start Free Expedition
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
