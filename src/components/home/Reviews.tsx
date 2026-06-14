'use client'
import { useT } from '@/hooks/useT'
import { useLanguageStore } from '@/store/language'
import type { ReviewRow } from '@/app/actions/reviews'

const starPath = 'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'

function Stars({ count = 5 }: { count?: number }) {
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

const staticReviewers = [
  { name: 'Marcos V.', country: 'Spain', date: 'March 2026', product: 'Gaming Collection 90×40', stars: 5, key: 'reviews.1' as const },
  { name: 'Julie R.', country: 'Netherlands', date: 'Feb 2026', product: 'Japanese Collection', stars: 5, key: 'reviews.2' as const },
  { name: 'Nico B.', country: 'Germany', date: 'Jan 2026', product: 'Anime Collection', stars: 4, key: 'reviews.3' as const },
]

interface ReviewsProps {
  reviews?: ReviewRow[]
}

export function Reviews({ reviews }: ReviewsProps) {
  const t = useT()
  const locale = useLanguageStore((s) => s.locale)
  const useDynamic = reviews && reviews.length > 0

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-GB', {
      month: 'short', year: 'numeric',
    })
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t border-border">
      <div className="text-center mb-10">
        <p className="text-xs font-semibold text-violet uppercase tracking-widest mb-2">{t('reviews.label')}</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-text">{t('reviews.rating')}</h2>
        <p className="text-sm text-muted mt-1">{t('reviews.count')}</p>
        <div className="flex justify-center mt-2"><Stars /></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {useDynamic
          ? reviews.slice(0, 3).map((r) => (
              <div key={r.id} className="bg-surface border border-border rounded-2xl p-6 space-y-3 flex flex-col">
                <Stars count={r.rating} />
                <p className="text-sm text-muted leading-relaxed flex-1">"{r.body}"</p>
                <div className="pt-2 border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-background border border-border flex items-center justify-center text-xs font-bold text-muted">
                      {r.reviewer_name[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-text">{r.reviewer_name}</p>
                      <p className="text-[11px] text-muted">
                        {r.product_name ? r.product_name : '—'} · {formatDate(r.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : staticReviewers.map((r) => (
              <div key={r.name} className="bg-surface border border-border rounded-2xl p-6 space-y-3 flex flex-col">
                <Stars count={r.stars} />
                <p className="text-sm text-muted leading-relaxed flex-1">"{t(r.key)}"</p>
                <div className="pt-2 border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-border border border-border flex items-center justify-center text-xs font-bold text-muted">
                      {r.name[0]}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-text">{r.name} · {r.country}</p>
                      <p className="text-[11px] text-muted">{r.product} · {r.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </section>
  )
}
