import React, { useState } from 'react';
import { HelpCircle, Lightbulb, Volume2, CheckCircle2, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';
import { speechNarrator } from '../../utils/speechNarrator';

export default function RiddleBox({ riddle, checkpointName, onSolved }) {
  const [hintsUnlocked, setHintsUnlocked] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSolved, setIsSolved] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Scoring: 0 hints = 50 pts, 1 hint = 40 pts, 2 hints = 30 pts
  const pointsAvailable = hintsUnlocked === 0 ? 50 : hintsUnlocked === 1 ? 40 : 30;

  const handleReadRiddle = () => {
    soundEffects.playClick();
    speechNarrator.speak(`Ancient Riddle: ${riddle.text}`);
  };

  const handleUnlockHint = () => {
    if (hintsUnlocked < riddle.hints.length) {
      soundEffects.playHint();
      const nextHint = hintsUnlocked + 1;
      setHintsUnlocked(nextHint);
      speechNarrator.speak(`Hint: ${riddle.hints[hintsUnlocked]}`);
    }
  };

  const handleAnswerSubmit = (idx) => {
    if (isSolved) return;
    setSelectedOption(idx);
    soundEffects.playClick();

    if (idx === riddle.correctOption) {
      setIsSolved(true);
      setFeedback('correct');
      soundEffects.playCorrect();
      setTimeout(() => {
        onSolved(pointsAvailable);
      }, 1200);
    } else {
      setFeedback('wrong');
      soundEffects.playWrong();
    }
  };

  return (
    <div className="bg-gradient-to-b from-stone-900 to-stone-950 border-2 border-amber-500/40 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <HelpCircle className="w-5 h-5 text-amber-400" />
          <h3 className="font-serif font-bold text-amber-200 text-base md:text-lg">
            Step 3: Decode the Ancient Riddle
          </h3>
        </div>
        <button
          onClick={handleReadRiddle}
          className="p-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-full transition-colors"
          title="Read Riddle Aloud"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>

      {/* Rhyming Riddle Text */}
      <div className="p-6 bg-amber-950/40 border-2 border-amber-500/30 rounded-2xl relative shadow-inner">
        <p className="text-amber-100 font-serif text-base md:text-lg italic leading-relaxed text-center">
          "{riddle.text}"
        </p>
        <div className="mt-3 text-right">
          <span className="text-xs font-bold text-amber-400 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30">
            ⭐ +{pointsAvailable} XP Award
          </span>
        </div>
      </div>

      {/* Progressive Hints Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
            Detective Clues & Hints ({hintsUnlocked}/{riddle.hints.length})
          </span>
          {hintsUnlocked < riddle.hints.length && !isSolved && (
            <button
              onClick={handleUnlockHint}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 inline-flex items-center space-x-1.5 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30 transition-colors"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Need a Clue? (-10 XP)</span>
            </button>
          )}
        </div>

        {hintsUnlocked > 0 && (
          <div className="space-y-2">
            {riddle.hints.slice(0, hintsUnlocked).map((h, i) => (
              <div
                key={i}
                className="p-3 bg-amber-900/30 border border-amber-500/30 rounded-xl text-amber-200 text-xs font-medium flex items-start space-x-2 animate-fadeIn"
              >
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Clue {i + 1}:</strong> {h}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Multiple Choice Answers */}
      <div className="space-y-3 pt-2">
        <div className="text-xs font-bold uppercase tracking-wider text-stone-400">
          Choose the Correct Answer:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {riddle.options.map((opt, idx) => {
            const isChosen = selectedOption === idx;
            const isCorrect = idx === riddle.correctOption;

            let btnStyle = "p-4 rounded-2xl text-left font-medium text-sm border transition-all duration-200 flex items-center justify-between ";

            if (isSolved && isCorrect) {
              btnStyle += "bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md";
            } else if (feedback === 'wrong' && isChosen) {
              btnStyle += "bg-amber-950/60 border-amber-500 text-amber-200";
            } else {
              btnStyle += "bg-stone-950/70 border-stone-800 hover:border-amber-500/40 text-stone-200 hover:bg-stone-900";
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswerSubmit(idx)}
                disabled={isSolved}
                className={btnStyle}
              >
                <div className="flex items-center space-x-2.5">
                  <span className="w-6 h-6 rounded-full bg-stone-800 text-amber-300 flex items-center justify-center font-bold text-xs">
                    {idx + 1}
                  </span>
                  <span>{opt}</span>
                </div>
                {isSolved && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Gentle feedback banner */}
      {feedback === 'wrong' && !isSolved && (
        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-xs font-semibold flex items-center space-x-2 animate-shake">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
          <span>Good try! Think about the rhyming lines or unlock a detective clue above.</span>
        </div>
      )}

      {feedback === 'correct' && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs font-bold flex items-center space-x-2">
          <Sparkles className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>Brilliant riddle solving! Awarding +{pointsAvailable} XP...</span>
        </div>
      )}
    </div>
  );
}
