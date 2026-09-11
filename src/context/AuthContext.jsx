import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { MOCK_USER_DATA } from '../data/mockUserData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(MOCK_USER_DATA);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cur = authService.getCurrentUser();
    if (cur) setUser(cur);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await authService.login(email, password);
      setUser(res.user);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const res = await authService.loginWithGoogle();
      setUser(res.user);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const addXP = (amount) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        culturalXp: prev.culturalXp + amount
      };
      localStorage.setItem('hq_user_session', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithGoogle, logout, addXP }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
