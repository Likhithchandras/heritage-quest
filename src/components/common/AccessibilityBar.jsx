import React from 'react';
import { useAccessibility, THEMES, FONT_SIZES } from '../../context/AccessibilityContext';
import { soundEffects } from '../../utils/soundEffects';
import { Palette, Type, Volume2, VolumeX, Mic, MicOff, Plus, Minus, Sparkles } from 'lucide-react';

export default function AccessibilityBar() {
  const {
    currentTheme,
    setCurrentTheme,
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    soundEnabled,
    toggleSound,
    narrationEnabled,
    toggleNarration
  } = useAccessibility();

  const activeFontObj = FONT_SIZES.find(f => f.id === fontSize) || FONT_SIZES[0];

  return (
    <div className="bg-stone-950/95 backdrop-blur-md border-b border-amber-500/25 px-3 py-1.5 z-50 sticky top-0 transition-all text-stone-300">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
        
        {/* Left: 4 Theme Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto py-0.5 scrollbar-none">
          <span className="text-[11px] font-bold text-amber-400 mr-1 hidden sm:inline flex items-center gap-1">
            <Palette className="w-3.5 h-3.5" />
            <span>Theme:</span>
          </span>
          {THEMES.map((t) => {
            const isSelected = currentTheme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  soundEffects.playClick();
                  setCurrentTheme(t.id);
                }}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all flex items-center space-x-1 whitespace-nowrap ${
                  isSelected
                    ? 'bg-amber-500 text-stone-950 shadow-md scale-105'
                    : 'bg-stone-900/80 hover:bg-stone-800 text-stone-300 border border-stone-800'
                }`}
              >
                <span>{t.icon}</span>
                <span>{t.name}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Font Size Controls & Audio */}
        <div className="flex items-center space-x-2.5">
          {/* Font Size Stepper */}
          <div className="flex items-center space-x-1 bg-stone-900 px-2 py-0.5 rounded-xl border border-stone-800">
            <Type className="w-3.5 h-3.5 text-amber-400" />
            <button
              onClick={decreaseFontSize}
              className="p-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors"
              title="Decrease Font Size"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-[11px] font-mono font-bold text-amber-300 px-1">
              {activeFontObj.scale}
            </span>
            <button
              onClick={increaseFontSize}
              className="p-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors"
              title="Increase Font Size"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          {/* Voice Narrator Toggle */}
          <button
            onClick={() => {
              toggleNarration();
              soundEffects.playClick();
            }}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 ${
              narrationEnabled
                ? 'bg-emerald-500/20 border border-emerald-400/40 text-emerald-300'
                : 'bg-stone-900 hover:bg-stone-800 text-stone-400 border border-stone-800'
            }`}
            title="Read text aloud for children"
          >
            {narrationEnabled ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">{narrationEnabled ? 'Voice ON' : 'Voice OFF'}</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={() => {
              toggleSound();
              soundEffects.playClick();
            }}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 ${
              soundEnabled
                ? 'bg-amber-500/20 border border-amber-400/40 text-amber-300'
                : 'bg-stone-900 hover:bg-stone-800 text-stone-400 border border-stone-800'
            }`}
            title="Sound effects chime toggle"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">{soundEnabled ? 'Audio' : 'Muted'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
