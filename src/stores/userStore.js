import { create } from 'zustand';
import { supabase } from '../supabaseClient';

const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    set({ user: data.user });
  },
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
  checkUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    set({ user });
  },
}));

export default useUserStore;
