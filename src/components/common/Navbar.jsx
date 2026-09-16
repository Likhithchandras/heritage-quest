import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Compass, Map, Shield, Trophy, User, LogIn, LogOut, Sparkles } from 'lucide-react';
import { useGameProgress } from '../../context/GameProgressContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { soundEffects } from '../../utils/soundEffects';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalScore, currentRank } = useGameProgress();
  const { currentUser, isAuthenticated, logout } = useAuth();
  const { currentLang, languages, changeLanguage, t } = useLanguage();

  const navLinks = [
    { name: t('nav_monuments'), path: '/home', icon: Compass },
    { name: t('nav_map'), path: '/map', icon: Map },
    { name: t('nav_leaderboard'), path: '/leaderboard', icon: Trophy },
    { name: t('nav_passport'), path: '/passport', icon: Shield },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-amber-500/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          to={isAuthenticated ? '/home' : '/'}
          onClick={() => soundEffects.playClick()}
          className="flex items-center space-x-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-stone-950 shadow-md group-hover:scale-105 transition-transform">
            <Compass className="w-6 h-6 animate-spin" style={{ animationDuration: '12s' }} />
          </div>
          <div>
            <div className="font-serif font-black text-lg tracking-tight text-amber-100 flex items-center gap-1.5">
              <span>{t('app_title')}</span>
              <span className="text-[10px] font-sans font-bold px-1.5 py-0.2 bg-amber-500/20 text-amber-300 rounded border border-amber-500/40">
                INDIA
              </span>
            </div>
            <div className="text-[11px] text-stone-400 font-medium">{t('app_subtitle')}</div>
          </div>
        </Link>

        {/* Navigation Links - Shown when Authenticated */}
        {isAuthenticated && (
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => soundEffects.playClick()}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'text-stone-400 hover:text-amber-200 hover:bg-stone-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        )}

        {/* User Status / Language Selector / Logout */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Direct Navbar Language Selector */}
          <div className="hidden sm:inline-flex items-center bg-stone-900/90 border border-amber-500/30 rounded-xl px-2 py-1 text-xs">
            <span className="text-amber-400 mr-1 text-xs">🌐</span>
            <select
              value={currentLang}
              onChange={(e) => {
                soundEffects.playClick();
                changeLanguage(e.target.value);
              }}
              className="bg-transparent text-xs font-bold text-amber-300 focus:outline-none cursor-pointer"
              aria-label="Select platform language"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code} className="bg-stone-900 text-stone-100 font-medium">
                  {l.nativeName}
                </option>
              ))}
            </select>
          </div>
          {isAuthenticated && (
            <Link
              to="/passport"
              onClick={() => soundEffects.playClick()}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-amber-950/70 border border-amber-500/40 hover:bg-amber-900/60 transition-colors shadow-sm"
            >
              <div className="w-5 h-5 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center font-black text-[10px]">
                ⭐
              </div>
              <div className="text-right">
                <div className="text-xs font-black text-amber-200 leading-none">{totalScore} XP</div>
                <div className="text-[9px] font-bold text-amber-400/80 leading-none hidden sm:block">{currentRank.name}</div>
              </div>
            </Link>
          )}

          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <Link
                to="/passport"
                onClick={() => soundEffects.playClick()}
                className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-xs font-bold text-stone-200 border border-stone-700"
                title="View Explorer Profile"
              >
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span className="truncate max-w-[100px]">{currentUser ? currentUser.name : 'Explorer'}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-amber-300 border border-stone-800 text-xs transition-colors flex items-center gap-1"
                title="Sign Out to Login Gate"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline text-[11px] font-semibold">{t('nav_signout')}</span>
              </button>
            </div>
          ) : (
            <Link
              to="/"
              onClick={() => soundEffects.playClick()}
              className="inline-flex items-center space-x-1 px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow transition-all"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{t('nav_signin')}</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
