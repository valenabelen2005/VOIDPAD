import Link from 'next/link'
import Image from 'next/image'
import { getCollections } from '@/lib/shopify'
import { CategoryGridTitle } from './CategoryGridTitle'

export async function CategoryGrid() {
  const collections = await getCollections(8)

  if (!collections.length) return null

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-2 pb-6">
      <div className="mb-8 text-center">
        {/* <p className="text-xs font-semibold text-[#7c3aed] uppercase tracking-widest mb-1">Browse</p> */}
        <CategoryGridTitle />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {collections.map((col) => {
          const img = col.image ?? col.products?.nodes?.[0]?.featuredImage
          return (
            <Link
              key={col.handle}
              href={`/collections/${col.handle}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#111118] shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {img && (
                <Image
                  src={img.url}
                  alt={img.altText ?? col.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}
              <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                <span className="bg-white text-black text-sm font-bold px-4 py-1.5 rounded-full shadow-md">
                  {col.title}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
