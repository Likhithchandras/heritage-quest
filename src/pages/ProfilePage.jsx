import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Award, 
  Sparkles, 
  Settings, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  CheckCircle2, 
  Download,
  Share2
} from 'lucide-react';
import AchievementBadge from '@/components/cards/AchievementBadge';
import Button from '@/components/common/Button';
import { useAuth } from '@/context/AuthContext';
import { useAudio } from '@/context/AudioContext';
import { ACHIEVEMENTS_DATA } from '@/data/achievementsData';

export const ProfilePage = () => {
  const { user } = useAuth();
  const { soundEnabled, toggleSound, playBell } = useAudio();
  const [highContrast, setHighContrast] = useState(false);

  const handleDownloadCertificate = () => {
    playBell(750);
    alert('Generating your verified Heritage Scholar Certificate of Authenticity (PDF)...');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Profile Header */}
      <div className="bg-[#FFFDF9] border border-[#C5A059]/30 rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
            alt={user?.name}
            className="w-24 h-24 rounded-full border-4 border-[#C5A059] object-cover shadow-lg"
          />
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
              <div>
                <h1 className="font-serif-title font-bold text-2xl sm:text-3xl text-[#1C1917]">
                  {user?.name || 'Arya Sharma'}
                </h1>
                <p className="text-xs sm:text-sm font-mono text-[#C86D51] font-semibold mt-0.5">
                  {user?.levelTitle || 'Senior Epigraphist'} • Level {user?.level || 4}
                </p>
              </div>

              <div className="mt-3 sm:mt-0 flex gap-2 justify-center">
                <Button
                  variant="primary"
                  size="sm"
                  icon={Download}
                  onClick={handleDownloadCertificate}
                >
                  Download Certificate
                </Button>
              </div>
            </div>

            <p className="text-xs text-[#57534E] mt-3 max-w-xl">
              Explorer of ancient Indian civilizations, dedicated to non-invasive heritage documentation and epigraphical study.
            </p>
          </div>
        </div>
      </div>

      {/* Badges and Honors Shelf */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C86D51]">
              Accreditations
            </span>
            <h2 className="font-serif-title font-bold text-2xl text-[#1C1917] mt-1">
              Earned Badges & Titles ({ACHIEVEMENTS_DATA.length})
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {ACHIEVEMENTS_DATA.map((ach) => (
            <AchievementBadge
              key={ach.id}
              badge={ach}
              isUnlocked={user?.unlockedBadges?.includes(ach.id) ?? true}
            />
          ))}
        </div>
      </div>

      {/* Experience Preferences */}
      <div className="bg-[#FFFDF9] border border-[#C5A059]/30 rounded-3xl p-6 sm:p-8 shadow-sm">
        <h3 className="font-serif-title font-bold text-lg text-[#1C1917] mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-[#C5A059]" />
          Expedition Preferences
        </h3>

        <div className="space-y-4 divide-y divide-[#EADCC9]">
          <div className="flex items-center justify-between pt-3">
            <div>
              <h4 className="text-xs font-bold text-[#1C1917]">Ambient Soundscapes & Chimes</h4>
              <p className="text-[11px] text-[#57534E]">Enable procedurally synthesized temple bell frequencies</p>
            </div>
            <button
              onClick={toggleSound}
              className={`p-2 rounded-full border transition-all ${
                soundEnabled ? 'bg-[#5E7A68] text-white border-[#5E7A68]' : 'bg-[#FAF7F2] text-[#57534E] border-[#EADCC9]'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex items-center justify-between pt-4">
            <div>
              <h4 className="text-xs font-bold text-[#1C1917]">Responsible Tourism Pledge</h4>
              <p className="text-[11px] text-[#57534E]">Verified non-invasive visitor status on all ASI archaeological sites</p>
            </div>
            <span className="text-xs font-bold text-[#5E7A68] flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
