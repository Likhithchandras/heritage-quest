import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Volume2, VolumeX, Shield } from 'lucide-react';
import { useAudio } from '@/context/AudioContext';

export const GameHeader = ({
  title,
  civilization,
  currentStep = 1,
  totalSteps = 1,
  score = 0,
  xpPotential = 350,
}) => {
  const navigate = useNavigate();
  const { soundEnabled, toggleSound, playBell } = useAudio();

  const progressPercent = Math.min(100, Math.round((currentStep / totalSteps) * 100));

  return (
    <div className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#C5A059]/30 px-4 sm:px-6 py-3.5 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Exit button & Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => {
              playBell(400);
              navigate(-1);
            }}
            className="p-2 rounded-full bg-[#FAF7F2] hover:bg-[#EADCC9] text-[#1C1917] border border-[#C5A059]/30 transition-colors shrink-0"
            title="Exit Expedition"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <div className="min-w-0">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C86D51] block truncate">
              {civilization}
            </span>
            <h2 className="font-serif-title font-bold text-sm sm:text-base text-[#1C1917] truncate">
              {title}
            </h2>
          </div>
        </div>

        {/* Center Progress bar */}
        <div className="hidden md:flex flex-col items-center max-w-xs w-full px-4">
          <div className="flex items-center justify-between w-full text-[11px] font-mono text-[#57534E] mb-1">
            <span>Phase {currentStep} of {totalSteps}</span>
            <span className="font-bold text-[#C5A059]">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-[#EADCC9] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#C5A059] to-[#C86D51] transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Right: Score, XP potential & Sound */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <div className="bg-[#FAF7F2] border border-[#C5A059]/40 rounded-full px-3 py-1 flex items-center gap-1.5 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-xs font-mono font-bold text-[#1C1917]">
              {score} / {xpPotential} XP
            </span>
          </div>

          <button
            onClick={toggleSound}
            className="p-2 rounded-full text-[#57534E] hover:text-[#1C1917] hover:bg-[#EADCC9]/40 transition-colors"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#C5A059]" />
            ) : (
              <VolumeX className="w-4 h-4 opacity-50" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;
