'use client'
import { useLanguageStore } from '@/store/language'

const content = {
  en: {
    label: 'Get in touch',
    title: 'Contact Us',
    subtitle: 'We typically respond within 24 hours on business days.',
    emailLabel: 'Email',
    addressLabel: 'Address',
    beforeTitle: 'Before you write',
    beforeBody: 'Check our',
    faqLink: 'FAQ',
    and: 'and',
    shippingLink: 'Shipping & Returns',
    beforeEnd: 'pages — your question might already be answered there.',
    includeTitle: 'When emailing about an order, please include:',
    items: ['Your order number', 'The email address used at checkout', 'A description of the issue (+ photo if relevant)'],
  },
  es: {
    label: 'Contáctanos',
    title: 'Contacto',
    subtitle: 'Normalmente respondemos en 24 horas en días hábiles.',
    emailLabel: 'Email',
    addressLabel: 'Dirección',
    beforeTitle: 'Antes de escribir',
    beforeBody: 'Consulta nuestras páginas de',
    faqLink: 'Preguntas Frecuentes',
    and: 'y',
    shippingLink: 'Envíos y Devoluciones',
    beforeEnd: '— puede que tu pregunta ya esté respondida.',
    includeTitle: 'Al escribir sobre un pedido, incluye:',
    items: ['Tu número de pedido', 'El email usado al pagar', 'Una descripción del problema (+ foto si aplica)'],
  },
}

export default function ContactPage() {
  const locale = useLanguageStore((s) => s.locale)
  const t = content[locale]

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold text-violet uppercase tracking-widest mb-2">{t.label}</p>
        <h1 className="text-3xl font-black text-[#f0f0f5]">{t.title}</h1>
        <p className="text-sm text-[#8888a0] mt-2">{t.subtitle}</p>
      </div>

      <div className="grid gap-4 mb-10">
        <ContactCard
          icon={<EmailIcon />}
          label={t.emailLabel}
          value="acrformvg@gmail.com"
          href="mailto:acrformvg@gmail.com"
        />
        <ContactCard
          icon={<LocationIcon />}
          label={t.addressLabel}
          value="Calle Faro 17, MA, 29008, Spain"
        />
      </div>

      <div className="rounded-2xl border border-[#1e1e2e] bg-[#0d0d14] p-6">
        <h2 className="text-base font-bold text-[#f0f0f5] mb-1">{t.beforeTitle}</h2>
        <p className="text-sm text-[#8888a0] mb-4">
          {t.beforeBody}{' '}
          <a href="/pages/faq" className="text-cyan hover:underline">{t.faqLink}</a>{' '}
          {t.and}{' '}
          <a href="/pages/shipping" className="text-cyan hover:underline">{t.shippingLink}</a>{' '}
          {t.beforeEnd}
        </p>
        <div className="space-y-2 text-sm text-[#8888a0]">
          <p className="font-medium text-[#f0f0f5]">{t.includeTitle}</p>
          <ul className="list-disc pl-5 space-y-1">
            {t.items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}

function ContactCard({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  return (
    <div className="flex items-center gap-4 px-5 py-4 rounded-xl bg-[#111118] border border-[#1e1e2e]">
      <div className="shrink-0 w-10 h-10 rounded-full bg-cyan/10 border border-cyan/20 text-cyan flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-xs text-[#8888a0] uppercase tracking-widest mb-0.5">{label}</p>
        {href ? (
          <a href={href} className="text-sm font-medium text-[#f0f0f5] hover:text-cyan transition-colors">{value}</a>
        ) : (
          <p className="text-sm font-medium text-[#f0f0f5]">{value}</p>
        )}
      </div>
    </div>
  )
}

function EmailIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  )
}
