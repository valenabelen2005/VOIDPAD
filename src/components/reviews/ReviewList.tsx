'use client'
import { useLanguageStore } from '@/store/language'
import type { ReviewRow } from '@/app/actions/reviews'

const starPath = 'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'

function Stars({ count }: { count: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-3.5 h-3.5 ${i < count ? 'text-cyan' : 'text-muted/30'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d={starPath} />
        </svg>
      ))}
    </span>
  )
}

const labels = {
  en: {
    title: 'Customer Reviews',
    empty: 'No reviews yet. Be the first to share your experience.',
  },
  es: {
    title: 'Reseñas de clientes',
    empty: 'Todavía no hay reseñas. Sé el primero en compartir tu experiencia.',
  },
}

interface ReviewListProps {
  reviews: ReviewRow[]
  showTitle?: boolean
}

export function ReviewList({ reviews, showTitle = true }: ReviewListProps) {
  const locale = useLanguageStore((s) => s.locale)
  const l = labels[locale]

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-GB', {
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <div className="space-y-4">
      {showTitle && <h3 className="text-sm font-bold text-text">{l.title}</h3>}

      {reviews.length === 0 ? (
        <p className="text-sm text-muted py-2">{l.empty}</p>
      ) : (
        <div className="space-y-3">
          {reviews.map((r) => (
            <div key={r.id} className="border border-border rounded-2xl p-5 bg-surface space-y-2">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-xs font-bold text-muted shrink-0">
                    {r.reviewer_name[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-text">{r.reviewer_name}</p>
                    {r.product_name && (
                      <p className="text-[11px] text-muted">{r.product_name}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-0.5 shrink-0">
                  <Stars count={r.rating} />
                  <span className="text-[11px] text-muted">{formatDate(r.created_at)}</span>
                </div>
              </div>
              <p className="text-sm text-muted leading-relaxed">"{r.body}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
