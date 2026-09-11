import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Award, Play, Sparkles, Compass } from 'lucide-react';
import { useAudio } from '@/context/AudioContext';

export const GameCard = ({ game }) => {
  const { playBell } = useAudio();

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'Easy':
        return 'text-[#5E7A68] bg-[#5E7A68]/10 border-[#5E7A68]/30';
      case 'Medium':
        return 'text-[#C5A059] bg-[#C5A059]/15 border-[#C5A059]/40';
      case 'Hard':
        return 'text-[#C86D51] bg-[#C86D51]/10 border-[#C86D51]/30';
      default:
        return 'text-[#57534E] bg-[#57534E]/10 border-[#57534E]/20';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group relative bg-[#FFFDF9] border border-[#C5A059]/30 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#C5A059] flex flex-col transition-all duration-300"
    >
      {/* Cover Image Container */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#1C1917]">
        <img
          src={game.coverImage}
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-transparent to-black/20" />

        {/* Archetype Badge */}
        <div className="absolute top-3.5 left-3.5">
          <span className="text-[11px] font-mono font-bold tracking-wider px-3 py-1 rounded-full bg-[#1C1917]/80 backdrop-blur-md text-[#C5A059] border border-[#C5A059]/40">
            {game.archetypeName}
          </span>
        </div>

        {/* XP Badge */}
        <div className="absolute top-3.5 right-3.5">
          <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#C5A059] text-[#1C1917] shadow-md flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            +{game.xpReward} XP
          </span>
        </div>

        {/* Civilization & Era on bottom image */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#FAF7F2]">
          <span className="font-serif-title font-semibold text-[#EADCC9] truncate">
            {game.civilization}
          </span>
          <span className="font-mono text-[11px] text-[#FAF7F2]/80 shrink-0">
            {game.era}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif-title font-bold text-lg text-[#1C1917] group-hover:text-[#C86D51] transition-colors line-clamp-1 mb-2">
            {game.title}
          </h3>

          <p className="text-xs text-[#57534E] leading-relaxed line-clamp-2 mb-4">
            {game.tagline}
          </p>
        </div>

        <div>
          {/* Metadata Row */}
          <div className="flex items-center justify-between pt-3 border-t border-[#EADCC9]/60 text-xs mb-4">
            <div className="flex items-center gap-1.5 text-[#57534E]">
              <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{game.duration}</span>
            </div>

            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${getDifficultyColor(game.difficulty)}`}>
              {game.difficulty}
            </span>
          </div>

          {/* Action Link / Button */}
          <Link
            to={`/games/${game.id}`}
            onClick={() => playBell(520)}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#FAF7F2] hover:bg-[#C5A059] text-[#1C1917] hover:text-[#1C1917] font-semibold text-xs border border-[#C5A059]/40 hover:border-[#C5A059] shadow-sm transition-all duration-300"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Enter Expedition</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default GameCard;
