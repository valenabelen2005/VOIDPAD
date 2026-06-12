'use client'
import { useT } from '@/hooks/useT'
import { Package, Shield, Layers, Palette } from 'lucide-react'

const pillars = [
  { icon: Package, titleKey: 'why.1.title', bodyKey: 'why.1.body' },
  { icon: Shield,  titleKey: 'why.2.title', bodyKey: 'why.2.body' },
  { icon: Layers,  titleKey: 'why.3.title', bodyKey: 'why.3.body' },
  { icon: Palette, titleKey: 'why.4.title', bodyKey: 'why.4.body' },
] as const

export function WhyVoidPad() {
  const t = useT()

  return (
    <section className="border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <p className="text-xs font-semibold text-violet uppercase tracking-widest mb-8 text-center">
          {t('why.label')}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {pillars.map(({ icon: Icon, titleKey, bodyKey }) => (
            <div key={titleKey} className="flex flex-col gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan/10 border border-cyan/20 text-cyan flex items-center justify-center">
                <Icon size={16} />
              </div>
              <h3 className="text-sm font-semibold text-text">{t(titleKey)}</h3>
              <p className="text-xs text-muted leading-relaxed">{t(bodyKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
