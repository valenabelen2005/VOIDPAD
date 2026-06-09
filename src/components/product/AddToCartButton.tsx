'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { useCartStore } from '@/store/cart'
import { createCart, addToCart } from '@/lib/shopify'
import { ShoppingBag, Check } from 'lucide-react'

type Props = {
  variantId: string
  available: boolean
}

export function AddToCartButton({ variantId, available }: Props) {
  const { cartId, setCart, openCart } = useCartStore()
  const [loading, setLoading] = useState(false)
  const [added, setAdded] = useState(false)

  async function handleAddToCart() {
    if (!available || loading) return
    setLoading(true)

    const lines = [{ merchandiseId: variantId, quantity: 1 }]
    const cart = cartId
      ? await addToCart(cartId, lines)
      : await createCart(lines)

    setCart(cart)
    setLoading(false)
    setAdded(true)
    openCart()
    setTimeout(() => setAdded(false), 2000)
  }

  if (!available) {
    return <Button fullWidth size="lg" disabled variant="outline">Sold Out</Button>
  }

  return (
    <Button fullWidth size="lg" onClick={handleAddToCart} disabled={loading}>
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-[#0a0a0f]/30 border-t-[#0a0a0f] rounded-full animate-spin" />
          Adding...
        </span>
      ) : added ? (
        <span className="flex items-center gap-2">
          <Check size={16} />
          Added!
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <ShoppingBag size={16} />
          Add to Cart
        </span>
      )}
    </Button>
  )
}
