import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { useAudio } from '@/context/AudioContext';

export const CivilizationCard = ({ civilization, onSelect }) => {
  const { playBell } = useAudio();

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      onClick={() => {
        playBell(600);
        if (onSelect) onSelect(civilization);
      }}
      className="group cursor-pointer bg-[#FFFDF9] border border-[#C5A059]/30 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#C5A059] flex flex-col transition-all duration-300"
    >
      <div className="relative h-44 w-full overflow-hidden bg-[#1C1917]">
        <img
          src={civilization.coverImage}
          alt={civilization.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-transparent to-black/20" />

        <div className="absolute top-3.5 left-3.5">
          <span className="text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#1C1917]/80 text-[#C5A059] border border-[#C5A059]/40">
            {civilization.period}
          </span>
        </div>

        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#FAF7F2]">
          <span className="font-mono text-[11px] text-[#EADCC9]">
            {civilization.region}
          </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif-title font-bold text-lg text-[#1C1917] group-hover:text-[#C86D51] transition-colors mb-1.5">
            {civilization.name}
          </h3>
          <p className="text-xs text-[#57534E] leading-relaxed line-clamp-2 mb-3">
            {civilization.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {civilization.innovations?.slice(0, 2).map((inv, idx) => (
              <span
                key={idx}
                className="text-[10px] bg-[#FAF7F2] text-[#5E7A68] font-medium px-2 py-0.5 rounded-md border border-[#EADCC9]"
              >
                {inv}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-[#EADCC9]/60 flex items-center justify-between text-xs font-semibold text-[#C5A059] group-hover:text-[#C86D51] transition-colors">
          <span>Explore Relics & Quests</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};

export default CivilizationCard;
