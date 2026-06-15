'use client'
import { useEffect, useRef, useState } from 'react'
import { X, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { CartItem } from './CartItem'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'
import { updateCartLineAction, removeCartLinesAction, getCartAction } from '@/lib/shopify/cart-actions'
import { useT } from '@/hooks/useT'

export function CartDrawer() {
  const { cart, cartId, isOpen, closeCart, setCart, clearCart } = useCartStore()
  const [loadingLine, setLoadingLine] = useState<string | null>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const t = useT()

  useEffect(() => {
    if (cartId && !cart) {
      getCartAction(cartId).then((c) => {
        if (c) setCart(c)
        else clearCart()
      })
    }
  }, [cartId])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  async function handleUpdate(lineId: string, quantity: number) {
    if (!cart) return
    if (quantity <= 0) return handleRemove(lineId)
    setLoadingLine(lineId)
    const updated = await updateCartLineAction(cart.id, lineId, quantity)
    setCart(updated)
    setLoadingLine(null)
  }

  async function handleRemove(lineId: string) {
    if (!cart) return
    setLoadingLine(lineId)
    const updated = await removeCartLinesAction(cart.id, [lineId])
    setCart(updated)
    setLoadingLine(null)
  }

  const lines = cart?.lines.nodes ?? []
  const subtotal = cart?.cost.subtotalAmount

  return (
    <>
      <div
        ref={overlayRef}
        onClick={closeCart}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      />
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-[#111118] border-l border-[#1e1e2e] z-50 flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e1e2e]">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-[#00e5ff]" />
            <h2 className="font-semibold text-[#f0f0f5]">{t('drawer.title')}</h2>
            {cart && cart.totalQuantity > 0 && (
              <span className="text-xs bg-[#00e5ff]/15 text-[#00e5ff] px-2 py-0.5 rounded-full">
                {cart.totalQuantity}
              </span>
            )}
          </div>
          <button onClick={closeCart} className="p-1.5 text-[#8888a0] hover:text-[#f0f0f5] rounded-lg hover:bg-white/5 transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5">
          {lines.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
              <ShoppingBag size={40} className="text-[#1e1e2e]" />
              <p className="text-[#8888a0] text-sm">{t('drawer.empty')}</p>
              <Button variant="outline" size="sm" onClick={closeCart}>{t('drawer.continue')}</Button>
            </div>
          ) : (
            lines.map((line) => (
              <CartItem key={line.id} line={line} onUpdate={handleUpdate} onRemove={handleRemove} loading={loadingLine === line.id} />
            ))
          )}
        </div>

        {lines.length > 0 && subtotal && (
          <div className="px-5 py-5 border-t border-[#1e1e2e] space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-[#8888a0]">{t('drawer.subtotal')}</span>
              <span className="font-semibold text-[#f0f0f5]">{formatPrice(subtotal.amount, subtotal.currencyCode)}</span>
            </div>
            <p className="text-xs text-[#8888a0]">{t('drawer.taxNote')}</p>
            <a href={cart?.checkoutUrl} className="block">
              <Button fullWidth size="lg">{t('drawer.checkout')}</Button>
            </a>
          </div>
        )}
      </div>
    </>
  )
}
