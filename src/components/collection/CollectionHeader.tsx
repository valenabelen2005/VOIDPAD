'use client'
import { useT } from '@/hooks/useT'
import type { TranslationKey } from '@/lib/i18n'

type Props = {
  title: string
  handle: string
  fallbackDesc?: string
}

const descKeys: Partial<Record<string, TranslationKey>> = {
  'void-classics': 'collection.void-classics.desc',
  'void-series': 'collection.void-series.desc',
  'void-art': 'collection.void-art.desc',
}

export function CollectionHeader({ title, handle, fallbackDesc }: Props) {
  const t = useT()
  const key = descKeys[handle]
  const description = key ? t(key) : fallbackDesc

  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-text">{title}</h1>
      {description && (
        <p className="text-sm text-muted mt-1 max-w-2xl">{description}</p>
      )}
    </div>
  )
}
