import React, { useRef } from 'react';
import { Award, Download, Printer, X, Sparkles, CheckCircle2, Shield, Star, Calendar } from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';

export default function CertificateModal({ isOpen, onClose, hunt, score, totalCheckpoints, playerName = 'Junior Heritage Explorer' }) {
  const certRef = useRef(null);

  if (!isOpen || !hunt) return null;

  const handlePrint = () => {
    soundEffects.playClick();
    window.print();
  };

  const today = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn print:p-0 print:bg-white">
      <div className="relative w-full max-w-3xl bg-amber-50 rounded-3xl shadow-2xl border-4 border-amber-500 overflow-hidden max-h-[90vh] flex flex-col print:border-none print:shadow-none print:max-h-full">
        {/* Modal Header Bar (hidden in print) */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 text-amber-50 print:hidden">
          <div className="flex items-center space-x-2">
            <Award className="w-6 h-6 text-amber-300 animate-bounce" />
            <span className="font-bold text-lg">Official Certificate of Heritage Mastery</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close certificate"
            className="p-2 hover:bg-white/20 rounded-full transition-colors text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Certificate Body (Printable Area) */}
        <div ref={certRef} className="p-8 md:p-12 overflow-y-auto print:p-6 text-center relative bg-[radial-gradient(#fef3c7_1px,transparent_1px)] [background-size:16px_16px]">
          {/* Ornate Inner Border */}
          <div className="border-4 border-double border-amber-800/60 p-6 md:p-10 rounded-2xl bg-amber-50/90 shadow-inner relative">
            {/* Corner Badges */}
            <div className="absolute -top-4 -left-4 w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center text-amber-100 shadow border-2 border-amber-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="absolute -top-4 -right-4 w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center text-amber-100 shadow border-2 border-amber-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center text-amber-100 shadow border-2 border-amber-200">
              <Star className="w-5 h-5" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center text-amber-100 shadow border-2 border-amber-200">
              <Star className="w-5 h-5" />
            </div>

            {/* Header */}
            <div className="space-y-2 mb-6">
              <div className="inline-flex items-center justify-center space-x-2 px-4 py-1.5 bg-amber-200/80 rounded-full text-amber-950 text-xs md:text-sm font-semibold tracking-wider uppercase border border-amber-400">
                <Shield className="w-4 h-4 text-amber-800" />
                <span>Ministry of Junior Heritage Explorers</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-extrabold text-amber-950 font-serif tracking-tight">
                HERITAGE EXPLORER CERTIFICATE
              </h1>
              <p className="text-amber-800 text-sm md:text-base font-medium">
                This certifies that the fearless adventurer
              </p>
            </div>

            {/* Student / Explorer Name */}
            <div className="my-4 py-2 border-b-2 border-dashed border-amber-600 max-w-md mx-auto">
              <h2 className="text-2xl md:text-3xl font-black text-amber-900 font-serif tracking-wide">
                {playerName}
              </h2>
            </div>

            {/* Achievement text */}
            <p className="text-amber-900 text-sm md:text-base leading-relaxed max-w-xl mx-auto my-4">
              has successfully decoded all riddles, completed all observation missions, and uncovered the ancient secrets of
            </p>

            <div className="my-3 inline-block px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl shadow-md border-2 border-amber-300 font-bold text-lg md:text-xl font-serif">
              {hunt.name} ({hunt.state})
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto my-6 p-4 bg-amber-100/80 rounded-xl border border-amber-300 text-amber-950">
              <div className="text-center border-r border-amber-300 pr-2">
                <div className="text-2xl font-black text-amber-800">{totalCheckpoints}/{totalCheckpoints}</div>
                <div className="text-xs font-semibold uppercase tracking-wider text-amber-900">Checkpoints Solved</div>
              </div>
              <div className="text-center pl-2">
                <div className="text-2xl font-black text-amber-800">{score} XP</div>
                <div className="text-xs font-semibold uppercase tracking-wider text-amber-900">Total Explorer XP</div>
              </div>
            </div>

            {/* Signatures & Seal */}
            <div className="grid grid-cols-3 items-end pt-6 mt-4 border-t border-amber-300/80 text-amber-900 text-xs md:text-sm">
              <div className="text-left">
                <div className="font-serif italic font-bold text-amber-950 text-sm md:text-base">Archaeological AI</div>
                <div className="w-24 h-0.5 bg-amber-800 my-1"></div>
                <div className="text-[11px] text-amber-800">Expedition Guide</div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-amber-600 bg-amber-200/90 flex flex-col items-center justify-center shadow-lg text-amber-900 -mt-6 rotate-[-6deg]">
                  <Award className="w-7 h-7 md:w-8 md:h-8 text-amber-700" />
                  <span className="text-[9px] md:text-[10px] font-black uppercase tracking-tighter">VERIFIED</span>
                </div>
              </div>

              <div className="text-right">
                <div className="font-semibold text-amber-950">{today}</div>
                <div className="w-24 h-0.5 bg-amber-800 ml-auto my-1"></div>
                <div className="text-[11px] text-amber-800">Date of Discovery</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons (hidden in print) */}
        <div className="px-6 py-4 bg-amber-100/90 border-t border-amber-300 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="text-xs text-amber-800 font-medium">
            Tip: You can print or save this as PDF to show your teacher and parents!
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-amber-700 hover:bg-amber-800 active:scale-95 text-white font-bold rounded-xl shadow-md transition-all text-sm"
            >
              <Printer className="w-4 h-4" />
              <span>Print Certificate</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-amber-200 hover:bg-amber-300 active:scale-95 text-amber-950 font-bold rounded-xl transition-all text-sm"
            >
              Back to Expedition
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
