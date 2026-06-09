import { getProducts } from '@/lib/shopify'
import { ProductGrid } from '@/components/product/ProductGrid'

type SearchParams = Promise<{ sort?: string; q?: string; after?: string }>

const sortOptions = [
  { label: 'Featured', value: 'featured', key: 'RELEVANCE', reverse: false },
  { label: 'Best Selling', value: 'best-selling', key: 'BEST_SELLING', reverse: false },
  { label: 'Price: Low → High', value: 'price-asc', key: 'PRICE', reverse: false },
  { label: 'Price: High → Low', value: 'price-desc', key: 'PRICE', reverse: true },
  { label: 'Newest', value: 'newest', key: 'CREATED_AT', reverse: true },
]

export const metadata = { title: 'All Products' }

export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const activeSort = sortOptions.find((s) => s.value === params.sort) ?? sortOptions[0]

  const { products, pageInfo } = await getProducts({
    first: 24,
    after: params.after,
    sortKey: activeSort.key,
    reverse: activeSort.reverse,
    query: params.q,
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#f0f0f5]">All Products</h1>
          <p className="text-sm text-[#8888a0] mt-0.5">Premium desk pads & mouse pads</p>
        </div>

        {/* Sort */}
        <form method="GET" className="flex items-center gap-2">
          {params.q && <input type="hidden" name="q" value={params.q} />}
          <label htmlFor="sort" className="text-xs text-[#8888a0]">Sort by</label>
          <select
            id="sort"
            name="sort"
            defaultValue={activeSort.value}
            onChange={(e) => (e.currentTarget.form as HTMLFormElement).submit()}
            className="bg-[#111118] border border-[#1e1e2e] text-sm text-[#f0f0f5] rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#00e5ff]"
          >
            {sortOptions.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </form>
      </div>

      <ProductGrid products={products} columns={4} />

      {/* Pagination */}
      {pageInfo.hasNextPage && (
        <div className="mt-12 flex justify-center">
          <a
            href={`/products?sort=${activeSort.value}&after=${pageInfo.endCursor}${params.q ? `&q=${params.q}` : ''}`}
            className="px-6 py-2.5 border border-[#1e1e2e] text-sm text-[#8888a0] hover:text-[#00e5ff] hover:border-[#00e5ff] rounded-xl transition-colors"
          >
            Load more
          </a>
        </div>
      )}
    </div>
  )
}
