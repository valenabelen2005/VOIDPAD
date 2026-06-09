import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Sparkles } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[#0a0a0f]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#7c3aed]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-[#00e5ff]/10 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle, #f0f0f5 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-[#7c3aed]/15 border border-[#7c3aed]/30 text-[#a78bfa] text-xs font-medium px-3.5 py-1.5 rounded-full mb-8">
          <Sparkles size={12} />
          Premium Custom Desk Pads & Mouse Pads
        </div>

        <h1 className="text-5xl sm:text-7xl font-black text-[#f0f0f5] leading-none tracking-tight mb-6">
          Your setup.{' '}
          <span className="bg-gradient-to-r from-[#00e5ff] to-[#7c3aed] bg-clip-text text-transparent">
            Your art.
          </span>
        </h1>

        <p className="text-lg text-[#8888a0] max-w-xl mx-auto mb-10 leading-relaxed">
          High-quality desk pads and mouse pads with stunning artwork.
          Premium materials, vibrant prints, built to last.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/products">
            <Button size="lg">
              Shop Now
              <ArrowRight size={16} />
            </Button>
          </Link>
          <Link href="/collections/trending">
            <Button size="lg" variant="outline">
              View Trending
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-sm mx-auto">
          {[
            { value: '500+', label: 'Designs' },
            { value: '4.9★', label: 'Rating' },
            { value: '10k+', label: 'Happy setups' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-[#f0f0f5]">{stat.value}</p>
              <p className="text-xs text-[#8888a0] mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
