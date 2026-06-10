import { notFound } from 'next/navigation'
import { getCollectionByHandle } from '@/lib/shopify'
import { ProductGrid } from '@/components/product/ProductGrid'
import { CollectionHeader } from '@/components/collection/CollectionHeader'
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
      <CollectionHeader
        title={collection.title}
        handle={handle}
        fallbackDesc={collection.description}
      />

      <ProductGrid products={collection.products.nodes} columns={4} />

      {collection.products.pageInfo?.hasNextPage && (
        <div className="mt-12 flex justify-center">
          <a
            href={`/collections/${handle}?after=${collection.products.pageInfo.endCursor}`}
            className="px-6 py-2.5 border border-border text-sm text-muted-foreground hover:text-cyan hover:border-cyan rounded-xl transition-colors"
          >
            Load more
          </a>
        </div>
      )}
    </div>
  )
}
