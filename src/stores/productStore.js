import { createStore } from 'zustand';
import axios from 'axios';

const useProductStore = createStore((set) => ({
  products: [],
  loading: false,
  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(import.meta.env.VITE_EYEGLASSES_API_URL);
      set({ products: response.data.data.products });
    } catch (error) {
      console.error('Fetch products error:', error);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useProductStore;