'use client'
import { useLanguageStore } from '@/store/language'

const content = {
  en: {
    badge: 'Community',
    title: 'Fan Made',
    subtitle: 'Real setups. Real people. Real pads.',
    desc: 'This is where the community takes center stage. Fan-designed pads, setup showcases, and drops voted by the people who actually use them.',
    coming: 'Coming soon',
    note: 'Got a design idea? Use the idea button — we read every single one.',
  },
  es: {
    badge: 'Comunidad',
    title: 'Hecho por los fans',
    subtitle: 'Setups reales. Gente real. Pads reales.',
    desc: 'Acá la comunidad es la protagonista. Pads diseñados por fans, showcases de setups y drops votados por quienes realmente los usan.',
    coming: 'Próximamente',
    note: '¿Tenés una idea de diseño? Usá el botón de ideas — leemos cada una.',
  },
}

export default function FansPage() {
  const locale = useLanguageStore((s) => s.locale)
  const t = content[locale]

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full text-center space-y-8">

        <div className="flex justify-center">
          <span className="inline-flex items-center gap-1.5 bg-cyan/10 border border-cyan/20 text-cyan text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block animate-pulse" />
            {t.badge}
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-black text-text tracking-tight">
            {t.title}
          </h1>
          <p className="text-lg text-cyan font-medium">{t.subtitle}</p>
          <p className="text-sm text-muted leading-relaxed max-w-sm mx-auto">{t.desc}</p>
        </div>

        <div className="flex items-center gap-4 max-w-xs mx-auto">
          <div className="flex-1 h-px bg-border" />
          <span className="text-[11px] text-muted uppercase tracking-widest">{t.coming}</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <p className="text-xs text-muted/60 max-w-xs mx-auto leading-relaxed">{t.note}</p>
      </div>
    </div>
  )
}
