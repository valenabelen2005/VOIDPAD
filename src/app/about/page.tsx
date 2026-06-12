import Link from 'next/link'

export const metadata = { title: 'About — VoidPad' }

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">

      {/* Opening statement */}
      <div className="mb-16">
        <p className="text-xs font-semibold text-violet uppercase tracking-widest mb-4">Our story</p>
        <h1 className="text-4xl sm:text-5xl font-black text-[#f0f0f5] leading-tight mb-6">
          We started because generic setups{' '}
          <span className="text-[#8888a0]">stopped making sense.</span>
        </h1>
        <p className="text-base text-[#c0c0d0] leading-relaxed">
          VoidPad started from a simple frustration: every desk pad on the market looked the same.
          Solid black. Generic logo. Made in bulk and dropped in a warehouse. We wanted surfaces that
          meant something — pads you actually choose, not settle for. So we built a small operation
          that prints every order individually, with artwork that goes from a file to your desk in
          under a week.
        </p>
      </div>

      {/* What we make */}
      <div className="mb-16 pb-16 border-b border-[#1e1e2e]">
        <h2 className="text-xl font-bold text-[#f0f0f5] mb-4">What we make</h2>
        <p className="text-sm text-[#c0c0d0] leading-relaxed mb-4">
          Desk pads and mouse pads. That's it. We don't do keycaps, cables, or keyboard kits.
          We do one thing and we try to do it right: a surface that holds up every day, prints
          that don't fade after three washes, and edges that don't fray.
        </p>
        <p className="text-sm text-[#c0c0d0] leading-relaxed">
          Every design lives in one of three lines. <strong className="text-[#f0f0f5]">Void Classics</strong> — pure color,
          zero noise. <strong className="text-[#f0f0f5]">Void Series</strong> — geometry and pattern work, released in
          limited drops that retire permanently. <strong className="text-[#f0f0f5]">Void Art</strong> — for when you want
          your desk to say something loud.
        </p>
      </div>

      {/* Who it's for */}
      <div className="mb-16 pb-16 border-b border-[#1e1e2e]">
        <h2 className="text-xl font-bold text-[#f0f0f5] mb-6">Who it's for</h2>
        <div className="grid gap-4">
          {[
            {
              label: 'The focused one',
              desc: 'You sit at your desk for hours. You want a surface that disappears into the setup and lets you concentrate. Void Classics is yours.',
            },
            {
              label: 'The collector',
              desc: 'You follow drops, you notice when something retires. Void Series is designed specifically for you — once a run ends, it\'s gone.',
            },
            {
              label: 'The statement maker',
              desc: 'Your setup is an extension of who you are. You want art, not a product. Void Art and custom orders are the answer.',
            },
          ].map((p) => (
            <div key={p.label} className="flex gap-4 p-5 rounded-xl bg-[#0d0d14] border border-[#1e1e2e]">
              <div className="w-1.5 rounded-full bg-gradient-to-b from-cyan to-violet shrink-0" />
              <div>
                <p className="text-sm font-semibold text-[#f0f0f5] mb-1">{p.label}</p>
                <p className="text-sm text-[#8888a0] leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How it's made */}
      <div className="mb-16 pb-16 border-b border-[#1e1e2e]">
        <h2 className="text-xl font-bold text-[#f0f0f5] mb-6">How it's made</h2>
        <div className="space-y-6">
          {[
            { n: '01', title: 'You order', body: 'No stock. No warehouse. Your order triggers production — nothing sits waiting.' },
            { n: '02', title: 'We print', body: 'Printed on professional equipment within 3–5 business days. Each pad is checked before it ships.' },
            { n: '03', title: 'It ships to you', body: 'Packed flat to minimize damage. Tracking sent as soon as it leaves. Free EU shipping on orders over €50.' },
          ].map((step) => (
            <div key={step.n} className="flex gap-5 items-start">
              <span className="text-2xl font-black text-[#1e1e2e] leading-none pt-0.5">{step.n}</span>
              <div>
                <p className="text-sm font-semibold text-[#f0f0f5] mb-1">{step.title}</p>
                <p className="text-sm text-[#8888a0] leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <p className="text-sm text-[#8888a0] mb-4">That's the whole operation. If it resonates — come find your surface.</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-cyan text-background text-sm font-bold px-6 py-3 rounded-xl hover:bg-cyan/90 transition-colors"
        >
          Shop All Products
        </Link>
      </div>

    </div>
  )
}
