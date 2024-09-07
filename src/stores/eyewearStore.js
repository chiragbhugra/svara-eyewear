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
      if (response.data && response.data.data && response.data.data.products) {
        set((state) => ({
          eyewear: [...state.eyewear, ...response.data.data.products],
          currentPage: state.currentPage + 1,
        }));
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (error) {
      console.error('Fetch eyewear error:', error);
      set({ error: error.message || 'Failed to fetch eyewear' });
    } finally {
      set({ loading: false });
    }
  },

  getProductById: (productId) => {
    const [name, index] = productId.split('-');
    return get().eyewear[parseInt(index, 10)];
  },

  nextPage: () => set((state) => ({ currentPage: state.currentPage + 1 })),
}));

export default useEyewearStore;