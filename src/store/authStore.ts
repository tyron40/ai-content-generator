import { create } from 'zustand';
import { supabase, User } from '../lib/supabase';

interface AuthState {
  user: User | null;
  session: any | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  getUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  loading: true,
  error: null,

  getUser: async () => {
    try {
      set({ loading: true, error: null });
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const { data: user } = await supabase.auth.getUser();
        set({ 
          user: user.user as unknown as User, 
          session, 
          loading: false 
        });
      } else {
        set({ user: null, session: null, loading: false });
      }
    } catch (error) {
      console.error('Error getting user:', error);
      set({ error: 'Failed to get user', loading: false });
    }
  },

  signIn: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      set({ 
        user: data.user as unknown as User, 
        session: data.session, 
        loading: false 
      });
    } catch (error: any) {
      console.error('Error signing in:', error);
      set({ error: error.message || 'Failed to sign in', loading: false });
    }
  },

  signUp: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      
      set({ 
        user: data.user as unknown as User, 
        session: data.session, 
        loading: false 
      });
    } catch (error: any) {
      console.error('Error signing up:', error);
      set({ error: error.message || 'Failed to sign up', loading: false });
    }
  },

  signOut: async () => {
    try {
      set({ loading: true, error: null });
      await supabase.auth.signOut();
      set({ user: null, session: null, loading: false });
    } catch (error: any) {
      console.error('Error signing out:', error);
      set({ error: error.message || 'Failed to sign out', loading: false });
    }
  },
}));