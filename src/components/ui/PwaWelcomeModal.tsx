'use client'
import { useState, useEffect } from 'react'
import { Check } from 'lucide-react'
import { useLanguageStore } from '@/store/language'
import { registerPwaInstall } from '@/app/actions/access'

const STORAGE_KEY = 'void-pwa-welcomed'

const content = {
  en: {
    badge: 'App installed',
    title: 'Welcome to VOIDPAD',
    subtitle: "You're one of the few who took it seriously. Enter your email for an exclusive install discount.",
    placeholder: 'your@email.com',
    submit: 'Get my code',
    submitting: 'Sending...',
    successTitle: 'Check your inbox.',
    successNote: 'Your code is on its way — 15% off your first order.',
    skip: 'Skip for now',
    close: 'Close',
  },
  es: {
    badge: 'App instalada',
    title: 'Bienvenido a VOIDPAD',
    subtitle: 'Sos de los pocos que se lo tomaron en serio. Ingresá tu email para un descuento exclusivo por instalar.',
    placeholder: 'tu@email.com',
    submit: 'Obtener mi código',
    submitting: 'Enviando...',
    successTitle: 'Revisá tu bandeja.',
    successNote: 'Tu código está en camino — 15% de descuento en tu primer pedido.',
    skip: 'Saltar por ahora',
    close: 'Cerrar',
  },
}

export function PwaWelcomeModal() {
  const locale = useLanguageStore((s) => s.locale)
  const t = content[locale]
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [honey, setHoney] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as { standalone?: boolean }).standalone === true
    if (!isStandalone) return
    if (localStorage.getItem(STORAGE_KEY)) return
    // Small delay so the app feels settled before showing the modal
    const timer = setTimeout(() => setOpen(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  function close() {
    localStorage.setItem(STORAGE_KEY, '1')
    setOpen(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    const result = await registerPwaInstall({ email, _honey: honey })
    if (result.ok) {
      setStatus('success')
      localStorage.setItem(STORAGE_KEY, '1')
    } else {
      setStatus('error')
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#0d0d14] border border-border rounded-2xl shadow-2xl w-full max-w-sm">
        <div className="p-6 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-cyan/10 border border-cyan/20 text-cyan text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            {t.badge}
          </div>

          <div>
            <h2 className="text-lg font-bold text-text">{t.title}</h2>
            <p className="text-xs text-muted mt-1 leading-relaxed">{t.subtitle}</p>
          </div>

          {status === 'success' ? (
            <div className="space-y-3 py-2">
              <div className="w-10 h-10 rounded-full bg-cyan/10 border border-cyan/20 text-cyan flex items-center justify-center">
                <Check size={18} />
              </div>
              <p className="text-sm font-semibold text-text">{t.successTitle}</p>
              <p className="text-xs text-muted">{t.successNote}</p>
              <button onClick={close} className="text-xs text-cyan hover:underline">{t.close}</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
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
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.placeholder}
                required
                maxLength={200}
                className="w-full bg-background border border-border rounded-xl px-3.5 py-2.5 text-sm text-text placeholder:text-muted focus:outline-none focus:border-cyan/50 transition-colors"
              />
              {status === 'error' && (
                <p className="text-xs text-red-400">Something went wrong. Try again.</p>
              )}
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={status === 'loading' || !email}
                  className="flex-1 bg-cyan text-background text-sm font-bold py-2.5 rounded-xl hover:bg-cyan/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {status === 'loading' ? t.submitting : t.submit}
                </button>
                <button
                  type="button"
                  onClick={close}
                  className="text-xs text-muted hover:text-text transition-colors"
                >
                  {t.skip}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
