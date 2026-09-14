import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useGameProgress } from '../context/GameProgressContext';
import { useAccessibility, THEMES } from '../context/AccessibilityContext';
import { soundEffects } from '../utils/soundEffects';
import { User, Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight, CheckCircle2, Shield, Palette, Compass, Award } from 'lucide-react';

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { login, signup, guestLogin } = useAuth();
  const { setExplorerName, completedHunts } = useGameProgress();
  const { currentTheme, setCurrentTheme } = useAccessibility();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Please provide both your email address and password.');
      soundEffects.playWrong();
      return;
    }

    if (isSignUp && !name.trim()) {
      setErrorMessage('Please enter your explorer name to register.');
      soundEffects.playWrong();
      return;
    }

    if (password.length < 4) {
      setErrorMessage('Password should be at least 4 characters long.');
      soundEffects.playWrong();
      return;
    }

    if (isSignUp) {
      const user = signup(name, email, password);
      setExplorerName(user.name);
      setSuccessMessage(`Explorer account registered for ${user.name}! Starting expedition...`);
      setTimeout(() => navigate('/'), 1200);
    } else {
      const derivedName = name.trim() || email.split('@')[0];
      const user = login(derivedName, email, password);
      setExplorerName(user.name);
      setSuccessMessage(`Signed in successfully as ${user.name}. Loading quest...`);
      setTimeout(() => navigate('/'), 1000);
    }
  };

  const handleGuest = () => {
    const user = guestLogin();
    setExplorerName(user.name);
    navigate('/');
  };

  // Theme palettes & background glow styles
  const themeGradients = {
    'lapis-gold': {
      bgGlow: 'from-blue-950/40 via-stone-950 to-amber-950/30',
      cardBorder: 'border-amber-500/40',
      accentText: 'text-amber-400',
      btnGradient: 'from-amber-500 via-amber-600 to-amber-700',
      badgeBorder: 'border-amber-500/40 text-amber-300 bg-amber-500/20'
    },
    'patina-bronze': {
      bgGlow: 'from-emerald-950/40 via-stone-950 to-stone-900',
      cardBorder: 'border-emerald-500/40',
      accentText: 'text-emerald-400',
      btnGradient: 'from-emerald-500 via-teal-600 to-emerald-700',
      badgeBorder: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/20'
    },
    'crimson-amber': {
      bgGlow: 'from-red-950/50 via-stone-950 to-amber-950/40',
      cardBorder: 'border-red-500/40',
      accentText: 'text-amber-400',
      btnGradient: 'from-red-600 via-amber-600 to-amber-700',
      badgeBorder: 'border-red-500/40 text-amber-300 bg-red-500/20'
    },
    'forest-brass': {
      bgGlow: 'from-emerald-950/50 via-stone-950 to-amber-950/30',
      cardBorder: 'border-emerald-500/40',
      accentText: 'text-amber-300',
      btnGradient: 'from-amber-500 via-amber-600 to-emerald-700',
      badgeBorder: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/20'
    }
  };

  const activeThemeStyle = themeGradients[currentTheme] || themeGradients['lapis-gold'];

  return (
    <div className={`min-h-[88vh] flex items-center justify-center px-4 py-8 animate-fadeIn bg-gradient-to-br ${activeThemeStyle.bgGlow}`}>
      <div className={`w-full max-w-5xl rounded-[32px] border-2 ${activeThemeStyle.cardBorder} bg-stone-950/90 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all duration-500`}>
        
        {/* Left 7 Columns: Storytelling Hero with Clean Aesthetic Medallion & 4 Stats */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6 border-b lg:border-b-0 lg:border-r border-white/10 relative">
          
          <div className="space-y-4">
            {/* Top Badge */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider ${activeThemeStyle.badgeBorder}`}>
                <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
                <span>Interactive Archaeological Expedition</span>
              </div>

              {/* Quick Theme Selector Pills */}
              <div className="flex items-center space-x-1 bg-black/40 p-1 rounded-full border border-white/10">
                <Palette className="w-3.5 h-3.5 text-stone-400 ml-1.5" />
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
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                        isCurrent
                          ? 'bg-amber-500 text-stone-950 shadow-md scale-105'
                          : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      {theme.primaryPill}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-amber-100 font-serif leading-tight">
              Discover India’s Timeless Wonders Through <span className={`text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200`}>Riddles & Quests</span>
            </h1>

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-sans">
              Step into the shoes of an ancient detective. Explore <strong>20 historic monuments</strong> and <strong>129 interactive checkpoints</strong> across India. Solve child-friendly riddles, observe stone secrets, and earn official explorer certificates!
            </p>
          </div>

          {/* Aesthetic Medallion Banner with Ornate Frame */}
          <div className="relative p-5 rounded-2xl bg-black/40 border border-white/10 flex items-center space-x-5 shadow-inner">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shrink-0 border-2 border-amber-400/60 shadow-[0_0_20px_rgba(245,158,11,0.3)] bg-gradient-to-br from-amber-500/20 to-amber-900/40 p-1 flex items-center justify-center">
              <img
                src="/assets/heritage_medallion.jpg"
                alt="Bharat Heritage Seal"
                className="w-full h-full object-cover rounded-full transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="space-y-1.5 min-w-0">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                <span>Bharat Heritage Seal</span>
              </div>
              <div className="font-serif font-bold text-sm sm:text-base text-stone-100">
                Ministry of Junior Explorers
              </div>
              <p className="text-[11px] text-stone-400 leading-snug">
                Official archaeological cipher verified across all 8 states of India.
              </p>
            </div>
          </div>

          {/* Bottom 4-Column Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-white/10 text-stone-200">
            <div className="p-3 bg-black/40 rounded-xl border border-white/10 text-center">
              <div className="text-xl font-black text-amber-400">20</div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-stone-400">HERITAGE SITES</div>
            </div>
            <div className="p-3 bg-black/40 rounded-xl border border-white/10 text-center">
              <div className="text-xl font-black text-amber-400">129</div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-stone-400">CHECKPOINTS</div>
            </div>
            <div className="p-3 bg-black/40 rounded-xl border border-white/10 text-center">
              <div className="text-xl font-black text-amber-400">8</div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-stone-400">STATES OF INDIA</div>
            </div>
            <div className="p-3 bg-black/40 rounded-xl border border-white/10 text-center">
              <div className="text-xl font-black text-emerald-400">{completedHunts.length}/20</div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-stone-400">HUNTS SOLVED</div>
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Authentication Form */}
        <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-center space-y-5 bg-black/30">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-amber-100 font-serif">
              {isSignUp ? 'Create Explorer Account' : 'Sign In To Quest'}
            </h2>
            <p className="text-xs text-stone-400">
              {isSignUp ? 'Register to save your explorer progress & rank' : 'Enter your credentials to continue your expedition'}
            </p>
          </div>

          {/* Alerts */}
          {errorMessage && (
            <div className="p-3 bg-red-500/20 border border-red-500/40 rounded-xl text-red-200 text-xs font-semibold animate-shake">
              ⚠️ {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-200 text-xs font-semibold flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1">
                Explorer Name {isSignUp ? '*' : '(Optional)'}
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Arya Sharma"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-stone-900 border border-stone-700 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="explorer@heritagequest.org"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-stone-900 border border-stone-700 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-stone-900 border border-stone-700 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 text-sm"
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

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full py-3.5 px-6 bg-gradient-to-r ${activeThemeStyle.btnGradient} hover:brightness-110 active:scale-95 text-stone-950 font-black text-sm rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 mt-2`}
            >
              <span>{isSignUp ? 'Register & Begin Quest' : 'Sign In To Quest'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Mode Switch & Guest Button */}
          <div className="space-y-2.5 pt-1 text-center">
            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                setIsSignUp(!isSignUp);
                setErrorMessage('');
              }}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
            >
              {isSignUp
                ? 'Already registered? Sign In here'
                : "New explorer? Create an account (+50 XP Bonus!)"}
            </button>

            <button
              type="button"
              onClick={handleGuest}
              className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-amber-200 text-xs font-bold rounded-xl border border-stone-800 transition-colors"
            >
              🚀 Continue as Guest Explorer (Instant Play)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
