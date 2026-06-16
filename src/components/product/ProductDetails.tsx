'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import { AddToCartButton } from './AddToCartButton'
import { cn } from '@/lib/utils'
import { ChevronDown, Shield, Truck, Zap, Users } from 'lucide-react'
import type { ShopifyProduct, ShopifyProductVariant } from '@/types/shopify'

function Stars({ count = 5 }: { count?: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < count ? 'text-[#00e5ff]' : 'text-[#1e1e2e]'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  )
}

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-[#1e1e2e]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 text-sm font-medium text-[#f0f0f5] hover:text-[#00e5ff] transition-colors"
      >
        {title}
        <ChevronDown size={16} className={`text-[#8888a0] transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="pb-4 text-sm text-[#8888a0] leading-relaxed">{children}</div>}
    </div>
  )
}

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

  useEffect(() => {
    if (!selectedVariant?.image) return
    const idx = images.findIndex((img) => img.url === selectedVariant.image!.url)
    if (idx !== -1) setActiveImage(idx)
  }, [selectedVariant?.id])

  const price = selectedVariant?.price ?? product.priceRange.minVariantPrice
  const compareAt = selectedVariant?.compareAtPrice
  const hasDiscount = compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount)
  const available = selectedVariant?.availableForSale ?? false
  const hasMultiplePrices =
    product.priceRange.minVariantPrice.amount !== product.priceRange.maxVariantPrice.amount

  function isAvailable(optionName: string, value: string): boolean {
    const testOptions = { ...selectedOptions, [optionName]: value }
    return product.variants.nodes.some(
      (v) => v.availableForSale && v.selectedOptions.every((o) => testOptions[o.name] === o.value)
    )
  }

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
      <div className="space-y-5">
        {/* Title + rating */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#f0f0f5] uppercase tracking-tight">
            {product.title}
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <Stars />
            <span className="text-sm text-[#8888a0]">4.9 <span className="text-[#1e1e2e]">|</span> <span className="underline cursor-pointer hover:text-[#00e5ff] transition-colors">124 reviews</span></span>
          </div>
        </div>

        {/* Price */}
        <div>
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold text-[#f0f0f5]">
              {formatPrice(price.amount, price.currencyCode)}
            </span>
            {hasDiscount && (
              <span className="text-base text-[#8888a0] line-through">
                {formatPrice(compareAt.amount, compareAt.currencyCode)}
              </span>
            )}
            {hasDiscount && (
              <span className="text-xs font-semibold bg-[#00e5ff]/15 text-[#00e5ff] px-2 py-0.5 rounded-full">
                SALE
              </span>
            )}
          </div>
          {hasMultiplePrices && (
            <p className="text-xs text-[#8888a0] mt-0.5">Price varies by size</p>
          )}
        </div>

        {/* Trust banner */}
        <div className="flex items-center gap-2 bg-[#7c3aed]/10 border border-[#7c3aed]/30 rounded-xl px-4 py-3">
          <Truck size={16} className="text-[#7c3aed] shrink-0" />
          <span className="text-sm text-[#f0f0f5]">Free shipping on orders over <strong>€50</strong> — No EU customs fees</span>
        </div>

        {/* Size / options selector */}
        {product.options.map((option) => (
          <div key={option.name}>
            <p className="text-xs font-semibold text-[#8888a0] uppercase tracking-widest mb-3">
              {option.name}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {option.values.map((value) => {
                const avail = isAvailable(option.name, value)
                const isSelected = selectedOptions[option.name] === value
                return (
                  <button
                    key={value}
                    onClick={() => avail && setSelectedOptions((prev) => ({ ...prev, [option.name]: value }))}
                    disabled={!avail}
                    className={cn(
                      'py-2.5 text-sm rounded-xl border transition-all duration-150 font-medium',
                      isSelected
                        ? 'border-[#00e5ff] bg-[#00e5ff]/10 text-[#00e5ff]'
                        : avail
                        ? 'border-[#1e1e2e] text-[#8888a0] hover:border-[#f0f0f5] hover:text-[#f0f0f5]'
                        : 'border-[#1e1e2e] text-[#1e1e2e] cursor-not-allowed line-through'
                    )}
                  >
                    {value}
                  </button>
                )
              })}
            </div>
          </div>
        ))}

        {/* Add to cart */}
        {selectedVariant && (
          <AddToCartButton variantId={selectedVariant.id} available={available} />
        )}

        {/* Secure checkout */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs text-[#8888a0]">
            <Shield size={13} className="text-[#8888a0]" />
            <span>Safe & secure checkout</span>
          </div>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {['Visa', 'Mastercard', 'PayPal', 'Apple Pay', 'Google Pay'].map((method) => (
              <span
                key={method}
                className="text-[10px] font-semibold text-[#8888a0] border border-[#1e1e2e] rounded px-2 py-1"
              >
                {method}
              </span>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-2 gap-3 border-t border-[#1e1e2e] pt-5">
          {[
            { icon: Users, label: '10,000+ Happy setups' },
            { icon: Zap, label: 'Printed in 3–5 days' },
            { icon: Shield, label: 'Machine washable' },
            { icon: Truck, label: 'Free shipping €50+' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon size={14} className="text-[#7c3aed] shrink-0" />
              <span className="text-xs text-[#8888a0]">{label}</span>
            </div>
          ))}
        </div>

        {/* Accordions */}
        <div className="border-t border-[#1e1e2e] pt-2">
          {product.description && (
            <Accordion title="Description">
              {product.description}
            </Accordion>
          )}
          <Accordion title="Features">
            <ul className="space-y-1.5 list-disc list-inside">
              <li>Anti-slip rubber base</li>
              <li>Smooth micro-weave surface</li>
              <li>Stitched edges for durability</li>
              <li>Machine washable at 30°C</li>
              <li>3mm thickness</li>
            </ul>
          </Accordion>
          <Accordion title="Shipping Information">
            Printed and shipped within 3–5 business days. Free EU shipping on orders over €50. Delivery typically takes 5–10 business days depending on your location.
          </Accordion>
        </div>
      </div>
    </div>
  )
}
