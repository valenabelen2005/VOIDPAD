'use client'
import Link from 'next/link'
import { useCartStore } from '@/store/cart'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useState } from 'react'

const navLinks = [
  { href: '/products', label: 'Shop All' },
  { href: '/collections/desk-pads', label: 'Desk Pads' },
  { href: '/collections/mouse-pads', label: 'Mouse Pads' },
  { href: '/collections/trending', label: 'Trending' },
]

export function Navbar() {
  const { cart, openCart } = useCartStore()
  const quantity = cart?.totalQuantity ?? 0
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-[#1e1e2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center h-16 gap-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00e5ff] to-[#7c3aed] flex items-center justify-center">
            <span className="text-[#0a0a0f] font-bold text-sm font-mono">VP</span>
          </div>
          <span className="font-bold text-lg tracking-tight text-[#f0f0f5]">VoidPad</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 flex-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 text-sm text-[#8888a0] hover:text-[#f0f0f5] transition-colors rounded-lg hover:bg-white/5"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={openCart}
            className="relative p-2 text-[#8888a0] hover:text-[#00e5ff] transition-colors rounded-lg hover:bg-white/5"
            aria-label="Open cart"
          >
            <ShoppingBag size={20} />
            {quantity > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#00e5ff] text-[#0a0a0f] text-[10px] font-bold rounded-full flex items-center justify-center">
                {quantity > 9 ? '9+' : quantity}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-[#8888a0] hover:text-[#f0f0f5] rounded-lg hover:bg-white/5"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-[#1e1e2e] px-4 py-3 flex flex-col gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-2.5 text-sm text-[#8888a0] hover:text-[#f0f0f5] rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
