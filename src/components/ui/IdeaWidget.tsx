'use client'
import { useState, useRef } from 'react'
import { Lightbulb, X, Copy, Check } from 'lucide-react'
import { useLanguageStore } from '@/store/language'
import { submitIdeaForm } from '@/app/actions/idea-form'

const DISCOUNT_CODE = 'IDEA10'

const content = {
  en: {
    trigger: 'Got a pad idea?',
    title: 'Share your idea',
    subtitle: 'Tell us what you\'d love to see — get a discount code as a thank-you.',
    namePlaceholder: 'Your name (optional)',
    emailPlaceholder: 'your@email.com *',
    ideaLabel: 'Your pad idea',
    ideaPlaceholder: 'Describe the design, colors, theme, vibe...',
    submit: 'Send idea',
    sending: 'Sending...',
    successTitle: 'Thanks! Here\'s your code:',
    successNote: 'Use it at checkout for 10% off your next order.',
    copy: 'Copy',
    copied: 'Copied!',
    close: 'Close',
    errorMsg: 'Something went wrong. Please try again.',
  },
  es: {
    trigger: '¿Tenés una idea de pad?',
    title: 'Compartí tu idea',
    subtitle: 'Contanos qué te gustaría ver — te mandamos un código de descuento de regalo.',
    namePlaceholder: 'Tu nombre (opcional)',
    emailPlaceholder: 'tu@email.com *',
    ideaLabel: 'Tu idea de pad',
    ideaPlaceholder: 'Describí el diseño, colores, temática, vibra...',
    submit: 'Enviar idea',
    sending: 'Enviando...',
    successTitle: '¡Gracias! Tu código:',
    successNote: 'Usalo al pagar para un 10% de descuento en tu próximo pedido.',
    copy: 'Copiar',
    copied: '¡Copiado!',
    close: 'Cerrar',
    errorMsg: 'Algo salió mal. Por favor intentá de nuevo.',
  },
}

export function IdeaWidget() {
  const locale = useLanguageStore((s) => s.locale)
  const t = content[locale]

  const [open, setOpen] = useState(false)
  const [pulsed, setPulsed] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [idea, setIdea] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [copied, setCopied] = useState(false)
  const emailRef = useRef<HTMLInputElement>(null)

  function openModal() {
    setOpen(true)
    setPulsed(true)
  }

  function closeModal() {
    setOpen(false)
    if (status === 'success') {
      setName('')
      setEmail('')
      setIdea('')
      setStatus('idle')
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !idea) return
    setStatus('loading')
    const result = await submitIdeaForm({ name, email, idea })
    setStatus(result.ok ? 'success' : 'error')
  }

  function copyCode() {
    navigator.clipboard.writeText(DISCOUNT_CODE)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      {/* Floating trigger */}
      <button
        onClick={openModal}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 bg-[#111118] border border-cyan/30 text-cyan text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg shadow-cyan/10 hover:bg-[#1a1a28] hover:border-cyan/60 transition-all duration-200"
        aria-label="Share pad idea"
      >
        <span className="relative flex h-2 w-2">
          {!pulsed && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75" />
          )}
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan" />
        </span>
        <Lightbulb size={13} />
        {t.trigger}
      </button>

      {/* Modal overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-end justify-start p-4 sm:p-6"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="bg-[#0d0d14] border border-[#1e1e2e] rounded-2xl shadow-2xl w-full max-w-sm">
            {/* Header */}
            <div className="flex items-start justify-between p-5 border-b border-[#1e1e2e]">
              <div>
                <h2 className="text-sm font-bold text-[#f0f0f5]">{t.title}</h2>
                <p className="text-xs text-[#8888a0] mt-0.5">{t.subtitle}</p>
              </div>
              <button
                onClick={closeModal}
                className="text-[#8888a0] hover:text-[#f0f0f5] transition-colors ml-3 mt-0.5"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="p-5">
              {status === 'success' ? (
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-cyan/10 border border-cyan/20 text-cyan flex items-center justify-center mx-auto">
                    <Check size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#f0f0f5] mb-3">{t.successTitle}</p>
                    <div className="flex items-center gap-2 bg-[#111118] border border-cyan/30 rounded-xl px-4 py-3">
                      <span className="font-mono font-bold text-cyan tracking-widest text-base flex-1">
                        {DISCOUNT_CODE}
                      </span>
                      <button
                        onClick={copyCode}
                        className="text-[#8888a0] hover:text-cyan transition-colors"
                        aria-label="Copy code"
                      >
                        {copied ? <Check size={15} className="text-cyan" /> : <Copy size={15} />}
                      </button>
                    </div>
                    <p className="text-xs text-[#8888a0] mt-2">{t.successNote}</p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="w-full text-xs text-[#8888a0] hover:text-[#f0f0f5] transition-colors py-1"
                  >
                    {t.close}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.namePlaceholder}
                    className="w-full bg-[#111118] border border-[#1e1e2e] rounded-xl px-3.5 py-2.5 text-sm text-[#f0f0f5] placeholder:text-[#8888a0] focus:outline-none focus:border-cyan/50 transition-colors"
                  />
                  <input
                    ref={emailRef}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.emailPlaceholder}
                    required
                    className="w-full bg-[#111118] border border-[#1e1e2e] rounded-xl px-3.5 py-2.5 text-sm text-[#f0f0f5] placeholder:text-[#8888a0] focus:outline-none focus:border-cyan/50 transition-colors"
                  />
                  <div>
                    <label className="text-xs text-[#8888a0] mb-1.5 block">{t.ideaLabel}</label>
                    <textarea
                      value={idea}
                      onChange={(e) => setIdea(e.target.value)}
                      placeholder={t.ideaPlaceholder}
                      required
                      rows={3}
                      className="w-full bg-[#111118] border border-[#1e1e2e] rounded-xl px-3.5 py-2.5 text-sm text-[#f0f0f5] placeholder:text-[#8888a0] focus:outline-none focus:border-cyan/50 transition-colors resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-xs text-red-400">{t.errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading' || !email || !idea}
                    className="w-full bg-cyan text-background text-sm font-bold py-2.5 rounded-xl hover:bg-cyan/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {status === 'loading' ? t.sending : t.submit}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
