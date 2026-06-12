'use client'
import { useState } from 'react'
import { Check } from 'lucide-react'
import { useLanguageStore } from '@/store/language'
import { submitReview } from '@/app/actions/reviews'
import { StarRating } from './StarRating'

const content = {
  en: {
    title: 'Leave a review',
    subtitle: 'Share your experience — your feedback helps other buyers.',
    name: 'Your name *',
    email: 'Your email (private) *',
    ratingLabel: 'Your rating *',
    bodyLabel: 'Your review *',
    bodyPlaceholder: 'Quality, shipping, how it looks on your desk...',
    submit: 'Submit review',
    submitting: 'Submitting...',
    successTitle: 'Thanks for your review!',
    successNote: "We'll publish it once we've reviewed it.",
    writeAnother: 'Write another',
    errorMsg: 'Something went wrong. Please try again.',
    ratingRequired: 'Please select a rating.',
  },
  es: {
    title: 'Dejar una reseña',
    subtitle: 'Compartí tu experiencia — tu opinión ayuda a otros compradores.',
    name: 'Tu nombre *',
    email: 'Tu email (privado) *',
    ratingLabel: 'Tu valoración *',
    bodyLabel: 'Tu reseña *',
    bodyPlaceholder: 'Calidad, envío, cómo quedó en tu escritorio...',
    submit: 'Enviar reseña',
    submitting: 'Enviando...',
    successTitle: '¡Gracias por tu reseña!',
    successNote: 'La publicaremos una vez que la revisemos.',
    writeAnother: 'Escribir otra',
    errorMsg: 'Algo salió mal. Por favor intentá de nuevo.',
    ratingRequired: 'Por favor seleccioná una valoración.',
  },
}

interface ReviewFormProps {
  type?: 'product' | 'store'
  productHandle?: string
  productName?: string
}

export function ReviewForm({ type = 'product', productHandle, productName }: ReviewFormProps) {
  const locale = useLanguageStore((s) => s.locale)
  const t = content[locale]

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [rating, setRating] = useState(0)
  const [body, setBody] = useState('')
  const [honey, setHoney] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [ratingError, setRatingError] = useState(false)

  function reset() {
    setName(''); setEmail(''); setRating(0); setBody(''); setStatus('idle'); setRatingError(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!rating) { setRatingError(true); return }
    setRatingError(false)
    setStatus('loading')
    const result = await submitReview({
      type,
      product_handle: productHandle,
      product_name: productName,
      reviewer_name: name,
      reviewer_email: email,
      rating,
      body,
      _honey: honey,
    })
    setStatus(result.ok ? 'success' : 'error')
  }

  return (
    <div className="border border-border rounded-2xl p-6 bg-surface">
      <h3 className="text-sm font-bold text-text mb-0.5">{t.title}</h3>
      <p className="text-xs text-muted mb-5">{t.subtitle}</p>

      {status === 'success' ? (
        <div className="text-center space-y-3 py-4">
          <div className="w-10 h-10 rounded-full bg-cyan/10 border border-cyan/20 text-cyan flex items-center justify-center mx-auto">
            <Check size={18} />
          </div>
          <p className="text-sm font-semibold text-text">{t.successTitle}</p>
          <p className="text-xs text-muted">{t.successNote}</p>
          <button onClick={reset} className="text-xs text-cyan hover:underline">{t.writeAnother}</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot */}
          <input
            type="text"
            name="website"
            value={honey}
            onChange={(e) => setHoney(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute opacity-0 pointer-events-none w-0 h-0"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.name}
              required
              maxLength={100}
              className="w-full bg-background border border-border rounded-xl px-3.5 py-2.5 text-sm text-text placeholder:text-muted focus:outline-none focus:border-cyan/50 transition-colors"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.email}
              required
              maxLength={200}
              className="w-full bg-background border border-border rounded-xl px-3.5 py-2.5 text-sm text-text placeholder:text-muted focus:outline-none focus:border-cyan/50 transition-colors"
            />
          </div>

          <div>
            <label className="text-xs text-muted mb-2 block">{t.ratingLabel}</label>
            <StarRating value={rating} onChange={setRating} size="lg" />
            {ratingError && <p className="text-xs text-red-400 mt-1">{t.ratingRequired}</p>}
          </div>

          <div>
            <label className="text-xs text-muted mb-1.5 block">{t.bodyLabel}</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={t.bodyPlaceholder}
              required
              rows={4}
              maxLength={2000}
              className="w-full bg-background border border-border rounded-xl px-3.5 py-2.5 text-sm text-text placeholder:text-muted focus:outline-none focus:border-cyan/50 transition-colors resize-none"
            />
          </div>

          {status === 'error' && <p className="text-xs text-red-400">{t.errorMsg}</p>}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-cyan text-background text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-cyan/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {status === 'loading' ? t.submitting : t.submit}
          </button>
        </form>
      )}
    </div>
  )
}
