'use client'
import Link from 'next/link'
import { useT } from '@/hooks/useT'

export function Footer() {
  const t = useT()

  const links = {
    [t('footer.shop')]: [
      { href: '/products', label: t('footer.allProducts') },
      { href: '/trending', label: t('footer.trending') },
      { href: '/about', label: t('footer.about') },
      { href: '/collections/void-classics', label: 'Void Classics' },
      { href: '/collections/void-series', label: 'Void Series' },
      { href: '/collections/void-art', label: 'Void Art' },
    ],
    [t('footer.support')]: [
      { href: '/pages/faq', label: t('footer.faq') },
      { href: '/pages/shipping', label: t('footer.shipping') },
      { href: '/pages/contact', label: t('footer.contact') },
    ],
    [t('footer.legal')]: [
      { href: '/pages/privacy', label: t('footer.privacy') },
      { href: '/pages/terms', label: t('footer.terms') },
    ],
  }

  return (
    <footer className="border-t border-border bg-background mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="footerSatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00e5ff" />
                    <stop offset="100%" stopColor="#7c3aed" />
                  </linearGradient>
                </defs>
                <ellipse cx="16" cy="16" rx="13" ry="4.5" stroke="url(#footerSatGrad)" strokeWidth="1.5" strokeDasharray="20 21" strokeDashoffset="0" fill="none" opacity="0.5" />
                <circle cx="16" cy="16" r="7" fill="url(#footerSatGrad)" />
                <ellipse cx="16" cy="16" rx="13" ry="4.5" stroke="url(#footerSatGrad)" strokeWidth="1.5" strokeDasharray="20 21" strokeDashoffset="21" fill="none" />
              </svg>
              <span className="font-bold text-[#f0f0f5]">VoidPad</span>
            </div>
            <p className="text-sm text-[#8888a0] leading-relaxed">{t('footer.desc')}</p>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h3 className="text-xs font-semibold text-[#f0f0f5] uppercase tracking-widest mb-3">{section}</h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-[#8888a0] hover:text-[#f0f0f5] transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-[#1e1e2e] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#8888a0]">© {new Date().getFullYear()} VoidPad. {t('footer.rights')}</p>
          <p className="text-xs text-[#8888a0]">{t('footer.powered')}</p>
        </div>
      </div>
    </footer>
  )
}
