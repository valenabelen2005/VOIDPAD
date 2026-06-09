'use client'
import { cn } from '@/lib/utils'
import type { ShopifyProductVariant } from '@/types/shopify'

type Props = {
  options: { name: string; values: string[] }[]
  variants: ShopifyProductVariant[]
  selected: Record<string, string>
  onChange: (name: string, value: string) => void
}

export function SizeSelector({ options, variants, selected, onChange }: Props) {
  function isAvailable(optionName: string, value: string): boolean {
    const testOptions = { ...selected, [optionName]: value }
    return variants.some(
      (v) =>
        v.availableForSale &&
        v.selectedOptions.every((o) => testOptions[o.name] === o.value)
    )
  }

  return (
    <div className="space-y-4">
      {options.map((option) => (
        <div key={option.name}>
          <p className="text-xs font-semibold text-[#8888a0] uppercase tracking-widest mb-2">
            {option.name}
          </p>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => {
              const available = isAvailable(option.name, value)
              const isSelected = selected[option.name] === value
              return (
                <button
                  key={value}
                  onClick={() => available && onChange(option.name, value)}
                  disabled={!available}
                  className={cn(
                    'px-3 py-1.5 text-sm rounded-lg border transition-all duration-150',
                    isSelected
                      ? 'border-[#00e5ff] bg-[#00e5ff]/10 text-[#00e5ff] font-medium'
                      : available
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
    </div>
  )
}
