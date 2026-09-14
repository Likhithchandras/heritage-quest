import React, { useState } from 'react';
import { useGameProgress } from '../context/GameProgressContext';
import { BADGES, RANKS } from '../data/badgesData';
import { heritageHunts } from '../data/heritageHuntsData';
import CertificateModal from '../components/hunt/CertificateModal';
import { soundEffects } from '../utils/soundEffects';
import { Shield, Award, Sparkles, CheckCircle2, Lock, Printer, Compass, Star, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PassportPage() {
  const { totalScore, badges, completedHunts, currentRank } = useGameProgress();
  const [selectedHuntForCert, setSelectedHuntForCert] = useState(null);

  // Next rank calculation
  const currentRankIdx = RANKS.findIndex(r => r.name === currentRank.name);
  const nextRank = currentRankIdx < RANKS.length - 1 ? RANKS[currentRankIdx + 1] : null;
  const xpNeeded = nextRank ? nextRank.minScore - totalScore : 0;
  const rankProgressPercent = nextRank
    ? Math.min(100, Math.max(0, ((totalScore - currentRank.minScore) / (nextRank.minScore - currentRank.minScore)) * 100))
    : 100;

  return (
    <div className="space-y-10 pb-20 max-w-5xl mx-auto animate-fadeIn">
      {/* Passport Profile Card */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 border-2 border-amber-500/40 p-6 md:p-10 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar Seal */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-amber-500 to-amber-700 p-1 shadow-xl flex items-center justify-center shrink-0 border-2 border-amber-300">
            <div className="w-full h-full rounded-[22px] bg-stone-950 flex flex-col items-center justify-center text-amber-300">
              <Shield className="w-10 h-10 text-amber-400" />
              <span className="text-[10px] font-black uppercase tracking-wider mt-1">HERITAGE</span>
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase tracking-wider">
              <Star className="w-3.5 h-3.5 text-amber-400" />
              <span>Official Explorer Passport</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-amber-100 font-serif">
              Junior Heritage Explorer
            </h1>
            <p className="text-stone-300 text-sm">
              Archaeological Agent ID: <strong className="text-amber-300">EXP-IND-2026</strong> • Active across 20 Monuments
            </p>
          </div>
        </div>

        {/* Rank & XP Bar */}
        <div className="space-y-3 bg-stone-950/60 p-5 rounded-2xl border border-stone-800">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-extrabold text-amber-200">
                Current Rank: <span className="text-amber-400 font-serif text-base">{currentRank.name}</span>
              </span>
            </div>
            <div className="text-xs font-bold text-stone-300">
              {totalScore} XP earned {nextRank ? `(${xpNeeded} XP to ${nextRank.name})` : '(Maximum Rank Achieved!)'}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-stone-900 rounded-full h-3 overflow-hidden border border-stone-800">
            <div
              className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 h-full rounded-full transition-all duration-500"
              style={{ width: `${rankProgressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-amber-200">
          <div className="p-4 bg-stone-900/70 rounded-xl border border-stone-800 text-center">
            <div className="text-2xl font-black text-amber-400">{totalScore}</div>
            <div className="text-xs text-stone-400 font-bold uppercase tracking-wider">Total XP</div>
          </div>
          <div className="p-4 bg-stone-900/70 rounded-xl border border-stone-800 text-center">
            <div className="text-2xl font-black text-amber-400">{badges.length} / {BADGES.length}</div>
            <div className="text-xs text-stone-400 font-bold uppercase tracking-wider">Badges Unlocked</div>
          </div>
          <div className="p-4 bg-stone-900/70 rounded-xl border border-stone-800 text-center">
            <div className="text-2xl font-black text-amber-400">{completedHunts.length} / 20</div>
            <div className="text-xs text-stone-400 font-bold uppercase tracking-wider">Hunts Completed</div>
          </div>
          <div className="p-4 bg-stone-900/70 rounded-xl border border-stone-800 text-center">
            <div className="text-2xl font-black text-emerald-400">{completedHunts.length}</div>
            <div className="text-xs text-stone-400 font-bold uppercase tracking-wider">Certificates Ready</div>
          </div>
        </div>
      </div>

      {/* Unlocked Badges Showcase */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-amber-100 font-serif">
            Explorer Badges Showcase ({badges.length}/{BADGES.length})
          </h2>
          <span className="text-xs text-stone-400 font-semibold">
            Solve checkpoints and hints to collect all badges
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {BADGES.map((b) => {
            const isUnlocked = badges.includes(b.id);
            return (
              <div
                key={b.id}
                className={`p-4 rounded-2xl border transition-all duration-300 flex items-center space-x-3.5 ${
                  isUnlocked
                    ? 'bg-amber-950/40 border-amber-500/40 text-amber-100 shadow-md'
                    : 'bg-stone-900/30 border-stone-800 text-stone-500 opacity-60'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                  isUnlocked ? 'bg-amber-500/20 border border-amber-400 shadow' : 'bg-stone-800'
                }`}>
                  {isUnlocked ? b.icon : <Lock className="w-5 h-5 text-stone-500" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm truncate font-serif">
                    {b.name}
                  </div>
                  <div className="text-xs text-stone-400 line-clamp-2">
                    {b.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Completed Hunts & Certificates */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-amber-100 font-serif">
            Expedition Certificates ({completedHunts.length})
          </h2>
        </div>

        {completedHunts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedHunts.map((huntId) => {
              const h = heritageHunts.find(hunt => hunt.id === huntId);
              if (!h) return null;

              return (
                <div
                  key={h.id}
                  className="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/30 flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                      {h.state}
                    </span>
                    <h3 className="text-base font-bold text-amber-100 font-serif">{h.name}</h3>
                    <p className="text-xs text-stone-400">{h.huntIdea} • {h.checkpoints.length} Checkpoints</p>
                  </div>

                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      setSelectedHuntForCert(h);
                    }}
                    className="shrink-0 px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold inline-flex items-center space-x-1.5 shadow"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Certificate</span>
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center bg-stone-900/30 rounded-2xl border border-stone-800 space-y-3">
            <Award className="w-10 h-10 text-stone-600 mx-auto" />
            <div className="text-stone-300 font-bold text-base">No Completed Expeditions Yet</div>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Finish all checkpoints of any heritage treasure hunt to unlock and print your official certificate here!
            </p>
            <Link
              to="/"
              className="inline-block px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-all"
            >
              Start First Quest →
            </Link>
          </div>
        )}
      </div>

      {/* Certificate Modal */}
      {selectedHuntForCert && (
        <CertificateModal
          isOpen={!!selectedHuntForCert}
          onClose={() => setSelectedHuntForCert(null)}
          hunt={selectedHuntForCert}
          score={totalScore}
          totalCheckpoints={selectedHuntForCert.checkpoints.length}
        />
      )}
    </div>
  );
}
