import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Award, Sparkles, ArrowRight, RotateCcw, Compass, CheckCircle } from 'lucide-react';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import { useAudio } from '@/context/AudioContext';

export const GameCompleteModal = ({
  isOpen,
  game,
  scoreEarned,
  onReplay,
}) => {
  const navigate = useNavigate();
  const { playSuccessChime } = useAudio();

  useEffect(() => {
    if (isOpen) {
      playSuccessChime();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C5A059', '#C86D51', '#5E7A68', '#FAF7F2'],
        });
      } catch (err) {
        console.error('Confetti error:', err);
      }
    }
  }, [isOpen, playSuccessChime]);

  if (!game) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => navigate('/dashboard')}
      title="Expedition Completed!"
      subtitle="Historical Knowledge & Artifact Mastered"
      maxWidth="max-w-lg"
      showClose={false}
    >
      <div className="text-center py-2">
        {/* Animated Trophy Emblem */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
          className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-[#C5A059] via-[#EADCC9] to-[#FFFDF9] flex items-center justify-center text-4xl shadow-xl border-2 border-[#C5A059] mb-4"
        >
          🏆
        </motion.div>

        <h3 className="font-serif-title font-bold text-2xl text-[#1C1917] mb-1">
          {game.title}
        </h3>
        <p className="text-xs text-[#57534E] mb-6">
          Verified historical masterwork added to your civilizational codex.
        </p>

        {/* Rewards Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-[#FAF7F2] border border-[#C5A059]/30 rounded-2xl p-3.5 text-center">
            <span className="text-[10px] font-mono font-bold uppercase text-[#57534E]">
              Cultural XP Earned
            </span>
            <div className="text-xl font-mono font-bold text-[#C86D51] mt-0.5 flex items-center justify-center gap-1">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              +{scoreEarned || game.xpReward} XP
            </div>
          </div>

          <div className="bg-[#FAF7F2] border border-[#C5A059]/30 rounded-2xl p-3.5 text-center">
            <span className="text-[10px] font-mono font-bold uppercase text-[#57534E]">
              Honorary Badge
            </span>
            <div className="text-sm font-serif-title font-bold text-[#1C1917] mt-1 truncate">
              {game.badgeName || 'Keeper of Lore'}
            </div>
          </div>
        </div>

        {/* Skills Mastered */}
        {game.skillsLearned && (
          <div className="bg-[#5E7A68]/10 border border-[#5E7A68]/20 rounded-2xl p-3 mb-6 text-left">
            <div className="text-[11px] font-mono font-bold text-[#5E7A68] uppercase mb-1.5 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Competencies Acquired</span>
            </div>
            <ul className="text-xs text-[#1C1917] space-y-1 pl-4 list-disc">
              {game.skillsLearned.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
          {onReplay && (
            <Button
              variant="outline"
              size="md"
              icon={RotateCcw}
              onClick={onReplay}
            >
              Replay Quest
            </Button>
          )}
          <Button
            variant="primary"
            size="md"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => navigate('/dashboard')}
          >
            Adventure HQ
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default GameCompleteModal;
