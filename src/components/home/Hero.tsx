'use client'
import { useT } from '@/hooks/useT'

export function Hero() {
  const t = useT()

  return (
    <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-background">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-160 h-100 bg-violet/12 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-100 h-80 bg-cyan/8 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: 'radial-gradient(circle, #f0f0f5 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
      </div>
      <div className="absolute top-0 left-0 right-0 h-20 bg-linear-to-b from-background to-transparent pointer-events-none z-10" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="text-5xl sm:text-7xl font-black text-text leading-none tracking-tight mb-6">
          {t('hero.title1')}{' '}
          <span className="bg-linear-to-r from-cyan to-violet bg-clip-text text-transparent">
            {t('hero.title2')}
          </span>
        </h1>

        <p className="text-lg text-muted max-w-xl mx-auto leading-relaxed">
          {t('hero.subtitle')}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-30 bg-linear-to-t from-background to-transparent pointer-events-none" />
    </section>
  )
}
