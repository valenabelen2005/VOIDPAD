'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ShopifyCart } from '@/types/shopify'

type CartStore = {
  cartId: string | null
  cart: ShopifyCart | null
  isOpen: boolean
  setCart: (cart: ShopifyCart) => void
  setCartId: (id: string) => void
  openCart: () => void
  closeCart: () => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cartId: null,
      cart: null,
      isOpen: false,
      setCart: (cart) => set({ cart, cartId: cart.id }),
      setCartId: (cartId) => set({ cartId }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      clearCart: () => set({ cartId: null, cart: null }),
    }),
    {
      name: 'voidpad-cart',
      partialize: (state) => ({ cartId: state.cartId }),
    }
  )
)
