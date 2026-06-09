import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import type { ShopifyProduct } from '@/types/shopify'

type Props = {
  product: ShopifyProduct
}

export function ProductCard({ product }: Props) {
  const price = product.priceRange.minVariantPrice
  const compareAt = product.variants.nodes[0]?.compareAtPrice
  const hasDiscount = compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount)

  return (
    <Link href={`/products/${product.handle}`} className="group block">
      <div className="relative overflow-hidden rounded-xl bg-[#111118] border border-[#1e1e2e] group-hover:border-[#00e5ff]/40 transition-all duration-300">
        <div className="aspect-[4/3] overflow-hidden">
          {product.featuredImage ? (
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText ?? product.title}
              width={600}
              height={450}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1e1e2e] to-[#111118]" />
          )}
        </div>

        {hasDiscount && (
          <div className="absolute top-2 left-2">
            <span className="bg-[#7c3aed] text-white text-xs font-semibold px-2 py-0.5 rounded-md">SALE</span>
          </div>
        )}
      </div>

      <div className="mt-3 px-0.5">
        <p className="text-sm font-medium text-[#f0f0f5] group-hover:text-[#00e5ff] transition-colors truncate">
          {product.title}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-semibold text-[#f0f0f5]">
            {formatPrice(price.amount, price.currencyCode)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-[#8888a0] line-through">
              {formatPrice(compareAt.amount, compareAt.currencyCode)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
