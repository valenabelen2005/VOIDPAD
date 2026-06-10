'use client'
import { useLanguageStore } from '@/store/language'

const regions = {
  en: [
    { region: 'Spain', time: '3–6 business days' },
    { region: 'EU (Central)', time: '5–8 business days' },
    { region: 'EU (Other)', time: '7–10 business days' },
    { region: 'Outside EU', time: 'Contact us' },
  ],
  es: [
    { region: 'España', time: '3–6 días hábiles' },
    { region: 'UE (Centro)', time: '5–8 días hábiles' },
    { region: 'UE (Otros)', time: '7–10 días hábiles' },
    { region: 'Fuera de la UE', time: 'Contáctanos' },
  ],
}

const content = {
  en: {
    label: 'Policies',
    title: 'Shipping & Returns',
    production: { title: 'Production Time', body: 'Every VoidPad is printed on demand — your order goes into production as soon as payment is confirmed. Production typically takes 3–5 business days.' },
    shipping: { title: 'Shipping Times', body: 'Once dispatched, estimated delivery times:', note: 'These are estimates and may vary due to carrier delays or high demand periods.' },
    costs: { title: 'Shipping Costs', free: 'Orders over €50', freeLabel: 'Free', flat: 'Orders under €50', flatLabel: 'Flat rate shown at checkout', note: 'No EU customs fees — all applicable taxes are included in the displayed price.' },
    tracking: { title: 'Order Tracking', body: "Once your order is shipped, you will receive an email with a tracking number. Use it on the carrier's website to follow your delivery in real time." },
    returns: { title: 'Returns & Exchanges', body: 'Because each product is printed on demand specifically for your order, we do not accept returns or exchanges for change of mind.', damaged: 'However, if your order arrives damaged, defective, or with a print quality issue, we will make it right at no cost to you. Contact us within 14 days of delivery at', with: 'with:', items: ['Your order number', 'A photo of the issue', 'A brief description'], closing: 'We will send a replacement or issue a full refund — your choice.' },
    address: { title: 'Wrong Address', body: "Please double-check your shipping address at checkout. We are unable to redirect orders once production has started. If you notice a mistake, contact us immediately at and we will do our best to help." },
  },
  es: {
    label: 'Políticas',
    title: 'Envíos y Devoluciones',
    production: { title: 'Tiempo de Producción', body: 'Cada VoidPad se imprime bajo demanda — tu pedido entra en producción en cuanto se confirma el pago. La producción tarda normalmente 3–5 días hábiles.' },
    shipping: { title: 'Tiempos de Envío', body: 'Una vez enviado, los tiempos de entrega estimados son:', note: 'Son estimaciones y pueden variar por retrasos del transportista o periodos de alta demanda.' },
    costs: { title: 'Costes de Envío', free: 'Pedidos superiores a €50', freeLabel: 'Gratis', flat: 'Pedidos inferiores a €50', flatLabel: 'Tarifa plana mostrada al pagar', note: 'Sin aranceles de aduana en la UE — todos los impuestos aplicables están incluidos en el precio mostrado.' },
    tracking: { title: 'Seguimiento del Pedido', body: 'Una vez enviado tu pedido, recibirás un email con un número de seguimiento para consultar en la web del transportista en tiempo real.' },
    returns: { title: 'Devoluciones y Cambios', body: 'Como cada producto se imprime bajo demanda específicamente para tu pedido, no aceptamos devoluciones ni cambios por arrepentimiento.', damaged: 'Sin embargo, si tu pedido llega dañado, defectuoso o con problemas de calidad de impresión, lo resolveremos sin coste para ti. Contáctanos en un plazo de 14 días desde la entrega a', with: 'con:', items: ['Tu número de pedido', 'Una foto del problema', 'Una breve descripción'], closing: 'Te enviaremos un reemplazo o emitiremos un reembolso completo — tú eliges.' },
    address: { title: 'Dirección Incorrecta', body: 'Por favor, verifica tu dirección de envío al pagar. No podemos redirigir los pedidos una vez iniciada la producción. Si detectas un error, contáctanos de inmediato a y haremos todo lo posible por ayudarte.' },
  },
}

export default function ShippingPage() {
  const locale = useLanguageStore((s) => s.locale)
  const t = content[locale]
  const r = regions[locale]

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold text-violet uppercase tracking-widest mb-2">{t.label}</p>
        <h1 className="text-3xl font-black text-[#f0f0f5]">{t.title}</h1>
      </div>

      <div className="space-y-10 text-sm text-[#c0c0d0] leading-relaxed">

        <Block title={t.production.title}>
          <p>{t.production.body}</p>
        </Block>

        <Block title={t.shipping.title}>
          <p>{t.shipping.body}</p>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {r.map((row) => (
              <div key={row.region} className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#111118] border border-[#1e1e2e]">
                <span className="text-[#8888a0]">{row.region}</span>
                <span className="font-semibold text-[#f0f0f5]">{row.time}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[#8888a0]">{t.shipping.note}</p>
        </Block>

        <Block title={t.costs.title}>
          <div className="space-y-2">
            <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#111118] border border-[#1e1e2e]">
              <span className="text-[#8888a0]">{t.costs.free}</span>
              <span className="font-semibold text-cyan">{t.costs.freeLabel}</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#111118] border border-[#1e1e2e]">
              <span className="text-[#8888a0]">{t.costs.flat}</span>
              <span className="font-semibold text-[#f0f0f5]">{t.costs.flatLabel}</span>
            </div>
          </div>
          <p className="mt-3 text-[#8888a0]">{t.costs.note}</p>
        </Block>

        <Block title={t.tracking.title}>
          <p>{t.tracking.body}</p>
        </Block>

        <Block title={t.returns.title}>
          <p>{t.returns.body}</p>
          <p className="mt-2">
            {t.returns.damaged}{' '}
            <a href="mailto:acrformvg@gmail.com" className="text-cyan hover:underline">acrformvg@gmail.com</a>{' '}
            {t.returns.with}
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-[#8888a0]">
            {t.returns.items.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <p className="mt-2">{t.returns.closing}</p>
        </Block>

        <Block title={t.address.title}>
          <p>
            {t.address.body.split('contact us immediately at')[0]}
            {locale === 'en' ? (
              <>contact us immediately at <a href="mailto:acrformvg@gmail.com" className="text-cyan hover:underline">acrformvg@gmail.com</a> and we will do our best to help.</>
            ) : (
              <><a href="mailto:acrformvg@gmail.com" className="text-cyan hover:underline">acrformvg@gmail.com</a> y haremos todo lo posible por ayudarte.</>
            )}
          </p>
        </Block>

      </div>
    </div>
  )
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h2 className="text-base font-bold text-[#f0f0f5] border-b border-[#1e1e2e] pb-2">{title}</h2>
      <div>{children}</div>
    </div>
  )
}
