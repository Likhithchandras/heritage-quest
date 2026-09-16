import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Compass, Clock, CheckCircle2, Award, ChevronRight } from 'lucide-react';
import { useGameProgress } from '../../context/GameProgressContext';
import { useLanguage } from '../../context/LanguageContext';
import { soundEffects } from '../../utils/soundEffects';

export default function HuntCard({ hunt }) {
  const { huntProgress, completedHunts } = useGameProgress();
  const { t } = useLanguage();
  const currentStep = huntProgress[hunt.id] || 0;
  const isCompleted = completedHunts && completedHunts.includes(hunt.id);
  const totalCheckpoints = hunt.checkpoints.length;
  const progressPercent = isCompleted ? 100 : Math.round((currentStep / totalCheckpoints) * 100);

  return (
    <div className="group bg-gradient-to-b from-stone-900/90 to-stone-950/90 border border-stone-800 hover:border-amber-500/50 rounded-3xl p-5 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between">
      <div className="space-y-4">
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-extrabold uppercase tracking-wider">
            {hunt.state}
          </span>
          {isCompleted ? (
            <span className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/40">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{t('card_mastered')}</span>
            </span>
          ) : (
            <span className="text-xs font-semibold text-stone-400 bg-stone-900 px-2.5 py-1 rounded-full border border-stone-800">
              {hunt.category}
            </span>
          )}
        </div>

        {/* Title & Idea */}
        <div className="space-y-1">
          <h3 className="font-serif font-black text-xl text-amber-100 group-hover:text-amber-300 transition-colors leading-snug">
            {hunt.name}
          </h3>
          <p className="text-sm font-semibold text-amber-400 font-serif">
            {t('quest_label')} {hunt.huntIdea}
          </p>
        </div>

        {/* Storyline snippet */}
        <p className="text-xs text-stone-400 line-clamp-3 leading-relaxed">
          {hunt.storyline}
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-2 text-stone-300 text-xs pt-1 border-t border-stone-800/80">
          <div className="flex items-center space-x-1.5">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>{totalCheckpoints} {t('card_checkpoints')}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{hunt.estimatedDuration}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px] font-bold text-stone-400">
            <span>{t('card_progress')}</span>
            <span>{isCompleted ? '100%' : `${currentStep}/${totalCheckpoints} ${t('card_done')}`}</span>
          </div>
          <div className="w-full bg-stone-900 rounded-full h-2 overflow-hidden border border-stone-800">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isCompleted ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-5 mt-2 border-t border-stone-800/60">
        <Link
          to={`/hunt/${hunt.id}`}
          onClick={() => soundEffects.playClick()}
          className="w-full py-2.5 px-4 rounded-xl bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-stone-950 border border-amber-500/30 font-bold text-xs transition-all duration-200 flex items-center justify-center space-x-2 active:scale-95"
        >
          <span>{isCompleted ? t('card_review') : currentStep > 0 ? t('card_continue') : t('card_inspect')}</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
