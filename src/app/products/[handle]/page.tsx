import { notFound } from 'next/navigation'
import { getProductByHandle } from '@/lib/shopify'
import { ProductDetails } from '@/components/product/ProductDetails'
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
  const product = await getProductByHandle(handle)
  if (!product) notFound()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <ProductDetails product={product} />
    </div>
  )
}
