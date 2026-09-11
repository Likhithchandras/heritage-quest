import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, AlertCircle, Eye, Lightbulb } from 'lucide-react';
import ArtifactInspector3D from '@/components/3d/ArtifactInspector3D';
import Button from '@/components/common/Button';
import { useAudio } from '@/context/AudioContext';

export const ArchetypeArtifactDetective = ({ game, onComplete, updateScore }) => {
  const [discoveredHotspots, setDiscoveredHotspots] = useState([]);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizComplete, setQuizComplete] = useState(false);
  const { playBell, playChime } = useAudio();

  const handleHotspotClick = (hs) => {
    setSelectedHotspot(hs);
    if (!discoveredHotspots.includes(hs.id)) {
      const next = [...discoveredHotspots, hs.id];
      setDiscoveredHotspots(next);
      updateScore(Math.round(game.xpReward * (next.length / (game.hotspots.length * 2))));
    }
  };

  const handleSelectAnswer = (hsId, answerChoice) => {
    playBell(600);
    const updated = { ...userAnswers, [hsId]: answerChoice };
    setUserAnswers(updated);

    if (Object.keys(updated).length === game.hotspots.length) {
      setQuizComplete(true);
      updateScore(game.xpReward);
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      {/* Intro Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C86D51]">
          Micro-Inspection Mode
        </span>
        <h1 className="font-serif-title font-bold text-2xl sm:text-3xl text-[#1C1917] mt-1">
          {game.title}
        </h1>
        <p className="text-xs sm:text-sm text-[#57534E] mt-2">
          {game.tagline}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 3D Artifact Viewer */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <ArtifactInspector3D
            modelType={game.artifactModelType || 'bronze_nataraja'}
            hotspots={game.hotspots || []}
            discoveredHotspots={discoveredHotspots}
            onHotspotClick={handleHotspotClick}
          />

          {/* Metallurgical / Historical Note Box */}
          <div className="bg-[#FFFDF9] border border-[#C5A059]/30 rounded-2xl p-4 shadow-sm">
            <h4 className="font-serif-title font-bold text-xs text-[#1C1917] mb-1 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-[#C5A059]" />
              Historical & Metallurgical Record
            </h4>
            <p className="text-xs text-[#57534E] leading-relaxed">
              {game.historicalContext}
            </p>
          </div>
        </div>

        {/* Right: Inspection Dossier & Clue Questions */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-[#FFFDF9] border border-[#C5A059]/30 rounded-3xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif-title font-bold text-base text-[#1C1917]">
                Artifact Investigation Log
              </h3>
              <span className="text-xs font-mono font-bold text-[#C86D51]">
                {discoveredHotspots.length} / {game.hotspots?.length || 3} Inspected
              </span>
            </div>

            <div className="space-y-4">
              {game.hotspots?.map((hs, idx) => {
                const isDiscovered = discoveredHotspots.includes(hs.id);
                const isAnswered = !!userAnswers[hs.id];

                return (
                  <div
                    key={hs.id}
                    className={`border rounded-2xl p-4 transition-all duration-300 ${
                      isDiscovered
                        ? 'bg-[#FAF7F2] border-[#C5A059]/40'
                        : 'bg-[#FAF7F2]/40 border-dashed border-[#EADCC9]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#1C1917] text-[#FAF7F2] text-[10px] font-mono font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <h4 className="font-serif-title font-bold text-sm text-[#1C1917]">
                          {hs.title}
                        </h4>
                      </div>
                      {isAnswered && (
                        <CheckCircle2 className="w-4 h-4 text-[#5E7A68]" />
                      )}
                    </div>

                    {isDiscovered ? (
                      <div>
                        <p className="text-xs text-[#57534E] mb-3 leading-relaxed">
                          {hs.clue}
                        </p>

                        {/* Interactive Decipher Choice */}
                        <div className="space-y-1.5">
                          <p className="text-[11px] font-semibold text-[#1C1917]">
                            Decipher the symbolic meaning:
                          </p>
                          <div className="grid grid-cols-1 gap-1.5">
                            {[hs.answer, 'Mortal Illusion', 'Ephemeral Storm'].sort().map((choice, cIdx) => (
                              <button
                                key={cIdx}
                                onClick={() => handleSelectAnswer(hs.id, choice)}
                                className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors border ${
                                  userAnswers[hs.id] === choice
                                    ? choice === hs.answer
                                      ? 'bg-[#5E7A68] text-white border-[#5E7A68]'
                                      : 'bg-[#C86D51] text-white border-[#C86D51]'
                                    : 'bg-[#FFFDF9] text-[#1C1917] border-[#EADCC9] hover:border-[#C5A059]'
                                }`}
                              >
                                {choice}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-[#57534E]/70 italic">
                        Rotate the 3D model and click the glowing node to inspect.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchetypeArtifactDetective;
