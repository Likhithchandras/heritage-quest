import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  Gamepad2, 
  MapPin, 
  Sparkles, 
  PlusCircle, 
  Volume2, 
  VolumeX, 
  User, 
  Menu, 
  X, 
  Award,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useAudio } from '@/context/AudioContext';
import Button from './Button';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { soundEnabled, toggleSound, playBell } = useAudio();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Explore', path: '/explore', icon: Compass },
    { name: 'Game Library', path: '/library', icon: Gamepad2 },
    { name: 'National Map', path: '/map', icon: MapPin },
    { name: 'Dashboard', path: '/dashboard', icon: Sparkles },
    { name: 'Studio', path: '/create', icon: PlusCircle },
  ];

  const handleLinkClick = () => {
    playBell(660);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#C5A059]/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link 
            to="/" 
            onClick={handleLinkClick}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#C5A059] to-[#EADCC9] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300 border border-[#C5A059]">
              <span className="text-xl select-none">🏛️</span>
            </div>
            <div>
              <span className="font-serif-title font-bold text-lg tracking-wider text-[#1C1917] block leading-tight">
                HERITAGE QUEST
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-[#C5A059] block">
                Civilization & Lore
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={handleLinkClick}
                  className={`relative px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    isActive 
                      ? 'text-[#1C1917] font-semibold bg-[#EADCC9]/50 shadow-sm' 
                      : 'text-[#57534E] hover:text-[#1C1917] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#C86D51]' : 'text-[#C5A059]'}`} />
                  <span>{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#C5A059] rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-3">
            
            {/* Audio Toggle */}
            <button
              onClick={() => {
                toggleSound();
                if (!soundEnabled) playBell(880);
              }}
              aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
              className="p-2 rounded-full text-[#57534E] hover:text-[#1C1917] hover:bg-[#EADCC9]/40 transition-colors focus:outline-none"
              title={soundEnabled ? 'Mute ambient soundscapes' : 'Enable audio soundscapes'}
            >
              {soundEnabled ? (
                <Volume2 className="w-5 h-5 text-[#C5A059]" />
              ) : (
                <VolumeX className="w-5 h-5 opacity-60" />
              )}
            </button>

            {/* Cultural XP Pill */}
            {isAuthenticated && user && (
              <Link 
                to="/dashboard"
                className="hidden sm:flex items-center gap-2 bg-[#FFFDF9] border border-[#C5A059]/30 rounded-full px-3.5 py-1.5 shadow-sm hover:border-[#C5A059] transition-colors"
              >
                <Award className="w-4 h-4 text-[#C5A059]" />
                <span className="text-xs font-bold text-[#1C1917] font-mono">
                  {user.culturalXp.toLocaleString()} XP
                </span>
              </Link>
            )}

            {/* Profile Dropdown / Login */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-[#EADCC9]/40 transition-colors focus:outline-none"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border border-[#C5A059] object-cover"
                  />
                  <ChevronDown className="w-3.5 h-3.5 text-[#57534E]" />
                </button>

                {/* Profile Dropdown Menu */}
                <AnimatePresence>
                  {profileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 bg-[#FFFDF9] rounded-2xl shadow-xl border border-[#C5A059]/30 py-2 z-50"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <div className="px-4 py-2 border-b border-[#EADCC9]/50">
                        <p className="text-xs font-medium text-[#57534E]">Signed in as</p>
                        <p className="text-sm font-semibold text-[#1C1917] truncate">{user.name}</p>
                        <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#5E7A68]/10 text-[#5E7A68]">
                          {user.levelTitle}
                        </span>
                      </div>

                      <div className="py-1">
                        <Link
                          to="/profile"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-[#1C1917] hover:bg-[#FAF7F2] transition-colors"
                        >
                          <User className="w-4 h-4 text-[#C5A059]" />
                          Profile & Badges
                        </Link>
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-[#1C1917] hover:bg-[#FAF7F2] transition-colors"
                        >
                          <Sparkles className="w-4 h-4 text-[#C86D51]" />
                          Adventure HQ
                        </Link>
                      </div>

                      <div className="border-t border-[#EADCC9]/50 pt-1">
                        <button
                          onClick={() => logout()}
                          className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-[#C86D51] hover:bg-[#FAF7F2] transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#1C1917] hover:bg-[#EADCC9]/40 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-[#C5A059]/20 bg-[#FAF7F2] overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={handleLinkClick}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium ${
                      isActive 
                        ? 'bg-[#EADCC9] text-[#1C1917] font-semibold' 
                        : 'text-[#57534E] hover:bg-[#EADCC9]/30'
                    }`}
                  >
                    <Icon className="w-5 h-5 text-[#C5A059]" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
              {!isAuthenticated && (
                <div className="pt-3">
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/login');
                    }}
                  >
                    Sign In
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
