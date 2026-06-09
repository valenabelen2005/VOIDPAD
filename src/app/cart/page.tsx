import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ShoppingBag } from 'lucide-react'

// No-JS fallback — real cart interaction happens in CartDrawer
export const metadata = { title: 'Cart' }

export default function CartPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
      <ShoppingBag size={48} className="text-[#1e1e2e] mx-auto mb-4" />
      <h1 className="text-xl font-bold text-[#f0f0f5] mb-2">Your Cart</h1>
      <p className="text-sm text-[#8888a0] mb-6">
        Use the cart icon in the navigation to manage your cart.
      </p>
      <Link href="/products">
        <Button>Continue Shopping</Button>
      </Link>
    </div>
  )
}
