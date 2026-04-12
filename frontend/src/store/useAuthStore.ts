import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  username: string;
  email: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string, address?: any) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      isAdmin: false,
      user: null,
      token: null,

      login: async (email: string, password: string): Promise<boolean> => {
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            set({ 
              isAuthenticated: true, 
              isAdmin: false, 
              user: data.user,
              token: data.token 
            });
            return true;
          }
          return false;
        } catch (error) {
          console.error('Login error:', error);
          return false;
        }
      },

      register: async (username: string, email: string, password: string, address?: any): Promise<boolean> => {
        try {
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password, address }),
          });

          if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            set({ 
              isAuthenticated: true, 
              isAdmin: false, 
              user: data.user,
              token: data.token 
            });
            return true;
          }
          return false;
        } catch (error) {
          console.error('Registration error:', error);
          return false;
        }
      },

      logout: () => {
        localStorage.removeItem('token');
        set({ 
          isAuthenticated: false, 
          isAdmin: false, 
          user: null,
          token: null 
        });
      },

      checkAuth: async () => {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const response = await fetch('/api/auth/profile', {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });

            if (response.ok) {
              const data = await response.json();
              set({ 
                isAuthenticated: true, 
                isAdmin: false, 
                user: data.user,
                token: token 
              });
            } else {
              localStorage.removeItem('token');
              set({ 
                isAuthenticated: false, 
                isAdmin: false, 
                user: null,
                token: null 
              });
            }
          } catch (error) {
            console.error('Auth check error:', error);
            localStorage.removeItem('token');
            set({ 
              isAuthenticated: false, 
              isAdmin: false, 
              user: null,
              token: null 
            });
          }
        }
      },

      updateUser: (userData: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null
        }));
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);