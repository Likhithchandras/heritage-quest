import React, { createContext, useContext, useState, useEffect } from 'react';
import { LANGUAGES, TRANSLATIONS } from '../data/translations';
import { speechNarrator } from '../utils/speechNarrator';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('heritage_language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('heritage_language', currentLang);
    const langObj = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];
    if (speechNarrator && speechNarrator.setVoiceLang) {
      speechNarrator.setVoiceLang(langObj.voiceLang);
    }
  }, [currentLang]);

  const t = (key) => {
    if (!key) return '';
    const langDict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    if (TRANSLATIONS.en && TRANSLATIONS.en[key]) {
      return TRANSLATIONS.en[key];
    }
    return '';
  };

  const changeLanguage = (code) => {
    setCurrentLang(code);
  };

  const activeLanguage = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

  const value = {
    currentLang,
    activeLanguage,
    languages: LANGUAGES,
    changeLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
