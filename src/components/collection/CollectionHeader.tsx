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
  'gaming-collection': 'collection.gaming-collection.desc',
  'velocity-series': 'collection.velocity-series.desc',
  'community-collection': 'collection.community-collection.desc',
  'artist-collection': 'collection.artist-collection.desc',
  'pattern-collection': 'collection.pattern-collection.desc',
  'landscape-collection': 'collection.landscape-collection.desc',
  'anime-collection': 'collection.anime-collection.desc',
  'cinema-collection': 'collection.cinema-collection.desc',
  'japanese-collection': 'collection.japanese-collection.desc',
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
