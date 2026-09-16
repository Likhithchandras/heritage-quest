import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useGameProgress } from '../context/GameProgressContext';
import { useAccessibility, THEMES } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';
import { soundEffects } from '../utils/soundEffects';
import { User, Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight, CheckCircle2, Palette, Globe } from 'lucide-react';

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { login, signup, guestLogin } = useAuth();
  const { setExplorerName } = useGameProgress();
  const { currentTheme, setCurrentTheme } = useAccessibility();
  const { currentLang, languages, changeLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage(t('alert_fill_fields') || 'Please enter both email and password.');
      soundEffects.playWrong();
      return;
    }

    if (isSignUp && !name.trim()) {
      setErrorMessage(t('alert_enter_name') || 'Please enter your explorer name.');
      soundEffects.playWrong();
      return;
    }

    if (password.length < 4) {
      setErrorMessage(t('alert_pwd_len') || 'Password must be at least 4 characters.');
      soundEffects.playWrong();
      return;
    }

    if (isSignUp) {
      const user = signup(name, email, password);
      setExplorerName(user.name);
      setSuccessMessage(`${t('msg_acc_created') || 'Account created!'} (${user.name})`);
      soundEffects.playSuccess();
      setTimeout(() => navigate('/home'), 800);
    } else {
      const derivedName = name.trim() || email.split('@')[0];
      const user = login(derivedName, email, password);
      setExplorerName(user.name);
      setSuccessMessage(`${t('msg_welcome') || 'Welcome back!'} (${user.name})`);
      soundEffects.playSuccess();
      setTimeout(() => navigate('/home'), 600);
    }
  };

  const handleGuest = () => {
    soundEffects.playClick();
    const user = guestLogin();
    setExplorerName(user.name);
    navigate('/home');
  };

  const themeGradients = {
    'lapis-gold': {
      bgGlow: 'from-blue-950/60 via-stone-950/80 to-amber-950/50',
      cardBorder: 'border-amber-500/40',
      accentText: 'text-amber-400',
      btnGradient: 'from-amber-500 via-amber-600 to-amber-700',
      badgeBorder: 'border-amber-500/30 text-amber-300 bg-amber-500/10'
    },
    'patina-bronze': {
      bgGlow: 'from-emerald-950/60 via-stone-950/80 to-stone-900/50',
      cardBorder: 'border-emerald-500/40',
      accentText: 'text-emerald-400',
      btnGradient: 'from-emerald-500 via-teal-600 to-emerald-700',
      badgeBorder: 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10'
    },
    'crimson-amber': {
      bgGlow: 'from-red-950/60 via-stone-950/80 to-amber-950/50',
      cardBorder: 'border-red-500/40',
      accentText: 'text-amber-400',
      btnGradient: 'from-red-600 via-amber-600 to-amber-700',
      badgeBorder: 'border-red-500/30 text-amber-300 bg-red-500/10'
    },
    'forest-brass': {
      bgGlow: 'from-emerald-950/60 via-stone-950/80 to-amber-950/50',
      cardBorder: 'border-emerald-500/40',
      accentText: 'text-amber-300',
      btnGradient: 'from-amber-500 via-amber-600 to-emerald-700',
      badgeBorder: 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10'
    }
  };

  const activeThemeStyle = themeGradients[currentTheme] || themeGradients['lapis-gold'];

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center px-4 py-10 overflow-hidden">
      
      {/* Background Layer: Subtle Coin Watermark and Ambient Glow */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 scale-105 pointer-events-none filter blur-[1px] mix-blend-luminosity transition-all duration-1000"
        style={{
          backgroundImage: `url('/assets/heritage_medallion.jpg')`,
        }}
      />
      
      {/* Dynamic Theme Color Backdrop Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${activeThemeStyle.bgGlow} pointer-events-none backdrop-blur-[2px]`} />
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      {/* Main Clean Centered Login Card */}
      <div className={`relative z-10 w-full max-w-md rounded-3xl border ${activeThemeStyle.cardBorder} bg-stone-950/85 backdrop-blur-2xl p-7 sm:p-9 shadow-[0_20px_60px_rgba(0,0,0,0.9)] transition-all duration-500 space-y-6`}>
        
        {/* Top Header with Language Selector & Theme Selector */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div className="inline-flex items-center space-x-1.5 bg-stone-900 border border-amber-500/40 rounded-full px-2.5 py-1 text-xs text-amber-300">
            <Globe className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <select
              value={currentLang}
              onChange={(e) => {
                soundEffects.playClick();
                changeLanguage(e.target.value);
              }}
              className="bg-transparent text-xs font-bold text-amber-300 focus:outline-none cursor-pointer"
              aria-label="Choose Language"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code} className="bg-stone-900 text-stone-100 font-semibold">
                  {l.nativeName} ({l.name})
                </option>
              ))}
            </select>
          </div>

          {/* Theme Switcher */}
          <div className="flex items-center space-x-1 bg-black/50 p-1 rounded-full border border-white/10">
            <Palette className="w-3 h-3 text-stone-400 ml-1" />
            {THEMES.map((theme) => {
              const isCurrent = currentTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => {
                    soundEffects.playClick();
                    setCurrentTheme(theme.id);
                  }}
                  title={theme.name}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                    isCurrent
                      ? 'bg-amber-500 text-stone-950 shadow scale-105'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {theme.primaryPill}
                </button>
              );
            })}
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-100 font-serif tracking-tight">
            {isSignUp ? t('signup_title') : t('login_title')}
          </h1>
          <p className="text-xs text-stone-400">
            {isSignUp ? t('signup_sub') : t('login_sub')}
          </p>
        </div>

        {/* Alerts */}
        {errorMessage && (
          <div className="p-3 bg-red-500/20 border border-red-500/40 rounded-xl text-red-200 text-xs font-semibold text-center animate-shake">
            ⚠️ {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-200 text-xs font-semibold flex items-center justify-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Explorer Name (Sign Up only or optional) */}
          {isSignUp && (
            <div>
              <label className="block text-[11px] font-bold text-stone-300 uppercase tracking-wider mb-1.5">
                {t('name_label')}
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('name_placeholder')}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-900/90 border border-stone-700/80 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 text-sm transition-colors"
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-[11px] font-bold text-stone-300 uppercase tracking-wider mb-1.5">
              {t('email_label')}
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('email_placeholder')}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-900/90 border border-stone-700/80 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 text-sm transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[11px] font-bold text-stone-300 uppercase tracking-wider mb-1.5">
              {t('password_label')}
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-11 py-2.5 rounded-xl bg-stone-900/90 border border-stone-700/80 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 text-sm transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={`w-full py-3 px-5 bg-gradient-to-r ${activeThemeStyle.btnGradient} hover:brightness-110 active:scale-[0.98] text-stone-950 font-black text-sm rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2`}
          >
            <span>{isSignUp ? t('btn_signup') : t('btn_signin')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer Actions */}
        <div className="space-y-3 pt-2 text-center border-t border-white/10">
          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              setIsSignUp(!isSignUp);
              setErrorMessage('');
            }}
            className="text-xs text-amber-400 hover:text-amber-300 font-semibold transition-colors"
          >
            {isSignUp ? t('switch_to_login') : t('switch_to_signup')}
          </button>

          <button
            type="button"
            onClick={handleGuest}
            className="w-full py-2.5 px-4 bg-stone-900/90 hover:bg-stone-800 text-stone-300 hover:text-amber-200 text-xs font-bold rounded-xl border border-stone-700/60 transition-all shadow-sm"
          >
            {t('guest_btn')}
          </button>
        </div>

      </div>
    </div>
  );
}

