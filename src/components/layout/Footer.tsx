import Link from 'next/link'

const links = {
  Shop: [
    { href: '/products', label: 'All Products' },
    { href: '/collections/desk-pads', label: 'Desk Pads' },
    { href: '/collections/mouse-pads', label: 'Mouse Pads' },
    { href: '/collections/trending', label: 'Trending' },
  ],
  Support: [
    { href: '/pages/faq', label: 'FAQ' },
    { href: '/pages/shipping', label: 'Shipping & Returns' },
    { href: '/pages/contact', label: 'Contact Us' },
  ],
  Legal: [
    { href: '/pages/privacy', label: 'Privacy Policy' },
    { href: '/pages/terms', label: 'Terms of Service' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-[#1e1e2e] bg-[#0a0a0f] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00e5ff] to-[#7c3aed]" />
              <span className="font-bold text-[#f0f0f5]">VoidPad</span>
            </div>
            <p className="text-sm text-[#8888a0] leading-relaxed">
              Premium custom desk pads & mouse pads. Made for your setup.
            </p>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h3 className="text-xs font-semibold text-[#f0f0f5] uppercase tracking-widest mb-3">{section}</h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-[#8888a0] hover:text-[#00e5ff] transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-[#1e1e2e] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#8888a0]">© {new Date().getFullYear()} VoidPad. All rights reserved.</p>
          <p className="text-xs text-[#8888a0]">Powered by Shopify & Printify</p>
        </div>
      </div>
    </footer>
  )
}
