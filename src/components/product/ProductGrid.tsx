import { ProductCard } from './ProductCard'
import type { ShopifyProduct } from '@/types/shopify'

type Props = {
  products: ShopifyProduct[]
  columns?: 2 | 3 | 4
}

const colClasses = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
}

export function ProductGrid({ products, columns = 4 }: Props) {
  if (!products.length) {
    return (
      <div className="text-center py-20 text-[#8888a0]">
        <p>No products found.</p>
      </div>
    )
  }

  return (
    <div className={`grid ${colClasses[columns]} gap-4 sm:gap-6`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
