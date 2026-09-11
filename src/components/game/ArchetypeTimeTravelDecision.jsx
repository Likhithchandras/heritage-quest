import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sparkles, Scroll, ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '@/components/common/Button';
import { useAudio } from '@/context/AudioContext';

export const ArchetypeTimeTravelDecision = ({ game, onComplete, updateScore }) => {
  const [currentSceneId, setCurrentSceneId] = useState('scene-1');
  const [history, setHistory] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [selectedOptionFeedback, setSelectedOptionFeedback] = useState(null);
  const { playBell, playChime } = useAudio();

  const currentScene = game.scenes?.find((s) => s.id === currentSceneId) || game.scenes?.[0];

  const handleChooseOption = (option) => {
    playBell(650);
    const newScore = totalScore + option.score;
    setTotalScore(newScore);
    updateScore(newScore);
    setSelectedOptionFeedback(option.feedback);

    setTimeout(() => {
      setSelectedOptionFeedback(null);
      if (option.nextScene === 'scene-end' || !game.scenes?.find((s) => s.id === option.nextScene)) {
        onComplete();
      } else {
        setCurrentSceneId(option.nextScene);
      }
    }, 2800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C86D51]">
          Imperial Decision Chronicle • {game.era}
        </span>
        <h1 className="font-serif-title font-bold text-2xl sm:text-3xl text-[#1C1917] mt-1">
          {game.title}
        </h1>
      </div>

      {/* Main Narrative Chamber */}
      <div className="bg-[#FFFDF9] border border-[#C5A059]/30 rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        
        {/* Decorative corner seals */}
        <div className="absolute top-4 right-4 text-3xl opacity-20 select-none">
          📜
        </div>

        <AnimatePresence mode="wait">
          {selectedOptionFeedback ? (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="py-12 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-[#5E7A68]/15 text-[#5E7A68] mx-auto flex items-center justify-center mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif-title font-bold text-xl text-[#1C1917] mb-2">
                Decree Enacted
              </h3>
              <p className="text-sm text-[#57534E] max-w-xl mx-auto leading-relaxed bg-[#FAF7F2] p-4 rounded-2xl border border-[#EADCC9]">
                {selectedOptionFeedback}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={currentScene?.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Scroll className="w-4 h-4 text-[#C5A059]" />
                <h3 className="font-serif-title font-bold text-lg text-[#1C1917]">
                  {currentScene?.title}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-[#1C1917] leading-relaxed bg-[#FAF7F2] p-5 rounded-2xl border border-[#EADCC9] mb-6">
                {currentScene?.text}
              </p>

              {/* Choices */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#57534E]">
                  Formulate Your Royal Counsel:
                </h4>
                {currentScene?.options?.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleChooseOption(opt)}
                    className="w-full text-left p-4 rounded-2xl bg-[#FFFDF9] hover:bg-[#FAF7F2] border border-[#C5A059]/30 hover:border-[#C5A059] shadow-sm hover:shadow-md transition-all group flex items-start justify-between gap-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#1C1917] text-[#FAF7F2] text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-xs sm:text-sm text-[#1C1917] font-medium leading-relaxed">
                        {opt.text}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-1 transition-transform shrink-0 mt-1" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ArchetypeTimeTravelDecision;
