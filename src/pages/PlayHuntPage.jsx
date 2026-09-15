import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { heritageHunts } from '../data/heritageHuntsData';
import { useGameProgress } from '../context/GameProgressContext';
import CheckpointFlow from '../components/hunt/CheckpointFlow';
import CertificateModal from '../components/hunt/CertificateModal';
import { soundEffects } from '../utils/soundEffects';
import { speechNarrator } from '../utils/speechNarrator';
import { ArrowLeft, Award, Sparkles, MapPin, RefreshCw, Volume2, Shield } from 'lucide-react';

export default function PlayHuntPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { huntProgress, saveCheckpointProgress, completeHunt, totalScore, badges } = useGameProgress();

  const hunt = heritageHunts.find(h => h.id === id);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [showCertificate, setShowCertificate] = useState(false);
  const [huntFinishedCelebration, setHuntFinishedCelebration] = useState(false);

  useEffect(() => {
    if (hunt) {
      const paramCp = searchParams.get('checkpoint') || searchParams.get('cp');
      if (paramCp) {
        const parsed = parseInt(paramCp, 10);
        if (!isNaN(parsed) && parsed >= 1 && parsed <= hunt.checkpoints.length) {
          setCurrentIdx(parsed - 1);
          return;
        }
      }
      const savedIdx = huntProgress[hunt.id] || 0;
      setCurrentIdx(savedIdx);
    }
  }, [hunt, huntProgress, searchParams]);

  if (!hunt) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold text-amber-300">Expedition Not Found</h2>
        <Link to="/" className="inline-block px-5 py-2.5 bg-amber-600 text-white font-bold rounded-xl text-sm">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const totalCheckpoints = hunt.checkpoints.length;
  const currentCheckpoint = hunt.checkpoints[currentIdx];
  const isLast = currentIdx >= totalCheckpoints - 1;

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti trigger', e);
    }
  };

  const handleCompleteCheckpoint = (awardedPoints) => {
    saveCheckpointProgress(hunt.id, currentIdx, awardedPoints);

    if (isLast) {
      // Complete entire hunt
      completeHunt(hunt.id);
      soundEffects.playFanfare();
      triggerConfetti();
      setHuntFinishedCelebration(true);
    } else {
      // Advance to next checkpoint
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-6 pb-20 max-w-3xl mx-auto animate-fadeIn">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between bg-stone-900/80 backdrop-blur-md p-4 rounded-2xl border border-stone-800">
        <Link
          to={`/hunt/${hunt.id}`}
          onClick={() => soundEffects.playClick()}
          className="inline-flex items-center space-x-2 text-stone-400 hover:text-amber-300 text-xs sm:text-sm font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Expedition</span>
        </Link>

        <div className="text-right">
          <div className="text-xs text-stone-400 font-semibold">{hunt.name}</div>
          <div className="text-sm font-extrabold text-amber-300 font-serif">
            Checkpoint {Math.min(currentIdx + 1, totalCheckpoints)} of {totalCheckpoints}
          </div>
        </div>
      </div>

      {/* Main Checkpoint Flow Engine */}
      {!huntFinishedCelebration && currentCheckpoint ? (
        <CheckpointFlow
          key={currentCheckpoint.id}
          huntId={hunt.id}
          monumentName={hunt.name}
          checkpoint={currentCheckpoint}
          checkpointNumber={currentIdx + 1}
          totalCheckpoints={totalCheckpoints}
          onCompleteCheckpoint={handleCompleteCheckpoint}
          isLastCheckpoint={isLast}
        />
      ) : null}

      {/* Hunt Grand Finale Card */}
      {huntFinishedCelebration && (
        <div className="bg-gradient-to-br from-amber-950 via-stone-900 to-stone-950 border-4 border-amber-500 rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-2xl animate-scaleIn">
          <div className="w-24 h-24 mx-auto rounded-full bg-amber-500/20 border-4 border-amber-400 flex items-center justify-center text-amber-300 shadow-[0_0_35px_rgba(245,158,11,0.5)] animate-bounce">
            <Award className="w-12 h-12" />
          </div>

          <div className="space-y-3">
            <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 font-extrabold text-xs uppercase tracking-wider border border-amber-500/40">
              Expedition Conquered! 🏆
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-amber-100 font-serif">
              Master of {hunt.name}
            </h1>
            <p className="text-stone-300 text-base md:text-lg max-w-xl mx-auto">
              You decoded every riddle, inspected every stone relief, and mastered the heritage history of {hunt.name}, {hunt.state}!
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto p-4 bg-stone-950/70 rounded-2xl border border-amber-500/30 text-amber-200">
            <div>
              <div className="text-xs text-stone-400 font-bold uppercase">Checkpoints Solved</div>
              <div className="text-2xl font-black text-amber-400">{totalCheckpoints} / {totalCheckpoints}</div>
            </div>
            <div>
              <div className="text-xs text-stone-400 font-bold uppercase">Grand Total XP</div>
              <div className="text-2xl font-black text-amber-400">{totalScore} XP</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                soundEffects.playFanfare();
                setShowCertificate(true);
              }}
              className="px-8 py-4 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-stone-950 font-black text-lg rounded-2xl shadow-xl transition-all transform hover:scale-105 active:scale-95 inline-flex items-center space-x-2"
            >
              <Award className="w-6 h-6" />
              <span>Claim & Print Certificate</span>
            </button>

            <Link
              to="/passport"
              onClick={() => soundEffects.playClick()}
              className="px-6 py-4 bg-stone-900 hover:bg-stone-800 text-amber-200 border border-amber-500/40 font-bold text-base rounded-2xl transition-all inline-flex items-center space-x-2"
            >
              <Shield className="w-5 h-5 text-amber-400" />
              <span>View Explorer Passport</span>
            </Link>
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={showCertificate}
        onClose={() => setShowCertificate(false)}
        hunt={hunt}
        score={totalScore}
        totalCheckpoints={totalCheckpoints}
      />
    </div>
  );
}
