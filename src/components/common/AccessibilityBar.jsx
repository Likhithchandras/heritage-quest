import React, { useState } from 'react';
import { useAccessibility, THEMES, FONT_SIZES } from '../../context/AccessibilityContext';
import { useLanguage } from '../../context/LanguageContext';
import { soundEffects } from '../../utils/soundEffects';
import { Palette, Type, Volume2, VolumeX, Mic, MicOff, Plus, Minus, Sparkles, Globe, ChevronDown } from 'lucide-react';

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

  const { currentLang, languages, changeLanguage, t } = useLanguage();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const activeFontObj = FONT_SIZES.find(f => f.id === fontSize) || FONT_SIZES[0];
  const activeLangObj = languages.find(l => l.code === currentLang) || languages[0];

  return (
    <div className="bg-stone-950/95 backdrop-blur-md border-b border-amber-500/25 px-3 py-1.5 z-50 sticky top-0 transition-all text-stone-300">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
        
        {/* Left: Language Selector & Theme Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto py-0.5 scrollbar-none">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                soundEffects.playClick();
                setLangDropdownOpen(!langDropdownOpen);
              }}
              className="px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all flex items-center space-x-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 shadow-sm"
              title="Change Language / भाषा बदलें"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{activeLangObj.nativeName}</span>
              <ChevronDown className="w-3 h-3 text-amber-400/80" />
            </button>

            {langDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setLangDropdownOpen(false)}
                />
                <div className="absolute left-0 mt-1.5 w-40 bg-stone-900 border border-amber-500/30 rounded-xl shadow-2xl z-50 py-1.5 overflow-hidden animate-fadeIn">
                  <div className="px-3 py-1 text-[10px] uppercase font-bold text-amber-400 border-b border-stone-800 flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    <span>Select Language</span>
                  </div>
                  {languages.map((l) => {
                    const isSelected = currentLang === l.code;
                    return (
                      <button
                        key={l.code}
                        onClick={() => {
                          soundEffects.playClick();
                          changeLanguage(l.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-1.5 text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-amber-500 text-stone-950 font-bold'
                            : 'text-stone-300 hover:bg-stone-800 hover:text-amber-200'
                        }`}
                      >
                        <span className="font-medium">{l.nativeName}</span>
                        <span className={`text-[10px] ${isSelected ? 'text-stone-900 font-bold' : 'text-stone-500'}`}>
                          {l.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          <div className="h-4 w-px bg-stone-800 hidden sm:block"></div>

          {/* Theme Pills */}
          <span className="text-[11px] font-bold text-amber-400 mr-0.5 hidden lg:inline flex items-center gap-1">
            <Palette className="w-3.5 h-3.5" />
            <span>{t('theme_label')}:</span>
          </span>
          {THEMES.map((tItem) => {
            const isSelected = currentTheme === tItem.id;
            return (
              <button
                key={tItem.id}
                onClick={() => {
                  soundEffects.playClick();
                  setCurrentTheme(tItem.id);
                }}
                className={`px-2 py-1 rounded-xl text-[11px] font-bold transition-all flex items-center space-x-1 whitespace-nowrap ${
                  isSelected
                    ? 'bg-amber-500 text-stone-950 shadow-md scale-105'
                    : 'bg-stone-900/80 hover:bg-stone-800 text-stone-300 border border-stone-800'
                }`}
              >
                <span>{tItem.icon}</span>
                <span className="hidden sm:inline">{tItem.name}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Font Size Controls & Audio */}
        <div className="flex items-center space-x-2">
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
            title="Read text aloud in selected regional language"
          >
            {narrationEnabled ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">{narrationEnabled ? t('voice_on') : t('voice_off')}</span>
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
            <span className="hidden md:inline">{soundEnabled ? t('audio_on') : t('audio_off')}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
