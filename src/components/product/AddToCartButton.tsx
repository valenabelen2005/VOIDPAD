'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { useCartStore } from '@/store/cart'
import { createCartAction, addToCartAction } from '@/lib/shopify/cart-actions'
import { useT } from '@/hooks/useT'
import { ShoppingBag, Check } from 'lucide-react'

type Props = { variantId: string; available: boolean }

export function AddToCartButton({ variantId, available }: Props) {
  const { cartId, setCart, openCart } = useCartStore()
  const [loading, setLoading] = useState(false)
  const [added, setAdded] = useState(false)
  const t = useT()

  async function handleAddToCart() {
    if (!available || loading) return
    setLoading(true)
    try {
      const lines = [{ merchandiseId: variantId, quantity: 1 }]
      const cart = cartId ? await addToCartAction(cartId, lines) : await createCartAction(lines)
      setCart(cart)
      setAdded(true)
      openCart()
      setTimeout(() => setAdded(false), 2000)
    } finally {
      setLoading(false)
    }
  }

  if (!available) {
    return <Button fullWidth size="lg" disabled variant="outline">{t('cart.soldOut')}</Button>
  }

  return (
    <Button fullWidth size="lg" onClick={handleAddToCart} disabled={loading}>
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-[#0a0a0f]/30 border-t-[#0a0a0f] rounded-full animate-spin" />
          {t('cart.adding')}
        </span>
      ) : added ? (
        <span className="flex items-center gap-2">
          <Check size={16} />
          {t('cart.added')}
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <ShoppingBag size={16} />
          {t('cart.addToCart')}
        </span>
      )}
    </Button>
  )
}
