'use client'
import { useT } from '@/hooks/useT'
import { TrendingUp } from 'lucide-react'

export function TrendingPageHeader() {
  const t = useT()
  return (
    <div className="mb-10 text-center">
      <div className="inline-flex items-center gap-2 bg-cyan/10 border border-cyan/20 text-cyan text-xs font-semibold px-3.5 py-1.5 rounded-full mb-4">
        <TrendingUp size={12} />
        {t('trending.badge')}
      </div>
      <h1 className="text-3xl sm:text-4xl font-black text-[#f0f0f5]">{t('trending.title')}</h1>
      <p className="text-sm text-[#8888a0] mt-2 max-w-md mx-auto">{t('trending.subtitle')}</p>
    </div>
  )
}
