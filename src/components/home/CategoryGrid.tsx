import Link from 'next/link'
import Image from 'next/image'
import { getCollections } from '@/lib/shopify'

export async function CategoryGrid() {
  const collections = await getCollections(8)

  if (!collections.length) return null

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 border-t border-[#1e1e2e]">
      <div className="mb-8">
        <p className="text-xs font-semibold text-[#7c3aed] uppercase tracking-widest mb-1">Browse</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#f0f0f5]">Shop by Category</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {collections.map((col) => {
          const img = col.image ?? col.products?.nodes?.[0]?.featuredImage
          return (
            <Link
              key={col.handle}
              href={`/collections/${col.handle}`}
              className="group relative aspect-square overflow-hidden rounded-xl bg-[#111118] border border-[#1e1e2e] hover:border-[#7c3aed]/50 transition-all duration-300"
            >
              {img && (
                <Image
                  src={img.url}
                  alt={img.altText ?? col.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-sm font-bold text-white">{col.title}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
