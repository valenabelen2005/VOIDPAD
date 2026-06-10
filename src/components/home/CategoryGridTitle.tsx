'use client'
import { useT } from '@/hooks/useT'

export function CategoryGridTitle() {
  const t = useT()
  return <h2 className="text-2xl sm:text-3xl font-bold text-text">{t('categories.title')}</h2>
}
