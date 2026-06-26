'use client'
import { useLanguageStore } from '@/store/language'

const faqData = {
  en: [
    { q: 'What sizes are available?', a: 'We offer multiple sizes depending on the product line — from compact 35×25 cm mouse pads up to full desk pads of 90×40 cm and larger. Check each product page for the exact size options.' },
    { q: 'What materials are used?', a: 'All our pads feature a smooth micro-weave surface for precise mouse tracking, a 3mm thick natural rubber base with anti-slip texture, and stitched edges for long-term durability.' },
    { q: 'Are they machine washable?', a: 'Yes. You can wash your VoidPad at up to 30°C on a gentle cycle. We recommend air drying flat — avoid tumble dryers and ironing.' },
    { q: 'How long does production take?', a: 'Each pad is printed on demand. Production takes 3–5 business days before your order is dispatched.' },
    { q: 'How long does shipping take?', a: 'After production, delivery to most US addresses takes 5–8 business days. You will receive a tracking link once your order is shipped.' },
    { q: 'Do you ship outside the US?', a: 'Currently we focus on US shipping. If you are outside the US and want to place an order, contact us and we will do our best to find a solution.' },
    { q: 'Is shipping free?', a: 'Yes — free shipping on all orders over $50. Orders below that threshold have a flat shipping fee shown at checkout.' },
    { q: 'Can I return or exchange my order?', a: 'Since each product is printed on demand specifically for you, we do not accept returns or exchanges for change of mind. However, if your order arrives damaged or defective, contact us within 14 days and we will send a replacement at no cost.' },
    { q: 'Can I use a custom design?', a: 'Yes! We accept custom artwork. Reach out to us at acrformvg@gmail.com with your design (minimum 150 DPI, preferably PNG or PDF) and we will handle the rest.' },
    { q: 'Which payment methods do you accept?', a: 'All major credit and debit cards (Visa, Mastercard, Amex), as well as Apple Pay, Google Pay, and PayPal — all processed securely through Shopify Payments.' },
    { q: 'How do I track my order?', a: "Once your order ships, you will receive an email with a tracking number. You can use it on the carrier's website to follow your delivery." },
    { q: 'I have an issue with my order — what do I do?', a: 'Email us at acrformvg@gmail.com with your order number and a photo of the issue. We aim to respond within 24 hours on business days.' },
  ],
  es: [
    { q: '¿Qué tamaños están disponibles?', a: 'Ofrecemos varios tamaños según la línea de producto — desde mouse pads compactos de 35×25 cm hasta desk pads completos de 90×40 cm y más. Consulta cada página de producto para ver las opciones exactas de tamaño.' },
    { q: '¿Qué materiales se utilizan?', a: 'Todos nuestros pads tienen una superficie de microfibra suave para un seguimiento preciso del ratón, una base de goma natural de 3mm con textura antideslizante y bordes cosidos para mayor durabilidad.' },
    { q: '¿Son lavables a máquina?', a: 'Sí. Puedes lavar tu VoidPad a un máximo de 30°C en programa delicado. Recomendamos secar al aire en posición plana — evita la secadora y el planchado.' },
    { q: '¿Cuánto tarda la producción?', a: 'Cada pad se imprime bajo demanda. La producción tarda 3–5 días hábiles antes de enviar tu pedido.' },
    { q: '¿Cuánto tarda el envío?', a: 'Tras la producción, la entrega a la mayoría de direcciones en USA tarda 5–8 días hábiles. Recibirás un enlace de seguimiento una vez enviado tu pedido.' },
    { q: '¿Enviáis fuera de USA?', a: 'Actualmente nos centramos en envíos dentro de USA. Si estás fuera de USA y quieres realizar un pedido, contáctanos e intentaremos encontrar una solución.' },
    { q: '¿El envío es gratuito?', a: 'Sí — envío gratuito en todos los pedidos superiores a $50. Los pedidos por debajo de ese importe tienen una tarifa plana que se muestra al pagar.' },
    { q: '¿Puedo devolver o cambiar mi pedido?', a: 'Como cada producto se imprime bajo demanda específicamente para ti, no aceptamos devoluciones ni cambios por arrepentimiento. Si tu pedido llega dañado o defectuoso, contáctanos en un plazo de 14 días y te enviaremos un reemplazo sin coste.' },
    { q: '¿Puedo usar un diseño personalizado?', a: '¡Sí! Aceptamos diseños personalizados. Escríbenos a acrformvg@gmail.com con tu diseño (mínimo 150 DPI, preferiblemente PNG o PDF) y nos encargamos del resto.' },
    { q: '¿Qué métodos de pago aceptáis?', a: 'Todas las tarjetas de crédito y débito principales (Visa, Mastercard, Amex), así como Apple Pay, Google Pay y PayPal — todos procesados de forma segura a través de Shopify Payments.' },
    { q: '¿Cómo hago el seguimiento de mi pedido?', a: 'Una vez enviado tu pedido, recibirás un email con un número de seguimiento para consultar en la web del transportista.' },
    { q: 'Tengo un problema con mi pedido — ¿qué hago?', a: 'Escríbenos a acrformvg@gmail.com con tu número de pedido y una foto del problema. Respondemos en un plazo de 24 horas en días hábiles.' },
  ],
}

const ui = {
  en: { label: 'Help Center', title: 'Frequently Asked Questions', cta: "Can't find what you're looking for?", ctaLink: 'Contact us' },
  es: { label: 'Centro de Ayuda', title: 'Preguntas Frecuentes', cta: '¿No encuentras lo que buscas?', ctaLink: 'Contáctanos' },
}

export default function FAQPage() {
  const locale = useLanguageStore((s) => s.locale)
  const faqs = faqData[locale]
  const t = ui[locale]

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold text-violet uppercase tracking-widest mb-2">{t.label}</p>
        <h1 className="text-3xl font-black text-[#f0f0f5]">{t.title}</h1>
        <p className="text-sm text-[#8888a0] mt-2">
          {t.cta}{' '}
          <a href="/pages/contact" className="text-cyan hover:underline">{t.ctaLink}</a>.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((item) => (
          <details
            key={item.q}
            className="group border border-[#1e1e2e] rounded-xl bg-[#0d0d14] open:bg-[#111118] transition-colors"
          >
            <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer text-sm font-semibold text-[#f0f0f5] list-none select-none">
              {item.q}
              <span className="shrink-0 text-[#8888a0] group-open:text-cyan transition-colors">
                <svg className="w-4 h-4 transition-transform group-open:rotate-45" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </span>
            </summary>
            <div className="px-5 pb-5 pt-1 text-sm text-[#8888a0] leading-relaxed border-t border-[#1e1e2e]">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}
