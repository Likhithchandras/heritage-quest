import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
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

import PrintableQRCodesPage from './pages/PrintableQRCodesPage';

// Protected Gate Component
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
}

// Initial Landing Gate: If not authenticated, show LoginPage. If authenticated, show HomePage
function InitialGateway() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <LoginPage />;
  }
  return <HomePage />;
}

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
                  {/* First Gate: Login Page */}
                  <Route path="/" element={<InitialGateway />} />
                  <Route path="/login" element={<LoginPage />} />

                  {/* Main Explorer Experience (Unlocked after Login) */}
                  <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                  <Route path="/hunt/:id" element={<ProtectedRoute><HuntDetailPage /></ProtectedRoute>} />
                  <Route path="/play/:id" element={<ProtectedRoute><PlayHuntPage /></ProtectedRoute>} />
                  <Route path="/passport" element={<ProtectedRoute><PassportPage /></ProtectedRoute>} />
                  <Route path="/map" element={<ProtectedRoute><MapPage /></ProtectedRoute>} />
                  <Route path="/leaderboard" element={<ProtectedRoute><LeaderboardPage /></ProtectedRoute>} />
                  <Route path="/qr-codes" element={<ProtectedRoute><PrintableQRCodesPage /></ProtectedRoute>} />

                  {/* Fallback */}
                  <Route path="*" element={<InitialGateway />} />
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
