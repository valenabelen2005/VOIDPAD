'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useT } from '@/hooks/useT'

export function Footer() {
  const t = useT()

  const links = {
    [t('footer.shop')]: [
      { href: '/products', label: t('footer.allProducts') },
      { href: '/trending', label: t('footer.trending') },
      { href: '/fans', label: t('nav.fanMade') },
      { href: '/about', label: t('footer.about') },
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
              <Image src="/logo.png" alt="VoidPad" width={32} height={32} className="object-contain" />
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
