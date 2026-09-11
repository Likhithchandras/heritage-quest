import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, RotateCcw, HelpCircle } from 'lucide-react';
import Button from '@/components/common/Button';
import { useAudio } from '@/context/AudioContext';

export const ArchetypeAncientMessage = ({ game, onComplete, updateScore }) => {
  const [selectedGlyphs, setSelectedGlyphs] = useState([]);
  const [isDeciphered, setIsDeciphered] = useState(false);
  const { playBell, playChime } = useAudio();

  const glyphList = game.puzzle?.glyphs || [
    { id: 'g1', symbol: '🐟', name: 'Mīn (Fish)', meaning: 'Star / Value' },
    { id: 'g2', symbol: '🏺', name: 'Kumbha (Jar)', meaning: 'Measurement Unit' },
    { id: 'g3', symbol: '🏹', name: 'Dhanu (Arrow)', meaning: 'Direction / Export' },
    { id: 'g4', symbol: '🦏', name: 'Khadga (Rhino)', meaning: 'Royal Guild Stamp' },
  ];

  const handleSelectGlyph = (g) => {
    playBell(600);
    if (selectedGlyphs.find((item) => item.id === g.id)) {
      setSelectedGlyphs(selectedGlyphs.filter((item) => item.id !== g.id));
    } else {
      const updated = [...selectedGlyphs, g];
      setSelectedGlyphs(updated);

      if (updated.length === glyphList.length) {
        setIsDeciphered(true);
        updateScore(game.xpReward);
        setTimeout(() => {
          onComplete();
        }, 1500);
      }
    }
  };

  const handleReset = () => {
    setSelectedGlyphs([]);
    setIsDeciphered(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <div className="text-center mb-8">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C86D51]">
          Epigraphical Decryption • {game.civilization}
        </span>
        <h1 className="font-serif-title font-bold text-2xl sm:text-3xl text-[#1C1917] mt-1">
          {game.title}
        </h1>
        <p className="text-xs sm:text-sm text-[#57534E] mt-2">
          {game.tagline}
        </p>
      </div>

      <div className="bg-[#FFFDF9] border border-[#C5A059]/30 rounded-3xl p-6 sm:p-8 shadow-md">
        
        {/* Decryption Slot Chamber */}
        <div className="bg-[#FAF7F2] border-2 border-dashed border-[#C5A059]/40 rounded-2xl p-6 mb-8 text-center">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#57534E] mb-3">
            Steatite Tablet Slot Assembly
          </div>
          
          <div className="flex items-center justify-center gap-3 min-h-[80px] flex-wrap">
            {selectedGlyphs.length === 0 ? (
              <span className="text-xs text-[#57534E]/60 italic">
                Select glyphs below in their phonosemantic order
              </span>
            ) : (
              selectedGlyphs.map((g, idx) => (
                <motion.div
                  key={g.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-[#FFFDF9] border border-[#C5A059] rounded-2xl px-4 py-3 shadow-md flex items-center gap-2"
                >
                  <span className="text-2xl">{g.symbol}</span>
                  <div className="text-left">
                    <span className="text-xs font-bold text-[#1C1917] block font-serif-title">
                      {g.name}
                    </span>
                    <span className="text-[10px] text-[#5E7A68] font-mono block">
                      {g.meaning}
                    </span>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {isDeciphered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 rounded-xl bg-[#5E7A68]/15 border border-[#5E7A68] text-xs font-bold text-[#5E7A68]"
            >
              ✓ Manifest Authenticated: "{game.puzzle?.targetPhrase || 'GRAIN SHIPMENT TO MELUHHA'}"
            </motion.div>
          )}
        </div>

        {/* Available Glyphs */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#57534E]">
              Cataloged Harappan Glyphtiles:
            </h4>
            <button
              onClick={handleReset}
              className="text-xs text-[#C86D51] hover:underline flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {glyphList.map((g) => {
              const isSelected = selectedGlyphs.find((item) => item.id === g.id);
              return (
                <button
                  key={g.id}
                  onClick={() => handleSelectGlyph(g)}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    isSelected
                      ? 'bg-[#EADCC9] border-[#C5A059] shadow-inner opacity-50'
                      : 'bg-[#FFFDF9] border-[#C5A059]/30 hover:border-[#C5A059] hover:shadow-md'
                  }`}
                >
                  <div className="text-3xl mb-1">{g.symbol}</div>
                  <div className="text-xs font-bold text-[#1C1917] font-serif-title">
                    {g.name}
                  </div>
                  <div className="text-[10px] text-[#57534E] mt-0.5">
                    {g.meaning}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchetypeAncientMessage;
