export const metadata = { title: 'Contact Us — VoidPad' }

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold text-violet uppercase tracking-widest mb-2">Get in touch</p>
        <h1 className="text-3xl font-black text-[#f0f0f5]">Contact Us</h1>
        <p className="text-sm text-[#8888a0] mt-2">We typically respond within 24 hours on business days.</p>
      </div>

      <div className="grid gap-4 mb-10">
        <ContactCard
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          }
          label="Email"
          value="acrformvg@gmail.com"
          href="mailto:acrformvg@gmail.com"
        />
        <ContactCard
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
          }
          label="Address"
          value="Calle Faro 17, MA, 29008, Spain"
        />
      </div>

      <div className="rounded-2xl border border-[#1e1e2e] bg-[#0d0d14] p-6">
        <h2 className="text-base font-bold text-[#f0f0f5] mb-1">Before you write</h2>
        <p className="text-sm text-[#8888a0] mb-4">
          Check our <a href="/pages/faq" className="text-cyan hover:underline">FAQ</a> and{' '}
          <a href="/pages/shipping" className="text-cyan hover:underline">Shipping & Returns</a> pages — your question might already be answered there.
        </p>
        <div className="space-y-2 text-sm text-[#8888a0]">
          <p className="font-medium text-[#f0f0f5]">When emailing about an order, please include:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Your order number</li>
            <li>The email address used at checkout</li>
            <li>A description of the issue (+ photo if relevant)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function ContactCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}) {
  return (
    <div className="flex items-center gap-4 px-5 py-4 rounded-xl bg-[#111118] border border-[#1e1e2e]">
      <div className="shrink-0 w-10 h-10 rounded-full bg-cyan/10 border border-cyan/20 text-cyan flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-xs text-[#8888a0] uppercase tracking-widest mb-0.5">{label}</p>
        {href ? (
          <a href={href} className="text-sm font-medium text-[#f0f0f5] hover:text-cyan transition-colors">
            {value}
          </a>
        ) : (
          <p className="text-sm font-medium text-[#f0f0f5]">{value}</p>
        )}
      </div>
    </div>
  )
}
