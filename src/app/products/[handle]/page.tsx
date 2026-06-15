import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { getProductByHandle } from '@/lib/shopify'
import { ProductDetails } from '@/components/product/ProductDetails'
import { ReviewForm } from '@/components/reviews/ReviewForm'
import { ReviewList } from '@/components/reviews/ReviewList'
import { getApprovedReviews } from '@/app/actions/reviews'
import type { Metadata } from 'next'

type Props = { params: Promise<{ handle: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params
  const product = await getProductByHandle(handle)
  if (!product) return {}
  return {
    title: product.title,
    description: product.description.slice(0, 160),
    openGraph: {
      images: product.featuredImage ? [{ url: product.featuredImage.url }] : [],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params
  const [product, reviews] = await Promise.all([
    getProductByHandle(handle),
    getApprovedReviews(handle),
  ])
  if (!product) notFound()

  const primaryCollection = product.collections.nodes[0] ?? null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted">
        <Link href="/products" className="hover:text-text transition-colors">Pads</Link>
        {primaryCollection && (
          <>
            <ChevronLeft size={14} className="text-muted/40 rotate-180" />
            <Link
              href={`/collections/${primaryCollection.handle}`}
              className="hover:text-text transition-colors"
            >
              {primaryCollection.title}
            </Link>
          </>
        )}
        <ChevronLeft size={14} className="text-muted/40 rotate-180" />
        <span className="text-text truncate max-w-[200px]">{product.title}</span>
      </nav>

      <ProductDetails product={product} />

      <div className="border-t border-border pt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ReviewList reviews={reviews} />
        <ReviewForm
          type="product"
          productHandle={handle}
          productName={product.title}
        />
      </div>
    </div>
  )
}
