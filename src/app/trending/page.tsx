import { getProducts } from '@/lib/shopify'
import { ProductGrid } from '@/components/product/ProductGrid'
import { TrendingPageHeader } from '@/components/product/TrendingPageHeader'

export const metadata = { title: 'Trending — VoidPad' }

export default async function TrendingPage() {
  const { products } = await getProducts({
    first: 24,
    sortKey: 'BEST_SELLING',
    reverse: false,
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <TrendingPageHeader />
      <ProductGrid products={products} columns={4} />
    </div>
  )
}
