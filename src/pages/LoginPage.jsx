import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Lock, Mail, User, ArrowRight } from 'lucide-react';
import Button from '@/components/common/Button';
import { useAuth } from '@/context/AuthContext';
import { useAudio } from '@/context/AudioContext';

export const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('arya.sharma@heritagequest.org');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('Arya Sharma');
  const { login, signup } = useAuth();
  const { playBell } = useAudio();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    playBell(650);
    if (isSignUp) {
      signup(name, email, password);
    } else {
      login(email, password);
    }
    navigate('/dashboard');
  };

  const handleGuestLogin = () => {
    playBell(600);
    login('guest@heritagequest.org', 'guest');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-4xl bg-[#FFFDF9] border border-[#C5A059]/30 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2">
        
        {/* Left: Cinematic Historical Panel */}
        <div className="bg-[#1C1917] p-8 sm:p-12 text-[#FAF7F2] flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059]/15 rounded-full blur-3xl" />
          
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">🏛️</span>
              <span className="font-serif-title font-bold text-lg tracking-wider text-[#FAF7F2]">
                HERITAGE QUEST
              </span>
            </div>

            <blockquote className="font-serif-title text-lg sm:text-xl text-[#EADCC9] leading-relaxed mb-4">
              "A people without the knowledge of their past history, origin and culture is like a tree without roots."
            </blockquote>
            <p className="text-xs text-[#C5A059] font-mono">
              — Archaeological Heritage Preservation
            </p>
          </div>

          <div className="pt-8 border-t border-[#FAF7F2]/10">
            <div className="flex items-center gap-2 text-xs text-[#FAF7F2]/70">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <span>Unlock 3D artifacts, earn Scholar Badges, and track your expedition codex.</span>
            </div>
          </div>
        </div>

        {/* Right: Auth Form */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="font-serif-title font-bold text-2xl text-[#1C1917]">
              {isSignUp ? 'Join the Expedition' : 'Welcome Back'}
            </h2>
            <p className="text-xs text-[#57534E] mt-1">
              {isSignUp
                ? 'Create your scholar profile to start discovering'
                : 'Enter your credentials to access your Adventure HQ'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs font-mono font-bold text-[#57534E] uppercase mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#57534E]" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Arya Sharma"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#EADCC9] text-xs text-[#1C1917] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-mono font-bold text-[#57534E] uppercase mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#57534E]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="arya.sharma@heritagequest.org"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#EADCC9] text-xs text-[#1C1917] focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#57534E] uppercase mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#57534E]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#EADCC9] text-xs text-[#1C1917] focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full mt-2"
              icon={ArrowRight}
              iconPosition="right"
            >
              {isSignUp ? 'Create Scholar Account' : 'Sign In to HQ'}
            </Button>
          </form>

          <div className="mt-4 pt-4 border-t border-[#EADCC9] text-center space-y-3">
            <button
              onClick={handleGuestLogin}
              className="w-full py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#EADCC9] text-xs font-bold text-[#1C1917] border border-[#EADCC9] transition-colors"
            >
              ⚡ Quick Guest Access (Instant Demo)
            </button>

            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs text-[#C86D51] hover:underline font-semibold"
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
