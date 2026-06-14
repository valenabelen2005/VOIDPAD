'use client'
import Link from 'next/link'
import { useCartStore } from '@/store/cart'
import { useLanguageStore } from '@/store/language'
import { useT } from '@/hooks/useT'
import { ShoppingBag, Menu, X, ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

type Collection = { handle: string; title: string }

export function Navbar({ collections = [] }: { collections?: Collection[] }) {
  const { cart, openCart } = useCartStore()
  const { locale, setLocale } = useLanguageStore()
  const quantity = cart?.totalQuantity ?? 0
  const [mobileOpen, setMobileOpen] = useState(false)
  const [padsOpen, setPadsOpen] = useState(false)
  const [mobilePadsOpen, setMobilePadsOpen] = useState(false)
  const padsRef = useRef<HTMLDivElement>(null)
  const t = useT()

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (padsRef.current && !padsRef.current.contains(e.target as Node)) {
        setPadsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const browseLinks = [
    { href: '/products?sort=CREATED_AT', label: t('nav.new') },
    { href: '/products?sort=BEST_SELLING', label: t('nav.bestSelling') },
  ]

  const staticLinks = [
    { href: '/collections/community-collection', label: t('nav.fanMade') },
    { href: '/about', label: t('nav.about') },
  ]

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center h-16 gap-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="satGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00e5ff" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
            <ellipse cx="16" cy="16" rx="13" ry="4.5" stroke="url(#satGrad)" strokeWidth="1.5" strokeDasharray="20 21" strokeDashoffset="0" fill="none" opacity="0.5" />
            <circle cx="16" cy="16" r="7" fill="url(#satGrad)" />
            <ellipse cx="16" cy="16" rx="13" ry="4.5" stroke="url(#satGrad)" strokeWidth="1.5" strokeDasharray="20 21" strokeDashoffset="21" fill="none" />
          </svg>
          <span className="font-bold text-lg tracking-tight text-text">VoidPad</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 flex-1">

          {/* Pads dropdown */}
          <div ref={padsRef} className="relative">
            <button
              onClick={() => setPadsOpen((v) => !v)}
              onMouseEnter={() => setPadsOpen(true)}
              className="flex items-center gap-1 px-3 py-1.5 text-sm text-muted hover:text-text transition-colors rounded-lg hover:bg-white/5"
            >
              {t('nav.shopAll')}
              <ChevronDown size={13} className={`transition-transform duration-200 ${padsOpen ? 'rotate-180' : ''}`} />
            </button>

            {padsOpen && (
              <div
                onMouseLeave={() => setPadsOpen(false)}
                className="absolute top-full left-0 mt-2 w-105 bg-surface border border-border rounded-2xl shadow-2xl p-5 flex gap-8"
              >
                {/* Browse */}
                <div className="min-w-30">
                  <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-3">{t('nav.browse')}</p>
                  <div className="flex flex-col gap-1.5">
                    {browseLinks.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        onClick={() => setPadsOpen(false)}
                        className="text-sm text-text/70 hover:text-cyan transition-colors"
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="w-px bg-border shrink-0" />

                {/* Collections */}
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-3">{t('nav.collections')}</p>
                  <div className="flex flex-col gap-1.5">
                    {collections.map((c) => (
                      <Link
                        key={c.handle}
                        href={`/collections/${c.handle}`}
                        onClick={() => setPadsOpen(false)}
                        className="text-sm text-text/70 hover:text-cyan transition-colors"
                      >
                        {c.title}
                      </Link>
                    ))}
                    <Link
                      href="/products"
                      onClick={() => setPadsOpen(false)}
                      className="text-sm text-violet hover:text-violet/80 transition-colors mt-1"
                    >
                      {locale === 'es' ? 'Ver todo →' : 'View all →'}
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {staticLinks.map((l) => (
            <Link key={l.href} href={l.href} className="px-3 py-1.5 text-sm text-muted hover:text-text transition-colors rounded-lg hover:bg-white/5">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Language toggle */}
          <button
            onClick={() => setLocale(locale === 'en' ? 'es' : 'en')}
            className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Toggle language"
            title={locale === 'en' ? 'Cambiar a español' : 'Switch to English'}
          >
            {locale === 'en' ? (
              <svg width="22" height="16" viewBox="0 0 22 16" xmlns="http://www.w3.org/2000/svg" className="rounded-sm overflow-hidden">
                <rect width="22" height="16" fill="#012169"/>
                <path d="M0 0L22 16M22 0L0 16" stroke="white" strokeWidth="3.2"/>
                <path d="M0 0L22 16M22 0L0 16" stroke="#C8102E" strokeWidth="2"/>
                <path d="M11 0V16M0 8H22" stroke="white" strokeWidth="5.3"/>
                <path d="M11 0V16M0 8H22" stroke="#C8102E" strokeWidth="3.2"/>
              </svg>
            ) : (
              <svg width="22" height="16" viewBox="0 0 22 16" xmlns="http://www.w3.org/2000/svg" className="rounded-sm overflow-hidden">
                <rect width="22" height="16" fill="#c60b1e"/>
                <rect y="4" width="22" height="8" fill="#ffc400"/>
              </svg>
            )}
          </button>

          {/* Cart */}
          <button
            onClick={openCart}
            className="relative p-2 text-muted hover:text-cyan transition-colors rounded-lg hover:bg-white/5"
            aria-label="Open cart"
          >
            <ShoppingBag size={20} />
            {quantity > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-cyan text-background text-[10px] font-bold rounded-full flex items-center justify-center">
                {quantity > 9 ? '9+' : quantity}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-muted hover:text-text rounded-lg hover:bg-white/5"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-border px-4 py-3 flex flex-col gap-1">
          {/* Pads accordion */}
          <button
            onClick={() => setMobilePadsOpen((v) => !v)}
            className="flex items-center justify-between px-3 py-2.5 text-sm text-muted hover:text-text rounded-lg hover:bg-white/5 transition-colors w-full text-left"
          >
            {t('nav.shopAll')}
            <ChevronDown size={13} className={`transition-transform duration-200 ${mobilePadsOpen ? 'rotate-180' : ''}`} />
          </button>
          {mobilePadsOpen && (
            <div className="pl-4 flex flex-col gap-1 pb-1">
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest px-3 py-1">{t('nav.browse')}</p>
              {browseLinks.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="px-3 py-2 text-sm text-text/70 hover:text-cyan rounded-lg hover:bg-white/5 transition-colors">
                  {l.label}
                </Link>
              ))}
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest px-3 pt-2 pb-1">{t('nav.collections')}</p>
              {collections.map((c) => (
                <Link key={c.handle} href={`/collections/${c.handle}`} onClick={() => setMobileOpen(false)} className="px-3 py-2 text-sm text-text/70 hover:text-cyan rounded-lg hover:bg-white/5 transition-colors">
                  {c.title}
                </Link>
              ))}
              <Link href="/products" onClick={() => setMobileOpen(false)} className="px-3 py-2 text-sm text-violet hover:text-violet/80 transition-colors">
                {locale === 'es' ? 'Ver todo →' : 'View all →'}
              </Link>
            </div>
          )}

          {staticLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-2.5 text-sm text-muted hover:text-text rounded-lg hover:bg-white/5 transition-colors"
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
