import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import Button from '@/components/common/Button';
import { useAudio } from '@/context/AudioContext';

export const ArchetypeCulturalCraft = ({ game, onComplete, updateScore }) => {
  const [inlaidTiles, setInlaidTiles] = useState([]);
  const { playBell } = useAudio();

  const gems = [
    { id: 'g1', name: 'Lapis Lazuli (Deep Blue)', color: 'bg-blue-600' },
    { id: 'g2', name: 'Cornelian (Fiery Red)', color: 'bg-amber-600' },
    { id: 'g3', name: 'Malachite (Emerald Green)', color: 'bg-emerald-600' },
    { id: 'g4', name: 'Jasper (Golden Ochre)', color: 'bg-yellow-600' },
  ];

  const handleInlay = (gem) => {
    playBell(700);
    if (!inlaidTiles.includes(gem.id)) {
      const updated = [...inlaidTiles, gem.id];
      setInlaidTiles(updated);

      if (updated.length === gems.length) {
        updateScore(game.xpReward);
        setTimeout(() => {
          onComplete();
        }, 1500);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <div className="text-center mb-8">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C86D51]">
          Pietra Dura Marble Inlay (Parchin Kari)
        </span>
        <h1 className="font-serif-title font-bold text-2xl sm:text-3xl text-[#1C1917] mt-1">
          {game.title}
        </h1>
        <p className="text-xs sm:text-sm text-[#57534E] mt-2">
          Inlay semi-precious gemstones into the Makrana white marble floral motif:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Marble Medallion Canvas */}
        <div className="bg-[#FFFDF9] border border-[#C5A059]/30 rounded-3xl p-8 flex items-center justify-center min-h-[340px] shadow-md">
          <div className="w-56 h-56 rounded-full border-4 border-[#C5A059] bg-[#FAF7F2] relative flex items-center justify-center shadow-inner">
            <span className="text-4xl select-none">🌸</span>
            <div className="absolute inset-2 border-2 border-dashed border-[#C5A059]/40 rounded-full" />
            
            {/* Embedded Gem Dots */}
            {inlaidTiles.map((tId, idx) => (
              <motion.div
                key={tId}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`absolute w-6 h-6 rounded-full shadow-lg ${
                  idx === 0 ? 'top-4' : idx === 1 ? 'bottom-4' : idx === 2 ? 'left-4' : 'right-4'
                } bg-gradient-to-tr from-[#C5A059] to-[#C86D51]`}
              />
            ))}
          </div>
        </div>

        {/* Right: Gem Palette */}
        <div className="bg-[#FFFDF9] border border-[#C5A059]/30 rounded-3xl p-6 shadow-md flex flex-col justify-between">
          <div>
            <h3 className="font-serif-title font-bold text-base text-[#1C1917] mb-3">
              Lapidary Workshop Tray
            </h3>
            <div className="space-y-3">
              {gems.map((gem) => {
                const isInlaid = inlaidTiles.includes(gem.id);
                return (
                  <button
                    key={gem.id}
                    disabled={isInlaid}
                    onClick={() => handleInlay(gem)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                      isInlaid
                        ? 'bg-[#5E7A68]/15 border-[#5E7A68] opacity-60'
                        : 'bg-[#FAF7F2] border-[#C5A059]/40 hover:border-[#C5A059]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-4 h-4 rounded-full ${gem.color}`} />
                      <span className="text-xs font-semibold text-[#1C1917]">{gem.name}</span>
                    </div>
                    {isInlaid && <CheckCircle2 className="w-4 h-4 text-[#5E7A68]" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchetypeCulturalCraft;
