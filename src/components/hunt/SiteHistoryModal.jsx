import React, { useState } from 'react';
import { X, BookOpen, Volume2, Sparkles, MapPin, Landmark, Calendar, Award, Lightbulb, CheckCircle, ChevronRight, Layers } from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';
import { speechNarrator } from '../../utils/speechNarrator';

export default function SiteHistoryModal({ siteHistory, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'detailed'
  const [isSpeaking, setIsSpeaking] = useState(false);

  if (!isOpen || !siteHistory) return null;

  const handleToggleNarration = () => {
    soundEffects.playClick();
    if (isSpeaking) {
      speechNarrator.cancel();
      setIsSpeaking(false);
    } else {
      const textToRead = activeTab === 'summary'
        ? `${siteHistory.name}. ${siteHistory.tagline}. ${siteHistory.shortHistory} Built by ${siteHistory.builtBy} during the ${siteHistory.era}. Did you know? ${siteHistory.didYouKnow}`
        : `${siteHistory.name}. Detailed historical overview: ${siteHistory.detailedHistory.replace(/\\n/g, ' ')}`;
      
      setIsSpeaking(true);
      speechNarrator.speak(textToRead, () => {
        setIsSpeaking(false);
      });
    }
  };

  const handleClose = () => {
    soundEffects.playClick();
    if (isSpeaking) {
      speechNarrator.cancel();
      setIsSpeaking(false);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Click Outside Backdrop */}
      <div className="absolute inset-0" onClick={handleClose} />

      {/* Modal Dialog Card */}
      <div className="relative z-10 w-full max-w-3xl max-h-[90vh] flex flex-col bg-stone-950 border-2 border-amber-500/50 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden text-stone-100">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 px-6 py-5 border-b border-amber-500/30 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400" />
                <span>{siteHistory.state}</span>
              </span>
              {siteHistory.unescoStatus && (
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 text-[11px] font-bold">
                  🏛️ {siteHistory.unescoStatus}
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-amber-100 font-serif leading-snug">
              {siteHistory.name}
            </h2>
            <p className="text-xs sm:text-sm text-amber-300/90 font-medium">
              "{siteHistory.tagline}"
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            {/* Audio Read-Aloud Button */}
            <button
              onClick={handleToggleNarration}
              className={`p-2.5 rounded-2xl border transition-all flex items-center gap-1.5 text-xs font-bold ${
                isSpeaking
                  ? 'bg-emerald-500 text-stone-950 border-emerald-400 shadow-md animate-pulse'
                  : 'bg-stone-900/90 hover:bg-stone-800 text-amber-300 border-amber-500/40'
              }`}
              title={isSpeaking ? "Stop Voice Guide" : "Listen to Historical Narration"}
            >
              <Volume2 className="w-4 h-4" />
              <span className="hidden sm:inline">{isSpeaking ? 'Listening...' : 'Audio Guide'}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="p-2 rounded-2xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white border border-stone-800 transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Toggle Controls */}
        <div className="flex border-b border-stone-800 bg-stone-900/60 px-6 pt-3 gap-2">
          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('summary');
            }}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'summary'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Quick History & Highlights</span>
          </button>
          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('detailed');
            }}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'detailed'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <span>In-Depth Comprehensive History</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
          
          {/* Metadata Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-stone-900/60 p-4 rounded-2xl border border-stone-800/80 text-xs">
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider flex items-center gap-1">
                <Calendar className="w-3 h-3 text-amber-400" />
                <span>Historical Era</span>
              </span>
              <p className="font-semibold text-amber-200">{siteHistory.era}</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider flex items-center gap-1">
                <Award className="w-3 h-3 text-amber-400" />
                <span>Dynasty / Builders</span>
              </span>
              <p className="font-semibold text-stone-200">{siteHistory.builtBy}</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider flex items-center gap-1">
                <Landmark className="w-3 h-3 text-amber-400" />
                <span>Architecture</span>
              </span>
              <p className="font-semibold text-stone-200">{siteHistory.architecturalStyle}</p>
            </div>
          </div>

          {/* TAB 1: QUICK HISTORY & HIGHLIGHTS */}
          {activeTab === 'summary' && (
            <div className="space-y-5 animate-fadeIn">
              {/* Short Summary Card */}
              <div className="p-5 bg-gradient-to-br from-amber-950/40 to-stone-900 border border-amber-500/30 rounded-2xl space-y-2">
                <div className="flex items-center space-x-2 text-amber-300 font-serif font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>About This Heritage Site</span>
                </div>
                <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
                  {siteHistory.shortHistory}
                </p>
              </div>

              {/* Key Architectural Highlights */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5" />
                  <span>Key Architectural Wonders & Features</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {siteHistory.keyHighlights.map((hl, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-stone-900/80 border border-stone-800 rounded-xl flex items-start space-x-2.5 text-xs text-stone-300"
                    >
                      <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-medium">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Did You Know Box */}
              <div className="p-4 bg-amber-950/30 border border-amber-500/40 rounded-2xl flex items-start space-x-3 text-xs sm:text-sm text-amber-200">
                <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-300 block mb-1">Did You Know? (Historical Secret)</strong>
                  <p className="leading-relaxed text-stone-300">{siteHistory.didYouKnow}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DETAILED IN-DEPTH HISTORY */}
          {activeTab === 'detailed' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-6 bg-stone-900/80 border border-amber-500/30 rounded-2xl space-y-4">
                <div className="flex items-center space-x-2 text-amber-300 font-serif font-bold text-sm">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>Chronicles & Archaeological Narrative</span>
                </div>
                <div className="text-stone-200 text-sm sm:text-base leading-relaxed space-y-3 font-serif">
                  {siteHistory.detailedHistory.split('\n\n').map((paragraph, pIdx) => (
                    <p key={pIdx} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Did You Know Box */}
              <div className="p-4 bg-amber-950/30 border border-amber-500/40 rounded-2xl flex items-start space-x-3 text-xs sm:text-sm text-amber-200">
                <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-300 block mb-1">Archaeological Fact</strong>
                  <p className="leading-relaxed text-stone-300">{siteHistory.didYouKnow}</p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-stone-900/80 px-6 py-4 border-t border-stone-800 flex items-center justify-between">
          <div className="text-xs text-stone-400 font-medium">
            Explore and solve quests at {siteHistory.name} to earn its official Badge & Certificate.
          </div>
          <button
            onClick={handleClose}
            className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow transition-all"
          >
            Done Reading
          </button>
        </div>

      </div>
    </div>
  );
}