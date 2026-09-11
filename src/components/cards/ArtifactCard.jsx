import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Eye, CheckCircle2 } from 'lucide-react';
import { useAudio } from '@/context/AudioContext';

export const ArtifactCard = ({ artifact, onInspect, isCollected = true }) => {
  const { playBell } = useAudio();

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-[#FFFDF9] border border-[#C5A059]/30 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all p-4 flex flex-col justify-between"
    >
      <div className="relative h-40 w-full rounded-2xl overflow-hidden bg-[#1C1917] mb-3">
        <img
          src={artifact.imageUrl}
          alt={artifact.name}
          className="w-full h-full object-cover opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-500"
        />
        
        {isCollected ? (
          <div className="absolute top-2.5 right-2.5 bg-[#5E7A68] text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
            <CheckCircle2 className="w-3 h-3" />
            Discovered
          </div>
        ) : (
          <div className="absolute top-2.5 right-2.5 bg-[#1C1917]/70 backdrop-blur-md text-[#FAF7F2] text-[10px] font-bold px-2 py-0.5 rounded-full">
            Locked
          </div>
        )}

        <div className="absolute bottom-2 left-2.5 bg-[#1C1917]/80 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-mono text-[#C5A059]">
          {artifact.period}
        </div>
      </div>

      <div>
        <h4 className="font-serif-title font-bold text-sm text-[#1C1917] line-clamp-1 mb-1">
          {artifact.name}
        </h4>
        <p className="text-[11px] text-[#57534E] line-clamp-2 leading-relaxed mb-3">
          {artifact.culturalSignificance}
        </p>
      </div>

      <button
        onClick={() => {
          playBell(700);
          if (onInspect) onInspect(artifact);
        }}
        className="w-full py-2 px-3 rounded-xl bg-[#FAF7F2] hover:bg-[#EADCC9] text-[#1C1917] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-[#EADCC9]"
      >
        <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
        <span>Inspect Micro-Lore</span>
      </button>
    </motion.div>
  );
};

export default ArtifactCard;
