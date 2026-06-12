'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'
import { useT } from '@/hooks/useT'

export function Hero() {
  const t = useT()

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-background">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-150 bg-violet/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-125 h-100 bg-cyan/10 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle, #f0f0f5 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center bg-violet/15 border border-violet/30 text-violet/80 text-xs font-medium px-3.5 py-1.5 rounded-full mb-8">
          {t('hero.badge')}
        </div>

        <h1 className="text-5xl sm:text-7xl font-black text-text leading-none tracking-tight mb-6">
          {t('hero.title1')}{' '}
          <span className="bg-linear-to-r from-cyan to-violet bg-clip-text text-transparent">
            {t('hero.title2')}
          </span>
        </h1>

        <p className="text-lg text-muted max-w-xl mx-auto mb-10 leading-relaxed">
          {t('hero.subtitle')}
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/products">
            <Button size="lg">
              {t('hero.cta1')}
              <ArrowRight size={16} />
            </Button>
          </Link>
          <Link href="/trending">
            <Button size="lg" variant="outline">
              {t('hero.cta2')}
            </Button>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-30 bg-linear-to-t from-background to-transparent pointer-events-none" />
    </section>
  )
}
