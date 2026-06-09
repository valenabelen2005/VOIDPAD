import { notFound } from 'next/navigation'
import { getCollectionByHandle } from '@/lib/shopify'
import { ProductGrid } from '@/components/product/ProductGrid'
import type { Metadata } from 'next'

type Props = { params: Promise<{ handle: string }>; searchParams: Promise<{ after?: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params
  const collection = await getCollectionByHandle(handle)
  if (!collection) return {}
  return { title: collection.title, description: collection.description }
}

export default async function CollectionPage({ params, searchParams }: Props) {
  const { handle } = await params
  const { after } = await searchParams
  const collection = await getCollectionByHandle(handle, 24, after)
  if (!collection) notFound()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#f0f0f5]">{collection.title}</h1>
        {collection.description && (
          <p className="text-sm text-[#8888a0] mt-1">{collection.description}</p>
        )}
      </div>

      <ProductGrid products={collection.products.nodes} columns={4} />

      {collection.products.pageInfo?.hasNextPage && (
        <div className="mt-12 flex justify-center">
          <a
            href={`/collections/${handle}?after=${collection.products.pageInfo.endCursor}`}
            className="px-6 py-2.5 border border-[#1e1e2e] text-sm text-[#8888a0] hover:text-[#00e5ff] hover:border-[#00e5ff] rounded-xl transition-colors"
          >
            Load more
          </a>
        </div>
      )}
    </div>
  )
}
