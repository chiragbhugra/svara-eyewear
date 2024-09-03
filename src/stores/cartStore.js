import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  cart: [],
  addToCart: (product) => set((state) => {
    console.log("Product being added to cart:", product);
    return { cart: [...state.cart, { ...product, quantity: 1 }] };
  }),
  removeFromCart: (productId, index) => set((state) => ({
    cart: state.cart.filter((item, i) => i !== index || item.id !== productId),
  })),
  updateQuantity: (productId, index, quantity) => set((state) => ({
    cart: state.cart.map((item, i) => 
      i === index && item.id === productId ? { ...item, quantity } : item
    )
  })),
  clearCart: () => set({ cart: [] }),
  getCartTotal: () => {
    const { cart } = get();
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  },
  getCartItemsCount: () => {
    const { cart } = get();
    return cart.reduce((total, item) => total + item.quantity, 0);
  },
}));

export default useCartStore;
