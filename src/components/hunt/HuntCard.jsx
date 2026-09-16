import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Compass, Clock, CheckCircle2, Award, ChevronRight, Info, BookOpen } from 'lucide-react';
import { useGameProgress } from '../../context/GameProgressContext';
import { useLanguage } from '../../context/LanguageContext';
import { SITE_HISTORIES } from '../../data/siteHistoriesData';
import SiteHistoryModal from './SiteHistoryModal';
import { soundEffects } from '../../utils/soundEffects';

export default function HuntCard({ hunt }) {
  const { huntProgress, completedHunts } = useGameProgress();
  const { t } = useLanguage();
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const currentStep = huntProgress[hunt.id] || 0;
  const isCompleted = completedHunts && completedHunts.includes(hunt.id);
  const totalCheckpoints = hunt.checkpoints.length;
  const progressPercent = isCompleted ? 100 : Math.round((currentStep / totalCheckpoints) * 100);

  // Match site history data
  const siteHistory = SITE_HISTORIES[hunt.id] || {
    id: hunt.id,
    name: hunt.name,
    tagline: `Ancient Heritage Wonder of ${hunt.state}`,
    state: hunt.state,
    builtBy: 'Ancient & Medieval Indian Kings and Master Architects',
    era: hunt.era || 'Historic Era',
    architecturalStyle: 'Classical Indian Stone & Rock Architecture',
    unescoStatus: 'Protected Archaeological Heritage Site',
    shortHistory: hunt.storyline || `${hunt.name} is a world-renowned heritage monument located in ${hunt.state}, India. It embodies ancient architectural genius and rich cultural folklore.`,
    detailedHistory: `${hunt.name} in ${hunt.state} is one of India's most celebrated archaeological wonders. Spanning centuries of history, it showcases monumental architectural craftsmanship, strategic military or spiritual design, and timeless stone reliefs.\n\nHistorians and archaeologists admire its engineering brilliance, water management systems, and sacred geometries, preserving the legacy of ancient Indian dynasties for future generations.`,
    keyHighlights: [
      'Masterpiece of ancient Indian stone craftsmanship',
      'Strategic architectural planning and monumental fortifications',
      'Sacred and cultural epicenter with rich historical inscriptions',
      'Celebrated archaeological landmark attracting global visitors'
    ],
    didYouKnow: `Every stone carving and pillar at ${hunt.name} tells a legendary tale of royal valor, architectural mathematics, and sacred wisdom.`
  };

  return (
    <>
      <div className="group bg-gradient-to-b from-stone-900/90 to-stone-950/90 border border-stone-800 hover:border-amber-500/50 rounded-3xl p-5 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between relative">
        <div className="space-y-4">
          {/* Header Badges with Info Button */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center space-x-1.5">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-extrabold uppercase tracking-wider">
                {hunt.state}
              </span>

              {/* Info Button at Top of Card */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  soundEffects.playClick();
                  setShowHistoryModal(true);
                }}
                className="px-2.5 py-1 rounded-full bg-amber-500/15 hover:bg-amber-500/30 text-amber-300 hover:text-amber-200 border border-amber-500/40 text-[11px] font-bold flex items-center gap-1 transition-all shadow-sm active:scale-95 group/info"
                title="View Short & Detailed History of this Monument"
              >
                <Info className="w-3.5 h-3.5 text-amber-400 group-hover/info:scale-110 transition-transform" />
                <span>Info / History</span>
              </button>
            </div>

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
              {hunt.huntIdea}
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

      {/* History Modal Dialog */}
      <SiteHistoryModal
        siteHistory={siteHistory}
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
      />
    </>
  );
}
