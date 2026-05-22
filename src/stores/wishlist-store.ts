import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface WishlistItem {
  id: string
  productId: string
  name: string
  price: number
  image?: string
  category?: string
  addedAt: Date
}

interface WishlistStore {
  items: WishlistItem[]
  addItem: (item: Omit<WishlistItem, "addedAt">) => void
  removeItem: (id: string) => void
  clearWishlist: () => void
  isInWishlist: (productId: string) => boolean
  getItemCount: () => number
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        const existingItem = get().items.find((i) => i.productId === item.productId)
        if (!existingItem) {
          set({
            items: [...get().items, { ...item, addedAt: new Date() }],
          })
        }
      },
      
      removeItem: (id) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        })
      },
      
      clearWishlist: () => {
        set({ items: [] })
      },
      
      isInWishlist: (productId) => {
        return get().items.some((item) => item.productId === productId)
      },
      
      getItemCount: () => {
        return get().items.length
      },
    }),
    {
      name: "wishlist-storage",
    }
  )
)
