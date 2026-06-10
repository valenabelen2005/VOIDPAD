'use client'
import { useT } from '@/hooks/useT'

function Stars() {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-cyan" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  )
}

const reviewers = [
  { name: 'Alex M.', key: 'reviews.1' as const },
  { name: 'Sara K.', key: 'reviews.2' as const },
  { name: 'Tomás R.', key: 'reviews.3' as const },
]

export function Reviews() {
  const t = useT()

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t border-border">
      <div className="text-center mb-10">
        <p className="text-xs font-semibold text-violet uppercase tracking-widest mb-2">{t('reviews.label')}</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-text">{t('reviews.rating')}</h2>
        <p className="text-sm text-muted mt-1">{t('reviews.count')}</p>
        <div className="flex justify-center mt-2"><Stars /></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {reviewers.map((r) => (
          <div key={r.name} className="bg-surface border border-border rounded-2xl p-6 space-y-3">
            <Stars />
            <p className="text-sm text-muted leading-relaxed">"{t(r.key)}"</p>
            <div className="flex items-center gap-2 pt-1">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan to-violet flex items-center justify-center text-xs font-bold text-background">
                {r.name[0]}
              </div>
              <span className="text-sm font-medium text-text">{r.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
