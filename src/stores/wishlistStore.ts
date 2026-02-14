import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ShopifyProduct } from '@/api/shopify';

interface WishlistStore {
  items: ShopifyProduct[];
  addItem: (product: ShopifyProduct) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: ShopifyProduct) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const { items } = get();
        if (!items.some((i) => i.node.id === product.node.id)) {
          set({ items: [...items, product] });
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.node.id !== productId) });
      },

      toggleItem: (product) => {
        const { items } = get();
        if (items.some((i) => i.node.id === product.node.id)) {
          set({ items: items.filter((i) => i.node.id !== product.node.id) });
        } else {
          set({ items: [...items, product] });
        }
      },

      isInWishlist: (productId) => {
        return get().items.some((i) => i.node.id === productId);
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'luvrang-wishlist',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
