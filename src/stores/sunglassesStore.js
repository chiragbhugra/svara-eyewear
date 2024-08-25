import { create } from 'zustand';
import axios from 'axios';

const useSunglassesStore = create((set) => ({
  sunglasses: [],
  loading: false,
  error: null,

  fetchSunglasses: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(import.meta.env.VITE_SUNGLASSES_API_URL);
      set({ sunglasses: response.data.data.products });
    } catch (error) {
      console.error('Fetch sunglasses error:', error);
      set({ error: 'Failed to fetch sunglasses' });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useSunglassesStore;
