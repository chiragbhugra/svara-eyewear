import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  cart: [],
  discount: 0,

  addToCart: (item) => {
    set((state) => {
      const existingItem = state.cart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return {
          cart: state.cart.map(cartItem =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        };
      } else {
        return {
          cart: [...state.cart, { ...item, quantity: 1 }]
        };
      }
    });
  },

  fetchCart: () => {
    // This function is no longer needed, but we'll keep it empty for compatibility
  },

  getCartItemsCount: () => {
    return get().cart.reduce((total, item) => total + item.quantity, 0);
  },

  removeFromCart: (productId) => {
    set((state) => ({
      cart: state.cart.filter(item => item.id !== productId)
    }));
  },

  updateQuantity: (productId, newQuantity) => {
    set((state) => ({
      cart: state.cart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    }));
  },

  getCartSubtotal: () => {
    return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  applyDiscount: (discountPercentage) => {
    set({ discount: discountPercentage });
  }
}));

export default useCartStore;
