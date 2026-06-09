'use client'
import Image from 'next/image'
import { Minus, Plus, X } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import type { ShopifyCartLine } from '@/types/shopify'

type Props = {
  line: ShopifyCartLine
  onUpdate: (lineId: string, quantity: number) => void
  onRemove: (lineId: string) => void
  loading?: boolean
}

export function CartItem({ line, onUpdate, onRemove, loading }: Props) {
  const { merchandise, quantity, cost } = line
  const image = merchandise.product.featuredImage
  const size = merchandise.selectedOptions.find((o) => o.name === 'Size')?.value

  return (
    <div className={`flex gap-3 py-4 border-b border-[#1e1e2e] ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
      {image && (
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#111118] shrink-0">
          <Image src={image.url} alt={image.altText ?? merchandise.product.title} width={64} height={64} className="object-cover w-full h-full" />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#f0f0f5] truncate">{merchandise.product.title}</p>
        {size && <p className="text-xs text-[#8888a0] mt-0.5">{size}</p>}
        <p className="text-sm font-semibold text-[#00e5ff] mt-1">
          {formatPrice(cost.totalAmount.amount, cost.totalAmount.currencyCode)}
        </p>
      </div>

      <div className="flex flex-col items-end justify-between shrink-0">
        <button onClick={() => onRemove(line.id)} className="text-[#8888a0] hover:text-red-400 transition-colors p-1">
          <X size={14} />
        </button>
        <div className="flex items-center gap-1 border border-[#1e1e2e] rounded-lg">
          <button
            onClick={() => onUpdate(line.id, quantity - 1)}
            className="p-1.5 text-[#8888a0] hover:text-[#f0f0f5] transition-colors"
          >
            <Minus size={12} />
          </button>
          <span className="text-sm w-5 text-center text-[#f0f0f5]">{quantity}</span>
          <button
            onClick={() => onUpdate(line.id, quantity + 1)}
            className="p-1.5 text-[#8888a0] hover:text-[#f0f0f5] transition-colors"
          >
            <Plus size={12} />
          </button>
        </div>
      </div>
    </div>
  )
}
