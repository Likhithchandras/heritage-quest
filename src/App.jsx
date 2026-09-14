import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { GameProgressProvider } from './context/GameProgressContext';
import { AccessibilityProvider } from './context/AccessibilityContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import AccessibilityBar from './components/common/AccessibilityBar';
import HomePage from './pages/HomePage';
import HuntDetailPage from './pages/HuntDetailPage';
import PlayHuntPage from './pages/PlayHuntPage';
import PassportPage from './pages/PassportPage';
import MapPage from './pages/MapPage';
import LoginPage from './pages/LoginPage';
import LeaderboardPage from './pages/LeaderboardPage';

export default function App() {
  return (
    <AccessibilityProvider>
      <AuthProvider>
        <GameProgressProvider>
          <BrowserRouter>
            <div className="min-h-screen flex flex-col bg-stone-950 text-stone-100 selection:bg-amber-500 selection:text-stone-950 font-sans">
              <AccessibilityBar />
              <Navbar />
              <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/hunt/:id" element={<HuntDetailPage />} />
                  <Route path="/play/:id" element={<PlayHuntPage />} />
                  <Route path="/passport" element={<PassportPage />} />
                  <Route path="/map" element={<MapPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/leaderboard" element={<LeaderboardPage />} />
                  <Route path="*" element={<HomePage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </GameProgressProvider>
      </AuthProvider>
    </AccessibilityProvider>
  );
}
