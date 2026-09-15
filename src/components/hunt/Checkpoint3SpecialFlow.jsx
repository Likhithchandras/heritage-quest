import React, { useState } from 'react';
import { QrCode, Camera, HelpCircle, Crown, Lightbulb, Volume2, CheckCircle2, Award, ArrowRight, Sparkles, BookOpen, Shield } from 'lucide-react';
import { CHECKPOINT_THREE_DATA } from '../../data/checkpointThreeData';
import QrScannerModal from './QrScannerModal';
import { soundEffects } from '../../utils/soundEffects';
import { speechNarrator } from '../../utils/speechNarrator';

export default function Checkpoint3SpecialFlow({
  huntId,
  monumentName,
  onCompleteCheckpoint,
  isLastCheckpoint
}) {
  const data = CHECKPOINT_THREE_DATA[huntId] || CHECKPOINT_THREE_DATA['hampi'];

  // Stages:
  // 1: QR_SCAN (Requires scanning the QR code)
  // 2: RIDDLE (Solving Question 1: Archaeological Riddle)
  // 3: POV_QUESTION (Solving Question 2: King / Architect Roleplay Decision)
  // 4: POV_OUTCOME (Viewing the Historical Consequence & Analysis)
  // 5: COMPLETED (Celebration & XP Reward)
  const [currentStep, setCurrentStep] = useState(1);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [qrVerified, setQrVerified] = useState(false);

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
    qr: 20,
    riddle: 50,
    pov: 60
  });

  // 1. QR Scan handler
  const handleScanSuccess = (decodedText) => {
    setQrVerified(true);
    soundEffects.playArrival();
    setCurrentStep(2);
  };

  // 2. Riddle Answer submit
  const handleRiddleAnswer = (idx) => {
    if (isRiddleSolved) return;
    setSelectedRiddleOption(idx);

    if (idx === data.riddle.correctOption) {
      setIsRiddleSolved(true);
      setRiddleFeedback('correct');
      soundEffects.playCorrect();
      setTimeout(() => {
        setCurrentStep(3); // Advance to POV Question
      }, 1000);
    } else {
      setRiddleFeedback('wrong');
      soundEffects.playWrong();
    }
  };

  // 3. POV Decision submit
  const handlePovChoice = (idx) => {
    setSelectedPovOption(idx);
    setIsPovSolved(true);
    soundEffects.playFanfare();
    setCurrentStep(4); // Show Historical Consequence
  };

  // 4. Finish Checkpoint
  const handleFinishCheckpoint = () => {
    const totalAwarded = earnedPoints.qr + earnedPoints.riddle + earnedPoints.pov;
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
              Checkpoint #3 • Royal Secret & Archaeological QR
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

      {/* STEP 1: SCAN ON-SITE QR CODE */}
      {currentStep === 1 && (
        <div className="bg-stone-900/90 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-center animate-fadeIn">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.3)]">
            <QrCode className="w-10 h-10 animate-pulse" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-2xl font-extrabold text-amber-100 font-serif">
              Scan Monument QR Code
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Find the official archaeological checkpoint QR marker at <strong>{data.checkpointName}</strong> or scan the physical QR badge to decrypt the King's ancient cipher.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto">
            <button
              onClick={() => setIsScannerOpen(true)}
              className="w-full py-3.5 px-6 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:brightness-110 text-stone-950 font-black text-sm rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <Camera className="w-4 h-4" />
              <span>📷 Open Camera Scanner</span>
            </button>

            <button
              onClick={() => handleScanSuccess(data.qrCodeString)}
              className="w-full py-3.5 px-6 bg-stone-800 hover:bg-stone-700 text-amber-200 border border-amber-500/30 font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>⚡ Test Scan (Demo Mode)</span>
            </button>
          </div>

          <div className="p-3 bg-black/40 rounded-xl border border-stone-800 text-[11px] text-stone-400 max-w-md mx-auto">
            📌 <em>Presenting to Judges?</em> You can use the <strong>Test Scan</strong> button or show the printable QR card from the <strong>QR Cards</strong> tab!
          </div>
        </div>
      )}

      {/* STEP 2: QUESTION 1 — ARCHAEOLOGICAL RIDDLE */}
      {currentStep === 2 && (
        <div className="bg-stone-900/90 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-fadeIn">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-amber-500/20 text-amber-400 rounded-lg">
                <HelpCircle className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Question 1 of 2: The Archaeological Riddle
              </span>
            </div>
            <button
              onClick={() => speechNarrator.speak(`Question 1 Riddle: ${data.riddle.text}`)}
              className="p-1.5 bg-stone-800 hover:bg-stone-700 text-amber-300 rounded-lg text-xs flex items-center space-x-1"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Listen</span>
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
            <span className="text-stone-400">Need a detective clue?</span>
            {riddleHintsUnlocked < data.riddle.hints.length && !isRiddleSolved && (
              <button
                onClick={() => setRiddleHintsUnlocked(prev => prev + 1)}
                className="text-amber-400 hover:text-amber-300 font-bold inline-flex items-center space-x-1"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Reveal Clue ({riddleHintsUnlocked + 1}/{data.riddle.hints.length})</span>
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
              Select Your Answer:
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

      {/* STEP 3: QUESTION 2 — LOGICAL THINKING / ROLEPLAY POV QUESTION */}
      {currentStep === 3 && (
        <div className="bg-stone-900/90 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-fadeIn">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-amber-500/20 text-amber-400 rounded-lg">
                <Crown className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Question 2 of 2: Logical Thinking & King's POV Decision
              </span>
            </div>
            <button
              onClick={() => speechNarrator.speak(`Roleplay Scenario: ${data.povQuestion.situation} Question: ${data.povQuestion.question}`)}
              className="p-1.5 bg-stone-800 hover:bg-stone-700 text-amber-300 rounded-lg text-xs flex items-center space-x-1"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Listen</span>
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

      {/* STEP 4: HISTORICAL CONSEQUENCE & ANALYSIS */}
      {currentStep === 4 && selectedPovOption !== null && (
        <div className="bg-gradient-to-br from-stone-900 to-amber-950/90 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-scaleIn">
          <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
            <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/40">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Historical Consequence & Strategic Analysis
              </div>
              <h3 className="font-serif font-bold text-amber-100 text-lg">
                Your Strategic Decision:
              </h3>
            </div>
          </div>

          {/* Selected Option & Historical Feedback */}
          <div className="p-5 bg-black/40 rounded-2xl border border-amber-500/30 space-y-3">
            <div className="text-xs text-stone-400 font-semibold uppercase">
              You Chose:
            </div>
            <div className="text-sm sm:text-base font-bold text-amber-200">
              {data.povQuestion.options[selectedPovOption].text}
            </div>
            <div className="p-4 bg-amber-950/40 rounded-xl border border-amber-500/40 text-xs sm:text-sm text-stone-200 leading-relaxed">
              📜 <strong>Archaeological & Historical Insight:</strong><br />
              {data.povQuestion.options[selectedPovOption].historicalAnalysis}
            </div>
          </div>

          <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl flex items-center justify-between">
            <div className="flex items-center space-x-2 text-emerald-300 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Checkpoint #3 Secret Decoded! (+130 XP Total)</span>
            </div>
            <span className="text-xs font-black text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-500/40">
              PASSED 🏆
            </span>
          </div>

          <button
            onClick={handleFinishCheckpoint}
            className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:brightness-110 text-stone-950 font-black text-sm sm:text-base rounded-2xl shadow-xl transition-all flex items-center justify-center space-x-2"
          >
            <span>{isLastCheckpoint ? 'Claim Hunt Trophy' : 'Unlock Next Checkpoint'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* QR Scanner Modal */}
      <QrScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanSuccess={handleScanSuccess}
        expectedCode={data.qrCodeString}
        monumentName={monumentName}
      />

    </div>
  );
}
