'use client'
import { useState } from 'react'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import { SizeSelector } from './SizeSelector'
import { AddToCartButton } from './AddToCartButton'
import type { ShopifyProduct, ShopifyProductVariant } from '@/types/shopify'

export function ProductDetails({ product }: { product: ShopifyProduct }) {
  const [activeImage, setActiveImage] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    () => Object.fromEntries(product.options.map((o) => [o.name, o.values[0]]))
  )

  const images = product.images.nodes.length
    ? product.images.nodes
    : product.featuredImage
    ? [product.featuredImage]
    : []

  const selectedVariant: ShopifyProductVariant | undefined = product.variants.nodes.find((v) =>
    v.selectedOptions.every((o) => selectedOptions[o.name] === o.value)
  )

  const price = selectedVariant?.price ?? product.priceRange.minVariantPrice
  const compareAt = selectedVariant?.compareAtPrice
  const hasDiscount = compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount)
  const available = selectedVariant?.availableForSale ?? false

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
      {/* Images */}
      <div className="space-y-3">
        <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-[#111118] border border-[#1e1e2e]">
          {images[activeImage] && (
            <Image
              src={images[activeImage].url}
              alt={images[activeImage].altText ?? product.title}
              width={900}
              height={675}
              className="object-cover w-full h-full"
              priority
            />
          )}
        </div>
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                  i === activeImage ? 'border-[#00e5ff]' : 'border-[#1e1e2e] hover:border-[#8888a0]'
                }`}
              >
                <Image src={img.url} alt="" width={64} height={64} className="object-cover w-full h-full" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#f0f0f5]">{product.title}</h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-2xl font-bold text-[#f0f0f5]">
              {formatPrice(price.amount, price.currencyCode)}
            </span>
            {hasDiscount && (
              <span className="text-base text-[#8888a0] line-through">
                {formatPrice(compareAt.amount, compareAt.currencyCode)}
              </span>
            )}
          </div>
        </div>

        {product.options.length > 0 && (
          <SizeSelector
            options={product.options}
            variants={product.variants.nodes}
            selected={selectedOptions}
            onChange={(name, value) => setSelectedOptions((prev) => ({ ...prev, [name]: value }))}
          />
        )}

        {selectedVariant && (
          <AddToCartButton variantId={selectedVariant.id} available={available} />
        )}

        {product.description && (
          <div className="border-t border-[#1e1e2e] pt-6">
            <p className="text-sm text-[#8888a0] leading-relaxed">{product.description}</p>
          </div>
        )}

        {product.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span key={tag} className="text-xs bg-[#111118] border border-[#1e1e2e] text-[#8888a0] px-2.5 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
