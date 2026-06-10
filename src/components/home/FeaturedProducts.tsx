import Link from 'next/link'
import { ProductGrid } from '@/components/product/ProductGrid'
import { getProducts } from '@/lib/shopify'
import { ArrowRight } from 'lucide-react'

export async function FeaturedProducts() {
  const { products } = await getProducts({ first: 5, sortKey: 'BEST_SELLING' })

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs font-semibold text-cyan uppercase tracking-widest mb-1">Hot Picks</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-text">Best Sellers</h2>
        </div>
        <Link
          href="/products"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-cyan transition-colors"
        >
          View all <ArrowRight size={14} />
        </Link>
      </div>

      <ProductGrid products={products} columns={4} />
    </section>
  )
}
