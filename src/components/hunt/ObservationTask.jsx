import React, { useState } from 'react';
import { Eye, CheckCircle2, Sparkles, Volume2 } from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';
import { speechNarrator } from '../../utils/speechNarrator';

export default function ObservationTask({ task, checkpointName, onFound }) {
  const [completed, setCompleted] = useState(false);

  const handleReadTask = () => {
    soundEffects.playClick();
    speechNarrator.speak(`Observation Task: ${task}`);
  };

  const handleConfirm = () => {
    setCompleted(true);
    soundEffects.playCorrect();
    setTimeout(() => {
      onFound();
    }, 800);
  };

  return (
    <div className="bg-gradient-to-b from-stone-900 to-stone-950 border-2 border-amber-500/40 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-amber-300">
          <Eye className="w-5 h-5 text-amber-400" />
          <h3 className="font-serif font-bold text-amber-200 text-base md:text-lg">
            Step 2: Observation Mission (+10 XP)
          </h3>
        </div>
        <button
          onClick={handleReadTask}
          className="p-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-full transition-colors"
          title="Read Observation Mission Aloud"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>

      <div className="p-6 bg-amber-950/40 border-2 border-amber-500/30 rounded-2xl space-y-3">
        <div className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">
          Look Closely At The Monument:
        </div>
        <p className="text-stone-100 text-base md:text-lg font-medium leading-relaxed">
          🔎 {task}
        </p>
      </div>

      <div className="pt-2">
        <button
          onClick={handleConfirm}
          disabled={completed}
          className={`w-full py-4 px-6 rounded-2xl font-black text-base md:text-lg shadow-xl transition-all duration-300 flex items-center justify-center space-x-3 active:scale-95 ${
            completed
              ? 'bg-emerald-600 text-white'
              : 'bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-stone-950 hover:scale-[1.02]'
          }`}
        >
          {completed ? (
            <>
              <CheckCircle2 className="w-6 h-6" />
              <span>Observation Verified! (+10 XP)</span>
            </>
          ) : (
            <>
              <Sparkles className="w-6 h-6 text-stone-950" />
              <span>I Found It! (Claim +10 XP)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
