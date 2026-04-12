import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useAuthStore } from './useAuthStore';

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  product?: {
    name: string;
    image: string;
  };
}

interface CartState {
  items: CartItem[];
  addItem: (productId: string, quantity: number, price: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotal: () => number;
  getItemCount: () => number;
  syncCart: () => Promise<void>;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: async (productId: string, quantity: number, price: number) => {
        const token = useAuthStore.getState().token;
        
        if (token) {
          // User is logged in - sync with backend
          try {
            const response = await fetch('/api/auth/cart/add', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify({ productId, quantity }),
            });

            if (response.ok) {
              const data = await response.json();
              set({ items: data.cart });
            }
          } catch (error) {
            console.error('Error adding item to cart:', error);
          }
        } else {
          // Guest user - local storage only
          const currentItems = get().items;
          const existingItemIndex = currentItems.findIndex(item => item.productId === productId);

          if (existingItemIndex > -1) {
            currentItems[existingItemIndex].quantity += quantity;
          } else {
            currentItems.push({ productId, quantity, price });
          }

          set({ items: currentItems });
        }
      },

      removeItem: async (productId: string) => {
        const token = useAuthStore.getState().token;
        
        if (token) {
          // User is logged in - sync with backend
          try {
            const response = await fetch(`/api/auth/cart/${productId}`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });

            if (response.ok) {
              const data = await response.json();
              set({ items: data.cart });
            }
          } catch (error) {
            console.error('Error removing item from cart:', error);
          }
        } else {
          // Guest user - local storage only
          const currentItems = get().items.filter(item => item.productId !== productId);
          set({ items: currentItems });
        }
      },

      updateQuantity: async (productId: string, quantity: number) => {
        const token = useAuthStore.getState().token;
        
        if (token) {
          // User is logged in - sync with backend
          try {
            const response = await fetch(`/api/auth/cart/${productId}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify({ quantity }),
            });

            if (response.ok) {
              const data = await response.json();
              set({ items: data.cart });
            }
          } catch (error) {
            console.error('Error updating cart quantity:', error);
          }
        } else {
          // Guest user - local storage only
          const currentItems = get().items.map(item =>
            item.productId === productId ? { ...item, quantity } : item
          );
          set({ items: currentItems });
        }
      },

      clearCart: async () => {
        const token = useAuthStore.getState().token;
        
        if (token) {
          // User is logged in - sync with backend
          try {
            const response = await fetch('/api/auth/cart/clear', {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });

            if (response.ok) {
              set({ items: [] });
            }
          } catch (error) {
            console.error('Error clearing cart:', error);
          }
        } else {
          // Guest user - local storage only
          set({ items: [] });
        }
      },

      getTotal: () => {
        const items = get().items;
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },

      getItemCount: () => {
        const items = get().items;
        return items.reduce((count, item) => count + item.quantity, 0);
      },

      syncCart: async () => {
        const token = useAuthStore.getState().token;
        
        if (token) {
          // Sync guest cart with user account
          try {
            const response = await fetch('/api/auth/profile', {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });

            if (response.ok) {
              const data = await response.json();
              set({ items: data.user.cart });
            }
          } catch (error) {
            console.error('Error syncing cart:', error);
          }
        }
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);