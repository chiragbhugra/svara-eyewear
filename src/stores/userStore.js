import create, { createStore } from 'zustand';
import { supabase } from '../supabaseClient';

const useUserStore = createStore((set) => ({
  user: null,
  loading: false,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  login: async (email, password) => {
    set({ loading: true });
    const { user, error } = await supabase.auth.signIn({ email, password });
    if (error) {
      console.error('Login error:', error);
    } else {
      set({ user });
    }
    set({ loading: false });
  },
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));

export default useUserStore;
