'use client'
import { useEffect, useState } from 'react'
import { Download, X } from 'lucide-react'
import { useLanguageStore } from '@/store/language'

const content = {
  en: { text: 'Install the app — get 15% off', install: 'Install' },
  es: { text: 'Instalá la app — obtené 15% off', install: 'Instalar' },
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function PwaInstallBanner() {
  const locale = useLanguageStore((s) => s.locale)
  const t = content[locale]
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Don't show if already installed (standalone) or dismissed before
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as { standalone?: boolean }).standalone === true
    if (isStandalone) return
    if (localStorage.getItem('void-install-dismissed')) return

    const handler = (e: Event) => {
      e.preventDefault()
      setPrompt(e as BeforeInstallPromptEvent)
      setVisible(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  if (!visible || !prompt) return null

  async function handleInstall() {
    if (!prompt) return
    await prompt.prompt()
    const { outcome } = await prompt.userChoice
    if (outcome === 'accepted') localStorage.setItem('void-install-dismissed', '1')
    setVisible(false)
  }

  function dismiss() {
    localStorage.setItem('void-install-dismissed', '1')
    setVisible(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#0d0d14] border border-cyan/30 text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg shadow-cyan/10 max-w-xs">
      <Download size={13} className="text-cyan shrink-0" />
      <span className="text-text">{t.text}</span>
      <button
        onClick={handleInstall}
        className="bg-cyan text-background font-bold px-3 py-1 rounded-full hover:bg-cyan/90 transition-colors text-[11px] shrink-0"
      >
        {t.install}
      </button>
      <button onClick={dismiss} className="text-muted hover:text-text transition-colors ml-1 shrink-0">
        <X size={13} />
      </button>
    </div>
  )
}
