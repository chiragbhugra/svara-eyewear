import { create } from 'zustand';
import axios from 'axios';

const useUrbanEleganceStore = create((set) => ({
  accessories: [],
  loading: false,
  error: null,

  fetchAccessories: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(import.meta.env.VITE_URBANELEGANCE_API_URL);
      set({ accessories: response.data.data.products });
    } catch (error) {
      console.error('Fetch urban elegance error:', error);
      set({ error: 'Failed to fetch urban elegance' });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useUrbanEleganceStore;
