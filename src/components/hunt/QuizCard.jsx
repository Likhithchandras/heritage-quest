import React, { useState } from 'react';
import { BookOpen, HelpCircle, CheckCircle, AlertCircle, Volume2, Sparkles, MinusCircle } from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';
import { speechNarrator } from '../../utils/speechNarrator';

export default function QuizCard({ fact, quiz, checkpointName, onComplete }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [wrongAttempts, setWrongAttempts] = useState(0);

  // Base 20 XP, reduced by 5 XP for each wrong attempt (minimum 5 XP)
  const currentPointsAvailable = Math.max(5, 20 - (wrongAttempts * 5));

  const handleReadFact = () => {
    soundEffects.playClick();
    speechNarrator.speak(`Heritage Fact: ${fact}`);
  };

  const handleReadQuestion = () => {
    soundEffects.playClick();
    const optionsText = quiz.options.map((opt, i) => `Option ${i + 1}: ${opt}`).join('. ');
    speechNarrator.speak(`Question: ${quiz.question}. ${optionsText}`);
  };

  const handleSelectOption = (idx) => {
    if (answered) return;
    setSelectedOption(idx);
    soundEffects.playClick();

    if (idx === quiz.correctAnswer) {
      setAnswered(true);
      setFeedback('correct');
      soundEffects.playCorrect();
      setTimeout(() => {
        onComplete(currentPointsAvailable);
      }, 1200);
    } else {
      setWrongAttempts(prev => prev + 1);
      setFeedback('wrong');
      soundEffects.playWrong();
    }
  };

  return (
    <div className="space-y-6">
      {/* Fact Card (Step 4: Learn) */}
      <div className="bg-amber-950/40 border-2 border-amber-500/40 rounded-3xl p-6 md:p-8 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-amber-300">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-sm uppercase tracking-wider">Step 4: Ancient Discovery Fact</h3>
          </div>
          <button
            onClick={handleReadFact}
            className="p-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-full transition-colors"
            title="Read Fact Aloud"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        <p className="text-stone-200 text-base md:text-lg leading-relaxed bg-stone-950/60 p-5 rounded-2xl border border-stone-800">
          💡 {fact}
        </p>
      </div>

      {/* Quiz Card (Step 5: MCQ) */}
      <div className="bg-stone-900/90 border-2 border-stone-800 rounded-3xl p-6 md:p-8 space-y-5 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-amber-400">
            <HelpCircle className="w-5 h-5" />
            <h3 className="font-bold text-sm uppercase tracking-wider">Step 5: Explorer Trivia Challenge</h3>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border transition-colors ${
              wrongAttempts > 0 
                ? 'bg-red-500/20 text-red-300 border-red-500/40' 
                : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
            }`}>
              ⭐ +{currentPointsAvailable} XP
            </span>
            <button
              onClick={handleReadQuestion}
              className="p-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-full transition-colors"
              title="Read Question Aloud"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="text-stone-100 font-serif font-bold text-lg md:text-xl">
          {quiz.question}
        </div>

        {/* Options */}
        <div className="space-y-3 pt-2">
          {quiz.options.map((opt, idx) => {
            const isChosen = selectedOption === idx;
            const isCorrect = idx === quiz.correctAnswer;
            
            let btnClass = "w-full p-4 rounded-2xl text-left font-medium text-sm md:text-base border transition-all duration-200 flex items-center justify-between ";
            
            if (answered && isCorrect) {
              btnClass += "bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md";
            } else if (feedback === 'wrong' && isChosen) {
              btnClass += "bg-red-950/60 border-red-500 text-red-200";
            } else {
              btnClass += "bg-stone-950/60 border-stone-800 hover:border-amber-500/40 text-stone-200 hover:bg-stone-900";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={answered}
                className={btnClass}
              >
                <div className="flex items-center space-x-3">
                  <span className="w-7 h-7 rounded-full bg-stone-800 text-amber-300 flex items-center justify-center font-bold text-xs">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt}</span>
                </div>

                {answered && isCorrect && (
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Wrong attempt feedback banner with -5 XP reduction notice */}
        {feedback === 'wrong' && !answered && (
          <div className="p-3 bg-red-500/20 border border-red-500/40 rounded-xl text-red-200 text-xs font-semibold flex items-center justify-between animate-shake">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>Incorrect choice! Read the discovery fact above and try again.</span>
            </div>
            <span className="px-2 py-0.5 bg-red-500/30 text-red-300 font-extrabold rounded text-[11px] shrink-0">
              -5 XP Penalty
            </span>
          </div>
        )}

        {feedback === 'correct' && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs font-bold flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>Brilliant! Correct answer (+{currentPointsAvailable} XP Awarded)!</span>
          </div>
        )}
      </div>
    </div>
  );
}

