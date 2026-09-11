import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Sparkles, 
  Award, 
  ArrowLeft, 
  ShieldCheck, 
  BookOpen, 
  Play, 
  CheckCircle2 
} from 'lucide-react';
import Button from '@/components/common/Button';
import { GAMES_DATA } from '@/data/gamesData';
import { useAudio } from '@/context/AudioContext';

export const GameDetailPage = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { playBell } = useAudio();
  const [pledgeAgreed, setPledgeAgreed] = useState(true);

  const game = GAMES_DATA.find((g) => g.id === gameId) || GAMES_DATA[0];

  const handleStartGame = () => {
    playBell(800);
    navigate(`/experience/${game.id}`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button */}
      <div>
        <Link
          to="/library"
          onClick={() => playBell(450)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#57534E] hover:text-[#1C1917] bg-[#FAF7F2] px-3.5 py-1.5 rounded-full border border-[#EADCC9] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Game Library</span>
        </Link>
      </div>

      {/* Hero Banner */}
      <div className="relative h-80 sm:h-96 w-full rounded-3xl overflow-hidden shadow-xl bg-[#1C1917]">
        <img
          src={game.coverImage}
          alt={game.title}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/40 to-transparent" />

        <div className="absolute bottom-6 left-6 right-6 sm:left-10 sm:right-10 text-white">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-[11px] font-mono font-bold tracking-wider px-3 py-1 rounded-full bg-[#C5A059] text-[#1C1917]">
              {game.archetypeName}
            </span>
            <span className="text-[11px] font-mono font-bold tracking-wider px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30">
              {game.era}
            </span>
          </div>

          <h1 className="font-serif-title font-bold text-2xl sm:text-4xl lg:text-5xl text-white mb-2">
            {game.title}
          </h1>

          <p className="text-xs sm:text-sm text-[#EADCC9] max-w-2xl line-clamp-2">
            {game.tagline}
          </p>
        </div>
      </div>

      {/* Quick Specs Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#FFFDF9] border border-[#C5A059]/30 rounded-2xl p-4 text-center">
          <span className="text-[10px] font-mono font-bold uppercase text-[#57534E]">Duration</span>
          <div className="font-mono font-bold text-sm text-[#1C1917] mt-0.5">{game.duration}</div>
        </div>

        <div className="bg-[#FFFDF9] border border-[#C5A059]/30 rounded-2xl p-4 text-center">
          <span className="text-[10px] font-mono font-bold uppercase text-[#57534E]">Difficulty</span>
          <div className="font-mono font-bold text-sm text-[#C86D51] mt-0.5">{game.difficulty}</div>
        </div>

        <div className="bg-[#FFFDF9] border border-[#C5A059]/30 rounded-2xl p-4 text-center">
          <span className="text-[10px] font-mono font-bold uppercase text-[#57534E]">XP Potential</span>
          <div className="font-mono font-bold text-sm text-[#5E7A68] mt-0.5">+{game.xpReward} XP</div>
        </div>

        <div className="bg-[#FFFDF9] border border-[#C5A059]/30 rounded-2xl p-4 text-center">
          <span className="text-[10px] font-mono font-bold uppercase text-[#57534E]">Honorary Title</span>
          <div className="font-serif-title font-bold text-xs text-[#1C1917] mt-1 truncate">{game.badgeName}</div>
        </div>
      </div>

      {/* Main Content Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          {/* Narrative Story Intro */}
          <div className="bg-[#FFFDF9] border border-[#C5A059]/30 rounded-3xl p-6 shadow-sm">
            <h3 className="font-serif-title font-bold text-lg text-[#1C1917] mb-3">
              The Historical Narrative
            </h3>
            <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
              {game.storyIntro}
            </p>
          </div>

          {/* Historical Significance */}
          <div className="bg-[#FFFDF9] border border-[#C5A059]/30 rounded-3xl p-6 shadow-sm">
            <h3 className="font-serif-title font-bold text-lg text-[#1C1917] mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#C5A059]" />
              Verified Archaeological Context
            </h3>
            <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
              {game.historicalContext}
            </p>
          </div>
        </div>

        {/* Right Sidebar: Launch Action & Skills */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#FFFDF9] border border-[#C5A059]/30 rounded-3xl p-6 shadow-md space-y-5">
            <h3 className="font-serif-title font-bold text-base text-[#1C1917]">
              Ready for Investigation?
            </h3>

            {/* Skills learned */}
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-[#57534E] block mb-2">
                Competencies You Will Master:
              </span>
              <ul className="space-y-1.5">
                {game.skillsLearned?.map((skill, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-[#1C1917]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5E7A68] shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Responsible tourism pledge */}
            <div className="p-3 bg-[#FAF7F2] rounded-2xl border border-[#EADCC9] text-[11px] text-[#57534E] flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#5E7A68] shrink-0 mt-0.5" />
              <span>I pledge to respect monument sanctity and preserve cultural memory.</span>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full"
              icon={Play}
              iconPosition="right"
              onClick={handleStartGame}
            >
              Start Experience
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetailPage;
