import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: { username: string } | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Initialize auth state from localStorage on app start
  const savedAuth = localStorage.getItem('auth');
  let initialState = { isAuthenticated: false, user: null };
  
  if (savedAuth) {
    try {
      const authData = JSON.parse(savedAuth);
      if (authData.isAuthenticated && authData.user) {
        initialState = {
          isAuthenticated: authData.isAuthenticated,
          user: authData.user
        };
      }
    } catch (error) {
      console.error('Error parsing saved auth data:', error);
      localStorage.removeItem('auth');
    }
  }

  return {
    ...initialState,
    login: async (username: string, password: string) => {
      // In a real app, this would make an API call to authenticate
      // For now, using simple hardcoded credentials for demo
      if (username === 'admin' && password === 'admin123') {
        const newState = { isAuthenticated: true, user: { username } };
        set(newState);
        localStorage.setItem('auth', JSON.stringify(newState));
        return true;
      }
      return false;
    },
    logout: () => {
      const newState = { isAuthenticated: false, user: null };
      set(newState);
      localStorage.removeItem('auth');
    },
  };
});
