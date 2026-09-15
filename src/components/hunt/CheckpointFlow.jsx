import React, { useState } from 'react';
import { Compass, Eye, HelpCircle, BookOpen, CheckCircle, Award, ArrowRight, Sparkles, AlertCircle, QrCode } from 'lucide-react';
import GpsCompass from './GpsCompass';
import ObservationTask from './ObservationTask';
import RiddleBox from './RiddleBox';
import QuizCard from './QuizCard';
import Checkpoint3SpecialFlow from './Checkpoint3SpecialFlow';
import { soundEffects } from '../../utils/soundEffects';

export default function CheckpointFlow({
  huntId,
  monumentName,
  checkpoint,
  checkpointNumber,
  totalCheckpoints,
  onCompleteCheckpoint,
  isLastCheckpoint
}) {
  // If this is Checkpoint #3, render the Special QR Scan + Riddle + Roleplay Decision Flow!
  if (checkpointNumber === 3) {
    return (
      <Checkpoint3SpecialFlow
        huntId={huntId}
        monumentName={monumentName || checkpoint.name}
        onCompleteCheckpoint={onCompleteCheckpoint}
        isLastCheckpoint={isLastCheckpoint}
      />
    );
  }

  // Standard Stages for other checkpoints: 1: REACH (GPS), 2: OBSERVE, 3: RIDDLE, 4: LEARN & QUIZ, 5: COMPLETED
  const [currentStage, setCurrentStage] = useState(1);
  const [checkpointPoints, setCheckpointPoints] = useState({
    observation: 0,
    riddle: 0,
    quiz: 0
  });

  const handleGpsArrival = () => {
    soundEffects.playArrival();
    setCurrentStage(2);
  };

  const handleObservationFound = () => {
    setCheckpointPoints(prev => ({ ...prev, observation: 10 }));
    soundEffects.playCorrect();
    setCurrentStage(3);
  };

  const handleRiddleSolved = (pointsAwarded) => {
    setCheckpointPoints(prev => ({ ...prev, riddle: pointsAwarded }));
    soundEffects.playCorrect();
    setCurrentStage(4);
  };

  const handleQuizCompleted = (pointsAwarded) => {
    setCheckpointPoints(prev => ({ ...prev, quiz: pointsAwarded }));
    soundEffects.playFanfare();
    setCurrentStage(5);
  };

  const handleProceedNext = () => {
    const totalAwarded = checkpointPoints.observation + checkpointPoints.riddle + checkpointPoints.quiz;
    onCompleteCheckpoint(totalAwarded);
    setCurrentStage(1);
    setCheckpointPoints({ observation: 0, riddle: 0, quiz: 0 });
  };

  const stages = [
    { num: 1, label: 'Reach', icon: Compass },
    { num: 2, label: 'Observe', icon: Eye },
    { num: 3, label: 'Riddle', icon: HelpCircle },
    { num: 4, label: 'Learn & Quiz', icon: BookOpen },
    { num: 5, label: 'Reward', icon: Award }
  ];

  return (
    <div className="space-y-6">
      {/* Top Stepper Indicator */}
      <div className="bg-amber-900/60 backdrop-blur-md rounded-2xl p-4 border border-amber-500/30 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs uppercase tracking-wider font-bold text-amber-300">
            Checkpoint {checkpointNumber} of {totalCheckpoints} Mission Steps
          </span>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-200 border border-amber-500/40">
            Stage {currentStage} / 5
          </span>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {stages.map(s => {
            const Icon = s.icon;
            const isDone = currentStage > s.num;
            const isCurrent = currentStage === s.num;
            return (
              <div
                key={s.num}
                className={`flex flex-col items-center text-center p-2 rounded-xl transition-all duration-300 ${
                  isDone
                    ? 'bg-emerald-950/70 border border-emerald-500/40 text-emerald-300'
                    : isCurrent
                    ? 'bg-amber-500/20 border-2 border-amber-400 text-amber-200 shadow-md scale-105'
                    : 'bg-stone-900/40 border border-stone-700/30 text-stone-500'
                }`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center mb-1 text-xs font-bold ${
                  isDone
                    ? 'bg-emerald-500 text-stone-950'
                    : isCurrent
                    ? 'bg-amber-400 text-stone-950 animate-pulse'
                    : 'bg-stone-800 text-stone-400'
                }`}>
                  {isDone ? <CheckCircle className="w-4 h-4" /> : <Icon className="w-3.5 h-3.5" />}
                </div>
                <span className="text-[11px] font-bold truncate w-full hidden sm:block">
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stage 1: GPS Compass / Reach Checkpoint */}
      {currentStage === 1 && (
        <div className="space-y-4 animate-fadeIn">
          <GpsCompass
            targetLat={checkpoint.lat}
            targetLng={checkpoint.lng}
            targetName={checkpoint.name}
            hintRadius={40}
            onArrival={handleGpsArrival}
          />
        </div>
      )}

      {/* Stage 2: Observation Task */}
      {currentStage === 2 && (
        <div className="animate-fadeIn">
          <ObservationTask
            task={checkpoint.observationTask}
            checkpointName={checkpoint.name}
            onFound={handleObservationFound}
          />
        </div>
      )}

      {/* Stage 3: Riddle Box */}
      {currentStage === 3 && (
        <div className="animate-fadeIn">
          <RiddleBox
            riddle={checkpoint.riddle}
            checkpointName={checkpoint.name}
            onSolved={handleRiddleSolved}
          />
        </div>
      )}

      {/* Stage 4: Learn & Quiz */}
      {currentStage === 4 && (
        <div className="animate-fadeIn">
          <QuizCard
            fact={checkpoint.fact}
            quiz={checkpoint.quiz}
            checkpointName={checkpoint.name}
            onComplete={handleQuizCompleted}
          />
        </div>
      )}

      {/* Stage 5: Checkpoint Completed Celebration */}
      {currentStage === 5 && (
        <div className="bg-gradient-to-br from-emerald-900/70 via-stone-900/90 to-amber-950/70 border-2 border-emerald-500/50 rounded-3xl p-6 md:p-8 text-center space-y-6 shadow-2xl animate-scaleIn">
          <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border-4 border-emerald-400 flex items-center justify-center text-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.3)] animate-bounce">
            <Sparkles className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-extrabold text-emerald-200 font-serif">
              Checkpoint {checkpointNumber} Unlocked! 🎉
            </h2>
            <p className="text-stone-300 text-sm md:text-base max-w-lg mx-auto">
              Outstanding exploration! You observed carefully, cracked the ancient riddle, and mastered the heritage trivia.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto p-4 bg-stone-950/60 rounded-2xl border border-emerald-500/30 text-amber-200">
            <div className="text-center border-r border-stone-800">
              <div className="text-xs text-stone-400 font-medium">Observation</div>
              <div className="text-lg font-black text-amber-400">+{checkpointPoints.observation} XP</div>
            </div>
            <div className="text-center border-r border-stone-800">
              <div className="text-xs text-stone-400 font-medium">Riddle</div>
              <div className="text-lg font-black text-amber-400">+{checkpointPoints.riddle} XP</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-stone-400 font-medium">Quiz</div>
              <div className="text-lg font-black text-amber-400">+{checkpointPoints.quiz} XP</div>
            </div>
          </div>

          <button
            onClick={handleProceedNext}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-stone-950 font-black text-base md:text-lg rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 inline-flex items-center justify-center space-x-3"
          >
            <span>{isLastCheckpoint ? 'Claim Hunt Trophy & Certificate' : 'Unlock Next Checkpoint'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
