'use client'
import { useState } from 'react'
import { Check } from 'lucide-react'
import { useLanguageStore } from '@/store/language'
import { joinWaitlist } from '@/app/actions/access'

const content = {
  en: {
    badge: 'Coming soon',
    title: 'VOIDPAD ACCESS',
    subtitle: 'Reserved for those who shape their space.',
    desc: 'Early drops. Exclusive content. A community built around setups that mean something.',
    label: 'Join the waitlist',
    placeholder: 'your@email.com',
    submit: "I'm in",
    submitting: 'Joining...',
    successTitle: "You're on the list.",
    successNote: "We'll reach out when VOIDPAD ACCESS is ready.",
  },
  es: {
    badge: 'Próximamente',
    title: 'VOIDPAD ACCESS',
    subtitle: 'Reservado para quienes dan forma a su espacio.',
    desc: 'Drops anticipados. Contenido exclusivo. Una comunidad construida alrededor de setups que dicen algo.',
    label: 'Unirme a la lista de espera',
    placeholder: 'tu@email.com',
    submit: 'Quiero entrar',
    submitting: 'Uniéndome...',
    successTitle: 'Estás en la lista.',
    successNote: 'Te avisamos cuando VOIDPAD ACCESS esté listo.',
  },
}

export default function AccessPage() {
  const locale = useLanguageStore((s) => s.locale)
  const t = content[locale]

  const [email, setEmail] = useState('')
  const [honey, setHoney] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    const result = await joinWaitlist({ email, _honey: honey })
    setStatus(result.ok ? 'success' : 'error')
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full text-center space-y-8">

        {/* Badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-1.5 bg-violet/10 border border-violet/20 text-violet text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-violet inline-block animate-pulse" />
            {t.badge}
          </span>
        </div>

        {/* Title */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-black text-text tracking-tight">
            {t.title}
          </h1>
          <p className="text-lg text-cyan font-medium">{t.subtitle}</p>
          <p className="text-sm text-muted leading-relaxed max-w-sm mx-auto">{t.desc}</p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 max-w-xs mx-auto">
          <div className="flex-1 h-px bg-border" />
          <span className="text-[11px] text-muted uppercase tracking-widest">Access</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Form */}
        {status === 'success' ? (
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-full bg-cyan/10 border border-cyan/20 text-cyan flex items-center justify-center mx-auto">
              <Check size={22} />
            </div>
            <p className="text-base font-semibold text-text">{t.successTitle}</p>
            <p className="text-sm text-muted">{t.successNote}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 max-w-sm mx-auto">
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
            <p className="text-xs text-muted text-left">{t.label}</p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.placeholder}
                required
                maxLength={200}
                className="flex-1 bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text placeholder:text-muted focus:outline-none focus:border-cyan/50 transition-colors"
              />
              <button
                type="submit"
                disabled={status === 'loading' || !email}
                className="bg-cyan text-background text-sm font-bold px-5 py-3 rounded-xl hover:bg-cyan/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
              >
                {status === 'loading' ? t.submitting : t.submit}
              </button>
            </div>
            {status === 'error' && (
              <p className="text-xs text-red-400 text-left">Something went wrong. Try again.</p>
            )}
          </form>
        )}
      </div>
    </div>
  )
}
