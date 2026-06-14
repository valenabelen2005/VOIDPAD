'use client'
import { useLanguageStore } from '@/store/language'
import { translations } from '@/lib/i18n'

type Props = {
  title: string
  handle: string
  fallbackDesc?: string
}

export function CollectionHeader({ title, handle, fallbackDesc }: Props) {
  const locale = useLanguageStore((s) => s.locale)
  const t = translations[locale]

  // Try exact handle, then handle without trailing '-collection'
  const key1 = `collection.${handle}.desc` as keyof typeof t
  const key2 = `collection.${handle.replace(/-collection$/, '')}.desc` as keyof typeof t
  const description = t[key1] ?? t[key2] ?? fallbackDesc

  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-text">{title}</h1>
      {description && (
        <p className="text-sm text-muted mt-1 max-w-2xl">{description}</p>
      )}
    </div>
  )
}
