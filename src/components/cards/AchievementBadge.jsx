import React from 'react';
import { motion } from 'framer-motion';
import { Award, Lock, Sparkles } from 'lucide-react';

export const AchievementBadge = ({ badge, isUnlocked = true }) => {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={`rounded-2xl p-4 border transition-all text-center flex flex-col items-center justify-between ${
        isUnlocked
          ? 'bg-[#FFFDF9] border-[#C5A059]/40 shadow-sm'
          : 'bg-[#FAF7F2]/50 border-dashed border-[#EADCC9] opacity-60'
      }`}
    >
      <div className="relative mb-2">
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-inner ${
            isUnlocked
              ? 'bg-gradient-to-tr from-[#C5A059] to-[#EADCC9] border border-[#C5A059]'
              : 'bg-[#EADCC9]/40 text-[#57534E]'
          }`}
        >
          {isUnlocked ? badge.icon || '🏅' : <Lock className="w-5 h-5 text-[#57534E]" />}
        </div>
      </div>

      <div>
        <h5 className="font-serif-title font-bold text-xs text-[#1C1917] mb-1 line-clamp-1">
          {badge.title}
        </h5>
        <p className="text-[10px] text-[#57534E] line-clamp-2 leading-tight">
          {badge.description}
        </p>
      </div>

      <div className="mt-2 text-[10px] font-mono font-bold text-[#C5A059]">
        +{badge.xpReward || 100} XP
      </div>
    </motion.div>
  );
};

export default AchievementBadge;
