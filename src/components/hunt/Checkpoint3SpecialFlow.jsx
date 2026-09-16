import React, { useState } from 'react';
import { HelpCircle, Crown, Lightbulb, Volume2, CheckCircle2, Award, ArrowRight, Sparkles, BookOpen, Shield } from 'lucide-react';
import { CHECKPOINT_THREE_DATA } from '../../data/checkpointThreeData';
import { useLanguage } from '../../context/LanguageContext';
import { soundEffects } from '../../utils/soundEffects';
import { speechNarrator } from '../../utils/speechNarrator';

export default function Checkpoint3SpecialFlow({
  huntId,
  monumentName,
  onCompleteCheckpoint,
  isLastCheckpoint
}) {
  const { t } = useLanguage();
  const data = CHECKPOINT_THREE_DATA[huntId] || CHECKPOINT_THREE_DATA['hampi'];

  // Stages:
  // 1: RIDDLE (Solving Question 1: Archaeological Riddle)
  // 2: POV_QUESTION (Solving Question 2: King / Architect Roleplay Decision)
  // 3: POV_OUTCOME (Viewing the Historical Consequence & Analysis)
  const [currentStep, setCurrentStep] = useState(1);

  // Riddle state
  const [riddleHintsUnlocked, setRiddleHintsUnlocked] = useState(0);
  const [selectedRiddleOption, setSelectedRiddleOption] = useState(null);
  const [isRiddleSolved, setIsRiddleSolved] = useState(false);
  const [riddleFeedback, setRiddleFeedback] = useState(null);

  // POV Question state
  const [selectedPovOption, setSelectedPovOption] = useState(null);
  const [isPovSolved, setIsPovSolved] = useState(false);

  // Total XP earned in this checkpoint
  const [earnedPoints, setEarnedPoints] = useState({
    riddle: 60,
    pov: 70
  });

  // 1. Riddle Answer submit
  const handleRiddleAnswer = (idx) => {
    if (isRiddleSolved) return;
    setSelectedRiddleOption(idx);

    if (idx === data.riddle.correctOption) {
      setIsRiddleSolved(true);
      setRiddleFeedback('correct');
      soundEffects.playCorrect();
      setTimeout(() => {
        setCurrentStep(2); // Advance directly to POV Question
      }, 900);
    } else {
      setRiddleFeedback('wrong');
      soundEffects.playWrong();
    }
  };

  // 2. POV Decision submit
  const handlePovChoice = (idx) => {
    setSelectedPovOption(idx);
    setIsPovSolved(true);
    soundEffects.playFanfare();
    setCurrentStep(3); // Show Historical Consequence
  };

  // 3. Finish Checkpoint
  const handleFinishCheckpoint = () => {
    const totalAwarded = earnedPoints.riddle + earnedPoints.pov;
    onCompleteCheckpoint(totalAwarded);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Checkpoint 3 Special Archaeological Mystery */}
      <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 border-2 border-amber-500/50 rounded-2xl p-4 shadow-xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-amber-500/20 text-amber-300 rounded-xl border border-amber-500/40">
            <Crown className="w-5 h-5 text-amber-400 animate-pulse" />
          </div>
          <div>
            <div className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400">
              {t('cp3_header_badge')}
            </div>
            <h2 className="text-base sm:text-lg font-bold text-amber-100 font-serif">
              {data.checkpointName}
            </h2>
          </div>
        </div>
        <div className="hidden sm:block text-right">
          <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-full border border-amber-500/40">
            ⭐ +130 XP Special Stage
          </span>
        </div>
      </div>

      {/* STEP 1: QUESTION 1 — ARCHAEOLOGICAL RIDDLE */}
      {currentStep === 1 && (
        <div className="bg-stone-900/90 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-fadeIn">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-amber-500/20 text-amber-400 rounded-lg">
                <HelpCircle className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                {t('cp3_q1_title')}
              </span>
            </div>
            <button
              onClick={() => speechNarrator.speak(`Question 1 Riddle: ${data.riddle.text}`)}
              className="p-1.5 bg-stone-800 hover:bg-stone-700 text-amber-300 rounded-lg text-xs flex items-center space-x-1"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t('listen_btn')}</span>
            </button>
          </div>

          {/* Riddle Card */}
          <div className="p-5 bg-amber-950/40 border border-amber-500/40 rounded-2xl relative shadow-inner text-center space-y-2">
            <h4 className="font-serif font-bold text-amber-200 text-base">
              "{data.riddle.title}"
            </h4>
            <p className="text-stone-200 font-serif text-sm sm:text-base italic leading-relaxed">
              "{data.riddle.text}"
            </p>
          </div>

          {/* Progressive Hint */}
          <div className="flex justify-between items-center text-xs">
            <span className="text-stone-400">{t('clue_need')}</span>
            {riddleHintsUnlocked < data.riddle.hints.length && !isRiddleSolved && (
              <button
                onClick={() => setRiddleHintsUnlocked(prev => prev + 1)}
                className="text-amber-400 hover:text-amber-300 font-bold inline-flex items-center space-x-1"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>{t('reveal_clue')} ({riddleHintsUnlocked + 1}/{data.riddle.hints.length})</span>
              </button>
            )}
          </div>

          {riddleHintsUnlocked > 0 && (
            <div className="p-3 bg-amber-900/30 border border-amber-500/30 rounded-xl text-amber-200 text-xs font-medium space-y-1">
              {data.riddle.hints.slice(0, riddleHintsUnlocked).map((h, i) => (
                <div key={i}>🔍 <strong>Clue {i + 1}:</strong> {h}</div>
              ))}
            </div>
          )}

          {/* Riddle Options */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-400">
              {t('select_answer')}
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              {data.riddle.options.map((opt, idx) => {
                const isChosen = selectedRiddleOption === idx;
                const isCorrect = idx === data.riddle.correctOption;
                let btnStyle = "p-4 rounded-xl text-left font-medium text-xs sm:text-sm border transition-all flex items-center justify-between ";

                if (isRiddleSolved && isCorrect) {
                  btnStyle += "bg-emerald-950/90 border-emerald-500 text-emerald-200 shadow-md";
                } else if (riddleFeedback === 'wrong' && isChosen) {
                  btnStyle += "bg-red-950/60 border-red-500 text-red-200";
                } else {
                  btnStyle += "bg-stone-950/80 border-stone-800 hover:border-amber-500/40 text-stone-200";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleRiddleAnswer(idx)}
                    disabled={isRiddleSolved}
                    className={btnStyle}
                  >
                    <span>{opt}</span>
                    {isRiddleSolved && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: QUESTION 2 — LOGICAL THINKING / ROLEPLAY POV QUESTION */}
      {currentStep === 2 && (
        <div className="bg-stone-900/90 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-fadeIn">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-amber-500/20 text-amber-400 rounded-lg">
                <Crown className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                {t('cp3_q2_title')}
              </span>
            </div>
            <button
              onClick={() => speechNarrator.speak(`Roleplay Scenario: ${data.povQuestion.situation} Question: ${data.povQuestion.question}`)}
              className="p-1.5 bg-stone-800 hover:bg-stone-700 text-amber-300 rounded-lg text-xs flex items-center space-x-1"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t('listen_btn')}</span>
            </button>
          </div>

          {/* Roleplay Persona Badge */}
          <div className="p-4 bg-amber-950/40 border-2 border-amber-500/40 rounded-2xl space-y-2">
            <div className="inline-block px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-full border border-amber-500/40">
              {data.povQuestion.roleTitle}
            </div>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              {data.povQuestion.situation}
            </p>
          </div>

          {/* The Decision Question */}
          <div className="space-y-3">
            <h4 className="text-base sm:text-lg font-extrabold text-amber-100 font-serif">
              🤔 {data.povQuestion.question}
            </h4>

            <div className="grid grid-cols-1 gap-3 pt-1">
              {data.povQuestion.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePovChoice(idx)}
                  className="p-4 rounded-xl text-left font-medium text-xs sm:text-sm border bg-stone-950/80 border-stone-800 hover:border-amber-400 text-stone-200 hover:bg-stone-900 transition-all shadow-sm"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: HISTORICAL CONSEQUENCE & ANALYSIS */}
      {currentStep === 3 && selectedPovOption !== null && (
        <div className="bg-gradient-to-br from-stone-900 to-amber-950/90 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-scaleIn">
          <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
            <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/40">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                {t('cp3_consequence_title')}
              </div>
              <h3 className="font-serif font-bold text-amber-100 text-lg">
                {t('cp3_your_decision')}
              </h3>
            </div>
          </div>

          {/* Selected Option & Historical Feedback */}
          <div className="p-5 bg-black/40 rounded-2xl border border-amber-500/30 space-y-3">
            <div className="text-xs text-stone-400 font-semibold uppercase">
              {t('cp3_you_chose')}
            </div>
            <div className="text-sm sm:text-base font-bold text-amber-200">
              {data.povQuestion.options[selectedPovOption].text}
            </div>
            <div className="p-4 bg-amber-950/40 rounded-xl border border-amber-500/40 text-xs sm:text-sm text-stone-200 leading-relaxed">
              📜 <strong>{t('cp3_historical_insight')}</strong><br />
              {data.povQuestion.options[selectedPovOption].historicalAnalysis}
            </div>
          </div>

          <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl flex items-center justify-between">
            <div className="flex items-center space-x-2 text-emerald-300 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>{t('cp3_completed_badge')}</span>
            </div>
            <span className="text-xs font-black text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-500/40">
              {t('passed_badge')}
            </span>
          </div>

          <button
            onClick={handleFinishCheckpoint}
            className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:brightness-110 text-stone-950 font-black text-sm sm:text-base rounded-2xl shadow-xl transition-all flex items-center justify-center space-x-2"
          >
            <span>{isLastCheckpoint ? t('claim_trophy_btn') : t('next_checkpoint_btn')}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

    </div>
  );
}

