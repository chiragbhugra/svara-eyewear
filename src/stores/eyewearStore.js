import { create } from 'zustand';
import axios from 'axios';

const useEyewearStore = create((set, get) => ({
  eyewear: [],
  loading: false,
  error: null,
  currentPage: 0,
  pageSize: 18,

  fetchEyewear: async () => {
    set({ loading: true, error: null });
    const baseUrl = import.meta.env.VITE_EYEGLASSES_API_URL.split('?')[0];
    const params = new URLSearchParams({
      Id: '391054220', // Example ID, adjust as needed
      page: get().currentPage,
      size: get().pageSize,
      source: 'web',
    });

    try {
      const response = await axios.get(`${baseUrl}?${params.toString()}`);
      set((state) => ({
        eyewear: [...state.eyewear, ...response.data.data.products],
        currentPage: state.currentPage + 1, // Increment the current page
      }));
    } catch (error) {
      console.error('Fetch eyewear error:', error);
      set({ error: error.response ? error.response.data.message : 'Failed to fetch eyewear' });
    } finally {
      set({ loading: false });
    }
  },

  // Function to increment the current page
  nextPage: () => set((state) => ({ currentPage: state.currentPage + 1 })),
}));

export default useEyewearStore;