import { MOCK_USER_DATA } from '../data/mockUserData';

export const authService = {
  async login(email, password) {
    await new Promise((res) => setTimeout(res, 600)); // realistic network delay
    if (email && password) {
      localStorage.setItem('hq_user_session', JSON.stringify(MOCK_USER_DATA));
      return { success: true, user: MOCK_USER_DATA };
    }
    throw new Error('Invalid email or password');
  },

  async loginWithGoogle() {
    await new Promise((res) => setTimeout(res, 800));
    localStorage.setItem('hq_user_session', JSON.stringify(MOCK_USER_DATA));
    return { success: true, user: MOCK_USER_DATA };
  },

  async signup(name, email, password) {
    await new Promise((res) => setTimeout(res, 800));
    const newUser = { ...MOCK_USER_DATA, name, email, culturalXp: 100 };
    localStorage.setItem('hq_user_session', JSON.stringify(newUser));
    return { success: true, user: newUser };
  },

  getCurrentUser() {
    const session = localStorage.getItem('hq_user_session');
    return session ? JSON.parse(session) : MOCK_USER_DATA;
  },

  logout() {
    localStorage.removeItem('hq_user_session');
    return true;
  }
};
