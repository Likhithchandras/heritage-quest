import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import LandingPage from '@/pages/LandingPage';
import ExplorePage from '@/pages/ExplorePage';
import GameLibraryPage from '@/pages/GameLibraryPage';
import GameDetailPage from '@/pages/GameDetailPage';
import GameExperiencePage from '@/pages/GameExperiencePage';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import CreateGamePage from '@/pages/CreateGamePage';
import ProfilePage from '@/pages/ProfilePage';
import NotFoundPage from '@/pages/NotFoundPage';
import IndiaCulturalMap from '@/components/map/IndiaCulturalMap';
import { AuthProvider } from '@/context/AuthContext';
import { AudioProvider } from '@/context/AudioContext';

const AppLayout = () => {
  const location = useLocation();
  const isImmersiveExperience = location.pathname.startsWith('/experience/');

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1C1917] selection:bg-[#C5A059] selection:text-white">
      {!isImmersiveExperience && <Navbar />}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/library" element={<GameLibraryPage />} />
          <Route path="/games/:gameId" element={<GameDetailPage />} />
          <Route path="/experience/:gameId" element={<GameExperiencePage />} />
          <Route path="/map" element={
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C86D51]">
                  National Cartography
                </span>
                <h1 className="font-serif-title font-bold text-3xl sm:text-4xl text-[#1C1917] mt-1">
                  Pan-India Cultural Geofenced Map
                </h1>
                <p className="text-xs sm:text-sm text-[#57534E] mt-1">
                  Select any historical site across the subcontinent to view active quests, architectural blueprints, and uncollected relics.
                </p>
              </div>
              <IndiaCulturalMap />
            </div>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/create" element={<CreateGamePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {!isImmersiveExperience && <Footer />}
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <AudioProvider>
        <Router>
          <AppLayout />
        </Router>
      </AudioProvider>
    </AuthProvider>
  );
}

export default App;
