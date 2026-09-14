import React, { createContext, useContext, useState, useEffect } from 'react';
import { sounds } from '../utils/soundEffects';
import { narrator } from '../utils/speechNarrator';

const AccessibilityContext = createContext();

export const THEMES = [
  {
    id: 'lapis-gold',
    name: 'Lapis Blue & Golden',
    primaryPill: 'GOLDEN',
    secondaryPill: 'LAPIS BLUE',
    icon: '🔷',
    primaryColor: '#f59e0b',
    secondaryColor: '#2563eb',
    desc: 'Deep Lapis Obsidian & Radiant Imperial Gold'
  },
  {
    id: 'patina-bronze',
    name: 'Patina Bronze & Umber',
    primaryPill: 'Patina Bronze',
    secondaryPill: 'Antique Umber',
    icon: '🏺',
    primaryColor: '#4ade80',
    secondaryColor: '#2e6f5e',
    desc: 'Ancient Verdigris Bronze & Archaeological Umber'
  },
  {
    id: 'crimson-amber',
    name: 'Radiant Amber & Crimson',
    primaryPill: 'Radiant Amber',
    secondaryPill: 'Crimson',
    icon: '🏮',
    primaryColor: '#fbbf24',
    secondaryColor: '#dc2626',
    desc: 'Mahogany Citadel & Terracotta Crimson'
  },
  {
    id: 'forest-brass',
    name: 'Brass & Vedic Forest',
    primaryPill: 'Brass',
    secondaryPill: 'Terracotta Brick',
    icon: '🌿',
    primaryColor: '#eab308',
    secondaryColor: '#ea580c',
    desc: 'Vedic Forest Jade & Polished Brass'
  }
];

export const FONT_SIZES = [
  { id: 'normal', name: 'Standard (100%)', scale: '100%', class: 'font-scale-normal' },
  { id: 'medium', name: 'Medium (112%)', scale: '112%', class: 'font-scale-medium' },
  { id: 'large', name: 'Large (125%)', scale: '125%', class: 'font-scale-large' },
  { id: 'extra', name: 'Extra Large (138%)', scale: '138%', class: 'font-scale-extra' },
];

export function AccessibilityProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('heritage_theme') || 'lapis-gold';
  });

  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('heritage_fontsize') || 'normal';
  });

  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem('h_sound') !== 'false';
  });

  const [narrationEnabled, setNarrationEnabled] = useState(() => {
    return localStorage.getItem('h_narrate') === 'true';
  });

  // Apply Theme class to document root
  useEffect(() => {
    localStorage.setItem('heritage_theme', currentTheme);
    const root = document.documentElement;
    THEMES.forEach(t => root.classList.remove(`theme-${t.id}`));
    root.classList.add(`theme-${currentTheme}`);
  }, [currentTheme]);

  // Apply Font Size class
  useEffect(() => {
    localStorage.setItem('heritage_fontsize', fontSize);
    const root = document.documentElement;
    FONT_SIZES.forEach(f => root.classList.remove(f.class));
    const target = FONT_SIZES.find(f => f.id === fontSize) || FONT_SIZES[0];
    root.classList.add(target.class);
  }, [fontSize]);

  // Sound sync
  useEffect(() => {
    sounds.enabled = soundEnabled;
    localStorage.setItem('h_sound', soundEnabled.toString());
  }, [soundEnabled]);

  // Speech sync
  useEffect(() => {
    narrator.enabled = narrationEnabled;
    localStorage.setItem('h_narrate', narrationEnabled.toString());
    if (!narrationEnabled) narrator.cancel();
  }, [narrationEnabled]);

  const toggleSound = () => setSoundEnabled(prev => !prev);
  const toggleNarration = () => setNarrationEnabled(prev => !prev);

  const increaseFontSize = () => {
    const idx = FONT_SIZES.findIndex(f => f.id === fontSize);
    if (idx < FONT_SIZES.length - 1) {
      setFontSize(FONT_SIZES[idx + 1].id);
      sounds.click();
    }
  };

  const decreaseFontSize = () => {
    const idx = FONT_SIZES.findIndex(f => f.id === fontSize);
    if (idx > 0) {
      setFontSize(FONT_SIZES[idx - 1].id);
      sounds.click();
    }
  };

  const value = {
    currentTheme,
    setCurrentTheme,
    fontSize,
    setFontSize,
    increaseFontSize,
    decreaseFontSize,
    soundEnabled,
    setSoundEnabled,
    toggleSound,
    narrationEnabled,
    setNarrationEnabled,
    toggleNarration,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
}
