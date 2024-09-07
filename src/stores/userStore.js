import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  login: (email, password) => {
    // Simulate login without database
    set({ user: { email, id: Date.now().toString() } });
  },
  logout: () => {
    set({ user: null });
  },
  signup: (email, password) => {
    // Simulate signup without database
    return { user: { email, id: Date.now().toString() } };
  },
}));

export default useUserStore;
