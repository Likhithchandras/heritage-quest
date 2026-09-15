import React, { createContext, useContext, useState, useEffect } from 'react';
import { soundEffects } from '../utils/soundEffects';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('heritage_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.isLoggedIn) return parsed;
      }
    } catch (e) {}
    // Unauthenticated initial state
    return null;
  });

  useEffect(() => {
    if (currentUser && currentUser.isLoggedIn) {
      localStorage.setItem('heritage_user', JSON.stringify(currentUser));
      localStorage.setItem('heritage_explorer_name', currentUser.name);
    } else {
      localStorage.removeItem('heritage_user');
    }
  }, [currentUser]);

  const login = (name, email, password) => {
    const userObj = {
      name: name.trim() || 'Junior Explorer',
      email: email.trim().toLowerCase(),
      isLoggedIn: true,
      role: 'Heritage Detective',
      joinedDate: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
    };
    setCurrentUser(userObj);
    soundEffects.playCorrect();
    return userObj;
  };

  const signup = (name, email, password) => {
    const userObj = {
      name: name.trim() || 'New Explorer',
      email: email.trim().toLowerCase(),
      isLoggedIn: true,
      role: 'Apprentice Historian',
      joinedDate: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
    };
    setCurrentUser(userObj);
    soundEffects.playFanfare();
    return userObj;
  };

  const guestLogin = () => {
    const userObj = {
      name: 'Guest Scout',
      email: 'guest@heritagequest.org',
      isLoggedIn: true,
      role: 'Guest Scout',
      joinedDate: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
    };
    setCurrentUser(userObj);
    soundEffects.playClick();
    return userObj;
  };

  const logout = () => {
    soundEffects.playClick();
    setCurrentUser(null);
    localStorage.removeItem('heritage_user');
  };

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated: !!(currentUser && currentUser.isLoggedIn), login, signup, guestLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
