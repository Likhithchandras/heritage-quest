import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { heritageHunts } from '../data/heritageHuntsData';
import { useGameProgress } from '../context/GameProgressContext';
import { speechNarrator } from '../utils/speechNarrator';
import { soundEffects } from '../utils/soundEffects';
import { Compass, MapPin, Award, CheckCircle2, Play, Volume2, ArrowLeft, RotateCcw, Clock, Sparkles, BookOpen } from 'lucide-react';

export default function HuntDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { huntProgress, completedHunts, resetHunt } = useGameProgress();

  const hunt = heritageHunts.find(h => h.id === id);

  if (!hunt) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold text-amber-300">Expedition Not Found</h2>
        <p className="text-stone-400">The heritage site you are looking for does not exist in our archives.</p>
        <Link to="/" className="inline-block px-5 py-2.5 bg-amber-600 text-white font-bold rounded-xl text-sm">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const currentCheckIndex = huntProgress[hunt.id] || 0;
  const isCompleted = completedHunts.includes(hunt.id);

  const handlePlayVoice = () => {
    soundEffects.playClick();
    speechNarrator.speak(
      `Welcome to the expedition at ${hunt.name}, in ${hunt.state}. The quest is titled: ${hunt.huntIdea}. ${hunt.storyline}`
    );
  };

  const handleStartOrContinue = () => {
    soundEffects.playClick();
    navigate(`/play/${hunt.id}`);
  };

  const handleRestart = () => {
    if (window.confirm('Are you sure you want to restart this treasure hunt from Checkpoint 1?')) {
      resetHunt(hunt.id);
      soundEffects.playClick();
    }
  };

  return (
    <div className="space-y-8 pb-16 animate-fadeIn max-w-4xl mx-auto">
      {/* Back Link */}
      <Link
        to="/"
        onClick={() => soundEffects.playClick()}
        className="inline-flex items-center space-x-2 text-stone-400 hover:text-amber-300 text-sm font-semibold transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Monuments</span>
      </Link>

      {/* Main Monument Hero Card */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-amber-950/80 via-stone-900 to-stone-950 border-2 border-amber-500/40 p-6 md:p-10 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="px-3.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full text-xs font-extrabold uppercase tracking-wider">
              {hunt.state}
            </span>
            <span className="px-3 py-1 bg-stone-800 text-stone-300 rounded-full text-xs font-semibold">
              {hunt.category}
            </span>
          </div>

          <button
            onClick={handlePlayVoice}
            className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold transition-colors"
            title="Read Storyline Aloud"
          >
            <Volume2 className="w-4 h-4 text-amber-400" />
            <span>Read Story</span>
          </button>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl md:text-5xl font-extrabold text-amber-100 font-serif leading-tight">
            {hunt.name}
          </h1>
          <div className="text-amber-400 font-semibold text-lg md:text-xl font-serif">
            Quest: {hunt.huntIdea}
          </div>
        </div>

        <p className="text-stone-300 text-base md:text-lg leading-relaxed bg-stone-950/50 p-5 rounded-2xl border border-stone-800/80">
          {hunt.storyline}
        </p>

        {/* Quest Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-stone-200">
          <div className="p-3 bg-stone-900/80 rounded-xl border border-stone-800 text-center">
            <div className="text-xs text-stone-400 font-semibold uppercase">Checkpoints</div>
            <div className="text-xl font-black text-amber-400">{hunt.checkpoints.length} Stations</div>
          </div>
          <div className="p-3 bg-stone-900/80 rounded-xl border border-stone-800 text-center">
            <div className="text-xs text-stone-400 font-semibold uppercase">Est. Duration</div>
            <div className="text-xl font-black text-amber-400">{hunt.estimatedDuration}</div>
          </div>
          <div className="p-3 bg-stone-900/80 rounded-xl border border-stone-800 text-center">
            <div className="text-xs text-stone-400 font-semibold uppercase">Max Reward</div>
            <div className="text-xl font-black text-amber-400">+{hunt.checkpoints.length * 80} XP</div>
          </div>
          <div className="p-3 bg-stone-900/80 rounded-xl border border-stone-800 text-center">
            <div className="text-xs text-stone-400 font-semibold uppercase">Status</div>
            <div className={`text-xl font-black ${isCompleted ? 'text-emerald-400' : 'text-amber-300'}`}>
              {isCompleted ? 'Mastered' : currentCheckIndex > 0 ? `Cp ${currentCheckIndex + 1}/${hunt.checkpoints.length}` : 'Ready'}
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="pt-4 flex flex-wrap items-center gap-4">
          <button
            onClick={handleStartOrContinue}
            className="flex-1 min-w-[200px] py-4 px-8 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-stone-950 font-black text-lg rounded-2xl shadow-xl transition-all transform hover:scale-[1.02] active:scale-95 inline-flex items-center justify-center space-x-3"
          >
            <Play className="w-6 h-6 fill-stone-950" />
            <span>
              {isCompleted ? 'Replay Expedition' : currentCheckIndex > 0 ? `Continue Checkpoint ${currentCheckIndex + 1}` : 'Begin Treasure Hunt'}
            </span>
          </button>

          {currentCheckIndex > 0 && (
            <button
              onClick={handleRestart}
              className="py-4 px-5 bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-stone-200 border border-stone-700 rounded-2xl font-bold text-sm transition-all inline-flex items-center space-x-2"
              title="Reset progress to checkpoint 1"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Checkpoint Roadmap */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-amber-100 font-serif">
            Expedition Roadmap ({hunt.checkpoints.length} Checkpoints)
          </h2>
          <span className="text-xs font-semibold text-stone-400">
            Unlocks sequentially
          </span>
        </div>

        <div className="space-y-3">
          {hunt.checkpoints.map((cp, idx) => {
            const isUnlocked = idx <= currentCheckIndex || isCompleted;
            const isFinished = idx < currentCheckIndex || isCompleted;
            const isCurrent = idx === currentCheckIndex && !isCompleted;

            return (
              <div
                key={cp.id}
                className={`p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                  isFinished
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-100'
                    : isCurrent
                    ? 'bg-amber-950/60 border-2 border-amber-400 text-amber-100 shadow-lg'
                    : 'bg-stone-900/40 border-stone-800 text-stone-500 opacity-70'
                }`}
              >
                {/* Step badge */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-extrabold text-sm ${
                  isFinished
                    ? 'bg-emerald-500 text-stone-950'
                    : isCurrent
                    ? 'bg-amber-400 text-stone-950 animate-bounce'
                    : 'bg-stone-800 text-stone-400'
                }`}>
                  {isFinished ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-base font-serif truncate">
                      {cp.name}
                    </h3>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-stone-950/60 text-amber-300">
                      80 Max XP
                    </span>
                  </div>
                  <p className="text-xs line-clamp-2 text-stone-300 font-sans">
                    {isUnlocked ? cp.observationTask : 'Solve previous checkpoints to decode this secret location.'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
