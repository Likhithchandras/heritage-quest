import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, RotateCcw, Hammer } from 'lucide-react';
import Button from '@/components/common/Button';
import { useAudio } from '@/context/AudioContext';

export const ArchetypeRebuildMonument = ({ game, onComplete, updateScore }) => {
  const [placedLayers, setPlacedLayers] = useState([]);
  const { playBell, playChime } = useAudio();

  const layers = [
    { id: 'l1', name: 'Upapitha & Adhisthana', desc: 'Granite foundation molded with elephant friezes', icon: '🧱' },
    { id: 'l2', name: 'Garbhagriha Sanctum', desc: 'Monolithic inner sanctum with circumambulatory corridor', icon: '🏛️' },
    { id: 'l3', name: '13-Tiered Vimana Pyramid', desc: 'Stepped granite pyramidal tower rising 66 meters', icon: '🔺' },
    { id: 'l4', name: 'Kumbam & Kalasha Finial', desc: '80-ton single octagonal granite capstone', icon: '✨' },
  ];

  const handlePlaceLayer = (layer) => {
    playBell(600 + placedLayers.length * 100);
    if (!placedLayers.find((l) => l.id === layer.id)) {
      const updated = [...placedLayers, layer];
      setPlacedLayers(updated);

      if (updated.length === layers.length) {
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
          Architectural Engineering Assembly
        </span>
        <h1 className="font-serif-title font-bold text-2xl sm:text-3xl text-[#1C1917] mt-1">
          {game.title}
        </h1>
        <p className="text-xs sm:text-sm text-[#57534E] mt-2">
          {game.tagline}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Interactive Construction Tower */}
        <div className="bg-[#FFFDF9] border border-[#C5A059]/30 rounded-3xl p-6 flex flex-col justify-end items-center min-h-[400px] relative shadow-md">
          <div className="absolute top-4 left-4 text-xs font-mono font-bold text-[#57534E]">
            Vimana Elevation View ({placedLayers.length}/{layers.length})
          </div>

          <div className="w-full max-w-xs flex flex-col-reverse gap-2">
            {layers.map((layer) => {
              const isPlaced = placedLayers.find((l) => l.id === layer.id);
              return (
                <motion.div
                  key={layer.id}
                  initial={false}
                  animate={isPlaced ? { opacity: 1, scale: 1 } : { opacity: 0.25, scale: 0.95 }}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    isPlaced
                      ? 'bg-gradient-to-r from-[#C5A059]/20 via-[#FAF7F2] to-[#C5A059]/20 border-[#C5A059] shadow-md'
                      : 'border-dashed border-[#57534E]/30'
                  }`}
                >
                  <span className="text-2xl block mb-1">{layer.icon}</span>
                  <div className="text-xs font-bold text-[#1C1917] font-serif-title">
                    {layer.name}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right: Architectural Parts Selector */}
        <div className="bg-[#FFFDF9] border border-[#C5A059]/30 rounded-3xl p-6 shadow-md flex flex-col justify-between">
          <div>
            <h3 className="font-serif-title font-bold text-base text-[#1C1917] mb-3">
              Assemble Structural Sections (Base to Finial)
            </h3>
            <p className="text-xs text-[#57534E] mb-4">
              Select architectural layers in interlocking sequence:
            </p>

            <div className="space-y-3">
              {layers.map((layer, idx) => {
                const isPlaced = placedLayers.find((l) => l.id === layer.id);
                const isNextInOrder = placedLayers.length === idx;

                return (
                  <button
                    key={layer.id}
                    disabled={isPlaced || !isNextInOrder}
                    onClick={() => handlePlaceLayer(layer)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
                      isPlaced
                        ? 'bg-[#5E7A68]/15 border-[#5E7A68] text-[#5E7A68]'
                        : isNextInOrder
                        ? 'bg-[#FFFDF9] border-[#C5A059] shadow-md hover:bg-[#FAF7F2]'
                        : 'opacity-40 border-gray-200 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{layer.icon}</span>
                      <div>
                        <div className="text-xs font-bold text-[#1C1917]">
                          {layer.name}
                        </div>
                        <div className="text-[10px] text-[#57534E]">
                          {layer.desc}
                        </div>
                      </div>
                    </div>
                    {isPlaced && <CheckCircle2 className="w-5 h-5 text-[#5E7A68]" />}
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

export default ArchetypeRebuildMonument;
